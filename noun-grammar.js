// Columns: sentence with one blank | accepted answers | explanation | optional prompt.
const nounGrammar = [
  {
    type: 'forms', prompt: 'Впиши множественное число.',
    rows: `I put two _ on the tray.|spoons|Обычное окончание -s.|Образуй множественное число от spoon.
Two _ stopped outside the school.|buses|После -s здесь добавляется -es.|Образуй множественное число от bus.
We need two _ for painting the fence.|brushes|После -sh добавляется -es.|Образуй множественное число от brush.
Striking these _ creates a small flame.|matches|После -tch добавляется -es.|Образуй множественное число от match.
They packed the dishes into three _.|boxes|После -x добавляется -es.|Образуй множественное число от box.
The train crosses three _.|countries|Согласная + y → -ies.|Образуй множественное число от country.
The baker used fresh _ in the pie.|cherries|Согласная + y → -ies.|Образуй множественное число от cherry.
The children put away their _.|toys|После гласной y сохраняется: -s.|Образуй множественное число от toy.`,
  },
  {
    type: 'usage', prompt: 'Заполни пропуск по подсказке.',
    rows: `This pair of leggings _ too small.|is|Главное слово pair в единственном числе.|Вставь форму be в настоящем времени.
Two pairs of socks _ missing yesterday.|were|Главное слово pairs во множественном числе.|Вставь форму be в прошедшем времени.
Two pieces of furniture _ delivered yesterday.|were|Глагол согласуется с pieces.|Вставь форму be в прошедшем времени.
She gave me a _ of advice.|piece/bit/word|Piece — нейтральная единица счёта. Bit разговорнее, word — короткий совет.|Вставь обозначение одного совета.
I bought four _ of chocolate.|bars|A bar of chocolate — плитка шоколада.|Вставь слово «плитки».
We ordered two _ of tea.|cups|A cup of tea — чашка чая.|Вставь слово «чашки».
We need two _ of cheese for each sandwich.|slices|A slice of cheese — ломтик сыра.|Вставь слово «ломтики».
Five years _ a long time to be away.|is|Весь срок воспринимается как единый период.|Вставь форму be в настоящем времени.
Ten kilometres _ too far to walk in this heat.|is|Расстояние здесь воспринимается как одна величина.|Вставь форму be в настоящем времени.
Two hundred dollars _ enough for the repair.|is|Вся сумма воспринимается как одна величина.|Вставь форму be в настоящем времени.
The two five-dollar bills _ on the table.|are|Речь о двух отдельных купюрах, поэтому are.|Вставь форму be в настоящем времени.
This species _ protected, but those species are not.|is|This указывает на один вид. Those — на несколько.|Вставь форму be в настоящем времени.`,
  },
  {
    type: 'quantifiers', prompt: 'Выбери подходящее слово количества.',
    rows: `How _ chairs do we need?|many|Chairs — исчисляемое множественное число.|Выбери many или much.
How _ time do we have left?|much|Time в значении доступного времени неисчисляемое.|Выбери many или much.
This draft has _ mistakes than the last one.|fewer|В формальном стиле fewer с исчисляемыми существительными.|Выбери fewer или less.
There is _ traffic today than yesterday.|less|Traffic неисчисляемое, поэтому less.|Выбери fewer или less.
Only a _ students finished early.|few|Отдельных студентов можно посчитать.|Выбери few или little.
Add a _ salt before serving.|little|Salt здесь неисчисляемое.|Выбери few или little.
There is very _ evidence for this claim.|little|Evidence неисчисляемое.|Выбери few или little.
There are very _ reliable sources on this topic.|few|Sources — отдельные источники.|Выбери few или little.`,
  },
  {
    type: 'numerals', prompt: 'Впиши подходящую форму числительного.',
    rows: `The hall seats five _ people.|hundred|После точного числительного hundred без -s и of.|Вставь hundred или hundreds.
_ of people waited outside.|hundreds|Неопределённое множество: hundreds of.|Вставь hundred или hundreds.
About eight _ visitors came on Saturday.|thousand|About делает оценку приблизительной, но eight thousand сохраняет форму без -s.|Вставь thousand или thousands.
The project will benefit _ of households.|thousands|Неопределённое множество: thousands of.|Вставь thousand или thousands.
The grant was worth 1.5 _ dollars.|million|После десятичного числа million без -s.|Вставь million или millions.
The storms caused _ of dollars in damage.|millions|Миллионы без точного числа: millions of.|Вставь million или millions.
The estimate exceeds two _ euros.|billion|После точного множителя billion без -s.|Вставь billion или billions.
The fund manages _ of pounds.|billions|Неопределённое число: billions of.|Вставь billion или billions.
The report estimates the cost at three _ dollars.|trillion|После точного множителя trillion без -s.|Вставь trillion или trillions.
The proposal would cost _ of dollars.|trillions|Неопределённое множество: trillions of.|Вставь trillion или trillions.
We need two _ eggs.|dozen|Two dozen eggs — две дюжины яиц.|Вставь dozen или dozens.
They received _ of complaints.|dozens|Dozens of — десятки, без указания точного числа.|Вставь dozen или dozens.
Six _ of the registered participants had already arrived.|hundred|Of относится к the registered participants, конкретной группе. Six hundred остаётся без -s.|Вставь hundred или hundreds.
The town has several _ small businesses.|hundred|Several hundred — обычная конструкция перед существительным без of.|Вставь hundred или hundreds.
The walk took three _ hours.|and a half|Three and a half hours = три с половиной часа.|Вставь слова вместо «с половиной».
They arranged a two-_-day visit.|hundred|Two-hundred-day — составное определение. Внутри него hundred и day без -s.|Вставь hundred или hundreds.
Half a _ viewers watched the final.|million|Half a million — полмиллиона.|Вставь million или millions.
Two _ one hundred people voted.|thousand|Two thousand one hundred = 2,100. Внутри числа thousand без -s.|Вставь thousand или thousands.`,
  },
  {
    type: 'number', prompt: 'Выбери форму глагола или артикль по подсказке.',
    rows: `A number of applicants _ waiting outside.|are|A number of = несколько. Глагол во множественном числе.|Вставь is или are.
The number of applicants _ rising.|is|Растёт само количество. Главное слово number.|Вставь is или are.
A number of rooms _ unavailable yesterday.|were|Речь о нескольких комнатах, поэтому were.|Вставь was или were.
The number of rooms available yesterday _ unusually low.|was|Описываем количество комнат, поэтому was.|Вставь was или were.
A number of students _ already submitted their work.|have|Действие выполнили несколько студентов, поэтому have.|Вставь has или have.
The number of students on the course _ doubled.|has|Удвоилось количество, поэтому has.|Вставь has или have.
_ number of tickets sold reached 500.|the|Здесь the number of — точное или измеримое количество.|Вставь a или the.
_ number of residents have signed the letter.|a|A number of residents — несколько жителей.|Вставь a или the.
A large number of orders _ been delayed.|have|Large не меняет модель: A large number of + множественное число.|Вставь has или have.
The number of late orders _ fallen since May.|has|Падает количество, поэтому has.|Вставь has или have.
The number of _ rose after the deadline was extended.|applications|После the number of здесь нужно исчисляемое существительное во множественном числе.|Вставь форму слова application.`,
  },
  {
    type: 'amount', prompt: 'Выбери number или amount.',
    rows: `The _ of rainfall varies by region.|amount|Rainfall неисчисляемое. Здесь нужен объём осадков.
The _ of rainy days fell last year.|number|Дождливые дни можно посчитать.
We tracked the _ of water used each month.|amount|Вода неисчисляема. Измеряем расход воды.
They counted the _ of bottles sold during the event.|number|Бутылки можно посчитать поштучно.
We paid the same _ of money for both tickets.|amount|Money неисчисляемое. Речь о сумме.
The _ of coins in each bag was recorded.|number|Coins — отдельные считаемые предметы.
The _ of traffic increases near the junction.|amount|Traffic — неисчисляемое слово.
The _ of cars on this road has doubled.|number|Cars можно посчитать. Речь о количестве машин.
Reducing the _ of paper we use saves money.|amount|Paper здесь означает материал.
The journal reported the _ of papers it published.|number|Papers здесь означает отдельные статьи.
We were surprised by the _ of advice they gave us.|amount|Advice неисчисляемое слово.
The _ of suggestions received has increased.|number|Suggestions можно посчитать.
We do not have enough space for this _ of equipment.|amount|Equipment неисчисляемое. Имеется в виду оборудование в целом.
The _ of pieces of equipment in the lab has dropped.|number|Pieces — отдельные единицы оборудования.
We measured the _ of time spent on each task.|amount|Time здесь означает длительность.
The _ of hours spent on each task varied.|number|Hours — отдельные единицы времени.
The _ of waste produced per household fell.|amount|Waste в этом контексте неисчисляемое.
The survey counted the _ of households that recycled.|number|Подсчитываем домохозяйства, а не массу отходов.
A large amount of information _ missing from the file.|is|Главное слово amount в единственном числе.|Вставь is или are.
Large amounts of information _ still being processed.|are|Главное слово amounts во множественном числе.|Вставь is или are.`,
  },
  {
    type: 'participles', prompt: 'Впиши форму глагола из подсказки.',
    rows: `The baby is _ in the next room.|sleeping|Be + V-ing образует Continuous.|Используй sleep.
The students _ near the door are in my class.|standing|Standing near the door = who are standing near the door.|Используй stand.
We took a different route to avoid the _ traffic.|approaching|Approaching traffic — транспорт, который приближается.|Используй approach.
A child was _ towards the gate.|running|При добавлении -ing к run удваивается n.|Используй run.
She was _ a letter when I called.|writing|Write теряет конечную e перед -ing.|Используй write.
The dog was _ in the shade.|lying|В lie → lying сочетание -ie меняется на -y.|Используй lie в значении «лежать».
The documents were _ yesterday.|signed|В пассиве be + V3. Sign — правильный глагол.|Используй sign.
She has _ three reports since Monday.|written|После has нужна V3: write → wrote → written.|Используй write.
We replaced the _ window after the storm.|broken|Broken описывает результат действия. Это V3 от break.|Используй break.
The packages _ this morning are on your desk.|delivered|Delivered this morning = that were delivered this morning.|Используй deliver.
The path was covered with _ leaves.|fallen|Fallen — V3 непереходного fall: листья опали сами.|Используй fall.
By noon, the river had _ by half a metre.|risen|После had нужна V3: rise → rose → risen.|Используй rise.
I was _ by the final chapter.|surprised|Surprised описывает состояние того, кто удивился.|Используй surprise.
The final chapter was _ right to the end.|surprising|Surprising описывает источник впечатления.|Используй surprise.
_ along the river, I noticed a heron.|walking|Иду и замечаю я, поэтому у оборота и главной части один субъект.|Используй walk, причастие I.
_ in 1880, the bridge is still in use.|built|Мост построили: пассивный смысл, V3 от build.|Используй build, причастие II.
The road is being _ this week.|repaired|Is being repaired — пассивное действие в процессе.|Используй repair.
The road _ repaired this week will reopen on Friday.|being|Being repaired — оборот с пассивным действием в процессе.|Вставь форму be для сокращённого пассивного оборота.
Having _ the report, she sent it to the editor.|finished|Having + V3 показывает, что сначала она закончила отчёт.|Используй finish.
Having been _, we left for the station.|warned|Having been + V3 — предшествующее действие в пассиве.|Используй warn.
Not _ the answer, I asked for a hint.|knowing|Not + V-ing выражает отрицательную причину.|Используй know.
The _ instructions helped us set up the device.|printed|Printed instructions — инструкции, которые напечатали.|Используй print.
She enjoys _ short stories.|reading|Здесь -ing обозначает занятие после enjoy. В традиционной грамматике это герундий.|Используй read.
Only a small fraction of the money has been _.|spent|Has been + V3 — Present Perfect в пассиве. V3 от spend — spent.|Используй spend.`,
  },
];
