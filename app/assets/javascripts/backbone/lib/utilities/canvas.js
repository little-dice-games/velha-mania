window.CanvasUtils = (function () {
    CanvasUtils = {};

    CanvasUtils.ROWS = 3;
    CanvasUtils.COLUMNS = 3;

    CanvasUtils.loadManifest = function() {
        manifest = [
            { src: 'sprite-x.png', id: 'x' },
            { src: 'sprite-o.png', id: 'o' }
        ];

        this.loader = new createjs.LoadQueue(false);
        this.loader.addEventListener('complete', this.handleComplete.bind(this));
        this.loader.loadManifest(manifest, true, '/assets/');
    };

    CanvasUtils.handleComplete = function() {
        $(this).trigger('complete');
    };

    CanvasUtils.width = function () {
        return $('canvas').width();
    };

    CanvasUtils.height = function () {
        return $('canvas').height();
    };

    CanvasUtils.squareHeight = function () {
        return this.height() / CanvasUtils.ROWS;
    };

    CanvasUtils.squareWidth = function () {
        return this.width() / CanvasUtils.COLUMNS;
    };

    CanvasUtils.getSpriteX = function() {
        return this.loader.getResult('x');
    };

    CanvasUtils.getSpriteO = function() {
        return this.loader.getResult('o');
    };

    return CanvasUtils;
})();