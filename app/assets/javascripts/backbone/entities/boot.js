this.VelhaMania.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var API;

    Entities.Boot = Backbone.Model.extend({
        played: function(options) {
            var board = App.request('get:positions:board:entities');

            var opponentPositions = _.map(board.where({ ownerPosition: options.opponent }), function(position, i) {
                return position.get('name');
            });

            var myPositions = _.map(board.where({ ownerPosition: options.me }), function(position, i) {
                return position.get('name');
            });

            var freePositions = _.map(board.where({ ownerPosition: _.noop }), function(position, i) {
                return position.get('name');
            });

            var playeds = _.noop

            _.each(board.bestMoves, function(positions, i) {
                playedOpponent = _.difference(positions, opponentPositions)

                if (playedOpponent.length == 1) {
                    playeds = playedOpponent;
                }
            });

            _.each(board.bestMoves, function(i, positions) {
                playedMe = _.difference(positions, myPositions)

                if (!playeds && playedMe.length == 1) {
                    playeds = playedMe;
                } else if (!playeds && playedMe.length == 2) {
                    playeds = playedMe;
                } else if(!playeds) {
                    playeds = _.extend(playedMe, freePositions);
                }
            });

            var betterPosition = playeds[_.random(0, playeds.length - 1)];
            return board.findWhere({ name: betterPosition })
        }
    })

    API = {
        // { opponent: opponentName, me: yourName }
        played: function(options) {
            model = new Entities.Boot()
            return model.played(options);
        }
    };

    App.reqres.setHandler('played:boot:entity', function(options) {
        return API.played(options)
    });
});