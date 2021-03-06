﻿define(["lodash", "common/game"], function (_, game) {
    var SpriteList = function () {
        this.length = 0;
        this.data = {};
        this.counter = 0;
    };

    SpriteList.prototype.update = function (delta) {
        var _this = this;
        _.forOwn(this.data, function (sprite, key) {
            if (!sprite.isDead) {
                sprite.update(delta);
            }

            if (sprite.isDead) {
                game.stage.removeChild(sprite.drawing);
                delete _this.data[key];
                _this.length -= 1;
            }
        });
    };

    SpriteList.prototype.add = function (item, id) {
        id = id || "$$" + this.counter;
        this.counter += 1;

        if (this.data[id] === undefined) {
            this.length += 1;
        }
        this.data[id] = item;
        
    };

    SpriteList.prototype.at = function (id) {
        return this.data[id];
    };

    SpriteList.prototype.each = function (callback) {
        _.forOwn(this.data, function (sprite) {
            callback(sprite);
        });
    };

    SpriteList.prototype.initialize = function (assets) {
        _.forOwn(this.data, function (sprite) {
            sprite.initialize(assets);
            game.stage.addChild(sprite.drawing);
        });
    };

    return SpriteList;


});