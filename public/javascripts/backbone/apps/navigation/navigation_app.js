this.VelhaMania.module('NavigationApp', function(NavigationApp, App, Backbone, Marionette, $, _) {
    var controller = void 0;

    var API = {
        getController: function() {
            if (controller == null) {
               controller = new NavigationApp.Show.Controller();
            }

            return controller;
        },

        logged: function() {
            this.getController().loggedViewRegion()
        },

        unlogged: function() {
            this.getController().unloggedViewRegion()
        }
    };

    NavigationApp.on('start', function() {
        API.unlogged();
    });

    App.vent.on('user:logged', function() {
        API.logged();
    });

    App.vent.on('user:unlogged', function() {
        API.unlogged();
    });
});
