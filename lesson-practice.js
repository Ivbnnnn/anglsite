const lessonPractice = (() => {
  function mount(section, groups, { articles = false } = {}) {
    section.innerHTML = `
      <h2>Практика</h2>
      <p>${articles ? 'Впиши a, an, the или тире для ответа «без артикля».' : 'Впиши подходящую форму rob, burgle или steal.'}
        Enter проверяет ответ и переводит к следующему заданию.</p>
      <div id="lesson-setup" class="nouns-setup">
        <label for="lesson-group">Что тренировать</label>
        <select id="lesson-group"><option value="">Все задания</option></select>
        <p class="lesson-total" id="lesson-total"></p>
        <button type="button" class="primary-button" id="lesson-start">Начать <span aria-hidden="true">→</span></button>
      </div>
      <div id="lesson-quiz" class="nouns-quiz hidden">
        <div class="section-topline"><span id="lesson-topic"></span><span id="lesson-counter"></span></div>
        <progress id="lesson-progress" class="lesson-progress" aria-label="Прогресс" value="0"></progress>
        <div class="nouns-question">
          <p class="nouns-instruction" id="lesson-instruction"></p>
          <form id="lesson-form" novalidate>
            <div class="nouns-sentence" lang="en"><span id="lesson-before"></span><input id="lesson-answer" type="text" autocomplete="off" spellcheck="false" aria-label="Слово в пропуске"><span id="lesson-after"></span></div>
            ${articles ? '<button type="button" class="nouns-outline lesson-zero" id="lesson-zero">Без артикля</button>' : ''}
            <p class="nouns-feedback" id="lesson-feedback" aria-live="polite"></p>
            <div class="practice-actions">
              <button class="primary-button" id="lesson-check" type="submit">Проверить</button>
              <button class="order-toggle" id="lesson-order" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h3c5 0 7 14 12 14h3m-3-3 3 3-3 3M3 19h3c5 0 7-14 12-14h3m-3-3 3 3-3 3"/></svg></button>
            </div>
          </form>
        </div>
        <button type="button" class="nouns-outline" id="lesson-exit">К выбору заданий</button>
      </div>
      <div id="lesson-results" class="nouns-results hidden">
        <h3>Результат</h3>
        <p id="lesson-score"></p>
        <div class="nouns-review" id="lesson-review"></div>
        <div class="nouns-result-actions">
          <button type="button" class="primary-button" id="lesson-retry">Повторить ошибки</button>
          <button type="button" class="nouns-outline" id="lesson-new">Новая тренировка</button>
        </div>
      </div>`;

    const el = (name) => section.querySelector(`#lesson-${name}`);
    const questionGroups = groups.map(({ title, rows }) => rows.trim().split('\n').map((row) => {
      const [sentence, answers, why, hint] = row.split('|');
      const [before, after] = sentence.split('_');
      return { title, before, after, answers: answers.split('/'), why, hint };
    }));
    const questions = articles ? questionGroups.flat() :
      Array.from({ length: Math.max(...questionGroups.map((group) => group.length)) }, (_, i) =>
        questionGroups.map((group) => group[i]).filter(Boolean)).flat();
    for (const { title } of groups) el('group').append(new Option(title, title));

    let original = [];
    let queue = [];
    let mistakes = [];
    let index = 0;
    let checked = false;
    let random = false;

    function show(view) {
      for (const name of ['setup', 'quiz', 'results']) el(name).classList.toggle('hidden', name !== view);
    }
    function selectedQuestions() {
      return questions.filter(({ title }) => !el('group').value || el('group').value === title);
    }
    function updateCount() {
      el('total').textContent = `Заданий: ${selectedQuestions().length}`;
    }
    function renderQuestion() {
      const question = queue[index];
      checked = false;
      el('topic').textContent = articles ? question.title : 'Выбор глагола';
      el('counter').textContent = `${index + 1} / ${queue.length}`;
      el('progress').value = index;
      el('instruction').textContent = question.hint || (articles ? 'Выбери артикль' : 'Выбери глагол и его форму');
      el('before').textContent = question.before;
      el('after').textContent = question.after;
      el('answer').value = '';
      el('answer').readOnly = false;
      el('answer').className = '';
      el('feedback').className = 'nouns-feedback';
      el('feedback').textContent = '';
      el('check').textContent = 'Проверить';
      if (articles) el('zero').disabled = false;
      el('answer').focus();
    }
    function start(items) {
      original = items;
      queue = practiceOrder.reorder(items, 0, random, original);
      mistakes = [];
      index = 0;
      el('progress').max = queue.length;
      show('quiz');
      renderQuestion();
      section.scrollIntoView({ block: 'start' });
    }
    function answerLabel(answer) {
      return answer === '∅' ? 'без артикля' : answer;
    }
    function finish() {
      el('score').textContent = `${queue.length - mistakes.length} из ${queue.length} верно`;
      el('review').replaceChildren(...mistakes.map(({ question, typed }) => {
        const entry = document.createElement('article');
        const sentence = document.createElement('strong');
        const article = question.answers[0] === '∅' ? '' : question.answers[0];
        sentence.lang = 'en';
        sentence.textContent = `${question.before}${article}${question.after}`.trim()
          .replace(/\s{2,}/g, ' ').replace(/^./, (character) => character.toUpperCase());
        const explanation = document.createElement('p');
        explanation.textContent = `Твой ответ — ${answerLabel(typed)}. ${question.why}`;
        entry.append(sentence, explanation);
        return entry;
      }));
      el('retry').classList.toggle('hidden', mistakes.length === 0);
      show('results');
      (mistakes.length ? el('retry') : el('new')).focus();
    }
    function submit(event) {
      event.preventDefault();
      if (checked) {
        if (++index === queue.length) finish();
        else renderQuestion();
        return;
      }
      const question = queue[index];
      const raw = el('answer').value.trim().toLowerCase();
      if (!raw) {
        el('feedback').textContent = articles ? 'Впиши артикль или выбери «Без артикля».' : 'Впиши глагол в пропуск.';
        el('answer').focus();
        return;
      }
      const typed = articles && ['-', '–', '—', '0'].includes(raw) ? '∅' : raw;
      const correct = question.answers.includes(typed);
      if (!correct) mistakes.push({ question, typed });
      checked = true;
      el('answer').readOnly = true;
      el('answer').className = correct ? 'is-correct' : 'is-wrong';
      if (articles) el('zero').disabled = true;
      el('feedback').classList.add(correct ? 'correct' : 'wrong');
      el('feedback').textContent = `${correct ? 'Верно.' : `Правильно — ${question.answers.map(answerLabel).join(' / ')}.`} ${question.why}`;
      el('progress').value = index + 1;
      el('check').textContent = index + 1 === queue.length ? 'Показать итоги' : 'Следующее';
      el('check').focus();
    }

    updateCount();
    el('group').addEventListener('change', updateCount);
    el('start').addEventListener('click', () => start(selectedQuestions()));
    el('retry').addEventListener('click', () => start(original.filter((question) => mistakes.some((entry) => entry.question === question))));
    for (const name of ['exit', 'new']) el(name).addEventListener('click', () => {
      show('setup');
      el('start').focus();
    });
    el('form').addEventListener('submit', submit);
    el('form').addEventListener('keydown', (event) => {
      if (checked && event.target === el('answer') && event.key === 'Enter' && !event.isComposing) submit(event);
    });
    if (articles) el('zero').addEventListener('click', () => {
      el('answer').value = '—';
      el('answer').focus();
    });
    practiceOrder.updateButton(el('order'), random);
    el('order').addEventListener('click', () => {
      random = !random;
      const keepCurrent = checked || Boolean(el('answer').value.trim());
      queue = practiceOrder.reorder(queue, index + Number(keepCurrent), random, original);
      practiceOrder.updateButton(el('order'), random);
      if (!keepCurrent) renderQuestion();
    });
  }

  return { mount };
})();
