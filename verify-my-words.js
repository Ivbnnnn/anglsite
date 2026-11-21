// Run with: node verify-my-words.js
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const memory = new Map();
const storage = { getItem: (key) => memory.get(key) || null, setItem: (key, value) => memory.set(key, value) };
const events = [];
const context = vm.createContext({
  localStorage: storage, Event: class { constructor(type) { this.type = type; } },
  window: { dispatchEvent: (event) => events.push(event.type) },
  Date, Math,
});
for (const file of ['vocab-data.js', 'vocab-extra.js', 'my-words-store.js']) vm.runInContext(fs.readFileSync(file, 'utf8'), context);
const store = vm.runInContext('myWordsStore', context);
assert.equal(store.load().length, 0);
assert.equal(store.suggestLocal('Urban sprawl').ru, 'разрастание города');
let result = store.upsert({ en: 'take into account', ru: 'принимать во внимание', topicId: 'education' });
assert.equal(result.ok, true);
const id = result.item.id;
assert.equal(store.load()[0].topicId, 'education');
assert.equal(store.upsert({ en: 'TAKE INTO ACCOUNT', ru: 'учитывать', topicId: 'other' }).ok, false);
result = store.upsert({ id, en: 'take into account', ru: 'учитывать', topicId: 'other' });
assert.equal(result.ok, true);
assert.equal(store.load()[0].ru, 'учитывать');
assert.equal(store.load()[0].topicId, 'other');
assert.equal(events.length, 2);
const loadedAgain = vm.runInContext('myWordsStore.load()', context);
assert.equal(loadedAgain.length, 1);
assert.equal(store.remove(id), true);
assert.equal(store.load().length, 0);
console.log('PASS: local suggestion, save, duplicate guard, edit, persistence, delete');
