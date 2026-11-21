// Run with: node verify-rise-arise.js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function element() {
  const classes = new Set();
  return {
    listeners: {}, classes, value: '', textContent: '', innerHTML: '', style: {}, children: [],
    classList: { add: (name) => classes.add(name), remove: (name) => classes.delete(name), toggle: (name, on) => on ? classes.add(name) : classes.delete(name) },
    addEventListener(name, handler) { this.listeners[name] = handler; },
    setAttribute(name, value) { this[name] = value; },
    append(...children) { this.children.push(...children); },
    replaceChildren(...children) { this.children = children; },
    focus() {}, scrollIntoView() {},
  };
}

const ids = ['rise-practice','rise-intro','rise-quiz','rise-results','rise-start','rise-form','rise-order','rise-exit','rise-new','rise-retry',
  'rise-counter','rise-score','rise-progress','rise-progress-fill','rise-clue','rise-before','rise-after','rise-answer',
  'rise-feedback','rise-action','rise-result-score','rise-review'];
const nodes = Object.fromEntries(ids.map((id) => [id, element()]));
const context = vm.createContext({ document: { getElementById: (id) => nodes[id], createElement: element } });
vm.runInContext(fs.readFileSync('practice-order.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('rise-arise.js', 'utf8'), context);
const questions = vm.runInContext('riseQuestions', context);
assert.equal(questions.length, 30);
assert.equal(new Set(questions.map((q) => `${q.before}|${q.after}`)).size, 30);
assert.ok(questions.every((q) => ['rise','rises','rose','risen','rising','arise','arises','arose','arisen','arising'].includes(q.answer)));
nodes['rise-start'].listeners.click();
assert.equal(nodes['rise-counter'].textContent, '1 / 30');
nodes['rise-order'].listeners.click();
assert.equal(nodes['rise-order']['aria-pressed'], 'true');
assert.equal(vm.runInContext('riseState.queue.some((item, index) => item !== riseState.original[index])', context), true);
nodes['rise-order'].listeners.click();
assert.equal(nodes['rise-before'].textContent, questions[0].before);

const submit = () => nodes['rise-form'].listeners.submit({ preventDefault() {} });
for (let index = 0; index < questions.length; index++) {
  nodes['rise-answer'].value = index === 0 ? 'wrong' : questions[index].answer.toUpperCase();
  submit();
  assert.equal(nodes['rise-answer'].readOnly, true);
  let prevented = false;
  nodes['rise-form'].listeners.keydown({ key: 'Enter', isComposing: false, preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
}
assert.match(nodes['rise-result-score'].textContent, /29 из 30 верно/);
assert.equal(nodes['rise-review'].children.length, 1);
nodes['rise-retry'].listeners.click();
assert.equal(nodes['rise-counter'].textContent, '1 / 1');
nodes['rise-answer'].value = questions[0].answer;
submit(); submit();
assert.match(nodes['rise-result-score'].textContent, /1 из 1 верно/);
assert.equal(nodes['rise-retry'].classes.has('hidden'), true);
assert.match(fs.readFileSync('rise-arise.html', 'utf8'), /href="nouns.html"/);
console.log('PASS: 30 rise/arise exercises, forms, order toggle, Enter, results, retry');
