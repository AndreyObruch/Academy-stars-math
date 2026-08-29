/**
АКАДЕМИЯ ЗВЁЗДНЫХ МАТЕМАТИКОВ v5.0
Серверная генерация задач + синхронизация профилей
+ v5.0 (1.2): визуализация ответов (иконки на кнопках)
*/
const API_BASE = window.location.origin;

// ============================================================================
// БЛОК 1: УПРАВЛЕНИЕ СОСТОЯНИЕМ (StateManager)
// ============================================================================
const StateManager = {
  STORAGE_KEY: 'cosmoQuestData_v3',
  loadData() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : {
      players: {},
      currentPlayer: null,
      selectedGrade: 1
    };
  },
  saveData(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },
  getPlayer(name) {
    const data = this.loadData();
    if (!data.players[name]) {
      data.players[name] = {
        name: name,
        stars: 0,
        streakDays: 0,
        lastLoginDate: null,
        dailyBonusClaimed: false,
        badges: [],
        highScores: [],
        lives: 3,
        lastLifeResetDate: null,
        currentLevel: 1,
        unlockedLevels: [1],
        selectedGrade: 1,
        examPassed: false,
        diploma: false,
        lastCompletedLevel: 0,
        dailyRetries: 3,
        lastRetryResetDate: null,
        dailyStreakBonus: 0,
        bestScores: {}
      };
      this.saveData(data);
    }
    return data.players[name];
  },
  setCurrentPlayer(name) {
    const data = this.loadData();
    data.currentPlayer = name;
    this.saveData(data);
  },
  setSelectedGrade(grade) {
    const data = this.loadData();
    data.selectedGrade = grade;
    if (data.currentPlayer && data.players[data.currentPlayer]) {
      data.players[data.currentPlayer].selectedGrade = grade;
    }
    this.saveData(data);
  },
  getSelectedGrade() {
    return this.loadData().selectedGrade || 1;
  },
  updatePlayer(name, updates) {
    const data = this.loadData();
    data.players[name] = { ...data.players[name], ...updates };
    this.saveData(data);
    return data.players[name];
  },
  getAllPlayers() {
    return this.loadData().players;
  },
  resetAll() {
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem('cosmoQuestSettings');
  }
};

// ============================================================================
// БЛОК 2: НАСТРОЙКИ (SettingsManager)
// ============================================================================
const SettingsManager = {
  SETTINGS_KEY: 'cosmoQuestSettings',
  load() {
    const data = localStorage.getItem(this.SETTINGS_KEY);
    return data ? JSON.parse(data) : { soundEnabled: true, storiesEnabled: true };
  },
  save(settings) {
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
  },
  isSoundEnabled() {
    return this.load().soundEnabled;
  },
  setSoundEnabled(enabled) {
    const settings = this.load();
    settings.soundEnabled = enabled;
    this.save(settings);
  }
};

// ============================================================================
// БЛОК 3: АУДИО (AudioManager)
// ============================================================================
const AudioManager = {
  audioCtx: null,
  init() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  },
  playCorrect() {
    if (!SettingsManager.isSoundEnabled() || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0.3, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.2);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.2);
    });
  },
  playWrong() {
    if (!SettingsManager.isSoundEnabled() || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.3);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  },
  playVictory() {
    if (!SettingsManager.isSoundEnabled() || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.15);
      gain.gain.setValueAtTime(0.3, now + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.15 + 0.3);
      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 0.3);
    });
  },
  playBossVictory() {
    if (!SettingsManager.isSoundEnabled() || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98].forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.12);
      gain.gain.setValueAtTime(0.4, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.4);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.4);
    });
  },
  playLifeLost() {
    if (!SettingsManager.isSoundEnabled() || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(150, now + 0.5);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.start(now);
    osc.stop(now + 0.5);
  },
  playClick() {
    if (!SettingsManager.isSoundEnabled() || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    osc.connect(gain);
    gain.connect(this.audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    osc.start(now);
    osc.stop(now + 0.05);
  },
  playLevelUp() {
    if (!SettingsManager.isSoundEnabled() || !this.audioCtx) return;
    const now = this.audioCtx.currentTime;
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0.3, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.25);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.25);
    });
  }
};

// ============================================================================
// БЛОК 4: СИСТЕМА ЧАСТИЦ (ParticleSystem)
// ============================================================================
const ParticleSystem = {
  canvas: null,
  ctx: null,
  particles: [],
  animationId: null,
  init() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  },
  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  },
  spawnCorrectParticles(x, y, isBoss = false) {
    const colors = isBoss
      ? ['#FFD700', '#FFA500', '#FF6347', '#FFEB3B', '#FF4500']
      : ['#FFD700', '#FFA500', '#FF6347', '#FFEB3B'];
    const count = isBoss ? 25 : 15;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: x, y: y,
        vx: (Math.random() - 0.5) * (isBoss ? 12 : 8),
        vy: (Math.random() - 0.5) * (isBoss ? 12 : 8) - 3,
        life: 1, decay: 0.02,
        size: Math.random() * (isBoss ? 6 : 4) + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: 'spark'
      });
    }
  },
  spawnVictoryConfetti(isBoss = false) {
    const colors = isBoss
      ? ['#FFD700', '#FFA500', '#FF6347', '#FFEB3B', '#FF4500', '#FF1493', '#00CED1']
      : ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height / 3;
    const count = isBoss ? 150 : 80;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const speed = Math.random() * (isBoss ? 15 : 10) + 5;
      this.particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 5,
        life: 1,
        decay: isBoss ? 0.005 : 0.008,
        size: Math.random() * (isBoss ? 8 : 6) + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: 'confetti',
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2
      });
    }
    if (isBoss) {
      for (let i = 0; i < 50; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: -20,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 3 + 2,
          life: 1, decay: 0.003,
          size: Math.random() * 4 + 2,
          color: '#FFD700',
          type: 'spark'
        });
      }
    }
  },
  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles = this.particles.filter(p => p.life > 0);
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2;
      p.life -= p.decay;
      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;
      if (p.type === 'confetti') {
        p.rotation += p.rotationSpeed;
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    });
    this.animationId = requestAnimationFrame(() => this.animate());
  }
};

// ============================================================================
// БЛОК 5: КИНЕМАТОГРАФИЧНЫЕ ПЕРЕХОДЫ (PlanetIntro)
// ============================================================================
const PlanetIntro = {
  overlay: null,
  img: null,
  txt: null,
  ensure() {
    if (this.overlay) return;
    this.overlay = document.createElement('div');
    this.overlay.className = 'planet-intro hidden';
    this.img = document.createElement('div');
    this.img.className = 'planet-intro-image';
    this.txt = document.createElement('div');
    this.txt.className = 'planet-intro-text';
    this.overlay.appendChild(this.img);
    this.overlay.appendChild(this.txt);
    document.body.appendChild(this.overlay);
  },
  show(levelId, htmlText, holdMs, onDone) {
    this.ensure();
    this.img.classList.remove('visible');
    this.txt.classList.remove('visible');
    this.img.style.backgroundImage = `url('backgrounds/level-${levelId}.png')`;
    this.txt.innerHTML = htmlText;
    this.overlay.classList.remove('hidden');
    setTimeout(() => this.img.classList.add('visible'), 150);
    setTimeout(() => this.txt.classList.add('visible'), 900);
    setTimeout(() => this.txt.classList.remove('visible'), 900 + holdMs);
    setTimeout(() => {
      this.overlay.classList.add('hidden');
      setTimeout(() => {
        this.img.classList.remove('visible');
        this.txt.classList.remove('visible');
      }, 1100);
      if (onDone) onDone();
    }, 1900 + holdMs);
  }
};

// ============================================================================
// БЛОК 6: МОТИВАЦИЯ И ПРОГРЕСС (MotivationManager)
// ============================================================================
const MotivationManager = {
  DAILY_BONUS_STARS: 20,
  checkDailyLogin(playerName) {
    const player = StateManager.getPlayer(playerName);
    const today = new Date().toDateString();
    let starsEarned = 0;
    let newBadge = null;
    let streakBonus = 0;
    if (player.lastLoginDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (player.lastLoginDate === yesterday.toDateString()) {
        player.streakDays += 1;
      } else if (player.lastLoginDate !== today) {
        player.streakDays = 1;
      }
      player.lastLoginDate = today;
      player.dailyBonusClaimed = false;
      player.dailyRetries = 3;
      player.lastRetryResetDate = today;
      starsEarned = this.DAILY_BONUS_STARS;
      if (player.streakDays > 0 && player.streakDays % 5 === 0) {
        streakBonus = 50;
      }
      if (player.streakDays === 3 && !player.badges.includes('Настойчивая звезда')) {
        player.badges.push('Настойчивая звезда');
        newBadge = 'Настойчивая звезда';
      } else if (player.streakDays === 7 && !player.badges.includes('Космическая неделя')) {
        player.badges.push('Космическая неделя');
        newBadge = 'Космическая неделя';
      }
      StateManager.updatePlayer(playerName, {
        streakDays: player.streakDays,
        lastLoginDate: player.lastLoginDate,
        dailyBonusClaimed: player.dailyBonusClaimed,
        badges: player.badges,
        dailyRetries: player.dailyRetries,
        lastRetryResetDate: player.lastRetryResetDate,
        dailyStreakBonus: streakBonus
      });
    }
    const sb = player.dailyStreakBonus || 0;
    return {
      hasBonus: !player.dailyBonusClaimed,
      starsEarned: starsEarned + sb,
      streakBonus: sb,
      newBadge: newBadge,
      streak: player.streakDays,
      dailyRetries: player.dailyRetries
    };
  },
  checkAndResetLives(playerName) {
    const player = StateManager.getPlayer(playerName);
    const today = new Date().toDateString();
    if (player.lastLifeResetDate !== today) {
      StateManager.updatePlayer(playerName, {
        lives: 3,
        lastLifeResetDate: today
      });
    }
    return StateManager.getPlayer(playerName).lives;
  },
  claimDailyBonus(playerName) {
    const player = StateManager.getPlayer(playerName);
    if (!player.dailyBonusClaimed) {
      const bonus = player.dailyStreakBonus || 0;
      const updated = StateManager.updatePlayer(playerName, {
        stars: player.stars + this.DAILY_BONUS_STARS + bonus,
        dailyBonusClaimed: true,
        dailyStreakBonus: 0
      });
      return updated.stars;
    }
    return player.stars;
  },
  useRetry(playerName) {
    const player = StateManager.getPlayer(playerName);
    if (player.dailyRetries > 0) {
      const updated = StateManager.updatePlayer(playerName, {
        dailyRetries: player.dailyRetries - 1
      });
      return updated.dailyRetries;
    }
    return 0;
  },
  addScore(playerName, score) {
    const player = StateManager.getPlayer(playerName);
    player.highScores.push({
      score: score,
      date: new Date().toLocaleDateString()
    });
    player.highScores.sort((a, b) => a.score - b.score);
    player.highScores = player.highScores.slice(0, 5);
    StateManager.updatePlayer(playerName, {
      highScores: player.highScores
    });
  },
  updateBestScore(playerName, levelId, timeSpent) {
    const player = StateManager.getPlayer(playerName);
    if (!player.bestScores) player.bestScores = {};
    const currentBest = player.bestScores[levelId];
    if (!currentBest || timeSpent < currentBest) {
      player.bestScores[levelId] = timeSpent;
      StateManager.updatePlayer(playerName, {
        bestScores: player.bestScores
      });
      return true;
    }
    return false;
  },
  getLeaderboard() {
    const players = StateManager.getAllPlayers();
    return Object.values(players)
      .map(p => ({
        name: p.name,
        bestScore: p.highScores.length > 0 ? p.highScores[0].score : 0,
        stars: p.stars || 0,
        badges: p.badges || [],
        lastCompletedLevel: p.lastCompletedLevel || 0
      }))
      .sort((a, b) => b.stars - a.stars);
  }
};

// ============================================================================
// БЛОК 7: ИСТОРИЯ ВОПРОСОВ (QuestionHistory)
// ============================================================================
const QuestionHistory = {
  lastQuestions: [],
  MAX_HISTORY: 25,
  reset() {
    this.lastQuestions = [];
  },
  getQuestionKey(question) {
    if (!question) return null;
    if (question.story) return 'story:' + question.story;
    if (question.question) return 'q:' + question.question;
    return 'type:' + question.type;
  },
  isDuplicate(question) {
    const key = this.getQuestionKey(question);
    if (!key) return false;
    return this.lastQuestions.includes(key);
  },
  add(question) {
    const key = this.getQuestionKey(question);
    if (!key) return;
    this.lastQuestions.push(key);
    if (this.lastQuestions.length > this.MAX_HISTORY) {
      this.lastQuestions.shift();
    }
  }
};

// ============================================================================
// БЛОК 8: ДВИЖОК МАТЕМАТИКИ (MathEngine) — ЛОКАЛЬНЫЙ ФОЛЛБЭК
// ============================================================================
const MathEngine = {
  LEVELS: [
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
  ],
  getAdjustedTime(levelId) {
    return this.LEVELS[levelId - 1].baseTime;
  },
  getPlanet(levelId) {
    return this.LEVELS[levelId - 1].planet;
  },
  getQuestionTime(levelId) {
    if (levelId === 40) return 45;
    if (levelId > 20) return Math.min(60, Math.round(20 * Math.pow(1.03, levelId - 21)));
    return Math.round(15 * Math.pow(1.05, levelId - 1));
  }
};

// ============================================================================
// БЛОК 9: БАНК ОПРЕДЕЛЕНИЙ И АВТОСМЕНА (DefinitionsManager)
// ============================================================================
const DefinitionsManager = {
  BANK: [
    { title: "Число", text: "Число — это понятие, с помощью которого обозначают количество предметов" },
    { title: "Цифра", text: "Цифра — это знак, которым записывают числа. Всего 10 цифр: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9" },
    { title: "Сложение", text: "Сложение (+) — это действие, при котором к одному числу прибавляют другое. Результат называется суммой" },
    { title: "Вычитание", text: "Вычитание (−) — это действие, при котором от одного числа отнимают другое. Результат называется разностью" },
    { title: "Сумма", text: "Сумма — это результат сложения. Например: 3 + 5 = 8, где 8 — сумма" },
    { title: "Разность", text: "Разность — это результат вычитания. Например: 10 − 4 = 6, где 6 — разность" },
    { title: "Больше", text: "Знак > означает 'больше'. Например: 7 > 3 читается 'семь больше трёх'" },
    { title: "Меньше", text: "Знак < означает 'меньше'. Например: 2 < 9 читается 'два меньше девяти'" },
    { title: "Равно", text: "Знак = означает 'равно'. Например: 5 = 5 читается 'пять равно пяти'" },
    { title: "Десяток", text: "Десяток — это 10 единиц. Числа от 11 до 19 состоят из одного десятка и нескольких единиц" },
    { title: "Чётное число", text: "Чётное число — это число, которое делится на 2 без остатка: 2, 4, 6, 8, 10..." },
    { title: "Нечётное число", text: "Нечётное число — это число, которое не делится на 2: 1, 3, 5, 7, 9..." },
    { title: "Геометрическая фигура", text: "Геометрическая фигура — это форма предмета. Треугольник имеет 3 угла, квадрат — 4 равных стороны" },
    { title: "Периметр", text: "Периметр — это сумма длин всех сторон фигуры. Чтобы найти периметр, складывают все стороны" },
    { title: "Сантиметр", text: "Сантиметр (см) — это единица измерения длины. 1 дм = 10 см" },
    { title: "Дециметр", text: "Дециметр (дм) — это единица измерения длины. 1 дм = 10 см" },
    { title: "Килограмм", text: "Килограмм (кг) — это единица измерения массы (веса). 1 кг = 1000 г" },
    { title: "Литр", text: "Литр (л) — это единица измерения объёма жидкости. Например, в бутылке может быть 1 л воды" },
    { title: "Задача", text: "Задача — это математический рассказ с вопросом. У задачи есть условие (что известно) и вопрос (что нужно найти)" },
    { title: "Уравнение", text: "Уравнение — это равенство с неизвестным числом. Например: x + 5 = 10, где x — неизвестное" }
  ],
  currentIndex: 0,
  intervalId: null,
  CHANGE_INTERVAL: 8000,
  init() {
    this.startRotation();
  },
  startRotation() {
    setTimeout(() => {
      this.showNext();
      this.intervalId = setInterval(() => this.showNext(), this.CHANGE_INTERVAL);
    }, 5000);
  },
  showNext() {
    const contentEl = document.getElementById('definitions-content');
    if (!contentEl) return;
    const newItem = document.createElement('div');
    newItem.className = 'definition-item';
    newItem.innerHTML = `<div class="def-title">${this.BANK[this.currentIndex].title}</div><div class="def-text">${this.BANK[this.currentIndex].text}</div>`;
    contentEl.innerHTML = '';
    contentEl.appendChild(newItem);
    this.currentIndex = (this.currentIndex + 1) % this.BANK.length;
  },
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
};

// ============================================================================
// БЛОК 10: ИГРОВОЙ ПРОЦЕСС (GameManager)
// ============================================================================
const GameManager = {
  currentQuestion: null,
  correctCount: 0,
  mistakesCount: 0,
  targetCorrect: 20,
  sessionTimeLeft: 120,
  baseTime: 120,
  questionTimeLeft: 10,
  questionTimeMax: 20,
  sessionTimerInterval: null,
  questionTimerInterval: null,
  isAnswering: false,
  currentLevel: 1,
  startTime: 0,
  isRetry: false,
  isTrainingMode: false,
  startGame(levelId = null, isRetry = false) {
    AudioManager.init();
    QuestionHistory.reset();
    const player = StateManager.getPlayer(UIManager.currentPlayer);
    this.currentLevel = levelId || player.currentLevel;
    this.isRetry = isRetry;
    this.isTrainingMode = false;
    this.baseTime = MathEngine.getAdjustedTime(this.currentLevel);
    this.correctCount = 0;
    this.mistakesCount = 0;
    this.sessionTimeLeft = this.baseTime;
    this.targetCorrect = this.currentLevel === 40 ? 30 : 20;
    this.questionTimeMax = MathEngine.getQuestionTime(this.currentLevel);
    this.isAnswering = false;
    this.startTime = Date.now();
    const targetEl = document.getElementById('target-count');
    if (targetEl) targetEl.textContent = this.targetCorrect;
    UIManager.updateSessionTimer(this.sessionTimeLeft);
    this.startSessionTimer();
    this.loadQuestion();
  },
  startTraining(levelId) {
    AudioManager.init();
    QuestionHistory.reset();
    this.currentLevel = levelId;
    this.isTrainingMode = true;
    this.isRetry = false;
    this.baseTime = MathEngine.getAdjustedTime(this.currentLevel);
    this.correctCount = 0;
    this.mistakesCount = 0;
    this.sessionTimeLeft = this.baseTime;
    this.targetCorrect = this.currentLevel === 40 ? 30 : 20;
    this.questionTimeMax = MathEngine.getQuestionTime(this.currentLevel);
    this.isAnswering = false;
    this.startTime = Date.now();
    const targetEl = document.getElementById('target-count');
    if (targetEl) targetEl.textContent = this.targetCorrect;
    UIManager.updateSessionTimer(this.sessionTimeLeft);
    this.startSessionTimer();
    this.loadQuestion();
  },
  startSessionTimer() {
    clearInterval(this.sessionTimerInterval);
    this.sessionTimerInterval = setInterval(() => {
      this.sessionTimeLeft -= 0.1;
      UIManager.updateSessionTimer(this.sessionTimeLeft);
      if (this.sessionTimeLeft <= 0) {
        clearInterval(this.sessionTimerInterval);
        this.handleSessionTimeout();
      }
    }, 100);
  },
  async loadQuestion(attempt = 1) {
    this.isAnswering = false;
    const questionContainer = document.getElementById('question-container');
    if (questionContainer) {
      const loadingText = attempt === 1
        ? '📡 Устанавливаем связь с базой...<br>Готовим задачу!'
        : `📡 Повторная попытка связи (${attempt}/3)...`;
      questionContainer.innerHTML = `<div class="question-text">${loadingText}</div>`;
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    try {
      const response = await fetch(`${API_BASE}/api/generate?level=${this.currentLevel}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (!data.success || !data.task) throw new Error('Неверный формат ответа сервера');
      this.currentQuestion = data.task;
      this.questionTimeLeft = this.questionTimeMax;
      UIManager.renderQuestion(this.currentQuestion, this.correctCount, this.targetCorrect);
      this.startQuestionTimer();
    } catch (error) {
      console.warn(`Попытка ${attempt} не удалась:`, error);
      if (attempt < 3) {
        const delay = attempt === 1 ? 500 : (attempt === 2 ? 1500 : 3000);
        setTimeout(() => this.loadQuestion(attempt + 1), delay);
      } else {
        if (questionContainer) {
          questionContainer.innerHTML = `<div class="question-text">📡 Связь с космосом временно прервана!<br>Проверь интернет и попробуй снова.</div><button class="game-btn btn-primary" style="margin-top: 16px;" id="btn-retry-network">Попробовать снова 🔄</button>`;
          document.getElementById('btn-retry-network')?.addEventListener('click', () => {
            AudioManager.playClick();
            this.loadQuestion(1);
          });
        }
      }
    }
  },
  startQuestionTimer() {
    clearInterval(this.questionTimerInterval);
    UIManager.updateQuestionTimer(this.questionTimeLeft, this.questionTimeMax);
    this.questionTimerInterval = setInterval(() => {
      this.questionTimeLeft -= 0.1;
      UIManager.updateQuestionTimer(this.questionTimeLeft, this.questionTimeMax);
      if (this.questionTimeLeft <= 0) {
        clearInterval(this.questionTimerInterval);
        this.handleQuestionTimeout();
      }
    }, 100);
  },
  handleAnswer(selectedValue, buttonElement) {
    if (this.isAnswering) return;
    this.isAnswering = true;
    clearInterval(this.questionTimerInterval);
    const isCorrect = String(selectedValue) === String(this.currentQuestion.correct);
    const isBoss = this.currentLevel === 40;
    if (isCorrect) {
      this.correctCount++;
      AudioManager.playCorrect();
      UIManager.showFeedbackIcon(true);
      if (buttonElement && ParticleSystem.canvas) {
        const rect = buttonElement.getBoundingClientRect();
        ParticleSystem.spawnCorrectParticles(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          isBoss
        );
      }
      UIManager.showAnswerResult(true, selectedValue, this.currentQuestion.correct);
      if (this.correctCount >= this.targetCorrect) {
        setTimeout(() => this.endGame(true), 1000);
      } else {
        setTimeout(() => this.loadQuestion(), 1000);
      }
    } else {
      this.mistakesCount++;
      AudioManager.playWrong();
      UIManager.showFeedbackIcon(false);
      UIManager.showAnswerResult(false, selectedValue, this.currentQuestion.correct);
      setTimeout(() => this.loadQuestion(), 1500);
    }
  },
  handleQuestionTimeout() {
    if (this.isAnswering) return;
    this.isAnswering = true;
    this.mistakesCount++;
    AudioManager.playWrong();
    UIManager.showAnswerResult(false, null, this.currentQuestion.correct);
    setTimeout(() => this.loadQuestion(), 1500);
  },
  handleSessionTimeout() {
    clearInterval(this.questionTimerInterval);
    this.endGame(false);
  },
  endGame(success) {
    clearInterval(this.sessionTimerInterval);
    clearInterval(this.questionTimerInterval);
    const player = StateManager.getPlayer(UIManager.currentPlayer);
    const timeSpent = Math.round(this.baseTime - Math.max(0, this.sessionTimeLeft));
    const bonuses = [];
    const isBoss = this.currentLevel === 40;
    if (this.isTrainingMode) {
      AudioManager.playVictory();
      if (success) ParticleSystem.spawnVictoryConfetti(false);
      UIManager.showTrainingResults(success, this.correctCount, this.mistakesCount, timeSpent);
      return;
    }
    if (success) {
      if (isBoss) AudioManager.playBossVictory();
      else AudioManager.playVictory();
      ParticleSystem.spawnVictoryConfetti(isBoss);
      let starsEarned = Math.max(1, this.baseTime - timeSpent);
      if (this.mistakesCount === 0 && this.correctCount === this.targetCorrect) {
        starsEarned += 20;
        bonuses.push('+20 за идеальную серию');
      }
      if (timeSpent < 60) {
        starsEarned += 30;
        bonuses.push('+30 «Реакция пилота»');
      }
      if (isBoss) {
        starsEarned *= 2;
        bonuses.push('×2 за МЕГА-экзамен');
      }
      const newStars = player.stars + starsEarned;
      let unlockedLevels = [...player.unlockedLevels];
      let currentLevel = player.currentLevel;
      let examPassed = player.examPassed || false;
      let diploma = player.diploma || false;
      let lastCompletedLevel = player.lastCompletedLevel || 0;
      if (isBoss) {
        if (!examPassed) {
          examPassed = true;
          diploma = true;
          if (!player.badges.includes('Выпускник 1 курса Академии')) {
            player.badges = [...(player.badges || []), 'Выпускник 1 курса Академии'];
          }
          if (!player.badges.includes('Покоритель 40 миров')) {
            player.badges = [...player.badges, 'Покоритель 40 миров'];
          }
        }
        lastCompletedLevel = 40;
      } else if (this.currentLevel === player.currentLevel && this.currentLevel < 40) {
        if (!unlockedLevels.includes(this.currentLevel + 1)) {
          unlockedLevels.push(this.currentLevel + 1);
          AudioManager.playLevelUp();
        }
        currentLevel = this.currentLevel + 1;
        lastCompletedLevel = Math.max(lastCompletedLevel, this.currentLevel);
      }
      const isNewBest = MotivationManager.updateBestScore(
        UIManager.currentPlayer, this.currentLevel, timeSpent
      );
      if (isNewBest) bonuses.push('🏆 Новый рекорд!');
      StateManager.updatePlayer(UIManager.currentPlayer, {
        stars: newStars,
        unlockedLevels: unlockedLevels,
        currentLevel: currentLevel,
        badges: player.badges,
        examPassed: examPassed,
        diploma: diploma,
        lastCompletedLevel: lastCompletedLevel
      });
      const playerName = UIManager.currentPlayer;
      fetch(`${API_BASE}/api/profile/${playerName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stars: newStars,
          currentLevel: currentLevel,
          unlockedLevels: unlockedLevels,
          lastCompletedLevel: lastCompletedLevel,
          badges: player.badges,
          lives: player.lives
        })
      }).catch(err => console.warn('Не удалось сохранить на сервер:', err));
      MotivationManager.addScore(UIManager.currentPlayer, timeSpent);
      if (isBoss) {
        UIManager.showResults(
          true, this.correctCount, starsEarned, newStars, timeSpent,
          player.lives, bonuses, true, this.isRetry
        );
      } else {
        const updatedPlayer = StateManager.getPlayer(UIManager.currentPlayer);
        const nextLevel = updatedPlayer.currentLevel;
        const advanced = nextLevel === this.currentLevel + 1;
        let msg = `🎉 Поздравляем!<br>Уровень пройден: +${starsEarned} ⭐`;
        if (bonuses.length > 0) msg += '<br>' + bonuses.join('<br>');
        if (advanced) {
          const info = MathEngine.LEVELS[nextLevel - 1];
          msg += `<br><span class="planet-intro-planet">Планета ${info.planet}</span>Уровень ${nextLevel}: ${info.name}`;
        }
        UIManager.showPlanetIntro(nextLevel, msg, 3500, () => {
          UIManager.login(UIManager.currentPlayer);
        });
      }
    } else {
      AudioManager.playLifeLost();
      const newLives = Math.max(0, player.lives - 1);
      StateManager.updatePlayer(UIManager.currentPlayer, { lives: newLives });
      UIManager.showResults(
        false, this.correctCount, 0, player.stars, timeSpent,
        newLives, [], isBoss, this.isRetry
      );
    }
  },
  quitGame() {
    clearInterval(this.sessionTimerInterval);
    clearInterval(this.questionTimerInterval);
    UIManager.login(UIManager.currentPlayer);
  }
};

// ============================================================================
// БЛОК 11: УПРАВЛЕНИЕ ИНТЕРФЕЙСОМ (UIManager)
// ============================================================================
const UIManager = {
  currentPlayer: null,
  selectedGrade: 1,
  init() {
    ParticleSystem.init();
    DefinitionsManager.init();
    this.bindEvents();
    this.playIntroSplash();
  },
  playIntroSplash() {
    const splash = document.getElementById('splash-intro');
    const starsBg = document.getElementById('splash-stars-bg');
    const line1 = document.getElementById('splash-line-1');
    const line2 = document.getElementById('splash-line-2');
    const line3 = document.getElementById('splash-line-3');
    if (!splash || !starsBg || !line1 || !line2 || !line3) {
      this.finishIntro();
      return;
    }
    starsBg.classList.add('animate-in');
    setTimeout(() => { starsBg.classList.add('animate-rotate'); line1.classList.add('animate-in'); }, 800);
    setTimeout(() => { line1.classList.remove('animate-in'); line1.classList.add('animate-out'); }, 6500);
    setTimeout(() => { line2.classList.add('animate-in'); }, 7200);
    setTimeout(() => { line2.classList.remove('animate-in'); line2.classList.add('animate-out'); }, 10000);
    setTimeout(() => { line3.classList.add('animate-in'); }, 10700);
    setTimeout(() => { line3.classList.remove('animate-in'); line3.classList.add('animate-out'); }, 13200);
    setTimeout(() => {
      splash.style.background = 'rgba(0,0,0,0.95)';
      starsBg.style.transition = 'opacity 1s ease';
      starsBg.style.opacity = '0.3';
    }, 13700);
    setTimeout(() => {
      splash.classList.add('hidden');
      this.showLoginScreen();
    }, 14300);
  },
  showLoginScreen() {
    const text1 = document.getElementById('login-text-1');
    const text2a = document.getElementById('login-text-2a');
    const text2c = document.getElementById('login-text-2c');
    const text2d = document.getElementById('login-text-2d');
    const text3 = document.getElementById('login-text-3');
    const content = document.getElementById('login-content');
    [text1, text2a, text2c, text2d, text3].forEach(t => {
      if (t) { t.classList.remove('visible', 'fade-out'); t.style.display = ''; t.style.opacity = ''; }
    });
    if (content) content.classList.add('hidden');
    this.showScreen('screen-login');
    setTimeout(() => { if (text1) text1.classList.add('visible'); }, 600);
    setTimeout(() => { if (text1) text1.classList.add('fade-out'); }, 4400);
    setTimeout(() => {
      if (text1) text1.style.display = 'none';
      if (text2a) text2a.classList.add('visible');
    }, 5900);
    setTimeout(() => { if (text2a) text2a.classList.add('fade-out'); }, 9700);
    setTimeout(() => {
      if (text2a) text2a.style.display = 'none';
      if (text2c) text2c.classList.add('visible');
    }, 11200);
    setTimeout(() => { if (text2c) text2c.classList.add('fade-out'); }, 13500);
    setTimeout(() => {
      if (text2c) text2c.style.display = 'none';
      if (text2d) text2d.classList.add('visible');
    }, 15000);
    setTimeout(() => { if (text2d) text2d.classList.add('fade-out'); }, 17300);
    setTimeout(() => {
      if (text2d) text2d.style.display = 'none';
      if (text3) text3.classList.add('visible');
    }, 18800);
    setTimeout(() => { if (text3) text3.classList.add('fade-out'); }, 22400);
    setTimeout(() => {
      if (text3) text3.style.display = 'none';
      if (content) {
        content.classList.remove('hidden');
        content.style.opacity = '0';
        requestAnimationFrame(() => { content.style.opacity = '1'; });
        this.renderPlayerList();
      }
      setTimeout(() => {
        this.renderMenuLeaderboard();
        const lb = document.getElementById('leaderboard-side');
        const def = document.getElementById('definitions-side');
        const isMobile = window.innerWidth < 900;
        if (lb) {
          if (isMobile) lb.classList.add('hidden');
          else lb.classList.remove('hidden');
        }
        if (def) {
          if (isMobile) def.classList.add('hidden');
          else def.classList.remove('hidden');
        }
      }, 900);
    }, 23600);
  },
  finishIntro() {
    const data = StateManager.loadData();
    if (data.currentPlayer && StateManager.getPlayer(data.currentPlayer)) {
      this.login(data.currentPlayer);
    } else {
      this.showScreen('screen-login');
      this.renderPlayerList();
    }
  },
  showPlanetIntro(levelId, htmlText, holdMs, onDone) {
    this.updatePlanetBackground(levelId);
    PlanetIntro.show(levelId, htmlText, holdMs, onDone);
  },
  updatePlanetBackground(levelId) {
    const bgEl = document.getElementById('planet-bg-image');
    if (!bgEl) return;
    const imagePath = `backgrounds/level-${levelId}.png`;
    const img = new Image();
    img.onload = () => {
      bgEl.style.opacity = '0';
      setTimeout(() => {
        bgEl.style.backgroundImage = `url('${imagePath}')`;
        bgEl.style.opacity = '1';
      }, 300);
    };
    img.onerror = () => console.warn(`Фон не загружен: ${imagePath}`);
    img.src = imagePath;
  },
  showScreen(screenId) {
    document.querySelectorAll('.screen, #screen-login').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.modal-overlay').forEach(el => el.classList.add('hidden'));
    const screen = document.getElementById(screenId);
    if (screen) screen.classList.remove('hidden');
    const leaderboard = document.getElementById('leaderboard-side');
    const definitions = document.getElementById('definitions-side');
    const isMobile = window.innerWidth < 900;
    if (screenId === 'screen-menu' || screenId === 'screen-game') {
      if (leaderboard) {
        if (isMobile) leaderboard.classList.add('hidden');
        else leaderboard.classList.remove('hidden');
      }
      if (definitions) {
        if (isMobile) definitions.classList.add('hidden');
        else definitions.classList.remove('hidden');
      }
    } else {
      if (leaderboard) leaderboard.classList.add('hidden');
      if (definitions) definitions.classList.add('hidden');
    }
  },
  renderPlayerList() {
    const listEl = document.getElementById('players-list');
    if (!listEl) return;
    const players = StateManager.getAllPlayers();
    listEl.innerHTML = '';
    Object.values(players).forEach(player => {
      const card = document.createElement('div');
      card.className = 'player-card';
      card.innerHTML = `<span class="name">${player.name}</span><span class="info">⭐ ${player.stars} | ❤️ ${player.lives} | 🔥 ${player.streakDays} дн. | 📊 Ур.${player.lastCompletedLevel || 0}</span>`;
      card.addEventListener('click', () => {
        AudioManager.init();
        this.login(player.name, true);
      });
      listEl.appendChild(card);
    });
  },
  renderMenuLeaderboard() {
    const list = document.getElementById('menu-leaderboard');
    if (!list) return;
    list.innerHTML = '';
    const all = MotivationManager.getLeaderboard().slice(0, 5);
    if (all.length === 0) {
      list.innerHTML = '<div class="lb-empty">Пока нет пилотов. Стань первым!</div>';
      return;
    }
    const medals = ['🥇', '', '', '4️', '5️⃣'];
    const topClasses = ['top-1', 'top-2', 'top-3', '', ''];
    all.forEach((p, i) => {
      const item = document.createElement('div');
      item.className = `lb-item ${topClasses[i]}`;
      item.innerHTML = `<span>${medals[i]} ${p.name}</span><span>⭐ ${p.stars} | Ур.${p.lastCompletedLevel}</span>`;
      list.appendChild(item);
    });
  },
  login(playerName, withPlanetIntro = false) {
    this.currentPlayer = playerName;
    StateManager.setCurrentPlayer(playerName);
    fetch(`${API_BASE}/api/profile/${playerName}`)
      .then(res => {
        if (res.status === 404) {
          return fetch(`${API_BASE}/api/profile/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: playerName })
          });
        }
        return res;
      })
      .catch(err => console.warn('Не удалось синхронизировать профиль:', err));
    this.selectedGrade = StateManager.getSelectedGrade();
    const motivationData = MotivationManager.checkDailyLogin(playerName);
    const lives = MotivationManager.checkAndResetLives(playerName);
    const player = StateManager.getPlayer(playerName);
    const menuPlayerName = document.getElementById('menu-player-name');
    const menuStars = document.getElementById('menu-stars');
    const menuLives = document.getElementById('menu-lives');
    const menuStreak = document.getElementById('menu-streak');
    const menuRetries = document.getElementById('menu-retries');
    if (menuPlayerName) menuPlayerName.textContent = `Привет, ${player.name}!`;
    if (menuStars) menuStars.textContent = player.stars;
    if (menuLives) menuLives.textContent = lives;
    if (menuStreak) menuStreak.textContent = player.streakDays;
    if (menuRetries) menuRetries.textContent = player.dailyRetries || 0;
    const currentLevelDisplay = document.getElementById('current-level-display');
    if (currentLevelDisplay) {
      const levelInfo = MathEngine.LEVELS[player.currentLevel - 1];
      currentLevelDisplay.textContent = `Планета ${levelInfo.planet} • Уровень ${player.currentLevel}: ${levelInfo.name}`;
    }
    this.updatePlanetBackground(player.currentLevel);
    const playBtn = document.getElementById('btn-play');
    if (playBtn) {
      if (lives <= 0) {
        playBtn.disabled = true;
        playBtn.textContent = 'Нет жизней';
      } else {
        playBtn.disabled = false;
        playBtn.textContent = 'Играть';
      }
    }
    const bonusBanner = document.getElementById('daily-bonus-banner');
    if (bonusBanner) {
      if (motivationData.hasBonus) {
        bonusBanner.classList.remove('hidden');
        bonusBanner.onclick = () => this.showDailyModal(motivationData);
      } else {
        bonusBanner.classList.add('hidden');
      }
    }
    const finish = () => {
      this.renderMenuLeaderboard();
      this.showScreen('screen-menu');
    };
    if (withPlanetIntro) {
      const levelInfo = MathEngine.LEVELS[player.currentLevel - 1];
      PlanetIntro.show(
        player.currentLevel,
        `<span class="planet-intro-planet">Планета ${levelInfo.planet}</span>Уровень ${player.currentLevel}: ${levelInfo.name}`,
        2200, finish
      );
    } else {
      finish();
    }
  },
  showDailyModal(data) {
    const modalStreak = document.getElementById('modal-streak-days');
    const modalStars = document.getElementById('modal-stars-earned');
    const badgeMsg = document.getElementById('modal-badge-msg');
    const modalRetries = document.getElementById('modal-retries-info');
    if (modalStreak) modalStreak.textContent = data.streak;
    if (modalStars) modalStars.textContent = data.starsEarned || 20;
    if (modalRetries) modalRetries.textContent = `Перепрохождений сегодня: ${data.dailyRetries}`;
    if (badgeMsg) {
      let html = '';
      if (data.newBadge) html += `Новый бейдж: ${data.newBadge}!`;
      if (data.streakBonus > 0) {
        html += (html ? '<br>' : '') + `🔥 Серия ${data.streak} дней! Бонус +${data.streakBonus} ⭐`;
      }
      if (html) {
        badgeMsg.innerHTML = html;
        badgeMsg.classList.remove('hidden');
      } else {
        badgeMsg.classList.add('hidden');
      }
    }
    const modal = document.getElementById('modal-daily');
    if (modal) modal.classList.remove('hidden');
  },
  // v5.0 (1.2): иконка для кнопок ответов по типу задачи
  getAnswerIcon(question) {
    switch (question.type) {
      case 'visual_count':
        return (Array.isArray(question.visual) && question.visual[0]) ? question.visual[0] : '⭐';
      case 'composition':
        return '👽';
      case 'measurement': {
        const q = question.question || '';
        if (q.includes('кг')) return '⚖️';
        if (q.includes('см') || q.includes('дм')) return '📏';
        if (q.includes('л')) return '🥛';
        return '📏';
      }
      default:
        return null;
    }
  },
  renderQuestion(question, correctCount, target) {
    const correctCountEl = document.getElementById('correct-count');
    const questionContainer = document.getElementById('question-container');
    const gameLives = document.getElementById('game-lives');
    const gameScreen = document.getElementById('screen-game');
    if (correctCountEl) correctCountEl.textContent = correctCount;
    if (gameScreen) {
      if (GameManager.currentLevel === 40) gameScreen.classList.add('boss-level');
      else gameScreen.classList.remove('boss-level');
    }
    if (questionContainer) {
      questionContainer.innerHTML = '';
      if (question.story) {
        const storyDiv = document.createElement('div');
        storyDiv.className = 'question-story';
        storyDiv.textContent = question.story;
        questionContainer.appendChild(storyDiv);
      }
      const visualData = question.visual || question.visualEmoji;
      if (visualData) {
        const visualDiv = document.createElement('div');
        visualDiv.className = 'question-visual';
        if (Array.isArray(visualData) && visualData.length > 0) {
          visualDiv.textContent = visualData.join(' ');
        } else if (typeof visualData === 'string') {
          const count = question.correct || 5;
          const visualArray = [];
          for (let i = 0; i < count; i++) visualArray.push(visualData);
          visualDiv.textContent = visualArray.join(' ');
        }
        questionContainer.appendChild(visualDiv);
      }
      const questionText = document.createElement('div');
      questionText.className = 'question-text';
      questionText.textContent = question.question;
      questionContainer.appendChild(questionText);
    }
    const player = StateManager.getPlayer(this.currentPlayer);
    if (gameLives) {
      let hearts = '';
      for (let i = 0; i < 3; i++) {
        hearts += i < player.lives ? '❤️' : '🖤';
      }
      gameLives.textContent = hearts;
    }
    const grid = document.getElementById('options-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const answerIcon = this.getAnswerIcon(question);
    question.options.forEach(option => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.dataset.value = String(option);
      if (question.type === 'comparison' || question.type === 'parity' || question.type === 'true_false') {
        btn.classList.add('option-symbol');
      }
      if (answerIcon) {
        btn.classList.add('option-with-icon');
        btn.innerHTML = `<span class="option-value">${option}</span><span class="option-icon">${answerIcon}</span>`;
      } else {
        btn.textContent = option;
      }
      btn.addEventListener('click', (e) => GameManager.handleAnswer(option, e.target));
      grid.appendChild(btn);
    });
    this.showScreen('screen-game');
  },
  updateSessionTimer(timeLeft) {
    const clampedTime = Math.max(0, timeLeft);
    const minutes = Math.floor(clampedTime / 60);
    const seconds = Math.ceil(clampedTime % 60);
    const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    const el = document.getElementById('session-timer');
    if (el) {
      el.textContent = display;
      if (clampedTime <= 20) el.classList.add('danger');
      else el.classList.remove('danger');
    }
  },
  updateQuestionTimer(timeLeft, totalTime) {
    const percent = (timeLeft / totalTime) * 100;
    const timerFill = document.getElementById('timer-fill');
    const timerText = document.getElementById('timer-text');
    if (timerFill) timerFill.style.width = `${percent}%`;
    if (timerText) timerText.textContent = Math.ceil(timeLeft);
  },
  showAnswerResult(isCorrect, selected, correct) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => {
      btn.disabled = true;
      const text = btn.dataset.value !== undefined ? btn.dataset.value : btn.textContent;
      const isCorrectAnswer = (typeof correct === 'number')
        ? parseInt(text, 10) === correct
        : text === String(correct);
      const isSelected = (typeof selected === 'number')
        ? parseInt(text, 10) === selected
        : text === String(selected);
      if (isCorrectAnswer) btn.classList.add('correct');
      else if (isSelected && !isCorrect) btn.classList.add('wrong');
    });
  },
  showFeedbackIcon(isCorrect) {
    const container = document.getElementById('question-container');
    if (!container) return;
    const icon = document.createElement('div');
    icon.className = 'feedback-icon';
    icon.textContent = isCorrect ? '✓' : '✗';
    icon.style.cssText = `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0); font-size: 8rem; font-weight: 900; color: ${isCorrect ? '#96c93d' : '#ff4b2b'}; text-shadow: 0 0 30px ${isCorrect ? 'rgba(150,201,61,0.8)' : 'rgba(255,75,43,0.8)'}; z-index: 100; pointer-events: none;`;
    container.style.position = 'relative';
    container.appendChild(icon);
    setTimeout(() => icon.remove(), 900);
  },
  showResults(success, correct, starsEarned, totalStars, timeSpent, lives, bonuses, isBoss = false, isRetry = false) {
    const resultsTitle = document.getElementById('results-title');
    const resultsMedal = document.getElementById('results-medal');
    const resultsMessage = document.getElementById('results-message');
    const resCorrect = document.getElementById('res-correct');
    const resStars = document.getElementById('res-stars');
    const resTotal = document.getElementById('res-total');
    const resBonuses = document.getElementById('results-bonuses');
    if (success) {
      if (resultsTitle) resultsTitle.textContent = isBoss ? '🎓 МЕГА ЭКЗАМЕН СДАН!' : 'Отлично!';
      if (resultsMedal) resultsMedal.textContent = isBoss ? '🎓' : '🏆';
      if (resultsMessage) resultsMessage.textContent = `Ты уложился в ${timeSpent} секунд!`;
    } else {
      if (resultsTitle) resultsTitle.textContent = 'Время вышло!';
      if (resultsMedal) resultsMedal.textContent = '💔';
      if (resultsMessage) resultsMessage.textContent = `Потеряна 1 жизнь. Осталось: ${lives}`;
    }
    if (resCorrect) resCorrect.textContent = correct;
    if (resStars) resStars.textContent = success ? `+${starsEarned}` : '0';
    if (resTotal) resTotal.textContent = totalStars;
    if (resBonuses) {
      if (bonuses && bonuses.length > 0) {
        resBonuses.innerHTML = '🎁 Бонусы: <br>' + bonuses.join('<br>');
        resBonuses.style.display = 'block';
      } else {
        resBonuses.style.display = 'none';
      }
    }
    const playAgainBtn = document.getElementById('btn-play-again');
    if (playAgainBtn) {
      if (!success && lives <= 0) {
        playAgainBtn.disabled = true;
        playAgainBtn.textContent = 'Нет жизней';
      } else {
        playAgainBtn.disabled = false;
        playAgainBtn.textContent = 'Играть ещё';
      }
    }
    this.showScreen('screen-results');
  },
  showTrainingResults(success, correct, mistakes, timeSpent) {
    const resultsTitle = document.getElementById('results-title');
    const resultsMedal = document.getElementById('results-medal');
    const resultsMessage = document.getElementById('results-message');
    const resCorrect = document.getElementById('res-correct');
    const resStars = document.getElementById('res-stars');
    const resTotal = document.getElementById('res-total');
    const resBonuses = document.getElementById('results-bonuses');
    if (resultsTitle) resultsTitle.textContent = success ? '🎯 ТРЕНИРОВКА ЗАВЕРШЕНА!' : 'Тренировка окончена';
    if (resultsMedal) resultsMedal.textContent = success ? '🌟' : '💪';
    if (resultsMessage) {
      resultsMessage.textContent = success
        ? `Отличная работа! Правильных: ${correct} из ${GameManager.targetCorrect}. Время: ${timeSpent} сек.`
        : `Правильных: ${correct} из ${GameManager.targetCorrect}. Ошибок: ${mistakes}.`;
    }
    if (resCorrect) resCorrect.textContent = correct;
    if (resStars) resStars.textContent = '—';
    if (resTotal) resTotal.textContent = '—';
    if (resBonuses) {
      resBonuses.innerHTML = 'ℹ️ В режиме тренировки звёзды и прогресс не сохраняются. <br>Жизни не тратятся.';
      resBonuses.style.display = 'block';
    }
    const playAgainBtn = document.getElementById('btn-play-again');
    if (playAgainBtn) {
      playAgainBtn.disabled = false;
      playAgainBtn.textContent = 'Ещё раз';
    }
    this.showScreen('screen-results');
  },
  async renderLevelSelector() {
    const player = StateManager.getPlayer(this.currentPlayer);
    const selector = document.getElementById('level-selector');
    if (!selector) return;
    selector.innerHTML = '<div class="question-text">🌌 Загружаем карту галактики...</div>';
    let levels = MathEngine.LEVELS;
    try {
      const response = await fetch(`${API_BASE}/api/levels`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.levels) {
          levels = data.levels;
        }
      }
    } catch (error) {
      console.warn('Не удалось загрузить уровни с сервера, используем локальные данные:', error);
    }
    selector.innerHTML = '';
    levels.forEach(level => {
      const isUnlocked = player.unlockedLevels.includes(level.id);
      const isCurrent = player.currentLevel === level.id;
      const isBoss = level.id === 40;
      const canRetry = player.dailyRetries > 0 && isUnlocked && level.id <= (player.lastCompletedLevel || 0);
      const adjustedTime = level.baseTime || MathEngine.getAdjustedTime(level.id);
      const timeStr = `${Math.floor(adjustedTime / 60)}:${(adjustedTime % 60).toString().padStart(2, '0')}`;
      const item = document.createElement('div');
      item.className = 'level-item';
      if (!isUnlocked) item.classList.add('unpassed');
      if (isCurrent) item.classList.add('active');
      if (isBoss) item.classList.add('boss-level-item');
      let statusIcon = '✓';
      if (!isUnlocked) statusIcon = '🔒';
      else if (isCurrent) statusIcon = '▶';
      if (isBoss && player.examPassed) statusIcon = '👑';
      item.innerHTML = `<span class="level-number">${level.id}</span><span class="level-name">${level.planet} • ${level.name} (${timeStr})</span><span class="level-status">${statusIcon}</span>`;
      item.addEventListener('click', () => {
        if (!isUnlocked) return;
        AudioManager.init();
        AudioManager.playClick();
        if (canRetry && !isCurrent) {
          const retriesLeft = MotivationManager.useRetry(this.currentPlayer);
          if (retriesLeft >= 0) {
            StateManager.updatePlayer(this.currentPlayer, { dailyRetries: retriesLeft });
            GameManager.startGame(level.id, true);
          } else {
            alert('Нет перепрохождений на сегодня!');
          }
        } else {
          StateManager.updatePlayer(this.currentPlayer, { currentLevel: level.id });
          this.renderLevelSelector();
          this.updatePlanetBackground(level.id);
        }
      });
      selector.appendChild(item);
    });
    const activeItem = selector.querySelector('.level-item.active');
    if (activeItem) activeItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },
  renderTrainingLevels() {
    const list = document.getElementById('training-level-list');
    if (!list) return;
    list.innerHTML = '';
    MathEngine.LEVELS.forEach(level => {
      const adjustedTime = MathEngine.getAdjustedTime(level.id);
      const timeStr = `${Math.floor(adjustedTime / 60)}:${(adjustedTime % 60).toString().padStart(2, '0')}`;
      const btn = document.createElement('div');
      btn.className = 'training-level-btn';
      btn.innerHTML = `<span class="level-num">${level.id}</span><span class="level-name">${level.planet}<br>${level.name} ⏱ ${timeStr}</span>`;
      btn.addEventListener('click', () => {
        AudioManager.init();
        AudioManager.playClick();
        const modal = document.getElementById('modal-training');
        if (modal) modal.classList.add('hidden');
        GameManager.startTraining(level.id);
      });
      list.appendChild(btn);
    });
  },
  renderSettings() {
    const soundEnabled = SettingsManager.isSoundEnabled();
    const soundToggle = document.getElementById('sound-toggle');
    if (soundToggle) soundToggle.checked = soundEnabled;
    const resetSection = document.getElementById('reset-section');
    if (resetSection) {
      if (this.currentPlayer === 'Вулкан') resetSection.style.display = 'block';
      else resetSection.style.display = 'none';
    }
    this.renderLevelSelector();
  },
  renderCabinet() {
    const player = StateManager.getPlayer(this.currentPlayer);
    const cabinetPlayerName = document.getElementById('cabinet-player-name');
    const cabStars = document.getElementById('cab-stars');
    const cabStreak = document.getElementById('cab-streak');
    const cabLastLevel = document.getElementById('cab-last-level');
    const cabRetries = document.getElementById('cab-retries');
    if (cabinetPlayerName) cabinetPlayerName.textContent = player.name;
    if (cabStars) cabStars.textContent = player.stars;
    if (cabStreak) cabStreak.textContent = player.streakDays;
    if (cabLastLevel) cabLastLevel.textContent = player.lastCompletedLevel || 0;
    if (cabRetries) cabRetries.textContent = player.dailyRetries || 0;
    const cab = document.getElementById('screen-cabinet');
    let dip = document.getElementById('diploma-box');
    if (dip) dip.remove();
    if (player.diploma || player.examPassed) {
      dip = document.createElement('div');
      dip.id = 'diploma-box';
      dip.className = 'diploma-box';
      dip.innerHTML = `<div class="diploma-title">🎓 ДИПЛОМ 1 КУРСА</div><div class="diploma-text">Академия звёздных математиков<br>Выпускник: <b>${player.name}</b><br>Курс 1 сдан — планета Корония покорена 👑</div>`;
      const lb = cab.querySelector('.settings-section');
      if (lb) cab.insertBefore(dip, lb);
    }
    const lbList = document.getElementById('leaderboard-list');
    if (!lbList) return;
    lbList.innerHTML = '';
    const leaderboard = MotivationManager.getLeaderboard().slice(0, 5);
    if (leaderboard.length === 0) {
      lbList.innerHTML = '<p style="color: #a8d8ff; margin-top: 10px;">Пока нет рекордов. Сыграй первую игру!</p>';
    } else {
      const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
      leaderboard.forEach((entry, index) => {
        const div = document.createElement('div');
        div.className = `lb-item ${index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : ''}`;
        div.innerHTML = `<span>${medals[index]} ${entry.name}</span><span>⭐ ${entry.stars} | Ур.${entry.lastCompletedLevel} | 🏁 ${entry.bestScore} сек</span>`;
        lbList.appendChild(div);
      });
    }
  },
  bindEvents() {
    const btnCreate = document.getElementById('btn-create-player');
    const btnClaimDaily = document.getElementById('btn-claim-daily');
    const btnLogout = document.getElementById('btn-logout');
    const btnPlay = document.getElementById('btn-play');
    const btnTraining = document.getElementById('btn-training');
    const btnCloseTraining = document.getElementById('btn-close-training');
    const btnQuitGame = document.getElementById('btn-quit-game');
    const btnPlayAgain = document.getElementById('btn-play-again');
    const btnBackMenu = document.getElementById('btn-back-menu');
    const btnCabinet = document.getElementById('btn-cabinet');
    const btnBackCabinet = document.getElementById('btn-back-cabinet');
    const btnSettings = document.getElementById('btn-settings');
    const btnBackSettings = document.getElementById('btn-back-settings');
    const soundToggle = document.getElementById('sound-toggle');
    const btnResetProgress = document.getElementById('btn-reset-progress');
    const btnConfirmReset = document.getElementById('btn-confirm-reset');
    const btnCancelReset = document.getElementById('btn-cancel-reset');
    const btnRules = document.getElementById('btn-rules');
    const btnCloseRules = document.getElementById('btn-close-rules');
    const btnLbMobile = document.getElementById('btn-lb-mobile');
    const btnRefMobile = document.getElementById('btn-ref-mobile');
    if (btnCreate) {
      btnCreate.addEventListener('click', () => {
        const input = document.getElementById('new-player-name');
        if (!input) return;
        const name = input.value.trim();
        if (name.length < 2) { alert('Имя должно быть не короче 2 символов!'); return; }
        if (StateManager.getAllPlayers()[name]) { alert('Такое имя уже есть! Выбери его из списка.'); return; }
        input.value = '';
        this.login(name, true);
      });
    }
    if (btnClaimDaily) {
      btnClaimDaily.addEventListener('click', () => {
        const newStars = MotivationManager.claimDailyBonus(this.currentPlayer);
        const menuStars = document.getElementById('menu-stars');
        const dailyBanner = document.getElementById('daily-bonus-banner');
        const modalDaily = document.getElementById('modal-daily');
        if (menuStars) menuStars.textContent = newStars;
        if (dailyBanner) dailyBanner.classList.add('hidden');
        if (modalDaily) modalDaily.classList.add('hidden');
        this.renderMenuLeaderboard();
      });
    }
    if (btnLogout) {
      btnLogout.addEventListener('click', () => {
        this.currentPlayer = null;
        StateManager.setCurrentPlayer(null);
        this.renderPlayerList();
        this.showScreen('screen-login');
      });
    }
    if (btnPlay) btnPlay.addEventListener('click', () => GameManager.startGame());
    if (btnQuitGame) btnQuitGame.addEventListener('click', () => GameManager.quitGame());
    if (btnPlayAgain) btnPlayAgain.addEventListener('click', () => GameManager.startGame());
    if (btnBackMenu) btnBackMenu.addEventListener('click', () => this.login(this.currentPlayer));
    if (btnTraining) {
      btnTraining.addEventListener('click', () => {
        AudioManager.init();
        AudioManager.playClick();
        this.renderTrainingLevels();
        const modal = document.getElementById('modal-training');
        if (modal) modal.classList.remove('hidden');
      });
    }
    if (btnCloseTraining) {
      btnCloseTraining.addEventListener('click', () => {
        AudioManager.init();
        AudioManager.playClick();
        const modal = document.getElementById('modal-training');
        if (modal) modal.classList.add('hidden');
      });
    }
    if (btnRules) {
      btnRules.addEventListener('click', () => {
        AudioManager.init();
        AudioManager.playClick();
        const modal = document.getElementById('modal-rules');
        if (modal) modal.classList.remove('hidden');
      });
    }
    if (btnCloseRules) {
      btnCloseRules.addEventListener('click', () => {
        AudioManager.init();
        AudioManager.playClick();
        const modal = document.getElementById('modal-rules');
        if (modal) modal.classList.add('hidden');
      });
    }
    if (btnLbMobile) {
      btnLbMobile.addEventListener('click', () => {
        AudioManager.init();
        AudioManager.playClick();
        const lb = document.getElementById('leaderboard-side');
        if (lb) {
          lb.classList.toggle('hidden');
          const def = document.getElementById('definitions-side');
          if (def && !def.classList.contains('hidden')) def.classList.add('hidden');
        }
      });
    }
    if (btnRefMobile) {
      btnRefMobile.addEventListener('click', () => {
        AudioManager.init();
        AudioManager.playClick();
        const def = document.getElementById('definitions-side');
        if (def) {
          def.classList.toggle('hidden');
          const lb = document.getElementById('leaderboard-side');
          if (lb && !lb.classList.contains('hidden')) lb.classList.add('hidden');
        }
      });
    }
    if (btnCabinet) {
      btnCabinet.addEventListener('click', () => {
        this.renderCabinet();
        this.showScreen('screen-cabinet');
      });
    }
    if (btnBackCabinet) btnBackCabinet.addEventListener('click', () => this.login(this.currentPlayer));
    if (btnSettings) {
      btnSettings.addEventListener('click', () => {
        this.renderSettings();
        this.showScreen('screen-settings');
      });
    }
    if (btnBackSettings) btnBackSettings.addEventListener('click', () => this.login(this.currentPlayer));
    if (soundToggle) {
      soundToggle.addEventListener('change', (e) => {
        SettingsManager.setSoundEnabled(e.target.checked);
        if (e.target.checked) {
          AudioManager.init();
          AudioManager.playClick();
        }
      });
    }
    let currentGateAnswer = 0;
    let gateTimerInterval = null;
    let gateTimeLeft = 10;
    const startGateTimer = () => {
      gateTimeLeft = 10;
      const fillEl = document.getElementById('gate-timer-fill');
      const textEl = document.getElementById('gate-timer-text');
      if (fillEl) fillEl.style.width = '100%';
      if (textEl) {
        textEl.textContent = '10.0';
        textEl.classList.remove('danger');
      }
      clearInterval(gateTimerInterval);
      gateTimerInterval = setInterval(() => {
        gateTimeLeft -= 0.1;
        if (fillEl) fillEl.style.width = `${Math.max(0, (gateTimeLeft / 10) * 100)}%`;
        if (textEl) {
          textEl.textContent = Math.max(0, gateTimeLeft).toFixed(1);
          if (gateTimeLeft <= 3) textEl.classList.add('danger');
        }
        if (gateTimeLeft <= 0) {
          clearInterval(gateTimerInterval);
          const modal = document.getElementById('modal-reset');
          if (modal) modal.classList.add('hidden');
          AudioManager.playWrong();
        }
      }, 100);
    };
    const openResetModal = () => {
      const a = Math.floor(Math.random() * 40) + 10;
      const b = Math.floor(Math.random() * 40) + 10;
      currentGateAnswer = a + b;
      const qEl = document.getElementById('gate-math-question');
      const inputEl = document.getElementById('gate-math-input');
      const errorEl = document.getElementById('gate-math-error');
      const modal = document.getElementById('modal-reset');
      if (qEl) qEl.textContent = `${a} + ${b} = ?`;
      if (inputEl) { inputEl.value = ''; inputEl.focus(); }
      if (errorEl) errorEl.classList.add('hidden');
      if (modal) modal.classList.remove('hidden');
      startGateTimer();
    };
    const checkResetGate = () => {
      const inputEl = document.getElementById('gate-math-input');
      const errorEl = document.getElementById('gate-math-error');
      if (!inputEl) return;
      const userAnswer = parseInt(inputEl.value);
      if (userAnswer === currentGateAnswer) {
        clearInterval(gateTimerInterval);
        StateManager.resetAll();
        UIManager.currentPlayer = null;
        location.reload();
      } else {
        if (errorEl) errorEl.classList.remove('hidden');
        inputEl.value = '';
        inputEl.focus();
        AudioManager.playWrong();
      }
    };
    if (btnResetProgress) btnResetProgress.addEventListener('click', openResetModal);
    if (btnConfirmReset) btnConfirmReset.addEventListener('click', checkResetGate);
    if (btnCancelReset) {
      btnCancelReset.addEventListener('click', () => {
        clearInterval(gateTimerInterval);
        const modal = document.getElementById('modal-reset');
        if (modal) modal.classList.add('hidden');
      });
    }
    const gateInput = document.getElementById('gate-math-input');
    if (gateInput) {
      gateInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkResetGate();
      });
    }
    window.addEventListener('resize', () => {
      const isMobile = window.innerWidth < 900;
      const leaderboard = document.getElementById('leaderboard-side');
      const definitions = document.getElementById('definitions-side');
      const currentScreen = document.querySelector('.screen:not(.hidden)');
      if (currentScreen && (currentScreen.id === 'screen-menu' || currentScreen.id === 'screen-game')) {
        if (!isMobile) {
          if (leaderboard) leaderboard.classList.remove('hidden');
          if (definitions) definitions.classList.remove('hidden');
        }
      }
    });
  }
};

// ============================================================================
// БЛОК 12: ТОЧКА ВХОДА
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  UIManager.init();
});