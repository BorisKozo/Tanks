define(["require", "createjs"], function (require, createjs) {


    var Hull = function (options) {
        this.options = options.hull;
    };

    Hull.prototype.initialize = function (assets) {
        this.drawing = new createjs.Bitmap(assets[this.options.graphics.hull.id]);
    };

    Hull.prototype.update = function (delta) {
    };

    return Hull;
});