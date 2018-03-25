
/**
 * this is to parse and process local HTML, to gather tag
 */

var htmlparser = require('htmlparser2');
var when = require('when');


function processor(rawhtml) {
}

var tags = [];

/**
 * to parse rawhtml to array of tags
 * @param {string} rawhtml 
 */
function parse(rawhtml) {
    var deferred = when.defer();
    var parser = new htmlparser.Parser({
        onopentag: function (name, attributes) {
            //console.log("parser onopentag: name=" + name + " attributes=" + JSON.stringify(attributes));
            tags.push({
                name, attributes
            });
        },

        onend: function () {
            //console.log("parser end!.");
            deferred.resolve(tags);
        }
    }, { decodeEntities: true });

    parser.write(rawhtml);
    parser.end();

    return deferred.promise;
}

module.exports = parse;