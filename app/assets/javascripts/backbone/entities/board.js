this.VelhaMania.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var API;
    var board = void 0;

    Entities.Position = Backbone.Model.extend({
        defaults: {
            ownerPosition: _.noop
        }
    })

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
            ['a3', 'b3', 'c3'],
        ],

        initialize: function() {
            this.add([
                { name: 'a1' }, { name: 'a2' }, { name: 'a3' },
                { name: 'b1' }, { name: 'b2' }, { name: 'b3' },
                { name: 'c1' }, { name: 'c2' }, { name: 'c3' }
            ]);
        }
    })

    API = {
        getBoard: function() {
            if (board == null) {
                board = new Entities.Board();
            }

            return board;
        },

        boardInit: function() {
            return API.getBoard();
        },

        setOptions: function(options) {
            board
                .findWhere({ name: options.position })
                .set({ ownerPosition: options.ownerPosition });

            window.board = board;
            return board;
        }
    };

    App.reqres.setHandler('board:entities', function() {
        return API.boardInit();
    });

    App.reqres.setHandler('get:positions:board:entities', function() {
        return API.getBoard();
    });

    App.reqres.setHandler('set:position:board:entities', function(options) {
        return API.setOptions(options);
    });
});