// так как там выше подключили <script src="/socket.io/socket.io.js"></script>
// то здесь можно вызвать функцию io()
// и эта штука такио ткроет осединение
const socket = io() // сохраняем открытый сокет

// elements
// такое имя по соглашению - то что взято из dom
const $messageForm = document.querySelector('#message-form') 
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')

const $sendLocationButton = document.querySelector('#send-location') 

const $messages = document.querySelector('#messages')

const $sidebar = document.querySelector('#sidebar')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options
const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true})


const autoscroll = () => {
    // new message element
    const $newMessage = $messages.lastElementChild

    // height of the mew message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessgeMargin = parseInt(newMessageStyles.marginBottom)
    // высоат последнего сообщения
    const newMessgeHeight = $newMessage.offsetHeight + newMessgeMargin
    
    // visible height
    const visibleHeight = $messages.offsetHeight

    // height off messages container
    const containerHeight = $messages.scrollHeight

    //how far am i scroled
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessgeHeight <= scrollOffset) {
        // вариант когда мы и так были на самом дне
        $messages.scrollTop = $messages.scrollHeight // не на все 100 работает
    } else { 
        // варинат когда клиент что-то выще ищет
    }
}


// это то сообщение на которое срабатывает браузер
socket.on('message', (message) => {
    console.log('from server message:', message) // внизу короткая форма message: message (можно передавать объект с людыми парами ключ\значение)
    const html = Mustache.render(messageTemplate, {
        username: message.username, 
        message: message.text, 
        createdAt: moment(message.createdAt).format('HH:mm') // разобрался)
    }) // первый агрумент - шаблон, дальше его параметры
    $messages.insertAdjacentHTML('beforeend', html) // первый аргумент говорит о том где расположен вставляемый элемент
    autoscroll()
})

// это то сообщение на которое срабатывает браузер
socket.on('locationMessage', (message) => {
    console.log('from server locationMessage:', message) 
    // теперь суём сюда другой шаблон
    const html = Mustache.render(locationMessageTemplate, {
        username: message.username,
        url: message.url, 
        createdAt: moment(message.createdAt).format('HH:mm')
    }) // первый агрумент - шаблон, дальше его параметры
    $messages.insertAdjacentHTML('beforeend', html) // первый аргумент говорит о том где расположен вставляемый элемент
    autoscroll()
})

// это то сообщение на которое срабатывает браузер
socket.on('roomData', ({room, users}) => {
    console.log('room:', room) 
    console.log('users:', users) 
    // jnhbcjdrf b dcnfdrf
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    $sidebar.innerHTML = html
})

// const sendMessage = document.querySelector('#message-form') 
$messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
    // disable form button
    $messageFormButton.setAttribute('disabled', 'disabled')
    // const text = document.querySelector('input[name=message]').value
    // а для такого расклада надо тип события с click на submit поменять
    const text = event.target.elements.message.value
    socket.emit('sendMessage', text, (error) => {
        // enable form button
        $messageFormButton.removeAttribute('disabled')
        $messageFormInput.value = ''
        $messageFormInput.focus()
        if (error) {
            return console.log(error)
        }
        console.log('The message was delivered')
        // console.log('The message was delivered', arg) // действие на подтверждение
    })
})

$sendLocationButton.addEventListener('click', (event) => {
    console.log('send location start')
    if (!navigator.geolocation) {
        return alert('geolocation is not supported!')
    }

    $sendLocationButton.setAttribute('disabled', 'disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        // socket.emit('sendLocation', position.coords.longitude, position.coords.latitude)
        // а можно было передавать объект
        socket.emit('sendLocation', {
            longitude: position.coords.longitude, 
            latitude: position.coords.latitude
        }, () => {
            $sendLocationButton.removeAttribute('disabled')
            console.log('Location shared!')
        })
    })
})

// Новый вид сообщения
socket.emit('join', {username, room}, (error) => {
    // callback на случай ошибки
    if (error) {
        alert(error)
        location.href = '/' // redirect  на главную страницу
    }
})