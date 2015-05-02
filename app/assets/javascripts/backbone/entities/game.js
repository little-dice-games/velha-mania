this.VelhaMania.module('Entities', function (Entities, App, Backbone) {
    var API;

    Entities.Game = Backbone.Model;

    API = {
        invite: function (opponent) {
            socket.emit('game/invitation', { opponent: opponent.attributes });
        }
    };

    App.reqres.setHandler('invite:game:entity', function (opponent) {
        API.invite(opponent);
    });

    App.vent.on('game:play', function (options) {
        socket.emit('game/play', options);
    });

    App.vent.on('game:end', function (options) {
        socket.emit('game/end', options);
    });

    App.vent.on('show:game:end:modal', function (options) {
        App.vent.trigger('game:close');

        var message,
            currentUser;

        if (options.winnerId) {
            currentUser = App.request('user:entity');

            if (currentUser.get('id') === options.winnerId) {
                message = 'Você ganhou!';
            } else {
                message = 'Você perdeu :(';
            }
        } else {
            message = 'Deu velha :|';
        }

        App.vent.trigger('show:information:modal', {
            message: message
        });

        App.vent.trigger('users:visit');
    });

    App.commands.setHandler('when:modal:answered', function (response) {
        if (response.answered) {
            socket.emit('game/invitation/accepted', response);
        }  else {
            socket.emit('game/invitation/rejected', response);
        }
    });

    socket.on('game/invitation', function (response) {
        var user = App.request('user:by:email:entity', response.data.user.email);
        App.vent.trigger('show:confirmation:modal', {
            message: user.get('username') + ' te convidou para jogar. Aceita o convite?',
            roomId: response.data.roomId
        });
    });

    socket.on('game/invitation/canceled', function () {
        App.vent.trigger('remove:modal');
    });

    socket.on('game/invitation/rejected', function (response) {
        socket.emit('game/invitation/rejected', response);
        App.vent.trigger('remove:modal');
    });

    socket.on('game/start', function (response) {
        App.vent.trigger('remove:modal');
        App.vent.trigger('game:start', response);
    });

    socket.on('game/play', function (response) {
        var board = App.request('board:entities'),
            model = board.findWhere({ name: response.position.name });

        model.set({ play: response.play, userId: response.user.id });
    });

    socket.on('game/end', function (response) {
        App.vent.trigger('show:game:end:modal', response);
    });
});