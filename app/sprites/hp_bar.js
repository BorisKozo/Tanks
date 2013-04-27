define(["createjs"], function (createjs) {

    var HpBar = function (options) {
        this.options = options;
    };

    HpBar.prototype.initialize = function (assets) {
        this.drawing = new createjs.Shape();
        this.hp = 1;
    };

    HpBar.prototype.update = function (delta) {
        var graphics = this.drawing.graphics;
        graphics.c().ss(1).s("Azure").r(0, 0, 26, 4).es(); //The frame

        graphics.ss(2);
        if (this.hp > 0.75){
            graphics.s("green");
        }
        else {
            if (this.hp>0.25){
                graphics.s("yellow");
            } else {
                graphics.s("red");
            }

        }
        graphics.mt(1, 2).lt(25 * this.hp, 2).es();
    };

    return HpBar;
});