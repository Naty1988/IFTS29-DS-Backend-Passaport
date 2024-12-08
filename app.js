var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require('dotenv').config();


const mongoURI = "mongodb://localhost/passport-example"

const connectToMongo = async () => {
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI) 
    console.log('Mongo connected')
}
catch(error) {
    console.log("Error en conexion a BD" + error)
    process.exit()
}
}
module.exports = connectToMongo;

/*
// Connection to DB
mongoose.connect('mongodb://localhost/passport-example', function (err, res) {
   if (err) throw err;
   console.log('Connected to Database');
});
*/

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const usersRouter = require('./controllers/users');
const postsRouter = require('./controllers/posts');

// Routes
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

const PORT = 8000;

// Start server
app.listen(8000, function () {
   console.log(`Node server running on http://localhost:${PORT}`);
});