this.VelhaMania.module('UsersApp', function(UsersApp, App, Backbone, Marionette, $, _) {
  var API;

  UsersApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'users/': 'users'
    },

    after: {
      'users/': function(route) {
        var user = App.request('user:entity');

        if (!user) {
          App.vent.trigger('home:visit');
        }
      }
    }
  });

  API = {
    users: function() {
      new UsersApp.List.Controller();
      App.vent.trigger('visit', 'users')
    }
  };

  UsersApp.on('start', function() {
    new UsersApp.Router({ controller: API });
  });

  App.vent.on('users:visit', function() {
    API.users();
  });
});
