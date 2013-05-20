define(["createjs", "common/math", "common/game"], function (createjs, math, game) {
    var Explosion = function (options) {
        this.options = options;
    };

    Explosion.prototype.initialize = function (assets) {
        var data = {};
        data.images = [assets[this.options.graphics.fireExplosion.id]];
        data.animations = this.options.animations;
        data.frames = this.options.frames;
        var spriteSheet = new createjs.SpriteSheet(data);
        this.drawing = new createjs.BitmapAnimation(spriteSheet);

        //this.drawing.x = this.options.centerX;
        //this.drawing.y = this.options.centerY;

        //this.animation.x =this.options.frames.width / 2;
        //this.animation.y = this.options.frames.height / 2;
        //this.animation.vX = 5;

        this.explosionSound = createjs.Sound.createInstance(this.options.sounds.explosion.id);
    };

    Explosion.prototype.update = function (delta) {

    };

    Explosion.prototype.explode = function () {
        this.drawing.gotoAndPlay("explode");
        this.explosionSound.play();
        this.exploding = true;
        var _this = this;
        this.drawing.addEventListener("animationend", function () {
            _this.drawing.stop();
            _this.isDead = true;
        });
    };

    return Explosion;
});