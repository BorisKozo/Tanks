define(["createjs", "./shapes"], function (createjs, shapes) {
    var game = {
        initialize: function (options) {
            this.stage = new createjs.Stage(options.canvasId);
            this.width = this.stage.canvas.width;
            this.height = this.stage.canvas.height;
            this.bbox = new shapes.Rect({ x: 0, y: 0, width: this.width, height: this.height });
        }
    };

    return game;
});