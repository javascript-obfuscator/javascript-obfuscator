# JavaScript obfuscator for Node.js

JavaScript obfuscator for Node.js is a free alternative of [js-obfuscator](https://github.com/caiguanhao/js-obfuscator) (which uses [javascriptobfuscator.com](https://javascriptobfuscator.com/Javascript-Obfuscator.aspx)) without any limits and sending data to a server.
Compatible with ES6.
Tested on Angular2 bundle.
https://gist.github.com/sanex3339/ffc2876123b52e6d11ce45369fd53acf

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
var _0x8741 = [
    '\u0061\u0062\u0063',
    '\u006c\u006f\u0067'
];
(function () {
    var _0x45e59c = _0x8741[0];
    console[_0x8741[1]](_0x45e59c);
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

<<<<<<< 41c75087f34cab1a2645295c9eef76444d463315
####encodeUnicodeLiterals
=======
#### `encodeUnicodeLiterals`
>>>>>>> readme improvements
Type: `boolean` Default: `false`

##### :warning: `unicodeArray` option must be enabled

This option can slightly slowdown your code speed.

All literals in unicode array becomes encoded in Base64.
To decode strings, special function will be inserted on page under `unicodeArray` node.

#### `reservedNames`
Type: `string[]` Default: `[]`

Disable obfuscation of given variable names, function names and names of function parameters.

#### `rotateUnicodeArray`
Type: `boolean` Default: `true`

##### :warning: `unicodeArray` option must be enabled

This option will rotate all values inside `unicodeArray` on a random value during obfuscation of code, and insert inside source code helper function
which will rotate array values back to their original indexes.

Keep in mind that this option affects only how the code is visually organised, since the original arrays can be easily accessed during the debug process.

It is also not recommended to enable `rotateUnicodeArray` for small source code, because a helper function might attract attention.

#### `unicodeArray`
Type: `boolean` Default: `true`

Put all literal strings into array and replace every literal string by array call.

#### `wrapUnicodeArrayCalls`
Type: `boolean` Default: `true`

##### :warning: `unicodeArray` option must be enabled

Instead using direct calls to `unicodeArray` items `var t = _0x43a123[0x0]`, 
when index `0x0` can be easily reverted to `0` with few js beautifiers, this option will wrap all calls to special function instead.

```javascript
var t = _0x12a634('0x0')
```
