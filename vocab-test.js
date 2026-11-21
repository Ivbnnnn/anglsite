const $ = (id) => document.getElementById(id);
const testState = { view: 'setup', selected: [], direction: 'ru-en', queue: [], studyQueue: [], random: false, index: 0, checked: false, answers: [] };

function showView(view) {
  testState.view = view;
  for (const id of ['setup', 'quiz', 'test-results']) $(id).classList.toggle('hidden', id !== (view === 'results' ? 'test-results' : view));
}
function selectedTopics() {
  return [...document.querySelectorAll('.topic-option input:checked')].map((input) => input.value);
}
function selectedOrigins() {
  return [
    $('source-book').checked && 'core',
    $('source-ielts').checked && 'advanced',
  ].filter(Boolean);
}
function updateSelection() {
  const topics = selectedTopics();
  const origins = selectedOrigins();
  const count = buildQueue(topics, origins).length;
  $('selection-count').textContent = `${topics.length} из ${vocabularyTopics.length} выбрано`;
  $('start-test').disabled = count === 0;
  $('setup-note').textContent = !topics.length ? 'Выбери хотя бы одну тему.' : !origins.length ? 'Выбери хотя бы один источник.' : `${count} выражений в одном сеансе.`;
  for (const label of $('topic-options').children) {
    const topic = vocabularyTopics.find((item) => item.id === label.children[0].value);
    label.children[1].children[1].textContent = `${topic.words.filter((word) => origins.includes(word.origin)).length} выражений`;
  }
}
function renderOptions() {
  const params = new URLSearchParams(location.search);
  const requested = new Set((params.get('topics') || '').split(',').filter(Boolean));
  $('topic-options').replaceChildren(...vocabularyTopics.map((topic) => {
    const label = document.createElement('label');
    label.className = 'topic-option';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = topic.id;
    input.checked = requested.has(topic.id);
    input.addEventListener('change', updateSelection);
    const body = document.createElement('span');
    const title = document.createElement('strong');
    title.textContent = topic.title;
    const count = document.createElement('small');
    count.textContent = `${topic.words.length} выражений`;
    body.append(title, count);
    label.append(input, body);
    return label;
  }));
  updateSelection();
}

function normalize(value, language) {
  let text = value.trim().toLocaleLowerCase().replace(/ё/g, 'е').replace(/[’‘]/g, "'");
  text = text.replace(/[.!?]+$/g, '').replace(/\s+/g, ' ');
  if (language === 'en') text = text.replace(/^(?:to |an? |the )/, '');
  return text;
}
function acceptedAnswers(word, direction) {
  const expected = direction === 'ru-en' ? word.en : word.ru;
  const parts = expected.split(/\s*(?:,|;|\/)\s*/).filter(Boolean);
  return [expected, ...parts];
}
function isCorrect(value, word, direction) {
  const language = direction === 'ru-en' ? 'en' : 'ru';
  const answer = normalize(value, language);
  return answer.length > 0 && acceptedAnswers(word, direction).some((option) => normalize(option, language) === answer);
}
function buildQueue(topicIds, origins = selectedOrigins()) {
  const selected = vocabularyTopics.filter((topic) => topicIds.includes(topic.id));
  return selected.flatMap((topic) => topic.words.filter((word) => origins.includes(word.origin)).map((word) => ({ ...word, topic: topic.title })));
}
function begin(queue, direction, topicIds) {
  testState.selected = topicIds;
  testState.direction = direction;
  testState.studyQueue = [...queue];
  testState.queue = testState.random ? practiceOrder.reorder([...queue], 0, true, queue) : [...queue];
  testState.index = 0;
  testState.checked = false;
  testState.answers = [];
  $('quiz-progress').setAttribute('aria-valuemax', String(queue.length));
  showView('quiz');
  renderQuestion();
}
function renderQuestion() {
  const item = testState.queue[testState.index];
  testState.checked = false;
  $('quiz-prompt').textContent = testState.direction === 'ru-en' ? item.ru : item.en;
  $('quiz-direction').textContent = testState.direction === 'ru-en' ? 'РУССКИЙ → АНГЛИЙСКИЙ' : 'АНГЛИЙСКИЙ → РУССКИЙ';
  $('quiz-answer-label').textContent = testState.direction === 'ru-en' ? 'Напиши по-английски' : 'Напиши по-русски';
  $('quiz-topic-name').textContent = item.topic;
  $('quiz-topic').textContent = testState.selected.length === 1 ? item.topic.toUpperCase() : 'ВЫБРАННЫЕ ТЕМЫ';
  $('quiz-counter').textContent = `${testState.index + 1} / ${testState.queue.length}`;
  $('quiz-progress').setAttribute('aria-valuenow', String(testState.index));
  $('quiz-progress-fill').style.width = `${testState.index / testState.queue.length * 100}%`;
  $('quiz-answer').value = '';
  $('quiz-answer').readOnly = false;
  $('quiz-answer').className = '';
  $('quiz-feedback').textContent = '';
  $('quiz-feedback').className = 'quiz-feedback';
  $('quiz-action').innerHTML = 'Проверить <span aria-hidden="true">→</span>';
  $('quiz-answer').focus();
}
function checkAnswer() {
  const item = testState.queue[testState.index];
  const answer = $('quiz-answer').value;
  const correct = isCorrect(answer, item, testState.direction);
  const expected = testState.direction === 'ru-en' ? item.en : item.ru;
  testState.answers.push({ item, answer, correct, expected });
  testState.checked = true;
  $('quiz-answer').readOnly = true;
  $('quiz-answer').classList.add(correct ? 'is-correct' : 'is-wrong');
  $('quiz-feedback').classList.add(correct ? 'correct' : 'wrong');
  $('quiz-feedback').textContent = correct ? '✓ Верно' : `Правильно: ${expected}`;
  $('quiz-action').innerHTML = testState.index === testState.queue.length - 1
    ? 'Посмотреть итоги <span aria-hidden="true">→</span>'
    : 'Следующее выражение <span aria-hidden="true">→</span>';
  $('quiz-progress').setAttribute('aria-valuenow', String(testState.index + 1));
  $('quiz-progress-fill').style.width = `${(testState.index + 1) / testState.queue.length * 100}%`;
  $('quiz-action').focus();
}
function nextQuestion() {
  if (testState.index === testState.queue.length - 1) return showResults();
  testState.index++;
  renderQuestion();
}
function showResults() {
  showView('results');
  const wrong = testState.answers.filter((entry) => !entry.correct);
  const correct = testState.answers.length - wrong.length;
  $('test-correct').textContent = correct;
  $('test-errors').textContent = wrong.length;
  $('test-accuracy').textContent = `${Math.round(correct / testState.answers.length * 100)}%`;
  $('test-result-copy').textContent = `Проверено ${testState.answers.length} выражений по ${testState.selected.length} темам. ${wrong.length ? 'Ошибки можно повторить ниже.' : 'Все ответы верны!'}`;
  $('retry-errors').classList.toggle('hidden', wrong.length === 0);
  $('test-review').replaceChildren(...wrong.map((entry) => {
    const row = document.createElement('div');
    row.className = 'test-review-row';
    const label = document.createElement('small');
    label.textContent = entry.item.topic;
    const prompt = document.createElement('strong');
    prompt.textContent = testState.direction === 'ru-en' ? entry.item.ru : entry.item.en;
    const expected = document.createElement('span');
    expected.textContent = `Правильно: ${entry.expected}`;
    const yours = document.createElement('span');
    yours.textContent = `Твой ответ: ${entry.answer.trim() || '—'}`;
    row.append(label, prompt, expected, yours);
    return row;
  }));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

$('select-all').addEventListener('click', () => { for (const input of document.querySelectorAll('.topic-option input')) input.checked = true; updateSelection(); });
$('clear-all').addEventListener('click', () => { for (const input of document.querySelectorAll('.topic-option input')) input.checked = false; updateSelection(); });
$('source-book').addEventListener('change', updateSelection);
$('source-ielts').addEventListener('change', updateSelection);
$('start-test').addEventListener('click', () => {
  const topicIds = selectedTopics();
  if (!topicIds.length || !selectedOrigins().length) return;
  const direction = document.querySelector('input[name="direction"]:checked').value;
  begin(buildQueue(topicIds), direction, topicIds);
});
practiceOrder.updateButton($('vocab-order'), testState.random);
$('vocab-order').addEventListener('click', () => {
  testState.random = !testState.random;
  const keepCurrent = testState.checked || $('quiz-answer').value.trim();
  testState.queue = practiceOrder.reorder(testState.queue, testState.index + Number(Boolean(keepCurrent)), testState.random, testState.studyQueue);
  practiceOrder.updateButton($('vocab-order'), testState.random);
  if (!keepCurrent) renderQuestion();
});
$('quiz-form').addEventListener('submit', (event) => { event.preventDefault(); if (testState.checked) nextQuestion(); else checkAnswer(); });
$('quiz-form').addEventListener('keydown', (event) => { if (event.key === 'Enter' && !event.isComposing && testState.checked) { event.preventDefault(); nextQuestion(); } });
$('quit-test').addEventListener('click', () => showView('setup'));
$('new-test').addEventListener('click', () => showView('setup'));
$('retry-errors').addEventListener('click', () => begin(testState.answers.filter((entry) => !entry.correct).map((entry) => entry.item), testState.direction, testState.selected));
renderOptions();
