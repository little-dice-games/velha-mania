this.VelhaMania.module('NavigationApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    Show.Controller = App.Controllers.Application.extend({
        initialize: function() {
            var _this = this;
            _this.layout = _this.getLayout();

            _this.listenTo(_this.layout, 'show', function() {
                _this.logoRegion();
            });

            App.navRegion.show(_this.layout);
        },

        getLayout: function() {
            return new Show.Layout();
        },

        logoRegion: function() {
            this.layout.logoRegion.show(this.getLogoView());
        },

        getLogoView: function() {
            return new Show.LogoView();
        },

        unloggedViewRegion: function() {
            this.layout.navRegion.show(this.getUnloggedView());
        },

        getUnloggedView: function() {
            return new Show.UnloggedView();
        },

        loggedViewRegion: function() {
            this.user = App.request('user:entity');
            var loggedView = this.getLoggedView();

            this.listenTo(loggedView, 'logout:clicked', function() {
                App.request('logout:user:entity');
                App.vent.trigger('home:visit');
            });

            this.layout.navRegion.show(loggedView);
        },

        getLoggedView: function() {
            return new Show.LoggedView({
                model:this.user
            });
        }
    });
});