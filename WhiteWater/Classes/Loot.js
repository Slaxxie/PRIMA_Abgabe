"use strict";
var WhiteWater;
(function (WhiteWater) {
    var ƒ = FudgeCore;
    class Loot extends WhiteWater.QuadNode {
        constructor(_pos) {
            /* let texture: ƒ.TextureImage = new ƒ.TextureImage("invader.png");
            let texture2: ƒ.TextureImage = new ƒ.TextureImage("invader.png"); */
            if (WhiteWater.level > 5 && Math.random() <= (WhiteWater.bigLootPropability)) {
                let scale = new ƒ.Vector2(2, 2);
                super("Loot" + (++Loot.count), _pos, scale);
                let material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), WhiteWater.textureBigLoot));
                this.addComponent(new ƒ.ComponentMaterial(material));
                this.worthOfLoot = WhiteWater.reward * WhiteWater.rewardFactor;
            }
            else {
                let scale = new ƒ.Vector2(1, 1);
                super("Loot" + (++Loot.count), _pos, scale);
                let material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), WhiteWater.textureSmallLoot));
                this.addComponent(new ƒ.ComponentMaterial(material));
                this.worthOfLoot = WhiteWater.reward;
            }
        }
        move(_movement) {
            let timeSinceLastFrame = ƒ.Loop.timeFrameReal / 1000;
            this.mtxLocal.translateY(timeSinceLastFrame * _movement);
            this.setRectPosition();
        }
    }
    Loot.count = 0;
    WhiteWater.Loot = Loot;
})(WhiteWater || (WhiteWater = {}));
//# sourceMappingURL=Loot.js.map