this.VelhaMania.module('UsersApp.List', function(List, App, Backbone, Marionette, $, _) {
    List.Controller = App.Controllers.Application.extend({
        initialize: function() {
            this.layout = this.getLayout();
            this.users = App.request('users:entity');

            var _this = this;
                _this.listenTo(_this.layout, 'show', function() {
                _this.usersViewRegion();
            });

            App.mainRegion.show(this.layout);
        },

        getLayout: function() {
            return new List.Layout();
        },

        usersViewRegion: function() {
            var usersView = this.getUsersView();

            this.listenTo(usersView, 'childview:user:clicked', function(child, b, c) {
                console.log('clicked ', child, b, c)
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
