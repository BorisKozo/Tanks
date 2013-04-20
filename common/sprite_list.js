define(["lodash", "common/game"], function (_, game) {
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

        this.data[id] = item;
        this.length += 1;
    };

    SpriteList.prototype.at = function (id) {
        return this.data[id];
    };

    SpriteList.prototype.each = function(callback){
        var _this = this;
        _.forEach(this.keys, function(currentId){
            if(_.isFunction(callback)){
                callback(_this.at(currentId));
            }
        })
    };

    SpriteList.prototype.initialize = function (assets) {
        _.forOwn(this.data, function (sprite) {
            sprite.initialize(assets);
            game.stage.addChild(sprite.drawing);
        });
    };

    return SpriteList;


});