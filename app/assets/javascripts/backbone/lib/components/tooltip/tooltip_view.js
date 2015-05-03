this.VelhaMania.module('Components.ToolTip', function (Show, App, Backbone, Marionette) {
    Show.TipView = Marionette.ItemView.extend({
        className: 'message',
        template: 'tooltip/templates/tip',
        attributes: function () {
            return {
                text: this.model.get('message')
            };
        },

        initialize: function () {
            this.render();
        }
    });
});
