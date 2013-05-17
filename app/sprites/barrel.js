define(["require", "createjs", "common/math", "./explosion"], function (require, createjs, math) {

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

    Barrel.prototype.type = "barrel";

    return Barrel;
});