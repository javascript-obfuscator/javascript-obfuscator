Change Log

v4.0.0
---
* **Breaking change:** `debugProtectionInterval` option now accepts value in milliseconds instead of `boolean` value. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1031

v3.2.7
---
* Fixed cases when dead code is added to the inner code of `eval` expressions. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1053

v3.2.6
---
* Improved integration between `renameProperties` and `controlFlowFlattening` options. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1053

v3.2.5
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1056

v3.2.4
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1052

v3.2.3
---
* Fixed missing transformation of string array calls in some cases
* Fixed generation of reserved identifier names like `Map` or `Set` for `mangled` and `mangled-shuffled` identifier names generators

v3.2.2
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1039

v3.2.1
---
* Updated copyright

v3.2.0
---
* **New options**: `stringArrayCallsTransform` and `stringArrayCallsTransformThreshold`
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/pull/1046

v3.1.0
---
* Added support of `es2022` features: class static block

v3.0.1
---
* Dependencies update
* Fixed performance for Apple M1 chip

v3.0.0
---
* **Breaking change:** `ignoreRequireImports` option renamed to `ignoreImports`
* **Breaking change:** `rotateStringArray` option renamed to `stringArrayRotate`
* **Breaking change:** `shuffleStringArray` option renamed to `stringArrayShuffle`
* `ignoreImports` now ignores `dynamic` imports in addition to `require` imports

v2.19.1
---
* Updated `@javascript-obfuscator/escodegen` with fixed parenthesis of `default export` IIFE

v2.19.0
---
* Fixed very rare cases when `rotateStringArray` couldn't rotate array properly
* Improved `selfDefending` option
* Installed `npm` package now has `types` directory and doesn't have `src` directory
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/959

v2.18.1
---
* Updated `@javascript-obfuscator/escodegen` with fixed generation of private property names

v2.18.0
---
* Added support of `es2022` features: private identifiers and class properties
* Dropped support for `node@15`
* Increased minimum supported `node` versions: `^12.22.0 || ^14.17.0 || >=16.0.0`

v2.17.0
---
* **New option**: `sourceMapSourcesMode` allows to control `sources` and `sourcesContent` fields of the source map
* `inputFileName` option now required when using NodeJS API and `sourceMapSourcesMode` option has `sources` value`
* Fixed some cases with wrong source map file name generation when `sourceMapFileName` option is set

v2.16.0
---
* `stringArrayWrappersType: 'function'` now generates different indexes between each wrapper inside the same lexical scope
* `stringArrayWrappersType: 'function'` now generates different parameters order between each wrapper inside the same lexical scope
* `stringArrayWrappersType: 'function'` now appends `FunctionDeclaration` functions instead of `FunctionExpression` functions. This allows to append these wrappers at random positions inside each scope
* `renameProperties` option now won't generate duplicated property names in some cases

v2.15.6
---
* To increase performance and prevent possible runtime errors `transformObjectKeys` option now completely ignores objects with `CallExpression` or `NewExpression` nodes. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/948

v2.15.5
---
* Improved `stringArray` calls wrapper decode code

v2.15.4
---
* Improved `stringArray` calls wrapper code

v2.15.3
---
* Slightly improved integration between `deadCodeInjection` and `stringArrayWrappersChainedCalls` options

v2.15.2
---
* Fixed invalid behaviour of `transformObjectKeys` option when object values contains `this` references. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/937

v2.15.1
---
* **Hotfix**: `domainDest` => `domainLockRedirectUrl` option rename

v2.15.0
---
* Added `domainDest` option that option allows the browser to be redirected to a passed domain if the source code isn't run on the domains or URL specified by `domainLock`. Thank you https://github.com/erikdubbelboer!
* `ObfuscationResult` object now contains `getOptions` method to get options that were used during obfuscation

v2.14.0
---
* Added `identifierNamesCache` option for reading and writing identifier names cache. See `README.md`.
* **CLI**:  Added `--identifier-names-cache-path` option for reading and writing identifier names cache. See `README.md`.

v2.13.0
---
* Fixed invalid code generation for start/middle rest arguments when `controlFlowFlattenig` option is enabled. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/920
* **Internal**: Added support of `node@16` and dropped support of `node@10`. This should not affect obfuscated code

v2.12.0
---
* `stringArray` calls wrappers now inserted as `FunctionDeclaration` nodes at random indexes

v2.11.1
---
* **CLI**: now it's possible to specify the path to the input file after specifying the obfuscator options. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/904 

v2.11.0
---
* Added option `renamePropertiesMode` to switch between new `safe` and old `unsafe` modes of `renameProperties` option. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/878
* `renameProperties` option now works in `safe` way by default

v2.10.7
---
* Fixed CVE-2019-18413. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/880

v2.10.6
---
* Added support of `top-level await`. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/884

v2.10.5
---
* Fixed invalid code generation for rest arguments when `controlFlowFlattening` option is enabled. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/887

v2.10.4
---
* Fixed invalid behaviour of `numbersToExpressions` option for float numbers. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/882

v2.10.3
---
* Fixed `simplify` option regression after `2.10.2`. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/864

v2.10.2
---
* Fixed behavior of `simplify` options when a node with a single-statement `body` is inside simplified `IfStatement` node. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/860

v2.10.1
---
* Removed padding characters from all base64 encoded strings. Removed RegExp that trims padding characters from `base64` encoded strings from `atob` code helper to prevent mutation of `RegExp.$1` value during calls to the `stringArray`. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/829

v2.10.0
---
* Improved `rotateStringArray` option

v2.9.6
---
* Preventing move of `"use strict";` directive during obfuscation

v2.9.5
---
* Fixed runtime errors in large obfuscated code when both `rc4` and `base64` encodings are enabled
* Some internal refactoring related to node append events

v2.9.4
---
* Fixed missing prefix of root identifiers added by `stringArrayWrappersCount` option when `identifiersPrefix` option is set

v2.9.3
---
* **CLI**: Fixed wrong name of obfuscated files when input directory path is the `.` symbol. https://github.com/javascript-obfuscator/javascript-obfuscator/issues/816

v2.9.2
---
* Ignore object expressions as body of arrow function expression when `transformObjectKeys` option is enabled. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/813

v2.9.1
---
* Fixed wrong `stringArrayWrappersParametersMaxCount` CLI option name

v2.9.0
---
* New option: `stringArrayIndexesType` accepts an array of types of string array call indexes
* Changed default type of all string array call indexes from `hexadecimal-numeric-string` to `hexadecimal-number`
* New option: `stringArrayIndexShift` enables additional index shift for all string array calls
* New option: ``stringArrayWrappersParametersMaxCount`` allows to control the maximum number of string array wrappers parameters
* `stringArrayWrappersType: 'function'` option value moved from `high-obfuscation` to `medium-obfuscation` options preset

v2.8.1
---
* Fixed incorrect rename of the identifiers of the added helpers in some rare cases. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/804

v2.8.0
---
* New option `ignoreRequireImports` prevents obfuscation of `require` imports. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/801

v2.7.1
---
* Updated `@javascript-obfuscator/escodegen` to `2.1.1`

v2.7.0
---
* Switched form `escodegen` to `@javascript-obfuscator/escodegen`
* Full support of `nullish-coalescing`. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/604
* Support for `exported` field of `ExportAllDeclaration` node. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/710

v2.6.4
---
* Added ignoring of all object members previous to `SpreadElement` when `transformObjectKeys` option is enabled. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/797

v2.6.3
---
* Added `ExportSpecifierTransformer`. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/791

v2.6.2
---
* Fixed installation in `PowerShell`. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/783
* Tested under `Node.js@15`

v2.6.1
---
* Fixed missing rename of object pattern properties in some cases. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/781

v2.6.0
---
* Migration to `webpack@5`
* Optimized performance of `ExpressionStatementsMergeTransformer` when `simplify` option is enabled. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/777
* Fixed broken `identifierNamesGenerator: 'mangled-shuffled'` after `2.2.0`. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/778

v2.5.0
---
* Improved hierarchy of generated directories when `--output` is a directory path
* Fixed wrong path generation for obfuscated files for `win32` environment. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/576
* Fixed wrong path generation under for source map for `win32` environment. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/760
* `javascript-obfuscator` now can be built under `win32` environment

v2.4.3
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/769

v2.4.2
---
* Fixed `URI-malformed` when `splitStrings` and `stringArrayEncoding` options are enabled. https://github.com/javascript-obfuscator/javascript-obfuscator/issues/530

v2.4.1
---
* Small release with some README.md improvements that allow to use it on [obfuscator.io](https://obfuscator.io)

v2.4.0
---
* **New option:** `forceTransformStrings` allows force transform strings even if by `stringArrayThreshold` (or possible other thresholds in the future) they shouldn't be transformed. Implemented https://github.com/javascript-obfuscator/javascript-obfuscator/issues/657

v2.3.1
---
* Fixed a rare bug with `identifierNamesGenerator: 'mangled'` option that causes wrong identifier names generation

v2.3.0
---
* **New option:** `stringArrayWrappersType` allows to select a type of the wrappers that are appending by the `stringArrayWrappersCount` option
* Add force convert of unicode control characters to the unicode escape sequence. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/747

v2.2.1
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/745

v2.2.0
---
* **New option (enabled by default):** `stringArrayWrappersCount` sets the count of wrappers for the `string array` inside each root or function scope
* **New option (enabled by default):** `stringArrayWrappersChainedCalls` enables the chained calls between `string array` wrappers

v2.1.0
---
* **New API:** `getOptionsByPreset` allows to get options for the passed options preset name 

v2.0.0
---
* **Breaking change:** `stringArrayEncoding` option now accepts an array of encodings. Each string will be randomly encoded with passed encoding

v1.12.1
---
* Fixed regression bug with combination of `splitStrings` and `renameProperties` option. https://github.com/javascript-obfuscator/javascript-obfuscator/issues/729

v1.12.0
---
* **New option:** `optionsPreset` allows to set options preset

v1.11.0
---
* Improved rename of `deadCodeInjection` dead code identifiers. Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/708
* **Reverted** `TaggedTemplateLiteral` obfuscation. https://github.com/javascript-obfuscator/javascript-obfuscator/issues/716

v1.10.2
---
* Fixed obfuscation of literals of `ExportNamedDeclaration` and `ExportAllDeclaration` nodes

v1.10.1
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/707

v1.10.0
---
* **Feature:** Optional chaining support!
* Added `TaggedTemplateLiteral` obfuscation. https://github.com/javascript-obfuscator/javascript-obfuscator/issues/696
* Improved `disableConsoleOutput` template. https://github.com/javascript-obfuscator/javascript-obfuscator/issues/691

v1.9.0
---
* Improved obfuscation of destructured variables. https://github.com/javascript-obfuscator/javascript-obfuscator/issues/688

v1.8.1
---
* Fixed runtime error `Uncaught SyntaxError: yield is a reserved identifier` when `deadCodeInjection` is enabled 

v1.8.0
---
* `domainLock` option patterns with leading dot character (`.example.com`) now cover root domains (`example.com`) in addition to all sub-domains (`sub.example.com`). https://github.com/javascript-obfuscator/javascript-obfuscator/issues/640

v1.7.0
---
* `simplify` option now affects all block statements. Improved variable declarations merging.

v1.6.0
---
* **New option:** `numbersToExpressions` enables numbers conversion to expressions

v1.5.2
---
* Prevented mutation of the name sequences of `mangled` identifier name generators

v1.5.1
---
* Fixed runtime error when `IfStatement` contains only single `let` or `const` variable declaration when `simlify` option enabled. https://github.com/javascript-obfuscator/javascript-obfuscator/issues/661
* Fixed wrong `source-map: 'inline'` encoding after `1.3.0`

v1.5.0
---
* New `mangled-shuffled` identifier names generator based on `mangled` identifier names generator

v1.4.0
---
* **New option:** `simplify` enables additional code obfuscation through simplification

v1.3.0
---
* Improvements of `stringArrayEncoding`: `base64` and `rc4`
* **CLI**: added config file extension validation (it still supports `.js` and `.json` extensions)
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/499

v1.2.2
---
* Fixed performance regression of `Initializing` stage after `1.2.0`

v1.2.1
---
* Support of old browsers when `selfDefending` is enabled. https://github.com/javascript-obfuscator/javascript-obfuscator/issues/615

v1.2.0
---
* Conditional comments will be removed from the code after obfuscation. https://github.com/javascript-obfuscator/javascript-obfuscator/issues/641

v1.1.1
---
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/638

v1.1.0
---
* **New option:** `renameProperties` enables renaming of property names

v1.0.1
---
* Fixed .d.ts typings. https://github.com/javascript-obfuscator/javascript-obfuscator/issues/623

v1.0.0
---
* Looks like obfuscator is ready for the first stable release

v0.28.5
---
* Fixed error during code generation for `ObjectPattern` with single `RestElement`. https://github.com/javascript-obfuscator/javascript-obfuscator/issues/607

v0.28.4
---
* Added correct `self-defending` code for `target: 'browser-no-eval'`. https://github.com/javascript-obfuscator/javascript-obfuscator/issues/610

v0.28.3
---
* Removed memory leak with `identifierNamesGenerator: 'mangled'`

v0.28.2
---
* Fixed change of kinds of variables for dead code with `deadCodeInjection` option

v0.28.1
---
* Removed `acorn-import-meta` package

v0.28.0
---
* Added BigInt support. https://github.com/javascript-obfuscator/javascript-obfuscator/issues/588
* Fixed https://github.com/javascript-obfuscator/javascript-obfuscator/issues/554

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