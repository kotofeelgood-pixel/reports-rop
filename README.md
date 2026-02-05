# Call Analytics

Веб-приложение для аналитики звонков в Bitrix24. Работает как встраиваемое приложение в портале Битрикс24: отображает отчёт по пользователям (таблица, графики, рейтинг) и экран аналитики по часам и датам.

## Возможности

- **Отчёт (главный экран)** — таблица пользователей с метриками звонков, график по длительности/количеству, рейтинг. Настраиваемый период и расположение блоков (столбцами или строками).
- **Аналитика** — графики по часам (исходящие/входящие/пропущенные), по датам, рейтинг. Поддержка тёмной темы.
- **Детализация** — модальное окно со списком звонков по пользователю, привязка к сущностям CRM (контакт, лид, компания).
- **Экспорт** — выгрузка данных в XLSX.

## Стек

- **Vue 3** (Composition API), **TypeScript**, **Vite**
- **Pinia** — состояние (пользователи, настройки отчёта, отделы)
- **Vue Router** — маршруты `/` (отчёт) и `/analytics`
- **Tailwind CSS** — стили
- **ApexCharts** (vue3-apexcharts) — графики
- **Bitrix24** — `@bitrix24/b24jssdk`, `@bitrix24/b24ui-nuxt`; REST: телефония (`voximplant.statistic.get`), CRM (контакты, лиды, компании), пользователи, задачи

## Требования

- **Node.js** `^20.19.0` или `>=22.12.0`

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Режим разработки (с hot-reload)
npm run dev

# Сборка для продакшена
npm run build
# или (то же + type-check)
npm run generate

# Превью собранного приложения
npm run preview
```

## Скрипты

| Команда | Описание |
|--------|----------|
| `npm run dev` | Запуск dev-сервера (Vite) |
| `npm run build` | Проверка типов + сборка |
| `npm run generate` | Сборка (как для деплоя) |
| `npm run preview` | Локальный просмотр собранного билда |
| `npm run type-check` | Проверка TypeScript |
| `npm run lint` | ESLint с автоисправлением |
| `npm run format` | Prettier для `src/` |
| `npm run storybook` | Storybook на порту 3002 |
| `npm run build-storybook` | Сборка Storybook |

## Структура проекта

```
src/
├── api/           # REST Bitrix24: core, user, task, crm, company, calls
├── components/    # UI-компоненты (report, element, notify и др.)
├── composables/   # useB24, useAnalyticsCalls, useDateRange, useChartData и др.
├── router/        # Маршруты: /, /analytics
├── stores/        # Pinia: users, reportSettings, departments
├── tools/         # Утилиты: даты, длительность, звонки
├── views/         # HomeView (отчёт), AnalyticsView
├── App.vue
└── main.ts
```

Приложение загружает звонки через `voximplant.statistic.get` с фильтром по датам; данные по пользователям и CRM подтягиваются через соответствующие методы REST API.

## Деплой

Сборка выкладывается в статику (SPA). В репозитории настроен **GitHub Actions** (`.github/workflows/deploy.yml`):

- Срабатывает при пуше в `main` или по ручному запуску.
- Выполняет `npm run generate` и загружает содержимое `.output/public` на сервер по **SFTP** (lftp).

Необходимые секреты в GitHub:

- `FTP_USER`, `FTP_PASSWORD`, `FTP_SERVER`, `FTP_PORT`

Целевая директория на сервере задаётся в workflow (по умолчанию — путь к каталогу приложения).

## Установка приложения в Bitrix24

В каталоге приложения на сервере должен быть доступен `install.php` (копия лежит в `public/install.php`). Он подключает скрипт Bitrix24 и при необходимости завершает установку приложения в портале.

Приложение рассчитано на запуск внутри iframe Битрикс24 (обращение к REST через JS SDK портала).

## Рекомендации по разработке

- **IDE:** [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (Volar). Vetur отключить.
- **Браузер:** Vue.js DevTools; в Chromium — включить [Custom Object Formatter](http://bit.ly/object-formatters).
- **Типы:** для `.vue` и TypeScript используется `vue-tsc`; в редакторе типы для Vue обеспечивает Volar.

## Документация Bitrix24

- [Телефония — voximplant.statistic.get](https://dev.1c-bitrix.ru/rest_help/telephony/voximplant_statistic_get.php)
- [REST API CRM и др.](https://dev.1c-bitrix.ru/rest_help/)

## Лицензия

Приватный проект.
