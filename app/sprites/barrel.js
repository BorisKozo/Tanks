define(["require", "createjs", "common/math"], function (require, createjs, math) {

    var Barrel = function (options) {
        this.options = options;
        var spriteSheet = new createjs.SpriteSheet(this.options.explosion);
        this.animation = new createjs.BitmapAnimation(spriteSheet);
    };

    Barrel.prototype.getManifest = function () {
        var result = [];
        result.push(this.options.graphics);
        return result;
    };

    Barrel.prototype.initialize = function (assets) {
        this.barrelImage = new createjs.Bitmap(assets[this.options.graphics.id]);
        this.drawing = new createjs.Container();
        this.drawing.addChild(this.barrelImage);

        this.drawing.x = this.options.initialPositionX;
        this.drawing.y = this.options.initialPositionY;

        this.animation.x = this.options.initialPositionX;
        this.animation.y = this.options.initialPositionY;
    };

    Barrel.prototype.update = function (delta) {
    };

    Barrel.prototype.intersectWithMe = function (shell) {
        if(math.distance(this.drawing.x, this.drawing.y,
                         shell.drawing.x, shell.drawing.y) < this.options.radius ){
            this.explode();
        }
    };

    Barrel.prototype.explode = function () {
        this.animation.play("explode");
        var _this = this;
        this.animation.addEventListener("animationend", function () {
            _this.animation.stop();
        });
        return this.animation;
    };

    return Barrel;
});