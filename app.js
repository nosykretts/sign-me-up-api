const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const morgan = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost/signmeupapi', { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(morgan('dev')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/index'));



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
