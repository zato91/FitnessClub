const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const UserController = require('./controllers/UserController')

const PORT = process.env.PORT || 8000;
app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}



app.get('/', (req, res)=>{
    res.send('Hello from express');
})
app.post('/register', UserController.store)

console.log(process.env.MONGO_DB_SECRET)
mongoose.connect(`mongodb+srv://user_new1:bijRwRKRqAUdaw96@cluster0.i6xeh.mongodb.net/test?retryWrites=true&w=majority`, {
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

app.listen(PORT, ()=> {
    console.log(`Listening on ${PORT}`)
})


// SESSION_SECRET=secret 
// MONGO_DB_CONNECTION=mongodb+srv://new_user01:an0uoUiih5TbURdQ@cluster0.i6xeh.mongodb.net/test?retryWrites=true&w=majority

