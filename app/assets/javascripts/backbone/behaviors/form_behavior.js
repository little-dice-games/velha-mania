this.VelhaMania.module('Behaviors', function (Behaviors, App, Backbone, Marionette, $, _) {
    Behaviors.Form = Marionette.Behavior.extend({
        errorWrapperName: 'tooltip',

        onShow: function () {
            this.listeningToEvents();
        },

        listeningToEvents: function () {
            this.view.onSubmitFail = function (errors) {
                $.each(errors, function (i, error) {
                    this.addInvalidClass(this.$el.find(error.el));
                    toast(_.first(error.error), 8000);
                }.bind(this));
            }.bind(this);

            this.view.onSubmit = function (e) {
                e.preventDefault();
                this.view.trigger('form:submited', this.view.serializeFormData());
            }.bind(this);
        },

        addInvalidClass: function (el) {
            this.removeInvalidClass(el);
            el.prev().addClass('is-invalid');
            el.addClass('is-invalid');
        },

        removeInvalidClass: function (el) {
            el.removeClass('is-invalid');
            el.prev().removeClass('is-invalid');
        }
    });
});