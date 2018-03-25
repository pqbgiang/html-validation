var fs = require('fs');

function Output() {
}

function pretty(msg) {
    return JSON.stringify(msg, null, 2);
}

Output.prototype.createOutputConsole = function () {

    // write function
    return function (msg) {
        console.log(pretty(msg));
    }
}

/**
 * Open a file from file path
 * @param {string} filePath - the location of the HTML file
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
 * Open a node writeable stream
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

