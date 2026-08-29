const express = require('express');
const router = express.Router();

// Импорт движка (убедись, что файл mathEngine.js существует в папке server/)
const MathEngine = require('../mathEngine');

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

    res.json({ success: true, task });
  } catch (error) {
    console.error('❌ Ошибка в /api/generate:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Внутренняя ошибка сервера при генерации' 
    });
  }
});

module.exports = router;