var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let elektrownia = {};

setInterval(function() {
console.log("STATUS")
  const minutes = new Date().getMinutes();
  let idx;
  if ((minutes % 2)==0)
    idx = (minutes>20)?0:1;
  else idx = (minutes>20)?2:3;
  let date2 = moment(new Date()).format();
  const status = [
    'Duże','Średnie','Małe','Brak'
  ];
  elektrownia = {
    'title': 'Elektrownia',
    'request': status[idx],
    'update_time': date2,
    'all_status': status
  };
}, 30000);


app.use('/', function(req, res, next) {
    res.json(elektrownia);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
