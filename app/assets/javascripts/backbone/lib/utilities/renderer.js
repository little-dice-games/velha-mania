this.VelhaMania.module('Utilities', function (Utilities, App, Backbone, Marionette, $, _) {
    var API = {
        lookups: function () {
            return ['backbone/apps', 'backbone/lib/components'];
        },

        render: function (template, data) {
            if (!template) {
                return;
            }

            var path = API.getTemplate(template);

            if (!path) {
                throw 'Template ' + template + ' not found!';
            } else {
                return path(data);
            }
        },

        getTemplate: function (template) {
            var templateFunction = '';

            $.each(API.lookups(), function (i, lookup) {
                var path = lookup + '/' + template;
                if (JST[path]) {
                    templateFunction = JST[path];
                }
            });

            return templateFunction;
        },

        renderer: function () {
            _.extend(Marionette.Renderer, { render: API.render });
        }
    };

    Utilities.on('start', function () {
        API.renderer();
    });
});