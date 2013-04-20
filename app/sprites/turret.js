define(["require", "createjs", "common/math", "./aiming_guide"], function (require, createjs, math) {

    var AimingGuide = require("./aiming_guide");


    var Turret = function (options) {
        this.options = options.turret;
        this.aimingGuide = new AimingGuide(options);
    };

    Turret.prototype.initialize = function (assets) {
        this.turret = new createjs.Bitmap(assets[this.options.graphics.turret.id]);


        this.aimingGuide.initialize();

        this.drawing = new createjs.Container();
        this.drawing.addChild(this.turret, this.aimingGuide.drawing);

        this.drawing.regX = this.options.centerX;
        this.drawing.regY = this.options.centerY;

        this.aimingGuide.drawing.x = this.options.barrelEndX;
        this.aimingGuide.drawing.y = this.options.barrelEndY - 1;

        this.fireCounter = this.options.fireRate;
    };

    Turret.prototype.update = function (delta) {
        this.aimingGuide.update(delta);
        
    };

    Turret.prototype.rotateTurretRight = function () {
        this.drawing.rotation = math.incMod(this.drawing.rotation, this.options.rotationSpeed, 360);

        this.aimingGuide.rotateTurret();
    };

    Turret.prototype.rotateTurretLeft = function () {
        this.drawing.rotation = math.incMod(this.drawing.rotation, -this.options.rotationSpeed, 360);
        this.aimingGuide.rotateTurret();
    };

    Turret.prototype.rotateHull = function () {
        this.aimingGuide.rotateHull();
    };

    Turret.prototype.fire = function (options) {
        options.angle = math.incMod(options.angle, this.drawing.rotation, 360);
       
        var barrelEnd = this.drawing.localToGlobal(this.options.barrelEndX, this.options.barrelEndY - 1);
        options.x = barrelEnd.x;
        options.y = barrelEnd.y;

        return this.aimingGuide.fire(options);
    };

    return Turret;
});