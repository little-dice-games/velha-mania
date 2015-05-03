this.VelhaMania.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {
    var API;

    Entities.Boot = Backbone.Model.extend({
        played: function (options) {
            var board = App.request('get:positions:board:entities'),

                opponentPositions = _.map(board.where({ ownerPosition: options.opponent }),
                    function (position) {
                        return position.get('name');
                    }),

                myPositions = _.map(board.where({ ownerPosition: options.me }),
                    function (position) {
                        return position.get('name');
                    }),

                freePositions = _.map(board.where({ ownerPosition: _.noop }),
                    function (position) {
                        return position.get('name');
                    }),

                playeds = _.noop,
                playedOpponent,
                playedMe,
                betterPosition;

            _.each(board.bestMoves, function (positions) {
                playedOpponent = _.difference(positions, opponentPositions);

                if (playedOpponent.length === 1) {
                    playeds = playedOpponent;
                }
            });

            _.each(board.bestMoves, function (i, positions) {
                playedMe = _.difference(positions, myPositions);

                if (!playeds && playedMe.length === 1) {
                    playeds = playedMe;
                } else if (!playeds && playedMe.length === 2) {
                    playeds = playedMe;
                } else if (!playeds) {
                    playeds = _.extend(playedMe, freePositions);
                }
            });

            betterPosition = playeds[_.random(0, playeds.length - 1)];
            return board.findWhere({ name: betterPosition });
        }
    });

    API = {
        // { opponent: opponentName, me: yourName }
        played: function (options) {
            var model = new Entities.Boot();
            return model.played(options);
        }
    };

    App.reqres.setHandler('played:boot:entity', function (options) {
        return API.played(options);
    });
});