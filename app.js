// load environment variables
require('dotenv').config();

// load dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

// load routes to variables
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');
var ordersRouter = require('./routes/orders');
var paymentsRouter = require('./routes/payments');
var reservationsRouter = require('./routes/reservations');

// load express
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// load middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// load routes to app
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/orders', ordersRouter);
app.use('/payments', paymentsRouter);
app.use('/reservations', reservationsRouter);

// catch all invalid URLs
app.get('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
