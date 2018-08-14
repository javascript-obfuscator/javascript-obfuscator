Change Log
===
v0.18.1
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/317

v0.18.0
---
* **New option:** `reservedStrings` disables transformation of string literals, which being matched by passed RegExp patterns
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/313
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/309
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/307

v0.17.3
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/303
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/302

v0.17.2
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/297

v0.17.1
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/293
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/289
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/288

v0.17.0
---
* **Browser version**: Added browser version dist
* **New Node API option:** `inputFileName` allows to set name of the input file with source code. This name will used internally, for example, for source map generation.
* [#274](https://github.com/javascript-obfuscator/javascript-obfuscator/pull/274)`domainLock` now will work in SVG.
  <br/>
  Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/273
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/271
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/264
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/260
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/252
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/247

v0.16.0
---
* Correct obfuscation of object rest and spread properties
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/243

v0.15.0
---
* **Internal change:** switched AST parser from `esprima` on `espree`
* **Breaking change:** dropped `node@4` and `node@5` support.
* **Breaking change:** renamed `extension` value of `target` option on `browser-no-eval`.
* **Breaking change:** disabled generation of identifiers, which being matched by `reservedName` option. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/216
* **New CLI option:** `exclude` allows to exclude specific files or directories from obfuscation.
* Correct obfuscation of `import` and `export` declarations.
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/231
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/217
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/210
* Internal: refactoring of many things.

v0.14.3
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/195
* Added code preview to `esprima` error messages.

v0.14.2
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/181

v0.14.1
---
* Temporary fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/181
    
v0.14.0
---
* **New option:** `identifiersPrefix` sets prefix for all global identifiers.
* **New option:** `transformObjectKeys` enables object keys transformation and obfuscation.
* **New feature:** `eval` expressions obfuscation.
* **Breaking change:** Now CLI obfuscating directory recursively. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/157
* Fixed runtime errors when `deadCodeInjection` is enabled and `identifierNamesGenerator` is set to `mangled`.
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/171
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/166
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/156
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/159

v0.13.0
---
* **Breaking change:** `mangle` option was removed.
* **New option:** `identifierNamesGenerator` allows to set identifier names generator (`hexadecimal` or `mangled`).
* **Breaking change:** all CLI options were renamed to `kebab-case` format (`--disableConsoleOutout` -> `--disable-console-output`).
* Implemented custom `mangle` option algorithm without `esmangle`; fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/110
* Comments with `@license` and `@preserve` words won't be removed from obfuscated code.
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/147
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/149

v0.12.5
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/139

v0.12.4
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/136

v0.12.3
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/129
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/125 (dead code injection and await expression)
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/123

v0.12.2
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/121
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/119

v0.12.1
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/117

v0.12.0
---
* **New option:** `target` allows to set target environment for obfuscated code.
* Added ability to disable and enable obfuscation for specific parts of the code by adding conditional comments. 
* Added obfuscation of `es2015` class names.
* CLI: added directory obfuscation.

v0.11.2
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/98

v0.11.1
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/94

v0.11.0
---
* **New option:** `log` enables logging of the information to the console.
* **New option:** `renameGlobals` allows to enable obfuscation of global variable and function names with declaration.

v0.10.2
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/78

v0.10.1
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/76

v0.10.0
---
* **New option:** `deadCodeInjection`. With this option random blocks of dead code will add to the obfuscated code.
* **New option:** `deadCodeInjectionThreshold` allows to set percentage of nodes that will affected by `deadCodeInjection`.
* **New option:** `mangle` enables mangling of variable names.
* **New CLI option:** `--config` allows to set config file with obfuscator options.
* **Breaking change:** `disableConsoleOutput` option now disabled by default.
* **Breaking change:** `escapeUnicodeSequence` option now disabled by default.
* `controlFlowFlattening` now affects string literal nodes.
* Increased runtime performance with `rc4` `stringArrayEncoding`.
* Added support for async functions
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/71
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/65
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/60
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/59
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/54
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/57
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/58
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/58

v0.9.3
---
* Switched from `escodegen` to `escodegen-wallaby`, fixed https://github.com/javascript-obfuscator/javascript-obfuscator/pull/50

v0.9.2
---
* Removed coverage dir from npm package

v0.9.1
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/37

v0.9.0
---
* **Breaking change:** dropped `node@0.10` and `node@0.12` support.
* **New option:** `controlFlowFlattening` allows to enable/disable **Control Flow flattening**. Control flow flattening is a structure transformation of the source code that hinders program comprehension.
* **New option:** `controlFlowFlatteningThreshold` allows to set percentage of nodes that will affected by `controlFlowFlattening`.
* Significantly increased obfuscation performance.
* Huge internal refactoring.
* Better `es2015` support: correct obfuscation of `TemplateLiteral`, `ArrayPattern`, `AssignmentPattern` nodes.
* Switched from `npm` to `yarn` internally.
* Various bug fixes.

v0.9.0-beta.5
---
* Increased performance
* Fixed very rare `Cannot read property 'type' of undefined` error, when `RandomGeneratorUtils.getMathRandom()` returned incorrect value `1`.

v0.9.0-beta.4
---
* Increased performance

v0.9.0-beta.3
---
* **Breaking change:** dropped `node@0.10` and `node@0.12` support.
* Switched from `npm` to `yarn` internally.

v0.9.0-beta.2
---
* Transformers refactoring

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
* Additional fixes for https://github.com/javascript-obfuscator/javascript-obfuscator/issues/29

v0.8.5
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/29

v0.8.4
---
* Fixed https://github.com/javascript-obfuscator/webpack-obfuscator/issues/13

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
* Runtime error fix [#7](https://github.com/sanex3339/webpack-obfuscator/issues/7)

* Shorthand object expression fix [#16](https://github.com/sanex3339/javascript-obfuscator/issues/16)

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