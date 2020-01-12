const database = require("./database");
const util = require("./util");

database.init(() => {
    util.loadFiles("scripts", "events", "commands");
});