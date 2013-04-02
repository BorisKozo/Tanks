define(["jquery", "lodash", "./game","./input"], function ($, _, game,input) {
    var State = function () {
    }

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
    }
    return State;
});