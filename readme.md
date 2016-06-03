#JavaScript obfuscator for Node.js

JavaScript obfuscator for Node.js and free alternative to [js-obfuscator](https://github.com/caiguanhao/js-obfuscator) (which uses [javascriptobfuscator.com](https://javascriptobfuscator.com/Javascript-Obfuscator.aspx)) without any limits and sending data on server.
Compatible with ES6.
Tested on Angular2 bundle.
https://gist.github.com/sanex3339/ffc2876123b52e6d11ce45369fd53acf

###Installation

Install the package with NPM and add it to your devDependencies:

`npm install --save-dev javascript-obfuscator`

###Usage:

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

## obfuscate(sourceCode, options)

###sourceCode
Type: `string` Default: `null`

Any valid SourceCode

###options
Type: `Object` Default: `null`

Options for JavaScript obfuscator:

```javascript
{
    rotateUnicodeArray: true
    // ...
}
```

###Available options
####compact
Type: `boolean` Default: `true`

Compact code output into one line.

####debugProtection
Type: `boolean` Default: `false`

#####This option can cause browser freeze if Developer Tools are enabled! Use it at your own risk.

Force enable debug mode in some browsers (mainly based on WebKit) on page load, if Developer Tools panel is enabled.
With this option enabled, using of Debug panel is impossible.

WebKit based browsers: blocking site window, but you still can navigate through Developers Tools panel.
Firefox: *not* blocking site window, but you still can't use Debug panel.

####debugProtectionInterval
Type: `boolean` Default: `false`

#####This option can cause browser freeze even if Developer Tools are disabled! Use it at your own risk.

Works if `debugProtection` is enabled.

Force enable debug mode in some browsers (mainly based on WebKit) when Developers Tools panel was enabled, even after page was loaded.

####disableConsoleOutput
Type: `boolean` Default: `true`

Disable `console.log`, `console.info`, `console.error` and `console.warn` messages output into browser console.

####encodeUnicodeArray
Type: `boolean` Default: `false`

#####`unicodeArray` option must be enabled

This option can slightly slowdown your code speed.

All strings in unicode array becomes encoded in Base64.
To decode strings, special function will be inserted on page under `unicodeArray` node.

####reservedNames
Type: `string[]` Default: `[]`

Disable obfuscation of given variable names, function names and names of function parameters.

####rotateUnicodeArray
Type: `boolean` Default: `true`

#####`unicodeArray` option must be enabled

This option will rotate all values inside `unicodeArray` on a random value during obfuscation of code, and insert inside source code helper function
which will rotate array values back to their original indexes.

This option affects only a visual code organisation, because we can easily get original array during debug process.

Usage is not recommended for a small source code, because helper function will attract attention.

####unicodeArray
Type: `boolean` Default: `true`

Put all literal strings into array and replace every literal string by array call.

####wrapUnicodeArrayCalls
Type: `boolean` Default: `true`

#####`unicodeArray` option must be enabled

Instead using direct calls to `unicodeArray` items `var t = _0x43a123[0x0]`, 
when index `0x0` can be easily reverted to `0` with few js beautifiers, this option will wrap all calls to special function instead.

```javascript
var t = _0x12a634('0x0')
```
