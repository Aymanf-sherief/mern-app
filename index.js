const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { User } = require('./models/user')
const config = require('./config/keys');
const keys = require('./config/keys');
const { json } = require('body-parser');
const app = express();

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('db connected'))
    .catch(err => console.log('db error' + json.toString(err)));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    console.log('get /');
    res.send('hello wordddddddddddd');
})


app.post('/api/users/register', (req, res) => {
    console.log('post '+ req.url)
    const user = new User(req.body);
    user.save((err, userData) => {
        if (err) {
            return res.json({success: false, err})
        }
        else {
            return res.status(200).json({ success: true , userData});
        }
    });

    
})
app.listen(3002);