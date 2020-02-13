/*!
Copyright (C) 2016-2020 Timofey Kachalov <sanex3339@yandex.ru>

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

Object.defineProperty(exports, "__esModule", { value: true });
const JavaScriptObfuscatorCLIFacade_1 = __webpack_require__(/*! ./src/JavaScriptObfuscatorCLIFacade */ "./src/JavaScriptObfuscatorCLIFacade.ts");
module.exports = JavaScriptObfuscatorCLIFacade_1.JavaScriptObfuscatorCLI;


/***/ }),

/***/ "./src/ASTParserFacade.ts":
/*!********************************!*\
  !*** ./src/ASTParserFacade.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const acorn = __importStar(__webpack_require__(/*! acorn */ "acorn"));
const acorn_import_meta_1 = __importDefault(__webpack_require__(/*! acorn-import-meta */ "acorn-import-meta"));
const chalk_1 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
class ASTParserFacade {
    static parse(inputData, config) {
        const sourceTypeLength = ASTParserFacade.sourceTypes.length;
        for (let i = 0; i < sourceTypeLength; i++) {
            try {
                return ASTParserFacade.parseType(inputData, config, ASTParserFacade.sourceTypes[i]);
            }
            catch (error) {
                if (i < sourceTypeLength - 1) {
                    continue;
                }
                throw new Error(ASTParserFacade.processParsingError(inputData, error.message, error.loc));
            }
        }
        throw new Error('Acorn parsing error');
    }
    static parseType(inputData, inputConfig, sourceType) {
        const { sourceCode } = inputData;
        const comments = [];
        const config = Object.assign(Object.assign({}, inputConfig), { onComment: comments, sourceType });
        const program = acorn
            .Parser.extend(acorn_import_meta_1.default)
            .parse(sourceCode, config);
        if (comments.length) {
            program.comments = comments;
        }
        return program;
    }
    static processParsingError(inputData, errorMessage, position) {
        if (!position || !position.line || !position.column) {
            throw new Error(errorMessage);
        }
        const { sourceCode, inputFilePath } = inputData;
        const sourceCodeLines = sourceCode.split(/\r?\n/);
        const errorLine = sourceCodeLines[position.line - 1];
        if (!errorLine) {
            throw new Error(errorMessage);
        }
        const formattedInputFilePath = inputFilePath
            ? `${inputFilePath}, `
            : '';
        const startErrorIndex = Math.max(0, position.column - ASTParserFacade.nearestSymbolsCount);
        const endErrorIndex = Math.min(errorLine.length, position.column + ASTParserFacade.nearestSymbolsCount);
        const formattedPointer = ASTParserFacade.colorError('>');
        const formattedCodeSlice = `...${errorLine.substring(startErrorIndex, endErrorIndex).replace(/^\s+/, '')}...`;
        throw new Error(`ERROR in ${formattedInputFilePath}line ${position.line}: ${errorMessage}\n${formattedPointer} ${formattedCodeSlice}`);
    }
}
exports.ASTParserFacade = ASTParserFacade;
ASTParserFacade.colorError = chalk_1.default.red;
ASTParserFacade.nearestSymbolsCount = 15;
ASTParserFacade.sourceTypes = [
    'script',
    'module'
];


/***/ }),

/***/ "./src/JavaScriptObfuscator.ts":
/*!*************************************!*\
  !*** ./src/JavaScriptObfuscator.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var JavaScriptObfuscator_1, _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ./container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const escodegen = __importStar(__webpack_require__(/*! escodegen */ "escodegen"));
const TObfuscatedCodeFactory_1 = __webpack_require__(/*! ./types/container/source-code/TObfuscatedCodeFactory */ "./src/types/container/source-code/TObfuscatedCodeFactory.ts");
const ILogger_1 = __webpack_require__(/*! ./interfaces/logger/ILogger */ "./src/interfaces/logger/ILogger.ts");
const IOptions_1 = __webpack_require__(/*! ./interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ./interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ITransformersRunner_1 = __webpack_require__(/*! ./interfaces/node-transformers/ITransformersRunner */ "./src/interfaces/node-transformers/ITransformersRunner.ts");
const LoggingMessage_1 = __webpack_require__(/*! ./enums/logger/LoggingMessage */ "./src/enums/logger/LoggingMessage.ts");
const NodeTransformer_1 = __webpack_require__(/*! ./enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");
const TransformationStage_1 = __webpack_require__(/*! ./enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const EcmaVersion_1 = __webpack_require__(/*! ./constants/EcmaVersion */ "./src/constants/EcmaVersion.ts");
const ASTParserFacade_1 = __webpack_require__(/*! ./ASTParserFacade */ "./src/ASTParserFacade.ts");
const NodeGuards_1 = __webpack_require__(/*! ./node/NodeGuards */ "./src/node/NodeGuards.ts");
let JavaScriptObfuscator = JavaScriptObfuscator_1 = class JavaScriptObfuscator {
    constructor(transformersRunner, randomGenerator, obfuscatedCodeFactory, logger, options) {
        this.transformersRunner = transformersRunner;
        this.randomGenerator = randomGenerator;
        this.obfuscatedCodeFactory = obfuscatedCodeFactory;
        this.logger = logger;
        this.options = options;
    }
    obfuscate(sourceCode) {
        const timeStart = Date.now();
        this.logger.info(LoggingMessage_1.LoggingMessage.Version, "0.25.0");
        this.logger.info(LoggingMessage_1.LoggingMessage.ObfuscationStarted);
        this.logger.info(LoggingMessage_1.LoggingMessage.RandomGeneratorSeed, this.randomGenerator.getInputSeed());
        const astTree = this.parseCode(sourceCode);
        const obfuscatedAstTree = this.transformAstTree(astTree);
        const generatorOutput = this.generateCode(sourceCode, obfuscatedAstTree);
        const obfuscationTime = (Date.now() - timeStart) / 1000;
        this.logger.success(LoggingMessage_1.LoggingMessage.ObfuscationCompleted, obfuscationTime);
        return this.getObfuscatedCode(generatorOutput);
    }
    parseCode(sourceCode) {
        const inputData = {
            sourceCode,
            inputFilePath: this.options.inputFilePath
        };
        return ASTParserFacade_1.ASTParserFacade.parse(inputData, JavaScriptObfuscator_1.parseOptions);
    }
    transformAstTree(astTree) {
        astTree = this.runTransformationStage(astTree, TransformationStage_1.TransformationStage.Initializing);
        const isEmptyAstTree = NodeGuards_1.NodeGuards.isProgramNode(astTree)
            && !astTree.body.length
            && !astTree.leadingComments
            && !astTree.trailingComments;
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
    generateCode(sourceCode, astTree) {
        const escodegenParams = Object.assign({}, JavaScriptObfuscator_1.escodegenParams);
        if (this.options.sourceMap) {
            escodegenParams.sourceMap = this.options.inputFileName || 'sourceMap';
            escodegenParams.sourceContent = sourceCode;
        }
        const generatorOutput = escodegen.generate(astTree, Object.assign(Object.assign({}, escodegenParams), { format: {
                compact: this.options.compact
            } }));
        generatorOutput.map = generatorOutput.map ? generatorOutput.map.toString() : '';
        return generatorOutput;
    }
    getObfuscatedCode(generatorOutput) {
        return this.obfuscatedCodeFactory(generatorOutput.code, generatorOutput.map);
    }
    runTransformationStage(astTree, transformationStage) {
        this.logger.info(LoggingMessage_1.LoggingMessage.TransformationStage, transformationStage);
        return this.transformersRunner.transform(astTree, JavaScriptObfuscator_1.transformersList, transformationStage);
    }
};
JavaScriptObfuscator.parseOptions = {
    ecmaVersion: EcmaVersion_1.ecmaVersion,
    allowHashBang: true,
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    locations: true,
    ranges: true
};
JavaScriptObfuscator.escodegenParams = {
    comment: true,
    verbatim: 'x-verbatim-property',
    sourceMapWithCode: true
};
JavaScriptObfuscator.transformersList = [
    NodeTransformer_1.NodeTransformer.BlockStatementControlFlowTransformer,
    NodeTransformer_1.NodeTransformer.CommentsTransformer,
    NodeTransformer_1.NodeTransformer.CustomNodesTransformer,
    NodeTransformer_1.NodeTransformer.DeadCodeInjectionTransformer,
    NodeTransformer_1.NodeTransformer.EvalCallExpressionTransformer,
    NodeTransformer_1.NodeTransformer.FunctionControlFlowTransformer,
    NodeTransformer_1.NodeTransformer.LabeledStatementTransformer,
    NodeTransformer_1.NodeTransformer.LiteralTransformer,
    NodeTransformer_1.NodeTransformer.MemberExpressionTransformer,
    NodeTransformer_1.NodeTransformer.MetadataTransformer,
    NodeTransformer_1.NodeTransformer.MethodDefinitionTransformer,
    NodeTransformer_1.NodeTransformer.ObfuscatingGuardsTransformer,
    NodeTransformer_1.NodeTransformer.ObjectExpressionKeysTransformer,
    NodeTransformer_1.NodeTransformer.ObjectExpressionTransformer,
    NodeTransformer_1.NodeTransformer.ParentificationTransformer,
    NodeTransformer_1.NodeTransformer.ScopeIdentifiersTransformer,
    NodeTransformer_1.NodeTransformer.SplitStringTransformer,
    NodeTransformer_1.NodeTransformer.TemplateLiteralTransformer,
    NodeTransformer_1.NodeTransformer.VariablePreserveTransformer
];
JavaScriptObfuscator = JavaScriptObfuscator_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ITransformersRunner)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatedCode)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ILogger)),
    __param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof ITransformersRunner_1.ITransformersRunner !== "undefined" && ITransformersRunner_1.ITransformersRunner) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof TObfuscatedCodeFactory_1.TObfuscatedCodeFactory !== "undefined" && TObfuscatedCodeFactory_1.TObfuscatedCodeFactory) === "function" ? _c : Object, typeof (_d = typeof ILogger_1.ILogger !== "undefined" && ILogger_1.ILogger) === "function" ? _d : Object, typeof (_e = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _e : Object])
], JavaScriptObfuscator);
exports.JavaScriptObfuscator = JavaScriptObfuscator;


/***/ }),

/***/ "./src/JavaScriptObfuscatorCLIFacade.ts":
/*!**********************************************!*\
  !*** ./src/JavaScriptObfuscatorCLIFacade.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const JavaScriptObfuscatorCLI_1 = __webpack_require__(/*! ./cli/JavaScriptObfuscatorCLI */ "./src/cli/JavaScriptObfuscatorCLI.ts");
class JavaScriptObfuscatorCLIFacade {
    static obfuscate(argv) {
        const javaScriptObfuscatorCLI = new JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI(argv);
        javaScriptObfuscatorCLI.initialize();
        javaScriptObfuscatorCLI.run();
    }
}
exports.JavaScriptObfuscatorCLI = JavaScriptObfuscatorCLIFacade;


/***/ }),

/***/ "./src/JavaScriptObfuscatorFacade.ts":
/*!*******************************************!*\
  !*** ./src/JavaScriptObfuscatorFacade.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var _a;
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const ServiceIdentifiers_1 = __webpack_require__(/*! ./container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const InversifyContainerFacade_1 = __webpack_require__(/*! ./container/InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");
class JavaScriptObfuscatorFacade {
    static obfuscate(sourceCode, inputOptions = {}) {
        const inversifyContainerFacade = new InversifyContainerFacade_1.InversifyContainerFacade();
        inversifyContainerFacade.load(sourceCode, '', inputOptions);
        const javaScriptObfuscator = inversifyContainerFacade
            .get(ServiceIdentifiers_1.ServiceIdentifiers.IJavaScriptObfuscator);
        const obfuscatedCode = javaScriptObfuscator.obfuscate(sourceCode);
        inversifyContainerFacade.unload();
        return obfuscatedCode;
    }
}
exports.JavaScriptObfuscator = JavaScriptObfuscatorFacade;
JavaScriptObfuscatorFacade.version = (_a = "0.25.0") !== null && _a !== void 0 ? _a : 'unknown';


/***/ }),

/***/ "./src/analyzers/calls-graph-analyzer/CallsGraphAnalyzer.ts":
/*!******************************************************************!*\
  !*** ./src/analyzers/calls-graph-analyzer/CallsGraphAnalyzer.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var CallsGraphAnalyzer_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const TCalleeDataExtractorFactory_1 = __webpack_require__(/*! ../../types/container/calls-graph-analyzer/TCalleeDataExtractorFactory */ "./src/types/container/calls-graph-analyzer/TCalleeDataExtractorFactory.ts");
const CalleeDataExtractor_1 = __webpack_require__(/*! ../../enums/analyzers/calls-graph-analyzer/CalleeDataExtractor */ "./src/enums/analyzers/calls-graph-analyzer/CalleeDataExtractor.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeStatementUtils_1 = __webpack_require__(/*! ../../node/NodeStatementUtils */ "./src/node/NodeStatementUtils.ts");
let CallsGraphAnalyzer = CallsGraphAnalyzer_1 = class CallsGraphAnalyzer {
    constructor(calleeDataExtractorFactory) {
        this.calleeDataExtractorFactory = calleeDataExtractorFactory;
    }
    static getLimitIndex(blockScopeBodyLength) {
        const lastIndex = blockScopeBodyLength - 1;
        const limitThresholdActivationIndex = CallsGraphAnalyzer_1.limitThresholdActivationLength - 1;
        let limitIndex = lastIndex;
        if (lastIndex > limitThresholdActivationIndex) {
            limitIndex = Math.round(limitThresholdActivationIndex + (lastIndex * CallsGraphAnalyzer_1.limitThreshold));
            if (limitIndex > lastIndex) {
                limitIndex = lastIndex;
            }
        }
        return limitIndex;
    }
    analyze(astTree) {
        return this.analyzeRecursive(astTree.body);
    }
    analyzeRecursive(blockScopeBody) {
        const limitIndex = CallsGraphAnalyzer_1.getLimitIndex(blockScopeBody.length);
        const callsGraphData = [];
        const blockScopeBodyLength = blockScopeBody.length;
        for (let index = 0; index < blockScopeBodyLength; index++) {
            if (index > limitIndex) {
                break;
            }
            const blockScopeBodyNode = blockScopeBody[index];
            estraverse.traverse(blockScopeBodyNode, {
                enter: (node) => {
                    if (!NodeGuards_1.NodeGuards.isCallExpressionNode(node)) {
                        return;
                    }
                    if (blockScopeBodyNode.parentNode !== NodeStatementUtils_1.NodeStatementUtils.getParentNodeWithStatements(node)) {
                        return estraverse.VisitorOption.Skip;
                    }
                    this.analyzeCallExpressionNode(callsGraphData, blockScopeBody, node);
                }
            });
        }
        return callsGraphData;
    }
    analyzeCallExpressionNode(callsGraphData, blockScopeBody, callExpressionNode) {
        CallsGraphAnalyzer_1.calleeDataExtractorsList.forEach((calleeDataExtractorName) => {
            const calleeData = this.calleeDataExtractorFactory(calleeDataExtractorName)
                .extract(blockScopeBody, callExpressionNode.callee);
            if (!calleeData) {
                return;
            }
            callsGraphData.push(Object.assign(Object.assign({}, calleeData), { callsGraph: this.analyzeRecursive(calleeData.callee.body) }));
        });
    }
};
CallsGraphAnalyzer.calleeDataExtractorsList = [
    CalleeDataExtractor_1.CalleeDataExtractor.FunctionDeclarationCalleeDataExtractor,
    CalleeDataExtractor_1.CalleeDataExtractor.FunctionExpressionCalleeDataExtractor,
    CalleeDataExtractor_1.CalleeDataExtractor.ObjectExpressionCalleeDataExtractor
];
CallsGraphAnalyzer.limitThresholdActivationLength = 25;
CallsGraphAnalyzer.limitThreshold = 0.002;
CallsGraphAnalyzer = CallsGraphAnalyzer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICalleeDataExtractor)),
    __metadata("design:paramtypes", [typeof (_a = typeof TCalleeDataExtractorFactory_1.TCalleeDataExtractorFactory !== "undefined" && TCalleeDataExtractorFactory_1.TCalleeDataExtractorFactory) === "function" ? _a : Object])
], CallsGraphAnalyzer);
exports.CallsGraphAnalyzer = CallsGraphAnalyzer;


/***/ }),

/***/ "./src/analyzers/calls-graph-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts":
/*!**************************************************************************************************!*\
  !*** ./src/analyzers/calls-graph-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
let AbstractCalleeDataExtractor = class AbstractCalleeDataExtractor {
};
AbstractCalleeDataExtractor = __decorate([
    inversify_1.injectable()
], AbstractCalleeDataExtractor);
exports.AbstractCalleeDataExtractor = AbstractCalleeDataExtractor;


/***/ }),

/***/ "./src/analyzers/calls-graph-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/analyzers/calls-graph-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor.ts ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const AbstractCalleeDataExtractor_1 = __webpack_require__(/*! ./AbstractCalleeDataExtractor */ "./src/analyzers/calls-graph-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeStatementUtils_1 = __webpack_require__(/*! ../../../node/NodeStatementUtils */ "./src/node/NodeStatementUtils.ts");
let FunctionDeclarationCalleeDataExtractor = class FunctionDeclarationCalleeDataExtractor extends AbstractCalleeDataExtractor_1.AbstractCalleeDataExtractor {
    extract(blockScopeBody, callee) {
        if (!NodeGuards_1.NodeGuards.isIdentifierNode(callee)) {
            return null;
        }
        const calleeBlockStatement = this.getCalleeBlockStatement(NodeStatementUtils_1.NodeStatementUtils.getParentNodeWithStatements(blockScopeBody[0]), callee.name);
        if (!calleeBlockStatement) {
            return null;
        }
        return {
            callee: calleeBlockStatement,
            name: callee.name
        };
    }
    getCalleeBlockStatement(targetNode, name) {
        let calleeBlockStatement = null;
        estraverse.traverse(targetNode, {
            enter: (node) => {
                if (NodeGuards_1.NodeGuards.isFunctionDeclarationNode(node) && node.id.name === name) {
                    calleeBlockStatement = node.body;
                    return estraverse.VisitorOption.Break;
                }
            }
        });
        return calleeBlockStatement;
    }
};
FunctionDeclarationCalleeDataExtractor = __decorate([
    inversify_1.injectable()
], FunctionDeclarationCalleeDataExtractor);
exports.FunctionDeclarationCalleeDataExtractor = FunctionDeclarationCalleeDataExtractor;


/***/ }),

/***/ "./src/analyzers/calls-graph-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor.ts":
/*!************************************************************************************************************!*\
  !*** ./src/analyzers/calls-graph-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor.ts ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const AbstractCalleeDataExtractor_1 = __webpack_require__(/*! ./AbstractCalleeDataExtractor */ "./src/analyzers/calls-graph-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeStatementUtils_1 = __webpack_require__(/*! ../../../node/NodeStatementUtils */ "./src/node/NodeStatementUtils.ts");
let FunctionExpressionCalleeDataExtractor = class FunctionExpressionCalleeDataExtractor extends AbstractCalleeDataExtractor_1.AbstractCalleeDataExtractor {
    extract(blockScopeBody, callee) {
        var _a;
        let calleeBlockStatement = null;
        if (NodeGuards_1.NodeGuards.isIdentifierNode(callee)) {
            calleeBlockStatement = this.getCalleeBlockStatement(NodeStatementUtils_1.NodeStatementUtils.getParentNodeWithStatements(blockScopeBody[0]), callee.name);
        }
        if (NodeGuards_1.NodeGuards.isFunctionExpressionNode(callee)) {
            calleeBlockStatement = callee.body;
        }
        if (!calleeBlockStatement) {
            return null;
        }
        return {
            callee: calleeBlockStatement,
            name: (_a = callee.name) !== null && _a !== void 0 ? _a : null
        };
    }
    getCalleeBlockStatement(targetNode, name) {
        let calleeBlockStatement = null;
        estraverse.traverse(targetNode, {
            enter: (node, parentNode) => {
                if (NodeGuards_1.NodeGuards.isFunctionExpressionNode(node) &&
                    parentNode &&
                    NodeGuards_1.NodeGuards.isVariableDeclaratorNode(parentNode) &&
                    NodeGuards_1.NodeGuards.isIdentifierNode(parentNode.id) &&
                    parentNode.id.name === name) {
                    calleeBlockStatement = node.body;
                    return estraverse.VisitorOption.Break;
                }
            }
        });
        return calleeBlockStatement;
    }
};
FunctionExpressionCalleeDataExtractor = __decorate([
    inversify_1.injectable()
], FunctionExpressionCalleeDataExtractor);
exports.FunctionExpressionCalleeDataExtractor = FunctionExpressionCalleeDataExtractor;


/***/ }),

/***/ "./src/analyzers/calls-graph-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/analyzers/calls-graph-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor.ts ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var ObjectExpressionCalleeDataExtractor_1;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const AbstractCalleeDataExtractor_1 = __webpack_require__(/*! ./AbstractCalleeDataExtractor */ "./src/analyzers/calls-graph-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeStatementUtils_1 = __webpack_require__(/*! ../../../node/NodeStatementUtils */ "./src/node/NodeStatementUtils.ts");
let ObjectExpressionCalleeDataExtractor = ObjectExpressionCalleeDataExtractor_1 = class ObjectExpressionCalleeDataExtractor extends AbstractCalleeDataExtractor_1.AbstractCalleeDataExtractor {
    static isValidTargetPropertyNode(propertyNode, nextItemInCallsChain) {
        if (!propertyNode.key) {
            return false;
        }
        const isTargetPropertyNodeWithIdentifierKey = NodeGuards_1.NodeGuards.isIdentifierNode(propertyNode.key) && propertyNode.key.name === nextItemInCallsChain;
        const isTargetPropertyNodeWithLiteralKey = NodeGuards_1.NodeGuards.isLiteralNode(propertyNode.key) &&
            Boolean(propertyNode.key.value) &&
            propertyNode.key.value === nextItemInCallsChain;
        return isTargetPropertyNodeWithIdentifierKey || isTargetPropertyNodeWithLiteralKey;
    }
    extract(blockScopeBody, callee) {
        if (!NodeGuards_1.NodeGuards.isMemberExpressionNode(callee)) {
            return null;
        }
        const objectMembersCallsChain = this.createObjectMembersCallsChain([], callee);
        if (!objectMembersCallsChain.length) {
            return null;
        }
        const functionExpressionName = objectMembersCallsChain[objectMembersCallsChain.length - 1];
        const calleeBlockStatement = this.getCalleeBlockStatement(NodeStatementUtils_1.NodeStatementUtils.getParentNodeWithStatements(blockScopeBody[0]), objectMembersCallsChain);
        if (!calleeBlockStatement) {
            return null;
        }
        return {
            callee: calleeBlockStatement,
            name: functionExpressionName
        };
    }
    createObjectMembersCallsChain(currentChain, memberExpression) {
        if (NodeGuards_1.NodeGuards.isIdentifierNode(memberExpression.property) && memberExpression.computed === false) {
            currentChain.unshift(memberExpression.property.name);
        }
        else if (NodeGuards_1.NodeGuards.isLiteralNode(memberExpression.property) &&
            (typeof memberExpression.property.value === 'string' ||
                typeof memberExpression.property.value === 'number')) {
            currentChain.unshift(memberExpression.property.value);
        }
        else {
            return currentChain;
        }
        if (NodeGuards_1.NodeGuards.isMemberExpressionNode(memberExpression.object)) {
            return this.createObjectMembersCallsChain(currentChain, memberExpression.object);
        }
        else if (NodeGuards_1.NodeGuards.isIdentifierNode(memberExpression.object)) {
            currentChain.unshift(memberExpression.object.name);
        }
        return currentChain;
    }
    getCalleeBlockStatement(targetNode, objectMembersCallsChain) {
        const objectName = objectMembersCallsChain.shift();
        if (!objectName) {
            return null;
        }
        let calleeBlockStatement = null;
        estraverse.traverse(targetNode, {
            enter: (node) => {
                if (NodeGuards_1.NodeGuards.isVariableDeclaratorNode(node) &&
                    NodeGuards_1.NodeGuards.isIdentifierNode(node.id) &&
                    node.init &&
                    NodeGuards_1.NodeGuards.isObjectExpressionNode(node.init) &&
                    node.id.name === objectName) {
                    calleeBlockStatement = this.findCalleeBlockStatement(node.init.properties, objectMembersCallsChain);
                    return estraverse.VisitorOption.Break;
                }
            }
        });
        return calleeBlockStatement;
    }
    findCalleeBlockStatement(objectExpressionProperties, objectMembersCallsChain) {
        const nextItemInCallsChain = objectMembersCallsChain.shift();
        if (!nextItemInCallsChain) {
            return null;
        }
        for (const propertyNode of objectExpressionProperties) {
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
        return null;
    }
};
ObjectExpressionCalleeDataExtractor = ObjectExpressionCalleeDataExtractor_1 = __decorate([
    inversify_1.injectable()
], ObjectExpressionCalleeDataExtractor);
exports.ObjectExpressionCalleeDataExtractor = ObjectExpressionCalleeDataExtractor;


/***/ }),

/***/ "./src/analyzers/prevailing-kind-of-variables-analyzer/PrevailingKindOfVariablesAnalyzer.ts":
/*!**************************************************************************************************!*\
  !*** ./src/analyzers/prevailing-kind-of-variables-analyzer/PrevailingKindOfVariablesAnalyzer.ts ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var PrevailingKindOfVariablesAnalyzer_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const IArrayUtils_1 = __webpack_require__(/*! ../../interfaces/utils/IArrayUtils */ "./src/interfaces/utils/IArrayUtils.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let PrevailingKindOfVariablesAnalyzer = PrevailingKindOfVariablesAnalyzer_1 = class PrevailingKindOfVariablesAnalyzer {
    constructor(arrayUtils) {
        this.prevailingKindOfVariables = PrevailingKindOfVariablesAnalyzer_1.defaultKindOfVariables;
        this.arrayUtils = arrayUtils;
    }
    analyze(astTree) {
        var _a;
        const variableKinds = [];
        estraverse.traverse(astTree, {
            enter: (node) => {
                if (!NodeGuards_1.NodeGuards.isVariableDeclarationNode(node)) {
                    return;
                }
                variableKinds.push(node.kind);
            }
        });
        this.prevailingKindOfVariables = (_a = this.arrayUtils.findMostOccurringElement(variableKinds)) !== null && _a !== void 0 ? _a : PrevailingKindOfVariablesAnalyzer_1.defaultKindOfVariables;
    }
    getPrevailingKind() {
        return this.prevailingKindOfVariables;
    }
};
PrevailingKindOfVariablesAnalyzer.defaultKindOfVariables = 'var';
PrevailingKindOfVariablesAnalyzer = PrevailingKindOfVariablesAnalyzer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IArrayUtils)),
    __metadata("design:paramtypes", [typeof (_a = typeof IArrayUtils_1.IArrayUtils !== "undefined" && IArrayUtils_1.IArrayUtils) === "function" ? _a : Object])
], PrevailingKindOfVariablesAnalyzer);
exports.PrevailingKindOfVariablesAnalyzer = PrevailingKindOfVariablesAnalyzer;


/***/ }),

/***/ "./src/analyzers/scope-analyzer/ScopeAnalyzer.ts":
/*!*******************************************************!*\
  !*** ./src/analyzers/scope-analyzer/ScopeAnalyzer.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var ScopeAnalyzer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const eslintScope = __importStar(__webpack_require__(/*! eslint-scope */ "eslint-scope"));
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const EcmaVersion_1 = __webpack_require__(/*! ../../constants/EcmaVersion */ "./src/constants/EcmaVersion.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let ScopeAnalyzer = ScopeAnalyzer_1 = class ScopeAnalyzer {
    constructor() {
        this.scopeManager = null;
    }
    static attachMissingRanges(astTree) {
        estraverse.replace(astTree, {
            enter: (node) => {
                if (!node.range) {
                    node.range = [
                        ScopeAnalyzer_1.emptyRangeValue,
                        ScopeAnalyzer_1.emptyRangeValue
                    ];
                }
                return node;
            }
        });
    }
    static isRootNode(node) {
        return NodeGuards_1.NodeGuards.isProgramNode(node) || node.parentNode === node;
    }
    analyze(astTree) {
        const sourceTypeLength = ScopeAnalyzer_1.sourceTypes.length;
        ScopeAnalyzer_1.attachMissingRanges(astTree);
        for (let i = 0; i < sourceTypeLength; i++) {
            try {
                this.scopeManager = eslintScope.analyze(astTree, Object.assign(Object.assign({}, ScopeAnalyzer_1.eslintScopeOptions), { sourceType: ScopeAnalyzer_1.sourceTypes[i] }));
                return;
            }
            catch (error) {
                if (i < sourceTypeLength - 1) {
                    continue;
                }
                throw new Error(error);
            }
        }
        throw new Error('Scope analyzing error');
    }
    acquireScope(node) {
        if (!this.scopeManager) {
            throw new Error('Scope manager is not defined');
        }
        const scope = this.scopeManager.acquire(node, ScopeAnalyzer_1.isRootNode(node));
        if (!scope) {
            throw new Error('Cannot acquire scope for node');
        }
        this.sanitizeScopes(scope);
        return scope;
    }
    sanitizeScopes(scope) {
        scope.childScopes.forEach((childScope) => {
            if (childScope.type === 'class' && childScope.upper) {
                if (!childScope.variables.length) {
                    return;
                }
                const classNameVariable = childScope.variables[0];
                const upperVariable = childScope.upper.variables
                    .find((variable) => {
                    const isValidClassNameVariable = classNameVariable.defs
                        .some((definition) => definition.type === 'ClassName');
                    return isValidClassNameVariable && variable.name === classNameVariable.name;
                });
                upperVariable === null || upperVariable === void 0 ? void 0 : upperVariable.references.push(...childScope.variables[0].references);
            }
        });
        for (const childScope of scope.childScopes) {
            this.sanitizeScopes(childScope);
        }
    }
};
ScopeAnalyzer.eslintScopeOptions = {
    ecmaVersion: EcmaVersion_1.ecmaVersion,
    optimistic: true
};
ScopeAnalyzer.sourceTypes = [
    'script',
    'module'
];
ScopeAnalyzer.emptyRangeValue = 0;
ScopeAnalyzer = ScopeAnalyzer_1 = __decorate([
    inversify_1.injectable()
], ScopeAnalyzer);
exports.ScopeAnalyzer = ScopeAnalyzer;


/***/ }),

/***/ "./src/analyzers/string-array-storage-analyzer/StringArrayStorageAnalyzer.ts":
/*!***********************************************************************************!*\
  !*** ./src/analyzers/string-array-storage-analyzer/StringArrayStorageAnalyzer.ts ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var StringArrayStorageAnalyzer_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const IStringArrayStorage_1 = __webpack_require__(/*! ../../interfaces/storages/string-array-storage/IStringArrayStorage */ "./src/interfaces/storages/string-array-storage/IStringArrayStorage.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
const NodeLiteralUtils_1 = __webpack_require__(/*! ../../node/NodeLiteralUtils */ "./src/node/NodeLiteralUtils.ts");
let StringArrayStorageAnalyzer = StringArrayStorageAnalyzer_1 = class StringArrayStorageAnalyzer {
    constructor(stringArrayStorage, randomGenerator, options) {
        this.stringArrayStorageData = new Map();
        this.stringArrayStorage = stringArrayStorage;
        this.randomGenerator = randomGenerator;
        this.options = options;
    }
    analyze(astTree) {
        if (!this.options.stringArray) {
            return;
        }
        estraverse.traverse(astTree, {
            enter: (node, parentNode) => {
                if (!parentNode) {
                    return;
                }
                if (NodeMetadata_1.NodeMetadata.isIgnoredNode(node)) {
                    return estraverse.VisitorOption.Skip;
                }
                if (!NodeGuards_1.NodeGuards.isLiteralNode(node)) {
                    return;
                }
                this.analyzeLiteralNode(node, parentNode);
            }
        });
    }
    getItemDataForLiteralNode(literalNode) {
        return this.stringArrayStorageData.get(literalNode);
    }
    analyzeLiteralNode(literalNode, parentNode) {
        if (typeof literalNode.value !== 'string') {
            return;
        }
        if (NodeLiteralUtils_1.NodeLiteralUtils.isProhibitedLiteralNode(literalNode, parentNode)) {
            return;
        }
        if (!this.shouldAddValueToStringArray(literalNode.value)) {
            return;
        }
        this.stringArrayStorageData.set(literalNode, this.stringArrayStorage.getOrThrow(literalNode.value));
    }
    shouldAddValueToStringArray(value) {
        return value.length >= StringArrayStorageAnalyzer_1.minimumLengthForStringArray
            && this.randomGenerator.getMathRandom() <= this.options.stringArrayThreshold;
    }
};
StringArrayStorageAnalyzer.minimumLengthForStringArray = 3;
StringArrayStorageAnalyzer = StringArrayStorageAnalyzer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IStringArrayStorage)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IStringArrayStorage_1.IStringArrayStorage !== "undefined" && IStringArrayStorage_1.IStringArrayStorage) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], StringArrayStorageAnalyzer);
exports.StringArrayStorageAnalyzer = StringArrayStorageAnalyzer;


/***/ }),

/***/ "./src/cli/JavaScriptObfuscatorCLI.ts":
/*!********************************************!*\
  !*** ./src/cli/JavaScriptObfuscatorCLI.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const commander = __importStar(__webpack_require__(/*! commander */ "commander"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const TInputCLIOptions_1 = __webpack_require__(/*! ../types/options/TInputCLIOptions */ "./src/types/options/TInputCLIOptions.ts");
const Initializable_1 = __webpack_require__(/*! ../decorators/Initializable */ "./src/decorators/Initializable.ts");
const Default_1 = __webpack_require__(/*! ../options/presets/Default */ "./src/options/presets/Default.ts");
const ArraySanitizer_1 = __webpack_require__(/*! ./sanitizers/ArraySanitizer */ "./src/cli/sanitizers/ArraySanitizer.ts");
const BooleanSanitizer_1 = __webpack_require__(/*! ./sanitizers/BooleanSanitizer */ "./src/cli/sanitizers/BooleanSanitizer.ts");
const IdentifierNamesGeneratorSanitizer_1 = __webpack_require__(/*! ./sanitizers/IdentifierNamesGeneratorSanitizer */ "./src/cli/sanitizers/IdentifierNamesGeneratorSanitizer.ts");
const ObfuscatingTargetSanitizer_1 = __webpack_require__(/*! ./sanitizers/ObfuscatingTargetSanitizer */ "./src/cli/sanitizers/ObfuscatingTargetSanitizer.ts");
const SourceMapModeSanitizer_1 = __webpack_require__(/*! ./sanitizers/SourceMapModeSanitizer */ "./src/cli/sanitizers/SourceMapModeSanitizer.ts");
const StringArrayEncodingSanitizer_1 = __webpack_require__(/*! ./sanitizers/StringArrayEncodingSanitizer */ "./src/cli/sanitizers/StringArrayEncodingSanitizer.ts");
const CLIUtils_1 = __webpack_require__(/*! ./utils/CLIUtils */ "./src/cli/utils/CLIUtils.ts");
const JavaScriptObfuscatorFacade_1 = __webpack_require__(/*! ../JavaScriptObfuscatorFacade */ "./src/JavaScriptObfuscatorFacade.ts");
const ObfuscatedCodeWriter_1 = __webpack_require__(/*! ./utils/ObfuscatedCodeWriter */ "./src/cli/utils/ObfuscatedCodeWriter.ts");
const SourceCodeReader_1 = __webpack_require__(/*! ./utils/SourceCodeReader */ "./src/cli/utils/SourceCodeReader.ts");
class JavaScriptObfuscatorCLI {
    constructor(argv) {
        this.rawArguments = argv;
        this.arguments = argv.slice(2);
    }
    static buildOptions(inputOptions, inputCodePath) {
        const inputCLIOptions = JavaScriptObfuscatorCLI.filterOptions(inputOptions);
        const configFilePath = inputOptions.config;
        const configFileLocation = configFilePath ? path.resolve(configFilePath, '.') : '';
        const configFileOptions = configFileLocation ? CLIUtils_1.CLIUtils.getUserConfig(configFileLocation) : {};
        const inputFileName = path.basename(inputCodePath);
        const inputFilePath = inputCodePath;
        return Object.assign(Object.assign(Object.assign(Object.assign({}, Default_1.DEFAULT_PRESET), configFileOptions), inputCLIOptions), { inputFileName,
            inputFilePath });
    }
    static filterOptions(options) {
        const filteredOptions = {};
        Object
            .keys(options)
            .forEach((option) => {
            if (options[option] === undefined) {
                return;
            }
            filteredOptions[option] = options[option];
        });
        return filteredOptions;
    }
    initialize() {
        this.inputPath = path.normalize(this.arguments[0] || '');
        this.commands = (new commander.Command());
        this.configureCommands();
        this.configureHelp();
        this.inputCLIOptions = this.commands.opts();
        this.sourceCodeReader = new SourceCodeReader_1.SourceCodeReader(this.inputPath, this.inputCLIOptions);
        this.obfuscatedCodeWriter = new ObfuscatedCodeWriter_1.ObfuscatedCodeWriter(this.inputPath, this.inputCLIOptions);
    }
    run() {
        const canShowHelp = !this.arguments.length || this.arguments.includes('--help');
        if (canShowHelp) {
            this.commands.outputHelp();
            return;
        }
        const sourceCodeData = this.sourceCodeReader.readSourceCode();
        this.processSourceCodeData(sourceCodeData);
    }
    configureCommands() {
        var _a;
        this.commands
            .usage('<inputPath> [options]')
            .version((_a = "0.25.0") !== null && _a !== void 0 ? _a : 'unknown', '-v, --version')
            .option('-o, --output <path>', 'Output path for obfuscated code')
            .option('--compact <boolean>', 'Disable one line output code compacting', BooleanSanitizer_1.BooleanSanitizer)
            .option('--config <boolean>', 'Name of js / json config file')
            .option('--control-flow-flattening <boolean>', 'Enables control flow flattening', BooleanSanitizer_1.BooleanSanitizer)
            .option('--control-flow-flattening-threshold <number>', 'The probability that the control flow flattening transformation will be applied to the node', parseFloat)
            .option('--dead-code-injection <boolean>', 'Enables dead code injection', BooleanSanitizer_1.BooleanSanitizer)
            .option('--dead-code-injection-threshold <number>', 'The probability that the dead code injection transformation will be applied to the node', parseFloat)
            .option('--debug-protection <boolean>', 'Disable browser Debug panel (can cause DevTools enabled browser freeze)', BooleanSanitizer_1.BooleanSanitizer)
            .option('--debug-protection-interval <boolean>', 'Disable browser Debug panel even after page was loaded (can cause DevTools enabled browser freeze)', BooleanSanitizer_1.BooleanSanitizer)
            .option('--disable-console-output <boolean>', 'Allow console.log, console.info, console.error and console.warn messages output into browser console', BooleanSanitizer_1.BooleanSanitizer)
            .option('--domain-lock <list> (comma separated, without whitespaces)', 'Blocks the execution of the code in domains that do not match the passed RegExp patterns (comma separated)', ArraySanitizer_1.ArraySanitizer)
            .option('--exclude <list> (comma separated, without whitespaces)', 'A filename or glob which indicates files to exclude from obfuscation', ArraySanitizer_1.ArraySanitizer)
            .option('--identifier-names-generator <string>', 'Sets identifier names generator. ' +
            'Values: hexadecimal, mangled, dictionary. ' +
            'Default: hexadecimal', IdentifierNamesGeneratorSanitizer_1.IdentifierNamesGeneratorSanitizer)
            .option('--identifiers-prefix <string>', 'Sets prefix for all global identifiers.')
            .option('--identifiers-dictionary <list> (comma separated, without whitespaces)', 'Identifiers dictionary (comma separated) for `--identifier-names-generator dictionary` option', ArraySanitizer_1.ArraySanitizer)
            .option('--log <boolean>', 'Enables logging of the information to the console', BooleanSanitizer_1.BooleanSanitizer)
            .option('--reserved-names <list> (comma separated, without whitespaces)', 'Disables obfuscation and generation of identifiers, which being matched by passed RegExp patterns (comma separated)', ArraySanitizer_1.ArraySanitizer)
            .option('--reserved-strings <list> (comma separated, without whitespaces)', 'Disables transformation of string literals, which being matched by passed RegExp patterns (comma separated)', ArraySanitizer_1.ArraySanitizer)
            .option('--rename-globals <boolean>', 'Allows to enable obfuscation of global variable and function names with declaration.', BooleanSanitizer_1.BooleanSanitizer)
            .option('--rotate-string-array <boolean>', 'Enable rotation of string array values during obfuscation', BooleanSanitizer_1.BooleanSanitizer)
            .option('--seed <string|number>', 'Sets seed for random generator. This is useful for creating repeatable results.', parseFloat)
            .option('--self-defending <boolean>', 'Disables self-defending for obfuscated code', BooleanSanitizer_1.BooleanSanitizer)
            .option('--shuffle-string-array <boolean>', 'Randomly shuffles string array items', BooleanSanitizer_1.BooleanSanitizer)
            .option('--source-map <boolean>', 'Enables source map generation', BooleanSanitizer_1.BooleanSanitizer)
            .option('--source-map-base-url <string>', 'Sets base url to the source map import url when `--source-map-mode=separate`')
            .option('--source-map-file-name <string>', 'Sets file name for output source map when `--source-map-mode=separate`')
            .option('--source-map-mode <string>', 'Specify source map output mode. ' +
            'Values: inline, separate. ' +
            'Default: separate', SourceMapModeSanitizer_1.SourceMapModeSanitizer)
            .option('--split-strings <boolean>', 'Splits literal strings into chunks with length of `splitStringsChunkLength` option value', BooleanSanitizer_1.BooleanSanitizer)
            .option('--split-strings-chunk-length <number>', 'Sets chunk length of `splitStrings` option', parseFloat)
            .option('--string-array <boolean>', 'Disables gathering of all literal strings into an array and replacing every literal string with an array call', BooleanSanitizer_1.BooleanSanitizer)
            .option('--string-array-encoding <string|boolean>', 'Encodes all strings in strings array using base64 or rc4 (this option can slow down your code speed. ' +
            'Values: true, false, base64, rc4. ' +
            'Default: false', StringArrayEncodingSanitizer_1.StringArrayEncodingSanitizer)
            .option('--string-array-threshold <number>', 'The probability that the literal string will be inserted into stringArray (Default: 0.8, Min: 0, Max: 1)', parseFloat)
            .option('--target <string>', 'Allows to set target environment for obfuscated code. ' +
            'Values: browser, browser-no-eval, node. ' +
            'Default: browser', ObfuscatingTargetSanitizer_1.ObfuscationTargetSanitizer)
            .option('--transform-object-keys <boolean>', 'Enables transformation of object keys', BooleanSanitizer_1.BooleanSanitizer)
            .option('--unicode-escape-sequence <boolean>', 'Allows to enable/disable string conversion to unicode escape sequence', BooleanSanitizer_1.BooleanSanitizer)
            .parse(this.rawArguments);
    }
    configureHelp() {
        this.commands.on('--help', () => {
            console.log('  Examples:\n');
            console.log('    %> javascript-obfuscator input_file_name.js --compact true --self-defending false');
            console.log('    %> javascript-obfuscator input_file_name.js --output output_file_name.js --compact true --self-defending false');
            console.log('    %> javascript-obfuscator input_directory_name --compact true --self-defending false');
            console.log('');
        });
    }
    processSourceCodeData(sourceCodeData) {
        sourceCodeData.forEach(({ filePath, content }, index) => {
            const outputCodePath = this.obfuscatedCodeWriter.getOutputCodePath(filePath);
            this.processSourceCode(content, filePath, outputCodePath, index);
        });
    }
    processSourceCode(sourceCode, inputCodePath, outputCodePath, sourceCodeIndex) {
        var _a;
        let options = JavaScriptObfuscatorCLI.buildOptions(this.inputCLIOptions, inputCodePath);
        if (sourceCodeIndex !== null) {
            const baseIdentifiersPrefix = (_a = this.inputCLIOptions.identifiersPrefix) !== null && _a !== void 0 ? _a : JavaScriptObfuscatorCLI.baseIdentifiersPrefix;
            const identifiersPrefix = `${baseIdentifiersPrefix}${sourceCodeIndex}`;
            options = Object.assign(Object.assign({}, options), { identifiersPrefix });
        }
        if (options.sourceMap) {
            this.processSourceCodeWithSourceMap(sourceCode, outputCodePath, options);
        }
        else {
            this.processSourceCodeWithoutSourceMap(sourceCode, outputCodePath, options);
        }
    }
    processSourceCodeWithoutSourceMap(sourceCode, outputCodePath, options) {
        const obfuscatedCode = JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(sourceCode, options).getObfuscatedCode();
        this.obfuscatedCodeWriter.writeFile(outputCodePath, obfuscatedCode);
    }
    processSourceCodeWithSourceMap(sourceCode, outputCodePath, options) {
        var _a;
        const outputSourceMapPath = this.obfuscatedCodeWriter.getOutputSourceMapPath(outputCodePath, (_a = options.sourceMapFileName) !== null && _a !== void 0 ? _a : '');
        options = Object.assign(Object.assign({}, options), { sourceMapFileName: path.basename(outputSourceMapPath) });
        const obfuscatedCode = JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(sourceCode, options);
        this.obfuscatedCodeWriter.writeFile(outputCodePath, obfuscatedCode.getObfuscatedCode());
        if (options.sourceMapMode === 'separate' && obfuscatedCode.getSourceMap()) {
            this.obfuscatedCodeWriter.writeFile(outputSourceMapPath, obfuscatedCode.getSourceMap());
        }
    }
}
JavaScriptObfuscatorCLI.encoding = 'utf8';
JavaScriptObfuscatorCLI.obfuscatedFilePrefix = '-obfuscated';
JavaScriptObfuscatorCLI.baseIdentifiersPrefix = 'a';
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_a = typeof commander !== "undefined" && commander.CommanderStatic) === "function" ? _a : Object)
], JavaScriptObfuscatorCLI.prototype, "commands", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_b = typeof TInputCLIOptions_1.TInputCLIOptions !== "undefined" && TInputCLIOptions_1.TInputCLIOptions) === "function" ? _b : Object)
], JavaScriptObfuscatorCLI.prototype, "inputCLIOptions", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], JavaScriptObfuscatorCLI.prototype, "inputPath", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_c = typeof SourceCodeReader_1.SourceCodeReader !== "undefined" && SourceCodeReader_1.SourceCodeReader) === "function" ? _c : Object)
], JavaScriptObfuscatorCLI.prototype, "sourceCodeReader", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_d = typeof ObfuscatedCodeWriter_1.ObfuscatedCodeWriter !== "undefined" && ObfuscatedCodeWriter_1.ObfuscatedCodeWriter) === "function" ? _d : Object)
], JavaScriptObfuscatorCLI.prototype, "obfuscatedCodeWriter", void 0);
exports.JavaScriptObfuscatorCLI = JavaScriptObfuscatorCLI;


/***/ }),

/***/ "./src/cli/sanitizers/ArraySanitizer.ts":
/*!**********************************************!*\
  !*** ./src/cli/sanitizers/ArraySanitizer.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ArraySanitizer = (value) => {
    if (value.endsWith(',')) {
        throw new SyntaxError('Multiple <list> values should be wrapped inside quotes: --option-name \'value1\',\'value2\'');
    }
    return value.split(',').map((string) => string.trim());
};


/***/ }),

/***/ "./src/cli/sanitizers/BooleanSanitizer.ts":
/*!************************************************!*\
  !*** ./src/cli/sanitizers/BooleanSanitizer.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanSanitizer = (value) => {
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

Object.defineProperty(exports, "__esModule", { value: true });
const IdentifierNamesGenerator_1 = __webpack_require__(/*! ../../enums/generators/identifier-names-generators/IdentifierNamesGenerator */ "./src/enums/generators/identifier-names-generators/IdentifierNamesGenerator.ts");
exports.IdentifierNamesGeneratorSanitizer = (value) => {
    const isCorrectIdentifierNamesGenerator = Object
        .keys(IdentifierNamesGenerator_1.IdentifierNamesGenerator)
        .some((key) => {
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

Object.defineProperty(exports, "__esModule", { value: true });
const ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");
exports.ObfuscationTargetSanitizer = (value) => {
    const isCorrectTarget = Object
        .keys(ObfuscationTarget_1.ObfuscationTarget)
        .some((key) => {
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

Object.defineProperty(exports, "__esModule", { value: true });
const SourceMapMode_1 = __webpack_require__(/*! ../../enums/source-map/SourceMapMode */ "./src/enums/source-map/SourceMapMode.ts");
exports.SourceMapModeSanitizer = (value) => {
    const isCorrectSourceMapMode = Object
        .keys(SourceMapMode_1.SourceMapMode)
        .some((key) => {
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

Object.defineProperty(exports, "__esModule", { value: true });
const StringArrayEncoding_1 = __webpack_require__(/*! ../../enums/StringArrayEncoding */ "./src/enums/StringArrayEncoding.ts");
exports.StringArrayEncodingSanitizer = (value) => {
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

Object.defineProperty(exports, "__esModule", { value: true });
class CLIUtils {
    static getUserConfig(configPath) {
        let config;
        try {
            config = __webpack_require__("./src/cli/utils sync recursive")(configPath);
        }
        catch (_a) {
            try {
                config = require(configPath);
            }
            catch (_b) {
                throw new ReferenceError('Given config path must be a valid `.js` or `.json` file path');
            }
        }
        return config;
    }
}
exports.CLIUtils = CLIUtils;


/***/ }),

/***/ "./src/cli/utils/ObfuscatedCodeWriter.ts":
/*!***********************************************!*\
  !*** ./src/cli/utils/ObfuscatedCodeWriter.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const mkdirp = __importStar(__webpack_require__(/*! mkdirp */ "mkdirp"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const StringSeparator_1 = __webpack_require__(/*! ../../enums/StringSeparator */ "./src/enums/StringSeparator.ts");
const JavaScriptObfuscatorCLI_1 = __webpack_require__(/*! ../JavaScriptObfuscatorCLI */ "./src/cli/JavaScriptObfuscatorCLI.ts");
class ObfuscatedCodeWriter {
    constructor(inputPath, options) {
        this.inputPath = inputPath;
        this.options = options;
    }
    getOutputCodePath(filePath) {
        const normalizedRawOutputPath = this.options.output
            ? path.normalize(this.options.output)
            : null;
        if (!normalizedRawOutputPath) {
            return path
                .normalize(filePath)
                .split(StringSeparator_1.StringSeparator.Dot)
                .map((value, index) => {
                return index === 0 ? `${value}${JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.obfuscatedFilePrefix}` : value;
            })
                .join(StringSeparator_1.StringSeparator.Dot);
        }
        const rawInputPathStats = fs.lstatSync(this.inputPath);
        const isDirectoryRawInputPath = rawInputPathStats.isDirectory();
        const isDirectoryRawOutputPath = path.extname(normalizedRawOutputPath) === '';
        if (isDirectoryRawInputPath) {
            if (isDirectoryRawOutputPath) {
                return path.join(normalizedRawOutputPath, filePath);
            }
            else {
                throw new Error('Output path for directory obfuscation should be a directory path');
            }
        }
        else {
            if (isDirectoryRawOutputPath) {
                return path.join(normalizedRawOutputPath, path.basename(filePath));
            }
            else {
                return normalizedRawOutputPath;
            }
        }
    }
    getOutputSourceMapPath(outputCodePath, sourceMapFileName = '') {
        if (sourceMapFileName) {
            outputCodePath = `${outputCodePath.substring(0, outputCodePath.lastIndexOf('/'))}/${sourceMapFileName}`;
        }
        if (!/\.js\.map$/.test(outputCodePath)) {
            outputCodePath = `${outputCodePath.split(StringSeparator_1.StringSeparator.Dot)[0]}.js.map`;
        }
        else if (/\.js$/.test(outputCodePath)) {
            outputCodePath += '.map';
        }
        return outputCodePath;
    }
    writeFile(outputPath, data) {
        mkdirp.sync(path.dirname(outputPath));
        fs.writeFileSync(outputPath, data, {
            encoding: JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.encoding
        });
    }
}
exports.ObfuscatedCodeWriter = ObfuscatedCodeWriter;


/***/ }),

/***/ "./src/cli/utils/SourceCodeReader.ts":
/*!*******************************************!*\
  !*** ./src/cli/utils/SourceCodeReader.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(__webpack_require__(/*! fs */ "fs"));
const path = __importStar(__webpack_require__(/*! path */ "path"));
const multimatch_1 = __importDefault(__webpack_require__(/*! multimatch */ "multimatch"));
const LoggingPrefix_1 = __webpack_require__(/*! ../../enums/logger/LoggingPrefix */ "./src/enums/logger/LoggingPrefix.ts");
const JavaScriptObfuscatorCLI_1 = __webpack_require__(/*! ../JavaScriptObfuscatorCLI */ "./src/cli/JavaScriptObfuscatorCLI.ts");
const Logger_1 = __webpack_require__(/*! ../../logger/Logger */ "./src/logger/Logger.ts");
class SourceCodeReader {
    constructor(inputPath, options) {
        this.inputPath = inputPath;
        this.options = options;
    }
    static isExcludedPath(filePath, excludePatterns = []) {
        if (!excludePatterns.length) {
            return false;
        }
        const fileName = path.basename(filePath);
        const isExcludedFilePathByGlobPattern = !!multimatch_1.default([filePath], excludePatterns).length;
        const isExcludedFilePathByInclusion = excludePatterns.some((excludePattern) => filePath.includes(excludePattern) || fileName.includes(excludePattern));
        return isExcludedFilePathByInclusion || isExcludedFilePathByGlobPattern;
    }
    static isDirectoryPath(filePath) {
        try {
            return fs.statSync(filePath).isDirectory();
        }
        catch (_a) {
            return false;
        }
    }
    static isFilePath(filePath) {
        try {
            return fs.statSync(filePath).isFile();
        }
        catch (_a) {
            return false;
        }
    }
    static isValidDirectory(directoryPath, excludePatterns = []) {
        return !SourceCodeReader.isExcludedPath(directoryPath, excludePatterns);
    }
    static isValidFile(filePath, excludePatterns = []) {
        return SourceCodeReader.availableInputExtensions.includes(path.extname(filePath))
            && !filePath.includes(JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.obfuscatedFilePrefix)
            && !SourceCodeReader.isExcludedPath(filePath, excludePatterns);
    }
    static logFilePath(filePath) {
        const normalizedFilePath = path.normalize(filePath);
        Logger_1.Logger.log(Logger_1.Logger.colorInfo, LoggingPrefix_1.LoggingPrefix.CLI, `Obfuscating file: ${normalizedFilePath}...`);
    }
    static readFile(filePath) {
        SourceCodeReader.logFilePath(filePath);
        return {
            filePath,
            content: fs.readFileSync(filePath, JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.encoding)
        };
    }
    readSourceCode() {
        if (SourceCodeReader.isFilePath(this.inputPath)
            && SourceCodeReader.isValidFile(this.inputPath, this.options.exclude)) {
            return [SourceCodeReader.readFile(this.inputPath)];
        }
        if (SourceCodeReader.isDirectoryPath(this.inputPath)
            && SourceCodeReader.isValidDirectory(this.inputPath, this.options.exclude)) {
            return this.readDirectoryRecursive(this.inputPath);
        }
        const availableFilePaths = SourceCodeReader
            .availableInputExtensions
            .map((extension) => `\`${extension}\``)
            .join(', ');
        throw new ReferenceError(`Given input path must be a valid ${availableFilePaths} file or directory path`);
    }
    readDirectoryRecursive(directoryPath, filesData = []) {
        fs.readdirSync(directoryPath, JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.encoding)
            .forEach((fileName) => {
            const filePath = `${directoryPath}/${fileName}`;
            if (SourceCodeReader.isDirectoryPath(filePath)
                && SourceCodeReader.isValidDirectory(filePath, this.options.exclude)) {
                filesData.push(...this.readDirectoryRecursive(filePath));
                return;
            }
            if (SourceCodeReader.isFilePath(filePath)
                && SourceCodeReader.isValidFile(filePath, this.options.exclude)) {
                const fileData = SourceCodeReader.readFile(filePath);
                filesData.push(fileData);
                return;
            }
        });
        return filesData;
    }
}
exports.SourceCodeReader = SourceCodeReader;
SourceCodeReader.availableInputExtensions = [
    '.js'
];


/***/ }),

/***/ "./src/constants/EcmaVersion.ts":
/*!**************************************!*\
  !*** ./src/constants/EcmaVersion.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ecmaVersion = 11;


/***/ }),

/***/ "./src/container/InversifyContainerFacade.ts":
/*!***************************************************!*\
  !*** ./src/container/InversifyContainerFacade.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ./ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const AnalyzersModule_1 = __webpack_require__(/*! ./modules/analyzers/AnalyzersModule */ "./src/container/modules/analyzers/AnalyzersModule.ts");
const ControlFlowTransformersModule_1 = __webpack_require__(/*! ./modules/node-transformers/ControlFlowTransformersModule */ "./src/container/modules/node-transformers/ControlFlowTransformersModule.ts");
const ConvertingTransformersModule_1 = __webpack_require__(/*! ./modules/node-transformers/ConvertingTransformersModule */ "./src/container/modules/node-transformers/ConvertingTransformersModule.ts");
const CustomNodesModule_1 = __webpack_require__(/*! ./modules/custom-nodes/CustomNodesModule */ "./src/container/modules/custom-nodes/CustomNodesModule.ts");
const FinalizingTransformersModule_1 = __webpack_require__(/*! ./modules/node-transformers/FinalizingTransformersModule */ "./src/container/modules/node-transformers/FinalizingTransformersModule.ts");
const GeneratorsModule_1 = __webpack_require__(/*! ./modules/generators/GeneratorsModule */ "./src/container/modules/generators/GeneratorsModule.ts");
const NodeModule_1 = __webpack_require__(/*! ./modules/node/NodeModule */ "./src/container/modules/node/NodeModule.ts");
const NodeTransformersModule_1 = __webpack_require__(/*! ./modules/node-transformers/NodeTransformersModule */ "./src/container/modules/node-transformers/NodeTransformersModule.ts");
const ObfuscatingTransformersModule_1 = __webpack_require__(/*! ./modules/node-transformers/ObfuscatingTransformersModule */ "./src/container/modules/node-transformers/ObfuscatingTransformersModule.ts");
const OptionsModule_1 = __webpack_require__(/*! ./modules/options/OptionsModule */ "./src/container/modules/options/OptionsModule.ts");
const PreparingTransformersModule_1 = __webpack_require__(/*! ./modules/node-transformers/PreparingTransformersModule */ "./src/container/modules/node-transformers/PreparingTransformersModule.ts");
const StoragesModule_1 = __webpack_require__(/*! ./modules/storages/StoragesModule */ "./src/container/modules/storages/StoragesModule.ts");
const UtilsModule_1 = __webpack_require__(/*! ./modules/utils/UtilsModule */ "./src/container/modules/utils/UtilsModule.ts");
const JavaScriptObfuscator_1 = __webpack_require__(/*! ../JavaScriptObfuscator */ "./src/JavaScriptObfuscator.ts");
const Logger_1 = __webpack_require__(/*! ../logger/Logger */ "./src/logger/Logger.ts");
const ObfuscationEventEmitter_1 = __webpack_require__(/*! ../event-emitters/ObfuscationEventEmitter */ "./src/event-emitters/ObfuscationEventEmitter.ts");
const ObfuscatedCode_1 = __webpack_require__(/*! ../source-code/ObfuscatedCode */ "./src/source-code/ObfuscatedCode.ts");
const SourceCode_1 = __webpack_require__(/*! ../source-code/SourceCode */ "./src/source-code/SourceCode.ts");
const TransformersRunner_1 = __webpack_require__(/*! ../node-transformers/TransformersRunner */ "./src/node-transformers/TransformersRunner.ts");
class InversifyContainerFacade {
    constructor() {
        this.container = new inversify_1.Container();
    }
    static getFactory(serviceIdentifier) {
        return (context) => {
            return (bindingName) => {
                return context.container.getNamed(serviceIdentifier, bindingName);
            };
        };
    }
    static getCacheFactory(serviceIdentifier) {
        return (context) => {
            const cache = new Map();
            return (bindingName) => {
                if (cache.has(bindingName)) {
                    return cache.get(bindingName);
                }
                const object = context.container.getNamed(serviceIdentifier, bindingName);
                cache.set(bindingName, object);
                return object;
            };
        };
    }
    static getConstructorFactory(serviceIdentifier, ...dependencies) {
        return (context) => {
            const cache = new Map();
            const cachedDependencies = [];
            return (bindingName) => {
                dependencies.forEach((dependency, index) => {
                    if (!cachedDependencies[index]) {
                        cachedDependencies[index] = context.container.get(dependency);
                    }
                });
                if (cache.has(bindingName)) {
                    return new (cache.get(bindingName))(...cachedDependencies);
                }
                const constructor = context.container
                    .getNamed(serviceIdentifier, bindingName);
                cache.set(bindingName, constructor);
                return new constructor(...cachedDependencies);
            };
        };
    }
    get(serviceIdentifier) {
        return this.container.get(serviceIdentifier);
    }
    getNamed(serviceIdentifier, named) {
        return this.container.getNamed(serviceIdentifier, named);
    }
    load(sourceCode, sourceMap, options) {
        this.container
            .bind(ServiceIdentifiers_1.ServiceIdentifiers.ISourceCode)
            .toDynamicValue(() => new SourceCode_1.SourceCode(sourceCode, sourceMap))
            .inSingletonScope();
        this.container
            .bind(ServiceIdentifiers_1.ServiceIdentifiers.TInputOptions)
            .toDynamicValue(() => options)
            .inSingletonScope();
        this.container
            .bind(ServiceIdentifiers_1.ServiceIdentifiers.ILogger)
            .to(Logger_1.Logger)
            .inSingletonScope();
        this.container
            .bind(ServiceIdentifiers_1.ServiceIdentifiers.IJavaScriptObfuscator)
            .to(JavaScriptObfuscator_1.JavaScriptObfuscator)
            .inSingletonScope();
        this.container
            .bind(ServiceIdentifiers_1.ServiceIdentifiers.ITransformersRunner)
            .to(TransformersRunner_1.TransformersRunner)
            .inSingletonScope();
        this.container
            .bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatedCode)
            .to(ObfuscatedCode_1.ObfuscatedCode);
        this.container
            .bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatedCode)
            .toFactory((context) => {
            return (obfuscatedCodeAsString, sourceMapAsString) => {
                const obfuscatedCode = context.container
                    .get(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatedCode);
                obfuscatedCode.initialize(obfuscatedCodeAsString, sourceMapAsString);
                return obfuscatedCode;
            };
        });
        this.container
            .bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)
            .to(ObfuscationEventEmitter_1.ObfuscationEventEmitter)
            .inSingletonScope();
        this.container.load(AnalyzersModule_1.analyzersModule);
        this.container.load(ControlFlowTransformersModule_1.controlFlowTransformersModule);
        this.container.load(ConvertingTransformersModule_1.convertingTransformersModule);
        this.container.load(CustomNodesModule_1.customNodesModule);
        this.container.load(FinalizingTransformersModule_1.finalizingTransformersModule);
        this.container.load(GeneratorsModule_1.generatorsModule);
        this.container.load(NodeModule_1.nodeModule);
        this.container.load(NodeTransformersModule_1.nodeTransformersModule);
        this.container.load(ObfuscatingTransformersModule_1.obfuscatingTransformersModule);
        this.container.load(OptionsModule_1.optionsModule);
        this.container.load(PreparingTransformersModule_1.preparingTransformersModule);
        this.container.load(StoragesModule_1.storagesModule);
        this.container.load(UtilsModule_1.utilsModule);
    }
    unload() {
        this.container.unbindAll();
    }
}
exports.InversifyContainerFacade = InversifyContainerFacade;


/***/ }),

/***/ "./src/container/ServiceIdentifiers.ts":
/*!*********************************************!*\
  !*** ./src/container/ServiceIdentifiers.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    ServiceIdentifiers["Factory__IObfuscatedCode"] = "Factory<IObfuscatedCode>";
    ServiceIdentifiers["Factory__IObfuscatingReplacer"] = "Factory<IObfuscatingReplacer>";
    ServiceIdentifiers["Factory__IObjectExpressionKeysTransformerCustomNode"] = "Factory<IObjectExpressionKeysTransformerCustomNode>";
    ServiceIdentifiers["Factory__IObjectExpressionExtractor"] = "Factory<IObjectExpressionExtractor>";
    ServiceIdentifiers["Factory__TControlFlowStorage"] = "Factory<TControlFlowStorage>";
    ServiceIdentifiers["IArrayUtils"] = "IArrayUtils";
    ServiceIdentifiers["ICalleeDataExtractor"] = "ICalleeDataExtractor";
    ServiceIdentifiers["ICallsGraphAnalyzer"] = "ICallsGraphAnalyzer";
    ServiceIdentifiers["ICryptUtils"] = "ICryptUtils";
    ServiceIdentifiers["ICustomNode"] = "ICustomNode";
    ServiceIdentifiers["ICustomNodeGroup"] = "ICustomNodeGroup";
    ServiceIdentifiers["IControlFlowReplacer"] = "IControlFlowReplacer";
    ServiceIdentifiers["ICustomNodeFormatter"] = "ICustomNodeFormatter";
    ServiceIdentifiers["IEscapeSequenceEncoder"] = "IEscapeSequenceEncoder";
    ServiceIdentifiers["IIdentifierNamesGenerator"] = "IIdentifierNamesGenerator";
    ServiceIdentifiers["IIdentifierObfuscatingReplacer"] = "IIdentifierObfuscatingReplacer";
    ServiceIdentifiers["IJavaScriptObfuscator"] = "IJavaScriptObfuscator";
    ServiceIdentifiers["ILevelledTopologicalSorter"] = "ILevelledTopologicalSorter";
    ServiceIdentifiers["ILogger"] = "ILogger";
    ServiceIdentifiers["INodeGuard"] = "INodeGuard";
    ServiceIdentifiers["INodeTransformer"] = "INodeTransformer";
    ServiceIdentifiers["INodeTransformerNamesGroupsBuilder"] = "INodeTransformerNamesGroupsBuilder";
    ServiceIdentifiers["IObfuscationEventEmitter"] = "IObfuscationEventEmitter";
    ServiceIdentifiers["IObfuscatedCode"] = "IObfuscatedCode";
    ServiceIdentifiers["IOptions"] = "IOptions";
    ServiceIdentifiers["IOptionsNormalizer"] = "IOptionsNormalizer";
    ServiceIdentifiers["IObfuscatingReplacer"] = "IObfuscatingReplacer";
    ServiceIdentifiers["IPrevailingKindOfVariablesAnalyzer"] = "IPrevailingKindOfVariablesAnalyzer";
    ServiceIdentifiers["IObjectExpressionExtractor"] = "IObjectExpressionExtractor";
    ServiceIdentifiers["IRandomGenerator"] = "IRandomGenerator";
    ServiceIdentifiers["IScopeIdentifiersTraverser"] = "IScopeIdentifiersTraverser";
    ServiceIdentifiers["ISourceCode"] = "ISourceCode";
    ServiceIdentifiers["ISourceMapCorrector"] = "ISourceMapCorrector";
    ServiceIdentifiers["IScopeAnalyzer"] = "IScopeAnalyzer";
    ServiceIdentifiers["IStringArrayStorage"] = "IStringArrayStorage";
    ServiceIdentifiers["IStringArrayStorageAnalyzer"] = "IStringArrayStorageAnalyzer";
    ServiceIdentifiers["ITransformersRunner"] = "ITransformersRunner";
    ServiceIdentifiers["Newable__ICustomNode"] = "Newable<ICustomNode>";
    ServiceIdentifiers["Newable__TControlFlowStorage"] = "Newable<TControlFlowStorage>";
    ServiceIdentifiers["TCustomNodeGroupStorage"] = "TCustomNodeGroupStorage";
    ServiceIdentifiers["TInputOptions"] = "TInputOptions";
})(ServiceIdentifiers = exports.ServiceIdentifiers || (exports.ServiceIdentifiers = {}));


/***/ }),

/***/ "./src/container/modules/analyzers/AnalyzersModule.ts":
/*!************************************************************!*\
  !*** ./src/container/modules/analyzers/AnalyzersModule.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const CalleeDataExtractor_1 = __webpack_require__(/*! ../../../enums/analyzers/calls-graph-analyzer/CalleeDataExtractor */ "./src/enums/analyzers/calls-graph-analyzer/CalleeDataExtractor.ts");
const CallsGraphAnalyzer_1 = __webpack_require__(/*! ../../../analyzers/calls-graph-analyzer/CallsGraphAnalyzer */ "./src/analyzers/calls-graph-analyzer/CallsGraphAnalyzer.ts");
const FunctionDeclarationCalleeDataExtractor_1 = __webpack_require__(/*! ../../../analyzers/calls-graph-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor */ "./src/analyzers/calls-graph-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor.ts");
const FunctionExpressionCalleeDataExtractor_1 = __webpack_require__(/*! ../../../analyzers/calls-graph-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor */ "./src/analyzers/calls-graph-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor.ts");
const ObjectExpressionCalleeDataExtractor_1 = __webpack_require__(/*! ../../../analyzers/calls-graph-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor */ "./src/analyzers/calls-graph-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor.ts");
const PrevailingKindOfVariablesAnalyzer_1 = __webpack_require__(/*! ../../../analyzers/prevailing-kind-of-variables-analyzer/PrevailingKindOfVariablesAnalyzer */ "./src/analyzers/prevailing-kind-of-variables-analyzer/PrevailingKindOfVariablesAnalyzer.ts");
const ScopeAnalyzer_1 = __webpack_require__(/*! ../../../analyzers/scope-analyzer/ScopeAnalyzer */ "./src/analyzers/scope-analyzer/ScopeAnalyzer.ts");
const StringArrayStorageAnalyzer_1 = __webpack_require__(/*! ../../../analyzers/string-array-storage-analyzer/StringArrayStorageAnalyzer */ "./src/analyzers/string-array-storage-analyzer/StringArrayStorageAnalyzer.ts");
exports.analyzersModule = new inversify_1.ContainerModule((bind) => {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICallsGraphAnalyzer)
        .to(CallsGraphAnalyzer_1.CallsGraphAnalyzer)
        .inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer)
        .to(PrevailingKindOfVariablesAnalyzer_1.PrevailingKindOfVariablesAnalyzer)
        .inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IScopeAnalyzer)
        .to(ScopeAnalyzer_1.ScopeAnalyzer)
        .inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IStringArrayStorageAnalyzer)
        .to(StringArrayStorageAnalyzer_1.StringArrayStorageAnalyzer)
        .inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor)
        .to(FunctionDeclarationCalleeDataExtractor_1.FunctionDeclarationCalleeDataExtractor)
        .whenTargetNamed(CalleeDataExtractor_1.CalleeDataExtractor.FunctionDeclarationCalleeDataExtractor);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor)
        .to(FunctionExpressionCalleeDataExtractor_1.FunctionExpressionCalleeDataExtractor)
        .whenTargetNamed(CalleeDataExtractor_1.CalleeDataExtractor.FunctionExpressionCalleeDataExtractor);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor)
        .to(ObjectExpressionCalleeDataExtractor_1.ObjectExpressionCalleeDataExtractor)
        .whenTargetNamed(CalleeDataExtractor_1.CalleeDataExtractor.ObjectExpressionCalleeDataExtractor);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICalleeDataExtractor)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor));
});


/***/ }),

/***/ "./src/container/modules/custom-nodes/CustomNodesModule.ts":
/*!*****************************************************************!*\
  !*** ./src/container/modules/custom-nodes/CustomNodesModule.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const ControlFlowCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");
const CustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/CustomNode */ "./src/enums/custom-nodes/CustomNode.ts");
const CustomNodeGroup_1 = __webpack_require__(/*! ../../../enums/custom-nodes/CustomNodeGroup */ "./src/enums/custom-nodes/CustomNodeGroup.ts");
const DeadCodeInjectionCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/DeadCodeInjectionCustomNode */ "./src/enums/custom-nodes/DeadCodeInjectionCustomNode.ts");
const ObjectExpressionKeysTransformerCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ObjectExpressionKeysTransformerCustomNode */ "./src/enums/custom-nodes/ObjectExpressionKeysTransformerCustomNode.ts");
const ConsoleOutputCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/console-output-nodes/group/ConsoleOutputCustomNodeGroup */ "./src/custom-nodes/console-output-nodes/group/ConsoleOutputCustomNodeGroup.ts");
const DebugProtectionCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/debug-protection-nodes/group/DebugProtectionCustomNodeGroup */ "./src/custom-nodes/debug-protection-nodes/group/DebugProtectionCustomNodeGroup.ts");
const DomainLockCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/domain-lock-nodes/group/DomainLockCustomNodeGroup */ "./src/custom-nodes/domain-lock-nodes/group/DomainLockCustomNodeGroup.ts");
const SelfDefendingCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/self-defending-nodes/group/SelfDefendingCustomNodeGroup */ "./src/custom-nodes/self-defending-nodes/group/SelfDefendingCustomNodeGroup.ts");
const StringArrayCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/string-array-nodes/group/StringArrayCustomNodeGroup */ "./src/custom-nodes/string-array-nodes/group/StringArrayCustomNodeGroup.ts");
const ObjectExpressionVariableDeclarationHostNode_1 = __webpack_require__(/*! ../../../custom-nodes/object-expression-keys-transformer-nodes/ObjectExpressionVariableDeclarationHostNode */ "./src/custom-nodes/object-expression-keys-transformer-nodes/ObjectExpressionVariableDeclarationHostNode.ts");
const BinaryExpressionFunctionNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/BinaryExpressionFunctionNode */ "./src/custom-nodes/control-flow-flattening-nodes/BinaryExpressionFunctionNode.ts");
const BlockStatementControlFlowFlatteningNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/BlockStatementControlFlowFlatteningNode */ "./src/custom-nodes/control-flow-flattening-nodes/BlockStatementControlFlowFlatteningNode.ts");
const BlockStatementDeadCodeInjectionNode_1 = __webpack_require__(/*! ../../../custom-nodes/dead-code-injection-nodes/BlockStatementDeadCodeInjectionNode */ "./src/custom-nodes/dead-code-injection-nodes/BlockStatementDeadCodeInjectionNode.ts");
const CallExpressionControlFlowStorageCallNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode */ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode.ts");
const CallExpressionFunctionNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode */ "./src/custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode.ts");
const ControlFlowStorageNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode */ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode.ts");
const ConsoleOutputDisableExpressionNode_1 = __webpack_require__(/*! ../../../custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode */ "./src/custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode.ts");
const CustomNodeFormatter_1 = __webpack_require__(/*! ../../../custom-nodes/CustomNodeFormatter */ "./src/custom-nodes/CustomNodeFormatter.ts");
const DebugProtectionFunctionCallNode_1 = __webpack_require__(/*! ../../../custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode */ "./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode.ts");
const DebugProtectionFunctionIntervalNode_1 = __webpack_require__(/*! ../../../custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode */ "./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode.ts");
const DebugProtectionFunctionNode_1 = __webpack_require__(/*! ../../../custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode */ "./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode.ts");
const DomainLockNode_1 = __webpack_require__(/*! ../../../custom-nodes/domain-lock-nodes/DomainLockNode */ "./src/custom-nodes/domain-lock-nodes/DomainLockNode.ts");
const ExpressionWithOperatorControlFlowStorageCallNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ExpressionWithOperatorControlFlowStorageCallNode */ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ExpressionWithOperatorControlFlowStorageCallNode.ts");
const LogicalExpressionFunctionNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/LogicalExpressionFunctionNode */ "./src/custom-nodes/control-flow-flattening-nodes/LogicalExpressionFunctionNode.ts");
const NodeCallsControllerFunctionNode_1 = __webpack_require__(/*! ../../../custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode */ "./src/custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode.ts");
const SelfDefendingUnicodeNode_1 = __webpack_require__(/*! ../../../custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode */ "./src/custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode.ts");
const StringArrayCallsWrapper_1 = __webpack_require__(/*! ../../../custom-nodes/string-array-nodes/StringArrayCallsWrapper */ "./src/custom-nodes/string-array-nodes/StringArrayCallsWrapper.ts");
const StringArrayNode_1 = __webpack_require__(/*! ../../../custom-nodes/string-array-nodes/StringArrayNode */ "./src/custom-nodes/string-array-nodes/StringArrayNode.ts");
const StringArrayRotateFunctionNode_1 = __webpack_require__(/*! ../../../custom-nodes/string-array-nodes/StringArrayRotateFunctionNode */ "./src/custom-nodes/string-array-nodes/StringArrayRotateFunctionNode.ts");
const StringLiteralControlFlowStorageCallNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/StringLiteralControlFlowStorageCallNode */ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/StringLiteralControlFlowStorageCallNode.ts");
const StringLiteralNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/StringLiteralNode */ "./src/custom-nodes/control-flow-flattening-nodes/StringLiteralNode.ts");
exports.customNodesModule = new inversify_1.ContainerModule((bind) => {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode)
        .to(ConsoleOutputDisableExpressionNode_1.ConsoleOutputDisableExpressionNode)
        .whenTargetNamed(CustomNode_1.CustomNode.ConsoleOutputDisableExpressionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode)
        .to(DebugProtectionFunctionCallNode_1.DebugProtectionFunctionCallNode)
        .whenTargetNamed(CustomNode_1.CustomNode.DebugProtectionFunctionCallNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode)
        .to(DebugProtectionFunctionIntervalNode_1.DebugProtectionFunctionIntervalNode)
        .whenTargetNamed(CustomNode_1.CustomNode.DebugProtectionFunctionIntervalNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode)
        .to(DebugProtectionFunctionNode_1.DebugProtectionFunctionNode)
        .whenTargetNamed(CustomNode_1.CustomNode.DebugProtectionFunctionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode)
        .to(DomainLockNode_1.DomainLockNode)
        .whenTargetNamed(CustomNode_1.CustomNode.DomainLockNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode)
        .to(NodeCallsControllerFunctionNode_1.NodeCallsControllerFunctionNode)
        .whenTargetNamed(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode)
        .to(SelfDefendingUnicodeNode_1.SelfDefendingUnicodeNode)
        .whenTargetNamed(CustomNode_1.CustomNode.SelfDefendingUnicodeNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode)
        .to(StringArrayCallsWrapper_1.StringArrayCallsWrapper)
        .whenTargetNamed(CustomNode_1.CustomNode.StringArrayCallsWrapper);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode)
        .to(StringArrayNode_1.StringArrayNode)
        .whenTargetNamed(CustomNode_1.CustomNode.StringArrayNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode)
        .to(StringArrayRotateFunctionNode_1.StringArrayRotateFunctionNode)
        .whenTargetNamed(CustomNode_1.CustomNode.StringArrayRotateFunctionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(BinaryExpressionFunctionNode_1.BinaryExpressionFunctionNode)
        .whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.BinaryExpressionFunctionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(BlockStatementControlFlowFlatteningNode_1.BlockStatementControlFlowFlatteningNode)
        .whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.BlockStatementControlFlowFlatteningNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(CallExpressionControlFlowStorageCallNode_1.CallExpressionControlFlowStorageCallNode)
        .whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.CallExpressionControlFlowStorageCallNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(CallExpressionFunctionNode_1.CallExpressionFunctionNode)
        .whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.CallExpressionFunctionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(ControlFlowStorageNode_1.ControlFlowStorageNode)
        .whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.ControlFlowStorageNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(ExpressionWithOperatorControlFlowStorageCallNode_1.ExpressionWithOperatorControlFlowStorageCallNode)
        .whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.ExpressionWithOperatorControlFlowStorageCallNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(LogicalExpressionFunctionNode_1.LogicalExpressionFunctionNode)
        .whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.LogicalExpressionFunctionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(StringLiteralNode_1.StringLiteralNode)
        .whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.StringLiteralNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(StringLiteralControlFlowStorageCallNode_1.StringLiteralControlFlowStorageCallNode)
        .whenTargetNamed(ControlFlowCustomNode_1.ControlFlowCustomNode.StringLiteralControlFlowStorageCallNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(BlockStatementDeadCodeInjectionNode_1.BlockStatementDeadCodeInjectionNode)
        .whenTargetNamed(DeadCodeInjectionCustomNode_1.DeadCodeInjectionCustomNode.BlockStatementDeadCodeInjectionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(ObjectExpressionVariableDeclarationHostNode_1.ObjectExpressionVariableDeclarationHostNode)
        .whenTargetNamed(ObjectExpressionKeysTransformerCustomNode_1.ObjectExpressionKeysTransformerCustomNode.ObjectExpressionVariableDeclarationHostNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup)
        .to(ConsoleOutputCustomNodeGroup_1.ConsoleOutputCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.ConsoleOutputCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup)
        .to(DebugProtectionCustomNodeGroup_1.DebugProtectionCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.DebugProtectionCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup)
        .to(DomainLockCustomNodeGroup_1.DomainLockCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.DomainLockCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup)
        .to(SelfDefendingCustomNodeGroup_1.SelfDefendingCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.SelfDefendingCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup)
        .to(StringArrayCustomNodeGroup_1.StringArrayCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.StringArrayCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getFactory(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode));
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getConstructorFactory(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode, ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator, ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter, ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator, ServiceIdentifiers_1.ServiceIdentifiers.IOptions, ServiceIdentifiers_1.ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer));
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IDeadCodeInjectionCustomNode)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getConstructorFactory(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode, ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator, ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter, ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator, ServiceIdentifiers_1.ServiceIdentifiers.IOptions));
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObjectExpressionKeysTransformerCustomNode)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getConstructorFactory(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode, ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator, ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter, ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator, ServiceIdentifiers_1.ServiceIdentifiers.IOptions, ServiceIdentifiers_1.ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer));
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNodeGroup)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getFactory(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup));
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)
        .to(CustomNodeFormatter_1.CustomNodeFormatter)
        .inSingletonScope();
});


/***/ }),

/***/ "./src/container/modules/generators/GeneratorsModule.ts":
/*!**************************************************************!*\
  !*** ./src/container/modules/generators/GeneratorsModule.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IdentifierNamesGenerator_1 = __webpack_require__(/*! ../../../enums/generators/identifier-names-generators/IdentifierNamesGenerator */ "./src/enums/generators/identifier-names-generators/IdentifierNamesGenerator.ts");
const DictionaryIdentifierNamesGenerator_1 = __webpack_require__(/*! ../../../generators/identifier-names-generators/DictionaryIdentifierNamesGenerator */ "./src/generators/identifier-names-generators/DictionaryIdentifierNamesGenerator.ts");
const HexadecimalIdentifierNamesGenerator_1 = __webpack_require__(/*! ../../../generators/identifier-names-generators/HexadecimalIdentifierNamesGenerator */ "./src/generators/identifier-names-generators/HexadecimalIdentifierNamesGenerator.ts");
const MangledIdentifierNamesGenerator_1 = __webpack_require__(/*! ../../../generators/identifier-names-generators/MangledIdentifierNamesGenerator */ "./src/generators/identifier-names-generators/MangledIdentifierNamesGenerator.ts");
exports.generatorsModule = new inversify_1.ContainerModule((bind) => {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IIdentifierNamesGenerator)
        .to(DictionaryIdentifierNamesGenerator_1.DictionaryIdentifierNamesGenerator)
        .inSingletonScope()
        .whenTargetNamed(IdentifierNamesGenerator_1.IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IIdentifierNamesGenerator)
        .to(HexadecimalIdentifierNamesGenerator_1.HexadecimalIdentifierNamesGenerator)
        .inSingletonScope()
        .whenTargetNamed(IdentifierNamesGenerator_1.IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IIdentifierNamesGenerator)
        .to(MangledIdentifierNamesGenerator_1.MangledIdentifierNamesGenerator)
        .inSingletonScope()
        .whenTargetNamed(IdentifierNamesGenerator_1.IdentifierNamesGenerator.MangledIdentifierNamesGenerator);
    function identifierNameGeneratorFactory() {
        let cachedIdentifierNamesGenerator = null;
        return (context) => (options) => {
            if (cachedIdentifierNamesGenerator) {
                return cachedIdentifierNamesGenerator;
            }
            let identifierNamesGenerator;
            switch (options.identifierNamesGenerator) {
                case IdentifierNamesGenerator_1.IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator:
                    identifierNamesGenerator = context.container.getNamed(ServiceIdentifiers_1.ServiceIdentifiers.IIdentifierNamesGenerator, IdentifierNamesGenerator_1.IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator);
                    break;
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
    }
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
        .toFactory(identifierNameGeneratorFactory());
});


/***/ }),

/***/ "./src/container/modules/node-transformers/ControlFlowTransformersModule.ts":
/*!**********************************************************************************!*\
  !*** ./src/container/modules/node-transformers/ControlFlowTransformersModule.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const ControlFlowReplacer_1 = __webpack_require__(/*! ../../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer.ts");
const NodeTransformer_1 = __webpack_require__(/*! ../../../enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");
const BinaryExpressionControlFlowReplacer_1 = __webpack_require__(/*! ../../../node-transformers/control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer.ts");
const BlockStatementControlFlowTransformer_1 = __webpack_require__(/*! ../../../node-transformers/control-flow-transformers/BlockStatementControlFlowTransformer */ "./src/node-transformers/control-flow-transformers/BlockStatementControlFlowTransformer.ts");
const CallExpressionControlFlowReplacer_1 = __webpack_require__(/*! ../../../node-transformers/control-flow-transformers/control-flow-replacers/CallExpressionControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/CallExpressionControlFlowReplacer.ts");
const DeadCodeInjectionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer */ "./src/node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer.ts");
const FunctionControlFlowTransformer_1 = __webpack_require__(/*! ../../../node-transformers/control-flow-transformers/FunctionControlFlowTransformer */ "./src/node-transformers/control-flow-transformers/FunctionControlFlowTransformer.ts");
const LogicalExpressionControlFlowReplacer_1 = __webpack_require__(/*! ../../../node-transformers/control-flow-transformers/control-flow-replacers/LogicalExpressionControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/LogicalExpressionControlFlowReplacer.ts");
const StringLiteralControlFlowReplacer_1 = __webpack_require__(/*! ../../../node-transformers/control-flow-transformers/control-flow-replacers/StringLiteralControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/StringLiteralControlFlowReplacer.ts");
exports.controlFlowTransformersModule = new inversify_1.ContainerModule((bind) => {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(BlockStatementControlFlowTransformer_1.BlockStatementControlFlowTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.BlockStatementControlFlowTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(DeadCodeInjectionTransformer_1.DeadCodeInjectionTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.DeadCodeInjectionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(FunctionControlFlowTransformer_1.FunctionControlFlowTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.FunctionControlFlowTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer)
        .to(BinaryExpressionControlFlowReplacer_1.BinaryExpressionControlFlowReplacer)
        .whenTargetNamed(ControlFlowReplacer_1.ControlFlowReplacer.BinaryExpressionControlFlowReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer)
        .to(CallExpressionControlFlowReplacer_1.CallExpressionControlFlowReplacer)
        .whenTargetNamed(ControlFlowReplacer_1.ControlFlowReplacer.CallExpressionControlFlowReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer)
        .to(LogicalExpressionControlFlowReplacer_1.LogicalExpressionControlFlowReplacer)
        .whenTargetNamed(ControlFlowReplacer_1.ControlFlowReplacer.LogicalExpressionControlFlowReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer)
        .to(StringLiteralControlFlowReplacer_1.StringLiteralControlFlowReplacer)
        .whenTargetNamed(ControlFlowReplacer_1.ControlFlowReplacer.StringLiteralControlFlowReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowReplacer)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer));
});


/***/ }),

/***/ "./src/container/modules/node-transformers/ConvertingTransformersModule.ts":
/*!*********************************************************************************!*\
  !*** ./src/container/modules/node-transformers/ConvertingTransformersModule.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const NodeTransformer_1 = __webpack_require__(/*! ../../../enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");
const ObjectExpressionExtractor_1 = __webpack_require__(/*! ../../../enums/node-transformers/converting-transformers/properties-extractors/ObjectExpressionExtractor */ "./src/enums/node-transformers/converting-transformers/properties-extractors/ObjectExpressionExtractor.ts");
const ObjectExpressionToVariableDeclarationExtractor_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/object-expression-extractors/ObjectExpressionToVariableDeclarationExtractor */ "./src/node-transformers/converting-transformers/object-expression-extractors/ObjectExpressionToVariableDeclarationExtractor.ts");
const MemberExpressionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/MemberExpressionTransformer */ "./src/node-transformers/converting-transformers/MemberExpressionTransformer.ts");
const MethodDefinitionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/MethodDefinitionTransformer */ "./src/node-transformers/converting-transformers/MethodDefinitionTransformer.ts");
const ObjectExpressionKeysTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/ObjectExpressionKeysTransformer */ "./src/node-transformers/converting-transformers/ObjectExpressionKeysTransformer.ts");
const ObjectExpressionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/ObjectExpressionTransformer */ "./src/node-transformers/converting-transformers/ObjectExpressionTransformer.ts");
const SplitStringTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/SplitStringTransformer */ "./src/node-transformers/converting-transformers/SplitStringTransformer.ts");
const TemplateLiteralTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/TemplateLiteralTransformer */ "./src/node-transformers/converting-transformers/TemplateLiteralTransformer.ts");
const BasePropertiesExtractor_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/object-expression-extractors/BasePropertiesExtractor */ "./src/node-transformers/converting-transformers/object-expression-extractors/BasePropertiesExtractor.ts");
exports.convertingTransformersModule = new inversify_1.ContainerModule((bind) => {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(MemberExpressionTransformer_1.MemberExpressionTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.MemberExpressionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(MethodDefinitionTransformer_1.MethodDefinitionTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.MethodDefinitionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(ObjectExpressionKeysTransformer_1.ObjectExpressionKeysTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.ObjectExpressionKeysTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(ObjectExpressionTransformer_1.ObjectExpressionTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.ObjectExpressionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(SplitStringTransformer_1.SplitStringTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.SplitStringTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(TemplateLiteralTransformer_1.TemplateLiteralTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.TemplateLiteralTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IObjectExpressionExtractor)
        .to(ObjectExpressionToVariableDeclarationExtractor_1.ObjectExpressionToVariableDeclarationExtractor)
        .whenTargetNamed(ObjectExpressionExtractor_1.ObjectExpressionExtractor.ObjectExpressionToVariableDeclarationExtractor);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IObjectExpressionExtractor)
        .to(BasePropertiesExtractor_1.BasePropertiesExtractor)
        .whenTargetNamed(ObjectExpressionExtractor_1.ObjectExpressionExtractor.BasePropertiesExtractor);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObjectExpressionExtractor)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.IObjectExpressionExtractor));
});


/***/ }),

/***/ "./src/container/modules/node-transformers/FinalizingTransformersModule.ts":
/*!*********************************************************************************!*\
  !*** ./src/container/modules/node-transformers/FinalizingTransformersModule.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
exports.finalizingTransformersModule = new inversify_1.ContainerModule((bind) => {
});


/***/ }),

/***/ "./src/container/modules/node-transformers/NodeTransformersModule.ts":
/*!***************************************************************************!*\
  !*** ./src/container/modules/node-transformers/NodeTransformersModule.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
exports.nodeTransformersModule = new inversify_1.ContainerModule((bind) => {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeTransformer)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer));
});


/***/ }),

/***/ "./src/container/modules/node-transformers/ObfuscatingTransformersModule.ts":
/*!**********************************************************************************!*\
  !*** ./src/container/modules/node-transformers/ObfuscatingTransformersModule.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");
const LiteralObfuscatingReplacer_1 = __webpack_require__(/*! ../../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer.ts");
const NodeTransformer_1 = __webpack_require__(/*! ../../../enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");
const BaseIdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/obfuscating-replacers/identifier-obfuscating-replacers/BaseIdentifierObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/identifier-obfuscating-replacers/BaseIdentifierObfuscatingReplacer.ts");
const BooleanLiteralObfuscatingReplacer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/BooleanLiteralObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/BooleanLiteralObfuscatingReplacer.ts");
const LabeledStatementTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/LabeledStatementTransformer */ "./src/node-transformers/obfuscating-transformers/LabeledStatementTransformer.ts");
const LiteralTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/LiteralTransformer */ "./src/node-transformers/obfuscating-transformers/LiteralTransformer.ts");
const NumberLiteralObfuscatingReplacer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/NumberLiteralObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/NumberLiteralObfuscatingReplacer.ts");
const StringLiteralObfuscatingReplacer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/StringLiteralObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/StringLiteralObfuscatingReplacer.ts");
const ScopeIdentifiersTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/ScopeIdentifiersTransformer */ "./src/node-transformers/obfuscating-transformers/ScopeIdentifiersTransformer.ts");
exports.obfuscatingTransformersModule = new inversify_1.ContainerModule((bind) => {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(LabeledStatementTransformer_1.LabeledStatementTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.LabeledStatementTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(LiteralTransformer_1.LiteralTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.LiteralTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(ScopeIdentifiersTransformer_1.ScopeIdentifiersTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.ScopeIdentifiersTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatingReplacer)
        .to(BooleanLiteralObfuscatingReplacer_1.BooleanLiteralObfuscatingReplacer)
        .whenTargetNamed(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.BooleanLiteralObfuscatingReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatingReplacer)
        .to(NumberLiteralObfuscatingReplacer_1.NumberLiteralObfuscatingReplacer)
        .whenTargetNamed(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.NumberLiteralObfuscatingReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatingReplacer)
        .to(StringLiteralObfuscatingReplacer_1.StringLiteralObfuscatingReplacer)
        .whenTargetNamed(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.StringLiteralObfuscatingReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IIdentifierObfuscatingReplacer)
        .to(BaseIdentifierObfuscatingReplacer_1.BaseIdentifierObfuscatingReplacer)
        .whenTargetNamed(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatingReplacer)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatingReplacer));
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.IIdentifierObfuscatingReplacer));
});


/***/ }),

/***/ "./src/container/modules/node-transformers/PreparingTransformersModule.ts":
/*!********************************************************************************!*\
  !*** ./src/container/modules/node-transformers/PreparingTransformersModule.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const NodeTransformer_1 = __webpack_require__(/*! ../../../enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");
const ObfuscatingGuard_1 = __webpack_require__(/*! ../../../enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard */ "./src/enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard.ts");
const BlackListObfuscatingGuard_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/obfuscating-guards/BlackListObfuscatingGuard */ "./src/node-transformers/preparing-transformers/obfuscating-guards/BlackListObfuscatingGuard.ts");
const CommentsTransformer_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/CommentsTransformer */ "./src/node-transformers/preparing-transformers/CommentsTransformer.ts");
const ConditionalCommentObfuscatingGuard_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/obfuscating-guards/ConditionalCommentObfuscatingGuard */ "./src/node-transformers/preparing-transformers/obfuscating-guards/ConditionalCommentObfuscatingGuard.ts");
const CustomNodesTransformer_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/CustomNodesTransformer */ "./src/node-transformers/preparing-transformers/CustomNodesTransformer.ts");
const EvalCallExpressionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/EvalCallExpressionTransformer */ "./src/node-transformers/preparing-transformers/EvalCallExpressionTransformer.ts");
const MetadataTransformer_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/MetadataTransformer */ "./src/node-transformers/preparing-transformers/MetadataTransformer.ts");
const ObfuscatingGuardsTransformer_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/ObfuscatingGuardsTransformer */ "./src/node-transformers/preparing-transformers/ObfuscatingGuardsTransformer.ts");
const ParentificationTransformer_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/ParentificationTransformer */ "./src/node-transformers/preparing-transformers/ParentificationTransformer.ts");
const ReservedStringObfuscatingGuard_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/obfuscating-guards/ReservedStringObfuscatingGuard */ "./src/node-transformers/preparing-transformers/obfuscating-guards/ReservedStringObfuscatingGuard.ts");
const VariablePreserveTransformer_1 = __webpack_require__(/*! ../../../node-transformers/preparing-transformers/VariablePreserveTransformer */ "./src/node-transformers/preparing-transformers/VariablePreserveTransformer.ts");
exports.preparingTransformersModule = new inversify_1.ContainerModule((bind) => {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(CommentsTransformer_1.CommentsTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.CommentsTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(CustomNodesTransformer_1.CustomNodesTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.CustomNodesTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(EvalCallExpressionTransformer_1.EvalCallExpressionTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.EvalCallExpressionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(MetadataTransformer_1.MetadataTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.MetadataTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(ObfuscatingGuardsTransformer_1.ObfuscatingGuardsTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.ObfuscatingGuardsTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(ParentificationTransformer_1.ParentificationTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.ParentificationTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeGuard)
        .to(BlackListObfuscatingGuard_1.BlackListObfuscatingGuard)
        .inSingletonScope()
        .whenTargetNamed(ObfuscatingGuard_1.ObfuscatingGuard.BlackListObfuscatingGuard);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeGuard)
        .to(ConditionalCommentObfuscatingGuard_1.ConditionalCommentObfuscatingGuard)
        .inSingletonScope()
        .whenTargetNamed(ObfuscatingGuard_1.ObfuscatingGuard.ConditionalCommentObfuscatingGuard);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeGuard)
        .to(ReservedStringObfuscatingGuard_1.ReservedStringObfuscatingGuard)
        .inSingletonScope()
        .whenTargetNamed(ObfuscatingGuard_1.ObfuscatingGuard.ReservedStringObfuscatingGuard);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeGuard)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.INodeGuard));
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(VariablePreserveTransformer_1.VariablePreserveTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.VariablePreserveTransformer);
});


/***/ }),

/***/ "./src/container/modules/node/NodeModule.ts":
/*!**************************************************!*\
  !*** ./src/container/modules/node/NodeModule.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const ScopeIdentifiersTraverser_1 = __webpack_require__(/*! ../../../node/ScopeIdentifiersTraverser */ "./src/node/ScopeIdentifiersTraverser.ts");
exports.nodeModule = new inversify_1.ContainerModule((bind) => {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IScopeIdentifiersTraverser)
        .to(ScopeIdentifiersTraverser_1.ScopeIdentifiersTraverser)
        .inSingletonScope();
});


/***/ }),

/***/ "./src/container/modules/options/OptionsModule.ts":
/*!********************************************************!*\
  !*** ./src/container/modules/options/OptionsModule.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const Options_1 = __webpack_require__(/*! ../../../options/Options */ "./src/options/Options.ts");
const OptionsNormalizer_1 = __webpack_require__(/*! ../../../options/OptionsNormalizer */ "./src/options/OptionsNormalizer.ts");
exports.optionsModule = new inversify_1.ContainerModule((bind) => {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)
        .to(Options_1.Options)
        .inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IOptionsNormalizer)
        .to(OptionsNormalizer_1.OptionsNormalizer)
        .inSingletonScope();
});


/***/ }),

/***/ "./src/container/modules/storages/StoragesModule.ts":
/*!**********************************************************!*\
  !*** ./src/container/modules/storages/StoragesModule.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const ControlFlowStorage_1 = __webpack_require__(/*! ../../../storages/control-flow/ControlFlowStorage */ "./src/storages/control-flow/ControlFlowStorage.ts");
const CustomNodeGroupStorage_1 = __webpack_require__(/*! ../../../storages/custom-node-group/CustomNodeGroupStorage */ "./src/storages/custom-node-group/CustomNodeGroupStorage.ts");
const StringArrayStorage_1 = __webpack_require__(/*! ../../../storages/string-array/StringArrayStorage */ "./src/storages/string-array/StringArrayStorage.ts");
exports.storagesModule = new inversify_1.ContainerModule((bind) => {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.TCustomNodeGroupStorage)
        .to(CustomNodeGroupStorage_1.CustomNodeGroupStorage)
        .inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IStringArrayStorage)
        .to(StringArrayStorage_1.StringArrayStorage)
        .inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__TControlFlowStorage)
        .toConstructor(ControlFlowStorage_1.ControlFlowStorage);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__TControlFlowStorage)
        .toFactory((context) => {
        return () => {
            const constructor = context.container
                .get(ServiceIdentifiers_1.ServiceIdentifiers.Newable__TControlFlowStorage);
            const randomGenerator = context.container
                .get(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator);
            const options = context.container
                .get(ServiceIdentifiers_1.ServiceIdentifiers.IOptions);
            const storage = new constructor(randomGenerator, options);
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

Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const ArrayUtils_1 = __webpack_require__(/*! ../../../utils/ArrayUtils */ "./src/utils/ArrayUtils.ts");
const CryptUtils_1 = __webpack_require__(/*! ../../../utils/CryptUtils */ "./src/utils/CryptUtils.ts");
const EscapeSequenceEncoder_1 = __webpack_require__(/*! ../../../utils/EscapeSequenceEncoder */ "./src/utils/EscapeSequenceEncoder.ts");
const LevelledTopologicalSorter_1 = __webpack_require__(/*! ../../../utils/LevelledTopologicalSorter */ "./src/utils/LevelledTopologicalSorter.ts");
const NodeTransformerNamesGroupsBuilder_1 = __webpack_require__(/*! ../../../utils/NodeTransformerNamesGroupsBuilder */ "./src/utils/NodeTransformerNamesGroupsBuilder.ts");
const RandomGenerator_1 = __webpack_require__(/*! ../../../utils/RandomGenerator */ "./src/utils/RandomGenerator.ts");
exports.utilsModule = new inversify_1.ContainerModule((bind) => {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IArrayUtils)
        .to(ArrayUtils_1.ArrayUtils)
        .inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)
        .to(RandomGenerator_1.RandomGenerator)
        .inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils)
        .to(CryptUtils_1.CryptUtils)
        .inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)
        .to(EscapeSequenceEncoder_1.EscapeSequenceEncoder)
        .inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ILevelledTopologicalSorter)
        .to(LevelledTopologicalSorter_1.LevelledTopologicalSorter);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformerNamesGroupsBuilder)
        .to(NodeTransformerNamesGroupsBuilder_1.NodeTransformerNamesGroupsBuilder)
        .inSingletonScope();
});


/***/ }),

/***/ "./src/custom-nodes/AbstractCustomNode.ts":
/*!************************************************!*\
  !*** ./src/custom-nodes/AbstractCustomNode.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AbstractCustomNode_1, _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const GlobalVariableTemplate1_1 = __webpack_require__(/*! ../templates/GlobalVariableTemplate1 */ "./src/templates/GlobalVariableTemplate1.ts");
const GlobalVariableTemplate2_1 = __webpack_require__(/*! ../templates/GlobalVariableTemplate2 */ "./src/templates/GlobalVariableTemplate2.ts");
const NoCustomNodes_1 = __webpack_require__(/*! ../options/presets/NoCustomNodes */ "./src/options/presets/NoCustomNodes.ts");
const JavaScriptObfuscatorFacade_1 = __webpack_require__(/*! ../JavaScriptObfuscatorFacade */ "./src/JavaScriptObfuscatorFacade.ts");
let AbstractCustomNode = AbstractCustomNode_1 = class AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        this.cachedNode = null;
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.customNodeFormatter = customNodeFormatter;
        this.randomGenerator = randomGenerator;
        this.options = options;
    }
    getNode() {
        if (!this.cachedNode) {
            const nodeTemplate = this.getNodeTemplate();
            this.cachedNode = this.customNodeFormatter.formatStructure(this.getNodeStructure(nodeTemplate));
        }
        return this.cachedNode;
    }
    getGlobalVariableTemplate() {
        return this.randomGenerator
            .getRandomGenerator()
            .pickone(AbstractCustomNode_1.globalVariableTemplateFunctions);
    }
    getNodeTemplate() {
        return '';
    }
    obfuscateTemplate(template, options = {}) {
        const reservedNames = this.getPreservedNames(options.reservedNames);
        return JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(template, Object.assign(Object.assign(Object.assign(Object.assign({}, NoCustomNodes_1.NO_ADDITIONAL_NODES_PRESET), { identifierNamesGenerator: this.options.identifierNamesGenerator, identifiersDictionary: this.options.identifiersDictionary, seed: this.randomGenerator.getRawSeed() }), options), { reservedNames })).getObfuscatedCode();
    }
    getPreservedNames(additionalNames = []) {
        return Array
            .from(new Set([
            ...Array.from(this.identifierNamesGenerator.getPreservedNames().values()),
            ...additionalNames
        ])
            .values())
            .map((preservedName) => `^${preservedName}$`);
    }
};
AbstractCustomNode.globalVariableTemplateFunctions = [
    GlobalVariableTemplate1_1.GlobalVariableTemplate1(),
    GlobalVariableTemplate2_1.GlobalVariableTemplate2()
];
AbstractCustomNode = AbstractCustomNode_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], AbstractCustomNode);
exports.AbstractCustomNode = AbstractCustomNode;


/***/ }),

/***/ "./src/custom-nodes/AbstractCustomNodeGroup.ts":
/*!*****************************************************!*\
  !*** ./src/custom-nodes/AbstractCustomNodeGroup.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
let AbstractCustomNodeGroup = class AbstractCustomNodeGroup {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.randomGenerator = randomGenerator;
        this.options = options;
    }
    getAppendEvent() {
        return this.appendEvent;
    }
    getCustomNodes() {
        return this.customNodes;
    }
    appendCustomNodeIfExist(customNodeName, callback) {
        const customNode = this.customNodes.get(customNodeName);
        if (!customNode) {
            return;
        }
        callback(customNode);
    }
    getRandomCallsGraphIndex(callsGraphLength) {
        return this.randomGenerator.getRandomInteger(0, Math.max(0, Math.round(callsGraphLength - 1)));
    }
};
AbstractCustomNodeGroup = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], AbstractCustomNodeGroup);
exports.AbstractCustomNodeGroup = AbstractCustomNodeGroup;


/***/ }),

/***/ "./src/custom-nodes/CustomNodeFormatter.ts":
/*!*************************************************!*\
  !*** ./src/custom-nodes/CustomNodeFormatter.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const string_template_1 = __importDefault(__webpack_require__(/*! string-template */ "string-template"));
const IPrevailingKindOfVariablesAnalyzer_1 = __webpack_require__(/*! ../interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer */ "./src/interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../node/NodeGuards */ "./src/node/NodeGuards.ts");
let CustomNodeFormatter = class CustomNodeFormatter {
    constructor(prevailingKindOfVariablesAnalyzer) {
        this.prevailingKindOfVariables = prevailingKindOfVariablesAnalyzer.getPrevailingKind();
    }
    formatTemplate(template, mapping) {
        return string_template_1.default(template, mapping);
    }
    formatStructure(statements) {
        for (const statement of statements) {
            estraverse.replace(statement, {
                enter: (node) => {
                    if (!NodeGuards_1.NodeGuards.isVariableDeclarationNode(node)) {
                        return;
                    }
                    if (this.prevailingKindOfVariables === 'var') {
                        node.kind = 'var';
                    }
                    return node;
                }
            });
        }
        return statements;
    }
};
CustomNodeFormatter = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer)),
    __metadata("design:paramtypes", [typeof (_a = typeof IPrevailingKindOfVariablesAnalyzer_1.IPrevailingKindOfVariablesAnalyzer !== "undefined" && IPrevailingKindOfVariablesAnalyzer_1.IPrevailingKindOfVariablesAnalyzer) === "function" ? _a : Object])
], CustomNodeFormatter);
exports.CustomNodeFormatter = CustomNodeFormatter;


/***/ }),

/***/ "./src/custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode.ts":
/*!*************************************************************************************!*\
  !*** ./src/custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode.ts ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");
const ConsoleOutputDisableExpressionTemplate_1 = __webpack_require__(/*! ../../templates/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate */ "./src/templates/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate.ts");
const GlobalVariableNoEvalTemplate_1 = __webpack_require__(/*! ../../templates/GlobalVariableNoEvalTemplate */ "./src/templates/GlobalVariableNoEvalTemplate.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let ConsoleOutputDisableExpressionNode = class ConsoleOutputDisableExpressionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(callsControllerFunctionName) {
        this.callsControllerFunctionName = callsControllerFunctionName;
    }
    getNodeStructure(nodeTemplate) {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(nodeTemplate);
    }
    getNodeTemplate() {
        const globalVariableTemplate = this.options.target !== ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval
            ? this.getGlobalVariableTemplate()
            : GlobalVariableNoEvalTemplate_1.GlobalVariableNoEvalTemplate();
        return this.customNodeFormatter.formatTemplate(ConsoleOutputDisableExpressionTemplate_1.ConsoleOutputDisableExpressionTemplate(), {
            consoleLogDisableFunctionName: this.identifierNamesGenerator.generate(),
            globalVariableTemplate,
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], ConsoleOutputDisableExpressionNode.prototype, "callsControllerFunctionName", void 0);
ConsoleOutputDisableExpressionNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], ConsoleOutputDisableExpressionNode);
exports.ConsoleOutputDisableExpressionNode = ConsoleOutputDisableExpressionNode;


/***/ }),

/***/ "./src/custom-nodes/console-output-nodes/group/ConsoleOutputCustomNodeGroup.ts":
/*!*************************************************************************************!*\
  !*** ./src/custom-nodes/console-output-nodes/group/ConsoleOutputCustomNodeGroup.ts ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TCustomNodeFactory_1 = __webpack_require__(/*! ../../../types/container/custom-nodes/TCustomNodeFactory */ "./src/types/container/custom-nodes/TCustomNodeFactory.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const CustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/CustomNode */ "./src/enums/custom-nodes/CustomNode.ts");
const ObfuscationEvent_1 = __webpack_require__(/*! ../../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");
const AbstractCustomNodeGroup_1 = __webpack_require__(/*! ../../AbstractCustomNodeGroup */ "./src/custom-nodes/AbstractCustomNodeGroup.ts");
const NodeAppender_1 = __webpack_require__(/*! ../../../node/NodeAppender */ "./src/node/NodeAppender.ts");
let ConsoleOutputCustomNodeGroup = class ConsoleOutputCustomNodeGroup extends AbstractCustomNodeGroup_1.AbstractCustomNodeGroup {
    constructor(customNodeFactory, identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
        this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.BeforeObfuscation;
        this.customNodeFactory = customNodeFactory;
    }
    appendCustomNodes(nodeWithStatements, callsGraphData) {
        const randomCallsGraphIndex = this.getRandomCallsGraphIndex(callsGraphData.length);
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.ConsoleOutputDisableExpressionNode, (customNode) => {
            NodeAppender_1.NodeAppender.appendToOptimalBlockScope(callsGraphData, nodeWithStatements, customNode.getNode(), randomCallsGraphIndex);
        });
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, (customNode) => {
            const targetNodeWithStatements = callsGraphData.length
                ? NodeAppender_1.NodeAppender.getOptimalBlockScope(callsGraphData, randomCallsGraphIndex, 1)
                : nodeWithStatements;
            NodeAppender_1.NodeAppender.prepend(targetNodeWithStatements, customNode.getNode());
        });
    }
    initialize() {
        this.customNodes = new Map();
        if (!this.options.disableConsoleOutput) {
            return;
        }
        const callsControllerFunctionName = this.identifierNamesGenerator.generate();
        const consoleOutputDisableExpressionNode = this.customNodeFactory(CustomNode_1.CustomNode.ConsoleOutputDisableExpressionNode);
        const nodeCallsControllerFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode);
        consoleOutputDisableExpressionNode.initialize(callsControllerFunctionName);
        nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);
        this.customNodes.set(CustomNode_1.CustomNode.ConsoleOutputDisableExpressionNode, consoleOutputDisableExpressionNode);
        this.customNodes.set(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_a = typeof Map !== "undefined" && Map) === "function" ? _a : Object)
], ConsoleOutputCustomNodeGroup.prototype, "customNodes", void 0);
ConsoleOutputCustomNodeGroup = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_b = typeof TCustomNodeFactory_1.TCustomNodeFactory !== "undefined" && TCustomNodeFactory_1.TCustomNodeFactory) === "function" ? _b : Object, typeof (_c = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _c : Object, typeof (_d = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _d : Object, typeof (_e = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _e : Object])
], ConsoleOutputCustomNodeGroup);
exports.ConsoleOutputCustomNodeGroup = ConsoleOutputCustomNodeGroup;


/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/BinaryExpressionFunctionNode.ts":
/*!****************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/BinaryExpressionFunctionNode.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let BinaryExpressionFunctionNode = class BinaryExpressionFunctionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(operator) {
        this.operator = operator;
    }
    getNodeStructure(nodeTemplate) {
        const structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.functionExpressionNode([
            NodeFactory_1.NodeFactory.identifierNode('x'),
            NodeFactory_1.NodeFactory.identifierNode('y')
        ], NodeFactory_1.NodeFactory.blockStatementNode([
            NodeFactory_1.NodeFactory.returnStatementNode(NodeFactory_1.NodeFactory.binaryExpressionNode(this.operator, NodeFactory_1.NodeFactory.identifierNode('x'), NodeFactory_1.NodeFactory.identifierNode('y')))
        ])));
        NodeUtils_1.NodeUtils.parentizeAst(structure);
        return [structure];
    }
};
BinaryExpressionFunctionNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], BinaryExpressionFunctionNode);
exports.BinaryExpressionFunctionNode = BinaryExpressionFunctionNode;


/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/BlockStatementControlFlowFlatteningNode.ts":
/*!***************************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/BlockStatementControlFlowFlatteningNode.ts ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let BlockStatementControlFlowFlatteningNode = class BlockStatementControlFlowFlatteningNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(blockStatementBody, shuffledKeys, originalKeysIndexesInShuffledArray) {
        this.blockStatementBody = blockStatementBody;
        this.shuffledKeys = shuffledKeys;
        this.originalKeysIndexesInShuffledArray = originalKeysIndexesInShuffledArray;
    }
    getNodeStructure(nodeTemplate) {
        const controllerIdentifierName = this.randomGenerator.getRandomString(6);
        const indexIdentifierName = this.randomGenerator.getRandomString(6);
        const structure = NodeFactory_1.NodeFactory.blockStatementNode([
            NodeFactory_1.NodeFactory.variableDeclarationNode([
                NodeFactory_1.NodeFactory.variableDeclaratorNode(NodeFactory_1.NodeFactory.identifierNode(controllerIdentifierName), NodeFactory_1.NodeFactory.callExpressionNode(NodeFactory_1.NodeFactory.memberExpressionNode(NodeFactory_1.NodeFactory.literalNode(this.originalKeysIndexesInShuffledArray.join('|')), NodeFactory_1.NodeFactory.identifierNode('split')), [
                    NodeFactory_1.NodeFactory.literalNode('|')
                ]))
            ], 'const'),
            NodeFactory_1.NodeFactory.variableDeclarationNode([
                NodeFactory_1.NodeFactory.variableDeclaratorNode(NodeFactory_1.NodeFactory.identifierNode(indexIdentifierName), NodeFactory_1.NodeFactory.literalNode(0))
            ], 'let'),
            NodeFactory_1.NodeFactory.whileStatementNode(NodeFactory_1.NodeFactory.literalNode(true), NodeFactory_1.NodeFactory.blockStatementNode([
                NodeFactory_1.NodeFactory.switchStatementNode(NodeFactory_1.NodeFactory.memberExpressionNode(NodeFactory_1.NodeFactory.identifierNode(controllerIdentifierName), NodeFactory_1.NodeFactory.updateExpressionNode('++', NodeFactory_1.NodeFactory.identifierNode(indexIdentifierName)), true), this.shuffledKeys.map((key, index) => {
                    const statement = this.blockStatementBody[key];
                    const consequent = [statement];
                    if (!NodeGuards_1.NodeGuards.isReturnStatementNode(statement)) {
                        consequent.push(NodeFactory_1.NodeFactory.continueStatement());
                    }
                    return NodeFactory_1.NodeFactory.switchCaseNode(NodeFactory_1.NodeFactory.literalNode(String(index)), consequent);
                })),
                NodeFactory_1.NodeFactory.breakStatement()
            ]))
        ]);
        NodeUtils_1.NodeUtils.parentizeAst(structure);
        return [structure];
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", Array)
], BlockStatementControlFlowFlatteningNode.prototype, "blockStatementBody", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", Array)
], BlockStatementControlFlowFlatteningNode.prototype, "originalKeysIndexesInShuffledArray", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", Array)
], BlockStatementControlFlowFlatteningNode.prototype, "shuffledKeys", void 0);
BlockStatementControlFlowFlatteningNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], BlockStatementControlFlowFlatteningNode);
exports.BlockStatementControlFlowFlatteningNode = BlockStatementControlFlowFlatteningNode;


/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode.ts":
/*!**************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode.ts ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let CallExpressionFunctionNode = class CallExpressionFunctionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(expressionArguments) {
        this.expressionArguments = expressionArguments;
    }
    getNodeStructure(nodeTemplate) {
        const calleeIdentifier = NodeFactory_1.NodeFactory.identifierNode('callee');
        const params = [];
        const argumentsLength = this.expressionArguments.length;
        for (let i = 0; i < argumentsLength; i++) {
            params.push(NodeFactory_1.NodeFactory.identifierNode(`param${i + 1}`));
        }
        const structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.functionExpressionNode([
            calleeIdentifier,
            ...params
        ], NodeFactory_1.NodeFactory.blockStatementNode([
            NodeFactory_1.NodeFactory.returnStatementNode(NodeFactory_1.NodeFactory.callExpressionNode(calleeIdentifier, params))
        ])));
        NodeUtils_1.NodeUtils.parentizeAst(structure);
        return [structure];
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", Array)
], CallExpressionFunctionNode.prototype, "expressionArguments", void 0);
CallExpressionFunctionNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], CallExpressionFunctionNode);
exports.CallExpressionFunctionNode = CallExpressionFunctionNode;


/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/LogicalExpressionFunctionNode.ts":
/*!*****************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/LogicalExpressionFunctionNode.ts ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let LogicalExpressionFunctionNode = class LogicalExpressionFunctionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(operator) {
        this.operator = operator;
    }
    getNodeStructure(nodeTemplate) {
        const structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.functionExpressionNode([
            NodeFactory_1.NodeFactory.identifierNode('x'),
            NodeFactory_1.NodeFactory.identifierNode('y')
        ], NodeFactory_1.NodeFactory.blockStatementNode([
            NodeFactory_1.NodeFactory.returnStatementNode(NodeFactory_1.NodeFactory.logicalExpressionNode(this.operator, NodeFactory_1.NodeFactory.identifierNode('x'), NodeFactory_1.NodeFactory.identifierNode('y')))
        ])));
        NodeUtils_1.NodeUtils.parentizeAst(structure);
        return [structure];
    }
};
LogicalExpressionFunctionNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], LogicalExpressionFunctionNode);
exports.LogicalExpressionFunctionNode = LogicalExpressionFunctionNode;


/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/StringLiteralNode.ts":
/*!*****************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/StringLiteralNode.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
let StringLiteralNode = class StringLiteralNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(literalValue) {
        this.literalValue = literalValue;
    }
    getNodeStructure(nodeTemplate) {
        const structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.literalNode(this.literalValue));
        return [structure];
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], StringLiteralNode.prototype, "literalValue", void 0);
StringLiteralNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], StringLiteralNode);
exports.StringLiteralNode = StringLiteralNode;


/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode.ts":
/*!*******************************************************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode.ts ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let CallExpressionControlFlowStorageCallNode = class CallExpressionControlFlowStorageCallNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(controlFlowStorageName, controlFlowStorageKey, callee, expressionArguments) {
        this.controlFlowStorageName = controlFlowStorageName;
        this.controlFlowStorageKey = controlFlowStorageKey;
        this.callee = callee;
        this.expressionArguments = expressionArguments;
    }
    getNodeStructure() {
        const structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.callExpressionNode(NodeFactory_1.NodeFactory.memberExpressionNode(NodeFactory_1.NodeFactory.identifierNode(this.controlFlowStorageName), NodeFactory_1.NodeFactory.identifierNode(this.controlFlowStorageKey)), [
            this.callee,
            ...this.expressionArguments
        ]));
        NodeUtils_1.NodeUtils.parentizeAst(structure);
        return [structure];
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_a = typeof ESTree !== "undefined" && ESTree.Expression) === "function" ? _a : Object)
], CallExpressionControlFlowStorageCallNode.prototype, "callee", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], CallExpressionControlFlowStorageCallNode.prototype, "controlFlowStorageKey", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], CallExpressionControlFlowStorageCallNode.prototype, "controlFlowStorageName", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", Array)
], CallExpressionControlFlowStorageCallNode.prototype, "expressionArguments", void 0);
CallExpressionControlFlowStorageCallNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_b = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _b : Object, typeof (_c = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _c : Object, typeof (_d = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _d : Object, typeof (_e = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _e : Object])
], CallExpressionControlFlowStorageCallNode);
exports.CallExpressionControlFlowStorageCallNode = CallExpressionControlFlowStorageCallNode;


/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode.ts ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TControlFlowStorage_1 = __webpack_require__(/*! ../../../types/storages/TControlFlowStorage */ "./src/types/storages/TControlFlowStorage.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let ControlFlowStorageNode = class ControlFlowStorageNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(controlFlowStorage) {
        this.controlFlowStorage = controlFlowStorage;
    }
    getNodeStructure(nodeTemplate) {
        const propertyNodes = Array
            .from(this.controlFlowStorage.getStorage())
            .map(([key, value]) => {
            const node = value.getNode()[0];
            if (!NodeGuards_1.NodeGuards.isExpressionStatementNode(node)) {
                throw new Error('Function node for control flow storage object should be passed inside the `ExpressionStatement` node!');
            }
            return NodeFactory_1.NodeFactory.propertyNode(NodeFactory_1.NodeFactory.identifierNode(key), node.expression);
        });
        let structure = NodeFactory_1.NodeFactory.variableDeclarationNode([
            NodeFactory_1.NodeFactory.variableDeclaratorNode(NodeFactory_1.NodeFactory.identifierNode(this.controlFlowStorage.getStorageId()), NodeFactory_1.NodeFactory.objectExpressionNode(propertyNodes))
        ], 'const');
        structure = NodeUtils_1.NodeUtils.parentizeAst(structure);
        return [structure];
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_a = typeof TControlFlowStorage_1.TControlFlowStorage !== "undefined" && TControlFlowStorage_1.TControlFlowStorage) === "function" ? _a : Object)
], ControlFlowStorageNode.prototype, "controlFlowStorage", void 0);
ControlFlowStorageNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_b = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _b : Object, typeof (_c = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _c : Object, typeof (_d = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _d : Object, typeof (_e = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _e : Object])
], ControlFlowStorageNode);
exports.ControlFlowStorageNode = ControlFlowStorageNode;


/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ExpressionWithOperatorControlFlowStorageCallNode.ts":
/*!***************************************************************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ExpressionWithOperatorControlFlowStorageCallNode.ts ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let ExpressionWithOperatorControlFlowStorageCallNode = class ExpressionWithOperatorControlFlowStorageCallNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(controlFlowStorageName, controlFlowStorageKey, leftValue, rightValue) {
        this.controlFlowStorageName = controlFlowStorageName;
        this.controlFlowStorageKey = controlFlowStorageKey;
        this.leftValue = leftValue;
        this.rightValue = rightValue;
    }
    getNodeStructure() {
        const structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.callExpressionNode(NodeFactory_1.NodeFactory.memberExpressionNode(NodeFactory_1.NodeFactory.identifierNode(this.controlFlowStorageName), NodeFactory_1.NodeFactory.identifierNode(this.controlFlowStorageKey)), [
            this.leftValue,
            this.rightValue
        ]));
        NodeUtils_1.NodeUtils.parentizeAst(structure);
        return [structure];
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], ExpressionWithOperatorControlFlowStorageCallNode.prototype, "controlFlowStorageKey", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], ExpressionWithOperatorControlFlowStorageCallNode.prototype, "controlFlowStorageName", void 0);
ExpressionWithOperatorControlFlowStorageCallNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], ExpressionWithOperatorControlFlowStorageCallNode);
exports.ExpressionWithOperatorControlFlowStorageCallNode = ExpressionWithOperatorControlFlowStorageCallNode;


/***/ }),

/***/ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/StringLiteralControlFlowStorageCallNode.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/StringLiteralControlFlowStorageCallNode.ts ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let StringLiteralControlFlowStorageCallNode = class StringLiteralControlFlowStorageCallNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(controlFlowStorageName, controlFlowStorageKey) {
        this.controlFlowStorageName = controlFlowStorageName;
        this.controlFlowStorageKey = controlFlowStorageKey;
    }
    getNodeStructure() {
        const structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.memberExpressionNode(NodeFactory_1.NodeFactory.identifierNode(this.controlFlowStorageName), NodeFactory_1.NodeFactory.identifierNode(this.controlFlowStorageKey)));
        NodeUtils_1.NodeUtils.parentizeAst(structure);
        return [structure];
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], StringLiteralControlFlowStorageCallNode.prototype, "controlFlowStorageKey", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], StringLiteralControlFlowStorageCallNode.prototype, "controlFlowStorageName", void 0);
StringLiteralControlFlowStorageCallNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], StringLiteralControlFlowStorageCallNode);
exports.StringLiteralControlFlowStorageCallNode = StringLiteralControlFlowStorageCallNode;


/***/ }),

/***/ "./src/custom-nodes/dead-code-injection-nodes/BlockStatementDeadCodeInjectionNode.ts":
/*!*******************************************************************************************!*\
  !*** ./src/custom-nodes/dead-code-injection-nodes/BlockStatementDeadCodeInjectionNode.ts ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let BlockStatementDeadCodeInjectionNode = class BlockStatementDeadCodeInjectionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(blockStatementNode, deadCodeInjectionRootAstHostNode) {
        this.blockStatementNode = blockStatementNode;
        this.deadCodeInjectionRootAstHostNode = deadCodeInjectionRootAstHostNode;
    }
    getNodeStructure(nodeTemplate) {
        const random1 = this.randomGenerator.getMathRandom() > 0.5;
        const random2 = this.randomGenerator.getMathRandom() > 0.5;
        const operator = random1 ? '===' : '!==';
        const leftString = this.randomGenerator.getRandomString(5);
        const rightString = random2 ? leftString : this.randomGenerator.getRandomString(5);
        const [consequent, alternate] = random1 === random2
            ? [this.blockStatementNode, this.deadCodeInjectionRootAstHostNode]
            : [this.deadCodeInjectionRootAstHostNode, this.blockStatementNode];
        const structure = NodeFactory_1.NodeFactory.blockStatementNode([
            NodeFactory_1.NodeFactory.ifStatementNode(NodeFactory_1.NodeFactory.binaryExpressionNode(operator, NodeFactory_1.NodeFactory.literalNode(leftString), NodeFactory_1.NodeFactory.literalNode(rightString)), consequent, alternate)
        ]);
        NodeUtils_1.NodeUtils.parentizeAst(structure);
        return [structure];
    }
};
BlockStatementDeadCodeInjectionNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], BlockStatementDeadCodeInjectionNode);
exports.BlockStatementDeadCodeInjectionNode = BlockStatementDeadCodeInjectionNode;


/***/ }),

/***/ "./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode.ts":
/*!************************************************************************************!*\
  !*** ./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode.ts ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const DebugProtectionFunctionCallTemplate_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-call-node/DebugProtectionFunctionCallTemplate */ "./src/templates/debug-protection-nodes/debug-protection-function-call-node/DebugProtectionFunctionCallTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let DebugProtectionFunctionCallNode = class DebugProtectionFunctionCallNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(debugProtectionFunctionName, callsControllerFunctionName) {
        this.debugProtectionFunctionName = debugProtectionFunctionName;
        this.callsControllerFunctionName = callsControllerFunctionName;
    }
    getNodeStructure(nodeTemplate) {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(nodeTemplate);
    }
    getNodeTemplate() {
        return this.customNodeFormatter.formatTemplate(DebugProtectionFunctionCallTemplate_1.DebugProtectionFunctionCallTemplate(), {
            debugProtectionFunctionName: this.debugProtectionFunctionName,
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], DebugProtectionFunctionCallNode.prototype, "callsControllerFunctionName", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], DebugProtectionFunctionCallNode.prototype, "debugProtectionFunctionName", void 0);
DebugProtectionFunctionCallNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], DebugProtectionFunctionCallNode);
exports.DebugProtectionFunctionCallNode = DebugProtectionFunctionCallNode;


/***/ }),

/***/ "./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode.ts":
/*!****************************************************************************************!*\
  !*** ./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const DebugProtectionFunctionIntervalTemplate_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-interval-node/DebugProtectionFunctionIntervalTemplate */ "./src/templates/debug-protection-nodes/debug-protection-function-interval-node/DebugProtectionFunctionIntervalTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let DebugProtectionFunctionIntervalNode = class DebugProtectionFunctionIntervalNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(debugProtectionFunctionName) {
        this.debugProtectionFunctionName = debugProtectionFunctionName;
    }
    getNodeStructure(nodeTemplate) {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(nodeTemplate);
    }
    getNodeTemplate() {
        return this.customNodeFormatter.formatTemplate(DebugProtectionFunctionIntervalTemplate_1.DebugProtectionFunctionIntervalTemplate(), {
            debugProtectionFunctionName: this.debugProtectionFunctionName
        });
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], DebugProtectionFunctionIntervalNode.prototype, "debugProtectionFunctionName", void 0);
DebugProtectionFunctionIntervalNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], DebugProtectionFunctionIntervalNode);
exports.DebugProtectionFunctionIntervalNode = DebugProtectionFunctionIntervalNode;


/***/ }),

/***/ "./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode.ts":
/*!********************************************************************************!*\
  !*** ./src/custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const DebuggerTemplate_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplate */ "./src/templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplate.ts");
const DebuggerTemplateNoEval_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplateNoEval */ "./src/templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplateNoEval.ts");
const DebugProtectionFunctionTemplate_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-node/DebugProtectionFunctionTemplate */ "./src/templates/debug-protection-nodes/debug-protection-function-node/DebugProtectionFunctionTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let DebugProtectionFunctionNode = class DebugProtectionFunctionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(debugProtectionFunctionName) {
        this.debugProtectionFunctionName = debugProtectionFunctionName;
    }
    getNodeStructure(nodeTemplate) {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(nodeTemplate);
    }
    getNodeTemplate() {
        const debuggerTemplate = this.options.target !== ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval
            ? DebuggerTemplate_1.DebuggerTemplate()
            : DebuggerTemplateNoEval_1.DebuggerTemplateNoEval();
        return this.customNodeFormatter.formatTemplate(DebugProtectionFunctionTemplate_1.DebugProtectionFunctionTemplate(), {
            debuggerTemplate,
            debugProtectionFunctionName: this.debugProtectionFunctionName
        });
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], DebugProtectionFunctionNode.prototype, "debugProtectionFunctionName", void 0);
DebugProtectionFunctionNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], DebugProtectionFunctionNode);
exports.DebugProtectionFunctionNode = DebugProtectionFunctionNode;


/***/ }),

/***/ "./src/custom-nodes/debug-protection-nodes/group/DebugProtectionCustomNodeGroup.ts":
/*!*****************************************************************************************!*\
  !*** ./src/custom-nodes/debug-protection-nodes/group/DebugProtectionCustomNodeGroup.ts ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TCustomNodeFactory_1 = __webpack_require__(/*! ../../../types/container/custom-nodes/TCustomNodeFactory */ "./src/types/container/custom-nodes/TCustomNodeFactory.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const CustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/CustomNode */ "./src/enums/custom-nodes/CustomNode.ts");
const ObfuscationEvent_1 = __webpack_require__(/*! ../../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");
const AbstractCustomNodeGroup_1 = __webpack_require__(/*! ../../AbstractCustomNodeGroup */ "./src/custom-nodes/AbstractCustomNodeGroup.ts");
const NodeAppender_1 = __webpack_require__(/*! ../../../node/NodeAppender */ "./src/node/NodeAppender.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let DebugProtectionCustomNodeGroup = class DebugProtectionCustomNodeGroup extends AbstractCustomNodeGroup_1.AbstractCustomNodeGroup {
    constructor(customNodeFactory, identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
        this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.BeforeObfuscation;
        this.customNodeFactory = customNodeFactory;
    }
    appendCustomNodes(nodeWithStatements, callsGraphData) {
        const randomCallsGraphIndex = this.getRandomCallsGraphIndex(callsGraphData.length);
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.DebugProtectionFunctionCallNode, (customNode) => {
            NodeAppender_1.NodeAppender.appendToOptimalBlockScope(callsGraphData, nodeWithStatements, customNode.getNode(), randomCallsGraphIndex);
        });
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.DebugProtectionFunctionNode, (customNode) => {
            NodeAppender_1.NodeAppender.append(nodeWithStatements, customNode.getNode());
        });
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.DebugProtectionFunctionIntervalNode, (customNode) => {
            const programBodyLength = NodeGuards_1.NodeGuards.isSwitchCaseNode(nodeWithStatements)
                ? nodeWithStatements.consequent.length
                : nodeWithStatements.body.length;
            const randomIndex = this.randomGenerator.getRandomInteger(0, programBodyLength);
            NodeAppender_1.NodeAppender.insertAtIndex(nodeWithStatements, customNode.getNode(), randomIndex);
        });
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, (customNode) => {
            const targetNodeWithStatements = callsGraphData.length
                ? NodeAppender_1.NodeAppender.getOptimalBlockScope(callsGraphData, randomCallsGraphIndex, 1)
                : nodeWithStatements;
            NodeAppender_1.NodeAppender.prepend(targetNodeWithStatements, customNode.getNode());
        });
    }
    initialize() {
        this.customNodes = new Map();
        if (!this.options.debugProtection) {
            return;
        }
        const debugProtectionFunctionName = this.identifierNamesGenerator.generate();
        const callsControllerFunctionName = this.identifierNamesGenerator.generate();
        const debugProtectionFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.DebugProtectionFunctionNode);
        const debugProtectionFunctionCallNode = this.customNodeFactory(CustomNode_1.CustomNode.DebugProtectionFunctionCallNode);
        const debugProtectionFunctionIntervalNode = this.customNodeFactory(CustomNode_1.CustomNode.DebugProtectionFunctionIntervalNode);
        const nodeCallsControllerFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode);
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
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_a = typeof Map !== "undefined" && Map) === "function" ? _a : Object)
], DebugProtectionCustomNodeGroup.prototype, "customNodes", void 0);
DebugProtectionCustomNodeGroup = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_b = typeof TCustomNodeFactory_1.TCustomNodeFactory !== "undefined" && TCustomNodeFactory_1.TCustomNodeFactory) === "function" ? _b : Object, typeof (_c = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _c : Object, typeof (_d = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _d : Object, typeof (_e = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _e : Object])
], DebugProtectionCustomNodeGroup);
exports.DebugProtectionCustomNodeGroup = DebugProtectionCustomNodeGroup;


/***/ }),

/***/ "./src/custom-nodes/domain-lock-nodes/DomainLockNode.ts":
/*!**************************************************************!*\
  !*** ./src/custom-nodes/domain-lock-nodes/DomainLockNode.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const ICryptUtils_1 = __webpack_require__(/*! ../../interfaces/utils/ICryptUtils */ "./src/interfaces/utils/ICryptUtils.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const DomainLockNodeTemplate_1 = __webpack_require__(/*! ../../templates/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate */ "./src/templates/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate.ts");
const GlobalVariableNoEvalTemplate_1 = __webpack_require__(/*! ../../templates/GlobalVariableNoEvalTemplate */ "./src/templates/GlobalVariableNoEvalTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let DomainLockNode = class DomainLockNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options, cryptUtils) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
        this.cryptUtils = cryptUtils;
    }
    initialize(callsControllerFunctionName) {
        this.callsControllerFunctionName = callsControllerFunctionName;
    }
    getNodeStructure(nodeTemplate) {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(nodeTemplate);
    }
    getNodeTemplate() {
        const domainsString = this.options.domainLock.join(';');
        const [hiddenDomainsString, diff] = this.cryptUtils.hideString(domainsString, domainsString.length * 3);
        const globalVariableTemplate = this.options.target !== ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval
            ? this.getGlobalVariableTemplate()
            : GlobalVariableNoEvalTemplate_1.GlobalVariableNoEvalTemplate();
        return this.customNodeFormatter.formatTemplate(DomainLockNodeTemplate_1.DomainLockNodeTemplate(), {
            domainLockFunctionName: this.randomGenerator.getRandomString(5),
            diff,
            domains: hiddenDomainsString,
            globalVariableTemplate,
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], DomainLockNode.prototype, "callsControllerFunctionName", void 0);
DomainLockNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object, typeof (_e = typeof ICryptUtils_1.ICryptUtils !== "undefined" && ICryptUtils_1.ICryptUtils) === "function" ? _e : Object])
], DomainLockNode);
exports.DomainLockNode = DomainLockNode;


/***/ }),

/***/ "./src/custom-nodes/domain-lock-nodes/group/DomainLockCustomNodeGroup.ts":
/*!*******************************************************************************!*\
  !*** ./src/custom-nodes/domain-lock-nodes/group/DomainLockCustomNodeGroup.ts ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TCustomNodeFactory_1 = __webpack_require__(/*! ../../../types/container/custom-nodes/TCustomNodeFactory */ "./src/types/container/custom-nodes/TCustomNodeFactory.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const CustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/CustomNode */ "./src/enums/custom-nodes/CustomNode.ts");
const ObfuscationEvent_1 = __webpack_require__(/*! ../../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");
const AbstractCustomNodeGroup_1 = __webpack_require__(/*! ../../AbstractCustomNodeGroup */ "./src/custom-nodes/AbstractCustomNodeGroup.ts");
const NodeAppender_1 = __webpack_require__(/*! ../../../node/NodeAppender */ "./src/node/NodeAppender.ts");
let DomainLockCustomNodeGroup = class DomainLockCustomNodeGroup extends AbstractCustomNodeGroup_1.AbstractCustomNodeGroup {
    constructor(customNodeFactory, identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
        this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.BeforeObfuscation;
        this.customNodeFactory = customNodeFactory;
    }
    appendCustomNodes(nodeWithStatements, callsGraphData) {
        const randomCallsGraphIndex = this.getRandomCallsGraphIndex(callsGraphData.length);
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.DomainLockNode, (customNode) => {
            NodeAppender_1.NodeAppender.appendToOptimalBlockScope(callsGraphData, nodeWithStatements, customNode.getNode(), randomCallsGraphIndex);
        });
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, (customNode) => {
            const targetNodeWithStatements = callsGraphData.length
                ? NodeAppender_1.NodeAppender.getOptimalBlockScope(callsGraphData, randomCallsGraphIndex, 1)
                : nodeWithStatements;
            NodeAppender_1.NodeAppender.prepend(targetNodeWithStatements, customNode.getNode());
        });
    }
    initialize() {
        this.customNodes = new Map();
        if (!this.options.domainLock.length) {
            return;
        }
        const callsControllerFunctionName = this.randomGenerator.getRandomString(5);
        const domainLockNode = this.customNodeFactory(CustomNode_1.CustomNode.DomainLockNode);
        const nodeCallsControllerFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode);
        domainLockNode.initialize(callsControllerFunctionName);
        nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);
        this.customNodes.set(CustomNode_1.CustomNode.DomainLockNode, domainLockNode);
        this.customNodes.set(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_a = typeof Map !== "undefined" && Map) === "function" ? _a : Object)
], DomainLockCustomNodeGroup.prototype, "customNodes", void 0);
DomainLockCustomNodeGroup = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_b = typeof TCustomNodeFactory_1.TCustomNodeFactory !== "undefined" && TCustomNodeFactory_1.TCustomNodeFactory) === "function" ? _b : Object, typeof (_c = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _c : Object, typeof (_d = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _d : Object, typeof (_e = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _e : Object])
], DomainLockCustomNodeGroup);
exports.DomainLockCustomNodeGroup = DomainLockCustomNodeGroup;


/***/ }),

/***/ "./src/custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode.ts":
/*!*****************************************************************************************!*\
  !*** ./src/custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode.ts ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ObfuscationEvent_1 = __webpack_require__(/*! ../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const SingleNodeCallControllerTemplate_1 = __webpack_require__(/*! ../../templates/SingleNodeCallControllerTemplate */ "./src/templates/SingleNodeCallControllerTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let NodeCallsControllerFunctionNode = class NodeCallsControllerFunctionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(appendEvent, callsControllerFunctionName) {
        this.appendEvent = appendEvent;
        this.callsControllerFunctionName = callsControllerFunctionName;
    }
    getNodeStructure(nodeTemplate) {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(nodeTemplate);
    }
    getNodeTemplate() {
        if (this.appendEvent === ObfuscationEvent_1.ObfuscationEvent.AfterObfuscation) {
            return this.obfuscateTemplate(this.customNodeFormatter.formatTemplate(SingleNodeCallControllerTemplate_1.SingleNodeCallControllerTemplate(), {
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            }));
        }
        return this.customNodeFormatter.formatTemplate(SingleNodeCallControllerTemplate_1.SingleNodeCallControllerTemplate(), {
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], NodeCallsControllerFunctionNode.prototype, "callsControllerFunctionName", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_a = typeof ObfuscationEvent_1.ObfuscationEvent !== "undefined" && ObfuscationEvent_1.ObfuscationEvent) === "function" ? _a : Object)
], NodeCallsControllerFunctionNode.prototype, "appendEvent", void 0);
NodeCallsControllerFunctionNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_b = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _b : Object, typeof (_c = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _c : Object, typeof (_d = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _d : Object, typeof (_e = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _e : Object])
], NodeCallsControllerFunctionNode);
exports.NodeCallsControllerFunctionNode = NodeCallsControllerFunctionNode;


/***/ }),

/***/ "./src/custom-nodes/object-expression-keys-transformer-nodes/ObjectExpressionVariableDeclarationHostNode.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/custom-nodes/object-expression-keys-transformer-nodes/ObjectExpressionVariableDeclarationHostNode.ts ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
let ObjectExpressionVariableDeclarationHostNode = class ObjectExpressionVariableDeclarationHostNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(lexicalScopeNode, properties) {
        this.lexicalScopeNode = lexicalScopeNode;
        this.properties = properties;
    }
    getNodeStructure(nodeTemplate) {
        const structure = NodeFactory_1.NodeFactory.variableDeclarationNode([
            NodeFactory_1.NodeFactory.variableDeclaratorNode(NodeFactory_1.NodeFactory.identifierNode(this.identifierNamesGenerator.generateForLexicalScope(this.lexicalScopeNode)), NodeFactory_1.NodeFactory.objectExpressionNode(this.properties))
        ], 'const');
        return [structure];
    }
};
ObjectExpressionVariableDeclarationHostNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], ObjectExpressionVariableDeclarationHostNode);
exports.ObjectExpressionVariableDeclarationHostNode = ObjectExpressionVariableDeclarationHostNode;


/***/ }),

/***/ "./src/custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode.ts":
/*!***************************************************************************!*\
  !*** ./src/custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IEscapeSequenceEncoder_1 = __webpack_require__(/*! ../../interfaces/utils/IEscapeSequenceEncoder */ "./src/interfaces/utils/IEscapeSequenceEncoder.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const SelfDefendingTemplate_1 = __webpack_require__(/*! ../../templates/self-defending-nodes/self-defending-unicode-node/SelfDefendingTemplate */ "./src/templates/self-defending-nodes/self-defending-unicode-node/SelfDefendingTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let SelfDefendingUnicodeNode = class SelfDefendingUnicodeNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options, escapeSequenceEncoder) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
        this.escapeSequenceEncoder = escapeSequenceEncoder;
    }
    initialize(callsControllerFunctionName) {
        this.callsControllerFunctionName = callsControllerFunctionName;
    }
    getNodeStructure(nodeTemplate) {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(nodeTemplate);
    }
    getNodeTemplate() {
        return this.obfuscateTemplate(this.customNodeFormatter.formatTemplate(SelfDefendingTemplate_1.SelfDefendingTemplate(this.escapeSequenceEncoder), {
            selfDefendingFunctionName: this.randomGenerator.getRandomString(5),
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        }), {
            unicodeEscapeSequence: true
        });
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], SelfDefendingUnicodeNode.prototype, "callsControllerFunctionName", void 0);
SelfDefendingUnicodeNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object, typeof (_e = typeof IEscapeSequenceEncoder_1.IEscapeSequenceEncoder !== "undefined" && IEscapeSequenceEncoder_1.IEscapeSequenceEncoder) === "function" ? _e : Object])
], SelfDefendingUnicodeNode);
exports.SelfDefendingUnicodeNode = SelfDefendingUnicodeNode;


/***/ }),

/***/ "./src/custom-nodes/self-defending-nodes/group/SelfDefendingCustomNodeGroup.ts":
/*!*************************************************************************************!*\
  !*** ./src/custom-nodes/self-defending-nodes/group/SelfDefendingCustomNodeGroup.ts ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TCustomNodeFactory_1 = __webpack_require__(/*! ../../../types/container/custom-nodes/TCustomNodeFactory */ "./src/types/container/custom-nodes/TCustomNodeFactory.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const CustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/CustomNode */ "./src/enums/custom-nodes/CustomNode.ts");
const ObfuscationEvent_1 = __webpack_require__(/*! ../../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");
const AbstractCustomNodeGroup_1 = __webpack_require__(/*! ../../AbstractCustomNodeGroup */ "./src/custom-nodes/AbstractCustomNodeGroup.ts");
const NodeAppender_1 = __webpack_require__(/*! ../../../node/NodeAppender */ "./src/node/NodeAppender.ts");
let SelfDefendingCustomNodeGroup = class SelfDefendingCustomNodeGroup extends AbstractCustomNodeGroup_1.AbstractCustomNodeGroup {
    constructor(customNodeFactory, identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
        this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.AfterObfuscation;
        this.customNodeFactory = customNodeFactory;
    }
    appendCustomNodes(nodeWithStatements, callsGraphData) {
        const randomCallsGraphIndex = this.getRandomCallsGraphIndex(callsGraphData.length);
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.SelfDefendingUnicodeNode, (customNode) => {
            NodeAppender_1.NodeAppender.appendToOptimalBlockScope(callsGraphData, nodeWithStatements, customNode.getNode(), randomCallsGraphIndex);
        });
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, (customNode) => {
            const targetNodeWithStatements = callsGraphData.length
                ? NodeAppender_1.NodeAppender.getOptimalBlockScope(callsGraphData, randomCallsGraphIndex, 1)
                : nodeWithStatements;
            NodeAppender_1.NodeAppender.prepend(targetNodeWithStatements, customNode.getNode());
        });
    }
    initialize() {
        this.customNodes = new Map();
        if (!this.options.selfDefending) {
            return;
        }
        const callsControllerFunctionName = this.randomGenerator.getRandomString(5);
        const selfDefendingUnicodeNode = this.customNodeFactory(CustomNode_1.CustomNode.SelfDefendingUnicodeNode);
        const nodeCallsControllerFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode);
        selfDefendingUnicodeNode.initialize(callsControllerFunctionName);
        nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);
        this.customNodes.set(CustomNode_1.CustomNode.SelfDefendingUnicodeNode, selfDefendingUnicodeNode);
        this.customNodes.set(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_a = typeof Map !== "undefined" && Map) === "function" ? _a : Object)
], SelfDefendingCustomNodeGroup.prototype, "customNodes", void 0);
SelfDefendingCustomNodeGroup = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_b = typeof TCustomNodeFactory_1.TCustomNodeFactory !== "undefined" && TCustomNodeFactory_1.TCustomNodeFactory) === "function" ? _b : Object, typeof (_c = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _c : Object, typeof (_d = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _d : Object, typeof (_e = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _e : Object])
], SelfDefendingCustomNodeGroup);
exports.SelfDefendingCustomNodeGroup = SelfDefendingCustomNodeGroup;


/***/ }),

/***/ "./src/custom-nodes/string-array-nodes/StringArrayCallsWrapper.ts":
/*!************************************************************************!*\
  !*** ./src/custom-nodes/string-array-nodes/StringArrayCallsWrapper.ts ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IEscapeSequenceEncoder_1 = __webpack_require__(/*! ../../interfaces/utils/IEscapeSequenceEncoder */ "./src/interfaces/utils/IEscapeSequenceEncoder.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");
const StringArrayEncoding_1 = __webpack_require__(/*! ../../enums/StringArrayEncoding */ "./src/enums/StringArrayEncoding.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AtobTemplate_1 = __webpack_require__(/*! ../../templates/AtobTemplate */ "./src/templates/AtobTemplate.ts");
const GlobalVariableNoEvalTemplate_1 = __webpack_require__(/*! ../../templates/GlobalVariableNoEvalTemplate */ "./src/templates/GlobalVariableNoEvalTemplate.ts");
const Rc4Template_1 = __webpack_require__(/*! ../../templates/Rc4Template */ "./src/templates/Rc4Template.ts");
const SelfDefendingTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-calls-wrapper/SelfDefendingTemplate */ "./src/templates/string-array-nodes/string-array-calls-wrapper/SelfDefendingTemplate.ts");
const StringArrayBase64DecodeNodeTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate */ "./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate.ts");
const StringArrayCallsWrapperTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate */ "./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate.ts");
const StringArrayRC4DecodeNodeTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate */ "./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let StringArrayCallsWrapper = class StringArrayCallsWrapper extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options, escapeSequenceEncoder) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
        this.escapeSequenceEncoder = escapeSequenceEncoder;
    }
    initialize(stringArrayName, stringArrayCallsWrapperName) {
        this.stringArrayName = stringArrayName;
        this.stringArrayCallsWrapperName = stringArrayCallsWrapperName;
    }
    getNodeStructure(nodeTemplate) {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(nodeTemplate);
    }
    getNodeTemplate() {
        const decodeNodeTemplate = this.getDecodeStringArrayTemplate();
        const preservedNames = [this.stringArrayName];
        return this.obfuscateTemplate(this.customNodeFormatter.formatTemplate(StringArrayCallsWrapperTemplate_1.StringArrayCallsWrapperTemplate(), {
            decodeNodeTemplate,
            stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
            stringArrayName: this.stringArrayName
        }), {
            reservedNames: preservedNames
        });
    }
    getDecodeStringArrayTemplate() {
        const globalVariableTemplate = this.options.target !== ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval
            ? this.getGlobalVariableTemplate()
            : GlobalVariableNoEvalTemplate_1.GlobalVariableNoEvalTemplate();
        const atobPolyfill = this.customNodeFormatter.formatTemplate(AtobTemplate_1.AtobTemplate(), { globalVariableTemplate });
        let decodeStringArrayTemplate = '';
        let selfDefendingCode = '';
        if (this.options.selfDefending) {
            selfDefendingCode = this.customNodeFormatter.formatTemplate(SelfDefendingTemplate_1.SelfDefendingTemplate(this.randomGenerator, this.escapeSequenceEncoder), {
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
                stringArrayName: this.stringArrayName
            });
        }
        switch (this.options.stringArrayEncoding) {
            case StringArrayEncoding_1.StringArrayEncoding.Rc4:
                decodeStringArrayTemplate = this.customNodeFormatter.formatTemplate(StringArrayRC4DecodeNodeTemplate_1.StringArrayRc4DecodeNodeTemplate(this.randomGenerator), {
                    atobPolyfill,
                    selfDefendingCode,
                    rc4Polyfill: Rc4Template_1.Rc4Template(),
                    stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                });
                break;
            case StringArrayEncoding_1.StringArrayEncoding.Base64:
                decodeStringArrayTemplate = this.customNodeFormatter.formatTemplate(StringArrayBase64DecodeNodeTemplate_1.StringArrayBase64DecodeNodeTemplate(this.randomGenerator), {
                    atobPolyfill,
                    selfDefendingCode,
                    stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                });
        }
        return decodeStringArrayTemplate;
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], StringArrayCallsWrapper.prototype, "stringArrayName", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], StringArrayCallsWrapper.prototype, "stringArrayCallsWrapperName", void 0);
StringArrayCallsWrapper = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object, typeof (_e = typeof IEscapeSequenceEncoder_1.IEscapeSequenceEncoder !== "undefined" && IEscapeSequenceEncoder_1.IEscapeSequenceEncoder) === "function" ? _e : Object])
], StringArrayCallsWrapper);
exports.StringArrayCallsWrapper = StringArrayCallsWrapper;


/***/ }),

/***/ "./src/custom-nodes/string-array-nodes/StringArrayNode.ts":
/*!****************************************************************!*\
  !*** ./src/custom-nodes/string-array-nodes/StringArrayNode.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const IStringArrayStorage_1 = __webpack_require__(/*! ../../interfaces/storages/string-array-storage/IStringArrayStorage */ "./src/interfaces/storages/string-array-storage/IStringArrayStorage.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const StringArrayTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-node/StringArrayTemplate */ "./src/templates/string-array-nodes/string-array-node/StringArrayTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let StringArrayNode = class StringArrayNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }
    initialize(stringArrayStorage, stringArrayName) {
        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayName = stringArrayName;
    }
    getNodeStructure(nodeTemplate) {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(nodeTemplate);
    }
    getNodeTemplate() {
        return this.customNodeFormatter.formatTemplate(StringArrayTemplate_1.StringArrayTemplate(), {
            stringArrayName: this.stringArrayName,
            stringArray: this.stringArrayStorage.toString()
        });
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_a = typeof IStringArrayStorage_1.IStringArrayStorage !== "undefined" && IStringArrayStorage_1.IStringArrayStorage) === "function" ? _a : Object)
], StringArrayNode.prototype, "stringArrayStorage", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], StringArrayNode.prototype, "stringArrayName", void 0);
StringArrayNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_b = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _b : Object, typeof (_c = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _c : Object, typeof (_d = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _d : Object, typeof (_e = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _e : Object])
], StringArrayNode);
exports.StringArrayNode = StringArrayNode;


/***/ }),

/***/ "./src/custom-nodes/string-array-nodes/StringArrayRotateFunctionNode.ts":
/*!******************************************************************************!*\
  !*** ./src/custom-nodes/string-array-nodes/StringArrayRotateFunctionNode.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IEscapeSequenceEncoder_1 = __webpack_require__(/*! ../../interfaces/utils/IEscapeSequenceEncoder */ "./src/interfaces/utils/IEscapeSequenceEncoder.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICustomNodeFormatter_1 = __webpack_require__(/*! ../../interfaces/custom-nodes/ICustomNodeFormatter */ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const SelfDefendingTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-rotate-function-node/SelfDefendingTemplate */ "./src/templates/string-array-nodes/string-array-rotate-function-node/SelfDefendingTemplate.ts");
const StringArrayRotateFunctionTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-rotate-function-node/StringArrayRotateFunctionTemplate */ "./src/templates/string-array-nodes/string-array-rotate-function-node/StringArrayRotateFunctionTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
const NumberUtils_1 = __webpack_require__(/*! ../../utils/NumberUtils */ "./src/utils/NumberUtils.ts");
let StringArrayRotateFunctionNode = class StringArrayRotateFunctionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options, escapeSequenceEncoder) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
        this.escapeSequenceEncoder = escapeSequenceEncoder;
    }
    initialize(stringArrayName, stringArrayRotationAmount) {
        this.stringArrayName = stringArrayName;
        this.stringArrayRotationAmount = stringArrayRotationAmount;
    }
    getNodeStructure(nodeTemplate) {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(nodeTemplate);
    }
    getNodeTemplate() {
        const timesName = this.identifierNamesGenerator.generate();
        const whileFunctionName = this.identifierNamesGenerator.generate();
        const preservedNames = [this.stringArrayName];
        let code = '';
        if (this.options.selfDefending) {
            code = this.customNodeFormatter.formatTemplate(SelfDefendingTemplate_1.SelfDefendingTemplate(this.escapeSequenceEncoder), {
                timesName,
                whileFunctionName
            });
        }
        else {
            code = `${whileFunctionName}(++${timesName})`;
        }
        return this.obfuscateTemplate(this.customNodeFormatter.formatTemplate(StringArrayRotateFunctionTemplate_1.StringArrayRotateFunctionTemplate(), {
            code,
            timesName,
            whileFunctionName,
            stringArrayName: this.stringArrayName,
            stringArrayRotationAmount: NumberUtils_1.NumberUtils.toHex(this.stringArrayRotationAmount)
        }), {
            reservedNames: preservedNames
        });
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], StringArrayRotateFunctionNode.prototype, "stringArrayName", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", Number)
], StringArrayRotateFunctionNode.prototype, "stringArrayRotationAmount", void 0);
StringArrayRotateFunctionNode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeFormatter)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof ICustomNodeFormatter_1.ICustomNodeFormatter !== "undefined" && ICustomNodeFormatter_1.ICustomNodeFormatter) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object, typeof (_e = typeof IEscapeSequenceEncoder_1.IEscapeSequenceEncoder !== "undefined" && IEscapeSequenceEncoder_1.IEscapeSequenceEncoder) === "function" ? _e : Object])
], StringArrayRotateFunctionNode);
exports.StringArrayRotateFunctionNode = StringArrayRotateFunctionNode;


/***/ }),

/***/ "./src/custom-nodes/string-array-nodes/group/StringArrayCustomNodeGroup.ts":
/*!*********************************************************************************!*\
  !*** ./src/custom-nodes/string-array-nodes/group/StringArrayCustomNodeGroup.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TCustomNodeFactory_1 = __webpack_require__(/*! ../../../types/container/custom-nodes/TCustomNodeFactory */ "./src/types/container/custom-nodes/TCustomNodeFactory.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const IStringArrayStorage_1 = __webpack_require__(/*! ../../../interfaces/storages/string-array-storage/IStringArrayStorage */ "./src/interfaces/storages/string-array-storage/IStringArrayStorage.ts");
const Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const CustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/CustomNode */ "./src/enums/custom-nodes/CustomNode.ts");
const ObfuscationEvent_1 = __webpack_require__(/*! ../../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");
const AbstractCustomNodeGroup_1 = __webpack_require__(/*! ../../AbstractCustomNodeGroup */ "./src/custom-nodes/AbstractCustomNodeGroup.ts");
const NodeAppender_1 = __webpack_require__(/*! ../../../node/NodeAppender */ "./src/node/NodeAppender.ts");
let StringArrayCustomNodeGroup = class StringArrayCustomNodeGroup extends AbstractCustomNodeGroup_1.AbstractCustomNodeGroup {
    constructor(customNodeFactory, stringArrayStorage, identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
        this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.AfterObfuscation;
        this.customNodeFactory = customNodeFactory;
        this.stringArrayStorage = stringArrayStorage;
    }
    appendCustomNodes(nodeWithStatements, callsGraphData) {
        if (!this.stringArrayStorage.getLength()) {
            return;
        }
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.StringArrayNode, (customNode) => {
            NodeAppender_1.NodeAppender.prepend(nodeWithStatements, customNode.getNode());
        });
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.StringArrayCallsWrapper, (customNode) => {
            NodeAppender_1.NodeAppender.insertAtIndex(nodeWithStatements, customNode.getNode(), 1);
        });
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.StringArrayRotateFunctionNode, (customNode) => {
            NodeAppender_1.NodeAppender.insertAtIndex(nodeWithStatements, customNode.getNode(), 1);
        });
    }
    initialize() {
        this.customNodes = new Map();
        if (!this.options.stringArray) {
            return;
        }
        const stringArrayNode = this.customNodeFactory(CustomNode_1.CustomNode.StringArrayNode);
        const stringArrayCallsWrapper = this.customNodeFactory(CustomNode_1.CustomNode.StringArrayCallsWrapper);
        const stringArrayRotateFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.StringArrayRotateFunctionNode);
        const stringArrayName = this.stringArrayStorage.getStorageName();
        const stringArrayCallsWrapperName = this.stringArrayStorage.getStorageCallsWrapperName();
        const stringArrayRotationAmount = this.stringArrayStorage.getRotationAmount();
        stringArrayNode.initialize(this.stringArrayStorage, stringArrayName);
        stringArrayCallsWrapper.initialize(stringArrayName, stringArrayCallsWrapperName);
        stringArrayRotateFunctionNode.initialize(stringArrayName, stringArrayRotationAmount);
        this.customNodes.set(CustomNode_1.CustomNode.StringArrayNode, stringArrayNode);
        this.customNodes.set(CustomNode_1.CustomNode.StringArrayCallsWrapper, stringArrayCallsWrapper);
        if (this.options.rotateStringArray) {
            this.customNodes.set(CustomNode_1.CustomNode.StringArrayRotateFunctionNode, stringArrayRotateFunctionNode);
        }
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_a = typeof Map !== "undefined" && Map) === "function" ? _a : Object)
], StringArrayCustomNodeGroup.prototype, "customNodes", void 0);
StringArrayCustomNodeGroup = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IStringArrayStorage)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_b = typeof TCustomNodeFactory_1.TCustomNodeFactory !== "undefined" && TCustomNodeFactory_1.TCustomNodeFactory) === "function" ? _b : Object, typeof (_c = typeof IStringArrayStorage_1.IStringArrayStorage !== "undefined" && IStringArrayStorage_1.IStringArrayStorage) === "function" ? _c : Object, typeof (_d = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _d : Object, typeof (_e = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _e : Object, typeof (_f = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _f : Object])
], StringArrayCustomNodeGroup);
exports.StringArrayCustomNodeGroup = StringArrayCustomNodeGroup;


/***/ }),

/***/ "./src/decorators/Initializable.ts":
/*!*****************************************!*\
  !*** ./src/decorators/Initializable.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const defaultDescriptor = {
    configurable: true,
    enumerable: true
};
const initializedTargetMetadataKey = '_initialized';
const initializablePropertiesSetMetadataKey = '_initializablePropertiesSet';
const wrappedMethodsSetMetadataKey = '_wrappedMethodsSet';
const constructorMethodName = 'constructor';
function initializable(initializeMethodName = 'initialize') {
    const decoratorName = Object.keys(this)[0];
    return (target, propertyKey) => {
        const initializeMethod = target[initializeMethodName];
        if (!initializeMethod || typeof initializeMethod !== 'function') {
            throw new Error(`\`${initializeMethodName}\` method with initialization logic not ` +
                `found. \`@${decoratorName}\` decorator requires \`${initializeMethodName}\` method`);
        }
        initializeTargetMetadata(initializedTargetMetadataKey, false, target);
        initializeTargetMetadata(initializablePropertiesSetMetadataKey, new Set(), target);
        initializeTargetMetadata(wrappedMethodsSetMetadataKey, new Set(), target);
        wrapTargetMethodsInInitializedCheck(target, initializeMethodName);
        wrapInitializeMethodInInitializeCheck(target, initializeMethodName, propertyKey);
        return wrapInitializableProperty(target, propertyKey);
    };
}
exports.initializable = initializable;
function initializeTargetMetadata(metadataKey, metadataValue, target) {
    const hasInitializedMetadata = Reflect.hasMetadata(metadataKey, target);
    if (!hasInitializedMetadata) {
        Reflect.defineMetadata(metadataKey, metadataValue, target);
    }
}
function wrapTargetMethodsInInitializedCheck(target, initializeMethodName) {
    const ownPropertyNames = Object.getOwnPropertyNames(target);
    const prohibitedPropertyNames = [initializeMethodName, constructorMethodName];
    ownPropertyNames.forEach((propertyName) => {
        var _a;
        const initializablePropertiesSet = Reflect
            .getMetadata(initializablePropertiesSetMetadataKey, target);
        const wrappedMethodsSet = Reflect
            .getMetadata(wrappedMethodsSetMetadataKey, target);
        const isProhibitedPropertyName = prohibitedPropertyNames.includes(propertyName)
            || initializablePropertiesSet.has(propertyName)
            || wrappedMethodsSet.has(propertyName);
        if (isProhibitedPropertyName) {
            return;
        }
        const targetProperty = target[propertyName];
        if (typeof targetProperty !== 'function') {
            return;
        }
        const methodDescriptor = (_a = Object
            .getOwnPropertyDescriptor(target, propertyName)) !== null && _a !== void 0 ? _a : defaultDescriptor;
        const originalMethod = methodDescriptor.value;
        Object.defineProperty(target, propertyName, Object.assign(Object.assign({}, methodDescriptor), { value() {
                if (!Reflect.getMetadata(initializedTargetMetadataKey, this)) {
                    throw new Error(`Class should be initialized with \`${initializeMethodName}()\` method`);
                }
                return originalMethod.apply(this, arguments);
            } }));
        wrappedMethodsSet.add(propertyName);
    });
}
function wrapInitializeMethodInInitializeCheck(target, initializeMethodName, propertyKey) {
    var _a;
    const methodDescriptor = (_a = Object
        .getOwnPropertyDescriptor(target, initializeMethodName)) !== null && _a !== void 0 ? _a : defaultDescriptor;
    const originalMethod = methodDescriptor.value;
    Object.defineProperty(target, initializeMethodName, Object.assign(Object.assign({}, methodDescriptor), { value: function () {
            Reflect.defineMetadata(initializedTargetMetadataKey, true, this);
            const result = originalMethod.apply(this, arguments);
            if (this[propertyKey]) { }
            return result;
        } }));
}
function wrapInitializableProperty(target, propertyKey) {
    var _a;
    const initializablePropertiesSet = Reflect
        .getMetadata(initializablePropertiesSetMetadataKey, target);
    initializablePropertiesSet.add(propertyKey);
    const initializablePropertyMetadataKey = `_${propertyKey.toString()}`;
    const propertyDescriptor = (_a = Object
        .getOwnPropertyDescriptor(target, initializablePropertyMetadataKey)) !== null && _a !== void 0 ? _a : defaultDescriptor;
    Object.defineProperty(target, propertyKey, Object.assign(Object.assign({}, propertyDescriptor), { get: function () {
            if (this[initializablePropertyMetadataKey] === undefined) {
                throw new Error(`Property \`${propertyKey.toString()}\` is not initialized! Initialize it first!`);
            }
            return this[initializablePropertyMetadataKey];
        }, set: function (newVal) {
            this[initializablePropertyMetadataKey] = newVal;
        } }));
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

Object.defineProperty(exports, "__esModule", { value: true });
const tsenum_1 = __webpack_require__(/*! @gradecam/tsenum */ "@gradecam/tsenum");
exports.ObfuscationTarget = tsenum_1.MakeEnum({
    Browser: 'browser',
    BrowserNoEval: 'browser-no-eval',
    Node: 'node'
});


/***/ }),

/***/ "./src/enums/StringArrayEncoding.ts":
/*!******************************************!*\
  !*** ./src/enums/StringArrayEncoding.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tsenum_1 = __webpack_require__(/*! @gradecam/tsenum */ "@gradecam/tsenum");
exports.StringArrayEncoding = tsenum_1.MakeEnum({
    Base64: 'base64',
    Rc4: 'rc4'
});


/***/ }),

/***/ "./src/enums/StringSeparator.ts":
/*!**************************************!*\
  !*** ./src/enums/StringSeparator.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StringSeparator;
(function (StringSeparator) {
    StringSeparator["Dot"] = ".";
    StringSeparator["Comma"] = ",";
})(StringSeparator = exports.StringSeparator || (exports.StringSeparator = {}));


/***/ }),

/***/ "./src/enums/analyzers/calls-graph-analyzer/CalleeDataExtractor.ts":
/*!*************************************************************************!*\
  !*** ./src/enums/analyzers/calls-graph-analyzer/CalleeDataExtractor.ts ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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

Object.defineProperty(exports, "__esModule", { value: true });
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

Object.defineProperty(exports, "__esModule", { value: true });
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

Object.defineProperty(exports, "__esModule", { value: true });
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

Object.defineProperty(exports, "__esModule", { value: true });
var DeadCodeInjectionCustomNode;
(function (DeadCodeInjectionCustomNode) {
    DeadCodeInjectionCustomNode["BlockStatementDeadCodeInjectionNode"] = "BlockStatementDeadCodeInjectionNode";
})(DeadCodeInjectionCustomNode = exports.DeadCodeInjectionCustomNode || (exports.DeadCodeInjectionCustomNode = {}));


/***/ }),

/***/ "./src/enums/custom-nodes/ObjectExpressionKeysTransformerCustomNode.ts":
/*!*****************************************************************************!*\
  !*** ./src/enums/custom-nodes/ObjectExpressionKeysTransformerCustomNode.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ObjectExpressionKeysTransformerCustomNode;
(function (ObjectExpressionKeysTransformerCustomNode) {
    ObjectExpressionKeysTransformerCustomNode["ObjectExpressionVariableDeclarationHostNode"] = "ObjectExpressionVariableDeclarationHostNode";
})(ObjectExpressionKeysTransformerCustomNode = exports.ObjectExpressionKeysTransformerCustomNode || (exports.ObjectExpressionKeysTransformerCustomNode = {}));


/***/ }),

/***/ "./src/enums/event-emitters/ObfuscationEvent.ts":
/*!******************************************************!*\
  !*** ./src/enums/event-emitters/ObfuscationEvent.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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

Object.defineProperty(exports, "__esModule", { value: true });
const tsenum_1 = __webpack_require__(/*! @gradecam/tsenum */ "@gradecam/tsenum");
exports.IdentifierNamesGenerator = tsenum_1.MakeEnum({
    DictionaryIdentifierNamesGenerator: 'dictionary',
    HexadecimalIdentifierNamesGenerator: 'hexadecimal',
    MangledIdentifierNamesGenerator: 'mangled'
});


/***/ }),

/***/ "./src/enums/logger/LoggingMessage.ts":
/*!********************************************!*\
  !*** ./src/enums/logger/LoggingMessage.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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

Object.defineProperty(exports, "__esModule", { value: true });
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

Object.defineProperty(exports, "__esModule", { value: true });
var NodeTransformer;
(function (NodeTransformer) {
    NodeTransformer["BlockStatementControlFlowTransformer"] = "BlockStatementControlFlowTransformer";
    NodeTransformer["CommentsTransformer"] = "CommentsTransformer";
    NodeTransformer["CustomNodesTransformer"] = "CustomNodesTransformer";
    NodeTransformer["DeadCodeInjectionTransformer"] = "DeadCodeInjectionTransformer";
    NodeTransformer["EvalCallExpressionTransformer"] = "EvalCallExpressionTransformer";
    NodeTransformer["FunctionControlFlowTransformer"] = "FunctionControlFlowTransformer";
    NodeTransformer["LabeledStatementTransformer"] = "LabeledStatementTransformer";
    NodeTransformer["LiteralTransformer"] = "LiteralTransformer";
    NodeTransformer["MemberExpressionTransformer"] = "MemberExpressionTransformer";
    NodeTransformer["MetadataTransformer"] = "MetadataTransformer";
    NodeTransformer["MethodDefinitionTransformer"] = "MethodDefinitionTransformer";
    NodeTransformer["ObfuscatingGuardsTransformer"] = "ObfuscatingGuardsTransformer";
    NodeTransformer["ObjectExpressionKeysTransformer"] = "ObjectExpressionKeysTransformer";
    NodeTransformer["ObjectExpressionTransformer"] = "ObjectExpressionTransformer";
    NodeTransformer["ParentificationTransformer"] = "ParentificationTransformer";
    NodeTransformer["ScopeIdentifiersTransformer"] = "ScopeIdentifiersTransformer";
    NodeTransformer["SplitStringTransformer"] = "SplitStringTransformer";
    NodeTransformer["TemplateLiteralTransformer"] = "TemplateLiteralTransformer";
    NodeTransformer["VariablePreserveTransformer"] = "VariablePreserveTransformer";
})(NodeTransformer = exports.NodeTransformer || (exports.NodeTransformer = {}));


/***/ }),

/***/ "./src/enums/node-transformers/TransformationStage.ts":
/*!************************************************************!*\
  !*** ./src/enums/node-transformers/TransformationStage.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TransformationStage;
(function (TransformationStage) {
    TransformationStage["Initializing"] = "Initializing";
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

Object.defineProperty(exports, "__esModule", { value: true });
var VisitorDirection;
(function (VisitorDirection) {
    VisitorDirection["Enter"] = "enter";
    VisitorDirection["Leave"] = "leave";
})(VisitorDirection = exports.VisitorDirection || (exports.VisitorDirection = {}));


/***/ }),

/***/ "./src/enums/node-transformers/converting-transformers/properties-extractors/ObjectExpressionExtractor.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/enums/node-transformers/converting-transformers/properties-extractors/ObjectExpressionExtractor.ts ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ObjectExpressionExtractor;
(function (ObjectExpressionExtractor) {
    ObjectExpressionExtractor["BasePropertiesExtractor"] = "BasePropertiesExtractor";
    ObjectExpressionExtractor["ObjectExpressionToVariableDeclarationExtractor"] = "ObjectExpressionToVariableDeclarationExtractor";
})(ObjectExpressionExtractor = exports.ObjectExpressionExtractor || (exports.ObjectExpressionExtractor = {}));


/***/ }),

/***/ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer.ts ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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

Object.defineProperty(exports, "__esModule", { value: true });
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

Object.defineProperty(exports, "__esModule", { value: true });
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

Object.defineProperty(exports, "__esModule", { value: true });
var ObfuscatingGuard;
(function (ObfuscatingGuard) {
    ObfuscatingGuard["BlackListObfuscatingGuard"] = "BlackListObfuscatingGuard";
    ObfuscatingGuard["ConditionalCommentObfuscatingGuard"] = "ConditionalCommentObfuscatingGuard";
    ObfuscatingGuard["ReservedStringObfuscatingGuard"] = "ReservedStringObfuscatingGuard";
})(ObfuscatingGuard = exports.ObfuscatingGuard || (exports.ObfuscatingGuard = {}));


/***/ }),

/***/ "./src/enums/node/NodeType.ts":
/*!************************************!*\
  !*** ./src/enums/node/NodeType.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    NodeType["ConditionalExpression"] = "ConditionalExpression";
    NodeType["ContinueStatement"] = "ContinueStatement";
    NodeType["ExportNamedDeclaration"] = "ExportNamedDeclaration";
    NodeType["ExpressionStatement"] = "ExpressionStatement";
    NodeType["ForStatement"] = "ForStatement";
    NodeType["ForInStatement"] = "ForInStatement";
    NodeType["ForOfStatement"] = "ForOfStatement";
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
    NodeType["SequenceExpression"] = "SequenceExpression";
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

Object.defineProperty(exports, "__esModule", { value: true });
const tsenum_1 = __webpack_require__(/*! @gradecam/tsenum */ "@gradecam/tsenum");
exports.SourceMapMode = tsenum_1.MakeEnum({
    Inline: 'inline',
    Separate: 'separate'
});


/***/ }),

/***/ "./src/event-emitters/ObfuscationEventEmitter.ts":
/*!*******************************************************!*\
  !*** ./src/event-emitters/ObfuscationEventEmitter.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const eventemitter3_1 = __importDefault(__webpack_require__(/*! eventemitter3 */ "eventemitter3"));
inversify_1.decorate(inversify_1.injectable(), eventemitter3_1.default);
let ObfuscationEventEmitter = class ObfuscationEventEmitter extends eventemitter3_1.default {
};
ObfuscationEventEmitter = __decorate([
    inversify_1.injectable()
], ObfuscationEventEmitter);
exports.ObfuscationEventEmitter = ObfuscationEventEmitter;


/***/ }),

/***/ "./src/generators/identifier-names-generators/AbstractIdentifierNamesGenerator.ts":
/*!****************************************************************************************!*\
  !*** ./src/generators/identifier-names-generators/AbstractIdentifierNamesGenerator.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
let AbstractIdentifierNamesGenerator = class AbstractIdentifierNamesGenerator {
    constructor(randomGenerator, options) {
        this.preservedNamesSet = new Set();
        this.lexicalScopesPreservedNamesMap = new Map();
        this.randomGenerator = randomGenerator;
        this.options = options;
    }
    getPreservedNames() {
        const lexicalScopesPreservedNames = Array.from(this.lexicalScopesPreservedNamesMap.values());
        const preservedNames = Array.from(this.preservedNamesSet);
        for (const lexicalScopePreservedNames of lexicalScopesPreservedNames) {
            preservedNames.push(...lexicalScopePreservedNames);
        }
        return new Set(preservedNames);
    }
    preserveName(name) {
        this.preservedNamesSet.add(name);
    }
    preserveNameForLexicalScope(name, lexicalScopeNode) {
        var _a;
        const preservedNamesForLexicalScopeSet = (_a = this.lexicalScopesPreservedNamesMap.get(lexicalScopeNode)) !== null && _a !== void 0 ? _a : new Set();
        preservedNamesForLexicalScopeSet.add(name);
        this.lexicalScopesPreservedNamesMap.set(lexicalScopeNode, preservedNamesForLexicalScopeSet);
    }
    isValidIdentifierName(name) {
        return this.notReservedName(name) && !this.preservedNamesSet.has(name);
    }
    isValidIdentifierNameInLexicalScopes(name, lexicalScopeNodes) {
        var _a;
        if (!this.isValidIdentifierName(name)) {
            return false;
        }
        for (const lexicalScope of lexicalScopeNodes) {
            const preservedNamesForLexicalScopeSet = (_a = this.lexicalScopesPreservedNamesMap.get(lexicalScope)) !== null && _a !== void 0 ? _a : null;
            if (!preservedNamesForLexicalScopeSet) {
                continue;
            }
            if (preservedNamesForLexicalScopeSet.has(name)) {
                return false;
            }
        }
        return true;
    }
    notReservedName(name) {
        return this.options.reservedNames.length
            ? !this.options.reservedNames.some((reservedName) => new RegExp(reservedName, 'g').exec(name) !== null)
            : true;
    }
};
AbstractIdentifierNamesGenerator = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], AbstractIdentifierNamesGenerator);
exports.AbstractIdentifierNamesGenerator = AbstractIdentifierNamesGenerator;


/***/ }),

/***/ "./src/generators/identifier-names-generators/DictionaryIdentifierNamesGenerator.ts":
/*!******************************************************************************************!*\
  !*** ./src/generators/identifier-names-generators/DictionaryIdentifierNamesGenerator.ts ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DictionaryIdentifierNamesGenerator_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IArrayUtils_1 = __webpack_require__(/*! ../../interfaces/utils/IArrayUtils */ "./src/interfaces/utils/IArrayUtils.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const AbstractIdentifierNamesGenerator_1 = __webpack_require__(/*! ./AbstractIdentifierNamesGenerator */ "./src/generators/identifier-names-generators/AbstractIdentifierNamesGenerator.ts");
const NodeLexicalScopeUtils_1 = __webpack_require__(/*! ../../node/NodeLexicalScopeUtils */ "./src/node/NodeLexicalScopeUtils.ts");
let DictionaryIdentifierNamesGenerator = DictionaryIdentifierNamesGenerator_1 = class DictionaryIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator_1.AbstractIdentifierNamesGenerator {
    constructor(randomGenerator, options, arrayUtils) {
        super(randomGenerator, options);
        this.arrayUtils = arrayUtils;
        this.identifierNamesSet = new Set(this.getInitialIdentifierNames(this.options.identifiersDictionary));
        this.identifiersIterator = this.identifierNamesSet.values();
    }
    static incrementIdentifierName(identifierName) {
        let newIdentifierName = '';
        let isSuccess = false;
        for (const character of identifierName) {
            if (!isSuccess && character === character.toUpperCase()) {
                newIdentifierName += character.toLowerCase();
            }
            else if (!isSuccess && character === character.toLowerCase()) {
                newIdentifierName += character.toUpperCase();
                isSuccess = true;
            }
            else {
                newIdentifierName += character;
            }
        }
        if (isSuccess) {
            return newIdentifierName;
        }
        return null;
    }
    generate() {
        const identifierName = this.generateNewDictionaryName();
        this.preserveName(identifierName);
        return identifierName;
    }
    generateForLexicalScope(lexicalScopeNode) {
        const lexicalScopes = [
            lexicalScopeNode,
            ...NodeLexicalScopeUtils_1.NodeLexicalScopeUtils.getLexicalScopes(lexicalScopeNode)
        ];
        const identifierName = this.generateNewDictionaryName();
        if (!this.isValidIdentifierNameInLexicalScopes(identifierName, lexicalScopes)) {
            return this.generateForLexicalScope(lexicalScopeNode);
        }
        this.preserveNameForLexicalScope(identifierName, lexicalScopeNode);
        return identifierName;
    }
    generateWithPrefix() {
        const prefix = this.options.identifiersPrefix ?
            `${this.options.identifiersPrefix}`
            : '';
        const identifierName = this.generateNewDictionaryName();
        const identifierNameWithPrefix = `${prefix}${identifierName}`;
        if (!this.isValidIdentifierName(identifierNameWithPrefix)) {
            return this.generateWithPrefix();
        }
        this.preserveName(identifierNameWithPrefix);
        return identifierNameWithPrefix;
    }
    generateNewDictionaryName() {
        if (!this.identifierNamesSet.size) {
            throw new Error('Too many identifiers in the code, add more words to identifiers dictionary');
        }
        const iteratorResult = this.identifiersIterator.next();
        if (!iteratorResult.done) {
            const identifierName = iteratorResult.value;
            if (!this.isValidIdentifierName(identifierName)) {
                return this.generateNewDictionaryName();
            }
            return iteratorResult.value;
        }
        this.identifierNamesSet = new Set(this.getIncrementedIdentifierNames([...this.identifierNamesSet]));
        this.identifiersIterator = this.identifierNamesSet.values();
        return this.generateNewDictionaryName();
    }
    getInitialIdentifierNames(identifierNames) {
        const formattedIdentifierNames = identifierNames
            .filter(Boolean)
            .map((identifierName) => identifierName.toLowerCase());
        return this.arrayUtils.shuffle(formattedIdentifierNames);
    }
    getIncrementedIdentifierNames(identifierNames) {
        const formattedIdentifierNames = [];
        for (const identifierName of identifierNames) {
            const newIdentifierName = DictionaryIdentifierNamesGenerator_1
                .incrementIdentifierName(identifierName);
            if (newIdentifierName) {
                formattedIdentifierNames.push(newIdentifierName);
            }
        }
        return this.arrayUtils.shuffle(formattedIdentifierNames);
    }
};
DictionaryIdentifierNamesGenerator = DictionaryIdentifierNamesGenerator_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IArrayUtils)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object, typeof (_c = typeof IArrayUtils_1.IArrayUtils !== "undefined" && IArrayUtils_1.IArrayUtils) === "function" ? _c : Object])
], DictionaryIdentifierNamesGenerator);
exports.DictionaryIdentifierNamesGenerator = DictionaryIdentifierNamesGenerator;


/***/ }),

/***/ "./src/generators/identifier-names-generators/HexadecimalIdentifierNamesGenerator.ts":
/*!*******************************************************************************************!*\
  !*** ./src/generators/identifier-names-generators/HexadecimalIdentifierNamesGenerator.ts ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var HexadecimalIdentifierNamesGenerator_1, _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const AbstractIdentifierNamesGenerator_1 = __webpack_require__(/*! ./AbstractIdentifierNamesGenerator */ "./src/generators/identifier-names-generators/AbstractIdentifierNamesGenerator.ts");
const NumberUtils_1 = __webpack_require__(/*! ../../utils/NumberUtils */ "./src/utils/NumberUtils.ts");
const Utils_1 = __webpack_require__(/*! ../../utils/Utils */ "./src/utils/Utils.ts");
let HexadecimalIdentifierNamesGenerator = HexadecimalIdentifierNamesGenerator_1 = class HexadecimalIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator_1.AbstractIdentifierNamesGenerator {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
        this.randomVariableNameSet = new Set();
    }
    generate(nameLength) {
        const rangeMinInteger = 10000;
        const rangeMaxInteger = 99999999;
        const randomInteger = this.randomGenerator.getRandomInteger(rangeMinInteger, rangeMaxInteger);
        const hexadecimalNumber = NumberUtils_1.NumberUtils.toHex(randomInteger);
        const prefixLength = Utils_1.Utils.hexadecimalPrefix.length + 1;
        const baseNameLength = nameLength
            ? nameLength - prefixLength
            : HexadecimalIdentifierNamesGenerator_1.baseIdentifierNameLength;
        const baseIdentifierName = hexadecimalNumber.substr(0, baseNameLength);
        const identifierName = `_${Utils_1.Utils.hexadecimalPrefix}${baseIdentifierName}`;
        if (this.randomVariableNameSet.has(identifierName)) {
            return this.generate(nameLength);
        }
        this.randomVariableNameSet.add(identifierName);
        return identifierName;
    }
    generateForLexicalScope(lexicalScopeNode, nameLength) {
        return this.generate(nameLength);
    }
    generateWithPrefix(nameLength) {
        const identifierName = this.generate(nameLength);
        return `${this.options.identifiersPrefix}${identifierName}`.replace('__', '_');
    }
};
HexadecimalIdentifierNamesGenerator.baseIdentifierNameLength = 6;
HexadecimalIdentifierNamesGenerator = HexadecimalIdentifierNamesGenerator_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], HexadecimalIdentifierNamesGenerator);
exports.HexadecimalIdentifierNamesGenerator = HexadecimalIdentifierNamesGenerator;


/***/ }),

/***/ "./src/generators/identifier-names-generators/MangledIdentifierNamesGenerator.ts":
/*!***************************************************************************************!*\
  !*** ./src/generators/identifier-names-generators/MangledIdentifierNamesGenerator.ts ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MangledIdentifierNamesGenerator_1, _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const AbstractIdentifierNamesGenerator_1 = __webpack_require__(/*! ./AbstractIdentifierNamesGenerator */ "./src/generators/identifier-names-generators/AbstractIdentifierNamesGenerator.ts");
const NodeLexicalScopeUtils_1 = __webpack_require__(/*! ../../node/NodeLexicalScopeUtils */ "./src/node/NodeLexicalScopeUtils.ts");
let MangledIdentifierNamesGenerator = MangledIdentifierNamesGenerator_1 = class MangledIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator_1.AbstractIdentifierNamesGenerator {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
        this.previousMangledName = MangledIdentifierNamesGenerator_1.initMangledNameCharacter;
    }
    generate(nameLength) {
        const identifierName = this.generateNewMangledName(this.previousMangledName);
        this.previousMangledName = identifierName;
        this.preserveName(identifierName);
        return identifierName;
    }
    generateForLexicalScope(lexicalScopeNode, nameLength) {
        const lexicalScopes = [
            lexicalScopeNode,
            ...NodeLexicalScopeUtils_1.NodeLexicalScopeUtils.getLexicalScopes(lexicalScopeNode)
        ];
        const lastMangledNameForScope = this.getLastMangledNameForScopes(lexicalScopes);
        let identifierName = lastMangledNameForScope;
        do {
            identifierName = this.generateNewMangledName(identifierName);
        } while (!this.isValidIdentifierNameInLexicalScopes(identifierName, lexicalScopes));
        MangledIdentifierNamesGenerator_1.lastMangledNameInScopeMap.set(lexicalScopeNode, identifierName);
        this.preserveNameForLexicalScope(identifierName, lexicalScopeNode);
        return identifierName;
    }
    generateWithPrefix(nameLength) {
        const prefix = this.options.identifiersPrefix ?
            `${this.options.identifiersPrefix}`
            : '';
        const identifierName = this.generateNewMangledName(this.previousMangledName);
        const identifierNameWithPrefix = `${prefix}${identifierName}`;
        this.previousMangledName = identifierName;
        if (!this.isValidIdentifierName(identifierNameWithPrefix)) {
            return this.generateWithPrefix(nameLength);
        }
        this.preserveName(identifierNameWithPrefix);
        return identifierNameWithPrefix;
    }
    isValidIdentifierName(mangledName) {
        return super.isValidIdentifierName(mangledName)
            && !MangledIdentifierNamesGenerator_1.reservedNamesSet.has(mangledName);
    }
    generateNewMangledName(previousMangledName) {
        const generateNewMangledName = (name) => {
            const nameSequence = MangledIdentifierNamesGenerator_1.nameSequence;
            const nameSequenceLength = nameSequence.length;
            const nameLength = name.length;
            const zeroSequence = (num) => {
                return '0'.repeat(num);
            };
            let index = nameLength - 1;
            do {
                const character = name[index];
                const indexInSequence = nameSequence.indexOf(character);
                const lastNameSequenceIndex = nameSequenceLength - 1;
                if (indexInSequence !== lastNameSequenceIndex) {
                    const previousNamePart = name.substring(0, index);
                    const nextCharacter = nameSequence[indexInSequence + 1];
                    const zeroSequenceLength = nameLength - (index + 1);
                    const zeroSequenceCharacters = zeroSequence(zeroSequenceLength);
                    return previousNamePart + nextCharacter + zeroSequenceCharacters;
                }
                --index;
            } while (index >= 0);
            return `a${zeroSequence(nameLength)}`;
        };
        let newMangledName = generateNewMangledName(previousMangledName);
        if (!this.isValidIdentifierName(newMangledName)) {
            newMangledName = this.generateNewMangledName(newMangledName);
        }
        return newMangledName;
    }
    getLastMangledNameForScopes(lexicalScopeNodes) {
        var _a;
        for (const lexicalScope of lexicalScopeNodes) {
            const lastMangledName = (_a = MangledIdentifierNamesGenerator_1.lastMangledNameInScopeMap
                .get(lexicalScope)) !== null && _a !== void 0 ? _a : null;
            if (!lastMangledName) {
                continue;
            }
            return lastMangledName;
        }
        return MangledIdentifierNamesGenerator_1.initMangledNameCharacter;
    }
};
MangledIdentifierNamesGenerator.initMangledNameCharacter = '9';
MangledIdentifierNamesGenerator.lastMangledNameInScopeMap = new Map();
MangledIdentifierNamesGenerator.nameSequence = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
MangledIdentifierNamesGenerator.reservedNamesSet = new Set([
    'byte', 'case', 'char', 'do', 'else', 'enum', 'eval', 'for', 'goto',
    'if', 'in', 'int', 'let', 'long', 'new', 'null', 'this', 'true', 'try',
    'var', 'void', 'with'
]);
MangledIdentifierNamesGenerator = MangledIdentifierNamesGenerator_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], MangledIdentifierNamesGenerator);
exports.MangledIdentifierNamesGenerator = MangledIdentifierNamesGenerator;


/***/ }),

/***/ "./src/interfaces/analyzers/calls-graph-analyzer/ICallsGraphAnalyzer.ts":
/*!******************************************************************************!*\
  !*** ./src/interfaces/analyzers/calls-graph-analyzer/ICallsGraphAnalyzer.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer.ts":
/*!*********************************************************************************************!*\
  !*** ./src/interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer.ts ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/analyzers/scope-analyzer/IScopeAnalyzer.ts":
/*!*******************************************************************!*\
  !*** ./src/interfaces/analyzers/scope-analyzer/IScopeAnalyzer.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer.ts":
/*!***********************************************************************************************!*\
  !*** ./src/interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer.ts ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/custom-nodes/ICustomNodeFormatter.ts":
/*!*************************************************************!*\
  !*** ./src/interfaces/custom-nodes/ICustomNodeFormatter.ts ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/event-emitters/IObfuscationEventEmitter.ts":
/*!*******************************************************************!*\
  !*** ./src/interfaces/event-emitters/IObfuscationEventEmitter.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/logger/ILogger.ts":
/*!******************************************!*\
  !*** ./src/interfaces/logger/ILogger.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/node-transformers/ITransformersRunner.ts":
/*!*****************************************************************!*\
  !*** ./src/interfaces/node-transformers/ITransformersRunner.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/node/IScopeIdentifiersTraverser.ts":
/*!***********************************************************!*\
  !*** ./src/interfaces/node/IScopeIdentifiersTraverser.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/options/IOptions.ts":
/*!********************************************!*\
  !*** ./src/interfaces/options/IOptions.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/options/IOptionsNormalizer.ts":
/*!******************************************************!*\
  !*** ./src/interfaces/options/IOptionsNormalizer.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/source-code/ISourceCode.ts":
/*!***************************************************!*\
  !*** ./src/interfaces/source-code/ISourceCode.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/storages/string-array-storage/IStringArrayStorage.ts":
/*!*****************************************************************************!*\
  !*** ./src/interfaces/storages/string-array-storage/IStringArrayStorage.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/utils/IArrayUtils.ts":
/*!*********************************************!*\
  !*** ./src/interfaces/utils/IArrayUtils.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/utils/ICryptUtils.ts":
/*!*********************************************!*\
  !*** ./src/interfaces/utils/ICryptUtils.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/utils/IEscapeSequenceEncoder.ts":
/*!********************************************************!*\
  !*** ./src/interfaces/utils/IEscapeSequenceEncoder.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/utils/ILevelledTopologicalSorter.ts":
/*!************************************************************!*\
  !*** ./src/interfaces/utils/ILevelledTopologicalSorter.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/utils/INodeTransformerNamesGroupsBuilder.ts":
/*!********************************************************************!*\
  !*** ./src/interfaces/utils/INodeTransformerNamesGroupsBuilder.ts ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/interfaces/utils/IRandomGenerator.ts":
/*!**************************************************!*\
  !*** ./src/interfaces/utils/IRandomGenerator.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/logger/Logger.ts":
/*!******************************!*\
  !*** ./src/logger/Logger.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Logger_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const chalk_1 = __importDefault(__webpack_require__(/*! chalk */ "chalk"));
const IOptions_1 = __webpack_require__(/*! ../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const LoggingPrefix_1 = __webpack_require__(/*! ../enums/logger/LoggingPrefix */ "./src/enums/logger/LoggingPrefix.ts");
let Logger = Logger_1 = class Logger {
    constructor(options) {
        this.options = options;
    }
    static log(loggingLevelColor, loggingPrefix, loggingMessage, value) {
        const processedMessage = loggingLevelColor(`\n${loggingPrefix} ${loggingMessage}`);
        console.log(processedMessage, value !== null && value !== void 0 ? value : '');
    }
    info(loggingMessage, value) {
        if (!this.options.log) {
            return;
        }
        Logger_1.log(Logger_1.colorInfo, LoggingPrefix_1.LoggingPrefix.Base, loggingMessage, value);
    }
    success(loggingMessage, value) {
        if (!this.options.log) {
            return;
        }
        Logger_1.log(Logger_1.colorSuccess, LoggingPrefix_1.LoggingPrefix.Base, loggingMessage, value);
    }
    warn(loggingMessage, value) {
        if (!this.options.log) {
            return;
        }
        Logger_1.log(Logger_1.colorWarn, LoggingPrefix_1.LoggingPrefix.Base, loggingMessage, value);
    }
};
Logger.colorInfo = chalk_1.default.cyan;
Logger.colorSuccess = chalk_1.default.green;
Logger.colorWarn = chalk_1.default.yellow;
Logger = Logger_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _a : Object])
], Logger);
exports.Logger = Logger;


/***/ }),

/***/ "./src/node-transformers/AbstractNodeTransformer.ts":
/*!**********************************************************!*\
  !*** ./src/node-transformers/AbstractNodeTransformer.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
let AbstractNodeTransformer = class AbstractNodeTransformer {
    constructor(randomGenerator, options) {
        this.randomGenerator = randomGenerator;
        this.options = options;
    }
};
AbstractNodeTransformer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], AbstractNodeTransformer);
exports.AbstractNodeTransformer = AbstractNodeTransformer;


/***/ }),

/***/ "./src/node-transformers/TransformersRunner.ts":
/*!*****************************************************!*\
  !*** ./src/node-transformers/TransformersRunner.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const TNodeTransformerFactory_1 = __webpack_require__(/*! ../types/container/node-transformers/TNodeTransformerFactory */ "./src/types/container/node-transformers/TNodeTransformerFactory.ts");
const INodeTransformerNamesGroupsBuilder_1 = __webpack_require__(/*! ../interfaces/utils/INodeTransformerNamesGroupsBuilder */ "./src/interfaces/utils/INodeTransformerNamesGroupsBuilder.ts");
const VisitorDirection_1 = __webpack_require__(/*! ../enums/node-transformers/VisitorDirection */ "./src/enums/node-transformers/VisitorDirection.ts");
const NodeGuards_1 = __webpack_require__(/*! ../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
let TransformersRunner = class TransformersRunner {
    constructor(nodeTransformerFactory, nodeTransformerNamesGroupsBuilder) {
        this.cachedNodeTransformersData = new Map();
        this.nodeTransformerFactory = nodeTransformerFactory;
        this.nodeTransformerNamesGroupsBuilder = nodeTransformerNamesGroupsBuilder;
    }
    transform(astTree, nodeTransformerNames, transformationStage) {
        if (!nodeTransformerNames.length) {
            return astTree;
        }
        let normalizedNodeTransformers;
        let nodeTransformerNamesGroups;
        if (!this.cachedNodeTransformersData.has(nodeTransformerNames)) {
            normalizedNodeTransformers = this.buildNormalizedNodeTransformers(nodeTransformerNames);
            nodeTransformerNamesGroups = this.nodeTransformerNamesGroupsBuilder.build(normalizedNodeTransformers);
            this.cachedNodeTransformersData.set(nodeTransformerNames, [normalizedNodeTransformers, nodeTransformerNamesGroups]);
        }
        else {
            [
                normalizedNodeTransformers,
                nodeTransformerNamesGroups
            ] = this.cachedNodeTransformersData.get(nodeTransformerNames);
        }
        for (const nodeTransformerNamesGroup of nodeTransformerNamesGroups) {
            const enterVisitors = [];
            const leaveVisitors = [];
            for (const nodeTransformerName of nodeTransformerNamesGroup) {
                const nodeTransformer = normalizedNodeTransformers[nodeTransformerName];
                const visitor = nodeTransformer.getVisitor(transformationStage);
                if (!visitor) {
                    continue;
                }
                if (visitor.enter) {
                    enterVisitors.push({ enter: visitor.enter });
                }
                if (visitor.leave) {
                    leaveVisitors.push({ leave: visitor.leave });
                }
            }
            if (!enterVisitors.length && !leaveVisitors.length) {
                continue;
            }
            estraverse.replace(astTree, {
                enter: this.mergeVisitorsForDirection(enterVisitors, VisitorDirection_1.VisitorDirection.Enter),
                leave: this.mergeVisitorsForDirection(leaveVisitors, VisitorDirection_1.VisitorDirection.Leave)
            });
        }
        return astTree;
    }
    buildNormalizedNodeTransformers(nodeTransformerNames) {
        return nodeTransformerNames
            .reduce((acc, nodeTransformerName) => (Object.assign(Object.assign({}, acc), { [nodeTransformerName]: this.nodeTransformerFactory(nodeTransformerName) })), {});
    }
    mergeVisitorsForDirection(visitors, direction) {
        const visitorsLength = visitors.length;
        if (!visitorsLength) {
            return (node, parentNode) => node;
        }
        return (node, parentNode) => {
            if (NodeMetadata_1.NodeMetadata.isIgnoredNode(node)) {
                return estraverse.VisitorOption.Skip;
            }
            for (let i = 0; i < visitorsLength; i++) {
                const visitorFunction = visitors[i][direction];
                if (!visitorFunction) {
                    continue;
                }
                const visitorResult = visitorFunction(node, parentNode);
                if (!visitorResult || !NodeGuards_1.NodeGuards.isNode(visitorResult)) {
                    continue;
                }
                node = visitorResult;
            }
            return node;
        };
    }
};
TransformersRunner = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeTransformer)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformerNamesGroupsBuilder)),
    __metadata("design:paramtypes", [typeof (_a = typeof TNodeTransformerFactory_1.TNodeTransformerFactory !== "undefined" && TNodeTransformerFactory_1.TNodeTransformerFactory) === "function" ? _a : Object, typeof (_b = typeof INodeTransformerNamesGroupsBuilder_1.INodeTransformerNamesGroupsBuilder !== "undefined" && INodeTransformerNamesGroupsBuilder_1.INodeTransformerNamesGroupsBuilder) === "function" ? _b : Object])
], TransformersRunner);
exports.TransformersRunner = TransformersRunner;


/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/BlockStatementControlFlowTransformer.ts":
/*!*************************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/BlockStatementControlFlowTransformer.ts ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var BlockStatementControlFlowTransformer_1, _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const TControlFlowCustomNodeFactory_1 = __webpack_require__(/*! ../../types/container/custom-nodes/TControlFlowCustomNodeFactory */ "./src/types/container/custom-nodes/TControlFlowCustomNodeFactory.ts");
const IArrayUtils_1 = __webpack_require__(/*! ../../interfaces/utils/IArrayUtils */ "./src/interfaces/utils/IArrayUtils.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ControlFlowCustomNode_1 = __webpack_require__(/*! ../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let BlockStatementControlFlowTransformer = BlockStatementControlFlowTransformer_1 = class BlockStatementControlFlowTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(controlFlowCustomNodeFactory, arrayUtils, randomGenerator, options) {
        super(randomGenerator, options);
        this.controlFlowCustomNodeFactory = controlFlowCustomNodeFactory;
        this.arrayUtils = arrayUtils;
    }
    static isProhibitedStatementNode(node) {
        const isBreakOrContinueStatement = NodeGuards_1.NodeGuards.isBreakStatementNode(node)
            || NodeGuards_1.NodeGuards.isContinueStatementNode(node);
        const isVariableDeclarationWithLetOrConstKind = NodeGuards_1.NodeGuards.isVariableDeclarationNode(node)
            && (node.kind === 'const' || node.kind === 'let');
        const isClassDeclaration = NodeGuards_1.NodeGuards.isClassDeclarationNode(node);
        return NodeGuards_1.NodeGuards.isFunctionDeclarationNode(node)
            || isBreakOrContinueStatement
            || isVariableDeclarationWithLetOrConstKind
            || isClassDeclaration;
    }
    static canTransformBlockStatementNode(blockStatementNode) {
        let canTransform = true;
        estraverse.traverse(blockStatementNode, {
            enter: (node) => {
                if (NodeGuards_1.NodeGuards.isWhileStatementNode(node)) {
                    return estraverse.VisitorOption.Skip;
                }
                if (BlockStatementControlFlowTransformer_1.isProhibitedStatementNode(node)) {
                    canTransform = false;
                }
            }
        });
        if (blockStatementNode.body.length <= 4) {
            canTransform = false;
        }
        return canTransform;
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.ControlFlowFlattening:
                return {
                    leave: (node, parentNode) => {
                        if (parentNode && NodeGuards_1.NodeGuards.isBlockStatementNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(blockStatementNode, parentNode) {
        if (this.randomGenerator.getMathRandom() > this.options.controlFlowFlatteningThreshold ||
            !BlockStatementControlFlowTransformer_1.canTransformBlockStatementNode(blockStatementNode)) {
            return blockStatementNode;
        }
        const blockStatementBody = blockStatementNode.body;
        const originalKeys = this.arrayUtils.createWithRange(blockStatementBody.length);
        const shuffledKeys = this.arrayUtils.shuffle(originalKeys);
        const originalKeysIndexesInShuffledArray = originalKeys.map((key) => shuffledKeys.indexOf(key));
        const blockStatementControlFlowFlatteningCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.BlockStatementControlFlowFlatteningNode);
        blockStatementControlFlowFlatteningCustomNode.initialize(blockStatementBody, shuffledKeys, originalKeysIndexesInShuffledArray);
        const newBlockStatementNode = blockStatementControlFlowFlatteningCustomNode.getNode()[0];
        NodeUtils_1.NodeUtils.parentizeNode(newBlockStatementNode, parentNode);
        return newBlockStatementNode;
    }
};
BlockStatementControlFlowTransformer = BlockStatementControlFlowTransformer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IArrayUtils)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory !== "undefined" && TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory) === "function" ? _a : Object, typeof (_b = typeof IArrayUtils_1.IArrayUtils !== "undefined" && IArrayUtils_1.IArrayUtils) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], BlockStatementControlFlowTransformer);
exports.BlockStatementControlFlowTransformer = BlockStatementControlFlowTransformer;


/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/FunctionControlFlowTransformer.ts":
/*!*******************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/FunctionControlFlowTransformer.ts ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var FunctionControlFlowTransformer_1, _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const TControlFlowCustomNodeFactory_1 = __webpack_require__(/*! ../../types/container/custom-nodes/TControlFlowCustomNodeFactory */ "./src/types/container/custom-nodes/TControlFlowCustomNodeFactory.ts");
const TControlFlowReplacerFactory_1 = __webpack_require__(/*! ../../types/container/node-transformers/TControlFlowReplacerFactory */ "./src/types/container/node-transformers/TControlFlowReplacerFactory.ts");
const TControlFlowStorageFactory_1 = __webpack_require__(/*! ../../types/container/node-transformers/TControlFlowStorageFactory */ "./src/types/container/node-transformers/TControlFlowStorageFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ControlFlowCustomNode_1 = __webpack_require__(/*! ../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");
const ControlFlowReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer.ts");
const NodeType_1 = __webpack_require__(/*! ../../enums/node/NodeType */ "./src/enums/node/NodeType.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeAppender_1 = __webpack_require__(/*! ../../node/NodeAppender */ "./src/node/NodeAppender.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
const NodeStatementUtils_1 = __webpack_require__(/*! ../../node/NodeStatementUtils */ "./src/node/NodeStatementUtils.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let FunctionControlFlowTransformer = FunctionControlFlowTransformer_1 = class FunctionControlFlowTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(controlFlowStorageFactory, controlFlowReplacerFactory, controlFlowCustomNodeFactory, randomGenerator, options) {
        super(randomGenerator, options);
        this.controlFlowData = new Map();
        this.visitedFunctionNodes = new Set();
        this.hostNodesWithControlFlowNode = new Set();
        this.controlFlowStorageFactory = controlFlowStorageFactory;
        this.controlFlowReplacerFactory = controlFlowReplacerFactory;
        this.controlFlowCustomNodeFactory = controlFlowCustomNodeFactory;
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.ControlFlowFlattening:
                return {
                    leave: (node, parentNode) => {
                        if (parentNode && (NodeGuards_1.NodeGuards.isFunctionDeclarationNode(node) ||
                            NodeGuards_1.NodeGuards.isFunctionExpressionNode(node) ||
                            NodeGuards_1.NodeGuards.isArrowFunctionExpressionNode(node))) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(functionNode, parentNode) {
        this.visitedFunctionNodes.add(functionNode);
        if (!NodeGuards_1.NodeGuards.isBlockStatementNode(functionNode.body)) {
            return functionNode;
        }
        const hostNode = this.getHostNode(functionNode.body);
        const controlFlowStorage = this.getControlFlowStorage(hostNode);
        this.controlFlowData.set(hostNode, controlFlowStorage);
        this.transformFunctionBody(functionNode.body, controlFlowStorage);
        if (!controlFlowStorage.getLength()) {
            return functionNode;
        }
        const controlFlowStorageCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.ControlFlowStorageNode);
        controlFlowStorageCustomNode.initialize(controlFlowStorage);
        NodeAppender_1.NodeAppender.prepend(hostNode, controlFlowStorageCustomNode.getNode());
        this.hostNodesWithControlFlowNode.add(hostNode);
        NodeUtils_1.NodeUtils.parentizeAst(functionNode);
        return functionNode;
    }
    getControlFlowStorage(hostNode) {
        const controlFlowStorage = this.controlFlowStorageFactory();
        if (this.controlFlowData.has(hostNode)) {
            if (this.hostNodesWithControlFlowNode.has(hostNode)) {
                if (NodeGuards_1.NodeGuards.isSwitchCaseNode(hostNode)) {
                    hostNode.consequent.shift();
                }
                else {
                    hostNode.body.shift();
                }
            }
            const hostControlFlowStorage = this.controlFlowData.get(hostNode);
            controlFlowStorage.mergeWith(hostControlFlowStorage, true);
        }
        return controlFlowStorage;
    }
    getHostNode(functionNodeBody) {
        const blockScopesOfNode = NodeStatementUtils_1.NodeStatementUtils.getParentNodesWithStatements(functionNodeBody);
        if (blockScopesOfNode.length === 1) {
            return functionNodeBody;
        }
        else {
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
    isVisitedFunctionNode(node) {
        return (NodeGuards_1.NodeGuards.isFunctionDeclarationNode(node) ||
            NodeGuards_1.NodeGuards.isFunctionExpressionNode(node) ||
            NodeGuards_1.NodeGuards.isArrowFunctionExpressionNode(node)) && this.visitedFunctionNodes.has(node);
    }
    transformFunctionBody(functionNodeBody, controlFlowStorage) {
        estraverse.replace(functionNodeBody, {
            enter: (node, parentNode) => {
                if (NodeMetadata_1.NodeMetadata.isIgnoredNode(node)) {
                    return estraverse.VisitorOption.Skip;
                }
                if (this.isVisitedFunctionNode(node) || !parentNode) {
                    return estraverse.VisitorOption.Skip;
                }
                if (!FunctionControlFlowTransformer_1.controlFlowReplacersMap.has(node.type)) {
                    return node;
                }
                if (this.randomGenerator.getMathRandom() > this.options.controlFlowFlatteningThreshold) {
                    return node;
                }
                const controlFlowReplacerName = FunctionControlFlowTransformer_1
                    .controlFlowReplacersMap.get(node.type);
                if (controlFlowReplacerName === undefined) {
                    return node;
                }
                return Object.assign(Object.assign({}, this.controlFlowReplacerFactory(controlFlowReplacerName).replace(node, parentNode, controlFlowStorage)), { parentNode });
            }
        });
    }
};
FunctionControlFlowTransformer.controlFlowReplacersMap = new Map([
    [NodeType_1.NodeType.BinaryExpression, ControlFlowReplacer_1.ControlFlowReplacer.BinaryExpressionControlFlowReplacer],
    [NodeType_1.NodeType.CallExpression, ControlFlowReplacer_1.ControlFlowReplacer.CallExpressionControlFlowReplacer],
    [NodeType_1.NodeType.LogicalExpression, ControlFlowReplacer_1.ControlFlowReplacer.LogicalExpressionControlFlowReplacer],
    [NodeType_1.NodeType.Literal, ControlFlowReplacer_1.ControlFlowReplacer.StringLiteralControlFlowReplacer]
]);
FunctionControlFlowTransformer.hostNodeSearchMinDepth = 0;
FunctionControlFlowTransformer.hostNodeSearchMaxDepth = 2;
FunctionControlFlowTransformer = FunctionControlFlowTransformer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__TControlFlowStorage)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowReplacer)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TControlFlowStorageFactory_1.TControlFlowStorageFactory !== "undefined" && TControlFlowStorageFactory_1.TControlFlowStorageFactory) === "function" ? _a : Object, typeof (_b = typeof TControlFlowReplacerFactory_1.TControlFlowReplacerFactory !== "undefined" && TControlFlowReplacerFactory_1.TControlFlowReplacerFactory) === "function" ? _b : Object, typeof (_c = typeof TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory !== "undefined" && TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory) === "function" ? _c : Object, typeof (_d = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _d : Object, typeof (_e = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _e : Object])
], FunctionControlFlowTransformer);
exports.FunctionControlFlowTransformer = FunctionControlFlowTransformer;


/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/control-flow-replacers/AbstractControlFlowReplacer.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/control-flow-replacers/AbstractControlFlowReplacer.ts ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AbstractControlFlowReplacer_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TControlFlowCustomNodeFactory_1 = __webpack_require__(/*! ../../../types/container/custom-nodes/TControlFlowCustomNodeFactory */ "./src/types/container/custom-nodes/TControlFlowCustomNodeFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
let AbstractControlFlowReplacer = AbstractControlFlowReplacer_1 = class AbstractControlFlowReplacer {
    constructor(controlFlowCustomNodeFactory, randomGenerator, options) {
        this.replacerDataByControlFlowStorageId = new Map();
        this.controlFlowCustomNodeFactory = controlFlowCustomNodeFactory;
        this.randomGenerator = randomGenerator;
        this.options = options;
    }
    static getStorageKeysByIdForCurrentStorage(identifierDataByControlFlowStorageId, controlFlowStorageId) {
        let storageKeysById;
        if (identifierDataByControlFlowStorageId.has(controlFlowStorageId)) {
            storageKeysById = identifierDataByControlFlowStorageId.get(controlFlowStorageId);
        }
        else {
            storageKeysById = new Map();
        }
        return storageKeysById;
    }
    insertCustomNodeToControlFlowStorage(customNode, controlFlowStorage, replacerId, usingExistingIdentifierChance) {
        const controlFlowStorageId = controlFlowStorage.getStorageId();
        const storageKeysById = AbstractControlFlowReplacer_1
            .getStorageKeysByIdForCurrentStorage(this.replacerDataByControlFlowStorageId, controlFlowStorageId);
        const storageKeysForCurrentId = storageKeysById.get(replacerId);
        if (this.randomGenerator.getMathRandom() < usingExistingIdentifierChance &&
            storageKeysForCurrentId &&
            storageKeysForCurrentId.length) {
            return this.randomGenerator.getRandomGenerator().pickone(storageKeysForCurrentId);
        }
        const generateStorageKey = (length) => {
            const key = this.randomGenerator.getRandomString(length);
            if (controlFlowStorage.getStorage().has(key)) {
                return generateStorageKey(length);
            }
            return key;
        };
        const storageKey = generateStorageKey(5);
        storageKeysById.set(replacerId, [storageKey]);
        this.replacerDataByControlFlowStorageId.set(controlFlowStorageId, storageKeysById);
        controlFlowStorage.set(storageKey, customNode);
        return storageKey;
    }
};
AbstractControlFlowReplacer = AbstractControlFlowReplacer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory !== "undefined" && TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], AbstractControlFlowReplacer);
exports.AbstractControlFlowReplacer = AbstractControlFlowReplacer;


/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer.ts ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BinaryExpressionControlFlowReplacer_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TControlFlowCustomNodeFactory_1 = __webpack_require__(/*! ../../../types/container/custom-nodes/TControlFlowCustomNodeFactory */ "./src/types/container/custom-nodes/TControlFlowCustomNodeFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ControlFlowCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");
const ExpressionWithOperatorControlFlowReplacer_1 = __webpack_require__(/*! ./ExpressionWithOperatorControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/ExpressionWithOperatorControlFlowReplacer.ts");
let BinaryExpressionControlFlowReplacer = BinaryExpressionControlFlowReplacer_1 = class BinaryExpressionControlFlowReplacer extends ExpressionWithOperatorControlFlowReplacer_1.ExpressionWithOperatorControlFlowReplacer {
    constructor(controlFlowCustomNodeFactory, randomGenerator, options) {
        super(controlFlowCustomNodeFactory, randomGenerator, options);
    }
    replace(binaryExpressionNode, parentNode, controlFlowStorage) {
        const operator = binaryExpressionNode.operator;
        const binaryExpressionFunctionCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.BinaryExpressionFunctionNode);
        binaryExpressionFunctionCustomNode.initialize(operator);
        const storageKey = this.insertCustomNodeToControlFlowStorage(binaryExpressionFunctionCustomNode, controlFlowStorage, operator, BinaryExpressionControlFlowReplacer_1.usingExistingIdentifierChance);
        return this.getControlFlowStorageCallNode(controlFlowStorage.getStorageId(), storageKey, binaryExpressionNode.left, binaryExpressionNode.right);
    }
};
BinaryExpressionControlFlowReplacer.usingExistingIdentifierChance = 0.5;
BinaryExpressionControlFlowReplacer = BinaryExpressionControlFlowReplacer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory !== "undefined" && TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], BinaryExpressionControlFlowReplacer);
exports.BinaryExpressionControlFlowReplacer = BinaryExpressionControlFlowReplacer;


/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/control-flow-replacers/CallExpressionControlFlowReplacer.ts":
/*!*********************************************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/control-flow-replacers/CallExpressionControlFlowReplacer.ts ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CallExpressionControlFlowReplacer_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TControlFlowCustomNodeFactory_1 = __webpack_require__(/*! ../../../types/container/custom-nodes/TControlFlowCustomNodeFactory */ "./src/types/container/custom-nodes/TControlFlowCustomNodeFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ControlFlowCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");
const AbstractControlFlowReplacer_1 = __webpack_require__(/*! ./AbstractControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/AbstractControlFlowReplacer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let CallExpressionControlFlowReplacer = CallExpressionControlFlowReplacer_1 = class CallExpressionControlFlowReplacer extends AbstractControlFlowReplacer_1.AbstractControlFlowReplacer {
    constructor(controlFlowCustomNodeFactory, randomGenerator, options) {
        super(controlFlowCustomNodeFactory, randomGenerator, options);
    }
    replace(callExpressionNode, parentNode, controlFlowStorage) {
        const callee = callExpressionNode.callee;
        if (!NodeGuards_1.NodeGuards.isIdentifierNode(callee)) {
            return callExpressionNode;
        }
        const replacerId = String(callExpressionNode.arguments.length);
        const callExpressionFunctionCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.CallExpressionFunctionNode);
        const expressionArguments = callExpressionNode.arguments;
        callExpressionFunctionCustomNode.initialize(expressionArguments);
        const storageKey = this.insertCustomNodeToControlFlowStorage(callExpressionFunctionCustomNode, controlFlowStorage, replacerId, CallExpressionControlFlowReplacer_1.usingExistingIdentifierChance);
        return this.getControlFlowStorageCallNode(controlFlowStorage.getStorageId(), storageKey, callee, expressionArguments);
    }
    getControlFlowStorageCallNode(controlFlowStorageId, storageKey, callee, expressionArguments) {
        const controlFlowStorageCallCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.CallExpressionControlFlowStorageCallNode);
        controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey, callee, expressionArguments);
        const statementNode = controlFlowStorageCallCustomNode.getNode()[0];
        if (!statementNode || !NodeGuards_1.NodeGuards.isExpressionStatementNode(statementNode)) {
            throw new Error('`controlFlowStorageCallCustomNode.getNode()[0]` should returns array with `ExpressionStatement` node');
        }
        return statementNode.expression;
    }
};
CallExpressionControlFlowReplacer.usingExistingIdentifierChance = 0.5;
CallExpressionControlFlowReplacer = CallExpressionControlFlowReplacer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory !== "undefined" && TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], CallExpressionControlFlowReplacer);
exports.CallExpressionControlFlowReplacer = CallExpressionControlFlowReplacer;


/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/control-flow-replacers/ExpressionWithOperatorControlFlowReplacer.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/control-flow-replacers/ExpressionWithOperatorControlFlowReplacer.ts ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TControlFlowCustomNodeFactory_1 = __webpack_require__(/*! ../../../types/container/custom-nodes/TControlFlowCustomNodeFactory */ "./src/types/container/custom-nodes/TControlFlowCustomNodeFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ControlFlowCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");
const AbstractControlFlowReplacer_1 = __webpack_require__(/*! ./AbstractControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/AbstractControlFlowReplacer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let ExpressionWithOperatorControlFlowReplacer = class ExpressionWithOperatorControlFlowReplacer extends AbstractControlFlowReplacer_1.AbstractControlFlowReplacer {
    constructor(controlFlowCustomNodeFactory, randomGenerator, options) {
        super(controlFlowCustomNodeFactory, randomGenerator, options);
    }
    getControlFlowStorageCallNode(controlFlowStorageId, storageKey, leftExpression, rightExpression) {
        const controlFlowStorageCallCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.ExpressionWithOperatorControlFlowStorageCallNode);
        controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey, leftExpression, rightExpression);
        const statementNode = controlFlowStorageCallCustomNode.getNode()[0];
        if (!statementNode || !NodeGuards_1.NodeGuards.isExpressionStatementNode(statementNode)) {
            throw new Error('`controlFlowStorageCallCustomNode.getNode()[0]` should returns array with `ExpressionStatement` node');
        }
        return statementNode.expression;
    }
};
ExpressionWithOperatorControlFlowReplacer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory !== "undefined" && TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], ExpressionWithOperatorControlFlowReplacer);
exports.ExpressionWithOperatorControlFlowReplacer = ExpressionWithOperatorControlFlowReplacer;


/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/control-flow-replacers/LogicalExpressionControlFlowReplacer.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/control-flow-replacers/LogicalExpressionControlFlowReplacer.ts ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LogicalExpressionControlFlowReplacer_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TControlFlowCustomNodeFactory_1 = __webpack_require__(/*! ../../../types/container/custom-nodes/TControlFlowCustomNodeFactory */ "./src/types/container/custom-nodes/TControlFlowCustomNodeFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ControlFlowCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");
const ExpressionWithOperatorControlFlowReplacer_1 = __webpack_require__(/*! ./ExpressionWithOperatorControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/ExpressionWithOperatorControlFlowReplacer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let LogicalExpressionControlFlowReplacer = LogicalExpressionControlFlowReplacer_1 = class LogicalExpressionControlFlowReplacer extends ExpressionWithOperatorControlFlowReplacer_1.ExpressionWithOperatorControlFlowReplacer {
    constructor(controlFlowCustomNodeFactory, randomGenerator, options) {
        super(controlFlowCustomNodeFactory, randomGenerator, options);
    }
    replace(logicalExpressionNode, parentNode, controlFlowStorage) {
        if (this.checkForProhibitedExpressions(logicalExpressionNode.left, logicalExpressionNode.right)) {
            return logicalExpressionNode;
        }
        const operator = logicalExpressionNode.operator;
        const logicalExpressionFunctionCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.LogicalExpressionFunctionNode);
        logicalExpressionFunctionCustomNode.initialize(operator);
        const storageKey = this.insertCustomNodeToControlFlowStorage(logicalExpressionFunctionCustomNode, controlFlowStorage, operator, LogicalExpressionControlFlowReplacer_1.usingExistingIdentifierChance);
        return this.getControlFlowStorageCallNode(controlFlowStorage.getStorageId(), storageKey, logicalExpressionNode.left, logicalExpressionNode.right);
    }
    checkForProhibitedExpressions(leftExpression, rightExpression) {
        return [leftExpression, rightExpression].some((expressionNode) => {
            let nodeForCheck;
            if (!NodeGuards_1.NodeGuards.isUnaryExpressionNode(expressionNode)) {
                nodeForCheck = expressionNode;
            }
            else {
                nodeForCheck = NodeUtils_1.NodeUtils.getUnaryExpressionArgumentNode(expressionNode);
            }
            return !NodeGuards_1.NodeGuards.isLiteralNode(nodeForCheck) &&
                !NodeGuards_1.NodeGuards.isIdentifierNode(nodeForCheck) &&
                !NodeGuards_1.NodeGuards.isObjectExpressionNode(nodeForCheck) &&
                !NodeGuards_1.NodeGuards.isExpressionStatementNode(nodeForCheck);
        });
    }
};
LogicalExpressionControlFlowReplacer.usingExistingIdentifierChance = 0.5;
LogicalExpressionControlFlowReplacer = LogicalExpressionControlFlowReplacer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory !== "undefined" && TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], LogicalExpressionControlFlowReplacer);
exports.LogicalExpressionControlFlowReplacer = LogicalExpressionControlFlowReplacer;


/***/ }),

/***/ "./src/node-transformers/control-flow-transformers/control-flow-replacers/StringLiteralControlFlowReplacer.ts":
/*!********************************************************************************************************************!*\
  !*** ./src/node-transformers/control-flow-transformers/control-flow-replacers/StringLiteralControlFlowReplacer.ts ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var StringLiteralControlFlowReplacer_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TControlFlowCustomNodeFactory_1 = __webpack_require__(/*! ../../../types/container/custom-nodes/TControlFlowCustomNodeFactory */ "./src/types/container/custom-nodes/TControlFlowCustomNodeFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ControlFlowCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");
const AbstractControlFlowReplacer_1 = __webpack_require__(/*! ./AbstractControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/AbstractControlFlowReplacer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let StringLiteralControlFlowReplacer = StringLiteralControlFlowReplacer_1 = class StringLiteralControlFlowReplacer extends AbstractControlFlowReplacer_1.AbstractControlFlowReplacer {
    constructor(controlFlowCustomNodeFactory, randomGenerator, options) {
        super(controlFlowCustomNodeFactory, randomGenerator, options);
    }
    replace(literalNode, parentNode, controlFlowStorage) {
        if (NodeGuards_1.NodeGuards.isPropertyNode(parentNode) && parentNode.key === literalNode) {
            return literalNode;
        }
        if (typeof literalNode.value !== 'string' || literalNode.value.length < 3) {
            return literalNode;
        }
        const replacerId = String(literalNode.value);
        const literalFunctionCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.StringLiteralNode);
        literalFunctionCustomNode.initialize(literalNode.value);
        const storageKey = this.insertCustomNodeToControlFlowStorage(literalFunctionCustomNode, controlFlowStorage, replacerId, StringLiteralControlFlowReplacer_1.usingExistingIdentifierChance);
        return this.getControlFlowStorageCallNode(controlFlowStorage.getStorageId(), storageKey);
    }
    getControlFlowStorageCallNode(controlFlowStorageId, storageKey) {
        const controlFlowStorageCallCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.StringLiteralControlFlowStorageCallNode);
        controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey);
        const statementNode = controlFlowStorageCallCustomNode.getNode()[0];
        if (!statementNode || !NodeGuards_1.NodeGuards.isExpressionStatementNode(statementNode)) {
            throw new Error('`controlFlowStorageCallCustomNode.getNode()[0]` should returns array with `ExpressionStatement` node');
        }
        return statementNode.expression;
    }
};
StringLiteralControlFlowReplacer.usingExistingIdentifierChance = 1;
StringLiteralControlFlowReplacer = StringLiteralControlFlowReplacer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory !== "undefined" && TControlFlowCustomNodeFactory_1.TControlFlowCustomNodeFactory) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], StringLiteralControlFlowReplacer);
exports.StringLiteralControlFlowReplacer = StringLiteralControlFlowReplacer;


/***/ }),

/***/ "./src/node-transformers/converting-transformers/MemberExpressionTransformer.ts":
/*!**************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/MemberExpressionTransformer.ts ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let MemberExpressionTransformer = class MemberExpressionTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Converting:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode && NodeGuards_1.NodeGuards.isMemberExpressionNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(memberExpressionNode, parentNode) {
        if (NodeGuards_1.NodeGuards.isIdentifierNode(memberExpressionNode.property)) {
            if (memberExpressionNode.computed) {
                return memberExpressionNode;
            }
            memberExpressionNode.computed = true;
            memberExpressionNode.property = NodeFactory_1.NodeFactory.literalNode(memberExpressionNode.property.name);
        }
        return memberExpressionNode;
    }
};
MemberExpressionTransformer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], MemberExpressionTransformer);
exports.MemberExpressionTransformer = MemberExpressionTransformer;


/***/ }),

/***/ "./src/node-transformers/converting-transformers/MethodDefinitionTransformer.ts":
/*!**************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/MethodDefinitionTransformer.ts ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MethodDefinitionTransformer_1, _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let MethodDefinitionTransformer = MethodDefinitionTransformer_1 = class MethodDefinitionTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Converting:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode && NodeGuards_1.NodeGuards.isMethodDefinitionNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(methodDefinitionNode, parentNode) {
        if (NodeGuards_1.NodeGuards.isIdentifierNode(methodDefinitionNode.key)) {
            return this.replaceIdentifierKey(methodDefinitionNode, methodDefinitionNode.key);
        }
        if (NodeGuards_1.NodeGuards.isLiteralNode(methodDefinitionNode.key)) {
            return this.replaceLiteralKey(methodDefinitionNode, methodDefinitionNode.key);
        }
        return methodDefinitionNode;
    }
    replaceIdentifierKey(methodDefinitionNode, keyNode) {
        if (!MethodDefinitionTransformer_1.ignoredNames.includes(keyNode.name)
            && !methodDefinitionNode.computed) {
            methodDefinitionNode.computed = true;
            methodDefinitionNode.key = NodeFactory_1.NodeFactory.literalNode(keyNode.name);
        }
        return methodDefinitionNode;
    }
    replaceLiteralKey(methodDefinitionNode, keyNode) {
        if (typeof keyNode.value === 'string'
            && !MethodDefinitionTransformer_1.ignoredNames.includes(keyNode.value)
            && !methodDefinitionNode.computed) {
            methodDefinitionNode.computed = true;
        }
        return methodDefinitionNode;
    }
};
MethodDefinitionTransformer.ignoredNames = ['constructor'];
MethodDefinitionTransformer = MethodDefinitionTransformer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], MethodDefinitionTransformer);
exports.MethodDefinitionTransformer = MethodDefinitionTransformer;


/***/ }),

/***/ "./src/node-transformers/converting-transformers/ObjectExpressionKeysTransformer.ts":
/*!******************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/ObjectExpressionKeysTransformer.ts ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var ObjectExpressionKeysTransformer_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const TObjectExpressionExtractorFactory_1 = __webpack_require__(/*! ../../types/container/node-transformers/TObjectExpressionExtractorFactory */ "./src/types/container/node-transformers/TObjectExpressionExtractorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeStatementUtils_1 = __webpack_require__(/*! ../../node/NodeStatementUtils */ "./src/node/NodeStatementUtils.ts");
const ObjectExpressionExtractor_1 = __webpack_require__(/*! ../../enums/node-transformers/converting-transformers/properties-extractors/ObjectExpressionExtractor */ "./src/enums/node-transformers/converting-transformers/properties-extractors/ObjectExpressionExtractor.ts");
let ObjectExpressionKeysTransformer = ObjectExpressionKeysTransformer_1 = class ObjectExpressionKeysTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(objectExpressionExtractorFactory, randomGenerator, options) {
        super(randomGenerator, options);
        this.objectExpressionExtractorFactory = objectExpressionExtractorFactory;
    }
    static isProhibitedHostStatement(objectExpressionNode, hostStatement) {
        return ObjectExpressionKeysTransformer_1.isReferencedIdentifierName(objectExpressionNode, hostStatement)
            || ObjectExpressionKeysTransformer_1.isProhibitedSequenceExpression(objectExpressionNode, hostStatement);
    }
    static isReferencedIdentifierName(objectExpressionNode, hostNode) {
        const identifierNamesSet = [];
        let isReferencedIdentifierName = false;
        let isCurrentNode = false;
        estraverse.traverse(hostNode, {
            enter: (node) => {
                if (node === objectExpressionNode) {
                    isCurrentNode = true;
                }
                if (!NodeGuards_1.NodeGuards.isIdentifierNode(node)) {
                    return;
                }
                if (!isCurrentNode) {
                    identifierNamesSet.push(node.name);
                    return;
                }
                if (identifierNamesSet.includes(node.name)) {
                    isReferencedIdentifierName = true;
                }
            },
            leave: (node) => {
                if (node === objectExpressionNode) {
                    isCurrentNode = false;
                    return estraverse.VisitorOption.Break;
                }
            }
        });
        return isReferencedIdentifierName;
    }
    static isProhibitedSequenceExpression(objectExpressionNode, hostNode) {
        return NodeGuards_1.NodeGuards.isExpressionStatementNode(hostNode)
            && NodeGuards_1.NodeGuards.isSequenceExpressionNode(hostNode.expression)
            && hostNode.expression.expressions.some((expressionNode) => NodeGuards_1.NodeGuards.isCallExpressionNode(expressionNode)
                && NodeGuards_1.NodeGuards.isSuperNode(expressionNode.callee));
    }
    getVisitor(transformationStage) {
        if (!this.options.transformObjectKeys) {
            return null;
        }
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Converting:
                return {
                    leave: (node, parentNode) => {
                        if (parentNode
                            && NodeGuards_1.NodeGuards.isObjectExpressionNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(objectExpressionNode, parentNode) {
        if (!objectExpressionNode.properties.length) {
            return objectExpressionNode;
        }
        const hostStatement = NodeStatementUtils_1.NodeStatementUtils.getRootStatementOfNode(objectExpressionNode);
        if (ObjectExpressionKeysTransformer_1.isProhibitedHostStatement(objectExpressionNode, hostStatement)) {
            return objectExpressionNode;
        }
        return this.applyObjectExpressionKeysExtractorsRecursive(ObjectExpressionKeysTransformer_1.objectExpressionExtractorNames, objectExpressionNode, hostStatement);
    }
    applyObjectExpressionKeysExtractorsRecursive(objectExpressionExtractorNames, objectExpressionNode, hostStatement) {
        const newObjectExpressionExtractorNames = [...objectExpressionExtractorNames];
        const objectExpressionExtractor = newObjectExpressionExtractorNames.shift();
        if (!objectExpressionExtractor) {
            return objectExpressionNode;
        }
        const { nodeToReplace, objectExpressionHostStatement: newObjectExpressionHostStatement, objectExpressionNode: newObjectExpressionNode } = this.objectExpressionExtractorFactory(objectExpressionExtractor)
            .extract(objectExpressionNode, hostStatement);
        this.applyObjectExpressionKeysExtractorsRecursive(newObjectExpressionExtractorNames, newObjectExpressionNode, newObjectExpressionHostStatement);
        return nodeToReplace;
    }
};
ObjectExpressionKeysTransformer.objectExpressionExtractorNames = [
    ObjectExpressionExtractor_1.ObjectExpressionExtractor.ObjectExpressionToVariableDeclarationExtractor,
    ObjectExpressionExtractor_1.ObjectExpressionExtractor.BasePropertiesExtractor
];
ObjectExpressionKeysTransformer = ObjectExpressionKeysTransformer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObjectExpressionExtractor)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TObjectExpressionExtractorFactory_1.TObjectExpressionExtractorFactory !== "undefined" && TObjectExpressionExtractorFactory_1.TObjectExpressionExtractorFactory) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], ObjectExpressionKeysTransformer);
exports.ObjectExpressionKeysTransformer = ObjectExpressionKeysTransformer;


/***/ }),

/***/ "./src/node-transformers/converting-transformers/ObjectExpressionTransformer.ts":
/*!**************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/ObjectExpressionTransformer.ts ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let ObjectExpressionTransformer = class ObjectExpressionTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Converting:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode && NodeGuards_1.NodeGuards.isObjectExpressionNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(objectExpressionNode, parentNode) {
        objectExpressionNode.properties
            .forEach((property) => {
            if (!property.key) {
                return;
            }
            if (property.computed) {
                this.transformComputedProperty(property);
            }
            else {
                this.transformBaseProperty(property);
            }
        });
        return objectExpressionNode;
    }
    transformComputedProperty(property) {
        if (!NodeGuards_1.NodeGuards.isLiteralNode(property.key) || !(typeof property.key.value === 'string')) {
            return;
        }
        property.key = NodeFactory_1.NodeFactory.literalNode(property.key.value);
    }
    transformBaseProperty(property) {
        if (property.shorthand) {
            property.shorthand = false;
        }
        if (!NodeGuards_1.NodeGuards.isIdentifierNode(property.key)) {
            return;
        }
        property.key = NodeFactory_1.NodeFactory.literalNode(property.key.name);
    }
};
ObjectExpressionTransformer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], ObjectExpressionTransformer);
exports.ObjectExpressionTransformer = ObjectExpressionTransformer;


/***/ }),

/***/ "./src/node-transformers/converting-transformers/SplitStringTransformer.ts":
/*!*********************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/SplitStringTransformer.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var SplitStringTransformer_1, _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const NodeTransformer_1 = __webpack_require__(/*! ../../enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeLiteralUtils_1 = __webpack_require__(/*! ../../node/NodeLiteralUtils */ "./src/node/NodeLiteralUtils.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let SplitStringTransformer = SplitStringTransformer_1 = class SplitStringTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
        this.runAfter = [
            NodeTransformer_1.NodeTransformer.ObjectExpressionKeysTransformer,
            NodeTransformer_1.NodeTransformer.TemplateLiteralTransformer
        ];
    }
    static chunkString(string, chunkSize) {
        const chunksCount = Math.ceil(string.length / chunkSize);
        const chunks = [];
        let nextChunkStartIndex = 0;
        for (let chunkIndex = 0; chunkIndex < chunksCount; ++chunkIndex, nextChunkStartIndex += chunkSize) {
            chunks[chunkIndex] = string.substr(nextChunkStartIndex, chunkSize);
        }
        return chunks;
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Converting:
                return {
                    enter: (node, parentNode) => {
                        if (!this.options.splitStrings) {
                            return;
                        }
                        if (parentNode && NodeGuards_1.NodeGuards.isLiteralNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(literalNode, parentNode) {
        if (NodeLiteralUtils_1.NodeLiteralUtils.isProhibitedLiteralNode(literalNode, parentNode)) {
            return literalNode;
        }
        const firstPassChunksNode = this.transformLiteralNodeByChunkLength(literalNode, parentNode, SplitStringTransformer_1.firstPassChunkLength);
        const secondPassChunksNode = estraverse.replace(firstPassChunksNode, {
            enter: (node, parentNode) => {
                if (parentNode && NodeGuards_1.NodeGuards.isLiteralNode(node)) {
                    return this.transformLiteralNodeByChunkLength(node, parentNode, this.options.splitStringsChunkLength);
                }
            }
        });
        return secondPassChunksNode;
    }
    transformLiteralNodeByChunkLength(literalNode, parentNode, chunkLength) {
        if (typeof literalNode.value !== 'string') {
            return literalNode;
        }
        if (chunkLength >= literalNode.value.length) {
            return literalNode;
        }
        const stringChunks = SplitStringTransformer_1.chunkString(literalNode.value, chunkLength);
        const binaryExpressionNode = this.transformStringChunksToBinaryExpressionNode(stringChunks);
        NodeUtils_1.NodeUtils.parentizeAst(binaryExpressionNode);
        NodeUtils_1.NodeUtils.parentizeNode(binaryExpressionNode, parentNode);
        return binaryExpressionNode;
    }
    transformStringChunksToBinaryExpressionNode(chunks) {
        const firstChunk = chunks.shift();
        const secondChunk = chunks.shift();
        if (!firstChunk || !secondChunk) {
            throw new Error('First and second chunks values should not be empty');
        }
        const initialBinaryExpressionNode = NodeFactory_1.NodeFactory.binaryExpressionNode('+', NodeFactory_1.NodeFactory.literalNode(firstChunk), NodeFactory_1.NodeFactory.literalNode(secondChunk));
        return chunks.reduce((binaryExpressionNode, chunk) => {
            const chunkLiteralNode = NodeFactory_1.NodeFactory.literalNode(chunk);
            return NodeFactory_1.NodeFactory.binaryExpressionNode('+', binaryExpressionNode, chunkLiteralNode);
        }, initialBinaryExpressionNode);
    }
};
SplitStringTransformer.firstPassChunkLength = 1000;
SplitStringTransformer = SplitStringTransformer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], SplitStringTransformer);
exports.SplitStringTransformer = SplitStringTransformer;


/***/ }),

/***/ "./src/node-transformers/converting-transformers/TemplateLiteralTransformer.ts":
/*!*************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/TemplateLiteralTransformer.ts ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TemplateLiteralTransformer_1, _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let TemplateLiteralTransformer = TemplateLiteralTransformer_1 = class TemplateLiteralTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
    }
    static isLiteralNodeWithStringValue(node) {
        return !!node && NodeGuards_1.NodeGuards.isLiteralNode(node) && typeof node.value === 'string';
    }
    static isValidTemplateLiteralNode(node, parentNode) {
        return NodeGuards_1.NodeGuards.isTemplateLiteralNode(node) && !NodeGuards_1.NodeGuards.isTaggedTemplateExpressionNode(parentNode);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Converting:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode && TemplateLiteralTransformer_1.isValidTemplateLiteralNode(node, parentNode)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(templateLiteralNode, parentNode) {
        const templateLiteralExpressions = templateLiteralNode.expressions;
        let nodes = [];
        templateLiteralNode.quasis.forEach((templateElement) => {
            nodes.push(NodeFactory_1.NodeFactory.literalNode(templateElement.value.cooked));
            const expression = templateLiteralExpressions.shift();
            if (!expression) {
                return;
            }
            nodes.push(expression);
        });
        nodes = nodes.filter((node) => {
            return !(NodeGuards_1.NodeGuards.isLiteralNode(node) && node.value === '');
        });
        if (!TemplateLiteralTransformer_1.isLiteralNodeWithStringValue(nodes[0]) &&
            !TemplateLiteralTransformer_1.isLiteralNodeWithStringValue(nodes[1])) {
            nodes.unshift(NodeFactory_1.NodeFactory.literalNode(''));
        }
        let transformedNode;
        if (nodes.length > 1) {
            let root = NodeFactory_1.NodeFactory.binaryExpressionNode('+', nodes.shift(), nodes.shift());
            nodes.forEach((node) => {
                root = NodeFactory_1.NodeFactory.binaryExpressionNode('+', root, node);
            });
            transformedNode = root;
        }
        else {
            transformedNode = nodes[0];
        }
        NodeUtils_1.NodeUtils.parentizeAst(transformedNode);
        NodeUtils_1.NodeUtils.parentizeNode(transformedNode, parentNode);
        return transformedNode;
    }
};
TemplateLiteralTransformer = TemplateLiteralTransformer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], TemplateLiteralTransformer);
exports.TemplateLiteralTransformer = TemplateLiteralTransformer;


/***/ }),

/***/ "./src/node-transformers/converting-transformers/object-expression-extractors/BasePropertiesExtractor.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/object-expression-extractors/BasePropertiesExtractor.ts ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BasePropertiesExtractor_1;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const NodeAppender_1 = __webpack_require__(/*! ../../../node/NodeAppender */ "./src/node/NodeAppender.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeStatementUtils_1 = __webpack_require__(/*! ../../../node/NodeStatementUtils */ "./src/node/NodeStatementUtils.ts");
let BasePropertiesExtractor = BasePropertiesExtractor_1 = class BasePropertiesExtractor {
    static getPropertyNodeKeyName(propertyNode) {
        const propertyKeyNode = propertyNode.key;
        if (NodeGuards_1.NodeGuards.isLiteralNode(propertyKeyNode)
            && (typeof propertyKeyNode.value === 'string'
                || typeof propertyKeyNode.value === 'number')) {
            return propertyKeyNode.value.toString();
        }
        if (NodeGuards_1.NodeGuards.isIdentifierNode(propertyKeyNode)) {
            return propertyKeyNode.name;
        }
        return null;
    }
    static isProhibitedPattern(node) {
        return !node
            || NodeGuards_1.NodeGuards.isObjectPatternNode(node)
            || NodeGuards_1.NodeGuards.isArrayPatternNode(node)
            || NodeGuards_1.NodeGuards.isAssignmentPatternNode(node)
            || NodeGuards_1.NodeGuards.isRestElementNode(node);
    }
    extract(objectExpressionNode, hostStatement) {
        const hostNode = objectExpressionNode.parentNode;
        if (hostNode
            && NodeGuards_1.NodeGuards.isVariableDeclaratorNode(hostNode)
            && NodeGuards_1.NodeGuards.isIdentifierNode(hostNode.id)) {
            return this.transformObjectExpressionNode(objectExpressionNode, hostStatement, hostNode.id);
        }
        return {
            nodeToReplace: objectExpressionNode,
            objectExpressionHostStatement: hostStatement,
            objectExpressionNode: objectExpressionNode
        };
    }
    transformObjectExpressionNode(objectExpressionNode, hostStatement, memberExpressionHostNode) {
        const properties = objectExpressionNode.properties;
        const [expressionStatements, removablePropertyIds] = this
            .extractPropertiesToExpressionStatements(properties, hostStatement, memberExpressionHostNode);
        const hostNodeWithStatements = NodeStatementUtils_1.NodeStatementUtils.getScopeOfNode(hostStatement);
        this.filterExtractedObjectExpressionProperties(objectExpressionNode, removablePropertyIds);
        NodeAppender_1.NodeAppender.insertAfter(hostNodeWithStatements, expressionStatements, hostStatement);
        return {
            nodeToReplace: objectExpressionNode,
            objectExpressionHostStatement: hostStatement,
            objectExpressionNode: objectExpressionNode
        };
    }
    extractPropertiesToExpressionStatements(properties, hostStatement, memberExpressionHostNode) {
        const propertiesLength = properties.length;
        const expressionStatements = [];
        const removablePropertyIds = [];
        for (let i = 0; i < propertiesLength; i++) {
            const property = properties[i];
            const propertyValue = property.value;
            if (BasePropertiesExtractor_1.isProhibitedPattern(propertyValue)) {
                continue;
            }
            const propertyKeyName = BasePropertiesExtractor_1.getPropertyNodeKeyName(property);
            if (!propertyKeyName) {
                continue;
            }
            const shouldCreateLiteralNode = !property.computed
                || (property.computed && !!property.key && NodeGuards_1.NodeGuards.isLiteralNode(property.key));
            const memberExpressionProperty = shouldCreateLiteralNode
                ? NodeFactory_1.NodeFactory.literalNode(propertyKeyName)
                : NodeFactory_1.NodeFactory.identifierNode(propertyKeyName);
            const memberExpressionNode = NodeFactory_1.NodeFactory
                .memberExpressionNode(memberExpressionHostNode, memberExpressionProperty, true);
            const expressionStatementNode = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.assignmentExpressionNode('=', memberExpressionNode, propertyValue));
            if (NodeGuards_1.NodeGuards.isObjectExpressionNode(property.value)) {
                this.transformObjectExpressionNode(property.value, hostStatement, memberExpressionNode);
            }
            expressionStatements.push(expressionStatementNode);
            removablePropertyIds.push(i);
        }
        return [expressionStatements, removablePropertyIds];
    }
    filterExtractedObjectExpressionProperties(objectExpressionNode, removablePropertyIds) {
        objectExpressionNode.properties = objectExpressionNode.properties
            .filter((property, index) => !removablePropertyIds.includes(index));
    }
};
BasePropertiesExtractor = BasePropertiesExtractor_1 = __decorate([
    inversify_1.injectable()
], BasePropertiesExtractor);
exports.BasePropertiesExtractor = BasePropertiesExtractor;


/***/ }),

/***/ "./src/node-transformers/converting-transformers/object-expression-extractors/ObjectExpressionToVariableDeclarationExtractor.ts":
/*!**************************************************************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/object-expression-extractors/ObjectExpressionToVariableDeclarationExtractor.ts ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TObjectExpressionKeysTransformerCustomNodeFactory_1 = __webpack_require__(/*! ../../../types/container/custom-nodes/TObjectExpressionKeysTransformerCustomNodeFactory */ "./src/types/container/custom-nodes/TObjectExpressionKeysTransformerCustomNodeFactory.ts");
const ObjectExpressionKeysTransformerCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ObjectExpressionKeysTransformerCustomNode */ "./src/enums/custom-nodes/ObjectExpressionKeysTransformerCustomNode.ts");
const NodeAppender_1 = __webpack_require__(/*! ../../../node/NodeAppender */ "./src/node/NodeAppender.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeStatementUtils_1 = __webpack_require__(/*! ../../../node/NodeStatementUtils */ "./src/node/NodeStatementUtils.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");
const NodeLexicalScopeUtils_1 = __webpack_require__(/*! ../../../node/NodeLexicalScopeUtils */ "./src/node/NodeLexicalScopeUtils.ts");
let ObjectExpressionToVariableDeclarationExtractor = class ObjectExpressionToVariableDeclarationExtractor {
    constructor(objectExpressionKeysTransformerCustomNodeFactory) {
        this.objectExpressionKeysTransformerCustomNodeFactory = objectExpressionKeysTransformerCustomNodeFactory;
    }
    extract(objectExpressionNode, hostStatement) {
        return this.transformObjectExpressionToVariableDeclaration(objectExpressionNode, hostStatement);
    }
    transformObjectExpressionToVariableDeclaration(objectExpressionNode, hostStatement) {
        var _a;
        const lexicalScopeNode = (_a = NodeLexicalScopeUtils_1.NodeLexicalScopeUtils.getLexicalScope(hostStatement)) !== null && _a !== void 0 ? _a : null;
        if (!lexicalScopeNode) {
            throw new Error('Cannot find lexical scope node for the host statement node');
        }
        const properties = objectExpressionNode.properties;
        const newObjectExpressionHostStatement = this.getObjectExpressionHostNode(lexicalScopeNode, properties);
        const statementsToInsert = [newObjectExpressionHostStatement];
        const hostNodeWithStatements = NodeStatementUtils_1.NodeStatementUtils.getScopeOfNode(hostStatement);
        NodeAppender_1.NodeAppender.insertBefore(hostNodeWithStatements, statementsToInsert, hostStatement);
        NodeUtils_1.NodeUtils.parentizeAst(newObjectExpressionHostStatement);
        NodeUtils_1.NodeUtils.parentizeNode(newObjectExpressionHostStatement, hostNodeWithStatements);
        const newObjectExpressionIdentifier = this.getObjectExpressionIdentifierNode(newObjectExpressionHostStatement);
        const newObjectExpressionNode = this.getObjectExpressionNode(newObjectExpressionHostStatement);
        return {
            nodeToReplace: newObjectExpressionIdentifier,
            objectExpressionHostStatement: newObjectExpressionHostStatement,
            objectExpressionNode: newObjectExpressionNode
        };
    }
    getObjectExpressionHostNode(lexicalScopeNode, properties) {
        const variableDeclarationHostNodeCustomNode = this.objectExpressionKeysTransformerCustomNodeFactory(ObjectExpressionKeysTransformerCustomNode_1.ObjectExpressionKeysTransformerCustomNode.ObjectExpressionVariableDeclarationHostNode);
        variableDeclarationHostNodeCustomNode.initialize(lexicalScopeNode, properties);
        const statementNode = variableDeclarationHostNodeCustomNode.getNode()[0];
        if (!statementNode
            || !NodeGuards_1.NodeGuards.isVariableDeclarationNode(statementNode)) {
            throw new Error('`objectExpressionHostCustomNode.getNode()[0]` should returns array with `VariableDeclaration` node');
        }
        return statementNode;
    }
    getObjectExpressionIdentifierNode(objectExpressionHostNode) {
        const newObjectExpressionIdentifierNode = objectExpressionHostNode.declarations[0].id;
        if (!NodeGuards_1.NodeGuards.isIdentifierNode(newObjectExpressionIdentifierNode)) {
            throw new Error('`objectExpressionHostNode` should contain `VariableDeclarator` node with `Identifier` id property');
        }
        return newObjectExpressionIdentifierNode;
    }
    getObjectExpressionNode(objectExpressionHostNode) {
        var _a;
        const newObjectExpressionNode = (_a = objectExpressionHostNode.declarations[0].init) !== null && _a !== void 0 ? _a : null;
        if (!newObjectExpressionNode || !NodeGuards_1.NodeGuards.isObjectExpressionNode(newObjectExpressionNode)) {
            throw new Error('`objectExpressionHostNode` should contain `VariableDeclarator` node with `ObjectExpression` init property');
        }
        return newObjectExpressionNode;
    }
};
ObjectExpressionToVariableDeclarationExtractor = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObjectExpressionKeysTransformerCustomNode)),
    __metadata("design:paramtypes", [typeof (_a = typeof TObjectExpressionKeysTransformerCustomNodeFactory_1.TObjectExpressionKeysTransformerCustomNodeFactory !== "undefined" && TObjectExpressionKeysTransformerCustomNodeFactory_1.TObjectExpressionKeysTransformerCustomNodeFactory) === "function" ? _a : Object])
], ObjectExpressionToVariableDeclarationExtractor);
exports.ObjectExpressionToVariableDeclarationExtractor = ObjectExpressionToVariableDeclarationExtractor;


/***/ }),

/***/ "./src/node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer.ts":
/*!************************************************************************************************!*\
  !*** ./src/node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer.ts ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var DeadCodeInjectionTransformer_1, _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const TDeadNodeInjectionCustomNodeFactory_1 = __webpack_require__(/*! ../../types/container/custom-nodes/TDeadNodeInjectionCustomNodeFactory */ "./src/types/container/custom-nodes/TDeadNodeInjectionCustomNodeFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ITransformersRunner_1 = __webpack_require__(/*! ../../interfaces/node-transformers/ITransformersRunner */ "./src/interfaces/node-transformers/ITransformersRunner.ts");
const DeadCodeInjectionCustomNode_1 = __webpack_require__(/*! ../../enums/custom-nodes/DeadCodeInjectionCustomNode */ "./src/enums/custom-nodes/DeadCodeInjectionCustomNode.ts");
const NodeTransformer_1 = __webpack_require__(/*! ../../enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");
const NodeType_1 = __webpack_require__(/*! ../../enums/node/NodeType */ "./src/enums/node/NodeType.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeStatementUtils_1 = __webpack_require__(/*! ../../node/NodeStatementUtils */ "./src/node/NodeStatementUtils.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let DeadCodeInjectionTransformer = DeadCodeInjectionTransformer_1 = class DeadCodeInjectionTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(deadCodeInjectionCustomNodeFactory, transformersRunner, randomGenerator, options) {
        super(randomGenerator, options);
        this.deadCodeInjectionRootAstHostNodeSet = new Set();
        this.collectedBlockStatements = [];
        this.collectedBlockStatementsTotalLength = 0;
        this.deadCodeInjectionCustomNodeFactory = deadCodeInjectionCustomNodeFactory;
        this.transformersRunner = transformersRunner;
    }
    static isProhibitedNodeInsideCollectedBlockStatement(targetNode) {
        return NodeGuards_1.NodeGuards.isBreakStatementNode(targetNode)
            || NodeGuards_1.NodeGuards.isContinueStatementNode(targetNode)
            || NodeGuards_1.NodeGuards.isAwaitExpressionNode(targetNode)
            || NodeGuards_1.NodeGuards.isSuperNode(targetNode);
    }
    static isScopeHoistingFunctionDeclaration(targetNode) {
        if (!NodeGuards_1.NodeGuards.isFunctionDeclarationNode(targetNode)) {
            return false;
        }
        const scopeNode = NodeStatementUtils_1.NodeStatementUtils.getScopeOfNode(targetNode);
        const scopeBody = !NodeGuards_1.NodeGuards.isSwitchCaseNode(scopeNode)
            ? scopeNode.body
            : scopeNode.consequent;
        const indexInScope = scopeBody.indexOf(targetNode);
        if (indexInScope === 0) {
            return false;
        }
        const slicedBody = scopeBody.slice(0, indexInScope);
        const hostBlockStatementNode = NodeFactory_1.NodeFactory.blockStatementNode(slicedBody);
        const functionDeclarationName = targetNode.id.name;
        let isScopeHoistedFunctionDeclaration = false;
        estraverse.traverse(hostBlockStatementNode, {
            enter: (node) => {
                if (NodeGuards_1.NodeGuards.isIdentifierNode(node) && node.name === functionDeclarationName) {
                    isScopeHoistedFunctionDeclaration = true;
                    return estraverse.VisitorOption.Break;
                }
            }
        });
        return isScopeHoistedFunctionDeclaration;
    }
    static isValidCollectedBlockStatementNode(blockStatementNode) {
        if (!blockStatementNode.body.length) {
            return false;
        }
        let nestedBlockStatementsCount = 0;
        let isValidBlockStatementNode = true;
        estraverse.traverse(blockStatementNode, {
            enter: (node) => {
                if (NodeGuards_1.NodeGuards.isBlockStatementNode(node)) {
                    nestedBlockStatementsCount++;
                }
                if (nestedBlockStatementsCount > DeadCodeInjectionTransformer_1.maxNestedBlockStatementsCount
                    || DeadCodeInjectionTransformer_1.isProhibitedNodeInsideCollectedBlockStatement(node)
                    || DeadCodeInjectionTransformer_1.isScopeHoistingFunctionDeclaration(node)) {
                    isValidBlockStatementNode = false;
                    return estraverse.VisitorOption.Break;
                }
            }
        });
        return isValidBlockStatementNode;
    }
    static isValidWrappedBlockStatementNode(blockStatementNode) {
        if (!blockStatementNode.body.length) {
            return false;
        }
        let isValidBlockStatementNode = true;
        estraverse.traverse(blockStatementNode, {
            enter: (node) => {
                if (DeadCodeInjectionTransformer_1.isScopeHoistingFunctionDeclaration(node)) {
                    isValidBlockStatementNode = false;
                    return estraverse.VisitorOption.Break;
                }
            }
        });
        if (!isValidBlockStatementNode) {
            return false;
        }
        const parentNodeWithStatements = NodeStatementUtils_1.NodeStatementUtils
            .getParentNodeWithStatements(blockStatementNode);
        return parentNodeWithStatements.type !== NodeType_1.NodeType.Program;
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.DeadCodeInjection:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode && NodeGuards_1.NodeGuards.isProgramNode(node)) {
                            this.analyzeNode(node, parentNode);
                            return node;
                        }
                    },
                    leave: (node, parentNode) => {
                        if (parentNode && NodeGuards_1.NodeGuards.isBlockStatementNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            case TransformationStage_1.TransformationStage.Finalizing:
                if (!this.deadCodeInjectionRootAstHostNodeSet.size) {
                    return null;
                }
                return {
                    enter: (node, parentNode) => {
                        if (parentNode && this.isDeadCodeInjectionRootAstHostNode(node)) {
                            return this.restoreNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    analyzeNode(programNode, parentNode) {
        estraverse.traverse(programNode, {
            enter: (node) => {
                if (!NodeGuards_1.NodeGuards.isBlockStatementNode(node)) {
                    return;
                }
                const clonedBlockStatementNode = NodeUtils_1.NodeUtils.clone(node);
                if (!DeadCodeInjectionTransformer_1.isValidCollectedBlockStatementNode(clonedBlockStatementNode)) {
                    return;
                }
                const transformedBlockStatementNode = this.makeClonedBlockStatementNodeUnique(clonedBlockStatementNode);
                this.collectedBlockStatements.push(transformedBlockStatementNode);
            }
        });
        this.collectedBlockStatementsTotalLength = this.collectedBlockStatements.length;
    }
    transformNode(blockStatementNode, parentNode) {
        const canBreakTraverse = !this.collectedBlockStatements.length
            || this.collectedBlockStatementsTotalLength < DeadCodeInjectionTransformer_1.minCollectedBlockStatementsCount;
        if (canBreakTraverse) {
            return estraverse.VisitorOption.Break;
        }
        if (this.randomGenerator.getMathRandom() > this.options.deadCodeInjectionThreshold
            || !DeadCodeInjectionTransformer_1.isValidWrappedBlockStatementNode(blockStatementNode)) {
            return blockStatementNode;
        }
        const minInteger = 0;
        const maxInteger = this.collectedBlockStatements.length - 1;
        const randomIndex = this.randomGenerator.getRandomInteger(minInteger, maxInteger);
        const randomBlockStatementNode = this.collectedBlockStatements.splice(randomIndex, 1)[0];
        const isDuplicateBlockStatementNodes = randomBlockStatementNode === blockStatementNode;
        if (isDuplicateBlockStatementNodes) {
            return blockStatementNode;
        }
        return this.replaceBlockStatementNode(blockStatementNode, randomBlockStatementNode, parentNode);
    }
    restoreNode(deadCodeInjectionRootAstHostNode, parentNode) {
        const hostNodeFirstStatement = deadCodeInjectionRootAstHostNode.body[0];
        if (!NodeGuards_1.NodeGuards.isFunctionDeclarationNode(hostNodeFirstStatement)) {
            throw new Error('Wrong dead code injection root AST host node. Host node should contain `FunctionDeclaration` node');
        }
        return hostNodeFirstStatement.body;
    }
    isDeadCodeInjectionRootAstHostNode(node) {
        return NodeGuards_1.NodeGuards.isBlockStatementNode(node) && this.deadCodeInjectionRootAstHostNodeSet.has(node);
    }
    makeClonedBlockStatementNodeUnique(clonedBlockStatementNode) {
        const hostNode = NodeFactory_1.NodeFactory
            .functionExpressionNode([], clonedBlockStatementNode);
        NodeUtils_1.NodeUtils.parentizeNode(hostNode, hostNode);
        NodeUtils_1.NodeUtils.parentizeNode(clonedBlockStatementNode, hostNode);
        return this.transformersRunner.transform(hostNode, DeadCodeInjectionTransformer_1.transformersToRenameBlockScopeIdentifiers, TransformationStage_1.TransformationStage.Obfuscating).body;
    }
    replaceBlockStatementNode(blockStatementNode, randomBlockStatementNode, parentNode) {
        const deadCodeInjectionRootAstHostNode = NodeFactory_1.NodeFactory.blockStatementNode([
            NodeFactory_1.NodeFactory.functionDeclarationNode(DeadCodeInjectionTransformer_1.deadCodeInjectionRootAstHostNodeName, [], randomBlockStatementNode)
        ]);
        this.deadCodeInjectionRootAstHostNodeSet.add(deadCodeInjectionRootAstHostNode);
        const blockStatementDeadCodeInjectionCustomNode = this.deadCodeInjectionCustomNodeFactory(DeadCodeInjectionCustomNode_1.DeadCodeInjectionCustomNode.BlockStatementDeadCodeInjectionNode);
        blockStatementDeadCodeInjectionCustomNode.initialize(blockStatementNode, deadCodeInjectionRootAstHostNode);
        const newBlockStatementNode = blockStatementDeadCodeInjectionCustomNode.getNode()[0];
        NodeUtils_1.NodeUtils.parentizeNode(newBlockStatementNode, parentNode);
        return newBlockStatementNode;
    }
};
DeadCodeInjectionTransformer.deadCodeInjectionRootAstHostNodeName = 'deadCodeInjectionRootAstHostNode';
DeadCodeInjectionTransformer.maxNestedBlockStatementsCount = 4;
DeadCodeInjectionTransformer.minCollectedBlockStatementsCount = 5;
DeadCodeInjectionTransformer.transformersToRenameBlockScopeIdentifiers = [
    NodeTransformer_1.NodeTransformer.LabeledStatementTransformer,
    NodeTransformer_1.NodeTransformer.ScopeIdentifiersTransformer
];
DeadCodeInjectionTransformer = DeadCodeInjectionTransformer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IDeadCodeInjectionCustomNode)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ITransformersRunner)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TDeadNodeInjectionCustomNodeFactory_1.TDeadNodeInjectionCustomNodeFactory !== "undefined" && TDeadNodeInjectionCustomNodeFactory_1.TDeadNodeInjectionCustomNodeFactory) === "function" ? _a : Object, typeof (_b = typeof ITransformersRunner_1.ITransformersRunner !== "undefined" && ITransformersRunner_1.ITransformersRunner) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object])
], DeadCodeInjectionTransformer);
exports.DeadCodeInjectionTransformer = DeadCodeInjectionTransformer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/LabeledStatementTransformer.ts":
/*!***************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/LabeledStatementTransformer.ts ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const TIdentifierObfuscatingReplacerFactory_1 = __webpack_require__(/*! ../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory */ "./src/types/container/node-transformers/TIdentifierObfuscatingReplacerFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeLexicalScopeUtils_1 = __webpack_require__(/*! ../../node/NodeLexicalScopeUtils */ "./src/node/NodeLexicalScopeUtils.ts");
let LabeledStatementTransformer = class LabeledStatementTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(identifierObfuscatingReplacerFactory, randomGenerator, options) {
        super(randomGenerator, options);
        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Obfuscating:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode && NodeGuards_1.NodeGuards.isLabeledStatementNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(labeledStatementNode, parentNode) {
        const lexicalScopeNode = NodeLexicalScopeUtils_1.NodeLexicalScopeUtils.getLexicalScope(labeledStatementNode);
        if (!lexicalScopeNode) {
            return labeledStatementNode;
        }
        this.storeLabeledStatementName(labeledStatementNode, lexicalScopeNode);
        this.replaceLabeledStatementName(labeledStatementNode, lexicalScopeNode);
        return labeledStatementNode;
    }
    storeLabeledStatementName(labeledStatementNode, lexicalScopeNode) {
        this.identifierObfuscatingReplacer.storeLocalName(labeledStatementNode.label, lexicalScopeNode);
    }
    replaceLabeledStatementName(labeledStatementNode, lexicalScopeNode) {
        estraverse.replace(labeledStatementNode, {
            enter: (node, parentNode) => {
                if (parentNode && NodeGuards_1.NodeGuards.isLabelIdentifierNode(node, parentNode)) {
                    const newIdentifier = this.identifierObfuscatingReplacer
                        .replace(node, lexicalScopeNode);
                    node.name = newIdentifier.name;
                }
            }
        });
    }
};
LabeledStatementTransformer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierObfuscatingReplacerFactory_1.TIdentifierObfuscatingReplacerFactory !== "undefined" && TIdentifierObfuscatingReplacerFactory_1.TIdentifierObfuscatingReplacerFactory) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], LabeledStatementTransformer);
exports.LabeledStatementTransformer = LabeledStatementTransformer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/LiteralTransformer.ts":
/*!******************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/LiteralTransformer.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TLiteralObfuscatingReplacerFactory_1 = __webpack_require__(/*! ../../types/container/node-transformers/TLiteralObfuscatingReplacerFactory */ "./src/types/container/node-transformers/TLiteralObfuscatingReplacerFactory.ts");
const IEscapeSequenceEncoder_1 = __webpack_require__(/*! ../../interfaces/utils/IEscapeSequenceEncoder */ "./src/interfaces/utils/IEscapeSequenceEncoder.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const IStringArrayStorageAnalyzer_1 = __webpack_require__(/*! ../../interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer */ "./src/interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer.ts");
const LiteralObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeLiteralUtils_1 = __webpack_require__(/*! ../../node/NodeLiteralUtils */ "./src/node/NodeLiteralUtils.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let LiteralTransformer = class LiteralTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(literalObfuscatingReplacerFactory, randomGenerator, options, stringArrayStorageAnalyzer, escapeSequenceEncoder) {
        super(randomGenerator, options);
        this.literalObfuscatingReplacerFactory = literalObfuscatingReplacerFactory;
        this.stringArrayStorageAnalyzer = stringArrayStorageAnalyzer;
        this.escapeSequenceEncoder = escapeSequenceEncoder;
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Obfuscating:
                return {
                    enter: (node, parentNode) => {
                        if (NodeGuards_1.NodeGuards.isProgramNode(node)) {
                            this.analyzeNode(node);
                        }
                        if (parentNode && NodeGuards_1.NodeGuards.isLiteralNode(node) && !NodeMetadata_1.NodeMetadata.isReplacedLiteral(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            case TransformationStage_1.TransformationStage.Finalizing:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode && NodeGuards_1.NodeGuards.isLiteralNode(node)) {
                            return this.encodeLiteralNodeToEscapeSequence(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    analyzeNode(programNode) {
        this.stringArrayStorageAnalyzer.analyze(programNode);
    }
    transformNode(literalNode, parentNode) {
        if (NodeLiteralUtils_1.NodeLiteralUtils.isProhibitedLiteralNode(literalNode, parentNode)) {
            return literalNode;
        }
        let newLiteralNode;
        switch (typeof literalNode.value) {
            case 'boolean':
                newLiteralNode = this.literalObfuscatingReplacerFactory(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.BooleanLiteralObfuscatingReplacer).replace(literalNode);
                break;
            case 'number':
                newLiteralNode = this.literalObfuscatingReplacerFactory(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.NumberLiteralObfuscatingReplacer).replace(literalNode);
                break;
            case 'string':
                newLiteralNode = this.literalObfuscatingReplacerFactory(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.StringLiteralObfuscatingReplacer).replace(literalNode);
                break;
            default:
                newLiteralNode = literalNode;
        }
        NodeUtils_1.NodeUtils.parentizeNode(newLiteralNode, parentNode);
        return newLiteralNode;
    }
    encodeLiteralNodeToEscapeSequence(literalNode, parentNode) {
        if (typeof literalNode.value !== 'string') {
            return literalNode;
        }
        return NodeFactory_1.NodeFactory.literalNode(this.escapeSequenceEncoder.encode(literalNode.value, this.options.unicodeEscapeSequence));
    }
};
LiteralTransformer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatingReplacer)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IStringArrayStorageAnalyzer)),
    __param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)),
    __metadata("design:paramtypes", [typeof (_a = typeof TLiteralObfuscatingReplacerFactory_1.TLiteralObfuscatingReplacerFactory !== "undefined" && TLiteralObfuscatingReplacerFactory_1.TLiteralObfuscatingReplacerFactory) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object, typeof (_d = typeof IStringArrayStorageAnalyzer_1.IStringArrayStorageAnalyzer !== "undefined" && IStringArrayStorageAnalyzer_1.IStringArrayStorageAnalyzer) === "function" ? _d : Object, typeof (_e = typeof IEscapeSequenceEncoder_1.IEscapeSequenceEncoder !== "undefined" && IEscapeSequenceEncoder_1.IEscapeSequenceEncoder) === "function" ? _e : Object])
], LiteralTransformer);
exports.LiteralTransformer = LiteralTransformer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/ScopeIdentifiersTransformer.ts":
/*!***************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/ScopeIdentifiersTransformer.ts ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const TIdentifierObfuscatingReplacerFactory_1 = __webpack_require__(/*! ../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory */ "./src/types/container/node-transformers/TIdentifierObfuscatingReplacerFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const IScopeIdentifiersTraverser_1 = __webpack_require__(/*! ../../interfaces/node/IScopeIdentifiersTraverser */ "./src/interfaces/node/IScopeIdentifiersTraverser.ts");
const IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
let ScopeIdentifiersTransformer = class ScopeIdentifiersTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(identifierObfuscatingReplacerFactory, randomGenerator, options, scopeIdentifiersTraverser) {
        super(randomGenerator, options);
        this.lexicalScopesWithObjectPatternWithoutDeclarationMap = new Map();
        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
        this.scopeIdentifiersTraverser = scopeIdentifiersTraverser;
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Obfuscating:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode && NodeGuards_1.NodeGuards.isProgramNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(programNode, parentNode) {
        this.scopeIdentifiersTraverser.traverse(programNode, parentNode, (data) => {
            const { isGlobalDeclaration, variable, variableLexicalScopeNode } = data;
            if (!this.options.renameGlobals && isGlobalDeclaration) {
                const isImportBindingOrCatchClauseIdentifier = variable.defs
                    .every((definition) => definition.type === 'ImportBinding'
                    || definition.type === 'CatchClause');
                if (!isImportBindingOrCatchClauseIdentifier) {
                    return;
                }
            }
            this.transformScopeVariableIdentifiers(variable, variableLexicalScopeNode, isGlobalDeclaration);
        });
        return programNode;
    }
    transformScopeVariableIdentifiers(variable, lexicalScopeNode, isGlobalDeclaration) {
        for (const identifier of variable.identifiers) {
            if (!this.isReplaceableIdentifierNode(identifier, lexicalScopeNode, variable)) {
                continue;
            }
            this.storeIdentifierName(identifier, lexicalScopeNode, isGlobalDeclaration);
            this.replaceIdentifierName(identifier, lexicalScopeNode, variable);
        }
    }
    storeIdentifierName(identifierNode, lexicalScopeNode, isGlobalDeclaration) {
        if (isGlobalDeclaration) {
            this.identifierObfuscatingReplacer.storeGlobalName(identifierNode, lexicalScopeNode);
        }
        else {
            this.identifierObfuscatingReplacer.storeLocalName(identifierNode, lexicalScopeNode);
        }
    }
    replaceIdentifierName(identifierNode, lexicalScopeNode, variable) {
        const newIdentifier = this.identifierObfuscatingReplacer
            .replace(identifierNode, lexicalScopeNode);
        identifierNode.name = newIdentifier.name;
        variable.references.forEach((reference) => {
            reference.identifier.name = identifierNode.name;
        });
    }
    isReplaceableIdentifierNode(identifierNode, lexicalScopeNode, variable) {
        const parentNode = identifierNode.parentNode;
        return !!parentNode
            && !NodeMetadata_1.NodeMetadata.isIgnoredNode(identifierNode)
            && !this.isProhibitedPropertyNode(identifierNode, parentNode)
            && !this.isProhibitedClassDeclarationNameIdentifierNode(variable, identifierNode, parentNode)
            && !this.isProhibitedExportNamedClassDeclarationIdentifierNode(identifierNode, parentNode)
            && !this.isProhibitedExportNamedFunctionDeclarationIdentifierNode(identifierNode, parentNode)
            && !this.isProhibitedExportNamedVariableDeclarationIdentifierNode(identifierNode, parentNode)
            && !this.isProhibitedImportSpecifierNode(identifierNode, parentNode)
            && !this.isProhibitedVariableNameUsedInObjectPatternNode(variable, identifierNode, lexicalScopeNode)
            && !NodeGuards_1.NodeGuards.isLabelIdentifierNode(identifierNode, parentNode);
    }
    isProhibitedClassDeclarationNameIdentifierNode(variable, identifierNode, parentNode) {
        return NodeGuards_1.NodeGuards.isClassDeclarationNode(variable.scope.block)
            && NodeGuards_1.NodeGuards.isClassDeclarationNode(parentNode)
            && parentNode.id === identifierNode;
    }
    isProhibitedExportNamedClassDeclarationIdentifierNode(identifierNode, parentNode) {
        return NodeGuards_1.NodeGuards.isClassDeclarationNode(parentNode)
            && parentNode.id === identifierNode
            && !!parentNode.parentNode
            && NodeGuards_1.NodeGuards.isExportNamedDeclarationNode(parentNode.parentNode);
    }
    isProhibitedExportNamedFunctionDeclarationIdentifierNode(identifierNode, parentNode) {
        return NodeGuards_1.NodeGuards.isFunctionDeclarationNode(parentNode)
            && parentNode.id === identifierNode
            && !!parentNode.parentNode
            && NodeGuards_1.NodeGuards.isExportNamedDeclarationNode(parentNode.parentNode);
    }
    isProhibitedExportNamedVariableDeclarationIdentifierNode(identifierNode, parentNode) {
        return NodeGuards_1.NodeGuards.isVariableDeclaratorNode(parentNode)
            && parentNode.id === identifierNode
            && !!parentNode.parentNode
            && NodeGuards_1.NodeGuards.isVariableDeclarationNode(parentNode.parentNode)
            && !!parentNode.parentNode.parentNode
            && NodeGuards_1.NodeGuards.isExportNamedDeclarationNode(parentNode.parentNode.parentNode);
    }
    isProhibitedImportSpecifierNode(identifierNode, parentNode) {
        return NodeGuards_1.NodeGuards.isImportSpecifierNode(parentNode)
            && parentNode.imported.name === parentNode.local.name;
    }
    isProhibitedPropertyNode(node, parentNode) {
        const isProhibitedPropertyIdentifier = NodeGuards_1.NodeGuards.isPropertyNode(parentNode)
            && !parentNode.computed
            && parentNode.key === node;
        const isProhibitedPropertyAssignmentPatternIdentifier = NodeGuards_1.NodeGuards.isAssignmentPatternNode(parentNode)
            && parentNode.left === node
            && !!parentNode.parentNode
            && NodeGuards_1.NodeGuards.isPropertyNode(parentNode.parentNode)
            && parentNode.left === parentNode.parentNode.key;
        return isProhibitedPropertyIdentifier
            || isProhibitedPropertyAssignmentPatternIdentifier;
    }
    isProhibitedVariableNameUsedInObjectPatternNode(variable, identifierNode, lexicalScopeNode) {
        let isLexicalScopeHasObjectPatternWithoutDeclaration = this.lexicalScopesWithObjectPatternWithoutDeclarationMap.get(lexicalScopeNode);
        if (isLexicalScopeHasObjectPatternWithoutDeclaration === false) {
            return false;
        }
        const hasVarDefinitions = variable.defs.some((definition) => definition.kind === 'var');
        if (!hasVarDefinitions) {
            return false;
        }
        let isProhibitedVariableDeclaration = false;
        estraverse.traverse(lexicalScopeNode, {
            enter: (node, parentNode) => {
                if (NodeGuards_1.NodeGuards.isObjectPatternNode(node)
                    && parentNode
                    && NodeGuards_1.NodeGuards.isAssignmentExpressionNode(parentNode)) {
                    isLexicalScopeHasObjectPatternWithoutDeclaration = true;
                    const properties = node.properties;
                    for (const property of properties) {
                        if (property.computed || !property.shorthand) {
                            continue;
                        }
                        if (!NodeGuards_1.NodeGuards.isIdentifierNode(property.key)) {
                            continue;
                        }
                        if (identifierNode.name !== property.key.name) {
                            continue;
                        }
                        isProhibitedVariableDeclaration = true;
                        return estraverse.VisitorOption.Break;
                    }
                }
            }
        });
        this.lexicalScopesWithObjectPatternWithoutDeclarationMap.set(lexicalScopeNode, isLexicalScopeHasObjectPatternWithoutDeclaration !== null && isLexicalScopeHasObjectPatternWithoutDeclaration !== void 0 ? isLexicalScopeHasObjectPatternWithoutDeclaration : false);
        return isProhibitedVariableDeclaration;
    }
};
ScopeIdentifiersTransformer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IScopeIdentifiersTraverser)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierObfuscatingReplacerFactory_1.TIdentifierObfuscatingReplacerFactory !== "undefined" && TIdentifierObfuscatingReplacerFactory_1.TIdentifierObfuscatingReplacerFactory) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object, typeof (_d = typeof IScopeIdentifiersTraverser_1.IScopeIdentifiersTraverser !== "undefined" && IScopeIdentifiersTraverser_1.IScopeIdentifiersTraverser) === "function" ? _d : Object])
], ScopeIdentifiersTransformer);
exports.ScopeIdentifiersTransformer = ScopeIdentifiersTransformer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
let AbstractObfuscatingReplacer = class AbstractObfuscatingReplacer {
    constructor(options) {
        this.options = options;
    }
};
AbstractObfuscatingReplacer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _a : Object])
], AbstractObfuscatingReplacer);
exports.AbstractObfuscatingReplacer = AbstractObfuscatingReplacer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/identifier-obfuscating-replacers/BaseIdentifierObfuscatingReplacer.ts":
/*!****************************************************************************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/obfuscating-replacers/identifier-obfuscating-replacers/BaseIdentifierObfuscatingReplacer.ts ***!
  \****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const AbstractObfuscatingReplacer_1 = __webpack_require__(/*! ../AbstractObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
let BaseIdentifierObfuscatingReplacer = class BaseIdentifierObfuscatingReplacer extends AbstractObfuscatingReplacer_1.AbstractObfuscatingReplacer {
    constructor(identifierNamesGeneratorFactory, options) {
        super(options);
        this.blockScopesMap = new Map();
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
    }
    replace(identifierNode, lexicalScopeNode) {
        let identifierName = identifierNode.name;
        if (this.blockScopesMap.has(lexicalScopeNode)) {
            const namesMap = this.blockScopesMap.get(lexicalScopeNode);
            if (namesMap.has(identifierName)) {
                identifierName = namesMap.get(identifierName);
            }
        }
        return NodeFactory_1.NodeFactory.identifierNode(identifierName);
    }
    storeGlobalName(identifierNode, lexicalScopeNode) {
        const identifierName = identifierNode.name;
        if (this.isReservedName(identifierName)) {
            return;
        }
        const newIdentifierName = this.identifierNamesGenerator.generateWithPrefix();
        if (!this.blockScopesMap.has(lexicalScopeNode)) {
            this.blockScopesMap.set(lexicalScopeNode, new Map());
        }
        const namesMap = this.blockScopesMap.get(lexicalScopeNode);
        namesMap.set(identifierName, newIdentifierName);
    }
    storeLocalName(identifierNode, lexicalScopeNode) {
        const identifierName = identifierNode.name;
        if (this.isReservedName(identifierName)) {
            return;
        }
        const newIdentifierName = this.identifierNamesGenerator.generateForLexicalScope(lexicalScopeNode);
        if (!this.blockScopesMap.has(lexicalScopeNode)) {
            this.blockScopesMap.set(lexicalScopeNode, new Map());
        }
        const namesMap = this.blockScopesMap.get(lexicalScopeNode);
        namesMap.set(identifierName, newIdentifierName);
    }
    preserveName(identifierNode) {
        this.identifierNamesGenerator.preserveName(identifierNode.name);
    }
    preserveNameForLexicalScope(identifierNode, lexicalScopeNode) {
        this.identifierNamesGenerator.preserveNameForLexicalScope(identifierNode.name, lexicalScopeNode);
    }
    isReservedName(name) {
        if (!this.options.reservedNames.length) {
            return false;
        }
        return this.options.reservedNames
            .some((reservedName) => {
            return new RegExp(reservedName, 'g').exec(name) !== null;
        });
    }
};
BaseIdentifierObfuscatingReplacer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], BaseIdentifierObfuscatingReplacer);
exports.BaseIdentifierObfuscatingReplacer = BaseIdentifierObfuscatingReplacer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/BooleanLiteralObfuscatingReplacer.ts":
/*!*************************************************************************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/BooleanLiteralObfuscatingReplacer.ts ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BooleanLiteralObfuscatingReplacer_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const AbstractObfuscatingReplacer_1 = __webpack_require__(/*! ../AbstractObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
let BooleanLiteralObfuscatingReplacer = BooleanLiteralObfuscatingReplacer_1 = class BooleanLiteralObfuscatingReplacer extends AbstractObfuscatingReplacer_1.AbstractObfuscatingReplacer {
    constructor(options) {
        super(options);
    }
    static getTrueUnaryExpressionNode() {
        return NodeFactory_1.NodeFactory.unaryExpressionNode('!', BooleanLiteralObfuscatingReplacer_1.getFalseUnaryExpressionNode());
    }
    static getFalseUnaryExpressionNode() {
        return NodeFactory_1.NodeFactory.unaryExpressionNode('!', NodeFactory_1.NodeFactory.arrayExpressionNode());
    }
    replace(literalNode) {
        const literalValue = literalNode.value;
        if (typeof literalValue !== 'boolean') {
            throw new Error('`BooleanLiteralObfuscatingReplacer` should accept only literals with `boolean` value');
        }
        return literalValue
            ? BooleanLiteralObfuscatingReplacer_1.getTrueUnaryExpressionNode()
            : BooleanLiteralObfuscatingReplacer_1.getFalseUnaryExpressionNode();
    }
};
BooleanLiteralObfuscatingReplacer = BooleanLiteralObfuscatingReplacer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _a : Object])
], BooleanLiteralObfuscatingReplacer);
exports.BooleanLiteralObfuscatingReplacer = BooleanLiteralObfuscatingReplacer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/NumberLiteralObfuscatingReplacer.ts":
/*!************************************************************************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/NumberLiteralObfuscatingReplacer.ts ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const AbstractObfuscatingReplacer_1 = __webpack_require__(/*! ../AbstractObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NumberUtils_1 = __webpack_require__(/*! ../../../../utils/NumberUtils */ "./src/utils/NumberUtils.ts");
const Utils_1 = __webpack_require__(/*! ../../../../utils/Utils */ "./src/utils/Utils.ts");
let NumberLiteralObfuscatingReplacer = class NumberLiteralObfuscatingReplacer extends AbstractObfuscatingReplacer_1.AbstractObfuscatingReplacer {
    constructor(options) {
        super(options);
        this.numberLiteralCache = new Map();
    }
    replace(literalNode) {
        const literalValue = literalNode.value;
        if (typeof literalValue !== 'number') {
            throw new Error('`NumberLiteralObfuscatingReplacer` should accept only literals with `number` value');
        }
        let rawValue;
        if (this.numberLiteralCache.has(literalValue)) {
            rawValue = this.numberLiteralCache.get(literalValue);
        }
        else {
            if (!NumberUtils_1.NumberUtils.isCeil(literalValue)) {
                rawValue = String(literalValue);
            }
            else {
                rawValue = `${Utils_1.Utils.hexadecimalPrefix}${NumberUtils_1.NumberUtils.toHex(literalValue)}`;
            }
            this.numberLiteralCache.set(literalValue, rawValue);
        }
        return NodeFactory_1.NodeFactory.literalNode(literalValue, rawValue);
    }
};
NumberLiteralObfuscatingReplacer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _a : Object])
], NumberLiteralObfuscatingReplacer);
exports.NumberLiteralObfuscatingReplacer = NumberLiteralObfuscatingReplacer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/StringLiteralObfuscatingReplacer.ts":
/*!************************************************************************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/StringLiteralObfuscatingReplacer.ts ***!
  \************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var StringLiteralObfuscatingReplacer_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IStringArrayStorage_1 = __webpack_require__(/*! ../../../../interfaces/storages/string-array-storage/IStringArrayStorage */ "./src/interfaces/storages/string-array-storage/IStringArrayStorage.ts");
const IStringArrayStorageAnalyzer_1 = __webpack_require__(/*! ../../../../interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer */ "./src/interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer.ts");
const Initializable_1 = __webpack_require__(/*! ../../../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const StringArrayEncoding_1 = __webpack_require__(/*! ../../../../enums/StringArrayEncoding */ "./src/enums/StringArrayEncoding.ts");
const AbstractObfuscatingReplacer_1 = __webpack_require__(/*! ../AbstractObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NumberUtils_1 = __webpack_require__(/*! ../../../../utils/NumberUtils */ "./src/utils/NumberUtils.ts");
const Utils_1 = __webpack_require__(/*! ../../../../utils/Utils */ "./src/utils/Utils.ts");
let StringLiteralObfuscatingReplacer = StringLiteralObfuscatingReplacer_1 = class StringLiteralObfuscatingReplacer extends AbstractObfuscatingReplacer_1.AbstractObfuscatingReplacer {
    constructor(stringArrayStorage, stringArrayStorageAnalyzer, options) {
        super(options);
        this.nodesCache = new Map();
        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayStorageAnalyzer = stringArrayStorageAnalyzer;
    }
    static getHexadecimalLiteralNode(hexadecimalIndex) {
        const hexadecimalLiteralNode = NodeFactory_1.NodeFactory.literalNode(hexadecimalIndex);
        NodeMetadata_1.NodeMetadata.set(hexadecimalLiteralNode, { replacedLiteral: true });
        return hexadecimalLiteralNode;
    }
    static getRc4KeyLiteralNode(literalValue) {
        const rc4KeyLiteralNode = NodeFactory_1.NodeFactory.literalNode(literalValue);
        NodeMetadata_1.NodeMetadata.set(rc4KeyLiteralNode, { replacedLiteral: true });
        return rc4KeyLiteralNode;
    }
    initialize() {
        this.stringArrayStorageCallsWrapperName = this.stringArrayStorage.getStorageCallsWrapperName();
        if (this.options.shuffleStringArray) {
            this.stringArrayStorage.shuffleStorage();
        }
        if (this.options.rotateStringArray) {
            this.stringArrayStorage.rotateStorage();
        }
    }
    replace(literalNode) {
        const literalValue = literalNode.value;
        if (typeof literalValue !== 'string') {
            throw new Error('`StringLiteralObfuscatingReplacer` should accept only literals with `string` value');
        }
        const stringArrayStorageItemData = this.stringArrayStorageAnalyzer
            .getItemDataForLiteralNode(literalNode);
        const cacheKey = `${literalValue}-${Boolean(stringArrayStorageItemData)}`;
        const useCachedValue = this.nodesCache.has(cacheKey) && this.options.stringArrayEncoding !== StringArrayEncoding_1.StringArrayEncoding.Rc4;
        if (useCachedValue) {
            return this.nodesCache.get(cacheKey);
        }
        const resultNode = stringArrayStorageItemData
            ? this.replaceWithStringArrayCallNode(stringArrayStorageItemData)
            : this.replaceWithLiteralNode(literalValue);
        this.nodesCache.set(cacheKey, resultNode);
        return resultNode;
    }
    replaceWithLiteralNode(value) {
        return NodeFactory_1.NodeFactory.literalNode(value);
    }
    replaceWithStringArrayCallNode(stringArrayStorageItemData) {
        const { index, decodeKey } = stringArrayStorageItemData;
        const hexadecimalIndex = `${Utils_1.Utils.hexadecimalPrefix}${NumberUtils_1.NumberUtils.toHex(index)}`;
        const callExpressionArgs = [
            StringLiteralObfuscatingReplacer_1.getHexadecimalLiteralNode(hexadecimalIndex)
        ];
        if (decodeKey) {
            callExpressionArgs.push(StringLiteralObfuscatingReplacer_1.getRc4KeyLiteralNode(decodeKey));
        }
        const stringArrayIdentifierNode = NodeFactory_1.NodeFactory.identifierNode(this.stringArrayStorageCallsWrapperName);
        return NodeFactory_1.NodeFactory.callExpressionNode(stringArrayIdentifierNode, callExpressionArgs);
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], StringLiteralObfuscatingReplacer.prototype, "stringArrayStorageCallsWrapperName", void 0);
__decorate([
    inversify_1.postConstruct(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StringLiteralObfuscatingReplacer.prototype, "initialize", null);
StringLiteralObfuscatingReplacer = StringLiteralObfuscatingReplacer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IStringArrayStorage)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IStringArrayStorageAnalyzer)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IStringArrayStorage_1.IStringArrayStorage !== "undefined" && IStringArrayStorage_1.IStringArrayStorage) === "function" ? _a : Object, typeof (_b = typeof IStringArrayStorageAnalyzer_1.IStringArrayStorageAnalyzer !== "undefined" && IStringArrayStorageAnalyzer_1.IStringArrayStorageAnalyzer) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], StringLiteralObfuscatingReplacer);
exports.StringLiteralObfuscatingReplacer = StringLiteralObfuscatingReplacer;


/***/ }),

/***/ "./src/node-transformers/preparing-transformers/CommentsTransformer.ts":
/*!*****************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/CommentsTransformer.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var CommentsTransformer_1, _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const ConditionalCommentObfuscatingGuard_1 = __webpack_require__(/*! ./obfuscating-guards/ConditionalCommentObfuscatingGuard */ "./src/node-transformers/preparing-transformers/obfuscating-guards/ConditionalCommentObfuscatingGuard.ts");
let CommentsTransformer = CommentsTransformer_1 = class CommentsTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Initializing:
                return {
                    leave: (node) => {
                        if (NodeGuards_1.NodeGuards.isProgramNode(node)) {
                            return this.transformNode(node);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(rootNode) {
        if (!rootNode.comments || !rootNode.comments.length) {
            return rootNode;
        }
        const comments = this.transformComments(rootNode.comments);
        if (comments.length === 0) {
            return rootNode;
        }
        if (!rootNode.body.length) {
            rootNode.leadingComments = comments;
            return rootNode;
        }
        estraverse.traverse(rootNode, {
            enter: (node) => {
                if (node === rootNode) {
                    return;
                }
                const commentIdx = comments.findIndex((comment) => comment.range && node.range && comment.range[0] < node.range[0]);
                if (commentIdx === -1) {
                    return;
                }
                node.leadingComments = comments.splice(commentIdx, comments.length - commentIdx).reverse();
            }
        });
        if (comments.length > 0) {
            rootNode.trailingComments = comments.reverse();
        }
        return rootNode;
    }
    transformComments(comments) {
        return comments.filter((comment) => CommentsTransformer_1.preservedWords
            .some((preservedWord) => comment.value.includes(preservedWord)) ||
            ConditionalCommentObfuscatingGuard_1.ConditionalCommentObfuscatingGuard.isConditionalComment(comment)).reverse();
    }
};
CommentsTransformer.preservedWords = [
    '@license',
    '@preserve'
];
CommentsTransformer = CommentsTransformer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], CommentsTransformer);
exports.CommentsTransformer = CommentsTransformer;


/***/ }),

/***/ "./src/node-transformers/preparing-transformers/CustomNodesTransformer.ts":
/*!********************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/CustomNodesTransformer.ts ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TCustomNodeGroupStorage_1 = __webpack_require__(/*! ../../types/storages/TCustomNodeGroupStorage */ "./src/types/storages/TCustomNodeGroupStorage.ts");
const IObfuscationEventEmitter_1 = __webpack_require__(/*! ../../interfaces/event-emitters/IObfuscationEventEmitter */ "./src/interfaces/event-emitters/IObfuscationEventEmitter.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ICallsGraphAnalyzer_1 = __webpack_require__(/*! ../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphAnalyzer */ "./src/interfaces/analyzers/calls-graph-analyzer/ICallsGraphAnalyzer.ts");
const IPrevailingKindOfVariablesAnalyzer_1 = __webpack_require__(/*! ../../interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer */ "./src/interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer.ts");
const ObfuscationEvent_1 = __webpack_require__(/*! ../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let CustomNodesTransformer = class CustomNodesTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(callsGraphAnalyzer, prevailingKindOfVariablesAnalyzer, obfuscationEventEmitter, customNodeGroupStorage, randomGenerator, options) {
        super(randomGenerator, options);
        this.callsGraphData = [];
        this.callsGraphAnalyzer = callsGraphAnalyzer;
        this.prevailingKindOfVariablesAnalyzer = prevailingKindOfVariablesAnalyzer;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
        this.customNodeGroupStorage = customNodeGroupStorage;
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Preparing:
                return {
                    leave: (node, parentNode) => {
                        if (NodeGuards_1.NodeGuards.isProgramNode(node)) {
                            this.analyzeNode(node, parentNode);
                            this.appendCustomNodesBeforeObfuscation(node, parentNode);
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            case TransformationStage_1.TransformationStage.Finalizing:
                return {
                    leave: (node, parentNode) => {
                        if (NodeGuards_1.NodeGuards.isProgramNode(node)) {
                            this.appendCustomNodesAfterObfuscation(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    analyzeNode(node, parentNode) {
        this.callsGraphData = this.callsGraphAnalyzer.analyze(node);
        this.prevailingKindOfVariablesAnalyzer.analyze(node);
    }
    transformNode(node, parentNode) {
        return node;
    }
    appendCustomNodesBeforeObfuscation(node, parentNode) {
        this.customNodeGroupStorage
            .getStorage()
            .forEach((customNodeGroup) => {
            customNodeGroup.initialize();
            this.obfuscationEventEmitter.once(customNodeGroup.getAppendEvent(), customNodeGroup.appendCustomNodes.bind(customNodeGroup));
        });
        this.obfuscationEventEmitter.emit(ObfuscationEvent_1.ObfuscationEvent.BeforeObfuscation, node, this.callsGraphData);
    }
    appendCustomNodesAfterObfuscation(node, parentNode) {
        this.obfuscationEventEmitter.emit(ObfuscationEvent_1.ObfuscationEvent.AfterObfuscation, node, this.callsGraphData);
    }
};
CustomNodesTransformer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICallsGraphAnalyzer)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TCustomNodeGroupStorage)),
    __param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(5, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof ICallsGraphAnalyzer_1.ICallsGraphAnalyzer !== "undefined" && ICallsGraphAnalyzer_1.ICallsGraphAnalyzer) === "function" ? _a : Object, typeof (_b = typeof IPrevailingKindOfVariablesAnalyzer_1.IPrevailingKindOfVariablesAnalyzer !== "undefined" && IPrevailingKindOfVariablesAnalyzer_1.IPrevailingKindOfVariablesAnalyzer) === "function" ? _b : Object, typeof (_c = typeof IObfuscationEventEmitter_1.IObfuscationEventEmitter !== "undefined" && IObfuscationEventEmitter_1.IObfuscationEventEmitter) === "function" ? _c : Object, typeof (_d = typeof TCustomNodeGroupStorage_1.TCustomNodeGroupStorage !== "undefined" && TCustomNodeGroupStorage_1.TCustomNodeGroupStorage) === "function" ? _d : Object, typeof (_e = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _e : Object, typeof (_f = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _f : Object])
], CustomNodesTransformer);
exports.CustomNodesTransformer = CustomNodesTransformer;


/***/ }),

/***/ "./src/node-transformers/preparing-transformers/EvalCallExpressionTransformer.ts":
/*!***************************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/EvalCallExpressionTransformer.ts ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var EvalCallExpressionTransformer_1, _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const js_string_escape_1 = __importDefault(__webpack_require__(/*! js-string-escape */ "js-string-escape"));
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let EvalCallExpressionTransformer = EvalCallExpressionTransformer_1 = class EvalCallExpressionTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
        this.evalRootAstHostNodeSet = new Set();
    }
    static extractEvalStringFromCallExpressionArgument(node) {
        if (NodeGuards_1.NodeGuards.isLiteralNode(node)) {
            return EvalCallExpressionTransformer_1
                .extractEvalStringFromLiteralNode(node);
        }
        if (NodeGuards_1.NodeGuards.isTemplateLiteralNode(node)) {
            return EvalCallExpressionTransformer_1
                .extractEvalStringFromTemplateLiteralNode(node);
        }
        return null;
    }
    static extractEvalStringFromLiteralNode(node) {
        return typeof node.value === 'string' ? node.value : null;
    }
    static extractEvalStringFromTemplateLiteralNode(node) {
        const quasis = node.quasis;
        const allowedQuasisLength = 1;
        if (quasis.length !== allowedQuasisLength || node.expressions.length) {
            return null;
        }
        return quasis[0].value.cooked;
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Preparing:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode
                            && NodeGuards_1.NodeGuards.isCallExpressionNode(node)
                            && NodeGuards_1.NodeGuards.isIdentifierNode(node.callee)
                            && node.callee.name === 'eval') {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            case TransformationStage_1.TransformationStage.Finalizing:
                if (!this.evalRootAstHostNodeSet.size) {
                    return null;
                }
                return {
                    leave: (node, parentNode) => {
                        if (parentNode && this.isEvalRootAstHostNode(node)) {
                            return this.restoreNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(callExpressionNode, parentNode) {
        const callExpressionFirstArgument = callExpressionNode.arguments[0];
        if (!callExpressionFirstArgument) {
            return callExpressionNode;
        }
        const evalString = EvalCallExpressionTransformer_1
            .extractEvalStringFromCallExpressionArgument(callExpressionFirstArgument);
        if (!evalString) {
            return callExpressionNode;
        }
        let ast;
        try {
            ast = NodeUtils_1.NodeUtils.convertCodeToStructure(evalString);
        }
        catch (_a) {
            return callExpressionNode;
        }
        const evalRootAstHostNode = NodeFactory_1.NodeFactory
            .functionExpressionNode([], NodeFactory_1.NodeFactory.blockStatementNode(ast));
        this.evalRootAstHostNodeSet.add(evalRootAstHostNode);
        return evalRootAstHostNode;
    }
    restoreNode(evalRootAstHostNode, parentNode) {
        const targetAst = evalRootAstHostNode.body.body;
        const obfuscatedCode = NodeUtils_1.NodeUtils.convertStructureToCode(targetAst);
        return NodeFactory_1.NodeFactory.callExpressionNode(NodeFactory_1.NodeFactory.identifierNode('eval'), [
            NodeFactory_1.NodeFactory.literalNode(js_string_escape_1.default(obfuscatedCode))
        ]);
    }
    isEvalRootAstHostNode(node) {
        return NodeGuards_1.NodeGuards.isFunctionExpressionNode(node) && this.evalRootAstHostNodeSet.has(node);
    }
};
EvalCallExpressionTransformer = EvalCallExpressionTransformer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], EvalCallExpressionTransformer);
exports.EvalCallExpressionTransformer = EvalCallExpressionTransformer;


/***/ }),

/***/ "./src/node-transformers/preparing-transformers/MetadataTransformer.ts":
/*!*****************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/MetadataTransformer.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
let MetadataTransformer = class MetadataTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Preparing:
                return {
                    enter: (node, parentNode) => {
                        return this.transformNode(node, parentNode);
                    }
                };
            default:
                return null;
        }
    }
    transformNode(node, parentNode) {
        NodeMetadata_1.NodeMetadata.set(node, { ignoredNode: false });
        if (NodeGuards_1.NodeGuards.isLiteralNode(node)) {
            NodeMetadata_1.NodeMetadata.set(node, { replacedLiteral: false });
        }
        return node;
    }
};
MetadataTransformer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], MetadataTransformer);
exports.MetadataTransformer = MetadataTransformer;


/***/ }),

/***/ "./src/node-transformers/preparing-transformers/ObfuscatingGuardsTransformer.ts":
/*!**************************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/ObfuscatingGuardsTransformer.ts ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ObfuscatingGuardsTransformer_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TObfuscatingGuardFactory_1 = __webpack_require__(/*! ../../types/container/node-transformers/TObfuscatingGuardFactory */ "./src/types/container/node-transformers/TObfuscatingGuardFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const ObfuscatingGuard_1 = __webpack_require__(/*! ../../enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard */ "./src/enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
let ObfuscatingGuardsTransformer = ObfuscatingGuardsTransformer_1 = class ObfuscatingGuardsTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(obfuscatingGuardFactory, randomGenerator, options) {
        super(randomGenerator, options);
        this.obfuscatingGuards = ObfuscatingGuardsTransformer_1.obfuscatingGuardsList.map(obfuscatingGuardFactory);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Preparing:
                return {
                    enter: (node, parentNode) => {
                        return this.transformNode(node, parentNode);
                    }
                };
            default:
                return null;
        }
    }
    transformNode(node, parentNode) {
        const obfuscationAllowed = this.obfuscatingGuards
            .every((nodeGuard) => nodeGuard.check(node));
        NodeMetadata_1.NodeMetadata.set(node, {
            ignoredNode: !obfuscationAllowed
        });
        return node;
    }
};
ObfuscatingGuardsTransformer.obfuscatingGuardsList = [
    ObfuscatingGuard_1.ObfuscatingGuard.BlackListObfuscatingGuard,
    ObfuscatingGuard_1.ObfuscatingGuard.ConditionalCommentObfuscatingGuard,
    ObfuscatingGuard_1.ObfuscatingGuard.ReservedStringObfuscatingGuard
];
ObfuscatingGuardsTransformer = ObfuscatingGuardsTransformer_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeGuard)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TObfuscatingGuardFactory_1.TObfuscatingGuardFactory !== "undefined" && TObfuscatingGuardFactory_1.TObfuscatingGuardFactory) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], ObfuscatingGuardsTransformer);
exports.ObfuscatingGuardsTransformer = ObfuscatingGuardsTransformer;


/***/ }),

/***/ "./src/node-transformers/preparing-transformers/ParentificationTransformer.ts":
/*!************************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/ParentificationTransformer.ts ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let ParentificationTransformer = class ParentificationTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Preparing:
                return {
                    enter: (node, parentNode) => {
                        return this.transformNode(node, parentNode);
                    }
                };
            default:
                return null;
        }
    }
    transformNode(node, parentNode) {
        return NodeUtils_1.NodeUtils.parentizeNode(node, parentNode);
    }
};
ParentificationTransformer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], ParentificationTransformer);
exports.ParentificationTransformer = ParentificationTransformer;


/***/ }),

/***/ "./src/node-transformers/preparing-transformers/VariablePreserveTransformer.ts":
/*!*************************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/VariablePreserveTransformer.ts ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const TIdentifierObfuscatingReplacerFactory_1 = __webpack_require__(/*! ../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory */ "./src/types/container/node-transformers/TIdentifierObfuscatingReplacerFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const IScopeIdentifiersTraverser_1 = __webpack_require__(/*! ../../interfaces/node/IScopeIdentifiersTraverser */ "./src/interfaces/node/IScopeIdentifiersTraverser.ts");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let VariablePreserveTransformer = class VariablePreserveTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(identifierObfuscatingReplacerFactory, randomGenerator, options, scopeIdentifiersTraverser) {
        super(randomGenerator, options);
        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
        this.scopeIdentifiersTraverser = scopeIdentifiersTraverser;
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Preparing:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode && NodeGuards_1.NodeGuards.isProgramNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(programNode, parentNode) {
        this.scopeIdentifiersTraverser.traverse(programNode, parentNode, (data) => {
            const { isGlobalDeclaration, variable, variableScope } = data;
            this.preserveScopeVariableIdentifiers(variable, variableScope, isGlobalDeclaration);
        });
        return programNode;
    }
    preserveScopeVariableIdentifiers(variable, variableScope, isGlobalDeclaration) {
        for (const identifier of variable.identifiers) {
            if (isGlobalDeclaration) {
                this.preserveIdentifierNameForRootLexicalScope(identifier);
            }
            else {
                this.preserveIdentifierNameForLexicalScope(identifier, variableScope);
            }
        }
    }
    preserveIdentifierNameForRootLexicalScope(identifierNode) {
        this.identifierObfuscatingReplacer.preserveName(identifierNode);
    }
    preserveIdentifierNameForLexicalScope(identifierNode, variableScope) {
        const lexicalScopeNode = NodeGuards_1.NodeGuards.isNodeWithLexicalScope(variableScope.block)
            ? variableScope.block
            : null;
        if (!lexicalScopeNode) {
            return;
        }
        this.identifierObfuscatingReplacer.preserveNameForLexicalScope(identifierNode, lexicalScopeNode);
    }
};
VariablePreserveTransformer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IScopeIdentifiersTraverser)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierObfuscatingReplacerFactory_1.TIdentifierObfuscatingReplacerFactory !== "undefined" && TIdentifierObfuscatingReplacerFactory_1.TIdentifierObfuscatingReplacerFactory) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object, typeof (_d = typeof IScopeIdentifiersTraverser_1.IScopeIdentifiersTraverser !== "undefined" && IScopeIdentifiersTraverser_1.IScopeIdentifiersTraverser) === "function" ? _d : Object])
], VariablePreserveTransformer);
exports.VariablePreserveTransformer = VariablePreserveTransformer;


/***/ }),

/***/ "./src/node-transformers/preparing-transformers/obfuscating-guards/BlackListObfuscatingGuard.ts":
/*!******************************************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/obfuscating-guards/BlackListObfuscatingGuard.ts ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BlackListObfuscatingGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let BlackListObfuscatingGuard = BlackListObfuscatingGuard_1 = class BlackListObfuscatingGuard {
    constructor() {
        this.blackListGuardsLength = BlackListObfuscatingGuard_1.blackListGuards.length;
    }
    check(node) {
        for (let i = 0; i < this.blackListGuardsLength; i++) {
            if (BlackListObfuscatingGuard_1.blackListGuards[i](node)) {
                return false;
            }
        }
        return true;
    }
};
BlackListObfuscatingGuard.blackListGuards = [
    NodeGuards_1.NodeGuards.isUseStrictOperator
];
BlackListObfuscatingGuard = BlackListObfuscatingGuard_1 = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], BlackListObfuscatingGuard);
exports.BlackListObfuscatingGuard = BlackListObfuscatingGuard;


/***/ }),

/***/ "./src/node-transformers/preparing-transformers/obfuscating-guards/ConditionalCommentObfuscatingGuard.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/obfuscating-guards/ConditionalCommentObfuscatingGuard.ts ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ConditionalCommentObfuscatingGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let ConditionalCommentObfuscatingGuard = ConditionalCommentObfuscatingGuard_1 = class ConditionalCommentObfuscatingGuard {
    constructor() {
        this.obfuscationAllowedForCurrentNode = true;
        this.obfuscationAllowedForNextNode = null;
    }
    static isConditionalComment(comment) {
        return ConditionalCommentObfuscatingGuard_1.obfuscationEnableCommentRegExp.test(comment.value) ||
            ConditionalCommentObfuscatingGuard_1.obfuscationDisableCommentRegExp.test(comment.value);
    }
    check(node) {
        if (this.obfuscationAllowedForNextNode) {
            this.obfuscationAllowedForCurrentNode = this.obfuscationAllowedForNextNode;
            this.obfuscationAllowedForNextNode = null;
        }
        if (!NodeGuards_1.NodeGuards.isNodeWithComments(node)) {
            return this.obfuscationAllowedForCurrentNode;
        }
        const leadingComments = node.leadingComments;
        const trailingComments = node.trailingComments;
        if (leadingComments) {
            this.obfuscationAllowedForCurrentNode = this.checkComments(leadingComments);
        }
        if (trailingComments) {
            this.obfuscationAllowedForNextNode = this.checkComments(trailingComments);
        }
        return this.obfuscationAllowedForCurrentNode;
    }
    checkComments(comments) {
        const commentsLength = comments.length;
        let obfuscationAllowed = this.obfuscationAllowedForCurrentNode;
        for (let i = 0; i < commentsLength; i++) {
            const comment = comments[i];
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
};
ConditionalCommentObfuscatingGuard.obfuscationEnableCommentRegExp = new RegExp('javascript-obfuscator *: *enable');
ConditionalCommentObfuscatingGuard.obfuscationDisableCommentRegExp = new RegExp('javascript-obfuscator *: *disable');
ConditionalCommentObfuscatingGuard = ConditionalCommentObfuscatingGuard_1 = __decorate([
    inversify_1.injectable()
], ConditionalCommentObfuscatingGuard);
exports.ConditionalCommentObfuscatingGuard = ConditionalCommentObfuscatingGuard;


/***/ }),

/***/ "./src/node-transformers/preparing-transformers/obfuscating-guards/ReservedStringObfuscatingGuard.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/node-transformers/preparing-transformers/obfuscating-guards/ReservedStringObfuscatingGuard.ts ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const IOptions_1 = __webpack_require__(/*! ../../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let ReservedStringObfuscatingGuard = class ReservedStringObfuscatingGuard {
    constructor(options) {
        this.options = options;
    }
    check(node) {
        if (this.options.reservedStrings.length
            && NodeGuards_1.NodeGuards.isLiteralNode(node)
            && typeof node.value === 'string') {
            return !this.isReservedString(node.value);
        }
        return true;
    }
    isReservedString(value) {
        return this.options.reservedStrings
            .some((reservedString) => {
            return new RegExp(reservedString, 'g').exec(value) !== null;
        });
    }
};
ReservedStringObfuscatingGuard = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _a : Object])
], ReservedStringObfuscatingGuard);
exports.ReservedStringObfuscatingGuard = ReservedStringObfuscatingGuard;


/***/ }),

/***/ "./src/node/NodeAppender.ts":
/*!**********************************!*\
  !*** ./src/node/NodeAppender.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const NodeGuards_1 = __webpack_require__(/*! ./NodeGuards */ "./src/node/NodeGuards.ts");
class NodeAppender {
    static append(nodeWithStatements, statements) {
        statements = NodeAppender.parentizeScopeStatementsBeforeAppend(nodeWithStatements, statements);
        NodeAppender.setScopeStatements(nodeWithStatements, [
            ...NodeAppender.getScopeStatements(nodeWithStatements),
            ...statements
        ]);
    }
    static appendToOptimalBlockScope(callsGraphData, nodeWithStatements, bodyStatements, index = 0) {
        const targetBlockScope = callsGraphData.length
            ? NodeAppender.getOptimalBlockScope(callsGraphData, index)
            : nodeWithStatements;
        NodeAppender.prepend(targetBlockScope, bodyStatements);
    }
    static getOptimalBlockScope(callsGraphData, index, deep = Infinity) {
        const firstCall = callsGraphData[index];
        if (deep <= 0) {
            throw new Error('Invalid `deep` argument value. Value should be bigger then 0.');
        }
        if (deep > 1 && firstCall.callsGraph.length) {
            return NodeAppender.getOptimalBlockScope(firstCall.callsGraph, 0, --deep);
        }
        else {
            return firstCall.callee;
        }
    }
    static insertBefore(nodeWithStatements, statements, target) {
        const indexInScopeStatement = NodeAppender
            .getScopeStatements(nodeWithStatements)
            .indexOf(target);
        NodeAppender.insertAtIndex(nodeWithStatements, statements, indexInScopeStatement);
    }
    static insertAfter(nodeWithStatements, statements, target) {
        const indexInScopeStatement = NodeAppender
            .getScopeStatements(nodeWithStatements)
            .indexOf(target);
        NodeAppender.insertAtIndex(nodeWithStatements, statements, indexInScopeStatement + 1);
    }
    static insertAtIndex(nodeWithStatements, statements, index) {
        statements = NodeAppender.parentizeScopeStatementsBeforeAppend(nodeWithStatements, statements);
        NodeAppender.setScopeStatements(nodeWithStatements, [
            ...NodeAppender.getScopeStatements(nodeWithStatements).slice(0, index),
            ...statements,
            ...NodeAppender.getScopeStatements(nodeWithStatements).slice(index)
        ]);
    }
    static prepend(nodeWithStatements, statements) {
        statements = NodeAppender.parentizeScopeStatementsBeforeAppend(nodeWithStatements, statements);
        NodeAppender.setScopeStatements(nodeWithStatements, [
            ...statements,
            ...NodeAppender.getScopeStatements(nodeWithStatements),
        ]);
    }
    static getScopeStatements(nodeWithStatements) {
        if (NodeGuards_1.NodeGuards.isSwitchCaseNode(nodeWithStatements)) {
            return nodeWithStatements.consequent;
        }
        return nodeWithStatements.body;
    }
    static parentizeScopeStatementsBeforeAppend(nodeWithStatements, statements) {
        statements.forEach((statement) => {
            statement.parentNode = nodeWithStatements;
        });
        return statements;
    }
    static setScopeStatements(nodeWithStatements, statements) {
        if (NodeGuards_1.NodeGuards.isSwitchCaseNode(nodeWithStatements)) {
            nodeWithStatements.consequent = statements;
            return;
        }
        nodeWithStatements.body = statements;
    }
}
exports.NodeAppender = NodeAppender;


/***/ }),

/***/ "./src/node/NodeFactory.ts":
/*!*********************************!*\
  !*** ./src/node/NodeFactory.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const escodegen = __importStar(__webpack_require__(/*! escodegen */ "escodegen"));
const NodeType_1 = __webpack_require__(/*! ../enums/node/NodeType */ "./src/enums/node/NodeType.ts");
class NodeFactory {
    static programNode(body = []) {
        return {
            type: NodeType_1.NodeType.Program,
            body,
            sourceType: 'script',
            metadata: { ignoredNode: false }
        };
    }
    static arrayExpressionNode(elements = []) {
        return {
            type: NodeType_1.NodeType.ArrayExpression,
            elements,
            metadata: { ignoredNode: false }
        };
    }
    static assignmentExpressionNode(operator, left, right) {
        return {
            type: NodeType_1.NodeType.AssignmentExpression,
            operator,
            left,
            right,
            metadata: { ignoredNode: false }
        };
    }
    static binaryExpressionNode(operator, left, right) {
        return {
            type: NodeType_1.NodeType.BinaryExpression,
            operator,
            left,
            right,
            metadata: { ignoredNode: false }
        };
    }
    static blockStatementNode(body = []) {
        return {
            type: NodeType_1.NodeType.BlockStatement,
            body,
            metadata: { ignoredNode: false }
        };
    }
    static breakStatement(label) {
        return {
            type: NodeType_1.NodeType.BreakStatement,
            label,
            metadata: { ignoredNode: false }
        };
    }
    static callExpressionNode(callee, args = []) {
        return {
            type: NodeType_1.NodeType.CallExpression,
            callee,
            arguments: args,
            metadata: { ignoredNode: false }
        };
    }
    static continueStatement(label) {
        return {
            type: NodeType_1.NodeType.ContinueStatement,
            label,
            metadata: { ignoredNode: false }
        };
    }
    static directiveNode(expression, directive) {
        return {
            type: NodeType_1.NodeType.ExpressionStatement,
            expression,
            directive,
            metadata: { ignoredNode: false }
        };
    }
    static expressionStatementNode(expression) {
        return {
            type: NodeType_1.NodeType.ExpressionStatement,
            expression,
            metadata: { ignoredNode: false }
        };
    }
    static functionDeclarationNode(functionName, params, body) {
        return {
            type: NodeType_1.NodeType.FunctionDeclaration,
            id: NodeFactory.identifierNode(functionName),
            params,
            body,
            generator: false,
            metadata: { ignoredNode: false }
        };
    }
    static functionExpressionNode(params, body) {
        return {
            type: NodeType_1.NodeType.FunctionExpression,
            params,
            body,
            generator: false,
            metadata: { ignoredNode: false }
        };
    }
    static ifStatementNode(test, consequent, alternate) {
        return Object.assign(Object.assign({ type: NodeType_1.NodeType.IfStatement, test,
            consequent }, alternate && { alternate }), { metadata: { ignoredNode: false } });
    }
    static identifierNode(name) {
        return {
            type: NodeType_1.NodeType.Identifier,
            name,
            metadata: { ignoredNode: false }
        };
    }
    static importDeclarationNode(specifiers, source) {
        return {
            type: NodeType_1.NodeType.ImportDeclaration,
            specifiers,
            source,
            metadata: { ignoredNode: false }
        };
    }
    static literalNode(value, raw) {
        raw = raw !== undefined ? raw : `'${value}'`;
        return {
            type: NodeType_1.NodeType.Literal,
            value,
            raw,
            'x-verbatim-property': {
                content: raw,
                precedence: escodegen.Precedence.Primary
            },
            metadata: { ignoredNode: false }
        };
    }
    static logicalExpressionNode(operator, left, right) {
        return {
            type: NodeType_1.NodeType.LogicalExpression,
            operator,
            left,
            right,
            metadata: { ignoredNode: false }
        };
    }
    static memberExpressionNode(object, property, computed = false) {
        return {
            type: NodeType_1.NodeType.MemberExpression,
            computed,
            object,
            property,
            metadata: { ignoredNode: false }
        };
    }
    static methodDefinitionNode(key, value, kind, computed) {
        return {
            type: NodeType_1.NodeType.MethodDefinition,
            key,
            value,
            kind,
            computed,
            static: false,
            metadata: { ignoredNode: false }
        };
    }
    static objectExpressionNode(properties) {
        return {
            type: NodeType_1.NodeType.ObjectExpression,
            properties,
            metadata: { ignoredNode: false }
        };
    }
    static propertyNode(key, value, computed = false) {
        return {
            type: NodeType_1.NodeType.Property,
            key,
            value,
            kind: 'init',
            method: false,
            shorthand: false,
            computed,
            metadata: { ignoredNode: false }
        };
    }
    static returnStatementNode(argument) {
        return {
            type: NodeType_1.NodeType.ReturnStatement,
            argument,
            metadata: { ignoredNode: false }
        };
    }
    static switchStatementNode(discriminant, cases) {
        return {
            type: NodeType_1.NodeType.SwitchStatement,
            discriminant,
            cases,
            metadata: { ignoredNode: false }
        };
    }
    static switchCaseNode(test, consequent) {
        return {
            type: NodeType_1.NodeType.SwitchCase,
            test,
            consequent,
            metadata: { ignoredNode: false }
        };
    }
    static unaryExpressionNode(operator, argument, prefix = true) {
        return {
            type: NodeType_1.NodeType.UnaryExpression,
            operator,
            argument,
            prefix,
            metadata: { ignoredNode: false }
        };
    }
    static updateExpressionNode(operator, argumentExpr) {
        return {
            type: NodeType_1.NodeType.UpdateExpression,
            operator,
            argument: argumentExpr,
            prefix: false,
            metadata: { ignoredNode: false }
        };
    }
    static variableDeclarationNode(declarations = [], kind = 'var') {
        return {
            type: NodeType_1.NodeType.VariableDeclaration,
            declarations,
            kind,
            metadata: { ignoredNode: false }
        };
    }
    static variableDeclaratorNode(id, init) {
        return {
            type: NodeType_1.NodeType.VariableDeclarator,
            id,
            init,
            metadata: { ignoredNode: false }
        };
    }
    static whileStatementNode(test, body) {
        return {
            type: NodeType_1.NodeType.WhileStatement,
            test,
            body,
            metadata: { ignoredNode: false }
        };
    }
}
exports.NodeFactory = NodeFactory;


/***/ }),

/***/ "./src/node/NodeGuards.ts":
/*!********************************!*\
  !*** ./src/node/NodeGuards.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const NodeType_1 = __webpack_require__(/*! ../enums/node/NodeType */ "./src/enums/node/NodeType.ts");
class NodeGuards {
    static isArrayPatternNode(node) {
        return node.type === NodeType_1.NodeType.ArrayPattern;
    }
    static isArrowFunctionExpressionNode(node) {
        return node.type === NodeType_1.NodeType.ArrowFunctionExpression;
    }
    static isAssignmentExpressionNode(node) {
        return node.type === NodeType_1.NodeType.AssignmentExpression;
    }
    static isAssignmentPatternNode(node) {
        return node.type === NodeType_1.NodeType.AssignmentPattern;
    }
    static isAwaitExpressionNode(node) {
        return node.type === NodeType_1.NodeType.AwaitExpression;
    }
    static isBlockStatementNode(node) {
        return node.type === NodeType_1.NodeType.BlockStatement;
    }
    static isBreakStatementNode(node) {
        return node.type === NodeType_1.NodeType.BreakStatement;
    }
    static isCallExpressionNode(node) {
        return node.type === NodeType_1.NodeType.CallExpression;
    }
    static isClassDeclarationNode(node) {
        return node.type === NodeType_1.NodeType.ClassDeclaration && node.id !== null;
    }
    static isContinueStatementNode(node) {
        return node.type === NodeType_1.NodeType.ContinueStatement;
    }
    static isDirectiveNode(node) {
        return node.type === NodeType_1.NodeType.ExpressionStatement
            && 'directive' in node;
    }
    static isExportNamedDeclarationNode(node) {
        return node.type === NodeType_1.NodeType.ExportNamedDeclaration;
    }
    static isExpressionStatementNode(node) {
        return node.type === NodeType_1.NodeType.ExpressionStatement
            && !('directive' in node);
    }
    static isFunctionNode(node) {
        return NodeGuards.isFunctionDeclarationNode(node) ||
            NodeGuards.isFunctionExpressionNode(node) ||
            NodeGuards.isArrowFunctionExpressionNode(node);
    }
    static isFunctionDeclarationNode(node) {
        return node.type === NodeType_1.NodeType.FunctionDeclaration && node.id !== null;
    }
    static isFunctionExpressionNode(node) {
        return node.type === NodeType_1.NodeType.FunctionExpression;
    }
    static isIdentifierNode(node) {
        return node.type === NodeType_1.NodeType.Identifier;
    }
    static isImportDeclarationNode(node) {
        return node.type === NodeType_1.NodeType.ImportDeclaration;
    }
    static isImportSpecifierNode(node) {
        return node.type === NodeType_1.NodeType.ImportSpecifier;
    }
    static isLabelIdentifierNode(node, parentNode) {
        const parentNodeIsLabeledStatementNode = NodeGuards.isLabeledStatementNode(parentNode) && parentNode.label === node;
        const parentNodeIsContinueStatementNode = NodeGuards.isContinueStatementNode(parentNode) && parentNode.label === node;
        const parentNodeIsBreakStatementNode = NodeGuards.isBreakStatementNode(parentNode) && parentNode.label === node;
        return parentNodeIsLabeledStatementNode || parentNodeIsContinueStatementNode || parentNodeIsBreakStatementNode;
    }
    static isLabeledStatementNode(node) {
        return node.type === NodeType_1.NodeType.LabeledStatement;
    }
    static isLiteralNode(node) {
        return node.type === NodeType_1.NodeType.Literal;
    }
    static isMemberExpressionNode(node) {
        return node.type === NodeType_1.NodeType.MemberExpression;
    }
    static isMethodDefinitionNode(node) {
        return node.type === NodeType_1.NodeType.MethodDefinition;
    }
    static isNode(object) {
        return object && !object.type !== undefined;
    }
    static isNodeWithLexicalScope(node) {
        return NodeGuards.isProgramNode(node) || NodeGuards.isFunctionNode(node);
    }
    static isNodeWithBlockLexicalScope(node) {
        return NodeGuards.isNodeWithLexicalScope(node) || NodeGuards.isBlockStatementNode(node);
    }
    static isNodeWithLexicalScopeStatements(node, parentNode) {
        return NodeGuards.isProgramNode(node)
            || (NodeGuards.isBlockStatementNode(node) && NodeGuards.nodesWithLexicalStatements.includes(parentNode.type));
    }
    static isNodeWithStatements(node) {
        return NodeGuards.isProgramNode(node)
            || NodeGuards.isBlockStatementNode(node)
            || NodeGuards.isSwitchCaseNode(node);
    }
    static isNodeWithComments(node) {
        return Boolean(node.leadingComments) || Boolean(node.trailingComments);
    }
    static isObjectPatternNode(node) {
        return node.type === NodeType_1.NodeType.ObjectPattern;
    }
    static isObjectExpressionNode(node) {
        return node.type === NodeType_1.NodeType.ObjectExpression;
    }
    static isProgramNode(node) {
        return node.type === NodeType_1.NodeType.Program;
    }
    static isPropertyNode(node) {
        return node.type === NodeType_1.NodeType.Property;
    }
    static isRestElementNode(node) {
        return node.type === NodeType_1.NodeType.RestElement;
    }
    static isReturnStatementNode(node) {
        return node.type === NodeType_1.NodeType.ReturnStatement;
    }
    static isSequenceExpressionNode(node) {
        return node.type === NodeType_1.NodeType.SequenceExpression;
    }
    static isSuperNode(node) {
        return node.type === NodeType_1.NodeType.Super;
    }
    static isSwitchCaseNode(node) {
        return node.type === NodeType_1.NodeType.SwitchCase;
    }
    static isTaggedTemplateExpressionNode(node) {
        return node.type === NodeType_1.NodeType.TaggedTemplateExpression;
    }
    static isTemplateLiteralNode(node) {
        return node.type === NodeType_1.NodeType.TemplateLiteral;
    }
    static isUnaryExpressionNode(node) {
        return node.type === NodeType_1.NodeType.UnaryExpression;
    }
    static isUseStrictOperator(node) {
        return NodeGuards.isDirectiveNode(node)
            && node.directive === 'use strict';
    }
    static isVariableDeclarationNode(node) {
        return node.type === NodeType_1.NodeType.VariableDeclaration;
    }
    static isVariableDeclaratorNode(node) {
        return node.type === NodeType_1.NodeType.VariableDeclarator;
    }
    static isWhileStatementNode(node) {
        return node.type === NodeType_1.NodeType.WhileStatement;
    }
}
exports.NodeGuards = NodeGuards;
NodeGuards.nodesWithLexicalStatements = [
    NodeType_1.NodeType.ArrowFunctionExpression,
    NodeType_1.NodeType.FunctionDeclaration,
    NodeType_1.NodeType.FunctionExpression,
    NodeType_1.NodeType.MethodDefinition,
];


/***/ }),

/***/ "./src/node/NodeLexicalScopeUtils.ts":
/*!*******************************************!*\
  !*** ./src/node/NodeLexicalScopeUtils.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const NodeGuards_1 = __webpack_require__(/*! ./NodeGuards */ "./src/node/NodeGuards.ts");
class NodeLexicalScopeUtils {
    static getLexicalScope(node) {
        return NodeLexicalScopeUtils.getLexicalScopesRecursive(node, 1)[0];
    }
    static getLexicalScopes(node) {
        return NodeLexicalScopeUtils.getLexicalScopesRecursive(node);
    }
    static getLexicalScopesRecursive(node, maxSize = Infinity, nodesWithLexicalScope = [], depth = 0) {
        if (nodesWithLexicalScope.length >= maxSize) {
            return nodesWithLexicalScope;
        }
        const parentNode = node.parentNode;
        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }
        if (NodeGuards_1.NodeGuards.isNodeWithLexicalScope(node)) {
            nodesWithLexicalScope.push(node);
        }
        if (node !== parentNode) {
            return NodeLexicalScopeUtils.getLexicalScopesRecursive(parentNode, maxSize, nodesWithLexicalScope, ++depth);
        }
        return nodesWithLexicalScope;
    }
}
exports.NodeLexicalScopeUtils = NodeLexicalScopeUtils;


/***/ }),

/***/ "./src/node/NodeLiteralUtils.ts":
/*!**************************************!*\
  !*** ./src/node/NodeLiteralUtils.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const NodeGuards_1 = __webpack_require__(/*! ./NodeGuards */ "./src/node/NodeGuards.ts");
class NodeLiteralUtils {
    static isProhibitedLiteralNode(literalNode, parentNode) {
        if (NodeGuards_1.NodeGuards.isPropertyNode(parentNode) && !parentNode.computed && parentNode.key === literalNode) {
            return true;
        }
        if (NodeGuards_1.NodeGuards.isImportDeclarationNode(parentNode)) {
            return true;
        }
        return false;
    }
}
exports.NodeLiteralUtils = NodeLiteralUtils;


/***/ }),

/***/ "./src/node/NodeMetadata.ts":
/*!**********************************!*\
  !*** ./src/node/NodeMetadata.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class NodeMetadata {
    static set(node, metadata) {
        var _a;
        node.metadata = Object.assign((_a = node.metadata) !== null && _a !== void 0 ? _a : {}, metadata);
    }
    static get(node, metadataKey) {
        return node.metadata !== undefined
            ? node.metadata[metadataKey]
            : undefined;
    }
    static isIgnoredNode(node) {
        return NodeMetadata.get(node, 'ignoredNode') === true;
    }
    static isReplacedLiteral(literalNode) {
        return NodeMetadata.get(literalNode, 'replacedLiteral') === true;
    }
}
exports.NodeMetadata = NodeMetadata;


/***/ }),

/***/ "./src/node/NodeStatementUtils.ts":
/*!****************************************!*\
  !*** ./src/node/NodeStatementUtils.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const NodeGuards_1 = __webpack_require__(/*! ./NodeGuards */ "./src/node/NodeGuards.ts");
class NodeStatementUtils {
    static getParentNodeWithStatements(node) {
        return NodeStatementUtils.getParentNodesWithStatementsRecursive(node, 1)[0];
    }
    static getParentNodesWithStatements(node) {
        return NodeStatementUtils.getParentNodesWithStatementsRecursive(node);
    }
    static getNextSiblingStatement(statement) {
        return NodeStatementUtils.getSiblingStatementByOffset(statement, 1);
    }
    static getPreviousSiblingStatement(statement) {
        return NodeStatementUtils.getSiblingStatementByOffset(statement, -1);
    }
    static getRootStatementOfNode(node) {
        if (NodeGuards_1.NodeGuards.isProgramNode(node)) {
            throw new Error('Unable to find root statement for `Program` node');
        }
        const parentNode = node.parentNode;
        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }
        if (!NodeGuards_1.NodeGuards.isNodeWithStatements(parentNode)) {
            return NodeStatementUtils.getRootStatementOfNode(parentNode);
        }
        return node;
    }
    static getScopeOfNode(node) {
        const parentNode = node.parentNode;
        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }
        if (!NodeGuards_1.NodeGuards.isNodeWithStatements(parentNode)) {
            return NodeStatementUtils.getScopeOfNode(parentNode);
        }
        return parentNode;
    }
    static getParentNodesWithStatementsRecursive(node, maxSize = Infinity, nodesWithStatements = [], depth = 0) {
        if (nodesWithStatements.length >= maxSize) {
            return nodesWithStatements;
        }
        const parentNode = node.parentNode;
        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }
        if (NodeGuards_1.NodeGuards.isProgramNode(node) ||
            (NodeGuards_1.NodeGuards.isNodeWithLexicalScopeStatements(node, parentNode) && depth > 0)) {
            nodesWithStatements.push(node);
        }
        if (node !== parentNode) {
            return NodeStatementUtils.getParentNodesWithStatementsRecursive(parentNode, maxSize, nodesWithStatements, ++depth);
        }
        return nodesWithStatements;
    }
    static getSiblingStatementByOffset(statement, offset) {
        const scopeNode = NodeStatementUtils.getScopeOfNode(statement);
        const scopeBody = !NodeGuards_1.NodeGuards.isSwitchCaseNode(scopeNode)
            ? scopeNode.body
            : scopeNode.consequent;
        const indexInScope = scopeBody.indexOf(statement);
        return scopeBody[indexInScope + offset] || null;
    }
}
exports.NodeStatementUtils = NodeStatementUtils;


/***/ }),

/***/ "./src/node/NodeUtils.ts":
/*!*******************************!*\
  !*** ./src/node/NodeUtils.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const escodegen = __importStar(__webpack_require__(/*! escodegen */ "escodegen"));
const estraverse = __importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const EcmaVersion_1 = __webpack_require__(/*! ../constants/EcmaVersion */ "./src/constants/EcmaVersion.ts");
const ASTParserFacade_1 = __webpack_require__(/*! ../ASTParserFacade */ "./src/ASTParserFacade.ts");
const NodeGuards_1 = __webpack_require__(/*! ./NodeGuards */ "./src/node/NodeGuards.ts");
const NodeMetadata_1 = __webpack_require__(/*! ./NodeMetadata */ "./src/node/NodeMetadata.ts");
class NodeUtils {
    static addXVerbatimPropertyTo(literalNode) {
        literalNode['x-verbatim-property'] = {
            content: literalNode.raw,
            precedence: escodegen.Precedence.Primary
        };
        return literalNode;
    }
    static clone(astTree) {
        return NodeUtils.parentizeAst(NodeUtils.cloneRecursive(astTree));
    }
    static convertCodeToStructure(code) {
        const structure = ASTParserFacade_1.ASTParserFacade.parse({ sourceCode: code }, {
            ecmaVersion: EcmaVersion_1.ecmaVersion,
            sourceType: 'script'
        });
        estraverse.replace(structure, {
            enter: (node, parentNode) => {
                NodeUtils.parentizeNode(node, parentNode);
                if (NodeGuards_1.NodeGuards.isLiteralNode(node)) {
                    NodeUtils.addXVerbatimPropertyTo(node);
                }
                NodeMetadata_1.NodeMetadata.set(node, { ignoredNode: false });
                return node;
            }
        });
        return structure.body;
    }
    static convertStructureToCode(structure) {
        return structure.reduce((code, node) => {
            return code + escodegen.generate(node, {
                sourceMapWithCode: true
            }).code;
        }, '');
    }
    static getUnaryExpressionArgumentNode(unaryExpressionNode) {
        if (NodeGuards_1.NodeGuards.isUnaryExpressionNode(unaryExpressionNode.argument)) {
            return NodeUtils.getUnaryExpressionArgumentNode(unaryExpressionNode.argument);
        }
        return unaryExpressionNode.argument;
    }
    static parentizeAst(astTree) {
        estraverse.replace(astTree, {
            enter: NodeUtils.parentizeNode
        });
        return astTree;
    }
    static parentizeNode(node, parentNode) {
        node.parentNode = parentNode !== null && parentNode !== void 0 ? parentNode : node;
        return node;
    }
    static cloneRecursive(node) {
        if (node === null) {
            return node;
        }
        const copy = {};
        const nodeKeys = Object.keys(node);
        nodeKeys
            .forEach((property) => {
            if (property === 'parentNode') {
                return;
            }
            const value = node[property];
            let clonedValue;
            if (value === null || value instanceof RegExp) {
                clonedValue = value;
            }
            else if (Array.isArray(value)) {
                clonedValue = value.map(NodeUtils.cloneRecursive);
            }
            else if (typeof value === 'object') {
                clonedValue = NodeUtils.cloneRecursive(value);
            }
            else {
                clonedValue = value;
            }
            copy[property] = clonedValue;
        });
        return copy;
    }
}
exports.NodeUtils = NodeUtils;


/***/ }),

/***/ "./src/node/ScopeIdentifiersTraverser.ts":
/*!***********************************************!*\
  !*** ./src/node/ScopeIdentifiersTraverser.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ScopeIdentifiersTraverser_1, _a;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IScopeAnalyzer_1 = __webpack_require__(/*! ../interfaces/analyzers/scope-analyzer/IScopeAnalyzer */ "./src/interfaces/analyzers/scope-analyzer/IScopeAnalyzer.ts");
const NodeGuards_1 = __webpack_require__(/*! ./NodeGuards */ "./src/node/NodeGuards.ts");
let ScopeIdentifiersTraverser = ScopeIdentifiersTraverser_1 = class ScopeIdentifiersTraverser {
    constructor(scopeAnalyzer) {
        this.scopeAnalyzer = scopeAnalyzer;
    }
    traverse(programNode, parentNode, callback) {
        this.scopeAnalyzer.analyze(programNode);
        const globalScope = this.scopeAnalyzer.acquireScope(programNode);
        this.traverseScopeVariables(globalScope, globalScope, callback);
    }
    traverseScopeVariables(rootScope, currentScope, callback) {
        const variableScope = currentScope.variableScope;
        const variableLexicalScopeNode = NodeGuards_1.NodeGuards.isNodeWithBlockLexicalScope(variableScope.block)
            ? variableScope.block
            : null;
        const isGlobalDeclaration = ScopeIdentifiersTraverser_1.globalScopeNames.includes(variableScope.type);
        if (!variableLexicalScopeNode) {
            return;
        }
        for (const variable of currentScope.variables) {
            if (variable.name === ScopeIdentifiersTraverser_1.argumentsVariableName) {
                continue;
            }
            callback({
                isGlobalDeclaration,
                rootScope,
                variable,
                variableScope,
                variableLexicalScopeNode
            });
        }
        for (const childScope of currentScope.childScopes) {
            this.traverseScopeVariables(rootScope, childScope, callback);
        }
    }
};
ScopeIdentifiersTraverser.argumentsVariableName = 'arguments';
ScopeIdentifiersTraverser.globalScopeNames = [
    'global',
    'module'
];
ScopeIdentifiersTraverser = ScopeIdentifiersTraverser_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IScopeAnalyzer)),
    __metadata("design:paramtypes", [typeof (_a = typeof IScopeAnalyzer_1.IScopeAnalyzer !== "undefined" && IScopeAnalyzer_1.IScopeAnalyzer) === "function" ? _a : Object])
], ScopeIdentifiersTraverser);
exports.ScopeIdentifiersTraverser = ScopeIdentifiersTraverser;


/***/ }),

/***/ "./src/options/Options.ts":
/*!********************************!*\
  !*** ./src/options/Options.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Options_1, _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
const tsenum_1 = __webpack_require__(/*! @gradecam/tsenum */ "@gradecam/tsenum");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const TInputOptions_1 = __webpack_require__(/*! ../types/options/TInputOptions */ "./src/types/options/TInputOptions.ts");
const TStringArrayEncoding_1 = __webpack_require__(/*! ../types/options/TStringArrayEncoding */ "./src/types/options/TStringArrayEncoding.ts");
const IOptionsNormalizer_1 = __webpack_require__(/*! ../interfaces/options/IOptionsNormalizer */ "./src/interfaces/options/IOptionsNormalizer.ts");
const IdentifierNamesGenerator_1 = __webpack_require__(/*! ../enums/generators/identifier-names-generators/IdentifierNamesGenerator */ "./src/enums/generators/identifier-names-generators/IdentifierNamesGenerator.ts");
const ObfuscationTarget_1 = __webpack_require__(/*! ../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");
const SourceMapMode_1 = __webpack_require__(/*! ../enums/source-map/SourceMapMode */ "./src/enums/source-map/SourceMapMode.ts");
const StringArrayEncoding_1 = __webpack_require__(/*! ../enums/StringArrayEncoding */ "./src/enums/StringArrayEncoding.ts");
const Default_1 = __webpack_require__(/*! ./presets/Default */ "./src/options/presets/Default.ts");
const ValidationErrorsFormatter_1 = __webpack_require__(/*! ./ValidationErrorsFormatter */ "./src/options/ValidationErrorsFormatter.ts");
const IsAllowedForObfuscationTargets_1 = __webpack_require__(/*! ./validators/IsAllowedForObfuscationTargets */ "./src/options/validators/IsAllowedForObfuscationTargets.ts");
let Options = Options_1 = class Options {
    constructor(inputOptions, optionsNormalizer) {
        Object.assign(this, Default_1.DEFAULT_PRESET, inputOptions);
        const errors = class_validator_1.validateSync(this, Options_1.validatorOptions);
        if (errors.length) {
            throw new ReferenceError(`Validation failed. errors:\n${ValidationErrorsFormatter_1.ValidationErrorsFormatter.format(errors)}`);
        }
        Object.assign(this, optionsNormalizer.normalize(this));
    }
};
Options.validatorOptions = {
    validationError: {
        target: false
    }
};
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "compact", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "controlFlowFlattening", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(1),
    __metadata("design:type", Number)
], Options.prototype, "controlFlowFlatteningThreshold", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "deadCodeInjection", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], Options.prototype, "deadCodeInjectionThreshold", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "debugProtection", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "debugProtectionInterval", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "disableConsoleOutput", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ArrayUnique(),
    class_validator_1.IsString({
        each: true
    }),
    IsAllowedForObfuscationTargets_1.IsAllowedForObfuscationTargets([
        ObfuscationTarget_1.ObfuscationTarget.Browser,
        ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval,
    ]),
    __metadata("design:type", Array)
], Options.prototype, "domainLock", void 0);
__decorate([
    class_validator_1.IsIn([
        IdentifierNamesGenerator_1.IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
        IdentifierNamesGenerator_1.IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
        IdentifierNamesGenerator_1.IdentifierNamesGenerator.MangledIdentifierNamesGenerator
    ]),
    __metadata("design:type", typeof (_a = typeof tsenum_1.TypeFromEnum !== "undefined" && tsenum_1.TypeFromEnum) === "function" ? _a : Object)
], Options.prototype, "identifierNamesGenerator", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Options.prototype, "identifiersPrefix", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ArrayUnique(),
    class_validator_1.IsString({
        each: true
    }),
    class_validator_1.ValidateIf((options) => options.identifierNamesGenerator === IdentifierNamesGenerator_1.IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator),
    class_validator_1.ArrayNotEmpty(),
    __metadata("design:type", Array)
], Options.prototype, "identifiersDictionary", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Options.prototype, "inputFileName", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Options.prototype, "inputFilePath", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "log", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "renameGlobals", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ArrayUnique(),
    class_validator_1.IsString({
        each: true
    }),
    __metadata("design:type", Array)
], Options.prototype, "reservedNames", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ArrayUnique(),
    class_validator_1.IsString({
        each: true
    }),
    __metadata("design:type", Array)
], Options.prototype, "reservedStrings", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "rotateStringArray", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "selfDefending", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "shuffleStringArray", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "sourceMap", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.ValidateIf((options) => Boolean(options.sourceMapBaseUrl)),
    class_validator_1.IsUrl({
        require_protocol: true,
        require_tld: false,
        require_valid_protocol: true
    }),
    __metadata("design:type", String)
], Options.prototype, "sourceMapBaseUrl", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], Options.prototype, "sourceMapFileName", void 0);
__decorate([
    class_validator_1.IsIn([SourceMapMode_1.SourceMapMode.Inline, SourceMapMode_1.SourceMapMode.Separate]),
    __metadata("design:type", typeof (_b = typeof tsenum_1.TypeFromEnum !== "undefined" && tsenum_1.TypeFromEnum) === "function" ? _b : Object)
], Options.prototype, "sourceMapMode", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "splitStrings", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.ValidateIf((options) => Boolean(options.splitStrings)),
    class_validator_1.Min(1),
    __metadata("design:type", Number)
], Options.prototype, "splitStringsChunkLength", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "stringArray", void 0);
__decorate([
    class_validator_1.IsIn([true, false, StringArrayEncoding_1.StringArrayEncoding.Base64, StringArrayEncoding_1.StringArrayEncoding.Rc4]),
    __metadata("design:type", typeof (_c = typeof TStringArrayEncoding_1.TStringArrayEncoding !== "undefined" && TStringArrayEncoding_1.TStringArrayEncoding) === "function" ? _c : Object)
], Options.prototype, "stringArrayEncoding", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(1),
    __metadata("design:type", Number)
], Options.prototype, "stringArrayThreshold", void 0);
__decorate([
    class_validator_1.IsIn([ObfuscationTarget_1.ObfuscationTarget.Browser, ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval, ObfuscationTarget_1.ObfuscationTarget.Node]),
    __metadata("design:type", typeof (_d = typeof tsenum_1.TypeFromEnum !== "undefined" && tsenum_1.TypeFromEnum) === "function" ? _d : Object)
], Options.prototype, "target", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "transformObjectKeys", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], Options.prototype, "unicodeEscapeSequence", void 0);
Options = Options_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TInputOptions)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptionsNormalizer)),
    __metadata("design:paramtypes", [typeof (_e = typeof TInputOptions_1.TInputOptions !== "undefined" && TInputOptions_1.TInputOptions) === "function" ? _e : Object, typeof (_f = typeof IOptionsNormalizer_1.IOptionsNormalizer !== "undefined" && IOptionsNormalizer_1.IOptionsNormalizer) === "function" ? _f : Object])
], Options);
exports.Options = Options;


/***/ }),

/***/ "./src/options/OptionsNormalizer.ts":
/*!******************************************!*\
  !*** ./src/options/OptionsNormalizer.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var OptionsNormalizer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ControlFlowFlatteningThresholdRule_1 = __webpack_require__(/*! ./normalizer-rules/ControlFlowFlatteningThresholdRule */ "./src/options/normalizer-rules/ControlFlowFlatteningThresholdRule.ts");
const DeadCodeInjectionRule_1 = __webpack_require__(/*! ./normalizer-rules/DeadCodeInjectionRule */ "./src/options/normalizer-rules/DeadCodeInjectionRule.ts");
const DeadCodeInjectionThresholdRule_1 = __webpack_require__(/*! ./normalizer-rules/DeadCodeInjectionThresholdRule */ "./src/options/normalizer-rules/DeadCodeInjectionThresholdRule.ts");
const DomainLockRule_1 = __webpack_require__(/*! ./normalizer-rules/DomainLockRule */ "./src/options/normalizer-rules/DomainLockRule.ts");
const InputFileNameRule_1 = __webpack_require__(/*! ./normalizer-rules/InputFileNameRule */ "./src/options/normalizer-rules/InputFileNameRule.ts");
const SeedRule_1 = __webpack_require__(/*! ./normalizer-rules/SeedRule */ "./src/options/normalizer-rules/SeedRule.ts");
const SelfDefendingRule_1 = __webpack_require__(/*! ./normalizer-rules/SelfDefendingRule */ "./src/options/normalizer-rules/SelfDefendingRule.ts");
const SourceMapBaseUrlRule_1 = __webpack_require__(/*! ./normalizer-rules/SourceMapBaseUrlRule */ "./src/options/normalizer-rules/SourceMapBaseUrlRule.ts");
const SourceMapFileNameRule_1 = __webpack_require__(/*! ./normalizer-rules/SourceMapFileNameRule */ "./src/options/normalizer-rules/SourceMapFileNameRule.ts");
const SplitStringsChunkLengthRule_1 = __webpack_require__(/*! ./normalizer-rules/SplitStringsChunkLengthRule */ "./src/options/normalizer-rules/SplitStringsChunkLengthRule.ts");
const StringArrayRule_1 = __webpack_require__(/*! ./normalizer-rules/StringArrayRule */ "./src/options/normalizer-rules/StringArrayRule.ts");
const StringArrayEncodingRule_1 = __webpack_require__(/*! ./normalizer-rules/StringArrayEncodingRule */ "./src/options/normalizer-rules/StringArrayEncodingRule.ts");
const StringArrayThresholdRule_1 = __webpack_require__(/*! ./normalizer-rules/StringArrayThresholdRule */ "./src/options/normalizer-rules/StringArrayThresholdRule.ts");
let OptionsNormalizer = OptionsNormalizer_1 = class OptionsNormalizer {
    normalize(options) {
        let normalizedOptions = Object.assign({}, options);
        for (const normalizerRule of OptionsNormalizer_1.normalizerRules) {
            normalizedOptions = normalizerRule(normalizedOptions);
        }
        return normalizedOptions;
    }
};
OptionsNormalizer.normalizerRules = [
    ControlFlowFlatteningThresholdRule_1.ControlFlowFlatteningThresholdRule,
    DeadCodeInjectionRule_1.DeadCodeInjectionRule,
    DeadCodeInjectionThresholdRule_1.DeadCodeInjectionThresholdRule,
    DomainLockRule_1.DomainLockRule,
    InputFileNameRule_1.InputFileNameRule,
    SeedRule_1.SeedRule,
    SelfDefendingRule_1.SelfDefendingRule,
    SourceMapBaseUrlRule_1.SourceMapBaseUrlRule,
    SourceMapFileNameRule_1.SourceMapFileNameRule,
    SplitStringsChunkLengthRule_1.SplitStringsChunkLengthRule,
    StringArrayRule_1.StringArrayRule,
    StringArrayEncodingRule_1.StringArrayEncodingRule,
    StringArrayThresholdRule_1.StringArrayThresholdRule,
];
OptionsNormalizer = OptionsNormalizer_1 = __decorate([
    inversify_1.injectable()
], OptionsNormalizer);
exports.OptionsNormalizer = OptionsNormalizer;


/***/ }),

/***/ "./src/options/ValidationErrorsFormatter.ts":
/*!**************************************************!*\
  !*** ./src/options/ValidationErrorsFormatter.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ValidationErrorsFormatter {
    static format(errors) {
        return errors
            .reduce((errorMessages, error) => [
            ...errorMessages,
            ValidationErrorsFormatter.formatWithNestedConstraints(error)
        ], [])
            .join('\n');
    }
    static formatWithNestedConstraints(error) {
        const constraints = error.constraints;
        const rootError = `\`${error.property}\` errors:\n`;
        const nestedErrors = Object
            .keys(constraints)
            .map((constraint) => `    - ${constraints[constraint]}\n`)
            .join();
        return `${rootError}${nestedErrors}`;
    }
}
exports.ValidationErrorsFormatter = ValidationErrorsFormatter;


/***/ }),

/***/ "./src/options/normalizer-rules/ControlFlowFlatteningThresholdRule.ts":
/*!****************************************************************************!*\
  !*** ./src/options/normalizer-rules/ControlFlowFlatteningThresholdRule.ts ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlFlowFlatteningThresholdRule = (options) => {
    if (options.controlFlowFlatteningThreshold === 0) {
        options = Object.assign(Object.assign({}, options), { controlFlowFlattening: false, controlFlowFlatteningThreshold: 0 });
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

Object.defineProperty(exports, "__esModule", { value: true });
const Default_1 = __webpack_require__(/*! ../presets/Default */ "./src/options/presets/Default.ts");
exports.DeadCodeInjectionRule = (options) => {
    if (options.deadCodeInjection) {
        options = Object.assign(Object.assign({}, options), { deadCodeInjection: true, stringArray: true });
        if (!options.stringArrayThreshold) {
            options = Object.assign(Object.assign({}, options), { stringArray: true, stringArrayThreshold: Default_1.DEFAULT_PRESET.stringArrayThreshold });
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

Object.defineProperty(exports, "__esModule", { value: true });
exports.DeadCodeInjectionThresholdRule = (options) => {
    if (options.deadCodeInjectionThreshold === 0) {
        options = Object.assign(Object.assign({}, options), { deadCodeInjection: false, deadCodeInjectionThreshold: 0 });
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

Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __webpack_require__(/*! ../../utils/Utils */ "./src/utils/Utils.ts");
exports.DomainLockRule = (options) => {
    if (options.domainLock.length) {
        const normalizedDomains = [];
        for (const domain of options.domainLock) {
            normalizedDomains.push(Utils_1.Utils.extractDomainFrom(domain));
        }
        options = Object.assign(Object.assign({}, options), { domainLock: normalizedDomains });
    }
    return options;
};


/***/ }),

/***/ "./src/options/normalizer-rules/InputFileNameRule.ts":
/*!***********************************************************!*\
  !*** ./src/options/normalizer-rules/InputFileNameRule.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const StringSeparator_1 = __webpack_require__(/*! ../../enums/StringSeparator */ "./src/enums/StringSeparator.ts");
exports.InputFileNameRule = (options) => {
    let { inputFileName } = options;
    if (inputFileName) {
        inputFileName = inputFileName
            .replace(/^\/+/, '')
            .split(StringSeparator_1.StringSeparator.Dot)
            .slice(0, -1)
            .join(StringSeparator_1.StringSeparator.Dot) || inputFileName;
        options = Object.assign(Object.assign({}, options), { inputFileName: `${inputFileName}.js` });
    }
    return options;
};


/***/ }),

/***/ "./src/options/normalizer-rules/SeedRule.ts":
/*!**************************************************!*\
  !*** ./src/options/normalizer-rules/SeedRule.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedRule = (options) => {
    if (options.seed) {
        return Object.assign(Object.assign({}, options), { seed: options.seed });
    }
    const getRandomInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return Object.assign(Object.assign({}, options), { seed: getRandomInteger(0, 999999999) });
};


/***/ }),

/***/ "./src/options/normalizer-rules/SelfDefendingRule.ts":
/*!***********************************************************!*\
  !*** ./src/options/normalizer-rules/SelfDefendingRule.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfDefendingRule = (options) => {
    if (options.selfDefending) {
        options = Object.assign(Object.assign({}, options), { compact: true, selfDefending: true });
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

Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceMapBaseUrlRule = (options) => {
    const { sourceMapBaseUrl } = options;
    if (!options.sourceMapFileName) {
        options = Object.assign(Object.assign({}, options), { sourceMapBaseUrl: '' });
        return options;
    }
    if (sourceMapBaseUrl && !sourceMapBaseUrl.endsWith('/')) {
        options = Object.assign(Object.assign({}, options), { sourceMapBaseUrl: `${sourceMapBaseUrl}/` });
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

Object.defineProperty(exports, "__esModule", { value: true });
const StringSeparator_1 = __webpack_require__(/*! ../../enums/StringSeparator */ "./src/enums/StringSeparator.ts");
exports.SourceMapFileNameRule = (options) => {
    let { sourceMapFileName } = options;
    if (sourceMapFileName) {
        sourceMapFileName = sourceMapFileName
            .replace(/^\/+/, '')
            .replace(/(?:\.js)?(?:\.map)?$/, '');
        let sourceMapFileNameParts = sourceMapFileName.split(StringSeparator_1.StringSeparator.Dot);
        const sourceMapFileNamePartsCount = sourceMapFileNameParts.length;
        const lastPart = sourceMapFileNameParts[sourceMapFileNamePartsCount - 1];
        if (sourceMapFileNamePartsCount > 1 && lastPart.length <= 3) {
            sourceMapFileNameParts = sourceMapFileNameParts.slice(0, -1);
        }
        sourceMapFileName = sourceMapFileNameParts.join(StringSeparator_1.StringSeparator.Dot);
        options = Object.assign(Object.assign({}, options), { sourceMapFileName: `${sourceMapFileName}.js.map` });
    }
    return options;
};


/***/ }),

/***/ "./src/options/normalizer-rules/SplitStringsChunkLengthRule.ts":
/*!*********************************************************************!*\
  !*** ./src/options/normalizer-rules/SplitStringsChunkLengthRule.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitStringsChunkLengthRule = (options) => {
    if (options.splitStringsChunkLength === 0) {
        options = Object.assign(Object.assign({}, options), { splitStrings: false, splitStringsChunkLength: 0 });
    }
    else {
        options = Object.assign(Object.assign({}, options), { splitStringsChunkLength: Math.floor(options.splitStringsChunkLength) });
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

Object.defineProperty(exports, "__esModule", { value: true });
const StringArrayEncoding_1 = __webpack_require__(/*! ../../enums/StringArrayEncoding */ "./src/enums/StringArrayEncoding.ts");
exports.StringArrayEncodingRule = (options) => {
    if (options.stringArrayEncoding === true) {
        options = Object.assign(Object.assign({}, options), { stringArrayEncoding: StringArrayEncoding_1.StringArrayEncoding.Base64 });
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

Object.defineProperty(exports, "__esModule", { value: true });
exports.StringArrayRule = (options) => {
    if (!options.stringArray) {
        options = Object.assign(Object.assign({}, options), { rotateStringArray: false, shuffleStringArray: false, stringArray: false, stringArrayEncoding: false, stringArrayThreshold: 0 });
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

Object.defineProperty(exports, "__esModule", { value: true });
exports.StringArrayThresholdRule = (options) => {
    if (options.stringArrayThreshold === 0) {
        options = Object.assign(Object.assign({}, options), { rotateStringArray: false, stringArray: false, stringArrayEncoding: false, stringArrayThreshold: 0 });
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

Object.defineProperty(exports, "__esModule", { value: true });
const IdentifierNamesGenerator_1 = __webpack_require__(/*! ../../enums/generators/identifier-names-generators/IdentifierNamesGenerator */ "./src/enums/generators/identifier-names-generators/IdentifierNamesGenerator.ts");
const ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");
const SourceMapMode_1 = __webpack_require__(/*! ../../enums/source-map/SourceMapMode */ "./src/enums/source-map/SourceMapMode.ts");
exports.DEFAULT_PRESET = Object.freeze({
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
    identifiersDictionary: [],
    inputFileName: '',
    inputFilePath: '',
    log: false,
    renameGlobals: false,
    reservedNames: [],
    reservedStrings: [],
    rotateStringArray: true,
    seed: 0,
    selfDefending: false,
    shuffleStringArray: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode_1.SourceMapMode.Separate,
    splitStrings: false,
    splitStringsChunkLength: 10,
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

Object.defineProperty(exports, "__esModule", { value: true });
const IdentifierNamesGenerator_1 = __webpack_require__(/*! ../../enums/generators/identifier-names-generators/IdentifierNamesGenerator */ "./src/enums/generators/identifier-names-generators/IdentifierNamesGenerator.ts");
const ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");
const SourceMapMode_1 = __webpack_require__(/*! ../../enums/source-map/SourceMapMode */ "./src/enums/source-map/SourceMapMode.ts");
exports.NO_ADDITIONAL_NODES_PRESET = Object.freeze({
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
    identifiersDictionary: [],
    inputFileName: '',
    inputFilePath: '',
    log: false,
    renameGlobals: false,
    reservedNames: [],
    reservedStrings: [],
    rotateStringArray: false,
    seed: 0,
    selfDefending: false,
    shuffleStringArray: false,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode_1.SourceMapMode.Separate,
    splitStrings: false,
    splitStringsChunkLength: 0,
    stringArray: false,
    stringArrayEncoding: false,
    stringArrayThreshold: 0,
    target: ObfuscationTarget_1.ObfuscationTarget.Browser,
    transformObjectKeys: false,
    unicodeEscapeSequence: false
});


/***/ }),

/***/ "./src/options/validators/IsAllowedForObfuscationTargets.ts":
/*!******************************************************************!*\
  !*** ./src/options/validators/IsAllowedForObfuscationTargets.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const fast_deep_equal_1 = __importDefault(__webpack_require__(/*! fast-deep-equal */ "fast-deep-equal"));
const StringSeparator_1 = __webpack_require__(/*! ../../enums/StringSeparator */ "./src/enums/StringSeparator.ts");
const Default_1 = __webpack_require__(/*! ../presets/Default */ "./src/options/presets/Default.ts");
function IsAllowedForObfuscationTargets(obfuscationTargets, validationOptions) {
    return (optionsObject, propertyName) => {
        class_validator_1.registerDecorator({
            propertyName,
            constraints: [obfuscationTargets],
            name: 'IsAllowedForObfuscationTargets',
            options: validationOptions,
            target: optionsObject.constructor,
            validator: {
                validate(value, validationArguments) {
                    const options = validationArguments.object;
                    const defaultValue = Default_1.DEFAULT_PRESET[propertyName];
                    const isDefaultValue = fast_deep_equal_1.default(value, defaultValue);
                    return isDefaultValue || obfuscationTargets.includes(options.target);
                },
                defaultMessage(validationArguments) {
                    const requiredObfuscationTargetsString = obfuscationTargets.join(`${StringSeparator_1.StringSeparator.Comma} `);
                    return `This option allowed only for obfuscation targets: ${requiredObfuscationTargetsString}`;
                }
            }
        });
    };
}
exports.IsAllowedForObfuscationTargets = IsAllowedForObfuscationTargets;


/***/ }),

/***/ "./src/source-code/ObfuscatedCode.ts":
/*!*******************************************!*\
  !*** ./src/source-code/ObfuscatedCode.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const ICryptUtils_1 = __webpack_require__(/*! ../interfaces/utils/ICryptUtils */ "./src/interfaces/utils/ICryptUtils.ts");
const Initializable_1 = __webpack_require__(/*! ../decorators/Initializable */ "./src/decorators/Initializable.ts");
const SourceMapMode_1 = __webpack_require__(/*! ../enums/source-map/SourceMapMode */ "./src/enums/source-map/SourceMapMode.ts");
const IOptions_1 = __webpack_require__(/*! ../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
let ObfuscatedCode = class ObfuscatedCode {
    constructor(cryptUtils, options) {
        this.cryptUtils = cryptUtils;
        this.options = options;
    }
    initialize(obfuscatedCode, sourceMap) {
        this.obfuscatedCode = obfuscatedCode;
        this.sourceMap = sourceMap;
    }
    getObfuscatedCode() {
        return this.correctObfuscatedCode();
    }
    getSourceMap() {
        return this.sourceMap;
    }
    toString() {
        return this.obfuscatedCode;
    }
    correctObfuscatedCode() {
        if (!this.sourceMap) {
            return this.obfuscatedCode;
        }
        const sourceMapUrl = this.options.sourceMapBaseUrl + this.options.sourceMapFileName;
        let sourceMappingUrl = '//# sourceMappingURL=';
        switch (this.options.sourceMapMode) {
            case SourceMapMode_1.SourceMapMode.Inline:
                sourceMappingUrl += `data:application/json;base64,${this.cryptUtils.btoa(this.sourceMap)}`;
                break;
            case SourceMapMode_1.SourceMapMode.Separate:
            default:
                if (!sourceMapUrl) {
                    return this.obfuscatedCode;
                }
                sourceMappingUrl += sourceMapUrl;
        }
        return `${this.obfuscatedCode}\n${sourceMappingUrl}`;
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], ObfuscatedCode.prototype, "obfuscatedCode", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], ObfuscatedCode.prototype, "sourceMap", void 0);
ObfuscatedCode = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof ICryptUtils_1.ICryptUtils !== "undefined" && ICryptUtils_1.ICryptUtils) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], ObfuscatedCode);
exports.ObfuscatedCode = ObfuscatedCode;


/***/ }),

/***/ "./src/source-code/SourceCode.ts":
/*!***************************************!*\
  !*** ./src/source-code/SourceCode.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class SourceCode {
    constructor(sourceCode, sourceMap) {
        this.sourceCode = sourceCode;
        this.sourceMap = sourceMap;
    }
    getSourceCode() {
        return this.sourceCode;
    }
    getSourceMap() {
        return this.sourceMap;
    }
    toString() {
        return this.sourceCode;
    }
}
exports.SourceCode = SourceCode;


/***/ }),

/***/ "./src/storages/MapStorage.ts":
/*!************************************!*\
  !*** ./src/storages/MapStorage.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const Initializable_1 = __webpack_require__(/*! ../decorators/Initializable */ "./src/decorators/Initializable.ts");
let MapStorage = class MapStorage {
    constructor(randomGenerator, options) {
        this.randomGenerator = randomGenerator;
        this.options = options;
    }
    initialize() {
        this.storage = new Map();
        this.storageId = this.randomGenerator.getRandomString(6);
    }
    get(key) {
        return this.storage.get(key);
    }
    getOrThrow(key) {
        const value = this.get(key);
        if (!value) {
            throw new Error(`No value found in map storage with key \`${key}\``);
        }
        return value;
    }
    getKeyOf(value) {
        for (const [key, storageValue] of this.storage) {
            if (value === storageValue) {
                return key;
            }
        }
        return null;
    }
    getLength() {
        return this.storage.size;
    }
    getStorage() {
        return this.storage;
    }
    getStorageId() {
        return this.storageId;
    }
    has(key) {
        return this.storage.has(key);
    }
    mergeWith(storage, mergeId = false) {
        this.storage = new Map([...this.storage, ...storage.getStorage()]);
        if (mergeId) {
            this.storageId = storage.getStorageId();
        }
    }
    set(key, value) {
        this.storage.set(key, value);
    }
};
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", String)
], MapStorage.prototype, "storageId", void 0);
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_a = typeof Map !== "undefined" && Map) === "function" ? _a : Object)
], MapStorage.prototype, "storage", void 0);
__decorate([
    inversify_1.postConstruct(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MapStorage.prototype, "initialize", null);
MapStorage = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], MapStorage);
exports.MapStorage = MapStorage;


/***/ }),

/***/ "./src/storages/control-flow/ControlFlowStorage.ts":
/*!*********************************************************!*\
  !*** ./src/storages/control-flow/ControlFlowStorage.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const MapStorage_1 = __webpack_require__(/*! ../MapStorage */ "./src/storages/MapStorage.ts");
let ControlFlowStorage = class ControlFlowStorage extends MapStorage_1.MapStorage {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
    }
};
ControlFlowStorage = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object, typeof (_b = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _b : Object])
], ControlFlowStorage);
exports.ControlFlowStorage = ControlFlowStorage;


/***/ }),

/***/ "./src/storages/custom-node-group/CustomNodeGroupStorage.ts":
/*!******************************************************************!*\
  !*** ./src/storages/custom-node-group/CustomNodeGroupStorage.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CustomNodeGroupStorage_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TCustomNodeGroupFactory_1 = __webpack_require__(/*! ../../types/container/custom-nodes/TCustomNodeGroupFactory */ "./src/types/container/custom-nodes/TCustomNodeGroupFactory.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const CustomNodeGroup_1 = __webpack_require__(/*! ../../enums/custom-nodes/CustomNodeGroup */ "./src/enums/custom-nodes/CustomNodeGroup.ts");
const MapStorage_1 = __webpack_require__(/*! ../MapStorage */ "./src/storages/MapStorage.ts");
let CustomNodeGroupStorage = CustomNodeGroupStorage_1 = class CustomNodeGroupStorage extends MapStorage_1.MapStorage {
    constructor(customNodeGroupFactory, randomGenerator, options) {
        super(randomGenerator, options);
        this.customNodeGroupFactory = customNodeGroupFactory;
    }
    initialize() {
        super.initialize();
        CustomNodeGroupStorage_1.customNodeGroupsList.forEach((customNodeGroupName) => {
            const customNodeGroup = this.customNodeGroupFactory(customNodeGroupName);
            this.storage.set(customNodeGroupName, customNodeGroup);
        });
    }
};
CustomNodeGroupStorage.customNodeGroupsList = [
    CustomNodeGroup_1.CustomNodeGroup.ConsoleOutputCustomNodeGroup,
    CustomNodeGroup_1.CustomNodeGroup.DebugProtectionCustomNodeGroup,
    CustomNodeGroup_1.CustomNodeGroup.DomainLockCustomNodeGroup,
    CustomNodeGroup_1.CustomNodeGroup.SelfDefendingCustomNodeGroup,
    CustomNodeGroup_1.CustomNodeGroup.StringArrayCustomNodeGroup
];
__decorate([
    inversify_1.postConstruct(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomNodeGroupStorage.prototype, "initialize", null);
CustomNodeGroupStorage = CustomNodeGroupStorage_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNodeGroup)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_a = typeof TCustomNodeGroupFactory_1.TCustomNodeGroupFactory !== "undefined" && TCustomNodeGroupFactory_1.TCustomNodeGroupFactory) === "function" ? _a : Object, typeof (_b = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], CustomNodeGroupStorage);
exports.CustomNodeGroupStorage = CustomNodeGroupStorage;


/***/ }),

/***/ "./src/storages/string-array/StringArrayStorage.ts":
/*!*********************************************************!*\
  !*** ./src/storages/string-array/StringArrayStorage.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var StringArrayStorage_1, _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TIdentifierNamesGeneratorFactory_1 = __webpack_require__(/*! ../../types/container/generators/TIdentifierNamesGeneratorFactory */ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts");
const IArrayUtils_1 = __webpack_require__(/*! ../../interfaces/utils/IArrayUtils */ "./src/interfaces/utils/IArrayUtils.ts");
const ICryptUtils_1 = __webpack_require__(/*! ../../interfaces/utils/ICryptUtils */ "./src/interfaces/utils/ICryptUtils.ts");
const IEscapeSequenceEncoder_1 = __webpack_require__(/*! ../../interfaces/utils/IEscapeSequenceEncoder */ "./src/interfaces/utils/IEscapeSequenceEncoder.ts");
const IOptions_1 = __webpack_require__(/*! ../../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const StringArrayEncoding_1 = __webpack_require__(/*! ../../enums/StringArrayEncoding */ "./src/enums/StringArrayEncoding.ts");
const MapStorage_1 = __webpack_require__(/*! ../MapStorage */ "./src/storages/MapStorage.ts");
let StringArrayStorage = StringArrayStorage_1 = class StringArrayStorage extends MapStorage_1.MapStorage {
    constructor(identifierNamesGeneratorFactory, arrayUtils, randomGenerator, options, cryptUtils, escapeSequenceEncoder) {
        super(randomGenerator, options);
        this.rc4EncodedValuesSourcesCache = new Map();
        this.rotationAmount = 0;
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.arrayUtils = arrayUtils;
        this.cryptUtils = cryptUtils;
        this.escapeSequenceEncoder = escapeSequenceEncoder;
        this.rc4Keys = this.randomGenerator.getRandomGenerator()
            .n(() => this.randomGenerator.getRandomGenerator().string({
            length: StringArrayStorage_1.rc4KeyLength
        }), StringArrayStorage_1.rc4KeysCount);
    }
    initialize() {
        super.initialize();
        this.rotationAmount = this.options.rotateStringArray
            ? this.randomGenerator.getRandomInteger(StringArrayStorage_1.minimumRotationAmount, StringArrayStorage_1.maximumRotationAmount)
            : 0;
    }
    get(value) {
        return this.getOrSetIfDoesNotExist(value);
    }
    getRotationAmount() {
        return this.rotationAmount;
    }
    getStorageId() {
        if (!this.stringArrayStorageName) {
            this.stringArrayStorageName = this.identifierNamesGenerator
                .generateWithPrefix(StringArrayStorage_1.stringArrayNameLength);
        }
        return this.stringArrayStorageName;
    }
    getStorageName() {
        return this.getStorageId();
    }
    getStorageCallsWrapperName() {
        if (!this.stringArrayStorageCallsWrapperName) {
            this.stringArrayStorageCallsWrapperName = this.identifierNamesGenerator
                .generateWithPrefix(StringArrayStorage_1.stringArrayNameLength);
        }
        return this.stringArrayStorageCallsWrapperName;
    }
    rotateStorage() {
        if (!this.getLength()) {
            return;
        }
        this.storage = new Map(this.arrayUtils.rotate(Array.from(this.storage.entries()), this.rotationAmount));
    }
    shuffleStorage() {
        this.storage = new Map(this.arrayUtils
            .shuffle(Array.from(this.storage.entries()))
            .map(([value, stringArrayStorageItemData], index) => {
            stringArrayStorageItemData.index = index;
            return [value, stringArrayStorageItemData];
        })
            .sort(([, stringArrayStorageItemDataA], [, stringArrayStorageItemDataB]) => stringArrayStorageItemDataA.index - stringArrayStorageItemDataB.index));
    }
    toString() {
        return Array
            .from(this.storage.values())
            .map((stringArrayStorageItemData) => {
            return `'${this.escapeSequenceEncoder.encode(stringArrayStorageItemData.encodedValue, this.options.unicodeEscapeSequence)}'`;
        }).toString();
    }
    getOrSetIfDoesNotExist(value) {
        const { encodedValue, decodeKey } = this.getEncodedValue(value);
        const storedStringArrayStorageItemData = this.storage.get(encodedValue);
        if (storedStringArrayStorageItemData) {
            return storedStringArrayStorageItemData;
        }
        const stringArrayStorageItemData = {
            encodedValue,
            decodeKey,
            value,
            index: this.getLength()
        };
        this.storage.set(encodedValue, stringArrayStorageItemData);
        return stringArrayStorageItemData;
    }
    getEncodedValue(value) {
        var _a;
        switch (this.options.stringArrayEncoding) {
            case StringArrayEncoding_1.StringArrayEncoding.Rc4: {
                const decodeKey = this.randomGenerator.getRandomGenerator().pickone(this.rc4Keys);
                const encodedValue = this.cryptUtils.btoa(this.cryptUtils.rc4(value, decodeKey));
                const encodedValueSources = (_a = this.rc4EncodedValuesSourcesCache.get(encodedValue)) !== null && _a !== void 0 ? _a : [];
                let encodedValueSourcesLength = encodedValueSources.length;
                const shouldAddValueToSourcesCache = !encodedValueSourcesLength || !encodedValueSources.includes(value);
                if (shouldAddValueToSourcesCache) {
                    encodedValueSources.push(value);
                    encodedValueSourcesLength++;
                }
                this.rc4EncodedValuesSourcesCache.set(encodedValue, encodedValueSources);
                if (encodedValueSourcesLength > 1) {
                    return this.getEncodedValue(value);
                }
                return { encodedValue, decodeKey };
            }
            case StringArrayEncoding_1.StringArrayEncoding.Base64: {
                const decodeKey = null;
                const encodedValue = this.cryptUtils.btoa(value);
                return { encodedValue, decodeKey };
            }
            default: {
                const decodeKey = null;
                const encodedValue = value;
                return { encodedValue, decodeKey };
            }
        }
    }
};
StringArrayStorage.minimumRotationAmount = 100;
StringArrayStorage.maximumRotationAmount = 500;
StringArrayStorage.rc4KeyLength = 4;
StringArrayStorage.rc4KeysCount = 50;
StringArrayStorage.stringArrayNameLength = 7;
__decorate([
    inversify_1.postConstruct(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StringArrayStorage.prototype, "initialize", null);
StringArrayStorage = StringArrayStorage_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IArrayUtils)),
    __param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils)),
    __param(5, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)),
    __metadata("design:paramtypes", [typeof (_a = typeof TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory !== "undefined" && TIdentifierNamesGeneratorFactory_1.TIdentifierNamesGeneratorFactory) === "function" ? _a : Object, typeof (_b = typeof IArrayUtils_1.IArrayUtils !== "undefined" && IArrayUtils_1.IArrayUtils) === "function" ? _b : Object, typeof (_c = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _c : Object, typeof (_d = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _d : Object, typeof (_e = typeof ICryptUtils_1.ICryptUtils !== "undefined" && ICryptUtils_1.ICryptUtils) === "function" ? _e : Object, typeof (_f = typeof IEscapeSequenceEncoder_1.IEscapeSequenceEncoder !== "undefined" && IEscapeSequenceEncoder_1.IEscapeSequenceEncoder) === "function" ? _f : Object])
], StringArrayStorage);
exports.StringArrayStorage = StringArrayStorage;


/***/ }),

/***/ "./src/templates/AtobTemplate.ts":
/*!***************************************!*\
  !*** ./src/templates/AtobTemplate.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function AtobTemplate() {
    return `
        (function () {
            {globalVariableTemplate}
            
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

            that.atob || (
                that.atob = function(input) {
                    const str = String(input).replace(/=+$/, '');
                    let output = '';
                    for (
                        let bc = 0, bs, buffer, idx = 0;
                        buffer = str.charAt(idx++);
                        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
                    ) {
                        buffer = chars.indexOf(buffer);
                    }
                    return output;
                }
            );
        })();
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function GlobalVariableNoEvalTemplate() {
    return `
        const that = (typeof window !== 'undefined'
           ? window
           : (typeof process === 'object' &&
              typeof require === 'function' &&
              typeof global === 'object')
             ? global
             : this);
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function GlobalVariableTemplate1() {
    return `
        let that;
        
        try {
            const getGlobal = Function('return (function() ' + '{}.constructor("return this")( )' + ');');
            
            that = getGlobal();
        } catch (e) {
            that = window;
        }
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function GlobalVariableTemplate2() {
    return `
        const getGlobal = function () {
            let globalObject;
        
            try {
                globalObject = Function('return (function() ' + '{}.constructor("return this")( )' + ');')();
            } catch (e) {
                globalObject = window;
            }
            
            return globalObject;
        };
        const that = getGlobal();
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function Rc4Template() {
    return `
        const rc4 = function (str, key) {
            let s = [], j = 0, x, res = '', newStr = '';
           
            str = atob(str);
                
            for (let k = 0, length = str.length; k < length; k++) {
                newStr += '%' + ('00' + str.charCodeAt(k).toString(16)).slice(-2);
            }
        
            str = decodeURIComponent(newStr);
                    	     
            let i;
                    	        
	        for (i = 0; i < 256; i++) {
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
            
            for (let y = 0; y < str.length; y++) {
                i = (i + 1) % 256;
                j = (j + s[i]) % 256;
                x = s[i];
                s[i] = s[j];
                s[j] = x;
                res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
            }
                      
            return res;
        }
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function SingleNodeCallControllerTemplate() {
    return `
        const {singleNodeCallControllerFunctionName} = (function(){
            let firstCall = true;
            
            return function (context, fn){
                const rfn = firstCall ? function(){
                    if(fn){
                        const res = fn.apply(context, arguments);
                        fn = null;
                        return res;
                    }
                } : function(){}
                
                firstCall = false;
                
                return rfn;
            }
        })();
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function ConsoleOutputDisableExpressionTemplate() {
    return `
        const {consoleLogDisableFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {
            const func = function () {};
            
            {globalVariableTemplate}
                        
            if (!that.console) {
                that.console = (function (func){
                    const c = {};
                    
                    c.log = func;
                    c.warn = func;
                    c.debug = func;
                    c.info = func;
                    c.error = func;
                    c.exception = func;
                    c.table = func;
                    c.trace = func;
                    
                    return c;
                })(func);
            } else {
                that.console.log = func;
                that.console.warn = func;
                that.console.debug = func;
                that.console.info = func;
                that.console.error = func;
                that.console.exception = func;
                that.console.table = func;
                that.console.trace = func;
            }
        });
        
        {consoleLogDisableFunctionName}();
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function DebugProtectionFunctionCallTemplate() {
    return `
        (function () {
            {singleNodeCallControllerFunctionName}(
                this,
                function () {
                    const regExp1 = new RegExp('function *\\\\( *\\\\)');
                    const regExp2 = new RegExp('\\\\+\\\\+ *\\(?:[a-zA-Z_$][0-9a-zA-Z_$]*\\)', 'i');
           
                    const result = {debugProtectionFunctionName}('init');
                    
                    if (!regExp1.test(result + 'chain') || !regExp2.test(result + 'input')) {
                        result('0');
                    } else {
                        {debugProtectionFunctionName}();
                    }
                }
            )();
        })();
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function DebugProtectionFunctionIntervalTemplate() {
    return `
        setInterval(function () {
            {debugProtectionFunctionName}();
        }, 4000);
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function DebugProtectionFunctionTemplate() {
    return `
        function {debugProtectionFunctionName} (ret) {
            function debuggerProtection (counter) {
            
                {debuggerTemplate}
                
                debuggerProtection(++counter);
            }
            
            try {
                if (ret) {
                    return debuggerProtection;
                } else {
                    debuggerProtection(0);
                }
            } catch (y) {}
        }
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function DebuggerTemplate() {
    return `
        if (typeof counter === 'string') {
            return (function (arg) {}.constructor('while (true) {}').apply('counter'));
        } else {
            if (('' + counter / counter)['length'] !== 1 || counter % 20 === 0) {
                (function () {return true;}.constructor('debu' + 'gger').call('action'));
            } else {
                (function () {return false;}.constructor('debu' + 'gger').apply('stateObject'));
            }
            
        }
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function DebuggerTemplateNoEval() {
    return `
        if (typeof counter === 'string') {
            const func = function () {
                while (true) {}
            };
            
            return func();
        } else {
            if (('' + counter / counter)['length'] !== 1 || counter % 20 === 0) {
                debugger;
            } else {
                debugger;
            }
            
        }
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function DomainLockNodeTemplate() {
    return `
        const {domainLockFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {
            
            {globalVariableTemplate}
            
            const func = function () {
                return {
                    key: 'item',
                    value: 'attribute',
                    getAttribute: function () {
                        for (let i = 0; i < 1000; i--) {
                            const isPositive = i > 0;
                            
                            switch (isPositive) {
                                case true:
                                    return this.item + '_' + this.value + '_' + i;
                                default:
                                    this.item + '_' + this.value;
                            }
                        }
                    }()
                };
            };
                        
            const regExp = new RegExp("[{diff}]", "g");
            const domains = "{domains}".replace(regExp, "").split(";");
            let document;
            let domain;
            let location;
            let hostname;

            for (let d in that) {
                if (d.length == 8 && d.charCodeAt(7) == 116 && d.charCodeAt(5) == 101 && d.charCodeAt(3) == 117 && d.charCodeAt(0) == 100) {
                    document = d;
                
                    break;
                }
            }

            for (let d1 in that[document]) {
                if (d1.length == 6 && d1.charCodeAt(5) == 110 && d1.charCodeAt(0) == 100) {
                    domain = d1;
                    
                    break;
                }
            }

            if (!("~" > domain)) {
                for (let d2 in that[document]) {
                    if (d2.length == 8 && d2.charCodeAt(7) == 110 && d2.charCodeAt(0) == 108) {
                        location = d2;
                        
                        break;
                    }
                }

                for (let d3 in that[document][location]) {
                    if (d3.length == 8 && d3.charCodeAt(7) == 101 && d3.charCodeAt(0) == 104) {
                        hostname = d3;
                        
                        break;
                    }
                }
            }
            
            if (!document || !that[document]) {
                return;
            }
            
            const documentDomain = that[document][domain];
            const documentLocationHostName = !!that[document][location] && that[document][location][hostname];
            const currentDomain = documentDomain || documentLocationHostName;
          
            if (!currentDomain) {
                return;
            }
          
            let ok = false;
                        
            for (let i = 0; i < domains.length; i++) {
                const domain = domains[i];
                const position = currentDomain.length - domain.length;
                const lastIndex = currentDomain.indexOf(domain, position);
                const endsWith = lastIndex !== -1 && lastIndex === position;
                
                if (endsWith) {
                    if (currentDomain.length == domain.length || domain.indexOf(".") === 0) {
                        ok = true;
                    }
                }
            }
               
            if (!ok) {
                data;
            } else {
                return;
            }
            
            func();
        });

        {domainLockFunctionName}();
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function SelfDefendingTemplate(escapeSequenceEncoder) {
    return `
        const {selfDefendingFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {
            const func1 = function(){return 'dev';},
                func2 = function () {
                    return 'window';
                };
                
            const test1 = function () {
                const regExp = new RegExp('${escapeSequenceEncoder.encode('\\w+ *\\(\\) *{\\w+ *[\'|"].+[\'|"];? *}', true)}');
                
                return !regExp.test(func1.toString());
            };
            
            const test2 = function () {
                const regExp = new RegExp('${escapeSequenceEncoder.encode('(\\\\[x|u](\\w){2,4})+', true)}');
                
                return regExp.test(func2.toString());
            };
            
            const recursiveFunc1 = function (string) {
                const i = ~-1 >> 1 + 255 % 0;
                                
                if (string.indexOf('i' === i)) {
                    recursiveFunc2(string)
                }
            };
            
            const recursiveFunc2 = function (string) {
                const i = ~-4 >> 1 + 255 % 0;
                
                if (string.indexOf((true+"")[3]) !== i) {
                    recursiveFunc1(string)
                }
            };
            
            if (!test1()) {
                if (!test2()) {
                    recursiveFunc1('indеxOf');
                } else {
                    recursiveFunc1('indexOf');
                }
            } else {
                recursiveFunc1('indеxOf');
            }
        })
        
        {selfDefendingFunctionName}();
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function SelfDefendingTemplate(randomGenerator, escapeSequenceEncoder) {
    const identifierLength = 6;
    const rc4BytesIdentifier = randomGenerator.getRandomString(identifierLength);
    const statesIdentifier = randomGenerator.getRandomString(identifierLength);
    const newStateIdentifier = randomGenerator.getRandomString(identifierLength);
    const firstStateIdentifier = randomGenerator.getRandomString(identifierLength);
    const secondStateIdentifier = randomGenerator.getRandomString(identifierLength);
    const checkStateIdentifier = randomGenerator.getRandomString(identifierLength);
    const runStateIdentifier = randomGenerator.getRandomString(identifierLength);
    const getStateIdentifier = randomGenerator.getRandomString(identifierLength);
    const stateResultIdentifier = randomGenerator.getRandomString(identifierLength);
    return `
        const StatesClass = function (${rc4BytesIdentifier}) {
            this.${rc4BytesIdentifier} = ${rc4BytesIdentifier};
            this.${statesIdentifier} = [1, 0, 0];
            this.${newStateIdentifier} = function(){return 'newState';};
            this.${firstStateIdentifier} = '${escapeSequenceEncoder.encode('\\w+ *\\(\\) *{\\w+ *', true)}';
            this.${secondStateIdentifier} = '${escapeSequenceEncoder.encode('[\'|"].+[\'|"];? *}', true)}';
        };
        
        StatesClass.prototype.${checkStateIdentifier} = function () {
            const regExp = new RegExp(this.${firstStateIdentifier} + this.${secondStateIdentifier});
            const expression = regExp.test(this.${newStateIdentifier}.toString())
                ? --this.${statesIdentifier}[1]
                : --this.${statesIdentifier}[0];
            
            return this.${runStateIdentifier}(expression);
        };
        
        StatesClass.prototype.${runStateIdentifier} = function (${stateResultIdentifier}) {
            if (!Boolean(~${stateResultIdentifier})) {
                return ${stateResultIdentifier};
            }
            
            return this.${getStateIdentifier}(this.${rc4BytesIdentifier});
        };

        StatesClass.prototype.${getStateIdentifier} = function (${rc4BytesIdentifier}) {
            for (let i = 0, len = this.${statesIdentifier}.length; i < len; i++) {
                this.${statesIdentifier}.push(Math.round(Math.random()));
                len = this.${statesIdentifier}.length;
            }
            
            return ${rc4BytesIdentifier}(this.${statesIdentifier}[0]);
        };

        new StatesClass({stringArrayCallsWrapperName}).${checkStateIdentifier}();
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function StringArrayBase64DecodeNodeTemplate(randomGenerator) {
    const identifierLength = 6;
    const initializedIdentifier = randomGenerator.getRandomString(identifierLength);
    const base64DecodeFunctionIdentifier = randomGenerator.getRandomString(identifierLength);
    const dataIdentifier = randomGenerator.getRandomString(identifierLength);
    return `
        if ({stringArrayCallsWrapperName}.${initializedIdentifier} === undefined) {
            {atobPolyfill}
            
            {stringArrayCallsWrapperName}.${base64DecodeFunctionIdentifier} = function (str) {
                const string = atob(str);
                let newStringChars = [];
                
                for (let i = 0, length = string.length; i < length; i++) {
                    newStringChars += '%' + ('00' + string.charCodeAt(i).toString(16)).slice(-2);
                }
                
                return decodeURIComponent(newStringChars);
            };
            
            {stringArrayCallsWrapperName}.${dataIdentifier} = {};
            
            {stringArrayCallsWrapperName}.${initializedIdentifier} = true;
        }
                  
        const cachedValue = {stringArrayCallsWrapperName}.${dataIdentifier}[index];
                        
        if (cachedValue === undefined) {
            {selfDefendingCode}
            
            value = {stringArrayCallsWrapperName}.${base64DecodeFunctionIdentifier}(value);
            {stringArrayCallsWrapperName}.${dataIdentifier}[index] = value;
        } else {
            value = cachedValue;
        }
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function StringArrayCallsWrapperTemplate() {
    return `
        const {stringArrayCallsWrapperName} = function (index, key) {
            index = index - 0;
            
            let value = {stringArrayName}[index];
            
            {decodeNodeTemplate}
        
            return value;
        };
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function StringArrayRc4DecodeNodeTemplate(randomGenerator) {
    const identifierLength = 6;
    const initializedIdentifier = randomGenerator.getRandomString(identifierLength);
    const rc4Identifier = randomGenerator.getRandomString(identifierLength);
    const dataIdentifier = randomGenerator.getRandomString(identifierLength);
    const onceIdentifier = randomGenerator.getRandomString(identifierLength);
    return `
        if ({stringArrayCallsWrapperName}.${initializedIdentifier} === undefined) {
            {atobPolyfill}
            
            {rc4Polyfill}
            {stringArrayCallsWrapperName}.${rc4Identifier} = rc4;
            
            {stringArrayCallsWrapperName}.${dataIdentifier} = {};
            
            {stringArrayCallsWrapperName}.${initializedIdentifier} = true;
        }
  
        const cachedValue = {stringArrayCallsWrapperName}.${dataIdentifier}[index];

        if (cachedValue === undefined) {
            if ({stringArrayCallsWrapperName}.${onceIdentifier} === undefined) {
                {selfDefendingCode}
                
                {stringArrayCallsWrapperName}.${onceIdentifier} = true;
            }
            
            value = {stringArrayCallsWrapperName}.${rc4Identifier}(value, key);
            {stringArrayCallsWrapperName}.${dataIdentifier}[index] = value;
        } else {
            value = cachedValue;
        }
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function StringArrayTemplate() {
    return `
        const {stringArrayName} = [{stringArray}];
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function SelfDefendingTemplate(escapeSequenceEncoder) {
    return `
        const selfDefendingFunc = function () {
            const object = {
                data: {
                    key: 'cookie',
                    value: 'timeout'
                },
                setCookie: function (options, name, value, document) {
                    document = document || {};
                    
                    let updatedCookie = name + "=" + value;
                    let i = 0;
                                                            
                    for (let i = 0, len = options.length; i < len; i++) {
                        const propName = options[i];
                                     
                        updatedCookie += "; " + propName;
                        
                        const propValue = options[propName];
                        
                        options.push(propValue);
                        len = options.length;
                                                                        
                        if (propValue !== true) {
                            updatedCookie += "=" + propValue;
                        }
                    }

                    document['cookie'] = updatedCookie;
                },
                removeCookie: function(){return 'dev';},
                getCookie: function (document, name) {
                    document = document || function (value) { return value };
                    const matches = document(new RegExp(
                        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                    ));
                    
                    const func = function (param1, param2) {
                        param1(++param2);
                    };
                    
                    func({whileFunctionName}, {timesName});
                                        
                    return matches ? decodeURIComponent(matches[1]) : undefined;
                }
            };
            
            const test1 = function () {
                const regExp = new RegExp('${escapeSequenceEncoder.encode('\\w+ *\\(\\) *{\\w+ *[\'|"].+[\'|"];? *}', true)}');
                
                return regExp.test(object.removeCookie.toString());
            };
            
            object['updateCookie'] = test1;
            
            let cookie = '';
            const result = object['updateCookie']();
                                    
            if (!result) {
                object['setCookie'](['*'], 'counter', 1);
            } else if (result) {
                cookie = object['getCookie'](null, 'counter');
            } else {
                object['removeCookie']();
            }
        };
        
        selfDefendingFunc();
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
function StringArrayRotateFunctionTemplate() {
    return `
        (function (array, {timesName}) {
            const {whileFunctionName} = function (times) {
                while (--times) {
                    array['push'](array['shift']());
                }
            };
            
            {code}
        })({stringArrayName}, 0x{stringArrayRotationAmount});
    `;
}
exports.StringArrayRotateFunctionTemplate = StringArrayRotateFunctionTemplate;


/***/ }),

/***/ "./src/types/container/calls-graph-analyzer/TCalleeDataExtractorFactory.ts":
/*!*********************************************************************************!*\
  !*** ./src/types/container/calls-graph-analyzer/TCalleeDataExtractorFactory.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/container/custom-nodes/TControlFlowCustomNodeFactory.ts":
/*!***************************************************************************!*\
  !*** ./src/types/container/custom-nodes/TControlFlowCustomNodeFactory.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/container/custom-nodes/TCustomNodeFactory.ts":
/*!****************************************************************!*\
  !*** ./src/types/container/custom-nodes/TCustomNodeFactory.ts ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/container/custom-nodes/TCustomNodeGroupFactory.ts":
/*!*********************************************************************!*\
  !*** ./src/types/container/custom-nodes/TCustomNodeGroupFactory.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/container/custom-nodes/TDeadNodeInjectionCustomNodeFactory.ts":
/*!*********************************************************************************!*\
  !*** ./src/types/container/custom-nodes/TDeadNodeInjectionCustomNodeFactory.ts ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/container/custom-nodes/TObjectExpressionKeysTransformerCustomNodeFactory.ts":
/*!***********************************************************************************************!*\
  !*** ./src/types/container/custom-nodes/TObjectExpressionKeysTransformerCustomNodeFactory.ts ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts":
/*!****************************************************************************!*\
  !*** ./src/types/container/generators/TIdentifierNamesGeneratorFactory.ts ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/container/node-transformers/TControlFlowReplacerFactory.ts":
/*!******************************************************************************!*\
  !*** ./src/types/container/node-transformers/TControlFlowReplacerFactory.ts ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/container/node-transformers/TControlFlowStorageFactory.ts":
/*!*****************************************************************************!*\
  !*** ./src/types/container/node-transformers/TControlFlowStorageFactory.ts ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/container/node-transformers/TIdentifierObfuscatingReplacerFactory.ts":
/*!****************************************************************************************!*\
  !*** ./src/types/container/node-transformers/TIdentifierObfuscatingReplacerFactory.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/container/node-transformers/TLiteralObfuscatingReplacerFactory.ts":
/*!*************************************************************************************!*\
  !*** ./src/types/container/node-transformers/TLiteralObfuscatingReplacerFactory.ts ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/container/node-transformers/TNodeTransformerFactory.ts":
/*!**************************************************************************!*\
  !*** ./src/types/container/node-transformers/TNodeTransformerFactory.ts ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/container/node-transformers/TObfuscatingGuardFactory.ts":
/*!***************************************************************************!*\
  !*** ./src/types/container/node-transformers/TObfuscatingGuardFactory.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/container/node-transformers/TObjectExpressionExtractorFactory.ts":
/*!************************************************************************************!*\
  !*** ./src/types/container/node-transformers/TObjectExpressionExtractorFactory.ts ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/container/source-code/TObfuscatedCodeFactory.ts":
/*!*******************************************************************!*\
  !*** ./src/types/container/source-code/TObfuscatedCodeFactory.ts ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/options/TInputCLIOptions.ts":
/*!***********************************************!*\
  !*** ./src/types/options/TInputCLIOptions.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/options/TInputOptions.ts":
/*!********************************************!*\
  !*** ./src/types/options/TInputOptions.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/options/TStringArrayEncoding.ts":
/*!***************************************************!*\
  !*** ./src/types/options/TStringArrayEncoding.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/storages/TControlFlowStorage.ts":
/*!***************************************************!*\
  !*** ./src/types/storages/TControlFlowStorage.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/types/storages/TCustomNodeGroupStorage.ts":
/*!*******************************************************!*\
  !*** ./src/types/storages/TCustomNodeGroupStorage.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });


/***/ }),

/***/ "./src/utils/ArrayUtils.ts":
/*!*********************************!*\
  !*** ./src/utils/ArrayUtils.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
let ArrayUtils = class ArrayUtils {
    constructor(randomGenerator) {
        this.randomGenerator = randomGenerator;
    }
    createWithRange(length) {
        const range = [];
        for (let i = 0; i < length; i++) {
            range.push(i);
        }
        return range;
    }
    findMostOccurringElement(array) {
        var _a;
        const arrayLength = array.length;
        if (!arrayLength) {
            return null;
        }
        const elementsMap = {};
        let mostOccurringElement = array[0];
        let mostOccurringElementCount = 1;
        for (const element of array) {
            const currentElementCount = (_a = elementsMap[element]) !== null && _a !== void 0 ? _a : 0;
            const updatedElementCount = currentElementCount + 1;
            if (updatedElementCount > mostOccurringElementCount) {
                mostOccurringElement = element;
                mostOccurringElementCount = updatedElementCount;
            }
            elementsMap[element] = updatedElementCount;
        }
        return mostOccurringElement;
    }
    rotate(array, times) {
        if (!array.length) {
            throw new ReferenceError('Cannot rotate empty array.');
        }
        if (times <= 0) {
            return array;
        }
        const newArray = array;
        let temp;
        while (times--) {
            temp = newArray.pop();
            if (temp) {
                newArray.unshift(temp);
            }
        }
        return newArray;
    }
    shuffle(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length; i; i--) {
            const j = Math.floor(this.randomGenerator.getMathRandom() * i);
            [shuffledArray[i - 1], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i - 1]];
        }
        return shuffledArray;
    }
};
ArrayUtils = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object])
], ArrayUtils);
exports.ArrayUtils = ArrayUtils;


/***/ }),

/***/ "./src/utils/CryptUtils.ts":
/*!*********************************!*\
  !*** ./src/utils/CryptUtils.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const IRandomGenerator_1 = __webpack_require__(/*! ../interfaces/utils/IRandomGenerator */ "./src/interfaces/utils/IRandomGenerator.ts");
const RandomGenerator_1 = __webpack_require__(/*! ./RandomGenerator */ "./src/utils/RandomGenerator.ts");
const Utils_1 = __webpack_require__(/*! ./Utils */ "./src/utils/Utils.ts");
let CryptUtils = class CryptUtils {
    constructor(randomGenerator) {
        this.randomGenerator = randomGenerator;
    }
    btoa(string) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output = '';
        string = encodeURIComponent(string).replace(/%([0-9A-F]{2})/g, (match, p1) => {
            return String.fromCharCode(parseInt(`${Utils_1.Utils.hexadecimalPrefix}${p1}`, 16));
        });
        for (let block, charCode, idx = 0, map = chars; string.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
            charCode = string.charCodeAt(idx += 3 / 4);
            if (charCode > 0xFF) {
                throw new Error('\'btoa\' failed: The string to be encoded contains characters outside of the Latin1 range.');
            }
            block = block << 8 | charCode;
        }
        return output;
    }
    hideString(str, length) {
        const escapeRegExp = (s) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const randomMerge = (s1, s2) => {
            let i1 = -1;
            let i2 = -1;
            let result = '';
            while (i1 < s1.length || i2 < s2.length) {
                if (this.randomGenerator.getMathRandom() < 0.5 && i2 < s2.length) {
                    result += s2.charAt(++i2);
                }
                else {
                    result += s1.charAt(++i1);
                }
            }
            return result;
        };
        const randomString = this.randomGenerator.getRandomGenerator().string({
            length: length,
            pool: RandomGenerator_1.RandomGenerator.randomGeneratorPool
        });
        let randomStringDiff = randomString.replace(new RegExp(`[${escapeRegExp(str)}]`, 'g'), '');
        const randomStringDiffArray = randomStringDiff.split('');
        this.randomGenerator.getRandomGenerator().shuffle(randomStringDiffArray);
        randomStringDiff = randomStringDiffArray.join('');
        return [randomMerge(str, randomStringDiff), randomStringDiff];
    }
    rc4(string, key) {
        const s = [];
        let j = 0;
        let x;
        let result = '';
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
        for (let y = 0; y < string.length; y++) {
            i = (i + 1) % 256;
            j = (j + s[i]) % 256;
            x = s[i];
            s[i] = s[j];
            s[j] = x;
            result += String.fromCharCode(string.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
        }
        return result;
    }
};
CryptUtils = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    __metadata("design:paramtypes", [typeof (_a = typeof IRandomGenerator_1.IRandomGenerator !== "undefined" && IRandomGenerator_1.IRandomGenerator) === "function" ? _a : Object])
], CryptUtils);
exports.CryptUtils = CryptUtils;


/***/ }),

/***/ "./src/utils/EscapeSequenceEncoder.ts":
/*!********************************************!*\
  !*** ./src/utils/EscapeSequenceEncoder.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
let EscapeSequenceEncoder = class EscapeSequenceEncoder {
    constructor() {
        this.stringsCache = new Map();
    }
    encode(string, encodeAllSymbols) {
        const cacheKey = `${string}-${String(encodeAllSymbols)}`;
        if (this.stringsCache.has(cacheKey)) {
            return this.stringsCache.get(cacheKey);
        }
        const radix = 16;
        const replaceRegExp = new RegExp('[\\s\\S]', 'g');
        const escapeSequenceRegExp = new RegExp('[\'\"\\\\\\s]');
        const regExp = new RegExp('[\\x00-\\x7F]');
        let prefix;
        let template;
        const result = string.replace(replaceRegExp, (character) => {
            if (!encodeAllSymbols && !escapeSequenceRegExp.exec(character)) {
                return character;
            }
            if (regExp.exec(character)) {
                prefix = '\\x';
                template = '00';
            }
            else {
                prefix = '\\u';
                template = '0000';
            }
            return `${prefix}${(template + character.charCodeAt(0).toString(radix)).slice(-template.length)}`;
        });
        this.stringsCache.set(cacheKey, result);
        this.stringsCache.set(`${result}-${String(encodeAllSymbols)}`, result);
        return result;
    }
};
EscapeSequenceEncoder = __decorate([
    inversify_1.injectable()
], EscapeSequenceEncoder);
exports.EscapeSequenceEncoder = EscapeSequenceEncoder;


/***/ }),

/***/ "./src/utils/LevelledTopologicalSorter.ts":
/*!************************************************!*\
  !*** ./src/utils/LevelledTopologicalSorter.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
let LevelledTopologicalSorter = class LevelledTopologicalSorter {
    constructor() {
        this.graph = new Map();
    }
    add(precedent, consequent = null) {
        if (consequent !== null) {
            return this.link(precedent, consequent);
        }
        return this.register(precedent);
    }
    sort() {
        const consequents = Array.from(this.graph.keys());
        const results = [];
        const marks = {};
        for (const consequent of consequents) {
            if (marks[consequent] !== undefined) {
                continue;
            }
            this.visit(results, marks, consequent);
        }
        return results;
    }
    sortByGroups() {
        this.sort();
        const resultItemsGroups = [];
        while (this.hasNodes()) {
            const rootNodes = this.findRootNodes();
            resultItemsGroups.push(rootNodes);
            for (const rootNode of rootNodes) {
                this.delete(rootNode);
            }
        }
        return resultItemsGroups;
    }
    delete(consequent) {
        const precedents = this.getPrecedents(consequent);
        if (precedents.length) {
            throw new Error(`Unable to remove non-root node: ${consequent}`);
        }
        this.graph.delete(consequent);
        const precedentsGroups = Array.from(this.graph.values());
        for (const precedentsGroup of precedentsGroups) {
            const precedentsCount = precedentsGroup.length - 1;
            for (let index = precedentsCount; index >= 0; index = index - 1) {
                if (precedentsGroup[index] !== consequent) {
                    continue;
                }
                precedentsGroup.splice(index, 1);
            }
        }
    }
    findRootNodes() {
        const consequents = Array.from(this.graph.keys());
        const rootNodes = [];
        for (const consequent of consequents) {
            if (!this.hasPrecedents(consequent)) {
                rootNodes.push(consequent);
            }
        }
        return rootNodes;
    }
    getPrecedents(consequent) {
        const precedents = this.graph.get(consequent);
        if (!precedents) {
            throw new Error(`Unknown node: ${consequent}`);
        }
        return precedents;
    }
    hasNodes() {
        return this.graph.size > 0;
    }
    hasPrecedents(consequent) {
        return this.getPrecedents(consequent).length > 0;
    }
    link(precedent, consequent) {
        this.register(precedent);
        this.register(consequent);
        const target = this.graph.get(consequent);
        if (target && !target.includes(precedent)) {
            target.push(precedent);
        }
        return this;
    }
    register(name) {
        if (!this.graph.has(name)) {
            this.graph.set(name, []);
        }
        return this;
    }
    visit(results, marks, name) {
        const mark = marks[name];
        if (mark === 'visiting') {
            throw new Error(`Detected cycle involving node: ${name}`);
        }
        if (mark) {
            return;
        }
        marks[name] = 'visiting';
        const precedents = this.getPrecedents(name);
        for (const precedent of precedents) {
            this.visit(results, marks, precedent);
        }
        marks[name] = 'ok';
        results.push(name);
        return;
    }
};
LevelledTopologicalSorter = __decorate([
    inversify_1.injectable()
], LevelledTopologicalSorter);
exports.LevelledTopologicalSorter = LevelledTopologicalSorter;


/***/ }),

/***/ "./src/utils/NodeTransformerNamesGroupsBuilder.ts":
/*!********************************************************!*\
  !*** ./src/utils/NodeTransformerNamesGroupsBuilder.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const ILevelledTopologicalSorter_1 = __webpack_require__(/*! ../interfaces/utils/ILevelledTopologicalSorter */ "./src/interfaces/utils/ILevelledTopologicalSorter.ts");
let NodeTransformerNamesGroupsBuilder = class NodeTransformerNamesGroupsBuilder {
    constructor(levelledTopologicalSorter) {
        this.levelledTopologicalSorter = levelledTopologicalSorter;
    }
    build(normalizedNodeTransformers) {
        const nodeTransformerNames = Object.keys(normalizedNodeTransformers);
        const relationEdges = this.buildNodeTransformersRelationEdges(nodeTransformerNames, normalizedNodeTransformers);
        for (const [precedent, consequent] of relationEdges) {
            this.levelledTopologicalSorter.add(precedent, consequent);
        }
        return this.levelledTopologicalSorter.sortByGroups();
    }
    buildNodeTransformersRelationEdges(nodeTransformerNames, normalizedNodeTransformers) {
        const relationEdges = [];
        for (const nodeTransformerName of nodeTransformerNames) {
            const nodeTransformer = normalizedNodeTransformers[nodeTransformerName];
            const runAfterRelations = nodeTransformer.runAfter;
            if (!runAfterRelations || !runAfterRelations.length) {
                relationEdges.push([nodeTransformerName, null]);
                continue;
            }
            for (const runAfterRelation of runAfterRelations) {
                const isUnknownRelation = normalizedNodeTransformers[runAfterRelation] === undefined;
                if (isUnknownRelation) {
                    relationEdges.push([nodeTransformerName, null]);
                    continue;
                }
                relationEdges.push([runAfterRelation, nodeTransformerName]);
            }
        }
        return relationEdges;
    }
};
NodeTransformerNamesGroupsBuilder = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ILevelledTopologicalSorter)),
    __metadata("design:paramtypes", [typeof (_a = typeof ILevelledTopologicalSorter_1.ILevelledTopologicalSorter !== "undefined" && ILevelledTopologicalSorter_1.ILevelledTopologicalSorter) === "function" ? _a : Object])
], NodeTransformerNamesGroupsBuilder);
exports.NodeTransformerNamesGroupsBuilder = NodeTransformerNamesGroupsBuilder;


/***/ }),

/***/ "./src/utils/NumberUtils.ts":
/*!**********************************!*\
  !*** ./src/utils/NumberUtils.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class NumberUtils {
    static toHex(dec) {
        const radix = 16;
        return dec.toString(radix);
    }
    static isCeil(number) {
        return number % 1 === 0;
    }
}
exports.NumberUtils = NumberUtils;


/***/ }),

/***/ "./src/utils/RandomGenerator.ts":
/*!**************************************!*\
  !*** ./src/utils/RandomGenerator.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var RandomGenerator_1, _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const md5_1 = __importDefault(__webpack_require__(/*! md5 */ "md5"));
const chance_1 = __webpack_require__(/*! chance */ "chance");
const IOptions_1 = __webpack_require__(/*! ../interfaces/options/IOptions */ "./src/interfaces/options/IOptions.ts");
const ISourceCode_1 = __webpack_require__(/*! ../interfaces/source-code/ISourceCode */ "./src/interfaces/source-code/ISourceCode.ts");
const Initializable_1 = __webpack_require__(/*! ../decorators/Initializable */ "./src/decorators/Initializable.ts");
let RandomGenerator = RandomGenerator_1 = class RandomGenerator {
    constructor(sourceCode, options) {
        this.sourceCode = sourceCode;
        this.options = options;
    }
    initialize() {
        this.randomGenerator = new chance_1.Chance(this.getRawSeed());
    }
    getMathRandom() {
        return this.getRandomInteger(0, 99999) / 100000;
    }
    getRandomGenerator() {
        return this.randomGenerator;
    }
    getRandomInteger(min, max) {
        return this.getRandomGenerator().integer({
            min: min,
            max: max
        });
    }
    getRandomString(length, pool = RandomGenerator_1.randomGeneratorPool) {
        return this.getRandomGenerator().string({ length, pool });
    }
    getInputSeed() {
        return this.options.seed.toString();
    }
    getRawSeed() {
        const inputSeed = this.getInputSeed();
        const inputSeedParts = `${inputSeed}`.split('|');
        if (inputSeedParts.length > 1) {
            return inputSeed;
        }
        const sourceCodeMD5Hash = md5_1.default(this.sourceCode.getSourceCode());
        return `${inputSeed}|${sourceCodeMD5Hash}`;
    }
};
RandomGenerator.randomGeneratorPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
__decorate([
    Initializable_1.initializable(),
    __metadata("design:type", typeof (_a = typeof chance_1.Chance !== "undefined" && chance_1.Chance.Chance) === "function" ? _a : Object)
], RandomGenerator.prototype, "randomGenerator", void 0);
__decorate([
    inversify_1.postConstruct(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RandomGenerator.prototype, "initialize", null);
RandomGenerator = RandomGenerator_1 = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ISourceCode)),
    __param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    __metadata("design:paramtypes", [typeof (_b = typeof ISourceCode_1.ISourceCode !== "undefined" && ISourceCode_1.ISourceCode) === "function" ? _b : Object, typeof (_c = typeof IOptions_1.IOptions !== "undefined" && IOptions_1.IOptions) === "function" ? _c : Object])
], RandomGenerator);
exports.RandomGenerator = RandomGenerator;


/***/ }),

/***/ "./src/utils/Utils.ts":
/*!****************************!*\
  !*** ./src/utils/Utils.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static extractDomainFrom(url) {
        let domain;
        if (url.includes('://') || url.indexOf('//') === 0) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
        }
        domain = domain.split(':')[0];
        return domain;
    }
}
exports.Utils = Utils;
Utils.hexadecimalPrefix = '0x';


/***/ }),

/***/ "@gradecam/tsenum":
/*!***********************************!*\
  !*** external "@gradecam/tsenum" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@gradecam/tsenum");

/***/ }),

/***/ "acorn":
/*!************************!*\
  !*** external "acorn" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("acorn");

/***/ }),

/***/ "acorn-import-meta":
/*!************************************!*\
  !*** external "acorn-import-meta" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("acorn-import-meta");

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

/***/ "escodegen":
/*!****************************!*\
  !*** external "escodegen" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("escodegen");

/***/ }),

/***/ "eslint-scope":
/*!*******************************!*\
  !*** external "eslint-scope" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("eslint-scope");

/***/ }),

/***/ "estraverse":
/*!*****************************!*\
  !*** external "estraverse" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("estraverse");

/***/ }),

/***/ "eventemitter3":
/*!********************************!*\
  !*** external "eventemitter3" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("eventemitter3");

/***/ }),

/***/ "fast-deep-equal":
/*!**********************************!*\
  !*** external "fast-deep-equal" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fast-deep-equal");

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

/***/ })

/******/ });
//# sourceMappingURL=index.cli.js.map