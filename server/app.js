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

app.use('/api/generate', generateRouter);
app.use('/api/profile', profileRouter);

// Эндпоинт: список всех уровней
app.get('/api/levels', (req, res) => {
  res.json({ success: true, levels: MathEngine.LEVELS });
});

// Запуск сервера на всех сетевых интерфейсах (для доступа из локальной сети)
const PORT = 3000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log('🚀 Сервер запущен!');
  console.log(`   Локально: http://localhost:${PORT}`);
  console.log(`   В сети:   http://<IP-адрес-компьютера>:${PORT}`);
  console.log('');
  console.log('💡 Чтобы открыть на планшете/телефоне:');
  console.log('   1. Узнай IP компьютера (команда: ipconfig в PowerShell)');
  console.log(`   2. Открой на мобильном: http://<IP>:${PORT}`);
  console.log('   3. Убедись, что устройства в одной Wi-Fi сети');
});