this.VelhaMania.module('UsersApp', function(UsersApp, App, Backbone, Marionette, $, _) {
  var API;

  UsersApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'users/': 'users'
    }
  });

  API = {
    users: function() {
      new UsersApp.List.Controller();
      console.log('user:visited')
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
