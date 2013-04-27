define(["require", "createjs", "common/math"], function (require, createjs, math) {

    var Barrel = function (options) {
        this.options = options;
        this.exploding = false;
    };

    Barrel.prototype.initialize = function (assets) {
        this.barrelImage = new createjs.Bitmap(assets[this.options.graphics.barrel.id]);
        this.drawing = new createjs.Container();
        this.drawing.addChild(this.barrelImage);

        var data = {};
        data.images = [assets[this.options.explosion.graphics.fireExplosion.id]];
        data.animations = this.options.explosion.animations;
        data.frames = this.options.explosion.frames;
        var spriteSheet = new createjs.SpriteSheet(data);
        this.animation = new createjs.BitmapAnimation(spriteSheet);

        this.drawing.x = this.options.initialPositionX - this.options.centerX;
        this.drawing.y = this.options.initialPositionY - this.options.centerY;

        this.animation.x = this.options.initialPositionX - this.options.explosion.frames.width / 2;
        this.animation.y = this.options.initialPositionY - this.options.explosion.frames.height / 2;
        this.animation.vX = 5;

        this.explosionSound = createjs.Sound.createInstance(this.options.explosion.sounds.explosion.id);
    };

    Barrel.prototype.update = function (delta) {
    };

    Barrel.prototype.intersectWithMe = function (gameEntity) {
        if (math.distance(this.options.initialPositionX, this.options.initialPositionY,
            gameEntity.drawing.x, gameEntity.drawing.y) < (this.options.radius + gameEntity.options.radius)) {

            return true;
        }

        return false;
    };

    Barrel.prototype.collide = function (gameEntity) {
        if (!this.exploding) {
            this.isDead = true;
            gameEntity.isDead = true;

            return [this.explode()];
        }
        return [];
    };

    Barrel.prototype.explode = function () {
        this.animation.gotoAndPlay("explode");
        this.explosionSound.play();
        this.exploding = true;
        var _this = this;
        this.animation.addEventListener("animationend", function () {
            _this.animation.stop();
            //TODO: need to remove the animation from the stage.
        });
        return this.animation;
    };

    return Barrel;
});