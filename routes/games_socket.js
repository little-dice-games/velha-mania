var GamesSocket = function (app, users) {
    var _ = require('underscore'),
        timer;

    app.io.route('game/invitation', function (req) {
        var opponent = req.data.opponent,
            roomId = _.uniqueId('room'),
            user = _.findWhere(users, { id: req.socket.id });

        req.data.roomId = roomId;

        opponent = _.findWhere(users, { email: opponent.email });

        user.isPlaying = true;
        opponent.isPlaying = true;
        user.shape = 'x';
        user.turn = true;

        app.io.sockets.socket(opponent.id).emit('game/invitation', {
            data: {
                user: user,
                roomId: roomId
            }
        });

        timer = setTimeout(function () {
            req.io.route('game/invitation/canceled');
        }, 30000);

        req.io.join(roomId);
        req.io.broadcast('users', { data: users });
    });

    app.io.route('game/invitation/canceled', function (req) {
        if (timer) {
            clearTimeout(timer);
        }

        var roomId = req.data.roomId,
            opponent = _.findWhere(users, { email: req.data.opponent.email }),
            user = _.findWhere(users, { id: req.socket.id });

        if (user) {
            user.isPlaying = false;
        }

        req.io.leave(roomId);

        _.map([opponent, user], function (socket) {
            app.io.sockets.socket(socket.id).emit('game/invitation/canceled');
        });

        req.io.broadcast('users', { data: users });
    });

    app.io.route('game/invitation/accepted', function (req) {
        if (timer) {
            clearTimeout(timer);
        }

        var room = req.data.roomId,
            user = _.findWhere(users, { id: req.socket.id });

        user.isPlaying = true;
        user.shape = 'o';
        user.turn = false;

        req.io.join(room);

        app.io.broadcast('users', { data: users });
        app.io.room(room).broadcast('game/start', { roomId: room });
    });

    app.io.route('game/invitation/rejected', function (req) {
        if (timer) {
            clearTimeout(timer);
        }

        var room = req.data.roomId,
            user = _.findWhere(users, { id: req.socket.id });

        user.isPlaying = false;
        req.io.join(room);
        req.io.room(room).broadcast('game/invitation/rejected', { roomId: req.data.roomId });
        req.io.leave(room);

        req.io.broadcast('users', { data: users });
    });

    app.io.route('game/play', function (req) {
        var room = req.data.roomId,
            user = _.findWhere(users, { id: req.socket.id }),
            opponent = _.chain(app.io.sockets.clients(room))
                .map(function (client) {
                    return _.findWhere(users, { id: client.id });
                })
                .reject(function (client) {
                    return client.id === user.id;
                })
                .first()
                .value();

        user.turn = false;
        opponent.turn = true;

        app.io.broadcast('users', { data: users });
        req.io.broadcast('game/play', req.data);
    });

    app.io.route('game/end', function (req) {
        var room = req.data.roomId;
        req.io.broadcast('game/end', req.data);

        _.each(app.io.sockets.clients(room), function (client) {
            var user = _.findWhere(users, { id: client.id });
            user.turn = false;
            user.shape = null;
            user.isPlaying = false;
        });

        app.io.broadcast('users', { data: users });
    });
};

module.exports = GamesSocket;