this.VelhaMania.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
    var API;

    Entities.Boot = Backbone.Model.extend({
    })

    API = {
        played: function(positions) {

        }
    };

    App.reqres.setHandler('played:boot:entity', function(positions) {
        API.played(positions)
    });
});