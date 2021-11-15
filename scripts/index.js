const colors = require("colors");
const Validator = require("jsonschema").Validator;
const Spinner = require("cli-spinner").Spinner;
const cliProgress = require("cli-progress");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const package = require("../package.json");
const dataSchema = require("../meta/data.schema.json");

const basePath = path.join(__dirname, "..");
const dataPath = path.join(basePath, "data");

let dataFiles = [];

const run = async () => {
    console.log(("PermIndex v" + package.version).rainbow);
    console.log("Validator, Formatter and Builder 🏗️".green);
    console.log();

    await initialize();
    console.log();

    await validate();

    var spinner = new Spinner("🖌️  Formatting... %s".green);
    spinner.setSpinnerString("|/-\\");
    spinner.start();
    await format();
    spinner.stop(true);
    console.log("🖌️  Formatted.".green);
};

const initialize = async () => {
    var spinner = new Spinner("💼 Initializing... %s".green);
    spinner.setSpinnerString("|/-\\");
    spinner.start();

    const files = fs.readdirSync(dataPath);

    await Promise.all(
        files.map(
            (folder) =>
                new Promise(async (resolve, reject) => {
                    const folderPath = path.join(dataPath, folder);

                    if (!fs.statSync(folderPath).isDirectory()) {
                        resolve();
                        return;
                    }

                    await dirIndex(folderPath);

                    resolve();
                })
        )
    );

    spinner.stop(true);
    console.log("💼 Initialized.".green);

    console.log((" Found " + dataFiles.length + " data files.").blue);
};

const dirIndex = (folderPath) =>
    new Promise(async (resolve, reject) => {
        const files = fs.readdirSync(folderPath);

        await Promise.all(
            files.map(
                (file) =>
                    new Promise(async (resolve, reject) => {
                        const fPath = path.join(folderPath, file);
                        const stat = fs.statSync(fPath);

                        if (stat.isDirectory()) {
                            await dirIndex(fPath);
                            resolve();
                            return;
                        }

                        if (!stat.isFile()) {
                            resolve();
                            return;
                        }

                        if (!fPath.endsWith(".json")) {
                            resolve();
                            return;
                        }

                        dataFiles.push(fPath);
                        resolve();
                    })
            )
        );

        resolve();
    });

const validate = async () => {
    console.log("🔍 Validation".green);

    const bar1 = new cliProgress.SingleBar(
        {},
        cliProgress.Presets.shades_classic
    );

    const reportDone = () => {
        bar1.increment();
    };

    var v = new Validator();

    bar1.start(dataFiles.length, 0);

    let results = {};
    let additionalErrors = {};

    await Promise.all(
        dataFiles.map(
            (file) =>
                new Promise(async (resolve, reject) => {
                    const content = fs.readFileSync(file);

                    const json = JSON.parse(content);

                    results[file] = v.validate(json, dataSchema);
                    additionalErrors[file] = [];

                    let seenNames = [];

                    json.forEach((el) => {
                        if (seenNames.includes(el.name)) {
                            additionalErrors[file].push(
                                `Duplicate permission name: ${el.name}`
                            );
                            return;
                        }

                        seenNames.push(el.name);
                    });

                    json.sort((a, b) => {
                        if (a.name < b.name) {
                            return -1;
                        }
                        if (a.name > b.name) {
                            return 1;
                        }
                        return 0;
                    });

                    fs.writeFileSync(file, JSON.stringify(json, null, 4));

                    reportDone();
                    resolve();
                })
        )
    );

    bar1.stop();

    let foundErrors = false;

    dataFiles.forEach((file) => {
        const res = results[file];
        const additional = additionalErrors[file];

        if (res.errors.length === 0 && additional.length === 0) {
            console.log((" ✅ " + file.replace(basePath, "")).green);
            return;
        }

        foundErrors = true;

        console.log((" ❌ " + file.replace(basePath, "")).red);

        res.errors.forEach((error) => {
            console.log(`  Error @ ${error.property}: ${error.message}`);
        });

        additional.forEach((error) => {
            console.log(`  Error: ${error}`);
        });
    });

    console.log();

    if (foundErrors) {
        console.error(
            "PermIndex has encountered errors in your files. Please fix them to continue!"
                .red
        );
        process.exit(1);
    }
};

const format = () =>
    new Promise((resolve, reject) => {
        exec("npm run format", { cwd: basePath }, (error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve();
        });
    });

run();
