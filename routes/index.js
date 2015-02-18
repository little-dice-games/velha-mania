var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Velha Manias' });
});

router.get('/users/', function(req, res) {
  res.render('index', { title: 'Velha Manias' });
});

module.exports = router;
