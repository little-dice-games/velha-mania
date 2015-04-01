this.VelhaMania.module('ModalsApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    Show.Layout = Marionette.LayoutView.extend({
        template: 'modals/show/templates/layout',
        className: 'modal',
        regions: {
            modalContentRegion: '.modal-content-region',
            modalFooterRegion: '.modal-footer-region'
        },

        onShow: function() {
            this.$el.openModal({
                dismissible: false
            });
        },

        onDestroy: function() {
            this.$el.closeModal();
        }
    });

    Show.ContentView = Marionette.ItemView.extend({
        template: 'modals/show/templates/content',
        className: 'modal-content'
    });

    Show.ButtonsView = Marionette.ItemView.extend({
        template: 'modals/show/templates/buttons',
        className: 'modal-footer',
        ui: {
            'buttonYes': '.modal-button--yes',
            'buttonNo': '.modal-button--no'
        },

        triggers: {
            'click @ui.buttonYes': 'button:yes:clicked',
            'click @ui.buttonNo': 'button:no:clicked'
        }
    });

    Show.LoadView = Marionette.ItemView.extend({
        template: 'modals/show/templates/load',
        className: 'modal-footer'
    });
});
