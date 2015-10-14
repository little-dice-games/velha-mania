this.VelhaMania.module('Utilities', function (Utilities, App, Backbone, Marionette, $, _) {
    var mixinKeywords = ['beforeIncluded', 'afterIncluded'],
        results = [],

        include = function () {
            var klass = this,
                objs =  arguments.length ? [].slice.call(arguments, 0) : [];

            $.each(objs, function (i, obj) {
                var concern = App.request('concern', obj),
                    ref = '',
                    beforeIncluded = concern.beforeIncluded,
                    afterIncluded = concern.afterIncluded;

                if (beforeIncluded) {
                    beforeIncluded.call(klass.prototype, klass, concern);
                }

                Cocktail.mixin(klass, (ref = _(concern).omit(ref, mixinKeywords)));

                if (afterIncluded) {
                    afterIncluded.call(klass.prototype, klass, concern);
                }
            });

            return klass;
        },

        modules = [{
            Marionette: ['ItemView', 'LayoutView', 'CollectionView', 'CompositeView']
        }, {
            Backbone: ['Model', 'Collection']
        }],

        includes = function (key, module) {
            $.each(module[key], function (i, klass) {
                var obj = window[key] || App[key];
                results.push(obj[klass].include = include);
            });
        };

    $.each(modules, function (i, module) {
        for (var key in module) {
            if (module.hasOwnProperty(key)) {
                includes(key, module);
            }
        }
    });

    return results;
});