this.VelhaMania.module('Behaviors', function(Behaviors, App, Backbone, Marionette, $, _) {
  Behaviors.Form = Marionette.Behavior.extend({
    errorWrapperName: 'tooltip',

    onShow: function() {
      this.listeningToEvents();
    },

    listeningToEvents: function() {
      this.view.onSubmitFail = function(errors) {
        $.each(errors, function(i, error) {
          this.appendError(error.el, _.first(error.error));
        }.bind(this));
      }.bind(this);

      this.view.onSubmit = function(e) {
        e.preventDefault();
        this.clear();
        this.view.trigger('form:submited', this.view.serializeFormData())
      }.bind(this);
    },

    appendError: function(el, message) {
        this.clear();
        $('<div>', { class: this.errorWrapperName }).insertAfter(el);

        this.tooltip = App.request('tooltip:wrapper', {
          el: this.errorWrapperName,
          message: message
        });
    },

    clear: function() {
      if (this.tooltip) {
        this.tooltip.destroy();
      }
    }
  });
});