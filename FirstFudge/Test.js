"use strict";
var FirstFudge;
(function (FirstFudge) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let node = new ƒ.Node("Test");
    let viewport = new ƒ.Viewport();
    function init(_event) {
        const canvas = document.querySelector("canvas");
        node.addComponent(new ƒ.ComponentTransform());
        let mesh = new ƒ.MeshCube("Quad");
        node.addComponent(new ƒ.ComponentMesh(mesh));
        let material = new ƒ.Material("Testmaterial", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
        let cmpMaterial = new ƒ.ComponentMaterial(material);
        node.addComponent(cmpMaterial);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(3);
        cmpCamera.mtxPivot.rotateY(180);
        console.log(cmpCamera);
        viewport.initialize("Viewport", node, cmpCamera, canvas);
        viewport.draw();
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function update(_event) {
        let rotSpeed = 90;
        let timeSinceLastFrameInSeconds = ƒ.Loop.timeFrameReal / 1000;
        node.getComponent(ƒ.ComponentMesh).mtxPivot.rotateY(rotSpeed * timeSinceLastFrameInSeconds);
        viewport.draw();
    }
})(FirstFudge || (FirstFudge = {}));
//Alt+Shift+F = auto-format
/*
Koordinatensystem = Rechtshändig
x = links (-) - rechts (+)
y = unten (-) - oben (+)
z = vorne (-) - honten (+)
*/ 
//# sourceMappingURL=Test.js.map