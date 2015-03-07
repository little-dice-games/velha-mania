this.VelhaMania.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var API;
    var board = void 0;

    Entities.Position = Backbone.Model.extend({
        defaults: {
            ownerPosition: _.noop
        }
    })

    Entities.Board = Backbone.Collection.extend({
    })

    API = {
        init: function() {
            console.log('-----------')
            if (board == null) {
                board = new Entities.Board();
                board.add([
                    { name: 'a1' }, { name: 'a2' }, { name: 'a3' },
                    { name: 'b1' }, { name: 'b2' }, { name: 'b3' },
                    { name: 'c1' }, { name: 'c2' }, { name: 'c3' }
                ]);
            }

            window.board = board;
            return board;
        }
    };

    App.reqres.setHandler('board:entities', function() {
        return API.init();
    });

    App.reqres.setHandler('get:positions:board:entities', function() {
        return API.init();
    });
});