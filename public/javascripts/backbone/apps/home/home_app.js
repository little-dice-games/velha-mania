this.VelhaMania.module('HomeApp', function(HomeApp, App, Backbone, Marionette, $, _) {
  var API;

  HomeApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      '': 'home'
    },

    before: {
      '': function(route) {
        var user = App.request('user:entity');

        if (user && user.hasLogged()) {
          App.vent.trigger('users:visit');
        }
      }
    }
  });

  API = {
    home: function() {
      new HomeApp.Show.Controller();
      App.vent.trigger('visit')
    }
  };

  HomeApp.on('start', function() {
    new HomeApp.Router({ controller: API });
  });

  App.vent.on('home:visit', function() {
    API.home();
  });
});
