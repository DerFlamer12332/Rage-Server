const database = require("../database");
const logUtil = require("../logUtil");
const config = require("../config");

mp.events.addCommand("tp", (player, _, x, y, z) => {
    if (player.isLoggedIn && player.admin > 0) {
        x = parseFloat(x);
        y = parseFloat(y);
        z = parseFloat(z);

        if (isNaN(x) || isNaN(y) || isNaN(z)) {
            player.outputChatBox("!{#FF8555}SYNTAX: !{#FFFFFF}/tp [x] [y] [z]");
            return;
        }

        player.position = new mp.Vector3(x, y, z);
    }
});

mp.events.addCommand("agivemoney", (player, _, targetID, amount) => {
    if (player.isLoggedIn && player.admin > 0) {
        targetID = Number(targetID);
        amount = Number(amount);

        if (isNaN(targetID) || isNaN(amount)) {
            player.outputChatBox("!{#FF8555}SYNTAX: !{#FFFFFF}/agivemoney [player ID] [amount]");
            return;
        }

        let targetPlayer = mp.players.at(targetID);
        if (!targetPlayer) {
            player.outputChatBox("!{#E03232}ERROR: !{#FFFFFF}Player not found.");
            return;
        }

        if (!targetPlayer.isLoggedIn) {
            player.outputChatBox("!{#E03232}ERROR: !{#FFFFFF}Player didn't log in.");
            return;
        }

        logUtil.igEventLog.info(`[AGIVEMONEY] ${player.name}(${player.id}) gave $${amount} to ${targetPlayer.name}(${targetPlayer.id}).`);
        targetPlayer.changeMoney(amount);
        targetPlayer.outputChatBox(`Admin ${player.name}(${player.id}) gave you !{#72CC72}$${amount}.`);
        player.outputChatBox(`Gave !{#72CC72}$${amount} !{#FFFFFF}to ${targetPlayer.name}(${targetPlayer.id}).`);

        if (config.dbLogging.adminActions) {
            database.pool.query("INSERT INTO log_admin SET AdminID=?, TargetID=?, Action='ACTION_GIVEMONEY', Details=?", [player.sqlID, targetPlayer.sqlID, amount]);
        }
    }
});

mp.events.addCommand("agiveweapon", (player, _, targetID, weaponName, ammo = 9999) => {
    if (player.isLoggedIn && player.admin > 0) {
        targetID = Number(targetID);
        ammo = Number(ammo);

        if (isNaN(targetID) || isNaN(ammo) || weaponName === undefined || weaponName.length < 1) {
            player.outputChatBox("!{#FF8555}SYNTAX: !{#FFFFFF}/agiveweapon [player ID] [weapon name] [ammo (will be 9999 if not specified)]");
            return;
        }

        let targetPlayer = mp.players.at(targetID);
        if (!targetPlayer) {
            player.outputChatBox("!{#E03232}ERROR: !{#FFFFFF}Player not found.");
            return;
        }

        if (!targetPlayer.isLoggedIn) {
            player.outputChatBox("!{#E03232}ERROR: !{#FFFFFF}Player didn't log in.");
            return;
        }

        logUtil.igEventLog.info(`[AGIVEWEAPON] ${player.name}(${player.id}) gave ${weaponName} with ${ammo} ammo to ${targetPlayer.name}(${targetPlayer.id}).`);
        targetPlayer.giveWeapon(mp.joaat(weaponName), ammo);
        targetPlayer.outputChatBox(`Admin ${player.name}(${player.id}) gave you ${weaponName} with ${ammo} ammo.`);
        player.outputChatBox(`Gave ${weaponName} with ${ammo} ammo to ${targetPlayer.name}(${targetPlayer.id}).`);

        if (config.dbLogging.adminActions) {
            database.pool.query("INSERT INTO log_admin SET AdminID=?, TargetID=?, Action='ACTION_GIVEWEAPON', Details=?", [player.sqlID, targetPlayer.sqlID, `Weapon: ${weaponName} | Ammo: ${ammo}`]);
        }
    }
});

mp.events.addCommand("kick", (player, _, targetID, ...reason) => {
    if (player.isLoggedIn && player.admin > 0) {
        targetID = Number(targetID);
        reason = reason.join(' ');

        if (isNaN(targetID) || reason === undefined || reason.length < 1) {
            player.outputChatBox("!{#FF8555}SYNTAX: !{#FFFFFF}/kick [player ID] [reason]");
            return;
        }

        if (player.id === targetID) {
            player.outputChatBox("!{#E03232}ERROR: !{#FFFFFF}You can't kick yourself.");
            return;
        }

        let targetPlayer = mp.players.at(targetID);
        if (!targetPlayer) {
            player.outputChatBox("!{#E03232}ERROR: !{#FFFFFF}Player not found.");
            return;
        }

        if (!targetPlayer.isLoggedIn) {
            player.outputChatBox("!{#E03232}ERROR: !{#FFFFFF}Player didn't log in.");
            return;
        }

        logUtil.igEventLog.info(`[KICK] ${player.name}(${player.id}) kicked ${targetPlayer.name}(${targetPlayer.id}) with reason ${reason}.`);
        mp.players.broadcast(`!{#FF8555}KICK: !{FFFFFF}${targetPlayer.name}(${targetPlayer.id}) has been kicked by ${player.name}(${player.id}). (${reason})`);
        player.outputChatBox(`Kicked ${targetPlayer.name}.`);
        targetPlayer.kick();

        if (config.dbLogging.adminActions) {
            database.pool.query("INSERT INTO log_admin SET AdminID=?, TargetID=?, Action='ACTION_KICK', Details=?", [player.sqlID, targetPlayer.sqlID, `Reason: ${reason}`]);
        }
    }
});