# JavaScript obfuscator for Node.js

JavaScript obfuscator for Node.js is a free alternative to [js-obfuscator](https://github.com/caiguanhao/js-obfuscator) (which uses [javascriptobfuscator.com](https://javascriptobfuscator.com/Javascript-Obfuscator.aspx))

* without any limits and sending data to a server;
* compatible with ES6;
* tested on Angular2 bundle;

https://gist.github.com/sanex3339/ffc2876123b52e6d11ce45369fd53acf

## Installation

Install the package from NPM and add it to your `devDependencies`:

```sh
$ npm install --save-dev javascript-obfuscator
```

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

Any valid source code.

#### `options`
Type: `Object` Default: `null`

Options for the JavaScript obfuscator:

```javascript
{
    rotateUnicodeArray: true
    // ...
}
```

### Available options
#### `compact`
Type: `boolean` Default: `true`

Compact code output one one line.

#### `debugProtection`
Type: `boolean` Default: `false`

##### :warning: Can freeze browser while Developer Tools are enabled! Use at own risk.

Force enable debug mode on page load if Developer Tools panel is enabled (in some, mainly WebKit-based, browsers). This makes it almost impossible to use the Console (the debug panel).

* WebKit-based: blocks the site window, but you still can navigate through Developer Tools panel.
* Firefox: does *not* block the site window, but still won't let you use DevTools.

#### `debugProtectionInterval`
Type: `boolean` Default: `false`

##### :warning: Can freeze browser even while Developer Tools are disabled! Use at own risk.

Works if `debugProtection` is enabled.

Force enable debug mode in some browsers (mainly WebKit-based) when Developer Tools panel is enabled, even after page is loaded.

#### `disableConsoleOutput`
Type: `boolean` Default: `true`

Disable `console.log`, `console.info`, `console.error` and `console.warn` messages output into the browser console.

#### `encodeUnicodeLiterals`
Type: `boolean` Default: `false`

##### :warning: `unicodeArray` option must be enabled

This option can slightly slow down your code speed.

All literals in Unicode array become encoded in Base64.
To decode strings, a special function will be inserted on the page under `unicodeArray` node.

#### `reservedNames`
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

#### `rotateUnicodeArray`
Type: `boolean` Default: `true`

##### :warning: `unicodeArray` must be enabled

Shift the `unicodeArray` values by a random number of places during the code obfuscation and insert a helper function for shifting the array back into the source code. (It works just like the Caesar cypher.)

Keep in mind that this option affects only how the code is visually organised, since the original arrays can be easily accessed during the debug process.

It is also not recommended to enable `rotateUnicodeArray` for small source code because a helper function might attract attention.

#### `unicodeArray`
Type: `boolean` Default: `true`

Put all literal strings into an array and replace every literal string by an array call.

#### `unicodeArrayThreshold`
Type: `number` Default: `0.8` Min: `0` Max: `1`

##### :warning: `unicodeArray` option must be enabled

The probability that the literal string will be inserted into `unicodeArray`.
Use this option for huge source code size, because many calls to `unicodeArray` will slow down code performance.

`unicodeArrayThreshold: 0` equals to `unicodeArray: false`.

#### `wrapUnicodeArrayCalls`
Type: `boolean` Default: `true`

##### :warning: `unicodeArray` option must be enabled

Instead of using direct calls to `unicodeArray` items `var t = _0x43a123[0x0]`, when index `0x0` can be easily reverted to `0` with few js beautifiers, this option will wrap all calls to special function instead.

```javascript
var t = _0x12a634('0x0')
```
