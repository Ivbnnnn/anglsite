function readNounRows(rows) {
  return rows.trim().split('\n').map((row) => row.split('|'));
}

function makeNounQuestion(type, sentence, answer, instruction, why) {
  const [before, after] = sentence.split('_');
  return { type, before, after, answers: answer.split('/'), instruction, why };
}

const nounReferenceGroups = nounReference.map(({ id, title, type, rows }) => ({
  id, title,
  entries: readNounRows(rows).map(([word, answers, sentence, note]) => {
    const pluralForm = type === 'forms';
    const instruction = pluralForm
      ? `Впиши множественное число слова ${word}.`
      : `Впиши форму be ${/^(was|were)$/.test(answers) ? 'в прошедшем' : 'в настоящем'} времени.`;
    const forms = answers.replaceAll('/', ' / ');
    const why = note || (pluralForm ? `${word} → ${forms}.` :
      `${word} согласуется с ${forms} в этом контексте.`);
    return { word, question: makeNounQuestion(type, sentence, answers, instruction, why) };
  }),
}));

const nounQuestions = [
  ...nounReferenceGroups.flatMap(({ entries }) => entries.map(({ question }) => question)),
  ...nounGrammar.flatMap(({ type, prompt, rows }) => readNounRows(rows).map(([sentence, answer, why, instruction]) =>
    makeNounQuestion(type, sentence, answer, instruction || prompt, why))),
];

function renderNounReference() {
  const container = nounEl('noun-reference');
  for (const { id, title, entries } of nounReferenceGroups) {
    const details = document.createElement('details');
    details.className = 'noun-reference-group';
    details.id = id;
    const heading = document.createElement('summary');
    heading.textContent = `${title} · ${entries.length}`;
    const table = document.createElement('table');
    table.className = 'grammar-table';
    const header = document.createElement('thead');
    const headerRow = document.createElement('tr');
    for (const label of ['Слово', 'Форма', 'Пример и пояснение']) {
      const cell = document.createElement('th');
      cell.scope = 'col';
      cell.textContent = label;
      headerRow.append(cell);
    }
    header.append(headerRow);
    const body = document.createElement('tbody');
    for (const { word, question } of entries) {
      const row = document.createElement('tr');
      const term = document.createElement('td');
      term.textContent = word;
      const form = document.createElement('td');
      form.textContent = question.answers.join(' / ');
      const example = document.createElement('td');
      const sentence = document.createElement('i');
      sentence.textContent = `${question.before}${question.answers[0]}${question.after}`;
      const explanation = document.createElement('small');
      explanation.textContent = question.why;
      example.append(sentence, explanation);
      row.append(term, form, example);
      body.append(row);
    }
    table.append(header, body);
    const wrapper = document.createElement('div');
    wrapper.className = 'grammar-table-wrap';
    wrapper.append(table);
    details.append(heading, wrapper);
    container.append(details);
  }
}

const nounEl = (id) => document.getElementById(id);
const nounTypeNames = {
  agreement: 'СОГЛАСОВАНИЕ',
  forms: 'ФОРМА СУЩЕСТВИТЕЛЬНОГО',
  usage: 'УПОТРЕБЛЕНИЕ',
  quantifiers: 'СЛОВА КОЛИЧЕСТВА',
  numerals: 'ЧИСЛИТЕЛЬНЫЕ',
  number: 'A NUMBER OF / THE NUMBER OF',
  amount: 'NUMBER OF / AMOUNT OF',
  participles: 'ПРИЧАСТИЯ',
};
let nounSession = [];
let nounStudySession = [];
let nounRandom = false;
let nounIndex = 0;
let nounChecked = false;
let nounAnswers = [];

function nounNormalize(value) { return value.trim().toLocaleLowerCase('en').replace(/\s+/g, ' ').replace(/[’]/g, "'"); }
function nounStart(questions) {
  nounStudySession = nounQuestions.filter((question) => questions.includes(question));
  nounSession = nounRandom ? practiceOrder.reorder([...nounStudySession], 0, true, nounStudySession) : [...nounStudySession];
  nounIndex = 0;
  nounChecked = false;
  nounAnswers = [];
  nounEl('nouns-setup').classList.add('hidden');
  nounEl('nouns-results').classList.add('hidden');
  nounEl('nouns-quiz').classList.remove('hidden');
  nounRender();
  nounEl('nouns-quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function nounRender() {
  const q = nounSession[nounIndex];
  nounChecked = false;
  nounEl('nouns-category').textContent = nounTypeNames[q.type];
  nounEl('nouns-counter').textContent = `${nounIndex + 1} / ${nounSession.length}`;
  nounEl('nouns-progress').setAttribute('aria-valuemax', String(nounSession.length));
  nounEl('nouns-progress').setAttribute('aria-valuenow', String(nounIndex));
  nounEl('nouns-progress-fill').style.width = `${nounIndex / nounSession.length * 100}%`;
  nounEl('nouns-instruction').textContent = q.instruction;
  nounEl('nouns-before').textContent = q.before;
  nounEl('nouns-after').textContent = q.after;
  nounEl('nouns-answer').value = '';
  nounEl('nouns-answer').className = '';
  nounEl('nouns-answer').readOnly = false;
  nounEl('nouns-feedback').textContent = '';
  nounEl('nouns-feedback').className = 'nouns-feedback';
  nounEl('nouns-action').innerHTML = 'Проверить <span aria-hidden="true">→</span>';
  nounEl('nouns-answer').focus();
}
function nounSubmit(event) {
  event.preventDefault();
  if (nounChecked) {
    if (nounIndex + 1 < nounSession.length) { nounIndex++; nounRender(); }
    else nounFinish();
    return;
  }
  const typed = nounEl('nouns-answer').value;
  if (!typed.trim()) { nounEl('nouns-feedback').textContent = 'Впиши ответ в пропуск.'; nounEl('nouns-answer').focus(); return; }
  const q = nounSession[nounIndex];
  const correct = q.answers.some((answer) => nounNormalize(answer) === nounNormalize(typed));
  nounAnswers.push({ question: q, typed: typed.trim(), correct });
  nounChecked = true;
  nounEl('nouns-answer').readOnly = true;
  nounEl('nouns-answer').className = correct ? 'is-correct' : 'is-wrong';
  nounEl('nouns-feedback').className = `nouns-feedback ${correct ? 'correct' : 'wrong'}`;
  nounEl('nouns-feedback').textContent = `${correct ? 'Верно.' : `Правильно: ${q.answers.join(' / ')}.`} ${q.why}`;
  nounEl('nouns-action').innerHTML = nounIndex + 1 < nounSession.length ? 'Следующее <span aria-hidden="true">→</span>' : 'Показать итоги <span aria-hidden="true">→</span>';
  nounEl('nouns-action').focus();
}
function nounFinish() {
  nounEl('nouns-quiz').classList.add('hidden');
  nounEl('nouns-results').classList.remove('hidden');
  const correct = nounAnswers.filter((entry) => entry.correct).length;
  nounEl('nouns-score').textContent = `${correct} из ${nounAnswers.length} верно · ${Math.round(correct / nounAnswers.length * 100)}%`;
  const errors = nounAnswers.filter((entry) => !entry.correct);
  nounEl('nouns-review').replaceChildren(...errors.map(({ question, typed }) => {
    const row = document.createElement('article');
    const sentence = document.createElement('strong');
    sentence.textContent = `${question.before}${question.answers[0]}${question.after}`;
    const detail = document.createElement('p');
    detail.textContent = `Твой ответ: ${typed}. ${question.why}`;
    row.append(sentence, detail);
    return row;
  }));
  nounEl('nouns-retry').classList.toggle('hidden', !errors.length);
  nounEl('nouns-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function nounReset() {
  nounEl('nouns-quiz').classList.add('hidden');
  nounEl('nouns-results').classList.add('hidden');
  nounEl('nouns-setup').classList.remove('hidden');
  nounEl('nouns-setup').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
nounEl('nouns-start').addEventListener('click', () => {
  const selected = [...nounEl('nouns-setup').querySelectorAll('input:checked')].map((input) => input.value);
  if (!selected.length) { nounEl('nouns-setup-message').textContent = 'Выбери хотя бы один тип заданий.'; return; }
  nounEl('nouns-setup-message').textContent = '';
  const pool = nounQuestions.filter((q) => selected.includes(q.type));
  const size = nounEl('nouns-session-size').value;
  const ordered = nounRandom ? practiceOrder.reorder([...pool], 0, true, pool) : pool;
  const count = size === 'all' ? pool.length : Math.min(Number(size), pool.length);
  const questions = nounRandom ? ordered.slice(0, count) :
    Array.from({ length: count }, (_, index) => pool[Math.floor(index * pool.length / count)]);
  nounStart(questions);
});
practiceOrder.updateButton(nounEl('nouns-order'), nounRandom);
nounEl('nouns-order').addEventListener('click', () => {
  nounRandom = !nounRandom;
  const keepCurrent = nounChecked || nounEl('nouns-answer').value.trim();
  nounSession = practiceOrder.reorder(nounSession, nounIndex + Number(Boolean(keepCurrent)), nounRandom, nounStudySession);
  practiceOrder.updateButton(nounEl('nouns-order'), nounRandom);
  if (!keepCurrent) nounRender();
});
nounEl('nouns-form').addEventListener('submit', nounSubmit);
nounEl('nouns-form').addEventListener('keydown', (event) => {
  if (event.target === nounEl('nouns-answer') && event.key === 'Enter' && !event.isComposing && nounChecked) {
    nounSubmit(event);
  }
});
nounEl('nouns-exit').addEventListener('click', nounReset);
nounEl('nouns-new').addEventListener('click', nounReset);
nounEl('nouns-retry').addEventListener('click', () => nounStart(nounAnswers.filter((entry) => !entry.correct).map((entry) => entry.question)));
nounEl('nouns-total').textContent = nounQuestions.length;
renderNounReference();
