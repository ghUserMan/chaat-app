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

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML

// это то сообщение на которое срабатывает браузер
socket.on('message', (message) => {
    console.log('from server message:', message) // внизу короткая форма message: message (можно передавать объект с людыми парами ключ\значение)
    const html = Mustache.render(messageTemplate, {
        message: message.text, 
        createdAt: moment(message.createdAt).format('HH:mm') // разобрался)
    }) // первый агрумент - шаблон, дальше его параметры
    $messages.insertAdjacentHTML('beforeend', html) // первый аргумент говорит о том где расположен вставляемый элемент
})

// это то сообщение на которое срабатывает браузер
socket.on('locationMessage', (url) => {
    console.log('from server locationMessage:', url) 
    // теперь суём сюда другой шаблон
    const html = Mustache.render(locationMessageTemplate, {url}) // первый агрумент - шаблон, дальше его параметры
    $messages.insertAdjacentHTML('beforeend', html) // первый аргумент говорит о том где расположен вставляемый элемент
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