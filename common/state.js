define(["jquery", "lodash", "./game", "./input"], function ($, _, game, input) {
    var State = function () {
    };

    //setup -> load

    //This is where you create all your internal data/sprites/whatever
    State.prototype.setup = function () {

    };

    State.prototype.load = function () {
        var deferred = $.Deferred();
        if (this.onLoad && _.isFunction(this.onLoad)) {
            this.onLoad(deferred);
        } else {
            deferred.resolve();
        }
        return deferred;
    };



    State.prototype.update = function () { };

    State.prototype.draw = function () {
        game.stage.update();
    };

    State.prototype.teardown = function () {
        game.stage.removeAllChildren();
        game.stage.removeAllEventListeners();
        input.clearKeyCallbacks();
    };

    State.mergeManifest = function (manifest) {
        var data;
        for (var i = 1, length = arguments.length; i < length; i += 1) {
            data = arguments[i];
            if (data && data.graphics) {
                manifest = manifest.concat(_.values(data.graphics));
            }

            if (data && data.sounds) {
                manifest = manifest.concat(_.values(data.sounds));
            }
        }

        return manifest;

    };
    return State;
});