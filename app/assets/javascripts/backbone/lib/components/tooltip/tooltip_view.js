this.VelhaMania.module('Components.ToolTip', function(Show, App, Backbone, Marionette, $, _) {
    Show.TipView = Marionette.ItemView.extend({
        className: 'message',
        template: 'tooltip/templates/tip',
        attributes: function() {
            text: this.model.get('message')
        },

        initialize: function() {
            this.render();
        }
    });
});
