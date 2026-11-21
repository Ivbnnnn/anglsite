// Each prompt has one unambiguous blank; alternatives are listed explicitly when valid.
const nounQuestions = [
  { type: 'agreement', before: 'These scissors ', after: ' sharp enough to cut fabric.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Scissors употребляется во множественном числе: these scissors are.' },
  { type: 'agreement', before: 'A pair of scissors ', after: ' on the desk.', answers: ['is'], instruction: 'Вставь форму be.', why: 'Главное слово a pair — единственное число.' },
  { type: 'agreement', before: 'My new jeans ', after: ' too long.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Jeans требует глагол во множественном числе.' },
  { type: 'agreement', before: 'This pair of glasses ', after: ' expensive.', answers: ['is'], instruction: 'Вставь форму be.', why: 'This pair — одна пара.' },
  { type: 'agreement', before: 'The news ', after: ' surprising.', answers: ['is'], instruction: 'Вставь форму be.', why: 'News оканчивается на -s, но в этом значении требует единственного числа.' },
  { type: 'agreement', before: 'The police ', after: ' investigating the case.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Police в значении сотрудников полиции — множественное число.' },
  { type: 'agreement', before: 'This information ', after: ' confidential.', answers: ['is'], instruction: 'Вставь форму be.', why: 'Information неисчисляемое.' },
  { type: 'agreement', before: 'The children ', after: ' in the garden.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Children — множественное число от child.' },
  { type: 'agreement', before: 'Physics ', after: ' one of her favourite subjects.', answers: ['is'], instruction: 'Вставь форму be.', why: 'Название учебной дисциплины physics обычно требует единственного числа.' },
  { type: 'agreement', before: 'These species ', after: ' found in coastal waters.', answers: ['are'], instruction: 'Вставь форму be.', why: 'These указывает на несколько видов, хотя species не меняет форму.' },
  { type: 'agreement', before: 'This species ', after: ' endangered.', answers: ['is'], instruction: 'Вставь форму be.', why: 'This указывает на один вид.' },
  { type: 'agreement', before: 'Five years ', after: ' a long time to wait.', answers: ['is'], instruction: 'Вставь форму be.', why: 'Период времени рассматривается как одно целое.' },
  { type: 'agreement', before: 'The team ', after: ' ready for the match.', answers: ['is'], instruction: 'Вставь форму be (команда как единое целое).', why: 'Команда рассматривается как одна группа; особенно естественно в американском английском.' },
  { type: 'agreement', before: 'Two pieces of advice ', after: ' enough for now.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Главное слово pieces во множественном числе.' },
  { type: 'forms', before: 'One child, two ', after: '.', answers: ['children'], instruction: 'Вставь множественное число существительного.', why: 'Child → children — неправильная форма.' },
  { type: 'forms', before: 'One woman, three ', after: '.', answers: ['women'], instruction: 'Вставь множественное число существительного.', why: 'Woman → women — неправильная форма.' },
  { type: 'forms', before: 'One mouse, several ', after: '.', answers: ['mice'], instruction: 'Вставь множественное число существительного.', why: 'Mouse → mice — неправильная форма.' },
  { type: 'forms', before: 'One tooth, many ', after: '.', answers: ['teeth'], instruction: 'Вставь множественное число существительного.', why: 'Tooth → teeth — неправильная форма.' },
  { type: 'forms', before: 'One sheep, four ', after: '.', answers: ['sheep'], instruction: 'Вставь множественное число существительного.', why: 'Sheep имеет одинаковую форму в единственном и множественном числе.' },
  { type: 'forms', before: 'One aircraft, several ', after: '.', answers: ['aircraft'], instruction: 'Вставь множественное число существительного.', why: 'Aircraft не меняет форму.' },
  { type: 'forms', before: 'One city, several ', after: '.', answers: ['cities'], instruction: 'Вставь множественное число существительного.', why: 'После согласной y меняется на ies.' },
  { type: 'forms', before: 'One key, two ', after: '.', answers: ['keys'], instruction: 'Вставь множественное число существительного.', why: 'После гласной y сохраняется: keys.' },
  { type: 'forms', before: 'One potato, many ', after: '.', answers: ['potatoes'], instruction: 'Вставь множественное число существительного.', why: 'Potato → potatoes.' },
  { type: 'forms', before: 'One photo, many ', after: '.', answers: ['photos'], instruction: 'Вставь множественное число существительного.', why: 'Photo — исключение среди слов на -o: photos.' },
  { type: 'forms', before: 'One knife, two ', after: '.', answers: ['knives'], instruction: 'Вставь множественное число существительного.', why: 'Knife → knives.' },
  { type: 'forms', before: 'One roof, several ', after: '.', answers: ['roofs'], instruction: 'Вставь множественное число существительного.', why: 'Roof → roofs, без замены f на v.' },
  { type: 'forms', before: 'One analysis, two ', after: '.', answers: ['analyses'], instruction: 'Вставь множественное число существительного.', why: 'Analysis → analyses — форма греческого происхождения.' },
  { type: 'forms', before: 'One criterion, several ', after: '.', answers: ['criteria'], instruction: 'Вставь множественное число существительного.', why: 'Criterion → criteria.' },
  { type: 'forms', before: 'One phenomenon, many ', after: '.', answers: ['phenomena'], instruction: 'Вставь множественное число существительного.', why: 'Phenomenon → phenomena.' },
  { type: 'forms', before: 'One mother-in-law, two ', after: '.', answers: ['mothers-in-law'], instruction: 'Вставь множественное число составного существительного.', why: 'Меняется главное слово mother: mothers-in-law.' },
  { type: 'usage', before: 'I need a ', after: ' of scissors to open the package.', answers: ['pair'], instruction: 'Вставь слово для одного предмета из двух частей.', why: 'Один предмет: a pair of scissors.' },
  { type: 'usage', before: 'She gave me two ', after: ' of advice.', answers: ['pieces'], instruction: 'Вставь единицу счёта.', why: 'Advice неисчисляемое: two pieces of advice.' },
  { type: 'usage', before: 'We bought three ', after: ' of furniture.', answers: ['pieces'], instruction: 'Вставь единицу счёта.', why: 'Furniture неисчисляемое: three pieces of furniture.' },
  { type: 'usage', before: 'The criteria ', after: ' clearly defined.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Criteria — множественное число от criterion.' },
  { type: 'usage', before: 'There ', after: ' a lot of luggage in the hallway.', answers: ['is'], instruction: 'Вставь форму be.', why: 'Luggage неисчисляемое.' },
  { type: 'usage', before: 'One series ', after: ' enough to explain the pattern.', answers: ['is'], instruction: 'Вставь форму be.', why: 'One series — одна серия.' },
  { type: 'usage', before: 'Two series ', after: ' available online.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Two series — две серии; форма существительного не меняется.' },
];

// More examples are grouped by the skill they exercise. Each generated form has
// the same explicit singular/plural context, so the intended answer stays clear.
const additionalForms = [
  ['book', 'books', 'Обычное множественное число: book → books.'],
  ['box', 'boxes', 'После -x прибавляем -es.'],
  ['brush', 'brushes', 'После -sh прибавляем -es.'],
  ['bus', 'buses', 'После -s прибавляем -es.'],
  ['match', 'matches', 'После -ch прибавляем -es.'],
  ['family', 'families', 'Согласная + y меняется на -ies.'],
  ['boy', 'boys', 'Гласная + y сохраняется: boys.'],
  ['hero', 'heroes', 'Hero → heroes.'],
  ['piano', 'pianos', 'Piano → pianos: здесь только -s.'],
  ['leaf', 'leaves', 'Leaf → leaves.'],
  ['wife', 'wives', 'Wife → wives.'],
  ['chief', 'chiefs', 'Chief → chiefs: f сохраняется.'],
  ['man', 'men', 'Man → men.'],
  ['person', 'people', 'Обычное множественное от person в значении «люди» — people.'],
  ['foot', 'feet', 'Foot → feet.'],
  ['goose', 'geese', 'Goose → geese.'],
  ['ox', 'oxen', 'Ox → oxen.'],
  ['deer', 'deer', 'Deer не меняет форму.'],
  ['fish', 'fish', 'Несколько рыб одного вида — fish; fishes бывает при разговоре о видах.'],
  ['species', 'species', 'Species не меняет форму.'],
  ['series', 'series', 'Series не меняет форму.'],
  ['means', 'means', 'Means имеет одинаковую форму в обоих числах.'],
  ['crisis', 'crises', 'Crisis → crises.'],
  ['thesis', 'theses', 'Thesis → theses.'],
  ['bacterium', 'bacteria', 'Bacterium → bacteria.'],
  ['stimulus', 'stimuli', 'Stimulus → stimuli.'],
  ['passer-by', 'passers-by', 'Главное слово passer: passers-by.'],
  ['schoolboy', 'schoolboys', 'Главное слово в конце: schoolboys.'],
];
for (const [singular, plural, why] of additionalForms) {
  nounQuestions.push({ type: 'forms', before: `One ${singular}, two `, after: '.', answers: [plural], instruction: 'Вставь множественное число существительного.', why });
}

nounQuestions.push(
  { type: 'agreement', before: 'Her clothes ', after: ' still wet.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Clothes требует множественного числа.' },
  { type: 'agreement', before: 'This shirt ', after: ' still wet.', answers: ['is'], instruction: 'Вставь форму be.', why: 'Shirt — обычное исчисляемое существительное в единственном числе.' },
  { type: 'agreement', before: 'Two pairs of trousers ', after: ' in the wardrobe.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Главное слово pairs во множественном числе.' },
  { type: 'agreement', before: 'One pair of trousers ', after: ' in the wardrobe.', answers: ['is'], instruction: 'Вставь форму be.', why: 'Главное слово pair в единственном числе.' },
  { type: 'agreement', before: 'Those binoculars ', after: ' mine.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Binoculars требует множественного числа.' },
  { type: 'agreement', before: 'The equipment ', after: ' ready for the experiment.', answers: ['is'], instruction: 'Вставь форму be.', why: 'Equipment неисчисляемое.' },
  { type: 'agreement', before: 'Three pieces of equipment ', after: ' missing.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Главное слово pieces во множественном числе.' },
  { type: 'agreement', before: 'Economics ', after: ' a compulsory subject here.', answers: ['is'], instruction: 'Вставь форму be.', why: 'Название учебной дисциплины — единственное число.' },
  { type: 'agreement', before: 'The people in this village ', after: ' very welcoming.', answers: ['are'], instruction: 'Вставь форму be.', why: 'People в значении «люди» — множественное число.' },
  { type: 'agreement', before: 'A police officer ', after: ' waiting outside.', answers: ['is'], instruction: 'Вставь форму be.', why: 'Officer — один человек.' },
  { type: 'agreement', before: 'Several aircraft ', after: ' ready to depart.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Several показывает множественное число, хотя aircraft не меняет форму.' },
  { type: 'agreement', before: 'One aircraft ', after: ' ready to depart.', answers: ['is'], instruction: 'Вставь форму be.', why: 'One показывает единственное число.' },
  { type: 'agreement', before: 'The criteria for admission ', after: ' strict.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Criteria — множественное число.' },
  { type: 'agreement', before: 'The main criterion for admission ', after: ' academic performance.', answers: ['is'], instruction: 'Вставь форму be.', why: 'Criterion — единственное число.' },
  { type: 'agreement', before: 'Two phenomena ', after: ' described in the report.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Phenomena — множественное число.' },
  { type: 'agreement', before: 'This phenomenon ', after: ' difficult to explain.', answers: ['is'], instruction: 'Вставь форму be.', why: 'Phenomenon — единственное число.' },
  { type: 'agreement', before: 'Ten dollars ', after: ' enough for the ticket.', answers: ['is'], instruction: 'Вставь форму be (сумма как единое целое).', why: 'Сумма денег здесь рассматривается как одно целое.' },
  { type: 'agreement', before: 'The number of applicants ', after: ' increasing.', answers: ['is'], instruction: 'Вставь форму be.', why: 'The number — «число», грамматически единственное число.' },
  { type: 'agreement', before: 'A number of applicants ', after: ' waiting outside.', answers: ['are'], instruction: 'Вставь форму be.', why: 'A number of означает «несколько» и сочетается с множественным числом.' },
  { type: 'agreement', before: 'Each piece of information ', after: ' relevant.', answers: ['is'], instruction: 'Вставь форму be.', why: 'Each piece — каждая отдельная единица.' },
  { type: 'agreement', before: 'These glasses ', after: ' designed for reading.', answers: ['are'], instruction: 'Вставь форму be (очки).', why: 'Glasses в значении «очки» — множественное число.' },
  { type: 'agreement', before: 'This glass ', after: ' made of recycled material.', answers: ['is'], instruction: 'Вставь форму be (один стакан).', why: 'Glass в значении «стакан» — исчисляемое слово.' },
  { type: 'agreement', before: 'Several analyses ', after: ' included in the appendix.', answers: ['are'], instruction: 'Вставь форму be.', why: 'Analyses — множественное число от analysis.' },
  { type: 'agreement', before: 'The analysis ', after: ' included in the appendix.', answers: ['is'], instruction: 'Вставь форму be.', why: 'Analysis — единственное число.' },
);

nounQuestions.push(
  { type: 'usage', before: 'Can you give me a ', after: ' of advice?', answers: ['piece', 'bit', 'word'], instruction: 'Вставь подходящее слово перед of advice.', why: 'A piece of advice нейтрально; a bit разговорнее; a word of advice — короткий совет.' },
  { type: 'usage', before: 'I have two useful ', after: ' for your essay.', answers: ['tips', 'suggestions', 'recommendations'], instruction: 'Замени неисчисляемое advice исчисляемым словом.', why: 'Tip, suggestion и recommendation можно посчитать.' },
  { type: 'usage', before: 'This ', after: ' of advice helped me improve my writing.', answers: ['piece', 'bit'], instruction: 'Вставь единицу для одного совета.', why: 'Piece нейтрально; bit разговорнее.' },
  { type: 'usage', before: 'Two ', after: ' of information were missing from the report.', answers: ['pieces', 'bits'], instruction: 'Вставь единицу счёта.', why: 'Information неисчисляемое; pieces/bits можно посчитать.' },
  { type: 'usage', before: 'There are three ', after: ' of bread on the plate.', answers: ['slices', 'pieces'], instruction: 'Вставь подходящую единицу счёта.', why: 'Bread неисчисляемое; slices/pieces обозначают отдельные порции.' },
  { type: 'usage', before: 'We ordered two ', after: ' of tea.', answers: ['cups'], instruction: 'Вставь название ёмкости (чашки).', why: 'Two cups of tea.' },
  { type: 'usage', before: 'She bought a ', after: ' of jeans.', answers: ['pair'], instruction: 'Вставь единицу для одних джинсов.', why: 'A pair of jeans.' },
  { type: 'usage', before: 'They packed two ', after: ' of jeans.', answers: ['pairs'], instruction: 'Вставь единицу для двух пар джинсов.', why: 'Two pairs of jeans.' },
  { type: 'usage', before: 'We need more ', after: ' before making a decision.', answers: ['information'], instruction: 'Вставь неисчисляемое слово «информация».', why: 'Information не получает -s.' },
  { type: 'usage', before: 'Our laboratory needs new ', after: ' for the experiment.', answers: ['equipment'], instruction: 'Вставь неисчисляемое слово «оборудование».', why: 'Equipment не получает -s.' },
  { type: 'usage', before: 'This hotel has modern ', after: ' in every room.', answers: ['furniture'], instruction: 'Вставь неисчисляемое слово «мебель».', why: 'Furniture не получает -s.' },
  { type: 'usage', before: 'A ', after: ' of chocolate would be enough.', answers: ['bar', 'piece'], instruction: 'Вставь подходящую единицу счёта.', why: 'A bar или a piece of chocolate.' },
  { type: 'usage', before: 'We drank two ', after: ' of water after the run.', answers: ['bottles', 'glasses'], instruction: 'Вставь подходящую ёмкость.', why: 'Water неисчисляемое; bottles/glasses можно посчитать.' },
  { type: 'usage', before: 'She made three useful ', after: ' at the meeting.', answers: ['suggestions', 'recommendations'], instruction: 'Вставь исчисляемое слово для предложений.', why: 'Suggestion/recommendation можно употребить во множественном числе.' },
  { type: 'usage', before: 'The study identified several new ', after: '.', answers: ['phenomena'], instruction: 'Вставь множественное число от phenomenon.', why: 'Phenomenon → phenomena.' },
  { type: 'usage', before: 'The report presents one clear ', after: ' for assessing progress.', answers: ['criterion'], instruction: 'Вставь единственное число от criteria.', why: 'Criterion — одна мера оценки.' },
  { type: 'usage', before: 'The book includes two detailed ', after: ' of the results.', answers: ['analyses'], instruction: 'Вставь множественное число от analysis.', why: 'Analysis → analyses.' },
  { type: 'usage', before: 'The ', after: ' of the island are protected by law.', answers: ['species'], instruction: 'Вставь species в правильной форме.', why: 'Species не меняет форму; are показывает множественное число.' },
  { type: 'usage', before: 'His ', after: ' are on the stairs.', answers: ['shoes'], instruction: 'Вставь множественное число от shoe.', why: 'Обувь обычно считают отдельными предметами: shoes.' },
  { type: 'usage', before: 'A pair of ', after: ' is on the table for cutting paper.', answers: ['scissors'], instruction: 'Вставь слово «ножницы».', why: 'Scissors сохраняет форму множественного числа после a pair of.' },
);

nounQuestions.push(
  { type: 'quantifiers', before: 'How ', after: ' chairs do we need?', answers: ['many'], instruction: 'Выбери many или much.', why: 'Chairs исчисляемое множественное число: how many.' },
  { type: 'quantifiers', before: 'How ', after: ' furniture do we need?', answers: ['much'], instruction: 'Выбери many или much.', why: 'Furniture неисчисляемое: how much.' },
  { type: 'quantifiers', before: 'How ', after: ' information is available?', answers: ['much'], instruction: 'Выбери many или much.', why: 'Information неисчисляемое.' },
  { type: 'quantifiers', before: 'How ', after: ' suggestions did you receive?', answers: ['many'], instruction: 'Выбери many или much.', why: 'Suggestions можно посчитать.' },
  { type: 'quantifiers', before: 'There are ', after: ' mistakes in this version than in the first.', answers: ['fewer'], instruction: 'Выбери fewer или less (формальный стиль).', why: 'Mistakes исчисляемое множественное число: fewer.' },
  { type: 'quantifiers', before: 'There is ', after: ' traffic today than yesterday.', answers: ['less'], instruction: 'Выбери fewer или less.', why: 'Traffic неисчисляемое: less.' },
  { type: 'quantifiers', before: 'The revised report contains ', after: ' errors.', answers: ['fewer'], instruction: 'Вставь fewer или less в формальном стиле.', why: 'Errors исчисляемые: fewer errors.' },
  { type: 'quantifiers', before: 'The new process requires ', after: ' equipment.', answers: ['less'], instruction: 'Вставь fewer или less.', why: 'Equipment неисчисляемое: less equipment.' },
  { type: 'quantifiers', before: 'Only a ', after: ' students attended the lecture.', answers: ['few'], instruction: 'Вставь few или little.', why: 'Students можно посчитать: a few students.' },
  { type: 'quantifiers', before: 'We have a ', after: ' time before the exam.', answers: ['little'], instruction: 'Вставь few или little.', why: 'Time здесь неисчисляемое: a little time.' },
  { type: 'quantifiers', before: 'There are very ', after: ' reliable sources on this topic.', answers: ['few'], instruction: 'Вставь few или little.', why: 'Sources исчисляемые: few sources.' },
  { type: 'quantifiers', before: 'There is very ', after: ' evidence for this claim.', answers: ['little'], instruction: 'Вставь few или little.', why: 'Evidence неисчисляемое: little evidence.' },
  { type: 'quantifiers', before: 'The ', after: ' of applicants has doubled.', answers: ['number'], instruction: 'Вставь number или amount.', why: 'Applicants можно посчитать: the number of applicants.' },
  { type: 'quantifiers', before: 'The ', after: ' of water used has fallen.', answers: ['amount'], instruction: 'Вставь number или amount.', why: 'Water неисчисляемое: the amount of water.' },
  { type: 'quantifiers', before: 'We still need ', after: ' advice before deciding.', answers: ['some'], instruction: 'Вставь определитель для неисчисляемого advice.', why: 'Some advice — естественная форма без указания числа.' },
  { type: 'quantifiers', before: 'Do you have ', after: ' questions?', answers: ['any'], instruction: 'Вставь определитель в нейтральный вопрос.', why: 'Any questions — обычный вопрос о наличии вопросов.' },
  { type: 'quantifiers', before: 'There is not ', after: ' space in the suitcase.', answers: ['much'], instruction: 'Вставь many или much.', why: 'Space здесь неисчисляемое: not much space.' },
  { type: 'quantifiers', before: 'There are not ', after: ' seats left.', answers: ['many'], instruction: 'Вставь many или much.', why: 'Seats исчисляемые: not many seats.' },
);

const nounEl = (id) => document.getElementById(id);
const nounTypeNames = { agreement: 'СОГЛАСОВАНИЕ', forms: 'ФОРМА СУЩЕСТВИТЕЛЬНОГО', usage: 'УПОТРЕБЛЕНИЕ', quantifiers: 'КОЛИЧЕСТВО' };
let nounSession = [];
let nounIndex = 0;
let nounChecked = false;
let nounAnswers = [];

function nounNormalize(value) { return value.trim().toLocaleLowerCase('en').replace(/\s+/g, ' ').replace(/[’]/g, "'"); }
function nounStart(questions) {
  nounSession = questions;
  nounIndex = 0;
  nounChecked = false;
  nounAnswers = [];
  nounEl('nouns-setup').classList.add('hidden');
  nounEl('nouns-results').classList.add('hidden');
  nounEl('nouns-quiz').classList.remove('hidden');
  nounRender();
  nounEl('nouns-quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function nounRender() {
  const q = nounSession[nounIndex];
  nounChecked = false;
  nounEl('nouns-category').textContent = nounTypeNames[q.type];
  nounEl('nouns-counter').textContent = `${nounIndex + 1} / ${nounSession.length}`;
  nounEl('nouns-progress').setAttribute('aria-valuemax', String(nounSession.length));
  nounEl('nouns-progress').setAttribute('aria-valuenow', String(nounIndex));
  nounEl('nouns-progress-fill').style.width = `${nounIndex / nounSession.length * 100}%`;
  nounEl('nouns-instruction').textContent = q.instruction;
  nounEl('nouns-before').textContent = q.before;
  nounEl('nouns-after').textContent = q.after;
  nounEl('nouns-answer').value = '';
  nounEl('nouns-answer').className = '';
  nounEl('nouns-answer').readOnly = false;
  nounEl('nouns-feedback').textContent = '';
  nounEl('nouns-feedback').className = 'nouns-feedback';
  nounEl('nouns-action').innerHTML = 'Проверить <span aria-hidden="true">→</span>';
  nounEl('nouns-answer').focus();
}
function nounSubmit(event) {
  event.preventDefault();
  if (nounChecked) {
    if (nounIndex + 1 < nounSession.length) { nounIndex++; nounRender(); }
    else nounFinish();
    return;
  }
  const typed = nounEl('nouns-answer').value;
  if (!typed.trim()) { nounEl('nouns-feedback').textContent = 'Впиши ответ в пропуск.'; nounEl('nouns-answer').focus(); return; }
  const q = nounSession[nounIndex];
  const correct = q.answers.some((answer) => nounNormalize(answer) === nounNormalize(typed));
  nounAnswers.push({ question: q, typed: typed.trim(), correct });
  nounChecked = true;
  nounEl('nouns-answer').readOnly = true;
  nounEl('nouns-answer').className = correct ? 'is-correct' : 'is-wrong';
  nounEl('nouns-feedback').className = `nouns-feedback ${correct ? 'correct' : 'wrong'}`;
  nounEl('nouns-feedback').textContent = `${correct ? 'Верно.' : `Правильно: ${q.answers.join(' / ')}.`} ${q.why}`;
  nounEl('nouns-action').innerHTML = nounIndex + 1 < nounSession.length ? 'Следующее <span aria-hidden="true">→</span>' : 'Показать итоги <span aria-hidden="true">→</span>';
  nounEl('nouns-action').focus();
}
function nounFinish() {
  nounEl('nouns-quiz').classList.add('hidden');
  nounEl('nouns-results').classList.remove('hidden');
  const correct = nounAnswers.filter((entry) => entry.correct).length;
  nounEl('nouns-score').textContent = `${correct} из ${nounAnswers.length} верно · ${Math.round(correct / nounAnswers.length * 100)}%`;
  const errors = nounAnswers.filter((entry) => !entry.correct);
  nounEl('nouns-review').replaceChildren(...errors.map(({ question, typed }) => {
    const row = document.createElement('article');
    const sentence = document.createElement('strong');
    sentence.textContent = `${question.before}${question.answers[0]}${question.after}`;
    const detail = document.createElement('p');
    detail.textContent = `Твой ответ: ${typed}. ${question.why}`;
    row.append(sentence, detail);
    return row;
  }));
  nounEl('nouns-retry').classList.toggle('hidden', !errors.length);
  nounEl('nouns-results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function nounReset() {
  nounEl('nouns-quiz').classList.add('hidden');
  nounEl('nouns-results').classList.add('hidden');
  nounEl('nouns-setup').classList.remove('hidden');
  nounEl('nouns-setup').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
nounEl('nouns-start').addEventListener('click', () => {
  const selected = [...nounEl('nouns-setup').querySelectorAll('input:checked')].map((input) => input.value);
  if (!selected.length) { nounEl('nouns-setup-message').textContent = 'Выбери хотя бы один тип заданий.'; return; }
  nounEl('nouns-setup-message').textContent = '';
  const pool = nounQuestions.filter((q) => selected.includes(q.type));
  const size = nounEl('nouns-session-size').value;
  if (size === 'all') { nounStart(pool); return; }
  const shuffled = [...pool];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  nounStart(shuffled.slice(0, Number(size)));
});
nounEl('nouns-form').addEventListener('submit', nounSubmit);
nounEl('nouns-exit').addEventListener('click', nounReset);
nounEl('nouns-new').addEventListener('click', nounReset);
nounEl('nouns-retry').addEventListener('click', () => nounStart(nounAnswers.filter((entry) => !entry.correct).map((entry) => entry.question)));
nounEl('nouns-total').textContent = nounQuestions.length;
