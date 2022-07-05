<h1 align="center">Настольные баталии</h1>

[![Typing SVG](https://readme-typing-svg.herokuapp.com/?lines=Добро+пожаловать+в+суперпроект;...по+мотивам+настольной+игры;на+которые+никогда+нет+времени&center=true)](https://git.io/typing-svg)

![GitHub package.json version](https://img.shields.io/github/package-json/v/CoinerLo/desk_game)
![GitHub repo size](https://img.shields.io/github/repo-size/CoinerLo/desk_game)

Многопользовательская онлайн игра по мотивам настольной карточной. 

Проект является монорепозиторием. Регистрация пользователей через сервис firebase.



<h2 align="center">Технологии</h2>

### `сервер`

fastify, @fastify/websocket, firebase-admin

### `клиент`

react, @reduxjs/toolkit, react-use-websocket, tailwindcss

<h2 align="center">Установка</h2>

Для установки небходимо клонировать репозиторий

    git clone https://github.com/CoinerLo/desk_game.git 

Перейти в папку проекта и установить зависимости

    npm install

Так же вам потребуются файлы, с конфигурацией сервиса firebase:
- adminsdk.json
- src/firebaseConfig.js

И в результате можно запускать сервер и клиент соответственно

    npm run server
    npm start

Сервер запустится на http://localhost:8080

Клиент http://localhost:3000

<h2 align="center">Versions history</h2>

## 0.1.0

### Базовая версия реализует:
- сервер и клиент,
- регистрацию и авторизацию напрямую с клиента,
- соединение клиента и сервера по websocket,
- личный кабинет пользователя с возможностью смены имени
- список пользователей онлайн