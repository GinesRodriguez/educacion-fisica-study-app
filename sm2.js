/**
 * SM-2 Spaced Repetition Algorithm (EXAM MODE — Hour-based)
 * Based on the SuperMemo SM-2 algorithm by Piotr Wozniak.
 * Adapted for exam preparation: intervals are in HOURS, not days.
 *
 * Each question card has:
 *  - ef: Ease Factor (starts at 2.5, minimum 1.3)
 *  - interval: HOURS until next review
 *  - repetitions: Consecutive correct answers
 *  - nextReview: ISO date string of next review
 *  - lastQuality: Last quality rating (0-5)
 */

const STORAGE_KEY = 'ef_study_sm2_state';

// ═══════════════════════════════════════════
//  TUNING CONSTANTS — Adjust these for your exam timeline
//  Current setup: 15-day exam window, 55+ questions
// ═══════════════════════════════════════════
const FIRST_INTERVAL   = 4;    // Hours after 1st correct answer
const SECOND_INTERVAL  = 12;   // Hours after 2nd consecutive correct
const MASTERY_INTERVAL = 48;   // Minimum interval (hours) to count as "mastered"
const MASTERY_REPS     = 3;    // Minimum consecutive correct to count as "mastered"
const OVERDUE_HOURS    = 1;    // Hours past due before a card is flagged "overdue"
const DUE_WINDOW_HOURS = 1;    // ± hours window to consider a card "due now"

/**
 * Load SM-2 state from localStorage.
 * Returns a Map<questionIndex, cardState>.
 */
export function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            return new Map(parsed);
        }
    } catch (e) {
        console.warn('SM2: Could not load state, starting fresh.', e);
    }
    return new Map();
}

/**
 * Save SM-2 state to localStorage.
 * @param {Map} stateMap
 */
export function saveState(stateMap) {
    const serializable = Array.from(stateMap.entries());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
}

/**
 * Get the default state for a new card.
 */
export function getDefaultCard() {
    return {
        ef: 2.5,
        interval: 0,
        repetitions: 0,
        nextReview: null,
        lastQuality: null,
        totalAttempts: 0,
        totalCorrect: 0
    };
}

/**
 * Get the card state for a given question index.
 * @param {Map} stateMap
 * @param {number} index
 * @returns {object} card state
 */
export function getCard(stateMap, index) {
    if (!stateMap.has(index)) {
        stateMap.set(index, getDefaultCard());
    }
    return stateMap.get(index);
}

/**
 * Process a review of a card using the SM-2 algorithm.
 *
 * Quality ratings:
 *  5 – perfect response, no hesitation
 *  4 – correct after brief hesitation
 *  3 – correct but with significant difficulty
 *  2 – incorrect, but the correct answer seemed easy to recall
 *  1 – incorrect, the correct answer was remembered upon seeing it
 *  0 – complete blackout, no recollection
 *
 * @param {object} card - The card state object
 * @param {number} quality - Quality rating 0-5
 * @returns {object} Updated card state
 */
export function reviewCard(card, quality) {
    quality = Math.max(0, Math.min(5, Math.round(quality)));

    card.totalAttempts++;
    if (quality >= 3) card.totalCorrect++;
    card.lastQuality = quality;

    // Update Ease Factor
    const newEF = card.ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    card.ef = Math.max(1.3, newEF);

    if (quality < 3) {
        // Failed: reset repetitions, review again very soon
        card.repetitions = 0;
        card.interval = 0;
    } else {
        // Passed: advance repetition (intervals in HOURS)
        card.repetitions++;
        if (card.repetitions === 1) {
            card.interval = FIRST_INTERVAL;
        } else if (card.repetitions === 2) {
            card.interval = SECOND_INTERVAL;
        } else {
            card.interval = Math.round(card.interval * card.ef);
        }
    }

    // Set next review date (interval is in HOURS)
    const now = new Date();
    const next = new Date(now.getTime() + card.interval * 60 * 60 * 1000);
    card.nextReview = next.toISOString();

    return card;
}

/**
 * Determine the quality rating from a user interaction.
 *
 * For multiple choice:
 *  - Correct on first try → 5
 *  - Incorrect → 1
 *
 * For short answer (scored 0-100):
 *  - 90-100% → 5
 *  - 70-89%  → 4
 *  - 50-69%  → 3
 *  - 30-49%  → 2
 *  - 10-29%  → 1
 *  - 0-9%    → 0
 *
 * @param {string} type - "multiple_choice" or "short_answer"
 * @param {boolean|number} result - boolean for MC, percentage for SA
 * @returns {number} quality 0-5
 */
export function determineQuality(type, result) {
    if (type === 'multiple_choice') {
        return result ? 5 : 1;
    }

    // Short answer: result is a percentage 0-100
    const score = typeof result === 'number' ? result : 0;
    if (score >= 90) return 5;
    if (score >= 70) return 4;
    if (score >= 50) return 3;
    if (score >= 30) return 2;
    if (score >= 10) return 1;
    return 0;
}

/**
 * Sort questions by review priority.
 * Returns indices sorted by urgency (most urgent first).
 *
 * Priority:
 *  1. Overdue questions (nextReview in the past) — sorted by how overdue
 *  2. New questions (never reviewed) — shuffled
 *  3. Due today
 *  4. Future questions — sorted by next review date
 *
 * @param {Map} stateMap
 * @param {number} totalQuestions
 * @param {string|null} topicFilter - Optional topic filter
 * @param {Array} questions - The questions array for topic filtering
 * @returns {number[]} Sorted array of question indices
 */
export function getPrioritizedQueue(stateMap, totalQuestions, topicFilter, questions) {
    const now = new Date();
    const overdue = [];
    const newCards = [];
    const dueToday = [];
    const future = [];

    for (let i = 0; i < totalQuestions; i++) {
        // Apply topic filter
        if (topicFilter && questions[i].topic !== topicFilter) continue;

        const card = getCard(stateMap, i);

        if (card.nextReview === null) {
            newCards.push(i);
        } else {
            const reviewDate = new Date(card.nextReview);
            const diffMs = now - reviewDate;
            const diffHours = diffMs / (1000 * 60 * 60);

            if (diffHours > OVERDUE_HOURS) {
                // Overdue
                overdue.push({ index: i, overdueDays: diffHours });
            } else if (diffHours > -DUE_WINDOW_HOURS) {
                // Due now
                dueToday.push(i);
            } else {
                // Future
                future.push({ index: i, reviewDate });
            }
        }
    }

    // Sort overdue by most overdue first
    overdue.sort((a, b) => b.overdueDays - a.overdueDays);

    // Shuffle new cards
    for (let i = newCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }

    // Shuffle due today
    for (let i = dueToday.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dueToday[i], dueToday[j]] = [dueToday[j], dueToday[i]];
    }

    // Sort future by soonest first
    future.sort((a, b) => a.reviewDate - b.reviewDate);

    return [
        ...overdue.map(o => o.index),
        ...newCards,
        ...dueToday,
        ...future.map(f => f.index)
    ];
}

/**
 * Get statistics about mastery.
 * @param {Map} stateMap
 * @param {number} totalQuestions
 * @param {Array} questions
 * @returns {object} Stats object
 */
export function getStats(stateMap, totalQuestions, questions) {
    const now = new Date();
    const stats = {
        total: totalQuestions,
        new: 0,
        learning: 0,
        mastered: 0,
        overdue: 0,
        byTopic: {}
    };

    const topics = [...new Set(questions.map(q => q.topic))];
    for (const topic of topics) {
        stats.byTopic[topic] = { total: 0, mastered: 0, learning: 0, new: 0, accuracy: 0, totalAttempts: 0, totalCorrect: 0 };
    }

    for (let i = 0; i < totalQuestions; i++) {
        const q = questions[i];
        const card = getCard(stateMap, i);
        const topicStats = stats.byTopic[q.topic];
        topicStats.total++;
        topicStats.totalAttempts += card.totalAttempts;
        topicStats.totalCorrect += card.totalCorrect;

        if (card.nextReview === null) {
            stats.new++;
            topicStats.new++;
        } else if (card.interval >= MASTERY_INTERVAL && card.repetitions >= MASTERY_REPS) {
            stats.mastered++;
            topicStats.mastered++;
        } else {
            stats.learning++;
            topicStats.learning++;

            const reviewDate = new Date(card.nextReview);
            if (now > reviewDate) stats.overdue++;
        }
    }

    // Calculate accuracy per topic
    for (const topic of topics) {
        const ts = stats.byTopic[topic];
        ts.accuracy = ts.totalAttempts > 0 ? Math.round((ts.totalCorrect / ts.totalAttempts) * 100) : 0;
    }

    return stats;
}

/**
 * Reset all SM-2 state.
 */
export function resetState() {
    localStorage.removeItem(STORAGE_KEY);
    return new Map();
}
