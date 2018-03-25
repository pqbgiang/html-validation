/**
 * this file is a sample test to check inputStream and outputFile
 */
var htmlValidation = require('../index');
var Input = require('../input');
var Output = require('../output');
var fs = require('fs');

var HtmlValidation = new htmlValidation(
);

var readable_stream = fs.createReadStream(__dirname  + '\\sample2.html');
HtmlValidation.setInput(new Input().loadInputStream(readable_stream));

HtmlValidation.setOutput(new Output().createOutputFile(__dirname  + '\\outputFile.txt'));
HtmlValidation.validate();
