UsersSocket = function(app, users) {
    var _ = require('underscore');

    app.io.route('users', function(req) {
        req.io.emit('users', {
            data: users
        })
    });

    app.io.route('user', function(req) {
        console.log(req.data.email);
        if (!req.data.email) { return };

        req.io.broadcast('user', {
            data: _.findWhere(users, { email: req.data.email })
        });
    });

    app.io.route('users/new', function(req) {
        user = {
            id: req.socket.id,
            isPlaying: false,
            loggedAt: Date.now(),
            email: req.data.email
        };

        users.push(user);
        req.io.route('user');
    });

    app.io.route('users/delete', function(req){
        users.forEach(function(user){
            if (user.email == req.data.email) {
                var index = users.indexOf(user);
                if (index > -1) { users.splice(index, 1); }
                req.io.broadcast('users/delete', { data: user });
            }
        });
    });
};

module.exports = UsersSocket;