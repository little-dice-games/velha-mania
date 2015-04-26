this.VelhaMania.module('ModalsApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    Show.Controller = App.Controllers.Application.extend({
        initialize: function(options) {
            var _this = this;
            _this.layout = _this.getLayout();
            _this.options = options
            _this.model = new Backbone.Model(options);

            _this.listenTo(_this.layout, 'show', function() {
                _this.contentViewRegion();

                if (_this.options.type === 'confirmation') {
                    _this.buttonsViewRegion();
                }

                if (_this.options.type === 'information:load') {
                    _this.informationLoadViewRegion();
                }

                if (_this.options.type === 'information') {
                    _this.informationViewRegion();
                }
            });

            App.modalRegion.show(_this.layout);
        },

        getLayout: function() {
            return new Show.Layout();
        },

        contentViewRegion: function() {
            this.layout.modalContentRegion.show(this.getContentView());
        },

        buttonsViewRegion: function() {
            var buttonsView = this.getButtonsView();

            this.listenTo(buttonsView, 'button:yes:clicked', function(args) {
                _.extend(this.options, { answered: true });
                App.execute('when:modal:answered', this.options);
            });

            this.listenTo(buttonsView, 'button:no:clicked', function(args) {
                _.extend(this.options, { answered: false });
                App.execute('when:modal:answered', this.options);
            });

            this.listenTo(buttonsView, 'button:yes:clicked button:no:clicked', function(args) {
                this.layout.destroy();
            });

            this.layout.modalFooterRegion.show(buttonsView);
        },

        informationLoadViewRegion: function() {
            this.layout.modalFooterRegion.show(this.getInformationLoadView());
        },

        informationViewRegion: function() {
            var informationView = this.getInformationView();

            this.listenTo(informationView, 'button:close:clicked', function(args) {
                this.destroy();
            }.bind(this));

            this.layout.modalFooterRegion.show(informationView);
        },

        getContentView: function() {
            return new Show.ContentView({
                model: this.model
            })
        },

        getButtonsView: function() {
            return new Show.ButtonsView()
        },

        getInformationLoadView: function() {
            return new Show.LoadView()
        },

        getInformationView: function() {
            return new Show.CloseButtonView();
        }
    });
});
