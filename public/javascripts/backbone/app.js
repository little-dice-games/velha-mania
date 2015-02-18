this.VelhaMania = (function(Backbone, Marionette) {
  var App = new Marionette.Application;
  App.addRegions({
    mainRegion: '.main-region'
  });

  App.addInitializer(function() {
    App.module('HomeApp').start();
    App.module('UsersApp').start();
  });

  App.reqres.setHandler('concern', function(concern) {
    App.Concerns[concern];
  });

  App.on('start', function() {
    this.startHistory();

    io = io.connect()

    io.emit('ready')

    io.on('talk', function(data) {
        console.warn(data.message)
    })
  });

  return App;
})(Backbone, Marionette);
