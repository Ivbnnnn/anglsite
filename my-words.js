const own = (id) => document.getElementById(id);
let editingId = null;
let suggestionTimer = null;
let requestVersion = 0;
let translationEdited = false;

for (const topic of myWordsStore.topics) {
  for (const select of [own('own-topic'), own('own-filter')]) {
    const option = document.createElement('option');
    option.value = topic.id;
    option.textContent = topic.title;
    select.append(option);
  }
}
const otherOption = document.createElement('option');
otherOption.value = 'other';
otherOption.textContent = 'Без темы';
own('own-topic').prepend(otherOption);
const otherFilter = otherOption.cloneNode(true);
own('own-filter').append(otherFilter);
own('own-topic').value = 'other';

function topicName(id) { return myWordsStore.topics.find((topic) => topic.id === id)?.title || 'Без темы'; }
function resetForm() {
  editingId = null;
  translationEdited = false;
  requestVersion++;
  clearTimeout(suggestionTimer);
  own('own-form').reset();
  own('own-topic').value = 'other';
  own('form-title').textContent = 'Добавить слово или фразу';
  own('own-save').innerHTML = 'Сохранить <span aria-hidden="true">→</span>';
  own('own-cancel').classList.add('hidden');
  own('suggest-status').textContent = 'Введите английское слово или фразу.';
  own('form-message').textContent = '';
}
function editWord(item) {
  editingId = item.id;
  requestVersion++;
  clearTimeout(suggestionTimer);
  translationEdited = true;
  own('own-en').value = item.en;
  own('own-ru').value = item.ru;
  own('own-topic').value = item.topicId;
  own('form-title').textContent = 'Изменить слово или фразу';
  own('own-save').innerHTML = 'Сохранить изменения <span aria-hidden="true">→</span>';
  own('own-cancel').classList.remove('hidden');
  own('suggest-status').textContent = 'Перевод можно изменить вручную.';
  own('form-message').textContent = '';
  own('own-en').focus();
  own('own-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function renderWords() {
  const items = myWordsStore.load();
  const query = own('own-search').value.trim().toLocaleLowerCase();
  const filter = own('own-filter').value;
  const visible = items.filter((item) => (filter === 'all' || item.topicId === filter) && (!query || `${item.en} ${item.ru}`.toLocaleLowerCase().includes(query))).reverse();
  own('own-count').textContent = items.length;
  own('own-empty').classList.toggle('hidden', visible.length > 0);
  own('own-empty').textContent = items.length ? 'По этому запросу ничего не найдено.' : 'Пока нет слов. Добавь первое выражение слева.';
  own('own-list').replaceChildren(...visible.map((item) => {
    const row = document.createElement('article');
    row.className = 'own-row';
    const body = document.createElement('div');
    const tag = document.createElement('small');
    tag.textContent = topicName(item.topicId);
    const english = document.createElement('strong');
    english.className = 'lookup-term';
    english.dataset.lookupTerm = item.en;
    english.textContent = item.en;
    const russian = document.createElement('span');
    russian.textContent = item.ru;
    body.append(tag, english, russian);
    const actions = document.createElement('div');
    actions.className = 'own-row-actions';
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.textContent = 'Изменить';
    edit.addEventListener('click', () => editWord(item));
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.textContent = 'Удалить';
    remove.addEventListener('click', () => {
      if (!window.confirm(`Удалить «${item.en}» из списка?`)) return;
      if (!myWordsStore.remove(item.id)) own('form-message').textContent = 'Не удалось удалить слово.';
      if (editingId === item.id) resetForm();
    });
    actions.append(edit, remove);
    row.append(body, actions);
    return row;
  }));
}

async function suggestTranslation(force = false) {
  const en = own('own-en').value.trim();
  const version = ++requestVersion;
  if (en.length < 2) { own('suggest-status').textContent = 'Введи хотя бы два символа.'; return; }
  const local = myWordsStore.suggestLocal(en);
  if (local) {
    if (force || !translationEdited || !own('own-ru').value.trim()) own('own-ru').value = local.ru;
    if (own('own-topic').value === 'other') own('own-topic').value = local.topicId;
    own('suggest-status').textContent = 'Предложено из тематического словаря. Проверь и при необходимости измени.';
    return;
  }
  if (!force) {
    own('suggest-status').textContent = 'Новой фразы нет в словаре. Нажми «Предложить перевод», чтобы запустить переводчик в браузере.';
    return;
  }
  own('suggest-status').textContent = 'Подготавливаю перевод в браузере…';
  own('suggest-button').disabled = true;
  try {
    const data = await browserAI.translate(en, (message) => {
      if (version === requestVersion) own('suggest-status').textContent = message;
    });
    if (version !== requestVersion || own('own-en').value.trim() !== en) return;
    if (!data.translation || !/[А-Яа-яЁё]/.test(data.translation)) throw new Error('non-russian translation');
    if (force || !translationEdited || !own('own-ru').value.trim()) own('own-ru').value = data.translation;
    own('suggest-status').textContent = `Предложено: ${data.source}. Проверь перевод перед сохранением.`;
  } catch (error) {
    if (version === requestVersion) own('suggest-status').textContent = error.message === 'non-russian translation'
      ? 'Модель не дала русский перевод. Впиши его вручную.'
      : 'Не удалось запустить модель. Проверь интернет для первой загрузки или впиши перевод вручную.';
  } finally {
    own('suggest-button').disabled = false;
  }
}

own('own-en').addEventListener('input', () => {
  requestVersion++;
  clearTimeout(suggestionTimer);
  if (!editingId && !translationEdited) own('own-ru').value = '';
  own('suggest-status').textContent = 'Проверяю готовый словарь…';
  suggestionTimer = setTimeout(suggestTranslation, 550);
});
own('own-ru').addEventListener('input', () => { translationEdited = true; });
own('suggest-button').addEventListener('click', () => { clearTimeout(suggestionTimer); suggestTranslation(true); });
own('own-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const result = myWordsStore.upsert({ id: editingId, en: own('own-en').value, ru: own('own-ru').value, topicId: own('own-topic').value });
  if (!result.ok) { own('form-message').textContent = result.error; return; }
  resetForm();
  own('form-message').textContent = 'Сохранено.';
});
own('own-cancel').addEventListener('click', resetForm);
own('own-search').addEventListener('input', renderWords);
own('own-filter').addEventListener('change', renderWords);
window.addEventListener('mywordschange', renderWords);
window.addEventListener('storage', renderWords);
renderWords();
const editFromMap = new URLSearchParams(location.search).get('edit');
if (editFromMap) {
  const item = myWordsStore.load().find((word) => word.id === editFromMap);
  if (item) editWord(item);
}
