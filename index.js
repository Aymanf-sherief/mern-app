const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const config = require('./config/keys');
const { json } = require('body-parser');
const mainRouter = require('./routers/mainRouter');

const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('db connected'))
    .catch(err => console.log('db error' + json.toString(err)))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', mainRouter);


app.get('/', (req, res) => {
    console.log('get /');
    res.send('hello wordddddddddddd');
})



app.listen(3002);