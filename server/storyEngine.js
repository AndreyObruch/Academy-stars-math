/**
 * АКАДЕМИЯ ЗВЁЗДНЫХ МАТЕМАТИКОВ — v4.2 (Задача 1.1 плана)
 * Сюжетный генератор: оборачивает «сухие» примеры в контекст космической миссии.
 * Работает на сервере, подключается в routes/generate.js.
 * Математический движок (mathEngine.js) не изменяется.
 */

// Банк сюжетов по типам задач. Плейсхолдеры {a} {b} {n} {emoji} и т.д.
// подставляются из чисел уже сгенерированной задачи.
const BANK = {
  visual_count: [
    'Сколько {emoji} пролетело мимо станции?',
    'Пилот насчитал {emoji} на радаре. Сколько их?',
    'На орбите дрейфуют {emoji}. Посчитай!',
    'Сколько {emoji} увидел скафандр?'
  ],
  visual_sequence: [
    'Сколько звёзд {emoji} видно в телескоп?',
    'На карте отмечено {emoji}. Посчитай все!',
    'Скафандр зафиксировал {emoji}. Сколько их?'
  ],
  comparison: [
    'Плотность поля A: {a}, поля B: {b}. Какое поле плотнее?',
    'Корабль с бортовым номером {a} догоняет корабль {b}. Сравни номера!',
    'Энергия щита {a}, энергия меча {b}. Где энергии больше?',
    'Запас кислорода в одном отсеке {a}, в другом {b}. Где запас больше?'
  ],
  composition: [
    'Экипаж из {n} человек: {a} пилотов и ... штурманов?',
    'Груз {n} тонн: {a} тонны руды и ... кристаллов?',
    'Корабль длиной {n} метров: {a} метра корпус и ... нос?'
  ],
  addition: [
    'Корабль принял {a} тонн топлива и ещё {b} тонн. Сколько всего?',
    'На станции было {a} пилотов, прилетело ещё {b}. Сколько стало?',
    'Ракета собрала {a} кристаллов и {b} метеоритов. Сколько всего?',
    'Экипаж из {a} человек пополнился {b} стажёрами. Итого?'
  ],
  subtraction: [
    'Из {a} литров кислорода израсходовали {b}. Сколько осталось?',
    'Было {a} ракет, {b} улетели на задание. Сколько на базе?',
    'Корабль потерял {b} из {a} деталей. Сколько целых?',
    'На борту {a} пайков, съели {b}. Сколько осталось?'
  ],
  addition_20: [
    'Два корабля везут {a} и {b} тонн груза. Общий вес?',
    'Станция приняла {a} сигналов утром и {b} вечером. Всего?'
  ],
  subtraction_20: [
    'Из {a} модулей станции {b} на ремонте. Сколько работают?',
    'Корабль потратил {b} из {a} единиц энергии. Остаток?'
  ],
  difference: [
    'Корабль A пролетел {a} км, корабль B — {b} км. На сколько A дальше?',
    'Запас топлива {a}, а воды {b}. На сколько топлива больше?'
  ],
  unknown: [
    'В баке было топливо. Долит ещё {b} тонн — станет {c}. Сколько было сначала?',
    'Корабль взял на борт груз и стало {c} тонн. До погрузки было ... и добавили {b}. Сколько было?'
  ],
  parity: [
    'Бортовой номер {n} — чётный или нечётный?',
    'Двигатель модели {n} — чётная или нечётная модель?'
  ],
  group_count: [
    'Маяки станции мигают через равные интервалы. Один сигнал пропущен — найди его!',
    'Датчики фиксируют вспышки через равные промежутки. Какой сигнал пропущен?'
  ],
  measurement: [
    'Корпус корабля: {q} Переведи для инженеров!',
    'Длина скафандра: {q} Проверь перевод!',
    'Грузовой отсек: {q} Переведи!'
  ],
  pattern: [
    'Продолжи последовательность сигналов: {seq}, ...',
    'Код доступа к шлюзу: {seq}, ... Какое следующее число?'
  ],
  emoji_rebus: [
    '{emoji} + {emoji} = {sum}. Чему равен один {emoji}?',
    'Два одинаковых артефакта {emoji} весят {sum}. Вес одного?'
  ],
  combinatorics: [
    'У пилота {a} шлемов и {b} скафандров. Сколько комбинаций?',
    'На станции {a} шлюза и {b} дока. Сколькими путями можно выйти?'
  ],
  number_puzzle: [
    'Сумма кодов двух шлюзов {sum}, один из них {a}. Найди второй.',
    'Два артефакта весят {sum} кг, один — {a} кг. Вес второго?'
  ]
};

// Извлекаем числа и данные из уже сгенерированной задачи
function extractData(question) {
  const data = {};
  const nums = String(question.question).match(/\d+/g) || [];

  switch (question.type) {
    case 'visual_count':
    case 'visual_sequence':
      data.emoji = Array.isArray(question.visual) && question.visual[0] ? question.visual[0] : '⭐';
      break;
    case 'comparison':
    case 'addition':
    case 'addition_20':
    case 'subtraction':
    case 'subtraction_20':
    case 'difference':
      data.a = nums[0] || '';
      data.b = nums[1] || '';
      break;
    case 'composition':
      data.n = nums[0] || '';
      data.a = nums[1] || '';
      break;
    case 'place_value':
      data.n = nums[0] || '';
      data.tens = nums[0] ? String(Math.floor(parseInt(nums[0], 10) / 10)) : '';
      break;
    case 'unknown':
      data.b = nums[0] || '';
      data.c = nums[1] || '';
      break;
    case 'parity':
      data.n = nums[0] || '';
      break;
    case 'measurement':
      data.q = question.question;
      break;
    case 'emoji_rebus': {
      const emMatch = String(question.question).match(/^[^\s+]+/);
      data.emoji = emMatch ? emMatch[0] : '';
      const sumMatch = String(question.question).match(/=\s*(\d+)/);
      data.sum = sumMatch ? sumMatch[1] : '';
      break;
    }
    case 'pattern': {
      const seqP = String(question.question).match(/\d+(?:,\s*\d+)*/);
      data.seq = seqP ? seqP[0] : '';
      break;
    }
    case 'combinatorics':
    case 'number_puzzle':
      data.a = nums[0] || '';
      data.b = nums[1] || nums[0] || '';
      data.sum = (nums[0] && nums[1]) ? String(parseInt(nums[0], 10) + parseInt(nums[1], 10)) : '';
      break;
    default:
      break;
  }
  return data;
}

// Подстановка данных в шаблон
function fillTemplate(template, data) {
  return template
    .replace(/{a}/g, data.a ?? '')
    .replace(/{b}/g, data.b ?? '')
    .replace(/{n}/g, data.n ?? '')
    .replace(/{tens}/g, data.tens ?? '')
    .replace(/{emoji}/g, data.emoji ?? '⭐')
    .replace(/{q}/g, data.q ?? '')
    .replace(/{seq}/g, data.seq ?? '')
    .replace(/{sum}/g, data.sum ?? '');
}

// Обернуть задачу в сюжет. Если сюжета для типа нет или сюжет уже есть — не трогаем.
function wrap(question) {
  if (!question || question.story) return question;
  const templates = BANK[question.type];
  if (!templates || !templates.length) return question;
  const template = templates[Math.floor(Math.random() * templates.length)];
  question.story = fillTemplate(template, extractData(question));
  question.storyType = question.type;
  return question;
}

module.exports = { wrap, BANK };