// Run with: node verify-vocab.js
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

function element() {
  const listeners = {}, classes = new Set();
  return {
    listeners, classes, dataset: {}, value: '', textContent: '', innerHTML: '', href: '',
    classList: { add: (x) => classes.add(x), remove: (x) => classes.delete(x), toggle: (x, on) => on ? classes.add(x) : classes.delete(x) },
    addEventListener: (name, fn) => { listeners[name] = fn; },
    setAttribute(name, value) { this[name] = value; },
    replaceChildren(...children) { this.children = children; },
    append(...children) { this.children = [...(this.children || []), ...children]; },
    scrollIntoView() {},
  };
}
const ids = ['topic-total','word-total','topic-grid','topic-detail','topic-kicker','topic-title','topic-test-link',
  'topic-description','topic-prompt','word-search','toggle-translations','no-words',
  'word-list','close-topic','dictionary-toast','dictionary-term','dictionary-english',
  'dictionary-russian','dictionary-close'];
const nodes = Object.fromEntries(ids.map((id) => [id, element()]));
const filters = ['all','core','advanced'].map((filter) => {
  const button = element(); button.dataset.filter = filter; return button;
});
const docListeners = {};
const opened = [];
const location = { hash: '', pathname: '/vocabulary.html' };
const context = vm.createContext({
  document: {
    getElementById: (id) => nodes[id], createElement: element,
    querySelectorAll: () => filters,
    addEventListener: (name, fn) => { docListeners[name] = fn; },
  },
  window: { addEventListener() {}, open: (...args) => opened.push(args) },
  location,
  history: { replaceState(_a, _b, url) { location.hash = url.startsWith('#') ? url : ''; } },
});
for (const file of ['vocab-data.js','vocab-extra.js','vocab.js','dictionary.js']) vm.runInContext(fs.readFileSync(file, 'utf8'), context);
const topics = vm.runInContext('vocabularyTopics', context);
assert.equal(topics.length, 12);
assert.equal(new Set(topics.map((topic) => topic.id)).size, 12);
assert(topics.every((topic) => topic.words.length === 50 && topic.words.every((word) => word.en && word.ru)));
assert(topics.every((topic) => new Set(topic.words.map((word) => word.en)).size === 50));
assert(topics.every((topic) => topic.words.filter((word) => word.origin === 'advanced' && word.example).length >= 8));
assert.equal(nodes['topic-grid'].children.length, 12);
nodes['topic-grid'].children[1].listeners.click();
assert.equal(nodes['topic-title'].textContent, 'Город и деревня');
assert.equal(nodes['word-list'].children.length, 50);
assert.equal(nodes['topic-test-link'].href, 'vocab-test.html?topics=city');
filters[2].listeners.click();
assert.equal(nodes['word-list'].children.length, 32);
nodes['word-search'].value = 'sprawl';
nodes['word-search'].listeners.input();
assert.equal(nodes['word-list'].children.length, 1);
nodes['toggle-translations'].listeners.click();
assert(nodes['word-list'].classes.has('hide-translations'));
const links = vm.runInContext('dictionaryLinks("urban sprawl")', context);
assert.match(links.english, /dictionary\.cambridge\.org\/search\/english\/direct\/\?q=urban%20sprawl/);
assert.match(links.russian, /translate\.google\.com\/\?sl=en&tl=ru&text=urban%20sprawl/);
const lookup = { dataset: { lookupTerm: 'urban sprawl' } };
docListeners.click({ button: 0, ctrlKey: true, metaKey: false, target: { closest: () => lookup }, preventDefault() {} });
assert.equal(opened.length, 1);
assert.equal(nodes['dictionary-term'].textContent, 'urban sprawl');
assert.equal(nodes['dictionary-russian'].href, links.russian);
console.log('PASS: 12 topics, 600 expressions, search, filters, translations, Ctrl+click dictionary');
