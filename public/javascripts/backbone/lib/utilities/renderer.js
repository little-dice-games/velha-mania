this.VelhaMania.module('Utilities', function(Utilities, App, Backbone, Marionette, $, _) {
    _.extend(Marionette.Renderer, {
        lookups: ['/javascripts/backbone/'],
        templates: {},

        render: function(templatePath, data) {
            if (!templatePath) { return }

            var path = this.getTemplate(templatePath);

            if (!path) {
                throw "Template " + templatePath + " not found!";
            }

            var templateString = this.getTemplate(templatePath)
            return _.template(templateString, data);
        },

        getTemplate: function(templatePath) {
            if ( !this.templates.templateCache ) {
                this.templates.templateCache = {};
            }

            if ( !this.templates.templateCache[templatePath] ) {
                $.each(this.lookups, function(i, root){
                    templateUrl = root + templatePath + '.us';

                    var _this = this;
                    $.ajax({
                        url: templateUrl,
                        method: 'GET',
                        async: false,
                        success: function(data) {
                           _this.templates.templateCache[templatePath] = templateString = data;
                        }
                    });
                }.bind(this));
            }

            return this.templates.templateCache[templatePath];
        }
    });
});