this.VelhaMania.module('BoardApp.Show', function (Show, App, Backbone, Marionette) {
    Show.LayoutView = Marionette.LayoutView.extend({
        template: 'board/show/templates/layout',
        className: 'board',
        regions: {
            boardRegion: '.board-region',
            turnRegion: '.turn-region'
        }
    });

    Show.TurnView = Marionette.ItemView.extend({
        template: 'board/show/templates/turn',
        className: function () {
            var className = 'turn';

            if (this.model && this.model.get('itsMe')) {
                className += ' is-my-turn';
            }

            return className;
        },

        templateHelpers: function (target) {
            var message = function message () {
                var message;

                if (target.itsMe) {
                    message = 'Sua Vez';
                } else {
                    message = 'Vez do ' + target.username;
                }

                return message
            };

            return {
                message: message()
            };
        }
    });

    Show.PositionView = Marionette.ItemView.extend({
        modelEvents: {
            'change:play': 'onPlayChanged'
        },

        render: function () {
            this.shape = new createjs.Shape();
            this.shape
                .graphics
                .beginFill('#155F8E')
                .drawRect(
                    this.model.get('x'),
                    this.model.get('y'),
                    this.model.get('width'),
                    this.model.get('height')
                );

            this.shape.addEventListener('click', function () {
                if (this.model.get('play') !== undefined) {
                    return;
                }

                this.triggerMethod('shape:clicked');
            }.bind(this));
        },

        onPlayChanged: function () {
            var url = this.model.get('play') === 'x' ?
                CanvasUtils.getSpriteX() :
                CanvasUtils.getSpriteO(),

                data = {
                    images: [url],
                    frames: {
                        width: 200,
                        height: 200
                    },
                    animations: {
                        end: 13,
                        start: [0, 13, 'end', 1]
                    }
                },

                sprite = new createjs.SpriteSheet(data),
                shape = new createjs.Sprite(sprite, 'start');

            this.triggerMethod('play', shape);
        }
    });

    Show.BoardView = Marionette.CollectionView.extend({
        childView: Show.PositionView,
        childEvents: {
            play: function (childView, shape) {
                shape.scaleX = 0.5;
                shape.scaleY = 0.5;
                shape.x = childView.model.get('x');
                shape.y = childView.model.get('y');
                this.stage.addChild(shape);
            }
        },

        attachHtml: function (collectionView, childView) {
            this.stage.addChild(childView.shape);
        },

        initialize: function () {
            CanvasUtils.loadManifest();
            this.stage = new createjs.Stage('game-board');
            createjs.Ticker.addEventListener('tick', this.onTick.bind(this));
        },

        onShow: function () {
            this.drawLines();
        },

        onTick: function (event) {
            this.stage.update(event);
        },

        drawLines: function () {
            this.stage.addChild(this.drawVerticalLines());
            this.stage.addChild(this.drawHorizontalLines());
        },

        drawVerticalLines: function () {
            var canvasWidth = CanvasUtils.width(),
                squareWidth = CanvasUtils.squareWidth(),

                verticalLines = new createjs.Shape(),
                startX = squareWidth + 0.5,
                x;

            verticalLines.graphics.setStrokeStyle(1);
            verticalLines.graphics.beginStroke('#000');

            for (x = startX; x < canvasWidth; x += squareWidth) {
                verticalLines.graphics.moveTo(x, 0);
                verticalLines.graphics.lineTo(x, canvasWidth);
            }

            verticalLines.graphics.endStroke();

            return verticalLines;
        },

        drawHorizontalLines: function () {
            var canvasHeight = CanvasUtils.height(),
                squareHeight = CanvasUtils.squareHeight(),

                horizontalLines = new createjs.Shape(),
                startY = squareHeight + 0.5,
                y;

            horizontalLines.graphics.setStrokeStyle(1);
            horizontalLines.graphics.beginStroke('#000');

            for (y = startY; y < canvasHeight; y += squareHeight) {
                horizontalLines.graphics.moveTo(0, y);
                horizontalLines.graphics.lineTo(canvasHeight, y);
            }

            horizontalLines.graphics.endStroke();

            return horizontalLines;
        }
    });
});