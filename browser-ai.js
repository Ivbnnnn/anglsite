// Models are loaded only after an explicit user action. No text is sent to an
// inference API; the CDN supplies code and model files, then inference is local.
const browserAI = (() => {
  const transformersURL = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1';
  let libraryPromise;
  let translationPromise;
  let embeddingPromise;

  function library() {
    if (!libraryPromise) libraryPromise = import(transformersURL).catch((error) => { libraryPromise = null; throw error; });
    return libraryPromise;
  }

  function progress(label, callback) {
    return (event) => {
      if (event.status === 'progress' && Number.isFinite(event.progress)) callback(`${label}: ${Math.round(event.progress)}%`);
      else if (event.status === 'initiate' || event.status === 'download') callback(`${label}: загружаю модель…`);
    };
  }

  async function localTranslator(callback) {
    if (!translationPromise) translationPromise = library().then(({ pipeline }) => pipeline(
      'translation', 'Xenova/opus-mt-en-ru', { progress_callback: progress('Перевод', callback) }
    )).catch((error) => { translationPromise = null; throw error; });
    return translationPromise;
  }

  async function translate(text, callback = () => {}) {
    const source = String(text).trim();
    if (!source) throw new Error('Пустая фраза');
    if (globalThis.Translator?.create) {
      try {
        callback('Подготавливаю переводчик браузера…');
        // create() is called directly from the button action so Chrome may
        // download a language pack when a user gesture is required.
        const translator = await globalThis.Translator.create({
          sourceLanguage: 'en', targetLanguage: 'ru',
          monitor(monitor) { monitor.addEventListener('downloadprogress', (event) => callback(`Языковой пакет: ${Math.round(event.loaded * 100)}%`)); },
        });
        try {
          const result = String(await translator.translate(source)).trim();
          if (/[А-Яа-яЁё]/.test(result)) return { translation: result, source: 'браузер Chrome' };
        } finally { translator.destroy?.(); }
      } catch { /* Unsupported language pack or browser: use the JS model. */ }
    }
    callback('Загружаю модель перевода в браузер…');
    const pipe = await localTranslator(callback);
    const result = await pipe(source);
    const translation = String(result?.[0]?.translation_text || '').trim();
    if (!/[А-Яа-яЁё]/.test(translation)) throw new Error('Модель не дала перевод на русском');
    return { translation, source: 'локальная модель' };
  }

  async function embed(text, callback = () => {}) {
    if (!embeddingPromise) embeddingPromise = library().then(({ pipeline }) => pipeline(
      'feature-extraction', 'Xenova/multilingual-e5-small', { progress_callback: progress('Смысловая модель', callback) }
    )).catch((error) => { embeddingPromise = null; throw error; });
    const pipe = await embeddingPromise;
    const tensor = await pipe(`query: ${String(text).trim()}`, { pooling: 'mean', normalize: true });
    return tensor.data;
  }

  return { translate, embed };
})();
