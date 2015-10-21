this.VelhaMania.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var API;
    var board = _.noop;

    Entities.Position = Backbone.Model.extend({
        defaults: {
            userId: _.noop
        },

        positionsA: function (response) {
            switch (response.name) {
                case 'a1':
                    response.x = response.y = 0;
                    break;
                case 'a2':
                    response.x = response.width;
                    response.y = 0;
                    break;
                case 'a3':
                    response.x = response.width * 2;
                    response.y = 0;
                    break;
            }
        },

        positionsB: function (response) {
            switch (response.name) {
                case 'b1':
                    response.x = 0;
                    response.y = response.height;
                    break;
                case 'b2':
                    response.x = response.width;
                    response.y = response.height;
                    break;
                case 'b3':
                    response.x = response.width * 2;
                    response.y = response.height;
                    break;
            }
        },

        positionsC: function (response) {
            switch (response.name) {
                case 'c1':
                    response.x = 0;
                    response.y = response.height * 2;
                    break;
                case 'c2':
                    response.x = response.width;
                    response.y = response.height * 2;
                    break;
                case 'c3':
                    response.x = response.width * 2;
                    response.y = response.height * 2;
                    break;
            }
        },

        getPosition: function (response) {
            return {
                height: ((response.options.height / 3) - response.height) / 2,
                width: ((response.options.width / 3) - response.width) / 2
            };
        },

        parse: function (response) {
            response.width = CanvasUtils.squareWidth();
            response.height = CanvasUtils.squareHeight();

            this.positionsA(response);
            this.positionsB(response);
            this.positionsC(response);

            return response;
        }
    });

    Entities.Board = Backbone.Collection.extend({
        model: Entities.Position,
        bestMoves: [
            ['a1', 'a2', 'a3'],
            ['b1', 'b2', 'b3'],
            ['c1', 'c2', 'c3'],
            ['a1', 'b2', 'c3'],
            ['c1', 'b2', 'a3'],
            ['a1', 'b1', 'c1'],
            ['a2', 'b2', 'c2'],
            ['a3', 'b3', 'c3']
        ],

        initialize: function () {
            this.add([
                { name: 'a1' }, { name: 'a2' }, { name: 'a3' },
                { name: 'b1' }, { name: 'b2' }, { name: 'b3' },
                { name: 'c1' }, { name: 'c2' }, { name: 'c3' }
            ], { parse: true });
        },

        checkWin: function (userId) {
            console.log('checkWin', userId);

            var userMoves = this.where({ userId: userId }).map(function (position) {
                return position.get('name');
            });

            console.log('userMoves', userMoves);

            if (userMoves.length === 5) {
                console.log('userMoves equals 5');
                if (_.isEmpty(this.where({ play: undefined }))) {
                    console.log('game:end', this.roomId);
                    this.trigger('game:end', { roomId: this.roomId });
                }
            } else if (userMoves.length === 3) {
                console.log('userMoves equals 3');
                _.filter(this.bestMoves, function (moves) {
                    if (_.isEmpty(_.difference(userMoves, moves))) {
                        console.log('game:end', this.roomId, userId);
                        this.trigger('game:end', {
                            winnerId: userId,
                            roomId: this.roomId
                        });
                    }
                }.bind(this));
            }
        }
    });

    API = {
        getBoard: function (options) {
            if (_.isUndefined(board)) {
                board = new Entities.Board();
                board.roomId = options.roomId;
            }

            return board;
        },

        resetBoard: function() {
            board = _.noop;
        }
    };

    App.reqres.setHandler('board:entities', function (options) {
        return API.getBoard(options);
    });

    App.vent.on('reset:board:entities', function () {
        return API.resetBoard();
    });
});