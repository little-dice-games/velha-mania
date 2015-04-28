this.VelhaMania.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var API;

    Entities.Bot = Backbone.Model.extend({
        played: function(options) {
            var board = App.request('board:entities');

            var opponentPositions = _.map(board.where({ userId: options.opponent }), function(position, i) {
                return position.get('name');
            });

            var myPositions = _.map(board.where({ userId: options.me }), function(position, i) {
                return position.get('name');
            });

            var freePositions = _.map(board.where({ userId: _.noop }), function(position, i) {
                return position.get('name');
            });

            var playeds = _.noop;

            _.each(board.bestMoves, function(positions, i) {
                playedOpponent = _.difference(positions, opponentPositions);

                if (playedOpponent.length == 1) {
                    playeds = playedOpponent;
                }
            });

            _.each(board.bestMoves, function(i, positions) {
                playedMe = _.difference(positions, myPositions);

                if (!playeds && playedMe.length == 1) {
                    playeds = playedMe;
                } else if (!playeds && playedMe.length == 2) {
                    playeds = playedMe;
                } else if(!playeds) {
                    playeds = _.extend(playedMe, freePositions);
                }
            });

            var betterPosition = playeds[_.random(0, playeds.length - 1)];
            return board.findWhere({ name: betterPosition });
        }
    })

    API = {
        played: function(options) {
            model = new Entities.Bot();
            return model.played(options);
        }
    };

    App.reqres.setHandler('played:bot:entity', function(options) {
        return API.played(options);
    });
});