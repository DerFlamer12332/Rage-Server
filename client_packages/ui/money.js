const util = require("util");

const drawX = 0.9999;
const drawY = 0.04;
const diffOffsetY = 0.038;
const fontScale = 0.562;

let drawPos = [drawX - (1.0 - sharedDrawingVariables.safeZoneSize) * 0.5, drawY + (1.0 - sharedDrawingVariables.safeZoneSize) * 0.5];
let diffDrawPos = [drawPos[0], drawPos[1] + diffOffsetY];

mp.events.add("onDrawingVariableChange", (varName, oldValue, newValue) => {
    if (varName === "safeZoneSize") {
        drawPos = [drawX - (1.0 - newValue) * 0.5, drawY + (1.0 - newValue) * 0.5];
        diffDrawPos = [drawPos[0], drawPos[1] + diffOffsetY];
    }
});

mp.events.add("render", () => {
    mp.game.ui.hideHudComponentThisFrame(3);

    if (sharedVariables.drawUI || sharedVariables.garageActive) {
        util.drawText(sharedVariables.moneyText, drawPos, fontScale, 7, undefined, 2);
        if (Date.now() < sharedVariables.moneyDiffTime) util.drawText(sharedVariables.moneyDiffText, diffDrawPos, fontScale, 7, undefined, 2);
    }
});