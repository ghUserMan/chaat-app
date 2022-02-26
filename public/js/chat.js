// так как там выше подключили <script src="/socket.io/socket.io.js"></script>
// то здесь можно вызвать функцию io()
// и эта штука такио ткроет осединение
const socket = io() // сохраняем открытый сокет


// получаем от севрера 
// count доступен ведь мы его пеердаём специально
socket.on('countUpdated', (count) => {
    console.log('Count has been updated', count)
})


const increment = document.querySelector('#increment')

increment.addEventListener('click', () => {
    console.log('Clocked!')
    socket.emit('increment')
})