this.VelhaMania.module('NavigationApp.Show', function (Show, App, Backbone, Marionette) {
    Show.Layout = Marionette.LayoutView.extend({
        template: 'navigation/show/templates/layout',
        className: 'nav-wrapper',
        regions: {
            logoRegion: '.logo-region',
            navRegion: '.nav-region'
        }
    });

    Show.LogoView = Marionette.ItemView.extend({
        template: 'navigation/show/templates/logo'
    });

    Show.LoggedView = Marionette.ItemView.extend({
        template: 'navigation/show/templates/logged',
        ui: {
            logoutButton: '.nav-logout',
            buttonCollapse: '.button-collapse'
        },
        triggers: {
            'click @ui.logoutButton' : 'logout:clicked'
        },
        onShow: function () {
            this.ui.buttonCollapse.sideNav();
        }
    });

    Show.UnloggedView = Marionette.ItemView.extend({
        template: 'navigation/show/templates/unlogged'
    });
});
