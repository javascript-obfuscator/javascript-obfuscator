# JavaScript obfuscator for Node.js

JavaScript obfuscator for Node.js is a free alternative of [js-obfuscator](https://github.com/caiguanhao/js-obfuscator) (which uses [javascriptobfuscator.com](https://javascriptobfuscator.com/Javascript-Obfuscator.aspx)) without any limits and sending data to a server.
Compatible with ES6.
Tested on Angular2 bundle.
https://gist.github.com/sanex3339/ffc2876123b52e6d11ce45369fd53acf

[![npm version](https://badge.fury.io/js/javascript-obfuscator.svg)](https://badge.fury.io/js/javascript-obfuscator)

## Installation

Install the package with NPM and add it to your `devDependencies`:

`npm install --save-dev javascript-obfuscator`

## Usage

```javascript
var JavaScriptObfuscator = require('javascript-obfuscator');

var obfuscatedCode = JavaScriptObfuscator.obfuscate(
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

console.log(obfuscatedCode);
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

## `obfuscate(sourceCode, options)`

#### `sourceCode`
Type: `string` Default: `null`

Any valid SourceCode.

#### `options`
Type: `Object` Default: `null`

Options for JavaScript obfuscator:

```javascript
{
    rotateUnicodeArray: true
    // ...
}
```

### Available options
#### `compact`
Type: `boolean` Default: `true`

Compact code output into one line.

#### `debugProtection`
Type: `boolean` Default: `false`

##### :warning: This option can cause browser freeze while Developer Tools is enabled! Use at own risk.

Force enable debug mode in some browsers (mainly based on WebKit) on page load if Developer Tools panel is enabled.
With this options using of Debug panel is impossible.

WebKit-based browsers: blocks the site window, but you still can navigate through Developer Tools panel.
Firefox: does *not* block the site window, but you still can't use Debug panel.

#### `debugProtectionInterval`
Type: `boolean` Default: `false`

##### :warning: This option can cause browser freeze even while Developer Tools is disabled! Use at own risk.

Works if `debugProtection` is enabled.

Force enable debug mode in some browsers (mainly based on WebKit) when Developer Tools panel was enabled, even after page was loaded.

#### `disableConsoleOutput`
Type: `boolean` Default: `true`

Disable `console.log`, `console.info`, `console.error` and `console.warn` messages output into browser console.

#### `encodeUnicodeLiterals`
Type: `boolean` Default: `false`

##### :warning: `unicodeArray` option must be enabled

This option can slightly slowdown your code speed.

All literals in unicode array becomes encoded in Base64.
To decode strings, special function will be inserted on page under `unicodeArray` node.

#### `reservedNames`
Type: `string[]` Default: `[]`

Disable obfuscation of variable names, function names and names of function parameters that match with given RegExp pattern.

Example:
```javascript
	{
		reservedNames: [
			'^someVariable',
			'functionParameter_\d'
		]
	}
```

#### `rotateUnicodeArray`
Type: `boolean` Default: `true`

##### :warning: `unicodeArray` option must be enabled

This option will rotate all values inside `unicodeArray` on a random value during obfuscation of code, and insert inside source code helper function
which will rotate array values back to their original indexes.

Keep in mind that this option affects only how the code is visually organised, since the original arrays can be easily accessed during the debug process.

It is also not recommended to enable `rotateUnicodeArray` for small source code, because a helper function might attract attention.

#### `selfDefending`
Type: `boolean` Default: `true`

##### :warning: this option forces set the `compact` value to `true`

Enables self-defending for obfuscated code. If obfuscated compact code will be formatted, this code will not work.

#### `unicodeArray`
Type: `boolean` Default: `true`

Put all literal strings into array and replace every literal string by array call.

#### `unicodeArrayThreshold`
Type: `number` Default: `0.8` Min: `0` Max: `1`

##### :warning: `unicodeArray` option must be enabled

Probability that the literal string will inserted into `unicodeArray`.
Use this option for huge source code size, because many calls to `unicodeArray` will slowdown code performance.

Value `0` is equals `unicodeArray: false`.

#### `wrapUnicodeArrayCalls`
Type: `boolean` Default: `true`

##### :warning: `unicodeArray` option must be enabled

Instead using direct calls to `unicodeArray` items `var t = _0x43a123[0x0]`, 
when index `0x0` can be easily reverted to `0` with few js beautifiers, this option will wrap all calls to special function instead.

```javascript
var t = _0x12a634('0x0')
```

### License
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