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

    socket.emit('message', 'Welcome!')

    socket.on('sendMessage', (text) => {
        console.log('from client', text)
        io.emit('message', text)
    })
})

server.listen(port, () => {
    console.log('Server is up on port', port)
})