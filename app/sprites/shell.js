define(["createjs", "common/math"], function (createjs, math) {
    var Shell = function (options) {
        this.options = options;
        this.speedX = Math.sin(math.degToRad(options.angle));
        this.speedY = -Math.cos(math.degToRad(options.angle));
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
        graphics.dc(0, 0, 1).es();
        this.drawing.x += this.speedX;
        this.drawing.y += this.speedY;
        

    };


    return Shell;
});