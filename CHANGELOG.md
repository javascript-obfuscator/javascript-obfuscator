Change Log

v0.27.4
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/590

v0.27.3
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/593

v0.27.2
---
* Fixed identifiers prefix generation for `obfuscateMultiple` method

v0.27.1
---
* Dependencies update, fixed https://www.npmjs.com/advisories/1488

v0.27.0
---
* **Feature:** new method `obfuscateMultiple` to obfuscation of multiple source codes

v0.26.0
---
* **Internal:** new code transformers mechanism
* Supported obfuscation of files with hashbang operator, https://github.com/javascript-obfuscator/javascript-obfuscator/issues/471

v0.25.5
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/575

v0.25.4
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/569

v0.25.3
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/568

v0.25.2
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/563

v0.25.1
---
* Additional fixes of https://github.com/javascript-obfuscator/javascript-obfuscator/issues/550

v0.25.0
---
* Improved `mangled` identifier names generator logic
* Improved `selfDefending` helper logic
* Fixed a bunch of conflicts between generated identifier names. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/550. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/549
* Prevented transformation of object keys in sequence expression that has `super` call
* Support of output directory paths with a dot symbol
* Changed `--output` logic. Now `--output` value can describe if it's a file or a directory path. Check README.md for more info

v0.24.6
---
* Fixed support of exponentiation operator. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/534
* Added file path to the error message during directory obfuscation. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/513

v0.24.5
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/542

v0.24.4
---
* Fixed rc4 encoded value collision: https://github.com/javascript-obfuscator/javascript-obfuscator/issues/538

v0.24.3
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/535

v0.24.2
---
* Reverted validation errors under `node` target for `sourceMap*` options

v0.24.1
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/531

v0.24.0
---
* **Internal refactoring:** completely new mechanism to rename variable names
* Dynamic import and `import.meta` support. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/505
* Now usage of some browser-related options with `target: 'node'` will cause a validation error
* Increased `identifierNamesGenerator: 'mangled` speed
* **CLI:** a file path will be displayed on obfuscation error. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/513
* Fixed many `transformObjectKeys` runtime errors
* Fixed `Maximum call stack size exceeded` error on large strings when `splitString` option is enabled
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/516
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/512
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/496
* **Internal:** switched from `awesome-typescript-loader` on `ts-loader`

v0.23.2
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/475
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/326

v0.23.1
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/498

v0.23.0
---
* **New option:** `shuffleStringArray` randomly shuffles string array items
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/494
* **Internal change:** switched AST parser from `espree` on `acorn`
* **Internal refactoring:** refactoring of string array storage and related things

v0.22.1
---
* Fixed `TypeError: Assignment to constant variable` when auto-detection of kind of variables is inserted `const` variables for `controlFlowStorage` nodes

v0.22.0
---
* **Breaking:** auto-detection of kind of variables of inserted nodes, based on most prevailing kind of variables of source code
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/486

v0.21.1
---
* Fixed conditional comments in some rare cases


v0.21.0
---
* Improved `transformObjectKeys` transformation to cover more cases
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/406
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/387
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/333
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/328

v0.20.4
---
* Fixed typings. Now string values correctly assignable to enum-like options

v0.20.3
---
* Fixed `for-await-of` statement: https://github.com/javascript-obfuscator/javascript-obfuscator/issues/419

v0.20.2
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/pull/442
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/468
* Added funding button
* Internal dependencies update, Happy New Year 2020!

v0.20.1
---
* Fixed identifier names generations for `mangled` and `dictionary` identifier names generators
* Fixed combination of `identifierNamesGenerator: dictionary` and `debugProtection` options
* `seed` option now accepts `string` and `number` values

v0.20.0
---
* **Breaking:** dropped support of Node 8 because of end of maintenance support
* **New option value:** `identifierNamesGenerator` now allows to set new `dictionary` identifier names generator
* **New option:** `identifiersDictionary` sets identifiers dictionary for `identifierNamesGenerator: dictionary` option

Thanks to our contributors!
 * [adiantek](https://github.com/adiantek)

v0.19.4
---
* Fixed `reservedNames` option

Thanks to our contributors!
 * [kida7](https://github.com/kida7)
 
v0.19.3
---
* The `splitStrings` option now correctly works with `transformObjectKeys` option
* Internal `TransformersRunner` rework to support topological sort of node transformers

v0.19.2
---
* The `splitStrings` option now correctly splits strings inside objects

v0.19.1
---
* The `splitStrings` option now affects template literal strings

v0.19.0
---
* **New option:** `splitStrings` splits literal strings into chunks with length of `splitStringsChunkLength` option value
* **New option:** `splitStringsChunkLength` sets chunk length of `splitStrings` option

v0.18.8
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/452

v0.18.7
---
* Fixed https://github.com/javascript-obfuscator/gulp-javascript-obfuscator/issues/22 

v0.18.6
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/355 

Thanks to our contributors!
 * [Zamotkin](https://github.com/zamotkin)

v0.18.5
---
* Breaking: require Node.js 8 after dependencies update
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/321

Thanks to our contributors!
 * [Zamotkin](https://github.com/zamotkin)

v0.18.4
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/437

Thanks to our contributors!
 * [Zamotkin](https://github.com/zamotkin)

v0.18.3
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/424

Thanks to our contributors!
 * [Zamotkin](https://github.com/zamotkin)

v0.18.2
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/320
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/319

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