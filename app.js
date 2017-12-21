const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const event = require('./routes/event')
require('dotenv').config();
const app = express();

mongoose.connection.openUri(`mongodb://${process.env.USERNAMEDB}:${process.env.PASSWORDDB}@cluster0-shard-00-00-xrrgq.mongodb.net:27017,cluster0-shard-00-01-xrrgq.mongodb.net:27017,cluster0-shard-00-02-xrrgq.mongodb.net:27017/signmeupapi?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`, { useMongoClient: true })
mongoose.Promise = global.Promise;
mongoose.connection.once('open', () => {
  console.log('mongoose connection success');
}).on('error', (error) => {
  console.log('connection error');
})

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/events', event);



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
