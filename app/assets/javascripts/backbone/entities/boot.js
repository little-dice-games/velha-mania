this.VelhaMania.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var API;

    Entities.Boot = Backbone.Model.extend({
        played: function(options) {
            board = App.request('get:positions:board:entities');

            opponentPositions = board.where({ ownerPosition: options.opponent })
            myPositions = board.where({ ownerPosition: options.me })
            freePositions = board.where({ ownerPosition: _.noop })

            _.each(board.bestMoves, function(i, positions) {
                _.difference(opponentPositions, positions)
                _.difference(opponentPositions, myPositions)
            })
        }
    })

    API = {
        played: function(options) {
            model = new Entities.Boot()
            return model.played(options);
        }
    };

    App.reqres.setHandler('played:boot:entity', function(options) {
        return API.played(options)
    });
});