var htmlValidation = require('../index');
var Input = require('../input');
var Output = require('../output');

var HtmlValidation = new htmlValidation(
);

HtmlValidation.setInput(new Input().loadInputFile(__dirname  + '\\sample.html'));
HtmlValidation.setOutput(new Output().createOutputConsole());
HtmlValidation.validate();
