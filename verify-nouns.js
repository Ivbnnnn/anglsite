// Run with: node verify-nouns.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

let selectedTypes = ['agreement', 'forms', 'usage', 'quantifiers', 'numerals', 'number', 'amount', 'participles'];
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
ids.push('noun-reference');
const nodes = Object.fromEntries(ids.map((id) => [id, element()]));
nodes['nouns-session-size'].value = 'all';
const context = vm.createContext({ document: { getElementById: (id) => nodes[id], createElement: element } });
for (const file of ['practice-order.js', 'noun-reference.js', 'noun-grammar.js', 'nouns.js']) {
  vm.runInContext(fs.readFileSync(file, 'utf8'), context);
}
const questions = vm.runInContext('nounQuestions', context);
assert.ok(questions.length >= 120);
assert.equal(new Set(questions.map((q) => q.type)).size, selectedTypes.length);
const groups = vm.runInContext('nounReferenceGroups', context);
assert.equal(nodes['noun-reference'].children.length, groups.length);
const targets = new Map();
for (const { question, word } of groups.flatMap((group) => group.entries)) {
  assert.ok(questions.includes(question) && question.after !== undefined && question.answers.every(Boolean), word);
  targets.set(word, (targets.get(word) || 0) + 1);
}
assert.ok(Math.max(...targets.values()) <= 2);
assert.equal(targets.get('aircraft'), 1);
assert.equal(new Set(questions.map((q) => `${q.before}_${q.after}`)).size, questions.length);
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
  nodes['nouns-answer'].value = index === 0 ? 'incorrect' : questions[index].answers[0].toUpperCase();
  submit(); // Enter in the input checks the answer.
  assert.equal(nodes['nouns-answer'].readOnly, true);
  if (index === 0) assert.ok(nodes['nouns-feedback'].textContent.includes(`Правильно: ${questions[0].answers[0]}`));
  let prevented = false;
  nodes['nouns-form'].handlers.keydown({ target: nodes['nouns-answer'], key: 'Enter', preventDefault() { prevented = true; } });
  assert.ok(prevented);
}
assert.match(nodes['nouns-score'].textContent, new RegExp(`${questions.length - 1} из ${questions.length}`));
assert.equal(nodes['nouns-review'].children.length, 1);
nodes['nouns-retry'].handlers.click();
assert.equal(nodes['nouns-counter'].textContent, '1 / 1');
nodes['nouns-answer'].value = ` ${questions[0].answers[0]} `;
submit();
submit();
assert.match(nodes['nouns-score'].textContent, /1 из 1/);
assert.equal(nodes['nouns-retry'].classes.has('hidden'), true);
nodes['nouns-new'].handlers.click();
nodes['nouns-session-size'].value = '20';
nodes['nouns-start'].handlers.click();
assert.equal(nodes['nouns-counter'].textContent, '1 / 20');
nodes['nouns-exit'].handlers.click();
for (const type of ['quantifiers', 'numerals', 'number', 'amount', 'participles']) {
  selectedTypes = [type];
  nodes['nouns-session-size'].value = 'all';
  nodes['nouns-start'].handlers.click();
  assert.equal(nodes['nouns-counter'].textContent, `1 / ${questions.filter((q) => q.type === type).length}`);
  assert.ok(vm.runInContext('nounSession', context).every((q) => q.type === type));
  nodes['nouns-exit'].handlers.click();
}
selectedTypes = [];
nodes['nouns-start'].handlers.click();
assert.match(nodes['nouns-setup-message'].textContent, /Выбери/);
const html = fs.readFileSync('noun-plurals.html', 'utf8');
for (const id of ids) assert.ok(html.includes(`id="${id}"`), `Missing element ${id}`);
for (const page of ['index.html', 'vocabulary.html', 'vocab-test.html', 'my-words.html', 'word-map.html']) {
  assert.match(fs.readFileSync(page, 'utf8'), /href="nouns.html"/);
}
for (const page of ['index.html', 'vocabulary.html', 'vocab-test.html', 'nouns.html', 'noun-plurals.html', 'rise-raise.html', 'my-words.html', 'word-map.html']) {
  const source = fs.readFileSync(page, 'utf8');
  assert.match(source, /href="dark-theme.css"/);
  assert.match(source, /theme-color" content="#11121f"/);
}
for (const [page, button] of [['index.html', 'verb-order'], ['vocab-test.html', 'vocab-order'], ['noun-plurals.html', 'nouns-order'], ['rise-raise.html', 'rise-order']]) {
  const source = fs.readFileSync(page, 'utf8');
  assert.match(source, /src="practice-order\.js"/);
  assert.match(source, /href="practice-order\.css"/);
  assert.ok(source.includes(`id="${button}" type="button"`));
}
assert.match(fs.readFileSync('vocab-test.html', 'utf8'), /id="source-book"/);
assert.match(fs.readFileSync('vocab-test.html', 'utf8'), /id="source-ielts"/);
assert.match(fs.readFileSync('nouns.html', 'utf8'), /href="noun-plurals.html"/);
assert.match(fs.readFileSync('nouns.html', 'utf8'), /href="rise-raise.html"/);
console.log(`PASS: ${targets.size} noun targets, ${questions.length} grammar questions, balanced coverage, topic filters, Enter, results and retry`);
