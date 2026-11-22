// Each reference row also supplies a practice question with the same target.
// Columns: headword | accepted answers | sentence with one blank | usage note.
const nounReference = [
  {
    id: 'ending-o', title: 'Слова на -o', type: 'forms',
    rows: `potato|potatoes|Peel three _ for the soup.
tomato|tomatoes|The salad needs four ripe _.
hero|heroes|The book follows two unlikely _.
torpedo|torpedoes|The museum displays two historical _.
echo|echoes|Several _ bounced off the walls.
piano|pianos|The school bought two upright _.
kilo|kilos|We ordered five _ of flour.
photo|photos|Select three _ for the album.
video|videos|I saved two short _.
zoo|zoos|The city used to have two _.
kangaroo|kangaroos|We saw several _ near the road.
euro|euros|The ticket costs eight _.
radio|radios|The guide tested both _ before the hike.
studio|studios|The building houses three recording _.
flamingo|flamingos/flamingoes|Six _ stood in the shallow water.|Оба написания допустимы.
volcano|volcanoes/volcanos|Two active _ are visible from the coast.|Оба написания допустимы.
avocado|avocados|Slice two _ for the sandwiches.
solo|solos|The concert included three guitar _.`,
  },
  {
    id: 'ending-f', title: 'Слова на -f и -fe', type: 'forms',
    rows: `loaf|loaves|The bakery sold three _ of rye bread.
wife|wives|The two ambassadors and their _ attended.
knife|knives|There are four sharp _ in the drawer.
life|lives|The rescue team saved three _.
leaf|leaves|Dry _ covered the path.
thief|thieves|The police arrested two _.
half|halves|Cut the apple into two _.
roof|roofs|The storm damaged several _.
proof|proofs|The textbook gives two mathematical _.
chief|chiefs|The department _ met yesterday.
safe|safes|The hotel installed three new _.
cliff|cliffs|White _ surround the bay.
gulf|gulfs|The map shows two large _.
reef|reefs|These coral _ attract divers.
belief|beliefs|The survey compared religious _.
scarf|scarves/scarfs|The shop sells woollen _.|Оба написания допустимы.
wharf|wharves/wharfs|The harbour once had two wooden _.|Оба написания допустимы.
dwarf|dwarfs/dwarves|The fairy tale features seven _.|Оба написания допустимы.
hoof|hooves/hoofs|The horse's _ need cleaning.|Оба написания допустимы.
wolf|wolves|We heard _ howling in the distance.
shelf|shelves|We installed three _ in the kitchen.
handkerchief|handkerchiefs/handkerchieves|The shop sells cotton _.|Оба написания допустимы, обычно handkerchiefs.`,
  },
  {
    id: 'irregular-forms', title: 'Неправильные формы', type: 'forms',
    rows: `man|men|Two _ were waiting at the bus stop.
woman|women|Three _ spoke at the conference.
person|people|There were twenty _ in the room.|Обычное «люди» — people. Формальное persons встречается в юридических текстах и уведомлениях.
person|persons/people|The posted capacity is a maximum of six _.|В официальном уведомлении допустимо persons. People тоже правильно.
mouse|mice|The cat spotted two _ near the shed.
foot|feet|My _ hurt after the walk.
child|children|The school welcomed fifteen new _.
tooth|teeth|The dentist checked all my _.
goose|geese|A flock of _ landed by the river.
ox|oxen|Two _ pulled the old cart.
louse|lice|The nurse checked for head _.
brother|brothers|My two _ and I grew up in Leeds.|Родные братья — brothers. Brethren — книжное «собратья», часто о религиозной общине.
brother|brethren|The monk addressed his fellow members as his _.|Вставь книжное слово для собратьев по общине.
penny|pennies|I found three copper _ under the sofa.|Отдельные монеты — pennies, сумма в британских пенсах — pence.
penny|pence|The stamp costs ninety _.|Для суммы в британских пенсах употребляют pence.`,
  },
  {
    id: 'unchanged-forms', title: 'Одна форма для двух чисел', type: 'forms',
    rows: `aircraft|aircraft|Three _ landed within an hour.
deer|deer|Four _ crossed the road at dusk.
sheep|sheep|The farmer moved six _ into the barn.
swine|swine|The farm kept twenty _.|Swine употребляется, например, в сельском хозяйстве. В повседневной речи часто говорят pigs.
fish|fish|We caught two _ of the same species.|Для отдельных рыб обычно fish. Fishes встречается при перечислении видов.
fish|fishes/fish|The guide describes freshwater _ from several different families.|Речь о разных видах. Допустимы fishes и fish.
trout|trout|They caught three _ in the stream.
fruit|fruit/fruits|The market sells tropical _.|Fruit часто означает фрукты собирательно. Fruits употребляется о разных видах, а также в переносном смысле.
means|means|The team tested two _ of communication.
crossroads|crossroads|We passed two _ on the way here.
series|series|The channel released two documentary _.
species|species|The island is home to three rare _.
salmon|salmon|We counted several _ swimming upstream.
offspring|offspring|The mare has produced two _.
Chinese|Chinese|Among the delegates, the _ were from China.|Вставь название национальности, без -s. Об одном человеке естественно сказать a Chinese person.
Japanese|Japanese|Among the delegates, the _ were from Japan.|Вставь название национальности, без -s. Об одном человеке естественно сказать a Japanese person.
Vietnamese|Vietnamese|Among the delegates, the _ were from Vietnam.|У названия национальности нет окончания -s.`,
  },
  {
    id: 'compound-forms', title: 'Составные существительные', type: 'forms',
    rows: `schoolboy|schoolboys|Two _ helped carry the books.
housewife|housewives|The novel follows two _ who start a business.
postman|postmen|The village used to have two _.
policeman|policemen|Two _ were directing traffic.|Нейтральный вариант для любого пола — police officers.
policewoman|policewomen|Two _ spoke to the witness.
woman writer|women writers/women-writers|The exhibition honours four _ from the nineteenth century.
gentleman farmer|gentleman farmers/gentlemen farmers/gentlemen-farmers|The novel depicts two wealthy _.|В пособии gentlemen-farmers. Встречается также gentleman farmers.
man-of-war|men-of-war|Two wooden _ guarded the harbour.|Главная часть — man, историческое название военного корабля.
mother-in-law|mothers-in-law|Both _ attended the ceremony.
hotel-keeper|hotel-keepers/hotelkeepers/hotel keepers|Several local _ attended the tourism meeting.
gas mask|gas masks/gas-masks|The museum displays three old _.
forget-me-not|forget-me-nots|Blue _ grew beside the path.
go-between|go-betweens|Two _ conveyed messages between the groups.
passer-by|passers-by/passersby|Several _ stopped to help.
manservant|menservants/men-servants|The historical drama features two _.
woman doctor|women doctors/women-doctors|The archives describe two pioneering _.
merry-go-round|merry-go-rounds|The old fairground had two _.
editor-in-chief|editors-in-chief|The magazine invited three former _.
attorney general|attorneys general/attorney generals|Several state _ signed the letter.|В формальной речи обычно attorneys general. Attorney generals также встречается.`,
  },
  {
    id: 'classical-forms', title: 'Латинские и греческие формы', type: 'forms',
    rows: `stimulus|stimuli|Participants responded to three visual _.
genius|geniuses|The documentary profiles two musical _.|О талантливых людях употребляется geniuses.
genius|genii|The historian described the Romans' protective _.|Вставь историческую форму для духов-покровителей. О людях говорят geniuses.
syllabus|syllabi/syllabuses|The department revised three course _.
radius|radii/radiuses|The diagram shows the _ of two circles.|В математике предпочтительно radii.
cactus|cacti/cactuses|Several _ survived the frost.
nucleus|nuclei/nucleuses|The microscope revealed two cell _.|В биологии обычная форма — nuclei.
larva|larvae/larvas|The biologist collected several insect _.|В научных текстах обычно larvae.
alumna|alumnae|The college invited two former female students, both distinguished _.|Alumnae — выпускницы. Alumni — выпускники или смешанная группа.
alumnus|alumni|Three male _ spoke at the reunion.
formula|formulas/formulae|The chapter compares two _ for calculating the area.
area|areas|Three coastal _ face erosion.
diploma|diplomas|The school issued twenty _.
arena|arenas|The city built two indoor _.
datum|data|The researcher recorded several individual _ for each sample.|В этом контексте множественное число от datum — data. Как неисчисляемое слово data часто употребляется с is.
curriculum|curricula/curriculums|The committee compared two national _.
bacterium|bacteria|Some _ can survive at high temperatures.
symposium|symposia/symposiums|The university hosted two _ on language learning.
memorandum|memoranda/memorandums|The archive contains several official _.
medium|media/mediums|The artist works in several _ including ink and clay.|В искусстве встречаются media и mediums. Для спиритических посредников употребляют mediums, для СМИ — the media.
album|albums|The band released two live _.
chrysanthemum|chrysanthemums|Yellow _ were growing by the fence.
index|indices/indexes|The economists compared two price _.|В математике часто indices, в указателях книг — indexes. В экономике встречаются обе формы.
appendix|appendices/appendixes|The report contains two detailed _.|Обе формы допустимы для приложений к тексту. Appendixes употребляется и в анатомии.
codex|codices/codexes|The museum owns two medieval _.|В исторических работах обычно codices.
thesis|theses|The examiners assessed three doctoral _.
crisis|crises|The report compares two financial _.
analysis|analyses|The researchers ran three independent _.
metropolis|metropolises|The article compares two coastal _.
criterion|criteria|The committee set three selection _.
phenomenon|phenomena|The paper describes two related _.
demon|demons|The legend features three _.
electron|electrons|The diagram shows two _.
basis|bases|The argument rests on two theoretical _.
hypothesis|hypotheses|The team tested three competing _.
diagnosis|diagnoses|The doctors considered two possible _.
axis|axes|The graph has two labelled _.
matrix|matrices/matrixes|The operation combines two square _.|В математике обычно matrices.`,
  },
  {
    id: 'plural-agreement', title: 'Множественное число по смыслу слова', type: 'agreement',
    rows: `scissors|are|These scissors _ sharp.|О ножницах говори scissors are. A pair of scissors is, но two pairs of scissors are.
binoculars|are|The binoculars _ in the side pocket.
breeches|were|His riding breeches _ torn in the fall yesterday.
briefs|are|These briefs _ made of cotton.
clothes|are|Your clothes _ still damp.|Одна вещь — an item of clothing, не a clothe или a pair of clothes.
glasses|are|Her reading glasses _ on the desk.|Glasses — очки. A glass — стакан, two glasses — два стакана.
headphones|are|My headphones _ in the case.
jeans|are|These jeans _ too long.
knickers|are|These knickers _ made of silk.
pajamas|are|My pajamas _ in the suitcase.|Британское написание — pyjamas.
panties|are|These panties _ too small.
pants|are|Those pants _ waterproof.|В AmE pants — брюки. В BrE часто нижнее бельё.
pincers|are|These pincers _ blunt.
pliers|are|The pliers _ in the toolbox.
shoes|are|Both shoes _ wet.|Один предмет — a shoe. Комплект — a pair of shoes.
shorts|are|Your running shorts _ on the chair.
slacks|are|These slacks _ too loose.
slippers|are|My slippers _ under the bed.|Один предмет — a slipper. Комплект — a pair of slippers.
spectacles|are|His spectacles _ in a hard case.|Spectacles в значении «очки» требует множественного числа.
tights|are|These tights _ black.
tongs|are|The kitchen tongs _ beside the grill.
trousers|are|Your trousers _ ready to collect.
tweezers|are|These tweezers _ clean.
gloves|are|Both gloves _ lined with wool.|Один предмет — a glove. Комплект — a pair of gloves.
earrings|are|These earrings _ made of silver.|Один предмет — an earring. Комплект — a pair of earrings.
goods|were|The damaged goods _ returned yesterday.
stairs|are|The stairs _ too narrow for a sofa.|Одна ступенька — a stair или a step. Весь пролёт — a flight of stairs.
arms|were|The illegal arms _ seized last night.|Arms в значении «оружие» — множественное число.
riches|were|The lost riches _ discovered in 1890.
proceeds|are|The proceeds from this sale _ for charity.
wages|were|Last month's wages _ paid on Friday.|Wages — заработок. Возможна счётная форма a wage, например a minimum wage.
contents|were|The contents of the two boxes _ checked yesterday.|Contents — содержимое или оглавление. В the table of contents главное слово table. Content может означать материал, например online content.
oats|are|These oats _ ready to harvest.|Овёс обычно называют oats. Отдельное растение или зерно можно назвать an oat.
onion|are|The onions _ already chopped.|Onion — обычное исчисляемое слово: an onion, two onions.
carrot|are|The carrots _ ready to serve.|Carrot — обычное исчисляемое слово: a carrot, two carrots.
police|are|The police _ interviewing witnesses.|Один сотрудник — a police officer, a policeman или a policewoman.
people|are|Many people _ waiting for the train.|People = люди. A people — отдельный народ, peoples — народы.
people|were|Several Indigenous peoples _ represented at the summit last year.|Peoples обозначает несколько народов.
cattle|are|The cattle _ grazing in the field.|Cattle требует множественного числа. Одно животное — a cow, a bull или one head of cattle.
outskirts|are|The outskirts of the city _ quieter after dark.|Outskirts обозначает окраины.
belongings|are|Your belongings _ safe in the locker.
premises|are|The company's premises _ closed to visitors today.|Premises = помещение или территория организации. A premise — предпосылка.`,
  },
  {
    id: 'singular-agreement', title: 'Предметы, игры и болезни на -s', type: 'agreement',
    rows: `news|is|The latest news _ encouraging.|A piece of news — одна новость.
aerobics|is|Aerobics _ offered as a fitness class here.
athletics|is|Athletics _ my favourite sport at school.
economics|is|Economics _ a compulsory subject here.|Название дисциплины — is. The economics of the project может означать финансовые аспекты и согласовываться во множественном числе.
gymnastics|is|Gymnastics _ on the school timetable.
physics|is|Physics _ a required subject in this programme.
politics|is|Politics _ a subject you can study at university.|Предмет изучения — is. Political views: her politics are progressive.
billiards|is|Billiards _ a game played on a table.
darts|is|Darts _ popular in this pub.|Игра — is. Отдельные дротики: The darts are on the table.
maths|is|Maths _ my favourite subject.|Британское maths и американское math требуют единственного числа.
mumps|is|Mumps _ a contagious illness.
measles|is|Measles _ preventable by vaccination.
statistics|is|Statistics _ taught in the first semester.|Дисциплина — is. Статистические данные: the latest statistics are available.
diabetes|is|Diabetes _ a chronic condition.
linguistics|is|Linguistics _ the scientific study of language.`,
  },
  {
    id: 'mass-nouns', title: 'Неисчисляемые и другие слова с единственным числом', type: 'agreement',
    rows: `advice|was|The advice _ useful when I applied last year.|A piece of advice, a bit of advice, a word of advice. Можно заменить на a tip или a suggestion.
education|is|Education _ a priority for the council.|Education собирательно. An education — конкретное образование, например a good education.
hair|is|Her hair _ still wet.|Совокупность — hair. Отдельные волоски можно посчитать: a hair, two hairs.
information|is|The information _ up to date.|Отдельный факт — a piece of information.
knowledge|is|Practical knowledge _ essential for this job.|Возможны обороты a good knowledge of English или an in-depth knowledge of the subject.
luck|is|A little luck _ always welcome.
luggage|is|Your luggage _ already in the car.|Отдельное место багажа — a piece of luggage или a bag.
money|is|The money _ in a locked drawer.|В юридическом и финансовом стиле monies/moneys может означать отдельные суммы.
music|is|The music _ too loud.
progress|is|Progress _ slow this month.
seaside|is|The seaside _ lovely in spring.|Обычно the seaside. Это название места с определённым артиклем, а не вещество или масса.
shopping|is|The shopping _ already packed in bags.|Здесь the shopping означает покупки собирательно.
traffic|is|Traffic _ heavy on this road.
trouble|is|A little trouble _ to be expected.|О трудностях вообще — trouble. В значении отдельных неприятностей встречается troubles.
weather|is|The weather _ warm for October.
work|is|The work _ almost finished.|Work — работа. A work of art и works of art — отдельные произведения искусства.
water|is|The water _ safe to drink.
cream|is|The cream _ in the fridge.
rice|is|The rice _ ready to serve.
success|is|Success _ rarely instant.|Success — успех вообще. A success — конкретное успешное событие или человек.
happiness|is|Happiness _ difficult to measure.
love|is|Love _ the main theme of the novel.|Love как чувство — неисчисляемое. A great love может обозначать конкретную любовь.
furniture|is|This furniture _ made from oak.|Отдельный предмет — a piece of furniture.
equipment|is|The equipment _ ready for use.|Отдельное устройство — a piece of equipment.
research|is|Further research _ needed.|Отдельная работа — a study или a research project.
bread|is|The bread _ fresh.|A loaf of bread — буханка, a slice of bread — ломтик.
sugar|is|The sugar _ in the cupboard.
coffee|is|The coffee _ getting cold.|Two coffees допустимо как сокращение от two cups of coffee.
evidence|is|The evidence _ consistent with the theory.|Отдельный факт — a piece of evidence.
accommodation|is|Student accommodation _ limited.|В BrE обычно неисчисляемое. В AmE accommodations часто означает жильё или условия размещения.
software|is|The software _ ready to install.|Отдельная программа — a program или an application.
homework|is|The homework _ due on Friday.|Отдельное задание — an assignment.
feedback|is|Your feedback _ very helpful.
machinery|is|The machinery _ inspected every morning.|Одно устройство — a machine.`,
  },
  {
    id: 'collective-agreement', title: 'Собирательные существительные', type: 'agreement',
    rows: `audience|is/are|The audience _ listening closely.|BrE допускает is для группы и are для её участников. В AmE для группы обычно is.
committee|is/are|The committee _ reviewing the proposal.|Единый орган — is. В BrE возможно are, если акцент на членах комитета.
company|is/are|The company _ currently hiring.|Организация как целое обычно is. В BrE возможно are, когда имеются в виду люди, которые за неё действуют.
crew|is/are|The crew _ getting ready for departure.|BrE допускает is для экипажа как группы и are для его членов.
family|is/are|My family _ staying with us this week.|В BrE возможны оба варианта. В AmE для family обычно is.
firm|is/are|The firm _ expanding its legal team.|Единая организация обычно is. В BrE возможен акцент на людях: are.
government|is/are|The government _ discussing the proposal.|В BrE возможны is для органа и are для его членов.
staff|is/are|The staff _ preparing for the inspection.|Оба варианта возможны в зависимости от того, имеешь в виду коллектив или сотрудников.
team|is/are|The team _ warming up.|В BrE возможны обе формы. Для AmE обычен вариант team is.
jury|is/are|The jury _ considering the evidence.|Коллегию можно представить как единый орган, а в BrE также как отдельных присяжных.`,
  },
];
