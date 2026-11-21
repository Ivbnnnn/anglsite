// Cambridge's public English search accepts a q parameter (see its free search widget).
function dictionaryLinks(term) {
  const query = encodeURIComponent(term.trim());
  return {
    english: `https://dictionary.cambridge.org/search/english/direct/?q=${query}`,
    russian: `https://translate.google.com/?sl=en&tl=ru&text=${query}&op=translate`
  };
}

const dictionaryToast = document.getElementById('dictionary-toast');
const dictionaryTerm = document.getElementById('dictionary-term');
const dictionaryEnglish = document.getElementById('dictionary-english');
const dictionaryRussian = document.getElementById('dictionary-russian');

function showDictionaryChoices(term) {
  const links = dictionaryLinks(term);
  dictionaryTerm.textContent = term;
  dictionaryEnglish.href = links.english;
  dictionaryRussian.href = links.russian;
  dictionaryToast.classList.remove('hidden');
  return links;
}

document.addEventListener('click', (event) => {
  if (event.button !== 0) return;
  const target = event.target.closest('[data-lookup-term]');
  if (!target) return;
  const term = target.dataset.lookupTerm;
  const links = showDictionaryChoices(term);
  if (event.ctrlKey || event.metaKey) {
    event.preventDefault();
    window.open(links.english, '_blank', 'noopener,noreferrer');
  }
});
document.getElementById('dictionary-close').addEventListener('click', () => dictionaryToast.classList.add('hidden'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') dictionaryToast.classList.add('hidden');
});
