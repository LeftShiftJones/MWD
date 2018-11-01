/**
 * Extra Credit Project for COS 243
 * Ryan Jones
 * 10/26/2018
 */

const fs = require('fs');
const path = require('path');

/**
 * Callback-based function that copies lines fitting a specified expression to a specified directory
 * @param {String} pattern Regular Expression Pattern to compare
 * @param {Strint} fromDir Directory to search through
 * @param {Strint} toDir Directory to write to
 */
function dirFilterWithCallbacks(pattern, fromDir, toDir) {
    // Create a regular expresion from the pattern on the command line.
    const re = RegExp(pattern);
    // Create the "to" directory.
    fs.mkdir(toDir, err => {
        if (err) {
            if (err.code === 'EEXIST') {
                // Don't freak out if it already exists.
                console.warn(`Desination directory '${toDir}' already exists; continuing`);
            } else {
                throw (err);
            }
        }

        // Read the "from" directory.
        fs.readdir(fromDir, (err, fileNames) => {
            if (err) {
                throw (err);
            }
            // For each file in the "from" directory:
            for (let fileName of fileNames) {
                // Read the file
                fs.readFile(path.join(fromDir, fileName), {
                    encoding: 'utf-8'
                }, (err, data) => {
                    if (err) {
                        throw (err);
                    }
                    console.log(`==== ${fileName} ====`);
                    let outputLines = [];
                    // Iterate over each line of the file
                    for (let line of data.split(/\n/)) {
                        // If the line matches the input pattern
                        if (line.match(re)) {
                            // Add it to the lines to be written to the "to" directory.
                            console.log(`>>> ${line}`);
                            outputLines.push(line);
                        } else {
                            console.log(`    ${line}`);
                        }
                    }
                    // Write matchine lines to the corresponding file in the "to" directory.
                    const toPath = path.join(toDir, fileName);
                    fs.writeFile(toPath, outputLines.join('\n') + '\n', err => {
                        if (err) {
                            throw (err);
                        } else {
                            console.log(`Wrote ${outputLines.length} lines to ${toPath}`);
                        }
                    });
                });
            }
        });
    });
}

/**
 * Function that promisifies the creation of a new directory
 * @param {String} toDir Directory to create
 */
function make_directory(toDir) {
    return new Promise((resolve, reject) => {
        fs.mkdir(toDir, err => {
            if (err.code === 'EEXIST') {
                resolve(1);
            } else if(err != null) {
                reject(err);
            } else {
                resolve(2);
            }
        });
    });
}

/**
 * Function that promisifies reading from a directory
 * @param {String} fromDir Directory to reference
 */
function read_directory(fromDir) {
    return new Promise((resolve, reject) => {
        fs.readdir(fromDir, (err, fileNames) => {
            if (err) {
                reject(err);
            } else {
                resolve(fileNames);
            }
        });
    });
}

/**
 * Function that promisifies the reading of files from a specified directory
 * @param {String} filePath Specific filepath
 * @param {String} fileName Name of file to reference
 * @param {Regular Expression} re Regular expression to match
 */
function read_files(filePath, fileName, re) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, {
            encoding: 'utf-8'
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            console.log(`==== ${fileName} ====`);
            let outputLines = [];
            for (let line of data.split(/\n/)) {
                if (line.match(re)) {
                    console.log(`>>> ${line}`);
                    outputLines.push(line);
                } else {
                    console.log(`    ${line}`);
                }
            }
            resolve(outputLines);
        });
    });
}

/**
 * Function that promisifies the writing of files
 * @param {String} filePath
 * @param {} lines 
 */
function write_files(filePath, lines) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, lines.join('\n') + '\n', err => {
            if (err) {
                reject(err);
            } else {
                console.log(`Wrote ${lines.length} lines to ${filePath}`);
                resolve();
            }
        });
    });
}

/**
 * Function that calls promisified version of directory filtering
 * @param {String} pattern Pattern to match
 * @param {String} fromDir Directory to search
 * @param {String} toDir Directory to copy to
 */
function dirFilterWithPromises(pattern, fromDir, toDir) {
    const re = RegExp(pattern);
    make_directory(toDir)
    .then(val => {
    if(val==1) { console.warn(`Destination directory '${toDir}' already exists; continuing...`); }
    read_directory(fromDir)
    .then(results => {
        for(let filename of results) {
            let filepath = path.join(fromDir, filename);
            read_files(filepath, filename, re)
            .then(lines => {
                let toPath = path.join(toDir, filename);
                write_files(toPath, lines)
                    .then(() => { console.log(`Wrote ${lines.length} lines to ${toPath}`); })
            });
        }
    });
    })
    .catch(err => {
        console.error(`${err}`);
    });
}

// Get the name of the program for error reporting.
const prog = path.basename(process.argv[1]);

// Process command-line arguments.
if (process.argv.length != 5) {
    console.error(`Usage: ${prog}: <pattern> <from dir> <to dir>`);
    process.exit(1);
}

// Extract and echo relevant arguments from the command line.
let [, , pattern, fromDir, toDir] = process.argv;
console.log(`Match '${pattern}' from files in '${fromDir}' to '${toDir}'`);

//Have this:
dirFilterWithCallbacks(pattern, fromDir, toDir);

//Implemented this:
dirFilterWithPromises(pattern, fromDir, toDir);
//*/