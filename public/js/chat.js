// так как там выше подключили <script src="/socket.io/socket.io.js"></script>
// то здесь можно вызвать функцию io()
// и эта штука такио ткроет осединение
const socket = io() // сохраняем открытый сокет


// получаем от севрера 
// count доступен ведь мы его пеердаём специально
// socket.on('countUpdated', (count) => {
//     console.log('Count has been updated', count)
// })


// const increment = document.querySelector('#increment')

// increment.addEventListener('click', () => {
//     console.log('Clocked!')
//     socket.emit('increment')
// })

socket.on('message', (message) => {
    console.log('from server', message)
})

// пожно повесить слушателя не на кнопку, а на форму!
// const sendMessage = document.querySelector('#message-form') ну и значение получать чеерз event 
// event.targer.elements.message.value (где  message - имя поля дял ввода)
const sendMessage = document.querySelector('#sendMessage') 

sendMessage.addEventListener('click', (event) => {
    event.preventDefault()
    const text = document.querySelector('#message').value
    socket.emit('sendMessage', text)
})