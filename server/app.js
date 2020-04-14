const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').Server(app)
const PORT = process.env.PORT || 3000

const io = require('socket.io')(http)

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


let users = []
let messages = []
io.on('connection', function (socket) {

    console.log('User Connected')
    
    socket.on('disconnect', function () {
        console.log('User Dissconnected')
    })

    socket.on('user-connect', function (data) {
        users.push(data)
        console.log('new user connected')
        io.emit('user-connect', users)
    })

    socket.on('send-message', function (data) {
        messages.push(data)
        io.emit('send-message', messages)
    })

    socket.on('typing-start', function (data) {
        socket.broadcast.emit('typing-start', data)
    })

    socket.on('typing-stop', function () {
        socket.broadcast.emit('typing-stop')
    })
})

http.listen(PORT, () => { console.log(`listening on port ${PORT}`) })