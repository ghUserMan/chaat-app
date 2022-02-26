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
