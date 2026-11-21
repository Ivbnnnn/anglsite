// Core expressions are selected and adapted from Vocabulary and Grammar v2 (2023).
// pages 16, 37, 62, 84, 112, 137, 163, 189, 215, 242, 272 and 298.
// IELTS+ expressions and example sentences were added for this site.
const vocabularyTopics = [
  {
    id: 'home', icon: '⌂', title: 'Дом и быт', en: 'Home & household',
    description: 'Домашние обязанности, жильё и распределение повседневной работы.',
    prompt: 'Should household responsibilities be shared equally among family members?',
    core: `do the laundry|стирать бельё
do the washing-up|мыть посуду
load the dishwasher|загружать посудомоечную машину
take out the rubbish|выносить мусор
mow the lawn|стричь газон
wipe surfaces|протирать поверхности
put clothes away|убирать одежду на место
make a mess|устраивать беспорядок`,
    advanced: `share the domestic workload|разделять домашнюю работу|Both partners share the domestic workload.
household responsibilities|домашние обязанности|Household responsibilities should be discussed openly.
an equitable division of labour|справедливое распределение труда|An equitable division of labour can reduce tension at home.
time-consuming chores|трудоёмкие домашние дела|Time-consuming chores leave less room for leisure.
outsource housework|поручать уборку сторонним специалистам|Some families outsource housework to save time.
maintain a living space|поддерживать жилое пространство в порядке|Children can learn to maintain a living space.
energy-efficient appliances|энергоэффективная бытовая техника|Energy-efficient appliances may lower household bills.
domestic labour|домашний труд|Domestic labour is often overlooked in economic discussions.`
  },
  {
    id: 'city', icon: '▥', title: 'Город и деревня', en: 'City & countryside',
    description: 'Урбанизация, инфраструктура, качество жизни и сельские территории.',
    prompt: 'Do the advantages of living in a large city outweigh the disadvantages?',
    core: `urban lifestyle|городской образ жизни
traffic congestion|дорожные заторы
high cost of living|высокая стоимость жизни
commute to work|ездить на работу
live on the outskirts|жить на окраине
rural lifestyle|сельский образ жизни
peace and quiet|тишина и покой
lack infrastructure|испытывать нехватку инфраструктуры`,
    advanced: `urban sprawl|разрастание города|Urban sprawl can put pressure on farmland.
affordable housing|доступное жильё|Affordable housing is scarce in many capitals.
public transport network|сеть общественного транспорта|A reliable public transport network reduces car use.
access to essential services|доступ к основным услугам|Rural residents may have limited access to essential services.
population density|плотность населения|High population density is not always a disadvantage.
regional inequality|региональное неравенство|Investment can help address regional inequality.
revitalise a neighbourhood|оживить район|New public spaces can revitalise a neighbourhood.
quality of life|качество жизни|A shorter commute can improve quality of life.`
  },
  {
    id: 'people', icon: '♡', title: 'Люди и отношения', en: 'People & relationships',
    description: 'Семья, характер, дружба и изменения в социальных связях.',
    prompt: 'How has technology changed the way people maintain close relationships?',
    core: `keep in touch|поддерживать связь
get on with someone|ладить с кем-либо
fall out with someone|поссориться с кем-либо
bring up a child|воспитывать ребёнка
make it up|помириться
remain friends|остаться друзьями
self-confidence|уверенность в себе
responsibility|ответственность`,
    advanced: `maintain meaningful connections|поддерживать значимые связи|It takes effort to maintain meaningful connections.
intergenerational gap|разрыв между поколениями|The intergenerational gap can affect family expectations.
emotional support|эмоциональная поддержка|Friends can provide emotional support in difficult times.
mutual respect|взаимное уважение|Mutual respect is essential in a healthy relationship.
social isolation|социальная изоляция|Social isolation is a concern for some older adults.
resolve a conflict|разрешить конфликт|Open communication can help resolve a conflict.
build trust|укреплять доверие|Consistency helps people build trust.
a close-knit community|сплочённое сообщество|A close-knit community can offer practical help.`
  },
  {
    id: 'health', icon: '✚', title: 'Здоровье', en: 'Health & lifestyle',
    description: 'Симптомы, лечение, привычки и общественное здоровье.',
    prompt: 'Should governments do more to encourage healthier lifestyles?',
    core: `a sore throat|боль в горле
a runny nose|насморк
take painkillers|принимать обезболивающие
recover from surgery|восстанавливаться после операции
lead a sedentary lifestyle|вести малоподвижный образ жизни
cut down on junk food|сократить потребление вредной еды
give up a bad habit|отказаться от вредной привычки
put on weight|набрать вес`,
    advanced: `preventive healthcare|профилактическая медицина|Preventive healthcare can reduce long-term costs.
mental well-being|психологическое благополучие|Regular exercise can support mental well-being.
a balanced diet|сбалансированное питание|A balanced diet is easier to maintain than a strict diet.
chronic condition|хроническое заболевание|People with a chronic condition need ongoing support.
health inequality|неравенство в сфере здоровья|Income can contribute to health inequality.
access to medical care|доступ к медицинской помощи|Remote communities need better access to medical care.
public health campaign|кампания по охране здоровья|A public health campaign can raise awareness.
adopt a sustainable routine|выработать устойчивый режим|Small changes help people adopt a sustainable routine.`
  },
  {
    id: 'sport', icon: '◉', title: 'Спорт и увлечения', en: 'Sport & hobbies',
    description: 'Досуг, физическая активность, соревнования и интересы.',
    prompt: 'Why do some people stop participating in sport as they get older?',
    core: `be keen on sport|увлекаться спортом
work out|тренироваться
be in good shape|быть в хорошей форме
take part in a competition|участвовать в соревновании
support a team|поддерживать команду
take up a hobby|начать заниматься хобби
play a musical instrument|играть на музыкальном инструменте
look for a bargain|искать выгодную покупку`,
    advanced: `physical endurance|физическая выносливость|Cycling can improve physical endurance.
recreational activity|занятие для отдыха|Walking is an accessible recreational activity.
competitive pressure|давление соревнования|Competitive pressure can discourage young athletes.
long-term commitment|долгосрочная приверженность|Learning an instrument requires long-term commitment.
work-life balance|баланс работы и личной жизни|Hobbies contribute to a healthier work-life balance.
participation rates|уровень участия|Participation rates vary across age groups.
community sports facilities|общественные спортивные объекты|Community sports facilities should be affordable.
develop a skill|развивать навык|A hobby can help people develop a skill.`
  },
  {
    id: 'shopping', icon: '◇', title: 'Мода и покупки', en: 'Fashion & shopping',
    description: 'Одежда, потребление, онлайн-торговля и осознанный выбор.',
    prompt: 'What are the environmental consequences of fast fashion?',
    core: `try on clothes|примерять одежду
ask for a refund|просить возврат денег
make a complaint|подать жалобу
look for a bargain|искать выгодную покупку
be overcharged|переплатить
track an order|отслеживать заказ
read customer reviews|читать отзывы покупателей
worn-out clothes|изношенная одежда`,
    advanced: `impulse buying|импульсивные покупки|Online advertising can encourage impulse buying.
consumer behaviour|поведение потребителей|Social media influences consumer behaviour.
fast fashion|быстрая мода|Fast fashion generates large amounts of textile waste.
ethical consumption|этичное потребление|Ethical consumption involves considering working conditions.
durable goods|товары длительного пользования|Durable goods may offer better value over time.
disposable income|располагаемый доход|People with less disposable income may prioritise price.
transparent supply chains|прозрачные цепочки поставок|Transparent supply chains help buyers make informed choices.
second-hand market|рынок подержанных вещей|The second-hand market has become more accessible online.`
  },
  {
    id: 'travel', icon: '✈', title: 'Путешествия', en: 'Travel & transport',
    description: 'Поездки, транспорт, туризм и влияние путешествий на местные сообщества.',
    prompt: 'Can tourism benefit local communities without damaging the environment?',
    core: `broaden your horizons|расширять кругозор
recharge your batteries|восстановить силы
get away from it all|отдохнуть от повседневной суеты
an overcrowded place|переполненное место
a delayed flight|задержанный рейс
local food|местная еда
ecotourism|экотуризм
benefit local communities|приносить пользу местным сообществам`,
    advanced: `sustainable tourism|устойчивый туризм|Sustainable tourism aims to limit environmental harm.
carbon footprint|углеродный след|Long-haul flights can increase a traveller's carbon footprint.
mass tourism|массовый туризм|Mass tourism may strain local infrastructure.
off-peak travel|путешествие вне пикового сезона|Off-peak travel can ease pressure on popular destinations.
cultural exchange|культурный обмен|Travel can encourage meaningful cultural exchange.
public transport links|транспортное сообщение|Better public transport links make rural areas easier to reach.
travel disruption|сбой в поездке|Severe weather can cause widespread travel disruption.
preserve local heritage|сохранять местное наследие|Tourism revenue can help preserve local heritage.`
  },
  {
    id: 'nature', icon: '❋', title: 'Природа и экология', en: 'Nature & environment',
    description: 'Климат, отходы, биоразнообразие и меры защиты природы.',
    prompt: 'Who should take the greatest responsibility for reducing environmental damage?',
    core: `global warming|глобальное потепление
greenhouse gases|парниковые газы
endangered species|виды под угрозой исчезновения
deforestation|вырубка лесов
protect natural resources|беречь природные ресурсы
recycle waste|перерабатывать отходы
extreme weather|экстремальная погода
destroy a habitat|уничтожать среду обитания`,
    advanced: `biodiversity loss|утрата биоразнообразия|Biodiversity loss threatens the stability of ecosystems.
renewable energy|возобновляемая энергия|Renewable energy can reduce dependence on fossil fuels.
climate resilience|устойчивость к изменению климата|Cities need to improve their climate resilience.
habitat restoration|восстановление среды обитания|Habitat restoration can help endangered species recover.
circular economy|экономика замкнутого цикла|A circular economy keeps materials in use for longer.
emissions reduction|сокращение выбросов|Emissions reduction requires changes across many sectors.
environmental regulation|природоохранное регулирование|Effective environmental regulation can limit pollution.
resource depletion|истощение ресурсов|Overconsumption accelerates resource depletion.`
  },
  {
    id: 'work', icon: '▣', title: 'Работа и карьера', en: 'Work & careers',
    description: 'Поиск работы, условия труда, профессиональное развитие и занятость.',
    prompt: 'Is job satisfaction more important than a high salary?',
    core: `apply for a job|подавать заявление о приёме на работу
send in a CV|отправлять резюме
work overtime|работать сверхурочно
meet a deadline|уложиться в срок
a permanent contract|постоянный трудовой договор
a part-time job|работа с неполной занятостью
employee benefits|льготы для сотрудников
be self-employed|работать на себя`,
    advanced: `career progression|карьерный рост|Clear career progression can improve motivation.
job security|стабильность занятости|Job security matters to many workers.
transferable skills|универсальные навыки|Communication is a transferable skill.
workforce shortage|нехватка рабочей силы|A workforce shortage can affect public services.
flexible working arrangements|гибкие условия работы|Flexible working arrangements can help parents.
professional development|профессиональное развитие|Employers should invest in professional development.
labour market|рынок труда|Technology is changing the labour market.
burnout|профессиональное выгорание|Heavy workloads may lead to burnout.`
  },
  {
    id: 'education', icon: '✦', title: 'Образование и языки', en: 'Education & languages',
    description: 'Учёба, экзамены, университет, доступность образования и изучение языков.',
    prompt: 'Should universities focus more on practical skills than academic knowledge?',
    core: `compulsory subjects|обязательные предметы
extracurricular activities|внеучебные занятия
make progress|делать успехи
retake an exam|пересдать экзамен
catch up with schoolwork|наверстать учёбу
get a scholarship|получить стипендию
pay tuition fees|платить за обучение
get a degree|получить диплом`,
    advanced: `lifelong learning|обучение на протяжении всей жизни|Lifelong learning helps workers adapt to change.
critical thinking|критическое мышление|Schools should encourage critical thinking.
academic achievement|учебные достижения|Family income can influence academic achievement.
equal access to education|равный доступ к образованию|Equal access to education remains a major policy goal.
vocational training|профессиональное обучение|Vocational training offers an alternative route to employment.
language proficiency|уровень владения языком|Regular practice improves language proficiency.
digital literacy|цифровая грамотность|Digital literacy is essential in modern workplaces.
student debt|студенческий долг|High tuition fees can increase student debt.`
  },
  {
    id: 'technology', icon: '⌘', title: 'Технологии и наука', en: 'Technology & science',
    description: 'Цифровые привычки, безопасность, СМИ, открытия и новые технологии.',
    prompt: 'Does technology make people more productive or more distracted?',
    core: `set notifications|настроить уведомления
get distracted|отвлечься
scroll through social media|листать соцсети
back up your data|создать резервную копию данных
change a password|сменить пароль
carry out an experiment|проводить эксперимент
make a discovery|совершить открытие
stay informed|быть в курсе событий`,
    advanced: `digital divide|цифровой разрыв|The digital divide limits access to online education.
data privacy|конфиденциальность данных|Data privacy is a concern for many users.
algorithmic bias|алгоритмическая предвзятость|Algorithmic bias can affect automated decisions.
scientific breakthrough|научный прорыв|The discovery was described as a scientific breakthrough.
technological innovation|технологическая инновация|Technological innovation can improve public services.
information overload|информационная перегрузка|Constant notifications contribute to information overload.
media literacy|медиаграмотность|Media literacy helps people evaluate online claims.
evidence-based research|исследование, основанное на доказательствах|Policy should be informed by evidence-based research.`
  },
  {
    id: 'celebrations', icon: '✳', title: 'Праздники и традиции', en: 'Festivals & celebrations',
    description: 'Семейные события, фестивали, культурное наследие и общественные традиции.',
    prompt: 'Why is it important to preserve local festivals and traditions?',
    core: `dress up|наряжаться
make a wish|загадать желание
give a speech|произнести речь
look forward to seeing someone|с нетерпением ждать встречи
hold a celebration|устроить празднование
take part in a parade|участвовать в параде
wear a costume|надеть костюм
mark an anniversary|отмечать годовщину`,
    advanced: `cultural heritage|культурное наследие|Festivals can help preserve cultural heritage.
a sense of belonging|чувство принадлежности|Shared traditions create a sense of belonging.
community cohesion|сплочённость сообщества|Local events can strengthen community cohesion.
intergenerational tradition|традиция, передающаяся между поколениями|Cooking together can be an intergenerational tradition.
commercialisation of festivals|коммерциализация праздников|Some people worry about the commercialisation of festivals.
commemorate an event|отмечать памятное событие|The town gathers to commemorate the event.
cultural identity|культурная идентичность|Traditional music is part of the region's cultural identity.
inclusive celebration|праздник, открытый для всех|An inclusive celebration welcomes people from different backgrounds.`
  }
].map((topic) => ({
  ...topic,
  words: [
    ...topic.core.split('\n').map((line) => {
      const [en, ru] = line.split('|');
      return { en, ru, example: '', origin: 'core' };
    }),
    ...topic.advanced.split('\n').map((line) => {
      const [en, ru, example] = line.split('|');
      return { en, ru, example, origin: 'advanced' };
    })
  ]
}));
