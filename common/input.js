﻿//Copyright: Original code was written by ippa and can be found here:
//https://github.com/ippa/jaws/blob/master/src/input.js

define(["lodash"], function (_) {

    var pressed_keys = {};
    var keycode_to_string = [];
    var on_keydown_callbacks = [];
    var on_keyup_callbacks = [];
    var mousebuttoncode_to_string = [];
    var ie_mousebuttoncode_to_string = [];

    var input = {};
    /** @private
     * Map all javascript keycodes to easy-to-remember letters/words
     */
    function initialize() {

        var k = [];

        k[8] = "backspace";
        k[9] = "tab";
        k[13] = "enter";
        k[16] = "shift";
        k[17] = "ctrl";
        k[18] = "alt";
        k[19] = "pause";
        k[20] = "capslock";
        k[27] = "esc";
        k[32] = "space";
        k[33] = "pageup";
        k[34] = "pagedown";
        k[35] = "end";
        k[36] = "home";
        k[37] = "left";
        k[38] = "up";
        k[39] = "right";
        k[40] = "down";
        k[45] = "insert";
        k[46] = "delete";

        k[91] = "leftwindowkey";
        k[92] = "rightwindowkey";
        k[93] = "selectkey";
        k[106] = "multiply";
        k[107] = "add";
        k[109] = "subtract";
        k[110] = "decimalpoint";
        k[111] = "divide";

        k[144] = "numlock";
        k[145] = "scrollock";
        k[186] = "semicolon";
        k[187] = "equalsign";
        k[188] = "comma";
        k[189] = "dash";
        k[190] = "period";
        k[191] = "forwardslash";
        k[192] = "graveaccent";
        k[219] = "openbracket";
        k[220] = "backslash";
        k[221] = "closebracket";
        k[222] = "singlequote";

        var m = [];

        m[0] = "left_mouse_button";
        m[1] = "center_mouse_button";
        m[2] = "right_mouse_button";

        var ie_m = [];
        ie_m[1] = "left_mouse_button";
        ie_m[2] = "right_mouse_button";
        ie_m[4] = "center_mouse_button";

        mousebuttoncode_to_string = m;
        ie_mousebuttoncode_to_string = ie_m;


        var numpadkeys = ["numpad0", "numpad1", "numpad2", "numpad3", "numpad4", "numpad5", "numpad6", "numpad7", "numpad8", "numpad9"];
        var fkeys = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9"];
        var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var i;
        for (i = 0; numbers[i]; i += 1) { k[48 + i] = numbers[i]; }
        for (i = 0; letters[i]; i += 1) { k[65 + i] = letters[i]; }
        for (i = 0; numpadkeys[i]; i += 1) { k[96 + i] = numpadkeys[i]; }
        for (i = 0; fkeys[i]; i += 1) { k[112 + i] = fkeys[i]; }

        keycode_to_string = k;

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("blur", input.resetPressedKeys, false);

    }

    /** @private
     * Reset input-hash. Called when game is blurred so a key-controlled player doesn't keep on moving when the game isn't focused.
     */
    input.resetPressedKeys = function () {
        pressed_keys = {};
    };

    /** @private
     * handle event "onkeydown" by remembering what key was pressed
     */
    function handleKeyUp(e) {
        var event = (e) ? e : window.event;
        var human_name = keycode_to_string[event.keyCode];
        pressed_keys[human_name] = false;
        if (on_keyup_callbacks[human_name]) {
            on_keyup_callbacks[human_name](human_name);
            event.preventDefault();
        }
        if (prevent_default_keys[human_name]) { event.preventDefault(); }
    }

    /** @private
     * handle event "onkeydown" by remembering what key was un-pressed
     */
    function handleKeyDown(e) {
        var event = (e) ? e : window.event;
        var human_name = keycode_to_string[event.keyCode];
        pressed_keys[human_name] = true;
        if (on_keydown_callbacks[human_name]) {
            on_keydown_callbacks[human_name](human_name);
            event.preventDefault();
        }
        if (prevent_default_keys[human_name]) { event.preventDefault(); }
    }

    var prevent_default_keys = [];
    /** 
     * Prevents default browseraction for given keys.
     * @example
     * input.preventDefaultKeys( ["down"] )  // Stop down-arrow-key from scrolling page down
     */
    input.preventDefaultKeys = function (array_of_strings) {
        array_of_strings.forEach(function (item) {
            prevent_default_keys[item] = true;
        });
    };

    input.resetPreventDefaultKeys = function () {
        prevent_default_keys = [];
    };


    /**
     * Returns true if *key* is currently pressed down
     * @example
     * input.pressed("left");  // returns true if arrow key is pressed
     * input.pressed("a");     // returns true if key "a" is pressed
     */
    input.pressed = function (key) {
        return pressed_keys[key];
    };

    /** 
     * sets up a callback for a key (or array of keys) to call when it's pressed down
     * 
     * @example
     * // call goLeft() when left arrow key is  pressed
     * input.on_keypress("left", goLeft) 
     *
     * // call fireWeapon() when SPACE or CTRL is pressed
     * input.on_keypress(["space","ctrl"], fireWeapon)
     */
    input.on_keydown = function (key, callback) {
        if (_.isArray(key)) {
            for (var i = 0; key[i]; i += 1) {
                on_keydown_callbacks[key[i]] = callback;
            }
        }
        else {
            on_keydown_callbacks[key] = callback;
        }
    };

    /** 
     * sets up a callback when a key (or array of keys) to call when it's released 
     */
    input.on_keyup = function (key, callback) {
        if (_.isArray(key)) {
            for (var i = 0; key[i]; i += 1) {
                on_keyup_callbacks[key[i]] = callback;
            }
        }
        else {
            on_keyup_callbacks[key] = callback;
        }
    };

    /** @private
     * Clean up all callbacks set by on_keydown / on_keyup 
     */
    input.clearKeyCallbacks = function () {
        on_keyup_callbacks = [];
        on_keydown_callbacks = [];
    };

    initialize();
    return input;
});