# JavaScript obfuscator for Node.js

JavaScript obfuscator for Node.js is a free alternative to [js-obfuscator](https://github.com/caiguanhao/js-obfuscator) (which uses [javascriptobfuscator.com](https://javascriptobfuscator.com/Javascript-Obfuscator.aspx))

* without any limits and sending data to a server;
* compatible with ES6;
* tested on Angular2 bundle;

https://gist.github.com/sanex3339/ffc2876123b52e6d11ce45369fd53acf

[![npm version](https://badge.fury.io/js/javascript-obfuscator.svg)](https://badge.fury.io/js/javascript-obfuscator)
[![Build Status](https://travis-ci.org/sanex3339/javascript-obfuscator.svg?branch=master)](https://travis-ci.org/sanex3339/javascript-obfuscator)
[![Coverage Status](https://coveralls.io/repos/github/sanex3339/javascript-obfuscator/badge.svg?branch=master)](https://coveralls.io/github/sanex3339/javascript-obfuscator?branch=master)

## Installation

Install the package from NPM and add it to your `devDependencies`:

```sh
$ npm install --save-dev javascript-obfuscator
```

## Node.js usage

Here's an example of how to use it:

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

This is the main function that runs the Obfuscator. It takes two parameters, `sourceCode` and `options` – the source code and the opitons respectively:

* `sourceCode` (`string`, default: `null`) – any valid source code, passed as a string variable. JS Obfuscator will parse this string and apply a set of modificating functions to it, generating a string with the new (obfuscated) code and printing it to the console;
* `options` (`Object`, default: `null`) – an object literal.

See [options](#options).

## CLI usage
Usage: `javascript-obfuscator [options] < in.js > out.js`

Example: `javascript-obfuscator --compact true --selfDefending false < in.js > out.js`

See [CLI options](#cli-options).

## JavaScript Obfuscator Options

At this moment of time, there are following options (`name: default`) available for the JS Obfuscator:

#### options:

```javascript
{
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    encodeUnicodeLiterals: false,
    reservedNames: [],
    rotateUnicodeArray: true,
    selfDefending: true,
    unicodeArray: true,
    unicodeArrayThreshold: 0.8,
    wrapUnicodeArrayCalls: true
}
```

#### CLI options:
```
    -v, --version
    -h, --help

    --compact <boolean>
    --debugProtection <boolean>
    --debugProtectionInterval <boolean>
    --disableConsoleOutput <boolean>
    --encodeUnicodeLiterals <boolean>
    --reservedNames <list> (comma separated)
    --rotateUnicodeArray <boolean>
    --selfDefending <boolean>
    --unicodeArray <boolean>
    --unicodeArrayThreshold <number>
    --wrapUnicodeArrayCalls <boolean>
```

### `compact`
Type: `boolean` Default: `true`

Compact code output on one line.

### `debugProtection`
Type: `boolean` Default: `false`

#### :warning: Can freeze browser while Developer Tools are enabled! Use at own risk.

Force enable debug mode on page load if Developer Tools panel is enabled (in some, mainly WebKit-based, browsers). This makes it almost impossible to use the Console (the debug panel).

* WebKit-based: blocks the site window, but you still can navigate through Developer Tools panel.
* Firefox: does *not* block the site window, but still won't let you use DevTools.

### `debugProtectionInterval`
Type: `boolean` Default: `false`

#### :warning: Can freeze browser even while Developer Tools are disabled! Use at own risk.

Works if `debugProtection` is enabled.

Force enable debug mode in some browsers (mainly WebKit-based) when Developer Tools panel is enabled, even after page is loaded.

### `disableConsoleOutput`
Type: `boolean` Default: `true`

Disable `console.log`, `console.info`, `console.error` and `console.warn` messages output into the browser console.

### `encodeUnicodeLiterals`
Type: `boolean` Default: `false`

#### :warning: `unicodeArray` option must be enabled

This option can slightly slow down your code speed.

All literals in Unicode array become encoded in Base64.
To decode strings, a special function will be inserted on the page under `unicodeArray` node.

### `reservedNames`
Type: `string[]` Default: `[]`

Disable obfuscation of variable names, function names and names of function parameters that match the passed RegExp pattern.

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

#### :warning: `unicodeArray` must be enabled

Shift the `unicodeArray` values by a random number of places during the code obfuscation and insert a helper function for shifting the array back into the source code. (It works just like the Caesar cypher.)

Keep in mind that this option affects only how the code is visually organised, since the original arrays can be easily accessed during the debug process.

It is also not recommended to enable `rotateUnicodeArray` for small source code because a helper function might attract attention.

### `selfDefending`
Type: `boolean` Default: `true`

#### :warning: this option forcibly set `compact` value to `true`

Enables self-defending for obfuscated code. If obfuscated compact code is formatted, it will not work any more.

### `unicodeArray`
Type: `boolean` Default: `true`

Put all literal strings into an array and replace every literal string by an array call.

### `unicodeArrayThreshold`
Type: `number` Default: `0.8` Min: `0` Max: `1`

#### :warning: `unicodeArray` option must be enabled

The probability that the literal string will be inserted into `unicodeArray`.
Use this option for huge source code size, because many calls to `unicodeArray` will slow down code performance.

`unicodeArrayThreshold: 0` equals to `unicodeArray: false`.

### `wrapUnicodeArrayCalls`
Type: `boolean` Default: `true`

#### :warning: `unicodeArray` option must be enabled

Instead of using direct calls to `unicodeArray` items `var t = _0x43a123[0x0]`, when index `0x0` can be easily reverted to `0` with few js beautifiers, this option will wrap all calls to special function instead.

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