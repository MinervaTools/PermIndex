const fs = require("fs");
const path = require("path");

const basePath = path.join(__dirname, "..");
const dataPath = path.join(basePath, "data");

const minecraftCommands = {
    advancement: "op",
    ban: "op",
    "ban-ip": "op",
    banlist: "op",
    clear: "op",
    debug: "op",
    defaultgamemode: "op",
    deop: "op",
    difficulty: "op",
    effect: "op",
    enchant: "op",
    gamemode: "op",
    gamerule: "op",
    give: "op",
    help: "true",
    kick: "op",
    kill: "op",
    list: "op",
    me: "true",
    op: "op",
    pardon: "op",
    "pardon-ip": "op",
    playsound: "op",
    "save-all": "op",
    "save-off": "op",
    "save-on": "op",
    say: "op",
    scoreboard: "op",
    seed: "op",
    setblock: "op",
    fill: "op",
    setidletimeout: "op",
    setworldspawn: "op",
    spawnpoint: "op",
    spreadplayers: "op",
    stop: "op",
    summon: "op",
    msg: "true",
    tellraw: "op",
    testfor: "op",
    testforblock: "op",
    time: "op",
    toggledownfall: "op",
    teleport: "op",
    weather: "op",
    whitelist: "op",
    xp: "op",
};

let output = [];

for (let command in minecraftCommands) {
    let obj = {
        name: `minecraft.command.${command}`,
        description: `Use Minecraft ${command}-command`,
        default: minecraftCommands[command],
        affectedCommands: [
            {
                command: command,
            },
        ],
    };

    output.push(obj);
}

console.log(JSON.stringify(output, null, 4));
