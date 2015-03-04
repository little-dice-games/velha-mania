this.VelhaMania.module('ModalsApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    Show.Layout = Marionette.LayoutView.extend({
        template: 'modals/show/templates/layout',
        regions: {
            modalRegion: '.modal-region'
        }
    });

    Show.ModalView = Marionette.ItemView.extend({
        template: 'modals/show/templates/modal',
        className: 'modal',
        ui: {
            'buttonYes': '.modal-button--yes',
            'buttonNo': '.modal-button--no'
        },

        triggers: {
            'click @ui.buttonYes': 'button:yes:clicked',
            'click @ui.buttonNo': 'button:no:clicked'
        }
    });
});
