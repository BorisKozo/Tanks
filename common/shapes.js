define([], function () {
    var Rect = function (options) {
        options = options || {};
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.width = options.width || 0;
        this.height = options.height || 0;
    };

    Rect.prototype.left = function () {
        return this.x;
    };

    Rect.prototype.right = function () {
        return this.x + this.width;
    };

    Rect.prototype.top = function () {
        return this.y;
    };

    Rect.prototype.bottom = function () {
        return this.y + this.height;
    };

    /// returns true if the rect fully contains the given point (point cannot be on the bound) 
    Rect.prototype.contains = function (x, y) {
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height) {
            return true;
        } else {
            return false;
        }

    }

    Rect.fromBounds = function (left, top, right, bottom) {
        return new Rect({
            x: left,
            y: top,
            width: right - left,
            height: bottom - top
        });
    };

    Rect.bbox = function (rects) {
        var i, length = rects.length;
        var left = rects[0].left(),
            right = rects[0].right(),
            top = rects[0].top(),
            bottom = rects[0].bottom(),
            currentRect;

        for (i = 1; i < length; i += 1) {
            currentRect = rects[i];
            left = Math.min(left, currentRect.left());
            right = Math.max(right, currentRect.right());
            top = Math.min(top, currentRect.top());
            bottom = Math.max(bottom, currentRect.bottom);
        }

        return Rect.fromBounds(left, top, right, bottom);

    };

    return {
        Rect: Rect
    };
});