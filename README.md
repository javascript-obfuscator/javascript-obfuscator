<!--
  Title: JavaScript Obfuscator
  Description: A powerful obfuscator for JavaScript and Node.js.
  Author: Timofey Kachalov
  -->

# JavaScript obfuscator

![logo](https://raw.githubusercontent.com/javascript-obfuscator/javascript-obfuscator/master/images/logo.png)

JavaScript Obfuscator is a powerful free obfuscator for JavaScript, containing a variety of features which provide protection for your source code.

**Key features:**
- variables renaming
- strings extraction and encryption
- dead code injection
- control flow flattening
- various code transformations
- and [more](#javascript-obfuscator-options)...

The example of obfuscated code: [github.com](https://github.com/javascript-obfuscator/javascript-obfuscator/blob/master/examples/javascript-obfuscator.js)

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
* Netlify plugin: [netlify-plugin-js-obfuscator](https://www.npmjs.com/package/netlify-plugin-js-obfuscator)

[![npm version](https://badge.fury.io/js/javascript-obfuscator.svg)](https://badge.fury.io/js/javascript-obfuscator)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjavascript-obfuscator%2Fjavascript-obfuscator.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjavascript-obfuscator%2Fjavascript-obfuscator?ref=badge_shield)
![Build Status](https://github.com/javascript-obfuscator/javascript-obfuscator/workflows/JavaScript%20Obfuscator%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/javascript-obfuscator/javascript-obfuscator/badge.svg)](https://coveralls.io/github/javascript-obfuscator/javascript-obfuscator)
[![Backers on Open Collective](https://opencollective.com/javascript-obfuscator/backers/badge.svg)](#backers) 
[![Sponsors on Open Collective](https://opencollective.com/javascript-obfuscator/sponsors/badge.svg)](#sponsors)
[![xscode](https://img.shields.io/badge/Available%20on-xs%3Acode-blue?style=?style=plastic&logo=appveyor&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////////VXz1bAAAAAJ0Uk5T/wDltzBKAAAAlUlEQVR42uzXSwqAMAwE0Mn9L+3Ggtgkk35QwcnSJo9S+yGwM9DCooCbgn4YrJ4CIPUcQF7/XSBbx2TEz4sAZ2q1RAECBAiYBlCtvwN+KiYAlG7UDGj59MViT9hOwEqAhYCtAsUZvL6I6W8c2wcbd+LIWSCHSTeSAAECngN4xxIDSK9f4B9t377Wd7H5Nt7/Xz8eAgwAvesLRjYYPuUAAAAASUVORK5CYII=)](https://xscode.com/sanex3339/javascript-obfuscator)

#### You can support this project by donating:
* (Bitcoin) bc1q203p8nyrstwm7vwzjg3h9l9t6y9ka0umw0rx96

Huge thanks to all supporters!

#### *NOTE! the README on the master branch might not match that of the latest stable release!*

#### If you have a question, check this section first: [FAQ](#frequently-asked-questions)

## :warning: Important
##### Only obfuscate the code that belongs to you. 

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
<script src="https://cdn.jsdelivr.net/npm/javascript-obfuscator/dist/index.browser.js"></script>
```

From `node_modules`:

```html
<script src="./node_modules/javascript-obfuscator/dist/index.browser.js"></script>
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
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1
    }
);

console.log(obfuscationResult.getObfuscatedCode());
/*
var _0x9947 = [
    'map',
    'log',
    'foo\x20',
    'bvmqO',
    '133039ViRMWR',
    'xPfLC',
    'ytpdx',
    '1243717qSZCyh',
    '2|7|4|6|9|',
    '1ErtbCr',
    '1608314VKvthn',
    '1ZRaFKN',
    'XBoAA',
    '423266kQOYHV',
    '3|0|5|8|1',
    '235064xPNdKe',
    '13RUDZfG',
    '157gNPQGm',
    '1639212MvnHZL',
    'rDjOa',
    'iBHph',
    '9926iRHoRl',
    'split'
];
function _0x33e4(_0x1809b5, _0x37ef6e) {
    return _0x33e4 = function (_0x338a69, _0x39ad79) {
        _0x338a69 = _0x338a69 - (0x1939 + -0xf * 0x1f3 + 0x1 * 0x469);
        var _0x2b223a = _0x9947[_0x338a69];
        return _0x2b223a;
    }, _0x33e4(_0x1809b5, _0x37ef6e);
}
(function (_0x431d87, _0x156c7f) {
    var _0x10cf6e = _0x33e4;
    while (!![]) {
        try {
            var _0x330ad1 = -parseInt(_0x10cf6e(0x6c)) * -parseInt(_0x10cf6e(0x6d)) + -parseInt(_0x10cf6e(0x74)) * -parseInt(_0x10cf6e(0x78)) + parseInt(_0x10cf6e(0x6a)) + -parseInt(_0x10cf6e(0x70)) + parseInt(_0x10cf6e(0x6e)) * -parseInt(_0x10cf6e(0x75)) + parseInt(_0x10cf6e(0x72)) + -parseInt(_0x10cf6e(0x67)) * parseInt(_0x10cf6e(0x73));
            if (_0x330ad1 === _0x156c7f)
                break;
            else
                _0x431d87['push'](_0x431d87['shift']());
        } catch (_0x9f878) {
            _0x431d87['push'](_0x431d87['shift']());
        }
    }
}(_0x9947, -0xb6270 + 0x4dfd2 * 0x2 + 0x75460 * 0x2), function () {
    var _0x1f346d = _0x33e4, _0x860db8 = {
            'ytpdx': _0x1f346d(0x6b) + _0x1f346d(0x71),
            'bvmqO': function (_0x560787, _0x519b9e) {
                return _0x560787 - _0x519b9e;
            },
            'rDjOa': function (_0x4501fe, _0x2b07a3) {
                return _0x4501fe + _0x2b07a3;
            },
            'xPfLC': function (_0x5f3c9b, _0x434936) {
                return _0x5f3c9b + _0x434936;
            },
            'XBoAA': function (_0x535b8a, _0x42eef4) {
                return _0x535b8a + _0x42eef4;
            },
            'iBHph': _0x1f346d(0x65)
        }, _0x346c55 = _0x860db8[_0x1f346d(0x69)][_0x1f346d(0x79)]('|'), _0x3bf817 = 0x4bb * 0x1 + 0x801 + -0xcbc;
    while (!![]) {
        switch (_0x346c55[_0x3bf817++]) {
        case '0':
            console[_0x1f346d(0x7b)](_0x4c96d8);
            continue;
        case '1':
            console[_0x1f346d(0x7b)](_0x101028);
            continue;
        case '2':
            var _0x65977d = _0x860db8[_0x1f346d(0x66)]('5', -0x586 + -0x2195 + -0x6 * -0x685);
            continue;
        case '3':
            console[_0x1f346d(0x7b)](_0x65977d);
            continue;
        case '4':
            var _0x56d39b = _0x860db8[_0x1f346d(0x76)]('5', -'2');
            continue;
        case '5':
            console[_0x1f346d(0x7b)](_0x56d39b);
            continue;
        case '6':
            var _0x544285 = [
                '10',
                '10',
                '10',
                '10',
                '10'
            ][_0x1f346d(0x7a)](parseInt);
            continue;
        case '7':
            var _0x4c96d8 = _0x860db8[_0x1f346d(0x68)]('5', 0x622 * -0x6 + 0x4a * 0x3 + 0x1 * 0x23f1);
            continue;
        case '8':
            console[_0x1f346d(0x7b)](_0x544285);
            continue;
        case '9':
            var _0x101028 = _0x860db8[_0x1f346d(0x6f)](_0x860db8[_0x1f346d(0x6f)](_0x860db8[_0x1f346d(0x77)], 0x6fb * 0x5 + 0x1ebf * 0x1 + -0x41a5), 0x209 * 0xa + 0x1314 + -0x276d);
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
* `getSourceMap()` - if [`sourceMap`](#sourcemap) option is enabled - returns `string` with source map or an empty string if [`sourceMapMode`](#sourcemapmode) option is set as `inline`;
* `getIdentifierNamesCache()` - returns object with identifier names cache if `identifierNamesCache` option is enabled, `null` overwise.

Calling `toString()` for `ObfuscationResult` object will return `string` with obfuscated code.

Method takes two parameters, `sourceCode` and `options` – the source code and the options respectively:

* `sourceCode` (`string`, default: `null`) – any valid source code, passed as a string;
* `options` (`Object`, default: `null`) – an object with options.

For available options, see [options](#options).

### `obfuscateMultiple(sourceCodesObject, options)`

Accepts `sourceCodesObject` that is a map which keys are identifiers of source codes and values are source codes:
```
{
    foo: 'var foo = 1;',
    bar: 'var bar = 2;'
}
```

Returns a map object which keys are identifiers of source codes and values are `ObfuscationResult` objects.

### `getOptionsByPreset(optionsPreset)`

Returns an options object for the passed options preset name.

## CLI usage

See [CLI options](#cli-options).

#### Obfuscate single file

Usage:
```sh
javascript-obfuscator input_file_name.js [options]
javascript-obfuscator input_file_name.js --output output_file_name.js [options]
javascript-obfuscator input_file_name.js --output output_folder_name [options]
javascript-obfuscator input_folder_name --output output_folder_name [options]
```

Obfuscation of single input file with `.js` extension.

If the destination path is not specified with the `--output` option, the obfuscated file will be saved into the input file directory, with `INPUT_FILE_NAME-obfuscated.js` name.

Some examples:
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

## Kind of variables

Kind of variables of inserted nodes will auto-detected, based on most prevailing kind of variables of source code.

## Conflicts of identifier names between different files

During obfuscation of the different files, the same names can be generated for the global identifiers between these files.
To prevent this set the unique prefix for all global identifiers for each obfuscated file with [`identifiersPrefix`](#identifiersprefix) option. 

When using CLI this prefix will be added automatically.

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
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    domainLock: [],
    domainLockRedirectUrl: 'about:blank',
    forceTransformStrings: [],
    identifierNamesCache: null,
    identifierNamesGenerator: 'hexadecimal',
    identifiersDictionary: [],
    identifiersPrefix: '',
    ignoreImports: false,
    inputFileName: '',
    log: false,
    numbersToExpressions: false,
    optionsPreset: 'default',
    renameGlobals: false,
    renameProperties: false,
    renamePropertiesMode: 'safe',
    reservedNames: [],
    reservedStrings: [],
    seed: 0,
    selfDefending: false,
    simplify: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: 'separate',
    sourceMapSourcesMode: 'sources-content',
    splitStrings: false,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayCallsTransformThreshold: 0.5,
    stringArrayEncoding: [],
    stringArrayIndexesType: [
        'hexadecimal-number'
    ],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: 'variable',
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
    --debug-protection-interval <number>
    --disable-console-output <boolean>
    --domain-lock '<list>' (comma separated)
    --domain-lock-redirect-url <string>
    --exclude '<list>' (comma separated)
    --force-transform-strings '<list>' (comma separated)
    --identifier-names-cache-path <string>
    --identifier-names-generator <string> [dictionary, hexadecimal, mangled, mangled-shuffled]
    --identifiers-dictionary '<list>' (comma separated)
    --identifiers-prefix <string>
    --ignore-imports <boolean>
    --log <boolean>
    --numbers-to-expressions <boolean>
    --options-preset <string> [default, low-obfuscation, medium-obfuscation, high-obfuscation]
    --rename-globals <boolean>
    --rename-properties <boolean>
    --rename-properties-mode <string> [safe, unsafe]
    --reserved-names '<list>' (comma separated)
    --reserved-strings '<list>' (comma separated)
    --seed <string|number>
    --self-defending <boolean>
    --simplify <boolean>
    --source-map <boolean>
    --source-map-base-url <string>
    --source-map-file-name <string>
    --source-map-mode <string> [inline, separate]
    --source-map-sources-mode <string> [sources, sources-content]
    --split-strings <boolean>
    --split-strings-chunk-length <number>
    --string-array <boolean>
    --string-array-calls-transform <boolean>
    --string-array-calls-transform-threshold <number>
    --string-array-encoding '<list>' (comma separated) [none, base64, rc4]
    --string-array-indexes-type '<list>' (comma separated) [hexadecimal-number, hexadecimal-numeric-string]
    --string-array-index-shift <boolean>
    --string-array-rotate <boolean>
    --string-array-shuffle <boolean>
    --string-array-wrappers-count <number>
    --string-array-wrappers-chained-calls <boolean>
    --string-array-wrappers-parameters-max-count <number>
    --string-array-wrappers-type <string> [variable, function]
    --string-array-threshold <number>
    --target <string> [browser, browser-no-eval, node]
    --transform-object-keys <boolean>
    --unicode-escape-sequence <boolean>
```

<!-- ##options-start## -->

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

The probability that the [`controlFlowFlattening`](#controlflowflattening) transformation will be applied to any given node.

This setting is especially useful for large code size because large amounts of control flow transformations can slow down your code and increase code size.

`controlFlowFlatteningThreshold: 0` equals to `controlFlowFlattening: false`.

### `deadCodeInjection`
Type: `boolean` Default: `false`

##### :warning: Dramatically increases size of obfuscated code (up to 200%), use only if size of obfuscated code doesn't matter. Use [`deadCodeInjectionThreshold`](#deadcodeinjectionthreshold) to set percentage of nodes that will affected by dead code injection.
##### :warning: This option forcibly enables `stringArray` option.

With this option, random blocks of dead code will be added to the obfuscated code. 

Example:
```ts
// input
(function(){
    if (true) {
        var foo = function () {
            console.log('abc');
        };
        var bar = function () {
            console.log('def');
        };
        var baz = function () {
            console.log('ghi');
        };
        var bark = function () {
            console.log('jkl');
        };
        var hawk = function () {
            console.log('mno');
        };

        foo();
        bar();
        baz();
        bark();
        hawk();
    }
})();

// output
var _0x37b8 = [
    'YBCtz',
    'GlrkA',
    'urPbb',
    'abc',
    'NMIhC',
    'yZgAj',
    'zrAId',
    'EtyJA',
    'log',
    'mno',
    'jkl',
    'def',
    'Quzya',
    'IWbBa',
    'ghi'
];
function _0x43a7(_0x12cf56, _0x587376) {
    _0x43a7 = function (_0x2f87a8, _0x47eac2) {
        _0x2f87a8 = _0x2f87a8 - (0x16a7 * 0x1 + 0x5 * 0x151 + -0x1c92);
        var _0x341e03 = _0x37b8[_0x2f87a8];
        return _0x341e03;
    };
    return _0x43a7(_0x12cf56, _0x587376);
}
(function () {
    if (!![]) {
        var _0xbbe28f = function () {
            var _0x2fc85f = _0x43a7;
            if (_0x2fc85f(0xaf) === _0x2fc85f(0xae)) {
                _0x1dd94f[_0x2fc85f(0xb2)](_0x2fc85f(0xb5));
            } else {
                console[_0x2fc85f(0xb2)](_0x2fc85f(0xad));
            }
        };
        var _0x5e46bc = function () {
            var _0x15b472 = _0x43a7;
            if (_0x15b472(0xb6) !== _0x15b472(0xaa)) {
                console[_0x15b472(0xb2)](_0x15b472(0xb5));
            } else {
                _0x47eac2[_0x15b472(0xb2)](_0x15b472(0xad));
            }
        };
        var _0x3669e8 = function () {
            var _0x47a442 = _0x43a7;
            if (_0x47a442(0xb7) !== _0x47a442(0xb0)) {
                console[_0x47a442(0xb2)](_0x47a442(0xb8));
            } else {
                _0x24e0bf[_0x47a442(0xb2)](_0x47a442(0xb3));
            }
        };
        var _0x28b05a = function () {
            var _0x497902 = _0x43a7;
            if (_0x497902(0xb1) === _0x497902(0xb1)) {
                console[_0x497902(0xb2)](_0x497902(0xb4));
            } else {
                _0x59c9c6[_0x497902(0xb2)](_0x497902(0xb4));
            }
        };
        var _0x402a54 = function () {
            var _0x1906b7 = _0x43a7;
            if (_0x1906b7(0xab) === _0x1906b7(0xac)) {
                _0xb89cd0[_0x1906b7(0xb2)](_0x1906b7(0xb8));
            } else {
                console[_0x1906b7(0xb2)](_0x1906b7(0xb3));
            }
        };
        _0xbbe28f();
        _0x5e46bc();
        _0x3669e8();
        _0x28b05a();
        _0x402a54();
    }
}());
```

### `deadCodeInjectionThreshold`
Type: `number` Default: `0.4` Min: `0` Max: `1`

Allows to set percentage of nodes that will affected by `deadCodeInjection`.

### `debugProtection`
Type: `boolean` Default: `false`

##### :warning: Can freeze your browser if you open the Developer Tools.

This option makes it almost impossible to use the `debugger` function of the Developer Tools (both on WebKit-based and Mozilla Firefox).

### `debugProtectionInterval`
Type: `number` Default: `0`

##### :warning: Can freeze your browser! Use at own risk.

If set, an interval in milliseconds is used to force the debug mode on the Console tab, making it harder to use other features of the Developer Tools. Works if [`debugProtection`](#debugprotection) is enabled. Recommended value is between `2000` and `4000` milliseconds.

### `disableConsoleOutput`
Type: `boolean` Default: `false`

##### :warning: This option disables `console` calls globally for all scripts

Disables the use of `console.log`, `console.info`, `console.error`, `console.warn`, `console.debug`, `console.exception` and `console.trace` by replacing them with empty functions. This makes the use of the debugger harder.

### `domainLock`
Type: `string[]` Default: `[]`

##### :warning: This option does not work with `target: 'node'`

Allows to run the obfuscated source code only on specific domains and/or sub-domains. This makes really hard for someone to just copy and paste your source code and run it elsewhere.

If the source code isn't run on the domains specified by this option, the browser will be redirected to a passed to the [`domainLockRedirectUrl`](#domainlockredirecturl) option URL.

##### Multiple domains and sub-domains
It's possible to lock your code to more than one domain or sub-domain. For instance, to lock it so the code only runs on **www.example.com** add `www.example.com`. To make it work on the root domain including any sub-domains (`example.com`, `sub.example.com`), use `.example.com`.

### `domainLockRedirectUrl`
Type: `string` Default: `about:blank`

##### :warning: This option does not work with `target: 'node'`

Allows the browser to be redirected to a passed URL if the source code isn't run on the domains specified by [`domainLock`](#domainlock)

### `exclude`
Type: `string[]` Default: `[]`

A file names or globs which indicates files to exclude from obfuscation. 

### `forceTransformStrings`
Type: `string[]` Default: `[]`

Enables force transformation of string literals, which being matched by passed RegExp patterns.

##### :warning: This option affects only strings that shouldn't be transformed by [`stringArrayThreshold`](#stringarraythreshold) (or possible other thresholds in the future)

The option has a priority over `reservedStrings` option but hasn't a priority over `conditional comments`.

Example:
```ts
	{
		forceTransformStrings: [
			'some-important-value',
			'some-string_\d'
		]
	}
```

### `identifierNamesCache`
Type: `Object | null` Default: `null`

The main goal for this option is the ability to use the same identifier names during obfuscation of multiple sources/files.

Currently the two types of the identifiers are supported:
- Global identifiers:
    * All global identifiers will be written to the cache;
    * All matched **undeclared** global identifiers will be replaced by the values from the cache.
- Property identifiers, only when `renameProperties` option is enabled:
    * All property identifiers will be written to the cache;
    * All matched property identifiers will be replaced by the values from the cache.

#### Node.js API
If a `null` value is passed, completely disables the cache.

If an empty object (`{}`) is passed, enables the writing identifier names to the cache-object (`TIdentifierNamesCache` type). This cache-object will be accessed through the `getIdentifierNamesCache` method call of `ObfuscationResult` object.

The resulting cache-object can be next used as `identifierNamesGenerator` option value for using these names during obfuscation of all matched identifier names of next sources.

Example:
```ts
const source1ObfuscationResult = JavaScriptObfuscator.obfuscate(
    `
        function foo(arg) {
           console.log(arg)
        }
        
        function bar() {
            var bark = 2;
        }
    `,
    {
        compact: false,
        identifierNamesCache: {},
        renameGlobals: true
    }
)

console.log(source1ObfuscationResult.getIdentifierNamesCache());
/*
    { 
        globalIdentifiers: {
            foo: '_0x5de86d',
            bar: '_0x2a943b'
        }
    }
*/



const source2ObfuscationResult = JavaScriptObfuscator.obfuscate(
    `
        // Expecting that these global functions are defined in another obfuscated file
        foo(1);
        bar();
        
        // Expecting that this global function is defined in third-party package
        baz();
    `,
    {
        compact: false,
        identifierNamesCache: source1ObfuscationResult.getIdentifierNamesCache(),
        renameGlobals: true
    }
)

console.log(source2ObfuscationResult.getObfuscatedCode());
/*
    _0x5de86d(0x1);
    _0x2a943b();
    baz();
 */
```

#### CLI
CLI has a different option `--identifier-names-cache-path` that allows defining a path to the existing `.json` file that will be used to read and write identifier names cache.

If a path to the empty file will be passed - identifier names cache will be written to that file.

This file with existing cache can be used again as `--identifier-names-cache-path` option value for using these names during obfuscation of all matched identifier names of the next files.

### `identifierNamesGenerator`
Type: `string` Default: `hexadecimal`

Sets identifier names generator.

Available values:
* `dictionary`: identifier names from [`identifiersDictionary`](#identifiersdictionary) list
* `hexadecimal`: identifier names like `_0xabc123`
* `mangled`: short identifier names like `a`, `b`, `c`
* `mangled-shuffled`: same as `mangled` but with shuffled alphabet

### `identifiersDictionary`
Type: `string[]` Default: `[]`

Sets identifiers dictionary for [`identifierNamesGenerator`](#identifiernamesgenerator): `dictionary` option. Each identifier from the dictionary will be used in a few variants with a different casing of each character. Thus, the number of identifiers in the dictionary should depend on the identifiers amount at original source code.

### `identifiersPrefix`
Type: `string` Default: `''`

Sets prefix for all global identifiers.

Use this option when you want to obfuscate multiple files. This option helps to avoid conflicts between global identifiers of these files. Prefix should be different for every file.

### `ignoreImports`
Type: `boolean` Default: `false`

Prevents obfuscation of `require` imports. Could be helpful in some cases when for some reason runtime environment requires these imports with static strings only.

### `inputFileName`
Type: `string` Default: `''`

Allows to set name of the input file with source code. This name will be used internally for source map generation.
Required when using NodeJS API and `sourceMapSourcesMode` option has `sources` value`.

### `log`
Type: `boolean` Default: `false`

Enables logging of the information to the console.

### `numbersToExpressions`
Type: `boolean` Default: `false`

Enables numbers conversion to expressions

Example: 
```ts
// input
const foo = 1234;

// output
const foo=-0xd93+-0x10b4+0x41*0x67+0x84e*0x3+-0xff8;
```

### `optionsPreset`
Type: `string` Default: `default`

Allows to set [options preset](#preset-options).

Available values: 
* `default`;
* `low-obfuscation`;
* `medium-obfuscation`;
* `high-obfuscation`.

All addition options will be merged with selected options preset.

### `renameGlobals`
Type: `boolean` Default: `false`

##### :warning: this option can break your code. Enable it only if you know what it does!

Enables obfuscation of global variable and function names **with declaration**.

### `renameProperties`
Type: `boolean` Default: `false`

##### :warning: this option **MAY** break your code. Enable it only if you know what it does!

Enables renaming of property names. All built-in DOM properties and properties in core JavaScript classes will be ignored.

To switch between `safe` and `unsafe` modes of this option use [`renamePropertiesMode`](#renamepropertiesmode) option.

To set format of renamed property names use [`identifierNamesGenerator`](#identifiernamesgenerator) option.

To control which properties will be renamed use [`reservedNames`](#reservednames) option.

Example: 
```ts
// input
(function () {
    const foo = {
        prop1: 1,
        prop2: 2,
        calc: function () {
            return this.prop1 + this.prop2;
        }
    };
    
    console.log(foo.calc());
})();

// output
(function () {
    const _0x46529b = {
        '_0x10cec7': 0x1,
        '_0xc1c0ca': 0x2,
        '_0x4b961d': function () {
            return this['_0x10cec7'] + this['_0xc1c0ca'];
        }
    };
    console['log'](_0x46529b['_0x4b961d']());
}());
```

### `renamePropertiesMode`
Type: `string` Default: `safe`

##### :warning: Even in `safe` mode, [`renameProperties`](#renameproperties) option **MAY** break your code.

Specifies `renameProperties` option mode:
* `safe` - default behaviour after `2.11.0` release. Trying to rename properties in a more safe way to prevent runtime errors. With this mode some properties will be excluded from renaming.
* `unsafe` - default behaviour before `2.11.0` release. Renames properties in an unsafe way without any restrictions.

If one file is using properties from other file, use [`identifierNamesCache`](#identifiernamescache) option to keep the same property names between these files.

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

### `seed`
Type: `string|number` Default: `0`

This option sets seed for random generator. This is useful for creating repeatable results.

If seed is `0` - random generator will work without seed.

### `selfDefending`
Type: `boolean` Default: `false`

##### :warning: Don't change obfuscated code in any way after obfuscation with this option, because any change like uglifying of code can trigger self defending and code wont work anymore!
##### :warning: This option forcibly sets `compact` value to `true`

This option makes the output code resilient against formatting and variable renaming. If one tries to use a JavaScript beautifier on the obfuscated code, the code won't work anymore, making it harder to understand and modify it.

### `simplify`
Type: `boolean` Default: `true`

Enables additional code obfuscation through simplification.

##### :warning: in future releases obfuscation of `boolean` literals (`true` => `!![]`) will be moved under this option. 

Example:
```ts
// input
if (condition1) {
    const foo = 1;
    const bar = 2;
  
    console.log(foo);
  
    return bar;
} else if (condition2) {
    console.log(1);
    console.log(2);
    console.log(3);
  
    return 4;
} else {
    return 5;
}

// output
if (condition1) {
    const foo = 0x1, bar = 0x2;
    return console['log'](foo), bar;
} else
    return condition2 ? (console['log'](0x1), console['log'](0x2), console['log'](0x3), 0x4) : 0x5;
```

### `sourceMap`
Type: `boolean` Default: `false`

Enables source map generation for obfuscated code.

Source maps can be useful to help you debug your obfuscated JavaScript source code. If you want or need to debug in production, you can upload the separate source map file to a secret location and then point your browser there. 

### `sourceMapBaseUrl`
Type: `string` Default: ``

Sets base url to the source map import url when [`sourceMapMode: 'separate'`](#sourcemapmode).
 
CLI example:
```
javascript-obfuscator input.js --output out.js --source-map true --source-map-base-url 'http://localhost:9000'
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
* `inline` - add source map at the end of each .js files;
* `separate` - generates corresponding '.map' file with source map. In case you run obfuscator through CLI - adds link to source map file to the end of file with obfuscated code `//# sourceMappingUrl=file.js.map`.

### `sourceMapSourcesMode`
Type: `string` Default: `sources-content`

Allows to control `sources` and `sourcesContent` fields of the source map:
* `sources-content` - adds dummy `sources` field, adds `sourcesContent` field with the original source code;
* `sources` - adds `sources` field with a valid source description, does not add `sourcesContent` field. When using NodeJS API it's required to define `inputFileName` option that will be used as `sources` field value.

### `splitStrings`
Type: `boolean` Default: `false`

Splits literal strings into chunks with length of [`splitStringsChunkLength`](#splitstringschunklength) option value.

Example:
```ts
// input
(function(){
    var test = 'abcdefg';
})();

// output
(function(){
    var _0x5a21 = 'ab' + 'cd' + 'ef' + 'g';
})();
```

### `splitStringsChunkLength`
Type: `number` Default: `10`

Sets chunk length of [`splitStrings`](#splitstrings) option.

### `stringArray`
Type: `boolean` Default: `true`

Removes string literals and place them in a special array. For instance, the string `"Hello World"` in `var m = "Hello World";` will be replaced with something like `var m = _0x12c456[0x1];`

### `stringArrayCallsTransform`
Type: `boolean` Default: `false`

##### :warning: [`stringArray`](#stringarray) option must be enabled

Enables the transformation of calls to the [`stringArray`](#stringarray). All arguments of these calls may be extracted to a different object depending on [`stringArrayCallsTransformThreshold`](#stringarraycallstransformthreshold) value.
So it makes it even harder to automatically find calls to the string array.

Example:
```
function foo() {
    var k = {
        c: 0x2f2,
        d: '0x396',
        e: '0x397',
        f: '0x39a',
        g: '0x39d',
        h: 0x398,
        l: 0x394,
        m: '0x39b',
        n: '0x39f',
        o: 0x395,
        p: 0x395,
        q: 0x399,
        r: '0x399'
    };
    var c = i(k.d, k.e);
    var d = i(k.f, k.g);
    var e = i(k.h, k.l);
    var f = i(k.m, k.n);
    function i(c, d) {
        return b(c - k.c, d);
    }
    var g = i(k.o, k.p);
    var h = i(k.q, k.r);
}
function j(c, d) {
    var l = { c: 0x14b };
    return b(c - -l.c, d);
}
console[j(-'0xa6', -'0xa6')](foo());
function b(c, d) {
    var e = a();
    b = function (f, g) {
        f = f - 0xa3;
        var h = e[f];
        return h;
    };
    return b(c, d);
}
function a() {
    var m = [
        'string5',
        'string1',
        'log',
        'string3',
        'string6',
        'string2',
        'string4'
    ];
    a = function () {
        return m;
    };
    return a();
}
```

### `stringArrayCallsTransformThreshold`
Type: `number` Default: `0.5`

##### :warning: [`stringArray`](#stringarray) and [`stringArrayCallsTransformThreshold`](#stringarraycallstransformthreshold) options must be enabled

You can use this setting to adjust the probability (from 0 to 1) that calls to the string array will be transformed.

### `stringArrayEncoding`
Type: `string[]` Default: `[]`

##### :warning: `stringArray` option must be enabled

This option can slow down your script.

Encode all string literals of the [`stringArray`](#stringarray) using `base64` or `rc4` and inserts a special code that used to decode it back at runtime.

Each `stringArray` value will be encoded by the randomly picked encoding from the passed list. This makes possible to use multiple encodings.

Available values:
* `'none'` (`boolean`): doesn't encode `stringArray` value
* `'base64'` (`string`): encodes `stringArray` value using `base64`
* `'rc4'` (`string`): encodes `stringArray` value using `rc4`. **About 30-50% slower than `base64`, but more harder to get initial values.** It's recommended to disable [`unicodeEscapeSequence`](#unicodeescapesequence) option when using `rc4` encoding to prevent very large size of obfuscated code.

For example with the following option values some `stringArray` value won't be encoded, and some values will be encoded with `base64` and `rc4` encoding:

```ts
stringArrayEncoding: [
    'none',
    'base64',
    'rc4'
]
```

### `stringArrayIndexesType`
Type: `string[]` Default: `['hexadecimal-number']`

##### :warning: `stringArray` option must be enabled

Allows to control the type of string array call indexes.

Each `stringArray` call index will be transformed by the randomly picked type from the passed list. This makes possible to use multiple types.

Available values:
* `'hexadecimal-number'` (`default`): transforms string array call indexes as hexadecimal numbers
* `'hexadecimal-numeric-string'`: transforms string array call indexes as hexadecimal numeric string

Before `2.9.0` release `javascript-obfuscator` transformed all string array call indexes with `hexadecimal-numeric-string` type. This makes some manual deobfuscation slightly harder but it allows easy detection of these calls by automatic deobfuscators.

The new `hexadecimal-number` type approaches to make harder auto-detect of string array call patterns in the code.

More types will be added in the future.

### `stringArrayIndexShift`
Type: `boolean` Default: `true`

##### :warning: `stringArray` option must be enabled

Enables additional index shift for all string array calls

### `stringArrayRotate`
Type: `boolean` Default: `true`

##### :warning: [`stringArray`](#stringarray) must be enabled

Shift the `stringArray` array by a fixed and random (generated at the code obfuscation) places. This makes it harder to match the order of the removed strings to their original place.

### `stringArrayShuffle`
Type: `boolean` Default: `true`

##### :warning: [`stringArray`](#stringarray) must be enabled

Randomly shuffles the `stringArray` array items.

### `stringArrayWrappersCount`
Type: `number` Default: `1`

##### :warning: [`stringArray`](#stringarray) option must be enabled

Sets the count of wrappers for the `string array` inside each root or function scope.
The actual count of wrappers inside each scope is limited by a count of `literal` nodes within this scope.

Example:
```ts
// Input
const foo = 'foo';
const bar = 'bar';
        
function test () {
    const baz = 'baz';
    const bark = 'bark';
    const hawk = 'hawk';
}

const eagle = 'eagle';

// Output, stringArrayWrappersCount: 5
const _0x3f6c = [
    'bark',
    'bar',
    'foo',
    'eagle',
    'hawk',
    'baz'
];
const _0x48f96e = _0x2e13;
const _0x4dfed8 = _0x2e13;
const _0x55e970 = _0x2e13;
function _0x2e13(_0x33c4f5, _0x3f6c62) {
    _0x2e13 = function (_0x2e1388, _0x60b1e) {
        _0x2e1388 = _0x2e1388 - 0xe2;
        let _0x53d475 = _0x3f6c[_0x2e1388];
        return _0x53d475;
    };
    return _0x2e13(_0x33c4f5, _0x3f6c62);
}
const foo = _0x48f96e(0xe4);
const bar = _0x4dfed8(0xe3);
function test() {
    const _0x1c262f = _0x2e13;
    const _0x54d7a4 = _0x2e13;
    const _0x5142fe = _0x2e13;
    const _0x1392b0 = _0x1c262f(0xe7);
    const _0x201a58 = _0x1c262f(0xe2);
    const _0xd3a7fb = _0x1c262f(0xe6);
}
const eagle = _0x48f96e(0xe5);
```

### `stringArrayWrappersChainedCalls`
Type: `boolean` Default: `true`

##### :warning: [`stringArray`](#stringarray) and [`stringArrayWrappersCount`](#stringarraywrapperscount) options must be enabled

Enables the chained calls between `string array` wrappers.

Example:
```ts
// Input
const foo = 'foo';
const bar = 'bar';
        
function test () {
    const baz = 'baz';
    const bark = 'bark';

    function test1() {
        const hawk = 'hawk';
        const eagle = 'eagle';
    } 
}

// Output, stringArrayWrappersCount: 5, stringArrayWrappersChainedCalls: true
const _0x40c2 = [
    'bar',
    'bark',
    'hawk',
    'eagle',
    'foo',
    'baz'
];
const _0x31c087 = _0x3280;
const _0x31759a = _0x3280;
function _0x3280(_0x1f52ee, _0x40c2a2) {
    _0x3280 = function (_0x3280a4, _0xf07b02) {
        _0x3280a4 = _0x3280a4 - 0x1c4;
        let _0x57a182 = _0x40c2[_0x3280a4];
        return _0x57a182;
    };
    return _0x3280(_0x1f52ee, _0x40c2a2);
}
const foo = _0x31c087(0x1c8);
const bar = _0x31c087(0x1c4);
function test() {
    const _0x848719 = _0x31759a;
    const _0x2693bf = _0x31c087;
    const _0x2c08e8 = _0x848719(0x1c9);
    const _0x359365 = _0x2693bf(0x1c5);
    function _0x175e90() {
        const _0x310023 = _0x848719;
        const _0x2302ef = _0x2693bf;
        const _0x237437 = _0x310023(0x1c6);
        const _0x56145c = _0x310023(0x1c7);
    }
}
```

### `stringArrayWrappersParametersMaxCount`
Type: `number` Default: `2`

##### :warning: [`stringArray`](#stringarray) option must be enabled
##### :warning: Currently this option affects only wrappers added by [`stringArrayWrappersType`](#stringarraywrapperstype) `function` option value

Allows to control the maximum number of string array wrappers parameters.
Default and minimum value is `2`. Recommended value between `2` and `5`.

### `stringArrayWrappersType`
Type: `string` Default: `variable`

##### :warning: [`stringArray`](#stringarray) and [`stringArrayWrappersCount`](#stringarraywrapperscount) options must be enabled

Allows to select a type of the wrappers that are appending by the `stringArrayWrappersCount` option.

Available values:
* `'variable'`: appends variable wrappers at the top of each scope. Fast performance.
* `'function'`: appends function wrappers at random positions inside each scope. Slower performance than with `variable` but provides more strict obfuscation.

Highly recommended to use `function` wrappers for higher obfuscation when a performance loss doesn't have a high impact on an obfuscated application.

Example of the `'function'` option value:
```ts
// input
const foo = 'foo';

function test () {
    const bar = 'bar';
    console.log(foo, bar);
}

test();

// output
const a = [
    'log',
    'bar',
    'foo'
];
const foo = d(0x567, 0x568);
function b(c, d) {
    b = function (e, f) {
        e = e - 0x185;
        let g = a[e];
        return g;
    };
    return b(c, d);
}
function test() {
    const c = e(0x51c, 0x51b);
    function e (c, g) {
        return b(c - 0x396, g);
    }
    console[f(0x51b, 0x51d)](foo, c);
    function f (c, g) {
        return b(c - 0x396, g);
    }
}
function d (c, g) {
    return b(g - 0x3e1, c);
}
test();
```
    
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

Currently output code for `browser` and `node` targets is identical, but some browser-specific options are not allowed to use with `node` target.
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
var _0x4735 = [
    'foo',
    'baz',
    'bar',
    'test1',
    'test2'
];
function _0x390c(_0x33d6b6, _0x4735f4) {
    _0x390c = function (_0x390c37, _0x1eed85) {
        _0x390c37 = _0x390c37 - 0x198;
        var _0x2275f8 = _0x4735[_0x390c37];
        return _0x2275f8;
    };
    return _0x390c(_0x33d6b6, _0x4735f4);
}
(function () {
    var _0x17d1b7 = _0x390c;
    var _0xc9b6bb = {};
    _0xc9b6bb[_0x17d1b7(0x199)] = _0x17d1b7(0x19c);
    var _0x3d959a = {};
    _0x3d959a[_0x17d1b7(0x198)] = _0x17d1b7(0x19b);
    _0x3d959a[_0x17d1b7(0x19a)] = _0xc9b6bb;
    var _0x41fd86 = _0x3d959a;
}());
```

### `unicodeEscapeSequence`
Type: `boolean` Default: `false`

Allows to enable/disable string conversion to unicode escape sequence.

Unicode escape sequence increases code size greatly and strings easily can be reverted to their original view. Recommended to enable this option only for small source code. 

## Preset Options
### High obfuscation, low performance

The performance will be much slower than without obfuscation

```javascript
{
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: 4000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: ['rc4'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 5,
    stringArrayWrappersChainedCalls: true,    
    stringArrayWrappersParametersMaxCount: 5,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 1,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
}
```

### Medium obfuscation, optimal performance

The performance will be slower than without obfuscation

```javascript
{
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: true,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayCallsTransformThreshold: 0.75,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
}
```

### Low obfuscation, High performance

The performance will be at a relatively normal level

```javascript
{
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    selfDefending: true,
    simplify: true,
    splitStrings: false,
    stringArray: true,
    stringArrayCallsTransform: false,
    stringArrayEncoding: [],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: 'variable',
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
}
```

### Default preset, High performance

```javascript
{
    compact: true,
    controlFlowFlattening: false,
    deadCodeInjection: false,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    selfDefending: false,
    simplify: true,
    splitStrings: false,
    stringArray: true,
    stringArrayCallsTransform: false,
    stringArrayCallsTransformThreshold: 0.5,
    stringArrayEncoding: [],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: 'variable',
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false
}
```

<!-- ##options-end## -->

## Frequently Asked Questions

### What javascript versions are supported?

`es3`, `es5`, `es2015`, `es2016`, `es2017`, `es2018`, `es2019` and partially `es2020`

### I want to use feature that described in `README.md` but it's not working!

The README on the master branch might not match that of the latest stable release.

### Why CLI command not working?

Try to run `npm link javascript-obfuscator` command or install it globally with `npm i -g javascript-obfuscator`

### Online version?

[obfuscator.io](https://obfuscator.io)

### JSX support?

No. JSX support isn't planned.

### How to change kind of variables of inserted nodes (`var`, `let` or `const`)?

See: [`Kind of variables`](#kind-of-variables)

### Why I got `null` value instead of `BigInt` number?

`BigInt` obfuscation works correctly only in environments that support `BigInt` values. See [ESTree spec](https://github.com/estree/estree/blob/master/es2020.md#bigintliteral)

### I enabled `renameProperties` option, and my code broke! What to do?

Try `renamePropertiesMode: 'safe'` option, if it still doesn't work, just disable this option.

## Backers

Support us with a monthly donation and help us continue our activities.

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

Become a sponsor and get your logo on our README on Github with a link to your site.

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

Copyright (C) 2016-2022 [Timofey Kachalov](http://github.com/sanex3339).

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
