const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const path = require('path')
const config = require('./config/keys');
const { json } = require('body-parser');
const mainRouter = require('./routers/mainRouter');

const app = express();


/* redirection for heroku to https from http */
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production'
    && req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else next();
});


mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('db connected'))
    .catch(err => console.log('db error' + json.toString(err)))


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', mainRouter);


/* Build and deployment */
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("/*", function(req, res) {
      res.sendFile(path.join(__dirname, "/../client/build/index.html"));
    });
  }
  
  else {
    app.use(express.static(path.join(__dirname, '/client/public')));
    app.get("/*", function(req, res) {
      res.sendFile(path.join(__dirname, "/../client/public/index.html"));
    });
  }

app.get('/', (req, res) => {
    console.log('get /');
    res.send('hello wordddddddddddd');
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server Running at ${port}`));