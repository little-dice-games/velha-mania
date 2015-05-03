this.VelhaMania.module('UsersApp', function (UsersApp, App, Backbone, Marionette) {
    var API;

    UsersApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'users/': 'users'
        },

        before: {
            'users/': function () {
                var user = App.request('user:entity');

                if (!user) {
                    App.vent.trigger('home:visit');
                    return false;
                }
            }
        }
    });

    API = {
        users: function () {
            var userAppList = new UsersApp.List.Controller();
            App.vent.trigger('visit', 'users');
            App.vent.trigger('user:logged');

            return userAppList;
        }
    };

    UsersApp.on('start', function () {
        var userAppRouter = new UsersApp.Router({ controller: API });
        return userAppRouter;
    });

    App.vent.on('users:visit', function () {
        API.users();
    });
});
