this.VelhaMania.module('BoardApp.Show', function (Show, App) {
    Show.Controller = App.Controllers.Application.extend({
        initialize: function (options) {
            this.options = options;
            this.layout = this.getLayout();

            this.listenTo(this.layout, 'show', function () {
                this.turnRegion();
                this.boardRegion();
            }.bind(this));

            this.listenTo(this.layout, 'canvas:sizes:setted', function() {
                console.log('--------------');
                // this.boardRegion();

                // this.boardRegion();
            }.bind(this));

            var users = App.request('user:entities');
            this.currentUser = App.request('user:entity');

            this.listenTo(users, 'change', function () {
                this.turnRegion();
            }.bind(this));

            App.mainRegion.show(this.layout);
        },

        getLayout: function () {
            return new Show.LayoutView();
        },

        turnRegion: function () {
            this.turn = App.request('user:entities').findWhere({ turn: true });
            this.turnView = this.getTurnView();
            this.layout.turnRegion.show(this.turnView);
        },

        boardRegion: function () {
            this.board = App.request('board:entities', this.options);
            this.boardView = this.getBoardView();

            this.listenTo(this.boardView, 'childview:shape:clicked', function (child) {
                if (this.currentUser.get('turn')) {
                    this.onShapeClicked(child.model);
                }
            }.bind(this));

            this.listenTo(this.board, 'game:end', function (args) {
                App.vent.trigger('show:game:end:modal', args);
                App.vent.trigger('game:end', args);
            });


            this.layout.boardRegion.show(this.boardView);
        },

        getBoardView: function () {
            return new Show.BoardView({ collection: this.board });
        },

        getTurnView: function () {
            return new Show.TurnView({ model: this.turn });
        },

        onShapeClicked: function (model) {
            model.set({
                play: this.currentUser.get('shape'),
                userId: this.currentUser.get('id')
            });

            App.vent.trigger('game:play', {
                position: model,
                play: this.currentUser.get('shape'),
                user: this.currentUser.get('id'),
                roomId: this.board.roomId
            });

            this.board.checkWin(this.currentUser.get('id'));
        }
    });
});