<!--
  Title: JavaScript Obfuscator
  Description: A powerful obfuscator for JavaScript and Node.js.
  Author: Timofey Kachalov
  -->

# JavaScript obfuscator

![logo](https://raw.githubusercontent.com/javascript-obfuscator/javascript-obfuscator/master/images/logo.png)

JavaScript obfuscator is a powerful free obfuscator for JavaScript with a wide number of features which provides protection for your source code.

Example of obfuscated code: [gist.github.com](https://gist.github.com/sanex3339/ffc2876123b52e6d11ce45369fd53acf)

#### Online version:
[obfuscator.io](https://obfuscator.io)

#### Plugins:
* Webpack plugin: [webpack-obfuscator](https://github.com/javascript-obfuscator/webpack-obfuscator)
* Webpack loader: [obfuscator-loader](https://github.com/javascript-obfuscator/obfuscator-loader)
* Gulp: [gulp-javascript-obfuscator](https://github.com/javascript-obfuscator/gulp-javascript-obfuscator)
* Grunt: [grunt-contrib-obfuscator](https://github.com/javascript-obfuscator/grunt-contrib-obfuscator)
* Rollup: [rollup-plugin-javascript-obfuscator](https://github.com/javascript-obfuscator/rollup-plugin-javascript-obfuscator)
* Weex: [weex-devtool](https://www.npmjs.com/package/weex-devtool)
* Malta: [malta-js-obfuscator](https://github.com/fedeghe/malta-js-obfuscator)

[![Join the chat at Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/javascript-obfuscator/General-chat)
[![npm version](https://badge.fury.io/js/javascript-obfuscator.svg)](https://badge.fury.io/js/javascript-obfuscator)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjavascript-obfuscator%2Fjavascript-obfuscator.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjavascript-obfuscator%2Fjavascript-obfuscator?ref=badge_shield)
[![Build Status](https://travis-ci.org/javascript-obfuscator/javascript-obfuscator.svg?branch=master)](https://travis-ci.org/javascript-obfuscator/javascript-obfuscator)
[![Coverage Status](https://coveralls.io/repos/github/javascript-obfuscator/javascript-obfuscator/badge.svg?branch=master)](https://coveralls.io/github/javascript-obfuscator/javascript-obfuscator?branch=master)
[![Backers on Open Collective](https://opencollective.com/javascript-obfuscator/backers/badge.svg)](#backers) 
[![Sponsors on Open Collective](https://opencollective.com/javascript-obfuscator/sponsors/badge.svg)](#sponsors)

#### You can support this project by donating:
* (Bitcoin) 14yhtZxLNp6ekZAgmEmPJqEKUP2VtUxQK6
* (Ether) 0x5Df9eBcFB2D0f3315d03Ac112104b9023C409dc1
* (OpenCollective) https://opencollective.com/javascript-obfuscator

Big thanks to all supporters!

#### *NOTE! the README on the master branch might not match that of the latest stable release!*

#### If you have a question - check this section first: [FAQ](#frequently-asked-questions)

## :warning: Important
##### Obfuscate only the code that belongs to you. 

It is not recommended to obfuscate vendor scripts and polyfills, since the obfuscated code is 15-80% slower (depends on options) and the files are significantly larger.

## Installation

#### Using Yarn or NPM

Install the package with Yarn or NPM and add it to your `dependencies` or `devDependencies`:

```sh
$ yarn add --dev javascript-obfuscator
```
or
```sh
$ npm install --save-dev javascript-obfuscator
```

#### In a Browser

From CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/javascript-obfuscator/dist/index.browser.js"/>
```

From `node_modules`:

```html
<script src="./node_modules/javascript-obfuscator/dist/index.browser.js"/>
```

## Usage

```javascript
var JavaScriptObfuscator = require('javascript-obfuscator');

var obfuscationResult = JavaScriptObfuscator.obfuscate(
    `
        (function(){
            var variable1 = '5' - 3;
            var variable2 = '5' + 3;
            var variable3 = '5' + - '2';
            var variable4 = ['10','10','10','10','10'].map(parseInt);
            var variable5 = 'foo ' + 1 + 1;
            console.log(variable1);
            console.log(variable2);
            console.log(variable3);
            console.log(variable4);
            console.log(variable5);
        })();
    `,
    {
        compact: false,
        controlFlowFlattening: true
    }
);

console.log(obfuscationResult.getObfuscatedCode());
/*
var _0x2218 = [
    '8|3|1|2|0|4|6|9|7|5',
    'bqndd',
    'dySIh',
    'kTiiG',
    'log',
    'tuvgv'
];
(function (_0x38b423, _0x1d6bd4) {
    var _0x39a849 = function (_0x5794c7) {
        while (--_0x5794c7) {
            _0x38b423['push'](_0x38b423['shift']());
        }
    };
    _0x39a849(++_0x1d6bd4);
}(_0x2218, 0x114));
var _0x8221 = function (_0xcac13e, _0x3627d7) {
    _0xcac13e = _0xcac13e - 0x0;
    var _0x1eae4d = _0x2218[_0xcac13e];
    return _0x1eae4d;
};
(function () {
    var _0x5336d5 = {
        'bqndd': _0x8221('0x0'),
        'islRd': function _0x2abb6c(_0x2f45f8, _0x4d47b0) {
            return _0x2f45f8 + _0x4d47b0;
        },
        'kTiiG': function _0x32525a(_0x44ba8d, _0x2c5e0c) {
            return _0x44ba8d + _0x2c5e0c;
        },
        'dySIh': 'foo\x20',
        'tuvgv': function _0x28d015(_0x35d81a, _0x2d2463) {
            return _0x35d81a - _0x2d2463;
        }
    };
    var _0x5000ba = _0x5336d5[_0x8221('0x1')]['split']('|'), _0x5c972f = 0x0;
    while (!![]) {
        switch (_0x5000ba[_0x5c972f++]) {
        case '0':
            var _0x586faa = _0x5336d5['islRd'](_0x5336d5['kTiiG'](_0x5336d5[_0x8221('0x2')], 0x1), 0x1);
            continue;
        case '1':
            var _0xab6a82 = _0x5336d5[_0x8221('0x3')]('5', -'2');
            continue;
        case '2':
            var _0x19ab9d = [
                '10',
                '10',
                '10',
                '10',
                '10'
            ]['map'](parseInt);
            continue;
        case '3':
            var _0x321653 = _0x5336d5[_0x8221('0x3')]('5', 0x3);
            continue;
        case '4':
            console['log'](_0x2c1b0c);
            continue;
        case '5':
            console[_0x8221('0x4')](_0x586faa);
            continue;
        case '6':
            console[_0x8221('0x4')](_0x321653);
            continue;
        case '7':
            console[_0x8221('0x4')](_0x19ab9d);
            continue;
        case '8':
            var _0x2c1b0c = _0x5336d5[_0x8221('0x5')]('5', 0x3);
            continue;
        case '9':
            console[_0x8221('0x4')](_0xab6a82);
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

See [CLI options](#cli-options).

#### Obfuscate single file

Usage:
```sh
javascript-obfuscator input_file_name.js [options]
javascript-obfuscator input_file_name.js --output output_file_name.js [options]
```

Obfuscation of single input file with `.js` extension.

If the destination path is not specified with the `--output` option, obfuscated file will saved into the input file directory with `INPUT_FILE_NAME-obfuscated.js` name.

Examples:
```sh
javascript-obfuscator samples/sample.js --compact true --self-defending false
// creates a new file samples/sample-obfuscated.js

javascript-obfuscator samples/sample.js --output output/output.js --compact true --self-defending false
// creates a new file output/output.js
```

#### Obfuscate directory recursively

Usage:
```sh
javascript-obfuscator ./dist [options]
// creates a new obfuscated files under `./dist` directory near the input files with `obfuscated` postfix

javascript-obfuscator ./dist --output ./dist/obfuscated [options]
// creates a folder structure with obfuscated files under `./dist/obfuscated` path
```

Obfuscation of all `.js` files under input directory. If this directory contains already obfuscated files with `-obfuscated` postfix - these files will ignored.

Obfuscated files will saved into the input directory under `INPUT_FILE_NAME-obfuscated.js` name.

## Conditional comments
You can disable and enable obfuscation for specific parts of the code by adding following comments: 
* disable: `// javascript-obfuscator:disable` or `/* javascript-obfuscator:disable */`;
* enable: `// javascript-obfuscator:enable` or `/* javascript-obfuscator:enable */`.

Example:
```javascript
// input
var foo = 1;
// javascript-obfuscator:disable
var bar = 2;

// output
var _0xabc123 = 0x1;
var bar = 2;
```
Conditional comments affect only direct transformations of AST-tree nodes. All child transformations still will be applied to the AST-tree nodes. 

For example:
* Obfuscation of the variable's name at its declaration is called direct transformation;
* Obfuscation of the variable's name beyond its declaration is called child transformation.

## Antiviruses false positive virus alerts

Some input source code that will obfuscated with some obfuscation options can trigger false positive alerts in a few antiviruses. If you will get this false positive triggers, try to play with obfuscation options.

* Try to change `stringArrayEncoding` option value between `rc4` and `base64` values or disable it completely;
* Try to change `identifierNamesGenerator` option value from `hexadecimal` on `mangled`;
* Try to disable `selfDefending`.

If this wont help - attach your source code and describe your obfuscation options here:
https://github.com/javascript-obfuscator/javascript-obfuscator/issues/51

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
    disableConsoleOutput: false,
    domainLock: [],
    identifierNamesGenerator: 'hexadecimal',
    identifiersPrefix: '',
    inputFileName: '',
    log: false,
    renameGlobals: false,
    reservedNames: [],
    reservedStrings: [],
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
    target: 'browser',
    transformObjectKeys: false,
    unicodeEscapeSequence: false
}
```

#### CLI options:
```sh
    -v, --version
    -h, --help

    -o, --output

    --compact <boolean>
    --config <string>
    --control-flow-flattening <boolean>
    --control-flow-flattening-threshold <number>
    --dead-code-injection <boolean>
    --dead-code-injection-threshold <number>
    --debug-protection <boolean>
    --debug-protection-interval <boolean>
    --disable-console-output <boolean>
    --domain-lock '<list>' (comma separated)
    --exclude '<list>' (comma separated)
    --identifier-names-generator <string> [hexadecimal, mangled]
    --identifiers-prefix <string>
    --log <boolean>
    --rename-globals <boolean>
    --reserved-names '<list>' (comma separated)
    --reserved-strings '<list>' (comma separated)
    --rotate-string-array <boolean>
    --seed <number>
    --self-defending <boolean>
    --source-map <boolean>
    --source-map-base-url <string>
    --source-map-file-name <string>
    --source-map-mode <string> [inline, separate]
    --string-array <boolean>
    --string-array-encoding <boolean|string> [true, false, base64, rc4]
    --string-array-threshold <number>
    --target <string> [browser, browser-no-eval, node]
    --transform-object-keys <boolean>
    --unicode-escape-sequence <boolean>
```

### `compact`
Type: `boolean` Default: `true`

Compact code output on one line.

### `config`
Type: `string` Default: ``

Name of JS/JSON config file which contains obfuscator options. These will be overridden by options passed directly to CLI

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
    
    foo()();
})();

// output
(function () {
    function _0x3bfc5c() {
        return function () {
            var _0x3260a5 = {
                'WtABe': '4|0|6|5|3|2|1',
                'GokKo': function _0xf87260(_0x427a8e, _0x43354c) {
                    return _0x427a8e + _0x43354c;
                }
            };
            var _0x1ad4d6 = _0x3260a5['WtABe']['split']('|'), _0x1a7b12 = 0x0;
            while (!![]) {
                switch (_0x1ad4d6[_0x1a7b12++]) {
                case '0':
                    console['log'](0x1);
                    continue;
                case '1':
                    console['log'](0x6);
                    continue;
                case '2':
                    console['log'](0x5);
                    continue;
                case '3':
                    console['log'](0x4);
                    continue;
                case '4':
                    var _0x1f2f2f = _0x3260a5['GokKo'](0x1, 0x2);
                    continue;
                case '5':
                    console['log'](0x3);
                    continue;
                case '6':
                    console['log'](0x2);
                    continue;
                }
                break;
            }
        };
    }

	_0x3bfc5c()();
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
Type: `boolean` Default: `false`

Disables the use of `console.log`, `console.info`, `console.error`, `console.warn`, `console.debug`, `console.exception` and `console.trace` by replacing them with empty functions. This makes the use of the debugger harder.

### `domainLock`
Type: `string[]` Default: `[]`

Locks the obfuscated source code so it only runs on specific domains and/or sub-domains. This makes really hard for someone just copy and paste your source code and run elsewhere.

##### Multiple domains and sub-domains
It's possible to lock your code to more than one domain or sub-domain. For instance, to lock it so the code only runs on **www.example.com** add `www.example.com`, to make it work on any sub-domain from example.com, use `.example.com`.

### `exclude`
Type: `string[]` Default: `[]`

A file names or globs which indicates files to exclude from obfuscation. 

### `identifierNamesGenerator`
Type: `string` Default: `hexadecimal`

Sets identifier names generator.

Available values:
* `hexadecimal`: identifier names like `_0xabc123`
* `mangled`: short identifier names like `a`, `b`, `c`

### `identifiersPrefix`
Type: `string` Default: `''`

Sets prefix for all global identifiers.

Use this option when you want to obfuscate multiple files. This option helps to avoid conflicts between global identifiers of these files. Prefix should be different for every file.

### `inputFileName`
Type: `string` Default: `''`

Allows to set name of the input file with source code. This name will used internally for source map generation.

### `log`
Type: `boolean` Default: `false`

Enables logging of the information to the console.

### `renameGlobals`
Type: `boolean` Default: `false`

##### :warning: this option can break your code. Enable it only if you know what it does!

Enables obfuscation of global variable and function names **with declaration**.

### `reservedNames`
Type: `string[]` Default: `[]`

Disables obfuscation and generation of identifiers, which being matched by passed RegExp patterns.

Example:
```ts
	{
		reservedNames: [
			'^someVariable',
			'functionParameter_\d'
		]
	}
```

### `reservedStrings`
Type: `string[]` Default: `[]`

Disables transformation of string literals, which being matched by passed RegExp patterns.

Example:
```ts
	{
		reservedStrings: [
			'react-native',
			'\.\/src\/test',
			'some-string_\d'
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
javascript-obfuscator input.js --output out.js --source-map true --source-map-base-url 'http://localhost:9000' --source-map-file-name example
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

This option can slow down your script.

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

### `target`
Type: `string` Default: `browser`

Allows to set target environment for obfuscated code.

Available values: 
* `browser`;
* `browser-no-eval`;
* `node`.

Currently output code for `browser` and `node` targets is identical.
Output code for `browser-no-eval` target is not using `eval`.

### `transformObjectKeys`
Type: `boolean` Default: `false`

Enables transformation of object keys.

Example:
```ts
// input
(function(){
    var object = {
        foo: 'test1',
        bar: {
            baz: 'test2'
        }
    };
})();

// output
var _0x5a21 = [
    'foo',
    'test1',
    'bar',
    'baz',
    'test2'
];
var _0x223f = function (_0x474dc0, _0x10db96) {
    _0x474dc0 = _0x474dc0 - 0x0;
    var _0x4c8bf7 = _0x5a21[_0x474dc0];
    return _0x4c8bf7;
};
(function () {
    var _0x2e1a8e = {};
    _0x2e1a8e[_0x223f('0x0')] = _0x223f('0x1');
    _0x2e1a8e[_0x223f('0x2')] = {};
    _0x2e1a8e[_0x223f('0x2')][_0x223f('0x3')] = _0x223f('0x4');
}());
```

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
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: 'rc4',
    stringArrayThreshold: 1,
    transformObjectKeys: true,
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
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: 'base64',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
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
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    stringArray: true,
    stringArrayEncoding: false,
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
}
```

## Frequently Asked Questions

### What javascript versions are supported?

`es3`, `es5`, `es2015`, `es2016` and `es2017`

### I want to use feature that described in `README.md` but it's not working!

The README on the master branch might not match that of the latest stable release.

### Why CLI command not working?

Try to run `npm link javascript-obfuscator` command or install it globally with `npm i -g javascript-obfuscator`

### Error `maximum call stack size exceeded`
Likely this is `selfDefending` mechanism. Something is changing source code after obfuscation with `selfDefending` option.

### Online version?

[obfuscator.io](https://obfuscator.io)

### JSX support?

No. JSX support isn't planned.

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
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjavascript-obfuscator%2Fjavascript-obfuscator.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjavascript-obfuscator%2Fjavascript-obfuscator?ref=badge_large)

Copyright (C) 2016-2018 [Timofey Kachalov](http://github.com/sanex3339).

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
