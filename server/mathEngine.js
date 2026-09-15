// v4.12-pool: расширены пулы примеров (уровни 18–20 и повторы), параметрические генераторы,
// фикс пустых эмодзи в visual (были '' в массивах эмодзи)
const LEVELS = [
  { id: 1, name: 'Первый контакт', planet: 'Аэрис', type: 'visual_count', block: 1, baseTime: 300 },
  { id: 2, name: 'Гравитационное поле', planet: 'Люмен', type: 'comparison', block: 1, baseTime: 315 },
  { id: 3, name: 'Двойные звёзды', planet: 'Дуо', type: 'composition', block: 1, baseTime: 331 },
  { id: 4, name: 'Слияние галактик', planet: 'Суммия', type: 'addition', block: 1, baseTime: 347, max: 10 },
  { id: 5, name: 'Чёрная дыра', planet: 'Умбра', type: 'subtraction', block: 1, baseTime: 365, max: 10 },
  { id: 6, name: 'Парад планет', planet: 'Процессия', type: 'visual_sequence', block: 2, baseTime: 383 },
  { id: 7, name: 'Двойная система', planet: 'Бинита', type: 'place_value', block: 2, baseTime: 402 },
  { id: 8, name: 'Световой скачок', planet: 'Люцида', type: 'addition_20', block: 2, baseTime: 422 },
  { id: 9, name: 'Обратный отсчёт', planet: 'Ретрогра', type: 'subtraction_20', block: 2, baseTime: 443 },
  { id: 10, name: 'Перекрёсток комет', planet: 'Комета', type: 'mixed_20', block: 2, baseTime: 465 },
  { id: 11, name: 'Весы Вселенной', planet: 'Либра', type: 'difference', block: 3, baseTime: 488 },
  { id: 12, name: 'Ускорение / Торможение', planet: 'Велоция', type: 'increase_decrease', block: 3, baseTime: 512 },
  { id: 13, name: 'Скрытая планета', planet: 'Целита', type: 'unknown', block: 3, baseTime: 538 },
  { id: 14, name: 'Симметрия мироздания', planet: 'Симметрия', type: 'parity', block: 3, baseTime: 565 },
  { id: 15, name: 'Ритм пульсара', planet: 'Пульсара', type: 'group_count', block: 3, baseTime: 593 },
  { id: 16, name: 'Грузовой корабль', planet: 'Каргона', type: 'text_problem_1', block: 4, baseTime: 623 },
  { id: 17, name: 'Двойная экспедиция', planet: 'Эксперия', type: 'text_problem_2', block: 4, baseTime: 654 },
  { id: 18, name: 'Станция «Метрология»', planet: 'Метрия', type: 'measurement', block: 4, baseTime: 687 },
  { id: 19, name: 'Карта созвездий', planet: 'Стелларис', type: 'geometry', block: 4, baseTime: 721 },
  { id: 20, name: 'Врата Андромеды', planet: 'Андария', type: 'andromeda_mix', block: 4, baseTime: 757 },
  { id: 21, name: 'Что лишнее?', planet: 'Кристаллия', type: 'odd_one_out', block: 6, baseTime: 795 },
  { id: 22, name: 'Закономерности', planet: 'Секвенция', type: 'pattern', block: 6, baseTime: 835 },
  { id: 23, name: 'Эмодзи-ребусы', planet: 'Ребусия', type: 'emoji_rebus', block: 6, baseTime: 877 },
  { id: 24, name: 'Истинно или ложно', planet: 'Веритас', type: 'true_false', block: 6, baseTime: 921 },
  { id: 25, name: 'Смешанная логика', planet: 'Смекалия', type: 'logic_mix_1', block: 6, baseTime: 967 },
  { id: 26, name: 'Задачи с подвохом', planet: 'Таиния', type: 'trick_question', block: 7, baseTime: 1015 },
  { id: 27, name: 'Логические цепочки', planet: 'Катения', type: 'logic_chain', block: 7, baseTime: 1066 },
  { id: 28, name: 'Пространство', planet: 'Ориентия', type: 'spatial', block: 7, baseTime: 1119 },
  { id: 29, name: 'Загадки-смекалки', planet: 'Мистерия', type: 'riddle', block: 7, baseTime: 1175 },
  { id: 30, name: 'Детективный экзамен', planet: 'Шерлокия', type: 'detective_mix', block: 7, baseTime: 1234 },
  { id: 31, name: 'Сколько способов?', planet: 'Вариатия', type: 'combinatorics', block: 8, baseTime: 1296 },
  { id: 32, name: 'Числовые головоломки', planet: 'Пазлия', type: 'number_puzzle', block: 8, baseTime: 1361 },
  { id: 33, name: 'Задачи на внимание', planet: 'Атенция', type: 'attention', block: 8, baseTime: 1429 },
  { id: 34, name: 'Космические загадки', planet: 'Арения', type: 'space_riddle', block: 8, baseTime: 1500 },
  { id: 35, name: 'Цирковой экзамен', planet: 'Циркония', type: 'circus_mix', block: 8, baseTime: 1575 },
  { id: 36, name: 'Логика + смекалка', planet: 'Аурум', type: 'logic_smekalka', block: 9, baseTime: 1654 },
  { id: 37, name: 'Числа + закономерности', planet: 'Спиралия', type: 'number_pattern', block: 9, baseTime: 1737 },
  { id: 38, name: 'Пространство + внимание', planet: 'Астерия', type: 'space_attention', block: 9, baseTime: 1824 },
  { id: 39, name: 'Финальная разминка', planet: 'Лавария', type: 'final_warmup', block: 9, baseTime: 1915 },
  { id: 40, name: 'КОСМИЧЕСКИЙ ЭКЗАМЕН', planet: 'Корония', type: 'mega_boss', block: 10, baseTime: 2400 }
];

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const pick = (array) => array[randInt(0, array.length - 1)];

const numOptions = (correct, min, max) => {
  const options = new Set([correct]);
  const range = Math.min(5, Math.max(2, max - min));
  let attempts = 0;
  while (options.size < 4 && attempts < 100) {
    const offset = randInt(-range, range);
    const val = correct + offset;
    if (val >= min && val <= max && val !== correct && Number.isInteger(val)) {
      options.add(val);
    }
    attempts++;
  }
  let fill = min;
  while (options.size < 4 && fill <= max) {
    if (!options.has(fill)) options.add(fill);
    fill++;
  }
  return shuffle(Array.from(options));
};

const getEmojiName = (emoji) => {
  const names = {
    '🪐': 'планет',
    '💎': 'кристаллов',
    '🚀': 'ракет',
    '⭐': 'звёзд',
    '👽': 'инопланетян'
  };
  return names[emoji] || 'объектов';
};

const generators = {
  visual_count: () => {
    const emojis = ['🪐', '💎', '🚀', '⭐', '👽'];
    const emoji = pick(emojis);
    const count = randInt(3, 8);
    return {
      type: 'visual_count',
      question: `Сколько ${getEmojiName(emoji)}?`,
      visual: Array(count).fill(emoji),
      options: numOptions(count, 1, 10),
      correct: count
    };
  },
  comparison: () => {
    const a = randInt(1, 10), b = randInt(1, 10);
    const correct = a > b ? '>' : a < b ? '<' : '=';
    return {
      type: 'comparison',
      question: `Сравни числа: ${a} и ${b}. Какой знак поставить?`,
      options: ['>', '<', '='],
      correct: correct
    };
  },
  composition: () => {
    const n = randInt(3, 10), a = randInt(1, n - 1);
    return {
      type: 'composition',
      question: `${n} — это ${a} и ...`,
      options: numOptions(n - a, 1, 9),
      correct: n - a
    };
  },
  addition: (max = 10) => {
    const a = randInt(1, max - 1), b = randInt(1, max - a);
    return {
      type: 'addition',
      question: `${a} + ${b} = ?`,
      options: numOptions(a + b, 1, max),
      correct: a + b
    };
  },
  subtraction: (max = 10) => {
    const a = randInt(2, max), b = randInt(1, a);
    return {
      type: 'subtraction',
      question: `${a} − ${b} = ?`,
      options: numOptions(a - b, 0, max),
      correct: a - b
    };
  },
  visual_sequence: () => {
    const emojis = ['🪐', '💎', '🚀', '⭐', '👽'];
    const emoji = pick(emojis);
    const count = randInt(10, 18);
    return {
      type: 'visual_sequence',
      question: `Сколько ${getEmojiName(emoji)}?`,
      visual: Array(count).fill(emoji),
      options: numOptions(count, 5, 20),
      correct: count
    };
  },
  place_value: () => {
    const n = randInt(11, 19);
    return {
      type: 'place_value',
      question: `В числе ${n}: ${Math.floor(n / 10)} десятки и ... единицы?`,
      options: numOptions(n % 10, 0, 9),
      correct: n % 10
    };
  },
  addition_20: () => {
    const a = randInt(10, 15), b = randInt(1, Math.min(9, 19 - a));
    return {
      type: 'addition_20',
      question: `${a} + ${b} = ?`,
      options: numOptions(a + b, 10, 19),
      correct: a + b
    };
  },
  subtraction_20: () => {
    const a = randInt(11, 19), b = randInt(1, a - 10);
    return {
      type: 'subtraction_20',
      question: `${a} − ${b} = ?`,
      options: numOptions(a - b, 10, 19),
      correct: a - b
    };
  },
  mixed_20: () => Math.random() < 0.5 ? generators.addition_20() : generators.subtraction_20(),
  difference: () => {
    const a = randInt(3, 15), b = randInt(1, a - 1);
    return {
      type: 'difference',
      question: `На сколько ${a} больше, чем ${b}?`,
      options: numOptions(a - b, 1, 15),
      correct: a - b
    };
  },
  increase_decrease: () => {
    const a = randInt(2, 15), b = randInt(1, 5);
    const isIncrease = Math.random() < 0.5;
    return {
      type: 'increase_decrease',
      question: `${isIncrease ? 'Увеличь' : 'Уменьши'} ${a} на ${b}`,
      options: numOptions(isIncrease ? a + b : a - b, 1, 20),
      correct: isIncrease ? a + b : a - b
    };
  },
  unknown: () => {
    if (Math.random() < 0.5) {
      const b = randInt(1, 8), c = randInt(b + 1, 15);
      return {
        type: 'unknown',
        question: `... + ${b} = ${c}`,
        options: numOptions(c - b, 1, 10),
        correct: c - b
      };
    } else {
      const b = randInt(1, 5), c = randInt(1, 10);
      return {
        type: 'unknown',
        question: `... − ${b} = ${c}`,
        options: numOptions(c + b, 2, 15),
        correct: c + b
      };
    }
  },
  parity: () => {
    const n = randInt(1, 20);
    return {
      type: 'parity',
      question: `Число ${n} — это...`,
      options: ['Чётное', 'Нечётное'],
      correct: n % 2 === 0 ? 'Чётное' : 'Нечётное'
    };
  },
  group_count: () => {
    const step = [2, 5, 10][randInt(0, 2)];
    const missingIdx = randInt(1, 4);
    const seq = [];
    for (let i = 0; i <= 5; i++) seq.push(i * step);
    const display = seq.map((n, i) => i === missingIdx ? '?' : n).join(', ');
    return {
      type: 'group_count',
      question: `Пропущено: ${display}`,
      options: numOptions(seq[missingIdx], 0, 50),
      correct: seq[missingIdx]
    };
  },
  text_problem_1: () => {
    const problems = [
      (a, b) => ({ story: `На станции было ${a} 🚀. Прилетело ещё ${b} 🚀. Сколько стало?`, answer: a + b }),
      (a, b) => ({ story: `В пещере нашли ${a} 💎. Потеряли ${b} 💎. Сколько осталось?`, answer: a - b }),
      (a, b) => ({ story: `У инопланетян было ${a} 👽. Прибыло ещё ${b} 👽. Сколько всего?`, answer: a + b }),
      (a, b) => ({ story: `На орбите ${a} 🪐. Прилетело ещё ${b} 🪐. Сколько всего?`, answer: a + b }),
      (a, b) => ({ story: `В трюме было ${a} ⭐. Погрузили ещё ${b} ⭐. Сколько стало?`, answer: a + b }),
      (a, b) => ({ story: `Экипаж съел ${a} 🍎 из ${a + b}. Сколько осталось?`, answer: b }),
      (a, b) => ({ story: `У Ани ${a} 🎈, у Бори ${b} 🎈. Сколько всего?`, answer: a + b }),
      (a, b) => ({ story: `Робот сделал ${a} шага и ещё ${b}. Сколько всего шагов?`, answer: a + b })
    ];
    const gen = pick(problems);
    const a = randInt(3, 8), b = randInt(1, 5);
    const { story, answer } = gen(a, b);
    return {
      type: 'text_problem_1',
      story: story,
      question: 'Реши задачу',
      options: numOptions(answer, 1, 15),
      correct: answer
    };
  },
  text_problem_2: () => {
    const a = randInt(4, 8), b = randInt(1, Math.min(3, a - 1));
    const emojis = ['🚀', '💎', '🪐'];
    const emoji = pick(emojis);
    const isLess = Math.random() < 0.5;
    const blue = isLess ? a - b : a + b;
    return {
      type: 'text_problem_2',
      story: `На орбите ${a} ${emoji} красных, а синих на ${b} ${isLess ? 'меньше' : 'больше'}. Сколько всего ${emoji}?`,
      question: 'Реши задачу',
      options: numOptions(a + blue, 3, 25),
      correct: a + blue
    };
  },
  measurement: () => {
    const kind = randInt(0, 4);
    let q, correct;
    if (kind === 0) {
      const d = randInt(1, 5), c = randInt(1, 9);
      q = `${d} дм ${c} см = ... см`; correct = d * 10 + c;
    } else if (kind === 1) {
      const d = randInt(2, 9);
      q = `${d} дм = ... см`; correct = d * 10;
    } else if (kind === 2) {
      const a = randInt(1, 8), b = randInt(1, 9 - a);
      q = `${a} л + ${b} л = ... л`; correct = a + b;
    } else if (kind === 3) {
      const a = randInt(4, 10), b = randInt(1, a - 1);
      q = `${a} кг − ${b} кг = ... кг`; correct = a - b;
    } else {
      const a = randInt(3, 9), b = randInt(1, a - 1);
      q = `${a} л − ${b} л = ... л`; correct = a - b;
    }
    return {
      type: 'measurement',
      question: q,
      options: numOptions(correct, 1, 60),
      correct: correct
    };
  },
  geometry: () => {
    if (Math.random() < 0.2) {
      const shape = Math.random() < 0.5 ? { name: 'круга', emoji: '⭕' } : { name: 'овала', emoji: '⚪' };
      return {
        type: 'geometry',
        question: `Сколько углов у ${shape.name}?`,
        visual: [shape.emoji],
        options: numOptions(0, 0, 6),
        correct: 0
      };
    }
    const polys = [
      { name: 'треугольника', n: 3, emoji: '🔺' },
      { name: 'квадрата', n: 4, emoji: '🟥' },
      { name: 'прямоугольника', n: 4, emoji: '⬜' },
      { name: 'ромба', n: 4, emoji: '🔶' },
      { name: 'пятиугольника', n: 5, emoji: '🟠' },
      { name: 'шестиугольника', n: 6, emoji: '🟡' }
    ];
    const props = ['углов', 'сторон', 'вершин'];
    const p = pick(polys);
    const prop = pick(props);
    return {
      type: 'geometry',
      question: `Сколько ${prop} у ${p.name}?`,
      visual: [p.emoji],
      options: numOptions(p.n, 0, 7),
      correct: p.n
    };
  },
  andromeda_mix: () => {
    const types = ['text_problem_1', 'text_problem_2', 'measurement', 'geometry'];
    return generators[pick(types)]();
  },
  odd_one_out: () => {
    const categories = [
      { items: ['🍎', '', '🍇'], odd: '🚀' },
      { items: ['🐶', '', ''], odd: '' },
      { items: ['🔺', '🟥', ''], odd: '⭕' },
      { items: ['🌞', '☄️', '🌟'], odd: '🍕' },
      { items: ['🎸', '🎹', ''], odd: '🚀' },
      { items: ['🥕', '', ''], odd: '🍰' },
      { items: ['⚽', '', ''], odd: '📘' },
      { items: ['🚗', '', '🚲'], odd: '🌳' },
      { items: ['🐟', '🐬', ''], odd: '🦅' },
      { items: ['❄️', '🌧️', '🌈'], odd: '🍎' }
    ];
    const cat = pick(categories);
    const visual = shuffle([...cat.items, cat.odd]);
    return {
      type: 'odd_one_out',
      question: 'Что лишнее?',
      visual: visual,
      options: visual,
      correct: cat.odd
    };
  },
  pattern: () => {
    const desc = Math.random() < 0.4;
    const step = [2, 3, 4, 5][randInt(0, 3)];
    let seq, next;
    if (!desc) {
      const start = randInt(1, 9);
      seq = [0, 1, 2, 3].map(i => start + i * step);
      next = start + 4 * step;
    } else {
      const start = randInt(25, 45);
      next = start - 4 * step;
      if (next < 0) return generators.pattern();
      seq = [0, 1, 2, 3].map(i => start - i * step);
    }
    return {
      type: 'pattern',
      question: `Продолжи ряд: ${seq.join(', ')}, ...`,
      options: numOptions(next, 0, 60),
      correct: next
    };
  },
  emoji_rebus: () => {
    const k = Math.random() < 0.7 ? 2 : 3;
    const a = randInt(2, 6);
    const sum = a * k;
    const emojis = ['🚀', '', '⭐', '', '💎'];
    const emoji = pick(emojis);
    const left = Array(k).fill(emoji).join(' + ');
    return {
      type: 'emoji_rebus',
      question: `${left} = ${sum}. Чему равен ${emoji}?`,
      options: numOptions(a, 1, 9),
      correct: a
    };
  },
  true_false: () => {
    if (Math.random() < 0.5) {
      const facts = [
        { q: 'Правда ли, что у квадрата 4 угла?', a: 'Да' },
        { q: 'Правда ли, что у треугольника 4 угла?', a: 'Нет' },
        { q: 'Правда ли, что в неделе 7 дней?', a: 'Да' },
        { q: 'Правда ли, что 1 дм = 10 см?', a: 'Да' },
        { q: 'Правда ли, что у круга нет углов?', a: 'Да' },
        { q: 'Правда ли, что 10 − 3 = 6?', a: 'Нет' },
        { q: 'Правда ли, что у прямоугольника 4 стороны?', a: 'Да' },
        { q: 'Правда ли, что 8 + 2 = 12?', a: 'Нет' },
        { q: 'Правда ли, что у пятиугольника 5 углов?', a: 'Да' },
        { q: 'Правда ли, что 1 м = 10 см?', a: 'Нет' }
      ];
      const s = pick(facts);
      return { type: 'true_false', question: s.q, options: ['Да', 'Нет'], correct: s.a };
    }
    const a = randInt(2, 9), b = randInt(1, 9);
    const isTrue = Math.random() < 0.5;
    const c = isTrue ? a + b : a + b + 1;
    return {
      type: 'true_false',
      question: `Правда ли, что ${a} + ${b} = ${c}?`,
      options: ['Да', 'Нет'],
      correct: isTrue ? 'Да' : 'Нет'
    };
  },
  logic_mix_1: () => Math.random() < 0.5 ? generators.odd_one_out() : generators.pattern(),
  trick_question: () => {
    const riddles = [
      { q: 'На дереве сидело 5 птиц. Охотник выстрелил и убил одну. Сколько птиц осталось?', a: 0, opts: [0, 1, 4, 5] },
      { q: 'Что тяжелее: 1 кг пуха или 1 кг железа?', a: 'Одинаково', opts: ['Пух', 'Железо', 'Одинаково', 'Не знаю'] },
      { q: 'У стола 4 угла. Один отпилили. Сколько углов осталось?', a: 5, opts: [3, 4, 5, 6] },
      { q: 'В семье 5 сыновей. У каждого есть сестра. Сколько всего детей?', a: 6, opts: [5, 6, 10, 11] },
      { q: 'Горело 7 свечей. 2 погасили. Сколько свечей осталось?', a: 7, opts: [2, 5, 7, 9] },
      { q: 'Пара лошадей пробежала 10 км. Сколько км пробежала каждая?', a: 10, opts: [5, 10, 20, 40] },
      { q: 'Сколько концов у 3 палок?', a: 6, opts: [3, 6, 9, 12] },
      { q: 'Курица весит 2 кг на одной ноге. Сколько она весит на двух?', a: 2, opts: [1, 2, 4, 8] }
    ];
    const r = pick(riddles);
    return {
      type: 'trick_question',
      question: r.q,
      options: r.opts,
      correct: r.a
    };
  },
  logic_chain: () => {
    const kind = randInt(0, 2);
    if (kind === 0) {
      const animals = shuffle(['Слон', 'Жираф', 'Зебра', 'Медведь', 'Волк']).slice(0, 3);
      return {
        type: 'logic_chain',
        question: `${animals[0]} тяжелее ${animals[1].toLowerCase()}, ${animals[1]} тяжелее ${animals[2].toLowerCase()}. Кто легче всех?`,
        options: [...animals, 'Одинаково'],
        correct: animals[2]
      };
    } else if (kind === 1) {
      const names = shuffle(['Маша', 'Петя', 'Коля', 'Оля', 'Витя', 'Соня']).slice(0, 3);
      return {
        type: 'logic_chain',
        question: `${names[0]} выше ${names[1]}, ${names[1]} выше ${names[2]}. Кто самый низкий?`,
        options: [...names, 'Одинаково'],
        correct: names[2]
      };
    }
    const things = shuffle(['Книга', 'Тетрадь', 'Ручка', 'Рюкзак', 'Пенал']).slice(0, 3);
    return {
      type: 'logic_chain',
      question: `${things[0]} дороже ${things[1].toLowerCase()}, ${things[1]} дороже ${things[2].toLowerCase()}. Что дешевле всего?`,
      options: [...things, 'Одинаково'],
      correct: things[2]
    };
  },
  spatial: () => {
    const puzzles = [
      { q: 'Справа от кота сидит собака. Слева от кота — мышь. Кто сидит между ними?', a: 'Кот', opts: ['Собака', 'Мышь', 'Кот', 'Никто'] },
      { q: 'На полке 3 книги: красная слева от синей, синяя слева от зелёной. Какая книга крайняя справа?', a: 'Зелёная', opts: ['Красная', 'Синяя', 'Зелёная', 'Неизвестно'] },
      { q: 'Красный, синий и жёлтый шары в ряд. Синий не первый, жёлтый не второй, красный не последний. Кто первый?', a: 'Красный', opts: ['Красный', 'Синий', 'Жёлтый', 'Неизвестно'] },
      { q: 'Справа от мамы стоит сын, слева — дочь. Кто стоит между ними?', a: 'Мама', opts: ['Сын', 'Дочь', 'Мама', 'Никто'] },
      { q: 'На полке 3 игрушки: мишка левее зайца, зайчик левее мяча. Какая игрушка крайняя слева?', a: 'Мишка', opts: ['Мишка', 'Зайчик', 'Мяч', 'Неизвестно'] },
      { q: 'Груша, яблоко и слива в ряду. Яблоко не с краю, слива не первая. Что первое?', a: 'Груша', opts: ['Груша', 'Яблоко', 'Слива', 'Неизвестно'] }
    ];
    const p = pick(puzzles);
    return {
      type: 'spatial',
      question: p.q,
      options: p.opts,
      correct: p.a
    };
  },
  riddle: () => {
    const riddles = [
      { q: 'Что можно увидеть с закрытыми глазами?', a: 'Сон', opts: ['Свет', 'Сон', 'Темноту', 'Ничего'] },
      { q: 'Что становится больше, если его поставить вверх ногами?', a: '6', opts: ['9', '6', '8', '0'] },
      { q: 'Когда чёрной кошке легче всего пробраться в дом?', a: 'Когда дверь открыта', opts: ['Ночью', 'Днём', 'Когда дверь открыта', 'Когда все спят'] },
      { q: 'Что идёт, не двигаясь с места?', a: 'Время', opts: ['Вода', 'Время', 'Дорога', 'Часы'] },
      { q: 'Сколько месяцев в году имеют 28 дней?', a: '12', opts: ['1', '6', '12', '0'] },
      { q: 'Чем больше из неё берёшь, тем больше она становится. Что это?', a: 'Яма', opts: ['Яма', 'Мешок', 'Река', 'Гора'] },
      { q: 'Что принадлежит тебе, но пользуются чаще другие?', a: 'Имя', opts: ['Имя', 'Портфель', 'Стул', 'Кот'] }
    ];
    const r = pick(riddles);
    return {
      type: 'riddle',
      question: r.q,
      options: r.opts,
      correct: r.a
    };
  },
  detective_mix: () => {
    const types = ['trick_question', 'logic_chain', 'spatial', 'riddle'];
    return generators[pick(types)]();
  },
  combinatorics: () => {
    const kind = randInt(0, 3);
    let q, correct;
    if (kind === 0) {
      const p = randInt(2, 4), s = randInt(2, 4);
      q = `У Маши ${p} платья и ${s} юбки. Сколько разных нарядов?`; correct = p * s;
    } else if (kind === 1) {
      const a = randInt(2, 5), g = randInt(2, 5);
      q = `На тарелке ${a} яблока и ${g} груши. Сколькими способами выбрать 1 фрукт?`; correct = a + g;
    } else if (kind === 2) {
      const h = randInt(2, 4), s = randInt(2, 4);
      q = `У пирата ${h} шляпы и ${s} сабли. Сколько комбинаций?`; correct = h * s;
    } else {
      const m = randInt(2, 3), n = randInt(2, 3);
      q = `Из A в B ${m} пути, из B в C ${n} пути. Сколькими путями пройти A→C?`; correct = m * n;
    }
    return {
      type: 'combinatorics',
      question: q,
      options: numOptions(correct, 2, 20),
      correct: correct
    };
  },
  number_puzzle: () => {
    const a = randInt(2, 8), b = randInt(2, 8);
    const sum = a + b;
    return {
      type: 'number_puzzle',
      question: `Сумма двух чисел ${sum}, одно из них ${a}. Найди другое.`,
      options: numOptions(b, 1, 15),
      correct: b
    };
  },
  attention: () => {
    const kind = randInt(0, 5);
    let q, correct;
    if (kind === 0) {
      const d = randInt(1, 3), c = randInt(1, 3);
      q = `Сколько лап у ${d} собак и ${c} кошек?`; correct = 4 * (d + c);
    } else if (kind === 1) {
      q = 'В комнате 4 угла, в каждом по кошке, напротив каждой кошки по 3 кошки. Сколько кошек?'; correct = 4;
    } else if (kind === 2) {
      const n = randInt(2, 5);
      q = `Шёл человек в город, навстречу ${n} знакомых. Сколько человек шло в город?`; correct = 1;
    } else if (kind === 3) {
      const s = randInt(2, 4);
      q = `Сколько ножек у ${s} стульев?`; correct = 4 * s;
    } else if (kind === 4) {
      const v = randInt(2, 4);
      q = `Сколько колёс у ${v} двухколёсных велосипедов?`; correct = 2 * v;
    } else {
      const h = randInt(1, 2);
      q = `Сколько пальцев на ${h} руках?`; correct = 5 * h;
    }
    return {
      type: 'attention',
      question: q,
      options: numOptions(correct, 1, 20),
      correct: correct
    };
  },
  space_riddle: () => {
    const kind = randInt(0, 3);
    if (kind === 0) {
      const m = randInt(3, 9);
      return {
        type: 'space_riddle',
        question: `Ракета летит к Марсу ${m} месяцев. Обратно столько же. Сколько месяцев длится полёт?`,
        options: numOptions(m * 2, 4, 20),
        correct: m * 2
      };
    } else if (kind === 1) {
      const buttons = ['красную', 'синюю', 'зелёную', 'жёлтую'];
      const k = randInt(5, 9);
      const ans = buttons[(k - 1) % 4];
      return {
        type: 'space_riddle',
        question: `У робота 4 кнопки: красная, синяя, зелёная, жёлтая. Он нажимает их по кругу. Какую нажмёт ${k}-й раз?`,
        options: buttons,
        correct: ans
      };
    } else if (kind === 2) {
      return {
        type: 'space_riddle',
        question: 'Кратер имеет форму круга. Сколько у него углов?',
        options: numOptions(0, 0, 5),
        correct: 0
      };
    }
    const s = randInt(3, 7), d = randInt(1, 2);
    return {
      type: 'space_riddle',
      question: `У планеты A ${s} спутника, у планеты B на ${d} меньше. Сколько всего спутников?`,
      options: numOptions(s + (s - d), 2, 15),
      correct: s + (s - d)
    };
  },
  circus_mix: () => {
    const types = ['combinatorics', 'number_puzzle', 'attention', 'space_riddle'];
    return generators[pick(types)]();
  },
  logic_smekalka: () => Math.random() < 0.5 ? generators.trick_question() : generators.riddle(),
  number_pattern: () => Math.random() < 0.5 ? generators.pattern() : generators.number_puzzle(),
  space_attention: () => Math.random() < 0.5 ? generators.space_riddle() : generators.attention(),
  final_warmup: () => {
    const types = ['odd_one_out', 'pattern', 'emoji_rebus', 'true_false', 'trick_question', 'logic_chain', 'spatial', 'riddle', 'combinatorics', 'number_puzzle', 'attention', 'space_riddle'];
    return generators[pick(types)]();
  },
  mega_boss: () => {
    const allTypes = [
      'visual_count', 'comparison', 'composition', 'addition', 'subtraction',
      'visual_sequence', 'place_value', 'addition_20', 'subtraction_20', 'mixed_20',
      'difference', 'increase_decrease', 'unknown', 'parity', 'group_count',
      'text_problem_1', 'text_problem_2', 'measurement', 'geometry',
      'odd_one_out', 'pattern', 'emoji_rebus', 'true_false',
      'trick_question', 'logic_chain', 'spatial', 'riddle',
      'combinatorics', 'number_puzzle', 'attention', 'space_riddle'
    ];
    const q = generators[pick(allTypes)]();
    q.isBoss = true;
    return q;
  }
};

const generate = (levelId, type) => {
  const level = LEVELS[levelId - 1];
  const taskType = type || (level ? level.type : 'visual_count');
  const max = level ? level.max : undefined;

  if (generators[taskType]) {
    return generators[taskType](max);
  }
  return generators.visual_count();
};

module.exports = { generate, LEVELS };