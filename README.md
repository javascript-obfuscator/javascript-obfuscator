<!--
  Title: JavaScript Obfuscator
  Description: JavaScript obfuscator for Node.js.
  Author: sanex3339
  -->

# JavaScript obfuscator for Node.js

JavaScript obfuscator for Node.js is a free obfuscator with wide number of features which provides protection for your source code.

* without any limits and sending data to a server;
* compatible with ES6;
* tested on Angular2 bundle.

Online version: [javascriptobfuscator.herokuapp.com](https://javascriptobfuscator.herokuapp.com)

Example of obfuscated code: [gist.github.com](https://gist.github.com/sanex3339/ffc2876123b52e6d11ce45369fd53acf)

#### Plugins:
* Webpack: [webpack-obfuscator](https://github.com/javascript-obfuscator/webpack-obfuscator)
* Gulp: [gulp-javascript-obfuscator](https://github.com/javascript-obfuscator/gulp-javascript-obfuscator)
* Grunt: [grunt-contrib-obfuscator](https://github.com/javascript-obfuscator/grunt-contrib-obfuscator)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=6SDRM5JRMGH9Y)

[![npm version](https://badge.fury.io/js/javascript-obfuscator.svg)](https://badge.fury.io/js/javascript-obfuscator)
[![Build Status](https://travis-ci.org/javascript-obfuscator/javascript-obfuscator.svg?branch=master)](https://travis-ci.org/javascript-obfuscator/javascript-obfuscator)
[![Coverage Status](https://coveralls.io/repos/github/javascript-obfuscator/javascript-obfuscator/badge.svg?branch=master)](https://coveralls.io/github/javascript-obfuscator/javascript-obfuscator?branch=master)

## :warning: Important
#####Obfuscate only the code that belongs to you. 

It is not recommended to obfuscate vendor scripts and polyfills, since the obfuscated code is 25-30% slower and the files are significantly larger.

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
            var variable1 = '5' - 3;
            var variable2 = '5' + 3;
            var variable3 = '5' + - '2';
            console.log(variable1);
            console.log(variable2);
            console.log(variable3);
        })();
    `,
    {
        compact: false,
        controlFlowFlattening: true,
        disableConsoleOutput: false
    }
);

console.log(obfuscationResult.getObfuscatedCode());
/*
var _0x20c3 = [
    '\x6c\x6f\x67',
    '\x78\x4c\x77',
    '\x51\x72\x6b'
];
(function (_0x3cd8ee, _0x363b84) {
    var _0x52ec75 = function (_0xda70d7) {
        while (--_0xda70d7) {
            _0x3cd8ee['\x70\x75\x73\x68'](_0x3cd8ee['\x73\x68\x69\x66\x74']());
        }
    };
    _0x52ec75(++_0x363b84);
}(_0x20c3, 0x11e));
var _0xc320 = function (_0x578269, _0x5685a1) {
    var _0x578269 = parseInt(_0x578269, 0x10);
    var _0xef46f2 = _0x20c3[_0x578269];
    return _0xef46f2;
};
(function () {
    var _0x2559cb = {
        '\x78\x4c\x77': function _0x1(_0x1936fd, _0x5ed38f) {
            return _0x1936fd + _0x5ed38f;
        },
        '\x51\x72\x6b': function _0x3(_0x4414d6, _0x1db310) {
            return _0x4414d6 + _0x1db310;
        }
    };
    var _0x32d9b = '\x35' - 0x3;
    var _0x2b7aac = _0x2559cb[_0xc320('0x0')]('\x35', 0x3);
    var _0x3c7304 = _0x2559cb['\x51\x72\x6b']('\x35', -'\x32');
    console['\x6c\x6f\x67'](_0x32d9b);
    console[_0xc320('0x2')](_0x2b7aac);
    console[_0xc320('0x2')](_0x3c7304);
}());
*/
```

### `obfuscate(sourceCode, options)`

Returns `ObfuscationResult` object which contains two public methods:

* `getObfuscatedCode()` - returns `string` with obfuscated code;
* `getSourceMap()` - if [`sourceMap`](#sourcemap) option is enabled - returns `string` with source map or an empty string if [`sourceMapMode`](#sourcemapmode) option is set as `inline`.

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
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    reservedNames: [],
    rotateStringArray: true,
    seed: 0,
    selfDefending: false,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: 'separate',
    stringArray: true,
    stringArrayEncoding: false,
    stringArrayThreshold: 0.8,
    unicodeEscapeSequence: true
}
```

#### CLI options:
```sh
    -v, --version
    -h, --help

    -o, --output

    --compact <boolean>
    --controlFlowFlattening <boolean>
    --controlFlowFlatteningThreshold <number>
    --debugProtection <boolean>
    --debugProtectionInterval <boolean>
    --disableConsoleOutput <boolean>
    --reservedNames <list> (comma separated)
    --rotateStringArray <boolean>
    --seed <number>
    --selfDefending <boolean>
    --sourceMap <boolean>
    --sourceMapBaseUrl <string>
    --sourceMapFileName <string>
    --sourceMapMode <string> [inline, separate]
    --stringArray <boolean>
    --stringArrayEncoding <boolean|string> [true, false, base64, rc4]
    --stringArrayThreshold <number>
    --unicodeEscapeSequence <boolean>
```

### `compact`
Type: `boolean` Default: `true`

Compact code output on one line.

### `controlFlowFlattening`
Type: `boolean` Default: `false`

Enables code control flow flattening. Control flow flattening is a structure transformation of the source code that hinders program comprehension.

Example:
```ts
// input
(function(){
    function foo () {
        return function () {
            var sum = 1 + 2;
        }
    }
})();

// output
(function() {
    var _0x451dc8 = {
        '\x44\x64\x4f': function _0x3(_0x4ea314, _0x4fa62e) {
            return _0x4ea314 + _0x4fa62e;
        }
    };

    function _0x5382d8() {
        var _0x349b22 = {
            '\x48\x65\x61': function _0x2(_0x14a596, _0x250c4b) {
                return _0x451dc8['\x44\x64\x4f'](_0x14a596, _0x250c4b);
            }
        };
        return function() {
            var _0x412353 = {
                '\x73\x47\x6f': function _0x4(_0x43c6b0, _0x133730) {
                    return _0x349b22['\x48\x65\x61'](_0x43c6b0, _0x133730);
                }
            };
            var _0x1d8637 = _0x412353['\x73\x47\x6f'](0x1, 0x2);
        };
    }
}());
```

### `controlFlowFlatteningThreshold`
Type: `number` Default: `0.75` Min: `0` Max: `1`

The probability that the [`controlFlowFlattening`](#controlflowflattening) transformation will be applied to the node.

This setting is especially useful for large code size because large amount of control flow transformations can slow down your code and increase code size.

`controlFlowFlatteningThreshold: 0` equals to `controlFlowFlattening: false`.

### `debugProtection`
Type: `boolean` Default: `false`

##### :warning: Can freeze your browser if you open the Developer Tools.

This option makes it almost impossible to use the `console` tab of the Developer Tools (both on WebKit-based and Mozilla Firefox).

* WebKit-based: blocks the site window, but you still can navigate through Developer Tools panel.
* Firefox: does *not* block the site window, but still won't let you use DevTools.

### `debugProtectionInterval`
Type: `boolean` Default: `false`

##### :warning: Can freeze your browser! Use at own risk.

If checked, an interval is used to force the debug mode on the Console tab, making it harder to use other features of the Developer Tools. Works if [`debugProtection`](#debugprotection) is enabled.

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
```ts
	{
		reservedNames: [
			'^someVariable',
			'functionParameter_\d'
		]
	}
```

### `rotateStringArray`
Type: `boolean` Default: `true`

##### :warning: [`stringArray`](#stringarray) must be enabled

Shift the `stringArray` array by a fixed and random (generated at the code obfuscation) places. This makes it harder to match the order of the removed strings to their original place.

This option is recommended if your original source code isn't small, as the helper function can attract attention.

### `seed`
Type: `number` Default: `0`

This option sets seed for random generator. This is useful for creating repeatable results.

If seed is `0` - random generator will work without seed.

### `selfDefending`
Type: `boolean` Default: `false`

##### :warning: Don't change obfuscated code in any way after obfuscation with this option, because any change like uglifying of code can trigger self defending and code wont work anymore!
##### :warning: This option forcibly sets `compact` value to `true`

This option makes the output code resilient against formatting and variable renaming. If one tries to use a JavaScript beautifier on the obfuscated code, the code won't work anymore, making it harder to understand and modify it.

### `sourceMap`
Type: `boolean` Default: `false`

Enables source map generation for obfuscated code.

Source maps can be useful to help you debug your obfuscated JavaScript source code. If you want or need to debug in production, you can upload the separate source map file to a secret location and then point your browser there. 

### `sourceMapBaseUrl`
Type: `string` Default: ``

Sets base url to the source map import url when [`sourceMapMode: 'separate'`](#sourcemapmode).
 
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
* `separate` - generates corresponding '.map' file with source map. In case you run obfuscator through CLI - adds link to source map file to the end of file with obfuscated code `//# sourceMappingUrl=file.js.map`.

### `stringArray`
Type: `boolean` Default: `true`

Removes string literals and place them in a special array. For instance, the string `"Hello World"` in `var m = "Hello World";` will be replaced with something like `var m = _0x12c456[0x1];`
    
### `stringArrayEncoding`
Type: `boolean|string` Default: `false`

##### :warning: `stringArray` option must be enabled

This option can slightly slow down your script.

Encode all string literals of the [`stringArray`](#stringarray) using `base64` or `rc4` and inserts a special code that used to decode it back at runtime.

Available values:
* `true` (`boolean`): encode `stringArray` values using `base64`
* `false` (`boolean`): don't encode `stringArray` values
* `'base64'` (`string`): encode `stringArray` values using `base64`
* `'rc4'` (`string`): encode `stringArray` values using `rc4`. **About 30-35% slower then `base64`, but more harder to get initial values**
    
### `stringArrayThreshold`
Type: `number` Default: `0.8` Min: `0` Max: `1`

##### :warning: [`stringArray`](#stringarray) option must be enabled

You can use this setting to adjust the probability (from 0 to 1) that a string literal will be inserted into the `stringArray`.

This setting is especially useful for large code size because it repeatedly calls to the `string array` and can slow down your code.

`stringArrayThreshold: 0` equals to `stringArray: false`.

### `unicodeEscapeSequence`
Type: `boolean` Default: `true`

Allows to enable/disable string conversion to unicode escape sequence.

Unicode escape sequence increases code size greatly. It is recommended to disable this option when using [`stringArrayEncoding`](#stringarrayencoding) (especially with `rc4` encoding).

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