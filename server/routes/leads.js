// ФАЗА 10: POST /api/leads — приём лид-формы, валидация, дубль в MAX-бот
// Секреты: process.env.MAX_BOT_TOKEN, process.env.MAX_CHAT_ID (Vercel → Settings → Environment Variables)
const express = require('express');
const router = express.Router();

const MAX_TOKEN = process.env.MAX_BOT_TOKEN || '';
const MAX_CHAT_ID = process.env.MAX_CHAT_ID || '';

function isValidContact(contact) {
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRe = /^[\d+()\-\s]{10,20}$/;
return emailRe.test(contact) || phoneRe.test(contact);
}

router.post('/', async (req, res) => {
const body = req.body || {};
const name = String(body.name || '').trim();
const contact = String(body.contact || '').trim();
const grade = String(body.grade || '').trim();
const message = String(body.message || '').trim();
// Серверная валидация — второй рубеж после фронтенда
if (name.length < 2 || !isValidContact(contact) || body.consent !== true) {
return res.status(400).json({ success: false, error: 'validation' });
}
const text = [
'🎓 Новый лид — Академия Звёздных Математиков',
'Имя: ' + name,
'Контакт: ' + contact,
'Класс ребёнка: ' + (grade || '—'),
'Вопрос: ' + (message || '—'),
'Время: ' + new Date().toLocaleString('ru-RU')
].join('\n');
if (!MAX_TOKEN || !MAX_CHAT_ID) {
console.warn('MAX env не задан — лид не доставлен:', text);
return res.json({ success: true, delivered: false });
}
try {
const resp = await fetch('https://api.botapi.max.ru/messages?access_token=' + encodeURIComponent(MAX_TOKEN), {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ chat_id: Number(MAX_CHAT_ID), text: text })
});
if (!resp.ok) throw new Error('MAX HTTP ' + resp.status);
return res.json({ success: true, delivered: true });
} catch (e) {
console.warn('Отправка в MAX не удалась:', e.message);
// 502 → фронтенд положит лид в офлайн-очередь и повторит позже
return res.status(502).json({ success: false, error: 'max_failed' });
}
});

module.exports = router;