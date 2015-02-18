this.VelhaMania.module('HomeApp', function(HomeApp, App, Backbone, Marionette, $, _) {
  var API;

  HomeApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      '': 'home'
    },

    before: {
      '': function(route) {
        var user = App.request('user:entity');

        if (user.hasLogged()) {
          App.vent.trigger('users:visit');
        } else {
          App.vent.trigger('home:visit');
        }
      }
    },
  });

  API = {
    home: function() {
      new HomeApp.Show.Controller();
    }
  };

  HomeApp.on('start', function() {
    new HomeApp.Router({ controller: API });
  });

  App.vent.trigger('home:visit', function() {
    API.home();
  });
});
