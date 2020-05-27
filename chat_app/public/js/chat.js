const socket = io()

// Elements
const $msgform = document.querySelector('#message-form')
const $msgforminput = document.querySelector('input')
const $msgformbutton = document.querySelector('button')
const $messages = document.querySelector('#messages')
const $users = document.querySelector('#users')

// Templates
const $messageTemplate = document.querySelector('#message-template').innerHTML
const $locationTemplate = document.querySelector('#location-template').innerHTML
const $sidebarTemplate = document.querySelector('#sidebar-template').innerHTML


const $locationbutton = document.querySelector('#send-location')

const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true})

const autoscroll = () => {
    const $newMessage = $messages.lastElementChild

    const $newMessageStyles =getComputedStyle($newMessage)
    const $newMessageMargin = parseInt($newMessageStyles.marginBottom)
    const $newMessageHeight = $newMessage.offsetHeight + $newMessageMargin 

    const visibleHeight = $messages.offsetHeight

    const containerHeight = $messages.scrollHeight

    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - $newMessageHeight <= scrollOffset)
        $messages.scrollTop = $messages.scrollHeight
}

socket.on('message', (msg) => {
    const html = Mustache.render($messageTemplate, {
        username:msg.username,
        createdAt:moment(msg.createdAt).format('h:m'),
        message:msg.text
    })
    $messages.insertAdjacentHTML('beforeend', html)

    autoscroll()
})

socket.on('locationMessage', (url) => {
    const html = Mustache.render($locationTemplate, {
        username:url.username,
        url:url.url,
        createdAt:moment(msg.createdAt).format('h:m')
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render($sidebarTemplate, {
        room:room,
        users:users
    })
    $users.insertAdjacentHTML('beforeend', html)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()

    $msgformbutton.setAttribute('disabled',"disabled")

    socket.emit('sendMessage', e.target.elements.message.value, (error) => {
        $msgformbutton.removeAttribute('disabled')
        $msgforminput.value =''
        $msgforminput.focus()

        if (error)
            return console.log(error)
        console.log("Message delivered")
    })
})

document.querySelector('#send-location').addEventListener('click', (e) => {
    if (!navigator.geolocation)
        return alert('Geolocalisation is not supported by your browser')
        
    $locationbutton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {

        socket.emit('sendLocation', {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        }, (message) => {
            $locationbutton.removeAttribute('disabled')
            console.log(message)
        })
    }, (e) => {console.log(e)}, {timeout:10000});

})

socket.emit('join', {username, room}, (error) => {
    if (error){
        alert(error)
        location.href = '/'
    }
})