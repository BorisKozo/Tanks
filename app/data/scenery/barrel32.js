define(["./../effects/explosion"], function (explosion) {
    return {
        radius: 16,
        centerX: 15,
        centerY: 15,
        timeTillNextExplode: 5000,
        graphics: {
            barrel: {id: "barrel", src: "assets/images/barrel.png" }
        },
        explosion: explosion
    };
});