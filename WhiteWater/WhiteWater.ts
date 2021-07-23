namespace WhiteWater {
    import ƒ = FudgeCore;
    window.addEventListener("load", init);

    gameNode.appendChild(viewportNode);
    gamestate = GAMESTATE.MAINMENU;
    console.log(gamestate);

    async function init(_event: Event): Promise<void> {
        await loadGameValues();
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        player = Player.getInstance();
        viewportNode.addChild(player);
        backGroundNode.appendChild(new ScrollingBackground(0));
        backGroundNode.appendChild(new ScrollingBackground(22));
        backGroundNode.appendChild(new ScrollingBackground(44));
        uiNode.appendChild(new UserInterface(-10.7, 10, "./Pics/leftpanel.png"));
        uiNode.appendChild(new UserInterface(10.7, 10, "./Pics/rightpanel.png"));
        viewportNode.addChild(uiNode);
        viewportNode.addChild(backGroundNode);
        viewportNode.addChild(lootables);
        viewportNode.addChild(rocks);
        player.appendChild(deflectorNode);

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(30);
        cmpCamera.mtxPivot.translateY(10);
        cmpCamera.mtxPivot.rotateY(180);
        viewport.initialize("Viewport", viewportNode, cmpCamera, canvas);
        console.log(gameNode);

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
            optionMenu();
        });
        document.getElementById("highscore").addEventListener("click", () => {
            document.getElementById("mainMenu").style.display = "none";
            highScore();
        });
        /* document.getElementById("exit").addEventListener("click", () => {
            document.getElementById("mainMenu").style.display = "none";
            window.close();
        }); */
        document.getElementById("continue").addEventListener("click", () => {
            document.getElementById("pauseMenu").style.display = "none";
            resumeGame();
        });
        document.getElementById("option2").addEventListener("click", () => {
            document.getElementById("pauseMenu").style.display = "none";
            optionMenuInGame();
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
            pauseGame();
        });
        document.getElementById("backMain").addEventListener("click", () => {
            document.getElementById("optionMenu").style.display = "none";
            mainMenu();
        });
        document.getElementById("backMainFromHS").addEventListener("click", () => {
            document.getElementById("highscoreMenu").style.display = "none";
            mainMenu();
        });
        document.getElementById("MasterVolume").addEventListener("input", changeMasterVolume);
        document.getElementById("MasterVolumeMainMenu").addEventListener("input", changeMasterVolume);
        mainMenu();



    }

    function hndKey(): void {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]) && Player.getInstance().mtxLocal.translation.x <= rightBorder && gamestate == GAMESTATE.PLAYING || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT]) && Player.getInstance().mtxLocal.translation.x <= rightBorder && gamestate == GAMESTATE.PLAYING) {
            player.moveRight();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]) && Player.getInstance().mtxLocal.translation.x >= leftBorder && gamestate == GAMESTATE.PLAYING || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT]) && Player.getInstance().mtxLocal.translation.x >= leftBorder && gamestate == GAMESTATE.PLAYING) {
            player.moveLeft();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.W]) && Player.getInstance().mtxLocal.translation.y <= 18 && gamestate == GAMESTATE.PLAYING || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_UP]) && Player.getInstance().mtxLocal.translation.y <= 18 && gamestate == GAMESTATE.PLAYING) {
            player.moveUp();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.S]) && Player.getInstance().mtxLocal.translation.y >= 0 && gamestate == GAMESTATE.PLAYING || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_DOWN]) && Player.getInstance().mtxLocal.translation.y >= 0 && gamestate == GAMESTATE.PLAYING) {
            player.moveDown();
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SPACE]) && deflectorShieldAvailable == true && gamestate == GAMESTATE.PLAYING) {
            deflectorShieldAvailable = false;
            shieldCDToHTML("ACTIVE");
            deflectorShieldCooldown = 0;
            invulnerableActive = true;
            invulnerable = 0;
            deflectorNode.addChild(new Deflector());
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_LEFT]) && timeWarpCharges != 0 && gamestate == GAMESTATE.PLAYING || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.SHIFT_RIGHT]) && timeWarpCharges != 0 && gamestate == GAMESTATE.PLAYING) {
            timeWarpCharges--;
            timeWarp = 0;
            
            sfxPlayer.playSFX(SFXs.timewarpActiveSound);
            timeWarpActive = true;
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ESC]) && gamestate == GAMESTATE.PLAYING) {
            pauseGame();
        }
    }

    function update(_event: Event): void {
        hndKey();
        checkCollision();

        spawnCounter++;

        if (invulnerable == invulnerableEnd) {
            invulnerableActive = false;
            shieldCDToHTML("RECHARGING");
            deflectorNode.removeAllChildren();
        } else {
            invulnerable++;
        }

        if (deflectorShieldCooldown >= deflectorShieldCooldownMax) {
            if (deflectorShieldAvailable == false) {
                sfxPlayer.playSFX(SFXs.shieldReloadedSound);
            }
            shieldCDToHTML("AVAILABLE");
            deflectorShieldAvailable = true;
        } else {
            deflectorShieldCooldown++;
        }

        if (timeWarp == timeWarpEnd) {
            timeWarpActive = false;
        } else {
            timeWarp++;

        }
        if (timeWarpActive) {
            spawnCounterTrue = spawnCounterTimewarp;
        } else {
            spawnCounterTrue = spawnCounterMax;
        }

        if (spawnCounter >= spawnCounterTrue) {
            let posRock: ƒ.Vector2 = new ƒ.Vector2();
            posRock.x = randomIntInGamespace();
            posRock.y = 22;

            spawnCounter = 0;
            lootCounter++;
            if (lootCounter == 5) {
                let posLoot: ƒ.Vector2 = new ƒ.Vector2();
                posLoot.y = 22;
                posLoot.x = randomIntInGamespace();
                lootables.addChild(new Loot(posLoot));
                lootCounter = 0;

            } else if (Math.random() * 3 <= 1) {
                rocks.addChild(new Rock(posRock));
                rocks.addChild(new Rock(new ƒ.Vector2(randomIntInGamespace(), 25)));
            } else {
                rocks.addChild(new Rock(posRock));
            }
        }

        for (let rock of rocks.getChildren() as Rock[]) {
            if (timeWarpActive == true) {

                rock.move(-1);
            } else {
                rock.move(-velocity);
            }
            if (rock.mtxLocal.translation.y <= -1) {
                rocks.removeChild(rock);
            }
        }

        for (let loot of lootables.getChildren() as Loot[]) {
            if (timeWarpActive == true) {

                loot.move(-1);
            } else {
                loot.move(-velocity);
            }
            if (loot.mtxLocal.translation.y <= -1) {
                lootables.removeChild(loot);
            }
        }

        for (let backGround of backGroundNode.getChildren() as ScrollingBackground[]) {
            if (timeWarpActive == true) {

                backGround.move(-0.1);
            } else {
                backGround.move(-backGroundVelocity);
            }
            if (backGround.mtxLocal.translation.y <= -22) {
                backGroundNode.removeChild(backGround);
                backGroundNode.appendChild(new ScrollingBackground(44));
            }

        }

        viewport.draw();
    }
    //Start Game
    export function gameStart(): void {
        gamestate = GAMESTATE.PLAYING;
        sfxPlayer.menuSound(false);
        sfxPlayer.playSFX(SFXs.gameStartSound);
        sfxPlayer.soundTrack(true);
        console.log(gamestate);
        modifySpawn();
        gamestateTemp = gamestate;

        currentLives = maxLives;
        viewport.draw();
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
    }



}



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