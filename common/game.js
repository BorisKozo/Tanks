define(["createjs"], function (createjs) {
    var game = {
        initialize: function (options) {
            this.stage = new createjs.Stage(options.canvasId);
        },
        stage: null
    }

    return game;
});