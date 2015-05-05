var should = require('should');
    app = require('../../app'),
    io = require('socket.io-client'),
    socketURL = 'http://0.0.0.0:3000',

    options = {
      transports: ['websocket'],
      'force new connection': true,
      secure: true
    },

    chatUser1 = { email: 'foo@bar.com' },
    chatUser2 = { email: 'bar@foo.com' };

function startExample (done, next) {
    var path = require('path');
    // var spawn = require('child_process').spawn;
    // var app = spawn('node', [path.join(__dirname, '../../', 'app.js')]);

    app.set('port', 3000);
    app.listen(app.get('port'));

    setTimeout(function() {
        next(done);
    }, 1400)
}

describe("User socket", function () {
    it('foo', function(next) {
        startExample(next, function(done) {
            var s = io.connect('http://localhost:3000/socket.io');

            s.emit('users/new');
            // var client = io.connect(socketURL, options);

            // client.on('connect', function() {
            //     console.log('-------')
            // })

            // client.emit('users/new', chatUser1);
            done();
        })
    });
});

// server = require('../../app'),
// server.set('port', 3000);

// var foo = server.listen(server.get('port'), function() {
// })
// var client = require('socket.io-client').connect(socketURL, options);

// client.io.emit('users/new', chatUser1);
// client.emit('users/new', chatUser1);

