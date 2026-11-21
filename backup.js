const backupKeys = {
  words: 'verb-practice-my-words-v1',
  unlearned: 'verb-practice-unlearned-v1',
};
const backupStatus = document.getElementById('backup-status');

function backupExport() {
  const payload = {
    format: 'verb-practice-backup', version: 1, exportedAt: new Date().toISOString(),
    words: myWordsStore.load(),
    unlearned: JSON.parse(localStorage.getItem(backupKeys.unlearned) || '[]'),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `anglsite-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  backupStatus.textContent = 'Резервная копия скачана.';
}

function backupMerge(payload) {
  if (payload?.format !== 'verb-practice-backup' || payload.version !== 1 || !Array.isArray(payload.words) || !Array.isArray(payload.unlearned)) {
    throw new Error('Это не файл резервной копии anglsite.');
  }
  const existing = myWordsStore.load();
  const seen = new Set(existing.map((item) => item.en.toLocaleLowerCase()));
  const merged = [...existing];
  let added = 0;
  for (const item of payload.words) {
    if (!item || typeof item.en !== 'string' || typeof item.ru !== 'string') continue;
    const en = item.en.trim().replace(/\s+/g, ' ').slice(0, 160);
    const ru = item.ru.trim().replace(/\s+/g, ' ').slice(0, 160);
    if (!en || !ru || seen.has(en.toLocaleLowerCase())) continue;
    seen.add(en.toLocaleLowerCase());
    merged.push({
      id: globalThis.crypto?.randomUUID?.() || `import-${Date.now()}-${added}`,
      en, ru,
      topicId: myWordsStore.topics.some((topic) => topic.id === item.topicId) ? item.topicId : 'other',
      createdAt: typeof item.createdAt === 'string' ? item.createdAt.slice(0, 40) : '',
    });
    added++;
  }
  const beforeWords = localStorage.getItem(backupKeys.words);
  const beforeVerbs = localStorage.getItem(backupKeys.unlearned);
  const known = Array.isArray(JSON.parse(beforeVerbs || '[]')) ? JSON.parse(beforeVerbs || '[]') : [];
  const unlearned = [...new Set([...known, ...payload.unlearned].filter((value) => typeof value === 'string' && value.length <= 40))];
  try {
    localStorage.setItem(backupKeys.words, JSON.stringify(merged));
    localStorage.setItem(backupKeys.unlearned, JSON.stringify(unlearned));
  } catch (error) {
    try {
      if (beforeWords === null) localStorage.removeItem(backupKeys.words); else localStorage.setItem(backupKeys.words, beforeWords);
      if (beforeVerbs === null) localStorage.removeItem(backupKeys.unlearned); else localStorage.setItem(backupKeys.unlearned, beforeVerbs);
    } catch { /* Storage may be disabled entirely. */ }
    throw error;
  }
  window.dispatchEvent(new Event('mywordschange'));
  return { added, verbs: unlearned.length };
}

document.getElementById('backup-export').addEventListener('click', () => {
  try { backupExport(); } catch { backupStatus.textContent = 'Не удалось скачать копию. Проверь доступ к данным браузера.'; }
});
document.getElementById('backup-import').addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    if (file.size > 2_000_000) throw new Error('Файл слишком большой (максимум 2 МБ).');
    const result = backupMerge(JSON.parse(await file.text()));
    backupStatus.textContent = `Добавлено слов: ${result.added}. В списке невыученных глаголов: ${result.verbs}. Существующие слова сохранены.`;
  } catch (error) { backupStatus.textContent = error.message || 'Не удалось прочитать файл.'; }
  event.target.value = '';
});
