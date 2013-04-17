define(["require", "createjs", "common/math", "./shell"], function (require, createjs, math) {

    var Shell = require("./shell");

    var AimingGuide = function (options) {
        this.options = options.gun;
    };

    AimingGuide.prototype.getManifest = function () {
        var result = [];
        result.push(this.options.fireSound);
        return result;
    };

    AimingGuide.prototype.initialize = function () {
        this.drawing = new createjs.Shape();
        this.currentAngle = this.options.maxAngle;
        this.fireSound = createjs.Sound.createInstance(this.options.fireSound.id);

        this.fireCounter = this.options.fireRate;
    };

    AimingGuide.prototype.update = function () {
        var graphics = this.drawing.graphics.c().ss(1).s("red");
        var y = 500;
        var x = y * Math.tan(math.degToRad(this.currentAngle));

        graphics.mt(0, 0).lt(-x, -y).mt(0, 0).lt(x, -y).es();

        this.currentAngle -= this.options.aimSpeed;
        if (this.currentAngle <= this.options.minAngle) {
            this.currentAngle = this.options.minAngle;
        }

        this.fireCounter = math.incMin(this.fireCounter, -0.1, 0);
    };

    AimingGuide.prototype.rotateTurret = function () {

        this.currentAngle += this.options.turretRotationPenalty;
        if (this.currentAngle > this.options.maxAngle) {
            this.currentAngle = this.options.maxAngle;
        }
    };

    AimingGuide.prototype.rotateHull = function () {
        this.currentAngle += this.options.hullRotationPenalty;
        if (this.currentAngle > this.options.maxAngle) {
            this.currentAngle = this.options.maxAngle;
        }
    };

    AimingGuide.prototype.fire = function (options) {

        if (this.fireCounter > 0) {
            return;
        }

        options.angle = math.randomNormal(options.angle, this.currentAngle * 0.3);
        this.fireCounter = this.options.fireRate;
        this.fireSound.play();

        var shell = new Shell(options);
        shell.initialize();

        this.currentAngle = math.incMax(this.currentAngle, this.options.dispersionOnFire, this.options.maxAngle);
        return shell;

    };


    return AimingGuide;
});