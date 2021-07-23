"use strict";
var WhiteWater;
(function (WhiteWater) {
    var ƒ = FudgeCore;
    class Deflector extends ƒ.Node {
        constructor() {
            super("Shield");
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(0);
            this.mtxLocal.translateY(0.5);
            this.mtxLocal.translateZ(0.1);
            let shieldMesh = new ƒ.MeshSprite("Shield_Mesh");
            let cmpMesh = new ƒ.ComponentMesh(shieldMesh);
            this.addComponent(cmpMesh);
            let material = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), WhiteWater.deflectorTex));
            this.addComponent(new ƒ.ComponentMaterial(material));
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(2);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(1);
        }
    }
    WhiteWater.Deflector = Deflector;
})(WhiteWater || (WhiteWater = {}));
//# sourceMappingURL=Deflector.js.map