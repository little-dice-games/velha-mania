this.VelhaMania.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {
    var API;

    Entities.Bot = Backbone.Model.extend({
        play: function() {
            var board = App.request('board:entities');

            var opponentPositions = _.map(board.where({ userId: this.get('opponent') }), function(position, i) {
                return position.get('name');
            });

            var myPositions = _.map(board.where({ userId: this.get('me') }), function(position, i) {
                return position.get('name');
            });

            var freePositions = _.map(board.where({ userId: _.noop }), function(position, i) {
                return position.get('name');
            });

            var playeds = _.noop;

            _.each(board.bestMoves, function(positions, i) {
                playedOpponent = _.difference(positions, opponentPositions);

                if (playedOpponent.length === 1) {
                    playeds = playedOpponent;
                }
            });

            _.each(board.bestMoves, function(i, positions) {
                playedMe = _.difference(positions, myPositions);

                if (!playeds && playedMe.length === 1) {
                    playeds = playedMe;
                } else if (!playeds && playedMe.length === 2) {
                    playeds = playedMe;
                } else if (!playeds) {
                    playeds = _.extend(playedMe, freePositions);
                }
            });

            var betterPosition = playeds[_.random(0, playeds.length - 1)];
            return board.findWhere({ name: betterPosition });
        }
    });

    API = {
        getBot: function(options) {
            return new Entities.Bot(options);
        },

        resetBot: function() {
            bot = _.noop;
        }
    };

    App.reqres.setHandler('bot:entity', function(options) {
        return API.getBot(options);
    });

    App.reqres.setHandler('reset:bot', function() {
        return API.resetBot();
    });
});