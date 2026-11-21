const mapEl = (id) => document.getElementById(id);
const svgNS = 'http://www.w3.org/2000/svg';
const topicLabels = new Map([...myWordsStore.topics, { id: 'other', title: 'Без темы' }].map((topic) => [topic.id, topic.title]));
let centeredOnce = false;
let semanticVectors = new Map();
let semanticWords = [];
function wordCount(number) {
  const suffix = number % 10 === 1 && number % 100 !== 11 ? 'слово' : (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 12 || number % 100 > 14) ? 'слова' : 'слов');
  return `${number} ${suffix}`;
}

for (const topic of [...myWordsStore.topics, { id: 'other', title: 'Без темы' }]) {
  const option = document.createElement('option');
  option.value = topic.id;
  option.textContent = topic.title;
  mapEl('map-filter').append(option);
}
function svg(tag, attributes = {}, text = '') {
  const element = document.createElementNS(svgNS, tag);
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, String(value));
  if (text) element.textContent = text;
  return element;
}
function curve(x1, y1, x2, y2) { return `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`; }
function shorten(value, length = 32) { return value.length > length ? `${value.slice(0, length - 1)}…` : value; }
function showDetail(item) {
  const detail = mapEl('map-detail');
  detail.replaceChildren();
  const label = document.createElement('span');
  label.textContent = topicLabels.get(item.topicId) || 'Без темы';
  const title = document.createElement('h2');
  title.textContent = item.en;
  title.className = 'lookup-term';
  title.dataset.lookupTerm = item.en;
  const translation = document.createElement('p');
  translation.textContent = item.ru;
  const edit = document.createElement('a');
  edit.href = `my-words.html?edit=${encodeURIComponent(item.id)}`;
  edit.textContent = 'Изменить слово →';
  detail.append(label, title, translation, edit);
  if (semanticVectors.has(item.id)) {
    const current = semanticVectors.get(item.id);
    const related = semanticWords.filter((word) => word.id !== item.id && semanticVectors.has(word.id))
      .map((word) => ({ word, score: current.reduce((sum, value, index) => sum + value * semanticVectors.get(word.id)[index], 0) }))
      .sort((a, b) => b.score - a.score).slice(0, 3);
    if (related.length) {
      const heading = document.createElement('h3');
      heading.textContent = 'Близкие по смыслу';
      const list = document.createElement('ul');
      list.className = 'semantic-list';
      for (const { word } of related) {
        const row = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = word.en;
        button.addEventListener('click', () => showDetail(word));
        row.append(button);
        list.append(row);
      }
      detail.append(heading, list);
    }
  }
}

async function buildSemanticMap() {
  const words = myWordsStore.load();
  const button = mapEl('semantic-build');
  const status = mapEl('semantic-status');
  if (words.length < 2) { status.textContent = 'Добавь хотя бы два слова, чтобы сравнить их.'; return; }
  button.disabled = true;
  const vectors = new Map();
  try {
    for (let index = 0; index < words.length; index++) {
      const word = words[index];
      status.textContent = `Вычисляю смысловые связи: ${index + 1} из ${words.length}…`;
      const vector = await browserAI.embed(word.en, (message) => { status.textContent = message; });
      vectors.set(word.id, vector);
    }
    semanticVectors = vectors;
    semanticWords = words;
    status.textContent = 'Готово. Нажми на слово: справа появятся близкие по смыслу выражения.';
  } catch {
    status.textContent = 'Не удалось загрузить модель. Проверь интернет и попробуй снова.';
  } finally { button.disabled = false; }
}

function renderMap() {
  const query = mapEl('map-search').value.trim().toLocaleLowerCase();
  const filter = mapEl('map-filter').value;
  const items = myWordsStore.load().filter((item) => (filter === 'all' || item.topicId === filter) && (!query || `${item.en} ${item.ru}`.toLocaleLowerCase().includes(query)));
  mapEl('map-count').textContent = wordCount(items.length);
  mapEl('map-empty').classList.toggle('hidden', items.length > 0);
  const root = mapEl('word-map');
  root.replaceChildren();
  if (!items.length) { root.style.height = '0'; return; }
  const grouped = [...topicLabels].map(([id, title]) => ({ id, title, words: items.filter((item) => item.topicId === id) })).filter((group) => group.words.length);
  let cursor = 75;
  for (const group of grouped) {
    group.positions = group.words.map((_, index) => cursor + index * 57);
    group.y = (group.positions[0] + group.positions.at(-1)) / 2;
    cursor = group.positions.at(-1) + 120;
  }
  const height = Math.max(460, cursor + 20);
  const rootY = (grouped[0].y + grouped.at(-1).y) / 2;
  root.setAttribute('viewBox', `0 0 1360 ${height}`);
  root.style.width = '1360px';
  root.style.height = `${height}px`;
  const edges = svg('g', { class: 'map-edges' });
  const nodes = svg('g', { class: 'map-nodes' });
  for (const group of grouped) {
    edges.append(svg('path', { d: curve(265, rootY, 465, group.y), class: 'branch-line' }));
    const branch = svg('g', { class: 'branch-node' });
    branch.append(svg('rect', { x: 465, y: group.y - 22, width: 250, height: 44, rx: 13 }));
    branch.append(svg('text', { x: 482, y: group.y + 5 }, `${group.title} · ${group.words.length}`));
    nodes.append(branch);
    group.words.forEach((item, index) => {
      const y = group.positions[index];
      edges.append(svg('path', { d: curve(715, group.y, 850, y), class: 'word-line' }));
      const word = svg('g', { class: 'word-node', tabindex: '0', role: 'button', 'data-lookup-term': item.en, 'aria-label': `${item.en} — ${item.ru}` });
      word.append(svg('rect', { x: 850, y: y - 21, width: 330, height: 42, rx: 11 }));
      word.append(svg('text', { x: 866, y: y + 5 }, shorten(item.en)));
      word.append(svg('title', {}, `${item.en} — ${item.ru}`));
      word.addEventListener('click', () => showDetail(item));
      word.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showDetail(item); } });
      nodes.append(word);
    });
  }
  const center = svg('g', { class: 'center-node' });
  center.append(svg('rect', { x: 65, y: rootY - 30, width: 200, height: 60, rx: 16 }));
  center.append(svg('text', { x: 90, y: rootY + 7 }, `Мои слова · ${items.length}`));
  nodes.prepend(center);
  root.append(edges, nodes);
  if (!centeredOnce) {
    mapEl('map-frame').scrollTop = Math.max(0, rootY - mapEl('map-frame').clientHeight / 2);
    centeredOnce = true;
  }
}

mapEl('map-search').addEventListener('input', renderMap);
mapEl('map-filter').addEventListener('change', renderMap);
function wordsChanged() {
  semanticVectors.clear();
  semanticWords = [];
  mapEl('semantic-status').textContent = 'Список изменился. Нажми кнопку, чтобы обновить смысловые связи.';
  renderMap();
}
window.addEventListener('storage', wordsChanged);
window.addEventListener('mywordschange', wordsChanged);
mapEl('semantic-build').addEventListener('click', buildSemanticMap);
renderMap();
