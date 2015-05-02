this.VelhaMania.module('ModalsApp.Show', function (Show, App, Backbone, Marionette, $, _) {
    Show.Controller = App.Controllers.Application.extend({
        initialize: function (options) {
            this.layout = this.getLayout();
            this.options = options;
            this.model = new Backbone.Model(options);

            this.listenTo(this.layout, 'show', function () {
                this.contentViewRegion();

                switch (this.options.type) {
                    case 'confirmation':
                        this.buttonsViewRegion();
                        break;
                    case 'information:load':
                        this.informationLoadViewRegion();
                        break;
                    case 'information':
                        this.informationViewRegion();
                        break;
                }
            }.bind(this));

            App.modalRegion.show(this.layout);
        },

        getLayout: function () {
            return new Show.Layout();
        },

        contentViewRegion: function () {
            this.layout.modalContentRegion.show(this.getContentView());
        },

        buttonsViewRegion: function () {
            var buttonsView = this.getButtonsView();

            this.listenTo(buttonsView, 'button:yes:clicked', function () {
                _.extend(this.options, { answered: true });
                App.execute('when:modal:answered', this.options);
            });

            this.listenTo(buttonsView, 'button:no:clicked', function () {
                _.extend(this.options, { answered: false });
                App.execute('when:modal:answered', this.options);
            });

            this.listenTo(buttonsView, 'button:yes:clicked button:no:clicked', function () {
                this.layout.destroy();
            });

            this.layout.modalFooterRegion.show(buttonsView);
        },

        informationLoadViewRegion: function () {
            this.layout.modalFooterRegion.show(this.getInformationLoadView());
        },

        informationViewRegion: function () {
            var informationView = this.getInformationView();

            this.listenTo(informationView, 'button:close:clicked', function () {
                this.destroy();
            }.bind(this));

            this.layout.modalFooterRegion.show(informationView);
        },

        getContentView: function () {
            return new Show.ContentView({
                model: this.model
            });
        },

        getButtonsView: function () {
            return new Show.ButtonsView();
        },

        getInformationLoadView: function () {
            return new Show.LoadView();
        },

        getInformationView: function () {
            return new Show.CloseButtonView();
        }
    });
});
