const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const PORT = process.env.PORT || 8000

const app = express()
const server = http.Server(app)
const io = socketio(server)



io.on('connection', socket => {
    console.log('user is connected', socket.id)
    console.log(socket.handshake.query)
})


if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });





mongoose.connect(`mongodb+srv://user_new:hsgTljJ1owmKUBYh@cluster0.i6xeh.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// try {
// 	mongoose.connect(process.env.MONGO_DB_SECRET, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})
// 	console.log('MongoDb connected successfully!')
// } catch (error) {
// 	console.log(error)
// }
// mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.i6xeh.mongodb.net/<dbname>?retryWrites=true&w=majority
// mongoose.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.i6xeh.mongodb.net/test?retryWrites=true&w=majority`,(err)=>{
// if(err) throw err;
// console.log("DB Connected Successfully");
// });


// app.use("/files", express.static(path.resolve(__dirname,"..", "files")))
// app.use(routes);

// server.listen(PORT, () => {
// 	console.log(`Listening on ${PORT}`)
// })


// SESSION_SECRET=secret 
// MONGO_DB_CONNECTION=mongodb+srv://new_user01:an0uoUiih5TbURdQ@cluster0.i6xeh.mongodb.net/test?retryWrites=true&w=majority

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