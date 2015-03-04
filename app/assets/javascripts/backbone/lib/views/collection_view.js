var _showEmptyView = Marionette.CollectionView.prototype.showEmptyView;

_.extend(Marionette.CollectionView.prototype, {
    showEmptyView: function() {
        this.isShowedEmptyView = true;
        _showEmptyView.call(this);
    }
});