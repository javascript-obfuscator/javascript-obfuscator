<!--
  Title: JavaScript Obfuscator
  Description: A powerful obfuscator for JavaScript and Node.js.
  Author: Timofey Kachalov
  -->

# JavaScript obfuscator

![logo](https://raw.githubusercontent.com/javascript-obfuscator/javascript-obfuscator/master/images/logo.png)

JavaScript Obfuscator 是一个强大的免费 JavaScript 混淆器，包含多种功能，为你的源代码提供保护。

**主要特点:**

- 变量重命名
- 字符串提取和加密
- 死代码注入
- 控制流扁平化
- 各种代码转换
- and [more](#javascript-obfuscator-options)...

混淆代码的例子: [github.com](https://github.com/javascript-obfuscator/javascript-obfuscator/blob/master/examples/javascript-obfuscator.js)

#### 在线版本:

[obfuscator.io](https://obfuscator.io)

#### 插件:

- Webpack plugin: [webpack-obfuscator](https://github.com/javascript-obfuscator/webpack-obfuscator)
- Webpack loader: [obfuscator-loader](https://github.com/javascript-obfuscator/obfuscator-loader)
- Gulp: [gulp-javascript-obfuscator](https://github.com/javascript-obfuscator/gulp-javascript-obfuscator)
- Grunt: [grunt-contrib-obfuscator](https://github.com/javascript-obfuscator/grunt-contrib-obfuscator)
- Rollup: [rollup-plugin-javascript-obfuscator](https://github.com/javascript-obfuscator/rollup-plugin-javascript-obfuscator)
- Weex: [weex-devtool](https://www.npmjs.com/package/weex-devtool)
- Malta: [malta-js-obfuscator](https://github.com/fedeghe/malta-js-obfuscator)
- Netlify plugin: [netlify-plugin-js-obfuscator](https://www.npmjs.com/package/netlify-plugin-js-obfuscator)

[![npm version](https://badge.fury.io/js/javascript-obfuscator.svg)](https://badge.fury.io/js/javascript-obfuscator)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjavascript-obfuscator%2Fjavascript-obfuscator.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjavascript-obfuscator%2Fjavascript-obfuscator?ref=badge_shield)
![Build Status](https://github.com/javascript-obfuscator/javascript-obfuscator/workflows/JavaScript%20Obfuscator%20CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/javascript-obfuscator/javascript-obfuscator/badge.svg)](https://coveralls.io/github/javascript-obfuscator/javascript-obfuscator)
[![Backers on Open Collective](https://opencollective.com/javascript-obfuscator/backers/badge.svg)](#backers)
[![Sponsors on Open Collective](https://opencollective.com/javascript-obfuscator/sponsors/badge.svg)](#sponsors)
[![xscode](https://img.shields.io/badge/Available%20on-xs%3Acode-blue?style=?style=plastic&logo=appveyor&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////////VXz1bAAAAAJ0Uk5T/wDltzBKAAAAlUlEQVR42uzXSwqAMAwE0Mn9L+3Ggtgkk35QwcnSJo9S+yGwM9DCooCbgn4YrJ4CIPUcQF7/XSBbx2TEz4sAZ2q1RAECBAiYBlCtvwN+KiYAlG7UDGj59MViT9hOwEqAhYCtAsUZvL6I6W8c2wcbd+LIWSCHSTeSAAECngN4xxIDSK9f4B9t377Wd7H5Nt7/Xz8eAgwAvesLRjYYPuUAAAAASUVORK5CYII=)](https://xscode.com/sanex3339/javascript-obfuscator)

#### 你可以通过捐赠来支持这个项目:

- (OpenCollective) https://opencollective.com/javascript-obfuscator
- PayPal credit card [https://www.paypal.com/donate](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=javascript-obfuscator@yandex.ru&lc=US&no_note=0&item_name=Support+javascript-obfuscator&cn=&curency_code=USD&bn=PP-DonationsBF:btn_donateCC_LG.gif:NonHosted)
- PayPal https://www.paypal.me/javascriptobfuscator
- (Bitcoin) bc1q203p8nyrstwm7vwzjg3h9l9t6y9ka0umw0rx96

衷心感谢所有的支持者!

#### _注意！主分支上的 README 可能与最新稳定版的 README 不一致！_

#### 如果你有问题，请先查看这一部分: [FAQ](#frequently-asked-questions)

## :warning: 重要的事

##### 只对属于你的代码进行混淆。

不建议混淆 vendor 的脚本和 polyfills，因为被混淆的代码会慢 15-80%（取决于选项），而且文件会明显增大。

## 安装

#### 使用 Yarn 或者 NPM

用 Yarn 或 NPM 安装软件包，并将其添加到你的`dependencies`或`devDependencies`:

```sh
$ yarn add --dev javascript-obfuscator
```

or

```sh
$ npm install --save-dev javascript-obfuscator
```

#### 在浏览器中

使用 CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/javascript-obfuscator/dist/index.browser.js"></script>
```

使用 `node_modules`:

```html
<script src="./node_modules/javascript-obfuscator/dist/index.browser.js"></script>
```

## 使用方法

```javascript
var JavaScriptObfuscator = require("javascript-obfuscator");

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
    stringArrayThreshold: 1,
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

返回`ObfuscationResult`对象，其中包含两个公共方法:

- `getObfuscatedCode()` - 返回带有混淆代码的 `string`;
- `getSourceMap()` - 如果 [`sourceMap`](#sourcemap) 选项开启 - 如果[sourceMapMode](#sourcemapmode)选项设置为 `inline`，则返回带有源地图的 `string` 或一个空字符串;
- `getIdentifierNamesCache()` - 如果 `identifierNamesCache` 选项被启用，则返回带有标识符名称缓存的对象，反之则为 `null`。

对`ObfuscationResult`对象调用`toString()`将返回`string`与混淆的代码。

方法需要两个参数，`sourceCode`和`options` -- 分别是源代码和选项:

- `sourceCode` (`string`, default: `null`) – 任何有效的源代码，以字符串形式传递;
- `options` (`Object`, default: `null`) – 一个 Object 类型的选项.

关于可用的选项，请参见 [options](#options).

### `obfuscateMultiple(sourceCodesObject, options)`

接受 `sourceCodesObject`，它是一个映射，键是源代码的标识符，值是源代码:

```
{
    foo: 'var foo = 1;',
    bar: 'var bar = 2;'
}
```

返回一个映射对象，键是源代码的标识符，值是`ObfuscationResult`对象。

### `getOptionsByPreset(optionsPreset)`

返回所传递的选项预设名称的一个选项对象。

## CLI 使用方法

请看 [CLI options](#cli-options).

#### 混淆单个文件

使用方法:

```sh
javascript-obfuscator input_file_name.js [options]
javascript-obfuscator input_file_name.js --output output_file_name.js [options]
javascript-obfuscator input_file_name.js --output output_folder_name [options]
javascript-obfuscator input_folder_name --output output_folder_name [options]
```

对以`.js`为扩展名的单一输入文件进行混淆。

如果没有用`--output`选项指定目标路径，被混淆的文件将被保存到输入文件目录，名称为`INPUT_FILE_NAME-obfuscated.js`。

一些例子:

```sh
javascript-obfuscator samples/sample.js --compact true --self-defending false
// creates a new file samples/sample-obfuscated.js

javascript-obfuscator samples/sample.js --output output/output.js --compact true --self-defending false
// creates a new file output/output.js
```

#### 递归式混淆目录

使用方法:

```sh
javascript-obfuscator ./dist [options]
// creates a new obfuscated files under `./dist` directory near the input files with `obfuscated` postfix

javascript-obfuscator ./dist --output ./dist/obfuscated [options]
// creates a folder structure with obfuscated files under `./dist/obfuscated` path
```

对输入目录下的所有`.js`文件进行混淆处理。如果该目录中包含已经被混淆的文件，并带有`-obfuscated`后缀，这些文件将被忽略。

被混淆的文件将被保存在输入目录下的`INPUT_FILE_NAME-obfuscated.js`名称下。

## 有条件的注释

你可以通过添加以下注释来禁用和启用代码中特定部分的混淆功能:

- disable: `// javascript-obfuscator:disable` or `/* javascript-obfuscator:disable */`;
- enable: `// javascript-obfuscator:enable` or `/* javascript-obfuscator:enable */`.

例子:

```javascript
// input
var foo = 1;
// javascript-obfuscator:disable
var bar = 2;

// output
var _0xabc123 = 0x1;
var bar = 2;
```

条件性注释只影响 AST-树节点的直接转换。所有的子变换仍然会被应用到 AST-树节点上。

比如:

- 在变量的声明中对其名称进行模糊处理被称为直接转换;
- 变量的名称在其声明之外的模糊化被称为子的转变。

## 变量的种类

插入节点的变量种类将被自动检测，基于源代码中最普遍的变量种类。

## 不同文件之间的标识符名称的冲突

在不同文件的混淆过程中，这些文件的全局标识符可能会产生相同的名称。
为了防止这种情况，用[`identifiersPrefix`](#identifiersprefix)选项为每个被混淆的文件的所有全局标识符设置唯一的前缀。

当使用 CLI 时，这个前缀将被自动添加。

## JavaScript 混淆器选项

以下是 JS 混淆器的可用选项:

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
    domainLockRedirectUrl: 'about:blank',
    forceTransformStrings: [],
    identifierNamesCache: null,
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
    stringArrayIndexesType: [
        'hexadecimal-number'
    ],
    stringArrayEncoding: [],
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
    --debug-protection-interval <boolean>
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
    --string-array-indexes-type '<list>' (comma separated) [hexadecimal-number, hexadecimal-numeric-string]
    --string-array-encoding '<list>' (comma separated) [none, base64, rc4]
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

将代码紧凑的输出到一行上

### `config`

Type: `string` Default: ``

包含混淆器选项的 JS/JSON 配置文件的名称。这些将被直接传递给 CLI 的选项所覆盖。

### `controlFlowFlattening`

Type: `boolean` Default: `false`

##### :warning: 这个选项对性能影响很大，运行时速度会慢 1.5 倍。使用[`controlFlowFlatteningThreshold`](#controlflowflatteningthreshold)来设置受控制流扁平化影响的节点的百分比。

启用代码控制流扁平化。控制流扁平化是一种阻碍程序理解的源代码的结构转换。

Example:

```ts
// input
(function () {
  function foo() {
    return function () {
      var sum = 1 + 2;
      console.log(1);
      console.log(2);
      console.log(3);
      console.log(4);
      console.log(5);
      console.log(6);
    };
  }

  foo()();
})();

// output
(function () {
  function _0x3bfc5c() {
    return function () {
      var _0x3260a5 = {
        WtABe: "4|0|6|5|3|2|1",
        GokKo: function _0xf87260(_0x427a8e, _0x43354c) {
          return _0x427a8e + _0x43354c;
        },
      };
      var _0x1ad4d6 = _0x3260a5["WtABe"]["split"]("|"),
        _0x1a7b12 = 0x0;
      while (!![]) {
        switch (_0x1ad4d6[_0x1a7b12++]) {
          case "0":
            console["log"](0x1);
            continue;
          case "1":
            console["log"](0x6);
            continue;
          case "2":
            console["log"](0x5);
            continue;
          case "3":
            console["log"](0x4);
            continue;
          case "4":
            var _0x1f2f2f = _0x3260a5["GokKo"](0x1, 0x2);
            continue;
          case "5":
            console["log"](0x3);
            continue;
          case "6":
            console["log"](0x2);
            continue;
        }
        break;
      }
    };
  }

  _0x3bfc5c()();
})();
```

### `controlFlowFlatteningThreshold`

Type: `number` Default: `0.75` Min: `0` Max: `1`

[`controlflowFlattening`](#controlflowflattening)转换被应用到任何给定节点的概率。

这个设置对大的代码量特别有用，因为大量的控制流转换会减慢你的代码速度并增加代码量。

`controlFlowFlatteningThreshold: 0` 等同于 `controlFlowFlattening: false`.

### `deadCodeInjection`

Type: `boolean` Default: `false`

##### :warning: 大幅增加混淆代码的大小（高达 200%），只在混淆代码的大小不重要时使用。使用[`deadCodeInjectionThreshold`](#deadcodeinjectionthreshold)来设置受死代码注入影响的节点的百分比。

##### :warning: 这个选项强行启用了 `stringArray` 选项。

有了这个选项，随机的死代码块将被添加到混淆的代码中。

Example:

```ts
// input
(function () {
  if (true) {
    var foo = function () {
      console.log("abc");
    };
    var bar = function () {
      console.log("def");
    };
    var baz = function () {
      console.log("ghi");
    };
    var bark = function () {
      console.log("jkl");
    };
    var hawk = function () {
      console.log("mno");
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
  "YBCtz",
  "GlrkA",
  "urPbb",
  "abc",
  "NMIhC",
  "yZgAj",
  "zrAId",
  "EtyJA",
  "log",
  "mno",
  "jkl",
  "def",
  "Quzya",
  "IWbBa",
  "ghi",
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
})();
```

### `deadCodeInjectionThreshold`

Type: `number` Default: `0.4` Min: `0` Max: `1`

允许设置受 `deadCodeInjection` 影响的节点的百分比。

### `debugProtection`

Type: `boolean` Default: `false`

##### :warning: 如果你打开开发者工具，可以冻结你的浏览器。

这个选项使得几乎不可能使用开发工具的 `debugger` 功能（在基于 WebKit 和 Mozilla Firefox 上）。

### `debugProtectionInterval`

Type: `boolean` Default: `false`

##### :warning: 可以冻结你的浏览器! 使用风险自负。

如果勾选，就会在控制台选项卡上使用一个间隔来强制调试模式，使其难以使用开发工具的其他功能。如果[`debugProtection`](#debugprotection)被启用，则会发挥作用。

### `disableConsoleOutput`

Type: `boolean` Default: `false`

##### :warning: 该选项在全局范围内禁用所有脚本的 `console` 调用。

禁止使用`console.log`、`console.info`、`console.error`、`console.warning`、`console.debug`、`console.exception`和`console.trace`，用空函数替换它们。这使得调试器的使用更加困难。

### `domainLock`

Type: `string[]` Default: `[]`

##### :warning: 该选项与`target: 'node'`不起作用。

允许只在特定的域和/或子域中运行被混淆的源代码。这使得别人很难直接复制和粘贴你的源代码并在其他地方运行它。

如果源代码没有在这个选项指定的域上运行，浏览器将被重定向到一个传递到[`domainLockRedirectUrl`](#domainlockredirecturl)选项的 URL。

##### 多域名和子域名

可以将你的代码锁定在一个以上的域或子域。例如，要锁定它，使代码只在**www.example.com**上运行，请添加`www.example.com`。要使它在根域包括任何子域（`example.com`，`sub.example.com`）上运行，使用`.example.com`。

### `domainLockRedirectUrl`

Type: `string` Default: `about:blank`

##### :warning: 该选项与`target: 'node'`不起作用。

如果源代码没有在[`domainLock`](#domainlock)指定的域中运行，允许浏览器被重定向到一个通过的 URL。

### `exclude`

Type: `string[]` Default: `[]`

一个文件名或 globs，表示要从混淆中排除的文件。

### `forceTransformStrings`

Type: `string[]` Default: `[]`

启用被传递的正则表达式匹配的字符串字面的强制转换。

##### :warning: 这个选项只影响那些不应该被[`stringArrayThreshold`](#stringarraythreshold)转化的字符串（或者将来可能的其他阈值）。

该选项比 `reservedStrings` 选项有优先权，但没有比 `conditional comments` 有优先权。

例子:

```ts
{
  forceTransformStrings: ["some-important-value", "some-string_d"];
}
```

### `identifierNamesCache`

Type: `Object | null` Default: `null`

这个选项的主要目的是能够在混淆多个来源/文件的过程中使用相同的标识符名称。

目前支持两种类型的标识符:

- 全局标识符:
  - 所有全局标识符将被写入缓存;
  - 所有匹配的**未声明的**全局标识符将被缓存中的值替换。
- 属性标识符，只有当 `renameProperties` 选项被启用时:
  - 所有的属性标识将被写入缓存中;
  - 所有匹配的属性标识符将被缓存中的值取代。

#### Node.js API

如果传递一个`null`值，则完全禁用缓存。

如果传递了一个空对象（`{}`），就可以将标识符名称写入缓存对象（`TIdentifierNamesCache`类型）。这个缓存对象将通过`ObfuscationResult`对象的`getIdentifierNamesCache`方法调用被访问。

产生的缓存对象接下来可以作为`identifierNamesGenerator`选项值，在混淆所有匹配的下一个来源的标识符名称时使用这些名称。

例子:

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
    renameGlobals: true,
  }
);

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
        // 期待这些全局函数被定义在另一个混淆的文件中
        foo(1);
        bar();
        
        // 期待这个全局函数被定义在第三方软件包中
        baz();
    `,
  {
    compact: false,
    identifierNamesCache: source1ObfuscationResult.getIdentifierNamesCache(),
    renameGlobals: true,
  }
);

console.log(source2ObfuscationResult.getObfuscatedCode());
/*
    _0x5de86d(0x1);
    _0x2a943b();
    baz();
 */
```

#### CLI

CLI 有一个不同的选项`--identifier-names-cache-path`，允许定义现有`.json`文件的路径，该文件将用于读写标识符名称缓存。

如果一个空文件的路径将被传递 -- 标识符名称缓存将被写入该文件。

这个有缓存的文件可以再次作为 `--identifier-names-cache-path` 选项值，在混淆所有匹配的下一个文件的标识符名称时使用这些名称。

### `identifierNamesGenerator`

Type: `string` Default: `hexadecimal`

设置标识符名称生成器。

支持的值:

- `dictionary`: 标识符名称来自[`identifiersDictionary`](#identifiersdictionary)列表
- `hexadecimal`: 识别符名称，如 `_0xabc123`
- `mangled`: 短的标识符名称，如 `a`, `b`, `c`
- `mangled-shuffled`: 与 `mangled`相同，但有洗牌的字母

### `identifiersDictionary`

Type: `string[]` Default: `[]`

为[`identifierNamesGenerator`](#identifiernamesgenerator)设置标识符字典：`dictionary`选项。字典中的每个标识符将被用于几个变体，每个字符的大小写都不同。因此，字典中的标识符的数量应该取决于原始源代码中的标识符数量。

### `identifiersPrefix`

Type: `string` Default: `''`

设置所有全局标识符的前缀。

当你想对多个文件进行混淆处理时，请使用这个选项。这个选项有助于避免这些文件的全局标识符之间的冲突。每个文件的前缀都应该是不同的。

### `ignoreRequireImports`

Type: `boolean` Default: `false`

防止 `require` 导入的混淆。在某些情况下，由于某些原因，运行时环境要求这些导入只有静态字符串，这可能是有帮助的。

### `inputFileName`

Type: `string` Default: `''`

允许设置带有源代码的输入文件的名称。这个名字将在内部用于生成源代码地图。
当使用 NodeJS API 和`sourceMapSourcesMode`选项有`sources`值时需要。

### `log`

Type: `boolean` Default: `false`

启用将信息记录到控制台的功能。

### `numbersToExpressions`

Type: `boolean` Default: `false`

使得数字转换为表达式

Example:

```ts
// input
const foo = 1234;

// output
const foo = -0xd93 + -0x10b4 + 0x41 * 0x67 + 0x84e * 0x3 + -0xff8;
```

### `optionsPreset`

Type: `string` Default: `default`

允许设置 [options preset](#preset-options).

支持的值:

- `default`;
- `low-obfuscation`;
- `medium-obfuscation`;
- `high-obfuscation`.

所有增加的选项都将与选定的选项预设合并。

### `renameGlobals`

Type: `boolean` Default: `false`

##### :warning: 这个选项会破坏你的代码。只有在你知道它的作用时才启用它!

启用全局变量和函数名称的混淆**与声明**。

### `renameProperties`

Type: `boolean` Default: `false`

##### :warning: 这个选项 **可能会** 破坏你的代码。只有当你知道它的作用时才启用它!

启用属性名称的重命名。所有内置的 DOM 属性和核心 JavaScript 类中的属性将被忽略。

要在该选项的 `safe` 和 `unsafe` 模式之间切换，请使用[`renamePropertiesMode`](#renamepropertiesmode)选项。

要设置重命名属性名称的格式，请使用[`identifierNamesGenerator`](#identifiernamesgenerator)选项。

要控制哪些属性将被重命名，请使用[`reservedNames`](#reservednames)选项。

Example:

```ts
// input
(function () {
  const foo = {
    prop1: 1,
    prop2: 2,
    calc: function () {
      return this.prop1 + this.prop2;
    },
  };

  console.log(foo.calc());
})();

// output
(function () {
  const _0x46529b = {
    _0x10cec7: 0x1,
    _0xc1c0ca: 0x2,
    _0x4b961d: function () {
      return this["_0x10cec7"] + this["_0xc1c0ca"];
    },
  };
  console["log"](_0x46529b["_0x4b961d"]());
})();
```

### `renamePropertiesMode`

Type: `string` Default: `safe`

##### :warning: 即使在 `safe` 模式下，[`renameProperties`](#renameproperties)选项 **可能会** 破坏你的代码。

指定 `renameProperties` 选项模式:

- `safe` - `2.11.0` 发布后的默认行为。试图以更安全的方式重命名属性，以防止运行时错误。在这种模式下，一些属性将被排除在重命名之外。
- `unsafe` - 在`2.11.0`发布前的默认行为。以一种不安全的方式重命名属性，没有任何限制。

如果一个文件使用其他文件的属性，使用[`identifierNamesCache`](#identifiernamescache)选项来保持这些文件之间相同的属性名称。

### `reservedNames`

Type: `string[]` Default: `[]`

禁用混淆和标识符的生成，这些标识符被传递的正则表达式匹配。

例子:

```ts
{
  reservedNames: ["^someVariable", "functionParameter_d"];
}
```

### `reservedStrings`

Type: `string[]` Default: `[]`

禁用被传递的正则表达式匹配的字符串字面的转换。

例子:

```ts
{
  reservedStrings: ["react-native", "./src/test", "some-string_d"];
}
```

### `seed`

Type: `string|number` Default: `0`

该选项为随机发生器设置种子。这对于创造可重复的结果很有用。

如果种子是 `0` -- 随机发生器将在没有种子的情况下工作。

### `selfDefending`

Type: `boolean` Default: `false`

##### :warning: 在使用该选项进行混淆后，不要以任何方式改变被混淆的代码，因为任何像美化代码这样的改变都会引发自我防卫，代码将不再起作用。

##### :warning: 该选项强行将 `compact` 值设为 `true`。

这个选项使输出的代码对格式化和变量重命名有抵抗力。如果有人试图在被混淆的代码上使用 JavaScript 美化器，那么代码就不会再起作用了，这使得理解和修改代码变得更加困难。

### `simplify`

Type: `boolean` Default: `true`

通过简化实现了额外的代码混淆。

##### :warning: 在未来的版本中，混淆 `boolean` 字样（`true` => `![]`）将被移到这个选项下。

例子:

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
  const foo = 0x1,
    bar = 0x2;
  return console["log"](foo), bar;
} else
  return condition2
    ? (console["log"](0x1), console["log"](0x2), console["log"](0x3), 0x4)
    : 0x5;
```

### `sourceMap`

Type: `boolean` Default: `false`

启用混淆代码的源码地图生成。

源码地图可以帮助你调试你的混淆的 JavaScript 源代码。如果你想或需要在生产中调试，你可以把单独的源码图文件上传到一个秘密的位置，然后把你的浏览器指向那里。

### `sourceMapBaseUrl`

Type: `string` Default: ``

当 [`sourceMapMode:'separate'`](#sourcemapmode) 时，将基础网址设置为源地图导入网址。

CLI 例子:

```
javascript-obfuscator input.js --output out.js --source-map true --source-map-base-url 'http://localhost:9000'
```

结果:

```
//# sourceMappingURL=http://localhost:9000/out.js.map
```

### `sourceMapFileName`

Type: `string` Default: ``

当 `sourceMapMode:'separate'` 时，为输出源地图设置文件名。

CLI 例子:

```
javascript-obfuscator input.js --output out.js --source-map true --source-map-base-url 'http://localhost:9000' --source-map-file-name example
```

结果:

```
//# sourceMappingURL=http://localhost:9000/example.js.map
```

### `sourceMapMode`

Type: `string` Default: `separate`

指定源码地图生成模式:

- `inline` - 在每个.js 文件的末尾添加源码地图;
- `separate` - 生成相应的'.map'文件，其中包含源码图。如果你通过 CLI 运行混淆器 -- 在带有混淆代码的文件末尾添加源地图文件的链接`//# sourceMappingUrl=file.js.map`。

### `sourceMapSourcesMode`

Type: `string` Default: `sources-content`

允许控制源码地图的`sources`和`sourcesContent`字段:

- `sources-content` - 添加假的 `sources` 字段，添加`sourcesContent` 字段与原始源代码;
- `sources` - 添加 `sources` 字段的有效源描述，不添加`sourcesContent` 字段。当使用 NodeJS API 时，需要定义 `inputFileName` 选项，它将被用作 `sources` 字段值。

### `splitStrings`

Type: `boolean` Default: `false`

将字面字符串分割成长度为 [`splitStringsChunkLength`](#splitstringschunklength) 选项值的块状物。

Example:

```ts
// input
(function () {
  var test = "abcdefg";
})();

// output
(function () {
  var _0x5a21 = "ab" + "cd" + "ef" + "g";
})();
```

### `splitStringsChunkLength`

Type: `number` Default: `10`

设置 [`splitStrings`](#splitstrings) 选项的分块长度。

### `stringArray`

Type: `boolean` Default: `true`

移除字符串字面，并将其置于一个特殊的数组中。例如， `var m = "Hello World";` 中的字符串 `"Hello World "` 将被替换为 `var m = _0x12c456[0x1];` 这样的字符串。

### `stringArrayEncoding`

Type: `string[]` Default: `[]`

##### :warning: 必须启用 `stringArray` 选项

这个选项会减慢你的代码速度。

使用`base64`或`rc4`对[`stringArray`](#stringarray)的所有字符串字面进行编码，并插入一个特殊的代码，用于在运行时将其解码。

每个 `stringArray` 的值都会被从传递的列表中随机挑选的编码所编码。这使得使用多种编码成为可能。

支持的值:

- `'none'` (`boolean`): 不对 `stringArray` 值进行编码
- `'base64'` (`string`): 使用 `base64` 对 `stringArray` 值进行编码。
- `'rc4'` (`string`): 使用 `rc4` 对 `stringArray` 值进行编码。 **比`base64`慢 30-50%，但更难获得初始值。** 建议在使用`rc4`编码时禁用[`unicodeEscapeSequence`](#unicodeescapesequence)选项，以防止混淆后的代码尺寸非常大。

例如，在下面的选项值中，一些 `stringArray` 值不会被编码，而一些值将被编码为 `base64` 和 `rc4` 编码:

```ts
stringArrayEncoding: ["none", "base64", "rc4"];
```

### `stringArrayIndexesType`

Type: `string[]` Default: `['hexadecimal-number']`

##### :warning: `stringArray` 选项必须被启用

允许控制字符串数组调用索引的类型。

每个 `stringArray` 的调用索引将被从传递的列表中随机挑选的类型所转换。这使得使用多种类型成为可能。

支持的值:

- `'hexadecimal-number'` (`default`): 将字符串数组的调用索引转化为十六进制数字
- `'hexadecimal-numeric-string'`: 将字符串数组的调用索引转化为十六进制的数字字符串

在 `2.9.0` 版本之前，`javascript-obfuscator` 将所有字符串数组的调用索引转化为 `hexadecimal-numeric-string` 类型。这使得一些手动去混淆变得稍微困难，但它允许自动去混淆器轻松检测这些调用。

新的 `hexadecimal-number` 类型方法使代码中的字符串数组调用模式更难自动检测。

今后将增加更多的类型。

### `stringArrayIndexShift`

Type: `boolean` Default: `true`

##### :warning: `stringArray` 选项必须被启用

启用所有字符串阵列调用的额外索引移位

### `stringArrayRotate`

Type: `boolean` Default: `true`

##### :warning: [`stringArray`](#stringarray) 必须被启用

将 `stringArray` 数组移动一个固定的、随机的（在代码混淆时产生的）位置。这使得被移除的字符串的顺序更难匹配到它们原来的位置。

### `stringArrayShuffle`

Type: `boolean` Default: `true`

##### :warning: [`stringArray`](#stringarray) 必须被启用

随机洗刷 `stringArray` 数组中的项目。

### `stringArrayWrappersCount`

Type: `number` Default: `1`

##### :warning: [`stringArray`](#stringarray) 选项必须被启用

设置每个根或函数作用域内的 `string array` 的包装器的数量。
每个作用域内的包装器的实际数量由该作用域内的 `literal` 节点的数量限制。

例子:

```ts
// Input
const foo = "foo";
const bar = "bar";

function test() {
  const baz = "baz";
  const bark = "bark";
  const hawk = "hawk";
}

const eagle = "eagle";

// Output, stringArrayWrappersCount: 5
const _0x3f6c = ["bark", "bar", "foo", "eagle", "hawk", "baz"];
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

##### :warning: [`stringArray`](#stringarray) 和 [`stringArrayWrappersCount`](#stringarraywrapperscount) 选项必须被启用

启用 `string array` 包装器之间的链式调用。

例子:

```ts
// Input
const foo = "foo";
const bar = "bar";

function test() {
  const baz = "baz";
  const bark = "bark";

  function test1() {
    const hawk = "hawk";
    const eagle = "eagle";
  }
}

// Output, stringArrayWrappersCount: 5, stringArrayWrappersChainedCalls: true
const _0x40c2 = ["bar", "bark", "hawk", "eagle", "foo", "baz"];
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

##### :warning: [`stringArray`](#stringarray) 选项必须被启用

##### :warning: 目前这个选项只影响由 [`stringArrayWrappersType`](#stringarraywrapperstype) `function` 选项值添加的包装器。

允许控制字符串数组包装器参数的最大数量。
默认值和最小值是`2`。建议值在`2`和`5`之间。

### `stringArrayWrappersType`

Type: `string` Default: `variable`

##### :warning: [`stringArray`](#stringarray) 和 [`stringArrayWrappersCount`](#stringarraywrapperscount) 选项必须被启用

允许选择通过 `stringArrayWrappersCount` 选项追加的包装器的类型。

支持的值:

- `'variable'`: 在每个作用域的顶部追加变量包装器。快速的性能。
- `'function'`: 在每个范围内的随机位置添加函数包装器。性能比 `variable` 慢，但提供了更严格的混淆。

当性能损失对被混淆的应用程序影响不大时，强烈建议使用 `function` 包装器来实现更高的混淆。

`'function'` 选项值的例子:

```ts
// input
const foo = "foo";

function test() {
  const bar = "bar";
  console.log(foo, bar);
}

test();

// output
const a = ["log", "bar", "foo"];
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
  function e(c, g) {
    return b(c - 0x396, g);
  }
  console[f(0x51b, 0x51d)](foo, c);
  function f(c, g) {
    return b(c - 0x396, g);
  }
}
function d(c, g) {
  return b(g - 0x3e1, c);
}
test();
```

### `stringArrayThreshold`

Type: `number` Default: `0.8` Min: `0` Max: `1`

##### :warning: [`stringArray`](#stringarray) 选项必须被启用

你可以使用这个设置来调整一个字符串字头被插入到 `stringArray` 的概率（从 0 到 1）。

这个设置对大的代码量特别有用，因为它反复调用 `string array` ，会使你的代码变慢。

`stringArrayThreshold: 0` 等同于 `stringArray: false`.

### `target`

Type: `string` Default: `browser`

允许为混淆的代码设置目标环境。

可用的值:

- `browser`;
- `browser-no-eval`;
- `node`.

目前 `browser` 和 `node` 目标的输出代码是相同的，但一些浏览器特有的选项不允许在 `node` 目标下使用。
`browser-no-eval` 目标的输出代码没有办法使用 `eval`。

### `transformObjectKeys`

Type: `boolean` Default: `false`

启用对象键的转换。

Example:

```ts
// input
(function () {
  var object = {
    foo: "test1",
    bar: {
      baz: "test2",
    },
  };
})();

// output
var _0x4735 = ["foo", "baz", "bar", "test1", "test2"];
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
})();
```

### `unicodeEscapeSequence`

Type: `boolean` Default: `false`

允许启用/禁用字符串转换为 unicode 转义序列。

Unicode 转义序列大大增加了代码的大小，而且字符串很容易被恢复到原来的视图。建议只对小的源代码启用这个选项。

## 预设方案

### 高混淆性，低性能

性能将比没有混淆的情况下慢 50-100%

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
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 5,
    stringArray: true,
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

### 中等程度的混淆，最佳性能

性能将比没有混淆的情况下慢 30-35%

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
    selfDefending: true,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
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

### 低混淆性，高性能

性能将比没有混淆的情况下略微慢一些

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
    selfDefending: true,
    simplify: true,
    splitStrings: false,
    stringArray: true,
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

### 默认预设，高性能

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
    selfDefending: false,
    simplify: true,
    splitStrings: false,
    stringArray: true,
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

## 常见问题

### 支持什么版本的 javascript?

`es3`, `es5`, `es2015`, `es2016`, `es2017`, `es2018`, `es2019` 和部分 `es2020`

### 我想使用 `README.md` 中描述的功能，但它不工作！为什么？

主分支上的 README 可能与最新的稳定版不一致。

### 为什么 CLI 命令不工作?

尝试运行`npm link javascript-obfuscator`命令或用`npm i -g javascript-obfuscator`全局安装它

### 在线版本?

[obfuscator.io](https://obfuscator.io)

### JSX 支持?

不，没有计划支持 JSX

### 如何改变插入节点的变量种类（ `var`，`let`或`const` ）？

请看: [`Kind of variables`](#kind-of-variables)

### 为什么我得到的是 `null` 值而不是 `BigInt` 数字？

`BigInt` 混淆只在支持 `BigInt` 值的环境中正确工作。见[ESTree spec](https://github.com/estree/estree/blob/master/es2020.md#bigintliteral)

### 我启用了 `renameProperties` 选项，但我的代码被破坏了! 该怎么做？

试试 `renamePropertiesMode: 'safe'` 选项，如果还是不行，就禁用这个选项。

## 支持者

通过每月捐款支持我们，帮助我们继续开展活动。 [[Become a backer](https://opencollective.com/javascript-obfuscator#backer)]

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

## 赞助商

成为赞助商，您的商标将出现在我们在 Github 上的 README 上，并带有您网站的链接。 [[Become a sponsor](https://opencollective.com/javascript-obfuscator#sponsor)]

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

Copyright (C) 2016-2021 [Timofey Kachalov](http://github.com/sanex3339).

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

- Redistributions of source code must retain the above copyright
  notice, this list of conditions and the following disclaimer.
- Redistributions in binary form must reproduce the above copyright
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
