"use strict";
var WhiteWater;
(function (WhiteWater) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    WhiteWater.gameNode.appendChild(WhiteWater.viewportNode);
    WhiteWater.gamestate = WhiteWater.GAMESTATE.MAINMENU;
    console.log(WhiteWater.gamestate);
    async function init(_event) {
        await WhiteWater.loadGameValues();
        const canvas = document.querySelector("canvas");
        WhiteWater.player = WhiteWater.Player.getInstance();
        WhiteWater.viewportNode.addChild(WhiteWater.player);
        WhiteWater.backGroundNode.appendChild(new WhiteWater.ScrollingBackground(0));
        WhiteWater.backGroundNode.appendChild(new WhiteWater.ScrollingBackground(22));
        WhiteWater.backGroundNode.appendChild(new WhiteWater.ScrollingBackground(44));
        WhiteWater.uiNode.appendChild(new WhiteWater.UserInterface(-10.7, 10, "./Pics/leftpanel.png"));
        WhiteWater.uiNode.appendChild(new WhiteWater.UserInterface(10.7, 10, "./Pics/rightpanel.png"));
        WhiteWater.viewportNode.addChild(WhiteWater.uiNode);
        WhiteWater.viewportNode.addChild(WhiteWater.backGroundNode);
        WhiteWater.viewportNode.addChild(WhiteWater.lootables);
        WhiteWater.viewportNode.addChild(WhiteWater.rocks);
        WhiteWater.player.appendChild(WhiteWater.deflectorNode);
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(30);
        cmpCamera.mtxPivot.translateY(10);
        cmpCamera.mtxPivot.rotateY(180);
        WhiteWater.viewport.initialize("Viewport", WhiteWater.viewportNode, cmpCamera, canvas);
        console.log(WhiteWater.gameNode);
        document.getElementById("start").addEventListener("click", () => {
            document.getElementById("mainMenu").style.display = "none";
            document.getElementById("UI-Level").style.display = "inline";
            document.getElementById("UI-Points").style.display = "inline";
            document.getElementById("UI-MaxLives").style.display = "inline";
            document.getElementById("UI-CurrentLives").style.display = "inline";
            document.getElementById("UI-Shield").style.display = "inline";
            document.getElementById("UI-Timewarp").style.display = "inline";
            gameStart();
        });
        document.getElementById("option").addEventListener("click", () => {
            document.getElementById("mainMenu").style.display = "none";
            WhiteWater.optionMenu();
        });
        document.getElementById("highscore").addEventListener("click", () => {
            document.getElementById("mainMenu").style.display = "none";
            WhiteWater.highScore();
        });
        /* document.getElementById("exit").addEventListener("click", () => {
            document.getElementById("mainMenu").style.display = "none";
            window.close();
        }); */
        document.getElementById("continue").addEventListener("click", () => {
            document.getElementById("pauseMenu").style.display = "none";
            WhiteWater.resumeGame();
        });
        document.getElementById("option2").addEventListener("click", () => {
            document.getElementById("pauseMenu").style.display = "none";
            WhiteWater.optionMenuInGame();
        });
        document.getElementById("exit2").addEventListener("click", () => {
            document.getElementById("pauseMenu").style.display = "none";
            location.reload();
        });
        /* document.getElementById("sound").addEventListener("click", () => {
            document.getElementById("optionMenu").style.display = "none";
            gameStart();
        }); */
        document.getElementById("back").addEventListener("click", () => {
            document.getElementById("optionMenuInGame").style.display = "none";
            WhiteWater.pauseGame();
        });
        document.getElementById("backMain").addEventListener("click", () => {
            document.getElementById("optionMenu").style.display = "none";
            WhiteWater.mainMenu();
        });
        document.getElementById("backMainFromHS").addEventListener("click", () => {
            document.getElementById("highscoreMenu").style.display = "none";
            WhiteWater.mainMenu();
        });
        document.getElementById("MasterVolume").addEventListener("input", WhiteWater.changeMasterVolume);
        document.getElementById("MasterVolumeMainMenu").addEventListener("input", WhiteWater.changeMasterVolume);
        WhiteWater.mainMenu();
    }
    function hndKey() {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]) && WhiteWater.Player.getInstance().mtxLocal.translation.x <= WhiteWater.rightBorder && WhiteWater.gamestate == WhiteWater.GAMESTATE.PLAYING || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && WhiteWater.Player.getInstance().mtxLocal.translation.x <= WhiteWater.rightBorder && WhiteWater.gamestate == WhiteWater.GAMESTATE.PLAYING) {
            WhiteWater.player.moveRight();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]) && WhiteWater.Player.getInstance().mtxLocal.translation.x >= WhiteWater.leftBorder && WhiteWater.gamestate == WhiteWater.GAMESTATE.PLAYING || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT]) && WhiteWater.Player.getInstance().mtxLocal.translation.x >= WhiteWater.leftBorder && WhiteWater.gamestate == WhiteWater.GAMESTATE.PLAYING) {
            WhiteWater.player.moveLeft();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]) && WhiteWater.Player.getInstance().mtxLocal.translation.y <= 18 && WhiteWater.gamestate == WhiteWater.GAMESTATE.PLAYING || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP]) && WhiteWater.Player.getInstance().mtxLocal.translation.y <= 18 && WhiteWater.gamestate == WhiteWater.GAMESTATE.PLAYING) {
            WhiteWater.player.moveUp();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S]) && WhiteWater.Player.getInstance().mtxLocal.translation.y >= 0 && WhiteWater.gamestate == WhiteWater.GAMESTATE.PLAYING || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN]) && WhiteWater.Player.getInstance().mtxLocal.translation.y >= 0 && WhiteWater.gamestate == WhiteWater.GAMESTATE.PLAYING) {
            WhiteWater.player.moveDown();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE]) && WhiteWater.deflectorShieldAvailable == true && WhiteWater.gamestate == WhiteWater.GAMESTATE.PLAYING) {
            WhiteWater.deflectorShieldAvailable = false;
            WhiteWater.shieldCDToHTML("ACTIVE");
            WhiteWater.deflectorShieldCooldown = 0;
            WhiteWater.invulnerableActive = true;
            WhiteWater.invulnerable = 0;
            WhiteWater.deflectorNode.addChild(new WhiteWater.Deflector());
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT]) && WhiteWater.timeWarpCharges != 0 && WhiteWater.gamestate == WhiteWater.GAMESTATE.PLAYING || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_RIGHT]) && WhiteWater.timeWarpCharges != 0 && WhiteWater.gamestate == WhiteWater.GAMESTATE.PLAYING) {
            WhiteWater.timeWarpCharges--;
            WhiteWater.timeWarp = 0;
            WhiteWater.sfxPlayer.playSFX(WhiteWater.SFXs.timewarpActiveSound);
            WhiteWater.timeWarpActive = true;
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ESC]) && WhiteWater.gamestate == WhiteWater.GAMESTATE.PLAYING) {
            WhiteWater.pauseGame();
        }
    }
    function update(_event) {
        hndKey();
        WhiteWater.checkCollision();
        WhiteWater.spawnCounter++;
        if (WhiteWater.invulnerable == WhiteWater.invulnerableEnd) {
            WhiteWater.invulnerableActive = false;
            WhiteWater.shieldCDToHTML("RECHARGING");
            WhiteWater.deflectorNode.removeAllChildren();
        }
        else {
            WhiteWater.invulnerable++;
        }
        if (WhiteWater.deflectorShieldCooldown >= WhiteWater.deflectorShieldCooldownMax) {
            if (WhiteWater.deflectorShieldAvailable == false) {
                WhiteWater.sfxPlayer.playSFX(WhiteWater.SFXs.shieldReloadedSound);
            }
            WhiteWater.shieldCDToHTML("AVAILABLE");
            WhiteWater.deflectorShieldAvailable = true;
        }
        else {
            WhiteWater.deflectorShieldCooldown++;
        }
        if (WhiteWater.timeWarp == WhiteWater.timeWarpEnd) {
            WhiteWater.timeWarpActive = false;
        }
        else {
            WhiteWater.timeWarp++;
        }
        if (WhiteWater.timeWarpActive) {
            WhiteWater.spawnCounterTrue = WhiteWater.spawnCounterTimewarp;
        }
        else {
            WhiteWater.spawnCounterTrue = WhiteWater.spawnCounterMax;
        }
        if (WhiteWater.spawnCounter >= WhiteWater.spawnCounterTrue) {
            let posRock = new ƒ.Vector2();
            posRock.x = WhiteWater.randomIntInGamespace();
            posRock.y = 22;
            WhiteWater.spawnCounter = 0;
            WhiteWater.lootCounter++;
            if (WhiteWater.lootCounter == 5) {
                let posLoot = new ƒ.Vector2();
                posLoot.y = 22;
                posLoot.x = WhiteWater.randomIntInGamespace();
                WhiteWater.lootables.addChild(new WhiteWater.Loot(posLoot));
                WhiteWater.lootCounter = 0;
            }
            else if (Math.random() * 3 <= 1) {
                WhiteWater.rocks.addChild(new WhiteWater.Rock(posRock));
                WhiteWater.rocks.addChild(new WhiteWater.Rock(new ƒ.Vector2(WhiteWater.randomIntInGamespace(), 25)));
            }
            else {
                WhiteWater.rocks.addChild(new WhiteWater.Rock(posRock));
            }
        }
        for (let rock of WhiteWater.rocks.getChildren()) {
            if (WhiteWater.timeWarpActive == true) {
                rock.move(-1);
            }
            else {
                rock.move(-WhiteWater.velocity);
            }
            if (rock.mtxLocal.translation.y <= -1) {
                WhiteWater.rocks.removeChild(rock);
            }
        }
        for (let loot of WhiteWater.lootables.getChildren()) {
            if (WhiteWater.timeWarpActive == true) {
                loot.move(-1);
            }
            else {
                loot.move(-WhiteWater.velocity);
            }
            if (loot.mtxLocal.translation.y <= -1) {
                WhiteWater.lootables.removeChild(loot);
            }
        }
        for (let backGround of WhiteWater.backGroundNode.getChildren()) {
            if (WhiteWater.timeWarpActive == true) {
                backGround.move(-0.1);
            }
            else {
                backGround.move(-WhiteWater.backGroundVelocity);
            }
            if (backGround.mtxLocal.translation.y <= -22) {
                WhiteWater.backGroundNode.removeChild(backGround);
                WhiteWater.backGroundNode.appendChild(new WhiteWater.ScrollingBackground(44));
            }
        }
        WhiteWater.viewport.draw();
    }
    function gameStart() {
        WhiteWater.gamestate = WhiteWater.GAMESTATE.PLAYING;
        WhiteWater.sfxPlayer.menuSound(false);
        WhiteWater.sfxPlayer.playSFX(WhiteWater.SFXs.gameStartSound);
        WhiteWater.sfxPlayer.soundTrack(true);
        console.log(WhiteWater.gamestate);
        WhiteWater.modifySpawn();
        WhiteWater.gamestateTemp = WhiteWater.gamestate;
        WhiteWater.currentLives = WhiteWater.maxLives;
        WhiteWater.viewport.draw();
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    WhiteWater.gameStart = gameStart;
})(WhiteWater || (WhiteWater = {}));
/*
Alt+Shift+F = auto-format
Koordinatensystem = Rechtshändig
x = links (-) - rechts (+)
y = unten (-) - oben (+)
z = vorne (-) - honten (+)
F2 = refactor
Strg + D = Mehrere Cursor
Strg + # = ein/auskommentieren
Alt + Shift + A = Block ein/auskommentieren
Alt + Shift + Pfeil oben/unten = Zeile kopieren
Alt + Pfeil oben/unten = Zeile verschieben
*/ 
//# sourceMappingURL=WhiteWater.js.map