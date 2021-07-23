"use strict";
var WhiteWater;
(function (WhiteWater) {
    let GAMESTATE;
    (function (GAMESTATE) {
        GAMESTATE[GAMESTATE["PLAYING"] = 0] = "PLAYING";
        GAMESTATE[GAMESTATE["PAUSE"] = 1] = "PAUSE";
        GAMESTATE[GAMESTATE["MAINMENU"] = 2] = "MAINMENU";
        GAMESTATE[GAMESTATE["OPTIONS"] = 3] = "OPTIONS";
        GAMESTATE[GAMESTATE["HIGHSCORE"] = 4] = "HIGHSCORE";
        GAMESTATE[GAMESTATE["GAMEOVER"] = 5] = "GAMEOVER";
    })(GAMESTATE = WhiteWater.GAMESTATE || (WhiteWater.GAMESTATE = {}));
})(WhiteWater || (WhiteWater = {}));
//# sourceMappingURL=GameState.js.map