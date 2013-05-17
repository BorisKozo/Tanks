define(["require", "createjs", "common/math", "common/state_manager", "./explosion"],
    function (require, createjs, math, stateManager) {

    var Explosion = require("./explosion");

    var Barrel = function (options) {
        this.options = options;
        this.radius = options.radius;
        this.explosion = new Explosion(options.explosion);
    };

    Barrel.prototype.initialize = function (assets) {
        this.drawing = new createjs.Bitmap(assets[this.options.graphics.barrel.id]);
        this.explosion.initialize(assets);
    };

    Barrel.prototype.update = function (delta) {

        var location = this.drawing.localToGlobal(this.options.centerX, this.options.centerY);
        this.centerX = location.x;
        this.centerY = location.y;
    };

    Barrel.prototype.afterCollision = function (other) {
        if (other.type === "shell") {
            this.isDead = true;
            this.explosion.drawing.x = this.centerX;
            this.explosion.drawing.y = this.centerY;
            this.explosion.explode();
            stateManager.activeState.addEffect(this.explosion);
        }
    };

    Barrel.prototype.type = "barrel";

    return Barrel;
});