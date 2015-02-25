this.VelhaMania.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var API;

    Entities.Game = Backbone.Model.extend({
    })

    API = {
        invite: function(opponent) {
            socket.emit('game/invitation', { opponent: opponent.attributes })
        }
    };

    App.reqres.setHandler('invite:game:entity', function(opponent) {
        API.invite(opponent)
    });

    socket.on('game/invitation', function(response) {
        var user = App.request('user:by:email:entity', response.data.user.email);
        App.vent.trigger('show:modal', {
            message: user.get('username') + ' te convidou para jogar. Aceita o convite?',
            roomId: response.data.roomId
        })
    });

    App.commands.setHandler('when:modal:answered', function(response) {
        if (response.answered) {
            socket.emit('game/invitation/accepted', response);
        }  else {
            socket.emit('game/invitation/rejected', response);
        }
    });

    socket.on('game/invitation/canceled', function(response) {
        App.vent.trigger('remove:modal');
    });

    socket.on('game/invitation/rejected', function(response) {
        socket.emit('game/invitation/rejected', response);
    });

    socket.on('game/start', function() {
        App.vent.trigger('game:start');
    });
});