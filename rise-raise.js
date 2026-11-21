const riseQuestions = [
  { before: 'Yesterday, the sun ', after: ' at 6:12.', answer: 'rose', clue: 'Вчера · движение вверх', why: 'Past Simple от rise — rose.' },
  { before: 'Prices usually ', after: ' when demand exceeds supply.', answer: 'rise', clue: 'Цены растут сами · Present Simple', why: 'Rise не требует прямого дополнения: prices rise.' },
  { before: 'Average temperatures have ', after: ' by two degrees since 1990.', answer: 'risen', clue: 'С 1990 года · рост показателя', why: 'После have нужна третья форма rise — risen.' },
  { before: 'The water level is ', after: ' after days of rain.', answer: 'rising', clue: 'Сейчас · уровень повышается', why: 'Present Continuous от rise: is rising.' },
  { before: 'The crowd ', after: ' to its feet when the speaker entered.', answer: 'rose', clue: 'В прошлом · люди встали', why: 'Rise to one’s feet — встать. Past Simple: rose.' },
  { before: 'The company ', after: ' its prices last month.', answer: 'raised', clue: 'Компания повысила цены · Past Simple', why: 'Raise требует объект: raised its prices.' },
  { before: 'The government has ', after: ' taxes twice this year.', answer: 'raised', clue: 'Правительство повысило налоги', why: 'После has нужна третья форма raise — raised.' },
  { before: 'Please ', after: ' your hand if you have a question.', answer: 'raise', clue: 'Подними руку · повелительное наклонение', why: 'Raise your hand: действие направлено на объект.' },
  { before: 'The charity is ', after: ' funds for local schools.', answer: 'raising', clue: 'Сейчас собирает средства', why: 'Is raising funds — собирает деньги.' },
  { before: 'She ', after: ' an important question at the meeting.', answer: 'raised', clue: 'Она подняла вопрос · Past Simple', why: 'Raise a question — поднять вопрос; raised.' },
  { before: 'Housing costs ', after: ' sharply last year.', answer: 'rose', clue: 'В прошлом году · затраты выросли', why: 'Past Simple от rise — rose.' },
  { before: 'The manager plans to ', after: ' salaries next year.', answer: 'raise', clue: 'Руководитель повысит зарплаты', why: 'Raise salaries: есть прямое дополнение salaries.' },
  { before: 'The flag was ', after: ' at dawn.', answer: 'raised', clue: 'Флаг подняли · Passive Voice', why: 'Was raised: кто-то поднял флаг.' },
  { before: 'The hot-air balloon began to ', after: ' slowly.', answer: 'rise', clue: 'Шар сам движется вверх', why: 'После began to используется rise.' },
  { before: 'This training course ', after: ' awareness of online safety.', answer: 'raises', clue: 'Курс повышает осведомлённость', why: 'This course — единственное число: raises awareness.' },
  { before: 'Sales have ', after: ' since the new campaign began.', answer: 'risen', clue: 'Продажи выросли', why: 'После have нужна третья форма rise — risen.' },
  { before: 'We must ', after: ' awareness of air pollution.', answer: 'raise', clue: 'Нужно повысить осведомлённость', why: 'Raise awareness: есть прямое дополнение awareness.' },
  { before: 'The path ', after: ' steeply towards the summit.', answer: 'rises', clue: 'Тропа идёт вверх', why: 'С подлежащим the path в Present Simple: rises.' },
  { before: 'The central bank ', after: ' interest rates in March.', answer: 'raised', clue: 'Центральный банк повысил ставки', why: 'Raise interest rates: есть объект interest rates.' },
  { before: 'Many farmers ', after: ' cattle in this region.', answer: 'raise', clue: 'Фермеры разводят скот', why: 'Raise cattle — разводить животных; объект cattle.' },
  { before: 'The issue was ', after: ' during the meeting.', answer: 'raised', clue: 'Вопрос подняли · Passive Voice', why: 'Was raised: кто-то поднял вопрос.' },
  { before: 'Better training can ', after: ' professional standards.', answer: 'raise', clue: 'Обучение повышает стандарты', why: 'Raise standards: есть объект standards.' },
  { before: 'The campaign ', after: ' thousands of pounds for research.', answer: 'raised', clue: 'Кампания собрала деньги', why: 'Raised money: собрала средства.' },
  { before: 'Interest rates are ', after: ' steadily this year.', answer: 'rising', clue: 'Ставки растут сами', why: 'Are rising — повышаются без прямого дополнения.' },
  { before: 'The new policy has ', after: ' concerns among parents.', answer: 'raised', clue: 'Политика вызвала опасения', why: 'Has raised concerns: объект concerns.' },
  { before: 'The river ', after: ' overnight after heavy rain.', answer: 'rose', clue: 'Река поднялась · Past Simple', why: 'Уровень реки вырос сам: rose.' },
  { before: 'Carefully ', after: ' the lid before adding water.', answer: 'raise', clue: 'Подними крышку · повелительное наклонение', why: 'Raise the lid: есть объект the lid.' },
  { before: 'She ', after: ' from her chair to address the committee.', answer: 'rose', clue: 'Она встала', why: 'Rise from one’s chair — встать со стула. Past Simple: rose.' },
  { before: 'The number of applicants is ', after: ' every month.', answer: 'rising', clue: 'Число кандидатов растёт', why: 'Is rising — повышается.' },
  { before: 'Researchers have ', after: ' doubts about the initial findings.', answer: 'raised', clue: 'Исследователи выразили сомнения', why: 'Have raised doubts: есть объект doubts.' },
];

const riseEl = (id) => document.getElementById(id);
const riseState = { queue: [], original: [], index: 0, answers: [], checked: false, random: false };
if (riseQuestions.length !== 30) throw new Error('Expected 30 rise/raise questions');

function riseShow(view) {
  for (const id of ['rise-intro', 'rise-quiz', 'rise-results']) riseEl(id).classList.toggle('hidden', id !== `rise-${view}`);
}
function riseStart(questions = riseQuestions) {
  riseState.original = riseQuestions.filter((question) => questions.includes(question));
  riseState.queue = riseState.random ? practiceOrder.reorder([...riseState.original], 0, true, riseState.original) : [...riseState.original];
  riseState.index = 0;
  riseState.answers = [];
  riseShow('quiz');
  riseRender();
  riseEl('rise-practice').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function riseRender() {
  const question = riseState.queue[riseState.index];
  riseState.checked = false;
  riseEl('rise-counter').textContent = `${riseState.index + 1} / ${riseState.queue.length}`;
  riseEl('rise-score').textContent = `${riseState.answers.filter((entry) => entry.correct).length} верно`;
  riseEl('rise-progress').setAttribute('aria-valuemax', String(riseState.queue.length));
  riseEl('rise-progress').setAttribute('aria-valuenow', String(riseState.index));
  riseEl('rise-progress-fill').style.width = `${riseState.index / riseState.queue.length * 100}%`;
  riseEl('rise-clue').textContent = question.clue;
  riseEl('rise-before').textContent = question.before;
  riseEl('rise-after').textContent = question.after;
  riseEl('rise-answer').value = '';
  riseEl('rise-answer').readOnly = false;
  riseEl('rise-answer').className = '';
  riseEl('rise-feedback').textContent = '';
  riseEl('rise-feedback').className = 'rise-feedback';
  riseEl('rise-action').innerHTML = 'Проверить <span aria-hidden="true">→</span>';
  riseEl('rise-answer').focus();
}
function riseNext() {
  if (riseState.index + 1 === riseState.queue.length) { riseFinish(); return; }
  riseState.index++;
  riseRender();
}
function riseSubmit(event) {
  event.preventDefault();
  if (riseState.checked) { riseNext(); return; }
  const typed = riseEl('rise-answer').value.trim();
  if (!typed) { riseEl('rise-feedback').textContent = 'Впиши слово в пропуск.'; riseEl('rise-answer').focus(); return; }
  const question = riseState.queue[riseState.index];
  const correct = typed.toLocaleLowerCase('en') === question.answer;
  riseState.answers.push({ question, typed, correct });
  riseState.checked = true;
  riseEl('rise-answer').readOnly = true;
  riseEl('rise-answer').className = correct ? 'is-correct' : 'is-wrong';
  riseEl('rise-feedback').className = `rise-feedback ${correct ? 'correct' : 'wrong'}`;
  riseEl('rise-feedback').textContent = `${correct ? 'Верно.' : `Правильно: ${question.answer}.`} ${question.why}`;
  riseEl('rise-progress').setAttribute('aria-valuenow', String(riseState.index + 1));
  riseEl('rise-progress-fill').style.width = `${(riseState.index + 1) / riseState.queue.length * 100}%`;
  riseEl('rise-score').textContent = `${riseState.answers.filter((entry) => entry.correct).length} верно`;
  riseEl('rise-action').innerHTML = riseState.index + 1 === riseState.queue.length ? 'Показать итоги <span aria-hidden="true">→</span>' : 'Следующее <span aria-hidden="true">→</span>';
  riseEl('rise-action').focus();
}
function riseFinish() {
  riseShow('results');
  const mistakes = riseState.answers.filter((entry) => !entry.correct);
  const correct = riseState.answers.length - mistakes.length;
  riseEl('rise-result-score').textContent = `${correct} из ${riseState.answers.length} верно · ${Math.round(correct / riseState.answers.length * 100)}%`;
  riseEl('rise-review').replaceChildren(...mistakes.map(({ question, typed }) => {
    const row = document.createElement('article');
    const sentence = document.createElement('strong');
    sentence.textContent = `${question.before}${question.answer}${question.after}`;
    const detail = document.createElement('small');
    detail.textContent = `Твой ответ: ${typed}. ${question.why}`;
    row.append(sentence, detail);
    return row;
  }));
  riseEl('rise-retry').classList.toggle('hidden', !mistakes.length);
  riseEl('rise-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

riseEl('rise-start').addEventListener('click', () => riseStart());
riseEl('rise-form').addEventListener('submit', riseSubmit);
riseEl('rise-form').addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.isComposing && riseState.checked) { event.preventDefault(); riseNext(); }
});
practiceOrder.updateButton(riseEl('rise-order'), riseState.random);
riseEl('rise-order').addEventListener('click', () => {
  riseState.random = !riseState.random;
  const keepCurrent = riseState.checked || riseEl('rise-answer').value.trim();
  riseState.queue = practiceOrder.reorder(riseState.queue, riseState.index + Number(Boolean(keepCurrent)), riseState.random, riseState.original);
  practiceOrder.updateButton(riseEl('rise-order'), riseState.random);
  if (!keepCurrent) riseRender();
});
riseEl('rise-exit').addEventListener('click', () => riseShow('intro'));
riseEl('rise-new').addEventListener('click', () => riseStart());
riseEl('rise-retry').addEventListener('click', () => riseStart(riseState.answers.filter((entry) => !entry.correct).map((entry) => entry.question)));
