define(['./math'], function (math) {

    var CollisionManager = function () {
        this.data = {};
    };

    CollisionManager.getIdByTypes = function (firstType, secondType) {
        return firstType + "$$" + secondType;
    };

    CollisionManager.prototype.register = function (firstType, secondType, collider) {
        var id;

        id = CollisionManager.getIdByTypes(firstType, secondType);
        this.data[id] = collider;

        if (collider.symetric) {
            id = CollisionManager.getIdByTypes(secondType, firstType);
            this.data[id] = collider;
        }

    };

    CollisionManager.prototype.areColliding = function (sprite1, sprite2) {
        var typeString = CollisionManager.getIdByTypes(sprite1.type, sprite2.type),
    collider = this.data[typeString];

        if (!collider) {
            return false;
        }

        return collider.test(sprite1, sprite2);
    };

    CollisionManager.prototype.handleCollision = function (sprite1, sprite2) {
        var sprite1Data, sprite2Data;
        if (!this.areColliding(sprite1, sprite2)) {
            return;
        }

        if (sprite1.beforeCollision) {
            sprite1Data = sprite1.beforeCollision(sprite2);
        }
        if (sprite2.beforeCollision) {
            sprite2Data = sprite2.beforeCollision(sprite1);
        }


        if (sprite1.collision) {
            sprite1.collision(sprite2, sprite1Data);
        }
        if (sprite2.collision) {
            sprite2.collision(sprite1, sprite2Data);
        }


        if (sprite1.afterCollision) {
            sprite1.afterCollision(sprite2, sprite1Data);
        }
        if (sprite2.afterCollision) {
            sprite2.afterCollision(sprite1, sprite2Data);
        }

    };

    CollisionManager.prototype.collide = function (sprite1, sprite2) {
        if (this.areColliding(sprite1, sprite2)) {
            this.handleCollision(sprite1, sprite2);
        }
    };

    //A collider must have a "test" function which takes two object and tests if they collide.
    //* Returns true if the two objects collide and false otherwise *

    var _circleCircleCollider = {
        test: function (circle1, circle2) {
            return math.withinDistance(circle1.centerX, circle1.centerY, circle2.centerX, circle2.centerY, circle1.radius + circle2.radius);
        },
        symetric: true
    };

    var _circlePointCollider = {
        test: function (circle, point) {
            return math.withinDistance(circle.centerX, circle.centerY, point.x, point.y, circle.radius);
        },
        symetric: false
    };

    var _pointCicleCollider = {
        test: function (point, circle) {
            return _circleCircleCollider.test(circle, point);
        },
        symetric: false
    };

    CollisionManager.colliders = {
        circleCircle: _circleCircleCollider,
        circlePoint: _circlePointCollider,
        pointCircle: _pointCicleCollider
    };

    return CollisionManager;
});