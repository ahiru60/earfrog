const STORAGE_KEY = 'earfrog-progress-v2';

const EXERCISES = {
  interval: {
    title: 'Interval safari',
    prompt: 'Hear two notes in sequence. Name the leap.',
    pools: {
      easy: [
        { label: 'Minor 2nd', semitones: 1 },
        { label: 'Major 2nd', semitones: 2 },
        { label: 'Minor 3rd', semitones: 3 },
        { label: 'Major 3rd', semitones: 4 },
        { label: 'Perfect 4th', semitones: 5 },
      ],
      medium: [
        { label: 'Minor 2nd', semitones: 1 },
        { label: 'Major 2nd', semitones: 2 },
        { label: 'Minor 3rd', semitones: 3 },
        { label: 'Major 3rd', semitones: 4 },
        { label: 'Perfect 4th', semitones: 5 },
        { label: 'Tritone', semitones: 6 },
        { label: 'Perfect 5th', semitones: 7 },
        { label: 'Minor 6th', semitones: 8 },
      ],
      hard: [
        { label: 'Minor 2nd', semitones: 1 },
        { label: 'Major 2nd', semitones: 2 },
        { label: 'Minor 3rd', semitones: 3 },
        { label: 'Major 3rd', semitones: 4 },
        { label: 'Perfect 4th', semitones: 5 },
        { label: 'Tritone', semitones: 6 },
        { label: 'Perfect 5th', semitones: 7 },
        { label: 'Minor 6th', semitones: 8 },
        { label: 'Major 6th', semitones: 9 },
        { label: 'Minor 7th', semitones: 10 },
        { label: 'Major 7th', semitones: 11 },
        { label: 'Octave', semitones: 12 },
      ],
    },
    buildQuestion(pool) {
      const answer = sample(pool);
      const root = randomInt(48, 60);
      return {
        answer: answer.label,
        choices: makeChoices(pool, answer.label),
        play(audio, instrument) {
          playNote(audio, root, 0.0, 0.72, instrument, 0.16);
          playNote(audio, root + answer.semitones, 0.88, 0.72, instrument, 0.16);
        },
        playReference(audio, instrument) {
          playNote(audio, root, 0.0, 0.95, instrument, 0.17);
        },
      };
    },
  },
  chord: {
    title: 'Chord pond',
    prompt: 'Hear the stack. Identify the chord flavor.',
    pools: {
      easy: [
        { label: 'Major', intervals: [0, 4, 7] },
        { label: 'Minor', intervals: [0, 3, 7] },
        { label: 'Diminished', intervals: [0, 3, 6] },
      ],
      medium: [
        { label: 'Major', intervals: [0, 4, 7] },
        { label: 'Minor', intervals: [0, 3, 7] },
        { label: 'Diminished', intervals: [0, 3, 6] },
        { label: 'Augmented', intervals: [0, 4, 8] },
        { label: 'Major 7', intervals: [0, 4, 7, 11] },
        { label: 'Minor 7', intervals: [0, 3, 7, 10] },
      ],
      hard: [
        { label: 'Major', intervals: [0, 4, 7] },
        { label: 'Minor', intervals: [0, 3, 7] },
        { label: 'Diminished', intervals: [0, 3, 6] },
        { label: 'Augmented', intervals: [0, 4, 8] },
        { label: 'Suspended 2', intervals: [0, 2, 7] },
        { label: 'Suspended 4', intervals: [0, 5, 7] },
        { label: 'Dominant 7', intervals: [0, 4, 7, 10] },
        { label: 'Major 7', intervals: [0, 4, 7, 11] },
        { label: 'Minor 7', intervals: [0, 3, 7, 10] },
      ],
    },
    buildQuestion(pool) {
      const answer = sample(pool);
      const root = randomInt(46, 57);
      return {
        answer: answer.label,
        choices: makeChoices(pool, answer.label),
        play(audio, instrument) {
          answer.intervals.forEach((interval) => playNote(audio, root + interval, 0.0, 1.15, instrument, 0.13));
        },
        playReference(audio, instrument) {
          playNote(audio, root, 0.0, 0.95, instrument, 0.17);
        },
      };
    },
  },
  scale: {
    title: 'Scale trail',
    prompt: 'Hear the ascent. Name the road it takes.',
    pools: {
      easy: [
        { label: 'Major', pattern: [0, 2, 4, 5, 7, 9, 11, 12] },
        { label: 'Natural Minor', pattern: [0, 2, 3, 5, 7, 8, 10, 12] },
        { label: 'Major Pentatonic', pattern: [0, 2, 4, 7, 9, 12] },
      ],
      medium: [
        { label: 'Major', pattern: [0, 2, 4, 5, 7, 9, 11, 12] },
        { label: 'Natural Minor', pattern: [0, 2, 3, 5, 7, 8, 10, 12] },
        { label: 'Dorian', pattern: [0, 2, 3, 5, 7, 9, 10, 12] },
        { label: 'Mixolydian', pattern: [0, 2, 4, 5, 7, 9, 10, 12] },
        { label: 'Major Pentatonic', pattern: [0, 2, 4, 7, 9, 12] },
        { label: 'Minor Pentatonic', pattern: [0, 3, 5, 7, 10, 12] },
      ],
      hard: [
        { label: 'Major', pattern: [0, 2, 4, 5, 7, 9, 11, 12] },
        { label: 'Natural Minor', pattern: [0, 2, 3, 5, 7, 8, 10, 12] },
        { label: 'Harmonic Minor', pattern: [0, 2, 3, 5, 7, 8, 11, 12] },
        { label: 'Melodic Minor', pattern: [0, 2, 3, 5, 7, 9, 11, 12] },
        { label: 'Dorian', pattern: [0, 2, 3, 5, 7, 9, 10, 12] },
        { label: 'Phrygian', pattern: [0, 1, 3, 5, 7, 8, 10, 12] },
        { label: 'Lydian', pattern: [0, 2, 4, 6, 7, 9, 11, 12] },
        { label: 'Mixolydian', pattern: [0, 2, 4, 5, 7, 9, 10, 12] },
      ],
    },
    buildQuestion(pool) {
      const answer = sample(pool);
      const root = randomInt(47, 55);
      return {
        answer: answer.label,
        choices: makeChoices(pool, answer.label),
        play(audio, instrument) {
          answer.pattern.forEach((step, index) => playNote(audio, root + step, index * 0.33, 0.28, instrument, 0.12));
        },
        playReference(audio, instrument) {
          playNote(audio, root, 0.0, 0.95, instrument, 0.17);
        },
      };
    },
  },
};

const difficultyLabels = {
  easy: 'Sprout',
  medium: 'Pond',
  hard: 'Storm',
};

const questLines = [
  'Answer 10 questions with focus. Clean reps over random guessing.',
  'Build a combo of 5. Precision first, speed second.',
  'Replay before guessing. Strong ears are trained, not rushed.',
  'Clear one short round now. Tiny consistent wins compound fast.',
];

const praiseLines = [
  'Clean catch.',
  'Nice ear.',
  'Locked in.',
  'That was sharp.',
  'Good leap.',
];

const recoveryLines = [
  'Misses are reps too.',
  'Good — now your ear has contrast.',
  'Take the replay and lock it in.',
  'That one teaches something.',
];

const state = {
  audioContext: null,
  currentQuestion: null,
  progress: loadProgress(),
};

const els = {
  exerciseSelect: document.getElementById('exerciseSelect'),
  difficultySelect: document.getElementById('difficultySelect'),
  instrumentSelect: document.getElementById('instrumentSelect'),
  newQuestionBtn: document.getElementById('newQuestionBtn'),
  replayBtn: document.getElementById('replayBtn'),
  playBtn: document.getElementById('playBtn'),
  playReferenceBtn: document.getElementById('playReferenceBtn'),
  resetProgressBtn: document.getElementById('resetProgressBtn'),
  heroStartBtn: document.getElementById('heroStartBtn'),
  dailyChallengeBtn: document.getElementById('dailyChallengeBtn'),
  answerGrid: document.getElementById('answerGrid'),
  feedbackBox: document.getElementById('feedbackBox'),
  exerciseTitle: document.getElementById('exerciseTitle'),
  promptText: document.getElementById('promptText'),
  streakValue: document.getElementById('streakValue'),
  accuracyValue: document.getElementById('accuracyValue'),
  coinsValue: document.getElementById('coinsValue'),
  questionCounter: document.getElementById('questionCounter'),
  comboPill: document.getElementById('comboPill'),
  levelPill: document.getElementById('levelPill'),
  todayCount: document.getElementById('todayCount'),
  bestStreak: document.getElementById('bestStreak'),
  exerciseAccuracy: document.getElementById('exerciseAccuracy'),
  bestCombo: document.getElementById('bestCombo'),
  questText: document.getElementById('questText'),
};

init();

function init() {
  bindEvents();
  rotateQuest();
  refreshMeta();
  createQuestion();
}

function bindEvents() {
  els.exerciseSelect.addEventListener('change', handleModeChange);
  els.difficultySelect.addEventListener('change', handleModeChange);
  els.newQuestionBtn.addEventListener('click', createQuestion);
  els.replayBtn.addEventListener('click', () => playCurrent(false));
  els.playBtn.addEventListener('click', () => playCurrent(false));
  els.playReferenceBtn.addEventListener('click', () => playCurrent(true));
  els.resetProgressBtn.addEventListener('click', resetProgress);
  els.heroStartBtn.addEventListener('click', createQuestion);
  els.dailyChallengeBtn.addEventListener('click', activateDailyChallenge);
}

function handleModeChange() {
  refreshMeta();
  createQuestion();
}

function activateDailyChallenge() {
  const modes = ['interval', 'chord', 'scale'];
  const dayIndex = new Date().getDate() % modes.length;
  els.exerciseSelect.value = modes[dayIndex];
  els.difficultySelect.value = 'hard';
  rotateQuest('Daily challenge: one hard round, no panic, trust the ear.');
  refreshMeta();
  createQuestion();
}

function createQuestion() {
  const exerciseKey = els.exerciseSelect.value;
  const difficulty = els.difficultySelect.value;
  const exercise = EXERCISES[exerciseKey];
  const question = exercise.buildQuestion(exercise.pools[difficulty]);

  state.currentQuestion = {
    ...question,
    exerciseKey,
    difficulty,
  };

  els.exerciseTitle.textContent = exercise.title;
  els.promptText.textContent = exercise.prompt;
  renderAnswers(question.choices);
  setFeedback('Fresh prompt loaded. Press play if you want another listen.', 'neutral');
  playCurrent(false);
}

function renderAnswers(choices) {
  els.answerGrid.innerHTML = '';
  choices.forEach((choice) => {
    const button = document.createElement('button');
    button.className = 'answer-btn';
    button.textContent = choice;
    button.addEventListener('click', () => submitAnswer(choice, button));
    els.answerGrid.appendChild(button);
  });
}

function submitAnswer(choice, buttonEl) {
  if (!state.currentQuestion) return;

  const isCorrect = choice === state.currentQuestion.answer;
  const buttons = [...els.answerGrid.querySelectorAll('button')];

  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === state.currentQuestion.answer) btn.classList.add('correct');
  });

  if (!isCorrect) buttonEl.classList.add('wrong');

  updateProgress(isCorrect);

  const prefix = isCorrect ? sample(praiseLines) : sample(recoveryLines);
  const message = isCorrect
    ? `${prefix} It was ${state.currentQuestion.answer}. +${coinReward()} coins.`
    : `${prefix} Correct answer: ${state.currentQuestion.answer}.`;

  setFeedback(message, isCorrect ? 'correct' : 'wrong');

  window.setTimeout(createQuestion, 1050);
}

function playCurrent(referenceOnly = false) {
  if (!state.currentQuestion) return;
  const audio = getAudioContext();
  const instrument = els.instrumentSelect.value;
  if (referenceOnly) state.currentQuestion.playReference(audio, instrument);
  else state.currentQuestion.play(audio, instrument);
}

function getAudioContext() {
  if (!state.audioContext) {
    state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (state.audioContext.state === 'suspended') state.audioContext.resume();
  return state.audioContext;
}

function playNote(audio, midiNote, offsetSeconds, durationSeconds, waveType, gainAmount = 0.18) {
  const oscillator = audio.createOscillator();
  const gain = audio.createGain();
  const filter = audio.createBiquadFilter();

  oscillator.type = waveType;
  oscillator.frequency.value = 440 * Math.pow(2, (midiNote - 69) / 12);
  filter.type = 'lowpass';
  filter.frequency.value = waveType === 'square' ? 1800 : 2600;

  gain.gain.setValueAtTime(0.0001, audio.currentTime + offsetSeconds);
  gain.gain.exponentialRampToValueAtTime(gainAmount, audio.currentTime + offsetSeconds + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + offsetSeconds + durationSeconds);

  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(audio.destination);

  oscillator.start(audio.currentTime + offsetSeconds);
  oscillator.stop(audio.currentTime + offsetSeconds + durationSeconds + 0.05);
}

function updateProgress(isCorrect) {
  const today = todayKey();
  const exerciseKey = state.currentQuestion.exerciseKey;
  const exerciseStats = state.progress.byExercise[exerciseKey] || { correct: 0, total: 0 };

  state.progress.total += 1;
  if (isCorrect) {
    state.progress.correct += 1;
    state.progress.combo += 1;
    state.progress.coins += coinReward();
  } else {
    state.progress.combo = 0;
  }

  state.progress.bestCombo = Math.max(state.progress.bestCombo || 0, state.progress.combo || 0);
  exerciseStats.total += 1;
  if (isCorrect) exerciseStats.correct += 1;
  state.progress.byExercise[exerciseKey] = exerciseStats;

  state.progress.history[today] = (state.progress.history[today] || 0) + 1;
  state.progress.lastActiveDay = today;
  state.progress.streak = computeCurrentStreak(state.progress.history);
  state.progress.bestStreak = Math.max(state.progress.bestStreak || 0, state.progress.streak);

  saveProgress();
  refreshMeta();
}

function coinReward() {
  return 3 + Math.min(state.progress.combo || 0, 7);
}

function refreshMeta() {
  const exerciseKey = els.exerciseSelect.value;
  const exerciseStats = state.progress.byExercise[exerciseKey] || { correct: 0, total: 0 };
  const totalAccuracy = state.progress.total ? Math.round((state.progress.correct / state.progress.total) * 100) : 0;
  const exerciseAccuracy = exerciseStats.total ? Math.round((exerciseStats.correct / exerciseStats.total) * 100) : 0;

  els.streakValue.textContent = `${state.progress.streak || 0} day${state.progress.streak === 1 ? '' : 's'}`;
  els.accuracyValue.textContent = `${totalAccuracy}%`;
  els.coinsValue.textContent = String(state.progress.coins || 0);
  els.questionCounter.textContent = `${state.progress.total || 0} answered`;
  els.comboPill.textContent = `Combo x${state.progress.combo || 0}`;
  els.levelPill.textContent = difficultyLabels[els.difficultySelect.value];
  els.todayCount.textContent = `${state.progress.history[todayKey()] || 0} questions`;
  els.bestStreak.textContent = `${state.progress.bestStreak || 0} day${state.progress.bestStreak === 1 ? '' : 's'}`;
  els.exerciseAccuracy.textContent = `${exerciseAccuracy}% correct`;
  els.bestCombo.textContent = String(state.progress.bestCombo || 0);
  els.exerciseTitle.textContent = EXERCISES[exerciseKey].title;
  els.promptText.textContent = EXERCISES[exerciseKey].prompt;
}

function rotateQuest(forcedText) {
  els.questText.textContent = forcedText || sample(questLines);
}

function setFeedback(message, tone) {
  els.feedbackBox.className = `feedback-box ${tone}`;
  els.feedbackBox.innerHTML = `<strong>Status:</strong> <span>${message}</span>`;
}

function makeChoices(pool, answerLabel) {
  const labels = shuffle(pool.map((item) => item.label));
  const trimmed = labels.slice(0, Math.min(6, pool.length));
  if (!trimmed.includes(answerLabel)) {
    trimmed.pop();
    trimmed.push(answerLabel);
  }
  return shuffle(trimmed);
}

function loadProgress() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored) return { total: 0, correct: 0, combo: 0, bestCombo: 0, coins: 0, streak: 0, bestStreak: 0, byExercise: {}, history: {}, ...stored };
  } catch (_) {}
  return { total: 0, correct: 0, combo: 0, bestCombo: 0, coins: 0, streak: 0, bestStreak: 0, byExercise: {}, history: {} };
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function resetProgress() {
  if (!window.confirm('Reset all Earfrog progress on this device?')) return;
  state.progress = { total: 0, correct: 0, combo: 0, bestCombo: 0, coins: 0, streak: 0, bestStreak: 0, byExercise: {}, history: {} };
  saveProgress();
  rotateQuest();
  refreshMeta();
  setFeedback('Progress reset. Fresh pond, fresh ears.', 'neutral');
}

function computeCurrentStreak(history) {
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  while (history[dateKey(cursor)]) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function todayKey() {
  return dateKey(new Date());
}

function dateKey(date) {
  return date.toISOString().slice(0, 10);
}

function sample(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  const cloned = [...items];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
