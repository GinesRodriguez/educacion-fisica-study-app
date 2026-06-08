/**
 * LLM Evaluator Module
 * Evaluates short-answer responses using an LLM backend.
 *
 * Supports multiple backends with automatic fallback:
 *  1. Ollama (local, default at localhost:11434)
 *  2. Google Gemini API (free tier)
 *  3. Groq API (free tier)
 *  4. Keyword-based fallback (no LLM needed)
 */

const CONFIG_KEY = 'ef_study_llm_config';

/**
 * LLM backend configurations.
 */
const BACKENDS = {
    ollama: {
        name: 'Ollama (Local)',
        defaultUrl: 'http://localhost:11434',
        needsKey: false,
        model: 'gemma2:2b'
    },
    gemini: {
        name: 'Google Gemini',
        defaultUrl: 'https://generativelanguage.googleapis.com/v1beta',
        needsKey: true,
        model: 'gemini-2.0-flash'
    },
    groq: {
        name: 'Groq',
        defaultUrl: 'https://api.groq.com/openai/v1',
        needsKey: true,
        model: 'llama-3.3-70b-versatile'
    },
    keywords: {
        name: 'Keyword Matching (Offline)',
        needsKey: false
    }
};

/**
 * Load LLM configuration from localStorage.
 */
export function loadConfig() {
    try {
        const raw = localStorage.getItem(CONFIG_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) {
        console.warn('LLM: Could not load config', e);
    }
    return {
        backend: 'ollama',
        ollamaUrl: BACKENDS.ollama.defaultUrl,
        ollamaModel: BACKENDS.ollama.model,
        geminiKey: '',
        groqKey: '',
        autoFallback: true
    };
}

/**
 * Save LLM configuration.
 */
export function saveConfig(config) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
}

/**
 * Get available backends info.
 */
export function getBackends() {
    return BACKENDS;
}

/**
 * Build the evaluation prompt for the LLM.
 */
function buildPrompt(question, userAnswer) {
    return `You are an academic evaluator for a Physical Education Didactics course. Evaluate the student's answer to the following question.

QUESTION: ${question.text}

MODEL ANSWER: ${question.modelAnswer}

KEY CONCEPTS EXPECTED: ${question.keywords.join(', ')}

STUDENT'S ANSWER: ${userAnswer}

Evaluate the student's answer and respond ONLY with a JSON object (no markdown, no code fences, no extra text) with exactly these fields:
{
  "score": <number 0-100>,
  "feedback": "<brief feedback explaining what was correct and what was missed>",
  "missingConcepts": ["<concept1>", "<concept2>"],
  "matchedConcepts": ["<concept1>", "<concept2>"]
}

Scoring guidelines:
- 90-100: Covers all key concepts accurately
- 70-89: Most key concepts covered with minor omissions
- 50-69: Some key concepts covered but significant gaps
- 30-49: Few key concepts, major misunderstandings
- 10-29: Very little relevant content
- 0-9: Completely wrong or irrelevant`;
}

/**
 * Call Ollama API.
 */
async function callOllama(prompt, config) {
    const url = `${config.ollamaUrl || BACKENDS.ollama.defaultUrl}/api/generate`;
    const model = config.ollamaModel || BACKENDS.ollama.model;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: model,
            prompt: prompt,
            stream: false,
            options: {
                temperature: 0.1,
                num_predict: 500
            }
        })
    });

    if (!response.ok) throw new Error(`Ollama error: ${response.status}`);
    const data = await response.json();
    return data.response;
}

/**
 * Call Google Gemini API.
 */
async function callGemini(prompt, config) {
    const url = `${BACKENDS.gemini.defaultUrl}/models/${BACKENDS.gemini.model}:generateContent?key=${config.geminiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.1,
                maxOutputTokens: 500
            }
        })
    });

    if (!response.ok) throw new Error(`Gemini error: ${response.status}`);
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

/**
 * Call Groq API.
 */
async function callGroq(prompt, config) {
    const url = `${BACKENDS.groq.defaultUrl}/chat/completions`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.groqKey}`
        },
        body: JSON.stringify({
            model: BACKENDS.groq.model,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.1,
            max_tokens: 500
        })
    });

    if (!response.ok) throw new Error(`Groq error: ${response.status}`);
    const data = await response.json();
    return data.choices[0].message.content;
}

/**
 * Keyword-based fallback evaluator.
 * Uses fuzzy string matching and synonym awareness.
 */
function evaluateWithKeywords(question, userAnswer) {
    const answer = userAnswer.toLowerCase().trim();
    const keywords = question.keywords || [];

    if (answer.length < 5) {
        return {
            score: 0,
            feedback: 'Your answer is too short. Please provide a more detailed response.',
            missingConcepts: keywords,
            matchedConcepts: []
        };
    }

    const matched = [];
    const missing = [];

    for (const keyword of keywords) {
        const kw = keyword.toLowerCase();
        // Direct match
        if (answer.includes(kw)) {
            matched.push(keyword);
            continue;
        }
        // Fuzzy match: check if any word in the answer is within edit distance 2
        const answerWords = answer.split(/\s+/);
        let found = false;
        for (const word of answerWords) {
            if (levenshteinDistance(word, kw) <= 2 && kw.length > 3) {
                matched.push(keyword);
                found = true;
                break;
            }
        }
        // Check multi-word keywords against bigrams/trigrams
        if (!found && kw.includes(' ')) {
            const kwWords = kw.split(/\s+/);
            const allPresent = kwWords.every(kwWord =>
                answerWords.some(aw => levenshteinDistance(aw, kwWord) <= 2 || aw.includes(kwWord))
            );
            if (allPresent) {
                matched.push(keyword);
                found = true;
            }
        }
        if (!found) missing.push(keyword);
    }

    const ratio = keywords.length > 0 ? matched.length / keywords.length : 0;
    const score = Math.round(ratio * 100);

    let feedback;
    if (score >= 90) feedback = 'Excellent! You covered all the key concepts.';
    else if (score >= 70) feedback = `Good answer! You covered most concepts but missed: ${missing.join(', ')}.`;
    else if (score >= 50) feedback = `Partial answer. You mentioned ${matched.length}/${keywords.length} key concepts. Missing: ${missing.join(', ')}.`;
    else if (score > 0) feedback = `Your answer needs more detail. Missing concepts: ${missing.join(', ')}.`;
    else feedback = `Your answer doesn't cover the expected concepts. Review: ${missing.join(', ')}.`;

    return { score, feedback, missingConcepts: missing, matchedConcepts: matched };
}

/**
 * Levenshtein edit distance.
 */
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];
    for (let i = 0; i <= b.length; i++) matrix[i] = [i];
    for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            const cost = b.charAt(i - 1) === a.charAt(j - 1) ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,
                matrix[i][j - 1] + 1,
                matrix[i - 1][j - 1] + cost
            );
        }
    }
    return matrix[b.length][a.length];
}

/**
 * Parse the LLM response to extract the JSON evaluation.
 */
function parseEvaluation(responseText) {
    // Try to extract JSON from the response
    let text = responseText.trim();

    // Remove markdown code fences if present
    text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '');

    // Try to find JSON object
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON found in response');

    const parsed = JSON.parse(jsonMatch[0]);

    // Validate required fields
    if (typeof parsed.score !== 'number') throw new Error('Missing score');
    parsed.score = Math.max(0, Math.min(100, Math.round(parsed.score)));
    parsed.feedback = parsed.feedback || '';
    parsed.missingConcepts = parsed.missingConcepts || [];
    parsed.matchedConcepts = parsed.matchedConcepts || [];

    return parsed;
}

/**
 * Check if Ollama is available.
 */
export async function checkOllamaConnection(config) {
    try {
        const url = `${config.ollamaUrl || BACKENDS.ollama.defaultUrl}/api/tags`;
        const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
        if (!response.ok) return { available: false, models: [] };
        const data = await response.json();
        const models = (data.models || []).map(m => m.name || m.model);
        return { available: true, models };
    } catch {
        return { available: false, models: [] };
    }
}

/**
 * Main evaluation function.
 * Tries the configured backend, falls back if autoFallback is enabled.
 *
 * @param {object} question - The question object
 * @param {string} userAnswer - The user's answer text
 * @param {object} config - LLM configuration
 * @returns {Promise<object>} Evaluation result { score, feedback, missingConcepts, matchedConcepts, backend }
 */
export async function evaluateAnswer(question, userAnswer, config) {
    if (!config) config = loadConfig();

    const prompt = buildPrompt(question, userAnswer);
    const backends = config.autoFallback
        ? ['ollama', 'gemini', 'groq', 'keywords']
        : [config.backend, 'keywords'];

    // Deduplicate and put preferred first
    const tryOrder = [...new Set([config.backend, ...backends])];

    for (const backend of tryOrder) {
        try {
            if (backend === 'keywords') {
                const result = evaluateWithKeywords(question, userAnswer);
                return { ...result, backend: 'keywords' };
            }

            if (backend === 'ollama') {
                const raw = await callOllama(prompt, config);
                const result = parseEvaluation(raw);
                return { ...result, backend: 'ollama' };
            }

            if (backend === 'gemini' && config.geminiKey) {
                const raw = await callGemini(prompt, config);
                const result = parseEvaluation(raw);
                return { ...result, backend: 'gemini' };
            }

            if (backend === 'groq' && config.groqKey) {
                const raw = await callGroq(prompt, config);
                const result = parseEvaluation(raw);
                return { ...result, backend: 'groq' };
            }
        } catch (e) {
            console.warn(`LLM: ${backend} failed:`, e.message);
            continue;
        }
    }

    // Ultimate fallback
    const result = evaluateWithKeywords(question, userAnswer);
    return { ...result, backend: 'keywords' };
}
