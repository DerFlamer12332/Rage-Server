const fs = require("fs");
const path = require("path");
const logUtil = require("./logUtil");

module.exports.loadFiles = function(...dirNames) {
    dirNames.forEach((dirName) => {
        let finalPath = path.join(__dirname, dirName);

        fs.readdir(finalPath, (error, files) => {
            if (error) {
                logUtil.log.error(`Failed reading directory "${dirName}": ${error.message}`);
            } else {
                files.forEach((file) => {
                    try {
                        if (dirName === "scripts") {
                            require(path.join(finalPath, file)).init();
                        } else {
                            require(path.join(finalPath, file));
                        }

                        logUtil.log.info(`Loaded file "${file}" from "${dirName}".`);
                    } catch (e) {
                        logUtil.log.error(`Failed loading file "${file}" from "${dirName}": ${e.message}`);
                    }
                });
            }
        });
    });
};

// https://stackoverflow.com/a/11508164
module.exports.hex2rgb = function(hex, alpha = 255) {
    let bigint = parseInt(hex.replace(/[^0-9A-F]/gi, ''), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255, alpha];
};

module.exports.getPlayersOfTeam = function(teamName) {
    return mp.players.toArray().filter(p => p.data.currentTeam === teamName);
};

module.exports.generateRandomString = function(maxLength = 8) {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let string = "";
    for (let i = 0, charsLen = characters.length; i < maxLength; i++) string += characters[ Math.floor(Math.random() * charsLen) ];
    return string;
};


module.exports.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};