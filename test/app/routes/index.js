var express = require('express');
var router = express.Router();
console.log('-test-view-')
router.get('/', function(req, res) {
    res.render('index', { title: 'Velha Manias Tests' });
});

module.exports = router;
