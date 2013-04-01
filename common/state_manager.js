define(["easel","lodash","./game"], function (createjs,_,game) {
    
    function _handleTick(event) {
        if (event.paused) {
            return;
        }
        if (!stateManager.activeState) {
            return;
        }

        stateManager.activeState.update(event.delta);
        stateManager.activeState.draw(game.stage);
    }

    createjs.Ticker.init();
    createjs.Ticker.addEventListener("tick", _handleTick);
    createjs.Ticker.setPaused(true);
    createjs.Ticker.useRAF = true;
    createjs.Ticker.setFPS(30);
    var stateManager = {
        start: function () {
            createjs.Ticker.setPaused(false);
        },
        stop: function () {
            createjs.Ticker.setPaused(true);
        },
        activeState: null,
        setActiveState: function (state, options) {
            if (state.setup && _.isFunction(state.setup)) {
                state.setup(options);
            }

            if (stateManager.activeState && stateManager.activeState.teardown && _.isFunction(stateManager.activeState.teardown)) {
                stateManager.activeState.teardown(state);
            }

            stateManager.activeState = state;
        }
    }

    return stateManager;
});