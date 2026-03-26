# Архитектура проекта

## 📌 Выбранный подход

В проекте используется Feature-Sliced Design (FSD).

### Причины выбора:
- Масштабируемость
- Разделение ответственности
- Удобство поддержки
- Повышение читаемости кода

---

## 📁 Структура проекта


src/
app/ # глобальная конфигурация
features/ # бизнес-фичи
shared/ # переиспользуемый код
pages/ # страницы приложения


---

## 📦 app/

- store/ — Redux store
- router/ — маршруты
- providers/ — глобальные провайдеры

---

## 📦 features/

Каждая фича имеет структуру:


feature/
api/ # запросы к серверу
model/ # бизнес-логика (хуки, store)
ui/ # компоненты
pages/ # страницы


---

## 📦 shared/

- ui/ — общие компоненты
- utils/ — утилиты
- api/ — базовые API функции

---

## 🔗 Правила импортов

- features НЕ должны импортировать друг друга напрямую
- shared можно использовать везде
- app — только верхний уровень

---

## 🧠 Naming conventions

- Компоненты: PascalCase (LoginForm)
- Хуки: camelCase с use (useMeals)
- API: camelCase + Api (fetchMealsApi)
- Redux: sliceNameSlice

---

## 📌 Примеры

### API
```js
export const fetchMealsApi = async () => {}