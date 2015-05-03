this.VelhaMania.module('HomeApp', function (HomeApp, App, Backbone, Marionette) {
    var API;

    HomeApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            '': 'home'
        },

        before: {
            '': function () {
                var user = App.request('user:entity');

                if (user && user.hasLogged()) {
                    App.vent.trigger('users:visit');
                    return false;
                }
            }
        }
    });

    API = {
        home: function () {
            App.vent.trigger('visit');
            App.vent.trigger('user:unlogged');

            return new HomeApp.Show.Controller();
        }
    };

    HomeApp.on('start', function () {
        return new HomeApp.Router({ controller: API });
    });

    App.vent.on('home:visit', function () {
        API.home();
    });
});
