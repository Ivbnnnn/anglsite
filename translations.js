// Short Russian meanings for the 164 base forms, keyed by V1.
const translations = Object.fromEntries(`
be|быть
have|иметь
get|получать
make|делать, создавать
go|идти, ехать
say|говорить
do|делать
take|брать
see|видеть
know|знать
think|думать
come|приходить
give|давать
show|показывать
tell|рассказывать
feel|чувствовать
keep|хранить, держать
find|находить
put|класть
win|побеждать
become|становиться
let|позволять
hold|держать
run|бежать
set|устанавливать
mean|означать
bring|приносить
leave|уходить, оставлять
read|читать
hear|слышать
buy|покупать
meet|встречать
lead|вести, руководить
send|посылать
pay|платить
hit|ударять
break|ломать
deal|иметь дело
fall|падать
drive|водить машину
understand|понимать
speak|говорить
light|зажигать
cost|стоить
sell|продавать
spend|тратить
begin|начинать
eat|есть
cut|резать
write|писать
build|строить
learn|учить, изучать
fight|сражаться
stand|стоять
sit|сидеть
lose|терять, проигрывать
bear|нести, выносить
forget|забывать
grow|расти
lie|лежать
wear|носить (одежду)
choose|выбирать
catch|ловить
sleep|спать
drink|пить
beat|бить, побеждать
throw|бросать
fly|летать
draw|рисовать, тянуть
dream|мечтать, видеть сон
ride|ехать верхом
seek|искать
hurt|причинять боль
speed|ускоряться
rise|подниматься
prove|доказывать
feed|кормить
spring|прыгать, возникать
teach|обучать
lay|класть, укладывать
ring|звонить
blow|дуть
wake|просыпаться, будить
steal|красть
strike|ударять
mistake|ошибаться
wind|наматывать, заводить
spread|распространять
burn|гореть, жечь
stick|приклеивать, застревать
cast|бросать, отливать
bet|держать пари
tear|рвать
shut|закрывать
hide|прятать
hang|висеть, вешать
sing|петь
shoot|стрелять
split|разделять
smell|пахнуть, нюхать
shake|трясти
swear|клясться, ругаться
upset|расстраивать
quit|бросать, прекращать
spin|крутить(ся)
broadcast|вещать, транслировать
spell|писать по буквам
slide|скользить
sink|тонуть
dig|копать
swing|качаться
bite|кусать
rid|избавлять
shine|сиять
lean|наклоняться
forgive|прощать
sweep|подметать
overcome|преодолевать
arise|возникать
lend|одалживать
breed|разводить, выводить
flee|убегать
bind|связывать
undertake|предпринимать
undergo|подвергаться
bend|сгибать(ся)
burst|лопаться
withdraw|отзывать, снимать
bleed|кровоточить
swim|плавать
forecast|прогнозировать
grind|молоть
spoil|портить
freeze|замерзать
spill|проливать
dive|нырять
awake|просыпаться
creep|ползти, красться
leap|прыгать
spit|плевать
weave|ткать, плести
shrink|сжиматься
swell|опухать, набухать
oversee|надзирать
sting|жалить
strive|стремиться
sew|шить
knit|вязать
forbid|запрещать
undo|отменять, развязывать
weep|плакать
cling|цепляться
overthrow|свергать
withhold|удерживать
stink|вонять
overtake|обгонять
withstand|выдерживать
misunderstand|неправильно понимать
tread|ступать
fling|швырять
sow|сеять
kneel|становиться на колени
mislead|вводить в заблуждение
foresee|предвидеть
`.trim().split('\n').map((line) => line.split('|')));

for (const verb of verbs) {
  if (!translations[verb.v1]) throw new Error(`Missing translation: ${verb.v1}`);
  verb.ru = translations[verb.v1];
}
