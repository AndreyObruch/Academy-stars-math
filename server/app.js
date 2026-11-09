const express = require('express');
const path = require('path');
const MathEngine = require('./mathEngine');

const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Раздача фронтенда из корня проекта (родительская папка server/)
app.use(express.static(path.join(__dirname, '..')));

// Подключение маршрутов API
const generateRouter = require('./routes/generate');
const profileRouter = require('./routes/profile');
// ФАЗА 10: приём лидов
const leadsRouter = require('./routes/leads');

app.use('/api/generate', generateRouter);
app.use('/api/profile', profileRouter);
app.use('/api/leads', leadsRouter);

// Эндпоинт: список всех уровней
app.get('/api/levels', (req, res) => {
  res.json({ success: true, levels: MathEngine.LEVELS });
});

// Amvera/Vercel: порт из env PORT; локально по умолчанию 3000
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log('🚀 Сервер запущен!');
  console.log(`   Порт: ${PORT}`);
  console.log(`   Локально: http://localhost:${PORT}`);
});