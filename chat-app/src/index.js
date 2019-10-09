const path = require('path')
const http = require('http')

const express = require('express')
const socketio = require('socket.io')
const Piii = require('piii')
const piiiFilters = require('piii-filters')

const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { getUser, getUsersInRoom, removeUser, addUser } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('New WebSocket connection.')

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({
            id: socket.id,
            username: options.username,
            room: options.room
        })
        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage("Admin", "Welcome!"))
        socket.broadcast.to(user.room).emit('message', generateMessage("Admin", `${user.username} has joined! :D`))
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const { username, room } = getUser(socket.id)
        const piii = new Piii({ filters: [...Object.values(piiiFilters)] })

        if (piii.has(message)) {
            return callback('Palavrao n pode pacero')
        }

        io.to(room).emit('message', generateMessage(username, message))
        callback()
    })



    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage("Admin", `${user.username} has left! :(`))
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })

    socket.on('sendLocation', ({ latitude, longitude }, callback) => {
        const { username, room } = getUser(socket.id)
        io.to(room).emit('locationMessage', generateLocationMessage(username, `https://google.com/maps?q=${latitude},${longitude}`))
        callback()
    })
})

server.listen(port, () => {
    console.log(`Server up on port ${port}`)
})