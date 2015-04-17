var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    if (process.env.NODE_ENV === 'test') {
        res.render('test', { title: 'Velha Mania Test' });
    } else {
        res.redirect('/');
    }
});

module.exports = router;
