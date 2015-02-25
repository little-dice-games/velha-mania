this.VelhaMania.module('ModalsApp', function(ModalsApp, App, Backbone, Marionette, $, _) {
    var API = {
        show: function(options) {
            new ModalsApp.Show.Controller(options);
        }
    };

    App.vent.on('show:modal', function(options) {
        API.show(options)
    })
});
