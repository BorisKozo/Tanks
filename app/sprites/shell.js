define(["createjs", "common/math", "common/game"], function (createjs, math, game) {
    var Shell = function (options) {
        this.options = options;
        this.speedX = options.speed * Math.sin(math.degToRad(options.angle));
        this.speedY = options.speed * -Math.cos(math.degToRad(options.angle));
    };

    Shell.prototype.initialize = function () {
        this.drawing = new createjs.Shape();
        this.angle = this.options.angle;
        this.drawing.x = this.options.x;
        this.drawing.y = this.options.y;
    };

    Shell.prototype.update = function (delta) {
        var graphics = this.drawing.graphics.c().ss(1).s("red");
        graphics.dc(0, 0, 1).es();
        this.drawing.x += this.speedX;
        this.drawing.y += this.speedY;

        if (!game.bbox.contains(this.drawing.x, this.drawing.y)) {
            this.isDead = true;
        }
    };


    return Shell;
});