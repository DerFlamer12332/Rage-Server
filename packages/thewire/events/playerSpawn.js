const config = require("../config");

mp.events.add("playerSpawn", (player) => {
    if (player.spawnInTeamSelection) {
        player.dimension = player.id + 1;
        player.spawnInTeamSelection = false;
        player.call("setSelectionState", [true]);
    } else {
        if (player.spawnProtectionTimer) clearTimeout(player.spawnProtectionTimer);

        if (config.spawnProtectionSeconds > 0) {
            player.spawnProtectionTimer = setTimeout(() => {
                player.data.spawnProtection = false;
                config.spawnWeapons.forEach((weapon) => player.giveWeapon(mp.joaat(weapon.Name), weapon.Ammo));
                player.outputChatBox("Spawn protection ended.");

                clearTimeout(player.spawnProtectionTimer);
                player.spawnProtectionTimer = undefined;
            }, config.spawnProtectionSeconds * 1000);

            player.data.spawnProtection = true;
            player.outputChatBox(`You're spawn protected for ${config.spawnProtectionSeconds} seconds.`);
        } else {
            config.spawnWeapons.forEach((weapon) => player.giveWeapon(mp.joaat(weapon.Name), weapon.Ammo));
        }
    }

    if (player.respawnTimer) {
        clearTimeout(player.respawnTimer);
        player.respawnTimer = undefined;
    }
});