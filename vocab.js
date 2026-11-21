const $ = (id) => document.getElementById(id);
const allWords = vocabularyTopics.flatMap((topic) => topic.words);
let activeTopic = null;
let activeFilter = 'all';
let translationsHidden = false;

if (vocabularyTopics.length !== 12 || vocabularyTopics.some((topic) => topic.words.length !== 50)) {
  throw new Error('Vocabulary data must contain 12 topics with 50 entries each.');
}

$('topic-total').textContent = vocabularyTopics.length;
$('word-total').textContent = allWords.length;

function renderCatalog() {
  $('topic-grid').replaceChildren(...vocabularyTopics.map((topic, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'topic-card';
    button.innerHTML = `<span class="topic-number">${String(index + 1).padStart(2, '0')} / 12</span><span class="topic-icon" aria-hidden="true">${topic.icon}</span>`;
    const name = document.createElement('strong');
    name.textContent = topic.title;
    const english = document.createElement('span');
    english.className = 'topic-en';
    english.textContent = topic.en;
    const count = document.createElement('span');
    count.className = 'topic-count';
    count.textContent = `${topic.words.length} выражений  ↗`;
    button.append(name, english, count);
    button.addEventListener('click', () => openTopic(topic.id));
    return button;
  }));
}

function openTopic(id, scroll = true) {
  const topic = vocabularyTopics.find((entry) => entry.id === id);
  if (!topic) return;
  activeTopic = topic;
  activeFilter = 'all';
  translationsHidden = false;
  $('word-search').value = '';
  $('toggle-translations').textContent = 'Скрыть переводы';
  $('toggle-translations').setAttribute('aria-pressed', 'false');
  $('topic-kicker').textContent = `${String(vocabularyTopics.indexOf(topic) + 1).padStart(2, '0')} / 12 · ${topic.en.toUpperCase()}`;
  $('topic-title').textContent = topic.title;
  $('topic-description').textContent = topic.description;
  $('topic-prompt').textContent = topic.prompt;
  $('topic-test-link').href = `vocab-test.html?topics=${encodeURIComponent(topic.id)}`;
  $('topic-detail').classList.remove('hidden');
  for (const button of document.querySelectorAll('[data-filter]')) button.classList.toggle('active', button.dataset.filter === 'all');
  renderWords();
  if (location.hash !== `#${id}`) history.replaceState(null, '', `#${id}`);
  if (scroll) $('topic-detail').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderWords() {
  if (!activeTopic) return;
  const query = $('word-search').value.trim().toLocaleLowerCase();
  const items = activeTopic.words.filter((word) =>
    (activeFilter === 'all' || word.origin === activeFilter) &&
    (!query || `${word.en} ${word.ru} ${word.example}`.toLocaleLowerCase().includes(query))
  );
  $('no-words').classList.toggle('hidden', items.length > 0);
  $('word-list').classList.toggle('hide-translations', translationsHidden);
  $('word-list').replaceChildren(...items.map((word) => {
    const row = document.createElement('article');
    row.className = 'word-row';
    const tag = document.createElement('span');
    tag.className = `word-tag ${word.origin}`;
    tag.textContent = word.origin === 'core' ? 'ИЗ КНИГИ' : 'IELTS+';
    const content = document.createElement('div');
    content.className = 'word-content';
    const term = document.createElement('button');
    term.type = 'button';
    term.className = 'lookup-term word-term';
    term.textContent = word.en;
    term.dataset.lookupTerm = word.en;
    term.title = 'Нажми для словаря или Ctrl + клик для English definition';
    const russian = document.createElement('span');
    russian.className = 'word-translation';
    russian.textContent = word.ru;
    content.append(term, russian);
    if (word.example) {
      const example = document.createElement('p');
      example.className = 'word-example';
      example.textContent = word.example;
      content.append(example);
    }
    row.append(tag, content);
    return row;
  }));
}

$('word-search').addEventListener('input', renderWords);
for (const button of document.querySelectorAll('[data-filter]')) {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    for (const other of document.querySelectorAll('[data-filter]')) other.classList.toggle('active', other === button);
    renderWords();
  });
}
$('toggle-translations').addEventListener('click', () => {
  translationsHidden = !translationsHidden;
  $('toggle-translations').textContent = translationsHidden ? 'Показать переводы' : 'Скрыть переводы';
  $('toggle-translations').setAttribute('aria-pressed', String(translationsHidden));
  renderWords();
});
$('close-topic').addEventListener('click', () => {
  activeTopic = null;
  $('topic-detail').classList.add('hidden');
  history.replaceState(null, '', location.pathname);
  $('topic-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
window.addEventListener('hashchange', () => {
  const id = decodeURIComponent(location.hash.slice(1));
  if (id) openTopic(id, false);
});

renderCatalog();
const initialTopic = decodeURIComponent(location.hash.slice(1));
if (initialTopic) openTopic(initialTopic, false);
