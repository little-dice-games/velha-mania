this.VelhaMania.module('LoginApp', function(LoginApp, App, Backbone, Marionette, $, _) {
  var API;

  LoginApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'login/': 'login'
    }
  });

  API = {
    login: function() {
      App.navigate('login');
      new LoginApp.Show.Controller();
    }
  };

  LoginApp.on('start', function() {
    new LoginApp.Router({ controller: API });
    API.login();
  });
});
