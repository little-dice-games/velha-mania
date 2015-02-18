this.VelhaMania.module('Components.ToolTip', function(Show, App, Backbone, Marionette, $, _) {
  Show.TipView = Marionette.ItemView.extend({
    className: 'message',
    attributes: function() {
      text: this.model.get('message')
    },
    template: 'lib/components/tooltip/templates/tip',

    initialize: function() {
      this.render();
    }
  });
});
