// Run with: node verify-vocab-test.js
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

function element() {
  const listeners = {}, classes = new Set();
  return {
    listeners, classes, dataset: {}, style: {}, value: '', textContent: '', innerHTML: '', checked: false,
    classList: { add: (x) => classes.add(x), remove: (x) => classes.delete(x), toggle: (x, on) => on ? classes.add(x) : classes.delete(x) },
    addEventListener: (type, handler) => { listeners[type] = handler; },
    setAttribute(name, value) { this[name] = value; },
    append(...children) { this.children = [...(this.children || []), ...children]; },
    replaceChildren(...children) { this.children = children; },
    focus() {},
  };
}
const ids = ['setup','quiz','test-results','selection-count','start-test','setup-note','topic-options',
  'quiz-progress','quiz-prompt','quiz-direction','quiz-answer-label','quiz-topic-name',
  'quiz-topic','quiz-counter','quiz-progress-fill','quiz-answer','quiz-feedback',
  'quiz-action','quiz-form','test-correct','test-errors','test-accuracy',
  'test-result-copy','retry-errors','test-review','select-all','clear-all',
  'quit-test','new-test','source-book','source-ielts','vocab-order'];
const nodes = Object.fromEntries(ids.map((id) => [id, element()]));
nodes['source-book'].checked = true;
nodes['source-ielts'].checked = true;
let direction = 'ru-en';
const inputs = () => nodes['topic-options'].children.map((label) => label.children[0]);
const document = {
  getElementById: (id) => nodes[id], createElement: element,
  querySelectorAll(selector) {
    if (selector === '.topic-option input') return inputs();
    if (selector === '.topic-option input:checked') return inputs().filter((input) => input.checked);
    throw Error(`Unexpected selector: ${selector}`);
  },
  querySelector(selector) {
    if (selector === 'input[name="direction"]:checked') return { value: direction };
    throw Error(`Unexpected selector: ${selector}`);
  },
};
const context = vm.createContext({ document, window: { scrollTo() {} }, location: { search: '?topics=city,health' }, URLSearchParams });
for (const file of ['vocab-data.js','vocab-extra.js','practice-order.js','vocab-test.js']) vm.runInContext(fs.readFileSync(file,'utf8'), context);
assert.equal(nodes['selection-count'].textContent, '2 из 12 выбрано');
assert.equal(nodes['setup-note'].textContent, '100 выражений в одном сеансе.');
nodes['start-test'].listeners.click();
assert.equal(nodes['quiz-prompt'].textContent, 'городской образ жизни');
nodes['vocab-order'].listeners.click();
assert.equal(nodes['vocab-order']['aria-pressed'], 'true');
assert.equal(vm.runInContext('testState.queue.some((item, index) => item !== testState.studyQueue[index])', context), true);
nodes['vocab-order'].listeners.click();
assert.equal(nodes['quiz-prompt'].textContent, 'городской образ жизни');
const queue = vm.runInContext('testState.queue', context);
assert.equal(queue.length, 100);

function submit() { nodes['quiz-form'].listeners.submit({ preventDefault() {} }); }
function enter() {
  let prevented = false;
  nodes['quiz-form'].listeners.keydown({ key: 'Enter', isComposing: false, preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
}
for (let i = 0; i < queue.length; i++) {
  assert.equal(nodes['quiz-prompt'].textContent, queue[i].ru);
  nodes['quiz-answer'].value = i === 1 ? 'wrong' : queue[i].en;
  submit();
  assert.equal(nodes['quiz-feedback'].textContent, i === 1 ? `Правильно: ${queue[i].en}` : '✓ Верно');
  enter();
}
assert.equal(nodes['test-correct'].textContent, 99);
assert.equal(nodes['test-errors'].textContent, 1);
assert.equal(nodes['test-review'].children.length, 1);
nodes['retry-errors'].listeners.click();
assert.equal(vm.runInContext('testState.queue.length', context), 1);
nodes['quiz-answer'].value = queue[1].en;
submit(); enter();
assert.equal(nodes['test-errors'].textContent, 0);

nodes['new-test'].listeners.click();
nodes['source-ielts'].checked = false;
nodes['source-ielts'].listeners.change();
const bookCount = vm.runInContext("vocabularyTopics.find((topic) => topic.id === 'city').words.filter((word) => word.origin === 'core').length", context);
assert.equal(nodes['setup-note'].textContent, `${bookCount * 2} выражений в одном сеансе.`);
assert.equal(vm.runInContext("buildQueue(['city', 'health']).every((word) => word.origin === 'core')", context), true);
nodes['source-ielts'].checked = true;
nodes['source-book'].checked = false;
nodes['source-book'].listeners.change();
const ieltsCount = vm.runInContext("vocabularyTopics.find((topic) => topic.id === 'city').words.filter((word) => word.origin === 'advanced').length", context);
assert.equal(nodes['setup-note'].textContent, `${ieltsCount * 2} выражений в одном сеансе.`);
assert.equal(vm.runInContext("buildQueue(['city', 'health']).every((word) => word.origin === 'advanced')", context), true);
nodes['source-ielts'].checked = false;
nodes['source-ielts'].listeners.change();
assert.equal(nodes['start-test'].disabled, true);
assert.equal(nodes['setup-note'].textContent, 'Выбери хотя бы один источник.');
nodes['source-ielts'].checked = true;
nodes['source-book'].checked = true;
nodes['source-book'].listeners.change();
direction = 'en-ru';
for (const input of inputs()) input.checked = input.value === 'city';
nodes['start-test'].listeners.click();
const reverseQueue = vm.runInContext('testState.queue', context);
assert.equal(reverseQueue.length, 50);
assert.equal(nodes['quiz-prompt'].textContent, 'urban lifestyle');
for (const item of reverseQueue) {
  assert.equal(nodes['quiz-prompt'].textContent, item.en);
  nodes['quiz-answer'].value = item.ru.toUpperCase();
  submit();
  assert.equal(nodes['quiz-feedback'].textContent, '✓ Верно');
  enter();
}
assert.equal(nodes['test-correct'].textContent, 50);
assert.equal(nodes['test-errors'].textContent, 0);
console.log('PASS: selected topics, both directions, typed answers, Enter, results, retry');
