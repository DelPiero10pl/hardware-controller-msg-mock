var express = require('express');
var moment = require('moment');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const minutes = new Date().getMinutes();
  let idx;
  if ((minutes % 2)==0)
    idx = (minutes>20)?0:1;
  else idx = (minutes>20)?2:3;
  let date2 = moment(new Date()).format();
  const status = [
    'Duże','Średnie','Małe','Brak'
  ];
  res.json({
    'title': 'Elektrownia',
    'request': status[idx],
    'update_time': date2,
  });
});

module.exports = router;
