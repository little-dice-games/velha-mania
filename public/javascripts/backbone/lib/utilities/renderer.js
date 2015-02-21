this.VelhaMania.module('Utilities', function(Utilities, App, Backbone, Marionette, $, _) {
    _.extend(Marionette.Renderer, {
        lookups: ['apps', 'components'],
        templates: {},

        render: function(template, data) {
            if (!template) { return }

            var path = this.getTemplate(template);

            if (!path) {
                throw "Template " + template + " not found!";
            } else {
                return path(data);
            }
        },

        getTemplate: function(template) {
            var templateFunction = ''

            $.each(this.lookups, function(i, lookup) {
                path = lookup + '/' + template;

                if (JST[path]) {
                    templateFunction = JST[path];
                }
            });

            return templateFunction;
        }

    });
});