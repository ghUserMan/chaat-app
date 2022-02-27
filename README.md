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

### 17.7 Broadcasting Events
Когда кто-то подключается необхождимо всех уведомлять
И когда кто-то отключается - тоже уведомлять
Broadcast - отправить всем, кроме текущего.
Интересный вопрос: где хранятся текущие подключения?

### 17.8 Sharing Your Location
Используй  MDN geolocation
```js
navigator.geolocation.getCurrentPosition((position) => {
    console.log(position)
})
```
Чтобы создать ссылку на карты гугль, необходимо собрать такой урл
https://google.com/maps?q=lat,long

### 17.9 Event Acknowledgements
Уведомление отправителя что сообшение было получено
Без этого можно жить
Переадётся последней функцией в `emit`, после чег оможет быть получени в листенере ан сервере, где может быть вызван даже с какими-то аргументами
Хороше подходит для валидации, типа недопустимые слова require('bad-words')

### 17.10 Form and Button States
Пичёсывание UI, очистка полей и блокирование кнопок на время выполнения запроса

### 17.11 Rendering Messages
Красиво показываем сообщенеи на странице, а не в консоли
будем подставлять по шаблону

### 17.12 Rendering Location Messages
Будем делать крависую ссылку местоположения

### 17.13 Working with Time
Вариант былых времён
const now = new Date()
now.toString()
now.getDate() - день месяца
now.getTime() - милисекунды юникс
Сервер будет генерировать, а в браузере фоматировать
https://momentjs.com

### 17.14 Timestamps for Location Messages
Всё что и в 13 уроке, но для местоположения
