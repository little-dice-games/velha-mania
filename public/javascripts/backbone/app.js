this.VelhaMania = (function(Backbone, Marionette) {
  var App = new Marionette.Application;
  App.addRegions({
    mainRegion: '.main-region'
  });

  App.addInitializer(function() {
    App.module('LoginApp').start();
  });

  App.reqres.setHandler('concern', function(concern) {
    App.Concerns[concern];
  });

  App.on('start', function() {
    this.startHistory();
  });

  return App;
})(Backbone, Marionette);
