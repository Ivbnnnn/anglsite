const $ = (id) => document.getElementById(id);
const total = verbs.length;
const storageKey = 'verb-practice-unlearned-v1';
const knownVerbs = new Set(verbs.map((verb) => verb.v1));
function loadUnlearned() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return new Set(Array.isArray(saved) ? saved.filter((v1) => knownVerbs.has(v1)) : []);
  } catch {
    return new Set();
  }
}
const state = { index: 0, checked: false, answers: [], view: 'intro', previousView: 'intro', unlearned: loadUnlearned() };
const normalize = (value) => value.trim().toLowerCase().replace(/\s+/g, ' ');
const accepts = (value, options) => options.some((option) => normalize(value) === normalize(option));

if (total !== 164) throw new Error(`Expected 164 verbs; found ${total}`);

function show(section) {
  state.view = section;
  for (const id of ['intro', 'practice', 'results', 'unlearned']) $(id).classList.toggle('hidden', id !== section);
}

function updateMarkButton() {
  const marked = state.unlearned.has(verbs[state.index].v1);
  $('mark-button').textContent = marked ? '✓ В невыученных — убрать' : '＋ Добавить в невыученные';
  $('mark-button').setAttribute('aria-pressed', String(marked));
}

function saveUnlearned() {
  $('unlearned-count').textContent = state.unlearned.size;
  try {
    localStorage.setItem(storageKey, JSON.stringify([...state.unlearned]));
  } catch {
    $('add-unlearned-message').textContent = 'Не удалось сохранить список в этом браузере. Проверь разрешение на локальное хранение данных.';
  }
  updateMarkButton();
  if (state.view === 'unlearned') renderUnlearned();
}

function setUnlearned(v1, marked) {
  if (marked) state.unlearned.add(v1);
  else state.unlearned.delete(v1);
  saveUnlearned();
}

function renderUnlearned() {
  const items = verbs.filter((verb) => state.unlearned.has(verb.v1));
  $('empty-list').classList.toggle('hidden', items.length > 0);
  $('unlearned-list').replaceChildren(...items.map((verb) => {
    const row = document.createElement('div');
    row.className = 'unlearned-row';
    const words = document.createElement('div');
    const title = document.createElement('strong');
    title.textContent = verb.v1;
    title.dataset.lookupTerm = verb.v1;
    title.classList.add('lookup-term');
    const translation = document.createElement('span');
    translation.textContent = verb.ru;
    const forms = document.createElement('small');
    forms.textContent = `${verb.v2.join(' / ')} · ${verb.v3.join(' / ')}`;
    words.append(title, translation, forms);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove-button';
    remove.textContent = 'Удалить';
    remove.setAttribute('aria-label', `Удалить ${verb.v1} из невыученных`);
    remove.addEventListener('click', () => setUnlearned(verb.v1, false));
    row.append(words, remove);
    return row;
  }));
}

function start() {
  state.index = 0;
  state.checked = false;
  state.answers = [];
  show('practice');
  renderQuestion();
}

function renderQuestion() {
  const item = verbs[state.index];
  state.checked = false;
  $('verb').textContent = item.v1;
  $('verb').dataset.lookupTerm = item.v1;
  $('translation').textContent = item.ru;
  updateMarkButton();
  $('counter').textContent = `${String(state.index + 1).padStart(2, '0')} / ${total}`;
  $('progress-track').setAttribute('aria-valuenow', String(state.index));
  $('progress-fill').style.width = `${state.index / total * 100}%`;
  $('correct-stat').textContent = `${state.answers.filter((answer) => answer.bothCorrect).length} верно`;
  $('mistake-stat').textContent = `${state.answers.filter((answer) => !answer.bothCorrect).length} с ошибкой`;
  for (const field of ['v2', 'v3']) {
    $(field).value = '';
    $(field).readOnly = false;
    $(field).className = '';
    $(`${field}-feedback`).textContent = '';
    $(`${field}-feedback`).className = 'feedback';
  }
  $('action-button').innerHTML = 'Проверить <span aria-hidden="true">→</span>';
  $('form-hint').textContent = 'Нажми Enter, даже если курсор находится в поле ввода.';
  $('v2').focus();
}

function check() {
  const item = verbs[state.index];
  const v2 = $('v2').value;
  const v3 = $('v3').value;
  const v2Correct = accepts(v2, item.v2);
  const v3Correct = accepts(v3, item.v3);
  state.answers.push({ item, v2, v3, v2Correct, v3Correct, bothCorrect: v2Correct && v3Correct });
  if (!v2Correct || !v3Correct) setUnlearned(item.v1, true);
  state.checked = true;
  for (const [field, correct] of [['v2', v2Correct], ['v3', v3Correct]]) {
    $(field).readOnly = true;
    $(field).classList.add(correct ? 'is-correct' : 'is-wrong');
    const feedback = $(`${field}-feedback`);
    feedback.classList.add(correct ? 'correct' : 'wrong');
    feedback.textContent = correct ? '✓ Верно' : `Правильно: ${item[field].join(' / ')}`;
  }
  $('action-button').innerHTML = state.index === total - 1
    ? 'Посмотреть итоги <span aria-hidden="true">→</span>'
    : 'Следующий глагол <span aria-hidden="true">→</span>';
  $('form-hint').textContent = 'Enter — следующий глагол.';
  $('progress-track').setAttribute('aria-valuenow', String(state.index + 1));
  $('progress-fill').style.width = `${(state.index + 1) / total * 100}%`;
  $('correct-stat').textContent = `${state.answers.filter((answer) => answer.bothCorrect).length} верно`;
  $('mistake-stat').textContent = `${state.answers.filter((answer) => !answer.bothCorrect).length} с ошибкой`;
  $('action-button').focus();
}

function next() {
  if (state.index === total - 1) return showResults();
  state.index += 1;
  renderQuestion();
}

function showResults() {
  show('results');
  const correct = state.answers.filter((answer) => answer.bothCorrect).length;
  const mistakes = state.answers.filter((answer) => !answer.bothCorrect);
  const correctForms = state.answers.reduce((sum, answer) => sum + Number(answer.v2Correct) + Number(answer.v3Correct), 0);
  $('result-correct').textContent = correct;
  $('result-mistakes').textContent = mistakes.length;
  $('result-percent').textContent = `${(correctForms / (total * 2) * 100).toFixed(correctForms === total * 2 ? 0 : 1)}%`;
  $('results-copy').textContent = mistakes.length
    ? `Ты прошёл все ${total} глагола. Ниже — слова, к которым стоит вернуться.`
    : 'Без ошибок! Ты правильно написал обе формы каждого глагола.';
  $('review').classList.toggle('hidden', mistakes.length === 0);
  $('review-list').replaceChildren(...mistakes.map((answer) => {
    const row = document.createElement('div');
    row.className = 'review-row';
    const title = document.createElement('strong');
    title.textContent = answer.item.v1;
    title.dataset.lookupTerm = answer.item.v1;
    title.classList.add('lookup-term');
    const detail = document.createElement('span');
    detail.textContent = `${answer.item.v2.join(' / ')} · ${answer.item.v3.join(' / ')}`;
    const yours = document.createElement('small');
    yours.textContent = `Твой ответ: ${answer.v2.trim() || '—'} · ${answer.v3.trim() || '—'}`;
    row.append(title, detail, yours);
    return row;
  }));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  $('restart-button').focus();
}

$('start-button').addEventListener('click', start);
$('restart-button').addEventListener('click', start);
$('mark-button').addEventListener('click', () => {
  const v1 = verbs[state.index].v1;
  setUnlearned(v1, !state.unlearned.has(v1));
});
$('open-unlearned').addEventListener('click', () => {
  if (state.view !== 'unlearned') state.previousView = state.view;
  $('add-unlearned-message').textContent = '';
  renderUnlearned();
  show('unlearned');
  $('back-button').focus();
});
$('back-button').addEventListener('click', () => show(state.previousView));
$('add-unlearned-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const v1 = normalize($('add-unlearned-input').value);
  if (!knownVerbs.has(v1)) {
    $('add-unlearned-message').textContent = 'Выбери глагол из списка 164 слов.';
    return;
  }
  if (state.unlearned.has(v1)) {
    $('add-unlearned-message').textContent = `${v1} уже в списке.`;
    return;
  }
  $('add-unlearned-message').textContent = '';
  $('add-unlearned-input').value = '';
  setUnlearned(v1, true);
});
for (const verb of verbs) {
  const option = document.createElement('option');
  option.value = verb.v1;
  $('verb-options').append(option);
}
$('unlearned-count').textContent = state.unlearned.size;
$('answer-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (state.checked) next();
  else check();
});

// Keep Enter useful after checking, even if an input still has focus.
$('answer-form').addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' || event.isComposing) return;
  if (state.checked) {
    event.preventDefault();
    next();
  }
});
