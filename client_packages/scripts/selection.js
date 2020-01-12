const cameraPos = new mp.Vector3(402.8877, -999.6817, -99.0);
const playerPos = new mp.Vector3(402.8664, -996.4108, -99.0);
const playerAngle = -180.0;

let teamData = undefined;
let skins = [];

let selectionCamera = undefined;

let currentIdx = 0;
let currentTeamIdx = -1;

function changeModel(modelName) {
    sharedVariables.localPlayer.model = mp.game.joaat(modelName);
    sharedVariables.localPlayer.clearTasksImmediately();
    sharedVariables.localPlayer.freezePosition(true);
    sharedVariables.localPlayer.taskStartScenarioInPlace("WORLD_HUMAN_GUARD_STAND", -1, false);

    currentTeamIdx = getTeamFromModel(modelName);
    sharedVariables.teamName = currentTeamIdx > -1 ? `~${teamData[currentTeamIdx].Color}~${teamData[currentTeamIdx].Name}` : "";
}

function getTeamFromModel(modelName) {
    for (let i = 0, max = teamData.length; i < max; i++) {
        if (teamData[i].Skins.includes(modelName)) {
            return i;
        }
    }

    return -1;
}

mp.events.add("receiveTeamData", (jsonData) => {
    teamData = JSON.parse(jsonData);
    teamData.forEach((team) => skins.push.apply(skins, team.Skins));

    changeModel(skins[0]);
});

mp.events.add("setSelectionState", (enable) => {
    if (enable) {
        sharedVariables.localPlayer.setCoordsNoOffset(playerPos.x, playerPos.y, playerPos.z, false, false, false);
        sharedVariables.localPlayer.setHeading(playerAngle);
        sharedVariables.localPlayer.clearTasksImmediately();
        sharedVariables.localPlayer.freezePosition(true);
        sharedVariables.localPlayer.taskStartScenarioInPlace("WORLD_HUMAN_GUARD_STAND", -1, false);

        selectionCamera = mp.cameras.new("selectionCamera", cameraPos, new mp.Vector3(0.0, 0.0, 0.0), 38);
        selectionCamera.pointAtCoord(playerPos);
        selectionCamera.setActive(true);

        mp.game.cam.renderScriptCams(true, false, 0, true, false);
        mp.game.ui.displayRadar(false);
    } else {
        sharedVariables.localPlayer.freezePosition(false);

        selectionCamera.setActive(false);
        mp.game.cam.renderScriptCams(false, false, 0, true, false);
        mp.game.ui.displayRadar(true);

        selectionCamera.destroy();
        selectionCamera = undefined;
    }

    sharedVariables.selectionActive = enable;
    sharedVariables.drawUI = !enable;
});

mp.events.add("render", () => {
    if (sharedVariables.selectionActive) {
        mp.game.controls.disableAllControlActions(0);
    }
});

// Left arrow - previous skin
mp.keys.bind(0x25, true, () => {
    if (sharedVariables.selectionActive) {
        currentIdx = (currentIdx - 1 + skins.length) % skins.length;
        changeModel(skins[currentIdx]);
    }
});

// Right arrow - next skin
mp.keys.bind(0x27, true, () => {
    if (sharedVariables.selectionActive) {
        currentIdx = (currentIdx + 1 + skins.length) % skins.length;
        changeModel(skins[currentIdx]);
    }
});

// Shift - request spawn
mp.keys.bind(0x10, false, () => {
    if (sharedVariables.selectionActive) mp.events.callRemote("requestSpawn", currentTeamIdx, skins[currentIdx]);
});

// F4 - request team selection
mp.keys.bind(0x73, false, () => {
    if (!sharedVariables.selectionActive) mp.events.callRemote("requestTeamSelection");
});