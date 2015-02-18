this.VelhaMania.module('UsersApp.List', function(List, App, Backbone, Marionette, $, _) {
  List.Layout = Marionette.LayoutView.extend({
    template: 'apps/users/list/templates/layout',
    regions: {
      listRegion: '.list-region'
    }
  });

  List.UserView = Marionette.ItemView.extend({});

  List.UsersView = Marionette.CollectionView.extend({
    childView: List.UserView
  });
});
