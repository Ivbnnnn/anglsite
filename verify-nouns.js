// Run with: node verify-nouns.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

let selectedTypes = ['agreement', 'forms', 'usage', 'quantifiers'];
function element() {
  const classes = new Set();
  return {
    classes, handlers: {}, value: '', textContent: '', innerHTML: '', style: {}, children: [],
    classList: { add: (name) => classes.add(name), remove: (name) => classes.delete(name), toggle: (name, on) => on ? classes.add(name) : classes.delete(name) },
    addEventListener(name, handler) { this.handlers[name] = handler; },
    setAttribute(name, value) { this[name] = value; },
    scrollIntoView() {}, focus() {},
    append(...children) { this.children.push(...children); },
    replaceChildren(...children) { this.children = children; },
    querySelectorAll() { return selectedTypes.map((value) => ({ value })); },
  };
}
const ids = ['nouns-start', 'nouns-setup', 'nouns-setup-message', 'nouns-results', 'nouns-quiz',
  'nouns-category', 'nouns-counter', 'nouns-progress', 'nouns-progress-fill', 'nouns-instruction',
  'nouns-before', 'nouns-after', 'nouns-answer', 'nouns-feedback', 'nouns-action', 'nouns-form',
  'nouns-exit', 'nouns-new', 'nouns-retry', 'nouns-score', 'nouns-review', 'nouns-session-size', 'nouns-total', 'nouns-order'];
const nodes = Object.fromEntries(ids.map((id) => [id, element()]));
nodes['nouns-session-size'].value = 'all';
const context = vm.createContext({ document: { getElementById: (id) => nodes[id], createElement: element } });
vm.runInContext(fs.readFileSync('practice-order.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('nouns.js', 'utf8'), context);
const questions = vm.runInContext('nounQuestions', context);
assert.ok(questions.length >= 120);
assert.equal(new Set(questions.map((q) => q.type)).size, 4);
assert.equal(Number(nodes['nouns-total'].textContent), questions.length);
nodes['nouns-start'].handlers.click();
assert.equal(nodes['nouns-counter'].textContent, `1 / ${questions.length}`);
nodes['nouns-order'].handlers.click();
assert.equal(nodes['nouns-order']['aria-pressed'], 'true');
assert.equal(vm.runInContext('nounSession.some((item, index) => item !== nounStudySession[index])', context), true);
nodes['nouns-order'].handlers.click();
assert.equal(nodes['nouns-before'].textContent, questions[0].before);
const submit = () => nodes['nouns-form'].handlers.submit({ preventDefault() {} });
submit();
assert.match(nodes['nouns-feedback'].textContent, /Впиши ответ/);
for (let index = 0; index < questions.length; index++) {
  nodes['nouns-answer'].value = index === 0 ? 'is' : questions[index].answers[0].toUpperCase();
  submit(); // Enter in the input checks the answer.
  assert.equal(nodes['nouns-answer'].readOnly, true);
  if (index === 0) assert.match(nodes['nouns-feedback'].textContent, /Правильно: are/);
  submit(); // The next Enter advances (or opens results).
}
assert.match(nodes['nouns-score'].textContent, new RegExp(`${questions.length - 1} из ${questions.length}`));
assert.equal(nodes['nouns-review'].children.length, 1);
nodes['nouns-retry'].handlers.click();
assert.equal(nodes['nouns-counter'].textContent, '1 / 1');
nodes['nouns-answer'].value = ' are ';
submit();
submit();
assert.match(nodes['nouns-score'].textContent, /1 из 1/);
assert.equal(nodes['nouns-retry'].classes.has('hidden'), true);
nodes['nouns-new'].handlers.click();
nodes['nouns-session-size'].value = '20';
nodes['nouns-start'].handlers.click();
assert.equal(nodes['nouns-counter'].textContent, '1 / 20');
nodes['nouns-exit'].handlers.click();
selectedTypes = ['quantifiers'];
nodes['nouns-session-size'].value = 'all';
nodes['nouns-start'].handlers.click();
assert.equal(nodes['nouns-counter'].textContent, `1 / ${questions.filter((q) => q.type === 'quantifiers').length}`);
nodes['nouns-exit'].handlers.click();
selectedTypes = [];
nodes['nouns-start'].handlers.click();
assert.match(nodes['nouns-setup-message'].textContent, /Выбери/);
const html = fs.readFileSync('nouns.html', 'utf8');
for (const id of ids) assert.ok(html.includes(`id="${id}"`), `Missing element ${id}`);
for (const page of ['index.html', 'vocabulary.html', 'vocab-test.html', 'my-words.html', 'word-map.html']) {
  assert.match(fs.readFileSync(page, 'utf8'), /href="nouns.html"/);
}
for (const page of ['index.html', 'vocabulary.html', 'vocab-test.html', 'nouns.html', 'my-words.html', 'word-map.html']) {
  const source = fs.readFileSync(page, 'utf8');
  assert.match(source, /href="dark-theme.css"/);
  assert.match(source, /theme-color" content="#11121f"/);
}
for (const [page, button] of [['index.html', 'verb-order'], ['vocab-test.html', 'vocab-order'], ['nouns.html', 'nouns-order']]) {
  const source = fs.readFileSync(page, 'utf8');
  assert.match(source, /src="practice-order\.js"/);
  assert.match(source, /href="practice-order\.css"/);
  assert.ok(source.includes(`id="${button}" type="button"`));
}
assert.match(fs.readFileSync('vocab-test.html', 'utf8'), /id="source-book"/);
assert.match(fs.readFileSync('vocab-test.html', 'utf8'), /id="source-ielts"/);
console.log(`PASS: ${questions.length} noun questions, short and filtered sessions, typed answers, Enter, results, retry, dark theme links`);
