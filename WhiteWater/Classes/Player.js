"use strict";
var WhiteWater;
(function (WhiteWater) {
    var ƒ = FudgeCore;
    class Player extends WhiteWater.QuadNode {
        constructor() {
            let pos = new ƒ.Vector2(0, 0);
            let scale = new ƒ.Vector2(1, 1);
            super("Player", pos, scale);
            /* let texture: ƒ.TextureImage = new ƒ.TextureImage("player2.png"); */
            let material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), WhiteWater.textureShip));
            this.addComponent(new ƒ.ComponentMaterial(material));
        }
        static getInstance() {
            if (this.instance == null)
                this.instance = new Player();
            return this.instance;
        }
        moveRight() {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateX((WhiteWater.movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        moveLeft() {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateX((-WhiteWater.movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        moveUp() {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateY((WhiteWater.movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
        moveDown() {
            this.setRectPosition();
            Player.getInstance().mtxLocal.translateY((-WhiteWater.movementSpeed * ƒ.Loop.timeFrameReal) / 1000);
        }
    }
    WhiteWater.Player = Player;
})(WhiteWater || (WhiteWater = {}));
//# sourceMappingURL=Player.js.map