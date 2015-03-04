this.VelhaMania.module('ModalsApp', function(ModalsApp, App, Backbone, Marionette, $, _) {
    var controller = void 0;

    var API = {
        show: function(options) {
            controller = new ModalsApp.Show.Controller(options);
        },

        remove: function() {
            if (controller) { controller.destroy(); }
        }
    };

    App.vent.on('show:modal', function(options) {
        API.show(options)
    })

    App.vent.on('remove:modal', function() {
        API.remove()
    })
});
