# АКАДЕМИЯ ЗВЁЗДНЫХ МАТЕМАТИКОВ — Досье проекта
Образовательная игра для детей 6–10 лет · Node.js + Vanilla JS + Vercel
Обновление: 11.09.2026 · Фазы P1–P7 завершены, старт P10 (воронка продаж по рекомендации куратора)
Рабочее имя: Академия Звёздных Математиков · кодовое имя деплоя: cosmo-quest
Миссия и статус
Академия превращает программу 1–4 класса по математике в космическое путешествие: 40 планет-уровней, 10 сюжетных блоков, финальный МЕГА-экзамен на планете Корония с дипломом 👑. Дети решают задачи, копят звёзды, собирают бейджи, работают над ошибками.
Статус: продакшен-деплой на Vercel, PWA-офлайн, статистика по 37 темам, тренажёр ошибок, серверная генерация задач (античит).
Новый курс P10: переход от «образовательной игрушки» к воронке продаж с лид-формами и CRM по рекомендации куратора Кулешовой Е.А. (высший балл за проект).
Архитектура (сервер + Vercel)
Локальный путь: C:\Users\user\Projects\Academy-stars-math
Репозиторий: AndreyObruch/Academy-stars-math → автодеплой Vercel → cosmo-quest-mu.vercel.app
Academy-stars-math/
├── server/                        Node.js + Express (порт 3000, 0.0.0.0)
│   ├── app.js                     монтирует статику и роуты
│   ├── package.json
│   ├── routes/
│   │   ├── generate.js            GET /api/generate?level=N
│   │   ├── levels.js              GET /api/levels
│   │   └── profile.js             /api/profile/* (in-memory, сброс по рестарту)
│   └── mathEngine.js              серверный генератор задач (античит)
├── index.html                     v4.8.4 — SVG-дуга «МАТЕМАТИКА 1 КЛАСС»
├── script.js                      v4.8.3 — блоки 1–13 + фиксы
├── style.css                      v4.8.4 — дуга, прогресс-бары, btn-mistakes
├── manifest.json                  v2 — PWA, иконки 1024×1024
├── sw.js                          v4.7 — офлайн, stale-while-revalidate
└── backgrounds/                   stars-bg.png, login-bg.jpg, level-1..40.png
НЕ ТРОГАТЬ при фронт-правках: server/app.js, server/routes/*, server/mathEngine.js, server/package.json.
Ключевые endpoint'ы
GET  /api/generate?level=N           генерация задачи (server/mathEngine.js)
GET  /api/levels                     список 40 уровней
GET  /api/profile/{name}             получить профиль (404 → создать)
POST /api/profile/create             создать профиль (body: { name })
PUT  /api/profile/{name}             сохранить прогресс (stars, level, lives...)
Будущие (P11):
POST /api/leads                      форма обратной связи → CRM webhook
GET  /admin                          админ-панель лидов (password-gate)
Фазы разработки
P0   MVP: 40 планет, таймеры, серверная генерация, lives/stars        ✅
P1   Тренажёр ошибок: MistakeTrainer, кнопка в меню, забор 10 задач   ✅ v4.6
P2   PWA: manifest.json + sw.js v4.7, офлайн-кэш картинок             ✅ v4.7
P7   Экран «Прогресс»: stats по 37 темам, бары в кабинете             ✅ v4.8
P3   Фундамент v4.0: IIFE + GAME_CONFIG + JSDoc                       ⏸ до P8
P4   Доступность: ARIA + focus-trap + клавиши 1–4/Enter/Esc           ⏸ после P10
P5   Производительность: ParticleSystem.sleep + prefers-reduced-motion ⏸ после P10
P6   Мини-боссы 5/10/.../35 + 15+ ачивок + магазин скинов             ⏸ после P12
P8   PostgreSQL + JWT + /api/sync + ФЗ-152                            ⏸ после P11
P9   Релиз: i18n RU/EN/KZ + «Звездочёт» + RuStore/AppGallery/TG Mini  ⏸ финальный
P10  Форма обратной связи: модалка в меню → /api/leads                ▶ в работе
P11  CRM-интеграция: Bitrix24/amoCRM webhook + /admin                 ⏸ после P10
P12  Сегментация лендинга: Родители / Инвесторы / Педагоги            ⏸ после P11
P13  Коллаборация «Миллион за теорему»: /million-theorem              ⏸ после P12
Игровой баланс (v4.5 → сохраняется в v4.9)
Общее время уровня:  min(2400, round(300 × 1.08^(n−1)))  сек
Экзамен (ур. 40):    3000 сек
Время на задачу:     min(60, round(15 × 1.08^(n−1)))     сек (ур. 1–20)
                     min(75, round(20 × 1.08^(n−21)))    сек (ур. 21–39)
                     45 сек (экзамен)
Цель уровня:         20 задач (экзамен: 40)
Справочник:          смена определения каждые 16 сек (CHANGE_INTERVAL)
История вопросов:    MAX_HISTORY = 45
Очередь ошибок:      MAX_QUEUE = 50 (MistakeTrainer)
Бонусы: +20 ⭐ идеальная серия · +30 ⭐ «Реакция пилота» (<60 сек) · ×2 МЕГА-экзамен.
Заставка и визуальные акценты (v4.8.4)
Интро-сплэш (14 сек):
Строка 1 «Академия Звёздных Математиков» — золотое пламя (gold-flame-text)
Строка 2 «Приветствует тебя» — ярко-золотой (rich-gold-text)
Строка 3 «Юный Пилот» — ярко-синий (vivid-blue-text)
Экран логина:
3 алые вспышки: «Впиши его в скрижали» → «Галактической» → «Истории» (crimson, #ff2400)
Титул: «Академия Звёздных Математиков» (Comfortaa, #FF6B9D)
SVG-дуга «✨ МАТЕМАТИКА 1 КЛАСС ✨» — textPath Comfortaa 27px, #a8d8ff, выгнута вверх, пульсирует
Игровые акценты:
Уровни 5/10/.../35 — мини-боссы (красно-золотая подсветка)
Уровень 40 — МЕГА-экзамен (boss-level: золото + пульсация таймера)
Тренажёр ошибок — фиолетовая кнопка #8e2de2 → #4a00e0
Прогресс-бары тем — градиент accent-primary → success
Зарегистрированные баги и фиксы (v4.8.1–v4.8.4)
v4.8.1  Сервер шлёт visual: [] — поле задачи пустое            → фоллбэк-ряд ⭐ по correct
v4.8.2  Сервер шлёт visual: ["","",""...]                      → filter(v => String(v).trim() !== '') + фоллбэк
v4.8.3  #results-bonuses с .hidden не показывался (!important) → classList.remove('hidden') вместо style.display
v4.8.4  Надпись «МАТЕМАТИКА 1 КЛАСС» прямолинейная             → SVG textPath дуга + Comfortaa + ✨
Важно для отладки: перед проверкой фиксов в F12 → Network галочка Offline должна быть СНЯТА (иначе SW отдаёт старую версию). После замены файла — Ctrl+Shift+R два раза.
ФАЗА 10 — ВОРОНКА ПРОДАЖ (план)
Триггер: отзыв куратора Кулешовой Е.А. (высший балл): формы лидов, CRM, редактура текстов под сегменты, коллаборация «Миллион за теорему».
Шаг 1  Кнопка «Связаться» в меню + модалка формы (имя/email/телефон/вопрос)
Шаг 2  Backend /api/leads → SQLite + письмо админу
Шаг 3  CRM webhook (Bitrix24/amoCRM) в /api/leads
Шаг 4  /admin с password-gate и таблицей лидов
Шаг 5  Переключатель аудиторий на логине: Родители / Инвесторы / Педагоги
Шаг 6  /million-theorem — лендинг коллаборации
Открытые вопросы: партнёр по книге не установлен; CRM не выбрана; лиды — ФЗ-152 (согласие на ПДн).
Развёртывание и рабочие команды
Локально:
cd server && npm install && node app.js        → http://localhost:3000
Деплой: Push в main → Vercel автодеплой (~30 сек) → cosmo-quest-mu.vercel.app
Рабочий цикл (GitHub Desktop):
1. Заменить файл → сохранить
2. Changes: отметить изменённые файлы
3. Summary: «Компонент: описание»
4. Commit to main
5. Push origin
6. Браузер: Ctrl+Shift+R × 2
Проверка офлайн (P2): F12 → Application → Service Workers → «activated»; Offline-тест: Network → Offline → Ctrl+Shift+R → сайт открыт из кэша.
Контрольные точки файлов (v4.9)
script.js (v4.8.3):
STORAGE_KEY: 'cosmoQuestData_v3'
MistakeTrainer.STORAGE_KEY: 'cosmoQuestMistakes_v1'
MAX_QUEUE: 50 · MAX_HISTORY: 45
TOPIC_NAMES: 37 тем (visual_count → mega_boss)
Math.pow(1.08, levelId - 1)
visualData.filter(v => v !== null && v !== undefined && String(v).trim() !== '')
resBonuses.classList.remove('hidden')
index.html (v4.8.4):
<svg class="subtitle-arc" viewBox="0 0 420 80">
  <defs><path id="subtitle-arc-path" d="M 15 68 Q 210 8 405 68"/></defs>
  <text><textPath href="#subtitle-arc-path" startOffset="50%" text-anchor="middle">✨ МАТЕМАТИКА 1 КЛАСС ✨</textPath></text>
</svg>
style.css (v4.8.4):
.subtitle-arc text { fill: #a8d8ff; font-family: 'Comfortaa', cursive; font-size: 27px; letter-spacing: 2px; }
.btn-mistakes { background: linear-gradient(135deg, #8e2de2, #4a00e0); }
sw.js (v4.7):
CACHE_NAME = 'cosmo-quest-v4.7'
PRECACHE_URLS = ['/', '/index.html', '/style.css', '/script.js', '/manifest.json',
'/backgrounds/stars-bg.png', '/backgrounds/login-bg.jpg', '/backgrounds/level-1.png']
Старт в новом чате
«Продолжаем „Академию Звёздных Математиков v4.9". Вставляю досье v4.9 + файлы index.html, script.js, style.css, manifest.json, sw.js. Правила: целые файлы на замену с указанием пути; одна команда за ответ; коммит после каждой замены; Offline в F12 снят; Ctrl+Shift+R два раза после деплоя. Задача: <одна задача из плана Фазы 10>.»
Академия обучает играя, но не заменяет учителя. Решение о занятиях — за родителем.
Конец досье v4.9 · Академия Звёздных Математиков · 11.09.2026 · 🏆 Высший балл куратора Кулешовой Е.А.