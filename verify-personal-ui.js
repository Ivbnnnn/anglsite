// Run with: node verify-personal-ui.js
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

function element() {
  const listeners = {}, classes = new Set();
  return {
    listeners, classes, dataset: {}, style: {}, value: '', textContent: '', innerHTML: '', children: [], attributes: {},
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
function makeContext(ids, script) {
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
    browserAI: { translate: async () => ({ translation: 'новый перевод', source: 'локальная модель' }), embed: async (word) => word === 'urban sprawl' ? [1, 0] : [0.8, 0.6] },
    setTimeout: () => 1, clearTimeout() {},
  });
  for (const file of ['vocab-data.js', 'vocab-extra.js', 'my-words-store.js', script]) {
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

  const mapIds = ['map-filter','map-search','map-count','map-empty','map-frame','word-map','map-detail','semantic-build','semantic-status'];
  const map = makeContext(mapIds, 'word-map.js');
  assert.equal(map.nodes['map-count'].textContent, '2 слова');
  const layers = map.nodes['word-map'].children;
  assert.equal(layers.length, 2);
  const wordNodes = layers[1].children.filter((node) => node.attributes.class === 'word-node');
  assert.equal(wordNodes.length, 2);
  wordNodes[0].listeners.click();
  assert.equal(map.nodes['map-detail'].children[1].textContent, 'urban sprawl');
  await map.nodes['semantic-build'].listeners.click();
  wordNodes[0].listeners.click();
  assert.equal(map.nodes['map-detail'].children.at(-1).children.length, 1);
  map.nodes['map-filter'].value = 'city';
  map.nodes['map-filter'].listeners.change();
  assert.equal(map.nodes['map-count'].textContent, '1 слово');
  console.log('PASS: personal form, local and browser suggestions, edit, save, semantic map, topic filter');
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
