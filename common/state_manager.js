define(["createjs", "lodash", "./game", "./input"], function (createjs, _, game, input) {
    var requiredFps = 30;

    function _handleTick(event) {
        if (event.paused) {
            return;
        }
        if (!stateManager.activeState) {
            return;
        }
        $("#fps").html(createjs.Ticker.getMeasuredFPS());
        var delta = (event.delta / 1000) * requiredFps;
        stateManager.activeState.update(delta);
        stateManager.activeState.draw(game.stage);
    }

    createjs.Ticker.init();
    createjs.Ticker.addEventListener("tick", _handleTick);
    createjs.Ticker.setPaused(true);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(requiredFps);
    var stateManager = {
        start: function () {
            createjs.Ticker.setPaused(false);
        },
        stop: function () {
            createjs.Ticker.setPaused(true);
        },
        activeState: null,
        activate: function (state, options) {
            if (stateManager.activeState && stateManager.activeState.teardown && _.isFunction(stateManager.activeState.teardown)) {
                stateManager.activeState.teardown(state);
            }

            input.resetPressedKeys();
            input.resetPreventDefaultKeys();
            input.clearKeyCallbacks();
            
            stateManager.activeState = null;
            state.setup(options);
            state.load().done(function () {
                stateManager.activeState = state;
            });
        }
    };

    return stateManager;
});