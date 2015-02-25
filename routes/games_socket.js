GamesSocket = function(app, users) {
    var _ = require('underscore');
    var timer = undefined;

    app.io.route('game/invitation', function(req) {
        var opponent = req.data.opponent;
        var roomId = _.uniqueId('room');

        req.data.roomId = roomId;

        var opponent = _.findWhere(users, { email: opponent.email });
        var user = _.findWhere(users, { id: req.socket.id });
        user.isPlaying = true;

        app.io.sockets.socket(opponent.id).emit('game/invitation', { data: { user: user, roomId: roomId }})

        timer = setTimeout(function() {
            req.io.route('game/invitation/canceled');
        } ,30000)

        req.io.join(roomId);
        req.io.broadcast('users', { data: users });
    });

    app.io.route('game/invitation/canceled', function(req) {
        if (timer) { clearTimeout(timer) };
        var roomId = req.data.roomId;

        var opponent = _.findWhere(users, { email: req.data.opponent.email });
        var user = _.findWhere(users, { id: req.socket.id });
        user.isPlaying = false;

        req.io.leave(roomId);

        app.io.sockets.socket(opponent.id).emit('game/invitation/canceled');
        req.io.broadcast('users', { data: users });
    });

    app.io.route('game/invitation/accepted', function(req) {
        if (timer) { clearTimeout(timer) };
        var room = req.data.roomId;

        _.findWhere(users, { id: req.socket.id }).isPlaying = true;

        req.io.join(room);
        app.io.room(room).broadcast('game/start');
        req.io.broadcast('users', { data: users });
    });

    app.io.route('game/invitation/rejected', function(req) {
        if (timer) { clearTimeout(timer) };
        var room = req.data.roomId;

        req.io.join(room);
        req.io.room(room).broadcast('game/invitation/rejected', { roomId: req.data.roomId });
        req.io.leave(room);

        _.findWhere(users, { id: req.socket.id }).isPlaying = false;
        req.io.broadcast('users', { data: users });
    });
};

module.exports = GamesSocket;