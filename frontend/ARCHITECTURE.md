#  Архитектура проекта

Этот документ описывает архитектурные решения и структуру фронтенда приложения Cal__culc после рефакторинга.  

Проект реализован на React с использованием современных библиотек и подходов, таких как:
- **Redux Toolkit** — для глобального состояния
- **React Query (TanStack Query)** — для управления запросами к API
- **Feature‑Sliced Design (FSD)** — для организации кода по функциональным модулям
- **ESLint + Prettier + Husky + lint‑staged** — для качества и единообразия кода

> Feature‑Sliced Design облегчает масштабирование и поддержку, группируя код **по фичам/функциям**, а не по типам файлов (что считается более удобным подходом для средних и крупных приложений):contentReference[oaicite:0]{index=0}

---

##  Обзор структуры папок

```

frontend/
├── public/
├── src/
│   ├── app/
│   │   └── store/
│   │       ├── store.js              # Конфигурация Redux store
│   │       ├── hooks.js              # Типизированные хуки useAppDispatch/useAppSelector
│   │       └── slices/               # Redux slices (ui, auth, meals)
│   ├── assets/                       # Статические ресурсы (картинки)
│   ├── shared/
│   │   └── api/
│   │       └── foodApi.js          
│   │   
│   ├── features/                    # Бизнес‑функциональные фичи
│   │   ├── auth/
│   │   │   ├── api/                 # Запросы к API (auth)
│   │   │   ├── model/
│   │   │   │   └── hooks/           # Хуки (useLogin, useAuth)
│   │   │   ├── ui/                  # UI компоненты (LoginForm, RegisterForm)
│   │   │   └── pages/               # Страницы (LoginPage, RegisterPage)
│   │   └── meals/
│   │       ├── api/                 # API вызовы (fetchMeals, fetchFoods)
│   │       └── model/
│   │           └── hooks/           # Хуки (useMeals)
│   ├── pages/                      # Независимые страницы
│   └── index.js                    # Точка входа
├── .eslintrc.json
├── .prettierrc
├── package.json
└── README.md

```

---

##  Основные принципы организации

###  1. Feature‑Sliced Design

Код разделён по функциональным блокам (features), чтобы:

- Логика, UI и запросы были сгруппированы по назначению
- Минимизировать зависимости между разными частями
- Повысить читаемость и масштабируемость приложения:contentReference[oaicite:1]{index=1}

**Преимущества такого подхода:**
- код проектируется вокруг фич, а не типов файлов
- легче выделить и переиспользовать компоненты
- упрощает работу с Redux и React Query  

---

##  Директории и их назначение

###  app/

Содержит глобальные настройки и инициализацию приложения:

- `store/` — Redux Toolkit store + слайсы

---

###  shared/

Переиспользуемые модули, не привязанные к одной фиче:

- **api/** — базовое API 
- **utils/** — утилиты (например, calculateTotals)

---

###  features/

Основная логика и UI по бизнес‑функциям.

Каждая фича имеет свою структуру:

```

featureName/
├── api/     # коммуникация с сервером
├── model/   # бизнес‑логика, хуки, слайсы
├── ui/      # компоненты UI
└── pages/   # страница/экраны связанные с фичей

```

Например, фича `auth/`:

```

auth/
├── api/
│   └── authApi.js
├── model/
│   └── hooks/
│      └── useLogin.js
├── ui/
│   └── LoginForm.js
├── pages/
└── LoginPage.js

```

---

##  Правила и соглашения

###  Именование

- Компоненты — **PascalCase**
- Хуки — **useCamelCase**
- API функции — camelCase + `Api` suffix
- Слайсы Redux — camelCaseSlice

Правила именования повышают **консистентность** и делают код удобным для чтения.

---

##  State Management

###  Redux Toolkit

Все глобальные состояния хранятся в `app/store/slices/`, и каждый слайс отвечает за свою область:

- `authSlice.js` — аутентификация
- `mealsSlice.js` — данные еды
- `uiSlice.js` — UI‑состояние

Использование **Redux Toolkit** упрощает создание слайсов, экшенов и редьюсеров.

---

##  API уровень

Запросы вынесены в отдельные API модули внутри фич:

```

features/meals/api/mealsApi.js
features/auth/api/authApi.js
