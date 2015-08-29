this.VelhaMania.module('BoardApp.Show', function (Show, App, Backbone, Marionette) {
    Show.LayoutView = Marionette.LayoutView.extend({
        $window: $(window),
        template: 'board/show/templates/layout',
        className: 'board',

        regions: {
            boardRegion: 'canvas#board-canvas',
            turnRegion: '.turn-region'
        },

        templateHelpers: function () {
            var height = this.$window.height();
            var width = this.$window.width();
            var realSize;

            if (width <= height) {
                var newWidth = (width * 75) / 100;

                realSize = {
                    width: newWidth,
                    height: newWidth
                }
            } else {
                var newHeight = (height * 75) / 100;

                realSize = {
                    width: newHeight,
                    height: newHeight
                }
            }

            this.realSize = realSize;
            return realSize;
        }
    });

    Show.TurnView = Marionette.ItemView.extend({
        template: 'board/show/templates/turn',
        className: function () {
            var className = 'board-turn';

            if (this.model && this.model.get('itsMe')) {
                className += ' is-my-turn';
            }

            return className;
        },

        templateHelpers: function (target) {
            var message = function () {
                var text;

                if (target.itsMe) {
                    text = 'Sua Vez';
                } else {
                    text = 'Vez do ' + target.username;
                }

                return text;
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

                var positionSize = this.stage.canvas.width / 3;
                var position;

                if (positionSize > 100) {
                    position = (positionSize - 100) / 2
                } else {
                    position = 0
                }

                shape.x = childView.model.get('x') + position;
                shape.y = childView.model.get('y') + position;
                this.stage.addChild(shape);
            }
        },

        attachHtml: function (collectionView, childView) {
            this.stage.addChild(childView.shape);
        },

        initialize: function () {
            CanvasUtils.loadManifest();
            this.stage = new createjs.Stage('board-canvas');
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