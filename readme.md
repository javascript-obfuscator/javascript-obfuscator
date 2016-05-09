#JavaScript obfuscator for Node.js

JavaScript obfuscator for Node.js and free alternative of [js-obfuscator](https://github.com/caiguanhao/js-obfuscator) without any limits.
Compatible with ES6.
Tested on Angular2 bundle.

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
    rotateUnicodeArray: false
}
```

###Available options
####rotateUnicodeArray
Type: `boolean` Default: `true`

For more hard understanding of code, during each obfuscation all literal values are stored in array as Unicode codes sequence.
This options will rotate all values inside array on a random value during obfuscation of code, and insert inside source code helper function
which will rotate array values back to their original indexes.

This option affected only on visual code organisation, because we can easily get original array during debug process.

Not recommended for small source code, because helper function will attract attention.