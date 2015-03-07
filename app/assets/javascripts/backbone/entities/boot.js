this.VelhaMania.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var API;

    Entities.Boot = Backbone.Model.extend({
        defaults: {
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
            ]
        },

        parse: function(positions) {
            var map = {}
            console.log(this.attributes);
            _.each(this.get('positions'), function(i, position){
                console.log(position);
                map[position] = 'free';
            });

            if (positions) {
                _.each(positions.opponent, function(i, position){
                    map[position] = 'opponent';
                });

                _.each(positions.me, function(i, position){
                    map[position] = 'me';
                });
            }

            console.log(map)
            return { map: map };
        },

        played: function() {
            return
            freePositions = _.difference(this.positions, positions.opponent);


            realCombinations = _.extends(freePositions, positions.me);
            combinationTotal = realCombinations.length

            indices = _.map(bestMoves, function(combinations, i) {
                differences = _(realCombinations).difference(combinations);

                if (combinationTotal - combinationTotal === 3) {
                    return i;
                }
            })


        }
    })

    API = {
        played: function(positions) {
            model = new Entities.Boot(positions, { parse: true })
            window.foo = model;
            return model.played()
        }
    };

    App.reqres.setHandler('played:boot:entity', function(positions) {
        return API.played(positions)
    });
});