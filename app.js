const STORAGE_KEY = 'earfrog-progress-v4';

const EXERCISES = {
  interval: {
    title: 'Interval recognition',
    prompt: 'Listen to the target and identify the interval quality.',
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
        landmarks: [
          { label: 'Minor 3rd', play: (audio, voice) => { playNote(audio, root, 0, 0.7, voice, 0.16); playNote(audio, root + 3, 0.85, 0.7, voice, 0.16); } },
          { label: 'Perfect 5th', play: (audio, voice) => { playNote(audio, root, 0, 0.7, voice, 0.16); playNote(audio, root + 7, 0.85, 0.7, voice, 0.16); } },
        ],
        playTarget(audio, voice) {
          playNote(audio, root, 0.0, 0.78, voice, 0.16);
          playNote(audio, root + answer.semitones, 0.95, 0.78, voice, 0.16);
        },
        playReference(audio, voice) {
          playNote(audio, root, 0.0, 1.0, voice, 0.18);
        },
      };
    },
  },
  chord: {
    title: 'Chord quality',
    prompt: 'Listen to the harmony and identify its quality.',
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
        landmarks: [
          { label: 'Major', play: (audio, voice) => [0, 4, 7].forEach((i) => playNote(audio, root + i, 0, 1.0, voice, 0.13)) },
          { label: 'Minor', play: (audio, voice) => [0, 3, 7].forEach((i) => playNote(audio, root + i, 0, 1.0, voice, 0.13)) },
        ],
        playTarget(audio, voice) {
          answer.intervals.forEach((interval) => playNote(audio, root + interval, 0.0, 1.12, voice, 0.13));
        },
        playReference(audio, voice) {
          playNote(audio, root, 0.0, 1.0, voice, 0.18);
        },
      };
    },
  },
  scale: {
    title: 'Scale / mode identification',
    prompt: 'Listen to the ascending line and identify the scale or mode.',
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
        landmarks: [
          { label: 'Major', play: (audio, voice) => [0, 2, 4, 5, 7, 9, 11, 12].forEach((s, i) => playNote(audio, root + s, i * 0.28, 0.24, voice, 0.12)) },
          { label: 'Natural Minor', play: (audio, voice) => [0, 2, 3, 5, 7, 8, 10, 12].forEach((s, i) => playNote(audio, root + s, i * 0.28, 0.24, voice, 0.12)) },
        ],
        playTarget(audio, voice) {
          answer.pattern.forEach((step, index) => playNote(audio, root + step, index * 0.35, 0.28, voice, 0.12));
        },
        playReference(audio, voice) {
          playNote(audio, root, 0.0, 1.0, voice, 0.18);
        },
      };
    },
  },
};

const difficultyLabels = { easy: 'Foundations', medium: 'Intermediate', hard: 'Advanced' };
const practiceNotes = [
  'Use reference and replay deliberately. Try to hear character before naming it.',
  'Eliminate what it cannot be before deciding what it is.',
  'Landmarks help when the sound is familiar but the label is not yet stable.',
  'A good round is one where you listened carefully, even if you missed it.',
];

const state = {
  audioContext: null,
  currentQuestion: null,
  progress: loadProgress(),
  selectedAnswer: null,
  eliminatedAnswers: new Set(),
};

const els = {
  exerciseSelect: document.getElementById('exerciseSelect'),
  difficultySelect: document.getElementById('difficultySelect'),
  instrumentSelect: document.getElementById('instrumentSelect'),
  roundModeSelect: document.getElementById('roundModeSelect'),
  newQuestionBtn: document.getElementById('newQuestionBtn'),
  replayBtn: document.getElementById('replayBtn'),
  playBtn: document.getElementById('playBtn'),
  playReferenceBtn: document.getElementById('playReferenceBtn'),
  resetProgressBtn: document.getElementById('resetProgressBtn'),
  heroStartBtn: document.getElementById('heroStartBtn'),
  dailyChallengeBtn: document.getElementById('dailyChallengeBtn'),
  submitAnswerBtn: document.getElementById('submitAnswerBtn'),
  answerGrid: document.getElementById('answerGrid'),
  feedbackBox: document.getElementById('feedbackBox'),
  exerciseTitle: document.getElementById('exerciseTitle'),
  promptText: document.getElementById('promptText'),
  streakValue: document.getElementById('streakValue'),
  accuracyValue: document.getElementById('accuracyValue'),
  correctValue: document.getElementById('correctValue'),
  questionCounter: document.getElementById('questionCounter'),
  comboPill: document.getElementById('comboPill'),
  levelPill: document.getElementById('levelPill'),
  todayCount: document.getElementById('todayCount'),
  bestStreak: document.getElementById('bestStreak'),
  exerciseAccuracy: document.getElementById('exerciseAccuracy'),
  bestCombo: document.getElementById('bestCombo'),
  questText: document.getElementById('questText'),
  roundSteps: document.getElementById('roundSteps'),
  landmarkPanel: document.getElementById('landmarkPanel'),
  landmarkA: document.getElementById('landmarkA'),
  landmarkB: document.getElementById('landmarkB'),
};

init();

function init() {
  bindEvents();
  rotatePracticeNote();
  refreshMeta();
  createQuestion();
}

function bindEvents() {
  els.exerciseSelect.addEventListener('change', handleModeChange);
  els.difficultySelect.addEventListener('change', handleModeChange);
  els.roundModeSelect.addEventListener('change', createQuestion);
  els.newQuestionBtn.addEventListener('click', createQuestion);
  els.replayBtn.addEventListener('click', replayRound);
  els.playBtn.addEventListener('click', playTarget);
  els.playReferenceBtn.addEventListener('click', playReference);
  els.resetProgressBtn.addEventListener('click', resetProgress);
  els.heroStartBtn.addEventListener('click', createQuestion);
  els.dailyChallengeBtn.addEventListener('click', activateFocusedSet);
  els.submitAnswerBtn.addEventListener('click', submitAnswer);
  els.landmarkA.addEventListener('click', () => playLandmark(0));
  els.landmarkB.addEventListener('click', () => playLandmark(1));
}

function handleModeChange() {
  refreshMeta();
  createQuestion();
}

function activateFocusedSet() {
  const modes = ['interval', 'chord', 'scale'];
  els.exerciseSelect.value = modes[new Date().getDate() % modes.length];
  els.difficultySelect.value = 'hard';
  els.roundModeSelect.value = 'landmark';
  rotatePracticeNote('Focused set: compare against landmarks, then commit with intention.');
  refreshMeta();
  createQuestion();
}

function createQuestion() {
  const exerciseKey = els.exerciseSelect.value;
  const difficulty = els.difficultySelect.value;
  const exercise = EXERCISES[exerciseKey];
  const question = exercise.buildQuestion(exercise.pools[difficulty]);

  state.currentQuestion = { ...question, exerciseKey, difficulty };
  state.selectedAnswer = null;
  state.eliminatedAnswers = new Set();

  els.exerciseTitle.textContent = exercise.title;
  els.promptText.textContent = buildPrompt();
  els.landmarkPanel.classList.toggle('hidden', els.roundModeSelect.value !== 'landmark');
  els.landmarkA.textContent = question.landmarks?.[0] ? `Play ${question.landmarks[0].label}` : 'Play landmark A';
  els.landmarkB.textContent = question.landmarks?.[1] ? `Play ${question.landmarks[1].label}` : 'Play landmark B';
  renderAnswers(question.choices);
  setFeedback('New round ready. Hear the reference, then the target.', 'neutral');
  setStep(1);
  replayRound();
}

function buildPrompt() {
  const mode = els.roundModeSelect.value;
  if (mode === 'elimination') return 'Listen, remove the answers that clearly do not fit, then submit your final choice.';
  if (mode === 'landmark') return 'Listen to the target, compare it against the landmarks, then choose the best answer.';
  return 'Listen carefully, then choose the best match.';
}

function renderAnswers(choices) {
  els.answerGrid.innerHTML = '';
  choices.forEach((choice) => {
    const button = document.createElement('button');
    button.className = 'answer-btn';
    button.textContent = choice;
    button.addEventListener('click', () => onAnswerClick(choice, button));
    els.answerGrid.appendChild(button);
  });
}

function onAnswerClick(choice, button) {
  if (!state.currentQuestion) return;
  const mode = els.roundModeSelect.value;

  if (mode === 'elimination') {
    if (state.eliminatedAnswers.has(choice)) {
      state.eliminatedAnswers.delete(choice);
      button.classList.remove('eliminated');
    } else if (state.selectedAnswer === choice) {
      state.selectedAnswer = null;
      button.classList.remove('selected');
    } else if (state.eliminatedAnswers.size < Math.max(1, Math.floor(state.currentQuestion.choices.length / 2))) {
      state.eliminatedAnswers.add(choice);
      button.classList.add('eliminated');
    } else {
      selectAnswer(choice);
    }
  } else {
    selectAnswer(choice);
  }
}

function selectAnswer(choice) {
  state.selectedAnswer = choice;
  [...els.answerGrid.querySelectorAll('button')].forEach((btn) => btn.classList.toggle('selected', btn.textContent === choice));
}

function submitAnswer() {
  if (!state.currentQuestion || !state.selectedAnswer) {
    setFeedback('Select an answer before submitting.', 'neutral');
    return;
  }

  const isCorrect = state.selectedAnswer === state.currentQuestion.answer;
  const buttons = [...els.answerGrid.querySelectorAll('button')];
  buttons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === state.currentQuestion.answer) btn.classList.add('correct');
    if (btn.textContent === state.selectedAnswer && !isCorrect) btn.classList.add('wrong');
  });

  updateProgress(isCorrect);
  setFeedback(isCorrect ? `Correct. ${state.currentQuestion.answer}.` : `Not quite. Correct answer: ${state.currentQuestion.answer}.`, isCorrect ? 'correct' : 'wrong');
  setStep(3);
  window.setTimeout(createQuestion, 1250);
}

function replayRound() {
  playReference();
  window.setTimeout(playTarget, 1000);
}

function playReference() {
  if (!state.currentQuestion) return;
  setStep(1);
  const audio = getAudioContext();
  state.currentQuestion.playReference(audio, els.instrumentSelect.value);
}

function playTarget() {
  if (!state.currentQuestion) return;
  setStep(2);
  const audio = getAudioContext();
  state.currentQuestion.playTarget(audio, els.instrumentSelect.value);
}

function playLandmark(index) {
  if (!state.currentQuestion?.landmarks?.[index]) return;
  const audio = getAudioContext();
  state.currentQuestion.landmarks[index].play(audio, els.instrumentSelect.value);
}

function setStep(active) {
  [...els.roundSteps.children].forEach((step, index) => step.classList.toggle('active', index === active - 1));
}

function getAudioContext() {
  if (!state.audioContext) state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (state.audioContext.state === 'suspended') state.audioContext.resume();
  return state.audioContext;
}

function playNote(audio, midiNote, offsetSeconds, durationSeconds, voice, gainAmount = 0.18) {
  const start = audio.currentTime + offsetSeconds;
  const frequency = 440 * Math.pow(2, (midiNote - 69) / 12);
  const output = audio.createGain();
  const filter = audio.createBiquadFilter();
  const tone = getVoiceDefinition(voice);

  output.gain.setValueAtTime(0.0001, start);
  output.gain.exponentialRampToValueAtTime(gainAmount, start + tone.attack);
  output.gain.exponentialRampToValueAtTime(gainAmount * tone.sustain, start + Math.max(tone.attack + 0.06, durationSeconds * 0.45));
  output.gain.exponentialRampToValueAtTime(0.0001, start + durationSeconds);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(tone.filter, start);
  filter.Q.value = tone.q;

  tone.partials.forEach((partial) => {
    const osc = audio.createOscillator();
    const partialGain = audio.createGain();
    osc.type = partial.type;
    osc.frequency.setValueAtTime(frequency * partial.ratio, start);
    if (partial.detune) osc.detune.setValueAtTime(partial.detune, start);
    partialGain.gain.setValueAtTime(partial.gain, start);
    osc.connect(partialGain);
    partialGain.connect(filter);
    osc.start(start);
    osc.stop(start + durationSeconds + tone.release);
  });

  filter.connect(output);
  output.connect(audio.destination);
}

function getVoiceDefinition(voice) {
  const voices = {
    warm: { attack: 0.02, sustain: 0.52, release: 0.2, filter: 2400, q: 0.7, partials: [{ type: 'triangle', ratio: 1, gain: 0.72 }, { type: 'sine', ratio: 2, gain: 0.18, detune: 3 }, { type: 'sine', ratio: 0.5, gain: 0.12 }] },
    bell: { attack: 0.005, sustain: 0.32, release: 0.35, filter: 4200, q: 1.3, partials: [{ type: 'sine', ratio: 1, gain: 0.65 }, { type: 'sine', ratio: 2.01, gain: 0.24 }, { type: 'sine', ratio: 3.97, gain: 0.12 }] },
    organ: { attack: 0.01, sustain: 0.82, release: 0.12, filter: 3000, q: 0.9, partials: [{ type: 'sine', ratio: 1, gain: 0.58 }, { type: 'sine', ratio: 2, gain: 0.22 }, { type: 'triangle', ratio: 4, gain: 0.08 }] },
    sine: { attack: 0.02, sustain: 0.7, release: 0.12, filter: 2800, q: 0.8, partials: [{ type: 'sine', ratio: 1, gain: 0.8 }] },
  };
  return voices[voice] || voices.warm;
}

function updateProgress(isCorrect) {
  const today = todayKey();
  const exerciseKey = state.currentQuestion.exerciseKey;
  const exerciseStats = state.progress.byExercise[exerciseKey] || { correct: 0, total: 0 };
  state.progress.total += 1;
  if (isCorrect) { state.progress.correct += 1; state.progress.combo += 1; } else { state.progress.combo = 0; }
  state.progress.bestCombo = Math.max(state.progress.bestCombo || 0, state.progress.combo || 0);
  exerciseStats.total += 1;
  if (isCorrect) exerciseStats.correct += 1;
  state.progress.byExercise[exerciseKey] = exerciseStats;
  state.progress.history[today] = (state.progress.history[today] || 0) + 1;
  state.progress.streak = computeCurrentStreak(state.progress.history);
  state.progress.bestStreak = Math.max(state.progress.bestStreak || 0, state.progress.streak);
  saveProgress();
  refreshMeta();
}

function refreshMeta() {
  const exerciseKey = els.exerciseSelect.value;
  const exerciseStats = state.progress.byExercise[exerciseKey] || { correct: 0, total: 0 };
  const totalAccuracy = state.progress.total ? Math.round((state.progress.correct / state.progress.total) * 100) : 0;
  const exerciseAccuracy = exerciseStats.total ? Math.round((exerciseStats.correct / exerciseStats.total) * 100) : 0;
  els.streakValue.textContent = `${state.progress.streak || 0} day${state.progress.streak === 1 ? '' : 's'}`;
  els.accuracyValue.textContent = `${totalAccuracy}%`;
  els.correctValue.textContent = String(state.progress.correct || 0);
  els.questionCounter.textContent = `${state.progress.total || 0} answered`;
  els.comboPill.textContent = `Current streak ${state.progress.combo || 0}`;
  els.levelPill.textContent = difficultyLabels[els.difficultySelect.value];
  els.todayCount.textContent = `${state.progress.history[todayKey()] || 0} questions`;
  els.bestStreak.textContent = `${state.progress.bestStreak || 0} day${state.progress.bestStreak === 1 ? '' : 's'}`;
  els.exerciseAccuracy.textContent = `${exerciseAccuracy}% correct`;
  els.bestCombo.textContent = String(state.progress.bestCombo || 0);
  els.exerciseTitle.textContent = EXERCISES[exerciseKey].title;
}

function rotatePracticeNote(forcedText) {
  els.questText.textContent = forcedText || sample(practiceNotes);
}

function setFeedback(message, tone) {
  els.feedbackBox.className = `feedback-box ${tone}`;
  els.feedbackBox.innerHTML = `<strong>Status:</strong> <span>${message}</span>`;
}

function makeChoices(pool, answerLabel) {
  const labels = shuffle(pool.map((item) => item.label));
  const trimmed = labels.slice(0, Math.min(6, pool.length));
  if (!trimmed.includes(answerLabel)) { trimmed.pop(); trimmed.push(answerLabel); }
  return shuffle(trimmed);
}

function loadProgress() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored) return { total: 0, correct: 0, combo: 0, bestCombo: 0, streak: 0, bestStreak: 0, byExercise: {}, history: {}, ...stored };
  } catch (_) {}
  return { total: 0, correct: 0, combo: 0, bestCombo: 0, streak: 0, bestStreak: 0, byExercise: {}, history: {} };
}

function saveProgress() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress)); }

function resetProgress() {
  if (!window.confirm('Reset all progress on this device?')) return;
  state.progress = { total: 0, correct: 0, combo: 0, bestCombo: 0, streak: 0, bestStreak: 0, byExercise: {}, history: {} };
  saveProgress();
  rotatePracticeNote();
  refreshMeta();
  setFeedback('Progress reset.', 'neutral');
}

function computeCurrentStreak(history) {
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  while (history[dateKey(cursor)]) { streak += 1; cursor.setDate(cursor.getDate() - 1); }
  return streak;
}

function todayKey() { return dateKey(new Date()); }
function dateKey(date) { return date.toISOString().slice(0, 10); }
function sample(items) { return items[Math.floor(Math.random() * items.length)]; }
function shuffle(items) { const cloned = [...items]; for (let i = cloned.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [cloned[i], cloned[j]] = [cloned[j], cloned[i]]; } return cloned; }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
