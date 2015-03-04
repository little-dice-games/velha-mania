console.log('foo')
_.extend(Marionette.CollectionView.prototype, {
    showEmptyView: function() {
        console.log('extends')
        this.isShowedEmptyView = true;
        return Marionette.CollectionView.prototype.showEmptyView;
    }
});