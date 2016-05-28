#JavaScript obfuscator for Node.js

JavaScript obfuscator for Node.js and free alternative of [js-obfuscator](https://github.com/caiguanhao/js-obfuscator) (which uses [javascriptobfuscator.com](https://javascriptobfuscator.com/Javascript-Obfuscator.aspx)) without any limits and sending data on server.
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

Compact code output in one line.

####debugProtection
Type: `boolean` Default: `false`

#####This option can cause browser freeze while Developer Tools is enabled! Use at own risk.

Force enable debug mode in some browsers (mainly based on WebKit) on page load, if Developers Tools panel is enbaled.
With this options using of Debug panel is impossible.

WebKit based browsers: blocking site window, but you still can navigate through Developers Tools panel.
Firefox: *not* blocking site window, but you still can't use Debug panel.

####debugProtectionInterval
Type: `boolean` Default: `false`

#####This option can cause browser freeze even while Developer Tools is disabled! Use at own risk.

Works if `debugProtection` is enabled.

Force enable debug mode in some browsers (mainly based on WebKit) when Developers Tools panel was enbaled, even after page was loaded.

####disableConsoleOutput
Type: `boolean` Default: `true`

Disable `console.log`, `console.info`, `console.error` and `console.warn` messages output into browser console.

####rotateUnicodeArray
Type: `boolean` Default: `true`

For more hard understanding of code, during each obfuscation all literal values are stored in array as Unicode codes sequence.
This options will rotate all values inside array on a random value during obfuscation of code, and insert inside source code helper function
which will rotate array values back to their original indexes.

This option affected only on visual code organisation, because we can easily get original array during debug process.

Not recommended for small source code, because helper function will attract attention.

####wrapUnicodeArrayCalls
Type: `boolean` Default: `false`

#####This option have huge affect on performance! Use this option only on small pieces of code (< 5000 LOC)

Instead using direct calls to `unicodeArray` items `var t = _0x43a123[0x0]`, 
when index `0x0` can be easy reverted to `0` with few js beautifiers, this option wrap all calls to special function instead.

```javascript
`var t = _0x12a634('0x0')`
```
