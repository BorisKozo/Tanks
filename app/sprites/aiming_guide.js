define(["easel", "common/math"], function (createjs, math) {
    var AimingGuide = function (options) {
        this.options = options;
    };

    AimingGuide.prototype.getManifest = function () {
        return [];
    };

    AimingGuide.prototype.initialize = function () {
        this.drawing = new createjs.Shape();
        this.currentAngle = this.options.maxAngle;
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


    return AimingGuide;
});