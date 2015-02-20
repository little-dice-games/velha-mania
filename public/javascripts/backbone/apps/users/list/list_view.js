this.VelhaMania.module('UsersApp.List', function(List, App, Backbone, Marionette, $, _) {
    List.Layout = Marionette.LayoutView.extend({
        template: 'apps/users/list/templates/layout',
        regions: {
            listRegion: '.list-region'
        }
    });

    List.UserView = Marionette.ItemView.extend({
        template: 'apps/users/list/templates/user',
        className: 'user-item',
        tagName: 'li',
        triggers: {
            'click': 'user:clicked'
        }
    });

    List.EmptyView = Marionette.ItemView.extend({
        template: 'apps/users/list/templates/empty',
        className: 'user-item is-empty',
        tagName: 'li'
    });

    List.UsersView = Marionette.CollectionView.extend({
        childView: List.UserView,
        emptyView: List.EmptyView,
        className: 'user-list',
        tagName: 'ul',

        addChild: function(child, ChildView, index){
            if (!child.itsMe()) {
                List.UsersView.__super__.addChild.call(this, child, ChildView, index);
            }
        }
    });
});
