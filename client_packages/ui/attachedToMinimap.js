const util = require("util");

let minimap = util.getMinimapAnchor();

const textDistance = 15;
const killstreakDistance = 30;
const firingModeDistance = 60;
const turfInfoDistance = 30;

const teamFontScale = 0.5;
const killstreakFontScale = 0.45;
const firingModeFontScale = 0.45;
const turfInfoFontScale = 0.45;

let teamDrawPos = [minimap.rightX + minimap.scaleX * textDistance, minimap.topY];
let killstreakDrawPos = [minimap.rightX + minimap.scaleX * textDistance, minimap.topY + minimap.scaleY * killstreakDistance];
let firingModeDrawPos = [minimap.rightX + minimap.scaleX * textDistance, minimap.topY + minimap.scaleY * firingModeDistance];
let turfInfoDrawPos = [minimap.rightX + minimap.scaleX * textDistance, minimap.bottomY - minimap.scaleY * turfInfoDistance];

mp.events.add("onDrawingVariableChange", () => {
    minimap = util.getMinimapAnchor();

    teamDrawPos = [minimap.rightX + minimap.scaleX * textDistance, minimap.topY];
    killstreakDrawPos = [minimap.rightX + minimap.scaleX * textDistance, minimap.topY + minimap.scaleY * killstreakDistance];
    firingModeDrawPos = [minimap.rightX + minimap.scaleX * textDistance, minimap.topY + minimap.scaleY * firingModeDistance];
    turfInfoDrawPos = [minimap.rightX + minimap.scaleX * textDistance, minimap.bottomY - minimap.scaleY * turfInfoDistance];
});

mp.events.add("render", () => {
    if (sharedVariables.drawUI) {
        util.drawText(sharedVariables.teamName, teamDrawPos, teamFontScale);

        if (sharedVariables.drawFiringMode) {
            util.drawText(sharedVariables.firingModeText, firingModeDrawPos, firingModeFontScale);
        }

        if (sharedVariables.drawTurfUI) {
            util.drawText(sharedVariables.turfText, turfInfoDrawPos, turfInfoFontScale);
        }

        util.drawText(sharedVariables.killstreakText, killstreakDrawPos, killstreakFontScale);
    }
});