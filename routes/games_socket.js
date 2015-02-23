GamesSocket = function(app, users) {
    var _ = require('underscore');

    app.io.route('game/invitation', function(req) {
        var opponent = req.data.opponent;
        var roomId = _.uniqueId('room')

        var opponent = _.findWhere(users, { email: opponent.email });
        app.io.sockets.socket(opponent.id).emit('game/invitation', { roomId: roomId })

        _.findWhere(users, { id: req.socket.id }).isPlaying = true;

        req.io.join(roomId);
        req.io.broadcast('users', { data: users });
    });

    app.io.route('game/invitation/accepted', function(req) {
        _.findWhere(users, { id: req.socket.id }).isPlaying = true;
        req.io.join(req.data.roomId).emit('game/start');
        req.io.broadcast('users', { data: users });
    });

    app.io.route('game/invitation/canceled', function(req) {
        var opponent = _.findWhere(users, { email: opponent.email });
        app.io.sockets.socket(opponent.id).emit('game/invitation/canceled');
        _.findWhere(users, { id: req.socket.id }).isPlaying = false;
        req.io.broadcast('users', { data: users });
    });

    app.io.route('game/invitation/rejected', function(req) {
        req.io.join(req.data.roomId).broadcast('game/invitation/rejected', { roomId: req.data.roomId });
        req.io.leave(req.data.roomId);

        _.findWhere(users, { id: req.socket.id }).isPlaying = false;
        req.io.broadcast('users', { data: users });
    });
};

module.exports = GamesSocket;