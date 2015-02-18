this.VelhaMania.module('Components.ToolTip', function(ToolTip, App, Backbone, Marionette, $, _) {
  ToolTip.Controller = App.Controllers.Application.extend({
    initialize: function(options) {
      this.options = options;
      this.layout = this.getToolTipView();
      return this.layout;
    },

    getToolTipView: function() {
      return new ToolTip.TipView({
        model: new Backbone.Model({ message: this.options.message }),
        el: '.' + this.options.el
      })
    }
  });

  App.reqres.setHandler('tooltip:wrapper', function(options) {
    return new ToolTip.Controller(options)
  })
});
