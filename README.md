📌 Cal culc

Cal culc — это веб‑приложение для расчёта калорий и работы с продуктами.
Проект состоит из фронтенда на React и бэкенда на Django с базой данных SQLite3.

📋 Содержание

🔧 Установка

🌀 Структура проекта

🚀 Запуск

Фронтенд

Бэкенд (Django)

⚙️ Скрипты и команды

🛠️ Технологии и зависимости

🧪 Тестирование

📦 Лицензия

🤝 Вклад в проект

🔧 Установка

Убедитесь, что у вас установлены:

Node.js 14+ и npm/yarn

Python 3.8+

pip и виртуальное окружение Python

# Клонируем репозиторий
git clone https://github.com/venertsev-1isp21/Cal__culc.git
cd Cal__culc
🧱 Структура проекта
Cal__culc/
├─ backend_proj/          ← Django backend
│   ├─ manage.py
│   ├─ app/               ← Основные приложения Django
│   ├─ requirements.txt
├─ frontend/              ← React frontend
│   ├─ package.json
│   ├─ src/
│   └─ …
├─ README.md
└─ …
🚀 Запуск проекта
🧠 Фронтенд (React)
cd frontend
npm install
npm start

Приложение откроется в браузере: http://localhost:3000.

⚙️ Бэкенд (Django)

Перейти в директорию backend:

cd backend_proj

Создать виртуальное окружение:

python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

Установить зависимости:

pip install -r requirements.txt

Выполнить миграции базы данных:

python manage.py migrate

Создать суперпользователя (для админ‑панели):

python manage.py createsuperuser

Запустить сервер разработки:

python manage.py runserver

Сервер будет доступен по адресу: http://127.0.0.1:8000.

⚙️ Скрипты и команды

Frontend:
figma = https://www.figma.com/design/adpqx2tUEs7C5yqoB1sic1/Untitled?node-id=0-1&t=DoAfkwkHjRMOygEQ-1
Команда	Назначение
npm start	Запустить dev‑сервер
npm run build	Создать production‑сборку
npm test	Запустить тесты

Backend (Django):

Команда	Назначение
python manage.py runserver	Запустить сервер разработки
python manage.py migrate	Применить миграции базы данных
python manage.py createsuperuser	Создать администратора
python manage.py test	Запустить тесты Django
🧰 Технологии

Frontend: React, JavaScript, HTML, CSS
Backend: Django, SQLite3

## Реализованный функционал

На текущем этапе реализованы:

- регистрация пользователя
- авторизация
- получение списка продуктов
- добавление продуктов в дневник питания
- подсчёт калорий
- просмотр истории питания