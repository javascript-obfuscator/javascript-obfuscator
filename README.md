<!--
  Title: JavaScript Obfuscator
  Description: JavaScript obfuscator for Node.js.
  Author: sanex3339
  -->

# JavaScript obfuscator for Node.js

JavaScript obfuscator for Node.js is a free alternative to [js-obfuscator](https://github.com/caiguanhao/js-obfuscator) (which uses [javascriptobfuscator.com](https://javascriptobfuscator.com/Javascript-Obfuscator.aspx))

* without any limits and sending data to a server;
* compatible with ES6;
* tested on Angular2 bundle.

Online version: [javascriptobfuscator.herokuapp.com](https://javascriptobfuscator.herokuapp.com)

Example of obfuscated code: [gist.github.com](https://gist.github.com/sanex3339/ffc2876123b52e6d11ce45369fd53acf)

#### Plugins:
* Webpack: [webpack-obfuscator](https://github.com/javascript-obfuscator/webpack-obfuscator)
* Gulp: [gulp-javascript-obfuscator](https://github.com/javascript-obfuscator/gulp-javascript-obfuscator)
* Grunt: [grunt-contrib-obfuscator](https://github.com/javascript-obfuscator/grunt-contrib-obfuscator)

[![npm version](https://badge.fury.io/js/javascript-obfuscator.svg)](https://badge.fury.io/js/javascript-obfuscator)
[![Build Status](https://travis-ci.org/javascript-obfuscator/javascript-obfuscator.svg?branch=master)](https://travis-ci.org/javascript-obfuscator/javascript-obfuscator)
[![Coverage Status](https://coveralls.io/repos/github/javascript-obfuscator/javascript-obfuscator/badge.svg?branch=master)](https://coveralls.io/github/javascript-obfuscator/javascript-obfuscator?branch=master)

[![Dependency Status](https://david-dm.org/javascript-obfuscator/javascript-obfuscator.svg)](https://david-dm.org/javascript-obfuscator/javascript-obfuscator)
[![devDependency Status](https://david-dm.org/javascript-obfuscator/javascript-obfuscator/dev-status.svg)](https://david-dm.org/javascript-obfuscator/javascript-obfuscator#info=devDependencies)

## Installation

Install the package from NPM and add it to your `devDependencies`:

```sh
$ npm install --save-dev javascript-obfuscator
```

## Node.js usage

Here's an example of how to use it:

```javascript
var JavaScriptObfuscator = require('javascript-obfuscator');

var obfuscationResult = JavaScriptObfuscator.obfuscate(
    `
    (function(){
        var variable = 'abc';
        console.log(variable);
    })();
    `,
    {
        rotateUnicodeArray: false
    }
);

console.log(obfuscationResult.getObfuscatedCode());
/*
var _0xabf1 = [
    '\x61\x62\x63',
    '\x6c\x6f\x67'
];
(function() {
    var _0xe6fab6 = _0xabf1[0x0];
    console[_0xabf1[0x1]](_0xe6fab6);
}());
*/
```

### `obfuscate(sourceCode, options)`

Returns `ObfuscationResult` object which contains two public methods:

* `getObfuscatedCode()` - returns `string` with obfuscated code;
* `getSourceMap()` - if `sourceMap` options is enable - returns `string` with source map or an empty string if `sourceMapMode` option is set as `inline`.

Calling `toString()` for `ObfuscationResult` object will return `string` with obfuscated code.

Method takes two parameters, `sourceCode` and `options` – the source code and the opitons respectively:

* `sourceCode` (`string`, default: `null`) – any valid source code, passed as a string;
* `options` (`Object`, default: `null`) – an object with options.

For available options see [options](#options).

## CLI usage
Usage:
```sh
javascript-obfuscator in.js [options]
javascript-obfuscator in.js -output out.js [options]
```

If the destination path is not specified through `--output` option, obfuscated code will saved into input file directory with name like `INPUT_FILE_NAME-obfuscated.js`

Examples:
```sh
javascript-obfuscator samples/sample.js --compact true --selfDefending false
// creates a new file samples/sample-obfuscated.js

javascript-obfuscator samples/sample.js --output output/output.js --compact true --selfDefending false
// creates a new file output/output.js
```

See [CLI options](#cli-options).

## JavaScript Obfuscator Options

Following options available for the JS Obfuscator:

#### options:

```javascript
{
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    reservedNames: [],
    rotateUnicodeArray: true,
    selfDefending: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: 'separate',
    unicodeArray: true,
    unicodeArrayEncoding: false,
    unicodeArrayThreshold: 0.8
}
```

#### CLI options:
```sh
    -v, --version
    -h, --help

    -o, --output

    --compact <boolean>
    --debugProtection <boolean>
    --debugProtectionInterval <boolean>
    --disableConsoleOutput <boolean>
    --reservedNames <list> (comma separated)
    --rotateUnicodeArray <boolean>
    --selfDefending <boolean>
    --sourceMap <boolean>
    --sourceMapBaseUrl <string>
    --sourceMapFileName <string>
    --sourceMapMode <string> [inline, separate]
    --unicodeArray <boolean>
    --unicodeArrayEncoding <boolean|string> [true, false, base64, rc4]
    --unicodeArrayThreshold <number>
```

### `compact`
Type: `boolean` Default: `true`

Compact code output on one line.

### `debugProtection`
Type: `boolean` Default: `false`

##### :warning: Can freeze your browser if you open the Developer Tools.

This option makes it almost impossible to use the `console` tab of the Developer Tools (both on WebKit-based and Mozilla Firefox).

* WebKit-based: blocks the site window, but you still can navigate through Developer Tools panel.
* Firefox: does *not* block the site window, but still won't let you use DevTools.

### `debugProtectionInterval`
Type: `boolean` Default: `false`

##### :warning: Can freeze your browser! Use at own risk.

If checked, an interval is used to force the debug mode on the Console tab, making it harder to use other features of the Developer Tools. Works if `debugProtection` is enabled.

### `disableConsoleOutput`
Type: `boolean` Default: `true`

Disables the use of `console.log`, `console.info`, `console.error` and `console.warn` by replacing them with empty functions. This makes the use of the debugger harder.

### `domainLock`
Type: `string[]` Default: `[]`

Locks the obfuscated source code so it only runs on specific domains and/or sub-domains. This makes really hard for someone just copy and paste your source code and run elsewhere.

##### Multiple domains and sub-domains
It's possible to lock your code to more than one domain or sub-domain. For instance, to lock it so the code only runs on **www.example.com** add `www.example.com`, to make it work on any sub-domain from example.com, use `.example.com`.

### `reservedNames`
Type: `string[]` Default: `[]`

Disables the obfuscation of variables names, function names and function parameters that match the Regular Expression used.

Example:
```javascript
	{
		reservedNames: [
			'^someVariable',
			'functionParameter_\d'
		]
	}
```

### `rotateUnicodeArray`
Type: `boolean` Default: `true`

##### :warning: `unicodeArray` must be enabled

Shift the `unicodeArray` array by a fixed and random (generated at the code obfuscation) places. This makes it harder to match the order of the removed strings to their original place.

This option is recommended if your original source code isn't small, as the helper function can attract attention.


### `selfDefending`
Type: `boolean` Default: `true`

##### :warning: this option forcibly set `compact` value to `true`

This option makes the output code resilient against formatting and variable renaming. If one tries to use a JavaScript beautifier on the obfuscated code, the code won't work anymore, making it harder to understand and modify it.

### `sourceMap`
Type: `boolean` Default: `false`

Enables source map generation for obfuscated code.

Source maps can be useful to help you debug your obfuscated Java Script source code. If you want or need to debug in production, you can upload the separate source map file to a secret location and then point your browser there. 

### `sourceMapBaseUrl`
Type: `string` Default: ``

Sets base url to the source map import url when `sourceMapMode: 'separate'`.
 
CLI example:
```
javascript-obfuscator input.js --output out.js --sourceMap true --sourceMapBaseUrl 'http://localhost:9000'
```

Result: 
```
//# sourceMappingURL=http://localhost:9000/out.js.map
```

### `sourceMapFileName`
Type: `string` Default: ``

Sets file name for output source map when `sourceMapMode: 'separate'`.

CLI example:
```
javascript-obfuscator input.js --output out.js --sourceMap true --sourceMapBaseUrl 'http://localhost:9000' --sourceMapFileName example
```

Result: 
```
//# sourceMappingURL=http://localhost:9000/example.js.map
```

### `sourceMapMode`
Type: `string` Default: `separate`

Specifies source map generation mode:
* `inline` - emit a single file with source maps instead of having a separate file;
* `separate` - generates corresponding '.map' file with source map. If obfuscator run through CLI - adds link to source map file to the end of file with obfuscated code `//# sourceMappingUrl=file.js.map`.

### `unicodeArray`
Type: `boolean` Default: `true`

Removes string literals and place them in a special array. For instance the string `"Hello World"` in `var m = "Hello World";` will be replaced with something like `var m = _0x12c456[0x1];`
    
### `unicodeArrayEncoding`
Type: `boolean|string` Default: `false`

##### :warning: `unicodeArray` option must be enabled

This option can slightly slow down your script.

Encode all string literals of the `unicodeArray` using `base64` or `rc4` and inserts a special code that used to decode it back at runtime.

Available values:
* `true` (`boolean`): encode `unicodeArray` values using `base64`
* `false` (`boolean`): don't encode `unicodeArray` values
* `'base64'` (`string`): encode `unicodeArray` values using `base64`
* `'rc4'` (`string`): encode `unicodeArray` values using `rc4`. **About 30-35% slower then `base64`, but more harder to get initial values**
    
### `unicodeArrayThreshold`
Type: `number` Default: `0.8` Min: `0` Max: `1`

##### :warning: `unicodeArray` option must be enabled

You can use this setting to adjust the probability (from 0 to 1) that a string literal will be inserted into the `unicodeArray`.

This setting is useful with large code size because repeatdely calls to the `Unicode Array` function can slow down your code.

`unicodeArrayThreshold: 0` equals to `unicodeArray: false`.

## License
Copyright (C) 2016 [Timofey Kachalov](http://github.com/sanex3339).

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
