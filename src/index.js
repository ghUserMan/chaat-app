const path = require('path')
const http = require('http') // уже используем в  express
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/messages')


const app = express()
const server = http.createServer(app) // такая магия тоже происходит и без нас, но
const io = socketio(server) // теперь сервер поддержтвает websocket

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.json()) 
app.use(express.static(publicDirectoryPath))

// let count = 0

app.get('/hi', (req, res) => {
    res.send('hi')
})

// server (emit) -> clinet (receive) -acknowledgement -> server countUpdated
// clinet (emit) -> server (receive) -acknowledgement -> client increment

// подписываемся на события
// socket - объект с информацией о новом соединении
io.on('connection', (socket) => {
    console.log('new websocket connection')

    // socket.emit('message', generateMessage('Welcome!')) // себе, новый формат {test: "message", createdAt: new Date().getTime()}
    // socket.broadcast.emit('message', generateMessage('New user joined')) // Остальным что кто-то подключился

    //eventlistener join
    socket.on('join', ({ username, room }) => {
        // магия создания комнат
        socket.join(room)

        socket.emit('message', generateMessage('Welcome!')) // себе, новый формат {test: "message", createdAt: new Date().getTime()}
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined`)) // Остальным что кто-то подключился
    
        // обычно
        // socket.emit io.emit socket.broadcast.emit
        // с комнатами появляюстя
        // io.to.emit -- всем в какой-то комнате
        // socket.broadcast.to.emit -- по аналогии
    })

    //eventlistener
    socket.on('sendMessage', (text, callback) => { //

        const filter = new Filter()
        if (filter.isProfane(text)) {
            return callback('Some word is not allowed') // типа если есть ошибка - сообщаем о ней, иначе ответим пустотой
        }

        console.log('from client', text)
        // будем прокачивать этот метод до io.to('???').emit
        io.emit('message', generateMessage(text)) // всем
        // callback('Yes') // само подтверждение, можно по своему усмотрению епердать аргумент
        callback()
    })

    // два поля вполне передаются, но мастер говорит - объект
    // socket.on('sendLocation', (longitude, latitude) => {
    //     console.log('location from client', longitude, latitude)
    //     socket.broadcast.emit('message', `Location: ${longitude}, ${latitude} `)
    // })
    socket.on('sendLocation', (coords, callback) => {
        // console.log('location from client', coords.longitude, coords.latitude)
        // io.emit('message', `Location: ${coords.longitude}, ${coords.latitude} `)
        const location = `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
        io.emit('locationMessage', generateLocationMessage(location)) // сделали альтернативный тип сообщения // всем
        callback()
    })

    // отключение в таком старнном месте
    socket.on('disconnect', () => {
        // остальным что ушёл
        io.emit('message', generateMessage('user dicsonnected'))// посылаем всем потому что нет смысла исключать текущего, он и так отключился
    })
})

server.listen(port, () => {
    console.log('Server is up on port', port)
})