define(["require", "createjs", "common/math", "./hull", "./turret","./hp_bar"], function (require, createjs, math) {

    var Hull = require("./hull");
    var Turret = require("./turret");
    var HpBar = require("./hp_bar");

    var Tank = function (options) {
        this.options = options;
        this.turret = new Turret(options);
        this.hull = new Hull(options);
        this.hpBar = new HpBar();
    };

    Tank.prototype.initialize = function (assets) {
        this.drawing = new createjs.Container();
        this.tank = new createjs.Container();

        this.turret.initialize(assets);
        this.hull.initialize(assets);
        this.hpBar.initialize(assets);


        this.tank.addChild(this.hull.drawing, this.turret.drawing);
        this.drawing.addChild(this.tank, this.hpBar.drawing);

        this.tank.regX = this.options.hull.centerX;
        this.tank.regY = this.options.hull.centerY;

        this.turret.drawing.x = this.options.hull.turretAxisX;
        this.turret.drawing.y = this.options.hull.turretAxisY;

        this.hpBar.drawing.x = -this.options.hull.centerX;
        this.hpBar.drawing.y = -this.options.hull.centerY-10;

    };

    Tank.prototype.update = function (delta) {
        this.hull.update(delta);
        this.turret.update(delta);
        this.hpBar.update(delta);
    };

    Tank.prototype.rotateHullRight = function () {
        this.tank.rotation = math.incMod(this.tank.rotation, this.options.hull.rotationSpeed, 360);
        this.turret.rotateHull();
    };

    Tank.prototype.rotateHullLeft = function () {
        this.tank.rotation = math.incMod(this.tank.rotation, -this.options.hull.rotationSpeed, 360);
        this.turret.rotateHull();
    };

    Tank.prototype.rotateTurretRight = function () {
        this.turret.rotateTurretRight();
        this.hpBar.hp = math.incMax(this.hpBar.hp, 0.01, 1);
    };

    Tank.prototype.rotateTurretLeft = function () {
        this.turret.rotateTurretLeft();
        this.hpBar.hp = math.incMin(this.hpBar.hp, -0.01, 0);
    };

    Tank.prototype.moveForward = function () {
        var angle = math.degToRad(this.tank.rotation);
        this.drawing.x += Math.sin(angle);
        this.drawing.y -= Math.cos(angle);
    };

    Tank.prototype.moveBackward = function () {
        var angle = math.degToRad(this.tank.rotation);
        this.drawing.x -= Math.sin(angle);
        this.drawing.y += Math.cos(angle);
    };

    Tank.prototype.fire = function () {
        return this.turret.fire({
            angle: this.tank.rotation,
            x: this.tank.x,
            y: this.tank.y,
            speed: 20
        });
    };

    return Tank;
});