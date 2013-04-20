define(["./../effects/explosion"], function (explosion) {
    return {
        initialPositionX:100,
        initialPositionY:100,
        radius: 16,
        centerX: 15,
        centerY: 15,
        graphics: { id: "barrel", src: "assets/images/barrel.png" },
        explosion: explosion
    };
});