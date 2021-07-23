"use strict";
var WhiteWater;
(function (WhiteWater) {
    var ƒ = FudgeCore;
    WhiteWater.gameNode = new ƒ.Node("Game");
    WhiteWater.viewportNode = new ƒ.Node("Viewport");
    WhiteWater.viewport = new ƒ.Viewport();
    WhiteWater.moveDirection = true;
    WhiteWater.collisionRight = false;
    WhiteWater.collisionLeft = false;
    WhiteWater.deflectorShieldAvailable = true;
    WhiteWater.invulnerableActive = false;
    WhiteWater.timeWarpCharges = 0;
    WhiteWater.timeWarpActive = false;
    WhiteWater.level = 1;
    WhiteWater.rocks = new ƒ.Node("Rocks");
    WhiteWater.lootables = new ƒ.Node("Lootables");
    WhiteWater.backGroundNode = new ƒ.Node("Background");
    WhiteWater.deflectorNode = new ƒ.Node("Deflector");
    WhiteWater.uiNode = new ƒ.Node("UI");
    WhiteWater.leftBorder = -7;
    WhiteWater.rightBorder = 7;
    WhiteWater.velocityMod = 4;
    WhiteWater.velocity = WhiteWater.level + WhiteWater.velocityMod;
    WhiteWater.spawnCounter = 0;
    WhiteWater.spawnCounterTimewarp = 120;
    WhiteWater.lootCounter = 0;
    WhiteWater.playerPoints = 0;
    WhiteWater.levelProgress = 0;
    WhiteWater.bigRockDamage = 2;
    WhiteWater.mediumRockDamage = 1;
    WhiteWater.backGroundVelocityMod = 2;
    WhiteWater.backGroundVelocity = (WhiteWater.level / 5) + WhiteWater.backGroundVelocityMod;
    WhiteWater.sfxPlayer = new WhiteWater.SFX();
    WhiteWater.highScoreArray = [];
    /* let backGroundNode: ƒ.Node = new Background(backX, backY, backZ); */
})(WhiteWater || (WhiteWater = {}));
//# sourceMappingURL=Variables.js.map