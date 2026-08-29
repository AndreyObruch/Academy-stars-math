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
    const emoji = emojis[randInt(0, emojis.length - 1)];
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
    const emojis = ['', '💎', '🚀', '⭐', '👽'];
    const emoji = emojis[randInt(0, emojis.length - 1)];
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
      (a, b) => ({ story: `На станции было ${a} . Прилетело ещё ${b} . Сколько стало?`, answer: a + b }),
      (a, b) => ({ story: `В пещере нашли ${a} 💎. Потеряли ${b} 💎. Сколько осталось ?`, answer: a - b }),
      (a, b) => ({ story: `У инопланетян было ${a} 👽. Прибыло ещё ${b} 👽. Сколько всего ?`, answer: a + b }),
      (a, b) => ({ story: `На орбите ${a} 🪐. Прилетело ещё ${b} 🪐. Сколько всего 🪐?`, answer: a + b })
    ];
    const gen = problems[randInt(0, problems.length - 1)];
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
    const emojis = ['', '💎', '🚀'];
    const emoji = emojis[randInt(0, emojis.length - 1)];
    return {
      type: 'text_problem_2',
      story: `На орбите ${a} ${emoji} красных, а синих на ${b} меньше. Сколько всего ${emoji}?`,
      question: 'Реши задачу',
      options: numOptions(a + (a - b), 3, 20),
      correct: a + (a - b)
    };
  },
  measurement: () => {
    const problems = [
      { q: '1 дм 5 см = ... см', correct: 15 },
      { q: '2 дм = ... см', correct: 20 },
      { q: '1 дм 3 см = ... см', correct: 13 },
      { q: '1 дм 7 см = ... см', correct: 17 },
      { q: '3 дм = ... см', correct: 30 },
      { q: '1 л + 4 л = ... л', correct: 5 },
      { q: '7 кг − 3 кг = ... кг', correct: 4 },
      { q: '2 л + 6 л = ... л', correct: 8 },
      { q: '1 дм 9 см = ... см', correct: 19 }
    ];
    const p = problems[randInt(0, problems.length - 1)];
    return {
      type: 'measurement',
      question: p.q,
      options: numOptions(p.correct, 1, 40),
      correct: p.correct
    };
  },
  geometry: () => {
    const shapes = [
      { emoji: '🔺', q: 'Сколько углов у треугольника?', correct: 3 },
      { emoji: '🟥', q: 'Сколько углов у квадрата?', correct: 4 },
      { emoji: '⬜', q: 'Сколько сторон у прямоугольника?', correct: 4 },
      { emoji: '', q: 'Сколько углов у круга?', correct: 0 },
      { emoji: '🔶', q: 'Сколько углов у ромба?', correct: 4 }
    ];
    const s = shapes[randInt(0, shapes.length - 1)];
    return {
      type: 'geometry',
      question: s.q,
      visual: [s.emoji],
      options: numOptions(s.correct, 0, 6),
      correct: s.correct
    };
  },
  andromeda_mix: () => {
    const types = ['text_problem_1', 'text_problem_2', 'measurement', 'geometry'];
    return generators[types[randInt(0, types.length - 1)]]();
  },
  odd_one_out: () => {
    const categories = [
      { items: ['🍎', '🍊', '🍇'], odd: '🚀' },
      { items: ['🐶', '🐱', '🐭'], odd: '🚀' },
      { items: ['🔺', '🟥', ''], odd: '⚪' },
      { items: ['🌞', '☄️', '🌟'], odd: '🍕' },
      { items: ['🎸', '🎹', '🎻'], odd: '🚀' }
    ];
    const cat = categories[randInt(0, categories.length - 1)];
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
    const patterns = [
      { seq: [2, 4, 6, 8], next: 10 },
      { seq: [10, 8, 6, 4], next: 2 },
      { seq: [5, 10, 15, 20], next: 25 },
      { seq: [1, 3, 5, 7], next: 9 },
      { seq: [3, 6, 9, 12], next: 15 }
    ];
    const p = patterns[randInt(0, patterns.length - 1)];
    return {
      type: 'pattern',
      question: `Продолжи ряд: ${p.seq.join(', ')}, ...`,
      options: numOptions(p.next, 1, 30),
      correct: p.next
    };
  },
  emoji_rebus: () => {
    const a = randInt(2, 5);
    const sum = a * 2;
    const emojis = ['', '🪐', '⭐', '👽'];
    const emoji = emojis[randInt(0, emojis.length - 1)];
    return {
      type: 'emoji_rebus',
      question: `${emoji} + ${emoji} = ${sum}. Чему равен ${emoji}?`,
      options: numOptions(a, 1, 9),
      correct: a
    };
  },
  true_false: () => {
    const statements = [
      { q: 'Правда ли, что у квадрата 4 угла?', a: 'Да' },
      { q: 'Правда ли, что 5 + 5 = 11?', a: 'Нет' },
      { q: 'Правда ли, что в неделе 7 дней?', a: 'Да' },
      { q: 'Правда ли, что 1 дм = 10 см?', a: 'Да' },
      { q: 'Правда ли, что у треугольника 4 угла?', a: 'Нет' }
    ];
    const s = statements[randInt(0, statements.length - 1)];
    return {
      type: 'true_false',
      question: s.q,
      options: ['Да', 'Нет'],
      correct: s.a
    };
  },
  logic_mix_1: () => Math.random() < 0.5 ? generators.odd_one_out() : generators.pattern(),
  trick_question: () => {
    const riddles = [
      { q: 'На дереве сидело 5 птиц. Охотник выстрелил и убил одну. Сколько птиц осталось?', a: 0, opts: [0, 1, 4, 5] },
      { q: 'Что тяжелее: 1 кг пуха или 1 кг железа?', a: 'Одинаково', opts: ['Пух', 'Железо', 'Одинаково', 'Не знаю'] },
      { q: 'У стола 4 угла. Один отпилили. Сколько углов осталось?', a: 5, opts: [3, 4, 5, 6] },
      { q: 'В семье 5 сыновей. У каждого есть сестра. Сколько всего детей?', a: 6, opts: [5, 6, 10, 11] }
    ];
    const r = riddles[randInt(0, riddles.length - 1)];
    return {
      type: 'trick_question',
      question: r.q,
      options: r.opts,
      correct: r.a
    };
  },
  logic_chain: () => {
    const chains = [
      { q: 'Слон тяжелее жирафа, жираф тяжелее зебры. Кто легче всех?', a: 'Зебра', opts: ['Слон', 'Жираф', 'Зебра', 'Одинаково'] },
      { q: 'Маша выше Пети, Петя выше Коли. Кто самый низкий?', a: 'Коля', opts: ['Маша', 'Петя', 'Коля', 'Одинаково'] },
      { q: 'Книга дороже тетради, тетрадь дороже ручки. Что дешевле всего?', a: 'Ручка', opts: ['Книга', 'Тетрадь', 'Ручка', 'Одинаково'] }
    ];
    const c = chains[randInt(0, chains.length - 1)];
    return {
      type: 'logic_chain',
      question: c.q,
      options: c.opts,
      correct: c.a
    };
  },
  spatial: () => {
    const puzzles = [
      { q: 'Справа от кота сидит собака. Слева от кота — мышь. Кто сидит между ними?', a: 'Кот', opts: ['Собака', 'Мышь', 'Кот', 'Никто'] },
      { q: 'На полке 3 книги: красная слева от синей, синяя слева от зелёной. Какая книга крайняя справа?', a: 'Зелёная', opts: ['Красная', 'Синяя', 'Зелёная', 'Неизвестно'] },
      { q: 'Круг, квадрат и треугольник лежат в ряд. Треугольник не первый, круг не последний. Кто первый?', a: 'Квадрат', opts: ['Круг', 'Квадрат', 'Треугольник', 'Неизвестно'] }
    ];
    const p = puzzles[randInt(0, puzzles.length - 1)];
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
      { q: 'Когда чёрной кошке легче всего пробраться в дом?', a: 'Когда дверь открыта', opts: ['Ночью', 'Днём', 'Когда дверь открыта', 'Когда все спят'] }
    ];
    const r = riddles[randInt(0, riddles.length - 1)];
    return {
      type: 'riddle',
      question: r.q,
      options: r.opts,
      correct: r.a
    };
  },
  detective_mix: () => {
    const types = ['trick_question', 'logic_chain', 'spatial', 'riddle'];
    return generators[types[randInt(0, types.length - 1)]]();
  },
  combinatorics: () => {
    const problems = [
      { q: 'У Маши 2 платья и 3 юбки. Сколько разных нарядов?', a: 6, opts: [5, 6, 7, 8] },
      { q: 'На тарелке 3 яблока и 2 груши. Сколькими способами можно выбрать 1 фрукт?', a: 5, opts: [3, 4, 5, 6] },
      { q: 'У пирата 2 шляпы и 2 сабли. Сколько комбинаций?', a: 4, opts: [2, 3, 4, 5] }
    ];
    const p = problems[randInt(0, problems.length - 1)];
    return {
      type: 'combinatorics',
      question: p.q,
      options: p.opts,
      correct: p.a
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
    const problems = [
      { q: 'Сколько лап у 2 собак и 1 кошки?', a: 12, opts: [8, 10, 12, 14] },
      { q: 'В комнате 4 угла, в каждом углу по кошке, напротив каждой кошки по 3 кошки. Сколько кошек?', a: 4, opts: [4, 8, 12, 16] },
      { q: 'Шёл человек в город, навстречу 3 знакомых. Сколько человек шло в город?', a: 1, opts: [1, 3, 4, 5] }
    ];
    const p = problems[randInt(0, problems.length - 1)];
    return {
      type: 'attention',
      question: p.q,
      options: p.opts,
      correct: p.a
    };
  },
  space_riddle: () => {
    const riddles = [
      { q: 'Ракета летит к Марсу 7 месяцев. Обратно она летит столько же. Сколько месяцев длится полёт?', a: 14, opts: [7, 14, 21, 28] },
      { q: 'У робота 4 кнопки: красная, синяя, зелёная, жёлтая. Он нажимает их по кругу. Какую он нажмёт 5-й раз?', a: 'Красную', opts: ['Красную', 'Синюю', 'Зелёную', 'Жёлтую'] },
      { q: 'Кратер имеет форму круга. Сколько у него углов?', a: 0, opts: [0, 1, 3, 4] }
    ];
    const r = riddles[randInt(0, riddles.length - 1)];
    return {
      type: 'space_riddle',
      question: r.q,
      options: r.opts,
      correct: r.a
    };
  },
  circus_mix: () => {
    const types = ['combinatorics', 'number_puzzle', 'attention', 'space_riddle'];
    return generators[types[randInt(0, types.length - 1)]]();
  },
  logic_smekalka: () => Math.random() < 0.5 ? generators.trick_question() : generators.riddle(),
  number_pattern: () => Math.random() < 0.5 ? generators.pattern() : generators.number_puzzle(),
  space_attention: () => Math.random() < 0.5 ? generators.space_riddle() : generators.attention(),
  final_warmup: () => {
    const types = ['odd_one_out', 'pattern', 'emoji_rebus', 'true_false', 'trick_question', 'logic_chain', 'spatial', 'riddle', 'combinatorics', 'number_puzzle', 'attention', 'space_riddle'];
    return generators[types[randInt(0, types.length - 1)]]();
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
    const q = generators[allTypes[randInt(0, allTypes.length - 1)]]();
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