/**
 * PE Didactics Study App — Main Application Logic
 * Spaced Repetition with LLM-powered answer evaluation
 */
import questions from './questions.js';
import * as SM2 from './sm2.js';
import * as LLM from './llm-evaluator.js';

// ═══════════════════════════════════════════
//  CONSTANTS
// ═══════════════════════════════════════════

const LEVELS = [
    { name: 'Novice',       xp: 0,    icon: '🌱' },
    { name: 'Student',      xp: 100,  icon: '📖' },
    { name: 'Dedicated',    xp: 300,  icon: '✏️' },
    { name: 'Advanced',     xp: 600,  icon: '🎯' },
    { name: 'Expert',       xp: 1000, icon: '🧠' },
    { name: 'Master',       xp: 1500, icon: '🏅' },
    { name: 'Professor',    xp: 2100, icon: '👑' },
    { name: 'Legend',       xp: 3000, icon: '⭐' },
];

const PROGRESS_KEY = 'ef_study_progress';
const TOPICS = [...new Set(questions.map(q => q.topic))];

// ═══════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════

let sm2State = SM2.loadState();
let progress = loadProgress();
let currentScreen = 'dashboard';

// Session state
let sessionQueue = [];
let sessionIndex = 0;
let sessionStreak = 0;
let sessionCorrect = 0;
let sessionTotal = 0;
let sessionXpEarned = 0;
let sessionTopicFilter = null;
let sessionMode = 'all'; // 'all', 'due', 'new'
let isAnswered = false;

// ═══════════════════════════════════════════
//  PROGRESS PERSISTENCE
// ═══════════════════════════════════════════

function loadProgress() {
    try {
        const raw = localStorage.getItem(PROGRESS_KEY);
        if (raw) return JSON.parse(raw);
    } catch (e) { console.warn('Could not load progress', e); }
    return {
        xp: 0,
        totalAnswered: 0,
        totalCorrect: 0,
        bestStreak: 0,
        currentDayStreak: 0,
        lastStudyDate: null,
        sessionsCompleted: 0,
        topicsMastered: []
    };
}

function saveProgress() {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

// ═══════════════════════════════════════════
//  XP & LEVELS
// ═══════════════════════════════════════════

function getLevel(xp) {
    let level = LEVELS[0];
    for (const l of LEVELS) {
        if (xp >= l.xp) level = l;
        else break;
    }
    return level;
}

function getLevelIndex(xp) {
    let idx = 0;
    for (let i = 0; i < LEVELS.length; i++) {
        if (xp >= LEVELS[i].xp) idx = i;
        else break;
    }
    return idx;
}

function getXpProgress(xp) {
    const idx = getLevelIndex(xp);
    const current = LEVELS[idx];
    const next = LEVELS[idx + 1];
    if (!next) return { current: xp - current.xp, needed: 1, pct: 100 };
    const inLevel = xp - current.xp;
    const needed = next.xp - current.xp;
    return { current: inLevel, needed, pct: Math.min(100, Math.round((inLevel / needed) * 100)) };
}

function getStreakMultiplier(streak) {
    if (streak >= 10) return 3.0;
    if (streak >= 5) return 2.0;
    if (streak >= 3) return 1.5;
    return 1.0;
}

function awardXp(baseXp, streak) {
    const prevLevel = getLevelIndex(progress.xp);
    const mult = getStreakMultiplier(streak);
    const earned = Math.round(baseXp * mult);
    progress.xp += earned;
    sessionXpEarned += earned;
    saveProgress();

    const newLevel = getLevelIndex(progress.xp);
    if (newLevel > prevLevel) {
        showLevelUp(LEVELS[newLevel]);
    }
    return earned;
}

// ═══════════════════════════════════════════
//  DAY STREAK
// ═══════════════════════════════════════════

function updateDayStreak() {
    const today = new Date().toDateString();
    if (progress.lastStudyDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (progress.lastStudyDate === yesterday.toDateString()) {
        progress.currentDayStreak++;
    } else if (progress.lastStudyDate !== today) {
        progress.currentDayStreak = 1;
    }
    progress.lastStudyDate = today;
    saveProgress();
}

// ═══════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════

function showScreen(screenName) {
    currentScreen = screenName;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    const screen = document.getElementById(`screen-${screenName}`);
    const navBtn = document.querySelector(`[data-screen="${screenName}"]`);
    if (screen) screen.classList.add('active');
    if (navBtn) navBtn.classList.add('active');

    if (screenName === 'dashboard') renderDashboard();
    if (screenName === 'stats') renderStats();
    if (screenName === 'settings') renderSettings();
}

// ═══════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════

function renderDashboard() {
    const stats = SM2.getStats(sm2State, questions.length, questions);
    const level = getLevel(progress.xp);
    const xpProg = getXpProgress(progress.xp);

    // Level display
    document.getElementById('dash-level-icon').textContent = level.icon;
    document.getElementById('dash-level-name').textContent = level.name;
    document.getElementById('dash-level-rank').textContent = `Level ${getLevelIndex(progress.xp) + 1}`;
    document.getElementById('dash-xp-bar').style.width = `${xpProg.pct}%`;
    document.getElementById('dash-xp-text').textContent = `${xpProg.current} / ${xpProg.needed} XP`;
    document.getElementById('dash-streak-count').textContent = progress.currentDayStreak;

    // Quick stats
    document.getElementById('dash-total').textContent = stats.total;
    document.getElementById('dash-mastered').textContent = stats.mastered;
    document.getElementById('dash-learning').textContent = stats.learning;
    document.getElementById('dash-due').textContent = stats.overdue + stats.new;

    // Action button counts
    const queue = SM2.getPrioritizedQueue(sm2State, questions.length, null, questions);
    document.getElementById('btn-study-count').textContent = `${queue.length} questions available`;
    document.getElementById('btn-review-count').textContent = `${stats.overdue} cards`;
    document.getElementById('btn-new-count').textContent = `${stats.new} cards`;

    // Topic mastery grid
    const grid = document.getElementById('dash-topic-grid');
    grid.innerHTML = '';
    for (const topic of TOPICS) {
        const ts = stats.byTopic[topic];
        if (!ts) continue;
        const pct = ts.total > 0 ? Math.round((ts.mastered / ts.total) * 100) : 0;
        const barClass = pct >= 70 ? 'high' : pct >= 30 ? 'mid' : 'low';

        const row = document.createElement('div');
        row.className = 'topic-row';
        row.innerHTML = `
            <span class="topic-name">${topic}</span>
            <span class="topic-pct">${pct}%</span>
            <div class="topic-bar">
                <div class="topic-bar-fill ${barClass}" style="width: ${pct}%"></div>
            </div>
        `;
        row.addEventListener('click', () => startStudySession('all', topic));
        grid.appendChild(row);
    }
}

// ═══════════════════════════════════════════
//  STUDY SESSION
// ═══════════════════════════════════════════

function startStudySession(mode = 'all', topicFilter = null) {
    sessionMode = mode;
    sessionTopicFilter = topicFilter;
    sessionIndex = 0;
    sessionStreak = 0;
    sessionCorrect = 0;
    sessionTotal = 0;
    sessionXpEarned = 0;
    isAnswered = false;

    updateDayStreak();

    // Build queue based on mode
    let queue = SM2.getPrioritizedQueue(sm2State, questions.length, topicFilter, questions);

    if (mode === 'due') {
        queue = queue.filter(i => {
            const card = SM2.getCard(sm2State, i);
            if (card.nextReview === null) return false;
            return new Date() >= new Date(card.nextReview);
        });
    } else if (mode === 'new') {
        queue = queue.filter(i => {
            const card = SM2.getCard(sm2State, i);
            return card.nextReview === null;
        });
    }

    sessionQueue = queue;

    // Build topic filter chips
    renderTopicFilter();

    showScreen('study');
    renderQuestion();
}

function renderTopicFilter() {
    const container = document.getElementById('study-topic-filter');
    container.innerHTML = '';

    const allChip = document.createElement('button');
    allChip.className = `filter-chip ${sessionTopicFilter === null ? 'active' : ''}`;
    allChip.textContent = 'All Topics';
    allChip.addEventListener('click', () => {
        sessionTopicFilter = null;
        rebuildQueue();
    });
    container.appendChild(allChip);

    for (const topic of TOPICS) {
        const chip = document.createElement('button');
        chip.className = `filter-chip ${sessionTopicFilter === topic ? 'active' : ''}`;
        chip.textContent = topic.replace(/^Unit \d+: /, '');
        chip.addEventListener('click', () => {
            sessionTopicFilter = topic;
            rebuildQueue();
        });
        container.appendChild(chip);
    }
}

function rebuildQueue() {
    let queue = SM2.getPrioritizedQueue(sm2State, questions.length, sessionTopicFilter, questions);
    if (sessionMode === 'due') {
        queue = queue.filter(i => {
            const card = SM2.getCard(sm2State, i);
            return card.nextReview !== null && new Date() >= new Date(card.nextReview);
        });
    } else if (sessionMode === 'new') {
        queue = queue.filter(i => SM2.getCard(sm2State, i).nextReview === null);
    }
    sessionQueue = queue;
    sessionIndex = 0;
    renderTopicFilter();
    renderQuestion();
}

function renderQuestion() {
    const area = document.getElementById('study-question-area');
    isAnswered = false;

    // Update counter
    document.getElementById('study-counter').textContent =
        `${sessionIndex + 1} / ${sessionQueue.length}`;
    document.getElementById('study-streak').textContent = sessionStreak;

    if (sessionIndex >= sessionQueue.length) {
        renderSessionComplete(area);
        return;
    }

    const qIdx = sessionQueue[sessionIndex];
    const q = questions[qIdx];
    const card = SM2.getCard(sm2State, qIdx);

    const isNew = card.nextReview === null;
    const isReview = !isNew && new Date() >= new Date(card.nextReview);
    const statusBadge = isNew
        ? '<span class="badge badge-new">New</span>'
        : isReview
            ? '<span class="badge badge-review">Review</span>'
            : '<span class="badge badge-review">Practice</span>';

    const typeBadge = q.type === 'multiple_choice'
        ? '<span class="badge badge-mc">Multiple Choice</span>'
        : '<span class="badge badge-sa">Short Answer</span>';

    let answerHTML;
    if (q.type === 'multiple_choice') {
        const shuffled = shuffleOptions(q);
        answerHTML = `
            <div class="options-grid" id="mc-options">
                ${shuffled.map((opt, i) => `
                    <button class="option-btn" data-option="${escapeHtml(opt)}" id="mc-option-${i}">
                        ${escapeHtml(opt)}
                    </button>
                `).join('')}
            </div>
        `;
    } else {
        answerHTML = `
            <div class="sa-container">
                <textarea class="sa-textarea" id="sa-input" placeholder="Type your answer here..." rows="4"></textarea>
                <button class="sa-submit" id="sa-submit-btn">Evaluate Answer</button>
            </div>
        `;
    }

    area.innerHTML = `
        <div class="question-card" id="question-card">
            <div class="question-meta" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; flex-wrap: wrap;">
                <div>
                    <span class="badge badge-topic">${escapeHtml(q.topic)}</span>
                    ${typeBadge}
                    ${statusBadge}
                </div>
                <button class="btn-outline" id="inline-report-btn" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; border: 1px solid var(--surface-border); opacity: 0.7; border-radius: 6px;">🚩 Report Error</button>
            </div>
            <h2 class="question-text">${escapeHtml(q.text)}</h2>
            ${answerHTML}
            <div id="feedback-area"></div>
        </div>
    `;

    // Attach event listeners
    if (q.type === 'multiple_choice') {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => handleMCAnswer(qIdx, btn.dataset.option));
        });
    } else {
        const submitBtn = document.getElementById('sa-submit-btn');
        const textarea = document.getElementById('sa-input');
        submitBtn.addEventListener('click', () => handleSAAnswer(qIdx));
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) handleSAAnswer(qIdx);
        });
    }

    document.getElementById('inline-report-btn').addEventListener('click', () => {
        showScreen('report');
        document.getElementById('report-type').value = 'question';
        document.getElementById('report-type').dispatchEvent(new Event('change'));
        const shortText = q.text.length > 80 ? q.text.substring(0, 80) + '...' : q.text;
        document.getElementById('report-question').value = `Q${qIdx + 1}: ${shortText}`;
        document.getElementById('report-details').focus();
    });
}

function shuffleOptions(q) {
    const opts = [...q.options];
    for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
}

// ── Multiple Choice Handler ──
function handleMCAnswer(qIdx, selectedOption) {
    if (isAnswered) return;
    isAnswered = true;

    const q = questions[qIdx];
    const isCorrect = selectedOption === q.correctAnswer;

    sessionTotal++;
    progress.totalAnswered++;

    // Visual feedback on options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true;
        const opt = btn.dataset.option;
        if (opt === q.correctAnswer) {
            btn.classList.add(opt === selectedOption ? 'correct' : 'correct-missed');
        } else if (opt === selectedOption) {
            btn.classList.add('wrong');
        }
    });

    if (isCorrect) {
        sessionStreak++;
        sessionCorrect++;
        progress.totalCorrect++;
        if (sessionStreak > progress.bestStreak) progress.bestStreak = sessionStreak;
        awardXp(10, sessionStreak);
    } else {
        sessionStreak = 0;
    }

    // SM-2 update
    const quality = SM2.determineQuality('multiple_choice', isCorrect);
    const card = SM2.getCard(sm2State, qIdx);
    SM2.reviewCard(card, quality);
    SM2.saveState(sm2State);
    saveProgress();

    // Update streak display
    document.getElementById('study-streak').textContent = sessionStreak;

    // Show feedback
    showFeedback(q, isCorrect ? 'correct' : 'incorrect');
}

// ── Short Answer Handler ──
async function handleSAAnswer(qIdx) {
    if (isAnswered) return;

    const textarea = document.getElementById('sa-input');
    const submitBtn = document.getElementById('sa-submit-btn');
    const userAnswer = textarea.value.trim();

    if (userAnswer.length < 3) {
        textarea.style.borderColor = 'var(--error)';
        setTimeout(() => textarea.style.borderColor = '', 1000);
        return;
    }

    isAnswered = true;
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    textarea.disabled = true;

    const q = questions[qIdx];
    const config = LLM.loadConfig();

    let result;
    try {
        result = await LLM.evaluateAnswer(q, userAnswer, config);
    } catch (e) {
        console.error('Evaluation error:', e);
        result = { score: 0, feedback: 'Evaluation failed. Please try again.', missingConcepts: [], matchedConcepts: [], backend: 'error' };
    }

    submitBtn.classList.remove('loading');

    sessionTotal++;
    progress.totalAnswered++;

    const isCorrect = result.score >= 50;
    if (isCorrect) {
        sessionStreak++;
        sessionCorrect++;
        progress.totalCorrect++;
        if (sessionStreak > progress.bestStreak) progress.bestStreak = sessionStreak;
        awardXp(15, sessionStreak);
    } else {
        sessionStreak = 0;
    }

    // SM-2 update
    const quality = SM2.determineQuality('short_answer', result.score);
    const card = SM2.getCard(sm2State, qIdx);
    SM2.reviewCard(card, quality);
    SM2.saveState(sm2State);
    saveProgress();

    document.getElementById('study-streak').textContent = sessionStreak;

    // Show SA score + feedback
    showSAResult(q, result);
}

function showSAResult(q, result) {
    const feedbackArea = document.getElementById('feedback-area');
    const scoreClass = result.score >= 90 ? 'excellent' : result.score >= 70 ? 'good' : result.score >= 50 ? 'partial' : 'poor';
    const pages = Array.isArray(q.reference.page) ? q.reference.page : [q.reference.page];
    const pageText = pages.join(' & ');
    const pageImgsHTML = pages.map(p => `<img src="ref_images/page_${p}.png?t=${Date.now()}" alt="Notes page ${p}" class="ref-page-img" loading="lazy" style="margin-bottom: 0.5rem;">`).join('');

    feedbackArea.innerHTML = `
        <div class="sa-score-display ${scoreClass}">
            <div class="sa-score-value">${result.score}%</div>
            <div>
                <div class="sa-score-feedback">${escapeHtml(result.feedback)}</div>
                <div class="sa-llm-badge">Evaluated by: ${result.backend}</div>
            </div>
        </div>
        ${result.matchedConcepts?.length ? `<p style="color: var(--success); font-size: 0.85rem; margin-bottom: 0.3rem;">✓ Matched: ${result.matchedConcepts.map(escapeHtml).join(', ')}</p>` : ''}
        ${result.missingConcepts?.length ? `<p style="color: var(--error); font-size: 0.85rem; margin-bottom: 0.5rem;">✗ Missing: ${result.missingConcepts.map(escapeHtml).join(', ')}</p>` : ''}
        <div class="feedback-model-answer">
            <h5>📝 Model Answer</h5>
            <p>${escapeHtml(q.modelAnswer)}</p>
        </div>
        <div class="feedback-panel">
            <h4>📚 Explanation</h4>
            <div class="feedback-explanation">${escapeHtml(q.explanation)}</div>
            <div class="feedback-reference">
                <span style="font-weight: 600;">📄 Reference:</span> ${escapeHtml(q.reference.file)}, page ${pageText}
            </div>
            <button class="ref-toggle-btn" id="ref-toggle-btn">📖 Show Notes Page${pages.length > 1 ? 's' : ''}</button>
            <div class="ref-image-container hidden" id="ref-image-container">
                ${pageImgsHTML}
            </div>
        </div>
        <button class="continue-btn" id="continue-btn">Continue →</button>
    `;

    document.getElementById('ref-toggle-btn').addEventListener('click', toggleRefImage);
    document.getElementById('continue-btn').addEventListener('click', nextQuestion);
}

function showFeedback(q, result) {
    const feedbackArea = document.getElementById('feedback-area');
    const pages = Array.isArray(q.reference.page) ? q.reference.page : [q.reference.page];
    const pageText = pages.join(' & ');
    const pageImgsHTML = pages.map(p => `<img src="ref_images/page_${p}.png?t=${Date.now()}" alt="Notes page ${p}" class="ref-page-img" loading="lazy" style="margin-bottom: 0.5rem;">`).join('');

    feedbackArea.innerHTML = `
        <div class="feedback-panel">
            <h4>${result === 'correct' ? '✅ Correct!' : '❌ Incorrect'}</h4>
            <div class="feedback-explanation">${escapeHtml(q.explanation)}</div>
            <div class="feedback-reference">
                <span style="font-weight: 600;">📄 Reference:</span> ${escapeHtml(q.reference.file)}, page ${pageText}
            </div>
            <button class="ref-toggle-btn" id="ref-toggle-btn">📖 Show Notes Page${pages.length > 1 ? 's' : ''}</button>
            <div class="ref-image-container hidden" id="ref-image-container">
                ${pageImgsHTML}
            </div>
        </div>
        <button class="continue-btn" id="continue-btn">Continue →</button>
    `;

    document.getElementById('ref-toggle-btn').addEventListener('click', toggleRefImage);
    document.getElementById('continue-btn').addEventListener('click', nextQuestion);
}

function nextQuestion() {
    sessionIndex++;
    renderQuestion();
}

function renderSessionComplete(area) {
    progress.sessionsCompleted++;
    saveProgress();

    const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;

    area.innerHTML = `
        <div class="card card-glow-success">
            <div class="session-complete">
                <div class="session-complete-icon">🎉</div>
                <h2>Session Complete!</h2>
                <p class="subtitle">Great work! Keep studying to master all topics.</p>

                <div class="session-summary">
                    <div class="summary-item">
                        <div class="summary-value" style="color: var(--primary-color);">${sessionTotal}</div>
                        <div class="summary-label">Questions</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-value" style="color: var(--success);">${accuracy}%</div>
                        <div class="summary-label">Accuracy</div>
                    </div>
                    <div class="summary-item">
                        <div class="summary-value" style="color: var(--warning);">+${sessionXpEarned}</div>
                        <div class="summary-label">XP Earned</div>
                    </div>
                </div>

                <button class="continue-btn" id="back-to-dash-btn">Back to Dashboard</button>
            </div>
        </div>
    `;

    document.getElementById('back-to-dash-btn').addEventListener('click', () => showScreen('dashboard'));
}

// ═══════════════════════════════════════════
//  STATISTICS
// ═══════════════════════════════════════════

function renderStats() {
    const stats = SM2.getStats(sm2State, questions.length, questions);

    document.getElementById('stats-total-answered').textContent = progress.totalAnswered;
    const accuracy = progress.totalAnswered > 0 ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100) : 0;
    document.getElementById('stats-accuracy').textContent = `${accuracy}%`;
    document.getElementById('stats-best-streak').textContent = progress.bestStreak;
    document.getElementById('stats-total-xp').textContent = progress.xp;

    // Topic detail
    const detailGrid = document.getElementById('stats-topic-detail');
    detailGrid.innerHTML = '';
    for (const topic of TOPICS) {
        const ts = stats.byTopic[topic];
        if (!ts) continue;
        const card = document.createElement('div');
        card.className = 'stats-topic-card';
        card.innerHTML = `
            <div>
                <div class="stats-topic-name">${escapeHtml(topic)}</div>
                <div class="stats-topic-counts">
                    <span style="color: var(--success);">✓ ${ts.mastered} mastered</span>
                    <span style="color: var(--warning);">⟳ ${ts.learning} learning</span>
                    <span style="color: var(--text-dim);">○ ${ts.new} new</span>
                </div>
            </div>
            <div class="stats-topic-accuracy" style="color: ${ts.accuracy >= 70 ? 'var(--success)' : ts.accuracy >= 40 ? 'var(--warning)' : 'var(--error)'};">
                ${ts.accuracy}%
            </div>
        `;
        detailGrid.appendChild(card);
    }

    // Hardest questions
    const hardestContainer = document.getElementById('stats-hardest');
    hardestContainer.innerHTML = '';
    const allCards = [];
    for (let i = 0; i < questions.length; i++) {
        const card = SM2.getCard(sm2State, i);
        if (card.totalAttempts > 0) {
            allCards.push({ index: i, card, accuracy: card.totalCorrect / card.totalAttempts });
        }
    }
    allCards.sort((a, b) => a.accuracy - b.accuracy);
    const hardest = allCards.slice(0, 5);

    if (hardest.length === 0) {
        hardestContainer.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📝</div><p>Answer some questions first to see your hardest ones here.</p></div>';
    } else {
        for (const item of hardest) {
            const q = questions[item.index];
            const el = document.createElement('div');
            el.className = 'stats-topic-card';
            el.innerHTML = `
                <div>
                    <div class="stats-topic-name" style="font-size: 0.85rem;">${escapeHtml(q.text.slice(0, 80))}${q.text.length > 80 ? '...' : ''}</div>
                    <div class="stats-topic-counts">
                        <span>${escapeHtml(q.topic)}</span>
                        <span>Attempts: ${item.card.totalAttempts}</span>
                    </div>
                </div>
                <div class="stats-topic-accuracy" style="color: ${item.accuracy >= 0.5 ? 'var(--warning)' : 'var(--error)'};">
                    ${Math.round(item.accuracy * 100)}%
                </div>
            `;
            hardestContainer.appendChild(el);
        }
    }
}

// ═══════════════════════════════════════════
//  SETTINGS
// ═══════════════════════════════════════════

function renderSettings() {
    const config = LLM.loadConfig();

    document.getElementById('settings-backend').value = config.backend;
    document.getElementById('settings-ollama-url').value = config.ollamaUrl || 'http://localhost:11434';
    document.getElementById('settings-ollama-model').value = config.ollamaModel || 'gemma2:2b';
    document.getElementById('settings-gemini-key').value = config.geminiKey || '';
    document.getElementById('settings-groq-key').value = config.groqKey || '';
    document.getElementById('settings-auto-fallback').checked = config.autoFallback !== false;

    updateSettingsVisibility(config.backend);
}

function updateSettingsVisibility(backend) {
    document.getElementById('settings-ollama-group').classList.toggle('hidden', backend !== 'ollama');
    document.getElementById('settings-gemini-group').classList.toggle('hidden', backend !== 'gemini');
    document.getElementById('settings-groq-group').classList.toggle('hidden', backend !== 'groq');
}

function saveSettings() {
    const config = {
        backend: document.getElementById('settings-backend').value,
        ollamaUrl: document.getElementById('settings-ollama-url').value,
        ollamaModel: document.getElementById('settings-ollama-model').value,
        geminiKey: document.getElementById('settings-gemini-key').value,
        groqKey: document.getElementById('settings-groq-key').value,
        autoFallback: document.getElementById('settings-auto-fallback').checked
    };
    LLM.saveConfig(config);

    // Flash save button
    const btn = document.getElementById('settings-save');
    const origText = btn.textContent;
    btn.textContent = '✓ Saved!';
    setTimeout(() => btn.textContent = origText, 1500);
}

async function testOllamaConnection() {
    const statusEl = document.getElementById('settings-ollama-status');
    statusEl.className = 'settings-status checking';
    statusEl.textContent = '⏳ Checking...';

    const config = {
        ollamaUrl: document.getElementById('settings-ollama-url').value
    };
    const result = await LLM.checkOllamaConnection(config);

    if (result.available) {
        statusEl.className = 'settings-status connected';
        statusEl.textContent = `✓ Connected — Models: ${result.models.join(', ') || 'none'}`;
    } else {
        statusEl.className = 'settings-status disconnected';
        statusEl.textContent = '✗ Cannot connect to Ollama';
    }
}

// ═══════════════════════════════════════════
//  LEVEL UP CELEBRATION
// ═══════════════════════════════════════════

function showLevelUp(level) {
    document.getElementById('levelup-icon').textContent = level.icon;
    document.getElementById('levelup-level').textContent = `You are now: ${level.name}`;
    document.getElementById('levelup-overlay').classList.remove('hidden');
    spawnConfetti();
}

function spawnConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    const colors = ['#6366f1', '#f43f5e', '#10b981', '#fbbf24', '#3b82f6', '#a78bfa', '#f97316'];

    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = `${1.5 + Math.random() * 2}s`;
        piece.style.animationDelay = `${Math.random() * 0.5}s`;
        piece.style.width = `${6 + Math.random() * 8}px`;
        piece.style.height = `${6 + Math.random() * 8}px`;
        piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        container.appendChild(piece);
    }

    setTimeout(() => container.innerHTML = '', 4000);
}

// ═══════════════════════════════════════════
//  DATA MANAGEMENT
// ═══════════════════════════════════════════

function exportProgress() {
    const data = {
        sm2State: Array.from(sm2State.entries()),
        progress: progress,
        llmConfig: LLM.loadConfig(),
        exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pe-study-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importProgress(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.sm2State) {
                sm2State = new Map(data.sm2State);
                SM2.saveState(sm2State);
            }
            if (data.progress) {
                progress = data.progress;
                saveProgress();
            }
            if (data.llmConfig) {
                LLM.saveConfig(data.llmConfig);
            }
            renderDashboard();
            alert('Progress imported successfully!');
        } catch (err) {
            alert('Failed to import: invalid file format.');
        }
    };
    reader.readAsText(file);
}

function resetAllProgress() {
    if (!confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) return;
    if (!confirm('Really? All XP, levels, and review history will be lost.')) return;

    sm2State = SM2.resetState();
    progress = {
        xp: 0, totalAnswered: 0, totalCorrect: 0, bestStreak: 0,
        currentDayStreak: 0, lastStudyDate: null, sessionsCompleted: 0, topicsMastered: []
    };
    saveProgress();
    renderDashboard();
}

// ═══════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════

function toggleRefImage() {
    const container = document.getElementById('ref-image-container');
    const btn = document.getElementById('ref-toggle-btn');
    if (container.classList.contains('hidden')) {
        container.classList.remove('hidden');
        btn.textContent = '📖 Hide Notes Page';
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        container.classList.add('hidden');
        btn.textContent = '📖 Show Notes Page';
    }
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ═══════════════════════════════════════════
//  EVENT LISTENERS
// ═══════════════════════════════════════════

function init() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => showScreen(btn.dataset.screen));
    });

    // Dashboard actions
    document.getElementById('btn-study-now').addEventListener('click', () => startStudySession('all'));
    document.getElementById('btn-review-due').addEventListener('click', () => startStudySession('due'));
    document.getElementById('btn-new-only').addEventListener('click', () => startStudySession('new'));

    // Study exit
    document.getElementById('study-exit-btn').addEventListener('click', () => {
        if (sessionTotal > 0 && !confirm('End this study session?')) return;
        showScreen('dashboard');
    });

    // Settings
    document.getElementById('settings-backend').addEventListener('change', (e) => {
        updateSettingsVisibility(e.target.value);
    });
    document.getElementById('settings-save').addEventListener('click', saveSettings);
    document.getElementById('settings-ollama-test').addEventListener('click', testOllamaConnection);
    
    // Help toggles in settings
    document.querySelectorAll('.help-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            const target = document.getElementById(targetId);
            if (target) {
                target.classList.toggle('hidden');
            }
        });
    });

    // Data management
    document.getElementById('settings-export').addEventListener('click', exportProgress);
    document.getElementById('settings-import').addEventListener('click', () => {
        document.getElementById('settings-import-file').click();
    });
    document.getElementById('settings-import-file').addEventListener('change', (e) => {
        if (e.target.files[0]) importProgress(e.target.files[0]);
    });
    document.getElementById('settings-reset').addEventListener('click', resetAllProgress);

    // Level up close
    document.getElementById('levelup-close-btn').addEventListener('click', () => {
        document.getElementById('levelup-overlay').classList.add('hidden');
    });

    // Report screen logic
    const reportType = document.getElementById('report-type');
    const reportQGroup = document.getElementById('report-question-group');
    const reportFGroup = document.getElementById('report-feature-group');
    const reportQInput = document.getElementById('report-question');
    const reportFInput = document.getElementById('report-feature');

    // Populate questions datalist
    const qDatalist = document.getElementById('questions-datalist');
    questions.forEach((q, idx) => {
        const option = document.createElement('option');
        const shortText = q.text.length > 80 ? q.text.substring(0, 80) + '...' : q.text;
        option.value = `Q${idx + 1}: ${shortText}`;
        qDatalist.appendChild(option);
    });

    reportType.addEventListener('change', (e) => {
        reportQGroup.classList.add('hidden');
        reportFGroup.classList.add('hidden');
        reportQInput.required = false;
        reportFInput.required = false;

        if (e.target.value === 'question') {
            reportQGroup.classList.remove('hidden');
            reportQInput.required = true;
        } else if (e.target.value === 'feature') {
            reportFGroup.classList.remove('hidden');
            reportFInput.required = true;
        }
    });

    document.getElementById('report-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const type = document.getElementById('report-type').value;
        const qContext = document.getElementById('report-question').value;
        const fContext = document.getElementById('report-feature').value;
        const details = document.getElementById('report-details').value;

        let subject = `[PE Study App Report] `;
        let body = `Issue Type: ${type}\n\n`;

        if (type === 'question') {
            subject += `Question Error`;
            body += `Context: ${qContext}\n\n`;
        } else if (type === 'feature') {
            subject += `Feature/Bug`;
            body += `Context: ${fContext}\n\n`;
        } else {
            subject += `General Feedback`;
        }

        body += `Details:\n${details}\n`;

        // Generate email
        window.location.href = `mailto:gines.rodriguez@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        e.target.reset();
        reportQGroup.classList.add('hidden');
        reportFGroup.classList.add('hidden');
        showScreen('dashboard');
    });

    // Initial render
    renderDashboard();

    console.log(`PE Didactics Study App loaded — ${questions.length} questions across ${TOPICS.length} topics`);
}

init();
