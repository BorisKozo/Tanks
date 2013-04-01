define(["./game"], function (game) {
    var State = function () {
    }

    State.prototype.setup = function () { };
    State.prototype.update = function () { };
    State.prototype.draw = function () {
        game.stage.update();
    };
    return State;
});