"use strict";
var WhiteWater;
(function (WhiteWater) {
    var ƒ = FudgeCore;
    class ScrollingBackground extends ƒ.Node {
        constructor(_y) {
            super("Background");
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(0);
            this.mtxLocal.translateY(_y);
            this.mtxLocal.translateZ(-0.1);
            let backgroundMesh = new ƒ.MeshSprite("Background_Mesh");
            let cmpMesh = new ƒ.ComponentMesh(backgroundMesh);
            this.addComponent(cmpMesh);
            let backGroundTex;
            let backGroundState;
            do {
                backGroundState = Math.ceil(Math.random() * 9);
            } while (WhiteWater.backGroundStateTemp == backGroundState);
            switch (backGroundState) {
                case 1: {
                    backGroundTex = new ƒ.TextureImage("./Pics/spaceback1.png");
                    break;
                }
                case 2: {
                    backGroundTex = new ƒ.TextureImage("./Pics/spaceback1.png");
                    break;
                }
                case 3: {
                    backGroundTex = new ƒ.TextureImage("./Pics/spaceback2.png");
                    break;
                }
                case 4: {
                    backGroundTex = new ƒ.TextureImage("./Pics/spaceback2.png");
                    break;
                }
                case 5: {
                    backGroundTex = new ƒ.TextureImage("./Pics/spaceback3.png");
                    break;
                }
                case 6: {
                    backGroundTex = new ƒ.TextureImage("./Pics/spaceback3.png");
                    break;
                }
                case 7: {
                    backGroundTex = new ƒ.TextureImage("./Pics/spaceback4.png");
                    break;
                }
                case 8: {
                    backGroundTex = new ƒ.TextureImage("./Pics/spaceback5.png");
                    break;
                }
                case 9: {
                    backGroundTex = new ƒ.TextureImage("./Pics/spaceback6.png");
                    break;
                }
                default: {
                    backGroundTex = new ƒ.TextureImage("./Pics/spaceback1.png");
                    break;
                }
            }
            let material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), backGroundTex));
            this.addComponent(new ƒ.ComponentMaterial(material));
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(31);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(22);
            WhiteWater.backGroundStateTemp = backGroundState;
        }
        move(_movement) {
            let timeSinceLastFrame = ƒ.Loop.timeFrameReal / 1000;
            this.mtxLocal.translateY(timeSinceLastFrame * _movement);
        }
    }
    WhiteWater.ScrollingBackground = ScrollingBackground;
})(WhiteWater || (WhiteWater = {}));
//# sourceMappingURL=ScrollingBackground.js.map