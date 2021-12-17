<!--
  Title: JavaScript Obfuscator
  Description: A powerful obfuscator for JavaScript and Node.js.
  Author: Timofey Kachalov
  -->

# JavaScript obfuscator

![logo](https://raw.githubusercontent.com/javascript-obfuscator/javascript-obfuscator/master/images/logo.png)

JavaScript Obfuscator 是一個強大的免費 JavaScript 混淆器，包含多種功能，為你的源代碼提供保護。

**主要特點:**

- 變量重命名
- 字符串提取和加密
- 死代碼註入
- 控製流扁平化
- 各種代碼轉換
- and [more](#javascript-obfuscator-options)...

混淆代碼的例子: [github.com](https://github.com/javascript-obfuscator/javascript-obfuscator/blob/master/examples/javascript-obfuscator.js)

#### 在線版本:

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

#### 你可以通過捐贈來支持這個項目:

- (OpenCollective) https://opencollective.com/javascript-obfuscator
- PayPal credit card [https://www.paypal.com/donate](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=javascript-obfuscator@yandex.ru&lc=US&no_note=0&item_name=Support+javascript-obfuscator&cn=&curency_code=USD&bn=PP-DonationsBF:btn_donateCC_LG.gif:NonHosted)
- PayPal https://www.paypal.me/javascriptobfuscator
- (Bitcoin) bc1q203p8nyrstwm7vwzjg3h9l9t6y9ka0umw0rx96

衷心感謝所有的支持者!

#### _註意！主分支上的 README 可能與最新穩定版的 README 不一致！_

#### 如果你有問題，請先查看這一部分: [FAQ](#frequently-asked-questions)

## :warning: 重要的事

##### 只對屬於你的代碼進行混淆。

不建議混淆 vendor 的腳本和 polyfills，因為被混淆的代碼會慢 15-80%（取決於選項），而且文件會明顯增大。

## 安裝

#### 使用 Yarn 或者 NPM

用 Yarn 或 NPM 安裝軟件包，並將其添加到你的`dependencies`或`devDependencies`:

```sh
$ yarn add --dev javascript-obfuscator
```

or

```sh
$ npm install --save-dev javascript-obfuscator
```

#### 在瀏覽器中

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

返回`ObfuscationResult`對象，其中包含兩個公共方法:

- `getObfuscatedCode()` - 返回帶有混淆代碼的 `string`;
- `getSourceMap()` - 如果 [`sourceMap`](#sourcemap) 選項開啟 - 如果[sourceMapMode](#sourcemapmode)選項設置為 `inline`，則返回帶有源地圖的 `string` 或一個空字符串;
- `getIdentifierNamesCache()` - 如果 `identifierNamesCache` 選項被啟用，則返回帶有標識符名稱緩存的對象，反之則為 `null`。

對`ObfuscationResult`對象調用`toString()`將返回`string`與混淆的代碼。

方法需要兩個參數，`sourceCode`和`options` -- 分別是源代碼和選項:

- `sourceCode` (`string`, default: `null`) – 任何有效的源代碼，以字符串形式傳遞;
- `options` (`Object`, default: `null`) – 一個 Object 類型的選項.

關於可用的選項，請參見 [options](#options).

### `obfuscateMultiple(sourceCodesObject, options)`

接受 `sourceCodesObject`，它是一個映射，鍵是源代碼的標識符，值是源代碼:

```
{
    foo: 'var foo = 1;',
    bar: 'var bar = 2;'
}
```

返回一個映射對象，鍵是源代碼的標識符，值是`ObfuscationResult`對象。

### `getOptionsByPreset(optionsPreset)`

返回所傳遞的選項預設名稱的一個選項對象。

## CLI 使用方法

請看 [CLI options](#cli-options).

#### 混淆單個文件

使用方法:

```sh
javascript-obfuscator input_file_name.js [options]
javascript-obfuscator input_file_name.js --output output_file_name.js [options]
javascript-obfuscator input_file_name.js --output output_folder_name [options]
javascript-obfuscator input_folder_name --output output_folder_name [options]
```

對以`.js`為擴展名的單一輸入文件進行混淆。

如果沒有用`--output`選項指定目標路徑，被混淆的文件將被保存到輸入文件目錄，名稱為`INPUT_FILE_NAME-obfuscated.js`。

一些例子:

```sh
javascript-obfuscator samples/sample.js --compact true --self-defending false
// creates a new file samples/sample-obfuscated.js

javascript-obfuscator samples/sample.js --output output/output.js --compact true --self-defending false
// creates a new file output/output.js
```

#### 遞歸式混淆目錄

使用方法:

```sh
javascript-obfuscator ./dist [options]
// creates a new obfuscated files under `./dist` directory near the input files with `obfuscated` postfix

javascript-obfuscator ./dist --output ./dist/obfuscated [options]
// creates a folder structure with obfuscated files under `./dist/obfuscated` path
```

對輸入目錄下的所有`.js`文件進行混淆處理。如果該目錄中包含已經被混淆的文件，並帶有`-obfuscated`後綴，這些文件將被忽略。

被混淆的文件將被保存在輸入目錄下的`INPUT_FILE_NAME-obfuscated.js`名稱下。

## 有條件的註釋

你可以通過添加以下註釋來禁用和啟用代碼中特定部分的混淆功能:

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

條件性註釋只影響 AST-樹節點的直接轉換。所有的子變換仍然會被應用到 AST-樹節點上。

比如:

- 在變量的聲明中對其名稱進行模糊處理被稱為直接轉換;
- 變量的名稱在其聲明之外的模糊化被稱為子的轉變。

## 變量的種類

插入節點的變量種類將被自動檢測，基於源代碼中最普遍的變量種類。

## 不同文件之間的標識符名稱的沖突

在不同文件的混淆過程中，這些文件的全局標識符可能會產生相同的名稱。
為了防止這種情況，用[`identifiersPrefix`](#identifiersprefix)選項為每個被混淆的文件的所有全局標識符設置唯一的前綴。

當使用 CLI 時，這個前綴將被自動添加。

## JavaScript 混淆器選項

以下是 JS 混淆器的可用選項:

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

將代碼緊湊的輸出到一行上

### `config`

Type: `string` Default: ``

包含混淆器選項的 JS/JSON 配置文件的名稱。這些將被直接傳遞給 CLI 的選項所覆蓋。

### `controlFlowFlattening`

Type: `boolean` Default: `false`

##### :warning: 這個選項對性能影響很大，運行時速度會慢 1.5 倍。使用[`controlFlowFlatteningThreshold`](#controlflowflatteningthreshold)來設置受控製流扁平化影響的節點的百分比。

啟用代碼控製流扁平化。控製流扁平化是一種阻礙程序理解的源代碼的結構轉換。

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

[`controlflowFlattening`](#controlflowflattening)轉換被應用到任何給定節點的概率。

這個設置對大的代碼量特別有用，因為大量的控製流轉換會減慢你的代碼速度並增加代碼量。

`controlFlowFlatteningThreshold: 0` 等同於 `controlFlowFlattening: false`.

### `deadCodeInjection`

Type: `boolean` Default: `false`

##### :warning: 大幅增加混淆代碼的大小（高達 200%），只在混淆代碼的大小不重要時使用。使用[`deadCodeInjectionThreshold`](#deadcodeinjectionthreshold)來設置受死代碼註入影響的節點的百分比。

##### :warning: 這個選項強行啟用了 `stringArray` 選項。

有了這個選項，隨機的死代碼塊將被添加到混淆的代碼中。

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

允許設置受 `deadCodeInjection` 影響的節點的百分比。

### `debugProtection`

Type: `boolean` Default: `false`

##### :warning: 如果你打開開發者工具，可以凍結你的瀏覽器。

這個選項使得幾乎不可能使用開發工具的 `debugger` 功能（在基於 WebKit 和 Mozilla Firefox 上）。

### `debugProtectionInterval`

Type: `boolean` Default: `false`

##### :warning: 可以凍結你的瀏覽器! 使用風險自負。

如果勾選，就會在控製臺選項卡上使用一個間隔來強製調試模式，使其難以使用開發工具的其他功能。如果[`debugProtection`](#debugprotection)被啟用，則會發揮作用。

### `disableConsoleOutput`

Type: `boolean` Default: `false`

##### :warning: 該選項在全局範圍內禁用所有腳本的 `console` 調用。

禁止使用`console.log`、`console.info`、`console.error`、`console.warning`、`console.debug`、`console.exception`和`console.trace`，用空函數替換它們。這使得調試器的使用更加困難。

### `domainLock`

Type: `string[]` Default: `[]`

##### :warning: 該選項與`target: 'node'`不起作用。

允許只在特定的域和/或子域中運行被混淆的源代碼。這使得別人很難直接復製和粘貼你的源代碼並在其他地方運行它。

如果源代碼沒有在這個選項指定的域上運行，瀏覽器將被重定向到一個傳遞到[`domainLockRedirectUrl`](#domainlockredirecturl)選項的 URL。

##### 多域名和子域名

可以將你的代碼鎖定在一個以上的域或子域。例如，要鎖定它，使代碼只在**www.example.com**上運行，請添加`www.example.com`。要使它在根域包括任何子域（`example.com`，`sub.example.com`）上運行，使用`.example.com`。

### `domainLockRedirectUrl`

Type: `string` Default: `about:blank`

##### :warning: 該選項與`target: 'node'`不起作用。

如果源代碼沒有在[`domainLock`](#domainlock)指定的域中運行，允許瀏覽器被重定向到一個通過的 URL。

### `exclude`

Type: `string[]` Default: `[]`

一個文件名或 globs，表示要從混淆中排除的文件。

### `forceTransformStrings`

Type: `string[]` Default: `[]`

啟用被傳遞的正則表達式匹配的字符串字面的強製轉換。

##### :warning: 這個選項只影響那些不應該被[`stringArrayThreshold`](#stringarraythreshold)轉化的字符串（或者將來可能的其他閾值）。

該選項比 `reservedStrings` 選項有優先權，但沒有比 `conditional comments` 有優先權。

例子:

```ts
{
  forceTransformStrings: ["some-important-value", "some-string_d"];
}
```

### `identifierNamesCache`

Type: `Object | null` Default: `null`

這個選項的主要目的是能夠在混淆多個來源/文件的過程中使用相同的標識符名稱。

目前支持兩種類型的標識符:

- 全局標識符:
  - 所有全局標識符將被寫入緩存;
  - 所有匹配的**未聲明的**全局標識符將被緩存中的值替換。
- 屬性標識符，只有當 `renameProperties` 選項被啟用時:
  - 所有的屬性標識將被寫入緩存中;
  - 所有匹配的屬性標識符將被緩存中的值取代。

#### Node.js API

如果傳遞一個`null`值，則完全禁用緩存。

如果傳遞了一個空對象（`{}`），就可以將標識符名稱寫入緩存對象（`TIdentifierNamesCache`類型）。這個緩存對象將通過`ObfuscationResult`對象的`getIdentifierNamesCache`方法調用被訪問。

產生的緩存對象接下來可以作為`identifierNamesGenerator`選項值，在混淆所有匹配的下一個來源的標識符名稱時使用這些名稱。

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
        // 期待這些全局函數被定義在另一個混淆的文件中
        foo(1);
        bar();
        
        // 期待這個全局函數被定義在第三方軟件包中
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

CLI 有一個不同的選項`--identifier-names-cache-path`，允許定義現有`.json`文件的路徑，該文件將用於讀寫標識符名稱緩存。

如果一個空文件的路徑將被傳遞 -- 標識符名稱緩存將被寫入該文件。

這個有緩存的文件可以再次作為 `--identifier-names-cache-path` 選項值，在混淆所有匹配的下一個文件的標識符名稱時使用這些名稱。

### `identifierNamesGenerator`

Type: `string` Default: `hexadecimal`

設置標識符名稱生成器。

支持的值:

- `dictionary`: 標識符名稱來自[`identifiersDictionary`](#identifiersdictionary)列表
- `hexadecimal`: 識別符名稱，如 `_0xabc123`
- `mangled`: 短的標識符名稱，如 `a`, `b`, `c`
- `mangled-shuffled`: 與 `mangled`相同，但有洗牌的字母

### `identifiersDictionary`

Type: `string[]` Default: `[]`

為[`identifierNamesGenerator`](#identifiernamesgenerator)設置標識符字典：`dictionary`選項。字典中的每個標識符將被用於幾個變體，每個字符的大小寫都不同。因此，字典中的標識符的數量應該取決於原始源代碼中的標識符數量。

### `identifiersPrefix`

Type: `string` Default: `''`

設置所有全局標識符的前綴。

當你想對多個文件進行混淆處理時，請使用這個選項。這個選項有助於避免這些文件的全局標識符之間的沖突。每個文件的前綴都應該是不同的。

### `ignoreRequireImports`

Type: `boolean` Default: `false`

防止 `require` 導入的混淆。在某些情況下，由於某些原因，運行時環境要求這些導入只有靜態字符串，這可能是有幫助的。

### `inputFileName`

Type: `string` Default: `''`

允許設置帶有源代碼的輸入文件的名稱。這個名字將在內部用於生成源代碼地圖。
當使用 NodeJS API 和`sourceMapSourcesMode`選項有`sources`值時需要。

### `log`

Type: `boolean` Default: `false`

啟用將信息記錄到控製臺的功能。

### `numbersToExpressions`

Type: `boolean` Default: `false`

使得數字轉換為表達式

Example:

```ts
// input
const foo = 1234;

// output
const foo = -0xd93 + -0x10b4 + 0x41 * 0x67 + 0x84e * 0x3 + -0xff8;
```

### `optionsPreset`

Type: `string` Default: `default`

允許設置 [options preset](#preset-options).

支持的值:

- `default`;
- `low-obfuscation`;
- `medium-obfuscation`;
- `high-obfuscation`.

所有增加的選項都將與選定的選項預設合並。

### `renameGlobals`

Type: `boolean` Default: `false`

##### :warning: 這個選項會破壞你的代碼。只有在你知道它的作用時才啟用它!

啟用全局變量和函數名稱的混淆**與聲明**。

### `renameProperties`

Type: `boolean` Default: `false`

##### :warning: 這個選項 **可能會** 破壞你的代碼。只有當你知道它的作用時才啟用它!

啟用屬性名稱的重命名。所有內置的 DOM 屬性和核心 JavaScript 類中的屬性將被忽略。

要在該選項的 `safe` 和 `unsafe` 模式之間切換，請使用[`renamePropertiesMode`](#renamepropertiesmode)選項。

要設置重命名屬性名稱的格式，請使用[`identifierNamesGenerator`](#identifiernamesgenerator)選項。

要控製哪些屬性將被重命名，請使用[`reservedNames`](#reservednames)選項。

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

##### :warning: 即使在 `safe` 模式下，[`renameProperties`](#renameproperties)選項 **可能會** 破壞你的代碼。

指定 `renameProperties` 選項模式:

- `safe` - `2.11.0` 發布後的默認行為。試圖以更安全的方式重命名屬性，以防止運行時錯誤。在這種模式下，一些屬性將被排除在重命名之外。
- `unsafe` - 在`2.11.0`發布前的默認行為。以一種不安全的方式重命名屬性，沒有任何限製。

如果一個文件使用其他文件的屬性，使用[`identifierNamesCache`](#identifiernamescache)選項來保持這些文件之間相同的屬性名稱。

### `reservedNames`

Type: `string[]` Default: `[]`

禁用混淆和標識符的生成，這些標識符被傳遞的正則表達式匹配。

例子:

```ts
{
  reservedNames: ["^someVariable", "functionParameter_d"];
}
```

### `reservedStrings`

Type: `string[]` Default: `[]`

禁用被傳遞的正則表達式匹配的字符串字面的轉換。

例子:

```ts
{
  reservedStrings: ["react-native", "./src/test", "some-string_d"];
}
```

### `seed`

Type: `string|number` Default: `0`

該選項為隨機發生器設置種子。這對於創造可重復的結果很有用。

如果種子是 `0` -- 隨機發生器將在沒有種子的情況下工作。

### `selfDefending`

Type: `boolean` Default: `false`

##### :warning: 在使用該選項進行混淆後，不要以任何方式改變被混淆的代碼，因為任何像美化代碼這樣的改變都會引發自我防衛，代碼將不再起作用。

##### :warning: 該選項強行將 `compact` 值設為 `true`。

這個選項使輸出的代碼對格式化和變量重命名有抵抗力。如果有人試圖在被混淆的代碼上使用 JavaScript 美化器，那麽代碼就不會再起作用了，這使得理解和修改代碼變得更加困難。

### `simplify`

Type: `boolean` Default: `true`

通過簡化實現了額外的代碼混淆。

##### :warning: 在未來的版本中，混淆 `boolean` 字樣（`true` => `![]`）將被移到這個選項下。

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

啟用混淆代碼的源碼地圖生成。

源碼地圖可以幫助你調試你的混淆的 JavaScript 源代碼。如果你想或需要在生產中調試，你可以把單獨的源碼圖文件上傳到一個秘密的位置，然後把你的瀏覽器指向那裏。

### `sourceMapBaseUrl`

Type: `string` Default: ``

當 [`sourceMapMode:'separate'`](#sourcemapmode) 時，將基礎網址設置為源地圖導入網址。

CLI 例子:

```
javascript-obfuscator input.js --output out.js --source-map true --source-map-base-url 'http://localhost:9000'
```

結果:

```
//# sourceMappingURL=http://localhost:9000/out.js.map
```

### `sourceMapFileName`

Type: `string` Default: ``

當 `sourceMapMode:'separate'` 時，為輸出源地圖設置文件名。

CLI 例子:

```
javascript-obfuscator input.js --output out.js --source-map true --source-map-base-url 'http://localhost:9000' --source-map-file-name example
```

結果:

```
//# sourceMappingURL=http://localhost:9000/example.js.map
```

### `sourceMapMode`

Type: `string` Default: `separate`

指定源碼地圖生成模式:

- `inline` - 在每個.js 文件的末尾添加源碼地圖;
- `separate` - 生成相應的'.map'文件，其中包含源碼圖。如果你通過 CLI 運行混淆器 -- 在帶有混淆代碼的文件末尾添加源地圖文件的鏈接`//# sourceMappingUrl=file.js.map`。

### `sourceMapSourcesMode`

Type: `string` Default: `sources-content`

允許控製源碼地圖的`sources`和`sourcesContent`字段:

- `sources-content` - 添加假的 `sources` 字段，添加`sourcesContent` 字段與原始源代碼;
- `sources` - 添加 `sources` 字段的有效源描述，不添加`sourcesContent` 字段。當使用 NodeJS API 時，需要定義 `inputFileName` 選項，它將被用作 `sources` 字段值。

### `splitStrings`

Type: `boolean` Default: `false`

將字面字符串分割成長度為 [`splitStringsChunkLength`](#splitstringschunklength) 選項值的塊狀物。

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

設置 [`splitStrings`](#splitstrings) 選項的分塊長度。

### `stringArray`

Type: `boolean` Default: `true`

移除字符串字面，並將其置於一個特殊的數組中。例如， `var m = "Hello World";` 中的字符串 `"Hello World "` 將被替換為 `var m = _0x12c456[0x1];` 這樣的字符串。

### `stringArrayEncoding`

Type: `string[]` Default: `[]`

##### :warning: 必須啟用 `stringArray` 選項

這個選項會減慢你的代碼速度。

使用`base64`或`rc4`對[`stringArray`](#stringarray)的所有字符串字面進行編碼，並插入一個特殊的代碼，用於在運行時將其解碼。

每個 `stringArray` 的值都會被從傳遞的列表中隨機挑選的編碼所編碼。這使得使用多種編碼成為可能。

支持的值:

- `'none'` (`boolean`): 不對 `stringArray` 值進行編碼
- `'base64'` (`string`): 使用 `base64` 對 `stringArray` 值進行編碼。
- `'rc4'` (`string`): 使用 `rc4` 對 `stringArray` 值進行編碼。 **比`base64`慢 30-50%，但更難獲得初始值。** 建議在使用`rc4`編碼時禁用[`unicodeEscapeSequence`](#unicodeescapesequence)選項，以防止混淆後的代碼尺寸非常大。

例如，在下面的選項值中，一些 `stringArray` 值不會被編碼，而一些值將被編碼為 `base64` 和 `rc4` 編碼:

```ts
stringArrayEncoding: ["none", "base64", "rc4"];
```

### `stringArrayIndexesType`

Type: `string[]` Default: `['hexadecimal-number']`

##### :warning: `stringArray` 選項必須被啟用

允許控製字符串數組調用索引的類型。

每個 `stringArray` 的調用索引將被從傳遞的列表中隨機挑選的類型所轉換。這使得使用多種類型成為可能。

支持的值:

- `'hexadecimal-number'` (`default`): 將字符串數組的調用索引轉化為十六進製數字
- `'hexadecimal-numeric-string'`: 將字符串數組的調用索引轉化為十六進製的數字字符串

在 `2.9.0` 版本之前，`javascript-obfuscator` 將所有字符串數組的調用索引轉化為 `hexadecimal-numeric-string` 類型。這使得一些手動去混淆變得稍微困難，但它允許自動去混淆器輕松檢測這些調用。

新的 `hexadecimal-number` 類型方法使代碼中的字符串數組調用模式更難自動檢測。

今後將增加更多的類型。

### `stringArrayIndexShift`

Type: `boolean` Default: `true`

##### :warning: `stringArray` 選項必須被啟用

啟用所有字符串陣列調用的額外索引移位

### `stringArrayRotate`

Type: `boolean` Default: `true`

##### :warning: [`stringArray`](#stringarray) 必須被啟用

將 `stringArray` 數組移動一個固定的、隨機的（在代碼混淆時產生的）位置。這使得被移除的字符串的順序更難匹配到它們原來的位置。

### `stringArrayShuffle`

Type: `boolean` Default: `true`

##### :warning: [`stringArray`](#stringarray) 必須被啟用

隨機洗刷 `stringArray` 數組中的項目。

### `stringArrayWrappersCount`

Type: `number` Default: `1`

##### :warning: [`stringArray`](#stringarray) 選項必須被啟用

設置每個根或函數作用域內的 `string array` 的包裝器的數量。
每個作用域內的包裝器的實際數量由該作用域內的 `literal` 節點的數量限製。

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

##### :warning: [`stringArray`](#stringarray) 和 [`stringArrayWrappersCount`](#stringarraywrapperscount) 選項必須被啟用

啟用 `string array` 包裝器之間的鏈式調用。

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

##### :warning: [`stringArray`](#stringarray) 選項必須被啟用

##### :warning: 目前這個選項只影響由 [`stringArrayWrappersType`](#stringarraywrapperstype) `function` 選項值添加的包裝器。

允許控製字符串數組包裝器參數的最大數量。
默認值和最小值是`2`。建議值在`2`和`5`之間。

### `stringArrayWrappersType`

Type: `string` Default: `variable`

##### :warning: [`stringArray`](#stringarray) 和 [`stringArrayWrappersCount`](#stringarraywrapperscount) 選項必須被啟用

允許選擇通過 `stringArrayWrappersCount` 選項追加的包裝器的類型。

支持的值:

- `'variable'`: 在每個作用域的頂部追加變量包裝器。快速的性能。
- `'function'`: 在每個範圍內的隨機位置添加函數包裝器。性能比 `variable` 慢，但提供了更嚴格的混淆。

當性能損失對被混淆的應用程序影響不大時，強烈建議使用 `function` 包裝器來實現更高的混淆。

`'function'` 選項值的例子:

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

##### :warning: [`stringArray`](#stringarray) 選項必須被啟用

你可以使用這個設置來調整一個字符串字頭被插入到 `stringArray` 的概率（從 0 到 1）。

這個設置對大的代碼量特別有用，因為它反復調用 `string array` ，會使你的代碼變慢。

`stringArrayThreshold: 0` 等同於 `stringArray: false`.

### `target`

Type: `string` Default: `browser`

允許為混淆的代碼設置目標環境。

可用的值:

- `browser`;
- `browser-no-eval`;
- `node`.

目前 `browser` 和 `node` 目標的輸出代碼是相同的，但一些瀏覽器特有的選項不允許在 `node` 目標下使用。
`browser-no-eval` 目標的輸出代碼沒有辦法使用 `eval`。

### `transformObjectKeys`

Type: `boolean` Default: `false`

啟用對象鍵的轉換。

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

允許啟用/禁用字符串轉換為 unicode 轉義序列。

Unicode 轉義序列大大增加了代碼的大小，而且字符串很容易被恢復到原來的視圖。建議只對小的源代碼啟用這個選項。

## 預設方案

### 高混淆性，低性能

性能將比沒有混淆的情況下慢 50-100%

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

性能將比沒有混淆的情況下慢 30-35%

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

性能將比沒有混淆的情況下略微慢一些

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

### 默認預設，高性能

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

## 常見問題

### 支持什麽版本的 javascript?

`es3`, `es5`, `es2015`, `es2016`, `es2017`, `es2018`, `es2019` 和部分 `es2020`

### 我想使用 `README.md` 中描述的功能，但它不工作！為什麽？

主分支上的 README 可能與最新的穩定版不一致。

### 為什麽 CLI 命令不工作?

嘗試運行`npm link javascript-obfuscator`命令或用`npm i -g javascript-obfuscator`全局安裝它

### 在線版本?

[obfuscator.io](https://obfuscator.io)

### JSX 支持?

不，沒有計劃支持 JSX

### 如何改變插入節點的變量種類（ `var`，`let`或`const` ）？

請看: [`Kind of variables`](#kind-of-variables)

### 為什麽我得到的是 `null` 值而不是 `BigInt` 數字？

`BigInt` 混淆只在支持 `BigInt` 值的環境中正確工作。見[ESTree spec](https://github.com/estree/estree/blob/master/es2020.md#bigintliteral)

### 我啟用了 `renameProperties` 選項，但我的代碼被破壞了! 該怎麽做？

試試 `renamePropertiesMode: 'safe'` 選項，如果還是不行，就禁用這個選項。

## 支持者

通過每月捐款支持我們，幫助我們繼續開展活動。 [[Become a backer](https://opencollective.com/javascript-obfuscator#backer)]

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

## 贊助商

成為贊助商，您的商標將出現在我們在 Github 上的 README 上，並帶有您網站的鏈接。 [[Become a sponsor](https://opencollective.com/javascript-obfuscator#sponsor)]

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
