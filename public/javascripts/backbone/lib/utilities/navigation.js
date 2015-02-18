this.VelhaMania.module('Utilities', function(Utilities, App, Backbone, Marionette, $, _) {
  _.extend(App, {
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
    }
  });

  var API = {
    navigate: function(path, options) {
      var path = App.urlFor(path);

      setTimeout(function() {
        App.navigate(path, options);
      }, 1)
    }
  };

  App.vent.on('visit', function(path, options) {
    API.navigate(path, options);
  });
});