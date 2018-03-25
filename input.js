var fs = require('fs');
var when = require('when');

/**
 * create an input method
 * @constructor
 */
function Input() {
}

/**
 * load a file from file path
 */
Input.prototype.loadInputFile = function(filepath) {
    return function() {
        var deferred = when.defer();
        fs.readFile(filepath, function(err, data) {
            if(err) return deferred.reject(err);
            var rawHTML = data.toString().replace((/  |\r\n|\n|\r/gm), "");
            deferred.resolve(rawHTML);
        });
        return deferred.promise;
    }
}

Input.prototype.loadInputStream = function(stream) {
    return function() {
        var deferred = when.defer();
        var rawHTML = "";
        if(typeof stream !== 'object' &&  typeof stream.on !== 'function') {
            deferred.reject('Invalid stream object!');
        } else {
            stream.on('data', function(data) {
                rawHTML = data.toString().replace((/  |\r\n|\n|\r/gm),"");
            });
            stream.on('error', function(err) {
                deferred.reject(err);
            });
            stream.on('end', function(){
                deferred.resolve(rawHTML);
            });
        }

        return deferred.promise;
    }
}

module.exports = Input;