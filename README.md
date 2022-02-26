## 17 Новое приложение - чат в релаьном времени

По прежнему важное место для тестов 
https://jsbin.com/bopisujaki/edit?html,output
https://docs.mongodb.com/drivers/node/current/usage-examples/find/
https://nodejs.org/dist/latest-v16.x/docs/api/path.html
http://expressjs.com/en/4x/api.html

### 17.2 Creating the Chat App Project
npm i express
npm i nodemon --save-dev
"dev": "nodemon ./src/index.js"

### 17.3 WebSockets
Смысл был в том что вебсокет это аткой протокол что позволяет клеинут стучатсья в сервер и серверу стучаться в клиента

### 17.4 Getting Started with Socket.io
https://socket.io - самая важная докуменатция
npm i socket.io
Потребовался некоторый рефакторинг чтобы сделать явно всё что что express делает тихо, но это необходимо чтобы было место встраивания socket.io

### 17.5 Socket.io Events
Делаем приложение счётчик чтобы научиться событиям и тому как серваер посылает сообщения клиенту
Смысл в том что сервер подписывается ан события от клиента, а клиент ан события от сервера, так и живут
Нюанс в том что для уведомления всех существующих сокетов, событие надо генерировать на io
// server (emit) -> clinet (receive) - countUpdated
// clinet (emit) -> server (receive) - increment

### 17.6 Socket.io Events Challenge
Задача в том чтобы посылать клиенту приветственное сообщение
Задача 2 - рассылать сообщение от одного всем
И вот что странно и забавно, можно добавить форму, но тогда в обработчике кнопки надо будет event.preventDefault(), а можно абойтись полем воода и кнопкой без формы.