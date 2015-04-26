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

    App.vent.on('show:confirmation:modal', function(options) {
        _.extend(options, { type: 'confirmation' });
        API.show(options)
    });

    App.vent.on('show:information:modal:load', function(options) {
        _.extend(options, { type: 'information:load' });
        API.show(options)
    });

    App.vent.on('show:information:modal', function(options) {
        _.extend(options, { type: 'information' });
        API.show(options)
    });

    App.vent.on('remove:modal', function() {
        API.remove()
    })
});
