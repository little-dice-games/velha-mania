window.CanvasUtils = (function() {
    CanvasUtils = {};

    CanvasUtils.ROWS = 3;
    CanvasUtils.COLUMNS = 3;

    CanvasUtils.width = function() {
        return $('canvas').width();
    };

    CanvasUtils.height = function() {
        return $('canvas').height();
    };

    CanvasUtils.squareHeight = function() {
        return this.height() / CanvasUtils.ROWS;
    };

    CanvasUtils.squareWidth = function() {
        return this.width() / CanvasUtils.COLUMNS;
    };

    return CanvasUtils;
})();