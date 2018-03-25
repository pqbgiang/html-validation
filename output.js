var fs = require('fs');

function Output() {
}

/**
 * create a pretty string for object
 * @param {object} msg
 */
function pretty(msg) {
    return JSON.stringify(msg, null, 2);
}

/**
 * create an output console
 * @param {object} output - console
 */
Output.prototype.createOutputConsole = function () {

    // write function
    return function (msg) {
        console.log(pretty(msg));
    }
}

/**
 * create an output file with file path
 * @param {string} filePath - the location of file to save the validation result
 */
Output.prototype.createOutputFile = function (filePath) {

    // write function
    return function (msg) {
        var out = pretty(msg);
        fs.writeFile(filePath, out, function (err) {
            if (err) {
                throw err;
            }
        });
    }
}

/**
 * Create a node writeable stream
 * @param {object} stream - A node writeable stream
 */
Output.prototype.createOutputStream = function (stream) {

    // write function
    return function (msg) {
        stream.write(msg, function (err) {
            if (err) {
                throw err;
            }
        });
        stream.end();
    }
}

module.exports = Output;

