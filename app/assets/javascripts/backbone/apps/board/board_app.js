this.VelhaMania.module('BoardApp', function (BoardApp, App, Backbone, Marionette) {
    var API;

    BoardApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            'play/': 'play'
        }
    });

    API = {
        play: function () {
            App.vent.trigger('users:visit');
            return false;
        },

        show: function (options) {
            this.controller = new BoardApp.Show.Controller(options);
        },

        close: function () {
            if (this.controller) {
                this.controller.destroy();
            }
        }
    };

    BoardApp.on('start', function () {
        return new BoardApp.Router({ controller: API });
    });

    App.vent.on('game:start', function (options) {
        App.vent.trigger('visit', 'play', { trigger: false });
        App.vent.trigger('reset:board:entities');
        API.show(options);
    });

    App.vent.on('game:close', function () {
        API.close();
    });
});