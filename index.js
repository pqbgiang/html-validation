var fs = require('fs');
var _ = require('underscore');

var validate = require('./validate')
var parse = require('./processor');

var Output = require('./output');

//constant variables
const DEFAULT_RULES = {
    img: 'alt', // validate if there are any <img />tags without alt attribute
    a: 'rel', // validate if there are any <a />tags without rel attribute
    header: {
        title: true, // validate if there is any header that doesn’t have <title>tag
        meta: ["description", "robots", "keywords"], // validate if you want to implement additional rule for meta tag, you just need to add a new tag to array.
    },
    strong: 15, // validate if there are more than 15 <strong>tag in HTML
    h1: 1, // validate if a HTML have more than one <H1>tag
}

var htmlValidation = function (globalRules) {
    if(_.isUndefined(globalRules)) {
        this.rules = DEFAULT_RULES;
    } else {
        this.rules = globalRules;
    } 

    this.input = null;
    this.output = null;
};

/**
 * Set Input for module
 * @param input: can be either:
 * i.   a html file
 * ii.  a node readable stream
 */
htmlValidation.prototype.setInput = function(input) {
    this.input = input;
}

/**
 * Set Output for module
 * @param output: can be either:
 * i.   a file
 * ii.  a node writable stream
 * iii. console (by default)
 * 
 */
htmlValidation.prototype.setOutput = function(output) {
    this.output= output;
}

/**
 * load a separate rules from JSON file to update global rules
 * @param filepath: a JSON filepath to define a customized rules
 */
htmlValidation.prototype.loadRulesFromFile = function(filepath) {
    var rules = require(filepath);
    this.rules = rules;
    console.log("rules: " + JSON.stringify(this.rules));
}

//validate local html based on rules
htmlValidation.prototype.validate = function() {
    var rules = this.rules;
    console.log("Starting the validation html file with: ")
    console.log('rules: ' + JSON.stringify(rules));

    //check input
    if(_.isNull(this.input)) {
        throw new Error('Invalid input.');
    }

    if(_.isNull(this.output)) {
        //console should be default output
        this.output = new Output().createOutputConsole();     
    }
    var output = this.output;
    
    this.input().done(function(rawHtml) {
        //process raw html
        parse(rawHtml).done(function(tags) {
            //console.log("processor tags.length=" + tags.length);

            //validate
            var results = validate(rules, tags);
            //should format result???

            output(results);
            console.log("Validation has been done.")
        });
    });
}

/**
 * validate config rules
 */
function validateRules() {
}

module.exports = htmlValidation;