const express = require('express');
const router = express.Router();

const profiles = new Map();

// Создание профиля
router.post('/create', (req, res) => {
  const { name } = req.body;
  if (!name || name.length < 2) {
    return res.status(400).json({ success: false, error: 'Имя должно быть не короче 2 символов' });
  }
  if (profiles.has(name)) {
    return res.status(400).json({ success: false, error: 'Такой игрок уже существует' });
  }
  const profile = {
    name,
    stars: 0,
    lives: 3,
    streakDays: 0,
    currentLevel: 1,
    unlockedLevels: [1],
    lastCompletedLevel: 0,
    badges: [],
    bestScores: {},
    dailyRetries: 3,
    createdAt: new Date().toISOString()
  };
  profiles.set(name, profile);
  res.json({ success: true, profile });
});

// Таблица лидеров (конкретный маршрут — ДО параметрического)
router.get('/leaderboard', (req, res) => {
  const all = Array.from(profiles.values())
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 10);
  res.json({ success: true, leaderboard: all });
});

// Получение профиля
router.get('/:name', (req, res) => {
  const profile = profiles.get(req.params.name);
  if (!profile) {
    return res.status(404).json({ success: false, error: 'Игрок не найден' });
  }
  res.json({ success: true, profile });
});

// Обновление профиля с полной валидацией
router.put('/:name', (req, res) => {
  const profile = profiles.get(req.params.name);
  if (!profile) {
    return res.status(404).json({ success: false, error: 'Игрок не найден' });
  }
  const updates = req.body;

  // Валидация: stars (неотрицательное целое)
  if (updates.stars !== undefined) {
    if (!Number.isInteger(updates.stars) || updates.stars < 0) {
      return res.status(400).json({ success: false, error: 'stars должно быть неотрицательным целым числом' });
    }
  }

  // Валидация: lives (0-3)
  if (updates.lives !== undefined) {
    if (!Number.isInteger(updates.lives) || updates.lives < 0 || updates.lives > 3) {
      return res.status(400).json({ success: false, error: 'lives должно быть числом от 0 до 3' });
    }
  }

  // Валидация: currentLevel (1-40)
  if (updates.currentLevel !== undefined) {
    if (!Number.isInteger(updates.currentLevel) || updates.currentLevel < 1 || updates.currentLevel > 40) {
      return res.status(400).json({ success: false, error: 'currentLevel должно быть числом от 1 до 40' });
    }
  }

  // Валидация: unlockedLevels (массив чисел 1-40)
  if (updates.unlockedLevels !== undefined) {
    if (!Array.isArray(updates.unlockedLevels)) {
      return res.status(400).json({ success: false, error: 'unlockedLevels должно быть массивом' });
    }
    const invalidLevel = updates.unlockedLevels.find(l => !Number.isInteger(l) || l < 1 || l > 40);
    if (invalidLevel !== undefined) {
      return res.status(400).json({ success: false, error: 'unlockedLevels содержит невалидный уровень' });
    }
  }

  // Валидация: lastCompletedLevel (0-40)
  if (updates.lastCompletedLevel !== undefined) {
    if (!Number.isInteger(updates.lastCompletedLevel) || updates.lastCompletedLevel < 0 || updates.lastCompletedLevel > 40) {
      return res.status(400).json({ success: false, error: 'lastCompletedLevel должно быть числом от 0 до 40' });
    }
  }

  // Валидация: badges (массив строк)
  if (updates.badges !== undefined) {
    if (!Array.isArray(updates.badges) || updates.badges.some(b => typeof b !== 'string')) {
      return res.status(400).json({ success: false, error: 'badges должно быть массивом строк' });
    }
  }

  // Валидация: dailyRetries (0-10)
  if (updates.dailyRetries !== undefined) {
    if (!Number.isInteger(updates.dailyRetries) || updates.dailyRetries < 0 || updates.dailyRetries > 10) {
      return res.status(400).json({ success: false, error: 'dailyRetries должно быть числом от 0 до 10' });
    }
  }

  // Валидация: streakDays (неотрицательное целое)
  if (updates.streakDays !== undefined) {
    if (!Number.isInteger(updates.streakDays) || updates.streakDays < 0) {
      return res.status(400).json({ success: false, error: 'streakDays должно быть неотрицательным целым числом' });
    }
  }

  // Применяем валидные обновления
  const allowedFields = ['stars', 'lives', 'streakDays', 'currentLevel', 'unlockedLevels', 'lastCompletedLevel', 'badges', 'bestScores', 'dailyRetries'];

  for (const key of allowedFields) {
    if (updates[key] !== undefined) {
      profile[key] = updates[key];
    }
  }

  profiles.set(req.params.name, profile);
  res.json({ success: true, profile });
});

module.exports = router;