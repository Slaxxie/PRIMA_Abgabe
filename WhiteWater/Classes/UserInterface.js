"use strict";
var WhiteWater;
(function (WhiteWater) {
    var ƒ = FudgeCore;
    class UserInterface extends ƒ.Node {
        constructor(_x, _y, _path) {
            super("interfacePanel");
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_x);
            this.mtxLocal.translateY(_y);
            this.mtxLocal.translateZ(1);
            let panelMesh = new ƒ.MeshSprite("interfacePanel_Mesh");
            let cmpMesh = new ƒ.ComponentMesh(panelMesh);
            this.addComponent(cmpMesh);
            let uiTex = new ƒ.TextureImage(_path);
            let materialLeft = new ƒ.Material("MaterialName", ƒ.ShaderTexture, new ƒ.CoatTextured(ƒ.Color.CSS("White"), uiTex));
            this.addComponent(new ƒ.ComponentMaterial(materialLeft));
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleX(6.5);
            this.getComponent(ƒ.ComponentMesh).mtxPivot.scaleY(21);
        }
    }
    WhiteWater.UserInterface = UserInterface;
})(WhiteWater || (WhiteWater = {}));
//# sourceMappingURL=UserInterface.js.map