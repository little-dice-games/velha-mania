this.VelhaMania.module('UsersApp.List', function(List, App, Backbone, Marionette, $, _) {
    List.Layout = Marionette.LayoutView.extend({
        template: 'users/list/templates/layout',
        regions: {
            listRegion: '.list-region'
        }
    });

    List.UserView = Marionette.ItemView.extend({
        template: 'users/list/templates/user',
        tagName: 'li',
        className: 'user-item',
        triggers: {
            'click': 'user:clicked'
        },

        modelEvents: {
            'change:isPlaying' : 'visibleToggle'
        },

        visibleToggle: function() {
            if (this.model.isPlaying()) {
                this.$el.hide()
            } else {
                this.$el.show()
            }

            this.trigger('user:view:toggled');
        }
    });

    List.EmptyView = Marionette.ItemView.extend({
        template: 'users/list/templates/empty',
        className: 'user-item is-empty',
        tagName: 'li'
    });

    List.UsersView = Marionette.CollectionView.extend({
        childView: List.UserView,
        emptyView: List.EmptyView,
        className: 'user-list',
        tagName: 'ul',

        modelEvents: {
            'change:isPlaying': 'checkEmpty'
        },

        checkEmpty: function() {
            if (this.collection.isEmpty()) {
                this.showEmptyView();
            } else {
                // this.destroyEmptyView();
            }
        },

        addChild: function(child, ChildView, index){
            if (!child.itsMe()) {
                List.UsersView.__super__.addChild.call(this, child, ChildView, index);
            } else {
                this.checkEmpty();
            }
        }
    });
});
