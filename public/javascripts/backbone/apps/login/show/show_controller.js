this.VelhaMania.module('LoginApp.Show', function(Show, App, Backbone, Marionette, $, _) {
  Show.Controller = App.Controllers.Application.extend({
    initialize: function() {
      this.layout = this.getLayout();

      var _this = this;
      _this.listenTo(_this.layout, 'show', function() {
        _this.formViewRegion();
      });

      App.mainRegion.show(this.layout);
    },

    getLayout: function() {
      return new Show.Layout();
    },

    formViewRegion: function() {
      var view = this.getFormView();

      this.listenTo(view, 'form:submited', function(data) {
        console.log(data, '-- controller --');
      });

      this.layout.formRegion.show(view);
    },

    getFormView: function() {
      return new Show.FormView()
    }
  });
});
