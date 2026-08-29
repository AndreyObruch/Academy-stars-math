// ============================================
// VERCEL: серверная точка входа (serverless)
// Тот же Express, что в server/app.js, но БЕЗ app.listen()
// ============================================
const express = require('express');
const MathEngine = require('../server/mathEngine');

const app = express();
app.use(express.json());

// Те же маршруты API, что и на локальном сервере
app.use('/api/generate', require('../server/routes/generate'));
app.use('/api/profile', require('../server/routes/profile'));

app.get('/api/levels', (req, res) => {
  res.json({ success: true, levels: MathEngine.LEVELS });
});

module.exports = app;