/*!
Copyright (C) 2016-2018 Timofey Kachalov <sanex3339@yandex.ru>

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

require("source-map-support").install();


module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.cli.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.cli.ts":
/*!**********************!*\
  !*** ./index.cli.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var JavaScriptObfuscatorCLIFacade_1 = __webpack_require__(/*! ./src/JavaScriptObfuscatorCLIFacade */ "./src/JavaScriptObfuscatorCLIFacade.ts");

module.exports = JavaScriptObfuscatorCLIFacade_1.JavaScriptObfuscatorCLI;

/***/ }),

/***/ "./src/EspreeFacade.ts":
/*!*****************************!*\
  !*** ./src/EspreeFacade.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var espree = tslib_1.__importStar(__webpack_require__(/*! espree */ "espree"));

var chalk_1 = tslib_1.__importDefault(__webpack_require__(/*! chalk */ "chalk"));

var EspreeFacade =
/*#__PURE__*/
function () {
  function EspreeFacade() {
    (0, _classCallCheck2.default)(this, EspreeFacade);
  }

  (0, _createClass2.default)(EspreeFacade, null, [{
    key: "parse",
    value: function parse(input, config) {
      var sourceTypeLength = EspreeFacade.sourceTypes.length;

      for (var i = 0; i < sourceTypeLength; i++) {
        try {
          return EspreeFacade.parseType(input, config, EspreeFacade.sourceTypes[i]);
        } catch (error) {
          if (i < sourceTypeLength - 1) {
            continue;
          }

          throw new Error(EspreeFacade.processParsingError(input, error.message, {
            line: error.lineNumber,
            column: error.column
          }));
        }
      }

      throw new Error("Espree parsing error");
    }
  }, {
    key: "parseType",
    value: function parseType(input, inputConfig, sourceType) {
      var config = (0, _assign.default)({}, inputConfig, {
        sourceType: sourceType
      });
      return espree.parse(input, config);
    }
  }, {
    key: "processParsingError",
    value: function processParsingError(sourceCode, errorMessage, position) {
      if (!position || !position.line || !position.column) {
        throw new Error(errorMessage);
      }

      var sourceCodeLines = sourceCode.split(/\r?\n/);
      var errorLine = sourceCodeLines[position.line - 1];

      if (!errorLine) {
        throw new Error(errorMessage);
      }

      var startErrorIndex = Math.max(0, position.column - EspreeFacade.nearestSymbolsCount);
      var endErrorIndex = Math.min(errorLine.length, position.column + EspreeFacade.nearestSymbolsCount);
      var formattedPointer = EspreeFacade.colorError('>');
      var formattedCodeSlice = "...".concat(errorLine.substring(startErrorIndex, endErrorIndex).replace(/^\s+/, ''), "...");
      throw new Error("Line ".concat(position.line, ": ").concat(errorMessage, "\n").concat(formattedPointer, " ").concat(formattedCodeSlice));
    }
  }]);
  return EspreeFacade;
}();

EspreeFacade.colorError = chalk_1.default.red;
EspreeFacade.nearestSymbolsCount = 15;
EspreeFacade.sourceTypes = ['script', 'module'];
exports.EspreeFacade = EspreeFacade;

/***/ }),

/***/ "./src/JavaScriptObfuscator.ts":
/*!*************************************!*\
  !*** ./src/JavaScriptObfuscator.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var JavaScriptObfuscator_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ./container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var escodegen = tslib_1.__importStar(__webpack_require__(/*! escodegen-wallaby */ "escodegen-wallaby"));

var LoggingMessage_1 = __webpack_require__(/*! ./enums/logger/LoggingMessage */ "./src/enums/logger/LoggingMessage.ts");

var NodeTransformer_1 = __webpack_require__(/*! ./enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");

var TransformationStage_1 = __webpack_require__(/*! ./enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var EspreeFacade_1 = __webpack_require__(/*! ./EspreeFacade */ "./src/EspreeFacade.ts");

var NodeGuards_1 = __webpack_require__(/*! ./node/NodeGuards */ "./src/node/NodeGuards.ts");

var JavaScriptObfuscator = JavaScriptObfuscator_1 =
/*#__PURE__*/
function () {
  function JavaScriptObfuscator(transformersRunner, sourceMapCorrector, randomGenerator, logger, options) {
    (0, _classCallCheck2.default)(this, JavaScriptObfuscator);
    this.transformersRunner = transformersRunner;
    this.sourceMapCorrector = sourceMapCorrector;
    this.randomGenerator = randomGenerator;
    this.logger = logger;
    this.options = options;
  }

  (0, _createClass2.default)(JavaScriptObfuscator, [{
    key: "obfuscate",
    value: function obfuscate(sourceCode) {
      var timeStart = Date.now();
      this.logger.info(LoggingMessage_1.LoggingMessage.Version, '0.16.0');
      this.logger.info(LoggingMessage_1.LoggingMessage.ObfuscationStarted);
      this.logger.info(LoggingMessage_1.LoggingMessage.RandomGeneratorSeed, this.randomGenerator.getSeed());
      var astTree = this.parseCode(sourceCode);
      var obfuscatedAstTree = this.transformAstTree(astTree);
      var generatorOutput = this.generateCode(sourceCode, obfuscatedAstTree);
      var obfuscationTime = (Date.now() - timeStart) / 1000;
      this.logger.success(LoggingMessage_1.LoggingMessage.ObfuscationCompleted, obfuscationTime);
      return this.getObfuscationResult(generatorOutput);
    }
  }, {
    key: "parseCode",
    value: function parseCode(sourceCode) {
      return EspreeFacade_1.EspreeFacade.parse(sourceCode, JavaScriptObfuscator_1.espreeParseOptions);
    }
  }, {
    key: "transformAstTree",
    value: function transformAstTree(astTree) {
      var isEmptyAstTree = NodeGuards_1.NodeGuards.isProgramNode(astTree) && !astTree.body.length && !astTree.leadingComments && !astTree.trailingComments;

      if (isEmptyAstTree) {
        this.logger.warn(LoggingMessage_1.LoggingMessage.EmptySourceCode);
        return astTree;
      }

      astTree = this.runTransformationStage(astTree, TransformationStage_1.TransformationStage.Preparing);

      if (this.options.deadCodeInjection) {
        astTree = this.runTransformationStage(astTree, TransformationStage_1.TransformationStage.DeadCodeInjection);
      }

      if (this.options.controlFlowFlattening) {
        astTree = this.runTransformationStage(astTree, TransformationStage_1.TransformationStage.ControlFlowFlattening);
      }

      astTree = this.runTransformationStage(astTree, TransformationStage_1.TransformationStage.Converting);
      astTree = this.runTransformationStage(astTree, TransformationStage_1.TransformationStage.Obfuscating);
      astTree = this.runTransformationStage(astTree, TransformationStage_1.TransformationStage.Finalizing);
      return astTree;
    }
  }, {
    key: "generateCode",
    value: function generateCode(sourceCode, astTree) {
      var escodegenParams = (0, _assign.default)({}, JavaScriptObfuscator_1.escodegenParams);

      if (this.options.sourceMap) {
        escodegenParams.sourceMap = 'sourceMap';
        escodegenParams.sourceContent = sourceCode;
      }

      var generatorOutput = escodegen.generate(astTree, (0, _assign.default)({}, escodegenParams, {
        format: {
          compact: this.options.compact
        }
      }));
      generatorOutput.map = generatorOutput.map ? generatorOutput.map.toString() : '';
      return generatorOutput;
    }
  }, {
    key: "getObfuscationResult",
    value: function getObfuscationResult(generatorOutput) {
      return this.sourceMapCorrector.correct(generatorOutput.code, generatorOutput.map);
    }
  }, {
    key: "runTransformationStage",
    value: function runTransformationStage(astTree, transformationStage) {
      this.logger.info(LoggingMessage_1.LoggingMessage.TransformationStage, transformationStage);
      return this.transformersRunner.transform(astTree, JavaScriptObfuscator_1.transformersList, transformationStage);
    }
  }]);
  return JavaScriptObfuscator;
}();

JavaScriptObfuscator.espreeParseOptions = {
  attachComment: true,
  comment: true,
  ecmaFeatures: {
    experimentalObjectRestSpread: true
  },
  ecmaVersion: 9,
  loc: true,
  range: true
};
JavaScriptObfuscator.escodegenParams = {
  comment: true,
  verbatim: 'x-verbatim-property',
  sourceMapWithCode: true
};
JavaScriptObfuscator.transformersList = [NodeTransformer_1.NodeTransformer.BlockStatementControlFlowTransformer, NodeTransformer_1.NodeTransformer.ClassDeclarationTransformer, NodeTransformer_1.NodeTransformer.CommentsTransformer, NodeTransformer_1.NodeTransformer.CustomNodesTransformer, NodeTransformer_1.NodeTransformer.DeadCodeInjectionTransformer, NodeTransformer_1.NodeTransformer.EvalCallExpressionTransformer, NodeTransformer_1.NodeTransformer.FunctionControlFlowTransformer, NodeTransformer_1.NodeTransformer.CatchClauseTransformer, NodeTransformer_1.NodeTransformer.FunctionDeclarationTransformer, NodeTransformer_1.NodeTransformer.FunctionTransformer, NodeTransformer_1.NodeTransformer.ImportDeclarationTransformer, NodeTransformer_1.NodeTransformer.LabeledStatementTransformer, NodeTransformer_1.NodeTransformer.LiteralTransformer, NodeTransformer_1.NodeTransformer.MemberExpressionTransformer, NodeTransformer_1.NodeTransformer.MetadataTransformer, NodeTransformer_1.NodeTransformer.MethodDefinitionTransformer, NodeTransformer_1.NodeTransformer.ObfuscatingGuardsTransformer, NodeTransformer_1.NodeTransformer.ObjectExpressionKeysTransformer, NodeTransformer_1.NodeTransformer.ObjectExpressionTransformer, NodeTransformer_1.NodeTransformer.ParentificationTransformer, NodeTransformer_1.NodeTransformer.TemplateLiteralTransformer, NodeTransformer_1.NodeTransformer.VariableDeclarationTransformer];
JavaScriptObfuscator = JavaScriptObfuscator_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ITransformersRunner)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ISourceMapCorrector)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ILogger)), tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object, Object])], JavaScriptObfuscator);
exports.JavaScriptObfuscator = JavaScriptObfuscator;

/***/ }),

/***/ "./src/JavaScriptObfuscatorCLIFacade.ts":
/*!**********************************************!*\
  !*** ./src/JavaScriptObfuscatorCLIFacade.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! reflect-metadata */ "reflect-metadata");

var JavaScriptObfuscatorCLI_1 = __webpack_require__(/*! ./cli/JavaScriptObfuscatorCLI */ "./src/cli/JavaScriptObfuscatorCLI.ts");

var JavaScriptObfuscatorCLIFacade =
/*#__PURE__*/
function () {
  function JavaScriptObfuscatorCLIFacade() {
    (0, _classCallCheck2.default)(this, JavaScriptObfuscatorCLIFacade);
  }

  (0, _createClass2.default)(JavaScriptObfuscatorCLIFacade, null, [{
    key: "obfuscate",
    value: function obfuscate(argv) {
      var javaScriptObfuscatorCLI = new JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI(argv);
      javaScriptObfuscatorCLI.initialize();
      javaScriptObfuscatorCLI.run();
    }
  }]);
  return JavaScriptObfuscatorCLIFacade;
}();

exports.JavaScriptObfuscatorCLI = JavaScriptObfuscatorCLIFacade;

/***/ }),

/***/ "./src/JavaScriptObfuscatorFacade.ts":
/*!*******************************************!*\
  !*** ./src/JavaScriptObfuscatorFacade.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! reflect-metadata */ "reflect-metadata");

var ServiceIdentifiers_1 = __webpack_require__(/*! ./container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var InversifyContainerFacade_1 = __webpack_require__(/*! ./container/InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");

var JavaScriptObfuscatorFacade =
/*#__PURE__*/
function () {
  function JavaScriptObfuscatorFacade() {
    (0, _classCallCheck2.default)(this, JavaScriptObfuscatorFacade);
  }

  (0, _createClass2.default)(JavaScriptObfuscatorFacade, null, [{
    key: "obfuscate",
    value: function obfuscate(sourceCode) {
      var inputOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var inversifyContainerFacade = new InversifyContainerFacade_1.InversifyContainerFacade();
      inversifyContainerFacade.load(sourceCode, inputOptions);
      var javaScriptObfuscator = inversifyContainerFacade.get(ServiceIdentifiers_1.ServiceIdentifiers.IJavaScriptObfuscator);
      var obfuscationResult = javaScriptObfuscator.obfuscate(sourceCode);
      inversifyContainerFacade.unload();
      return obfuscationResult;
    }
  }]);
  return JavaScriptObfuscatorFacade;
}();

JavaScriptObfuscatorFacade.version = "0.17.0-dev.1" || 'unknown';
exports.JavaScriptObfuscator = JavaScriptObfuscatorFacade;

/***/ }),

/***/ "./src/ObfuscationResult.ts":
/*!**********************************!*\
  !*** ./src/ObfuscationResult.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var Initializable_1 = __webpack_require__(/*! ./decorators/Initializable */ "./src/decorators/Initializable.ts");

var ObfuscationResult =
/*#__PURE__*/
function () {
  function ObfuscationResult() {
    (0, _classCallCheck2.default)(this, ObfuscationResult);
  }

  (0, _createClass2.default)(ObfuscationResult, [{
    key: "initialize",
    value: function initialize(obfuscatedCode, sourceMap) {
      this.obfuscatedCode = obfuscatedCode;
      this.sourceMap = sourceMap;
    }
  }, {
    key: "getObfuscatedCode",
    value: function getObfuscatedCode() {
      return this.obfuscatedCode;
    }
  }, {
    key: "getSourceMap",
    value: function getSourceMap() {
      return this.sourceMap;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.obfuscatedCode;
    }
  }]);
  return ObfuscationResult;
}();

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], ObfuscationResult.prototype, "obfuscatedCode", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], ObfuscationResult.prototype, "sourceMap", void 0);

ObfuscationResult = tslib_1.__decorate([inversify_1.injectable()], ObfuscationResult);
exports.ObfuscationResult = ObfuscationResult;

/***/ }),

/***/ "./src/SourceCode.ts":
/*!***************************!*\
  !*** ./src/SourceCode.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SourceCode =
/*#__PURE__*/
function () {
  function SourceCode(sourceCode) {
    (0, _classCallCheck2.default)(this, SourceCode);
    this.sourceCode = sourceCode;
  }

  (0, _createClass2.default)(SourceCode, [{
    key: "getSourceCode",
    value: function getSourceCode() {
      return this.sourceCode;
    }
  }]);
  return SourceCode;
}();

exports.SourceCode = SourceCode;

/***/ }),

/***/ "./src/analyzers/stack-trace-analyzer/StackTraceAnalyzer.ts":
/*!******************************************************************!*\
  !*** ./src/analyzers/stack-trace-analyzer/StackTraceAnalyzer.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var StackTraceAnalyzer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var CalleeDataExtractor_1 = __webpack_require__(/*! ../../enums/analyzers/stack-trace-analyzer/CalleeDataExtractor */ "./src/enums/analyzers/stack-trace-analyzer/CalleeDataExtractor.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var StackTraceAnalyzer = StackTraceAnalyzer_1 =
/*#__PURE__*/
function () {
  function StackTraceAnalyzer(calleeDataExtractorFactory) {
    (0, _classCallCheck2.default)(this, StackTraceAnalyzer);
    this.calleeDataExtractorFactory = calleeDataExtractorFactory;
  }

  (0, _createClass2.default)(StackTraceAnalyzer, [{
    key: "analyze",
    value: function analyze(astTree) {
      return this.analyzeRecursive(astTree.body);
    }
  }, {
    key: "analyzeRecursive",
    value: function analyzeRecursive(blockScopeBody) {
      var _this = this;

      var limitIndex = StackTraceAnalyzer_1.getLimitIndex(blockScopeBody.length);
      var stackTraceData = [];
      var blockScopeBodyLength = blockScopeBody.length;

      var _loop = function _loop(index) {
        if (index > limitIndex) {
          return "break";
        }

        var blockScopeBodyNode = blockScopeBody[index];
        estraverse.traverse(blockScopeBodyNode, {
          enter: function enter(node) {
            if (!NodeGuards_1.NodeGuards.isCallExpressionNode(node)) {
              return;
            }

            if (blockScopeBodyNode.parentNode !== NodeUtils_1.NodeUtils.getBlockScopesOfNode(node)[0]) {
              return estraverse.VisitorOption.Skip;
            }

            _this.analyzeCallExpressionNode(stackTraceData, blockScopeBody, node);
          }
        });
      };

      for (var index = 0; index < blockScopeBodyLength; index++) {
        var _ret = _loop(index);

        if (_ret === "break") break;
      }

      return stackTraceData;
    }
  }, {
    key: "analyzeCallExpressionNode",
    value: function analyzeCallExpressionNode(stackTraceData, blockScopeBody, callExpressionNode) {
      var _this2 = this;

      StackTraceAnalyzer_1.calleeDataExtractorsList.forEach(function (calleeDataExtractorName) {
        var calleeData = _this2.calleeDataExtractorFactory(calleeDataExtractorName).extract(blockScopeBody, callExpressionNode.callee);

        if (!calleeData) {
          return;
        }

        stackTraceData.push((0, _assign.default)({}, calleeData, {
          stackTrace: _this2.analyzeRecursive(calleeData.callee.body)
        }));
      });
    }
  }], [{
    key: "getLimitIndex",
    value: function getLimitIndex(blockScopeBodyLength) {
      var lastIndex = blockScopeBodyLength - 1;
      var limitThresholdActivationIndex = StackTraceAnalyzer_1.limitThresholdActivationLength - 1;
      var limitIndex = lastIndex;

      if (lastIndex > limitThresholdActivationIndex) {
        limitIndex = Math.round(limitThresholdActivationIndex + lastIndex * StackTraceAnalyzer_1.limitThreshold);

        if (limitIndex > lastIndex) {
          limitIndex = lastIndex;
        }
      }

      return limitIndex;
    }
  }]);
  return StackTraceAnalyzer;
}();

StackTraceAnalyzer.calleeDataExtractorsList = [CalleeDataExtractor_1.CalleeDataExtractor.FunctionDeclarationCalleeDataExtractor, CalleeDataExtractor_1.CalleeDataExtractor.FunctionExpressionCalleeDataExtractor, CalleeDataExtractor_1.CalleeDataExtractor.ObjectExpressionCalleeDataExtractor];
StackTraceAnalyzer.limitThresholdActivationLength = 25;
StackTraceAnalyzer.limitThreshold = 0.002;
StackTraceAnalyzer = StackTraceAnalyzer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICalleeDataExtractor)), tslib_1.__metadata("design:paramtypes", [Function])], StackTraceAnalyzer);
exports.StackTraceAnalyzer = StackTraceAnalyzer;

/***/ }),

/***/ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts":
/*!**************************************************************************************************!*\
  !*** ./src/analyzers/stack-trace-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var AbstractCalleeDataExtractor = function AbstractCalleeDataExtractor() {
  (0, _classCallCheck2.default)(this, AbstractCalleeDataExtractor);
};

AbstractCalleeDataExtractor = tslib_1.__decorate([inversify_1.injectable()], AbstractCalleeDataExtractor);
exports.AbstractCalleeDataExtractor = AbstractCalleeDataExtractor;

/***/ }),

/***/ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/analyzers/stack-trace-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor.ts ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var AbstractCalleeDataExtractor_1 = __webpack_require__(/*! ./AbstractCalleeDataExtractor */ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var FunctionDeclarationCalleeDataExtractor =
/*#__PURE__*/
function (_AbstractCalleeDataEx) {
  (0, _inherits2.default)(FunctionDeclarationCalleeDataExtractor, _AbstractCalleeDataEx);

  function FunctionDeclarationCalleeDataExtractor() {
    (0, _classCallCheck2.default)(this, FunctionDeclarationCalleeDataExtractor);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FunctionDeclarationCalleeDataExtractor).apply(this, arguments));
  }

  (0, _createClass2.default)(FunctionDeclarationCalleeDataExtractor, [{
    key: "extract",
    value: function extract(blockScopeBody, callee) {
      if (!NodeGuards_1.NodeGuards.isIdentifierNode(callee)) {
        return null;
      }

      var calleeBlockStatement = this.getCalleeBlockStatement(NodeUtils_1.NodeUtils.getBlockScopesOfNode(blockScopeBody[0])[0], callee.name);

      if (!calleeBlockStatement) {
        return null;
      }

      return {
        callee: calleeBlockStatement,
        name: callee.name
      };
    }
  }, {
    key: "getCalleeBlockStatement",
    value: function getCalleeBlockStatement(targetNode, name) {
      var calleeBlockStatement = null;
      estraverse.traverse(targetNode, {
        enter: function enter(node) {
          if (NodeGuards_1.NodeGuards.isFunctionDeclarationNode(node) && node.id.name === name) {
            calleeBlockStatement = node.body;
            return estraverse.VisitorOption.Break;
          }
        }
      });
      return calleeBlockStatement;
    }
  }]);
  return FunctionDeclarationCalleeDataExtractor;
}(AbstractCalleeDataExtractor_1.AbstractCalleeDataExtractor);

FunctionDeclarationCalleeDataExtractor = tslib_1.__decorate([inversify_1.injectable()], FunctionDeclarationCalleeDataExtractor);
exports.FunctionDeclarationCalleeDataExtractor = FunctionDeclarationCalleeDataExtractor;

/***/ }),

/***/ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor.ts":
/*!************************************************************************************************************!*\
  !*** ./src/analyzers/stack-trace-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor.ts ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var AbstractCalleeDataExtractor_1 = __webpack_require__(/*! ./AbstractCalleeDataExtractor */ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var FunctionExpressionCalleeDataExtractor =
/*#__PURE__*/
function (_AbstractCalleeDataEx) {
  (0, _inherits2.default)(FunctionExpressionCalleeDataExtractor, _AbstractCalleeDataEx);

  function FunctionExpressionCalleeDataExtractor() {
    (0, _classCallCheck2.default)(this, FunctionExpressionCalleeDataExtractor);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FunctionExpressionCalleeDataExtractor).apply(this, arguments));
  }

  (0, _createClass2.default)(FunctionExpressionCalleeDataExtractor, [{
    key: "extract",
    value: function extract(blockScopeBody, callee) {
      var calleeBlockStatement = null;

      if (NodeGuards_1.NodeGuards.isIdentifierNode(callee)) {
        calleeBlockStatement = this.getCalleeBlockStatement(NodeUtils_1.NodeUtils.getBlockScopesOfNode(blockScopeBody[0])[0], callee.name);
      }

      if (NodeGuards_1.NodeGuards.isFunctionExpressionNode(callee)) {
        calleeBlockStatement = callee.body;
      }

      if (!calleeBlockStatement) {
        return null;
      }

      return {
        callee: calleeBlockStatement,
        name: callee.name || null
      };
    }
  }, {
    key: "getCalleeBlockStatement",
    value: function getCalleeBlockStatement(targetNode, name) {
      var calleeBlockStatement = null;
      estraverse.traverse(targetNode, {
        enter: function enter(node, parentNode) {
          if (NodeGuards_1.NodeGuards.isFunctionExpressionNode(node) && parentNode && NodeGuards_1.NodeGuards.isVariableDeclaratorNode(parentNode) && NodeGuards_1.NodeGuards.isIdentifierNode(parentNode.id) && parentNode.id.name === name) {
            calleeBlockStatement = node.body;
            return estraverse.VisitorOption.Break;
          }
        }
      });
      return calleeBlockStatement;
    }
  }]);
  return FunctionExpressionCalleeDataExtractor;
}(AbstractCalleeDataExtractor_1.AbstractCalleeDataExtractor);

FunctionExpressionCalleeDataExtractor = tslib_1.__decorate([inversify_1.injectable()], FunctionExpressionCalleeDataExtractor);
exports.FunctionExpressionCalleeDataExtractor = FunctionExpressionCalleeDataExtractor;

/***/ }),

/***/ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/analyzers/stack-trace-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor.ts ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _getIterator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/get-iterator */ "@babel/runtime/core-js/get-iterator"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var ObjectExpressionCalleeDataExtractor_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var AbstractCalleeDataExtractor_1 = __webpack_require__(/*! ./AbstractCalleeDataExtractor */ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var ObjectExpressionCalleeDataExtractor = ObjectExpressionCalleeDataExtractor_1 =
/*#__PURE__*/
function (_AbstractCalleeDataEx) {
  (0, _inherits2.default)(ObjectExpressionCalleeDataExtractor, _AbstractCalleeDataEx);

  function ObjectExpressionCalleeDataExtractor() {
    (0, _classCallCheck2.default)(this, ObjectExpressionCalleeDataExtractor);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ObjectExpressionCalleeDataExtractor).apply(this, arguments));
  }

  (0, _createClass2.default)(ObjectExpressionCalleeDataExtractor, [{
    key: "extract",
    value: function extract(blockScopeBody, callee) {
      if (!NodeGuards_1.NodeGuards.isMemberExpressionNode(callee)) {
        return null;
      }

      var objectMembersCallsChain = this.createObjectMembersCallsChain([], callee);

      if (!objectMembersCallsChain.length) {
        return null;
      }

      var functionExpressionName = objectMembersCallsChain[objectMembersCallsChain.length - 1];
      var calleeBlockStatement = this.getCalleeBlockStatement(NodeUtils_1.NodeUtils.getBlockScopesOfNode(blockScopeBody[0])[0], objectMembersCallsChain);

      if (!calleeBlockStatement) {
        return null;
      }

      return {
        callee: calleeBlockStatement,
        name: functionExpressionName
      };
    }
  }, {
    key: "createObjectMembersCallsChain",
    value: function createObjectMembersCallsChain(currentChain, memberExpression) {
      if (NodeGuards_1.NodeGuards.isIdentifierNode(memberExpression.property) && memberExpression.computed === false) {
        currentChain.unshift(memberExpression.property.name);
      } else if (NodeGuards_1.NodeGuards.isLiteralNode(memberExpression.property) && (typeof memberExpression.property.value === 'string' || typeof memberExpression.property.value === 'number')) {
        currentChain.unshift(memberExpression.property.value);
      } else {
        return currentChain;
      }

      if (NodeGuards_1.NodeGuards.isMemberExpressionNode(memberExpression.object)) {
        return this.createObjectMembersCallsChain(currentChain, memberExpression.object);
      } else if (NodeGuards_1.NodeGuards.isIdentifierNode(memberExpression.object)) {
        currentChain.unshift(memberExpression.object.name);
      }

      return currentChain;
    }
  }, {
    key: "getCalleeBlockStatement",
    value: function getCalleeBlockStatement(targetNode, objectMembersCallsChain) {
      var _this = this;

      var objectName = objectMembersCallsChain.shift();

      if (!objectName) {
        return null;
      }

      var calleeBlockStatement = null;
      estraverse.traverse(targetNode, {
        enter: function enter(node) {
          if (NodeGuards_1.NodeGuards.isVariableDeclaratorNode(node) && NodeGuards_1.NodeGuards.isIdentifierNode(node.id) && node.init && NodeGuards_1.NodeGuards.isObjectExpressionNode(node.init) && node.id.name === objectName) {
            calleeBlockStatement = _this.findCalleeBlockStatement(node.init.properties, objectMembersCallsChain);
            return estraverse.VisitorOption.Break;
          }
        }
      });
      return calleeBlockStatement;
    }
  }, {
    key: "findCalleeBlockStatement",
    value: function findCalleeBlockStatement(objectExpressionProperties, objectMembersCallsChain) {
      var nextItemInCallsChain = objectMembersCallsChain.shift();

      if (!nextItemInCallsChain) {
        return null;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator2.default)(objectExpressionProperties), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var propertyNode = _step.value;

          if (!ObjectExpressionCalleeDataExtractor_1.isValidTargetPropertyNode(propertyNode, nextItemInCallsChain)) {
            continue;
          }

          if (NodeGuards_1.NodeGuards.isObjectExpressionNode(propertyNode.value)) {
            return this.findCalleeBlockStatement(propertyNode.value.properties, objectMembersCallsChain);
          }

          if (NodeGuards_1.NodeGuards.isFunctionExpressionNode(propertyNode.value)) {
            return propertyNode.value.body;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }], [{
    key: "isValidTargetPropertyNode",
    value: function isValidTargetPropertyNode(propertyNode, nextItemInCallsChain) {
      if (!propertyNode.key) {
        return false;
      }

      var isTargetPropertyNodeWithIdentifierKey = NodeGuards_1.NodeGuards.isIdentifierNode(propertyNode.key) && propertyNode.key.name === nextItemInCallsChain;
      var isTargetPropertyNodeWithLiteralKey = NodeGuards_1.NodeGuards.isLiteralNode(propertyNode.key) && Boolean(propertyNode.key.value) && propertyNode.key.value === nextItemInCallsChain;
      return isTargetPropertyNodeWithIdentifierKey || isTargetPropertyNodeWithLiteralKey;
    }
  }]);
  return ObjectExpressionCalleeDataExtractor;
}(AbstractCalleeDataExtractor_1.AbstractCalleeDataExtractor);

ObjectExpressionCalleeDataExtractor = ObjectExpressionCalleeDataExtractor_1 = tslib_1.__decorate([inversify_1.injectable()], ObjectExpressionCalleeDataExtractor);
exports.ObjectExpressionCalleeDataExtractor = ObjectExpressionCalleeDataExtractor;

/***/ }),

/***/ "./src/cli/JavaScriptObfuscatorCLI.ts":
/*!********************************************!*\
  !*** ./src/cli/JavaScriptObfuscatorCLI.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _keys = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/keys */ "@babel/runtime/core-js/object/keys"));

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var commander = tslib_1.__importStar(__webpack_require__(/*! commander */ "commander"));

var path = tslib_1.__importStar(__webpack_require__(/*! path */ "path"));

var Initializable_1 = __webpack_require__(/*! ../decorators/Initializable */ "./src/decorators/Initializable.ts");

var Default_1 = __webpack_require__(/*! ../options/presets/Default */ "./src/options/presets/Default.ts");

var ArraySanitizer_1 = __webpack_require__(/*! ./sanitizers/ArraySanitizer */ "./src/cli/sanitizers/ArraySanitizer.ts");

var BooleanSanitizer_1 = __webpack_require__(/*! ./sanitizers/BooleanSanitizer */ "./src/cli/sanitizers/BooleanSanitizer.ts");

var IdentifierNamesGeneratorSanitizer_1 = __webpack_require__(/*! ./sanitizers/IdentifierNamesGeneratorSanitizer */ "./src/cli/sanitizers/IdentifierNamesGeneratorSanitizer.ts");

var ObfuscatingTargetSanitizer_1 = __webpack_require__(/*! ./sanitizers/ObfuscatingTargetSanitizer */ "./src/cli/sanitizers/ObfuscatingTargetSanitizer.ts");

var SourceMapModeSanitizer_1 = __webpack_require__(/*! ./sanitizers/SourceMapModeSanitizer */ "./src/cli/sanitizers/SourceMapModeSanitizer.ts");

var StringArrayEncodingSanitizer_1 = __webpack_require__(/*! ./sanitizers/StringArrayEncodingSanitizer */ "./src/cli/sanitizers/StringArrayEncodingSanitizer.ts");

var CLIUtils_1 = __webpack_require__(/*! ./utils/CLIUtils */ "./src/cli/utils/CLIUtils.ts");

var JavaScriptObfuscatorFacade_1 = __webpack_require__(/*! ../JavaScriptObfuscatorFacade */ "./src/JavaScriptObfuscatorFacade.ts");

var SourceCodeReader_1 = __webpack_require__(/*! ./utils/SourceCodeReader */ "./src/cli/utils/SourceCodeReader.ts");

var JavaScriptObfuscatorCLI =
/*#__PURE__*/
function () {
  function JavaScriptObfuscatorCLI(argv) {
    (0, _classCallCheck2.default)(this, JavaScriptObfuscatorCLI);
    this.rawArguments = argv;
    this.arguments = argv.slice(2);
  }

  (0, _createClass2.default)(JavaScriptObfuscatorCLI, [{
    key: "initialize",
    value: function initialize() {
      this.inputPath = path.normalize(this.arguments[0] || '');
      this.commands = new commander.Command();
      this.configureCommands();
      this.configureHelp();
      this.inputCLIOptions = this.commands.opts();
    }
  }, {
    key: "run",
    value: function run() {
      var canShowHelp = !this.arguments.length || this.arguments.includes('--help');

      if (canShowHelp) {
        this.commands.outputHelp();
        return;
      }

      var sourceCodeData = new SourceCodeReader_1.SourceCodeReader(this.inputCLIOptions).readSourceCode(this.inputPath);
      this.processSourceCodeData(sourceCodeData);
    }
  }, {
    key: "buildOptions",
    value: function buildOptions() {
      var inputCLIOptions = JavaScriptObfuscatorCLI.filterOptions(this.inputCLIOptions);
      var configFilePath = this.inputCLIOptions.config;
      var configFileLocation = configFilePath ? path.resolve(configFilePath, '.') : '';
      var configFileOptions = configFileLocation ? CLIUtils_1.CLIUtils.getUserConfig(configFileLocation) : {};
      return (0, _assign.default)({}, Default_1.DEFAULT_PRESET, configFileOptions, inputCLIOptions);
    }
  }, {
    key: "configureCommands",
    value: function configureCommands() {
      this.commands.usage('<inputPath> [options]').version("0.17.0-dev.1" || 'unknown', '-v, --version').option('-o, --output <path>', 'Output path for obfuscated code').option('--compact <boolean>', 'Disable one line output code compacting', BooleanSanitizer_1.BooleanSanitizer).option('--config <boolean>', 'Name of js / json config file').option('--control-flow-flattening <boolean>', 'Enables control flow flattening', BooleanSanitizer_1.BooleanSanitizer).option('--control-flow-flattening-threshold <number>', 'The probability that the control flow flattening transformation will be applied to the node', parseFloat).option('--dead-code-injection <boolean>', 'Enables dead code injection', BooleanSanitizer_1.BooleanSanitizer).option('--dead-code-injection-threshold <number>', 'The probability that the dead code injection transformation will be applied to the node', parseFloat).option('--debug-protection <boolean>', 'Disable browser Debug panel (can cause DevTools enabled browser freeze)', BooleanSanitizer_1.BooleanSanitizer).option('--debug-protection-interval <boolean>', 'Disable browser Debug panel even after page was loaded (can cause DevTools enabled browser freeze)', BooleanSanitizer_1.BooleanSanitizer).option('--disable-console-output <boolean>', 'Allow console.log, console.info, console.error and console.warn messages output into browser console', BooleanSanitizer_1.BooleanSanitizer).option('--domain-lock <list> (comma separated, without whitespaces)', 'Blocks the execution of the code in domains that do not match the passed RegExp patterns (comma separated)', ArraySanitizer_1.ArraySanitizer).option('--exclude <list> (comma separated, without whitespaces)', 'A filename or glob which indicates files to exclude from obfuscation', ArraySanitizer_1.ArraySanitizer).option('--identifier-names-generator <string>', 'Sets identifier names generator. ' + 'Values: hexadecimal, mangled. ' + 'Default: hexadecimal', IdentifierNamesGeneratorSanitizer_1.IdentifierNamesGeneratorSanitizer).option('--identifiers-prefix <string>', 'Sets prefix for all global identifiers.').option('--log <boolean>', 'Enables logging of the information to the console', BooleanSanitizer_1.BooleanSanitizer).option('--reserved-names <list> (comma separated, without whitespaces)', 'Disables obfuscation and generation of identifiers, which being matched by passed RegExp patterns (comma separated)', ArraySanitizer_1.ArraySanitizer).option('--rename-globals <boolean>', 'Allows to enable obfuscation of global variable and function names with declaration.', BooleanSanitizer_1.BooleanSanitizer).option('--rotate-string-array <boolean>', 'Disable rotation of unicode array values during obfuscation', BooleanSanitizer_1.BooleanSanitizer).option('--seed <number>', 'Sets seed for random generator. This is useful for creating repeatable results.', parseFloat).option('--self-defending <boolean>', 'Disables self-defending for obfuscated code', BooleanSanitizer_1.BooleanSanitizer).option('--source-map <boolean>', 'Enables source map generation', BooleanSanitizer_1.BooleanSanitizer).option('--source-map-base-url <string>', 'Sets base url to the source map import url when `--source-map-mode=separate`').option('--source-map-file-name <string>', 'Sets file name for output source map when `--source-map-mode=separate`').option('--source-map-mode <string>', 'Specify source map output mode. ' + 'Values: inline, separate. ' + 'Default: separate', SourceMapModeSanitizer_1.SourceMapModeSanitizer).option('--string-array <boolean>', 'Disables gathering of all literal strings into an array and replacing every literal string with an array call', BooleanSanitizer_1.BooleanSanitizer).option('--string-array-encoding <string|boolean>', 'Encodes all strings in strings array using base64 or rc4 (this option can slow down your code speed. ' + 'Values: true, false, base64, rc4. ' + 'Default: false', StringArrayEncodingSanitizer_1.StringArrayEncodingSanitizer).option('--string-array-threshold <number>', 'The probability that the literal string will be inserted into stringArray (Default: 0.8, Min: 0, Max: 1)', parseFloat).option('--target <string>', 'Allows to set target environment for obfuscated code. ' + 'Values: browser, browser-no-eval, node. ' + 'Default: browser', ObfuscatingTargetSanitizer_1.ObfuscationTargetSanitizer).option('--transform-object-keys <boolean>', 'Enables transformation of object keys', BooleanSanitizer_1.BooleanSanitizer).option('--unicode-escape-sequence <boolean>', 'Allows to enable/disable string conversion to unicode escape sequence', BooleanSanitizer_1.BooleanSanitizer).parse(this.rawArguments);
    }
  }, {
    key: "configureHelp",
    value: function configureHelp() {
      this.commands.on('--help', function () {
        console.log('  Examples:\n');
        console.log('    %> javascript-obfuscator input_file_name.js --compact true --self-defending false');
        console.log('    %> javascript-obfuscator input_file_name.js --output output_file_name.js --compact true --self-defending false');
        console.log('    %> javascript-obfuscator input_directory_name --compact true --self-defending false');
        console.log('');
      });
    }
  }, {
    key: "processSourceCodeData",
    value: function processSourceCodeData(sourceCodeData) {
      var _this = this;

      var outputPath = this.inputCLIOptions.output ? path.normalize(this.inputCLIOptions.output) : '';

      if (!Array.isArray(sourceCodeData)) {
        var outputCodePath = outputPath || CLIUtils_1.CLIUtils.getOutputCodePath(this.inputPath);
        this.processSourceCode(sourceCodeData, outputCodePath, null);
      } else {
        sourceCodeData.forEach(function (_ref, index) {
          var filePath = _ref.filePath,
              content = _ref.content;
          var outputCodePath = outputPath ? path.join(outputPath, filePath) : CLIUtils_1.CLIUtils.getOutputCodePath(filePath);

          _this.processSourceCode(content, outputCodePath, index);
        });
      }
    }
  }, {
    key: "processSourceCode",
    value: function processSourceCode(sourceCode, outputCodePath, sourceCodeIndex) {
      var options = this.buildOptions();

      if (sourceCodeIndex !== null) {
        var baseIdentifiersPrefix = this.inputCLIOptions.identifiersPrefix || JavaScriptObfuscatorCLI.baseIdentifiersPrefix;
        var identifiersPrefix = "".concat(baseIdentifiersPrefix).concat(sourceCodeIndex);
        options = (0, _assign.default)({}, options, {
          identifiersPrefix: identifiersPrefix
        });
      }

      if (options.sourceMap) {
        JavaScriptObfuscatorCLI.processSourceCodeWithSourceMap(sourceCode, outputCodePath, options);
      } else {
        JavaScriptObfuscatorCLI.processSourceCodeWithoutSourceMap(sourceCode, outputCodePath, options);
      }
    }
  }], [{
    key: "filterOptions",
    value: function filterOptions(options) {
      var filteredOptions = {};
      (0, _keys.default)(options).forEach(function (option) {
        if (options[option] === undefined) {
          return;
        }

        filteredOptions[option] = options[option];
      });
      return filteredOptions;
    }
  }, {
    key: "processSourceCodeWithoutSourceMap",
    value: function processSourceCodeWithoutSourceMap(sourceCode, outputCodePath, options) {
      var obfuscatedCode = JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(sourceCode, options).getObfuscatedCode();
      CLIUtils_1.CLIUtils.writeFile(outputCodePath, obfuscatedCode);
    }
  }, {
    key: "processSourceCodeWithSourceMap",
    value: function processSourceCodeWithSourceMap(sourceCode, outputCodePath, options) {
      var outputSourceMapPath = CLIUtils_1.CLIUtils.getOutputSourceMapPath(outputCodePath, options.sourceMapFileName || '');
      options = (0, _assign.default)({}, options, {
        sourceMapFileName: path.basename(outputSourceMapPath)
      });
      var obfuscationResult = JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(sourceCode, options);
      CLIUtils_1.CLIUtils.writeFile(outputCodePath, obfuscationResult.getObfuscatedCode());

      if (options.sourceMapMode === 'separate' && obfuscationResult.getSourceMap()) {
        CLIUtils_1.CLIUtils.writeFile(outputSourceMapPath, obfuscationResult.getSourceMap());
      }
    }
  }]);
  return JavaScriptObfuscatorCLI;
}();

JavaScriptObfuscatorCLI.encoding = 'utf8';
JavaScriptObfuscatorCLI.obfuscatedFilePrefix = '-obfuscated';
JavaScriptObfuscatorCLI.baseIdentifiersPrefix = 'a';

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], JavaScriptObfuscatorCLI.prototype, "commands", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], JavaScriptObfuscatorCLI.prototype, "inputCLIOptions", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], JavaScriptObfuscatorCLI.prototype, "inputPath", void 0);

exports.JavaScriptObfuscatorCLI = JavaScriptObfuscatorCLI;

/***/ }),

/***/ "./src/cli/sanitizers/ArraySanitizer.ts":
/*!**********************************************!*\
  !*** ./src/cli/sanitizers/ArraySanitizer.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.ArraySanitizer = function (value) {
  if (/,$/.test(value)) {
    throw new SyntaxError("Multiple <list> values should be wrapped inside quotes: --option-name 'value1, value2'");
  }

  return value.split(',').map(function (string) {
    return string.trim();
  });
};

/***/ }),

/***/ "./src/cli/sanitizers/BooleanSanitizer.ts":
/*!************************************************!*\
  !*** ./src/cli/sanitizers/BooleanSanitizer.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.BooleanSanitizer = function (value) {
  return value === 'true' || value === '1';
};

/***/ }),

/***/ "./src/cli/sanitizers/IdentifierNamesGeneratorSanitizer.ts":
/*!*****************************************************************!*\
  !*** ./src/cli/sanitizers/IdentifierNamesGeneratorSanitizer.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _keys = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/keys */ "@babel/runtime/core-js/object/keys"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var IdentifierNamesGenerator_1 = __webpack_require__(/*! ../../enums/generators/identifier-names-generators/IdentifierNamesGenerator */ "./src/enums/generators/identifier-names-generators/IdentifierNamesGenerator.ts");

exports.IdentifierNamesGeneratorSanitizer = function (value) {
  var isCorrectIdentifierNamesGenerator = (0, _keys.default)(IdentifierNamesGenerator_1.IdentifierNamesGenerator).some(function (key) {
    return IdentifierNamesGenerator_1.IdentifierNamesGenerator[key] === value;
  });

  if (!isCorrectIdentifierNamesGenerator) {
    throw new ReferenceError('Invalid value of `--identifier-names-generator` option');
  }

  return value;
};

/***/ }),

/***/ "./src/cli/sanitizers/ObfuscatingTargetSanitizer.ts":
/*!**********************************************************!*\
  !*** ./src/cli/sanitizers/ObfuscatingTargetSanitizer.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _keys = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/keys */ "@babel/runtime/core-js/object/keys"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");

exports.ObfuscationTargetSanitizer = function (value) {
  var isCorrectTarget = (0, _keys.default)(ObfuscationTarget_1.ObfuscationTarget).some(function (key) {
    return ObfuscationTarget_1.ObfuscationTarget[key] === value;
  });

  if (!isCorrectTarget) {
    throw new ReferenceError('Invalid value of `--target` option');
  }

  return value;
};

/***/ }),

/***/ "./src/cli/sanitizers/SourceMapModeSanitizer.ts":
/*!******************************************************!*\
  !*** ./src/cli/sanitizers/SourceMapModeSanitizer.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _keys = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/keys */ "@babel/runtime/core-js/object/keys"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SourceMapMode_1 = __webpack_require__(/*! ../../enums/source-map/SourceMapMode */ "./src/enums/source-map/SourceMapMode.ts");

exports.SourceMapModeSanitizer = function (value) {
  var isCorrectSourceMapMode = (0, _keys.default)(SourceMapMode_1.SourceMapMode).some(function (key) {
    return SourceMapMode_1.SourceMapMode[key] === value;
  });

  if (!isCorrectSourceMapMode) {
    throw new ReferenceError('Invalid value of `--source-map-mode` option');
  }

  return value;
};

/***/ }),

/***/ "./src/cli/sanitizers/StringArrayEncodingSanitizer.ts":
/*!************************************************************!*\
  !*** ./src/cli/sanitizers/StringArrayEncodingSanitizer.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var StringArrayEncoding_1 = __webpack_require__(/*! ../../enums/StringArrayEncoding */ "./src/enums/StringArrayEncoding.ts");

exports.StringArrayEncodingSanitizer = function (value) {
  switch (value) {
    case 'true':
    case '1':
    case StringArrayEncoding_1.StringArrayEncoding.Base64:
      return true;

    case StringArrayEncoding_1.StringArrayEncoding.Rc4:
      return StringArrayEncoding_1.StringArrayEncoding.Rc4;

    default:
      return false;
  }
};

/***/ }),

/***/ "./src/cli/utils sync recursive":
/*!****************************!*\
  !*** ./src/cli/utils sync ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./src/cli/utils sync recursive";

/***/ }),

/***/ "./src/cli/utils/CLIUtils.ts":
/*!***********************************!*\
  !*** ./src/cli/utils/CLIUtils.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var fs = tslib_1.__importStar(__webpack_require__(/*! fs */ "fs"));

var mkdirp = tslib_1.__importStar(__webpack_require__(/*! mkdirp */ "mkdirp"));

var path = tslib_1.__importStar(__webpack_require__(/*! path */ "path"));

var JavaScriptObfuscatorCLI_1 = __webpack_require__(/*! ../JavaScriptObfuscatorCLI */ "./src/cli/JavaScriptObfuscatorCLI.ts");

var CLIUtils =
/*#__PURE__*/
function () {
  function CLIUtils() {
    (0, _classCallCheck2.default)(this, CLIUtils);
  }

  (0, _createClass2.default)(CLIUtils, null, [{
    key: "getOutputCodePath",
    value: function getOutputCodePath(inputPath) {
      return path.normalize(inputPath).split('.').map(function (value, index) {
        return index === 0 ? "".concat(value).concat(JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.obfuscatedFilePrefix) : value;
      }).join('.');
    }
  }, {
    key: "getOutputSourceMapPath",
    value: function getOutputSourceMapPath(outputCodePath) {
      var sourceMapFileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (sourceMapFileName) {
        outputCodePath = "".concat(outputCodePath.substring(0, outputCodePath.lastIndexOf('/')), "/").concat(sourceMapFileName);
      }

      if (!/\.js\.map$/.test(outputCodePath)) {
        outputCodePath = "".concat(outputCodePath.split('.')[0], ".js.map");
      } else if (/\.js$/.test(outputCodePath)) {
        outputCodePath += '.map';
      }

      return outputCodePath;
    }
  }, {
    key: "getUserConfig",
    value: function getUserConfig(configPath) {
      var config;

      try {
        config = __webpack_require__("./src/cli/utils sync recursive")(configPath);
      } catch (_a) {
        try {
          config = require(configPath);
        } catch (_b) {
          throw new ReferenceError('Given config path must be a valid `.js` or `.json` file path');
        }
      }

      return config;
    }
  }, {
    key: "writeFile",
    value: function writeFile(outputPath, data) {
      mkdirp.sync(path.dirname(outputPath));
      fs.writeFileSync(outputPath, data, {
        encoding: JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.encoding
      });
    }
  }]);
  return CLIUtils;
}();

exports.CLIUtils = CLIUtils;

/***/ }),

/***/ "./src/cli/utils/SourceCodeReader.ts":
/*!*******************************************!*\
  !*** ./src/cli/utils/SourceCodeReader.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var fs = tslib_1.__importStar(__webpack_require__(/*! fs */ "fs"));

var path = tslib_1.__importStar(__webpack_require__(/*! path */ "path"));

var multimatch_1 = tslib_1.__importDefault(__webpack_require__(/*! multimatch */ "multimatch"));

var LoggingPrefix_1 = __webpack_require__(/*! ../../enums/logger/LoggingPrefix */ "./src/enums/logger/LoggingPrefix.ts");

var JavaScriptObfuscatorCLI_1 = __webpack_require__(/*! ../JavaScriptObfuscatorCLI */ "./src/cli/JavaScriptObfuscatorCLI.ts");

var Logger_1 = __webpack_require__(/*! ../../logger/Logger */ "./src/logger/Logger.ts");

var SourceCodeReader =
/*#__PURE__*/
function () {
  function SourceCodeReader(options) {
    (0, _classCallCheck2.default)(this, SourceCodeReader);
    this.options = options;
  }

  (0, _createClass2.default)(SourceCodeReader, [{
    key: "readSourceCode",
    value: function readSourceCode(inputPath) {
      if (SourceCodeReader.isFilePath(inputPath) && this.isValidFile(inputPath)) {
        return this.readFile(inputPath);
      }

      if (SourceCodeReader.isDirectoryPath(inputPath) && this.isValidDirectory(inputPath)) {
        return this.readDirectoryRecursive(inputPath);
      }

      var availableFilePaths = SourceCodeReader.availableInputExtensions.map(function (extension) {
        return "`".concat(extension, "`");
      }).join(', ');
      throw new ReferenceError("Given input path must be a valid ".concat(availableFilePaths, " file or directory path"));
    }
  }, {
    key: "readDirectoryRecursive",
    value: function readDirectoryRecursive(directoryPath) {
      var _this = this;

      var fileData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      fs.readdirSync(directoryPath, JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.encoding).forEach(function (fileName) {
        var filePath = "".concat(directoryPath, "/").concat(fileName);

        if (SourceCodeReader.isDirectoryPath(filePath) && _this.isValidDirectory(filePath)) {
          fileData.push.apply(fileData, (0, _toConsumableArray2.default)(_this.readDirectoryRecursive(filePath)));
        } else if (SourceCodeReader.isFilePath(filePath) && _this.isValidFile(filePath)) {
          var content = _this.readFile(filePath);

          fileData.push({
            filePath: filePath,
            content: content
          });
        }
      });
      return fileData;
    }
  }, {
    key: "readFile",
    value: function readFile(filePath) {
      SourceCodeReader.logFilePath(filePath);
      return fs.readFileSync(filePath, JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.encoding);
    }
  }, {
    key: "isValidDirectory",
    value: function isValidDirectory(directoryPath) {
      return !SourceCodeReader.isExcludedPath(directoryPath, this.options.exclude);
    }
  }, {
    key: "isValidFile",
    value: function isValidFile(filePath) {
      return SourceCodeReader.availableInputExtensions.includes(path.extname(filePath)) && !filePath.includes(JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.obfuscatedFilePrefix) && !SourceCodeReader.isExcludedPath(filePath, this.options.exclude);
    }
  }], [{
    key: "isExcludedPath",
    value: function isExcludedPath(filePath) {
      var excludePatterns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (!excludePatterns.length) {
        return false;
      }

      var fileName = path.basename(filePath);
      var isExcludedFilePathByGlobPattern = !!multimatch_1.default([filePath], excludePatterns).length;
      var isExcludedFilePathByInclusion = excludePatterns.some(function (excludePattern) {
        return filePath.includes(excludePattern) || fileName.includes(excludePattern);
      });
      return isExcludedFilePathByInclusion || isExcludedFilePathByGlobPattern;
    }
  }, {
    key: "isDirectoryPath",
    value: function isDirectoryPath(filePath) {
      try {
        return fs.statSync(filePath).isDirectory();
      } catch (_a) {
        return false;
      }
    }
  }, {
    key: "isFilePath",
    value: function isFilePath(filePath) {
      try {
        return fs.statSync(filePath).isFile();
      } catch (_a) {
        return false;
      }
    }
  }, {
    key: "logFilePath",
    value: function logFilePath(filePath) {
      var normalizedFilePath = path.normalize(filePath);
      Logger_1.Logger.log(Logger_1.Logger.colorInfo, LoggingPrefix_1.LoggingPrefix.CLI, "Obfuscating file: ".concat(normalizedFilePath, "..."));
    }
  }]);
  return SourceCodeReader;
}();

SourceCodeReader.availableInputExtensions = ['.js'];
exports.SourceCodeReader = SourceCodeReader;

/***/ }),

/***/ "./src/container/InversifyContainerFacade.ts":
/*!***************************************************!*\
  !*** ./src/container/InversifyContainerFacade.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ "@babel/runtime/helpers/construct"));

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ./ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var AnalyzersModule_1 = __webpack_require__(/*! ./modules/analyzers/AnalyzersModule */ "./src/container/modules/analyzers/AnalyzersModule.ts");

var ControlFlowTransformersModule_1 = __webpack_require__(/*! ./modules/node-transformers/ControlFlowTransformersModule */ "./src/container/modules/node-transformers/ControlFlowTransformersModule.ts");

var ConvertingTransformersModule_1 = __webpack_require__(/*! ./modules/node-transformers/ConvertingTransformersModule */ "./src/container/modules/node-transformers/ConvertingTransformersModule.ts");

var CustomNodesModule_1 = __webpack_require__(/*! ./modules/custom-nodes/CustomNodesModule */ "./src/container/modules/custom-nodes/CustomNodesModule.ts");

var FinalizingTransformersModule_1 = __webpack_require__(/*! ./modules/node-transformers/FinalizingTransformersModule */ "./src/container/modules/node-transformers/FinalizingTransformersModule.ts");

var GeneratorsModule_1 = __webpack_require__(/*! ./modules/generators/GeneratorsModule */ "./src/container/modules/generators/GeneratorsModule.ts");

var NodeTransformersModule_1 = __webpack_require__(/*! ./modules/node-transformers/NodeTransformersModule */ "./src/container/modules/node-transformers/NodeTransformersModule.ts");

var ObfuscatingTransformersModule_1 = __webpack_require__(/*! ./modules/node-transformers/ObfuscatingTransformersModule */ "./src/container/modules/node-transformers/ObfuscatingTransformersModule.ts");

var OptionsModule_1 = __webpack_require__(/*! ./modules/options/OptionsModule */ "./src/container/modules/options/OptionsModule.ts");

var PreparingTransformersModule_1 = __webpack_require__(/*! ./modules/node-transformers/PreparingTransformersModule */ "./src/container/modules/node-transformers/PreparingTransformersModule.ts");

var StoragesModule_1 = __webpack_require__(/*! ./modules/storages/StoragesModule */ "./src/container/modules/storages/StoragesModule.ts");

var UtilsModule_1 = __webpack_require__(/*! ./modules/utils/UtilsModule */ "./src/container/modules/utils/UtilsModule.ts");

var JavaScriptObfuscator_1 = __webpack_require__(/*! ../JavaScriptObfuscator */ "./src/JavaScriptObfuscator.ts");

var Logger_1 = __webpack_require__(/*! ../logger/Logger */ "./src/logger/Logger.ts");

var ObfuscationEventEmitter_1 = __webpack_require__(/*! ../event-emitters/ObfuscationEventEmitter */ "./src/event-emitters/ObfuscationEventEmitter.ts");

var ObfuscationResult_1 = __webpack_require__(/*! ../ObfuscationResult */ "./src/ObfuscationResult.ts");

var SourceCode_1 = __webpack_require__(/*! ../SourceCode */ "./src/SourceCode.ts");

var SourceMapCorrector_1 = __webpack_require__(/*! ../source-map/SourceMapCorrector */ "./src/source-map/SourceMapCorrector.ts");

var TransformersRunner_1 = __webpack_require__(/*! ../node-transformers/TransformersRunner */ "./src/node-transformers/TransformersRunner.ts");

var InversifyContainerFacade =
/*#__PURE__*/
function () {
  function InversifyContainerFacade() {
    (0, _classCallCheck2.default)(this, InversifyContainerFacade);
    this.container = new inversify_1.Container();
  }

  (0, _createClass2.default)(InversifyContainerFacade, [{
    key: "get",
    value: function get(serviceIdentifier) {
      return this.container.get(serviceIdentifier);
    }
  }, {
    key: "getNamed",
    value: function getNamed(serviceIdentifier, named) {
      return this.container.getNamed(serviceIdentifier, named);
    }
  }, {
    key: "load",
    value: function load(sourceCode, options) {
      this.container.bind(ServiceIdentifiers_1.ServiceIdentifiers.ISourceCode).toDynamicValue(function () {
        return new SourceCode_1.SourceCode(sourceCode);
      }).inSingletonScope();
      this.container.bind(ServiceIdentifiers_1.ServiceIdentifiers.TInputOptions).toDynamicValue(function () {
        return options;
      }).inSingletonScope();
      this.container.bind(ServiceIdentifiers_1.ServiceIdentifiers.ILogger).to(Logger_1.Logger).inSingletonScope();
      this.container.bind(ServiceIdentifiers_1.ServiceIdentifiers.IJavaScriptObfuscator).to(JavaScriptObfuscator_1.JavaScriptObfuscator).inSingletonScope();
      this.container.bind(ServiceIdentifiers_1.ServiceIdentifiers.ITransformersRunner).to(TransformersRunner_1.TransformersRunner).inSingletonScope();
      this.container.bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationResult).to(ObfuscationResult_1.ObfuscationResult).inSingletonScope();
      this.container.bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscationResult).toFactory(function (context) {
        return function (obfuscatedCode, sourceMap) {
          var obfuscationResult = context.container.get(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationResult);
          obfuscationResult.initialize(obfuscatedCode, sourceMap);
          return obfuscationResult;
        };
      });
      this.container.bind(ServiceIdentifiers_1.ServiceIdentifiers.ISourceMapCorrector).to(SourceMapCorrector_1.SourceMapCorrector).inSingletonScope();
      this.container.bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter).to(ObfuscationEventEmitter_1.ObfuscationEventEmitter).inSingletonScope();
      this.container.load(AnalyzersModule_1.analyzersModule);
      this.container.load(ControlFlowTransformersModule_1.controlFlowTransformersModule);
      this.container.load(ConvertingTransformersModule_1.convertingTransformersModule);
      this.container.load(CustomNodesModule_1.customNodesModule);
      this.container.load(FinalizingTransformersModule_1.finalizingTransformersModule);
      this.container.load(GeneratorsModule_1.generatorsModule);
      this.container.load(NodeTransformersModule_1.nodeTransformersModule);
      this.container.load(ObfuscatingTransformersModule_1.obfuscatingTransformersModule);
      this.container.load(OptionsModule_1.optionsModule);
      this.container.load(PreparingTransformersModule_1.preparingTransformersModule);
      this.container.load(StoragesModule_1.storagesModule);
      this.container.load(UtilsModule_1.utilsModule);
    }
  }, {
    key: "unload",
    value: function unload() {
      this.container.unbindAll();
    }
  }], [{
    key: "getFactory",
    value: function getFactory(serviceIdentifier) {
      return function (context) {
        return function (bindingName) {
          return context.container.getNamed(serviceIdentifier, bindingName);
        };
      };
    }
  }, {
    key: "getCacheFactory",
    value: function getCacheFactory(serviceIdentifier) {
      return function (context) {
        var cache = new _map.default();
        return function (bindingName) {
          if (cache.has(bindingName)) {
            return cache.get(bindingName);
          }

          var object = context.container.getNamed(serviceIdentifier, bindingName);
          cache.set(bindingName, object);
          return object;
        };
      };
    }
  }, {
    key: "getConstructorFactory",
    value: function getConstructorFactory(serviceIdentifier) {
      for (var _len = arguments.length, dependencies = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        dependencies[_key - 1] = arguments[_key];
      }

      return function (context) {
        var cache = new _map.default();
        var cachedDependencies = [];
        return function (bindingName) {
          dependencies.forEach(function (dependency, index) {
            if (!cachedDependencies[index]) {
              cachedDependencies[index] = context.container.get(dependency);
            }
          });

          if (cache.has(bindingName)) {
            return (0, _construct2.default)(cache.get(bindingName), cachedDependencies);
          }

          var constructor = context.container.getNamed(serviceIdentifier, bindingName);
          cache.set(bindingName, constructor);
          return (0, _construct2.default)(constructor, cachedDependencies);
        };
      };
    }
  }]);
  return InversifyContainerFacade;
}();

exports.InversifyContainerFacade = InversifyContainerFacade;

/***/ }),

/***/ "./src/container/ServiceIdentifiers.ts":
/*!*********************************************!*\
  !*** ./src/container/ServiceIdentifiers.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ServiceIdentifiers;

(function (ServiceIdentifiers) {
  ServiceIdentifiers["Factory__ICalleeDataExtractor"] = "Factory<ICalleeDataExtractor>";
  ServiceIdentifiers["Factory__IControlFlowCustomNode"] = "Factory<IControlFlowCustomNode>";
  ServiceIdentifiers["Factory__IControlFlowReplacer"] = "Factory<IControlFlowReplacer>";
  ServiceIdentifiers["Factory__ICustomNode"] = "Factory<ICustomNode>";
  ServiceIdentifiers["Factory__ICustomNodeGroup"] = "Factory<ICustomNodeGroup>";
  ServiceIdentifiers["Factory__IDeadCodeInjectionCustomNode"] = "Factory<IDeadCodeInjectionCustomNode>";
  ServiceIdentifiers["Factory__IIdentifierNamesGenerator"] = "Factory<IIdentifierNamesGenerator>";
  ServiceIdentifiers["Factory__IIdentifierObfuscatingReplacer"] = "Factory<IIdentifierObfuscatingReplacer>";
  ServiceIdentifiers["Factory__INodeGuard"] = "Factory<INodeGuard>";
  ServiceIdentifiers["Factory__INodeTransformer"] = "Factory<INodeTransformer[]>";
  ServiceIdentifiers["Factory__IObfuscationResult"] = "Factory<IObfuscationResult>";
  ServiceIdentifiers["Factory__IObfuscatingReplacer"] = "Factory<IObfuscatingReplacer>";
  ServiceIdentifiers["Factory__IPropertiesExtractor"] = "Factory<IPropertiesExtractor>";
  ServiceIdentifiers["Factory__TControlFlowStorage"] = "Factory<TControlFlowStorage>";
  ServiceIdentifiers["IArrayUtils"] = "IArrayUtils";
  ServiceIdentifiers["ICalleeDataExtractor"] = "ICalleeDataExtractor";
  ServiceIdentifiers["ICryptUtils"] = "ICryptUtils";
  ServiceIdentifiers["ICustomNode"] = "ICustomNode";
  ServiceIdentifiers["ICustomNodeGroup"] = "ICustomNodeGroup";
  ServiceIdentifiers["IControlFlowReplacer"] = "IControlFlowReplacer";
  ServiceIdentifiers["IEscapeSequenceEncoder"] = "IEscapeSequenceEncoder";
  ServiceIdentifiers["IIdentifierNamesGenerator"] = "IIdentifierNamesGenerator";
  ServiceIdentifiers["IIdentifierObfuscatingReplacer"] = "IIdentifierObfuscatingReplacer";
  ServiceIdentifiers["IJavaScriptObfuscator"] = "IJavaScriptObfuscator";
  ServiceIdentifiers["ILogger"] = "ILogger";
  ServiceIdentifiers["INodeGuard"] = "INodeGuard";
  ServiceIdentifiers["INodeTransformer"] = "INodeTransformer";
  ServiceIdentifiers["IObfuscationEventEmitter"] = "IObfuscationEventEmitter";
  ServiceIdentifiers["IObfuscationResult"] = "IObfuscationResult";
  ServiceIdentifiers["IOptions"] = "IOptions";
  ServiceIdentifiers["IOptionsNormalizer"] = "IOptionsNormalizer";
  ServiceIdentifiers["IObfuscatingReplacer"] = "IObfuscatingReplacer";
  ServiceIdentifiers["IPropertiesExtractor"] = "IPropertiesExtractor";
  ServiceIdentifiers["IRandomGenerator"] = "IRandomGenerator";
  ServiceIdentifiers["ISourceCode"] = "ISourceCode";
  ServiceIdentifiers["ISourceMapCorrector"] = "ISourceMapCorrector";
  ServiceIdentifiers["IStackTraceAnalyzer"] = "IStackTraceAnalyzer";
  ServiceIdentifiers["ITransformersRunner"] = "ITransformersRunner";
  ServiceIdentifiers["Newable__ICustomNode"] = "Newable<ICustomNode>";
  ServiceIdentifiers["Newable__TControlFlowStorage"] = "Newable<TControlFlowStorage>";
  ServiceIdentifiers["TCustomNodeGroupStorage"] = "TCustomNodeGroupStorage";
  ServiceIdentifiers["TInputOptions"] = "TInputOptions";
  ServiceIdentifiers["TStringArrayStorage"] = "TStringArrayStorage";
})(ServiceIdentifiers = exports.ServiceIdentifiers || (exports.ServiceIdentifiers = {}));

/***/ }),

/***/ "./src/container/modules/analyzers/AnalyzersModule.ts":
/*!************************************************************!*\
  !*** ./src/container/modules/analyzers/AnalyzersModule.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var CalleeDataExtractor_1 = __webpack_require__(/*! ../../../enums/analyzers/stack-trace-analyzer/CalleeDataExtractor */ "./src/enums/analyzers/stack-trace-analyzer/CalleeDataExtractor.ts");

var FunctionDeclarationCalleeDataExtractor_1 = __webpack_require__(/*! ../../../analyzers/stack-trace-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor */ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor.ts");

var FunctionExpressionCalleeDataExtractor_1 = __webpack_require__(/*! ../../../analyzers/stack-trace-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor */ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor.ts");

var ObjectExpressionCalleeDataExtractor_1 = __webpack_require__(/*! ../../../analyzers/stack-trace-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor */ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor.ts");

var StackTraceAnalyzer_1 = __webpack_require__(/*! ../../../analyzers/stack-trace-analyzer/StackTraceAnalyzer */ "./src/analyzers/stack-trace-analyzer/StackTraceAnalyzer.ts");

exports.analyzersModule = new inversify_1.ContainerModule(function (bind) {
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IStackTraceAnalyzer).to(StackTraceAnalyzer_1.StackTraceAnalyzer).inSingletonScope();
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor).to(FunctionDeclarationCalleeDataExtractor_1.FunctionDeclarationCalleeDataExtractor).whenTargetNamed(CalleeDataExtractor_1.CalleeDataExtractor.FunctionDeclarationCalleeDataExtractor);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor).to(FunctionExpressionCalleeDataExtractor_1.FunctionExpressionCalleeDataExtractor).whenTargetNamed(CalleeDataExtractor_1.CalleeDataExtractor.FunctionExpressionCalleeDataExtractor);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor).to(ObjectExpressionCalleeDataExtractor_1.ObjectExpressionCalleeDataExtractor).whenTargetNamed(CalleeDataExtractor_1.CalleeDataExtractor.ObjectExpressionCalleeDataExtractor);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICalleeDataExtractor).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor));
});

/***/ }),

/***/ "./src/container/modules/custom-nodes/CustomNodesModule.ts":
/*!*****************************************************************!*\
  !*** ./src/container/modules/custom-nodes/CustomNodesModule.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var ControlFlowCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");

var CustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/CustomNode */ "./src/enums/custom-nodes/CustomNode.ts");

var CustomNodeGroup_1 = __webpack_require__(/*! ../../../enums/custom-nodes/CustomNodeGroup */ "./src/enums/custom-nodes/CustomNodeGroup.ts");

var DeadCodeInjectionCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/DeadCodeInjectionCustomNode */ "./src/enums/custom-nodes/DeadCodeInjectionCustomNode.ts");

var ConsoleOutputCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/console-output-nodes/group/ConsoleOutputCustomNodeGroup */ "./src/custom-nodes/console-output-nodes/group/ConsoleOutputCustomNodeGroup.ts");

var DebugProtectionCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/debug-protection-nodes/group/DebugProtectionCustomNodeGroup */ "./src/custom-nodes/debug-protection-nodes/group/DebugProtectionCustomNodeGroup.ts");

var DomainLockCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/domain-lock-nodes/group/DomainLockCustomNodeGroup */ "./src/custom-nodes/domain-lock-nodes/group/DomainLockCustomNodeGroup.ts");

var SelfDefendingCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/self-defending-nodes/group/SelfDefendingCustomNodeGroup */ "./src/custom-nodes/self-defending-nodes/group/SelfDefendingCustomNodeGroup.ts");

var StringArrayCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/string-array-nodes/group/StringArrayCustomNodeGroup */ "./src/custom-nodes/string-array-nodes/group/StringArrayCustomNodeGroup.ts");

var BinaryExpressionFunctionNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/BinaryExpressionFunctionNode */ "./src/custom-nodes/control-flow-flattening-nodes/BinaryExpressionFunctionNode.ts");

var BlockStatementControlFlowFlatteningNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/BlockStatementControlFlowFlatteningNode */ "./src/custom-nodes/control-flow-flattening-nodes/BlockStatementControlFlowFlatteningNode.ts");

var BlockStatementDeadCodeInjectionNode_1 = __webpack_require__(/*! ../../../custom-nodes/dead-code-injection-nodes/BlockStatementDeadCodeInjectionNode */ "./src/custom-nodes/dead-code-injection-nodes/BlockStatementDeadCodeInjectionNode.ts");

var CallExpressionControlFlowStorageCallNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode */ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode.ts");

var CallExpressionFunctionNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode */ "./src/custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode.ts");

var ControlFlowStorageNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode */ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode.ts");

var ConsoleOutputDisableExpressionNode_1 = __webpack_require__(/*! ../../../custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode */ "./src/custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode.ts");

var DebugProtectionFunctionCallNode_1 = __webpack_require__(/*! ../../../custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode */ "./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode.ts");

var DebugProtectionFunctionIntervalNode_1 = __webpack_require__(/*! ../../../custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode */ "./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode.ts");

var DebugProtectionFunctionNode_1 = __webpack_require__(/*! ../../../custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode */ "./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode.ts");

var DomainLockNode_1 = __webpack_require__(/*! ../../../custom-nodes/domain-lock-nodes/DomainLockNode */ "./src/custom-nodes/domain-lock-nodes/DomainLockNode.ts");

var ExpressionWithOperatorControlFlowStorageCallNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ExpressionWithOperatorControlFlowStorageCallNode */ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ExpressionWithOperatorControlFlowStorageCallNode.ts");

var LogicalExpressionFunctionNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/LogicalExpressionFunctionNode */ "./src/custom-nodes/control-flow-flattening-nodes/LogicalExpressionFunctionNode.ts");

var NodeCallsControllerFunctionNode_1 = __webpack_require__(/*! ../../../custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode */ "./src/custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode.ts");

var SelfDefendingUnicodeNode_1 = __webpack_require__(/*! ../../../custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode */ "./src/custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode.ts");

var StringArrayCallsWrapper_1 = __webpack_require__(/*! ../../../custom-nodes/string-array-nodes/StringArrayCallsWrapper */ "./src/custom-nodes/string-array-nodes/StringArrayCallsWrapper.ts");

var StringArrayNode_1 = __webpack_require__(/*! ../../../custom-nodes/string-array-nodes/StringArrayNode */ "./src/custom-nodes/string-array-nodes/StringArrayNode.ts");

var StringArrayRotateFunctionNode_1 = __webpack_require__(/*! ../../../custom-nodes/string-array-nodes/StringArrayRotateFunctionNode */ "./src/custom-nodes/string-array-nodes/StringArrayRotateFunctionNode.ts");

var StringLiteralControlFlowStorageCallNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/StringLiteralControlFlowStorageCallNode */ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/StringLiteralControlFlowStorageCallNode.ts");

var StringLiteralNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/StringLiteralNode */ "./src/custom-nodes/control-flow-flattening-nodes/StringLiteralNode.ts");

exports.customNodesModule = new inversify_1.ContainerModule(function (bind) {
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode).to(ConsoleOutputDisableExpressionNode_1.ConsoleOutputDisableExpressionNode).whenTargetNamed(CustomNode_1.CustomNode.ConsoleOutputDisableExpressionNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode).to(DebugProtectionFunctionCallNode_1.DebugProtectionFunctionCallNode).whenTargetNamed(CustomNode_1.CustomNode.DebugProtectionFunctionCallNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode).to(DebugProtectionFunctionIntervalNode_1.DebugProtectionFunctionIntervalNode).whenTargetNamed(CustomNode_1.CustomNode.DebugProtectionFunctionIntervalNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode).to(DebugProtectionFunctionNode_1.DebugProtectionFunctionNode).whenTargetNamed(CustomNode_1.CustomNode.DebugProtectionFunctionNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode).to(DomainLockNode_1.DomainLockNode).whenTargetNamed(CustomNode_1.CustomNode.DomainLockNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode).to(NodeCallsControllerFunctionNode_1.NodeCallsControllerFunctionNode).whenTargetNamed(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode).to(SelfDefendingUnicodeNode_1.SelfDefendingUnicodeNode).whenTargetNamed(CustomNode_1.CustomNode.SelfDefendingUnicodeNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode).to(StringArrayCallsWrapper_1.StringArrayCallsWrapper).whenTargetNamed(CustomNode_1.CustomNode.StringArrayCallsWrapper);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode).to(StringArrayNode_1.StringArrayNode).whenTargetNamed(CustomNode_1.CustomNode.StringArrayNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode).to(StringArrayRotateFunctionNode_1.StringArrayRotateFunctionNode).whenTargetNamed(CustomNode_1.CustomNode.StringArrayRotateFunctionNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(BinaryExpressionFunctionNode_1.BinaryExpressionFunctionNode).whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.BinaryExpressionFunctionNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(BlockStatementControlFlowFlatteningNode_1.BlockStatementControlFlowFlatteningNode).whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.BlockStatementControlFlowFlatteningNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(CallExpressionControlFlowStorageCallNode_1.CallExpressionControlFlowStorageCallNode).whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.CallExpressionControlFlowStorageCallNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(CallExpressionFunctionNode_1.CallExpressionFunctionNode).whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.CallExpressionFunctionNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(ControlFlowStorageNode_1.ControlFlowStorageNode).whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.ControlFlowStorageNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(ExpressionWithOperatorControlFlowStorageCallNode_1.ExpressionWithOperatorControlFlowStorageCallNode).whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.ExpressionWithOperatorControlFlowStorageCallNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(LogicalExpressionFunctionNode_1.LogicalExpressionFunctionNode).whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.LogicalExpressionFunctionNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(StringLiteralNode_1.StringLiteralNode).whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.StringLiteralNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(StringLiteralControlFlowStorageCallNode_1.StringLiteralControlFlowStorageCallNode).whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.StringLiteralControlFlowStorageCallNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(BlockStatementDeadCodeInjectionNode_1.BlockStatementDeadCodeInjectionNode).whenTargetNamed(DeadCodeInjectionCustomNode_1.DeadCodeInjectionCustomNode.BlockStatementDeadCodeInjectionNode);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(ConsoleOutputCustomNodeGroup_1.ConsoleOutputCustomNodeGroup).whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.ConsoleOutputCustomNodeGroup);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(DebugProtectionCustomNodeGroup_1.DebugProtectionCustomNodeGroup).whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.DebugProtectionCustomNodeGroup);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(DomainLockCustomNodeGroup_1.DomainLockCustomNodeGroup).whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.DomainLockCustomNodeGroup);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(SelfDefendingCustomNodeGroup_1.SelfDefendingCustomNodeGroup).whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.SelfDefendingCustomNodeGroup);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(StringArrayCustomNodeGroup_1.StringArrayCustomNodeGroup).whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.StringArrayCustomNodeGroup);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getFactory(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode));
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getConstructorFactory(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode, ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator, ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator, ServiceIdentifiers_1.ServiceIdentifiers.IOptions));
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IDeadCodeInjectionCustomNode).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getConstructorFactory(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode, ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator, ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator, ServiceIdentifiers_1.ServiceIdentifiers.IOptions));
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNodeGroup).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getFactory(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup));
});

/***/ }),

/***/ "./src/container/modules/generators/GeneratorsModule.ts":
/*!**************************************************************!*\
  !*** ./src/container/modules/generators/GeneratorsModule.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var IdentifierNamesGenerator_1 = __webpack_require__(/*! ../../../enums/generators/identifier-names-generators/IdentifierNamesGenerator */ "./src/enums/generators/identifier-names-generators/IdentifierNamesGenerator.ts");

var HexadecimalIdentifierNamesGenerator_1 = __webpack_require__(/*! ../../../generators/identifier-names-generators/HexadecimalIdentifierNamesGenerator */ "./src/generators/identifier-names-generators/HexadecimalIdentifierNamesGenerator.ts");

var MangledIdentifierNamesGenerator_1 = __webpack_require__(/*! ../../../generators/identifier-names-generators/MangledIdentifierNamesGenerator */ "./src/generators/identifier-names-generators/MangledIdentifierNamesGenerator.ts");

exports.generatorsModule = new inversify_1.ContainerModule(function (bind) {
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IIdentifierNamesGenerator).to(HexadecimalIdentifierNamesGenerator_1.HexadecimalIdentifierNamesGenerator).inSingletonScope().whenTargetNamed(IdentifierNamesGenerator_1.IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IIdentifierNamesGenerator).to(MangledIdentifierNamesGenerator_1.MangledIdentifierNamesGenerator).inSingletonScope().whenTargetNamed(IdentifierNamesGenerator_1.IdentifierNamesGenerator.MangledIdentifierNamesGenerator);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator).toFactory(function (context) {
    var cachedIdentifierNamesGenerator = null;
    return function (options) {
      if (cachedIdentifierNamesGenerator) {
        return cachedIdentifierNamesGenerator;
      }

      var identifierNamesGenerator;

      switch (options.identifierNamesGenerator) {
        case IdentifierNamesGenerator_1.IdentifierNamesGenerator.MangledIdentifierNamesGenerator:
          identifierNamesGenerator = context.container.getNamed(ServiceIdentifiers_1.ServiceIdentifiers.IIdentifierNamesGenerator, IdentifierNamesGenerator_1.IdentifierNamesGenerator.MangledIdentifierNamesGenerator);
          break;

        case IdentifierNamesGenerator_1.IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator:
        default:
          identifierNamesGenerator = context.container.getNamed(ServiceIdentifiers_1.ServiceIdentifiers.IIdentifierNamesGenerator, IdentifierNamesGenerator_1.IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator);
      }

      cachedIdentifierNamesGenerator = identifierNamesGenerator;
      return identifierNamesGenerator;
    };
  });
});

/***/ }),

/***/ "./src/container/modules/node-transformers/ControlFlowTransformersModule.ts":
/*!**********************************************************************************!*\
  !*** ./src/container/modules/node-transformers/ControlFlowTransformersModule.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var ControlFlowReplacer_1 = __webpack_require__(/*! ../../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer.ts");

var NodeTransformer_1 = __webpack_require__(/*! ../../../enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");

var BinaryExpressionControlFlowReplacer_1 = __webpack_require__(/*! ../../../node-transformers/control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer.ts");

var BlockStatementControlFlowTransformer_1 = __webpack_require__(/*! ../../../node-transformers/control-flow-transformers/BlockStatementControlFlowTransformer */ "./src/node-transformers/control-flow-transformers/BlockStatementControlFlowTransformer.ts");

var CallExpressionControlFlowReplacer_1 = __webpack_require__(/*! ../../../node-transformers/control-flow-transformers/control-flow-replacers/CallExpressionControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/CallExpressionControlFlowReplacer.ts");

var DeadCodeInjectionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer */ "./src/node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer.ts");

var FunctionControlFlowTransformer_1 = __webpack_require__(/*! ../../../node-transformers/control-flow-transformers/FunctionControlFlowTransformer */ "./src/node-transformers/control-flow-transformers/FunctionControlFlowTransformer.ts");

var LogicalExpressionControlFlowReplacer_1 = __webpack_require__(/*! ../../../node-transformers/control-flow-transformers/control-flow-replacers/LogicalExpressionControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/LogicalExpressionControlFlowReplacer.ts");

var StringLiteralControlFlowReplacer_1 = __webpack_require__(/*! ../../../node-transformers/control-flow-transformers/control-flow-replacers/StringLiteralControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/StringLiteralControlFlowReplacer.ts");

exports.controlFlowTransformersModule = new inversify_1.ContainerModule(function (bind) {
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(BlockStatementControlFlowTransformer_1.BlockStatementControlFlowTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.BlockStatementControlFlowTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(DeadCodeInjectionTransformer_1.DeadCodeInjectionTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.DeadCodeInjectionTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(FunctionControlFlowTransformer_1.FunctionControlFlowTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.FunctionControlFlowTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer).to(BinaryExpressionControlFlowReplacer_1.BinaryExpressionControlFlowReplacer).whenTargetNamed(ControlFlowReplacer_1.ControlFlowReplacer.BinaryExpressionControlFlowReplacer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer).to(CallExpressionControlFlowReplacer_1.CallExpressionControlFlowReplacer).whenTargetNamed(ControlFlowReplacer_1.ControlFlowReplacer.CallExpressionControlFlowReplacer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer).to(LogicalExpressionControlFlowReplacer_1.LogicalExpressionControlFlowReplacer).whenTargetNamed(ControlFlowReplacer_1.ControlFlowReplacer.LogicalExpressionControlFlowReplacer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer).to(StringLiteralControlFlowReplacer_1.StringLiteralControlFlowReplacer).whenTargetNamed(ControlFlowReplacer_1.ControlFlowReplacer.StringLiteralControlFlowReplacer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowReplacer).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer));
});

/***/ }),

/***/ "./src/container/modules/node-transformers/ConvertingTransformersModule.ts":
/*!*********************************************************************************!*\
  !*** ./src/container/modules/node-transformers/ConvertingTransformersModule.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var NodeTransformer_1 = __webpack_require__(/*! ../../../enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");

var PropertiesExtractor_1 = __webpack_require__(/*! ../../../enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor */ "./src/enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor.ts");

var AssignmentExpressionPropertiesExtractor_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/properties-extractors/AssignmentExpressionPropertiesExtractor */ "./src/node-transformers/converting-transformers/properties-extractors/AssignmentExpressionPropertiesExtractor.ts");

var MemberExpressionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/MemberExpressionTransformer */ "./src/node-transformers/converting-transformers/MemberExpressionTransformer.ts");

var MethodDefinitionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/MethodDefinitionTransformer */ "./src/node-transformers/converting-transformers/MethodDefinitionTransformer.ts");

var ObjectExpressionKeysTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/ObjectExpressionKeysTransformer */ "./src/node-transformers/converting-transformers/ObjectExpressionKeysTransformer.ts");

var ObjectExpressionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/ObjectExpressionTransformer */ "./src/node-transformers/converting-transformers/ObjectExpressionTransformer.ts");

var TemplateLiteralTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/TemplateLiteralTransformer */ "./src/node-transformers/converting-transformers/TemplateLiteralTransformer.ts");

var VariableDeclaratorPropertiesExtractor_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/properties-extractors/VariableDeclaratorPropertiesExtractor */ "./src/node-transformers/converting-transformers/properties-extractors/VariableDeclaratorPropertiesExtractor.ts");

exports.convertingTransformersModule = new inversify_1.ContainerModule(function (bind) {
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(MemberExpressionTransformer_1.MemberExpressionTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.MemberExpressionTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(MethodDefinitionTransformer_1.MethodDefinitionTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.MethodDefinitionTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(ObjectExpressionKeysTransformer_1.ObjectExpressionKeysTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.ObjectExpressionKeysTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(ObjectExpressionTransformer_1.ObjectExpressionTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.ObjectExpressionTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(TemplateLiteralTransformer_1.TemplateLiteralTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.TemplateLiteralTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IPropertiesExtractor).to(AssignmentExpressionPropertiesExtractor_1.AssignmentExpressionPropertiesExtractor).whenTargetNamed(PropertiesExtractor_1.PropertiesExtractor.AssignmentExpressionPropertiesExtractor);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IPropertiesExtractor).to(VariableDeclaratorPropertiesExtractor_1.VariableDeclaratorPropertiesExtractor).whenTargetNamed(PropertiesExtractor_1.PropertiesExtractor.VariableDeclaratorPropertiesExtractor);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IPropertiesExtractor).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.IPropertiesExtractor));
});

/***/ }),

/***/ "./src/container/modules/node-transformers/FinalizingTransformersModule.ts":
/*!*********************************************************************************!*\
  !*** ./src/container/modules/node-transformers/FinalizingTransformersModule.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

exports.finalizingTransformersModule = new inversify_1.ContainerModule(function (bind) {});

/***/ }),

/***/ "./src/container/modules/node-transformers/NodeTransformersModule.ts":
/*!***************************************************************************!*\
  !*** ./src/container/modules/node-transformers/NodeTransformersModule.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

exports.nodeTransformersModule = new inversify_1.ContainerModule(function (bind) {
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeTransformer).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer));
});

/***/ }),

/***/ "./src/container/modules/node-transformers/ObfuscatingTransformersModule.ts":
/*!**********************************************************************************!*\
  !*** ./src/container/modules/node-transformers/ObfuscatingTransformersModule.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");

var LiteralObfuscatingReplacer_1 = __webpack_require__(/*! ../../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer.ts");

var NodeTransformer_1 = __webpack_require__(/*! ../../../enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");

var BaseIdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/obfuscating-replacers/identifier-obfuscating-replacers/BaseIdentifierObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/identifier-obfuscating-replacers/BaseIdentifierObfuscatingReplacer.ts");

var BooleanLiteralObfuscatingReplacer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/BooleanLiteralObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/BooleanLiteralObfuscatingReplacer.ts");

var CatchClauseTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/CatchClauseTransformer */ "./src/node-transformers/obfuscating-transformers/CatchClauseTransformer.ts");

var ClassDeclarationTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/ClassDeclarationTransformer */ "./src/node-transformers/obfuscating-transformers/ClassDeclarationTransformer.ts");

var FunctionDeclarationTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/FunctionDeclarationTransformer */ "./src/node-transformers/obfuscating-transformers/FunctionDeclarationTransformer.ts");

var FunctionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/FunctionTransformer */ "./src/node-transformers/obfuscating-transformers/FunctionTransformer.ts");

var ImportDeclarationTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/ImportDeclarationTransformer */ "./src/node-transformers/obfuscating-transformers/ImportDeclarationTransformer.ts");

var LabeledStatementTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/LabeledStatementTransformer */ "./src/node-transformers/obfuscating-transformers/LabeledStatementTransformer.ts");

var LiteralTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/LiteralTransformer */ "./src/node-transformers/obfuscating-transformers/LiteralTransformer.ts");

var NumberLiteralObfuscatingReplacer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/NumberLiteralObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/NumberLiteralObfuscatingReplacer.ts");

var StringLiteralObfuscatingReplacer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/StringLiteralObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/StringLiteralObfuscatingReplacer.ts");

var VariableDeclarationTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/VariableDeclarationTransformer */ "./src/node-transformers/obfuscating-transformers/VariableDeclarationTransformer.ts");

exports.obfuscatingTransformersModule = new inversify_1.ContainerModule(function (bind) {
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(CatchClauseTransformer_1.CatchClauseTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.CatchClauseTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(ClassDeclarationTransformer_1.ClassDeclarationTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.ClassDeclarationTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(FunctionDeclarationTransformer_1.FunctionDeclarationTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.FunctionDeclarationTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(FunctionTransformer_1.FunctionTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.FunctionTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(ImportDeclarationTransformer_1.ImportDeclarationTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.ImportDeclarationTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(LabeledStatementTransformer_1.LabeledStatementTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.LabeledStatementTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(LiteralTransformer_1.LiteralTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.LiteralTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(VariableDeclarationTransformer_1.VariableDeclarationTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.VariableDeclarationTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatingReplacer).to(BooleanLiteralObfuscatingReplacer_1.BooleanLiteralObfuscatingReplacer).whenTargetNamed(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.BooleanLiteralObfuscatingReplacer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatingReplacer).to(NumberLiteralObfuscatingReplacer_1.NumberLiteralObfuscatingReplacer).whenTargetNamed(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.NumberLiteralObfuscatingReplacer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatingReplacer).to(StringLiteralObfuscatingReplacer_1.StringLiteralObfuscatingReplacer).whenTargetNamed(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.StringLiteralObfuscatingReplacer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IIdentifierObfuscatingReplacer).to(BaseIdentifierObfuscatingReplacer_1.BaseIdentifierObfuscatingReplacer).whenTargetNamed(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatingReplacer).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatingReplacer));
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.IIdentifierObfuscatingReplacer));
});

/***/ }),

/***/ "./src/container/modules/node-transformers/PreparingTransformersModule.ts":
/*!********************************************************************************!*\
  !*** ./src/container/modules/node-transformers/PreparingTransformersModule.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var NodeTransformer_1 = __webpack_require__(/*! ../../../enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");

var ObfuscatingGuard_1 = __webpack_require__(/*! ../../../enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard */ "./src/enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard.ts");

var BlackListObfuscatingGuard_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/obfuscating-guards/BlackListObfuscatingGuard */ "./src/node-transformers/preparing-transformers/obfuscating-guards/BlackListObfuscatingGuard.ts");

var CommentsTransformer_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/CommentsTransformer */ "./src/node-transformers/preparing-transformers/CommentsTransformer.ts");

var ConditionalCommentObfuscatingGuard_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/obfuscating-guards/ConditionalCommentObfuscatingGuard */ "./src/node-transformers/preparing-transformers/obfuscating-guards/ConditionalCommentObfuscatingGuard.ts");

var CustomNodesTransformer_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/CustomNodesTransformer */ "./src/node-transformers/preparing-transformers/CustomNodesTransformer.ts");

var EvaCallExpressionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/EvaCallExpressionTransformer */ "./src/node-transformers/preparing-transformers/EvaCallExpressionTransformer.ts");

var MetadataTransformer_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/MetadataTransformer */ "./src/node-transformers/preparing-transformers/MetadataTransformer.ts");

var ObfuscatingGuardsTransformer_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/ObfuscatingGuardsTransformer */ "./src/node-transformers/preparing-transformers/ObfuscatingGuardsTransformer.ts");

var ParentificationTransformer_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/ParentificationTransformer */ "./src/node-transformers/preparing-transformers/ParentificationTransformer.ts");

exports.preparingTransformersModule = new inversify_1.ContainerModule(function (bind) {
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(CommentsTransformer_1.CommentsTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.CommentsTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(CustomNodesTransformer_1.CustomNodesTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.CustomNodesTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(EvaCallExpressionTransformer_1.EvalCallExpressionTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.EvalCallExpressionTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(MetadataTransformer_1.MetadataTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.MetadataTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(ObfuscatingGuardsTransformer_1.ObfuscatingGuardsTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.ObfuscatingGuardsTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(ParentificationTransformer_1.ParentificationTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.ParentificationTransformer);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeGuard).to(BlackListObfuscatingGuard_1.BlackListObfuscatingGuard).inSingletonScope().whenTargetNamed(ObfuscatingGuard_1.ObfuscatingGuard.BlackListNodeGuard);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeGuard).to(ConditionalCommentObfuscatingGuard_1.ConditionalCommentObfuscatingGuard).inSingletonScope().whenTargetNamed(ObfuscatingGuard_1.ObfuscatingGuard.ConditionalCommentNodeGuard);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeGuard).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.INodeGuard));
});

/***/ }),

/***/ "./src/container/modules/options/OptionsModule.ts":
/*!********************************************************!*\
  !*** ./src/container/modules/options/OptionsModule.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Options_1 = __webpack_require__(/*! ../../../options/Options */ "./src/options/Options.ts");

var OptionsNormalizer_1 = __webpack_require__(/*! ../../../options/OptionsNormalizer */ "./src/options/OptionsNormalizer.ts");

exports.optionsModule = new inversify_1.ContainerModule(function (bind) {
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IOptions).to(Options_1.Options).inSingletonScope();
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IOptionsNormalizer).to(OptionsNormalizer_1.OptionsNormalizer).inSingletonScope();
});

/***/ }),

/***/ "./src/container/modules/storages/StoragesModule.ts":
/*!**********************************************************!*\
  !*** ./src/container/modules/storages/StoragesModule.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var ControlFlowStorage_1 = __webpack_require__(/*! ../../../storages/control-flow/ControlFlowStorage */ "./src/storages/control-flow/ControlFlowStorage.ts");

var CustomNodeGroupStorage_1 = __webpack_require__(/*! ../../../storages/custom-node-group/CustomNodeGroupStorage */ "./src/storages/custom-node-group/CustomNodeGroupStorage.ts");

var StringArrayStorage_1 = __webpack_require__(/*! ../../../storages/string-array/StringArrayStorage */ "./src/storages/string-array/StringArrayStorage.ts");

exports.storagesModule = new inversify_1.ContainerModule(function (bind) {
  bind(ServiceIdentifiers_1.ServiceIdentifiers.TCustomNodeGroupStorage).to(CustomNodeGroupStorage_1.CustomNodeGroupStorage).inSingletonScope();
  bind(ServiceIdentifiers_1.ServiceIdentifiers.TStringArrayStorage).to(StringArrayStorage_1.StringArrayStorage).inSingletonScope();
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__TControlFlowStorage).toConstructor(ControlFlowStorage_1.ControlFlowStorage);
  bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__TControlFlowStorage).toFactory(function (context) {
    return function () {
      var constructor = context.container.get(ServiceIdentifiers_1.ServiceIdentifiers.Newable__TControlFlowStorage);
      var randomGenerator = context.container.get(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator);
      var options = context.container.get(ServiceIdentifiers_1.ServiceIdentifiers.IOptions);
      var storage = new constructor(randomGenerator, options);
      storage.initialize();
      return storage;
    };
  });
});

/***/ }),

/***/ "./src/container/modules/utils/UtilsModule.ts":
/*!****************************************************!*\
  !*** ./src/container/modules/utils/UtilsModule.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var ArrayUtils_1 = __webpack_require__(/*! ../../../utils/ArrayUtils */ "./src/utils/ArrayUtils.ts");

var CryptUtils_1 = __webpack_require__(/*! ../../../utils/CryptUtils */ "./src/utils/CryptUtils.ts");

var EscapeSequenceEncoder_1 = __webpack_require__(/*! ../../../utils/EscapeSequenceEncoder */ "./src/utils/EscapeSequenceEncoder.ts");

var RandomGenerator_1 = __webpack_require__(/*! ../../../utils/RandomGenerator */ "./src/utils/RandomGenerator.ts");

exports.utilsModule = new inversify_1.ContainerModule(function (bind) {
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IArrayUtils).to(ArrayUtils_1.ArrayUtils).inSingletonScope();
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator).to(RandomGenerator_1.RandomGenerator).inSingletonScope();
  bind(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils).to(CryptUtils_1.CryptUtils).inSingletonScope();
  bind(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder).to(EscapeSequenceEncoder_1.EscapeSequenceEncoder).inSingletonScope();
});

/***/ }),

/***/ "./src/custom-nodes/AbstractCustomNode.ts":
/*!************************************************!*\
  !*** ./src/custom-nodes/AbstractCustomNode.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var AbstractCustomNode_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var GlobalVariableTemplate1_1 = __webpack_require__(/*! ../templates/GlobalVariableTemplate1 */ "./src/templates/GlobalVariableTemplate1.ts");

var GlobalVariableTemplate2_1 = __webpack_require__(/*! ../templates/GlobalVariableTemplate2 */ "./src/templates/GlobalVariableTemplate2.ts");

var AbstractCustomNode = AbstractCustomNode_1 =
/*#__PURE__*/
function () {
  function AbstractCustomNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, AbstractCustomNode);
    this.cachedNode = null;
    this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
    this.randomGenerator = randomGenerator;
    this.options = options;
  }

  (0, _createClass2.default)(AbstractCustomNode, [{
    key: "getNode",
    value: function getNode() {
      if (!this.cachedNode) {
        this.cachedNode = this.getNodeStructure();
      }

      return this.cachedNode;
    }
  }, {
    key: "getGlobalVariableTemplate",
    value: function getGlobalVariableTemplate() {
      return this.randomGenerator.getRandomGenerator().pickone(AbstractCustomNode_1.globalVariableTemplateFunctions);
    }
  }]);
  return AbstractCustomNode;
}();

AbstractCustomNode.globalVariableTemplateFunctions = [GlobalVariableTemplate1_1.GlobalVariableTemplate1(), GlobalVariableTemplate2_1.GlobalVariableTemplate2()];
AbstractCustomNode = AbstractCustomNode_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], AbstractCustomNode);
exports.AbstractCustomNode = AbstractCustomNode;

/***/ }),

/***/ "./src/custom-nodes/AbstractCustomNodeGroup.ts":
/*!*****************************************************!*\
  !*** ./src/custom-nodes/AbstractCustomNodeGroup.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var AbstractCustomNodeGroup =
/*#__PURE__*/
function () {
  function AbstractCustomNodeGroup(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, AbstractCustomNodeGroup);
    this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
    this.randomGenerator = randomGenerator;
    this.options = options;
  }

  (0, _createClass2.default)(AbstractCustomNodeGroup, [{
    key: "getAppendEvent",
    value: function getAppendEvent() {
      return this.appendEvent;
    }
  }, {
    key: "getCustomNodes",
    value: function getCustomNodes() {
      return this.customNodes;
    }
  }, {
    key: "appendCustomNodeIfExist",
    value: function appendCustomNodeIfExist(customNodeName, callback) {
      var customNode = this.customNodes.get(customNodeName);

      if (!customNode) {
        return;
      }

      callback(customNode);
    }
  }, {
    key: "getRandomStackTraceIndex",
    value: function getRandomStackTraceIndex(stackTraceLength) {
      return this.randomGenerator.getRandomInteger(0, Math.max(0, Math.round(stackTraceLength - 1)));
    }
  }]);
  return AbstractCustomNodeGroup;
}();

AbstractCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], AbstractCustomNodeGroup);
exports.AbstractCustomNodeGroup = AbstractCustomNodeGroup;

/***/ }),

/***/ "./src/custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode.ts":
/*!*************************************************************************************!*\
  !*** ./src/custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode.ts ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));

var ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");

var ConsoleOutputDisableExpressionTemplate_1 = __webpack_require__(/*! ../../templates/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate */ "./src/templates/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate.ts");

var GlobalVariableNoEvalTemplate_1 = __webpack_require__(/*! ../../templates/GlobalVariableNoEvalTemplate */ "./src/templates/GlobalVariableNoEvalTemplate.ts");

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var ConsoleOutputDisableExpressionNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(ConsoleOutputDisableExpressionNode, _AbstractCustomNode_);

  function ConsoleOutputDisableExpressionNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, ConsoleOutputDisableExpressionNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConsoleOutputDisableExpressionNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(ConsoleOutputDisableExpressionNode, [{
    key: "initialize",
    value: function initialize(callsControllerFunctionName) {
      this.callsControllerFunctionName = callsControllerFunctionName;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var globalVariableTemplate = this.options.target !== ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval ? this.getGlobalVariableTemplate() : GlobalVariableNoEvalTemplate_1.GlobalVariableNoEvalTemplate();
      return string_template_1.default(ConsoleOutputDisableExpressionTemplate_1.ConsoleOutputDisableExpressionTemplate(), {
        consoleLogDisableFunctionName: this.identifierNamesGenerator.generate(),
        globalVariableTemplate: globalVariableTemplate,
        singleNodeCallControllerFunctionName: this.callsControllerFunctionName
      });
    }
  }]);
  return ConsoleOutputDisableExpressionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], ConsoleOutputDisableExpressionNode.prototype, "callsControllerFunctionName", void 0);

ConsoleOutputDisableExpressionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], ConsoleOutputDisableExpressionNode);
exports.ConsoleOutputDisableExpressionNode = ConsoleOutputDisableExpressionNode;

/***/ }),

/***/ "./src/custom-nodes/console-output-nodes/group/ConsoleOutputCustomNodeGroup.ts":
/*!*************************************************************************************!*\
  !*** ./src/custom-nodes/console-output-nodes/group/ConsoleOutputCustomNodeGroup.ts ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var CustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/CustomNode */ "./src/enums/custom-nodes/CustomNode.ts");

var ObfuscationEvent_1 = __webpack_require__(/*! ../../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");

var AbstractCustomNodeGroup_1 = __webpack_require__(/*! ../../AbstractCustomNodeGroup */ "./src/custom-nodes/AbstractCustomNodeGroup.ts");

var NodeAppender_1 = __webpack_require__(/*! ../../../node/NodeAppender */ "./src/node/NodeAppender.ts");

var ConsoleOutputCustomNodeGroup =
/*#__PURE__*/
function (_AbstractCustomNodeGr) {
  (0, _inherits2.default)(ConsoleOutputCustomNodeGroup, _AbstractCustomNodeGr);

  function ConsoleOutputCustomNodeGroup(customNodeFactory, identifierNamesGeneratorFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, ConsoleOutputCustomNodeGroup);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConsoleOutputCustomNodeGroup).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
    _this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.BeforeObfuscation;
    _this.customNodeFactory = customNodeFactory;
    return _this;
  }

  (0, _createClass2.default)(ConsoleOutputCustomNodeGroup, [{
    key: "appendCustomNodes",
    value: function appendCustomNodes(blockScopeNode, stackTraceData) {
      var randomStackTraceIndex = this.getRandomStackTraceIndex(stackTraceData.length);
      this.appendCustomNodeIfExist(CustomNode_1.CustomNode.ConsoleOutputDisableExpressionNode, function (customNode) {
        NodeAppender_1.NodeAppender.appendToOptimalBlockScope(stackTraceData, blockScopeNode, customNode.getNode(), randomStackTraceIndex);
      });
      this.appendCustomNodeIfExist(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, function (customNode) {
        var targetBlockScope;

        if (stackTraceData.length) {
          targetBlockScope = NodeAppender_1.NodeAppender.getOptimalBlockScope(stackTraceData, randomStackTraceIndex, 1);
        } else {
          targetBlockScope = blockScopeNode;
        }

        NodeAppender_1.NodeAppender.prepend(targetBlockScope, customNode.getNode());
      });
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.customNodes = new _map.default();

      if (!this.options.disableConsoleOutput) {
        return;
      }

      var callsControllerFunctionName = this.identifierNamesGenerator.generate();
      var consoleOutputDisableExpressionNode = this.customNodeFactory(CustomNode_1.CustomNode.ConsoleOutputDisableExpressionNode);
      var nodeCallsControllerFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode);
      consoleOutputDisableExpressionNode.initialize(callsControllerFunctionName);
      nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);
      this.customNodes.set(CustomNode_1.CustomNode.ConsoleOutputDisableExpressionNode, consoleOutputDisableExpressionNode);
      this.customNodes.set(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
    }
  }]);
  return ConsoleOutputCustomNodeGroup;
}(AbstractCustomNodeGroup_1.AbstractCustomNodeGroup);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", _map.default)], ConsoleOutputCustomNodeGroup.prototype, "customNodes", void 0);

ConsoleOutputCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Function, Object, Object])], ConsoleOutputCustomNodeGroup);
exports.ConsoleOutputCustomNodeGroup = ConsoleOutputCustomNodeGroup;

/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/BinaryExpressionFunctionNode.ts":
/*!****************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/BinaryExpressionFunctionNode.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var BinaryExpressionFunctionNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(BinaryExpressionFunctionNode, _AbstractCustomNode_);

  function BinaryExpressionFunctionNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, BinaryExpressionFunctionNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BinaryExpressionFunctionNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(BinaryExpressionFunctionNode, [{
    key: "initialize",
    value: function initialize(operator) {
      this.operator = operator;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      var structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.functionExpressionNode([NodeFactory_1.NodeFactory.identifierNode('x'), NodeFactory_1.NodeFactory.identifierNode('y')], NodeFactory_1.NodeFactory.blockStatementNode([NodeFactory_1.NodeFactory.returnStatementNode(NodeFactory_1.NodeFactory.binaryExpressionNode(this.operator, NodeFactory_1.NodeFactory.identifierNode('x'), NodeFactory_1.NodeFactory.identifierNode('y')))])));
      NodeUtils_1.NodeUtils.parentizeAst(structure);
      return [structure];
    }
  }]);
  return BinaryExpressionFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], BinaryExpressionFunctionNode.prototype, "operator", void 0);

BinaryExpressionFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], BinaryExpressionFunctionNode);
exports.BinaryExpressionFunctionNode = BinaryExpressionFunctionNode;

/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/BlockStatementControlFlowFlatteningNode.ts":
/*!***************************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/BlockStatementControlFlowFlatteningNode.ts ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var BlockStatementControlFlowFlatteningNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(BlockStatementControlFlowFlatteningNode, _AbstractCustomNode_);

  function BlockStatementControlFlowFlatteningNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, BlockStatementControlFlowFlatteningNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockStatementControlFlowFlatteningNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(BlockStatementControlFlowFlatteningNode, [{
    key: "initialize",
    value: function initialize(blockStatementBody, shuffledKeys, originalKeysIndexesInShuffledArray) {
      this.blockStatementBody = blockStatementBody;
      this.shuffledKeys = shuffledKeys;
      this.originalKeysIndexesInShuffledArray = originalKeysIndexesInShuffledArray;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      var _this = this;

      var controllerIdentifierName = this.randomGenerator.getRandomString(6);
      var indexIdentifierName = this.randomGenerator.getRandomString(6);
      var structure = NodeFactory_1.NodeFactory.blockStatementNode([NodeFactory_1.NodeFactory.variableDeclarationNode([NodeFactory_1.NodeFactory.variableDeclaratorNode(NodeFactory_1.NodeFactory.identifierNode(controllerIdentifierName), NodeFactory_1.NodeFactory.callExpressionNode(NodeFactory_1.NodeFactory.memberExpressionNode(NodeFactory_1.NodeFactory.literalNode(this.originalKeysIndexesInShuffledArray.join('|')), NodeFactory_1.NodeFactory.identifierNode('split')), [NodeFactory_1.NodeFactory.literalNode('|')])), NodeFactory_1.NodeFactory.variableDeclaratorNode(NodeFactory_1.NodeFactory.identifierNode(indexIdentifierName), NodeFactory_1.NodeFactory.literalNode(0))]), NodeFactory_1.NodeFactory.whileStatementNode(NodeFactory_1.NodeFactory.literalNode(true), NodeFactory_1.NodeFactory.blockStatementNode([NodeFactory_1.NodeFactory.switchStatementNode(NodeFactory_1.NodeFactory.memberExpressionNode(NodeFactory_1.NodeFactory.identifierNode(controllerIdentifierName), NodeFactory_1.NodeFactory.updateExpressionNode('++', NodeFactory_1.NodeFactory.identifierNode(indexIdentifierName)), true), this.shuffledKeys.map(function (key, index) {
        var statement = _this.blockStatementBody[key];
        var consequent = [statement];

        if (!NodeGuards_1.NodeGuards.isReturnStatementNode(statement)) {
          consequent.push(NodeFactory_1.NodeFactory.continueStatement());
        }

        return NodeFactory_1.NodeFactory.switchCaseNode(NodeFactory_1.NodeFactory.literalNode(String(index)), consequent);
      })), NodeFactory_1.NodeFactory.breakStatement()]))]);
      NodeUtils_1.NodeUtils.parentizeAst(structure);
      return [structure];
    }
  }]);
  return BlockStatementControlFlowFlatteningNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Array)], BlockStatementControlFlowFlatteningNode.prototype, "blockStatementBody", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Array)], BlockStatementControlFlowFlatteningNode.prototype, "originalKeysIndexesInShuffledArray", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Array)], BlockStatementControlFlowFlatteningNode.prototype, "shuffledKeys", void 0);

BlockStatementControlFlowFlatteningNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], BlockStatementControlFlowFlatteningNode);
exports.BlockStatementControlFlowFlatteningNode = BlockStatementControlFlowFlatteningNode;

/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode.ts":
/*!**************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode.ts ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var CallExpressionFunctionNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(CallExpressionFunctionNode, _AbstractCustomNode_);

  function CallExpressionFunctionNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, CallExpressionFunctionNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CallExpressionFunctionNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(CallExpressionFunctionNode, [{
    key: "initialize",
    value: function initialize(expressionArguments) {
      this.expressionArguments = expressionArguments;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      var calleeIdentifier = NodeFactory_1.NodeFactory.identifierNode('callee');
      var params = [];
      var argumentsLength = this.expressionArguments.length;

      for (var i = 0; i < argumentsLength; i++) {
        params.push(NodeFactory_1.NodeFactory.identifierNode("param".concat(i + 1)));
      }

      var structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.functionExpressionNode([calleeIdentifier].concat(params), NodeFactory_1.NodeFactory.blockStatementNode([NodeFactory_1.NodeFactory.returnStatementNode(NodeFactory_1.NodeFactory.callExpressionNode(calleeIdentifier, params))])));
      NodeUtils_1.NodeUtils.parentizeAst(structure);
      return [structure];
    }
  }]);
  return CallExpressionFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Array)], CallExpressionFunctionNode.prototype, "expressionArguments", void 0);

CallExpressionFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], CallExpressionFunctionNode);
exports.CallExpressionFunctionNode = CallExpressionFunctionNode;

/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/LogicalExpressionFunctionNode.ts":
/*!*****************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/LogicalExpressionFunctionNode.ts ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var LogicalExpressionFunctionNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(LogicalExpressionFunctionNode, _AbstractCustomNode_);

  function LogicalExpressionFunctionNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, LogicalExpressionFunctionNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LogicalExpressionFunctionNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(LogicalExpressionFunctionNode, [{
    key: "initialize",
    value: function initialize(operator) {
      this.operator = operator;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      var structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.functionExpressionNode([NodeFactory_1.NodeFactory.identifierNode('x'), NodeFactory_1.NodeFactory.identifierNode('y')], NodeFactory_1.NodeFactory.blockStatementNode([NodeFactory_1.NodeFactory.returnStatementNode(NodeFactory_1.NodeFactory.logicalExpressionNode(this.operator, NodeFactory_1.NodeFactory.identifierNode('x'), NodeFactory_1.NodeFactory.identifierNode('y')))])));
      NodeUtils_1.NodeUtils.parentizeAst(structure);
      return [structure];
    }
  }]);
  return LogicalExpressionFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], LogicalExpressionFunctionNode.prototype, "operator", void 0);

LogicalExpressionFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], LogicalExpressionFunctionNode);
exports.LogicalExpressionFunctionNode = LogicalExpressionFunctionNode;

/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/StringLiteralNode.ts":
/*!*****************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/StringLiteralNode.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var StringLiteralNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(StringLiteralNode, _AbstractCustomNode_);

  function StringLiteralNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, StringLiteralNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StringLiteralNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(StringLiteralNode, [{
    key: "initialize",
    value: function initialize(literalValue) {
      this.literalValue = literalValue;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      var structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.literalNode(this.literalValue));
      return [structure];
    }
  }]);
  return StringLiteralNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], StringLiteralNode.prototype, "literalValue", void 0);

StringLiteralNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], StringLiteralNode);
exports.StringLiteralNode = StringLiteralNode;

/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode.ts":
/*!*******************************************************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode.ts ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var CallExpressionControlFlowStorageCallNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(CallExpressionControlFlowStorageCallNode, _AbstractCustomNode_);

  function CallExpressionControlFlowStorageCallNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, CallExpressionControlFlowStorageCallNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CallExpressionControlFlowStorageCallNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(CallExpressionControlFlowStorageCallNode, [{
    key: "initialize",
    value: function initialize(controlFlowStorageName, controlFlowStorageKey, callee, expressionArguments) {
      this.controlFlowStorageName = controlFlowStorageName;
      this.controlFlowStorageKey = controlFlowStorageKey;
      this.callee = callee;
      this.expressionArguments = expressionArguments;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      var structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.callExpressionNode(NodeFactory_1.NodeFactory.memberExpressionNode(NodeFactory_1.NodeFactory.identifierNode(this.controlFlowStorageName), NodeFactory_1.NodeFactory.identifierNode(this.controlFlowStorageKey)), [this.callee].concat((0, _toConsumableArray2.default)(this.expressionArguments))));
      NodeUtils_1.NodeUtils.parentizeAst(structure);
      return [structure];
    }
  }]);
  return CallExpressionControlFlowStorageCallNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], CallExpressionControlFlowStorageCallNode.prototype, "callee", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], CallExpressionControlFlowStorageCallNode.prototype, "controlFlowStorageKey", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], CallExpressionControlFlowStorageCallNode.prototype, "controlFlowStorageName", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Array)], CallExpressionControlFlowStorageCallNode.prototype, "expressionArguments", void 0);

CallExpressionControlFlowStorageCallNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], CallExpressionControlFlowStorageCallNode);
exports.CallExpressionControlFlowStorageCallNode = CallExpressionControlFlowStorageCallNode;

/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode.ts ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray"));

var _from = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/array/from */ "@babel/runtime/core-js/array/from"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var ControlFlowStorageNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(ControlFlowStorageNode, _AbstractCustomNode_);

  function ControlFlowStorageNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, ControlFlowStorageNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ControlFlowStorageNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(ControlFlowStorageNode, [{
    key: "initialize",
    value: function initialize(controlFlowStorage) {
      this.controlFlowStorage = controlFlowStorage;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      var propertyNodes = (0, _from.default)(this.controlFlowStorage.getStorage()).map(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        var node = value.getNode()[0];

        if (!NodeGuards_1.NodeGuards.isExpressionStatementNode(node)) {
          throw new Error('Function node for control flow storage object should be passed inside the `ExpressionStatement` node!');
        }

        return NodeFactory_1.NodeFactory.propertyNode(NodeFactory_1.NodeFactory.identifierNode(key), node.expression);
      });
      var structure = NodeFactory_1.NodeFactory.variableDeclarationNode([NodeFactory_1.NodeFactory.variableDeclaratorNode(NodeFactory_1.NodeFactory.identifierNode(this.controlFlowStorage.getStorageId()), NodeFactory_1.NodeFactory.objectExpressionNode(propertyNodes))]);
      structure = NodeUtils_1.NodeUtils.parentizeAst(structure);
      return [structure];
    }
  }]);
  return ControlFlowStorageNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], ControlFlowStorageNode.prototype, "controlFlowStorage", void 0);

ControlFlowStorageNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], ControlFlowStorageNode);
exports.ControlFlowStorageNode = ControlFlowStorageNode;

/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ExpressionWithOperatorControlFlowStorageCallNode.ts":
/*!***************************************************************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ExpressionWithOperatorControlFlowStorageCallNode.ts ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var ExpressionWithOperatorControlFlowStorageCallNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(ExpressionWithOperatorControlFlowStorageCallNode, _AbstractCustomNode_);

  function ExpressionWithOperatorControlFlowStorageCallNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, ExpressionWithOperatorControlFlowStorageCallNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ExpressionWithOperatorControlFlowStorageCallNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(ExpressionWithOperatorControlFlowStorageCallNode, [{
    key: "initialize",
    value: function initialize(controlFlowStorageName, controlFlowStorageKey, leftValue, rightValue) {
      this.controlFlowStorageName = controlFlowStorageName;
      this.controlFlowStorageKey = controlFlowStorageKey;
      this.leftValue = leftValue;
      this.rightValue = rightValue;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      var structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.callExpressionNode(NodeFactory_1.NodeFactory.memberExpressionNode(NodeFactory_1.NodeFactory.identifierNode(this.controlFlowStorageName), NodeFactory_1.NodeFactory.identifierNode(this.controlFlowStorageKey)), [this.leftValue, this.rightValue]));
      NodeUtils_1.NodeUtils.parentizeAst(structure);
      return [structure];
    }
  }]);
  return ExpressionWithOperatorControlFlowStorageCallNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], ExpressionWithOperatorControlFlowStorageCallNode.prototype, "controlFlowStorageKey", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], ExpressionWithOperatorControlFlowStorageCallNode.prototype, "controlFlowStorageName", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], ExpressionWithOperatorControlFlowStorageCallNode.prototype, "leftValue", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], ExpressionWithOperatorControlFlowStorageCallNode.prototype, "rightValue", void 0);

ExpressionWithOperatorControlFlowStorageCallNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], ExpressionWithOperatorControlFlowStorageCallNode);
exports.ExpressionWithOperatorControlFlowStorageCallNode = ExpressionWithOperatorControlFlowStorageCallNode;

/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/StringLiteralControlFlowStorageCallNode.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/StringLiteralControlFlowStorageCallNode.ts ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var StringLiteralControlFlowStorageCallNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(StringLiteralControlFlowStorageCallNode, _AbstractCustomNode_);

  function StringLiteralControlFlowStorageCallNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, StringLiteralControlFlowStorageCallNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StringLiteralControlFlowStorageCallNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(StringLiteralControlFlowStorageCallNode, [{
    key: "initialize",
    value: function initialize(controlFlowStorageName, controlFlowStorageKey) {
      this.controlFlowStorageName = controlFlowStorageName;
      this.controlFlowStorageKey = controlFlowStorageKey;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      var structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.memberExpressionNode(NodeFactory_1.NodeFactory.identifierNode(this.controlFlowStorageName), NodeFactory_1.NodeFactory.identifierNode(this.controlFlowStorageKey)));
      NodeUtils_1.NodeUtils.parentizeAst(structure);
      return [structure];
    }
  }]);
  return StringLiteralControlFlowStorageCallNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], StringLiteralControlFlowStorageCallNode.prototype, "controlFlowStorageKey", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], StringLiteralControlFlowStorageCallNode.prototype, "controlFlowStorageName", void 0);

StringLiteralControlFlowStorageCallNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], StringLiteralControlFlowStorageCallNode);
exports.StringLiteralControlFlowStorageCallNode = StringLiteralControlFlowStorageCallNode;

/***/ }),

/***/ "./src/custom-nodes/dead-code-injection-nodes/BlockStatementDeadCodeInjectionNode.ts":
/*!*******************************************************************************************!*\
  !*** ./src/custom-nodes/dead-code-injection-nodes/BlockStatementDeadCodeInjectionNode.ts ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var BlockStatementDeadCodeInjectionNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(BlockStatementDeadCodeInjectionNode, _AbstractCustomNode_);

  function BlockStatementDeadCodeInjectionNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, BlockStatementDeadCodeInjectionNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockStatementDeadCodeInjectionNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(BlockStatementDeadCodeInjectionNode, [{
    key: "initialize",
    value: function initialize(blockStatementNode, deadCodeInjectionRootAstHostNode) {
      this.blockStatementNode = blockStatementNode;
      this.deadCodeInjectionRootAstHostNode = deadCodeInjectionRootAstHostNode;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      var random1 = this.randomGenerator.getMathRandom() > 0.5;
      var random2 = this.randomGenerator.getMathRandom() > 0.5;
      var operator = random1 ? '===' : '!==';
      var leftString = this.randomGenerator.getRandomString(5);
      var rightString = random2 ? leftString : this.randomGenerator.getRandomString(5);

      var _ref = random1 === random2 ? [this.blockStatementNode, this.deadCodeInjectionRootAstHostNode] : [this.deadCodeInjectionRootAstHostNode, this.blockStatementNode],
          _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          consequent = _ref2[0],
          alternate = _ref2[1];

      var structure = NodeFactory_1.NodeFactory.blockStatementNode([NodeFactory_1.NodeFactory.ifStatementNode(NodeFactory_1.NodeFactory.binaryExpressionNode(operator, NodeFactory_1.NodeFactory.literalNode(leftString), NodeFactory_1.NodeFactory.literalNode(rightString)), consequent, alternate)]);
      NodeUtils_1.NodeUtils.parentizeAst(structure);
      return [structure];
    }
  }]);
  return BlockStatementDeadCodeInjectionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], BlockStatementDeadCodeInjectionNode.prototype, "blockStatementNode", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], BlockStatementDeadCodeInjectionNode.prototype, "deadCodeInjectionRootAstHostNode", void 0);

BlockStatementDeadCodeInjectionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], BlockStatementDeadCodeInjectionNode);
exports.BlockStatementDeadCodeInjectionNode = BlockStatementDeadCodeInjectionNode;

/***/ }),

/***/ "./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode.ts":
/*!************************************************************************************!*\
  !*** ./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode.ts ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var DebugProtectionFunctionCallTemplate_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-call-node/DebugProtectionFunctionCallTemplate */ "./src/templates/debug-protection-nodes/debug-protection-function-call-node/DebugProtectionFunctionCallTemplate.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var DebugProtectionFunctionCallNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(DebugProtectionFunctionCallNode, _AbstractCustomNode_);

  function DebugProtectionFunctionCallNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, DebugProtectionFunctionCallNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DebugProtectionFunctionCallNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(DebugProtectionFunctionCallNode, [{
    key: "initialize",
    value: function initialize(debugProtectionFunctionName, callsControllerFunctionName) {
      this.debugProtectionFunctionName = debugProtectionFunctionName;
      this.callsControllerFunctionName = callsControllerFunctionName;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      return string_template_1.default(DebugProtectionFunctionCallTemplate_1.DebugProtectionFunctionCallTemplate(), {
        debugProtectionFunctionName: this.debugProtectionFunctionName,
        singleNodeCallControllerFunctionName: this.callsControllerFunctionName
      });
    }
  }]);
  return DebugProtectionFunctionCallNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], DebugProtectionFunctionCallNode.prototype, "callsControllerFunctionName", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], DebugProtectionFunctionCallNode.prototype, "debugProtectionFunctionName", void 0);

DebugProtectionFunctionCallNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], DebugProtectionFunctionCallNode);
exports.DebugProtectionFunctionCallNode = DebugProtectionFunctionCallNode;

/***/ }),

/***/ "./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode.ts":
/*!****************************************************************************************!*\
  !*** ./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var DebugProtectionFunctionIntervalTemplate_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-interval-node/DebugProtectionFunctionIntervalTemplate */ "./src/templates/debug-protection-nodes/debug-protection-function-interval-node/DebugProtectionFunctionIntervalTemplate.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var DebugProtectionFunctionIntervalNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(DebugProtectionFunctionIntervalNode, _AbstractCustomNode_);

  function DebugProtectionFunctionIntervalNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, DebugProtectionFunctionIntervalNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DebugProtectionFunctionIntervalNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(DebugProtectionFunctionIntervalNode, [{
    key: "initialize",
    value: function initialize(debugProtectionFunctionName) {
      this.debugProtectionFunctionName = debugProtectionFunctionName;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      return string_template_1.default(DebugProtectionFunctionIntervalTemplate_1.DebugProtectionFunctionIntervalTemplate(), {
        debugProtectionFunctionName: this.debugProtectionFunctionName
      });
    }
  }]);
  return DebugProtectionFunctionIntervalNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], DebugProtectionFunctionIntervalNode.prototype, "debugProtectionFunctionName", void 0);

DebugProtectionFunctionIntervalNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], DebugProtectionFunctionIntervalNode);
exports.DebugProtectionFunctionIntervalNode = DebugProtectionFunctionIntervalNode;

/***/ }),

/***/ "./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode.ts":
/*!********************************************************************************!*\
  !*** ./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));

var ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var DebuggerTemplate_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplate */ "./src/templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplate.ts");

var DebuggerTemplateNoEval_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplateNoEval */ "./src/templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplateNoEval.ts");

var DebugProtectionFunctionTemplate_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-node/DebugProtectionFunctionTemplate */ "./src/templates/debug-protection-nodes/debug-protection-function-node/DebugProtectionFunctionTemplate.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var DebugProtectionFunctionNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(DebugProtectionFunctionNode, _AbstractCustomNode_);

  function DebugProtectionFunctionNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, DebugProtectionFunctionNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DebugProtectionFunctionNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(DebugProtectionFunctionNode, [{
    key: "initialize",
    value: function initialize(debugProtectionFunctionName) {
      this.debugProtectionFunctionName = debugProtectionFunctionName;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var debuggerTemplate = this.options.target !== ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval ? DebuggerTemplate_1.DebuggerTemplate() : DebuggerTemplateNoEval_1.DebuggerTemplateNoEval();
      return string_template_1.default(DebugProtectionFunctionTemplate_1.DebugProtectionFunctionTemplate(), {
        debuggerTemplate: debuggerTemplate,
        debugProtectionFunctionName: this.debugProtectionFunctionName
      });
    }
  }]);
  return DebugProtectionFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], DebugProtectionFunctionNode.prototype, "debugProtectionFunctionName", void 0);

DebugProtectionFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], DebugProtectionFunctionNode);
exports.DebugProtectionFunctionNode = DebugProtectionFunctionNode;

/***/ }),

/***/ "./src/custom-nodes/debug-protection-nodes/group/DebugProtectionCustomNodeGroup.ts":
/*!*****************************************************************************************!*\
  !*** ./src/custom-nodes/debug-protection-nodes/group/DebugProtectionCustomNodeGroup.ts ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var CustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/CustomNode */ "./src/enums/custom-nodes/CustomNode.ts");

var ObfuscationEvent_1 = __webpack_require__(/*! ../../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");

var AbstractCustomNodeGroup_1 = __webpack_require__(/*! ../../AbstractCustomNodeGroup */ "./src/custom-nodes/AbstractCustomNodeGroup.ts");

var NodeAppender_1 = __webpack_require__(/*! ../../../node/NodeAppender */ "./src/node/NodeAppender.ts");

var DebugProtectionCustomNodeGroup =
/*#__PURE__*/
function (_AbstractCustomNodeGr) {
  (0, _inherits2.default)(DebugProtectionCustomNodeGroup, _AbstractCustomNodeGr);

  function DebugProtectionCustomNodeGroup(customNodeFactory, identifierNamesGeneratorFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, DebugProtectionCustomNodeGroup);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DebugProtectionCustomNodeGroup).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
    _this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.BeforeObfuscation;
    _this.customNodeFactory = customNodeFactory;
    return _this;
  }

  (0, _createClass2.default)(DebugProtectionCustomNodeGroup, [{
    key: "appendCustomNodes",
    value: function appendCustomNodes(blockScopeNode, stackTraceData) {
      var _this2 = this;

      var randomStackTraceIndex = this.getRandomStackTraceIndex(stackTraceData.length);
      this.appendCustomNodeIfExist(CustomNode_1.CustomNode.DebugProtectionFunctionCallNode, function (customNode) {
        NodeAppender_1.NodeAppender.appendToOptimalBlockScope(stackTraceData, blockScopeNode, customNode.getNode(), randomStackTraceIndex);
      });
      this.appendCustomNodeIfExist(CustomNode_1.CustomNode.DebugProtectionFunctionNode, function (customNode) {
        NodeAppender_1.NodeAppender.append(blockScopeNode, customNode.getNode());
      });
      this.appendCustomNodeIfExist(CustomNode_1.CustomNode.DebugProtectionFunctionIntervalNode, function (customNode) {
        var programBodyLength = blockScopeNode.body.length;

        var randomIndex = _this2.randomGenerator.getRandomInteger(0, programBodyLength);

        NodeAppender_1.NodeAppender.insertAtIndex(blockScopeNode, customNode.getNode(), randomIndex);
      });
      this.appendCustomNodeIfExist(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, function (customNode) {
        var targetBlockScope;

        if (stackTraceData.length) {
          targetBlockScope = NodeAppender_1.NodeAppender.getOptimalBlockScope(stackTraceData, randomStackTraceIndex, 1);
        } else {
          targetBlockScope = blockScopeNode;
        }

        NodeAppender_1.NodeAppender.prepend(targetBlockScope, customNode.getNode());
      });
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.customNodes = new _map.default();

      if (!this.options.debugProtection) {
        return;
      }

      var debugProtectionFunctionName = this.identifierNamesGenerator.generate();
      var callsControllerFunctionName = this.identifierNamesGenerator.generate();
      var debugProtectionFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.DebugProtectionFunctionNode);
      var debugProtectionFunctionCallNode = this.customNodeFactory(CustomNode_1.CustomNode.DebugProtectionFunctionCallNode);
      var debugProtectionFunctionIntervalNode = this.customNodeFactory(CustomNode_1.CustomNode.DebugProtectionFunctionIntervalNode);
      var nodeCallsControllerFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode);
      debugProtectionFunctionNode.initialize(debugProtectionFunctionName);
      debugProtectionFunctionCallNode.initialize(debugProtectionFunctionName, callsControllerFunctionName);
      debugProtectionFunctionIntervalNode.initialize(debugProtectionFunctionName);
      nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);
      this.customNodes.set(CustomNode_1.CustomNode.DebugProtectionFunctionNode, debugProtectionFunctionNode);
      this.customNodes.set(CustomNode_1.CustomNode.DebugProtectionFunctionCallNode, debugProtectionFunctionCallNode);

      if (this.options.debugProtectionInterval) {
        this.customNodes.set(CustomNode_1.CustomNode.DebugProtectionFunctionIntervalNode, debugProtectionFunctionIntervalNode);
      }

      this.customNodes.set(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
    }
  }]);
  return DebugProtectionCustomNodeGroup;
}(AbstractCustomNodeGroup_1.AbstractCustomNodeGroup);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", _map.default)], DebugProtectionCustomNodeGroup.prototype, "customNodes", void 0);

DebugProtectionCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Function, Object, Object])], DebugProtectionCustomNodeGroup);
exports.DebugProtectionCustomNodeGroup = DebugProtectionCustomNodeGroup;

/***/ }),

/***/ "./src/custom-nodes/domain-lock-nodes/DomainLockNode.ts":
/*!**************************************************************!*\
  !*** ./src/custom-nodes/domain-lock-nodes/DomainLockNode.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));

var ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var DomainLockNodeTemplate_1 = __webpack_require__(/*! ../../templates/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate */ "./src/templates/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate.ts");

var GlobalVariableNoEvalTemplate_1 = __webpack_require__(/*! ../../templates/GlobalVariableNoEvalTemplate */ "./src/templates/GlobalVariableNoEvalTemplate.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var DomainLockNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(DomainLockNode, _AbstractCustomNode_);

  function DomainLockNode(identifierNamesGeneratorFactory, randomGenerator, cryptUtils, options) {
    var _this;

    (0, _classCallCheck2.default)(this, DomainLockNode);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DomainLockNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
    _this.cryptUtils = cryptUtils;
    return _this;
  }

  (0, _createClass2.default)(DomainLockNode, [{
    key: "initialize",
    value: function initialize(callsControllerFunctionName) {
      this.callsControllerFunctionName = callsControllerFunctionName;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var domainsString = this.options.domainLock.join(';');

      var _this$cryptUtils$hide = this.cryptUtils.hideString(domainsString, domainsString.length * 3),
          _this$cryptUtils$hide2 = (0, _slicedToArray2.default)(_this$cryptUtils$hide, 2),
          hiddenDomainsString = _this$cryptUtils$hide2[0],
          diff = _this$cryptUtils$hide2[1];

      var globalVariableTemplate = this.options.target !== ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval ? this.getGlobalVariableTemplate() : GlobalVariableNoEvalTemplate_1.GlobalVariableNoEvalTemplate();
      return string_template_1.default(DomainLockNodeTemplate_1.DomainLockNodeTemplate(), {
        domainLockFunctionName: this.identifierNamesGenerator.generate(),
        diff: diff,
        domains: hiddenDomainsString,
        globalVariableTemplate: globalVariableTemplate,
        singleNodeCallControllerFunctionName: this.callsControllerFunctionName
      });
    }
  }]);
  return DomainLockNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], DomainLockNode.prototype, "callsControllerFunctionName", void 0);

DomainLockNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])], DomainLockNode);
exports.DomainLockNode = DomainLockNode;

/***/ }),

/***/ "./src/custom-nodes/domain-lock-nodes/group/DomainLockCustomNodeGroup.ts":
/*!*******************************************************************************!*\
  !*** ./src/custom-nodes/domain-lock-nodes/group/DomainLockCustomNodeGroup.ts ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var CustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/CustomNode */ "./src/enums/custom-nodes/CustomNode.ts");

var ObfuscationEvent_1 = __webpack_require__(/*! ../../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");

var AbstractCustomNodeGroup_1 = __webpack_require__(/*! ../../AbstractCustomNodeGroup */ "./src/custom-nodes/AbstractCustomNodeGroup.ts");

var NodeAppender_1 = __webpack_require__(/*! ../../../node/NodeAppender */ "./src/node/NodeAppender.ts");

var DomainLockCustomNodeGroup =
/*#__PURE__*/
function (_AbstractCustomNodeGr) {
  (0, _inherits2.default)(DomainLockCustomNodeGroup, _AbstractCustomNodeGr);

  function DomainLockCustomNodeGroup(customNodeFactory, identifierNamesGeneratorFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, DomainLockCustomNodeGroup);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DomainLockCustomNodeGroup).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
    _this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.BeforeObfuscation;
    _this.customNodeFactory = customNodeFactory;
    return _this;
  }

  (0, _createClass2.default)(DomainLockCustomNodeGroup, [{
    key: "appendCustomNodes",
    value: function appendCustomNodes(blockScopeNode, stackTraceData) {
      var randomStackTraceIndex = this.getRandomStackTraceIndex(stackTraceData.length);
      this.appendCustomNodeIfExist(CustomNode_1.CustomNode.DomainLockNode, function (customNode) {
        NodeAppender_1.NodeAppender.appendToOptimalBlockScope(stackTraceData, blockScopeNode, customNode.getNode(), randomStackTraceIndex);
      });
      this.appendCustomNodeIfExist(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, function (customNode) {
        var targetBlockScope;

        if (stackTraceData.length) {
          targetBlockScope = NodeAppender_1.NodeAppender.getOptimalBlockScope(stackTraceData, randomStackTraceIndex, 1);
        } else {
          targetBlockScope = blockScopeNode;
        }

        NodeAppender_1.NodeAppender.prepend(targetBlockScope, customNode.getNode());
      });
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.customNodes = new _map.default();

      if (!this.options.domainLock.length) {
        return;
      }

      var callsControllerFunctionName = this.identifierNamesGenerator.generate();
      var domainLockNode = this.customNodeFactory(CustomNode_1.CustomNode.DomainLockNode);
      var nodeCallsControllerFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode);
      domainLockNode.initialize(callsControllerFunctionName);
      nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);
      this.customNodes.set(CustomNode_1.CustomNode.DomainLockNode, domainLockNode);
      this.customNodes.set(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
    }
  }]);
  return DomainLockCustomNodeGroup;
}(AbstractCustomNodeGroup_1.AbstractCustomNodeGroup);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", _map.default)], DomainLockCustomNodeGroup.prototype, "customNodes", void 0);

DomainLockCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Function, Object, Object])], DomainLockCustomNodeGroup);
exports.DomainLockCustomNodeGroup = DomainLockCustomNodeGroup;

/***/ }),

/***/ "./src/custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode.ts":
/*!*****************************************************************************************!*\
  !*** ./src/custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode.ts ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));

var ObfuscationEvent_1 = __webpack_require__(/*! ../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var SingleNodeCallControllerTemplate_1 = __webpack_require__(/*! ../../templates/SingleNodeCallControllerTemplate */ "./src/templates/SingleNodeCallControllerTemplate.ts");

var NoCustomNodes_1 = __webpack_require__(/*! ../../options/presets/NoCustomNodes */ "./src/options/presets/NoCustomNodes.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var JavaScriptObfuscatorFacade_1 = __webpack_require__(/*! ../../JavaScriptObfuscatorFacade */ "./src/JavaScriptObfuscatorFacade.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var NodeCallsControllerFunctionNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(NodeCallsControllerFunctionNode, _AbstractCustomNode_);

  function NodeCallsControllerFunctionNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, NodeCallsControllerFunctionNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NodeCallsControllerFunctionNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(NodeCallsControllerFunctionNode, [{
    key: "initialize",
    value: function initialize(appendEvent, callsControllerFunctionName) {
      this.appendEvent = appendEvent;
      this.callsControllerFunctionName = callsControllerFunctionName;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      if (this.appendEvent === ObfuscationEvent_1.ObfuscationEvent.AfterObfuscation) {
        return JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(string_template_1.default(SingleNodeCallControllerTemplate_1.SingleNodeCallControllerTemplate(), {
          singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        }), (0, _assign.default)({}, NoCustomNodes_1.NO_ADDITIONAL_NODES_PRESET, {
          identifierNamesGenerator: this.options.identifierNamesGenerator,
          seed: this.options.seed
        })).getObfuscatedCode();
      }

      return string_template_1.default(SingleNodeCallControllerTemplate_1.SingleNodeCallControllerTemplate(), {
        singleNodeCallControllerFunctionName: this.callsControllerFunctionName
      });
    }
  }]);
  return NodeCallsControllerFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], NodeCallsControllerFunctionNode.prototype, "callsControllerFunctionName", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], NodeCallsControllerFunctionNode.prototype, "appendEvent", void 0);

NodeCallsControllerFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], NodeCallsControllerFunctionNode);
exports.NodeCallsControllerFunctionNode = NodeCallsControllerFunctionNode;

/***/ }),

/***/ "./src/custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode.ts":
/*!***************************************************************************!*\
  !*** ./src/custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var NoCustomNodes_1 = __webpack_require__(/*! ../../options/presets/NoCustomNodes */ "./src/options/presets/NoCustomNodes.ts");

var SelfDefendingTemplate_1 = __webpack_require__(/*! ../../templates/self-defending-nodes/self-defending-unicode-node/SelfDefendingTemplate */ "./src/templates/self-defending-nodes/self-defending-unicode-node/SelfDefendingTemplate.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var JavaScriptObfuscatorFacade_1 = __webpack_require__(/*! ../../JavaScriptObfuscatorFacade */ "./src/JavaScriptObfuscatorFacade.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var SelfDefendingUnicodeNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(SelfDefendingUnicodeNode, _AbstractCustomNode_);

  function SelfDefendingUnicodeNode(identifierNamesGeneratorFactory, randomGenerator, escapeSequenceEncoder, options) {
    var _this;

    (0, _classCallCheck2.default)(this, SelfDefendingUnicodeNode);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SelfDefendingUnicodeNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
    _this.escapeSequenceEncoder = escapeSequenceEncoder;
    return _this;
  }

  (0, _createClass2.default)(SelfDefendingUnicodeNode, [{
    key: "initialize",
    value: function initialize(callsControllerFunctionName) {
      this.callsControllerFunctionName = callsControllerFunctionName;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      return JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(string_template_1.default(SelfDefendingTemplate_1.SelfDefendingTemplate(this.escapeSequenceEncoder), {
        selfDefendingFunctionName: this.identifierNamesGenerator.generate(),
        singleNodeCallControllerFunctionName: this.callsControllerFunctionName
      }), (0, _assign.default)({}, NoCustomNodes_1.NO_ADDITIONAL_NODES_PRESET, {
        identifierNamesGenerator: this.options.identifierNamesGenerator,
        seed: this.options.seed,
        unicodeEscapeSequence: true
      })).getObfuscatedCode();
    }
  }]);
  return SelfDefendingUnicodeNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], SelfDefendingUnicodeNode.prototype, "callsControllerFunctionName", void 0);

SelfDefendingUnicodeNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])], SelfDefendingUnicodeNode);
exports.SelfDefendingUnicodeNode = SelfDefendingUnicodeNode;

/***/ }),

/***/ "./src/custom-nodes/self-defending-nodes/group/SelfDefendingCustomNodeGroup.ts":
/*!*************************************************************************************!*\
  !*** ./src/custom-nodes/self-defending-nodes/group/SelfDefendingCustomNodeGroup.ts ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var CustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/CustomNode */ "./src/enums/custom-nodes/CustomNode.ts");

var ObfuscationEvent_1 = __webpack_require__(/*! ../../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");

var AbstractCustomNodeGroup_1 = __webpack_require__(/*! ../../AbstractCustomNodeGroup */ "./src/custom-nodes/AbstractCustomNodeGroup.ts");

var NodeAppender_1 = __webpack_require__(/*! ../../../node/NodeAppender */ "./src/node/NodeAppender.ts");

var SelfDefendingCustomNodeGroup =
/*#__PURE__*/
function (_AbstractCustomNodeGr) {
  (0, _inherits2.default)(SelfDefendingCustomNodeGroup, _AbstractCustomNodeGr);

  function SelfDefendingCustomNodeGroup(customNodeFactory, identifierNamesGeneratorFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, SelfDefendingCustomNodeGroup);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SelfDefendingCustomNodeGroup).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
    _this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.AfterObfuscation;
    _this.customNodeFactory = customNodeFactory;
    return _this;
  }

  (0, _createClass2.default)(SelfDefendingCustomNodeGroup, [{
    key: "appendCustomNodes",
    value: function appendCustomNodes(blockScopeNode, stackTraceData) {
      var randomStackTraceIndex = this.getRandomStackTraceIndex(stackTraceData.length);
      this.appendCustomNodeIfExist(CustomNode_1.CustomNode.SelfDefendingUnicodeNode, function (customNode) {
        NodeAppender_1.NodeAppender.appendToOptimalBlockScope(stackTraceData, blockScopeNode, customNode.getNode(), randomStackTraceIndex);
      });
      this.appendCustomNodeIfExist(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, function (customNode) {
        var targetBlockScope;

        if (stackTraceData.length) {
          targetBlockScope = NodeAppender_1.NodeAppender.getOptimalBlockScope(stackTraceData, randomStackTraceIndex, 1);
        } else {
          targetBlockScope = blockScopeNode;
        }

        NodeAppender_1.NodeAppender.prepend(targetBlockScope, customNode.getNode());
      });
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.customNodes = new _map.default();

      if (!this.options.selfDefending) {
        return;
      }

      var callsControllerFunctionName = this.identifierNamesGenerator.generate();
      var selfDefendingUnicodeNode = this.customNodeFactory(CustomNode_1.CustomNode.SelfDefendingUnicodeNode);
      var nodeCallsControllerFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode);
      selfDefendingUnicodeNode.initialize(callsControllerFunctionName);
      nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);
      this.customNodes.set(CustomNode_1.CustomNode.SelfDefendingUnicodeNode, selfDefendingUnicodeNode);
      this.customNodes.set(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
    }
  }]);
  return SelfDefendingCustomNodeGroup;
}(AbstractCustomNodeGroup_1.AbstractCustomNodeGroup);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", _map.default)], SelfDefendingCustomNodeGroup.prototype, "customNodes", void 0);

SelfDefendingCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Function, Object, Object])], SelfDefendingCustomNodeGroup);
exports.SelfDefendingCustomNodeGroup = SelfDefendingCustomNodeGroup;

/***/ }),

/***/ "./src/custom-nodes/string-array-nodes/StringArrayCallsWrapper.ts":
/*!************************************************************************!*\
  !*** ./src/custom-nodes/string-array-nodes/StringArrayCallsWrapper.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));

var ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");

var StringArrayEncoding_1 = __webpack_require__(/*! ../../enums/StringArrayEncoding */ "./src/enums/StringArrayEncoding.ts");

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var NoCustomNodes_1 = __webpack_require__(/*! ../../options/presets/NoCustomNodes */ "./src/options/presets/NoCustomNodes.ts");

var AtobTemplate_1 = __webpack_require__(/*! ../../templates/AtobTemplate */ "./src/templates/AtobTemplate.ts");

var GlobalVariableNoEvalTemplate_1 = __webpack_require__(/*! ../../templates/GlobalVariableNoEvalTemplate */ "./src/templates/GlobalVariableNoEvalTemplate.ts");

var Rc4Template_1 = __webpack_require__(/*! ../../templates/Rc4Template */ "./src/templates/Rc4Template.ts");

var SelfDefendingTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-calls-wrapper/SelfDefendingTemplate */ "./src/templates/string-array-nodes/string-array-calls-wrapper/SelfDefendingTemplate.ts");

var StringArrayBase64DecodeNodeTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate */ "./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate.ts");

var StringArrayCallsWrapperTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate */ "./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate.ts");

var StringArrayRC4DecodeNodeTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate */ "./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var JavaScriptObfuscatorFacade_1 = __webpack_require__(/*! ../../JavaScriptObfuscatorFacade */ "./src/JavaScriptObfuscatorFacade.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var StringArrayCallsWrapper =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(StringArrayCallsWrapper, _AbstractCustomNode_);

  function StringArrayCallsWrapper(identifierNamesGeneratorFactory, randomGenerator, escapeSequenceEncoder, options) {
    var _this;

    (0, _classCallCheck2.default)(this, StringArrayCallsWrapper);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StringArrayCallsWrapper).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
    _this.escapeSequenceEncoder = escapeSequenceEncoder;
    return _this;
  }

  (0, _createClass2.default)(StringArrayCallsWrapper, [{
    key: "initialize",
    value: function initialize(stringArrayName, stringArrayCallsWrapperName) {
      this.stringArrayName = stringArrayName;
      this.stringArrayCallsWrapperName = stringArrayCallsWrapperName;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var decodeNodeTemplate = this.getDecodeStringArrayTemplate();
      return JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(string_template_1.default(StringArrayCallsWrapperTemplate_1.StringArrayCallsWrapperTemplate(), {
        decodeNodeTemplate: decodeNodeTemplate,
        stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
        stringArrayName: this.stringArrayName
      }), (0, _assign.default)({}, NoCustomNodes_1.NO_ADDITIONAL_NODES_PRESET, {
        identifierNamesGenerator: this.options.identifierNamesGenerator,
        seed: this.options.seed
      })).getObfuscatedCode();
    }
  }, {
    key: "getDecodeStringArrayTemplate",
    value: function getDecodeStringArrayTemplate() {
      var globalVariableTemplate = this.options.target !== ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval ? this.getGlobalVariableTemplate() : GlobalVariableNoEvalTemplate_1.GlobalVariableNoEvalTemplate();
      var atobPolyfill = string_template_1.default(AtobTemplate_1.AtobTemplate(), {
        globalVariableTemplate: globalVariableTemplate
      });
      var decodeStringArrayTemplate = '';
      var selfDefendingCode = '';

      if (this.options.selfDefending) {
        selfDefendingCode = string_template_1.default(SelfDefendingTemplate_1.SelfDefendingTemplate(this.randomGenerator, this.escapeSequenceEncoder), {
          stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
          stringArrayName: this.stringArrayName
        });
      }

      switch (this.options.stringArrayEncoding) {
        case StringArrayEncoding_1.StringArrayEncoding.Rc4:
          decodeStringArrayTemplate = string_template_1.default(StringArrayRC4DecodeNodeTemplate_1.StringArrayRc4DecodeNodeTemplate(this.randomGenerator), {
            atobPolyfill: atobPolyfill,
            rc4Polyfill: Rc4Template_1.Rc4Template(),
            selfDefendingCode: selfDefendingCode,
            stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
          });
          break;

        case StringArrayEncoding_1.StringArrayEncoding.Base64:
          decodeStringArrayTemplate = string_template_1.default(StringArrayBase64DecodeNodeTemplate_1.StringArrayBase64DecodeNodeTemplate(this.randomGenerator), {
            atobPolyfill: atobPolyfill,
            selfDefendingCode: selfDefendingCode,
            stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
          });
      }

      return decodeStringArrayTemplate;
    }
  }]);
  return StringArrayCallsWrapper;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], StringArrayCallsWrapper.prototype, "stringArrayName", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], StringArrayCallsWrapper.prototype, "stringArrayCallsWrapperName", void 0);

StringArrayCallsWrapper = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])], StringArrayCallsWrapper);
exports.StringArrayCallsWrapper = StringArrayCallsWrapper;

/***/ }),

/***/ "./src/custom-nodes/string-array-nodes/StringArrayNode.ts":
/*!****************************************************************!*\
  !*** ./src/custom-nodes/string-array-nodes/StringArrayNode.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var StringArrayTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-node/StringArrayTemplate */ "./src/templates/string-array-nodes/string-array-node/StringArrayTemplate.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var StringArrayNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(StringArrayNode, _AbstractCustomNode_);

  function StringArrayNode(identifierNamesGeneratorFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, StringArrayNode);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StringArrayNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(StringArrayNode, [{
    key: "initialize",
    value: function initialize(stringArrayStorage, stringArrayName, stringArrayRotateValue) {
      this.stringArrayStorage = stringArrayStorage;
      this.stringArrayName = stringArrayName;
      this.stringArrayRotateValue = stringArrayRotateValue;
    }
  }, {
    key: "getNode",
    value: function getNode() {
      this.stringArrayStorage.rotateArray(this.stringArrayRotateValue);
      return (0, _get2.default)((0, _getPrototypeOf2.default)(StringArrayNode.prototype), "getNode", this).call(this);
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      return string_template_1.default(StringArrayTemplate_1.StringArrayTemplate(), {
        stringArrayName: this.stringArrayName,
        stringArray: this.stringArrayStorage.toString()
      });
    }
  }]);
  return StringArrayNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], StringArrayNode.prototype, "stringArrayStorage", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], StringArrayNode.prototype, "stringArrayName", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Number)], StringArrayNode.prototype, "stringArrayRotateValue", void 0);

StringArrayNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], StringArrayNode);
exports.StringArrayNode = StringArrayNode;

/***/ }),

/***/ "./src/custom-nodes/string-array-nodes/StringArrayRotateFunctionNode.ts":
/*!******************************************************************************!*\
  !*** ./src/custom-nodes/string-array-nodes/StringArrayRotateFunctionNode.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));

var Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var NoCustomNodes_1 = __webpack_require__(/*! ../../options/presets/NoCustomNodes */ "./src/options/presets/NoCustomNodes.ts");

var SelfDefendingTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-rotate-function-node/SelfDefendingTemplate */ "./src/templates/string-array-nodes/string-array-rotate-function-node/SelfDefendingTemplate.ts");

var StringArrayRotateFunctionTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-rotate-function-node/StringArrayRotateFunctionTemplate */ "./src/templates/string-array-nodes/string-array-rotate-function-node/StringArrayRotateFunctionTemplate.ts");

var AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");

var JavaScriptObfuscatorFacade_1 = __webpack_require__(/*! ../../JavaScriptObfuscatorFacade */ "./src/JavaScriptObfuscatorFacade.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var NumberUtils_1 = __webpack_require__(/*! ../../utils/NumberUtils */ "./src/utils/NumberUtils.ts");

var StringArrayRotateFunctionNode =
/*#__PURE__*/
function (_AbstractCustomNode_) {
  (0, _inherits2.default)(StringArrayRotateFunctionNode, _AbstractCustomNode_);

  function StringArrayRotateFunctionNode(identifierNamesGeneratorFactory, randomGenerator, escapeSequenceEncoder, options) {
    var _this;

    (0, _classCallCheck2.default)(this, StringArrayRotateFunctionNode);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StringArrayRotateFunctionNode).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
    _this.escapeSequenceEncoder = escapeSequenceEncoder;
    return _this;
  }

  (0, _createClass2.default)(StringArrayRotateFunctionNode, [{
    key: "initialize",
    value: function initialize(stringArrayName, stringArrayRotateValue) {
      this.stringArrayName = stringArrayName;
      this.stringArrayRotateValue = stringArrayRotateValue;
    }
  }, {
    key: "getNodeStructure",
    value: function getNodeStructure() {
      return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
  }, {
    key: "getTemplate",
    value: function getTemplate() {
      var timesName = this.identifierNamesGenerator.generate();
      var whileFunctionName = this.identifierNamesGenerator.generate();
      var code = '';

      if (this.options.selfDefending) {
        code = string_template_1.default(SelfDefendingTemplate_1.SelfDefendingTemplate(this.escapeSequenceEncoder), {
          timesName: timesName,
          whileFunctionName: whileFunctionName
        });
      } else {
        code = "".concat(whileFunctionName, "(++").concat(timesName, ")");
      }

      return JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(string_template_1.default(StringArrayRotateFunctionTemplate_1.StringArrayRotateFunctionTemplate(), {
        code: code,
        timesName: timesName,
        stringArrayName: this.stringArrayName,
        stringArrayRotateValue: NumberUtils_1.NumberUtils.toHex(this.stringArrayRotateValue),
        whileFunctionName: whileFunctionName
      }), (0, _assign.default)({}, NoCustomNodes_1.NO_ADDITIONAL_NODES_PRESET, {
        identifierNamesGenerator: this.options.identifierNamesGenerator,
        seed: this.options.seed
      })).getObfuscatedCode();
    }
  }]);
  return StringArrayRotateFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], StringArrayRotateFunctionNode.prototype, "stringArrayName", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Number)], StringArrayRotateFunctionNode.prototype, "stringArrayRotateValue", void 0);

StringArrayRotateFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])], StringArrayRotateFunctionNode);
exports.StringArrayRotateFunctionNode = StringArrayRotateFunctionNode;

/***/ }),

/***/ "./src/custom-nodes/string-array-nodes/group/StringArrayCustomNodeGroup.ts":
/*!*********************************************************************************!*\
  !*** ./src/custom-nodes/string-array-nodes/group/StringArrayCustomNodeGroup.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray"));

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");

var CustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/CustomNode */ "./src/enums/custom-nodes/CustomNode.ts");

var ObfuscationEvent_1 = __webpack_require__(/*! ../../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");

var AbstractCustomNodeGroup_1 = __webpack_require__(/*! ../../AbstractCustomNodeGroup */ "./src/custom-nodes/AbstractCustomNodeGroup.ts");

var NodeAppender_1 = __webpack_require__(/*! ../../../node/NodeAppender */ "./src/node/NodeAppender.ts");

var StringArrayCustomNodeGroup =
/*#__PURE__*/
function (_AbstractCustomNodeGr) {
  (0, _inherits2.default)(StringArrayCustomNodeGroup, _AbstractCustomNodeGr);

  function StringArrayCustomNodeGroup(customNodeFactory, stringArrayStorage, identifierNamesGeneratorFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, StringArrayCustomNodeGroup);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StringArrayCustomNodeGroup).call(this, identifierNamesGeneratorFactory, randomGenerator, options));
    _this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.AfterObfuscation;
    _this.customNodeFactory = customNodeFactory;
    _this.stringArrayStorage = stringArrayStorage;
    return _this;
  }

  (0, _createClass2.default)(StringArrayCustomNodeGroup, [{
    key: "appendCustomNodes",
    value: function appendCustomNodes(blockScopeNode, stackTraceData) {
      if (!this.stringArrayStorage.getLength()) {
        return;
      }

      this.appendCustomNodeIfExist(CustomNode_1.CustomNode.StringArrayNode, function (customNode) {
        NodeAppender_1.NodeAppender.prepend(blockScopeNode, customNode.getNode());
      });
      this.appendCustomNodeIfExist(CustomNode_1.CustomNode.StringArrayCallsWrapper, function (customNode) {
        NodeAppender_1.NodeAppender.insertAtIndex(blockScopeNode, customNode.getNode(), 1);
      });
      this.appendCustomNodeIfExist(CustomNode_1.CustomNode.StringArrayRotateFunctionNode, function (customNode) {
        NodeAppender_1.NodeAppender.insertAtIndex(blockScopeNode, customNode.getNode(), 1);
      });
    }
  }, {
    key: "initialize",
    value: function initialize() {
      this.customNodes = new _map.default();

      if (!this.options.stringArray) {
        return;
      }

      var stringArrayNode = this.customNodeFactory(CustomNode_1.CustomNode.StringArrayNode);
      var stringArrayCallsWrapper = this.customNodeFactory(CustomNode_1.CustomNode.StringArrayCallsWrapper);
      var stringArrayRotateFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.StringArrayRotateFunctionNode);
      var stringArrayStorageId = this.stringArrayStorage.getStorageId();

      var _stringArrayStorageId = stringArrayStorageId.split('|'),
          _stringArrayStorageId2 = (0, _slicedToArray2.default)(_stringArrayStorageId, 2),
          stringArrayName = _stringArrayStorageId2[0],
          stringArrayCallsWrapperName = _stringArrayStorageId2[1];

      var stringArrayRotateValue;

      if (this.options.rotateStringArray) {
        stringArrayRotateValue = this.randomGenerator.getRandomInteger(100, 500);
      } else {
        stringArrayRotateValue = 0;
      }

      stringArrayNode.initialize(this.stringArrayStorage, stringArrayName, stringArrayRotateValue);
      stringArrayCallsWrapper.initialize(stringArrayName, stringArrayCallsWrapperName);
      stringArrayRotateFunctionNode.initialize(stringArrayName, stringArrayRotateValue);
      this.customNodes.set(CustomNode_1.CustomNode.StringArrayNode, stringArrayNode);
      this.customNodes.set(CustomNode_1.CustomNode.StringArrayCallsWrapper, stringArrayCallsWrapper);

      if (this.options.rotateStringArray) {
        this.customNodes.set(CustomNode_1.CustomNode.StringArrayRotateFunctionNode, stringArrayRotateFunctionNode);
      }
    }
  }]);
  return StringArrayCustomNodeGroup;
}(AbstractCustomNodeGroup_1.AbstractCustomNodeGroup);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", _map.default)], StringArrayCustomNodeGroup.prototype, "customNodes", void 0);

StringArrayCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TStringArrayStorage)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Function, Object, Object])], StringArrayCustomNodeGroup);
exports.StringArrayCustomNodeGroup = StringArrayCustomNodeGroup;

/***/ }),

/***/ "./src/decorators/Initializable.ts":
/*!*****************************************!*\
  !*** ./src/decorators/Initializable.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

var _defineProperty = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/define-property */ "@babel/runtime/core-js/object/define-property"));

var _getOwnPropertyDescriptor = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/get-own-property-descriptor */ "@babel/runtime/core-js/object/get-own-property-descriptor"));

var _getMetadata = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/reflect/get-metadata */ "@babel/runtime/core-js/reflect/get-metadata"));

var _getOwnPropertyNames = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/get-own-property-names */ "@babel/runtime/core-js/object/get-own-property-names"));

var _defineMetadata = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/reflect/define-metadata */ "@babel/runtime/core-js/reflect/define-metadata"));

var _hasMetadata = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/reflect/has-metadata */ "@babel/runtime/core-js/reflect/has-metadata"));

var _set = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/set */ "@babel/runtime/core-js/set"));

var _keys = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/keys */ "@babel/runtime/core-js/object/keys"));

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaultDescriptor = {
  configurable: true,
  enumerable: true
};
var initializedTargetMetadataKey = '_initialized';
var initializablePropertiesSetMetadataKey = '_initializablePropertiesSet';
var wrappedMethodsSetMetadataKey = '_wrappedMethodsSet';
var constructorMethodName = 'constructor';

function initializable() {
  var initializeMethodName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'initialize';
  var decoratorName = (0, _keys.default)(this)[0];
  return function (target, propertyKey) {
    var initializeMethod = target[initializeMethodName];

    if (!initializeMethod || typeof initializeMethod !== 'function') {
      throw new Error("`".concat(initializeMethodName, "` method with initialization logic not ") + "found. `@".concat(decoratorName, "` decorator requires `").concat(initializeMethodName, "` method"));
    }

    initializeTargetMetadata(initializedTargetMetadataKey, false, target);
    initializeTargetMetadata(initializablePropertiesSetMetadataKey, new _set.default(), target);
    initializeTargetMetadata(wrappedMethodsSetMetadataKey, new _set.default(), target);
    wrapTargetMethodsInInitializedCheck(target, initializeMethodName);
    wrapInitializeMethodInInitializeCheck(target, initializeMethodName, propertyKey);
    return wrapInitializableProperty(target, propertyKey);
  };
}

exports.initializable = initializable;

function initializeTargetMetadata(metadataKey, metadataValue, target) {
  var hasInitializedMetadata = (0, _hasMetadata.default)(metadataKey, target);

  if (!hasInitializedMetadata) {
    (0, _defineMetadata.default)(metadataKey, metadataValue, target);
  }
}

function wrapTargetMethodsInInitializedCheck(target, initializeMethodName) {
  var ownPropertyNames = (0, _getOwnPropertyNames.default)(target);
  var prohibitedPropertyNames = [initializeMethodName, constructorMethodName];
  ownPropertyNames.forEach(function (propertyName) {
    var initializablePropertiesSet = (0, _getMetadata.default)(initializablePropertiesSetMetadataKey, target);
    var wrappedMethodsSet = (0, _getMetadata.default)(wrappedMethodsSetMetadataKey, target);
    var isProhibitedPropertyName = prohibitedPropertyNames.includes(propertyName) || initializablePropertiesSet.has(propertyName) || wrappedMethodsSet.has(propertyName);

    if (isProhibitedPropertyName) {
      return;
    }

    var targetProperty = target[propertyName];

    if (typeof targetProperty !== 'function') {
      return;
    }

    var methodDescriptor = (0, _getOwnPropertyDescriptor.default)(target, propertyName) || defaultDescriptor;
    var originalMethod = methodDescriptor.value;
    (0, _defineProperty.default)(target, propertyName, (0, _assign.default)({}, methodDescriptor, {
      value: function value() {
        if (!(0, _getMetadata.default)(initializedTargetMetadataKey, this)) {
          throw new Error("Class should be initialized with `".concat(initializeMethodName, "()` method"));
        }

        return originalMethod.apply(this, arguments);
      }
    }));
    wrappedMethodsSet.add(propertyName);
  });
}

function wrapInitializeMethodInInitializeCheck(target, initializeMethodName, propertyKey) {
  var methodDescriptor = (0, _getOwnPropertyDescriptor.default)(target, initializeMethodName) || defaultDescriptor;
  var originalMethod = methodDescriptor.value;
  (0, _defineProperty.default)(target, initializeMethodName, (0, _assign.default)({}, methodDescriptor, {
    value: function value() {
      (0, _defineMetadata.default)(initializedTargetMetadataKey, true, this);
      var result = originalMethod.apply(this, arguments);

      if (this[propertyKey]) {}

      return result;
    }
  }));
}

function wrapInitializableProperty(target, propertyKey) {
  var initializablePropertiesSet = (0, _getMetadata.default)(initializablePropertiesSetMetadataKey, target);
  initializablePropertiesSet.add(propertyKey);
  var initializablePropertyMetadataKey = "_".concat(propertyKey.toString());
  var propertyDescriptor = (0, _getOwnPropertyDescriptor.default)(target, initializablePropertyMetadataKey) || defaultDescriptor;
  (0, _defineProperty.default)(target, propertyKey, (0, _assign.default)({}, propertyDescriptor, {
    get: function get() {
      if (this[initializablePropertyMetadataKey] === undefined) {
        throw new Error("Property `".concat(propertyKey.toString(), "` is not initialized! Initialize it first!"));
      }

      return this[initializablePropertyMetadataKey];
    },
    set: function set(newVal) {
      this[initializablePropertyMetadataKey] = newVal;
    }
  }));
  return propertyDescriptor;
}

/***/ }),

/***/ "./src/enums/ObfuscationTarget.ts":
/*!****************************************!*\
  !*** ./src/enums/ObfuscationTarget.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ObfuscationTarget;

(function (ObfuscationTarget) {
  ObfuscationTarget["Browser"] = "browser";
  ObfuscationTarget["BrowserNoEval"] = "browser-no-eval";
  ObfuscationTarget["Node"] = "node";
})(ObfuscationTarget = exports.ObfuscationTarget || (exports.ObfuscationTarget = {}));

/***/ }),

/***/ "./src/enums/StringArrayEncoding.ts":
/*!******************************************!*\
  !*** ./src/enums/StringArrayEncoding.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var StringArrayEncoding;

(function (StringArrayEncoding) {
  StringArrayEncoding["Base64"] = "base64";
  StringArrayEncoding["Rc4"] = "rc4";
})(StringArrayEncoding = exports.StringArrayEncoding || (exports.StringArrayEncoding = {}));

/***/ }),

/***/ "./src/enums/analyzers/stack-trace-analyzer/CalleeDataExtractor.ts":
/*!*************************************************************************!*\
  !*** ./src/enums/analyzers/stack-trace-analyzer/CalleeDataExtractor.ts ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CalleeDataExtractor;

(function (CalleeDataExtractor) {
  CalleeDataExtractor["FunctionDeclarationCalleeDataExtractor"] = "FunctionDeclarationCalleeDataExtractor";
  CalleeDataExtractor["FunctionExpressionCalleeDataExtractor"] = "FunctionExpressionCalleeDataExtractor";
  CalleeDataExtractor["ObjectExpressionCalleeDataExtractor"] = "ObjectExpressionCalleeDataExtractor";
})(CalleeDataExtractor = exports.CalleeDataExtractor || (exports.CalleeDataExtractor = {}));

/***/ }),

/***/ "./src/enums/custom-nodes/ControlFlowCustomNode.ts":
/*!*********************************************************!*\
  !*** ./src/enums/custom-nodes/ControlFlowCustomNode.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ControlFlowCustomNode;

(function (ControlFlowCustomNode) {
  ControlFlowCustomNode["BinaryExpressionFunctionNode"] = "BinaryExpressionFunctionNode";
  ControlFlowCustomNode["BlockStatementControlFlowFlatteningNode"] = "BlockStatementControlFlowFlatteningNode";
  ControlFlowCustomNode["CallExpressionControlFlowStorageCallNode"] = "CallExpressionControlFlowStorageCallNode";
  ControlFlowCustomNode["CallExpressionFunctionNode"] = "CallExpressionFunctionNode";
  ControlFlowCustomNode["ControlFlowStorageNode"] = "ControlFlowStorageNode";
  ControlFlowCustomNode["ExpressionWithOperatorControlFlowStorageCallNode"] = "ExpressionWithOperatorControlFlowStorageCallNode";
  ControlFlowCustomNode["LogicalExpressionFunctionNode"] = "LogicalExpressionFunctionNode";
  ControlFlowCustomNode["StringLiteralControlFlowStorageCallNode"] = "StringLiteralControlFlowStorageCallNode";
  ControlFlowCustomNode["StringLiteralNode"] = "StringLiteralNode";
})(ControlFlowCustomNode = exports.ControlFlowCustomNode || (exports.ControlFlowCustomNode = {}));

/***/ }),

/***/ "./src/enums/custom-nodes/CustomNode.ts":
/*!**********************************************!*\
  !*** ./src/enums/custom-nodes/CustomNode.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CustomNode;

(function (CustomNode) {
  CustomNode["ConsoleOutputDisableExpressionNode"] = "ConsoleOutputDisableExpressionNode";
  CustomNode["DebugProtectionFunctionCallNode"] = "DebugProtectionFunctionCallNode";
  CustomNode["DebugProtectionFunctionIntervalNode"] = "DebugProtectionFunctionIntervalNode";
  CustomNode["DebugProtectionFunctionNode"] = "DebugProtectionFunctionNode";
  CustomNode["DomainLockNode"] = "DomainLockNode";
  CustomNode["NodeCallsControllerFunctionNode"] = "NodeCallsControllerFunctionNode";
  CustomNode["SelfDefendingUnicodeNode"] = "SelfDefendingUnicodeNode";
  CustomNode["StringArrayCallsWrapper"] = "StringArrayCallsWrapper";
  CustomNode["StringArrayNode"] = "StringArrayNode";
  CustomNode["StringArrayRotateFunctionNode"] = "StringArrayRotateFunctionNode";
})(CustomNode = exports.CustomNode || (exports.CustomNode = {}));

/***/ }),

/***/ "./src/enums/custom-nodes/CustomNodeGroup.ts":
/*!***************************************************!*\
  !*** ./src/enums/custom-nodes/CustomNodeGroup.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CustomNodeGroup;

(function (CustomNodeGroup) {
  CustomNodeGroup["ConsoleOutputCustomNodeGroup"] = "ConsoleOutputCustomNodeGroup";
  CustomNodeGroup["DebugProtectionCustomNodeGroup"] = "DebugProtectionCustomNodeGroup";
  CustomNodeGroup["DomainLockCustomNodeGroup"] = "DomainLockCustomNodeGroup";
  CustomNodeGroup["SelfDefendingCustomNodeGroup"] = "SelfDefendingCustomNodeGroup";
  CustomNodeGroup["StringArrayCustomNodeGroup"] = "StringArrayCustomNodeGroup";
})(CustomNodeGroup = exports.CustomNodeGroup || (exports.CustomNodeGroup = {}));

/***/ }),

/***/ "./src/enums/custom-nodes/DeadCodeInjectionCustomNode.ts":
/*!***************************************************************!*\
  !*** ./src/enums/custom-nodes/DeadCodeInjectionCustomNode.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DeadCodeInjectionCustomNode;

(function (DeadCodeInjectionCustomNode) {
  DeadCodeInjectionCustomNode["BlockStatementDeadCodeInjectionNode"] = "BlockStatementDeadCodeInjectionNode";
})(DeadCodeInjectionCustomNode = exports.DeadCodeInjectionCustomNode || (exports.DeadCodeInjectionCustomNode = {}));

/***/ }),

/***/ "./src/enums/event-emitters/ObfuscationEvent.ts":
/*!******************************************************!*\
  !*** ./src/enums/event-emitters/ObfuscationEvent.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ObfuscationEvent;

(function (ObfuscationEvent) {
  ObfuscationEvent["AfterObfuscation"] = "afterObfuscation";
  ObfuscationEvent["BeforeObfuscation"] = "beforeObfuscation";
})(ObfuscationEvent = exports.ObfuscationEvent || (exports.ObfuscationEvent = {}));

/***/ }),

/***/ "./src/enums/generators/identifier-names-generators/IdentifierNamesGenerator.ts":
/*!**************************************************************************************!*\
  !*** ./src/enums/generators/identifier-names-generators/IdentifierNamesGenerator.ts ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var IdentifierNamesGenerator;

(function (IdentifierNamesGenerator) {
  IdentifierNamesGenerator["HexadecimalIdentifierNamesGenerator"] = "hexadecimal";
  IdentifierNamesGenerator["MangledIdentifierNamesGenerator"] = "mangled";
})(IdentifierNamesGenerator = exports.IdentifierNamesGenerator || (exports.IdentifierNamesGenerator = {}));

/***/ }),

/***/ "./src/enums/logger/LoggingMessage.ts":
/*!********************************************!*\
  !*** ./src/enums/logger/LoggingMessage.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LoggingMessage;

(function (LoggingMessage) {
  LoggingMessage["EmptySourceCode"] = "Empty source code. Obfuscation canceled...";
  LoggingMessage["ObfuscationCompleted"] = "Obfuscation completed. Total time: %s sec.";
  LoggingMessage["ObfuscationStarted"] = "Obfuscation started...";
  LoggingMessage["RandomGeneratorSeed"] = "Random generator seed: %s...";
  LoggingMessage["TransformationStage"] = "Transformation stage: %s...";
  LoggingMessage["Version"] = "Version: %s";
})(LoggingMessage = exports.LoggingMessage || (exports.LoggingMessage = {}));

/***/ }),

/***/ "./src/enums/logger/LoggingPrefix.ts":
/*!*******************************************!*\
  !*** ./src/enums/logger/LoggingPrefix.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LoggingPrefix;

(function (LoggingPrefix) {
  LoggingPrefix["Base"] = "[javascript-obfuscator]";
  LoggingPrefix["CLI"] = "[javascript-obfuscator-cli]";
})(LoggingPrefix = exports.LoggingPrefix || (exports.LoggingPrefix = {}));

/***/ }),

/***/ "./src/enums/node-transformers/NodeTransformer.ts":
/*!********************************************************!*\
  !*** ./src/enums/node-transformers/NodeTransformer.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var NodeTransformer;

(function (NodeTransformer) {
  NodeTransformer["BlockStatementControlFlowTransformer"] = "BlockStatementControlFlowTransformer";
  NodeTransformer["ClassDeclarationTransformer"] = "ClassDeclarationTransformer";
  NodeTransformer["CommentsTransformer"] = "CommentsTransformer";
  NodeTransformer["CustomNodesTransformer"] = "CustomNodesTransformer";
  NodeTransformer["DeadCodeInjectionTransformer"] = "DeadCodeInjectionTransformer";
  NodeTransformer["EvalCallExpressionTransformer"] = "EvalCallExpressionTransformer";
  NodeTransformer["FunctionControlFlowTransformer"] = "FunctionControlFlowTransformer";
  NodeTransformer["CatchClauseTransformer"] = "CatchClauseTransformer";
  NodeTransformer["FunctionDeclarationTransformer"] = "FunctionDeclarationTransformer";
  NodeTransformer["FunctionTransformer"] = "FunctionTransformer";
  NodeTransformer["ImportDeclarationTransformer"] = "ImportDeclarationTransformer";
  NodeTransformer["LabeledStatementTransformer"] = "LabeledStatementTransformer";
  NodeTransformer["LiteralTransformer"] = "LiteralTransformer";
  NodeTransformer["MemberExpressionTransformer"] = "MemberExpressionTransformer";
  NodeTransformer["MetadataTransformer"] = "MetadataTransformer";
  NodeTransformer["MethodDefinitionTransformer"] = "MethodDefinitionTransformer";
  NodeTransformer["ObfuscatingGuardsTransformer"] = "ObfuscatingGuardsTransformer";
  NodeTransformer["ObjectExpressionKeysTransformer"] = "ObjectExpressionKeysTransformer";
  NodeTransformer["ObjectExpressionTransformer"] = "ObjectExpressionTransformer";
  NodeTransformer["ParentificationTransformer"] = "ParentificationTransformer";
  NodeTransformer["TemplateLiteralTransformer"] = "TemplateLiteralTransformer";
  NodeTransformer["VariableDeclarationTransformer"] = "VariableDeclarationTransformer";
})(NodeTransformer = exports.NodeTransformer || (exports.NodeTransformer = {}));

/***/ }),

/***/ "./src/enums/node-transformers/TransformationStage.ts":
/*!************************************************************!*\
  !*** ./src/enums/node-transformers/TransformationStage.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var TransformationStage;

(function (TransformationStage) {
  TransformationStage["Preparing"] = "Preparing";
  TransformationStage["DeadCodeInjection"] = "DeadCodeInjection";
  TransformationStage["ControlFlowFlattening"] = "ControlFlowFlattening";
  TransformationStage["Converting"] = "Converting";
  TransformationStage["Obfuscating"] = "Obfuscating";
  TransformationStage["Finalizing"] = "Finalizing";
})(TransformationStage = exports.TransformationStage || (exports.TransformationStage = {}));

/***/ }),

/***/ "./src/enums/node-transformers/VisitorDirection.ts":
/*!*********************************************************!*\
  !*** ./src/enums/node-transformers/VisitorDirection.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var VisitorDirection;

(function (VisitorDirection) {
  VisitorDirection["Enter"] = "enter";
  VisitorDirection["Leave"] = "leave";
})(VisitorDirection = exports.VisitorDirection || (exports.VisitorDirection = {}));

/***/ }),

/***/ "./src/enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor.ts ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PropertiesExtractor;

(function (PropertiesExtractor) {
  PropertiesExtractor["AssignmentExpressionPropertiesExtractor"] = "AssignmentExpressionPropertiesExtractor";
  PropertiesExtractor["VariableDeclaratorPropertiesExtractor"] = "VariableDeclaratorPropertiesExtractor";
})(PropertiesExtractor = exports.PropertiesExtractor || (exports.PropertiesExtractor = {}));

/***/ }),

/***/ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer.ts ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ControlFlowReplacer;

(function (ControlFlowReplacer) {
  ControlFlowReplacer["BinaryExpressionControlFlowReplacer"] = "BinaryExpressionControlFlowReplacer";
  ControlFlowReplacer["CallExpressionControlFlowReplacer"] = "CallExpressionControlFlowReplacer";
  ControlFlowReplacer["LogicalExpressionControlFlowReplacer"] = "LogicalExpressionControlFlowReplacer";
  ControlFlowReplacer["StringLiteralControlFlowReplacer"] = "StringLiteralControlFlowReplacer";
})(ControlFlowReplacer = exports.ControlFlowReplacer || (exports.ControlFlowReplacer = {}));

/***/ }),

/***/ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts":
/*!*********************************************************************************************************************!*\
  !*** ./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var IdentifierObfuscatingReplacer;

(function (IdentifierObfuscatingReplacer) {
  IdentifierObfuscatingReplacer["BaseIdentifierObfuscatingReplacer"] = "BaseIdentifierObfuscatingReplacer";
})(IdentifierObfuscatingReplacer = exports.IdentifierObfuscatingReplacer || (exports.IdentifierObfuscatingReplacer = {}));

/***/ }),

/***/ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer.ts ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var LiteralObfuscatingReplacer;

(function (LiteralObfuscatingReplacer) {
  LiteralObfuscatingReplacer["BooleanLiteralObfuscatingReplacer"] = "BooleanLiteralObfuscatingReplacer";
  LiteralObfuscatingReplacer["NumberLiteralObfuscatingReplacer"] = "NumberLiteralObfuscatingReplacer";
  LiteralObfuscatingReplacer["StringLiteralObfuscatingReplacer"] = "StringLiteralObfuscatingReplacer";
})(LiteralObfuscatingReplacer = exports.LiteralObfuscatingReplacer || (exports.LiteralObfuscatingReplacer = {}));

/***/ }),

/***/ "./src/enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard.ts":
/*!***************************************************************************************************!*\
  !*** ./src/enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard.ts ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ObfuscatingGuard;

(function (ObfuscatingGuard) {
  ObfuscatingGuard["BlackListNodeGuard"] = "BlackListNodeGuard";
  ObfuscatingGuard["ConditionalCommentNodeGuard"] = "ConditionalCommentNodeGuard";
})(ObfuscatingGuard = exports.ObfuscatingGuard || (exports.ObfuscatingGuard = {}));

/***/ }),

/***/ "./src/enums/node/NodeType.ts":
/*!************************************!*\
  !*** ./src/enums/node/NodeType.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var NodeType;

(function (NodeType) {
  NodeType["ArrayExpression"] = "ArrayExpression";
  NodeType["ArrayPattern"] = "ArrayPattern";
  NodeType["ArrowFunctionExpression"] = "ArrowFunctionExpression";
  NodeType["AssignmentExpression"] = "AssignmentExpression";
  NodeType["AssignmentPattern"] = "AssignmentPattern";
  NodeType["AwaitExpression"] = "AwaitExpression";
  NodeType["BinaryExpression"] = "BinaryExpression";
  NodeType["BlockStatement"] = "BlockStatement";
  NodeType["BreakStatement"] = "BreakStatement";
  NodeType["CallExpression"] = "CallExpression";
  NodeType["CatchClause"] = "CatchClause";
  NodeType["ClassDeclaration"] = "ClassDeclaration";
  NodeType["ContinueStatement"] = "ContinueStatement";
  NodeType["ExportNamedDeclaration"] = "ExportNamedDeclaration";
  NodeType["ExpressionStatement"] = "ExpressionStatement";
  NodeType["FunctionDeclaration"] = "FunctionDeclaration";
  NodeType["FunctionExpression"] = "FunctionExpression";
  NodeType["Identifier"] = "Identifier";
  NodeType["IfStatement"] = "IfStatement";
  NodeType["ImportDeclaration"] = "ImportDeclaration";
  NodeType["ImportDefaultSpecifier"] = "ImportDefaultSpecifier";
  NodeType["ImportNamespaceSpecifier"] = "ImportNamespaceSpecifier";
  NodeType["ImportSpecifier"] = "ImportSpecifier";
  NodeType["LabeledStatement"] = "LabeledStatement";
  NodeType["Literal"] = "Literal";
  NodeType["LogicalExpression"] = "LogicalExpression";
  NodeType["MemberExpression"] = "MemberExpression";
  NodeType["MethodDefinition"] = "MethodDefinition";
  NodeType["ObjectExpression"] = "ObjectExpression";
  NodeType["ObjectPattern"] = "ObjectPattern";
  NodeType["Program"] = "Program";
  NodeType["Property"] = "Property";
  NodeType["RestElement"] = "RestElement";
  NodeType["ReturnStatement"] = "ReturnStatement";
  NodeType["Super"] = "Super";
  NodeType["SwitchCase"] = "SwitchCase";
  NodeType["SwitchStatement"] = "SwitchStatement";
  NodeType["TaggedTemplateExpression"] = "TaggedTemplateExpression";
  NodeType["TemplateLiteral"] = "TemplateLiteral";
  NodeType["TryStatement"] = "TryStatement";
  NodeType["UnaryExpression"] = "UnaryExpression";
  NodeType["UpdateExpression"] = "UpdateExpression";
  NodeType["VariableDeclaration"] = "VariableDeclaration";
  NodeType["VariableDeclarator"] = "VariableDeclarator";
  NodeType["WhileStatement"] = "WhileStatement";
})(NodeType = exports.NodeType || (exports.NodeType = {}));

/***/ }),

/***/ "./src/enums/source-map/SourceMapMode.ts":
/*!***********************************************!*\
  !*** ./src/enums/source-map/SourceMapMode.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SourceMapMode;

(function (SourceMapMode) {
  SourceMapMode["Inline"] = "inline";
  SourceMapMode["Separate"] = "separate";
})(SourceMapMode = exports.SourceMapMode || (exports.SourceMapMode = {}));

/***/ }),

/***/ "./src/event-emitters/ObfuscationEventEmitter.ts":
/*!*******************************************************!*\
  !*** ./src/event-emitters/ObfuscationEventEmitter.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var events_1 = __webpack_require__(/*! events */ "events");

inversify_1.decorate(inversify_1.injectable(), events_1.EventEmitter);

var ObfuscationEventEmitter =
/*#__PURE__*/
function (_events_1$EventEmitte) {
  (0, _inherits2.default)(ObfuscationEventEmitter, _events_1$EventEmitte);

  function ObfuscationEventEmitter() {
    (0, _classCallCheck2.default)(this, ObfuscationEventEmitter);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ObfuscationEventEmitter).apply(this, arguments));
  }

  return ObfuscationEventEmitter;
}(events_1.EventEmitter);

ObfuscationEventEmitter = tslib_1.__decorate([inversify_1.injectable()], ObfuscationEventEmitter);
exports.ObfuscationEventEmitter = ObfuscationEventEmitter;

/***/ }),

/***/ "./src/generators/identifier-names-generators/AbstractIdentifierNamesGenerator.ts":
/*!****************************************************************************************!*\
  !*** ./src/generators/identifier-names-generators/AbstractIdentifierNamesGenerator.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var AbstractIdentifierNamesGenerator =
/*#__PURE__*/
function () {
  function AbstractIdentifierNamesGenerator(randomGenerator, options) {
    (0, _classCallCheck2.default)(this, AbstractIdentifierNamesGenerator);
    this.randomGenerator = randomGenerator;
    this.options = options;
  }

  (0, _createClass2.default)(AbstractIdentifierNamesGenerator, [{
    key: "isValidIdentifierName",
    value: function isValidIdentifierName(name) {
      return this.options.reservedNames.length ? !this.options.reservedNames.some(function (reservedName) {
        return new RegExp(reservedName, 'g').exec(name) !== null;
      }) : true;
    }
  }]);
  return AbstractIdentifierNamesGenerator;
}();

AbstractIdentifierNamesGenerator = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], AbstractIdentifierNamesGenerator);
exports.AbstractIdentifierNamesGenerator = AbstractIdentifierNamesGenerator;

/***/ }),

/***/ "./src/generators/identifier-names-generators/HexadecimalIdentifierNamesGenerator.ts":
/*!*******************************************************************************************!*\
  !*** ./src/generators/identifier-names-generators/HexadecimalIdentifierNamesGenerator.ts ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _set = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/set */ "@babel/runtime/core-js/set"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var HexadecimalIdentifierNamesGenerator_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var AbstractIdentifierNamesGenerator_1 = __webpack_require__(/*! ./AbstractIdentifierNamesGenerator */ "./src/generators/identifier-names-generators/AbstractIdentifierNamesGenerator.ts");

var NumberUtils_1 = __webpack_require__(/*! ../../utils/NumberUtils */ "./src/utils/NumberUtils.ts");

var Utils_1 = __webpack_require__(/*! ../../utils/Utils */ "./src/utils/Utils.ts");

var HexadecimalIdentifierNamesGenerator = HexadecimalIdentifierNamesGenerator_1 =
/*#__PURE__*/
function (_AbstractIdentifierNa) {
  (0, _inherits2.default)(HexadecimalIdentifierNamesGenerator, _AbstractIdentifierNa);

  function HexadecimalIdentifierNamesGenerator(randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, HexadecimalIdentifierNamesGenerator);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(HexadecimalIdentifierNamesGenerator).call(this, randomGenerator, options));
    _this.randomVariableNameSet = new _set.default();
    return _this;
  }

  (0, _createClass2.default)(HexadecimalIdentifierNamesGenerator, [{
    key: "generate",
    value: function generate() {
      var rangeMinInteger = 10000;
      var rangeMaxInteger = 99999999;
      var randomInteger = this.randomGenerator.getRandomInteger(rangeMinInteger, rangeMaxInteger);
      var hexadecimalNumber = NumberUtils_1.NumberUtils.toHex(randomInteger);
      var baseIdentifierName = hexadecimalNumber.substr(0, HexadecimalIdentifierNamesGenerator_1.baseIdentifierNameLength);
      var identifierName = "_".concat(Utils_1.Utils.hexadecimalPrefix).concat(baseIdentifierName);

      if (this.randomVariableNameSet.has(identifierName)) {
        return this.generate();
      }

      this.randomVariableNameSet.add(identifierName);
      return identifierName;
    }
  }, {
    key: "generateWithPrefix",
    value: function generateWithPrefix() {
      var identifierName = this.generate();
      return "".concat(this.options.identifiersPrefix).concat(identifierName).replace('__', '_');
    }
  }]);
  return HexadecimalIdentifierNamesGenerator;
}(AbstractIdentifierNamesGenerator_1.AbstractIdentifierNamesGenerator);

HexadecimalIdentifierNamesGenerator.baseIdentifierNameLength = 6;
HexadecimalIdentifierNamesGenerator = HexadecimalIdentifierNamesGenerator_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], HexadecimalIdentifierNamesGenerator);
exports.HexadecimalIdentifierNamesGenerator = HexadecimalIdentifierNamesGenerator;

/***/ }),

/***/ "./src/generators/identifier-names-generators/MangledIdentifierNamesGenerator.ts":
/*!***************************************************************************************!*\
  !*** ./src/generators/identifier-names-generators/MangledIdentifierNamesGenerator.ts ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var MangledIdentifierNamesGenerator_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var AbstractIdentifierNamesGenerator_1 = __webpack_require__(/*! ./AbstractIdentifierNamesGenerator */ "./src/generators/identifier-names-generators/AbstractIdentifierNamesGenerator.ts");

var MangledIdentifierNamesGenerator = MangledIdentifierNamesGenerator_1 =
/*#__PURE__*/
function (_AbstractIdentifierNa) {
  (0, _inherits2.default)(MangledIdentifierNamesGenerator, _AbstractIdentifierNa);

  function MangledIdentifierNamesGenerator(randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, MangledIdentifierNamesGenerator);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MangledIdentifierNamesGenerator).call(this, randomGenerator, options));
    _this.previousMangledName = MangledIdentifierNamesGenerator_1.initMangledNameCharacter;
    return _this;
  }

  (0, _createClass2.default)(MangledIdentifierNamesGenerator, [{
    key: "generate",
    value: function generate() {
      var identifierName = this.generateNewMangledName(this.previousMangledName);
      this.previousMangledName = identifierName;
      return identifierName;
    }
  }, {
    key: "generateWithPrefix",
    value: function generateWithPrefix() {
      var prefix = this.options.identifiersPrefix ? "".concat(this.options.identifiersPrefix, "_") : '';
      var identifierName = this.generate();
      return "".concat(prefix).concat(identifierName);
    }
  }, {
    key: "isValidIdentifierName",
    value: function isValidIdentifierName(mangledName) {
      return (0, _get2.default)((0, _getPrototypeOf2.default)(MangledIdentifierNamesGenerator.prototype), "isValidIdentifierName", this).call(this, mangledName) && !MangledIdentifierNamesGenerator_1.reservedNames.includes(mangledName);
    }
  }, {
    key: "generateNewMangledName",
    value: function generateNewMangledName(previousMangledName) {
      var generateNewMangledName = function generateNewMangledName(name) {
        var nameSequence = MangledIdentifierNamesGenerator_1.nameSequence;
        var nameLength = name.length;

        var zeroSequence = function zeroSequence(num) {
          return '0'.repeat(num);
        };

        var index = nameLength - 1;

        do {
          var character = name.charAt(index);
          var indexInSequence = nameSequence.indexOf(character);
          var lastNameSequenceIndex = nameSequence.length - 1;

          if (indexInSequence !== lastNameSequenceIndex) {
            var previousNamePart = name.substring(0, index);
            var nextCharacter = nameSequence[indexInSequence + 1];
            var zeroSequenceLength = nameLength - (index + 1);
            var zeroSequenceCharacters = zeroSequence(zeroSequenceLength);
            return previousNamePart + nextCharacter + zeroSequenceCharacters;
          }

          --index;
        } while (index >= 0);

        return "a".concat(zeroSequence(nameLength));
      };

      var newMangledName = generateNewMangledName(previousMangledName);

      if (!this.isValidIdentifierName(newMangledName)) {
        newMangledName = this.generateNewMangledName(newMangledName);
      }

      return newMangledName;
    }
  }]);
  return MangledIdentifierNamesGenerator;
}(AbstractIdentifierNamesGenerator_1.AbstractIdentifierNamesGenerator);

MangledIdentifierNamesGenerator.initMangledNameCharacter = '9';
MangledIdentifierNamesGenerator.nameSequence = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
MangledIdentifierNamesGenerator.reservedNames = ['byte', 'case', 'char', 'do', 'else', 'enum', 'eval', 'for', 'goto', 'if', 'in', 'int', 'let', 'long', 'new', 'null', 'this', 'true', 'try', 'var', 'void', 'with'];
MangledIdentifierNamesGenerator = MangledIdentifierNamesGenerator_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], MangledIdentifierNamesGenerator);
exports.MangledIdentifierNamesGenerator = MangledIdentifierNamesGenerator;

/***/ }),

/***/ "./src/logger/Logger.ts":
/*!******************************!*\
  !*** ./src/logger/Logger.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var Logger_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var chalk_1 = tslib_1.__importDefault(__webpack_require__(/*! chalk */ "chalk"));

var LoggingPrefix_1 = __webpack_require__(/*! ../enums/logger/LoggingPrefix */ "./src/enums/logger/LoggingPrefix.ts");

var Logger = Logger_1 =
/*#__PURE__*/
function () {
  function Logger(options) {
    (0, _classCallCheck2.default)(this, Logger);
    this.options = options;
  }

  (0, _createClass2.default)(Logger, [{
    key: "info",
    value: function info(loggingMessage, value) {
      if (!this.options.log) {
        return;
      }

      Logger_1.log(Logger_1.colorInfo, LoggingPrefix_1.LoggingPrefix.Base, loggingMessage, value);
    }
  }, {
    key: "success",
    value: function success(loggingMessage, value) {
      if (!this.options.log) {
        return;
      }

      Logger_1.log(Logger_1.colorSuccess, LoggingPrefix_1.LoggingPrefix.Base, loggingMessage, value);
    }
  }, {
    key: "warn",
    value: function warn(loggingMessage, value) {
      if (!this.options.log) {
        return;
      }

      Logger_1.log(Logger_1.colorWarn, LoggingPrefix_1.LoggingPrefix.Base, loggingMessage, value);
    }
  }], [{
    key: "log",
    value: function log(loggingLevelColor, loggingPrefix, loggingMessage, value) {
      var processedMessage = loggingLevelColor("\n".concat(loggingPrefix, " ").concat(loggingMessage));
      console.log(processedMessage, value || '');
    }
  }]);
  return Logger;
}();

Logger.colorInfo = chalk_1.default.cyan;
Logger.colorSuccess = chalk_1.default.green;
Logger.colorWarn = chalk_1.default.yellow;
Logger = Logger_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], Logger);
exports.Logger = Logger;

/***/ }),

/***/ "./src/node-transformers/AbstractNodeTransformer.ts":
/*!**********************************************************!*\
  !*** ./src/node-transformers/AbstractNodeTransformer.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var AbstractNodeTransformer = function AbstractNodeTransformer(randomGenerator, options) {
  (0, _classCallCheck2.default)(this, AbstractNodeTransformer);
  this.randomGenerator = randomGenerator;
  this.options = options;
};

AbstractNodeTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], AbstractNodeTransformer);
exports.AbstractNodeTransformer = AbstractNodeTransformer;

/***/ }),

/***/ "./src/node-transformers/TransformersRunner.ts":
/*!*****************************************************!*\
  !*** ./src/node-transformers/TransformersRunner.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var VisitorDirection_1 = __webpack_require__(/*! ../enums/node-transformers/VisitorDirection */ "./src/enums/node-transformers/VisitorDirection.ts");

var NodeGuards_1 = __webpack_require__(/*! ../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeMetadata_1 = __webpack_require__(/*! ../node/NodeMetadata */ "./src/node/NodeMetadata.ts");

var TransformersRunner =
/*#__PURE__*/
function () {
  function TransformersRunner(nodeTransformerFactory) {
    (0, _classCallCheck2.default)(this, TransformersRunner);
    this.nodeTransformerFactory = nodeTransformerFactory;
  }

  (0, _createClass2.default)(TransformersRunner, [{
    key: "transform",
    value: function transform(astTree, nodeTransformers, transformationStage) {
      if (!nodeTransformers.length) {
        return astTree;
      }

      var enterVisitors = [];
      var leaveVisitors = [];
      var nodeTransformersLength = nodeTransformers.length;
      var visitor;

      for (var i = 0; i < nodeTransformersLength; i++) {
        visitor = this.nodeTransformerFactory(nodeTransformers[i]).getVisitor(transformationStage);

        if (!visitor) {
          continue;
        }

        if (visitor.enter) {
          enterVisitors.push({
            enter: visitor.enter
          });
        }

        if (visitor.leave) {
          leaveVisitors.push({
            leave: visitor.leave
          });
        }
      }

      if (!enterVisitors.length && !leaveVisitors.length) {
        return astTree;
      }

      estraverse.replace(astTree, {
        enter: this.mergeVisitorsForDirection(enterVisitors, VisitorDirection_1.VisitorDirection.Enter),
        leave: this.mergeVisitorsForDirection(leaveVisitors, VisitorDirection_1.VisitorDirection.Leave)
      });
      return astTree;
    }
  }, {
    key: "mergeVisitorsForDirection",
    value: function mergeVisitorsForDirection(visitors, direction) {
      var visitorsLength = visitors.length;

      if (!visitorsLength) {
        return function (node, parentNode) {
          return node;
        };
      }

      return function (node, parentNode) {
        if (NodeMetadata_1.NodeMetadata.isIgnoredNode(node)) {
          return estraverse.VisitorOption.Skip;
        }

        for (var i = 0; i < visitorsLength; i++) {
          var visitorFunction = visitors[i][direction];

          if (!visitorFunction) {
            continue;
          }

          var visitorResult = visitorFunction(node, parentNode);

          if (!visitorResult || !NodeGuards_1.NodeGuards.isNode(visitorResult)) {
            continue;
          }

          node = visitorResult;
        }

        return node;
      };
    }
  }]);
  return TransformersRunner;
}();

TransformersRunner = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeTransformer)), tslib_1.__metadata("design:paramtypes", [Function])], TransformersRunner);
exports.TransformersRunner = TransformersRunner;

/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/BlockStatementControlFlowTransformer.ts":
/*!*************************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/BlockStatementControlFlowTransformer.ts ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var BlockStatementControlFlowTransformer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var ControlFlowCustomNode_1 = __webpack_require__(/*! ../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var BlockStatementControlFlowTransformer = BlockStatementControlFlowTransformer_1 =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(BlockStatementControlFlowTransformer, _AbstractNodeTransfor);

  function BlockStatementControlFlowTransformer(controlFlowCustomNodeFactory, arrayUtils, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, BlockStatementControlFlowTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BlockStatementControlFlowTransformer).call(this, randomGenerator, options));
    _this.controlFlowCustomNodeFactory = controlFlowCustomNodeFactory;
    _this.arrayUtils = arrayUtils;
    return _this;
  }

  (0, _createClass2.default)(BlockStatementControlFlowTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.ControlFlowFlattening:
          return {
            leave: function leave(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isBlockStatementNode(node)) {
                return _this2.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(blockStatementNode, parentNode) {
      if (this.randomGenerator.getMathRandom() > this.options.controlFlowFlatteningThreshold || !BlockStatementControlFlowTransformer_1.canTransformBlockStatementNode(blockStatementNode)) {
        return blockStatementNode;
      }

      var blockStatementBody = blockStatementNode.body;
      var originalKeys = this.arrayUtils.createWithRange(blockStatementBody.length);
      var shuffledKeys = this.arrayUtils.shuffle(originalKeys);
      var originalKeysIndexesInShuffledArray = originalKeys.map(function (key) {
        return shuffledKeys.indexOf(key);
      });
      var blockStatementControlFlowFlatteningCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.BlockStatementControlFlowFlatteningNode);
      blockStatementControlFlowFlatteningCustomNode.initialize(blockStatementBody, shuffledKeys, originalKeysIndexesInShuffledArray);
      var newBlockStatementNode = blockStatementControlFlowFlatteningCustomNode.getNode()[0];
      NodeUtils_1.NodeUtils.parentizeNode(newBlockStatementNode, parentNode);
      return newBlockStatementNode;
    }
  }], [{
    key: "blockStatementHasProhibitedStatements",
    value: function blockStatementHasProhibitedStatements(blockStatementNode) {
      return blockStatementNode.body.some(function (statement) {
        var isBreakOrContinueStatement = NodeGuards_1.NodeGuards.isBreakStatementNode(statement) || NodeGuards_1.NodeGuards.isContinueStatementNode(statement);
        var isVariableDeclarationWithLetOrConstKind = NodeGuards_1.NodeGuards.isVariableDeclarationNode(statement) && (statement.kind === 'const' || statement.kind === 'let');
        var isClassDeclaration = NodeGuards_1.NodeGuards.isClassDeclarationNode(statement);
        return NodeGuards_1.NodeGuards.isFunctionDeclarationNode(statement) || isBreakOrContinueStatement || isVariableDeclarationWithLetOrConstKind || isClassDeclaration;
      });
    }
  }, {
    key: "canTransformBlockStatementNode",
    value: function canTransformBlockStatementNode(blockStatementNode) {
      var canTransform = true;
      estraverse.traverse(blockStatementNode, {
        enter: function enter(node) {
          if (NodeGuards_1.NodeGuards.isWhileStatementNode(node)) {
            return estraverse.VisitorOption.Skip;
          }

          if (NodeGuards_1.NodeGuards.isBlockStatementNode(node) && BlockStatementControlFlowTransformer_1.blockStatementHasProhibitedStatements(node)) {
            canTransform = false;
          }
        }
      });

      if (blockStatementNode.body.length <= 4) {
        canTransform = false;
      }

      return canTransform;
    }
  }]);
  return BlockStatementControlFlowTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

BlockStatementControlFlowTransformer = BlockStatementControlFlowTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IArrayUtils)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])], BlockStatementControlFlowTransformer);
exports.BlockStatementControlFlowTransformer = BlockStatementControlFlowTransformer;

/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/FunctionControlFlowTransformer.ts":
/*!*******************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/FunctionControlFlowTransformer.ts ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

var _set = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/set */ "@babel/runtime/core-js/set"));

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var FunctionControlFlowTransformer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var ControlFlowCustomNode_1 = __webpack_require__(/*! ../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");

var ControlFlowReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer.ts");

var NodeType_1 = __webpack_require__(/*! ../../enums/node/NodeType */ "./src/enums/node/NodeType.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeAppender_1 = __webpack_require__(/*! ../../node/NodeAppender */ "./src/node/NodeAppender.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var FunctionControlFlowTransformer = FunctionControlFlowTransformer_1 =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(FunctionControlFlowTransformer, _AbstractNodeTransfor);

  function FunctionControlFlowTransformer(controlFlowStorageFactory, controlFlowReplacerFactory, controlFlowCustomNodeFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, FunctionControlFlowTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FunctionControlFlowTransformer).call(this, randomGenerator, options));
    _this.controlFlowData = new _map.default();
    _this.visitedFunctionNodes = new _set.default();
    _this.hostNodesWithControlFlowNode = new _set.default();
    _this.controlFlowStorageFactory = controlFlowStorageFactory;
    _this.controlFlowReplacerFactory = controlFlowReplacerFactory;
    _this.controlFlowCustomNodeFactory = controlFlowCustomNodeFactory;
    return _this;
  }

  (0, _createClass2.default)(FunctionControlFlowTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.ControlFlowFlattening:
          return {
            leave: function leave(node, parentNode) {
              if (parentNode && (NodeGuards_1.NodeGuards.isFunctionDeclarationNode(node) || NodeGuards_1.NodeGuards.isFunctionExpressionNode(node) || NodeGuards_1.NodeGuards.isArrowFunctionExpressionNode(node))) {
                return _this2.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(functionNode, parentNode) {
      this.visitedFunctionNodes.add(functionNode);

      if (!NodeGuards_1.NodeGuards.isBlockStatementNode(functionNode.body)) {
        return functionNode;
      }

      var hostNode = this.getHostNode(functionNode.body);
      var controlFlowStorage = this.getControlFlowStorage(hostNode);
      this.controlFlowData.set(hostNode, controlFlowStorage);
      this.transformFunctionBody(functionNode.body, controlFlowStorage);

      if (!controlFlowStorage.getLength()) {
        return functionNode;
      }

      var controlFlowStorageCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.ControlFlowStorageNode);
      controlFlowStorageCustomNode.initialize(controlFlowStorage);
      NodeAppender_1.NodeAppender.prepend(hostNode, controlFlowStorageCustomNode.getNode());
      this.hostNodesWithControlFlowNode.add(hostNode);
      return functionNode;
    }
  }, {
    key: "getControlFlowStorage",
    value: function getControlFlowStorage(hostNode) {
      var controlFlowStorage = this.controlFlowStorageFactory();

      if (this.controlFlowData.has(hostNode)) {
        if (this.hostNodesWithControlFlowNode.has(hostNode)) {
          hostNode.body.shift();
        }

        var hostControlFlowStorage = this.controlFlowData.get(hostNode);
        controlFlowStorage.mergeWith(hostControlFlowStorage, true);
      }

      return controlFlowStorage;
    }
  }, {
    key: "getHostNode",
    value: function getHostNode(functionNodeBody) {
      var blockScopesOfNode = NodeUtils_1.NodeUtils.getBlockScopesOfNode(functionNodeBody);

      if (blockScopesOfNode.length === 1) {
        return functionNodeBody;
      } else {
        blockScopesOfNode.pop();
      }

      if (blockScopesOfNode.length > FunctionControlFlowTransformer_1.hostNodeSearchMinDepth) {
        blockScopesOfNode.splice(0, FunctionControlFlowTransformer_1.hostNodeSearchMinDepth);
      }

      if (blockScopesOfNode.length > FunctionControlFlowTransformer_1.hostNodeSearchMaxDepth) {
        blockScopesOfNode.length = FunctionControlFlowTransformer_1.hostNodeSearchMaxDepth;
      }

      return this.randomGenerator.getRandomGenerator().pickone(blockScopesOfNode);
    }
  }, {
    key: "isVisitedFunctionNode",
    value: function isVisitedFunctionNode(node) {
      return (NodeGuards_1.NodeGuards.isFunctionDeclarationNode(node) || NodeGuards_1.NodeGuards.isFunctionExpressionNode(node) || NodeGuards_1.NodeGuards.isArrowFunctionExpressionNode(node)) && this.visitedFunctionNodes.has(node);
    }
  }, {
    key: "transformFunctionBody",
    value: function transformFunctionBody(functionNodeBody, controlFlowStorage) {
      var _this3 = this;

      estraverse.replace(functionNodeBody, {
        enter: function enter(node, parentNode) {
          if (NodeMetadata_1.NodeMetadata.isIgnoredNode(node)) {
            return estraverse.VisitorOption.Skip;
          }

          if (_this3.isVisitedFunctionNode(node) || !parentNode) {
            return estraverse.VisitorOption.Skip;
          }

          if (!FunctionControlFlowTransformer_1.controlFlowReplacersMap.has(node.type)) {
            return node;
          }

          if (_this3.randomGenerator.getMathRandom() > _this3.options.controlFlowFlatteningThreshold) {
            return node;
          }

          var controlFlowReplacerName = FunctionControlFlowTransformer_1.controlFlowReplacersMap.get(node.type);

          if (controlFlowReplacerName === undefined) {
            return node;
          }

          return (0, _assign.default)({}, _this3.controlFlowReplacerFactory(controlFlowReplacerName).replace(node, parentNode, controlFlowStorage), {
            parentNode: parentNode
          });
        }
      });
    }
  }]);
  return FunctionControlFlowTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

FunctionControlFlowTransformer.controlFlowReplacersMap = new _map.default([[NodeType_1.NodeType.BinaryExpression, ControlFlowReplacer_1.ControlFlowReplacer.BinaryExpressionControlFlowReplacer], [NodeType_1.NodeType.CallExpression, ControlFlowReplacer_1.ControlFlowReplacer.CallExpressionControlFlowReplacer], [NodeType_1.NodeType.LogicalExpression, ControlFlowReplacer_1.ControlFlowReplacer.LogicalExpressionControlFlowReplacer], [NodeType_1.NodeType.Literal, ControlFlowReplacer_1.ControlFlowReplacer.StringLiteralControlFlowReplacer]]);
FunctionControlFlowTransformer.hostNodeSearchMinDepth = 0;
FunctionControlFlowTransformer.hostNodeSearchMaxDepth = 2;
FunctionControlFlowTransformer = FunctionControlFlowTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__TControlFlowStorage)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowReplacer)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Function, Function, Object, Object])], FunctionControlFlowTransformer);
exports.FunctionControlFlowTransformer = FunctionControlFlowTransformer;

/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/control-flow-replacers/AbstractControlFlowReplacer.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/control-flow-replacers/AbstractControlFlowReplacer.ts ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var AbstractControlFlowReplacer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var AbstractControlFlowReplacer = AbstractControlFlowReplacer_1 =
/*#__PURE__*/
function () {
  function AbstractControlFlowReplacer(controlFlowCustomNodeFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, AbstractControlFlowReplacer);
    this.replacerDataByControlFlowStorageId = new _map.default();
    this.controlFlowCustomNodeFactory = controlFlowCustomNodeFactory;
    this.randomGenerator = randomGenerator;
    this.options = options;
  }

  (0, _createClass2.default)(AbstractControlFlowReplacer, [{
    key: "insertCustomNodeToControlFlowStorage",
    value: function insertCustomNodeToControlFlowStorage(customNode, controlFlowStorage, replacerId, usingExistingIdentifierChance) {
      var _this = this;

      var controlFlowStorageId = controlFlowStorage.getStorageId();
      var storageKeysById = AbstractControlFlowReplacer_1.getStorageKeysByIdForCurrentStorage(this.replacerDataByControlFlowStorageId, controlFlowStorageId);
      var storageKeysForCurrentId = storageKeysById.get(replacerId);

      if (this.randomGenerator.getMathRandom() < usingExistingIdentifierChance && storageKeysForCurrentId && storageKeysForCurrentId.length) {
        return this.randomGenerator.getRandomGenerator().pickone(storageKeysForCurrentId);
      }

      var generateStorageKey = function generateStorageKey(length) {
        var key = _this.randomGenerator.getRandomString(length);

        if (controlFlowStorage.getStorage().has(key)) {
          return generateStorageKey(length);
        }

        return key;
      };

      var storageKey = generateStorageKey(5);
      storageKeysById.set(replacerId, [storageKey]);
      this.replacerDataByControlFlowStorageId.set(controlFlowStorageId, storageKeysById);
      controlFlowStorage.set(storageKey, customNode);
      return storageKey;
    }
  }], [{
    key: "getStorageKeysByIdForCurrentStorage",
    value: function getStorageKeysByIdForCurrentStorage(identifierDataByControlFlowStorageId, controlFlowStorageId) {
      var storageKeysById;

      if (identifierDataByControlFlowStorageId.has(controlFlowStorageId)) {
        storageKeysById = identifierDataByControlFlowStorageId.get(controlFlowStorageId);
      } else {
        storageKeysById = new _map.default();
      }

      return storageKeysById;
    }
  }]);
  return AbstractControlFlowReplacer;
}();

AbstractControlFlowReplacer = AbstractControlFlowReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], AbstractControlFlowReplacer);
exports.AbstractControlFlowReplacer = AbstractControlFlowReplacer;

/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer.ts ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var BinaryExpressionControlFlowReplacer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var ControlFlowCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");

var ExpressionWithOperatorControlFlowReplacer_1 = __webpack_require__(/*! ./ExpressionWithOperatorControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/ExpressionWithOperatorControlFlowReplacer.ts");

var BinaryExpressionControlFlowReplacer = BinaryExpressionControlFlowReplacer_1 =
/*#__PURE__*/
function (_ExpressionWithOperat) {
  (0, _inherits2.default)(BinaryExpressionControlFlowReplacer, _ExpressionWithOperat);

  function BinaryExpressionControlFlowReplacer(controlFlowCustomNodeFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, BinaryExpressionControlFlowReplacer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BinaryExpressionControlFlowReplacer).call(this, controlFlowCustomNodeFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(BinaryExpressionControlFlowReplacer, [{
    key: "replace",
    value: function replace(binaryExpressionNode, parentNode, controlFlowStorage) {
      var replacerId = binaryExpressionNode.operator;
      var binaryExpressionFunctionCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.BinaryExpressionFunctionNode);
      binaryExpressionFunctionCustomNode.initialize(replacerId);
      var storageKey = this.insertCustomNodeToControlFlowStorage(binaryExpressionFunctionCustomNode, controlFlowStorage, replacerId, BinaryExpressionControlFlowReplacer_1.usingExistingIdentifierChance);
      return this.getControlFlowStorageCallNode(controlFlowStorage.getStorageId(), storageKey, binaryExpressionNode.left, binaryExpressionNode.right);
    }
  }]);
  return BinaryExpressionControlFlowReplacer;
}(ExpressionWithOperatorControlFlowReplacer_1.ExpressionWithOperatorControlFlowReplacer);

BinaryExpressionControlFlowReplacer.usingExistingIdentifierChance = 0.5;
BinaryExpressionControlFlowReplacer = BinaryExpressionControlFlowReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], BinaryExpressionControlFlowReplacer);
exports.BinaryExpressionControlFlowReplacer = BinaryExpressionControlFlowReplacer;

/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/control-flow-replacers/CallExpressionControlFlowReplacer.ts":
/*!*********************************************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/control-flow-replacers/CallExpressionControlFlowReplacer.ts ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var CallExpressionControlFlowReplacer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var ControlFlowCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");

var AbstractControlFlowReplacer_1 = __webpack_require__(/*! ./AbstractControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/AbstractControlFlowReplacer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var CallExpressionControlFlowReplacer = CallExpressionControlFlowReplacer_1 =
/*#__PURE__*/
function (_AbstractControlFlowR) {
  (0, _inherits2.default)(CallExpressionControlFlowReplacer, _AbstractControlFlowR);

  function CallExpressionControlFlowReplacer(controlFlowCustomNodeFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, CallExpressionControlFlowReplacer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CallExpressionControlFlowReplacer).call(this, controlFlowCustomNodeFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(CallExpressionControlFlowReplacer, [{
    key: "replace",
    value: function replace(callExpressionNode, parentNode, controlFlowStorage) {
      var callee = callExpressionNode.callee;

      if (!NodeGuards_1.NodeGuards.isIdentifierNode(callee)) {
        return callExpressionNode;
      }

      var replacerId = String(callExpressionNode.arguments.length);
      var callExpressionFunctionCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.CallExpressionFunctionNode);
      var expressionArguments = callExpressionNode.arguments;
      callExpressionFunctionCustomNode.initialize(expressionArguments);
      var storageKey = this.insertCustomNodeToControlFlowStorage(callExpressionFunctionCustomNode, controlFlowStorage, replacerId, CallExpressionControlFlowReplacer_1.usingExistingIdentifierChance);
      return this.getControlFlowStorageCallNode(controlFlowStorage.getStorageId(), storageKey, callee, expressionArguments);
    }
  }, {
    key: "getControlFlowStorageCallNode",
    value: function getControlFlowStorageCallNode(controlFlowStorageId, storageKey, callee, expressionArguments) {
      var controlFlowStorageCallCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.CallExpressionControlFlowStorageCallNode);
      controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey, callee, expressionArguments);
      var statementNode = controlFlowStorageCallCustomNode.getNode()[0];

      if (!statementNode || !NodeGuards_1.NodeGuards.isExpressionStatementNode(statementNode)) {
        throw new Error("`controlFlowStorageCallCustomNode.getNode()[0]` should returns array with `ExpressionStatement` node");
      }

      return statementNode.expression;
    }
  }]);
  return CallExpressionControlFlowReplacer;
}(AbstractControlFlowReplacer_1.AbstractControlFlowReplacer);

CallExpressionControlFlowReplacer.usingExistingIdentifierChance = 0.5;
CallExpressionControlFlowReplacer = CallExpressionControlFlowReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], CallExpressionControlFlowReplacer);
exports.CallExpressionControlFlowReplacer = CallExpressionControlFlowReplacer;

/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/control-flow-replacers/ExpressionWithOperatorControlFlowReplacer.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/control-flow-replacers/ExpressionWithOperatorControlFlowReplacer.ts ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var ControlFlowCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");

var AbstractControlFlowReplacer_1 = __webpack_require__(/*! ./AbstractControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/AbstractControlFlowReplacer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var ExpressionWithOperatorControlFlowReplacer =
/*#__PURE__*/
function (_AbstractControlFlowR) {
  (0, _inherits2.default)(ExpressionWithOperatorControlFlowReplacer, _AbstractControlFlowR);

  function ExpressionWithOperatorControlFlowReplacer(controlFlowCustomNodeFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, ExpressionWithOperatorControlFlowReplacer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ExpressionWithOperatorControlFlowReplacer).call(this, controlFlowCustomNodeFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(ExpressionWithOperatorControlFlowReplacer, [{
    key: "getControlFlowStorageCallNode",
    value: function getControlFlowStorageCallNode(controlFlowStorageId, storageKey, leftExpression, rightExpression) {
      var controlFlowStorageCallCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.ExpressionWithOperatorControlFlowStorageCallNode);
      controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey, leftExpression, rightExpression);
      var statementNode = controlFlowStorageCallCustomNode.getNode()[0];

      if (!statementNode || !NodeGuards_1.NodeGuards.isExpressionStatementNode(statementNode)) {
        throw new Error("`controlFlowStorageCallCustomNode.getNode()[0]` should returns array with `ExpressionStatement` node");
      }

      return statementNode.expression;
    }
  }]);
  return ExpressionWithOperatorControlFlowReplacer;
}(AbstractControlFlowReplacer_1.AbstractControlFlowReplacer);

ExpressionWithOperatorControlFlowReplacer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], ExpressionWithOperatorControlFlowReplacer);
exports.ExpressionWithOperatorControlFlowReplacer = ExpressionWithOperatorControlFlowReplacer;

/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/control-flow-replacers/LogicalExpressionControlFlowReplacer.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/control-flow-replacers/LogicalExpressionControlFlowReplacer.ts ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var LogicalExpressionControlFlowReplacer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var ControlFlowCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");

var ExpressionWithOperatorControlFlowReplacer_1 = __webpack_require__(/*! ./ExpressionWithOperatorControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/ExpressionWithOperatorControlFlowReplacer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var LogicalExpressionControlFlowReplacer = LogicalExpressionControlFlowReplacer_1 =
/*#__PURE__*/
function (_ExpressionWithOperat) {
  (0, _inherits2.default)(LogicalExpressionControlFlowReplacer, _ExpressionWithOperat);

  function LogicalExpressionControlFlowReplacer(controlFlowCustomNodeFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, LogicalExpressionControlFlowReplacer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LogicalExpressionControlFlowReplacer).call(this, controlFlowCustomNodeFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(LogicalExpressionControlFlowReplacer, [{
    key: "replace",
    value: function replace(logicalExpressionNode, parentNode, controlFlowStorage) {
      if (this.checkForProhibitedExpressions(logicalExpressionNode.left, logicalExpressionNode.right)) {
        return logicalExpressionNode;
      }

      var replacerId = logicalExpressionNode.operator;
      var logicalExpressionFunctionCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.LogicalExpressionFunctionNode);
      logicalExpressionFunctionCustomNode.initialize(replacerId);
      var storageKey = this.insertCustomNodeToControlFlowStorage(logicalExpressionFunctionCustomNode, controlFlowStorage, replacerId, LogicalExpressionControlFlowReplacer_1.usingExistingIdentifierChance);
      return this.getControlFlowStorageCallNode(controlFlowStorage.getStorageId(), storageKey, logicalExpressionNode.left, logicalExpressionNode.right);
    }
  }, {
    key: "checkForProhibitedExpressions",
    value: function checkForProhibitedExpressions(leftExpression, rightExpression) {
      return [leftExpression, rightExpression].some(function (expressionNode) {
        var nodeForCheck;

        if (!NodeGuards_1.NodeGuards.isUnaryExpressionNode(expressionNode)) {
          nodeForCheck = expressionNode;
        } else {
          nodeForCheck = NodeUtils_1.NodeUtils.getUnaryExpressionArgumentNode(expressionNode);
        }

        return !NodeGuards_1.NodeGuards.isLiteralNode(nodeForCheck) && !NodeGuards_1.NodeGuards.isIdentifierNode(nodeForCheck) && !NodeGuards_1.NodeGuards.isObjectExpressionNode(nodeForCheck) && !NodeGuards_1.NodeGuards.isExpressionStatementNode(nodeForCheck);
      });
    }
  }]);
  return LogicalExpressionControlFlowReplacer;
}(ExpressionWithOperatorControlFlowReplacer_1.ExpressionWithOperatorControlFlowReplacer);

LogicalExpressionControlFlowReplacer.usingExistingIdentifierChance = 0.5;
LogicalExpressionControlFlowReplacer = LogicalExpressionControlFlowReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], LogicalExpressionControlFlowReplacer);
exports.LogicalExpressionControlFlowReplacer = LogicalExpressionControlFlowReplacer;

/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/control-flow-replacers/StringLiteralControlFlowReplacer.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/control-flow-replacers/StringLiteralControlFlowReplacer.ts ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var StringLiteralControlFlowReplacer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var ControlFlowCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");

var AbstractControlFlowReplacer_1 = __webpack_require__(/*! ./AbstractControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/AbstractControlFlowReplacer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var StringLiteralControlFlowReplacer = StringLiteralControlFlowReplacer_1 =
/*#__PURE__*/
function (_AbstractControlFlowR) {
  (0, _inherits2.default)(StringLiteralControlFlowReplacer, _AbstractControlFlowR);

  function StringLiteralControlFlowReplacer(controlFlowCustomNodeFactory, randomGenerator, options) {
    (0, _classCallCheck2.default)(this, StringLiteralControlFlowReplacer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StringLiteralControlFlowReplacer).call(this, controlFlowCustomNodeFactory, randomGenerator, options));
  }

  (0, _createClass2.default)(StringLiteralControlFlowReplacer, [{
    key: "replace",
    value: function replace(literalNode, parentNode, controlFlowStorage) {
      if (NodeGuards_1.NodeGuards.isPropertyNode(parentNode) && parentNode.key === literalNode) {
        return literalNode;
      }

      if (typeof literalNode.value !== 'string' || literalNode.value.length < 3) {
        return literalNode;
      }

      var replacerId = String(literalNode.value);
      var literalFunctionCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.StringLiteralNode);
      literalFunctionCustomNode.initialize(literalNode.value);
      var storageKey = this.insertCustomNodeToControlFlowStorage(literalFunctionCustomNode, controlFlowStorage, replacerId, StringLiteralControlFlowReplacer_1.usingExistingIdentifierChance);
      return this.getControlFlowStorageCallNode(controlFlowStorage.getStorageId(), storageKey);
    }
  }, {
    key: "getControlFlowStorageCallNode",
    value: function getControlFlowStorageCallNode(controlFlowStorageId, storageKey) {
      var controlFlowStorageCallCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.StringLiteralControlFlowStorageCallNode);
      controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey);
      var statementNode = controlFlowStorageCallCustomNode.getNode()[0];

      if (!statementNode || !NodeGuards_1.NodeGuards.isExpressionStatementNode(statementNode)) {
        throw new Error("`controlFlowStorageCallCustomNode.getNode()[0]` should returns array with `ExpressionStatement` node");
      }

      return statementNode.expression;
    }
  }]);
  return StringLiteralControlFlowReplacer;
}(AbstractControlFlowReplacer_1.AbstractControlFlowReplacer);

StringLiteralControlFlowReplacer.usingExistingIdentifierChance = 1;
StringLiteralControlFlowReplacer = StringLiteralControlFlowReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], StringLiteralControlFlowReplacer);
exports.StringLiteralControlFlowReplacer = StringLiteralControlFlowReplacer;

/***/ }),

/***/ "./src/node-transformers/converting-transformers/MemberExpressionTransformer.ts":
/*!**************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/MemberExpressionTransformer.ts ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var MemberExpressionTransformer =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(MemberExpressionTransformer, _AbstractNodeTransfor);

  function MemberExpressionTransformer(randomGenerator, options) {
    (0, _classCallCheck2.default)(this, MemberExpressionTransformer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MemberExpressionTransformer).call(this, randomGenerator, options));
  }

  (0, _createClass2.default)(MemberExpressionTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Converting:
          return {
            enter: function enter(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isMemberExpressionNode(node)) {
                return _this.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(memberExpressionNode, parentNode) {
      if (NodeGuards_1.NodeGuards.isIdentifierNode(memberExpressionNode.property)) {
        if (memberExpressionNode.computed) {
          return memberExpressionNode;
        }

        memberExpressionNode.computed = true;
        memberExpressionNode.property = NodeFactory_1.NodeFactory.literalNode(memberExpressionNode.property.name);
      }

      return memberExpressionNode;
    }
  }]);
  return MemberExpressionTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

MemberExpressionTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], MemberExpressionTransformer);
exports.MemberExpressionTransformer = MemberExpressionTransformer;

/***/ }),

/***/ "./src/node-transformers/converting-transformers/MethodDefinitionTransformer.ts":
/*!**************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/MethodDefinitionTransformer.ts ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var MethodDefinitionTransformer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var MethodDefinitionTransformer = MethodDefinitionTransformer_1 =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(MethodDefinitionTransformer, _AbstractNodeTransfor);

  function MethodDefinitionTransformer(randomGenerator, options) {
    (0, _classCallCheck2.default)(this, MethodDefinitionTransformer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MethodDefinitionTransformer).call(this, randomGenerator, options));
  }

  (0, _createClass2.default)(MethodDefinitionTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Converting:
          return {
            enter: function enter(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isMethodDefinitionNode(node)) {
                return _this.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(methodDefinitionNode, parentNode) {
      if (NodeGuards_1.NodeGuards.isIdentifierNode(methodDefinitionNode.key) && !MethodDefinitionTransformer_1.ignoredNames.includes(methodDefinitionNode.key.name) && methodDefinitionNode.computed === false) {
        methodDefinitionNode.computed = true;
        methodDefinitionNode.key = NodeFactory_1.NodeFactory.literalNode(methodDefinitionNode.key.name);
      }

      return methodDefinitionNode;
    }
  }]);
  return MethodDefinitionTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

MethodDefinitionTransformer.ignoredNames = ['constructor'];
MethodDefinitionTransformer = MethodDefinitionTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], MethodDefinitionTransformer);
exports.MethodDefinitionTransformer = MethodDefinitionTransformer;

/***/ }),

/***/ "./src/node-transformers/converting-transformers/ObjectExpressionKeysTransformer.ts":
/*!******************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/ObjectExpressionKeysTransformer.ts ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var ObjectExpressionKeysTransformer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var NodeType_1 = __webpack_require__(/*! ../../enums/node/NodeType */ "./src/enums/node/NodeType.ts");

var PropertiesExtractor_1 = __webpack_require__(/*! ../../enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor */ "./src/enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var ObjectExpressionKeysTransformer = ObjectExpressionKeysTransformer_1 =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(ObjectExpressionKeysTransformer, _AbstractNodeTransfor);

  function ObjectExpressionKeysTransformer(propertiesExtractorFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, ObjectExpressionKeysTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ObjectExpressionKeysTransformer).call(this, randomGenerator, options));
    _this.propertiesExtractorFactory = propertiesExtractorFactory;
    return _this;
  }

  (0, _createClass2.default)(ObjectExpressionKeysTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      if (transformationStage !== TransformationStage_1.TransformationStage.Converting) {
        return null;
      }

      return {
        enter: function enter(node, parentNode) {
          if (_this2.options.transformObjectKeys && parentNode && NodeGuards_1.NodeGuards.isObjectExpressionNode(node)) {
            return _this2.transformNode(node, parentNode);
          }
        }
      };
    }
  }, {
    key: "transformNode",
    value: function transformNode(objectExpressionNode, parentNode) {
      if (!objectExpressionNode.properties.length) {
        return objectExpressionNode;
      }

      var propertiesExtractorName = ObjectExpressionKeysTransformer_1.propertiesExtractorsMap.get(parentNode.type);

      if (!propertiesExtractorName) {
        return objectExpressionNode;
      }

      var propertiesExtractor = this.propertiesExtractorFactory(propertiesExtractorName);
      return propertiesExtractor.extract(objectExpressionNode, parentNode);
    }
  }]);
  return ObjectExpressionKeysTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

ObjectExpressionKeysTransformer.propertiesExtractorsMap = new _map.default([[NodeType_1.NodeType.AssignmentExpression, PropertiesExtractor_1.PropertiesExtractor.AssignmentExpressionPropertiesExtractor], [NodeType_1.NodeType.VariableDeclarator, PropertiesExtractor_1.PropertiesExtractor.VariableDeclaratorPropertiesExtractor]]);
ObjectExpressionKeysTransformer = ObjectExpressionKeysTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IPropertiesExtractor)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], ObjectExpressionKeysTransformer);
exports.ObjectExpressionKeysTransformer = ObjectExpressionKeysTransformer;

/***/ }),

/***/ "./src/node-transformers/converting-transformers/ObjectExpressionTransformer.ts":
/*!**************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/ObjectExpressionTransformer.ts ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var ObjectExpressionTransformer =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(ObjectExpressionTransformer, _AbstractNodeTransfor);

  function ObjectExpressionTransformer(randomGenerator, options) {
    (0, _classCallCheck2.default)(this, ObjectExpressionTransformer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ObjectExpressionTransformer).call(this, randomGenerator, options));
  }

  (0, _createClass2.default)(ObjectExpressionTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Converting:
          return {
            enter: function enter(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isObjectExpressionNode(node)) {
                return _this.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(objectExpressionNode, parentNode) {
      objectExpressionNode.properties.forEach(function (property) {
        if (property.computed || !property.key) {
          return;
        }

        if (property.shorthand) {
          property.shorthand = false;
        }

        if (NodeGuards_1.NodeGuards.isIdentifierNode(property.key)) {
          property.key = NodeFactory_1.NodeFactory.literalNode(property.key.name);
        }
      });
      return objectExpressionNode;
    }
  }]);
  return ObjectExpressionTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

ObjectExpressionTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], ObjectExpressionTransformer);
exports.ObjectExpressionTransformer = ObjectExpressionTransformer;

/***/ }),

/***/ "./src/node-transformers/converting-transformers/TemplateLiteralTransformer.ts":
/*!*************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/TemplateLiteralTransformer.ts ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var TemplateLiteralTransformer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var TemplateLiteralTransformer = TemplateLiteralTransformer_1 =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(TemplateLiteralTransformer, _AbstractNodeTransfor);

  function TemplateLiteralTransformer(randomGenerator, options) {
    (0, _classCallCheck2.default)(this, TemplateLiteralTransformer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(TemplateLiteralTransformer).call(this, randomGenerator, options));
  }

  (0, _createClass2.default)(TemplateLiteralTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Converting:
          return {
            leave: function leave(node, parentNode) {
              if (parentNode && TemplateLiteralTransformer_1.isValidTemplateLiteralNode(node, parentNode)) {
                return _this.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(templateLiteralNode, parentNode) {
      var templateLiteralExpressions = templateLiteralNode.expressions;
      var nodes = [];
      templateLiteralNode.quasis.forEach(function (templateElement) {
        nodes.push(NodeFactory_1.NodeFactory.literalNode(templateElement.value.cooked));
        var expression = templateLiteralExpressions.shift();

        if (!expression) {
          return;
        }

        nodes.push(expression);
      });
      nodes = nodes.filter(function (node) {
        return !(NodeGuards_1.NodeGuards.isLiteralNode(node) && node.value === '');
      });

      if (!TemplateLiteralTransformer_1.isLiteralNodeWithStringValue(nodes[0]) && !TemplateLiteralTransformer_1.isLiteralNodeWithStringValue(nodes[1])) {
        nodes.unshift(NodeFactory_1.NodeFactory.literalNode(''));
      }

      if (nodes.length > 1) {
        var root = NodeFactory_1.NodeFactory.binaryExpressionNode('+', nodes.shift(), nodes.shift());
        nodes.forEach(function (node) {
          root = NodeFactory_1.NodeFactory.binaryExpressionNode('+', root, node);
        });
        return root;
      }

      return nodes[0];
    }
  }], [{
    key: "isLiteralNodeWithStringValue",
    value: function isLiteralNodeWithStringValue(node) {
      return node && NodeGuards_1.NodeGuards.isLiteralNode(node) && typeof node.value === 'string';
    }
  }, {
    key: "isValidTemplateLiteralNode",
    value: function isValidTemplateLiteralNode(node, parentNode) {
      return NodeGuards_1.NodeGuards.isTemplateLiteralNode(node) && !NodeGuards_1.NodeGuards.isTaggedTemplateExpressionNode(parentNode);
    }
  }]);
  return TemplateLiteralTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

TemplateLiteralTransformer = TemplateLiteralTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], TemplateLiteralTransformer);
exports.TemplateLiteralTransformer = TemplateLiteralTransformer;

/***/ }),

/***/ "./src/node-transformers/converting-transformers/properties-extractors/AbstractPropertiesExtractor.ts":
/*!************************************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/properties-extractors/AbstractPropertiesExtractor.ts ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray"));

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var AbstractPropertiesExtractor_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var NodeAppender_1 = __webpack_require__(/*! ../../../node/NodeAppender */ "./src/node/NodeAppender.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var AbstractPropertiesExtractor = AbstractPropertiesExtractor_1 =
/*#__PURE__*/
function () {
  function AbstractPropertiesExtractor(randomGenerator, options) {
    (0, _classCallCheck2.default)(this, AbstractPropertiesExtractor);
    this.cachedHostScopesMap = new _map.default();
    this.cachedHostStatementsMap = new _map.default();
    this.randomGenerator = randomGenerator;
    this.options = options;
  }

  (0, _createClass2.default)(AbstractPropertiesExtractor, [{
    key: "extractPropertiesToExpressionStatements",
    value: function extractPropertiesToExpressionStatements(properties, memberExpressionHostNode) {
      var propertiesLength = properties.length;
      var expressionStatements = [];
      var removablePropertyIds = [];

      for (var i = 0; i < propertiesLength; i++) {
        var property = properties[i];
        var propertyValue = property.value;

        if (AbstractPropertiesExtractor_1.isProhibitedPattern(propertyValue)) {
          continue;
        }

        var propertyKeyName = AbstractPropertiesExtractor_1.getPropertyNodeKeyName(property);

        if (!propertyKeyName) {
          continue;
        }

        var shouldCreateLiteralNode = !property.computed || property.computed && !!property.key && NodeGuards_1.NodeGuards.isLiteralNode(property.key);
        var memberExpressionProperty = shouldCreateLiteralNode ? NodeFactory_1.NodeFactory.literalNode(propertyKeyName) : NodeFactory_1.NodeFactory.identifierNode(propertyKeyName);
        var memberExpressionNode = NodeFactory_1.NodeFactory.memberExpressionNode(memberExpressionHostNode, memberExpressionProperty, true);
        var expressionStatementNode = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.assignmentExpressionNode('=', memberExpressionNode, propertyValue));

        if (NodeGuards_1.NodeGuards.isObjectExpressionNode(property.value)) {
          this.transformObjectExpressionNode(property.value, memberExpressionNode);
        }

        expressionStatements.push(expressionStatementNode);
        removablePropertyIds.push(i);
      }

      return [expressionStatements, removablePropertyIds];
    }
  }, {
    key: "filterExtractedObjectExpressionProperties",
    value: function filterExtractedObjectExpressionProperties(objectExpressionNode, removablePropertyIds) {
      objectExpressionNode.properties = objectExpressionNode.properties.filter(function (property, index) {
        return !removablePropertyIds.includes(index);
      });
    }
  }, {
    key: "transformObjectExpressionNode",
    value: function transformObjectExpressionNode(objectExpressionNode, memberExpressionHostNode) {
      var properties = objectExpressionNode.properties;

      var _this$extractProperti = this.extractPropertiesToExpressionStatements(properties, memberExpressionHostNode),
          _this$extractProperti2 = (0, _slicedToArray2.default)(_this$extractProperti, 2),
          expressionStatements = _this$extractProperti2[0],
          removablePropertyIds = _this$extractProperti2[1];

      var hostStatement = this.getHostStatement(objectExpressionNode);
      var scopeNode = this.getHostScopeNode(objectExpressionNode, hostStatement);
      this.filterExtractedObjectExpressionProperties(objectExpressionNode, removablePropertyIds);
      NodeAppender_1.NodeAppender.insertAfter(scopeNode, expressionStatements, hostStatement);
      return objectExpressionNode;
    }
  }, {
    key: "getHostScopeNode",
    value: function getHostScopeNode(objectExpressionNode, hostStatement) {
      if (this.cachedHostScopesMap.has(objectExpressionNode)) {
        return this.cachedHostScopesMap.get(objectExpressionNode);
      }

      var scopeNode = NodeUtils_1.NodeUtils.getScopeOfNode(hostStatement);
      this.cachedHostScopesMap.set(objectExpressionNode, scopeNode);
      return scopeNode;
    }
  }, {
    key: "getHostStatement",
    value: function getHostStatement(objectExpressionNode) {
      if (this.cachedHostStatementsMap.has(objectExpressionNode)) {
        return this.cachedHostStatementsMap.get(objectExpressionNode);
      }

      var hostStatement = NodeUtils_1.NodeUtils.getRootStatementOfNode(objectExpressionNode);
      this.cachedHostStatementsMap.set(objectExpressionNode, hostStatement);
      return hostStatement;
    }
  }], [{
    key: "getPropertyNodeKeyName",
    value: function getPropertyNodeKeyName(propertyNode) {
      if (!propertyNode.key) {
        return null;
      }

      var propertyKeyNode = propertyNode.key;

      if (NodeGuards_1.NodeGuards.isLiteralNode(propertyKeyNode) && typeof propertyKeyNode.value === 'string') {
        return propertyKeyNode.value;
      }

      if (NodeGuards_1.NodeGuards.isIdentifierNode(propertyKeyNode)) {
        return propertyKeyNode.name;
      }

      return null;
    }
  }, {
    key: "isProhibitedPattern",
    value: function isProhibitedPattern(node) {
      return NodeGuards_1.NodeGuards.isObjectPatternNode(node) || NodeGuards_1.NodeGuards.isArrayPatternNode(node) || NodeGuards_1.NodeGuards.isAssignmentPatternNode(node) || NodeGuards_1.NodeGuards.isRestElementNode(node);
    }
  }]);
  return AbstractPropertiesExtractor;
}();

AbstractPropertiesExtractor = AbstractPropertiesExtractor_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], AbstractPropertiesExtractor);
exports.AbstractPropertiesExtractor = AbstractPropertiesExtractor;

/***/ }),

/***/ "./src/node-transformers/converting-transformers/properties-extractors/AssignmentExpressionPropertiesExtractor.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/properties-extractors/AssignmentExpressionPropertiesExtractor.ts ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var AbstractPropertiesExtractor_1 = __webpack_require__(/*! ./AbstractPropertiesExtractor */ "./src/node-transformers/converting-transformers/properties-extractors/AbstractPropertiesExtractor.ts");

var AssignmentExpressionPropertiesExtractor =
/*#__PURE__*/
function (_AbstractPropertiesEx) {
  (0, _inherits2.default)(AssignmentExpressionPropertiesExtractor, _AbstractPropertiesEx);

  function AssignmentExpressionPropertiesExtractor(randomGenerator, options) {
    (0, _classCallCheck2.default)(this, AssignmentExpressionPropertiesExtractor);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AssignmentExpressionPropertiesExtractor).call(this, randomGenerator, options));
  }

  (0, _createClass2.default)(AssignmentExpressionPropertiesExtractor, [{
    key: "extract",
    value: function extract(objectExpressionNode, hostNode) {
      var leftNode = hostNode.left;

      if (AbstractPropertiesExtractor_1.AbstractPropertiesExtractor.isProhibitedPattern(leftNode)) {
        return objectExpressionNode;
      }

      return this.transformObjectExpressionNode(objectExpressionNode, leftNode);
    }
  }]);
  return AssignmentExpressionPropertiesExtractor;
}(AbstractPropertiesExtractor_1.AbstractPropertiesExtractor);

AssignmentExpressionPropertiesExtractor = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], AssignmentExpressionPropertiesExtractor);
exports.AssignmentExpressionPropertiesExtractor = AssignmentExpressionPropertiesExtractor;

/***/ }),

/***/ "./src/node-transformers/converting-transformers/properties-extractors/VariableDeclaratorPropertiesExtractor.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/properties-extractors/VariableDeclaratorPropertiesExtractor.ts ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var AbstractPropertiesExtractor_1 = __webpack_require__(/*! ./AbstractPropertiesExtractor */ "./src/node-transformers/converting-transformers/properties-extractors/AbstractPropertiesExtractor.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var VariableDeclaratorPropertiesExtractor =
/*#__PURE__*/
function (_AbstractPropertiesEx) {
  (0, _inherits2.default)(VariableDeclaratorPropertiesExtractor, _AbstractPropertiesEx);

  function VariableDeclaratorPropertiesExtractor(randomGenerator, options) {
    (0, _classCallCheck2.default)(this, VariableDeclaratorPropertiesExtractor);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(VariableDeclaratorPropertiesExtractor).call(this, randomGenerator, options));
  }

  (0, _createClass2.default)(VariableDeclaratorPropertiesExtractor, [{
    key: "extract",
    value: function extract(objectExpressionNode, hostNode) {
      if (!NodeGuards_1.NodeGuards.isIdentifierNode(hostNode.id) || this.isProhibitedObjectExpressionNode(objectExpressionNode, hostNode.id)) {
        return objectExpressionNode;
      }

      return this.transformObjectExpressionNode(objectExpressionNode, hostNode.id);
    }
  }, {
    key: "getHostVariableDeclaratorNode",
    value: function getHostVariableDeclaratorNode(objectExpressionNode) {
      var parentNode = objectExpressionNode.parentNode;

      if (!parentNode || !NodeGuards_1.NodeGuards.isVariableDeclaratorNode(parentNode)) {
        throw new Error('Cannot get `VariableDeclarator` node for `ObjectExpression` node');
      }

      return parentNode;
    }
  }, {
    key: "getHostVariableDeclarationNode",
    value: function getHostVariableDeclarationNode(variableDeclaratorNode) {
      var parentNode = variableDeclaratorNode.parentNode;

      if (!parentNode || !NodeGuards_1.NodeGuards.isVariableDeclarationNode(parentNode)) {
        throw new Error('Cannot get `VariableDeclaration` node for `VariableDeclarator` node');
      }

      return parentNode;
    }
  }, {
    key: "isProhibitedObjectExpressionNode",
    value: function isProhibitedObjectExpressionNode(objectExpressionNode, memberExpressionHostNode) {
      var hostVariableDeclarator = this.getHostVariableDeclaratorNode(objectExpressionNode);
      var hostVariableDeclaration = this.getHostVariableDeclarationNode(hostVariableDeclarator);
      var declarations = hostVariableDeclaration.declarations;
      var indexOfDeclarator = declarations.indexOf(hostVariableDeclarator);
      var isLastDeclarator = indexOfDeclarator === declarations.length - 1;

      if (isLastDeclarator) {
        return false;
      }

      var declaratorsAfterCurrentDeclarator = declarations.slice(indexOfDeclarator);
      var isProhibitedObjectExpressionNode = false;
      declaratorsAfterCurrentDeclarator.forEach(function (variableDeclarator) {
        estraverse.traverse(variableDeclarator, {
          enter: function enter(node) {
            if (NodeGuards_1.NodeGuards.isMemberExpressionNode(node) && NodeGuards_1.NodeGuards.isIdentifierNode(node.object) && node.object.name === memberExpressionHostNode.name) {
              isProhibitedObjectExpressionNode = true;
              return estraverse.VisitorOption.Break;
            }

            return node;
          }
        });
      });
      return isProhibitedObjectExpressionNode;
    }
  }]);
  return VariableDeclaratorPropertiesExtractor;
}(AbstractPropertiesExtractor_1.AbstractPropertiesExtractor);

VariableDeclaratorPropertiesExtractor = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], VariableDeclaratorPropertiesExtractor);
exports.VariableDeclaratorPropertiesExtractor = VariableDeclaratorPropertiesExtractor;

/***/ }),

/***/ "./src/node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer.ts":
/*!************************************************************************************************!*\
  !*** ./src/node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer.ts ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _set = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/set */ "@babel/runtime/core-js/set"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var DeadCodeInjectionTransformer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var DeadCodeInjectionCustomNode_1 = __webpack_require__(/*! ../../enums/custom-nodes/DeadCodeInjectionCustomNode */ "./src/enums/custom-nodes/DeadCodeInjectionCustomNode.ts");

var NodeTransformer_1 = __webpack_require__(/*! ../../enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");

var NodeType_1 = __webpack_require__(/*! ../../enums/node/NodeType */ "./src/enums/node/NodeType.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var DeadCodeInjectionTransformer = DeadCodeInjectionTransformer_1 =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(DeadCodeInjectionTransformer, _AbstractNodeTransfor);

  function DeadCodeInjectionTransformer(deadCodeInjectionCustomNodeFactory, transformersRunner, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, DeadCodeInjectionTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DeadCodeInjectionTransformer).call(this, randomGenerator, options));
    _this.deadCodeInjectionRootAstHostNodeSet = new _set.default();
    _this.collectedBlockStatements = [];
    _this.collectedBlockStatementsTotalLength = 0;
    _this.deadCodeInjectionCustomNodeFactory = deadCodeInjectionCustomNodeFactory;
    _this.transformersRunner = transformersRunner;
    return _this;
  }

  (0, _createClass2.default)(DeadCodeInjectionTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.DeadCodeInjection:
          return {
            enter: function enter(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isProgramNode(node)) {
                _this2.analyzeNode(node, parentNode);

                return node;
              }
            },
            leave: function leave(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isBlockStatementNode(node)) {
                return _this2.transformNode(node, parentNode);
              }
            }
          };

        case TransformationStage_1.TransformationStage.Finalizing:
          if (!this.deadCodeInjectionRootAstHostNodeSet.size) {
            return null;
          }

          return {
            enter: function enter(node, parentNode) {
              if (parentNode && _this2.isDeadCodeInjectionRootAstHostNode(node)) {
                return _this2.restoreNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "analyzeNode",
    value: function analyzeNode(programNode, parentNode) {
      var _this3 = this;

      estraverse.traverse(programNode, {
        enter: function enter(node) {
          if (!NodeGuards_1.NodeGuards.isBlockStatementNode(node)) {
            return;
          }

          var clonedBlockStatementNode = NodeUtils_1.NodeUtils.clone(node);

          if (!DeadCodeInjectionTransformer_1.isValidCollectedBlockStatementNode(clonedBlockStatementNode)) {
            return;
          }

          NodeUtils_1.NodeUtils.parentizeNode(clonedBlockStatementNode, clonedBlockStatementNode);
          clonedBlockStatementNode = _this3.transformersRunner.transform(clonedBlockStatementNode, DeadCodeInjectionTransformer_1.transformersToRenameBlockScopeIdentifiers, TransformationStage_1.TransformationStage.Obfuscating);

          _this3.collectedBlockStatements.push(clonedBlockStatementNode);
        }
      });
      this.collectedBlockStatementsTotalLength = this.collectedBlockStatements.length;
    }
  }, {
    key: "transformNode",
    value: function transformNode(blockStatementNode, parentNode) {
      var canBreakTraverse = !this.collectedBlockStatements.length || this.collectedBlockStatementsTotalLength < DeadCodeInjectionTransformer_1.minCollectedBlockStatementsCount;

      if (canBreakTraverse) {
        return estraverse.VisitorOption.Break;
      }

      if (this.randomGenerator.getMathRandom() > this.options.deadCodeInjectionThreshold || !DeadCodeInjectionTransformer_1.isValidWrappedBlockStatementNode(blockStatementNode)) {
        return blockStatementNode;
      }

      var minInteger = 0;
      var maxInteger = this.collectedBlockStatements.length - 1;
      var randomIndex = this.randomGenerator.getRandomInteger(minInteger, maxInteger);
      var randomBlockStatementNode = this.collectedBlockStatements.splice(randomIndex, 1)[0];
      var isDuplicateBlockStatementNodes = randomBlockStatementNode === blockStatementNode;

      if (isDuplicateBlockStatementNodes) {
        return blockStatementNode;
      }

      return this.replaceBlockStatementNode(blockStatementNode, randomBlockStatementNode, parentNode);
    }
  }, {
    key: "restoreNode",
    value: function restoreNode(deadCodeInjectionRootAstHostNode, parentNode) {
      var hostNodeFirstStatement = deadCodeInjectionRootAstHostNode.body[0];

      if (!NodeGuards_1.NodeGuards.isFunctionDeclarationNode(hostNodeFirstStatement)) {
        throw new Error('Wrong dead code injection root AST host node. Host node should contain `FunctionDeclaration` node');
      }

      return hostNodeFirstStatement.body;
    }
  }, {
    key: "isDeadCodeInjectionRootAstHostNode",
    value: function isDeadCodeInjectionRootAstHostNode(node) {
      return NodeGuards_1.NodeGuards.isBlockStatementNode(node) && this.deadCodeInjectionRootAstHostNodeSet.has(node);
    }
  }, {
    key: "replaceBlockStatementNode",
    value: function replaceBlockStatementNode(blockStatementNode, randomBlockStatementNode, parentNode) {
      var deadCodeInjectionRootAstHostNode = NodeFactory_1.NodeFactory.blockStatementNode([NodeFactory_1.NodeFactory.functionDeclarationNode(DeadCodeInjectionTransformer_1.deadCodeInjectionRootAstHostNodeName, [], randomBlockStatementNode)]);
      this.deadCodeInjectionRootAstHostNodeSet.add(deadCodeInjectionRootAstHostNode);
      var blockStatementDeadCodeInjectionCustomNode = this.deadCodeInjectionCustomNodeFactory(DeadCodeInjectionCustomNode_1.DeadCodeInjectionCustomNode.BlockStatementDeadCodeInjectionNode);
      blockStatementDeadCodeInjectionCustomNode.initialize(blockStatementNode, deadCodeInjectionRootAstHostNode);
      var newBlockStatementNode = blockStatementDeadCodeInjectionCustomNode.getNode()[0];
      NodeUtils_1.NodeUtils.parentizeNode(newBlockStatementNode, parentNode);
      return newBlockStatementNode;
    }
  }], [{
    key: "isProhibitedNodeInsideCollectedBlockStatement",
    value: function isProhibitedNodeInsideCollectedBlockStatement(targetNode) {
      return NodeGuards_1.NodeGuards.isBreakStatementNode(targetNode) || NodeGuards_1.NodeGuards.isContinueStatementNode(targetNode) || NodeGuards_1.NodeGuards.isAwaitExpressionNode(targetNode) || NodeGuards_1.NodeGuards.isSuperNode(targetNode);
    }
  }, {
    key: "isScopeHoistingFunctionDeclaration",
    value: function isScopeHoistingFunctionDeclaration(targetNode) {
      if (!NodeGuards_1.NodeGuards.isFunctionDeclarationNode(targetNode)) {
        return false;
      }

      var scopeNode = NodeUtils_1.NodeUtils.getScopeOfNode(targetNode);
      var scopeBody = !NodeGuards_1.NodeGuards.isSwitchCaseNode(scopeNode) ? scopeNode.body : scopeNode.consequent;
      var indexInScope = scopeBody.indexOf(targetNode);

      if (indexInScope === 0) {
        return false;
      }

      var slicedBody = scopeBody.slice(0, indexInScope);
      var hostBlockStatementNode = NodeFactory_1.NodeFactory.blockStatementNode(slicedBody);
      var functionDeclarationName = targetNode.id.name;
      var isScopeHoistedFunctionDeclaration = false;
      estraverse.traverse(hostBlockStatementNode, {
        enter: function enter(node) {
          if (NodeGuards_1.NodeGuards.isIdentifierNode(node) && node.name === functionDeclarationName) {
            isScopeHoistedFunctionDeclaration = true;
            return estraverse.VisitorOption.Break;
          }
        }
      });
      return isScopeHoistedFunctionDeclaration;
    }
  }, {
    key: "isValidCollectedBlockStatementNode",
    value: function isValidCollectedBlockStatementNode(blockStatementNode) {
      if (!blockStatementNode.body.length) {
        return false;
      }

      var nestedBlockStatementsCount = 0;
      var isValidBlockStatementNode = true;
      estraverse.traverse(blockStatementNode, {
        enter: function enter(node) {
          if (NodeGuards_1.NodeGuards.isBlockStatementNode(node)) {
            nestedBlockStatementsCount++;
          }

          if (nestedBlockStatementsCount > DeadCodeInjectionTransformer_1.maxNestedBlockStatementsCount || DeadCodeInjectionTransformer_1.isProhibitedNodeInsideCollectedBlockStatement(node) || DeadCodeInjectionTransformer_1.isScopeHoistingFunctionDeclaration(node)) {
            isValidBlockStatementNode = false;
            return estraverse.VisitorOption.Break;
          }
        }
      });
      return isValidBlockStatementNode;
    }
  }, {
    key: "isValidWrappedBlockStatementNode",
    value: function isValidWrappedBlockStatementNode(blockStatementNode) {
      if (!blockStatementNode.body.length) {
        return false;
      }

      var isValidBlockStatementNode = true;
      estraverse.traverse(blockStatementNode, {
        enter: function enter(node) {
          if (DeadCodeInjectionTransformer_1.isScopeHoistingFunctionDeclaration(node)) {
            isValidBlockStatementNode = false;
            return estraverse.VisitorOption.Break;
          }
        }
      });

      if (!isValidBlockStatementNode) {
        return false;
      }

      var blockScopeOfBlockStatementNode = NodeUtils_1.NodeUtils.getBlockScopesOfNode(blockStatementNode)[0];
      return blockScopeOfBlockStatementNode.type !== NodeType_1.NodeType.Program;
    }
  }]);
  return DeadCodeInjectionTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

DeadCodeInjectionTransformer.deadCodeInjectionRootAstHostNodeName = 'deadCodeInjectionRootAstHostNode';
DeadCodeInjectionTransformer.maxNestedBlockStatementsCount = 4;
DeadCodeInjectionTransformer.minCollectedBlockStatementsCount = 5;
DeadCodeInjectionTransformer.transformersToRenameBlockScopeIdentifiers = [NodeTransformer_1.NodeTransformer.CatchClauseTransformer, NodeTransformer_1.NodeTransformer.ClassDeclarationTransformer, NodeTransformer_1.NodeTransformer.FunctionDeclarationTransformer, NodeTransformer_1.NodeTransformer.FunctionTransformer, NodeTransformer_1.NodeTransformer.LabeledStatementTransformer, NodeTransformer_1.NodeTransformer.VariableDeclarationTransformer];
DeadCodeInjectionTransformer = DeadCodeInjectionTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IDeadCodeInjectionCustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ITransformersRunner)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])], DeadCodeInjectionTransformer);
exports.DeadCodeInjectionTransformer = DeadCodeInjectionTransformer;

/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/CatchClauseTransformer.ts":
/*!**********************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/CatchClauseTransformer.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var CatchClauseTransformer =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(CatchClauseTransformer, _AbstractNodeTransfor);

  function CatchClauseTransformer(identifierObfuscatingReplacerFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, CatchClauseTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CatchClauseTransformer).call(this, randomGenerator, options));
    _this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    return _this;
  }

  (0, _createClass2.default)(CatchClauseTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Obfuscating:
          return {
            enter: function enter(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isCatchClauseNode(node)) {
                return _this2.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(catchClauseNode, parentNode) {
      var blockScopeNode = NodeUtils_1.NodeUtils.getBlockScopesOfNode(catchClauseNode)[0];
      this.storeCatchClauseParam(catchClauseNode, blockScopeNode);
      this.replaceCatchClauseParam(catchClauseNode, blockScopeNode);
      return catchClauseNode;
    }
  }, {
    key: "storeCatchClauseParam",
    value: function storeCatchClauseParam(catchClauseNode, blockScopeNode) {
      if (NodeGuards_1.NodeGuards.isIdentifierNode(catchClauseNode.param)) {
        this.identifierObfuscatingReplacer.storeLocalName(catchClauseNode.param.name, blockScopeNode);
      }
    }
  }, {
    key: "replaceCatchClauseParam",
    value: function replaceCatchClauseParam(catchClauseNode, blockScopeNode) {
      var _this3 = this;

      estraverse.replace(catchClauseNode, {
        enter: function enter(node, parentNode) {
          if (parentNode && NodeGuards_1.NodeGuards.isReplaceableIdentifierNode(node, parentNode)) {
            var newIdentifier = _this3.identifierObfuscatingReplacer.replace(node.name, blockScopeNode);

            var newIdentifierName = newIdentifier.name;

            if (node.name !== newIdentifierName) {
              node.name = newIdentifierName;
              NodeMetadata_1.NodeMetadata.set(node, {
                renamedIdentifier: true
              });
            }
          }
        }
      });
    }
  }]);
  return CatchClauseTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

CatchClauseTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], CatchClauseTransformer);
exports.CatchClauseTransformer = CatchClauseTransformer;

/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/ClassDeclarationTransformer.ts":
/*!***************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/ClassDeclarationTransformer.ts ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");

var NodeType_1 = __webpack_require__(/*! ../../enums/node/NodeType */ "./src/enums/node/NodeType.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var ClassDeclarationTransformer =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(ClassDeclarationTransformer, _AbstractNodeTransfor);

  function ClassDeclarationTransformer(identifierObfuscatingReplacerFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, ClassDeclarationTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ClassDeclarationTransformer).call(this, randomGenerator, options));
    _this.replaceableIdentifiers = new _map.default();
    _this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    return _this;
  }

  (0, _createClass2.default)(ClassDeclarationTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Obfuscating:
          return {
            enter: function enter(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isClassDeclarationNode(node) && !NodeGuards_1.NodeGuards.isExportNamedDeclarationNode(parentNode)) {
                return _this2.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(classDeclarationNode, parentNode) {
      var blockScopeNode = NodeUtils_1.NodeUtils.getBlockScopesOfNode(classDeclarationNode)[0];
      var isGlobalDeclaration = blockScopeNode.type === NodeType_1.NodeType.Program;

      if (!this.options.renameGlobals && isGlobalDeclaration) {
        return classDeclarationNode;
      }

      this.storeClassName(classDeclarationNode, blockScopeNode, isGlobalDeclaration);

      if (this.replaceableIdentifiers.has(blockScopeNode)) {
        this.replaceScopeCachedIdentifiers(blockScopeNode);
      } else {
        this.replaceScopeIdentifiers(blockScopeNode);
      }

      return classDeclarationNode;
    }
  }, {
    key: "storeClassName",
    value: function storeClassName(classDeclarationNode, blockScopeNode, isGlobalDeclaration) {
      if (isGlobalDeclaration) {
        this.identifierObfuscatingReplacer.storeGlobalName(classDeclarationNode.id.name, blockScopeNode);
      } else {
        this.identifierObfuscatingReplacer.storeLocalName(classDeclarationNode.id.name, blockScopeNode);
      }
    }
  }, {
    key: "replaceScopeCachedIdentifiers",
    value: function replaceScopeCachedIdentifiers(blockScopeNode) {
      var _this3 = this;

      var cachedReplaceableIdentifiers = this.replaceableIdentifiers.get(blockScopeNode);
      cachedReplaceableIdentifiers.forEach(function (replaceableIdentifier) {
        var newReplaceableIdentifier = _this3.identifierObfuscatingReplacer.replace(replaceableIdentifier.name, blockScopeNode);

        replaceableIdentifier.name = newReplaceableIdentifier.name;
        NodeMetadata_1.NodeMetadata.set(replaceableIdentifier, {
          renamedIdentifier: true
        });
      });
    }
  }, {
    key: "replaceScopeIdentifiers",
    value: function replaceScopeIdentifiers(blockScopeNode) {
      var _this4 = this;

      var storedReplaceableIdentifiers = [];
      estraverse.replace(blockScopeNode, {
        enter: function enter(node, parentNode) {
          if (parentNode && NodeGuards_1.NodeGuards.isReplaceableIdentifierNode(node, parentNode) && !NodeMetadata_1.NodeMetadata.isRenamedIdentifier(node)) {
            var newIdentifier = _this4.identifierObfuscatingReplacer.replace(node.name, blockScopeNode);

            var newIdentifierName = newIdentifier.name;

            if (node.name !== newIdentifierName) {
              node.name = newIdentifierName;
              NodeMetadata_1.NodeMetadata.set(node, {
                renamedIdentifier: true
              });
            } else {
              storedReplaceableIdentifiers.push(node);
            }
          }
        }
      });
      this.replaceableIdentifiers.set(blockScopeNode, storedReplaceableIdentifiers);
    }
  }]);
  return ClassDeclarationTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

ClassDeclarationTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], ClassDeclarationTransformer);
exports.ClassDeclarationTransformer = ClassDeclarationTransformer;

/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/FunctionDeclarationTransformer.ts":
/*!******************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/FunctionDeclarationTransformer.ts ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");

var NodeType_1 = __webpack_require__(/*! ../../enums/node/NodeType */ "./src/enums/node/NodeType.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var FunctionDeclarationTransformer =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(FunctionDeclarationTransformer, _AbstractNodeTransfor);

  function FunctionDeclarationTransformer(identifierObfuscatingReplacerFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, FunctionDeclarationTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FunctionDeclarationTransformer).call(this, randomGenerator, options));
    _this.replaceableIdentifiers = new _map.default();
    _this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    return _this;
  }

  (0, _createClass2.default)(FunctionDeclarationTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Obfuscating:
          return {
            enter: function enter(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isFunctionDeclarationNode(node) && !NodeGuards_1.NodeGuards.isExportNamedDeclarationNode(parentNode)) {
                return _this2.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(functionDeclarationNode, parentNode) {
      var blockScopeNode = NodeUtils_1.NodeUtils.getBlockScopesOfNode(functionDeclarationNode)[0];
      var isGlobalDeclaration = blockScopeNode.type === NodeType_1.NodeType.Program;

      if (!this.options.renameGlobals && isGlobalDeclaration) {
        return functionDeclarationNode;
      }

      this.storeFunctionName(functionDeclarationNode, blockScopeNode, isGlobalDeclaration);

      if (this.replaceableIdentifiers.has(blockScopeNode)) {
        this.replaceScopeCachedIdentifiers(functionDeclarationNode, blockScopeNode);
      } else {
        this.replaceScopeIdentifiers(blockScopeNode);
      }

      return functionDeclarationNode;
    }
  }, {
    key: "storeFunctionName",
    value: function storeFunctionName(functionDeclarationNode, blockScopeNode, isGlobalDeclaration) {
      if (isGlobalDeclaration) {
        this.identifierObfuscatingReplacer.storeGlobalName(functionDeclarationNode.id.name, blockScopeNode);
      } else {
        this.identifierObfuscatingReplacer.storeLocalName(functionDeclarationNode.id.name, blockScopeNode);
      }
    }
  }, {
    key: "replaceScopeCachedIdentifiers",
    value: function replaceScopeCachedIdentifiers(functionDeclarationNode, blockScopeNode) {
      var cachedReplaceableIdentifiersNamesMap = this.replaceableIdentifiers.get(blockScopeNode);

      if (!cachedReplaceableIdentifiersNamesMap) {
        return;
      }

      var cachedReplaceableIdentifiers = cachedReplaceableIdentifiersNamesMap.get(functionDeclarationNode.id.name);

      if (!cachedReplaceableIdentifiers) {
        return;
      }

      var cachedReplaceableIdentifierLength = cachedReplaceableIdentifiers.length;

      for (var i = 0; i < cachedReplaceableIdentifierLength; i++) {
        var replaceableIdentifier = cachedReplaceableIdentifiers[i];
        var newReplaceableIdentifier = this.identifierObfuscatingReplacer.replace(replaceableIdentifier.name, blockScopeNode);
        replaceableIdentifier.name = newReplaceableIdentifier.name;
        NodeMetadata_1.NodeMetadata.set(replaceableIdentifier, {
          renamedIdentifier: true
        });
      }
    }
  }, {
    key: "replaceScopeIdentifiers",
    value: function replaceScopeIdentifiers(blockScopeNode) {
      var _this3 = this;

      var storedReplaceableIdentifiersNamesMap = new _map.default();
      estraverse.replace(blockScopeNode, {
        enter: function enter(node, parentNode) {
          if (parentNode && NodeGuards_1.NodeGuards.isReplaceableIdentifierNode(node, parentNode) && !NodeMetadata_1.NodeMetadata.isRenamedIdentifier(node)) {
            var newIdentifier = _this3.identifierObfuscatingReplacer.replace(node.name, blockScopeNode);

            var newIdentifierName = newIdentifier.name;

            if (node.name !== newIdentifierName) {
              node.name = newIdentifierName;
              NodeMetadata_1.NodeMetadata.set(node, {
                renamedIdentifier: true
              });
            } else {
              var storedReplaceableIdentifiers = storedReplaceableIdentifiersNamesMap.get(node.name) || [];
              storedReplaceableIdentifiers.push(node);
              storedReplaceableIdentifiersNamesMap.set(node.name, storedReplaceableIdentifiers);
            }
          }
        }
      });
      this.replaceableIdentifiers.set(blockScopeNode, storedReplaceableIdentifiersNamesMap);
    }
  }]);
  return FunctionDeclarationTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

FunctionDeclarationTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], FunctionDeclarationTransformer);
exports.FunctionDeclarationTransformer = FunctionDeclarationTransformer;

/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/FunctionTransformer.ts":
/*!*******************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/FunctionTransformer.ts ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _set = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/set */ "@babel/runtime/core-js/set"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var FunctionTransformer =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(FunctionTransformer, _AbstractNodeTransfor);

  function FunctionTransformer(identifierObfuscatingReplacerFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, FunctionTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FunctionTransformer).call(this, randomGenerator, options));
    _this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    return _this;
  }

  (0, _createClass2.default)(FunctionTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Obfuscating:
          return {
            enter: function enter(node, parentNode) {
              if (parentNode && (NodeGuards_1.NodeGuards.isFunctionDeclarationNode(node) || NodeGuards_1.NodeGuards.isFunctionExpressionNode(node) || NodeGuards_1.NodeGuards.isArrowFunctionExpressionNode(node))) {
                return _this2.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(functionNode, parentNode) {
      var blockScopeNode = NodeGuards_1.NodeGuards.isBlockStatementNode(functionNode.body) ? functionNode.body : NodeUtils_1.NodeUtils.getBlockScopesOfNode(functionNode.body)[0];
      this.storeFunctionParams(functionNode, blockScopeNode);
      this.replaceFunctionParams(functionNode, blockScopeNode);
      return functionNode;
    }
  }, {
    key: "storeFunctionParams",
    value: function storeFunctionParams(functionNode, blockScopeNode) {
      var _this3 = this;

      functionNode.params.forEach(function (paramsNode) {
        estraverse.traverse(paramsNode, {
          enter: function enter(node) {
            if (NodeGuards_1.NodeGuards.isPropertyNode(paramsNode)) {
              return estraverse.VisitorOption.Skip;
            }

            if (NodeGuards_1.NodeGuards.isAssignmentPatternNode(node) && NodeGuards_1.NodeGuards.isIdentifierNode(node.left)) {
              _this3.identifierObfuscatingReplacer.storeLocalName(node.left.name, blockScopeNode);

              return estraverse.VisitorOption.Skip;
            }

            if (NodeGuards_1.NodeGuards.isIdentifierNode(node)) {
              _this3.identifierObfuscatingReplacer.storeLocalName(node.name, blockScopeNode);
            }
          }
        });
      });
    }
  }, {
    key: "addIdentifiersToIgnoredIdentifierNamesSet",
    value: function addIdentifiersToIgnoredIdentifierNamesSet(properties, ignoredIdentifierNamesSet) {
      properties.forEach(function (property) {
        if (!property.key || !NodeGuards_1.NodeGuards.isIdentifierNode(property.key)) {
          return;
        }

        ignoredIdentifierNamesSet.add(property.key.name);
      });
    }
  }, {
    key: "replaceFunctionParams",
    value: function replaceFunctionParams(functionNode, blockScopeNode) {
      var _this4 = this;

      var ignoredIdentifierNamesSet = new _set.default();
      var replaceVisitor = {
        enter: function enter(node, parentNode) {
          if (NodeGuards_1.NodeGuards.isObjectPatternNode(node)) {
            _this4.addIdentifiersToIgnoredIdentifierNamesSet(node.properties, ignoredIdentifierNamesSet);
          }

          if (parentNode && NodeGuards_1.NodeGuards.isReplaceableIdentifierNode(node, parentNode) && !ignoredIdentifierNamesSet.has(node.name)) {
            var newIdentifier = _this4.identifierObfuscatingReplacer.replace(node.name, blockScopeNode);

            var newIdentifierName = newIdentifier.name;

            if (node.name !== newIdentifierName) {
              node.name = newIdentifierName;
              NodeMetadata_1.NodeMetadata.set(node, {
                renamedIdentifier: true
              });
            }
          }
        }
      };
      functionNode.params.forEach(function (paramsNode) {
        return estraverse.replace(paramsNode, replaceVisitor);
      });
      estraverse.replace(functionNode.body, replaceVisitor);
    }
  }]);
  return FunctionTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

FunctionTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], FunctionTransformer);
exports.FunctionTransformer = FunctionTransformer;

/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/ImportDeclarationTransformer.ts":
/*!****************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/ImportDeclarationTransformer.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var ImportDeclarationTransformer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var ImportDeclarationTransformer = ImportDeclarationTransformer_1 =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(ImportDeclarationTransformer, _AbstractNodeTransfor);

  function ImportDeclarationTransformer(identifierObfuscatingReplacerFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, ImportDeclarationTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ImportDeclarationTransformer).call(this, randomGenerator, options));
    _this.replaceableIdentifiers = new _map.default();
    _this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    return _this;
  }

  (0, _createClass2.default)(ImportDeclarationTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Obfuscating:
          return {
            enter: function enter(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isImportDeclarationNode(node)) {
                return _this2.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(importDeclarationNode, parentNode) {
      var blockScopeNode = NodeUtils_1.NodeUtils.getBlockScopesOfNode(importDeclarationNode)[0];
      this.storeImportSpecifierNames(importDeclarationNode, blockScopeNode);

      if (this.replaceableIdentifiers.has(blockScopeNode)) {
        this.replaceScopeCachedIdentifiers(blockScopeNode);
      } else {
        this.replaceScopeIdentifiers(blockScopeNode);
      }

      return importDeclarationNode;
    }
  }, {
    key: "storeImportSpecifierNames",
    value: function storeImportSpecifierNames(importDeclarationNode, blockScopeNode) {
      var _this3 = this;

      importDeclarationNode.specifiers.forEach(function (importSpecifierNode) {
        if (ImportDeclarationTransformer_1.isProhibitedImportSpecifierNode(importSpecifierNode)) {
          return;
        }

        _this3.identifierObfuscatingReplacer.storeGlobalName(importSpecifierNode.local.name, blockScopeNode);
      });
    }
  }, {
    key: "replaceScopeCachedIdentifiers",
    value: function replaceScopeCachedIdentifiers(blockScopeNode) {
      var _this4 = this;

      var cachedReplaceableIdentifiers = this.replaceableIdentifiers.get(blockScopeNode);
      cachedReplaceableIdentifiers.forEach(function (replaceableIdentifier) {
        var newReplaceableIdentifier = _this4.identifierObfuscatingReplacer.replace(replaceableIdentifier.name, blockScopeNode);

        replaceableIdentifier.name = newReplaceableIdentifier.name;
        NodeMetadata_1.NodeMetadata.set(replaceableIdentifier, {
          renamedIdentifier: true
        });
      });
    }
  }, {
    key: "replaceScopeIdentifiers",
    value: function replaceScopeIdentifiers(blockScopeNode) {
      var _this5 = this;

      var storedReplaceableIdentifiers = [];
      estraverse.replace(blockScopeNode, {
        enter: function enter(node, parentNode) {
          if (parentNode && NodeGuards_1.NodeGuards.isReplaceableIdentifierNode(node, parentNode) && !NodeMetadata_1.NodeMetadata.isRenamedIdentifier(node)) {
            var newIdentifier = _this5.identifierObfuscatingReplacer.replace(node.name, blockScopeNode);

            var newIdentifierName = newIdentifier.name;

            if (node.name !== newIdentifierName) {
              node.name = newIdentifierName;
              NodeMetadata_1.NodeMetadata.set(node, {
                renamedIdentifier: true
              });
            } else {
              storedReplaceableIdentifiers.push(node);
            }
          }
        }
      });
      this.replaceableIdentifiers.set(blockScopeNode, storedReplaceableIdentifiers);
    }
  }], [{
    key: "isProhibitedImportSpecifierNode",
    value: function isProhibitedImportSpecifierNode(importSpecifierNode) {
      return NodeGuards_1.NodeGuards.isImportSpecifierNode(importSpecifierNode) && importSpecifierNode.imported.name === importSpecifierNode.local.name;
    }
  }]);
  return ImportDeclarationTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

ImportDeclarationTransformer = ImportDeclarationTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], ImportDeclarationTransformer);
exports.ImportDeclarationTransformer = ImportDeclarationTransformer;

/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/LabeledStatementTransformer.ts":
/*!***************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/LabeledStatementTransformer.ts ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var LabeledStatementTransformer =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(LabeledStatementTransformer, _AbstractNodeTransfor);

  function LabeledStatementTransformer(identifierObfuscatingReplacerFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, LabeledStatementTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LabeledStatementTransformer).call(this, randomGenerator, options));
    _this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    return _this;
  }

  (0, _createClass2.default)(LabeledStatementTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Obfuscating:
          return {
            enter: function enter(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isLabeledStatementNode(node)) {
                return _this2.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(labeledStatementNode, parentNode) {
      var blockScopeNode = NodeUtils_1.NodeUtils.getBlockScopesOfNode(labeledStatementNode)[0];
      this.storeLabeledStatementName(labeledStatementNode, blockScopeNode);
      this.replaceLabeledStatementName(labeledStatementNode, blockScopeNode);
      return labeledStatementNode;
    }
  }, {
    key: "storeLabeledStatementName",
    value: function storeLabeledStatementName(labeledStatementNode, blockScopeNode) {
      this.identifierObfuscatingReplacer.storeLocalName(labeledStatementNode.label.name, blockScopeNode);
    }
  }, {
    key: "replaceLabeledStatementName",
    value: function replaceLabeledStatementName(labeledStatementNode, blockScopeNode) {
      var _this3 = this;

      estraverse.replace(labeledStatementNode, {
        enter: function enter(node, parentNode) {
          if (parentNode && NodeGuards_1.NodeGuards.isLabelIdentifierNode(node, parentNode)) {
            var newIdentifier = _this3.identifierObfuscatingReplacer.replace(node.name, blockScopeNode);

            node.name = newIdentifier.name;
          }
        }
      });
    }
  }]);
  return LabeledStatementTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

LabeledStatementTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], LabeledStatementTransformer);
exports.LabeledStatementTransformer = LabeledStatementTransformer;

/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/LiteralTransformer.ts":
/*!******************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/LiteralTransformer.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var LiteralObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");

var LiteralTransformer =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(LiteralTransformer, _AbstractNodeTransfor);

  function LiteralTransformer(literalObfuscatingReplacerFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, LiteralTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LiteralTransformer).call(this, randomGenerator, options));
    _this.literalObfuscatingReplacerFactory = literalObfuscatingReplacerFactory;
    return _this;
  }

  (0, _createClass2.default)(LiteralTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Obfuscating:
          return {
            enter: function enter(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isLiteralNode(node) && !NodeMetadata_1.NodeMetadata.isReplacedLiteral(node)) {
                return _this2.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(literalNode, parentNode) {
      if (this.isProhibitedNode(literalNode, parentNode)) {
        return literalNode;
      }

      switch ((0, _typeof2.default)(literalNode.value)) {
        case 'boolean':
          return this.literalObfuscatingReplacerFactory(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.BooleanLiteralObfuscatingReplacer).replace(literalNode.value);

        case 'number':
          return this.literalObfuscatingReplacerFactory(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.NumberLiteralObfuscatingReplacer).replace(literalNode.value);

        case 'string':
          return this.literalObfuscatingReplacerFactory(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.StringLiteralObfuscatingReplacer).replace(literalNode.value);

        default:
          return literalNode;
      }
    }
  }, {
    key: "isProhibitedNode",
    value: function isProhibitedNode(literalNode, parentNode) {
      if (NodeGuards_1.NodeGuards.isPropertyNode(parentNode) && parentNode.key === literalNode) {
        return true;
      }

      if (NodeGuards_1.NodeGuards.isImportDeclarationNode(parentNode)) {
        return true;
      }

      return false;
    }
  }]);
  return LiteralTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

LiteralTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatingReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], LiteralTransformer);
exports.LiteralTransformer = LiteralTransformer;

/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/VariableDeclarationTransformer.ts":
/*!******************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/VariableDeclarationTransformer.ts ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");

var NodeType_1 = __webpack_require__(/*! ../../enums/node/NodeType */ "./src/enums/node/NodeType.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var VariableDeclarationTransformer =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(VariableDeclarationTransformer, _AbstractNodeTransfor);

  function VariableDeclarationTransformer(identifierObfuscatingReplacerFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, VariableDeclarationTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(VariableDeclarationTransformer).call(this, randomGenerator, options));
    _this.replaceableIdentifiers = new _map.default();
    _this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    return _this;
  }

  (0, _createClass2.default)(VariableDeclarationTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Obfuscating:
          return {
            enter: function enter(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isVariableDeclarationNode(node) && !NodeGuards_1.NodeGuards.isExportNamedDeclarationNode(parentNode)) {
                return _this2.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(variableDeclarationNode, parentNode) {
      var blockScopeNode = NodeUtils_1.NodeUtils.getBlockScopesOfNode(variableDeclarationNode)[0];
      var isGlobalDeclaration = blockScopeNode.type === NodeType_1.NodeType.Program;

      if (!this.options.renameGlobals && isGlobalDeclaration) {
        return variableDeclarationNode;
      }

      var scopeNode = variableDeclarationNode.kind === 'var' ? blockScopeNode : parentNode;
      this.storeVariableNames(variableDeclarationNode, blockScopeNode, isGlobalDeclaration);

      if (this.replaceableIdentifiers.has(scopeNode)) {
        this.replaceScopeCachedIdentifiers(variableDeclarationNode, blockScopeNode, scopeNode);
      } else {
        this.replaceScopeIdentifiers(scopeNode, blockScopeNode);
      }

      return variableDeclarationNode;
    }
  }, {
    key: "storeVariableNames",
    value: function storeVariableNames(variableDeclarationNode, blockScopeNode, isGlobalDeclaration) {
      var _this3 = this;

      this.traverseDeclarationIdentifiers(variableDeclarationNode, function (identifierNode) {
        if (isGlobalDeclaration) {
          _this3.identifierObfuscatingReplacer.storeGlobalName(identifierNode.name, blockScopeNode);
        } else {
          _this3.identifierObfuscatingReplacer.storeLocalName(identifierNode.name, blockScopeNode);
        }
      });
    }
  }, {
    key: "replaceScopeCachedIdentifiers",
    value: function replaceScopeCachedIdentifiers(variableDeclarationNode, blockScopeNode, scopeNode) {
      var _this4 = this;

      var cachedReplaceableIdentifiersNamesMap = this.replaceableIdentifiers.get(scopeNode);

      if (!cachedReplaceableIdentifiersNamesMap) {
        return;
      }

      var identifierNames = [];
      this.traverseDeclarationIdentifiers(variableDeclarationNode, function (identifierNode) {
        identifierNames.push(identifierNode.name);
      });
      identifierNames.forEach(function (identifierName) {
        var cachedReplaceableIdentifiers = cachedReplaceableIdentifiersNamesMap.get(identifierName);

        if (!cachedReplaceableIdentifiers) {
          return;
        }

        var cachedReplaceableIdentifierLength = cachedReplaceableIdentifiers.length;

        for (var i = 0; i < cachedReplaceableIdentifierLength; i++) {
          var replaceableIdentifier = cachedReplaceableIdentifiers[i];

          if (identifierName !== replaceableIdentifier.name) {
            continue;
          }

          var newReplaceableIdentifier = _this4.identifierObfuscatingReplacer.replace(replaceableIdentifier.name, blockScopeNode);

          replaceableIdentifier.name = newReplaceableIdentifier.name;
          NodeMetadata_1.NodeMetadata.set(replaceableIdentifier, {
            renamedIdentifier: true
          });
        }
      });
    }
  }, {
    key: "replaceScopeIdentifiers",
    value: function replaceScopeIdentifiers(scopeNode, blockScopeNode) {
      var _this5 = this;

      var storedReplaceableIdentifiersNamesMap = new _map.default();
      estraverse.replace(scopeNode, {
        enter: function enter(node, parentNode) {
          if (parentNode && NodeGuards_1.NodeGuards.isReplaceableIdentifierNode(node, parentNode) && !NodeMetadata_1.NodeMetadata.isRenamedIdentifier(node)) {
            var newIdentifier = _this5.identifierObfuscatingReplacer.replace(node.name, blockScopeNode);

            var newIdentifierName = newIdentifier.name;

            if (node.name !== newIdentifierName) {
              node.name = newIdentifierName;
              NodeMetadata_1.NodeMetadata.set(node, {
                renamedIdentifier: true
              });
            } else {
              var storedReplaceableIdentifiers = storedReplaceableIdentifiersNamesMap.get(node.name) || [];
              storedReplaceableIdentifiers.push(node);
              storedReplaceableIdentifiersNamesMap.set(node.name, storedReplaceableIdentifiers);
            }
          }
        }
      });
      this.replaceableIdentifiers.set(scopeNode, storedReplaceableIdentifiersNamesMap);
    }
  }, {
    key: "traverseDeclarationIdentifiers",
    value: function traverseDeclarationIdentifiers(variableDeclarationNode, callback) {
      variableDeclarationNode.declarations.forEach(function (declarationNode) {
        estraverse.traverse(declarationNode.id, {
          enter: function enter(node) {
            if (NodeGuards_1.NodeGuards.isPropertyNode(node)) {
              return estraverse.VisitorOption.Skip;
            }

            if (NodeGuards_1.NodeGuards.isIdentifierNode(node)) {
              callback(node);
            }
          }
        });
      });
    }
  }]);
  return VariableDeclarationTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

VariableDeclarationTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], VariableDeclarationTransformer);
exports.VariableDeclarationTransformer = VariableDeclarationTransformer;

/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var AbstractObfuscatingReplacer = function AbstractObfuscatingReplacer(options) {
  (0, _classCallCheck2.default)(this, AbstractObfuscatingReplacer);
  this.options = options;
};

AbstractObfuscatingReplacer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], AbstractObfuscatingReplacer);
exports.AbstractObfuscatingReplacer = AbstractObfuscatingReplacer;

/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/identifier-obfuscating-replacers/BaseIdentifierObfuscatingReplacer.ts":
/*!****************************************************************************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/obfuscating-replacers/identifier-obfuscating-replacers/BaseIdentifierObfuscatingReplacer.ts ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var AbstractObfuscatingReplacer_1 = __webpack_require__(/*! ../AbstractObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var BaseIdentifierObfuscatingReplacer =
/*#__PURE__*/
function (_AbstractObfuscatingR) {
  (0, _inherits2.default)(BaseIdentifierObfuscatingReplacer, _AbstractObfuscatingR);

  function BaseIdentifierObfuscatingReplacer(identifierNamesGeneratorFactory, options) {
    var _this;

    (0, _classCallCheck2.default)(this, BaseIdentifierObfuscatingReplacer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BaseIdentifierObfuscatingReplacer).call(this, options));
    _this.blockScopesMap = new _map.default();
    _this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
    return _this;
  }

  (0, _createClass2.default)(BaseIdentifierObfuscatingReplacer, [{
    key: "replace",
    value: function replace(nodeValue, blockScopeNode) {
      if (this.blockScopesMap.has(blockScopeNode)) {
        var namesMap = this.blockScopesMap.get(blockScopeNode);

        if (namesMap.has(nodeValue)) {
          nodeValue = namesMap.get(nodeValue);
        }
      }

      return NodeFactory_1.NodeFactory.identifierNode(nodeValue);
    }
  }, {
    key: "storeGlobalName",
    value: function storeGlobalName(nodeName, blockScopeNode) {
      if (this.isReservedName(nodeName)) {
        return;
      }

      var identifierName = this.identifierNamesGenerator.generateWithPrefix();

      if (!this.blockScopesMap.has(blockScopeNode)) {
        this.blockScopesMap.set(blockScopeNode, new _map.default());
      }

      var namesMap = this.blockScopesMap.get(blockScopeNode);
      namesMap.set(nodeName, identifierName);
    }
  }, {
    key: "storeLocalName",
    value: function storeLocalName(nodeName, blockScopeNode) {
      if (this.isReservedName(nodeName)) {
        return;
      }

      var identifierName = this.identifierNamesGenerator.generate();

      if (!this.blockScopesMap.has(blockScopeNode)) {
        this.blockScopesMap.set(blockScopeNode, new _map.default());
      }

      var namesMap = this.blockScopesMap.get(blockScopeNode);
      namesMap.set(nodeName, identifierName);
    }
  }, {
    key: "isReservedName",
    value: function isReservedName(name) {
      return this.options.reservedNames.some(function (reservedName) {
        return new RegExp(reservedName, 'g').exec(name) !== null;
      });
    }
  }]);
  return BaseIdentifierObfuscatingReplacer;
}(AbstractObfuscatingReplacer_1.AbstractObfuscatingReplacer);

BaseIdentifierObfuscatingReplacer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], BaseIdentifierObfuscatingReplacer);
exports.BaseIdentifierObfuscatingReplacer = BaseIdentifierObfuscatingReplacer;

/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/BooleanLiteralObfuscatingReplacer.ts":
/*!*************************************************************************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/BooleanLiteralObfuscatingReplacer.ts ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var BooleanLiteralObfuscatingReplacer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var AbstractObfuscatingReplacer_1 = __webpack_require__(/*! ../AbstractObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var BooleanLiteralObfuscatingReplacer = BooleanLiteralObfuscatingReplacer_1 =
/*#__PURE__*/
function (_AbstractObfuscatingR) {
  (0, _inherits2.default)(BooleanLiteralObfuscatingReplacer, _AbstractObfuscatingR);

  function BooleanLiteralObfuscatingReplacer(options) {
    (0, _classCallCheck2.default)(this, BooleanLiteralObfuscatingReplacer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(BooleanLiteralObfuscatingReplacer).call(this, options));
  }

  (0, _createClass2.default)(BooleanLiteralObfuscatingReplacer, [{
    key: "replace",
    value: function replace(nodeValue) {
      return nodeValue ? BooleanLiteralObfuscatingReplacer_1.getTrueUnaryExpressionNode() : BooleanLiteralObfuscatingReplacer_1.getFalseUnaryExpressionNode();
    }
  }], [{
    key: "getTrueUnaryExpressionNode",
    value: function getTrueUnaryExpressionNode() {
      return NodeFactory_1.NodeFactory.unaryExpressionNode('!', BooleanLiteralObfuscatingReplacer_1.getFalseUnaryExpressionNode());
    }
  }, {
    key: "getFalseUnaryExpressionNode",
    value: function getFalseUnaryExpressionNode() {
      return NodeFactory_1.NodeFactory.unaryExpressionNode('!', NodeFactory_1.NodeFactory.arrayExpressionNode());
    }
  }]);
  return BooleanLiteralObfuscatingReplacer;
}(AbstractObfuscatingReplacer_1.AbstractObfuscatingReplacer);

BooleanLiteralObfuscatingReplacer = BooleanLiteralObfuscatingReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], BooleanLiteralObfuscatingReplacer);
exports.BooleanLiteralObfuscatingReplacer = BooleanLiteralObfuscatingReplacer;

/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/NumberLiteralObfuscatingReplacer.ts":
/*!************************************************************************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/NumberLiteralObfuscatingReplacer.ts ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var AbstractObfuscatingReplacer_1 = __webpack_require__(/*! ../AbstractObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NumberUtils_1 = __webpack_require__(/*! ../../../../utils/NumberUtils */ "./src/utils/NumberUtils.ts");

var Utils_1 = __webpack_require__(/*! ../../../../utils/Utils */ "./src/utils/Utils.ts");

var NumberLiteralObfuscatingReplacer =
/*#__PURE__*/
function (_AbstractObfuscatingR) {
  (0, _inherits2.default)(NumberLiteralObfuscatingReplacer, _AbstractObfuscatingR);

  function NumberLiteralObfuscatingReplacer(options) {
    var _this;

    (0, _classCallCheck2.default)(this, NumberLiteralObfuscatingReplacer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(NumberLiteralObfuscatingReplacer).call(this, options));
    _this.numberLiteralCache = new _map.default();
    return _this;
  }

  (0, _createClass2.default)(NumberLiteralObfuscatingReplacer, [{
    key: "replace",
    value: function replace(nodeValue) {
      var rawValue;

      if (this.numberLiteralCache.has(nodeValue)) {
        rawValue = this.numberLiteralCache.get(nodeValue);
      } else {
        if (!NumberUtils_1.NumberUtils.isCeil(nodeValue)) {
          rawValue = String(nodeValue);
        } else {
          rawValue = "".concat(Utils_1.Utils.hexadecimalPrefix).concat(NumberUtils_1.NumberUtils.toHex(nodeValue));
        }

        this.numberLiteralCache.set(nodeValue, rawValue);
      }

      return NodeFactory_1.NodeFactory.literalNode(nodeValue, rawValue);
    }
  }]);
  return NumberLiteralObfuscatingReplacer;
}(AbstractObfuscatingReplacer_1.AbstractObfuscatingReplacer);

NumberLiteralObfuscatingReplacer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], NumberLiteralObfuscatingReplacer);
exports.NumberLiteralObfuscatingReplacer = NumberLiteralObfuscatingReplacer;

/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/StringLiteralObfuscatingReplacer.ts":
/*!************************************************************************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/StringLiteralObfuscatingReplacer.ts ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var StringLiteralObfuscatingReplacer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var StringArrayEncoding_1 = __webpack_require__(/*! ../../../../enums/StringArrayEncoding */ "./src/enums/StringArrayEncoding.ts");

var AbstractObfuscatingReplacer_1 = __webpack_require__(/*! ../AbstractObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts");

var NodeMetadata_1 = __webpack_require__(/*! ../../../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NumberUtils_1 = __webpack_require__(/*! ../../../../utils/NumberUtils */ "./src/utils/NumberUtils.ts");

var Utils_1 = __webpack_require__(/*! ../../../../utils/Utils */ "./src/utils/Utils.ts");

var StringLiteralObfuscatingReplacer = StringLiteralObfuscatingReplacer_1 =
/*#__PURE__*/
function (_AbstractObfuscatingR) {
  (0, _inherits2.default)(StringLiteralObfuscatingReplacer, _AbstractObfuscatingR);

  function StringLiteralObfuscatingReplacer(stringArrayStorage, escapeSequenceEncoder, randomGenerator, cryptUtils, options) {
    var _this;

    (0, _classCallCheck2.default)(this, StringLiteralObfuscatingReplacer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StringLiteralObfuscatingReplacer).call(this, options));
    _this.nodesCache = new _map.default();
    _this.stringLiteralHexadecimalIndexCache = new _map.default();
    _this.stringArrayStorage = stringArrayStorage;
    _this.escapeSequenceEncoder = escapeSequenceEncoder;
    _this.randomGenerator = randomGenerator;
    _this.cryptUtils = cryptUtils;
    _this.rc4Keys = _this.randomGenerator.getRandomGenerator().n(function () {
      return _this.randomGenerator.getRandomGenerator().string({
        length: StringLiteralObfuscatingReplacer_1.rc4KeyLength
      });
    }, StringLiteralObfuscatingReplacer_1.rc4KeysCount);
    return _this;
  }

  (0, _createClass2.default)(StringLiteralObfuscatingReplacer, [{
    key: "replace",
    value: function replace(nodeValue) {
      var useStringArray = this.canUseStringArray(nodeValue);
      var cacheKey = "".concat(nodeValue, "-").concat(String(useStringArray));
      var useCacheValue = this.nodesCache.has(cacheKey) && this.options.stringArrayEncoding !== StringArrayEncoding_1.StringArrayEncoding.Rc4;

      if (useCacheValue) {
        return this.nodesCache.get(cacheKey);
      }

      var resultNode = useStringArray ? this.replaceWithStringArrayCallNode(nodeValue) : this.replaceWithLiteralNode(nodeValue);
      this.nodesCache.set(cacheKey, resultNode);
      return resultNode;
    }
  }, {
    key: "canUseStringArray",
    value: function canUseStringArray(nodeValue) {
      return this.options.stringArray && nodeValue.length >= StringLiteralObfuscatingReplacer_1.minimumLengthForStringArray && this.randomGenerator.getMathRandom() <= this.options.stringArrayThreshold;
    }
  }, {
    key: "getStringArrayHexadecimalIndex",
    value: function getStringArrayHexadecimalIndex(value, stringArrayStorageLength) {
      if (this.stringLiteralHexadecimalIndexCache.has(value)) {
        return {
          fromCache: true,
          index: this.stringLiteralHexadecimalIndexCache.get(value)
        };
      }

      var hexadecimalRawIndex = NumberUtils_1.NumberUtils.toHex(stringArrayStorageLength);
      var hexadecimalIndex = "".concat(Utils_1.Utils.hexadecimalPrefix).concat(hexadecimalRawIndex);
      this.stringLiteralHexadecimalIndexCache.set(value, hexadecimalIndex);
      return {
        fromCache: false,
        index: hexadecimalIndex
      };
    }
  }, {
    key: "getEncodedValue",
    value: function getEncodedValue(value) {
      var encodedValue;
      var key = null;

      switch (this.options.stringArrayEncoding) {
        case StringArrayEncoding_1.StringArrayEncoding.Rc4:
          key = this.randomGenerator.getRandomGenerator().pickone(this.rc4Keys);
          encodedValue = this.cryptUtils.btoa(this.cryptUtils.rc4(value, key));
          break;

        case StringArrayEncoding_1.StringArrayEncoding.Base64:
          encodedValue = this.cryptUtils.btoa(value);
          break;

        default:
          encodedValue = value;
      }

      return {
        encodedValue: encodedValue,
        key: key
      };
    }
  }, {
    key: "replaceWithLiteralNode",
    value: function replaceWithLiteralNode(value) {
      return NodeFactory_1.NodeFactory.literalNode(this.escapeSequenceEncoder.encode(value, this.options.unicodeEscapeSequence));
    }
  }, {
    key: "replaceWithStringArrayCallNode",
    value: function replaceWithStringArrayCallNode(value) {
      var _this$getEncodedValue = this.getEncodedValue(value),
          encodedValue = _this$getEncodedValue.encodedValue,
          key = _this$getEncodedValue.key;

      var escapedValue = this.escapeSequenceEncoder.encode(encodedValue, this.options.unicodeEscapeSequence);
      var stringArrayStorageLength = this.stringArrayStorage.getLength();
      var stringArrayStorageCallsWrapperName = this.stringArrayStorage.getStorageId().split('|')[1];

      var _this$getStringArrayH = this.getStringArrayHexadecimalIndex(escapedValue, stringArrayStorageLength),
          fromCache = _this$getStringArrayH.fromCache,
          index = _this$getStringArrayH.index;

      if (!fromCache) {
        this.stringArrayStorage.set(stringArrayStorageLength, escapedValue);
      }

      var callExpressionArgs = [StringLiteralObfuscatingReplacer_1.getHexadecimalLiteralNode(index)];

      if (key) {
        callExpressionArgs.push(StringLiteralObfuscatingReplacer_1.getRc4KeyLiteralNode(this.escapeSequenceEncoder.encode(key, this.options.unicodeEscapeSequence)));
      }

      var stringArrayIdentifierNode = NodeFactory_1.NodeFactory.identifierNode(stringArrayStorageCallsWrapperName);
      NodeMetadata_1.NodeMetadata.set(stringArrayIdentifierNode, {
        renamedIdentifier: true
      });
      return NodeFactory_1.NodeFactory.callExpressionNode(stringArrayIdentifierNode, callExpressionArgs);
    }
  }], [{
    key: "getHexadecimalLiteralNode",
    value: function getHexadecimalLiteralNode(hexadecimalIndex) {
      var hexadecimalLiteralNode = NodeFactory_1.NodeFactory.literalNode(hexadecimalIndex);
      NodeMetadata_1.NodeMetadata.set(hexadecimalLiteralNode, {
        replacedLiteral: true
      });
      return hexadecimalLiteralNode;
    }
  }, {
    key: "getRc4KeyLiteralNode",
    value: function getRc4KeyLiteralNode(literalValue) {
      var rc4KeyLiteralNode = NodeFactory_1.NodeFactory.literalNode(literalValue);
      NodeMetadata_1.NodeMetadata.set(rc4KeyLiteralNode, {
        replacedLiteral: true
      });
      return rc4KeyLiteralNode;
    }
  }]);
  return StringLiteralObfuscatingReplacer;
}(AbstractObfuscatingReplacer_1.AbstractObfuscatingReplacer);

StringLiteralObfuscatingReplacer.minimumLengthForStringArray = 3;
StringLiteralObfuscatingReplacer.rc4KeyLength = 4;
StringLiteralObfuscatingReplacer.rc4KeysCount = 50;
StringLiteralObfuscatingReplacer = StringLiteralObfuscatingReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TStringArrayStorage)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils)), tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object, Object])], StringLiteralObfuscatingReplacer);
exports.StringLiteralObfuscatingReplacer = StringLiteralObfuscatingReplacer;

/***/ }),

/***/ "./src/node-transformers/preparing-transformers/CommentsTransformer.ts":
/*!*****************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/CommentsTransformer.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var CommentsTransformer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var CommentsTransformer = CommentsTransformer_1 =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(CommentsTransformer, _AbstractNodeTransfor);

  function CommentsTransformer(randomGenerator, options) {
    (0, _classCallCheck2.default)(this, CommentsTransformer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CommentsTransformer).call(this, randomGenerator, options));
  }

  (0, _createClass2.default)(CommentsTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Preparing:
          return {
            leave: function leave(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isNodeWithComments(node)) {
                return _this.transformNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(node, parentNode) {
      if (node.leadingComments) {
        node.leadingComments = this.transformComments(node.leadingComments);
      }

      if (node.trailingComments) {
        node.trailingComments = this.transformComments(node.trailingComments);
      }

      return node;
    }
  }, {
    key: "transformComments",
    value: function transformComments(comments) {
      return comments.filter(function (comment) {
        return CommentsTransformer_1.preservedWords.some(function (preservedWord) {
          return comment.value.includes(preservedWord);
        });
      });
    }
  }]);
  return CommentsTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

CommentsTransformer.preservedWords = ['@license', '@preserve'];
CommentsTransformer = CommentsTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], CommentsTransformer);
exports.CommentsTransformer = CommentsTransformer;

/***/ }),

/***/ "./src/node-transformers/preparing-transformers/CustomNodesTransformer.ts":
/*!********************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/CustomNodesTransformer.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var ObfuscationEvent_1 = __webpack_require__(/*! ../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var CustomNodesTransformer =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(CustomNodesTransformer, _AbstractNodeTransfor);

  function CustomNodesTransformer(stackTraceAnalyzer, obfuscationEventEmitter, customNodeGroupStorage, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, CustomNodesTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CustomNodesTransformer).call(this, randomGenerator, options));
    _this.stackTraceData = [];
    _this.stackTraceAnalyzer = stackTraceAnalyzer;
    _this.obfuscationEventEmitter = obfuscationEventEmitter;
    _this.customNodeGroupStorage = customNodeGroupStorage;
    return _this;
  }

  (0, _createClass2.default)(CustomNodesTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Preparing:
          return {
            leave: function leave(node, parentNode) {
              if (NodeGuards_1.NodeGuards.isProgramNode(node)) {
                _this2.analyzeNode(node, parentNode);

                _this2.appendCustomNodesBeforeObfuscation(node, parentNode);

                return _this2.transformNode(node, parentNode);
              }
            }
          };

        case TransformationStage_1.TransformationStage.Finalizing:
          return {
            leave: function leave(node, parentNode) {
              if (NodeGuards_1.NodeGuards.isProgramNode(node)) {
                _this2.appendCustomNodesAfterObfuscation(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "analyzeNode",
    value: function analyzeNode(node, parentNode) {
      this.stackTraceData = this.stackTraceAnalyzer.analyze(node);
    }
  }, {
    key: "transformNode",
    value: function transformNode(node, parentNode) {
      return node;
    }
  }, {
    key: "appendCustomNodesBeforeObfuscation",
    value: function appendCustomNodesBeforeObfuscation(node, parentNode) {
      var _this3 = this;

      this.customNodeGroupStorage.getStorage().forEach(function (customNodeGroup) {
        customNodeGroup.initialize();

        _this3.obfuscationEventEmitter.once(customNodeGroup.getAppendEvent(), customNodeGroup.appendCustomNodes.bind(customNodeGroup));
      });
      this.obfuscationEventEmitter.emit(ObfuscationEvent_1.ObfuscationEvent.BeforeObfuscation, node, this.stackTraceData);
    }
  }, {
    key: "appendCustomNodesAfterObfuscation",
    value: function appendCustomNodesAfterObfuscation(node, parentNode) {
      this.obfuscationEventEmitter.emit(ObfuscationEvent_1.ObfuscationEvent.AfterObfuscation, node, this.stackTraceData);
    }
  }]);
  return CustomNodesTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

CustomNodesTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IStackTraceAnalyzer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TCustomNodeGroupStorage)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object, Object])], CustomNodesTransformer);
exports.CustomNodesTransformer = CustomNodesTransformer;

/***/ }),

/***/ "./src/node-transformers/preparing-transformers/EvaCallExpressionTransformer.ts":
/*!**************************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/EvaCallExpressionTransformer.ts ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _set = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/set */ "@babel/runtime/core-js/set"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var EvalCallExpressionTransformer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var js_string_escape_1 = tslib_1.__importDefault(__webpack_require__(/*! js-string-escape */ "js-string-escape"));

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var EvalCallExpressionTransformer = EvalCallExpressionTransformer_1 =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(EvalCallExpressionTransformer, _AbstractNodeTransfor);

  function EvalCallExpressionTransformer(randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, EvalCallExpressionTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(EvalCallExpressionTransformer).call(this, randomGenerator, options));
    _this.evalRootAstHostNodeSet = new _set.default();
    return _this;
  }

  (0, _createClass2.default)(EvalCallExpressionTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Preparing:
          return {
            enter: function enter(node, parentNode) {
              if (parentNode && NodeGuards_1.NodeGuards.isCallExpressionNode(node) && NodeGuards_1.NodeGuards.isIdentifierNode(node.callee) && node.callee.name === 'eval') {
                return _this2.transformNode(node, parentNode);
              }
            }
          };

        case TransformationStage_1.TransformationStage.Finalizing:
          if (!this.evalRootAstHostNodeSet.size) {
            return null;
          }

          return {
            leave: function leave(node, parentNode) {
              if (parentNode && _this2.isEvalRootAstHostNode(node)) {
                return _this2.restoreNode(node, parentNode);
              }
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(callExpressionNode, parentNode) {
      var callExpressionFirstArgument = callExpressionNode.arguments[0];

      if (!callExpressionFirstArgument) {
        return callExpressionNode;
      }

      var evalString = EvalCallExpressionTransformer_1.extractEvalStringFromCallExpressionArgument(callExpressionFirstArgument);

      if (!evalString) {
        return callExpressionNode;
      }

      var ast;

      try {
        ast = NodeUtils_1.NodeUtils.convertCodeToStructure(evalString);
      } catch (_a) {
        return callExpressionNode;
      }

      var evalRootAstHostNode = NodeFactory_1.NodeFactory.functionExpressionNode([], NodeFactory_1.NodeFactory.blockStatementNode(ast));
      this.evalRootAstHostNodeSet.add(evalRootAstHostNode);
      return evalRootAstHostNode;
    }
  }, {
    key: "restoreNode",
    value: function restoreNode(evalRootAstHostNode, parentNode) {
      var targetAst = evalRootAstHostNode.body.body;
      var obfuscatedCode = NodeUtils_1.NodeUtils.convertStructureToCode(targetAst);
      return NodeFactory_1.NodeFactory.callExpressionNode(NodeFactory_1.NodeFactory.identifierNode('eval'), [NodeFactory_1.NodeFactory.literalNode(js_string_escape_1.default(obfuscatedCode))]);
    }
  }, {
    key: "isEvalRootAstHostNode",
    value: function isEvalRootAstHostNode(node) {
      return NodeGuards_1.NodeGuards.isFunctionExpressionNode(node) && this.evalRootAstHostNodeSet.has(node);
    }
  }], [{
    key: "extractEvalStringFromCallExpressionArgument",
    value: function extractEvalStringFromCallExpressionArgument(node) {
      if (NodeGuards_1.NodeGuards.isLiteralNode(node)) {
        return EvalCallExpressionTransformer_1.extractEvalStringFromLiteralNode(node);
      }

      if (NodeGuards_1.NodeGuards.isTemplateLiteralNode(node)) {
        return EvalCallExpressionTransformer_1.extractEvalStringFromTemplateLiteralNode(node);
      }

      return null;
    }
  }, {
    key: "extractEvalStringFromLiteralNode",
    value: function extractEvalStringFromLiteralNode(node) {
      return typeof node.value === 'string' ? node.value : null;
    }
  }, {
    key: "extractEvalStringFromTemplateLiteralNode",
    value: function extractEvalStringFromTemplateLiteralNode(node) {
      var quasis = node.quasis;
      var allowedQuasisLength = 1;

      if (quasis.length !== allowedQuasisLength || node.expressions.length) {
        return null;
      }

      return quasis[0].value.cooked;
    }
  }]);
  return EvalCallExpressionTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

EvalCallExpressionTransformer = EvalCallExpressionTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], EvalCallExpressionTransformer);
exports.EvalCallExpressionTransformer = EvalCallExpressionTransformer;

/***/ }),

/***/ "./src/node-transformers/preparing-transformers/MetadataTransformer.ts":
/*!*****************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/MetadataTransformer.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");

var MetadataTransformer =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(MetadataTransformer, _AbstractNodeTransfor);

  function MetadataTransformer(randomGenerator, options) {
    (0, _classCallCheck2.default)(this, MetadataTransformer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MetadataTransformer).call(this, randomGenerator, options));
  }

  (0, _createClass2.default)(MetadataTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Preparing:
          return {
            enter: function enter(node, parentNode) {
              return _this.transformNode(node, parentNode);
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(node, parentNode) {
      NodeMetadata_1.NodeMetadata.set(node, {
        ignoredNode: false
      });

      if (NodeGuards_1.NodeGuards.isIdentifierNode(node)) {
        NodeMetadata_1.NodeMetadata.set(node, {
          renamedIdentifier: false
        });
      }

      if (NodeGuards_1.NodeGuards.isLiteralNode(node)) {
        NodeMetadata_1.NodeMetadata.set(node, {
          replacedLiteral: false
        });
      }

      return node;
    }
  }]);
  return MetadataTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

MetadataTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], MetadataTransformer);
exports.MetadataTransformer = MetadataTransformer;

/***/ }),

/***/ "./src/node-transformers/preparing-transformers/ObfuscatingGuardsTransformer.ts":
/*!**************************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/ObfuscatingGuardsTransformer.ts ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var ObfuscatingGuardsTransformer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var ObfuscatingGuard_1 = __webpack_require__(/*! ../../enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard */ "./src/enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");

var ObfuscatingGuardsTransformer = ObfuscatingGuardsTransformer_1 =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(ObfuscatingGuardsTransformer, _AbstractNodeTransfor);

  function ObfuscatingGuardsTransformer(obfuscatingGuardFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, ObfuscatingGuardsTransformer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ObfuscatingGuardsTransformer).call(this, randomGenerator, options));
    _this.obfuscatingGuards = ObfuscatingGuardsTransformer_1.obfuscatingGuardsList.map(obfuscatingGuardFactory);
    return _this;
  }

  (0, _createClass2.default)(ObfuscatingGuardsTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this2 = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Preparing:
          return {
            enter: function enter(node, parentNode) {
              return _this2.transformNode(node, parentNode);
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(node, parentNode) {
      var obfuscationAllowed = this.obfuscatingGuards.every(function (nodeGuard) {
        return nodeGuard.check(node);
      });
      NodeMetadata_1.NodeMetadata.set(node, {
        ignoredNode: !obfuscationAllowed
      });
      return node;
    }
  }]);
  return ObfuscatingGuardsTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

ObfuscatingGuardsTransformer.obfuscatingGuardsList = [ObfuscatingGuard_1.ObfuscatingGuard.BlackListNodeGuard, ObfuscatingGuard_1.ObfuscatingGuard.ConditionalCommentNodeGuard];
ObfuscatingGuardsTransformer = ObfuscatingGuardsTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeGuard)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], ObfuscatingGuardsTransformer);
exports.ObfuscatingGuardsTransformer = ObfuscatingGuardsTransformer;

/***/ }),

/***/ "./src/node-transformers/preparing-transformers/ParentificationTransformer.ts":
/*!************************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/ParentificationTransformer.ts ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");

var AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");

var NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");

var ParentificationTransformer =
/*#__PURE__*/
function (_AbstractNodeTransfor) {
  (0, _inherits2.default)(ParentificationTransformer, _AbstractNodeTransfor);

  function ParentificationTransformer(randomGenerator, options) {
    (0, _classCallCheck2.default)(this, ParentificationTransformer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ParentificationTransformer).call(this, randomGenerator, options));
  }

  (0, _createClass2.default)(ParentificationTransformer, [{
    key: "getVisitor",
    value: function getVisitor(transformationStage) {
      var _this = this;

      switch (transformationStage) {
        case TransformationStage_1.TransformationStage.Preparing:
          return {
            enter: function enter(node, parentNode) {
              return _this.transformNode(node, parentNode);
            }
          };

        default:
          return null;
      }
    }
  }, {
    key: "transformNode",
    value: function transformNode(node, parentNode) {
      return NodeUtils_1.NodeUtils.parentizeNode(node, parentNode);
    }
  }]);
  return ParentificationTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);

ParentificationTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], ParentificationTransformer);
exports.ParentificationTransformer = ParentificationTransformer;

/***/ }),

/***/ "./src/node-transformers/preparing-transformers/obfuscating-guards/BlackListObfuscatingGuard.ts":
/*!******************************************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/obfuscating-guards/BlackListObfuscatingGuard.ts ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var BlackListObfuscatingGuard_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var BlackListObfuscatingGuard = BlackListObfuscatingGuard_1 =
/*#__PURE__*/
function () {
  function BlackListObfuscatingGuard() {
    (0, _classCallCheck2.default)(this, BlackListObfuscatingGuard);
    this.blackListGuardsLength = BlackListObfuscatingGuard_1.blackListGuards.length;
  }

  (0, _createClass2.default)(BlackListObfuscatingGuard, [{
    key: "check",
    value: function check(node) {
      for (var i = 0; i < this.blackListGuardsLength; i++) {
        if (BlackListObfuscatingGuard_1.blackListGuards[i](node)) {
          return false;
        }
      }

      return true;
    }
  }]);
  return BlackListObfuscatingGuard;
}();

BlackListObfuscatingGuard.blackListGuards = [NodeGuards_1.NodeGuards.isUseStrictOperator];
BlackListObfuscatingGuard = BlackListObfuscatingGuard_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__metadata("design:paramtypes", [])], BlackListObfuscatingGuard);
exports.BlackListObfuscatingGuard = BlackListObfuscatingGuard;

/***/ }),

/***/ "./src/node-transformers/preparing-transformers/obfuscating-guards/ConditionalCommentObfuscatingGuard.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/obfuscating-guards/ConditionalCommentObfuscatingGuard.ts ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var ConditionalCommentObfuscatingGuard_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");

var ConditionalCommentObfuscatingGuard = ConditionalCommentObfuscatingGuard_1 =
/*#__PURE__*/
function () {
  function ConditionalCommentObfuscatingGuard() {
    (0, _classCallCheck2.default)(this, ConditionalCommentObfuscatingGuard);
    this.obfuscationAllowedForCurrentNode = true;
    this.obfuscationAllowedForNextNode = null;
  }

  (0, _createClass2.default)(ConditionalCommentObfuscatingGuard, [{
    key: "check",
    value: function check(node) {
      if (this.obfuscationAllowedForNextNode) {
        this.obfuscationAllowedForCurrentNode = this.obfuscationAllowedForNextNode;
        this.obfuscationAllowedForNextNode = null;
      }

      if (!NodeGuards_1.NodeGuards.isNodeWithComments(node)) {
        return this.obfuscationAllowedForCurrentNode;
      }

      var leadingComments = node.leadingComments;
      var trailingComments = node.trailingComments;

      if (leadingComments) {
        this.obfuscationAllowedForCurrentNode = this.checkComments(leadingComments);
      }

      if (trailingComments) {
        this.obfuscationAllowedForNextNode = this.checkComments(trailingComments);
      }

      return this.obfuscationAllowedForCurrentNode;
    }
  }, {
    key: "checkComments",
    value: function checkComments(comments) {
      var commentsLength = comments.length;
      var obfuscationAllowed = this.obfuscationAllowedForCurrentNode;

      for (var i = 0; i < commentsLength; i++) {
        var comment = comments[i];

        if (ConditionalCommentObfuscatingGuard_1.obfuscationEnableCommentRegExp.test(comment.value)) {
          obfuscationAllowed = true;
          continue;
        }

        if (ConditionalCommentObfuscatingGuard_1.obfuscationDisableCommentRegExp.test(comment.value)) {
          obfuscationAllowed = false;
        }
      }

      return obfuscationAllowed;
    }
  }]);
  return ConditionalCommentObfuscatingGuard;
}();

ConditionalCommentObfuscatingGuard.obfuscationEnableCommentRegExp = new RegExp('javascript-obfuscator *: *enable');
ConditionalCommentObfuscatingGuard.obfuscationDisableCommentRegExp = new RegExp('javascript-obfuscator *: *disable');
ConditionalCommentObfuscatingGuard = ConditionalCommentObfuscatingGuard_1 = tslib_1.__decorate([inversify_1.injectable()], ConditionalCommentObfuscatingGuard);
exports.ConditionalCommentObfuscatingGuard = ConditionalCommentObfuscatingGuard;

/***/ }),

/***/ "./src/node/NodeAppender.ts":
/*!**********************************!*\
  !*** ./src/node/NodeAppender.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var NodeGuards_1 = __webpack_require__(/*! ./NodeGuards */ "./src/node/NodeGuards.ts");

var NodeAppender =
/*#__PURE__*/
function () {
  function NodeAppender() {
    (0, _classCallCheck2.default)(this, NodeAppender);
  }

  (0, _createClass2.default)(NodeAppender, null, [{
    key: "append",
    value: function append(scope, statements) {
      statements = NodeAppender.parentizeScopeStatementsBeforeAppend(scope, statements);
      NodeAppender.setScopeStatements(scope, (0, _toConsumableArray2.default)(NodeAppender.getScopeStatements(scope)).concat((0, _toConsumableArray2.default)(statements)));
    }
  }, {
    key: "appendToOptimalBlockScope",
    value: function appendToOptimalBlockScope(stackTraceData, blockScopeNode, bodyStatements) {
      var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var targetBlockScope = stackTraceData.length ? NodeAppender.getOptimalBlockScope(stackTraceData, index) : blockScopeNode;
      NodeAppender.prepend(targetBlockScope, bodyStatements);
    }
  }, {
    key: "getOptimalBlockScope",
    value: function getOptimalBlockScope(stackTraceData, index) {
      var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
      var firstCall = stackTraceData[index];

      if (deep <= 0) {
        throw new Error('Invalid `deep` argument value. Value should be bigger then 0.');
      }

      if (deep > 1 && firstCall.stackTrace.length) {
        return NodeAppender.getOptimalBlockScope(firstCall.stackTrace, 0, --deep);
      } else {
        return firstCall.callee;
      }
    }
  }, {
    key: "insertAfter",
    value: function insertAfter(scope, statements, target) {
      var indexInScopeStatement = NodeAppender.getScopeStatements(scope).indexOf(target);
      NodeAppender.insertAtIndex(scope, statements, indexInScopeStatement + 1);
    }
  }, {
    key: "insertAtIndex",
    value: function insertAtIndex(scope, statements, index) {
      statements = NodeAppender.parentizeScopeStatementsBeforeAppend(scope, statements);
      NodeAppender.setScopeStatements(scope, (0, _toConsumableArray2.default)(NodeAppender.getScopeStatements(scope).slice(0, index)).concat((0, _toConsumableArray2.default)(statements), (0, _toConsumableArray2.default)(NodeAppender.getScopeStatements(scope).slice(index))));
    }
  }, {
    key: "prepend",
    value: function prepend(scope, statements) {
      statements = NodeAppender.parentizeScopeStatementsBeforeAppend(scope, statements);
      NodeAppender.setScopeStatements(scope, (0, _toConsumableArray2.default)(statements).concat((0, _toConsumableArray2.default)(NodeAppender.getScopeStatements(scope))));
    }
  }, {
    key: "getScopeStatements",
    value: function getScopeStatements(scope) {
      if (NodeGuards_1.NodeGuards.isSwitchCaseNode(scope)) {
        return scope.consequent;
      }

      return scope.body;
    }
  }, {
    key: "parentizeScopeStatementsBeforeAppend",
    value: function parentizeScopeStatementsBeforeAppend(scope, statements) {
      statements.forEach(function (statement) {
        statement.parentNode = scope;
      });
      return statements;
    }
  }, {
    key: "setScopeStatements",
    value: function setScopeStatements(scope, statements) {
      if (NodeGuards_1.NodeGuards.isSwitchCaseNode(scope)) {
        scope.consequent = statements;
        return;
      }

      scope.body = statements;
    }
  }]);
  return NodeAppender;
}();

exports.NodeAppender = NodeAppender;

/***/ }),

/***/ "./src/node/NodeFactory.ts":
/*!*********************************!*\
  !*** ./src/node/NodeFactory.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var escodegen = tslib_1.__importStar(__webpack_require__(/*! escodegen-wallaby */ "escodegen-wallaby"));

var NodeType_1 = __webpack_require__(/*! ../enums/node/NodeType */ "./src/enums/node/NodeType.ts");

var NodeFactory =
/*#__PURE__*/
function () {
  function NodeFactory() {
    (0, _classCallCheck2.default)(this, NodeFactory);
  }

  (0, _createClass2.default)(NodeFactory, null, [{
    key: "programNode",
    value: function programNode() {
      var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return {
        type: NodeType_1.NodeType.Program,
        body: body,
        sourceType: 'script',
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "arrayExpressionNode",
    value: function arrayExpressionNode() {
      var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return {
        type: NodeType_1.NodeType.ArrayExpression,
        elements: elements,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "assignmentExpressionNode",
    value: function assignmentExpressionNode(operator, left, right) {
      return {
        type: NodeType_1.NodeType.AssignmentExpression,
        operator: operator,
        left: left,
        right: right,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "binaryExpressionNode",
    value: function binaryExpressionNode(operator, left, right) {
      return {
        type: NodeType_1.NodeType.BinaryExpression,
        operator: operator,
        left: left,
        right: right,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "blockStatementNode",
    value: function blockStatementNode() {
      var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return {
        type: NodeType_1.NodeType.BlockStatement,
        body: body,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "breakStatement",
    value: function breakStatement(label) {
      var breakStatementNode = {
        type: NodeType_1.NodeType.BreakStatement,
        metadata: {
          ignoredNode: false
        }
      };

      if (label) {
        breakStatementNode.label = label;
      }

      return breakStatementNode;
    }
  }, {
    key: "callExpressionNode",
    value: function callExpressionNode(callee) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return {
        type: NodeType_1.NodeType.CallExpression,
        callee: callee,
        arguments: args,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "continueStatement",
    value: function continueStatement(label) {
      var continueStatementNode = {
        type: NodeType_1.NodeType.ContinueStatement,
        metadata: {
          ignoredNode: false
        }
      };

      if (label) {
        continueStatementNode.label = label;
      }

      return continueStatementNode;
    }
  }, {
    key: "expressionStatementNode",
    value: function expressionStatementNode(expression) {
      return {
        type: NodeType_1.NodeType.ExpressionStatement,
        expression: expression,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "functionDeclarationNode",
    value: function functionDeclarationNode(functionName, params, body) {
      return {
        type: NodeType_1.NodeType.FunctionDeclaration,
        id: NodeFactory.identifierNode(functionName),
        params: params,
        body: body,
        generator: false,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "functionExpressionNode",
    value: function functionExpressionNode(params, body) {
      return {
        type: NodeType_1.NodeType.FunctionExpression,
        params: params,
        body: body,
        generator: false,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "ifStatementNode",
    value: function ifStatementNode(test, consequent, alternate) {
      return (0, _assign.default)({
        type: NodeType_1.NodeType.IfStatement,
        test: test,
        consequent: consequent
      }, alternate && {
        alternate: alternate
      }, {
        metadata: {
          ignoredNode: false
        }
      });
    }
  }, {
    key: "identifierNode",
    value: function identifierNode(name) {
      return {
        type: NodeType_1.NodeType.Identifier,
        name: name,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "literalNode",
    value: function literalNode(value, raw) {
      raw = raw !== undefined ? raw : "'".concat(value, "'");
      return {
        type: NodeType_1.NodeType.Literal,
        value: value,
        raw: raw,
        'x-verbatim-property': {
          content: raw,
          precedence: escodegen.Precedence.Primary
        },
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "logicalExpressionNode",
    value: function logicalExpressionNode(operator, left, right) {
      return {
        type: NodeType_1.NodeType.LogicalExpression,
        operator: operator,
        left: left,
        right: right,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "memberExpressionNode",
    value: function memberExpressionNode(object, property) {
      var computed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return {
        type: NodeType_1.NodeType.MemberExpression,
        computed: computed,
        object: object,
        property: property,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "methodDefinitionNode",
    value: function methodDefinitionNode(key, value, kind, computed) {
      return {
        type: NodeType_1.NodeType.MethodDefinition,
        key: key,
        value: value,
        kind: kind,
        computed: computed,
        static: false,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "objectExpressionNode",
    value: function objectExpressionNode(properties) {
      return {
        type: NodeType_1.NodeType.ObjectExpression,
        properties: properties,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "propertyNode",
    value: function propertyNode(key, value) {
      var computed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      return {
        type: NodeType_1.NodeType.Property,
        key: key,
        value: value,
        kind: 'init',
        method: false,
        shorthand: false,
        computed: computed,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "returnStatementNode",
    value: function returnStatementNode(argument) {
      return {
        type: NodeType_1.NodeType.ReturnStatement,
        argument: argument,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "switchStatementNode",
    value: function switchStatementNode(discriminant, cases) {
      return {
        type: NodeType_1.NodeType.SwitchStatement,
        discriminant: discriminant,
        cases: cases,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "switchCaseNode",
    value: function switchCaseNode(test, consequent) {
      return {
        type: NodeType_1.NodeType.SwitchCase,
        test: test,
        consequent: consequent,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "unaryExpressionNode",
    value: function unaryExpressionNode(operator, argument) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return {
        type: NodeType_1.NodeType.UnaryExpression,
        operator: operator,
        argument: argument,
        prefix: prefix,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "updateExpressionNode",
    value: function updateExpressionNode(operator, argumentExpr) {
      return {
        type: NodeType_1.NodeType.UpdateExpression,
        operator: operator,
        argument: argumentExpr,
        prefix: false,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "variableDeclarationNode",
    value: function variableDeclarationNode() {
      var declarations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'var';
      return {
        type: NodeType_1.NodeType.VariableDeclaration,
        declarations: declarations,
        kind: kind,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "variableDeclaratorNode",
    value: function variableDeclaratorNode(id, init) {
      return {
        type: NodeType_1.NodeType.VariableDeclarator,
        id: id,
        init: init,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }, {
    key: "whileStatementNode",
    value: function whileStatementNode(test, body) {
      return {
        type: NodeType_1.NodeType.WhileStatement,
        test: test,
        body: body,
        metadata: {
          ignoredNode: false
        }
      };
    }
  }]);
  return NodeFactory;
}();

exports.NodeFactory = NodeFactory;

/***/ }),

/***/ "./src/node/NodeGuards.ts":
/*!********************************!*\
  !*** ./src/node/NodeGuards.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var NodeType_1 = __webpack_require__(/*! ../enums/node/NodeType */ "./src/enums/node/NodeType.ts");

var NodeGuards =
/*#__PURE__*/
function () {
  function NodeGuards() {
    (0, _classCallCheck2.default)(this, NodeGuards);
  }

  (0, _createClass2.default)(NodeGuards, null, [{
    key: "isArrayPatternNode",
    value: function isArrayPatternNode(node) {
      return node.type === NodeType_1.NodeType.ArrayPattern;
    }
  }, {
    key: "isArrowFunctionExpressionNode",
    value: function isArrowFunctionExpressionNode(node) {
      return node.type === NodeType_1.NodeType.ArrowFunctionExpression;
    }
  }, {
    key: "isAssignmentExpressionNode",
    value: function isAssignmentExpressionNode(node) {
      return node.type === NodeType_1.NodeType.AssignmentExpression;
    }
  }, {
    key: "isAssignmentPatternNode",
    value: function isAssignmentPatternNode(node) {
      return node.type === NodeType_1.NodeType.AssignmentPattern;
    }
  }, {
    key: "isAwaitExpressionNode",
    value: function isAwaitExpressionNode(node) {
      return node.type === NodeType_1.NodeType.AwaitExpression;
    }
  }, {
    key: "isBlockStatementNode",
    value: function isBlockStatementNode(node) {
      return node.type === NodeType_1.NodeType.BlockStatement;
    }
  }, {
    key: "isBreakStatementNode",
    value: function isBreakStatementNode(node) {
      return node.type === NodeType_1.NodeType.BreakStatement;
    }
  }, {
    key: "isCallExpressionNode",
    value: function isCallExpressionNode(node) {
      return node.type === NodeType_1.NodeType.CallExpression;
    }
  }, {
    key: "isCatchClauseNode",
    value: function isCatchClauseNode(node) {
      return node.type === NodeType_1.NodeType.CatchClause;
    }
  }, {
    key: "isClassDeclarationNode",
    value: function isClassDeclarationNode(node) {
      return node.type === NodeType_1.NodeType.ClassDeclaration;
    }
  }, {
    key: "isContinueStatementNode",
    value: function isContinueStatementNode(node) {
      return node.type === NodeType_1.NodeType.ContinueStatement;
    }
  }, {
    key: "isExportNamedDeclarationNode",
    value: function isExportNamedDeclarationNode(node) {
      return node.type === NodeType_1.NodeType.ExportNamedDeclaration;
    }
  }, {
    key: "isExpressionStatementNode",
    value: function isExpressionStatementNode(node) {
      return node.type === NodeType_1.NodeType.ExpressionStatement;
    }
  }, {
    key: "isFunctionDeclarationNode",
    value: function isFunctionDeclarationNode(node) {
      return node.type === NodeType_1.NodeType.FunctionDeclaration;
    }
  }, {
    key: "isFunctionExpressionNode",
    value: function isFunctionExpressionNode(node) {
      return node.type === NodeType_1.NodeType.FunctionExpression;
    }
  }, {
    key: "isIdentifierNode",
    value: function isIdentifierNode(node) {
      return node.type === NodeType_1.NodeType.Identifier;
    }
  }, {
    key: "isIfStatementNode",
    value: function isIfStatementNode(node) {
      return node.type === NodeType_1.NodeType.IfStatement;
    }
  }, {
    key: "isImportDeclarationNode",
    value: function isImportDeclarationNode(node) {
      return node.type === NodeType_1.NodeType.ImportDeclaration;
    }
  }, {
    key: "isImportDefaultSpecifierNode",
    value: function isImportDefaultSpecifierNode(node) {
      return node.type === NodeType_1.NodeType.ImportDefaultSpecifier;
    }
  }, {
    key: "isImportNamespaceSpecifierNode",
    value: function isImportNamespaceSpecifierNode(node) {
      return node.type === NodeType_1.NodeType.ImportNamespaceSpecifier;
    }
  }, {
    key: "isImportSpecifierNode",
    value: function isImportSpecifierNode(node) {
      return node.type === NodeType_1.NodeType.ImportSpecifier;
    }
  }, {
    key: "isLabelIdentifierNode",
    value: function isLabelIdentifierNode(node, parentNode) {
      var parentNodeIsLabeledStatementNode = NodeGuards.isLabeledStatementNode(parentNode) && parentNode.label === node;
      var parentNodeIsContinueStatementNode = NodeGuards.isContinueStatementNode(parentNode) && parentNode.label === node;
      var parentNodeIsBreakStatementNode = NodeGuards.isBreakStatementNode(parentNode) && parentNode.label === node;
      return parentNodeIsLabeledStatementNode || parentNodeIsContinueStatementNode || parentNodeIsBreakStatementNode;
    }
  }, {
    key: "isLabeledStatementNode",
    value: function isLabeledStatementNode(node) {
      return node.type === NodeType_1.NodeType.LabeledStatement;
    }
  }, {
    key: "isLiteralNode",
    value: function isLiteralNode(node) {
      return node.type === NodeType_1.NodeType.Literal;
    }
  }, {
    key: "isMemberExpressionNode",
    value: function isMemberExpressionNode(node) {
      return node.type === NodeType_1.NodeType.MemberExpression;
    }
  }, {
    key: "isMethodDefinitionNode",
    value: function isMethodDefinitionNode(node) {
      return node.type === NodeType_1.NodeType.MethodDefinition;
    }
  }, {
    key: "isNode",
    value: function isNode(object) {
      return object && !object.type !== undefined;
    }
  }, {
    key: "isNodeHasBlockScope",
    value: function isNodeHasBlockScope(node, parentNode) {
      return NodeGuards.isProgramNode(node) || NodeGuards.isBlockStatementNode(node) && NodeGuards.nodesWithBlockScope.includes(parentNode.type);
    }
  }, {
    key: "isNodeHasScope",
    value: function isNodeHasScope(node) {
      return NodeGuards.isProgramNode(node) || NodeGuards.isBlockStatementNode(node) || NodeGuards.isSwitchCaseNode(node);
    }
  }, {
    key: "isNodeWithComments",
    value: function isNodeWithComments(node) {
      return Boolean(node.leadingComments) || Boolean(node.trailingComments);
    }
  }, {
    key: "isObjectPatternNode",
    value: function isObjectPatternNode(node) {
      return node.type === NodeType_1.NodeType.ObjectPattern;
    }
  }, {
    key: "isObjectExpressionNode",
    value: function isObjectExpressionNode(node) {
      return node.type === NodeType_1.NodeType.ObjectExpression;
    }
  }, {
    key: "isProgramNode",
    value: function isProgramNode(node) {
      return node.type === NodeType_1.NodeType.Program;
    }
  }, {
    key: "isPropertyNode",
    value: function isPropertyNode(node) {
      return node.type === NodeType_1.NodeType.Property;
    }
  }, {
    key: "isReplaceableIdentifierNode",
    value: function isReplaceableIdentifierNode(node, parentNode) {
      if (!NodeGuards.isIdentifierNode(node)) {
        return false;
      }

      var parentNodeIsPropertyNode = NodeGuards.isPropertyNode(parentNode) && !parentNode.computed && parentNode.key === node;
      var parentNodeIsMemberExpressionNode = NodeGuards.isMemberExpressionNode(parentNode) && !parentNode.computed && parentNode.property === node;
      var parentNodeIsMethodDefinitionNode = NodeGuards.isMethodDefinitionNode(parentNode) && !parentNode.computed;
      var isLabelIdentifierNode = NodeGuards.isLabelIdentifierNode(node, parentNode);
      return !parentNodeIsPropertyNode && !parentNodeIsMemberExpressionNode && !parentNodeIsMethodDefinitionNode && !isLabelIdentifierNode;
    }
  }, {
    key: "isRestElementNode",
    value: function isRestElementNode(node) {
      return node.type === NodeType_1.NodeType.RestElement;
    }
  }, {
    key: "isReturnStatementNode",
    value: function isReturnStatementNode(node) {
      return node.type === NodeType_1.NodeType.ReturnStatement;
    }
  }, {
    key: "isSuperNode",
    value: function isSuperNode(node) {
      return node.type === NodeType_1.NodeType.Super;
    }
  }, {
    key: "isSwitchCaseNode",
    value: function isSwitchCaseNode(node) {
      return node.type === NodeType_1.NodeType.SwitchCase;
    }
  }, {
    key: "isTaggedTemplateExpressionNode",
    value: function isTaggedTemplateExpressionNode(node) {
      return node.type === NodeType_1.NodeType.TaggedTemplateExpression;
    }
  }, {
    key: "isTemplateLiteralNode",
    value: function isTemplateLiteralNode(node) {
      return node.type === NodeType_1.NodeType.TemplateLiteral;
    }
  }, {
    key: "isUnaryExpressionNode",
    value: function isUnaryExpressionNode(node) {
      return node.type === NodeType_1.NodeType.UnaryExpression;
    }
  }, {
    key: "isUseStrictOperator",
    value: function isUseStrictOperator(node) {
      return node.type === NodeType_1.NodeType.ExpressionStatement && node.directive === 'use strict';
    }
  }, {
    key: "isVariableDeclarationNode",
    value: function isVariableDeclarationNode(node) {
      return node.type === NodeType_1.NodeType.VariableDeclaration;
    }
  }, {
    key: "isVariableDeclaratorNode",
    value: function isVariableDeclaratorNode(node) {
      return node.type === NodeType_1.NodeType.VariableDeclarator;
    }
  }, {
    key: "isWhileStatementNode",
    value: function isWhileStatementNode(node) {
      return node.type === NodeType_1.NodeType.WhileStatement;
    }
  }]);
  return NodeGuards;
}();

NodeGuards.nodesWithBlockScope = [NodeType_1.NodeType.ArrowFunctionExpression, NodeType_1.NodeType.FunctionDeclaration, NodeType_1.NodeType.FunctionExpression, NodeType_1.NodeType.MethodDefinition];
exports.NodeGuards = NodeGuards;

/***/ }),

/***/ "./src/node/NodeMetadata.ts":
/*!**********************************!*\
  !*** ./src/node/NodeMetadata.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var NodeMetadata =
/*#__PURE__*/
function () {
  function NodeMetadata() {
    (0, _classCallCheck2.default)(this, NodeMetadata);
  }

  (0, _createClass2.default)(NodeMetadata, null, [{
    key: "set",
    value: function set(node, metadata) {
      node.metadata = (0, _assign.default)(node.metadata || {}, metadata);
    }
  }, {
    key: "get",
    value: function get(node, metadataKey) {
      return node.metadata !== undefined ? node.metadata[metadataKey] : undefined;
    }
  }, {
    key: "isIgnoredNode",
    value: function isIgnoredNode(node) {
      return NodeMetadata.get(node, 'ignoredNode') === true;
    }
  }, {
    key: "isRenamedIdentifier",
    value: function isRenamedIdentifier(identifierNode) {
      return NodeMetadata.get(identifierNode, 'renamedIdentifier') === true;
    }
  }, {
    key: "isReplacedLiteral",
    value: function isReplacedLiteral(literalNode) {
      return NodeMetadata.get(literalNode, 'replacedLiteral') === true;
    }
  }]);
  return NodeMetadata;
}();

exports.NodeMetadata = NodeMetadata;

/***/ }),

/***/ "./src/node/NodeUtils.ts":
/*!*******************************!*\
  !*** ./src/node/NodeUtils.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "@babel/runtime/helpers/typeof"));

var _keys = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/keys */ "@babel/runtime/core-js/object/keys"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var escodegen = tslib_1.__importStar(__webpack_require__(/*! escodegen-wallaby */ "escodegen-wallaby"));

var espree = tslib_1.__importStar(__webpack_require__(/*! espree */ "espree"));

var estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));

var NodeGuards_1 = __webpack_require__(/*! ./NodeGuards */ "./src/node/NodeGuards.ts");

var NodeMetadata_1 = __webpack_require__(/*! ./NodeMetadata */ "./src/node/NodeMetadata.ts");

var NodeUtils =
/*#__PURE__*/
function () {
  function NodeUtils() {
    (0, _classCallCheck2.default)(this, NodeUtils);
  }

  (0, _createClass2.default)(NodeUtils, null, [{
    key: "addXVerbatimPropertyTo",
    value: function addXVerbatimPropertyTo(literalNode) {
      literalNode['x-verbatim-property'] = {
        content: literalNode.raw,
        precedence: escodegen.Precedence.Primary
      };
      return literalNode;
    }
  }, {
    key: "clone",
    value: function clone(astTree) {
      return NodeUtils.parentizeAst(NodeUtils.cloneRecursive(astTree));
    }
  }, {
    key: "convertCodeToStructure",
    value: function convertCodeToStructure(code) {
      var structure = espree.parse(code, {
        sourceType: 'script'
      });
      estraverse.replace(structure, {
        enter: function enter(node, parentNode) {
          NodeUtils.parentizeNode(node, parentNode);

          if (NodeGuards_1.NodeGuards.isLiteralNode(node)) {
            NodeUtils.addXVerbatimPropertyTo(node);
          }

          NodeMetadata_1.NodeMetadata.set(node, {
            ignoredNode: false
          });
          return node;
        }
      });
      return structure.body;
    }
  }, {
    key: "convertStructureToCode",
    value: function convertStructureToCode(structure) {
      return structure.reduce(function (code, node) {
        return code + escodegen.generate(node, {
          sourceMapWithCode: true
        }).code;
      }, '');
    }
  }, {
    key: "getBlockScopesOfNode",
    value: function getBlockScopesOfNode(node) {
      return NodeUtils.getBlockScopesOfNodeRecursive(node);
    }
  }, {
    key: "getNextSiblingStatement",
    value: function getNextSiblingStatement(statement) {
      return NodeUtils.getSiblingStatementByOffset(statement, 1);
    }
  }, {
    key: "getPreviousSiblingStatement",
    value: function getPreviousSiblingStatement(statement) {
      return NodeUtils.getSiblingStatementByOffset(statement, -1);
    }
  }, {
    key: "getRootStatementOfNode",
    value: function getRootStatementOfNode(node) {
      if (NodeGuards_1.NodeGuards.isProgramNode(node)) {
        throw new Error('Unable to find root statement for `Program` node');
      }

      var parentNode = node.parentNode;

      if (!parentNode) {
        throw new ReferenceError('`parentNode` property of given node is `undefined`');
      }

      if (!NodeGuards_1.NodeGuards.isNodeHasScope(parentNode)) {
        return NodeUtils.getRootStatementOfNode(parentNode);
      }

      return node;
    }
  }, {
    key: "getScopeOfNode",
    value: function getScopeOfNode(node) {
      var parentNode = node.parentNode;

      if (!parentNode) {
        throw new ReferenceError('`parentNode` property of given node is `undefined`');
      }

      if (!NodeGuards_1.NodeGuards.isNodeHasScope(parentNode)) {
        return NodeUtils.getScopeOfNode(parentNode);
      }

      return parentNode;
    }
  }, {
    key: "getUnaryExpressionArgumentNode",
    value: function getUnaryExpressionArgumentNode(unaryExpressionNode) {
      if (NodeGuards_1.NodeGuards.isUnaryExpressionNode(unaryExpressionNode.argument)) {
        return NodeUtils.getUnaryExpressionArgumentNode(unaryExpressionNode.argument);
      }

      return unaryExpressionNode.argument;
    }
  }, {
    key: "parentizeAst",
    value: function parentizeAst(astTree) {
      estraverse.replace(astTree, {
        enter: NodeUtils.parentizeNode
      });
      return astTree;
    }
  }, {
    key: "parentizeNode",
    value: function parentizeNode(node, parentNode) {
      node.parentNode = parentNode || node;
      return node;
    }
  }, {
    key: "cloneRecursive",
    value: function cloneRecursive(node) {
      if (node === null) {
        return node;
      }

      var copy = {};
      (0, _keys.default)(node).forEach(function (property) {
        if (property === 'parentNode') {
          return;
        }

        var value = node[property];
        var clonedValue;

        if (value === null || value instanceof RegExp) {
          clonedValue = value;
        } else if (Array.isArray(value)) {
          clonedValue = value.map(NodeUtils.cloneRecursive);
        } else if ((0, _typeof2.default)(value) === 'object') {
          clonedValue = NodeUtils.cloneRecursive(value);
        } else {
          clonedValue = value;
        }

        copy[property] = clonedValue;
      });
      return copy;
    }
  }, {
    key: "getBlockScopesOfNodeRecursive",
    value: function getBlockScopesOfNodeRecursive(node) {
      var blockScopes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var parentNode = node.parentNode;

      if (!parentNode) {
        throw new ReferenceError('`parentNode` property of given node is `undefined`');
      }

      if (NodeGuards_1.NodeGuards.isBlockStatementNode(node) && parentNode === node) {
        blockScopes.push(node);
      }

      if (NodeGuards_1.NodeGuards.isProgramNode(node) || depth && NodeGuards_1.NodeGuards.isNodeHasBlockScope(node, parentNode)) {
        blockScopes.push(node);
      }

      if (node !== parentNode) {
        return NodeUtils.getBlockScopesOfNodeRecursive(parentNode, blockScopes, ++depth);
      }

      return blockScopes;
    }
  }, {
    key: "getSiblingStatementByOffset",
    value: function getSiblingStatementByOffset(statement, offset) {
      var scopeNode = NodeUtils.getScopeOfNode(statement);
      var scopeBody = !NodeGuards_1.NodeGuards.isSwitchCaseNode(scopeNode) ? scopeNode.body : scopeNode.consequent;
      var indexInScope = scopeBody.indexOf(statement);
      return scopeBody[indexInScope + offset] || null;
    }
  }]);
  return NodeUtils;
}();

exports.NodeUtils = NodeUtils;

/***/ }),

/***/ "./src/options/Options.ts":
/*!********************************!*\
  !*** ./src/options/Options.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var Options_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");

var IdentifierNamesGenerator_1 = __webpack_require__(/*! ../enums/generators/identifier-names-generators/IdentifierNamesGenerator */ "./src/enums/generators/identifier-names-generators/IdentifierNamesGenerator.ts");

var ObfuscationTarget_1 = __webpack_require__(/*! ../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");

var SourceMapMode_1 = __webpack_require__(/*! ../enums/source-map/SourceMapMode */ "./src/enums/source-map/SourceMapMode.ts");

var StringArrayEncoding_1 = __webpack_require__(/*! ../enums/StringArrayEncoding */ "./src/enums/StringArrayEncoding.ts");

var Default_1 = __webpack_require__(/*! ./presets/Default */ "./src/options/presets/Default.ts");

var ValidationErrorsFormatter_1 = __webpack_require__(/*! ./ValidationErrorsFormatter */ "./src/options/ValidationErrorsFormatter.ts");

var Options = Options_1 = function Options(inputOptions, optionsNormalizer) {
  (0, _classCallCheck2.default)(this, Options);
  (0, _assign.default)(this, Default_1.DEFAULT_PRESET, inputOptions);
  var errors = class_validator_1.validateSync(this, Options_1.validatorOptions);

  if (errors.length) {
    throw new ReferenceError("Validation failed. errors:\n".concat(ValidationErrorsFormatter_1.ValidationErrorsFormatter.format(errors)));
  }

  (0, _assign.default)(this, optionsNormalizer.normalize(this));
};

Options.validatorOptions = {
  validationError: {
    target: false
  }
};

tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "compact", void 0);

tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "controlFlowFlattening", void 0);

tslib_1.__decorate([class_validator_1.IsNumber(), class_validator_1.Min(0), class_validator_1.Max(1), tslib_1.__metadata("design:type", Number)], Options.prototype, "controlFlowFlatteningThreshold", void 0);

tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "deadCodeInjection", void 0);

tslib_1.__decorate([class_validator_1.IsNumber(), tslib_1.__metadata("design:type", Number)], Options.prototype, "deadCodeInjectionThreshold", void 0);

tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "debugProtection", void 0);

tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "debugProtectionInterval", void 0);

tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "disableConsoleOutput", void 0);

tslib_1.__decorate([class_validator_1.IsArray(), class_validator_1.ArrayUnique(), class_validator_1.IsString({
  each: true
}), tslib_1.__metadata("design:type", Array)], Options.prototype, "domainLock", void 0);

tslib_1.__decorate([class_validator_1.IsIn([IdentifierNamesGenerator_1.IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator, IdentifierNamesGenerator_1.IdentifierNamesGenerator.MangledIdentifierNamesGenerator]), tslib_1.__metadata("design:type", String)], Options.prototype, "identifierNamesGenerator", void 0);

tslib_1.__decorate([class_validator_1.IsString(), tslib_1.__metadata("design:type", String)], Options.prototype, "identifiersPrefix", void 0);

tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "log", void 0);

tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "renameGlobals", void 0);

tslib_1.__decorate([class_validator_1.IsArray(), class_validator_1.ArrayUnique(), class_validator_1.IsString({
  each: true
}), tslib_1.__metadata("design:type", Array)], Options.prototype, "reservedNames", void 0);

tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "rotateStringArray", void 0);

tslib_1.__decorate([class_validator_1.IsNumber(), tslib_1.__metadata("design:type", Number)], Options.prototype, "seed", void 0);

tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "selfDefending", void 0);

tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "sourceMap", void 0);

tslib_1.__decorate([class_validator_1.IsString(), class_validator_1.ValidateIf(function (options) {
  return Boolean(options.sourceMapBaseUrl);
}), class_validator_1.IsUrl({
  require_protocol: true,
  require_tld: false,
  require_valid_protocol: true
}), tslib_1.__metadata("design:type", String)], Options.prototype, "sourceMapBaseUrl", void 0);

tslib_1.__decorate([class_validator_1.IsString(), tslib_1.__metadata("design:type", String)], Options.prototype, "sourceMapFileName", void 0);

tslib_1.__decorate([class_validator_1.IsIn([SourceMapMode_1.SourceMapMode.Inline, SourceMapMode_1.SourceMapMode.Separate]), tslib_1.__metadata("design:type", String)], Options.prototype, "sourceMapMode", void 0);

tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "stringArray", void 0);

tslib_1.__decorate([class_validator_1.IsIn([true, false, StringArrayEncoding_1.StringArrayEncoding.Base64, StringArrayEncoding_1.StringArrayEncoding.Rc4]), tslib_1.__metadata("design:type", Object)], Options.prototype, "stringArrayEncoding", void 0);

tslib_1.__decorate([class_validator_1.IsNumber(), class_validator_1.Min(0), class_validator_1.Max(1), tslib_1.__metadata("design:type", Number)], Options.prototype, "stringArrayThreshold", void 0);

tslib_1.__decorate([class_validator_1.IsIn([ObfuscationTarget_1.ObfuscationTarget.Browser, ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval, ObfuscationTarget_1.ObfuscationTarget.Node]), tslib_1.__metadata("design:type", String)], Options.prototype, "target", void 0);

tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "transformObjectKeys", void 0);

tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "unicodeEscapeSequence", void 0);

Options = Options_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TInputOptions)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptionsNormalizer)), tslib_1.__metadata("design:paramtypes", [Object, Object])], Options);
exports.Options = Options;

/***/ }),

/***/ "./src/options/OptionsNormalizer.ts":
/*!******************************************!*\
  !*** ./src/options/OptionsNormalizer.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _getIterator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/get-iterator */ "@babel/runtime/core-js/get-iterator"));

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var OptionsNormalizer_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ControlFlowFlatteningThresholdRule_1 = __webpack_require__(/*! ./normalizer-rules/ControlFlowFlatteningThresholdRule */ "./src/options/normalizer-rules/ControlFlowFlatteningThresholdRule.ts");

var DeadCodeInjectionRule_1 = __webpack_require__(/*! ./normalizer-rules/DeadCodeInjectionRule */ "./src/options/normalizer-rules/DeadCodeInjectionRule.ts");

var DeadCodeInjectionThresholdRule_1 = __webpack_require__(/*! ./normalizer-rules/DeadCodeInjectionThresholdRule */ "./src/options/normalizer-rules/DeadCodeInjectionThresholdRule.ts");

var DomainLockRule_1 = __webpack_require__(/*! ./normalizer-rules/DomainLockRule */ "./src/options/normalizer-rules/DomainLockRule.ts");

var SelfDefendingRule_1 = __webpack_require__(/*! ./normalizer-rules/SelfDefendingRule */ "./src/options/normalizer-rules/SelfDefendingRule.ts");

var SourceMapBaseUrlRule_1 = __webpack_require__(/*! ./normalizer-rules/SourceMapBaseUrlRule */ "./src/options/normalizer-rules/SourceMapBaseUrlRule.ts");

var SourceMapFileNameRule_1 = __webpack_require__(/*! ./normalizer-rules/SourceMapFileNameRule */ "./src/options/normalizer-rules/SourceMapFileNameRule.ts");

var StringArrayRule_1 = __webpack_require__(/*! ./normalizer-rules/StringArrayRule */ "./src/options/normalizer-rules/StringArrayRule.ts");

var StringArrayEncodingRule_1 = __webpack_require__(/*! ./normalizer-rules/StringArrayEncodingRule */ "./src/options/normalizer-rules/StringArrayEncodingRule.ts");

var StringArrayThresholdRule_1 = __webpack_require__(/*! ./normalizer-rules/StringArrayThresholdRule */ "./src/options/normalizer-rules/StringArrayThresholdRule.ts");

var OptionsNormalizer = OptionsNormalizer_1 =
/*#__PURE__*/
function () {
  function OptionsNormalizer() {
    (0, _classCallCheck2.default)(this, OptionsNormalizer);
  }

  (0, _createClass2.default)(OptionsNormalizer, [{
    key: "normalize",
    value: function normalize(options) {
      var normalizedOptions = (0, _assign.default)({}, options);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator2.default)(OptionsNormalizer_1.normalizerRules), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var normalizerRule = _step.value;
          normalizedOptions = normalizerRule(normalizedOptions);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return normalizedOptions;
    }
  }]);
  return OptionsNormalizer;
}();

OptionsNormalizer.normalizerRules = [ControlFlowFlatteningThresholdRule_1.ControlFlowFlatteningThresholdRule, DeadCodeInjectionRule_1.DeadCodeInjectionRule, DeadCodeInjectionThresholdRule_1.DeadCodeInjectionThresholdRule, DomainLockRule_1.DomainLockRule, SelfDefendingRule_1.SelfDefendingRule, SourceMapBaseUrlRule_1.SourceMapBaseUrlRule, SourceMapFileNameRule_1.SourceMapFileNameRule, StringArrayRule_1.StringArrayRule, StringArrayEncodingRule_1.StringArrayEncodingRule, StringArrayThresholdRule_1.StringArrayThresholdRule];
OptionsNormalizer = OptionsNormalizer_1 = tslib_1.__decorate([inversify_1.injectable()], OptionsNormalizer);
exports.OptionsNormalizer = OptionsNormalizer;

/***/ }),

/***/ "./src/options/ValidationErrorsFormatter.ts":
/*!**************************************************!*\
  !*** ./src/options/ValidationErrorsFormatter.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _keys = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/keys */ "@babel/runtime/core-js/object/keys"));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ValidationErrorsFormatter =
/*#__PURE__*/
function () {
  function ValidationErrorsFormatter() {
    (0, _classCallCheck2.default)(this, ValidationErrorsFormatter);
  }

  (0, _createClass2.default)(ValidationErrorsFormatter, null, [{
    key: "format",
    value: function format(errors) {
      return errors.reduce(function (errorMessages, error) {
        return (0, _toConsumableArray2.default)(errorMessages).concat([ValidationErrorsFormatter.formatWithNestedConstraints(error)]);
      }, []).join('\n');
    }
  }, {
    key: "formatWithNestedConstraints",
    value: function formatWithNestedConstraints(error) {
      var constraints = error.constraints;
      var rootError = "`".concat(error.property, "` errors:\n");
      var nestedErrors = (0, _keys.default)(constraints).map(function (constraint) {
        return "    - ".concat(constraints[constraint], "\n");
      }).join();
      return "".concat(rootError).concat(nestedErrors);
    }
  }]);
  return ValidationErrorsFormatter;
}();

exports.ValidationErrorsFormatter = ValidationErrorsFormatter;

/***/ }),

/***/ "./src/options/normalizer-rules/ControlFlowFlatteningThresholdRule.ts":
/*!****************************************************************************!*\
  !*** ./src/options/normalizer-rules/ControlFlowFlatteningThresholdRule.ts ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.ControlFlowFlatteningThresholdRule = function (options) {
  if (options.controlFlowFlatteningThreshold === 0) {
    options = (0, _assign.default)({}, options, {
      controlFlowFlattening: false,
      controlFlowFlatteningThreshold: 0
    });
  }

  return options;
};

/***/ }),

/***/ "./src/options/normalizer-rules/DeadCodeInjectionRule.ts":
/*!***************************************************************!*\
  !*** ./src/options/normalizer-rules/DeadCodeInjectionRule.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Default_1 = __webpack_require__(/*! ../presets/Default */ "./src/options/presets/Default.ts");

exports.DeadCodeInjectionRule = function (options) {
  if (options.deadCodeInjection) {
    options = (0, _assign.default)({}, options, {
      deadCodeInjection: true,
      stringArray: true
    });

    if (!options.stringArrayThreshold) {
      options = (0, _assign.default)({}, options, {
        stringArray: true,
        stringArrayThreshold: Default_1.DEFAULT_PRESET.stringArrayThreshold
      });
    }
  }

  return options;
};

/***/ }),

/***/ "./src/options/normalizer-rules/DeadCodeInjectionThresholdRule.ts":
/*!************************************************************************!*\
  !*** ./src/options/normalizer-rules/DeadCodeInjectionThresholdRule.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.DeadCodeInjectionThresholdRule = function (options) {
  if (options.deadCodeInjectionThreshold === 0) {
    options = (0, _assign.default)({}, options, {
      deadCodeInjection: false,
      deadCodeInjectionThreshold: 0
    });
  }

  return options;
};

/***/ }),

/***/ "./src/options/normalizer-rules/DomainLockRule.ts":
/*!********************************************************!*\
  !*** ./src/options/normalizer-rules/DomainLockRule.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _getIterator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/get-iterator */ "@babel/runtime/core-js/get-iterator"));

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Utils_1 = __webpack_require__(/*! ../../utils/Utils */ "./src/utils/Utils.ts");

exports.DomainLockRule = function (options) {
  if (options.domainLock.length) {
    var normalizedDomains = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator2.default)(options.domainLock), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var domain = _step.value;
        normalizedDomains.push(Utils_1.Utils.extractDomainFrom(domain));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    options = (0, _assign.default)({}, options, {
      domainLock: normalizedDomains
    });
  }

  return options;
};

/***/ }),

/***/ "./src/options/normalizer-rules/SelfDefendingRule.ts":
/*!***********************************************************!*\
  !*** ./src/options/normalizer-rules/SelfDefendingRule.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.SelfDefendingRule = function (options) {
  if (options.selfDefending) {
    options = (0, _assign.default)({}, options, {
      compact: true,
      selfDefending: true
    });
  }

  return options;
};

/***/ }),

/***/ "./src/options/normalizer-rules/SourceMapBaseUrlRule.ts":
/*!**************************************************************!*\
  !*** ./src/options/normalizer-rules/SourceMapBaseUrlRule.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.SourceMapBaseUrlRule = function (options) {
  var _options = options,
      sourceMapBaseUrl = _options.sourceMapBaseUrl;

  if (!options.sourceMapFileName) {
    options = (0, _assign.default)({}, options, {
      sourceMapBaseUrl: ''
    });
    return options;
  }

  if (sourceMapBaseUrl && !sourceMapBaseUrl.endsWith('/')) {
    options = (0, _assign.default)({}, options, {
      sourceMapBaseUrl: "".concat(sourceMapBaseUrl, "/")
    });
  }

  return options;
};

/***/ }),

/***/ "./src/options/normalizer-rules/SourceMapFileNameRule.ts":
/*!***************************************************************!*\
  !*** ./src/options/normalizer-rules/SourceMapFileNameRule.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.SourceMapFileNameRule = function (options) {
  var _options = options,
      sourceMapFileName = _options.sourceMapFileName;

  if (sourceMapFileName) {
    sourceMapFileName = sourceMapFileName.replace(/^\/+/, '').split('.')[0];
    options = (0, _assign.default)({}, options, {
      sourceMapFileName: "".concat(sourceMapFileName, ".js.map")
    });
  }

  return options;
};

/***/ }),

/***/ "./src/options/normalizer-rules/StringArrayEncodingRule.ts":
/*!*****************************************************************!*\
  !*** ./src/options/normalizer-rules/StringArrayEncodingRule.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var StringArrayEncoding_1 = __webpack_require__(/*! ../../enums/StringArrayEncoding */ "./src/enums/StringArrayEncoding.ts");

exports.StringArrayEncodingRule = function (options) {
  if (options.stringArrayEncoding === true) {
    options = (0, _assign.default)({}, options, {
      stringArrayEncoding: StringArrayEncoding_1.StringArrayEncoding.Base64
    });
  }

  return options;
};

/***/ }),

/***/ "./src/options/normalizer-rules/StringArrayRule.ts":
/*!*********************************************************!*\
  !*** ./src/options/normalizer-rules/StringArrayRule.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.StringArrayRule = function (options) {
  if (!options.stringArray) {
    options = (0, _assign.default)({}, options, {
      rotateStringArray: false,
      stringArray: false,
      stringArrayEncoding: false,
      stringArrayThreshold: 0
    });
  }

  return options;
};

/***/ }),

/***/ "./src/options/normalizer-rules/StringArrayThresholdRule.ts":
/*!******************************************************************!*\
  !*** ./src/options/normalizer-rules/StringArrayThresholdRule.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/assign */ "@babel/runtime/core-js/object/assign"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.StringArrayThresholdRule = function (options) {
  if (options.stringArrayThreshold === 0) {
    options = (0, _assign.default)({}, options, {
      rotateStringArray: false,
      stringArray: false,
      stringArrayEncoding: false,
      stringArrayThreshold: 0
    });
  }

  return options;
};

/***/ }),

/***/ "./src/options/presets/Default.ts":
/*!****************************************!*\
  !*** ./src/options/presets/Default.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _freeze = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/freeze */ "@babel/runtime/core-js/object/freeze"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var IdentifierNamesGenerator_1 = __webpack_require__(/*! ../../enums/generators/identifier-names-generators/IdentifierNamesGenerator */ "./src/enums/generators/identifier-names-generators/IdentifierNamesGenerator.ts");

var ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");

var SourceMapMode_1 = __webpack_require__(/*! ../../enums/source-map/SourceMapMode */ "./src/enums/source-map/SourceMapMode.ts");

exports.DEFAULT_PRESET = (0, _freeze.default)({
  compact: true,
  config: '',
  controlFlowFlattening: false,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: false,
  deadCodeInjectionThreshold: 0.4,
  debugProtection: false,
  debugProtectionInterval: false,
  disableConsoleOutput: false,
  domainLock: [],
  exclude: [],
  identifierNamesGenerator: IdentifierNamesGenerator_1.IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
  identifiersPrefix: '',
  log: false,
  renameGlobals: false,
  reservedNames: [],
  rotateStringArray: true,
  seed: 0,
  selfDefending: false,
  sourceMap: false,
  sourceMapBaseUrl: '',
  sourceMapFileName: '',
  sourceMapMode: SourceMapMode_1.SourceMapMode.Separate,
  stringArray: true,
  stringArrayEncoding: false,
  stringArrayThreshold: 0.75,
  target: ObfuscationTarget_1.ObfuscationTarget.Browser,
  transformObjectKeys: false,
  unicodeEscapeSequence: false
});

/***/ }),

/***/ "./src/options/presets/NoCustomNodes.ts":
/*!**********************************************!*\
  !*** ./src/options/presets/NoCustomNodes.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _freeze = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/object/freeze */ "@babel/runtime/core-js/object/freeze"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var IdentifierNamesGenerator_1 = __webpack_require__(/*! ../../enums/generators/identifier-names-generators/IdentifierNamesGenerator */ "./src/enums/generators/identifier-names-generators/IdentifierNamesGenerator.ts");

var ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");

var SourceMapMode_1 = __webpack_require__(/*! ../../enums/source-map/SourceMapMode */ "./src/enums/source-map/SourceMapMode.ts");

exports.NO_ADDITIONAL_NODES_PRESET = (0, _freeze.default)({
  compact: true,
  controlFlowFlattening: false,
  controlFlowFlatteningThreshold: 0,
  deadCodeInjection: false,
  deadCodeInjectionThreshold: 0,
  debugProtection: false,
  debugProtectionInterval: false,
  disableConsoleOutput: false,
  domainLock: [],
  exclude: [],
  identifierNamesGenerator: IdentifierNamesGenerator_1.IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
  identifiersPrefix: '',
  log: false,
  renameGlobals: false,
  reservedNames: [],
  rotateStringArray: false,
  seed: 0,
  selfDefending: false,
  sourceMap: false,
  sourceMapBaseUrl: '',
  sourceMapFileName: '',
  sourceMapMode: SourceMapMode_1.SourceMapMode.Separate,
  stringArray: false,
  stringArrayEncoding: false,
  stringArrayThreshold: 0,
  target: ObfuscationTarget_1.ObfuscationTarget.Browser,
  transformObjectKeys: false,
  unicodeEscapeSequence: false
});

/***/ }),

/***/ "./src/source-map/SourceMapCorrector.ts":
/*!**********************************************!*\
  !*** ./src/source-map/SourceMapCorrector.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var SourceMapMode_1 = __webpack_require__(/*! ../enums/source-map/SourceMapMode */ "./src/enums/source-map/SourceMapMode.ts");

var SourceMapCorrector =
/*#__PURE__*/
function () {
  function SourceMapCorrector(obfuscationResultFactory, cryptUtils, options) {
    (0, _classCallCheck2.default)(this, SourceMapCorrector);
    this.obfuscationResultFactory = obfuscationResultFactory;
    this.cryptUtils = cryptUtils;
    this.options = options;
  }

  (0, _createClass2.default)(SourceMapCorrector, [{
    key: "correct",
    value: function correct(obfuscatedCode, sourceMap) {
      return this.obfuscationResultFactory(this.correctObfuscatedCode(obfuscatedCode, sourceMap), sourceMap);
    }
  }, {
    key: "correctObfuscatedCode",
    value: function correctObfuscatedCode(obfuscatedCode, sourceMap) {
      if (!sourceMap) {
        return obfuscatedCode;
      }

      var sourceMapUrl = this.options.sourceMapBaseUrl + this.options.sourceMapFileName;
      var sourceMappingUrl = '//# sourceMappingURL=';

      switch (this.options.sourceMapMode) {
        case SourceMapMode_1.SourceMapMode.Inline:
          sourceMappingUrl += "data:application/json;base64,".concat(this.cryptUtils.btoa(sourceMap));
          break;

        case SourceMapMode_1.SourceMapMode.Separate:
        default:
          if (!sourceMapUrl) {
            return obfuscatedCode;
          }

          sourceMappingUrl += sourceMapUrl;
      }

      return "".concat(obfuscatedCode, "\n").concat(sourceMappingUrl);
    }
  }]);
  return SourceMapCorrector;
}();

SourceMapCorrector = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscationResult)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], SourceMapCorrector);
exports.SourceMapCorrector = SourceMapCorrector;

/***/ }),

/***/ "./src/storages/ArrayStorage.ts":
/*!**************************************!*\
  !*** ./src/storages/ArrayStorage.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../decorators/Initializable */ "./src/decorators/Initializable.ts");

var ArrayStorage =
/*#__PURE__*/
function () {
  function ArrayStorage(randomGenerator, options) {
    (0, _classCallCheck2.default)(this, ArrayStorage);
    this.storageLength = 0;
    this.randomGenerator = randomGenerator;
    this.options = options;
  }

  (0, _createClass2.default)(ArrayStorage, [{
    key: "initialize",
    value: function initialize() {
      this.storage = [];
      this.storageId = this.randomGenerator.getRandomString(6);
    }
  }, {
    key: "get",
    value: function get(key) {
      var value = this.storage[key];

      if (!value) {
        throw new Error("No value found in array storage with key `".concat(key, "`"));
      }

      return value;
    }
  }, {
    key: "getKeyOf",
    value: function getKeyOf(value) {
      var key = this.storage.indexOf(value);
      return key >= 0 ? key : null;
    }
  }, {
    key: "getLength",
    value: function getLength() {
      return this.storageLength;
    }
  }, {
    key: "getStorage",
    value: function getStorage() {
      return this.storage;
    }
  }, {
    key: "getStorageId",
    value: function getStorageId() {
      return this.storageId;
    }
  }, {
    key: "mergeWith",
    value: function mergeWith(storage) {
      var mergeId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.storage = (0, _toConsumableArray2.default)(this.storage).concat((0, _toConsumableArray2.default)(storage.getStorage()));

      if (mergeId) {
        this.storageId = storage.getStorageId();
      }
    }
  }, {
    key: "set",
    value: function set(key, value) {
      if (key === this.storageLength) {
        this.storage.push(value);
      } else {
        this.storage.splice(key, 0, value);
      }

      this.storageLength++;
    }
  }]);
  return ArrayStorage;
}();

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Array)], ArrayStorage.prototype, "storage", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], ArrayStorage.prototype, "storageId", void 0);

tslib_1.__decorate([inversify_1.postConstruct(), tslib_1.__metadata("design:type", Function), tslib_1.__metadata("design:paramtypes", []), tslib_1.__metadata("design:returntype", void 0)], ArrayStorage.prototype, "initialize", null);

ArrayStorage = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], ArrayStorage);
exports.ArrayStorage = ArrayStorage;

/***/ }),

/***/ "./src/storages/MapStorage.ts":
/*!************************************!*\
  !*** ./src/storages/MapStorage.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray"));

var _getIterator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/get-iterator */ "@babel/runtime/core-js/get-iterator"));

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var Initializable_1 = __webpack_require__(/*! ../decorators/Initializable */ "./src/decorators/Initializable.ts");

var MapStorage =
/*#__PURE__*/
function () {
  function MapStorage(randomGenerator, options) {
    (0, _classCallCheck2.default)(this, MapStorage);
    this.randomGenerator = randomGenerator;
    this.options = options;
  }

  (0, _createClass2.default)(MapStorage, [{
    key: "initialize",
    value: function initialize() {
      this.storage = new _map.default();
      this.storageId = this.randomGenerator.getRandomString(6);
    }
  }, {
    key: "get",
    value: function get(key) {
      var value = this.storage.get(key);

      if (!value) {
        throw new Error("No value found in map storage with key `".concat(key, "`"));
      }

      return value;
    }
  }, {
    key: "getKeyOf",
    value: function getKeyOf(value) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator2.default)(this.storage), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray2.default)(_step.value, 2),
              key = _step$value[0],
              storageValue = _step$value[1];

          if (value === storageValue) {
            return key;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }, {
    key: "getLength",
    value: function getLength() {
      return this.storage.size;
    }
  }, {
    key: "getStorage",
    value: function getStorage() {
      return this.storage;
    }
  }, {
    key: "getStorageId",
    value: function getStorageId() {
      return this.storageId;
    }
  }, {
    key: "has",
    value: function has(key) {
      return this.storage.has(key);
    }
  }, {
    key: "mergeWith",
    value: function mergeWith(storage) {
      var mergeId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.storage = new _map.default((0, _toConsumableArray2.default)(this.storage).concat((0, _toConsumableArray2.default)(storage.getStorage())));

      if (mergeId) {
        this.storageId = storage.getStorageId();
      }
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.storage.set(key, value);
    }
  }]);
  return MapStorage;
}();

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], MapStorage.prototype, "storageId", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", _map.default)], MapStorage.prototype, "storage", void 0);

tslib_1.__decorate([inversify_1.postConstruct(), tslib_1.__metadata("design:type", Function), tslib_1.__metadata("design:paramtypes", []), tslib_1.__metadata("design:returntype", void 0)], MapStorage.prototype, "initialize", null);

MapStorage = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], MapStorage);
exports.MapStorage = MapStorage;

/***/ }),

/***/ "./src/storages/control-flow/ControlFlowStorage.ts":
/*!*********************************************************!*\
  !*** ./src/storages/control-flow/ControlFlowStorage.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var MapStorage_1 = __webpack_require__(/*! ../MapStorage */ "./src/storages/MapStorage.ts");

var ControlFlowStorage =
/*#__PURE__*/
function (_MapStorage_1$MapStor) {
  (0, _inherits2.default)(ControlFlowStorage, _MapStorage_1$MapStor);

  function ControlFlowStorage(randomGenerator, options) {
    (0, _classCallCheck2.default)(this, ControlFlowStorage);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ControlFlowStorage).call(this, randomGenerator, options));
  }

  return ControlFlowStorage;
}(MapStorage_1.MapStorage);

ControlFlowStorage = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], ControlFlowStorage);
exports.ControlFlowStorage = ControlFlowStorage;

/***/ }),

/***/ "./src/storages/custom-node-group/CustomNodeGroupStorage.ts":
/*!******************************************************************!*\
  !*** ./src/storages/custom-node-group/CustomNodeGroupStorage.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var CustomNodeGroupStorage_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var CustomNodeGroup_1 = __webpack_require__(/*! ../../enums/custom-nodes/CustomNodeGroup */ "./src/enums/custom-nodes/CustomNodeGroup.ts");

var MapStorage_1 = __webpack_require__(/*! ../MapStorage */ "./src/storages/MapStorage.ts");

var CustomNodeGroupStorage = CustomNodeGroupStorage_1 =
/*#__PURE__*/
function (_MapStorage_1$MapStor) {
  (0, _inherits2.default)(CustomNodeGroupStorage, _MapStorage_1$MapStor);

  function CustomNodeGroupStorage(customNodeGroupFactory, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, CustomNodeGroupStorage);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CustomNodeGroupStorage).call(this, randomGenerator, options));
    _this.customNodeGroupFactory = customNodeGroupFactory;
    return _this;
  }

  (0, _createClass2.default)(CustomNodeGroupStorage, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      (0, _get2.default)((0, _getPrototypeOf2.default)(CustomNodeGroupStorage.prototype), "initialize", this).call(this);
      CustomNodeGroupStorage_1.customNodeGroupsList.forEach(function (customNodeGroupName) {
        var customNodeGroup = _this2.customNodeGroupFactory(customNodeGroupName);

        if (!customNodeGroup) {
          return;
        }

        _this2.storage.set(customNodeGroupName, customNodeGroup);
      });
    }
  }]);
  return CustomNodeGroupStorage;
}(MapStorage_1.MapStorage);

CustomNodeGroupStorage.customNodeGroupsList = [CustomNodeGroup_1.CustomNodeGroup.ConsoleOutputCustomNodeGroup, CustomNodeGroup_1.CustomNodeGroup.DebugProtectionCustomNodeGroup, CustomNodeGroup_1.CustomNodeGroup.DomainLockCustomNodeGroup, CustomNodeGroup_1.CustomNodeGroup.SelfDefendingCustomNodeGroup, CustomNodeGroup_1.CustomNodeGroup.StringArrayCustomNodeGroup];

tslib_1.__decorate([inversify_1.postConstruct(), tslib_1.__metadata("design:type", Function), tslib_1.__metadata("design:paramtypes", []), tslib_1.__metadata("design:returntype", void 0)], CustomNodeGroupStorage.prototype, "initialize", null);

CustomNodeGroupStorage = CustomNodeGroupStorage_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNodeGroup)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], CustomNodeGroupStorage);
exports.CustomNodeGroupStorage = CustomNodeGroupStorage;

/***/ }),

/***/ "./src/storages/string-array/StringArrayStorage.ts":
/*!*********************************************************!*\
  !*** ./src/storages/string-array/StringArrayStorage.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/get */ "@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var StringArrayStorage_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var ArrayStorage_1 = __webpack_require__(/*! ../ArrayStorage */ "./src/storages/ArrayStorage.ts");

var StringArrayStorage = StringArrayStorage_1 =
/*#__PURE__*/
function (_ArrayStorage_1$Array) {
  (0, _inherits2.default)(StringArrayStorage, _ArrayStorage_1$Array);

  function StringArrayStorage(identifierNamesGeneratorFactory, arrayUtils, randomGenerator, options) {
    var _this;

    (0, _classCallCheck2.default)(this, StringArrayStorage);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(StringArrayStorage).call(this, randomGenerator, options));
    _this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
    _this.arrayUtils = arrayUtils;
    return _this;
  }

  (0, _createClass2.default)(StringArrayStorage, [{
    key: "initialize",
    value: function initialize() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(StringArrayStorage.prototype), "initialize", this).call(this);
      var baseStringArrayName = this.identifierNamesGenerator.generate().slice(0, StringArrayStorage_1.stringArrayNameLength);
      var baseStringArrayCallsWrapperName = this.identifierNamesGenerator.generate().slice(0, StringArrayStorage_1.stringArrayNameLength);
      var stringArrayName = "".concat(this.options.identifiersPrefix).concat(baseStringArrayName);
      var stringArrayCallsWrapperName = "".concat(this.options.identifiersPrefix).concat(baseStringArrayCallsWrapperName);
      this.storageId = "".concat(stringArrayName, "|").concat(stringArrayCallsWrapperName);
    }
  }, {
    key: "rotateArray",
    value: function rotateArray(rotationValue) {
      this.storage = this.arrayUtils.rotate(this.storage, rotationValue);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.storage.map(function (value) {
        return "'".concat(value, "'");
      }).toString();
    }
  }]);
  return StringArrayStorage;
}(ArrayStorage_1.ArrayStorage);

StringArrayStorage.stringArrayNameLength = 7;

tslib_1.__decorate([inversify_1.postConstruct(), tslib_1.__metadata("design:type", Function), tslib_1.__metadata("design:paramtypes", []), tslib_1.__metadata("design:returntype", void 0)], StringArrayStorage.prototype, "initialize", null);

StringArrayStorage = StringArrayStorage_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IArrayUtils)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])], StringArrayStorage);
exports.StringArrayStorage = StringArrayStorage;

/***/ }),

/***/ "./src/templates/AtobTemplate.ts":
/*!***************************************!*\
  !*** ./src/templates/AtobTemplate.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function AtobTemplate() {
  return "\n        (function () {\n            {globalVariableTemplate}\n            \n            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n\n            that.atob || (\n                that.atob = function(input) {\n                    var str = String(input).replace(/=+$/, '');\n                    for (\n                        var bc = 0, bs, buffer, idx = 0, output = '';\n                        buffer = str.charAt(idx++);\n                        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,\n                            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0\n                    ) {\n                        buffer = chars.indexOf(buffer);\n                    }\n                return output;\n            });\n        })();\n    ";
}

exports.AtobTemplate = AtobTemplate;

/***/ }),

/***/ "./src/templates/GlobalVariableNoEvalTemplate.ts":
/*!*******************************************************!*\
  !*** ./src/templates/GlobalVariableNoEvalTemplate.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function GlobalVariableNoEvalTemplate() {
  return "\n        var that = (typeof window !== 'undefined'\n           ? window\n           : (typeof process === 'object' &&\n              typeof require === 'function' &&\n              typeof global === 'object')\n             ? global\n             : this);\n    ";
}

exports.GlobalVariableNoEvalTemplate = GlobalVariableNoEvalTemplate;

/***/ }),

/***/ "./src/templates/GlobalVariableTemplate1.ts":
/*!**************************************************!*\
  !*** ./src/templates/GlobalVariableTemplate1.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function GlobalVariableTemplate1() {
  return "\n        var that;\n        \n        try {\n            var getGlobal = Function('return (function() ' + '{}.constructor(\"return this\")( )' + ');');\n            \n            that = getGlobal();\n        } catch (e) {\n            that = window;\n        }\n    ";
}

exports.GlobalVariableTemplate1 = GlobalVariableTemplate1;

/***/ }),

/***/ "./src/templates/GlobalVariableTemplate2.ts":
/*!**************************************************!*\
  !*** ./src/templates/GlobalVariableTemplate2.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function GlobalVariableTemplate2() {
  return "\n        var getGlobal = function () {\n            var globalObject;\n        \n            try {\n                globalObject = Function('return (function() ' + '{}.constructor(\"return this\")( )' + ');')();\n            } catch (e) {\n                globalObject = window;\n            }\n            \n            return globalObject;\n        };\n        var that = getGlobal();\n    ";
}

exports.GlobalVariableTemplate2 = GlobalVariableTemplate2;

/***/ }),

/***/ "./src/templates/Rc4Template.ts":
/*!**************************************!*\
  !*** ./src/templates/Rc4Template.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function Rc4Template() {
  return "\n        var rc4 = function (str, key) {\n            var s = [], j = 0, x, res = '', newStr = '';\n           \n            str = atob(str);\n                \n            for (var k = 0, length = str.length; k < length; k++) {\n                newStr += '%' + ('00' + str.charCodeAt(k).toString(16)).slice(-2);\n            }\n        \n            str = decodeURIComponent(newStr);\n                    \t        \n\t        for (var i = 0; i < 256; i++) {\n                s[i] = i;\n            }\n \n            for (i = 0; i < 256; i++) {\n                j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;\n                x = s[i];\n                s[i] = s[j];\n                s[j] = x;\n            }\n            \n            i = 0;\n            j = 0;\n            \n            for (var y = 0; y < str.length; y++) {\n                i = (i + 1) % 256;\n                j = (j + s[i]) % 256;\n                x = s[i];\n                s[i] = s[j];\n                s[j] = x;\n                res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);\n            }\n                      \n            return res;\n        }\n    ";
}

exports.Rc4Template = Rc4Template;

/***/ }),

/***/ "./src/templates/SingleNodeCallControllerTemplate.ts":
/*!***********************************************************!*\
  !*** ./src/templates/SingleNodeCallControllerTemplate.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function SingleNodeCallControllerTemplate() {
  return "\n        var {singleNodeCallControllerFunctionName} = (function(){\n            var firstCall = true;\n            \n            return function (context, fn){\n                var rfn = firstCall ? function(){\n                    if(fn){\n                        var res = fn.apply(context, arguments);\n                        fn = null;\n                        return res;\n                    }\n                } : function(){}\n                \n                firstCall = false;\n                \n                return rfn;\n            }\n        })();\n    ";
}

exports.SingleNodeCallControllerTemplate = SingleNodeCallControllerTemplate;

/***/ }),

/***/ "./src/templates/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./src/templates/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate.ts ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function ConsoleOutputDisableExpressionTemplate() {
  return "\n        var {consoleLogDisableFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {\n            var func = function () {};\n            \n            {globalVariableTemplate}\n                        \n            if (!that.console) {\n                that.console = (function (func){\n                    var c = {};\n                    \n                    c.log = func;\n                    c.warn = func;\n                    c.debug = func;\n                    c.info = func;\n                    c.error = func;\n                    c.exception = func;\n                    c.trace = func;\n                    \n                    return c;\n                })(func);\n            } else {\n                that.console.log = func;\n                that.console.warn = func;\n                that.console.debug = func;\n                that.console.info = func;\n                that.console.error = func;\n                that.console.exception = func;\n                that.console.trace = func;\n            }\n        });\n        \n        {consoleLogDisableFunctionName}();\n    ";
}

exports.ConsoleOutputDisableExpressionTemplate = ConsoleOutputDisableExpressionTemplate;

/***/ }),

/***/ "./src/templates/debug-protection-nodes/debug-protection-function-call-node/DebugProtectionFunctionCallTemplate.ts":
/*!*************************************************************************************************************************!*\
  !*** ./src/templates/debug-protection-nodes/debug-protection-function-call-node/DebugProtectionFunctionCallTemplate.ts ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function DebugProtectionFunctionCallTemplate() {
  return "\n        (function () {\n            {singleNodeCallControllerFunctionName}(this, function () {\n                var regExp1 = new RegExp('function *\\\\( *\\\\)');\n                var regExp2 = new RegExp('\\\\+\\\\+ *\\(?:_0x(?:[a-f0-9]){4,6}|(?:\\\\b|\\\\d)[a-z0-9]{1,4}(?:\\\\b|\\\\d)\\)', 'i');\n       \n                var result = {debugProtectionFunctionName}('init');\n                \n                if (!regExp1.test(result + 'chain') || !regExp2.test(result + 'input')) {\n                    result('0');\n                } else {\n                    {debugProtectionFunctionName}();\n                }\n            })();\n        })();\n    ";
}

exports.DebugProtectionFunctionCallTemplate = DebugProtectionFunctionCallTemplate;

/***/ }),

/***/ "./src/templates/debug-protection-nodes/debug-protection-function-interval-node/DebugProtectionFunctionIntervalTemplate.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./src/templates/debug-protection-nodes/debug-protection-function-interval-node/DebugProtectionFunctionIntervalTemplate.ts ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function DebugProtectionFunctionIntervalTemplate() {
  return "\n        setInterval(function () {\n            {debugProtectionFunctionName}();\n        }, 4000);\n    ";
}

exports.DebugProtectionFunctionIntervalTemplate = DebugProtectionFunctionIntervalTemplate;

/***/ }),

/***/ "./src/templates/debug-protection-nodes/debug-protection-function-node/DebugProtectionFunctionTemplate.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/templates/debug-protection-nodes/debug-protection-function-node/DebugProtectionFunctionTemplate.ts ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function DebugProtectionFunctionTemplate() {
  return "\n        function {debugProtectionFunctionName} (ret) {\n            function debuggerProtection (counter) {\n            \n                {debuggerTemplate}\n                \n                debuggerProtection(++counter);\n            }\n            \n            try {\n                if (ret) {\n                    return debuggerProtection;\n                } else {\n                    debuggerProtection(0);\n                }\n            } catch (y) {}\n        }\n    ";
}

exports.DebugProtectionFunctionTemplate = DebugProtectionFunctionTemplate;

/***/ }),

/***/ "./src/templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplate.ts":
/*!*************************************************************************************************!*\
  !*** ./src/templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplate.ts ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function DebuggerTemplate() {
  return "\n        if (typeof counter === 'string') {\n            return (function (arg) {}.constructor('while (true) {}').apply('counter'));\n        } else {\n            if (('' + counter / counter)['length'] !== 1 || counter % 20 === 0) {\n                (function () {return true;}.constructor('debu' + 'gger').call('action'));\n            } else {\n                (function () {return false;}.constructor('debu' + 'gger').apply('stateObject'));\n            }\n            \n        }\n    ";
}

exports.DebuggerTemplate = DebuggerTemplate;

/***/ }),

/***/ "./src/templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplateNoEval.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplateNoEval.ts ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function DebuggerTemplateNoEval() {
  return "\n        if (typeof counter === 'string') {\n            var func = function () {\n                while (true) {}\n            };\n            \n            return func();\n        } else {\n            if (('' + counter / counter)['length'] !== 1 || counter % 20 === 0) {\n                debugger;\n            } else {\n                debugger;\n            }\n            \n        }\n    ";
}

exports.DebuggerTemplateNoEval = DebuggerTemplateNoEval;

/***/ }),

/***/ "./src/templates/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate.ts":
/*!************************************************************************************!*\
  !*** ./src/templates/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate.ts ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function DomainLockNodeTemplate() {
  return "\n        var {domainLockFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {\n            \n            {globalVariableTemplate}\n            \n            var func = function () {\n                return {\n                    key: 'item',\n                    value: 'attribute',\n                    getAttribute: function () {\n                        for (var i = 0; i < 1000; i--) {\n                            var isPositive = i > 0;\n                            \n                            switch (isPositive) {\n                                case true:\n                                    return this.item + '_' + this.value + '_' + i;\n                                default:\n                                    this.item + '_' + this.value;\n                            }\n                        }\n                    }()\n                };\n            };\n                        \n            var regExp = new RegExp(\"[{diff}]\", \"g\");\n            var domains = \"{domains}\".replace(regExp, \"\").split(\";\");\n            var document;\n            var domain;\n            var location;\n            var hostname;\n\n            for (var d in that) {\n                if (d.length == 8 && d.charCodeAt(7) == 116 && d.charCodeAt(5) == 101 && d.charCodeAt(3) == 117 && d.charCodeAt(0) == 100) {\n                    document = d;\n                \n                    break;\n                }\n            }\n\n            for (var d1 in that[document]) {\n                if (d1.length == 6 && d1.charCodeAt(5) == 110 && d1.charCodeAt(0) == 100) {\n                    domain = d1;\n                    \n                    break;\n                }\n            }\n\n            if (!(\"~\" > domain)) {\n                for (var d2 in that[document]) {\n                    if (d2.length == 8 && d2.charCodeAt(7) == 110 && d2.charCodeAt(0) == 108) {\n                        location = d2;\n                        \n                        break;\n                    }\n                }\n\n                for (var d3 in that[document][location]) {\n                    if (d3.length == 8 && d3.charCodeAt(7) == 101 && d3.charCodeAt(0) == 104) {\n                        hostname = d3;\n                        \n                        break;\n                    }\n                }\n            }\n            \n            if (!document || !that[document]) {\n                return;\n            }\n            \n            var documentDomain = that[document][domain];\n            var documentLocationHostName = !!that[document][location] && that[document][location][hostname];\n            var currentDomain = documentDomain || documentLocationHostName;\n          \n            if (!currentDomain) {\n                return;\n            }\n          \n            var ok = false;\n                        \n            for (var i = 0; i < domains.length; i++) {\n                var domain = domains[i];\n                var position = currentDomain.length - domain.length;\n                var lastIndex = currentDomain.indexOf(domain, position);\n                var endsWith = lastIndex !== -1 && lastIndex === position;\n                \n                if (endsWith) {\n                    if (currentDomain.length == domain.length || domain.indexOf(\".\") === 0) {\n                        ok = true;\n                    }\n                }\n            }\n               \n            if (!ok) {\n                data;\n            } else {\n                return;\n            }\n            \n            func();\n        });\n\n        {domainLockFunctionName}();\n    ";
}

exports.DomainLockNodeTemplate = DomainLockNodeTemplate;

/***/ }),

/***/ "./src/templates/self-defending-nodes/self-defending-unicode-node/SelfDefendingTemplate.ts":
/*!*************************************************************************************************!*\
  !*** ./src/templates/self-defending-nodes/self-defending-unicode-node/SelfDefendingTemplate.ts ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function SelfDefendingTemplate(escapeSequenceEncoder) {
  return "\n        var {selfDefendingFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {\n            var func1 = function(){return 'dev';},\n                func2 = function () {\n                    return 'window';\n                };\n                \n            var test1 = function () {\n                var regExp = new RegExp('".concat(escapeSequenceEncoder.encode("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}", true), "');\n                \n                return !regExp.test(func1.toString());\n            };\n            \n            var test2 = function () {\n                var regExp = new RegExp('").concat(escapeSequenceEncoder.encode("(\\\\[x|u](\\w){2,4})+", true), "');\n                \n                return regExp.test(func2.toString());\n            };\n            \n            var recursiveFunc1 = function (string) {\n                var i = ~-1 >> 1 + 255 % 0;\n                                \n                if (string.indexOf('i' === i)) {\n                    recursiveFunc2(string)\n                }\n            };\n            \n            var recursiveFunc2 = function (string) {\n                var i = ~-4 >> 1 + 255 % 0;\n                \n                if (string.indexOf((true+\"\")[3]) !== i) {\n                    recursiveFunc1(string)\n                }\n            };\n            \n            if (!test1()) {\n                if (!test2()) {\n                    recursiveFunc1('ind\u0435xOf');\n                } else {\n                    recursiveFunc1('indexOf');\n                }\n            } else {\n                recursiveFunc1('ind\u0435xOf');\n            }\n        })\n        \n        {selfDefendingFunctionName}();\n    ");
}

exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ }),

/***/ "./src/templates/string-array-nodes/string-array-calls-wrapper/SelfDefendingTemplate.ts":
/*!**********************************************************************************************!*\
  !*** ./src/templates/string-array-nodes/string-array-calls-wrapper/SelfDefendingTemplate.ts ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function SelfDefendingTemplate(randomGenerator, escapeSequenceEncoder) {
  var identifierLength = 6;
  var rc4BytesIdentifier = randomGenerator.getRandomString(identifierLength);
  var statesIdentifier = randomGenerator.getRandomString(identifierLength);
  var newStateIdentifier = randomGenerator.getRandomString(identifierLength);
  var firstStateIdentifier = randomGenerator.getRandomString(identifierLength);
  var secondStateIdentifier = randomGenerator.getRandomString(identifierLength);
  var checkStateIdentifier = randomGenerator.getRandomString(identifierLength);
  var runStateIdentifier = randomGenerator.getRandomString(identifierLength);
  var getStateIdentifier = randomGenerator.getRandomString(identifierLength);
  var stateResultIdentifier = randomGenerator.getRandomString(identifierLength);
  return "\n        var StatesClass = function (".concat(rc4BytesIdentifier, ") {\n            this.").concat(rc4BytesIdentifier, " = ").concat(rc4BytesIdentifier, ";\n            this.").concat(statesIdentifier, " = [1, 0, 0];\n            this.").concat(newStateIdentifier, " = function(){return 'newState';};\n            this.").concat(firstStateIdentifier, " = '").concat(escapeSequenceEncoder.encode("\\w+ *\\(\\) *{\\w+ *", true), "';\n            this.").concat(secondStateIdentifier, " = '").concat(escapeSequenceEncoder.encode("['|\"].+['|\"];? *}", true), "';\n        };\n        \n        StatesClass.prototype.").concat(checkStateIdentifier, " = function () {\n            var regExp = new RegExp(this.").concat(firstStateIdentifier, " + this.").concat(secondStateIdentifier, ");\n            var expression = regExp.test(this.").concat(newStateIdentifier, ".toString())\n                ? --this.").concat(statesIdentifier, "[1]\n                : --this.").concat(statesIdentifier, "[0];\n            \n            return this.").concat(runStateIdentifier, "(expression);\n        };\n        \n        StatesClass.prototype.").concat(runStateIdentifier, " = function (").concat(stateResultIdentifier, ") {\n            if (!Boolean(~").concat(stateResultIdentifier, ")) {\n                return ").concat(stateResultIdentifier, ";\n            }\n            \n            return this.").concat(getStateIdentifier, "(this.").concat(rc4BytesIdentifier, ");\n        };\n\n        StatesClass.prototype.").concat(getStateIdentifier, " = function (").concat(rc4BytesIdentifier, ") {\n            for (var i = 0, len = this.").concat(statesIdentifier, ".length; i < len; i++) {\n                this.").concat(statesIdentifier, ".push(Math.round(Math.random()));\n                len = this.").concat(statesIdentifier, ".length;\n            }\n            \n            return ").concat(rc4BytesIdentifier, "(this.").concat(statesIdentifier, "[0]);\n        };\n\n        new StatesClass({stringArrayCallsWrapperName}).").concat(checkStateIdentifier, "();\n    ");
}

exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ }),

/***/ "./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate.ts":
/*!************************************************************************************************************!*\
  !*** ./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate.ts ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function StringArrayBase64DecodeNodeTemplate(randomGenerator) {
  var identifierLength = 6;
  var initializedIdentifier = randomGenerator.getRandomString(identifierLength);
  var base64DecodeFunctionIdentifier = randomGenerator.getRandomString(identifierLength);
  var dataIdentifier = randomGenerator.getRandomString(identifierLength);
  return "\n        if ({stringArrayCallsWrapperName}.".concat(initializedIdentifier, " === undefined) {\n            {atobPolyfill}\n            \n            {stringArrayCallsWrapperName}.").concat(base64DecodeFunctionIdentifier, " = function (str) {\n                var string = atob(str);\n                var newStringChars = [];\n                \n                for (var i = 0, length = string.length; i < length; i++) {\n                    newStringChars += '%' + ('00' + string.charCodeAt(i).toString(16)).slice(-2);\n                }\n                \n                return decodeURIComponent(newStringChars);\n            };\n            \n            {stringArrayCallsWrapperName}.").concat(dataIdentifier, " = {};\n            \n            {stringArrayCallsWrapperName}.").concat(initializedIdentifier, " = true;\n        }\n                  \n        var cachedValue = {stringArrayCallsWrapperName}.").concat(dataIdentifier, "[index];\n                        \n        if (cachedValue === undefined) {\n            {selfDefendingCode}\n            \n            value = {stringArrayCallsWrapperName}.").concat(base64DecodeFunctionIdentifier, "(value);\n            {stringArrayCallsWrapperName}.").concat(dataIdentifier, "[index] = value;\n        } else {\n            value = cachedValue;\n        }\n    ");
}

exports.StringArrayBase64DecodeNodeTemplate = StringArrayBase64DecodeNodeTemplate;

/***/ }),

/***/ "./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate.ts":
/*!********************************************************************************************************!*\
  !*** ./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate.ts ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function StringArrayCallsWrapperTemplate() {
  return "\n        var {stringArrayCallsWrapperName} = function (index, key) {\n            index = index - 0;\n            \n            var value = {stringArrayName}[index];\n            \n            {decodeNodeTemplate}\n        \n            return value;\n        };\n    ";
}

exports.StringArrayCallsWrapperTemplate = StringArrayCallsWrapperTemplate;

/***/ }),

/***/ "./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate.ts ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function StringArrayRc4DecodeNodeTemplate(randomGenerator) {
  var identifierLength = 6;
  var initializedIdentifier = randomGenerator.getRandomString(identifierLength);
  var rc4Identifier = randomGenerator.getRandomString(identifierLength);
  var dataIdentifier = randomGenerator.getRandomString(identifierLength);
  var onceIdentifier = randomGenerator.getRandomString(identifierLength);
  return "\n        if ({stringArrayCallsWrapperName}.".concat(initializedIdentifier, " === undefined) {\n            {atobPolyfill}\n            \n            {rc4Polyfill}\n            {stringArrayCallsWrapperName}.").concat(rc4Identifier, " = rc4;\n            \n            {stringArrayCallsWrapperName}.").concat(dataIdentifier, " = {};\n            \n            {stringArrayCallsWrapperName}.").concat(initializedIdentifier, " = true;\n        }\n  \n        var cachedValue = {stringArrayCallsWrapperName}.").concat(dataIdentifier, "[index];\n\n        if (cachedValue === undefined) {\n            if ({stringArrayCallsWrapperName}.").concat(onceIdentifier, " === undefined) {\n                {selfDefendingCode}\n                \n                {stringArrayCallsWrapperName}.").concat(onceIdentifier, " = true;\n            }\n            \n            value = {stringArrayCallsWrapperName}.").concat(rc4Identifier, "(value, key);\n            {stringArrayCallsWrapperName}.").concat(dataIdentifier, "[index] = value;\n        } else {\n            value = cachedValue;\n        }\n    ");
}

exports.StringArrayRc4DecodeNodeTemplate = StringArrayRc4DecodeNodeTemplate;

/***/ }),

/***/ "./src/templates/string-array-nodes/string-array-node/StringArrayTemplate.ts":
/*!***********************************************************************************!*\
  !*** ./src/templates/string-array-nodes/string-array-node/StringArrayTemplate.ts ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function StringArrayTemplate() {
  return "\n        var {stringArrayName} = [{stringArray}];\n    ";
}

exports.StringArrayTemplate = StringArrayTemplate;

/***/ }),

/***/ "./src/templates/string-array-nodes/string-array-rotate-function-node/SelfDefendingTemplate.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/templates/string-array-nodes/string-array-rotate-function-node/SelfDefendingTemplate.ts ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function SelfDefendingTemplate(escapeSequenceEncoder) {
  return "\n        var selfDefendingFunc = function () {\n            var object = {\n                data: {\n                    key: 'cookie',\n                    value: 'timeout'\n                },\n                setCookie: function (options, name, value, document) {\n                    document = document || {};\n                    \n                    var updatedCookie = name + \"=\" + value;\n\n                    var i = 0;\n                                                            \n                    for (var i = 0, len = options.length; i < len; i++) {\n                        var propName = options[i];\n                                     \n                        updatedCookie += \"; \" + propName;\n                        \n                        var propValue = options[propName];\n                        \n                        options.push(propValue);\n                        len = options.length;\n                                                                        \n                        if (propValue !== true) {\n                            updatedCookie += \"=\" + propValue;\n                        }\n                    }\n\n                    document['cookie'] = updatedCookie;\n                },\n                removeCookie: function(){return 'dev';},\n                getCookie: function (document, name) {\n                    document = document || function (value) { return value };\n                    var matches = document(new RegExp(\n                        \"(?:^|; )\" + name.replace(/([.$?*|{}()[]\\/+^])/g, '\\$1') + \"=([^;]*)\"\n                    ));\n                    \n                    var func = function (param1, param2) {\n                        param1(++param2);\n                    };\n                    \n                    func({whileFunctionName}, {timesName});\n                                        \n                    return matches ? decodeURIComponent(matches[1]) : undefined;\n                }\n            };\n            \n            var test1 = function () {\n                var regExp = new RegExp('".concat(escapeSequenceEncoder.encode("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}", true), "');\n                \n                return regExp.test(object.removeCookie.toString());\n            };\n            \n            object['updateCookie'] = test1;\n            \n            var cookie = '';\n            var result = object['updateCookie']();\n                                    \n            if (!result) {\n                object['setCookie'](['*'], 'counter', 1);\n            } else if (result) {\n                cookie = object['getCookie'](null, 'counter');\n            } else {\n                object['removeCookie']();\n            }\n        };\n        \n        selfDefendingFunc();\n    ");
}

exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ }),

/***/ "./src/templates/string-array-nodes/string-array-rotate-function-node/StringArrayRotateFunctionTemplate.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/templates/string-array-nodes/string-array-rotate-function-node/StringArrayRotateFunctionTemplate.ts ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function StringArrayRotateFunctionTemplate() {
  return "\n        (function (array, {timesName}) {\n            var {whileFunctionName} = function (times) {\n                while (--times) {\n                    array['push'](array['shift']());\n                }\n            };\n            \n            {code}\n        })({stringArrayName}, 0x{stringArrayRotateValue});\n    ";
}

exports.StringArrayRotateFunctionTemplate = StringArrayRotateFunctionTemplate;

/***/ }),

/***/ "./src/utils/ArrayUtils.ts":
/*!*********************************!*\
  !*** ./src/utils/ArrayUtils.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var ArrayUtils =
/*#__PURE__*/
function () {
  function ArrayUtils(randomGenerator) {
    (0, _classCallCheck2.default)(this, ArrayUtils);
    this.randomGenerator = randomGenerator;
  }

  (0, _createClass2.default)(ArrayUtils, [{
    key: "createWithRange",
    value: function createWithRange(length) {
      var range = [];

      for (var i = 0; i < length; i++) {
        range.push(i);
      }

      return range;
    }
  }, {
    key: "rotate",
    value: function rotate(array, times) {
      if (!array.length) {
        throw new ReferenceError("Cannot rotate empty array.");
      }

      if (times <= 0) {
        return array;
      }

      var newArray = array;
      var temp;

      while (times--) {
        temp = newArray.pop();

        if (temp) {
          newArray.unshift(temp);
        }
      }

      return newArray;
    }
  }, {
    key: "shuffle",
    value: function shuffle(array) {
      var shuffledArray = (0, _toConsumableArray2.default)(array);

      for (var i = shuffledArray.length; i; i--) {
        var j = Math.floor(this.randomGenerator.getMathRandom() * i);
        var _ref = [shuffledArray[j], shuffledArray[i - 1]];
        shuffledArray[i - 1] = _ref[0];
        shuffledArray[j] = _ref[1];
      }

      return shuffledArray;
    }
  }]);
  return ArrayUtils;
}();

ArrayUtils = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__metadata("design:paramtypes", [Object])], ArrayUtils);
exports.ArrayUtils = ArrayUtils;

/***/ }),

/***/ "./src/utils/CryptUtils.ts":
/*!*********************************!*\
  !*** ./src/utils/CryptUtils.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var RandomGenerator_1 = __webpack_require__(/*! ./RandomGenerator */ "./src/utils/RandomGenerator.ts");

var Utils_1 = __webpack_require__(/*! ./Utils */ "./src/utils/Utils.ts");

var CryptUtils =
/*#__PURE__*/
function () {
  function CryptUtils(randomGenerator) {
    (0, _classCallCheck2.default)(this, CryptUtils);
    this.randomGenerator = randomGenerator;
  }

  (0, _createClass2.default)(CryptUtils, [{
    key: "btoa",
    value: function btoa(string) {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var output = '';
      string = encodeURIComponent(string).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode(parseInt("".concat(Utils_1.Utils.hexadecimalPrefix).concat(p1)));
      });

      for (var block, charCode, idx = 0, map = chars; string.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
        charCode = string.charCodeAt(idx += 3 / 4);

        if (charCode > 0xFF) {
          throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        }

        block = block << 8 | charCode;
      }

      return output;
    }
  }, {
    key: "hideString",
    value: function hideString(str, length) {
      var _this = this;

      var escapeRegExp = function escapeRegExp(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      };

      var randomMerge = function randomMerge(s1, s2) {
        var i1 = -1;
        var i2 = -1;
        var result = '';

        while (i1 < s1.length || i2 < s2.length) {
          if (_this.randomGenerator.getMathRandom() < 0.5 && i2 < s2.length) {
            result += s2.charAt(++i2);
          } else {
            result += s1.charAt(++i1);
          }
        }

        return result;
      };

      var randomString = this.randomGenerator.getRandomGenerator().string({
        length: length,
        pool: RandomGenerator_1.RandomGenerator.randomGeneratorPool
      });
      var randomStringDiff = randomString.replace(new RegExp("[".concat(escapeRegExp(str), "]"), 'g'), '');
      var randomStringDiffArray = randomStringDiff.split('');
      this.randomGenerator.getRandomGenerator().shuffle(randomStringDiffArray);
      randomStringDiff = randomStringDiffArray.join('');
      return [randomMerge(str, randomStringDiff), randomStringDiff];
    }
  }, {
    key: "rc4",
    value: function rc4(string, key) {
      var s = [],
          j = 0,
          x,
          result = '';

      for (var i = 0; i < 256; i++) {
        s[i] = i;
      }

      for (i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
      }

      i = 0;
      j = 0;

      for (var y = 0; y < string.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        result += String.fromCharCode(string.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
      }

      return result;
    }
  }]);
  return CryptUtils;
}();

CryptUtils = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__metadata("design:paramtypes", [Object])], CryptUtils);
exports.CryptUtils = CryptUtils;

/***/ }),

/***/ "./src/utils/EscapeSequenceEncoder.ts":
/*!********************************************!*\
  !*** ./src/utils/EscapeSequenceEncoder.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _map = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/core-js/map */ "@babel/runtime/core-js/map"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var EscapeSequenceEncoder =
/*#__PURE__*/
function () {
  function EscapeSequenceEncoder() {
    (0, _classCallCheck2.default)(this, EscapeSequenceEncoder);
    this.stringsCache = new _map.default();
  }

  (0, _createClass2.default)(EscapeSequenceEncoder, [{
    key: "encode",
    value: function encode(string, encodeAllSymbols) {
      var cacheKey = "".concat(string, "-").concat(String(encodeAllSymbols));

      if (this.stringsCache.has(cacheKey)) {
        return this.stringsCache.get(cacheKey);
      }

      var radix = 16;
      var replaceRegExp = new RegExp('[\\s\\S]', 'g');
      var escapeSequenceRegExp = new RegExp('[\'\"\\\\\\s]');
      var regExp = new RegExp('[\\x00-\\x7F]');
      var prefix;
      var template;
      var result = string.replace(replaceRegExp, function (character) {
        if (!encodeAllSymbols && !escapeSequenceRegExp.exec(character)) {
          return character;
        }

        if (regExp.exec(character)) {
          prefix = '\\x';
          template = '00';
        } else {
          prefix = "\\u";
          template = '0000';
        }

        return "".concat(prefix).concat((template + character.charCodeAt(0).toString(radix)).slice(-template.length));
      });
      this.stringsCache.set(cacheKey, result);
      return result;
    }
  }]);
  return EscapeSequenceEncoder;
}();

EscapeSequenceEncoder = tslib_1.__decorate([inversify_1.injectable()], EscapeSequenceEncoder);
exports.EscapeSequenceEncoder = EscapeSequenceEncoder;

/***/ }),

/***/ "./src/utils/NumberUtils.ts":
/*!**********************************!*\
  !*** ./src/utils/NumberUtils.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var NumberUtils =
/*#__PURE__*/
function () {
  function NumberUtils() {
    (0, _classCallCheck2.default)(this, NumberUtils);
  }

  (0, _createClass2.default)(NumberUtils, null, [{
    key: "toHex",
    value: function toHex(dec) {
      var radix = 16;
      return dec.toString(radix);
    }
  }, {
    key: "isCeil",
    value: function isCeil(number) {
      return number % 1 === 0;
    }
  }]);
  return NumberUtils;
}();

exports.NumberUtils = NumberUtils;

/***/ }),

/***/ "./src/utils/RandomGenerator.ts":
/*!**************************************!*\
  !*** ./src/utils/RandomGenerator.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tslib_1 = __webpack_require__(/*! tslib */ "tslib");

var RandomGenerator_1;
"use strict";

var inversify_1 = __webpack_require__(/*! inversify */ "inversify");

var ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");

var md5_1 = tslib_1.__importDefault(__webpack_require__(/*! md5 */ "md5"));

var chance_1 = __webpack_require__(/*! chance */ "chance");

var Initializable_1 = __webpack_require__(/*! ../decorators/Initializable */ "./src/decorators/Initializable.ts");

var RandomGenerator = RandomGenerator_1 =
/*#__PURE__*/
function () {
  function RandomGenerator(sourceCode, options) {
    (0, _classCallCheck2.default)(this, RandomGenerator);
    this.sourceCode = sourceCode;
    this.options = options;
  }

  (0, _createClass2.default)(RandomGenerator, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;

      var getRandomInteger = function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };

      var getSeed = function getSeed() {
        var md5Hash = md5_1.default(_this.sourceCode.getSourceCode());
        return _this.seed + Number(md5Hash.replace(/\D/g, ''));
      };

      this.seed = this.options.seed !== 0 ? this.options.seed : getRandomInteger(0, 999999999);
      this.randomGenerator = new chance_1.Chance(getSeed());
    }
  }, {
    key: "getMathRandom",
    value: function getMathRandom() {
      return this.getRandomInteger(0, 99999) / 100000;
    }
  }, {
    key: "getRandomFloat",
    value: function getRandomFloat(min, max) {
      return this.getRandomGenerator().floating({
        min: min,
        max: max,
        fixed: 7
      });
    }
  }, {
    key: "getRandomGenerator",
    value: function getRandomGenerator() {
      return this.randomGenerator;
    }
  }, {
    key: "getRandomInteger",
    value: function getRandomInteger(min, max) {
      return this.getRandomGenerator().integer({
        min: min,
        max: max
      });
    }
  }, {
    key: "getRandomString",
    value: function getRandomString(length) {
      var pool = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : RandomGenerator_1.randomGeneratorPool;
      return this.getRandomGenerator().string({
        length: length,
        pool: pool
      });
    }
  }, {
    key: "getSeed",
    value: function getSeed() {
      return this.seed;
    }
  }]);
  return RandomGenerator;
}();

RandomGenerator.randomGeneratorPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], RandomGenerator.prototype, "randomGenerator", void 0);

tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Number)], RandomGenerator.prototype, "seed", void 0);

tslib_1.__decorate([inversify_1.postConstruct(), tslib_1.__metadata("design:type", Function), tslib_1.__metadata("design:paramtypes", []), tslib_1.__metadata("design:returntype", void 0)], RandomGenerator.prototype, "initialize", null);

RandomGenerator = RandomGenerator_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ISourceCode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], RandomGenerator);
exports.RandomGenerator = RandomGenerator;

/***/ }),

/***/ "./src/utils/Utils.ts":
/*!****************************!*\
  !*** ./src/utils/Utils.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass"));

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Utils =
/*#__PURE__*/
function () {
  function Utils() {
    (0, _classCallCheck2.default)(this, Utils);
  }

  (0, _createClass2.default)(Utils, null, [{
    key: "extractDomainFrom",
    value: function extractDomainFrom(url) {
      var domain;

      if (url.indexOf('://') > -1 || url.indexOf('//') === 0) {
        domain = url.split('/')[2];
      } else {
        domain = url.split('/')[0];
      }

      domain = domain.split(':')[0];
      return domain;
    }
  }]);
  return Utils;
}();

Utils.hexadecimalPrefix = '0x';
exports.Utils = Utils;

/***/ }),

/***/ "@babel/runtime/core-js/array/from":
/*!****************************************************!*\
  !*** external "@babel/runtime/core-js/array/from" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/array/from");

/***/ }),

/***/ "@babel/runtime/core-js/get-iterator":
/*!******************************************************!*\
  !*** external "@babel/runtime/core-js/get-iterator" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/get-iterator");

/***/ }),

/***/ "@babel/runtime/core-js/map":
/*!*********************************************!*\
  !*** external "@babel/runtime/core-js/map" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/map");

/***/ }),

/***/ "@babel/runtime/core-js/object/assign":
/*!*******************************************************!*\
  !*** external "@babel/runtime/core-js/object/assign" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/assign");

/***/ }),

/***/ "@babel/runtime/core-js/object/define-property":
/*!****************************************************************!*\
  !*** external "@babel/runtime/core-js/object/define-property" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/define-property");

/***/ }),

/***/ "@babel/runtime/core-js/object/freeze":
/*!*******************************************************!*\
  !*** external "@babel/runtime/core-js/object/freeze" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/freeze");

/***/ }),

/***/ "@babel/runtime/core-js/object/get-own-property-descriptor":
/*!****************************************************************************!*\
  !*** external "@babel/runtime/core-js/object/get-own-property-descriptor" ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/get-own-property-descriptor");

/***/ }),

/***/ "@babel/runtime/core-js/object/get-own-property-names":
/*!***********************************************************************!*\
  !*** external "@babel/runtime/core-js/object/get-own-property-names" ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/get-own-property-names");

/***/ }),

/***/ "@babel/runtime/core-js/object/keys":
/*!*****************************************************!*\
  !*** external "@babel/runtime/core-js/object/keys" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/object/keys");

/***/ }),

/***/ "@babel/runtime/core-js/reflect/define-metadata":
/*!*****************************************************************!*\
  !*** external "@babel/runtime/core-js/reflect/define-metadata" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/reflect/define-metadata");

/***/ }),

/***/ "@babel/runtime/core-js/reflect/get-metadata":
/*!**************************************************************!*\
  !*** external "@babel/runtime/core-js/reflect/get-metadata" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/reflect/get-metadata");

/***/ }),

/***/ "@babel/runtime/core-js/reflect/has-metadata":
/*!**************************************************************!*\
  !*** external "@babel/runtime/core-js/reflect/has-metadata" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/reflect/has-metadata");

/***/ }),

/***/ "@babel/runtime/core-js/set":
/*!*********************************************!*\
  !*** external "@babel/runtime/core-js/set" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/core-js/set");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),

/***/ "@babel/runtime/helpers/construct":
/*!***************************************************!*\
  !*** external "@babel/runtime/helpers/construct" ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/construct");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),

/***/ "@babel/runtime/helpers/get":
/*!*********************************************!*\
  !*** external "@babel/runtime/helpers/get" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/get");

/***/ }),

/***/ "@babel/runtime/helpers/getPrototypeOf":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/getPrototypeOf" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/getPrototypeOf");

/***/ }),

/***/ "@babel/runtime/helpers/inherits":
/*!**************************************************!*\
  !*** external "@babel/runtime/helpers/inherits" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/inherits");

/***/ }),

/***/ "@babel/runtime/helpers/interopRequireDefault":
/*!***************************************************************!*\
  !*** external "@babel/runtime/helpers/interopRequireDefault" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireDefault");

/***/ }),

/***/ "@babel/runtime/helpers/possibleConstructorReturn":
/*!*******************************************************************!*\
  !*** external "@babel/runtime/helpers/possibleConstructorReturn" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/slicedToArray" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),

/***/ "@babel/runtime/helpers/toConsumableArray":
/*!***********************************************************!*\
  !*** external "@babel/runtime/helpers/toConsumableArray" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),

/***/ "@babel/runtime/helpers/typeof":
/*!************************************************!*\
  !*** external "@babel/runtime/helpers/typeof" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/typeof");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "chance":
/*!*************************!*\
  !*** external "chance" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chance");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),

/***/ "commander":
/*!****************************!*\
  !*** external "commander" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),

/***/ "escodegen-wallaby":
/*!************************************!*\
  !*** external "escodegen-wallaby" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("escodegen-wallaby");

/***/ }),

/***/ "espree":
/*!*************************!*\
  !*** external "espree" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("espree");

/***/ }),

/***/ "estraverse":
/*!*****************************!*\
  !*** external "estraverse" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("estraverse");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "inversify":
/*!****************************!*\
  !*** external "inversify" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("inversify");

/***/ }),

/***/ "js-string-escape":
/*!***********************************!*\
  !*** external "js-string-escape" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("js-string-escape");

/***/ }),

/***/ "md5":
/*!**********************!*\
  !*** external "md5" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("md5");

/***/ }),

/***/ "mkdirp":
/*!*************************!*\
  !*** external "mkdirp" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),

/***/ "multimatch":
/*!*****************************!*\
  !*** external "multimatch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("multimatch");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "string-template":
/*!**********************************!*\
  !*** external "string-template" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("string-template");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ });
//# sourceMappingURL=index.cli.js.map