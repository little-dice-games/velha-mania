UsersSocket = function(app, users) {
    var roomId = 'velha-mania-users';

    app.io.route('users/new', function(req) {
        user = {
            id: req.socket.id,
            isPlaying: false,
            loggedAt: Date.now(),
            email: req.data.email
        };

        users.push(user);

        req.io.respond({
            success: { roomId: roomId }
        });

        req.io.broadcast('users', { data: users });
    });

    app.io.route('users/delete', function(req){
        users.forEach(function(user){
            if (user.email == req.data.email) {
                var index = users.indexOf(user);
                if (index > -1) { users.splice(index, 1); }
                req.io.broadcast('users/delete', { data: user });
            }
        });
    })

    app.io.route('users', function(req) {
        req.io.emit('users', {
            data: users
        })
    });
};

module.exports = UsersSocket;