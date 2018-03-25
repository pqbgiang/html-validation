/**
 * this is a main file of module to define the rule handlers to validate html tags
 */

//include the libraries
var _ = require('underscore');
var lodash = require('lodash');


var validateActions = {}

//define operations of validation which should be used to validate html tag

/**
 * check if having any tag without attribute
 * @param {array} tags 
 * @param {string} tagName 
 * @param {string or array} tagAttribute 
 */
function checkNoActtribute(tags, tagName, tagAttribute) {
    var count = tags.filter(tag => tag.name == tagName && !tag.attributes.hasOwnProperty(tagAttribute)).length;
    if(count > 0) {
        return count + " <" + tagName + "> tag without " + tagAttribute;          
    }

    //return "No <" + tagName + "> without " + tagAttribute + ", count=" + count + " (no defect)"; //no defect found! to debug
    return ""; //no defect found, dusplay nothing.
}

/**
 * check if any tag having no attribute with expected value
 * @param {array} tags 
 * @param {string} tagName 
 * @param {string} tagAttribute 
 * @param {string} tagAttributeValue 
 */
function checkNoActtributeAndValue(tags, tagName, tagAttribute, tagAttributeValue) {
    //count the number of tagName has attribute with expected value
    var count = tags.filter(tag => tag.name == tagName && 
        tag.attributes.hasOwnProperty(tagAttribute) && 
        tag.attributes[tagAttribute] == tagAttributeValue).length;

    if(count == 0) {
        return count + " <" + tagName + "> tag without " + tagAttribute + "=" + tagAttributeValue;          
    }

    //return "No <" + tagName + "> without " + tagAttribute + "=" + tagAttributeValue+ ", count=" + count + " (no defect)"; //no defect found! to debug
    return ""; //no defect found, display nothing
}
/**
 * check if having more than a limit tag
 * @param {array} tags 
 * @param {string} tagName
 * @param {number} limit 
 */
function checkHasMoreTag(tags, tagName, limit) {
    var count = tags.filter(tag => tag.name === tagName).length;

    if(count > limit) {
        return "This HTML has more than " + limit  + " <" + tagName + "> tag, count=" + count;        
    }

    //return "<" + tagName + "> tag has count=" + count + "(no defect)";//no defect found, to debug
    return ""; //no defect found, display nothing
}

/**
 * check if having no tag
 * @param {array} tags 
 * @param {string} tagName 
 */
function checkNoTag(tags, tagName) {
    var count = tags.filter(tag => tag.name === tagName).length;

    if(count == 0) {
        return "This HTML has no " + " <" + tagName + "> tag, count=" + count;        
    }

    //return "<" + tagName + "> tag has count=" + count + "(no defect)";//no defect found, to debug
    return ""; //no defect found, display nothing
}

/**
 * to valiate <img> tag
 * @param {array} tags 
 * @param {string} attribute 
 */
function validateImage(tags, attribute) {
    return checkNoActtribute(tags, 'img', attribute);
}

//Add action into actions list
validateActions.img = validateImage;

/**
 * to validate <a> tag
 * @param {array} tags 
 * @param {string} attribute 
 */
function validateA(tags, attribute) {
    return checkNoActtribute(tags, 'a', attribute);
}

//Add action into actions list
validateActions.a = validateA;

/**
 * to validate <head> tag and its children <meta> tags
 * @param {array} tags 
 * @param {array} rules 
 */
function validateHeader(tags, rules) {
    var result = "";
    if(rules.hasOwnProperty('title')) {
        result = checkNoTag(tags, 'title');
        if(result.length > 0) {
            result = result + ". ";
        }
    }
    
    if(rules.hasOwnProperty('meta')) {
        var meta = rules.meta;
        _.each(meta, function(metaItem) {
            result = result + checkNoActtributeAndValue(tags, 'meta', 'name', metaItem);
            if(result.length > 0) {
                result = result + ". ";
            }
        });
    }

    return result;
}

//Add action into actions list
validateActions.header = validateHeader;

/**
 * to validate <strong> tag
 * @param {array} tags 
 * @param {number} limit 
 */
function validateStrong(tags, limit) {
    return checkHasMoreTag(tags, "strong", limit);
}

//Add action into actions list
validateActions.strong = validateStrong;

/**
 * to validate <h1> tag
 * @param {array} tags 
 * @param {number} limit 
 */
function validateH1(tags, limit) {
    return checkHasMoreTag(tags, "h1", limit);
}

//Add action into actions list
validateActions.h1 = validateH1;

//To add more action to validate other tags here
//e.g: h3, li, ul

/**
 * to validate all tags in html based on rules
 * @param {array} rules 
 * @param {array} tags 
 */
function validate(rules, tags) {
    var results = {};
    //console.log('doValidation rules: ' + JSON.stringify(rules));
    _.each(rules, function(value, key) {
            var tag = lodash.toLower(key);
            //console.log("doValidation: tag=" + tag + " rule=" + value);
            if(validateActions.hasOwnProperty(tag)) {
                results[tag] = validateActions[tag](tags, value);
            } else {
                console.log("Not support to validate tag=" + tag);
            }
        }
    );
    return results;
}

module.exports = validate;