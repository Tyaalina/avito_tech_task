# Клиент бесплатных игр

## О проекте

**Клиент бесплатных игр** - веб-приложение, разработанное в качестве тестового задания для программы стажировки Avito для фронтенд-разработчиков. Приложение представляет собой фронтенд-клиент для API FreeToGame, предлагающий платформу для знакомства с различными free-to-play играми. Пользователи могут просматривать список доступных игр, применять фильтры и сортировку, а также получать подробную информацию о каждой игре.

Проект представляет собой реализацию тестового задания, описанного в [этом репозитории](https://github.com/avito-tech/frontend-trainee-assignment-2023).

## Начало работы

### Локальный запуск

Для запуска проекта локально, выполните следующие шаги:

1. Склонируйте репозиторий на свой компьютер, используя команду:

   ```bash
   git clone https://github.com/Tyaalina/avito_tech_task.git
   ```

2. Перейдите в директорию проекта:

   ```bash
   cd avito_tech_task
   ```

3. Установите необходимые зависимости с помощью npm:

   ```bash
   npm install
   ```

4. После установки зависимостей, запустите проект:

   ```bash
   npm start
   ```

Проект будет доступен в веб-браузере.

### Запуск через Docker

Для запуска проекта с использованием Docker, выполните следующие шаги:

1. Если ещё не сделали, склонируйте репозиторий:

   ```bash
   git clone https://github.com/Tyaalina/avito_tech_task.git
   ```

2. Откройте терминал и перейдите в директорию проекта:

   ```bash
   cd avito_tech_task
   ```

3. Запустите проект через Docker Compose:

   ```bash
   docker-compose up --build
   ```

Docker Compose создаст и настроит контейнеры для проекта, и вы сможете открыть его в браузере.

## Зависимости

Проект построен с использованием следующих технологий и библиотек:

- React
- TypeScript
- React Router v6
- Ant Design
- Axios

## Структура проекта

Проект разбит на различные компоненты, страницы и сервисы для повышения удобства сопровождения и модульности.

### Бэкэнд

Проект включает в себя бэкенд Node.js, который служит прокси-сервером для API FreeToGame, позволяя приложению обходить проблемы CORS (Cross-Origin Resource Sharing), возникающие в браузерах на базе Chromium. CORS-ограничения - это средства безопасности, реализованные в браузерах, которые не позволяют веб-страницам делать запросы к домену, отличному от того, который обслуживал веб-страницу.

#### Бэкэнд: Проблема CORS

В процессе разработки данного проекта возникла проблема, связанная с тем, что браузеры на базе Chromium по умолчанию запрещают CORS-запросы, даже если принимающий бэкэнд их разрешает. Для решения этой проблемы, не прибегая к изменению аргументов командной строки браузера или другим обходным путям, было принято решение создать небольшой Node.js-сервис, выполняющий роль прокси.

Этот прокси-сервис работает с двумя основными эндпоинтами: `games` и `game/{id}`. Направляя API-запросы через этот прокси, фронтенд может обойти ограничения CORS и беспрепятственно взаимодействовать с API FreeToGame. Такой подход обеспечивает более контролируемое и эффективное решение по сравнению с изменением настроек браузера.

### Страницы и компоненты

- **`MainPage.tsx`:** На этой странице отображается список доступных игр с возможностью фильтрации и сортировки по платформе, жанру, популярности и дате выхода.
- **`GameCard.tsx`:** Компонент, используемый в MainPage для отображения отдельных карточек игр, включая миниатюру, название и дату выхода.
- **`GameDetails.tsx`:** Эта страница содержит подробную информацию о конкретной игре, включая ее название, миниатюру, описание, издателя, дату выхода, жанр, карусель скриншотов и системные требования.
- **`AppHeader.tsx`:** Многократно используемый компонент, выполняющий роль заголовка приложения, отображающего название и логотип.
- **`LoadingSpinner.tsx`:** Компонент, отображающий спиннер загрузки во время загрузки контента.

## Возможности для совершенствования

Разработка данного проекта велась в сжатые сроки: первоначальная версия была реализована всего за три вечера после полных рабочих дней. Несмотря на временные ограничения, проект призван продемонстрировать фундаментальные навыки фронтенд-разработки, включая React, TypeScript, маршрутизацию и интеграцию API.

Несмотря на то что проект достиг поставленных целей, есть области, которые можно улучшить:

- **Кэширование эскизов и скриншотов:** Реализация механизмов кэширования для хранения эскизов и скриншотов на сервере, что снижает необходимость повторных запросов к исходному серверу.
- **Усовершенствование логики бэкенда:** Для повышения эффективности работы рассмотрите возможность переноса некоторых задач форматирования и логики из фронтенда в бэкенд, например, форматирование дат в русский формат.
- **Сортировка и фильтрация на стороне клиента:** Реализация сортировки и фильтрации на стороне клиента для уменьшения количества вызовов API, повышения производительности и отзывчивости.