const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mern-app', {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log('db connected'))
.catch(console.log('db error'));

app.get('/', (req, res) => {
    res.send('hello wordddddddddddd');
})

app.listen(3002);