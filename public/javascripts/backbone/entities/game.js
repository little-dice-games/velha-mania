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
        console.log(response, 'invitation - abrir a janela de confimação');
    });

    socket.on('game/invitation/canceled', function(response) {
        console.log(response, 'canceled')
    });

    socket.on('game/invitation/rejected', function(response) {
        socket.emit('game/invitation/rejected', response);
    });

    socket.on('game/start', function() {
        console.log('game:start')
    });
});