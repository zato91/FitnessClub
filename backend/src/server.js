const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const PORT = process.env.PORT || 8000
require('dotenv').config()

const app = express()
const server = http.Server(app)
const io = socketio(server)



io.on('connection', socket => {
    console.log('user is connected', socket.id)
    console.log(socket.handshake.query)
})


// if (process.env.NODE_ENV !== 'production') {
// 	require('dotenv').config()
// }



mongoose.connect(`mongodb+srv://user_new:${process.env.REACT_APP_MY_ENV}@cluster0.i6xeh.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const connectUsers = {}

io.on('connection', socket => {
	const { user } = socket.handshake.query

	connectUsers[user] = socket.id
})

app.use((req, res, next) => {
	req.io = io
	req.connectUsers = connectUsers
	return next()
})

app.use(cors())
app.use(express.json())
app.use('/files', express.static(path.resolve(__dirname, '..', 'files')))
app.use(routes)

server.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})