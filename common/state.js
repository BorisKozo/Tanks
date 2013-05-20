define(["jquery", "lodash", "./game", "./input", "./events"], function ($, _, game, input, Events) {
    var State = function () {
    };

    State.prototype = _.extend(State.prototype, Events);
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
        this.off(null, null, this);
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