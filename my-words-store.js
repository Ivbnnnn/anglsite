const myWordsStore = (() => {
  const key = 'verb-practice-my-words-v1';
  const topicIds = new Set(vocabularyTopics.map((topic) => topic.id));
  const catalog = new Map(vocabularyTopics.flatMap((topic) => topic.words.map((word) => [word.en.toLocaleLowerCase(), { ru: word.ru, topicId: topic.id }])));
  catalog.set('dentures', { ru: 'зубные протезы', topicId: 'health' });
  catalog.set('denture', { ru: 'зубной протез', topicId: 'health' });
  const clean = (value, limit = 160) => String(value ?? '').trim().replace(/\s+/g, ' ').slice(0, limit);

  function load() {
    try {
      const value = JSON.parse(localStorage.getItem(key) || '[]');
      if (!Array.isArray(value)) return [];
      return value.filter((item) => item && typeof item.id === 'string' && typeof item.en === 'string' && typeof item.ru === 'string')
        .map((item) => ({ id: item.id, en: clean(item.en), ru: clean(item.ru), topicId: topicIds.has(item.topicId) ? item.topicId : 'other', createdAt: item.createdAt || '' }))
        .filter((item) => item.en && item.ru);
    } catch { return []; }
  }

  function save(items) {
    try {
      localStorage.setItem(key, JSON.stringify(items));
      window.dispatchEvent(new Event('mywordschange'));
      return true;
    } catch { return false; }
  }

  function upsert(input) {
    const en = clean(input.en);
    const ru = clean(input.ru);
    if (!en || !ru) return { ok: false, error: 'Заполни английскую фразу и перевод.' };
    const topicId = topicIds.has(input.topicId) ? input.topicId : 'other';
    const items = load();
    const duplicate = items.find((item) => item.en.toLocaleLowerCase() === en.toLocaleLowerCase() && item.id !== input.id);
    if (duplicate) return { ok: false, error: 'Такая английская фраза уже есть в списке.' };
    const previous = input.id ? items.find((item) => item.id === input.id) : null;
    const item = { id: previous?.id || (globalThis.crypto?.randomUUID?.() || `word-${Date.now()}-${Math.random().toString(36).slice(2)}`), en, ru, topicId, createdAt: previous?.createdAt || new Date().toISOString() };
    const next = previous ? items.map((entry) => entry.id === item.id ? item : entry) : [...items, item];
    return save(next) ? { ok: true, item } : { ok: false, error: 'Не удалось сохранить в браузере. Проверь настройки хранения данных.' };
  }

  function remove(id) { return save(load().filter((item) => item.id !== id)); }
  function suggestLocal(en) { return catalog.get(clean(en).toLocaleLowerCase()) || null; }

  return { load, upsert, remove, suggestLocal, topics: vocabularyTopics.map(({ id, title }) => ({ id, title })) };
})();
