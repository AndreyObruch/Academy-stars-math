// Vercel serverless-вход (vercel.json: /api/:path* → /api/index)
// Железное правило v6.1: файл готовый на замену; Express БЕЗ app.listen (serverless не позволяет listen)
const express = require('express');
const MathEngine = require('../server/mathEngine');
const generateRouter = require('../server/routes/generate');
const profileRouter = require('../server/routes/profile');
const leadsRouter = require('../server/routes/leads');

const app = express();
app.use(express.json());

app.use('/api/generate', generateRouter);
app.use('/api/profile', profileRouter);
app.use('/api/leads', leadsRouter);

app.get('/api/levels', (req, res) => {
  res.json({ success: true, levels: MathEngine.LEVELS });
});

module.exports = app;