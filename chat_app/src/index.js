const express = require('express')
const path = require("path")
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage,generateLocationMessage }= require('./utils/messages')
const {addUser, removeUser, getUser, getUsersInRoom} = require('./utils/users')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.port || 3000
const publicDirectoryPath =path.join(__dirname, "../public")

app.use(express.static(publicDirectoryPath))

// let count = 0

io.on('connection', (socket) => {
    console.log('New web socket connection')

    

    socket.on('join', (options, callback) => {
        const {error, user} = addUser({id:socket.id, ...options})

        if (error){
            return callback(error)
        }
        socket.join(user.room)

        socket.emit("message", generateMessage('Admin','Welcome'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin',user.username+" has joined !"))

        io.to(user.room).emit('roomData', {
            room:user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        const user = getUser(socket.id)


        if (filter.isProfane(message))
            return callback('Profanity is not allowed !')
        io.to(user.room).emit('message', generateMessage(user.username,message))
        callback()
    })

    socket.on('sendLocation', (position, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username,"https://www.google.fr/maps?q="+position.latitude+", "+position.longitude))
        callback("Location shared !")
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user){
            io.to(user.room).emit('message', generateMessage("Admin",user.username+' has left!'))
            io.to(user.room).emit('roomData', {
                room:user.room,
                users: getUsersInRoom(user.room)
            })

        }

    })

    // socket.emit('countUpdated', count)

    // socket.on('increment', () => {
    //     count ++
    //     //socket.emit('countUpdated', count)
    //     io.emit('countUpdated', count)

    // })
})
server.listen(port, () => {
    console.log("Server up on port ",port)
})