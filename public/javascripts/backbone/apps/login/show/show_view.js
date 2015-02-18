this.VelhaMania.module('LoginApp.Show', function(Show, App, Backbone, Marionette, $, _) {
  Show.Layout = Marionette.LayoutView.extend({
    template: 'apps/login/show/templates/layout',
    regions: {
      formRegion: '.form-region'
    }
  });

  Show.FormView = Marionette.FormView.extend({
    className: 'login',
    template: 'apps/login/show/templates/login',
    behaviors: {
      "Form": {}
    },
    fields: {
        name: {
            el: '.name',
            required: "Preencha seu nome",
            validations: {
                alphanum: "Seu nome so pode conter números e letras."
            }
        }
    }
  });
});
