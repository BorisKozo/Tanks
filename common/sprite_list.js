define(["lodash", "./loader"], function (_, loader) {
    var SpriteList = function () {
        this.length = 0;
        this.data = {};
        this.counter = 0;
        this.keys = [];
    };

    SpriteList.prototype.update = function (delta) {

        for (var i = 0, length = this.length; i < length; i += 1) {
            this.data[this.keys[i]].update(data);
        }
    };

    SpriteList.prototype.add = function (item, id) {
        id = id || "$$" + this.counter;
        this.counter++;

        this.data[id] = item;
        this.keys.push(id);
        this.length += 1;
    };

    SpriteList.prototype.at = function (id) {
        return this.data[id];
    };

    SpriteList.prototype.getManifest = function () {
        var result = [];
        for (var i = 0, length = this.length; i < length; i += 1) {
            result = result.concat(this.data[this.keys[i]].getManifest());
        }

        return result;
    }

    SpriteList.prototype.initialize = function (stage, assets) {
        for (var i = 0, length = this.length; i < length; i += 1) {
            this.data[this.keys[i]].initialize(assets);
        }
    }

    SpriteList.prototype.load = function (deferred, stage) {
        var _this = this;
        loader.loadManifest(_this.getManifest(), function (assets) {
            _this.initialize(stage, assets);
            for (var i = 0, length = _this.length; i < length; i += 1) {
                if (_this.data[_this.keys[i]].drawing) {
                    stage.addChild(_this.data[_this.keys[i]].drawing);
                }
            }
            deferred.resolve();
        });
    }


    return SpriteList;


});