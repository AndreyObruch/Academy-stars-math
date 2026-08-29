const express = require('express');
const router = express.Router();
// Импорт движка (убедись, что файл mathEngine.js существует в папке server/)
const MathEngine = require('../mathEngine');
// v4.2 (Задача 1.1): сюжетный слой поверх математического движка
const StoryEngine = require('../storyEngine');

router.get('/', (req, res) => {
  try {
    // Получаем уровень из запроса, по умолчанию 1
    const level = parseInt(req.query.level) || 1;
    // Генерируем задачу через серверный MathEngine
    const task = MathEngine.generate(level);
    if (!task) {
      return res.status(500).json({
        success: false,
        error: 'Не удалось сгенерировать задачу'
      });
    }
    // v4.2: оборачиваем «сухой» пример в космический сюжет
    const wrapped = StoryEngine.wrap(task);
    res.json({ success: true, task: wrapped });
  } catch (error) {
    console.error('❌ Ошибка в /api/generate:', error.message);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера при генерации'
    });
  }
});

module.exports = router;