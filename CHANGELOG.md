Change Log
===

v0.7.3
---
* CLI missing polyfill fix [#17](https://github.com/sanex3339/javascript-obfuscator/issues/17)

v0.7.2
---
* runtime error fix [#7](https://github.com/sanex3339/webpack-obfuscator/issues/7)

* shorthand object expression fix [#16](https://github.com/sanex3339/javascript-obfuscator/issues/16)

v0.7.1
---
* IE error fix [#14](https://github.com/sanex3339/javascript-obfuscator/issues/14)

v0.7.0-dev.3
---
* Obfuscator now returns an empty string instead of obfuscated code if source code is empty

v0.7.0-dev.2
---
* Fix of incorrect `Utils.decToHex` method

v0.7.0-dev.1
---
* **Breaking API change:** now `obfuscate(sourceCode, options)` returns `ObfuscationResult` object instead `string`. `ObfuscationResult` object contains two public methods: `getObfuscatedCode()` and `getSourceMap()`.
* CLI. Now any code can be obfuscated through CLI `javascript-obfuscator` command. See `README.md` for available options. 
* New option `sourceMap` enables source map generation for obfuscated code.
* New option `sourceMapMode` specifies source map generation mode.