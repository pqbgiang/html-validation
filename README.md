# html-validation
a node js project to validate html tag which can be used for SEO

# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

# Installation
Install Scanning HTML file SEO defects globally using npm:
'npm install --save html-validation'

# Example
1. To get familiar with usage of the module with inputFile and output console:
'node .\test\index.js'

2. To get familiar with usage of the module with inputStream and outputFile (checkout outputFile.txt):
'node .\test\test2.js'

Output should be printed to terminal like below:
```js
Starting the validation html file with:
rules: {"img":"alt","a":"rel","header":{"title":true,"meta":["description","robots","keywords
"]},"strong":15,"h1":1}
{
  "img": "2 <img> tag without alt",
  "a": "1 <a> tag without rel",
  "header": "0 <meta> tag without name=robots. . ",
  "strong": "",
  "h1": "This HTML has more than 1 <h1> tag, count=6"
}
Validation has been done.
```
# Usage
The input can be either:
I. A HTML file (User is able to config the input path)
II. Node Readable Stream

The output can be either:
I. A file (User is able to config the output destination)
II. Node Writable Stream
III. Console

# Basic usage
1. Input file:
```js
/**
 * load an input HTML file from the path
 * @param {object} filepath - used to feed in HTML file source
 */
HtmlValidation.setInput(new Input().loadInputFile(__dirname  + '\\sample.html'));
```

2. Input readable stream:
```js
/**
 * load an input from A Node Readable Stream
 * @param {object} stream - used to feed in HTML file source
 */
var readable_stream = fs.createReadStream(__dirname  + '\\sample2.html');
HtmlValidation.setInput(new Input().loadInputStream(readable_stream));
```

3. Output to console:
```js
/**
 * create an output console
 * @param {object} output - console
 */
HtmlValidation.setOutput(new Output().createOutputConsole());
```

4. Output to a file:
```js
/**
 * create an output file with file path
 * @param {string} filePath - the location of file to save the validation result
 */
HtmlValidation.setOutput(new Output().createOutputFile(__dirname  + '\\outputFile.txt'));
```

5. Output to readable stream:
```js
/**
 * Create a node writeable stream
 * @param {object} stream - A node writeable stream
 */
var writeable_stream = fs.createWriteStream(__dirname + '/outstream.txt')
HtmlValidation.setOutput(new Output().createOutputStream(writeable_stream));
```

6. Pre-defined SEO rules:
```js
var rules = {
    img: 'alt', // validate if there are any <img />tags without alt attribute
    a: 'rel', // validate if there are any <a />tags without rel attribute
    header: {
        title: true, // validate if there is any header that doesn’t have <title>tag
        meta: ["description", "robots", "keywords"], // validate if you want to implement additional rule for meta tag, you just need to add a new tag to array.
    },
    strong: 15, // validate if there are more than 15 <strong>tag in HTML
    h1: 1, // validate if a HTML have more than one <H1>tag
};
```

The rules above is also set as default.

#License
This project is licensed under the MIT License - see the LICENSE file for details.


