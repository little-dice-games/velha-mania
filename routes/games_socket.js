GamesSocket = function(app, users) {
    app.io.route('game/send/invitation', function(req) {
        var opponent = req.data.opponent;

        users.forEach(function(user){
            if (user.email == opponent.email) {
                app.io.sockets.socket(user.id).emit('foo', { data: 'lets go!' })
            }

            if (user.id == req.socket.id) {
                user.isPlaying = true;
            }
        });

        req.io.respond({
            success: { roomId: 1233 }
        });

        req.io.broadcast('game/invitation', { roomId: 123 });
    });
};

module.exports = GamesSocket;