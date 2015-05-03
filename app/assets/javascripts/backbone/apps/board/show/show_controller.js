this.VelhaMania.module('BoardApp.Show', function(Show, App, Backbone, Marionette, $, _) {
    Show.Controller = App.Controllers.Application.extend({
        initialize: function(options) {
            this.options = options;
            this.layout = this.getLayout();
            this.listenTo(this.layout, 'show', function() {
                this.turnRegion();
                this.boardRegion();
            }.bind(this));

            var users = App.request('user:entities');
            this.currentUser = App.request('user:entity');

            this.listenTo(users, 'change', function() {
                this.turnRegion();
            }.bind(this));

            App.mainRegion.show(this.layout);
        },

        getLayout: function() {
            return new Show.LayoutView();
        },

        turnRegion: function() {
            if (this.bot && !this.currentUser.get('turn')) {
                this.turn = this.bot;
            } else {
                this.turn = App.request('user:entities').findWhere({ turn: true });
            }
            this.turnView = this.getTurnView();
            this.layout.turnRegion.show(this.turnView);
        },

        boardRegion: function() {
            this.board = App.request('board:entities', this.options);
            this.boardView = this.getBoardView();
            this.listenTo(this.boardView, 'childview:shape:clicked', function(child) {
                if (this.currentUser.get('turn')) {
                    this.onShapeClicked(child.model);
                }
            });
            this.listenTo(this.board, 'game:end', function(args) {
                App.vent.trigger('show:game:end:modal', args);
                App.vent.trigger('game:end', args);
            });
            this.layout.boardRegion.show(this.boardView);
        },

        getBoardView: function() {
            return new Show.BoardView({ collection: this.board });
        },

        getTurnView: function() {
            return new Show.TurnView({ model: this.turn });
        },

        onShapeClicked: function(model) {
            model.set({
                play: this.currentUser.get('shape'),
                userId: this.currentUser.get('id')
            });

            if (this.bot) {
                this.bot.set({ turn: true });
                this.botPlay();
            } else {
                App.vent.trigger('game:play', {
                    position: model,
                    play: this.currentUser.get('shape'),
                    user: this.currentUser.get('id'),
                    roomId: this.board.roomId
                });

                this.board.checkWin(this.currentUser.get('id'));
            }
        },

        initBot: function(options) {
            console.log('initBot ========== ', options);
            this.bot = App.request('bot:entity', {
                me: this.currentUser.get('id'),
                opponent: options.id,
                shape: options.shape,
                turn: options.turn,
                username: 'computador'
            });
            console.log('bot ================= ', this.bot.attributes);
            this.botPlay();
        },

        botPlay: function() {
            console.log('botPlay =========== ', this.bot.get('turn'));

            if (this.bot.get('turn')) {
                _.delay(function() {
                    var position = this.bot.play();
                    console.log('position =========== ', position);

                    if (position) {
                        position.set({
                            play: this.bot.get('shape'),
                            userId: this.bot.get('opponent')
                        });

                        this.bot.set({ turn: false });
                        this.currentUser.set({ turn: true });
                    }

                    this.board.checkWin(this.bot.get('opponent'));
                }.bind(this), 500);
            }
        }
    });
});