<!--
  Title: JavaScript Obfuscator
  Description: A powerful obfuscator for JavaScript and Node.js.
  Author: sanex3339
  -->

# JavaScript obfuscator for Node.js

JavaScript obfuscator is a powerful free obfuscator for JavaScript and Node.js with a wide number of features which provides protection for your source code.

* has no limits or restrictions
* runs on your local machine - does not send data to a server;
* compatible with `es2015`;
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
[![Backers on Open Collective](https://opencollective.com/javascript-obfuscator/backers/badge.svg)](#backers) 
[![Sponsors on Open Collective](https://opencollective.com/javascript-obfuscator/sponsors/badge.svg)](#sponsors)

*NOTE! the README on the master branch might not match that of the latest stable release!*

## :warning: Important
##### Obfuscate only the code that belongs to you. 

It is not recommended to obfuscate vendor scripts and polyfills, since the obfuscated code is 15-80% slower (depends on options) and the files are significantly larger.

## Installation

Install the package with Yarn or NPM and add it to your `devDependencies`:

```sh
$ yarn add --dev javascript-obfuscator
```
or
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
var _0x6b22 = [
    '\x67\x63\x73',
    '\x32\x7c\x34\x7c\x30\x7c\x35\x7c\x31\x7c\x33',
    '\x73\x70\x6c\x69\x74',
    '\x6c\x6f\x67',
    '\x68\x49\x4d'
];
(function (_0xe12ddf, _0x9bc9d1) {
    var _0x3a950b = function (_0x78e498) {
        while (--_0x78e498) {
            _0xe12ddf['\x70\x75\x73\x68'](_0xe12ddf['\x73\x68\x69\x66\x74']());
        }
    };
    _0x3a950b(++_0x9bc9d1);
}(_0x6b22, 0x1cd));
var _0x26b2 = function (_0x348b1e, _0x346c2a) {
    _0x348b1e = _0x348b1e - 0x0;
    var _0x45ae32 = _0x6b22[_0x348b1e];
    return _0x45ae32;
};
(function () {
    var _0x3a3615 = {
        '\x68\x49\x4d': function _0x4c002e(_0x5a880a, _0xe710e3) {
            return _0x5a880a - _0xe710e3;
        },
        '\x67\x63\x73': function _0x4cbf4b(_0xe1f02d, _0x5d1157) {
            return _0xe1f02d + _0x5d1157;
        }
    };
    var _0x26dbf0 = _0x26b2('0x0')[_0x26b2('0x1')]('\x7c'), _0x345ed7 = 0x0;
    while (!![]) {
        switch (_0x26dbf0[_0x345ed7++]) {
        case '\x30':
            var _0x5eb388 = '\x35' + -'\x32';
            continue;
        case '\x31':
            console[_0x26b2('0x2')](_0x52a502);
            continue;
        case '\x32':
            var _0xd18cf9 = _0x3a3615[_0x26b2('0x3')]('\x35', 0x3);
            continue;
        case '\x33':
            console[_0x26b2('0x2')](_0x5eb388);
            continue;
        case '\x34':
            var _0x52a502 = _0x3a3615[_0x26b2('0x4')]('\x35', 0x3);
            continue;
        case '\x35':
            console[_0x26b2('0x2')](_0xd18cf9);
            continue;
        }
        break;
    }
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
javascript-obfuscator in.js --output out.js [options]
```

If the destination path is not specified with the `--output` option, obfuscated code will saved into the input file directory with name like `INPUT_FILE_NAME-obfuscated.js`

Examples:
```sh
javascript-obfuscator samples/sample.js --compact true --selfDefending false
// creates a new file samples/sample-obfuscated.js

javascript-obfuscator samples/sample.js --output output/output.js --compact true --selfDefending false
// creates a new file output/output.js
```

See [CLI options](#cli-options).

## JavaScript Obfuscator Options

Following options are available for the JS Obfuscator:

#### options:

```javascript
{
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: false,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    mangle: false,
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
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
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
    --deadCodeInjection <boolean>
    --deadCodeInjectionThreshold <number>
    --debugProtection <boolean>
    --debugProtectionInterval <boolean>
    --disableConsoleOutput <boolean>
    --mangle <boolean>
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

##### :warning: This option greatly affects the performance up to 1.5x slower runtime speed. Use [`controlFlowFlatteningThreshold`](#controlflowflatteningthreshold) to set percentage of nodes that will affected by control flow flattening. 

Enables code control flow flattening. Control flow flattening is a structure transformation of the source code that hinders program comprehension.

Example:
```ts
// input
(function(){
    function foo () {
        return function () {
            var sum = 1 + 2;
            console.log(1);
            console.log(2);
            console.log(3);
            console.log(4);
            console.log(5);
            console.log(6);
        }
    }
})();

// output
(function () {
    function _0x425898() {
        return function () {
            var _0x2b972d = {
                '\x42\x6c\x67': function _0x160d18(_0xdc9f31, _0x3741dd) {
                    return _0xdc9f31 + _0x3741dd;
                }
            };
            var _0x170490 = '\x35\x7c\x34\x7c\x33\x7c\x32\x7c\x30\x7c\x36\x7c\x31'['\x73\x70\x6c\x69\x74']('\x7c'), _0x4f3437 = 0x0;
            while (!![]) {
                switch (_0x170490[_0x4f3437++]) {
                case '\x30':
                    console['\x6c\x6f\x67'](0x4);
                    continue;
                case '\x31':
                    console['\x6c\x6f\x67'](0x6);
                    continue;
                case '\x32':
                    console['\x6c\x6f\x67'](0x3);
                    continue;
                case '\x33':
                    console['\x6c\x6f\x67'](0x2);
                    continue;
                case '\x34':
                    console['\x6c\x6f\x67'](0x1);
                    continue;
                case '\x35':
                    var _0x476f51 = _0x2b972d['\x42\x6c\x67'](0x1, 0x2);
                    continue;
                case '\x36':
                    console['\x6c\x6f\x67'](0x5);
                    continue;
                }
                break;
            }
        };
    }
}());
```

### `controlFlowFlatteningThreshold`
Type: `number` Default: `0.75` Min: `0` Max: `1`

The probability that the [`controlFlowFlattening`](#controlflowflattening) transformation will be applied to the node.

This setting is especially useful for large code size because large amounts of control flow transformations can slow down your code and increase code size.

`controlFlowFlatteningThreshold: 0` equals to `controlFlowFlattening: false`.

### `deadCodeInjection`
Type: `boolean` Default: `false`

##### :warning: Dramatically increases size of obfuscated code (up to 200%), use only if size of obfuscated code doesn't matter. Use [`deadCodeInjectionThreshold`](#deadcodeinjectionthreshold) to set percentage of nodes that will affected by dead code injection.
##### :warning: This option forcibly enables `stringArray` option.

With this option random blocks of dead code will add to the obfuscated code. 

Example:
```ts
// input
(function(){
    if (true) {
        var foo = function () {
            console.log('abc');
            console.log('cde');
            console.log('efg');
            console.log('hij');
        };
        
        var bar = function () {
            console.log('klm');
            console.log('nop');
            console.log('qrs');
        };
    
        var baz = function () {
            console.log('tuv');
            console.log('wxy');
            console.log('z');
        };
    
        foo();
        bar();
        baz();
    }
})();

// output
var _0x5024 = [
    'zaU',
    'log',
    'tuv',
    'wxy',
    'abc',
    'cde',
    'efg',
    'hij',
    'QhG',
    'TeI',
    'klm',
    'nop',
    'qrs',
    'bZd',
    'HMx'
];
var _0x4502 = function (_0x1254b1, _0x583689) {
    _0x1254b1 = _0x1254b1 - 0x0;
    var _0x529b49 = _0x5024[_0x1254b1];
    return _0x529b49;
};
(function () {
    if (!![]) {
        var _0x16c18d = function () {
            if (_0x4502('0x0') !== _0x4502('0x0')) {
                console[_0x4502('0x1')](_0x4502('0x2'));
                console[_0x4502('0x1')](_0x4502('0x3'));
                console[_0x4502('0x1')]('z');
            } else {
                console[_0x4502('0x1')](_0x4502('0x4'));
                console[_0x4502('0x1')](_0x4502('0x5'));
                console[_0x4502('0x1')](_0x4502('0x6'));
                console[_0x4502('0x1')](_0x4502('0x7'));
            }
        };
        var _0x1f7292 = function () {
            if (_0x4502('0x8') === _0x4502('0x9')) {
                console[_0x4502('0x1')](_0x4502('0xa'));
                console[_0x4502('0x1')](_0x4502('0xb'));
                console[_0x4502('0x1')](_0x4502('0xc'));
            } else {
                console[_0x4502('0x1')](_0x4502('0xa'));
                console[_0x4502('0x1')](_0x4502('0xb'));
                console[_0x4502('0x1')](_0x4502('0xc'));
            }
        };
        var _0x33b212 = function () {
            if (_0x4502('0xd') !== _0x4502('0xe')) {
                console[_0x4502('0x1')](_0x4502('0x2'));
                console[_0x4502('0x1')](_0x4502('0x3'));
                console[_0x4502('0x1')]('z');
            } else {
                console[_0x4502('0x1')](_0x4502('0x4'));
                console[_0x4502('0x1')](_0x4502('0x5'));
                console[_0x4502('0x1')](_0x4502('0x6'));
                console[_0x4502('0x1')](_0x4502('0x7'));
            }
        };
        _0x16c18d();
        _0x1f7292();
        _0x33b212();
    }
}());
```

### `deadCodeInjectionThreshold`
Type: `number` Default: `0.4` Min: `0` Max: `1`

Allows to set percentage of nodes that will affected by `deadCodeInjection`.

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

Disables the use of `console.log`, `console.info`, `console.error`, `console.warn`, `console.debug`, `console.exception` and `console.trace` by replacing them with empty functions. This makes the use of the debugger harder.

### `domainLock`
Type: `string[]` Default: `[]`

Locks the obfuscated source code so it only runs on specific domains and/or sub-domains. This makes really hard for someone just copy and paste your source code and run elsewhere.

##### Multiple domains and sub-domains
It's possible to lock your code to more than one domain or sub-domain. For instance, to lock it so the code only runs on **www.example.com** add `www.example.com`, to make it work on any sub-domain from example.com, use `.example.com`.

### `mangle`
Type: `boolean` Default: `false`

Enables mangling of variable names.

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
* `'rc4'` (`string`): encode `stringArray` values using `rc4`. **About 30-50% slower than `base64`, but more harder to get initial values.** It is recommended to disable [`unicodeEscapeSequence`](#unicodeescapesequence) option with `rc4` encoding to prevent very large size of obfuscated code.
    
### `stringArrayThreshold`
Type: `number` Default: `0.8` Min: `0` Max: `1`

##### :warning: [`stringArray`](#stringarray) option must be enabled

You can use this setting to adjust the probability (from 0 to 1) that a string literal will be inserted into the `stringArray`.

This setting is especially useful for large code size because it repeatedly calls to the `string array` and can slow down your code.

`stringArrayThreshold: 0` equals to `stringArray: false`.

### `unicodeEscapeSequence`
Type: `boolean` Default: `false`

Allows to enable/disable string conversion to unicode escape sequence.

Unicode escape sequence increases code size greatly and strings easily can be reverted to their original view. Recommended to enable this option only for small source code. 

## Preset Options
### High obfuscation, low performance

Performance will 50-100% slower than without obfuscation

```javascript
{
	compact: true,
	controlFlowFlattening: true,
	controlFlowFlatteningThreshold: 1,
	deadCodeInjection: true,
	deadCodeInjectionThreshold: 1,
	debugProtection: true,
	debugProtectionInterval: true,
	disableConsoleOutput: true,
	mangle: false,
	rotateStringArray: true,
	selfDefending: true,
	stringArray: true,
	stringArrayEncoding: 'rc4',
	stringArrayThreshold: 1,
	unicodeEscapeSequence: false
}
```

### Medium obfuscation, optimal performance

Performance will 30-35% slower than without obfuscation

```javascript
{
	compact: true,
	controlFlowFlattening: true,
	controlFlowFlatteningThreshold: 0.75,
	deadCodeInjection: true,
	deadCodeInjectionThreshold: 0.4,
	debugProtection: false,
	debugProtectionInterval: false,
	disableConsoleOutput: true,
	mangle: false,
	rotateStringArray: true,
	selfDefending: true,
	stringArray: true,
	stringArrayEncoding: 'base64',
	stringArrayThreshold: 0.75,
	unicodeEscapeSequence: false
}
```

### Low obfuscation, High performance

Performance will slightly slower than without obfuscation

```javascript
{
	compact: true,
	controlFlowFlattening: false,
	deadCodeInjection: false,
	debugProtection: false,
	debugProtectionInterval: false,
	disableConsoleOutput: true,
	mangle: true,
	rotateStringArray: true,
	selfDefending: true,
	stringArray: true,
	stringArrayEncoding: false,
	stringArrayThreshold: 0.75,
	unicodeEscapeSequence: false
}
```

## Backers

Support us with a monthly donation and help us continue our activities. [[Become a backer](https://opencollective.com/javascript-obfuscator#backer)]

<a href="https://opencollective.com/javascript-obfuscator/backer/0/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/1/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/2/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/3/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/4/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/5/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/6/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/7/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/8/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/9/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/10/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/10/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/11/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/11/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/12/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/12/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/13/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/13/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/14/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/14/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/15/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/15/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/16/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/16/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/17/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/17/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/18/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/18/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/19/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/19/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/20/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/20/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/21/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/21/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/22/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/22/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/23/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/23/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/24/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/24/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/25/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/25/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/26/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/26/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/27/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/27/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/28/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/28/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/backer/29/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/backer/29/avatar.svg"></a>


## Sponsors

Become a sponsor and get your logo on our README on Github with a link to your site. [[Become a sponsor](https://opencollective.com/javascript-obfuscator#sponsor)]

<a href="https://opencollective.com/javascript-obfuscator/sponsor/0/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/sponsor/1/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/sponsor/2/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/sponsor/3/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/sponsor/4/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/sponsor/5/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/sponsor/6/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/sponsor/7/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/sponsor/8/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/javascript-obfuscator/sponsor/9/website" target="_blank"><img src="https://opencollective.com/javascript-obfuscator/sponsor/9/avatar.svg"></a>


## License
Copyright (C) 2017 [Timofey Kachalov](http://github.com/sanex3339).

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
