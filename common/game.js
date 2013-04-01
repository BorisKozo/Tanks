define(["easel"], function (createjs) {
    var game = {
        start: function (options) {
            this.stage = new createjs.Stage(options.canvasId);
        },
        stage: null
    }

    return game;
});