define(["createjs", "common/math"], function (createjs, math) {
    var Shell = function (options) {
        this.options = options;
    };

    Shell.prototype.getManifest = function () {
        return [];
    };

    Shell.prototype.initialize = function () {
        this.drawing = new createjs.Shape();
        this.angle = this.options.angle;
        this.drawing.x = this.options.x;
        this.drawing.y = this.options.y;
    };

    Shell.prototype.update = function () {
        var graphics = this.drawing.graphics.c().ss(1).s("red");
        graphics.dc(0, 0, 2).es();
        this.drawing.x += 0.5;

    };


    return Shell;
});