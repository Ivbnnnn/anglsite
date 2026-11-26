const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function loadLesson(file) {
  const elements = new Map();
  const element = () => ({
    handlers: {},
    children: [],
    value: '',
    classList: { add() {}, toggle() {} },
    addEventListener(name, handler) { this.handlers[name] = handler; },
    setAttribute(name, value) { this[name] = value; },
    append(...items) { this.children.push(...items); },
    replaceChildren(...items) { this.children = items; },
    focus() {},
  });
  const section = {
    querySelector(selector) {
      if (!elements.has(selector)) elements.set(selector, element());
      return elements.get(selector);
    },
    scrollIntoView() {},
  };
  const context = vm.createContext({
    document: { getElementById: () => section, createElement: element },
    Option: class { constructor(text, value) { Object.assign(this, { text, value }); } },
  });
  for (const script of ['practice-order.js', 'lesson-practice.js', file + '.js']) {
    vm.runInContext(fs.readFileSync(script, 'utf8'), context);
  }
  const el = (name) => section.querySelector('#lesson-' + name);
  const click = (name) => el(name).handlers.click();
  const submit = (typed) => {
    if (typed !== undefined) el('answer').value = typed;
    el('form').handlers.submit({ preventDefault() {} });
  };
  const nextByEnter = () => {
    let prevented = false;
    el('form').handlers.keydown({ key: 'Enter', target: el('answer'), preventDefault() { prevented = true; } });
    assert.ok(prevented);
  };
  return { el, click, submit, nextByEnter };
}

const articles = loadLesson('articles');
assert.match(articles.el('total').textContent, /59/);
articles.el('group').value = 'Общее значение и нулевой артикль';
articles.el('group').handlers.change();
articles.click('start');
assert.equal(articles.el('counter').textContent, '1 / 12');
articles.submit('');
assert.match(articles.el('feedback').textContent, /Без артикля/);
articles.click('zero');
articles.submit();
assert.match(articles.el('feedback').textContent, /^Верно/);
articles.nextByEnter();
assert.equal(articles.el('counter').textContent, '2 / 12');
articles.click('order');
assert.equal(articles.el('order')['aria-pressed'], 'true');
articles.click('order');
assert.equal(articles.el('before').textContent, '');

const verbs = loadLesson('theft-verbs');
assert.match(verbs.el('total').textContent, /30/);
verbs.click('start');
for (const [answer, verdict] of [['ROBBED', /^Верно/], ['robbed', /^Правильно — burgled/], ['stole', /^Верно/]]) {
  verbs.submit(answer);
  assert.match(verbs.el('feedback').textContent, verdict);
  verbs.nextByEnter();
}
assert.equal(verbs.el('counter').textContent, '4 / 30');
verbs.click('exit');
verbs.el('group').value = 'Rob: ограбить или лишить';
verbs.click('start');
for (const answer of ['stole', 'robbed', 'rob', 'robbed', 'robbed', 'robbing', 'robbed', 'rob', 'robbed', 'robbed']) {
  verbs.submit(answer);
  verbs.nextByEnter();
}
assert.equal(verbs.el('score').textContent, '9 из 10 верно');
assert.equal(verbs.el('review').children.length, 1);
verbs.click('retry');
assert.equal(verbs.el('counter').textContent, '1 / 1');
verbs.submit('robbed');
verbs.nextByEnter();
assert.equal(verbs.el('score').textContent, '1 из 1 верно');
console.log('PASS: articles, explicit zero article, order toggle, interleaved verbs, Enter, results and retry');
