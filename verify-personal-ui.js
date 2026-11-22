// Run with: node verify-personal-ui.js
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

function element() {
  const listeners = {}, classes = new Set();
  return {
    listeners, classes, dataset: {}, style: { setProperty(name, value) { this[name] = value; } }, value: '', textContent: '', innerHTML: '', children: [], attributes: {},
    classList: { add: (v) => classes.add(v), remove: (v) => classes.delete(v), toggle: (v, yes) => yes ? classes.add(v) : classes.delete(v) },
    addEventListener: (name, fn) => { listeners[name] = fn; },
    append(...items) { this.children.push(...items); },
    prepend(...items) { this.children.unshift(...items); },
    replaceChildren(...items) { this.children = items; },
    setAttribute(name, value) { this.attributes[name] = String(value); },
    cloneNode() { const copy = element(); copy.value = this.value; copy.textContent = this.textContent; return copy; },
    reset() {}, focus() {}, scrollIntoView() {},
  };
}
const memory = new Map();
const localStorage = { getItem: (key) => memory.get(key) || null, setItem: (key, value) => memory.set(key, value) };
function makeContext(ids, script, embed = async () => { throw new Error('Unexpected model call'); }) {
  const nodes = Object.fromEntries(ids.map((id) => [id, element()]));
  if (nodes['own-filter']) nodes['own-filter'].value = 'all';
  if (nodes['map-filter']) nodes['map-filter'].value = 'all';
  const listeners = {};
  const context = vm.createContext({
    document: { getElementById: (id) => nodes[id], createElement: element, createElementNS: (_ns, _tag) => element() },
    localStorage, Event: class { constructor(type) { this.type = type; } },
    window: {
      addEventListener: (name, fn) => { listeners[name] = fn; },
      dispatchEvent: (event) => listeners[event.type]?.(event),
      confirm: () => true,
    },
    location: { protocol: 'http:', search: '' }, URLSearchParams, Date, Math,
    browserAI: { translate: async () => ({ translation: 'новый перевод', source: 'локальная модель' }), embed },
    setTimeout: () => 1, clearTimeout() {},
  });
  for (const file of ['vocab-data.js', 'vocab-extra.js', 'my-words-store.js', 'word-projection.js', script]) {
    vm.runInContext(fs.readFileSync(file, 'utf8'), context);
  }
  return { nodes, context };
}

async function main() {
  const ids = ['own-topic','own-filter','own-form','form-title','own-save','own-cancel',
    'suggest-status','form-message','own-en','own-ru','own-search','own-count','own-empty',
    'own-list','suggest-button'];
  const { nodes, context } = makeContext(ids, 'my-words.js');
  nodes['own-en'].value = 'urban sprawl';
  await vm.runInContext('suggestTranslation()', context);
  assert.equal(nodes['own-ru'].value, 'разрастание города');
  assert.equal(nodes['own-topic'].value, 'city');
  nodes['own-form'].listeners.submit({ preventDefault() {} });
  assert.equal(nodes['own-count'].textContent, 1);
  assert.equal(nodes['own-list'].children.length, 1);
  nodes['own-list'].children[0].children[1].children[0].listeners.click();
  assert.equal(nodes['own-en'].value, 'urban sprawl');
  nodes['own-ru'].value = 'рост городской застройки';
  nodes['own-form'].listeners.submit({ preventDefault() {} });
  assert.equal(vm.runInContext('myWordsStore.load()[0].ru', context), 'рост городской застройки');
  nodes['own-en'].value = 'novel expression';
  nodes['own-ru'].value = '';
  await vm.runInContext('suggestTranslation(true)', context);
  assert.equal(nodes['own-ru'].value, 'новый перевод');
  assert.match(nodes['suggest-status'].textContent, /локальная модель/);
  nodes['own-form'].listeners.submit({ preventDefault() {} });
  assert.equal(nodes['own-count'].textContent, 2);

  vm.runInContext("myWordsStore.upsert({ en: 'suburban growth', ru: 'рост пригородов', topicId: 'other' })", context);
  const mapIds = ['map-filter','map-search','map-count','map-empty','map-empty-text','map-add-first',
    'word-map','map-point','map-detail','map-legend','semantic-build','semantic-status'];
  const calls = [];
  const vectors = { 'urban sprawl': [1, 0, 0], 'novel expression': [0, 1, 0], 'suburban growth': [0.99, 0.13, 0] };
  const map = makeContext(mapIds, 'word-map.js', async (word) => {
    calls.push(word);
    return vectors[word];
  });
  const markers = (view) => view.nodes['word-map'].children[1].children;
  const position = (marker) => ['cx', 'cy'].map((key) => Number(marker.children[1].attributes[key]));
  assert.equal(map.nodes['map-count'].textContent, '3 слова');
  assert.equal(markers(map).length, 0);
  assert.deepEqual(calls, []);
  await map.nodes['semantic-build'].listeners.click();
  assert.equal(markers(map).length, 3);
  assert.equal(calls.length, 3);
  const original = position(markers(map)[0]);
  const distance = ([x, y]) => Math.hypot(x - original[0], y - original[1]);
  assert.ok(distance(position(markers(map)[2])) < distance(position(markers(map)[1])));
  assert.ok(new Set(markers(map).map((marker) => position(marker)[1])).size > 1);
  markers(map)[0].listeners.click();
  assert.equal(map.nodes['map-detail'].children[1].textContent, 'urban sprawl');
  assert.match(map.nodes['map-detail'].children[3].textContent, /^X .* · Y /);
  assert.equal(map.nodes['map-detail'].children.at(-1).children[0].children[0].textContent, 'suburban growth');
  map.nodes['map-filter'].value = 'city';
  map.nodes['map-filter'].listeners.change();
  assert.equal(map.nodes['map-count'].textContent, '1 слово');
  assert.equal(markers(map).length, 1);
  assert.deepEqual(position(markers(map)[0]), original);

  const reloaded = makeContext(mapIds, 'word-map.js');
  assert.equal(markers(reloaded).length, 3);
  assert.deepEqual(position(markers(reloaded)[0]), original);
  vm.runInContext("myWordsStore.upsert({ en: 'park', ru: 'парк' })", reloaded.context);
  assert.equal(markers(reloaded).length, 0);
  assert.match(reloaded.nodes['semantic-status'].textContent, /Список слов изменился/);
  const identical = vm.runInContext('wordProjection.build([[1, 0], [1, 0]])', map.context);
  assert.ok(identical.every((point) => point.x === 0 && point.y === 0));
  const pair = vm.runInContext('wordProjection.build([[1, 0], [0, 1]])', map.context);
  assert.notEqual(pair[0].x, pair[1].x);
  assert.ok(pair.every((point) => point.y === 0));
  console.log('PASS: personal word form, XY projection, original-vector neighbours, stable filtering and cache invalidation');
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
