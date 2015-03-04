this.VelhaMania.module('ModalsApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    Show.Controller = App.Controllers.Application.extend({
        initialize: function(options) {
            var _this = this;
            _this.layout = _this.getLayout();
            _this.options = options
            _this.model = new Backbone.Model(options);

            _this.listenTo(_this.layout, 'show', function() {
                _this.modalViewRegion();
            });

            App.modalRegion.show(_this.layout);
        },

        getLayout: function() {
            return new Show.Layout();
        },

        modalViewRegion: function() {
            var modalView = this.getModalView();

            this.listenTo(modalView, 'button:yes:clicked', function(args) {
                options = _.extend(this.options, { answered: true });
                App.execute('when:modal:answered', options);
            });

            this.listenTo(modalView, 'button:no:clicked', function(args) {
                options = _.extend(this.options, { answered: false });
                App.execute('when:modal:answered', options);
            });

            this.listenTo(modalView, 'button:yes:clicked button:no:clicked', function(args) {
                this.layout.destroy();
            });

            this.layout.modalRegion.show(modalView);
        },

        getModalView: function() {
            return new Show.ModalView({
                model: this.model
            })
        }
    });
});
