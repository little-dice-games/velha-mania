this.VelhaMania.module('Utilities', function (Utilities, App, Backbone, Marionette, $, _) {
    var API = {

        mixinTemplateHelpers: function (target) {
            var templateHelpers;

            if (this.templateHelpers) {
                templateHelpers = this.templateHelpers.call(this, target);
            }

            return _.extend(target, templateHelpers);
        },

        viewBase: function () {
            _.extend(Marionette.View.prototype, {
                mixinTemplateHelpers: API.mixinTemplateHelpers
            });
        }
    };

    Utilities.on('start', function () {
        API.viewBase();
    });
});