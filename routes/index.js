var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const minutes = new Date().getMinutes();
  let idx;
  if ((minutes % 2)==0)
    idx = (minutes>20)?0:1;
  else idx = (minutes>20)?2:3;
  const status = [
    'Duże','Średnie','Małe','Brak'
  ];

  res.json({
    'title': 'Elektrownia',
    'request': status[idx]
  });
});

module.exports = router;
