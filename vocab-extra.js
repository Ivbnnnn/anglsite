// Additional entries bring every topic to 50 expressions.
// Core entries continue the vocabulary lists in Vocabulary and Grammar v2;
// IELTS+ entries add useful topic-specific collocations and concepts.
const vocabularyExpansion = {
  home: {
    core: `clean the windows|мыть окна
vacuum the floor|пылесосить пол
dust the furniture|вытирать пыль с мебели
make the bed|заправлять кровать
do the ironing|гладить бельё
set the table|накрывать на стол
walk the dog|выгуливать собаку
water the flowers|поливать цветы
sort out clothes|разбирать одежду
throw away rubbish|выбрасывать мусор`,
    advanced: `household budget|семейный бюджет|A household budget helps families plan their spending.
utility bills|счета за коммунальные услуги
tenancy agreement|договор аренды жилья
mortgage repayments|выплаты по ипотеке
residential area|жилой район
living conditions|жилищные условия
overcrowded housing|перенаселённое жильё
housing shortage|нехватка жилья|A housing shortage can push rents up.
home maintenance|обслуживание дома
repair costs|расходы на ремонт
property prices|цены на недвижимость
shared accommodation|совместное проживание в арендуемом жилье
energy consumption|потребление энергии
heating expenses|расходы на отопление
space-efficient design|рациональное использование пространства
accessible housing|доступное для людей с инвалидностью жильё
housing affordability|доступность жилья по цене|Housing affordability is a major challenge for young adults.
home ownership|владение собственным жильём
housing policy|жилищная политика
domestic routine|домашний распорядок
caring responsibilities|обязанности по уходу за близкими
childcare duties|обязанности по уходу за детьми
household income|доход домохозяйства
living expenses|расходы на жизнь`
  },
  city: {
    core: `block of flats|многоквартирный дом
air pollution|загрязнение воздуха
rush hour|час пик
traffic jam|пробка на дороге
live in the suburbs|жить в пригороде
run-down area|обветшавший район
rent an overpriced flat|снимать слишком дорогую квартиру
quick access to healthcare|быстрый доступ к медицине
grow fruit and vegetables|выращивать фрукты и овощи
remote area|удалённая местность`,
    advanced: `urban planning|городское планирование
pedestrian-friendly streets|улицы, удобные для пешеходов
green spaces|зелёные зоны
mixed-use development|многофункциональная застройка
commuter belt|пригородная зона ежедневных поездок
housing demand|спрос на жильё
public amenities|общественные объекты и удобства
air quality|качество воздуха
noise pollution|шумовое загрязнение
traffic flow|движение транспорта
car dependency|зависимость от автомобиля
transport infrastructure|транспортная инфраструктура
urban regeneration|обновление городских районов|Urban regeneration can improve neglected neighbourhoods.
gentrification|джентрификация
social mobility|социальная мобильность
economic opportunity|экономические возможности
local employment|местная занятость
population growth|рост населения
strain on services|нагрузка на службы|Rapid growth can put a strain on public services.
rural depopulation|сокращение сельского населения
agricultural land|сельскохозяйственные земли
community facilities|общественные учреждения
reliable broadband|надёжный широкополосный интернет
regional development|региональное развитие`
  },
  people: {
    core: `sibling|брат или сестра
flatmate|сосед по квартире
colleague|коллега
relative|родственник
get to know someone|познакомиться с кем-либо
hang out with friends|проводить время с друзьями
get divorced|развестись
break up|расстаться
be close to someone|быть близким с кем-либо
bring up children|воспитывать детей`,
    advanced: `family dynamics|отношения внутри семьи
peer influence|влияние сверстников
social circle|круг общения
shared values|общие ценности
personal boundaries|личные границы
healthy communication|здоровое общение
empathetic listening|внимательное и чуткое слушание
long-distance relationship|отношения на расстоянии
emotional intimacy|эмоциональная близость
family ties|семейные связи
support network|сеть поддержки
interpersonal skills|навыки общения
social expectations|социальные ожидания
generational differences|различия поколений
caregiving role|роль человека, ухаживающего за близким
social interaction|социальное взаимодействие
face-to-face contact|личное общение
digital communication|общение через цифровые средства
conflicting priorities|противоречащие друг другу приоритеты
compromise on an issue|пойти на компромисс по вопросу
show consideration|проявлять внимание к другим
foster independence|развивать самостоятельность|Parents can foster independence without withdrawing support.
strengthen family bonds|укреплять семейные узы
maintain personal relationships|поддерживать личные отношения`
  },
  health: {
    core: `a fever|жар
a cough|кашель
a headache|головная боль
a rash|сыпь
take antibiotics|принимать антибиотики
take an antihistamine|принимать антигистаминное средство
have an X-ray|сделать рентген
use crutches|пользоваться костылями
drink plenty of water|пить достаточно воды
take up smoking|начать курить`,
    advanced: `healthcare system|система здравоохранения
primary care|первичная медицинская помощь
medical treatment|медицинское лечение
early diagnosis|ранняя диагностика
screening programme|программа профилактического обследования
risk factor|фактор риска
life expectancy|ожидаемая продолжительность жизни
physical inactivity|недостаток физической активности
nutritional deficiency|дефицит питательных веществ
sleep deprivation|недостаток сна
stress management|управление стрессом
mental health support|поддержка психического здоровья
health outcomes|показатели здоровья
universal healthcare|всеобщий доступ к медицине
medical costs|расходы на лечение
public awareness|осведомлённость общества
evidence-based advice|рекомендации, основанные на научных данных
regular check-ups|регулярные медицинские осмотры
healthy ageing|здоровое старение
substance abuse|злоупотребление веществами
obesity rates|уровень ожирения
patient care|уход за пациентами
health promotion|популяризация здорового образа жизни
recover fully|полностью выздороветь`
  },
  sport: {
    core: `play board games|играть в настольные игры
play the piano|играть на пианино
read books|читать книги
go to the cinema|ходить в кино
join a band|вступить в музыкальную группу
pick up a book|взять книгу почитать
go cycling|кататься на велосипеде
go ice skating|кататься на коньках
do martial arts|заниматься боевыми искусствами
watch a match|смотреть матч`,
    advanced: `leisure pursuits|занятия в свободное время
active lifestyle|активный образ жизни
sedentary pastime|малоподвижное хобби
team spirit|командный дух
individual achievement|личное достижение
sporting event|спортивное мероприятие
elite athlete|профессиональный спортсмен высокого уровня
grassroots sport|массовый любительский спорт
fitness level|уровень физической подготовки
training schedule|график тренировок
injury prevention|профилактика травм
mental resilience|психологическая устойчивость
discipline and perseverance|дисциплина и упорство
creative outlet|способ творческого самовыражения
personal fulfilment|личное удовлетворение
shared interest|общий интерес
social participation|участие в общественной жизни
barrier to participation|препятствие для участия
affordable access|доступность по цене
public funding for sport|государственное финансирование спорта
competitive sport|соревновательный спорт
physical activity guidelines|рекомендации по физической активности
develop a passion for music|развить увлечение музыкой
pursue a hobby|заниматься увлечением`
  },
  shopping: {
    core: `a receipt|чек
return an item|вернуть товар
give a refund|вернуть деньги
special offer|специальное предложение
huge discount|большая скидка
negotiate a price|договориться о цене
add an item to your basket|добавить товар в корзину
cost of delivery|стоимость доставки
low-quality product|некачественный товар
fashion accessory|модный аксессуар`,
    advanced: `purchasing decision|решение о покупке
brand loyalty|приверженность бренду
advertising campaign|рекламная кампания
target audience|целевая аудитория
consumer demand|потребительский спрос
overconsumption|чрезмерное потребление
textile waste|текстильные отходы
environmental impact|воздействие на окружающую среду
labour conditions|условия труда
fair wages|справедливая оплата труда
responsible sourcing|ответственные закупки сырья
reusable packaging|многоразовая упаковка
product lifespan|срок службы товара
repair rather than replace|чинить вместо замены
cost-effective choice|экономически выгодный выбор
value for money|соотношение цены и качества
online marketplace|торговая онлайн-площадка
customer satisfaction|удовлетворённость покупателей
return policy|правила возврата
hidden charges|скрытые платежи
payment security|безопасность платежей
consumer rights|права потребителей
shopping habits|покупательские привычки
make an informed choice|сделать осознанный выбор`
  },
  travel: {
    core: `book a holiday|забронировать отдых
see the sights|осмотреть достопримечательности
take it easy|не перенапрягаться
stay in a guest house|остановиться в гостевом доме
stay at a campsite|остановиться в кемпинге
go backpacking|путешествовать с рюкзаком
departure gate|выход на посадку
arrivals hall|зал прибытия
train platform|железнодорожная платформа
traffic congestion|дорожные заторы`,
    advanced: `tourism industry|туристическая отрасль
visitor numbers|число туристов
tourist destination|туристическое направление
local economy|местная экономика
seasonal employment|сезонная занятость
environmental damage|ущерб окружающей среде
protected area|охраняемая территория
responsible travel|ответственное путешествие
authentic experience|подлинный опыт
cultural sensitivity|уважение к другой культуре
travel itinerary|маршрут поездки
budget accommodation|недорогое жильё для туристов
transport emissions|выбросы транспорта
rail alternative|альтернатива поездке поездом
long-haul flight|дальнемагистральный перелёт
delayed departure|задержка отправления
travel insurance|страхование путешествий
visa requirements|визовые требования
border crossing|пересечение границы
tourism revenue|доходы от туризма
local businesses|местные предприятия
visitor management|регулирование туристических потоков
overtourism|избыточный туризм
conservation efforts|усилия по сохранению природы`
  },
  nature: {
    core: `melting ice caps|таяние полярных льдов
rising sea levels|повышение уровня моря
plant trees|сажать деревья
pick up litter|подбирать мусор
reuse materials|повторно использовать материалы
save wildlife|сохранять дикую природу
a drought|засуха
a flood|наводнение
a heatwave|волна жары
natural habitat|естественная среда обитания`,
    advanced: `climate change mitigation|смягчение последствий изменения климата
adaptation measures|меры адаптации
fossil fuels|ископаемое топливо
clean energy transition|переход на чистую энергию
carbon emissions|выбросы углерода
net-zero target|цель нулевых чистых выбросов
ecosystem services|экосистемные услуги
species extinction|вымирание видов
wildlife conservation|охрана дикой природы
protected habitat|охраняемая среда обитания
water scarcity|нехватка воды
soil degradation|деградация почв
plastic pollution|загрязнение пластиком
single-use products|одноразовые товары
waste management|управление отходами
recycling infrastructure|инфраструктура переработки
environmental awareness|экологическая осведомлённость
sustainable agriculture|устойчивое сельское хозяйство
food waste|пищевые отходы
ecological footprint|экологический след
natural disaster risk|риск стихийных бедствий
flood prevention|предотвращение наводнений
conservation policy|природоохранная политика
long-term sustainability|долгосрочная устойчивость`
  },
  work: {
    core: `job applicant|соискатель
job qualifications|профессиональная квалификация
salary|зарплата
wages|оплата труда
bonus|премия
medical insurance|медицинская страховка
temporary contract|временный трудовой договор
take maternity leave|уйти в отпуск по беременности и родам
hire an employee|нанять сотрудника
quit a job|уволиться с работы`,
    advanced: `employment prospects|перспективы трудоустройства
career path|карьерный путь
work experience|опыт работы
skills gap|дефицит необходимых навыков
staff turnover|текучесть кадров
recruitment process|процесс найма
performance review|оценка результатов работы
promotion opportunities|возможности повышения
salary negotiation|переговоры о зарплате
remote work|удалённая работа
hybrid working|гибридный формат работы
workplace culture|культура на рабочем месте
employee well-being|благополучие сотрудников
occupational stress|стресс на работе
job satisfaction|удовлетворённость работой
workload management|управление рабочей нагрузкой
equal opportunities|равные возможности
gender pay gap|гендерный разрыв в оплате труда
living wage|зарплата, достаточная для жизни
economic insecurity|экономическая нестабильность
automation of tasks|автоматизация задач
reskilling programme|программа переобучения
entrepreneurial skills|предпринимательские навыки
financial independence|финансовая независимость`
  },
  education: {
    core: `do homework|делать домашнее задание
take notes|делать записи
solve problems|решать задачи
do an experiment|проводить эксперимент
skip lessons|пропускать уроки
prepare for an exam|готовиться к экзамену
pass an exam|сдать экзамен
optional subjects|предметы по выбору
school term|учебная четверть
university accommodation|жильё для студентов`,
    advanced: `educational attainment|уровень образования
learning outcomes|результаты обучения
curriculum design|разработка учебной программы
teaching methods|методы преподавания
assessment criteria|критерии оценивания
standardised testing|стандартизированное тестирование
practical experience|практический опыт
independent learning|самостоятельное обучение
research skills|исследовательские навыки
academic integrity|академическая честность
inclusive education|инклюзивное образование
special educational needs|особые образовательные потребности
funding for schools|финансирование школ
teacher training|подготовка учителей
class size|размер класса
remote learning|дистанционное обучение
access to resources|доступ к учебным ресурсам
language immersion|погружение в языковую среду
fluency in a language|свободное владение языком
communication skills|коммуникативные навыки
higher education|высшее образование
tuition costs|стоимость обучения
graduate employment|трудоустройство выпускников
educational inequality|неравенство в образовании`
  },
  technology: {
    core: `voice assistant|голосовой помощник
smartwatch|умные часы
search for information|искать информацию
use social media|пользоваться социальными сетями
download a file|скачать файл
reboot a device|перезагрузить устройство
computer virus|компьютерный вирус
visit a website|посетить сайт
listen to a podcast|слушать подкаст
invent a device|изобрести устройство`,
    advanced: `artificial intelligence|искусственный интеллект
machine learning|машинное обучение
automated decision-making|автоматизированное принятие решений
digital transformation|цифровая трансформация
online security|безопасность в интернете
cyberattack|кибератака
personal data|персональные данные
data breach|утечка данных
digital footprint|цифровой след
screen time|время перед экраном
online addiction|зависимость от интернета
misinformation|ложная информация
fact-checking|проверка фактов
credible source|надёжный источник
scientific evidence|научные доказательства
research funding|финансирование исследований
peer review|экспертное рецензирование
clinical trial|клиническое испытание
renewable technology|технология возобновляемой энергетики
automation of jobs|автоматизация рабочих мест
human oversight|контроль со стороны человека
ethical concerns|этические вопросы
technological dependence|зависимость от технологий
accessibility features|функции доступности`
  },
  celebrations: {
    core: `invite guests|пригласить гостей
decorate a house|украсить дом
have a surprise party|устроить вечеринку-сюрприз
give presents|дарить подарки
set off fireworks|запустить фейерверк
celebrate a birthday|отмечать день рождения
hold a wedding reception|провести свадебный приём
perform live music|исполнять музыку вживую
take part in a festival|участвовать в фестивале
prepare a festive meal|готовить праздничную еду`,
    advanced: `traditional ceremony|традиционная церемония
religious observance|религиозный обряд
public holiday|государственный праздник
annual event|ежегодное событие
local custom|местный обычай
shared ritual|общий ритуал
traditional costume|традиционный костюм
festive atmosphere|праздничная атмосфера
community gathering|встреча местного сообщества
family reunion|встреча всей семьи
historical significance|историческое значение
collective memory|коллективная память
preserve a tradition|сохранить традицию
pass down a custom|передать обычай следующему поколению
cultural diversity|культурное разнообразие
cross-cultural understanding|межкультурное понимание
tourist attraction|туристическая достопримечательность
festival organiser|организатор фестиваля
local participation|участие местных жителей
economic benefit|экономическая выгода
commercial pressure|коммерческое давление
inclusive event|мероприятие, открытое для всех
commemorative occasion|памятное событие
symbolic meaning|символическое значение`
  }
};

for (const topic of vocabularyTopics) {
  const expansion = vocabularyExpansion[topic.id];
  if (!expansion) throw new Error(`Missing expansion for ${topic.id}`);
  for (const origin of ['core', 'advanced']) {
    topic.words.push(...expansion[origin].split('\n').map((line) => {
      const [en, ru, example = ''] = line.split('|');
      return { en, ru, example, origin };
    }));
  }
}
