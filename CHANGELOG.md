Change Log
===
v0.9.0-beta.1
---
* **New option:** `controlFlowFlattening` allows to enable/disable **Control Flow flattening**. Control flow flattening is a structure transformation of the source code that hinders program comprehension.
* **New option:** `controlFlowFlatteningThreshold` allows to set percentage of nodes that will affected by `controlFlowFlattening`.
* Better `es2015` support: correct obfuscation of `TemplateLiteral`, `ArrayPattern`, `AssignmentPattern` nodes.
* Obfuscation performance boost.
* Huge internal refactoring.
* Various bug fixes.

v0.8.6
---
* additional fixes for https://github.com/javascript-obfuscator/javascript-obfuscator/issues/29

v0.8.5
---
* fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/29

v0.8.4
---
* fixed https://github.com/javascript-obfuscator/webpack-obfuscator/issues/13

v0.8.3
---
* `selfDefending` option now disabled by default.

v0.8.2
---
* New option `seed` sets seed for random generator. This is useful for creating repeatable results.
* IE8 runtime error fix.

v0.8.1
---
* `disableConsoleOutput` option now replaces `console.xxx` functions on empty function instead of infinity loop.

v0.8.0
---
* **Breaking options change:** `unicodeArray` option has been renamed to `stringArray`.
* **Breaking options change:** `unicodeArrayThreshold` option has been renamed to `stringArrayThreshold`.
* **Breaking options change:** `encodeUnicodeArray` option has been renamed to `stringArrayEncoding` and now accepts following values: `true|false|'base64'|'rc4'`.
* **Breaking change:** option `wrapUnicodeArrayCalls` was removed and now all calls to `stringArray` are always wrapped by special wrapper function.
* New option `unicodeEscapeSequence` allows to enable/disable strings conversion to unicode escape sequence.
* New option `domainLock` locks the obfuscated source code so it only runs on specific domains and/or sub-domains.
* New option `sourceMapBaseUrl` sets base url to the source map import url when `sourceMapMode: 'separate'`.
* Custom nodes like `selfDefendingNode` or `consoleOutputNode` now inserted into deepest stack trace function call.
* Fixed obfuscation of global variables and function names in some cases.
* Fixed wrong obfuscation of labels.
* Rewrite of many custom nodes.

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