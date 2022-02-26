const path = require('path')
const http = require('http') // уже используем в  express
const express = require('express')
const socketio = require('socket.io')


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


// server (emit) -> clinet (receive) - countUpdated
// clinet (emit) -> server (receive) - increment

// подписываемся на события
// socket - объект с информацией о новом соединении
io.on('connection', (socket) => {
    console.log('new websocket connection')

    // // указываем какое событие посылается в зад, это наше личное сообщение
    // // всё что после имени события - будет доступно на клиенте
    // socket.emit('countUpdated', count)

    // socket.on('increment', () => {
    //     console.log('Server inc')
    //     count++
    //     // socket.emit('countUpdated', count) // работает только для одного (текущего) соединения
    //     io.emit('countUpdated', count) // для всех соединений (а я думал в список придётся складывать) 
    // })
    
    socket.emit('message', 'Welcome!')

    socket.on('sendMessage', (text) => {
        console.log('from client', text)
        io.emit('message', text)
    })
})

server.listen(port, () => {
    console.log('Server is up on port', port)
})