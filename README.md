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
* (OpenCollective) https://opencollective.com/javascript-obfuscator
* PayPal credit card [https://www.paypal.com/donate](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=javascript-obfuscator@yandex.ru&lc=US&no_note=0&item_name=Support+javascript-obfuscator&cn=&curency_code=USD&bn=PP-DonationsBF:btn_donateCC_LG.gif:NonHosted)
* PayPal https://www.paypal.me/javascriptobfuscator
* (Bitcoin) 1Nv2773RDNzodHDxuxaYkTvwBkYRHmPhnG

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
        shuffleStringArray: true,
        splitStrings: true,
        stringArrayThreshold: 1
    }
);

console.log(obfuscationResult.getObfuscatedCode());
/*
var _0x1139 = [
    '250745hAZAIu',
    'qyvdX',
    '359787rBCuAH',
    'map',
    'CAsQH',
    '2yDlJiW',
    'IzZqs',
    '3|8|4|5|0|',
    '975554pJYIxL',
    '2sejBjT',
    '258646CmEwYP',
    '23651lJjzwJ',
    'xqNJa',
    '37rnYVXp',
    'log',
    'WudlX',
    'cIfMd',
    'foo\x20',
    '2GUqEHE',
    '2|6|7|9|1',
    '238609DyHPrO',
    'split',
    '828371LpDRiJ'
];
var _0x1054 = function (_0x14a2a4, _0x5a6b22) {
    _0x14a2a4 = _0x14a2a4 - (0x1c48 + -0x1dd + 0x38f * -0x7);
    var _0x581b0b = _0x1139[_0x14a2a4];
    return _0x581b0b;
};
(function (_0x190a1e, _0x14558c) {
    var _0x59720b = _0x1054;
    while (!![]) {
        try {
            var _0x3dab81 = parseInt(_0x59720b(0x196)) * parseInt(_0x59720b(0x191)) + parseInt(_0x59720b(0x193)) * parseInt(_0x59720b(0x184)) + parseInt(_0x59720b(0x198)) * parseInt(_0x59720b(0x188)) + parseInt(_0x59720b(0x18a)) * parseInt(_0x59720b(0x18c)) + -parseInt(_0x59720b(0x187)) + -parseInt(_0x59720b(0x189)) + -parseInt(_0x59720b(0x195));
            if (_0x3dab81 === _0x14558c)
                break;
            else
                _0x190a1e['push'](_0x190a1e['shift']());
        } catch (_0x58f14d) {
            _0x190a1e['push'](_0x190a1e['shift']());
        }
    }
}(_0x1139, 0x2c5c * -0x7 + -0xdfdc6 + 0x16ff98), function () {
    var _0x9b877 = _0x1054, _0x4add6f = {
            'WudlX': _0x9b877(0x186) + _0x9b877(0x192),
            'qyvdX': function (_0x552261, _0x28d3ee) {
                return _0x552261 + _0x28d3ee;
            },
            'xqNJa': function (_0x387474, _0x5602bf) {
                return _0x387474 + _0x5602bf;
            },
            'CAsQH': _0x9b877(0x190),
            'IzZqs': function (_0x5d9fd2, _0x9f4faa) {
                return _0x5d9fd2 - _0x9f4faa;
            },
            'cIfMd': function (_0x5f18e0, _0x4c33c5) {
                return _0x5f18e0 + _0x4c33c5;
            }
        }, _0x593549 = _0x4add6f[_0x9b877(0x18e)][_0x9b877(0x194)]('|'), _0x2acb4f = -0x94b + -0x2627 * -0x1 + 0xe6e * -0x2;
    while (!![]) {
        switch (_0x593549[_0x2acb4f++]) {
        case '0':
            var _0x10d015 = _0x4add6f[_0x9b877(0x197)](_0x4add6f[_0x9b877(0x18b)](_0x4add6f[_0x9b877(0x183)], -0x3d * -0xc + -0x6f1 * -0x1 + 0x42 * -0x26), 0x62f * 0x3 + 0x1046 * -0x1 + -0x246);
            continue;
        case '1':
            console[_0x9b877(0x18d)](_0x10d015);
            continue;
        case '2':
            console[_0x9b877(0x18d)](_0x4cd6e2);
            continue;
        case '3':
            var _0x4cd6e2 = _0x4add6f[_0x9b877(0x185)]('5', -0x1bc + 0xf61 + 0x5 * -0x2ba);
            continue;
        case '4':
            var _0x2c3053 = _0x4add6f[_0x9b877(0x18b)]('5', -'2');
            continue;
        case '5':
            var _0x372d29 = [
                '10',
                '10',
                '10',
                '10',
                '10'
            ][_0x9b877(0x182)](parseInt);
            continue;
        case '6':
            console[_0x9b877(0x18d)](_0x109ffa);
            continue;
        case '7':
            console[_0x9b877(0x18d)](_0x2c3053);
            continue;
        case '8':
            var _0x109ffa = _0x4add6f[_0x9b877(0x18f)]('5', -0x1d70 + -0x1654 + -0xf1 * -0x37);
            continue;
        case '9':
            console[_0x9b877(0x18d)](_0x372d29);
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
    forceTransformStrings: [],
    identifierNamesGenerator: 'hexadecimal',
    identifiersDictionary: [],
    identifiersPrefix: '',
    ignoreRequireImports: false,
    inputFileName: '',
    log: false,
    numbersToExpressions: false,
    optionsPreset: 'default',
    renameGlobals: false,
    renameProperties: false,
    renamePropertiesMode: 'safe',
    reservedNames: [],
    reservedStrings: [],
    rotateStringArray: true,
    seed: 0,
    selfDefending: false,
    shuffleStringArray: true,
    simplify: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: 'separate',
    splitStrings: false,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayIndexesType: [
        'hexadecimal-number'
    ],
    stringArrayEncoding: [],
    stringArrayIndexShift: true,
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
    --debug-protection-interval <boolean>
    --disable-console-output <boolean>
    --domain-lock '<list>' (comma separated)
    --exclude '<list>' (comma separated)
    --force-transform-strings '<list>' (comma separated)
    --identifier-names-generator <string> [dictionary, hexadecimal, mangled, mangled-shuffled]
    --identifiers-dictionary '<list>' (comma separated)
    --identifiers-prefix <string>
    --ignore-require-imports <boolean>
    --log <boolean>
    --numbers-to-expressions <boolean>
    --options-preset <string> [default, low-obfuscation, medium-obfuscation, high-obfuscation]
    --rename-globals <boolean>
    --rename-properties <boolean>
    --rename-properties-mode <string> [safe, unsafe]
    --reserved-names '<list>' (comma separated)
    --reserved-strings '<list>' (comma separated)
    --rotate-string-array <boolean>
    --seed <string|number>
    --self-defending <boolean>
    --shuffle-string-array <boolean>
    --simplify <boolean>
    --source-map <boolean>
    --source-map-base-url <string>
    --source-map-file-name <string>
    --source-map-mode <string> [inline, separate]
    --split-strings <boolean>
    --split-strings-chunk-length <number>
    --string-array <boolean>
    --string-array-indexes-type '<list>' (comma separated) [hexadecimal-number, hexadecimal-numeric-string]
    --string-array-encoding '<list>' (comma separated) [none, base64, rc4]
    --string-array-index-shift <boolean>
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

This option makes it almost impossible to use the `debugger` function of the Developer Tools (both on WebKit-based and Mozilla Firefox).

### `debugProtectionInterval`
Type: `boolean` Default: `false`

##### :warning: Can freeze your browser! Use at own risk.

If checked, an interval is used to force the debug mode on the Console tab, making it harder to use other features of the Developer Tools. Works if [`debugProtection`](#debugprotection) is enabled.

### `disableConsoleOutput`
Type: `boolean` Default: `false`

Disables the use of `console.log`, `console.info`, `console.error`, `console.warn`, `console.debug`, `console.exception` and `console.trace` by replacing them with empty functions. This makes the use of the debugger harder.

### `domainLock`
Type: `string[]` Default: `[]`

##### :warning: This option does not work with `target: 'node'`

Allows to run the obfuscated source code only on specific domains and/or sub-domains. This makes really hard for someone to just copy and paste your source code and run it elsewhere.

##### Multiple domains and sub-domains
It's possible to lock your code to more than one domain or sub-domain. For instance, to lock it so the code only runs on **www.example.com** add `www.example.com`. To make it work on the root domain including any sub-domains (`example.com`, `sub.example.com`), use `.example.com`.

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

### `ignoreRequireImports`
Type: `boolean` Default: `false`

Prevents obfuscation of `require` imports. Could be helpful in some cases when for some reason runtime environment requires these imports with static strings only.

### `inputFileName`
Type: `string` Default: `''`

Allows to set name of the input file with source code. This name will be used internally for source map generation.

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

### `seed`
Type: `string|number` Default: `0`

This option sets seed for random generator. This is useful for creating repeatable results.

If seed is `0` - random generator will work without seed.

### `selfDefending`
Type: `boolean` Default: `false`

##### :warning: Don't change obfuscated code in any way after obfuscation with this option, because any change like uglifying of code can trigger self defending and code wont work anymore!
##### :warning: This option forcibly sets `compact` value to `true`

This option makes the output code resilient against formatting and variable renaming. If one tries to use a JavaScript beautifier on the obfuscated code, the code won't work anymore, making it harder to understand and modify it.

### `shuffleStringArray`
Type: `boolean` Default: `true`

##### :warning: [`stringArray`](#stringarray) must be enabled

Randomly shuffles the `stringArray` array items.

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
const _0x3018 = [
    'foo',
    'bar',
    'baz',
    'bark',
    'hawk',
    'eagle'
];
const _0x380f = function (_0x30182a, _0x380f29) {
    _0x30182a = _0x30182a - 0x0;
    let _0x4e002c = _0x3018[_0x30182a];
    return _0x4e002c;
};
const _0xe4db7c = _0x380f;
const _0x26ca42 = _0x380f;
const _0x58c610 = _0x380f;
const foo = _0x58c610('0x0');
const bar = _0x26ca42('0x1');
function test() {
    const _0x500eda = _0x380f;
    const _0x1d1760 = _0x380f;
    const _0x4ca8b0 = _0x380f;
    const _0x4e002c = _0x4ca8b0('0x2');
    const _0x573b1c = _0x1d1760('0x3');
    const _0x1fb6ef = _0x500eda('0x4');
}
const eagle = _0x26ca42('0x5');
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
const _0x4714 = [
    'foo',
    'bar',
    'baz',
    'bark',
    'hawk',
    'eagle'
];
const _0x2bdb = function (_0x471439, _0x2bdb71) {
    _0x471439 = _0x471439 - 0x0;
    let _0x6e47e6 = _0x4714[_0x471439];
    return _0x6e47e6;
};
const _0x1c3d52 = _0x2bdb;
const _0xd81c2a = _0x2bdb;
const foo = _0xd81c2a('0x0');
const bar = _0x1c3d52('0x1');
function test() {
    const _0x21a0b4 = _0x1c3d52;
    const _0x12842d = _0xd81c2a;
    const _0x6e47e6 = _0x12842d('0x2');
    const _0x4f3aef = _0x12842d('0x3');
    function _0x40f1dc() {
        const _0x468540 = _0x12842d;
        const _0x1f4b05 = _0x21a0b4;
        const _0x40a980 = _0x1f4b05('0x4');
        const _0x4d1285 = _0x468540('0x5');
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
* `'variable'`: appends variable wrappers. Fast performance.
* `'function'`: appends function wrappers. Slower performance than with `variable` but provides more strict obfuscation

Highly recommended to use `function` wrappers for higher obfuscation when a performance loss doesn't have a high impact on an obfuscated application.

Example of the `'function'` option value:
```ts
// input
const foo = 'foo';

function test () {
    const bar = 'bar';
}

// output
const a = [
    'foo',
    'bar'
];
const b = function (c, d) {
    c = c - 0x0;
    let e = a[c];
    return e;
};
const d = function (c, f) {
    return b(c - '0x372', f);
};
const foo = d('0x372');
function test() {
    const e = function (c, f) {
        return d(c - -'0x260', f);
    };
    const c = e('0x113');
}
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
var _0x2fae = [
    'baz',
    'test2',
    'foo',
    'test1',
    'bar'
];
var _0x377c = function (_0x1fbd3f, _0x59c72f) {
    _0x1fbd3f = _0x1fbd3f - 0x0;
    var _0x14fada = _0x2fae[_0x1fbd3f];
    return _0x14fada;
};
(function () {
    var _0x8a12db = {};
    _0x8a12db[_0x377c('0x0')] = _0x377c('0x1');
    var _0xc75419 = {};
    _0xc75419[_0x377c('0x2')] = _0x377c('0x3');
    _0xc75419[_0x377c('0x4')] = _0x8a12db;
    var _0x191393 = _0xc75419;
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
    numbersToExpressions: true,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
    stringArrayEncoding: ['rc4'],
    stringArrayIndexShift: true,
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
    numbersToExpressions: true,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
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
    numbersToExpressions: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: true,
    shuffleStringArray: true,
    simplify: true,
    splitStrings: false,
    stringArray: true,
    stringArrayEncoding: [],
    stringArrayIndexShift: true,
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
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: false,
    renameGlobals: false,
    rotateStringArray: true,
    selfDefending: false,
    shuffleStringArray: true,
    simplify: true,
    splitStrings: false,
    stringArray: true,
    stringArrayEncoding: [],
    stringArrayIndexShift: true,
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

### Error `maximum call stack size exceeded`
Likely this is `selfDefending` mechanism. Something is changing source code after obfuscation with `selfDefending` option.

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

Copyright (C) 2016-2020 [Timofey Kachalov](http://github.com/sanex3339).

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
