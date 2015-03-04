this.VelhaMania.module('Utilities', function(Utilities, App, Backbone, Marionette, $, _) {
    var API = {
        navigate: function(route, options) {
            if (_.isNull(options)) {
                options = {};
            }

            Backbone.history.navigate(this.urlFor(route), options);
        },

        getCurrentRoute: function() {
            var frag = Backbone.history.fragment;

            if (_.isEmpty(frag)) {
                return null;
            } else {
                return frag;
            }
        },

        urlFor: function(route) {
            if (_.isNull(route)) {
                route = '/';
            }

            if (route.slice(0) !== '/') {
                route = "/" + route;
            }

            if (route.slice(-1) !== '/') {
                route = route + "/";
            }

            return route.replace(/\/\//g, '/');
        },

        startHistory: function() {
            if (Backbone.history) {
                return Backbone.history.start({ pushState: true });
            }
        },

        navigation: function(path, options) {
            var path = path ? path : '/';

            setTimeout(function() {
                App.navigate(App.urlFor(path), options);
            }, 1)
        },

        start: function() {
            _.extend(App, {
                navigate: API.navigate,
                getCurrentRoute: API.getCurrentRoute,
                urlFor: API.urlFor,
                startHistory: API.startHistory
            });
        }
    }

    Utilities.on('start', function() {
        API.start();
    })

    App.vent.on('visit', function(path, options) {
        API.navigation(path, options);
    });
});