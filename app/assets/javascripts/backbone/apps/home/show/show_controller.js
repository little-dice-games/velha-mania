this.VelhaMania.module('HomeApp.Show', function (Show, App) {
    Show.Controller = App.Controllers.Application.extend({
        initialize: function () {
            this.layout = this.getLayout();

            this.listenTo(this.layout, 'show', function () {
                this.formViewRegion();
            }.bind(this));

            App.mainRegion.show(this.layout);
        },

        getLayout: function () {
            return new Show.Layout();
        },

        formViewRegion: function () {
            var view = this.getFormView();

            this.listenTo(view, 'form:submited', function (data) {
                App.request('new:user:entity', data.email);
                App.vent.trigger('users:visit');
            });

            this.layout.formRegion.show(view);
        },

        getFormView: function () {
            return new Show.FormView();
        }
    });
});
