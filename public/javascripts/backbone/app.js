this.VelhaMania = (function(Backbone, Marionette) {
    var App = new Marionette.Application;
    App.addRegions({
        mainRegion: '.main-region',
        navRegion: '.nav-region',
        modalRegion: '.modal-region'
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
    });

    return App;
})(Backbone, Marionette);
