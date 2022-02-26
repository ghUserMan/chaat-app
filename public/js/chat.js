// так как там выше подключили <script src="/socket.io/socket.io.js"></script>
// то здесь можно вызвать функцию io()
// и эта штука такио ткроет осединение
const socket = io() // сохраняем открытый сокет

socket.on('message', (message) => {
    console.log('from server', message)
})

const sendMessage = document.querySelector('#message-form') 

sendMessage.addEventListener('submit', (event) => {
    event.preventDefault()
    // const text = document.querySelector('input[name=message]').value
    // а для такого расклада надо тип события с click на submit поменять
    const text = event.target.elements.message.value
    socket.emit('sendMessage', text)
})