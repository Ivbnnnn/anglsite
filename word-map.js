const mapEl = (id) => document.getElementById(id);
const svgNS = 'http://www.w3.org/2000/svg';
const topics = [...myWordsStore.topics, { id: 'other', title: 'Без темы' }];
const colors = ['#ab9bff', '#70c9ff', '#f994c7', '#66d9bf', '#f4c36e', '#fc9f87', '#a8d778',
  '#b4bcff', '#efaa70', '#69d7e8', '#dca2ff', '#ee84a2', '#bec3d5'];
const topicInfo = new Map(topics.map((topic, i) => [topic.id, { ...topic, color: colors[i % colors.length] }]));
const plot = { width: 800, height: 510, left: 66, right: 764, top: 38, bottom: 455 };
const cacheKey = 'verb-practice-word-map-e5-pca-v1';
const vectors = new Map();
let words = myWordsStore.load();
let points = loadProjection(words);
let selectedId = '';
let building = false;
let markers = new Map();

function signature(items) {
  return JSON.stringify(items.map(({ id, en }) => [id, en]));
}

function loadProjection(items) {
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey));
    if (cached?.signature !== signature(items) || cached.points.length !== items.length) return null;
    return cached.points.every(({ x, y, neighbors }) => Number.isFinite(x) && Number.isFinite(y) &&
      Array.isArray(neighbors) && neighbors.every((i) => Number.isInteger(i) && i >= 0 && i < items.length))
      ? cached.points : null;
  } catch {
    return null;
  }
}

function wordCount(number) {
  const last = number % 10;
  const tens = number % 100;
  if (tens >= 11 && tens <= 14) return `${number} слов`;
  if (last === 1) return `${number} слово`;
  return `${number} ${last >= 2 && last <= 4 ? 'слова' : 'слов'}`;
}

for (const topic of topics) {
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

const formatCoordinate = new Intl.NumberFormat('ru', { maximumSignificantDigits: 3 });
function coordinateText(value) {
  return formatCoordinate.format(Math.abs(value) < 1e-12 ? 0 : value);
}

function showDetail(index) {
  const item = words[index];
  const point = points[index];
  const detail = mapEl('map-detail');
  detail.replaceChildren();

  const topic = topicInfo.get(item.topicId);
  const category = document.createElement('span');
  category.textContent = topic.title;
  const title = document.createElement('h2');
  title.textContent = item.en;
  title.className = 'lookup-term';
  title.dataset.lookupTerm = item.en;
  const translation = document.createElement('p');
  translation.textContent = item.ru;
  const coordinate = document.createElement('p');
  coordinate.className = 'map-coordinate';
  coordinate.textContent = `X ${coordinateText(point.x)} · Y ${coordinateText(point.y)}`;
  const edit = document.createElement('a');
  edit.href = `my-words.html?edit=${encodeURIComponent(item.id)}`;
  edit.textContent = 'Изменить слово →';
  detail.append(category, title, translation, coordinate, edit);

  if (!point.neighbors.length) return;
  const heading = document.createElement('h3');
  heading.textContent = 'Ближайшие по смыслу';
  const list = document.createElement('ul');
  list.className = 'semantic-list';
  for (const neighbor of point.neighbors) {
    const row = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = words[neighbor].en;
    button.addEventListener('click', () => {
      if (!markers.has(words[neighbor].id)) {
        mapEl('map-filter').value = 'all';
        mapEl('map-search').value = '';
        renderMap();
      }
      selectPoint(words[neighbor].id);
      markers.get(words[neighbor].id)?.focus();
    });
    row.append(button);
    list.append(row);
  }
  detail.append(heading, list);
}

function resetDetail() {
  const title = document.createElement('h2');
  title.textContent = 'Выбери слово';
  const help = document.createElement('p');
  help.textContent = 'Нажми на точку или выбери слово из списка под графиком.';
  mapEl('map-detail').replaceChildren(title, help);
}

function selectPoint(id) {
  const index = points ? words.findIndex((word) => word.id === id) : -1;
  selectedId = index >= 0 ? id : '';
  for (const [wordId, node] of markers) {
    const selected = wordId === selectedId;
    node.classList.toggle('selected', selected);
    node.setAttribute('aria-pressed', String(selected));
  }
  mapEl('map-point').value = selectedId;
  if (selectedId) {
    showDetail(index);
  } else {
    resetDetail();
  }
}

function plotScale() {
  const { left, right, top, bottom } = plot;
  const centerX = (left + right) / 2;
  const centerY = (top + bottom) / 2;
  const maxX = (right - left) / 2;
  const maxY = (bottom - top) / 2;
  let extent = 0;
  for (const point of points || []) {
    extent = Math.max(extent, Math.abs(point.x), Math.abs(point.y) * maxX / maxY);
  }
  const pixels = maxX * 0.85 / (extent || 0.5);
  const rawStep = 86 / pixels;
  const magnitude = 10 ** Math.floor(Math.log10(rawStep));
  const step = ([1, 2, 5, 10].find((factor) => factor * magnitude >= rawStep)) * magnitude;
  return { centerX, centerY, pixels, step };
}

function drawAxes({ centerX, centerY, pixels, step }) {
  const { left, right, top, bottom } = plot;
  const axes = svg('g', { class: 'map-grid', 'aria-hidden': 'true' });
  axes.append(svg('rect', { x: left, y: top, width: right - left, height: bottom - top, class: 'plot-border' }));
  const tickPixels = step * pixels;
  for (let i = -Math.floor((centerX - left) / tickPixels); i <= Math.floor((right - centerX) / tickPixels); i++) {
    const x = centerX + i * tickPixels;
    axes.append(svg('line', { x1: x, y1: top, x2: x, y2: bottom, class: i ? 'grid-line' : 'axis-line' }));
    axes.append(svg('text', { x, y: bottom + 23, 'text-anchor': 'middle' }, coordinateText(i * step)));
  }
  for (let i = -Math.floor((bottom - centerY) / tickPixels); i <= Math.floor((centerY - top) / tickPixels); i++) {
    const y = centerY - i * tickPixels;
    axes.append(svg('line', { x1: left, y1: y, x2: right, y2: y, class: i ? 'grid-line' : 'axis-line' }));
    axes.append(svg('text', { x: left - 10, y: y + 4, 'text-anchor': 'end' }, coordinateText(i * step)));
  }
  axes.append(svg('text', { x: right, y: bottom + 39, class: 'axis-name', 'text-anchor': 'end' }, 'X · PC1'));
  axes.append(svg('text', { x: left, y: top - 12, class: 'axis-name' }, 'Y · PC2'));
  return axes;
}

function drawPoints(visible, scale) {
  markers = new Map();
  const layers = svg('g', { class: 'map-points' });
  if (!points) return layers;
  const occupied = [];
  for (const { word, index } of visible) {
    const point = points[index];
    const x = scale.centerX + point.x * scale.pixels;
    const y = scale.centerY - point.y * scale.pixels;
    const text = word.en.length > 25 ? `${word.en.slice(0, 24)}…` : word.en;
    const width = text.length * 7.5;
    const alignRight = x + 13 + width > plot.right;
    const labelX = x + (alignRight ? -13 : 13);
    const left = alignRight ? labelX - width : labelX;
    const clear = !occupied.some((box) => Math.abs(box.y - y) < 19 && left <= box.right && left + width >= box.left);
    const showLabel = clear && occupied.length < 24;
    if (showLabel) occupied.push({ left, right: left + width, y });

    const marker = svg('g', {
      class: showLabel ? 'map-point' : 'map-point compact',
      tabindex: '0', role: 'button', 'aria-pressed': 'false',
      'aria-label': `${word.en} — ${word.ru}`,
      'data-lookup-term': word.en,
      style: `--point-color:${topicInfo.get(word.topicId).color}`,
    });
    marker.append(svg('circle', { cx: x, cy: y, r: 16, class: 'point-hit' }));
    marker.append(svg('circle', { cx: x, cy: y, r: 6, class: 'point-dot' }));
    const label = svg('text', { x: labelX, y: y + 4, class: 'point-label', 'text-anchor': alignRight ? 'end' : 'start' }, text);
    marker.append(label, svg('title', {}, `${word.en} — ${word.ru}`));
    marker.addEventListener('click', () => selectPoint(word.id));
    marker.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectPoint(word.id);
      }
    });
    layers.append(marker);
    markers.set(word.id, marker);
  }
  return layers;
}

function renderMap() {
  const query = mapEl('map-search').value.trim().toLocaleLowerCase();
  const filter = mapEl('map-filter').value;
  const visible = words.map((word, index) => ({ word, index })).filter(({ word }) =>
    (filter === 'all' || word.topicId === filter) && (!query || `${word.en} ${word.ru}`.toLocaleLowerCase().includes(query)));
  mapEl('map-count').textContent = wordCount(visible.length);
  const empty = mapEl('map-empty');
  empty.classList.toggle('hidden', Boolean(points && visible.length));
  mapEl('map-empty-text').textContent = !words.length ? 'Пока здесь нет слов.' :
    !visible.length ? 'Нет слов по этому запросу.' : 'Построй карту, чтобы увидеть точки.';
  mapEl('map-add-first').classList.toggle('hidden', Boolean(words.length));

  const scale = plotScale();
  mapEl('word-map').replaceChildren(drawAxes(scale), drawPoints(visible, scale));
  const picker = mapEl('map-point');
  picker.disabled = !points || !visible.length;
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Выбрать слово';
  picker.replaceChildren(placeholder);
  for (const { word } of points ? visible : []) {
    const option = document.createElement('option');
    option.value = word.id;
    option.textContent = word.en;
    picker.append(option);
  }

  const legend = mapEl('map-legend');
  legend.replaceChildren();
  const visibleTopics = new Set(points ? visible.map(({ word }) => word.topicId) : []);
  for (const [id, topic] of topicInfo) {
    if (!visibleTopics.has(id)) continue;
    const badge = document.createElement('li');
    badge.style.setProperty('--point-color', topic.color);
    badge.textContent = topic.title;
    legend.append(badge);
  }
  selectPoint(markers.has(selectedId) ? selectedId : '');
}

const status = mapEl('semantic-status');
const buildButton = mapEl('semantic-build');
function updateBuildControl() {
  buildButton.disabled = building || !words.length;
  buildButton.textContent = points ? 'Перестроить карту' : 'Построить карту';
}

async function buildSemanticMap() {
  if (building || !words.length) return;
  const items = words;
  const snapshot = signature(items);
  building = true;
  updateBuildControl();
  try {
    const embeddings = [];
    for (const [index, item] of items.entries()) {
      if (signature(words) !== snapshot) return;
      status.textContent = `Вычисляю векторы: ${index + 1} / ${items.length}…`;
      if (!vectors.has(item.en)) {
        const vector = await browserAI.embed(item.en, (message) => { status.textContent = message; });
        vectors.set(item.en, vector);
      }
      embeddings.push(vectors.get(item.en));
    }
    if (signature(words) !== snapshot) return;
    points = wordProjection.build(embeddings);
    try {
      localStorage.setItem(cacheKey, JSON.stringify({ signature: snapshot, points }));
    } catch {
      // The chart still works when storage is unavailable or full.
    }
    status.textContent = 'Карта готова. Выбери точку, чтобы увидеть перевод и соседей.';
    renderMap();
  } catch {
    status.textContent = 'Не удалось построить карту. Проверь интернет для загрузки модели и попробуй снова.';
  } finally {
    building = false;
    if (signature(words) !== snapshot) status.textContent = 'Список слов изменился. Построй карту заново.';
    updateBuildControl();
  }
}

function wordsChanged(event) {
  if (event.type === 'storage' && event.key !== null && event.key !== myWordsStore.key) return;
  const current = myWordsStore.load();
  const changed = signature(current) !== signature(words);
  words = current;
  if (changed) {
    points = loadProjection(words);
    const currentTerms = new Set(words.map(({ en }) => en));
    for (const text of vectors.keys()) {
      if (!currentTerms.has(text)) vectors.delete(text);
    }
    if (!points) status.textContent = 'Список слов изменился. Построй карту заново.';
  }
  updateBuildControl();
  renderMap();
}

mapEl('map-search').addEventListener('input', renderMap);
mapEl('map-filter').addEventListener('change', renderMap);
mapEl('map-point').addEventListener('change', (event) => selectPoint(event.target.value));
window.addEventListener('storage', wordsChanged);
window.addEventListener('mywordschange', wordsChanged);
buildButton.addEventListener('click', buildSemanticMap);
if (points) status.textContent = 'Показана карта для сохранённых слов.';
updateBuildControl();
renderMap();
