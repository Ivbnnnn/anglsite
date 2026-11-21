const riseQuestions = [
  { before: 'Yesterday, the sun ', after: ' at 6:12.', answer: 'rose', clue: 'Вчера · движение вверх', why: 'Past Simple от rise — rose.' },
  { before: 'On clear mornings, the sun ', after: ' over the hills.', answer: 'rises', clue: 'Обычно · движение вверх', why: 'С подлежащим the sun в Present Simple: rises.' },
  { before: 'Average temperatures have ', after: ' by two degrees since 1990.', answer: 'risen', clue: 'С 1990 года · рост показателя', why: 'После have нужна третья форма rise — risen.' },
  { before: 'The water level is ', after: ' after days of rain.', answer: 'rising', clue: 'Сейчас · уровень повышается', why: 'Present Continuous от rise: is rising.' },
  { before: 'The crowd ', after: ' to its feet when the speaker entered.', answer: 'rose', clue: 'В прошлом · люди встали', why: 'Rise to one’s feet — встать. Past Simple: rose.' },
  { before: 'In winter, energy demand tends to ', after: '.', answer: 'rise', clue: 'Обычно · спрос увеличивается', why: 'После tends to используется начальная форма rise.' },
  { before: 'Housing costs ', after: ' sharply last year.', answer: 'rose', clue: 'В прошлом году · затраты выросли', why: 'Past Simple от rise — rose.' },
  { before: 'By noon, the temperature had ', after: ' above 30°C.', answer: 'risen', clue: 'К полудню · температура поднялась', why: 'После had нужна третья форма rise — risen.' },
  { before: 'The hot-air balloon began to ', after: ' slowly.', answer: 'rise', clue: 'Воздушный шар движется вверх', why: 'После began to используется rise.' },
  { before: 'The path ', after: ' steeply towards the summit.', answer: 'rises', clue: 'Тропа идёт вверх', why: 'С подлежащим the path в Present Simple: rises.' },
  { before: 'A new problem ', after: ' during the trial yesterday.', answer: 'arose', clue: 'Вчера · проблема возникла', why: 'Past Simple от arise — arose.' },
  { before: 'If any questions ', after: ', please email me.', answer: 'arise', clue: 'Если возникнут вопросы', why: 'Questions arise: множественное число в Present Simple.' },
  { before: 'A useful opportunity has ', after: ' for our team.', answer: 'arisen', clue: 'Возможность появилась', why: 'После has нужна третья форма arise — arisen.' },
  { before: 'Several difficulties are ', after: ' from the new rules.', answer: 'arising', clue: 'Трудности возникают из-за правил', why: 'Are arising from: происходят вследствие чего-либо.' },
  { before: 'The dispute ', after: ' from a misunderstanding last week.', answer: 'arose', clue: 'В прошлом · спор возник из-за недоразумения', why: 'Arise from — быть следствием. Past Simple: arose.' },
  { before: 'When the need ', after: ', we will respond.', answer: 'arises', clue: 'Когда возникнет необходимость', why: 'The need — единственное число; Present Simple: arises.' },
  { before: 'Ethical concerns have ', after: ' about the use of this data.', answer: 'arisen', clue: 'Появились этические вопросы', why: 'После have нужна третья форма arise — arisen.' },
  { before: 'Should an emergency ', after: ', call this number.', answer: 'arise', clue: 'Если возникнет чрезвычайная ситуация', why: 'После should используется начальная форма arise.' },
  { before: 'More questions ', after: ' after the presentation ended.', answer: 'arose', clue: 'После презентации · вопросы появились', why: 'Past Simple от arise — arose.' },
  { before: 'A debate is ', after: ' over the proposed policy.', answer: 'arising', clue: 'Сейчас начинается дискуссия', why: 'Is arising — возникает.' },
  { before: 'Profits are expected to ', after: ' next year.', answer: 'rise', clue: 'Прибыль, вероятно, вырастет', why: 'После expected to используется rise.' },
  { before: 'An unexpected complication ', after: ' during surgery.', answer: 'arose', clue: 'Осложнение возникло', why: 'Past Simple от arise — arose.' },
  { before: 'Smoke ', after: ' from the chimney as we arrived.', answer: 'rose', clue: 'Дым поднимался вверх', why: 'Физическое движение вверх: rise. Past Simple: rose.' },
  { before: 'These concerns ', after: ' from unequal access to healthcare.', answer: 'arise', clue: 'Причина опасений — неравный доступ', why: 'Arise from — быть вызванным чем-либо.' },
  { before: 'Interest rates have ', after: ' steadily this year.', answer: 'risen', clue: 'Ставки повысились', why: 'После have нужна третья форма rise — risen.' },
  { before: 'New risks may ', after: ' as technology develops.', answer: 'arise', clue: 'Риски могут появиться', why: 'После may используется начальная форма arise.' },
  { before: 'She ', after: ' from her chair to address the committee.', answer: 'rose', clue: 'Она встала', why: 'Rise from one’s chair — встать со стула. Past Simple: rose.' },
  { before: 'A question has ', after: ' concerning the reliability of the results.', answer: 'arisen', clue: 'Возник вопрос о достоверности результатов', why: 'После has нужна третья форма arise — arisen.' },
  { before: 'The number of applicants is ', after: ' every month.', answer: 'rising', clue: 'Число кандидатов растёт', why: 'Is rising — повышается.' },
  { before: 'The idea ', after: ' out of discussions with local residents.', answer: 'arose', clue: 'Идея возникла из обсуждений', why: 'Arise out of — возникать из чего-либо. Past Simple: arose.' },
];

const riseEl = (id) => document.getElementById(id);
const riseState = { queue: [], original: [], index: 0, answers: [], checked: false, random: false };
if (riseQuestions.length !== 30) throw new Error('Expected 30 rise/arise questions');

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
