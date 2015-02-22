this.VelhaMania.module('UsersApp.List', function(List, App, Backbone, Marionette, $, _) {
    List.Controller = App.Controllers.Application.extend({
        initialize: function() {
            var _this = this;
            _this.layout = _this.getLayout();
            _this.users = App.request('users:entity');

            _this.listenTo(_this.layout, 'show', function() {
                _this.usersViewRegion();
            });

            App.mainRegion.show(_this.layout);
        },

        getLayout: function() {
            return new List.Layout();
        },

        usersViewRegion: function() {
            var usersView = this.getUsersView();

            this.listenTo(usersView, 'childview:user:clicked', function(child, b, c) {
                App.request('invite:game:entity', child.model);
            });

            this.layout.listRegion.show(usersView);
        },

        getUsersView: function() {
            return new List.UsersView({
                collection: this.users
            })
        }
    });
});
