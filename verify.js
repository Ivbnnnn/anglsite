// Run with: node verify.js
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const ids = ['intro', 'practice', 'results', 'start-button', 'restart-button',
  'counter', 'progress-track', 'progress-fill', 'verb', 'translation', 'mark-button', 'correct-stat',
  'mistake-stat', 'v2', 'v3', 'v2-feedback', 'v3-feedback', 'action-button',
  'form-hint', 'answer-form', 'result-correct', 'result-mistakes',
  'result-percent', 'results-copy', 'review', 'review-list', 'unlearned',
  'open-unlearned', 'unlearned-count', 'add-unlearned-form', 'add-unlearned-input',
  'add-unlearned-message', 'unlearned-list', 'empty-list', 'back-button', 'verb-options'];
function element() {
  const listeners = {};
  const classes = new Set();
  return {
    listeners, classes, dataset: {}, value: '', textContent: '', innerHTML: '', style: {},
    classList: { add: (x) => classes.add(x), remove: (x) => classes.delete(x), toggle: (x, on) => on ? classes.add(x) : classes.delete(x) },
    addEventListener: (name, fn) => { listeners[name] = fn; },
    setAttribute(name, value) { this[name] = value; },
    replaceChildren(...children) { this.children = children; },
    append(...children) { this.children = [...(this.children || []), ...children]; },
    focus() { this.focused = true; },
  };
}
const nodes = Object.fromEntries(ids.map((id) => [id, element()]));
const storage = new Map();
const localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, value),
};
const context = vm.createContext({
  document: { getElementById: (id) => nodes[id], createElement: element },
  window: { scrollTo() {} },
  localStorage,
});
vm.runInContext(fs.readFileSync('verbs.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('translations.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('app.js', 'utf8'), context);
const verbs = vm.runInContext('verbs', context);
assert.equal(verbs.length, 164);
assert.equal(new Set(verbs.map((verb) => verb.v1)).size, 164);
assert.equal(new Set(verbs.map((verb) => verb.ru)).has(undefined), false);
nodes['start-button'].listeners.click();
assert.equal(nodes.verb.textContent, 'be');
assert.equal(nodes.translation.textContent, 'быть');
nodes['mark-button'].listeners.click();
assert.equal(nodes['unlearned-count'].textContent, 1);
nodes['open-unlearned'].listeners.click();
assert.equal(nodes['unlearned-list'].children.length, 1);
nodes['back-button'].listeners.click();

function submit() { nodes['answer-form'].listeners.submit({ preventDefault() {} }); }
function enterFromInput() {
  let prevented = false;
  nodes['answer-form'].listeners.keydown({ key: 'Enter', isComposing: false, preventDefault() { prevented = true; } });
  return prevented;
}
nodes.v2.value = ' WERE ';
nodes.v3.value = 'BEEN';
submit();
assert.equal(nodes['v2-feedback'].textContent, '✓ Верно');
assert.equal(nodes['v3-feedback'].textContent, '✓ Верно');
assert.equal(enterFromInput(), true);
assert.equal(nodes.verb.textContent, 'have');
assert.equal(nodes.translation.textContent, 'иметь');

nodes.v2.value = 'wrong';
nodes.v3.value = 'had';
submit();
assert.match(nodes['v2-feedback'].textContent, /had/);
assert.equal(enterFromInput(), true);
assert.equal(nodes.verb.textContent, 'get');
assert.equal(nodes['unlearned-count'].textContent, 2);
nodes['open-unlearned'].listeners.click();
nodes['add-unlearned-input'].value = 'WRITE';
nodes['add-unlearned-form'].listeners.submit({ preventDefault() {} });
assert.equal(nodes['unlearned-count'].textContent, 3);
nodes['unlearned-list'].children[0].children[1].listeners.click();
assert.equal(nodes['unlearned-count'].textContent, 2);
nodes['back-button'].listeners.click();

for (let i = 2; i < verbs.length; i++) {
  assert.equal(nodes.verb.textContent, verbs[i].v1);
  nodes.v2.value = verbs[i].v2.at(-1);
  nodes.v3.value = verbs[i].v3.at(-1);
  submit();
  assert.equal(nodes['v2-feedback'].textContent, '✓ Верно');
  assert.equal(nodes['v3-feedback'].textContent, '✓ Верно');
  assert.equal(enterFromInput(), true);
}
assert.equal(nodes['result-correct'].textContent, 163);
assert.equal(nodes['result-mistakes'].textContent, 1);
assert.equal(nodes['result-percent'].textContent, '99.7%');
assert.equal(nodes['review-list'].children.length, 1);
assert.deepEqual(JSON.parse(storage.get('verb-practice-unlearned-v1')).sort(), ['have', 'write']);
const reloadedNodes = Object.fromEntries(ids.map((id) => [id, element()]));
const reloadedContext = vm.createContext({
  document: { getElementById: (id) => reloadedNodes[id], createElement: element },
  window: { scrollTo() {} }, localStorage,
});
for (const file of ['verbs.js', 'translations.js', 'app.js']) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), reloadedContext);
}
assert.equal(reloadedNodes['unlearned-count'].textContent, 2);
reloadedNodes['open-unlearned'].listeners.click();
assert.equal(reloadedNodes['unlearned-list'].children.length, 2);
console.log('PASS: 164 translations, manual and automatic marks, list editing, persistence, Enter, results');
