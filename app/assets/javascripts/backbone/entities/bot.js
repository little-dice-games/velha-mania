this.VelhaMania.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {
    var API;

    Entities.Bot = Backbone.Model.extend({
        parse: function(response) {
            var board = App.request('board:entities');

            board.map(function(position) {
                console.log('board.map position', position.get('userId'), position.get('name'));
                if (position.get('play') && position.get('userId') !== response.me) {
                    console.log('set to opponent');
                    position.set({ userId: response.opponent });
                }
            });

            return response;
        },

        play: function() {
            console.log('opponent', this.get('opponent'))
            console.log('me', this.get('me'))

            var board = App.request('board:entities');
            // map the opponent plays
            var opponentPositions = _.map(board.where({ userId: this.get('opponent') }), function(position, i) {
                return position.get('name');
            });
            console.log('opponentPositions', opponentPositions);
            // map the current user plays
            var myPositions = _.map(board.where({ userId: this.get('me') }), function(position, i) {
                return position.get('name');
            });
            console.log('myPositions', myPositions);
            // map the free positions
            var freePositions = _.map(board.where({ userId: _.noop }), function(position, i) {
                return position.get('name');
            });
            console.log('freePositions', freePositions);
            var playeds = _.noop;
            // check if the bot can win in this play
            _.each(board.bestMoves, function(positions, i) {
                playedOpponent = _.difference(positions, myPositions);

                if (playedOpponent.length === 1) {
                    playeds = playedOpponent;
                }
            });
            console.log('playeds', playeds);
            // check if the user can win in this play
            _.each(board.bestMoves, function(i, positions) {
                playedMe = _.difference(positions, opponentPositions);

                if (!playeds && playedMe.length === 1) {
                    playeds = playedMe;
                } else if (!playeds && playedMe.length === 2) {
                    playeds = playedMe;
                } else if (!playeds) {
                    playeds = _.extend(playedMe, freePositions);
                }
            });
            console.log('playeds', playeds)
            // var positions = _.map(playeds, function(position, i) {
            //     if (_.include(freePositions, position)) {
            //         return position;
            //     }
            // });
            // if (positions.length === 0) {
            //     positions = freePositions;
            // }
            var betterPosition = playeds[_.random(0, playeds.length - 1)];
            console.log('betterPosition', betterPosition);
            return board.findWhere({ name: betterPosition });
        }
    });

    API = {
        getBot: function(options) {
            return new Entities.Bot(options, { parse: true });
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