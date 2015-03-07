this.VelhaMania.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var API;

    Entities.Boot = Backbone.Model.extend({
        positions: [
            'a1', 'a2', 'a3',
            'b1', 'b2', 'b3',
            'c1', 'c2', 'c3'
        ],

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

        played: function(positions) {
            _.difference(this.positions, positions.opponent, positions.me);
        }
    })

    API = {
        played: function(positions) {
            model = new Entities.Boot()
            return model.played(positions)
        }
    };

    App.reqres.setHandler('played:boot:entity', function(positions) {
        return API.played(positions)
    });
});