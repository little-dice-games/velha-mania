'use strict';

var app = require('./test_helper')

describe('foo', function () {
    it('should log', function () {
        console.log('=========', app.mincer)
    })
})