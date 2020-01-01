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

Object.defineProperty(exports, "__esModule", { value: true });
const JavaScriptObfuscatorCLIFacade_1 = __webpack_require__(/*! ./src/JavaScriptObfuscatorCLIFacade */ "./src/JavaScriptObfuscatorCLIFacade.ts");
module.exports = JavaScriptObfuscatorCLIFacade_1.JavaScriptObfuscatorCLI;


/***/ }),

/***/ "./src/EspreeFacade.ts":
/*!*****************************!*\
  !*** ./src/EspreeFacade.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const espree = tslib_1.__importStar(__webpack_require__(/*! espree */ "espree"));
const chalk_1 = tslib_1.__importDefault(__webpack_require__(/*! chalk */ "chalk"));
class EspreeFacade {
    static parse(input, config) {
        const sourceTypeLength = EspreeFacade.sourceTypes.length;
        for (let i = 0; i < sourceTypeLength; i++) {
            try {
                return EspreeFacade.parseType(input, config, EspreeFacade.sourceTypes[i]);
            }
            catch (error) {
                if (i < sourceTypeLength - 1) {
                    continue;
                }
                throw new Error(EspreeFacade.processParsingError(input, error.message, {
                    line: error.lineNumber,
                    column: error.column,
                }));
            }
        }
        throw new Error(`Espree parsing error`);
    }
    static parseType(input, inputConfig, sourceType) {
        const config = Object.assign(Object.assign({}, inputConfig), { sourceType });
        return espree.parse(input, config);
    }
    static processParsingError(sourceCode, errorMessage, position) {
        if (!position || !position.line || !position.column) {
            throw new Error(errorMessage);
        }
        const sourceCodeLines = sourceCode.split(/\r?\n/);
        const errorLine = sourceCodeLines[position.line - 1];
        if (!errorLine) {
            throw new Error(errorMessage);
        }
        const startErrorIndex = Math.max(0, position.column - EspreeFacade.nearestSymbolsCount);
        const endErrorIndex = Math.min(errorLine.length, position.column + EspreeFacade.nearestSymbolsCount);
        const formattedPointer = EspreeFacade.colorError('>');
        const formattedCodeSlice = `...${errorLine.substring(startErrorIndex, endErrorIndex).replace(/^\s+/, '')}...`;
        throw new Error(`Line ${position.line}: ${errorMessage}\n${formattedPointer} ${formattedCodeSlice}`);
    }
}
exports.EspreeFacade = EspreeFacade;
EspreeFacade.colorError = chalk_1.default.red;
EspreeFacade.nearestSymbolsCount = 15;
EspreeFacade.sourceTypes = [
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

var JavaScriptObfuscator_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ./container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const escodegen = tslib_1.__importStar(__webpack_require__(/*! escodegen-wallaby */ "escodegen-wallaby"));
const LoggingMessage_1 = __webpack_require__(/*! ./enums/logger/LoggingMessage */ "./src/enums/logger/LoggingMessage.ts");
const NodeTransformer_1 = __webpack_require__(/*! ./enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");
const TransformationStage_1 = __webpack_require__(/*! ./enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const EspreeFacade_1 = __webpack_require__(/*! ./EspreeFacade */ "./src/EspreeFacade.ts");
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
        this.logger.info(LoggingMessage_1.LoggingMessage.Version, "0.20.0");
        this.logger.info(LoggingMessage_1.LoggingMessage.ObfuscationStarted);
        this.logger.info(LoggingMessage_1.LoggingMessage.RandomGeneratorSeed, this.randomGenerator.getSeed());
        const astTree = this.parseCode(sourceCode);
        const obfuscatedAstTree = this.transformAstTree(astTree);
        const generatorOutput = this.generateCode(sourceCode, obfuscatedAstTree);
        const obfuscationTime = (Date.now() - timeStart) / 1000;
        this.logger.success(LoggingMessage_1.LoggingMessage.ObfuscationCompleted, obfuscationTime);
        return this.getObfuscatedCode(generatorOutput);
    }
    parseCode(sourceCode) {
        return EspreeFacade_1.EspreeFacade.parse(sourceCode, JavaScriptObfuscator_1.espreeParseOptions);
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
JavaScriptObfuscator.espreeParseOptions = {
    comment: true,
    ecmaVersion: 10,
    loc: true,
    range: true
};
JavaScriptObfuscator.escodegenParams = {
    comment: true,
    verbatim: 'x-verbatim-property',
    sourceMapWithCode: true
};
JavaScriptObfuscator.transformersList = [
    NodeTransformer_1.NodeTransformer.BlockStatementControlFlowTransformer,
    NodeTransformer_1.NodeTransformer.ClassDeclarationTransformer,
    NodeTransformer_1.NodeTransformer.CommentsTransformer,
    NodeTransformer_1.NodeTransformer.CustomNodesTransformer,
    NodeTransformer_1.NodeTransformer.DeadCodeInjectionTransformer,
    NodeTransformer_1.NodeTransformer.EvalCallExpressionTransformer,
    NodeTransformer_1.NodeTransformer.FunctionControlFlowTransformer,
    NodeTransformer_1.NodeTransformer.CatchClauseTransformer,
    NodeTransformer_1.NodeTransformer.FunctionDeclarationTransformer,
    NodeTransformer_1.NodeTransformer.FunctionTransformer,
    NodeTransformer_1.NodeTransformer.ImportDeclarationTransformer,
    NodeTransformer_1.NodeTransformer.LabeledStatementTransformer,
    NodeTransformer_1.NodeTransformer.LiteralTransformer,
    NodeTransformer_1.NodeTransformer.MemberExpressionTransformer,
    NodeTransformer_1.NodeTransformer.MetadataTransformer,
    NodeTransformer_1.NodeTransformer.MethodDefinitionTransformer,
    NodeTransformer_1.NodeTransformer.ObfuscatingGuardsTransformer,
    NodeTransformer_1.NodeTransformer.ObjectExpressionKeysTransformer,
    NodeTransformer_1.NodeTransformer.ObjectExpressionTransformer,
    NodeTransformer_1.NodeTransformer.ParentificationTransformer,
    NodeTransformer_1.NodeTransformer.SplitStringTransformer,
    NodeTransformer_1.NodeTransformer.TemplateLiteralTransformer,
    NodeTransformer_1.NodeTransformer.VariableDeclarationTransformer,
    NodeTransformer_1.NodeTransformer.VariablePreserveTransformer
];
JavaScriptObfuscator = JavaScriptObfuscator_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ITransformersRunner)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatedCode)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ILogger)),
    tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Function, Object, Object])
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
JavaScriptObfuscatorFacade.version = "0.20.0" || false;


/***/ }),

/***/ "./src/analyzers/stack-trace-analyzer/StackTraceAnalyzer.ts":
/*!******************************************************************!*\
  !*** ./src/analyzers/stack-trace-analyzer/StackTraceAnalyzer.ts ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var StackTraceAnalyzer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const CalleeDataExtractor_1 = __webpack_require__(/*! ../../enums/analyzers/stack-trace-analyzer/CalleeDataExtractor */ "./src/enums/analyzers/stack-trace-analyzer/CalleeDataExtractor.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeStatementUtils_1 = __webpack_require__(/*! ../../node/NodeStatementUtils */ "./src/node/NodeStatementUtils.ts");
let StackTraceAnalyzer = StackTraceAnalyzer_1 = class StackTraceAnalyzer {
    constructor(calleeDataExtractorFactory) {
        this.calleeDataExtractorFactory = calleeDataExtractorFactory;
    }
    static getLimitIndex(blockScopeBodyLength) {
        const lastIndex = blockScopeBodyLength - 1;
        const limitThresholdActivationIndex = StackTraceAnalyzer_1.limitThresholdActivationLength - 1;
        let limitIndex = lastIndex;
        if (lastIndex > limitThresholdActivationIndex) {
            limitIndex = Math.round(limitThresholdActivationIndex + (lastIndex * StackTraceAnalyzer_1.limitThreshold));
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
        const limitIndex = StackTraceAnalyzer_1.getLimitIndex(blockScopeBody.length);
        const stackTraceData = [];
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
                    this.analyzeCallExpressionNode(stackTraceData, blockScopeBody, node);
                }
            });
        }
        return stackTraceData;
    }
    analyzeCallExpressionNode(stackTraceData, blockScopeBody, callExpressionNode) {
        StackTraceAnalyzer_1.calleeDataExtractorsList.forEach((calleeDataExtractorName) => {
            const calleeData = this.calleeDataExtractorFactory(calleeDataExtractorName)
                .extract(blockScopeBody, callExpressionNode.callee);
            if (!calleeData) {
                return;
            }
            stackTraceData.push(Object.assign(Object.assign({}, calleeData), { stackTrace: this.analyzeRecursive(calleeData.callee.body) }));
        });
    }
};
StackTraceAnalyzer.calleeDataExtractorsList = [
    CalleeDataExtractor_1.CalleeDataExtractor.FunctionDeclarationCalleeDataExtractor,
    CalleeDataExtractor_1.CalleeDataExtractor.FunctionExpressionCalleeDataExtractor,
    CalleeDataExtractor_1.CalleeDataExtractor.ObjectExpressionCalleeDataExtractor
];
StackTraceAnalyzer.limitThresholdActivationLength = 25;
StackTraceAnalyzer.limitThreshold = 0.002;
StackTraceAnalyzer = StackTraceAnalyzer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICalleeDataExtractor)),
    tslib_1.__metadata("design:paramtypes", [Function])
], StackTraceAnalyzer);
exports.StackTraceAnalyzer = StackTraceAnalyzer;


/***/ }),

/***/ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts":
/*!**************************************************************************************************!*\
  !*** ./src/analyzers/stack-trace-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
let AbstractCalleeDataExtractor = class AbstractCalleeDataExtractor {
};
AbstractCalleeDataExtractor = tslib_1.__decorate([
    inversify_1.injectable()
], AbstractCalleeDataExtractor);
exports.AbstractCalleeDataExtractor = AbstractCalleeDataExtractor;


/***/ }),

/***/ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/analyzers/stack-trace-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor.ts ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const AbstractCalleeDataExtractor_1 = __webpack_require__(/*! ./AbstractCalleeDataExtractor */ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts");
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
FunctionDeclarationCalleeDataExtractor = tslib_1.__decorate([
    inversify_1.injectable()
], FunctionDeclarationCalleeDataExtractor);
exports.FunctionDeclarationCalleeDataExtractor = FunctionDeclarationCalleeDataExtractor;


/***/ }),

/***/ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor.ts":
/*!************************************************************************************************************!*\
  !*** ./src/analyzers/stack-trace-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor.ts ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const AbstractCalleeDataExtractor_1 = __webpack_require__(/*! ./AbstractCalleeDataExtractor */ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeStatementUtils_1 = __webpack_require__(/*! ../../../node/NodeStatementUtils */ "./src/node/NodeStatementUtils.ts");
let FunctionExpressionCalleeDataExtractor = class FunctionExpressionCalleeDataExtractor extends AbstractCalleeDataExtractor_1.AbstractCalleeDataExtractor {
    extract(blockScopeBody, callee) {
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
            name: callee.name || null
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
FunctionExpressionCalleeDataExtractor = tslib_1.__decorate([
    inversify_1.injectable()
], FunctionExpressionCalleeDataExtractor);
exports.FunctionExpressionCalleeDataExtractor = FunctionExpressionCalleeDataExtractor;


/***/ }),

/***/ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/analyzers/stack-trace-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor.ts ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ObjectExpressionCalleeDataExtractor_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const AbstractCalleeDataExtractor_1 = __webpack_require__(/*! ./AbstractCalleeDataExtractor */ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/AbstractCalleeDataExtractor.ts");
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
ObjectExpressionCalleeDataExtractor = ObjectExpressionCalleeDataExtractor_1 = tslib_1.__decorate([
    inversify_1.injectable()
], ObjectExpressionCalleeDataExtractor);
exports.ObjectExpressionCalleeDataExtractor = ObjectExpressionCalleeDataExtractor;


/***/ }),

/***/ "./src/cli/JavaScriptObfuscatorCLI.ts":
/*!********************************************!*\
  !*** ./src/cli/JavaScriptObfuscatorCLI.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const commander = tslib_1.__importStar(__webpack_require__(/*! commander */ "commander"));
const path = tslib_1.__importStar(__webpack_require__(/*! path */ "path"));
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
const SourceCodeReader_1 = __webpack_require__(/*! ./utils/SourceCodeReader */ "./src/cli/utils/SourceCodeReader.ts");
class JavaScriptObfuscatorCLI {
    constructor(argv) {
        this.rawArguments = argv;
        this.arguments = argv.slice(2);
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
    static processSourceCodeWithoutSourceMap(sourceCode, outputCodePath, options) {
        const obfuscatedCode = JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(sourceCode, options).getObfuscatedCode();
        CLIUtils_1.CLIUtils.writeFile(outputCodePath, obfuscatedCode);
    }
    static processSourceCodeWithSourceMap(sourceCode, outputCodePath, options) {
        const outputSourceMapPath = CLIUtils_1.CLIUtils.getOutputSourceMapPath(outputCodePath, options.sourceMapFileName || '');
        options = Object.assign(Object.assign({}, options), { sourceMapFileName: path.basename(outputSourceMapPath) });
        const obfuscatedCode = JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(sourceCode, options);
        CLIUtils_1.CLIUtils.writeFile(outputCodePath, obfuscatedCode.getObfuscatedCode());
        if (options.sourceMapMode === 'separate' && obfuscatedCode.getSourceMap()) {
            CLIUtils_1.CLIUtils.writeFile(outputSourceMapPath, obfuscatedCode.getSourceMap());
        }
    }
    initialize() {
        this.inputPath = path.normalize(this.arguments[0] || '');
        this.commands = (new commander.Command());
        this.configureCommands();
        this.configureHelp();
        this.inputCLIOptions = this.commands.opts();
    }
    run() {
        const canShowHelp = !this.arguments.length || this.arguments.includes('--help');
        if (canShowHelp) {
            this.commands.outputHelp();
            return;
        }
        const sourceCodeData = new SourceCodeReader_1.SourceCodeReader(this.inputCLIOptions)
            .readSourceCode(this.inputPath);
        this.processSourceCodeData(sourceCodeData);
    }
    buildOptions() {
        const inputCLIOptions = JavaScriptObfuscatorCLI.filterOptions(this.inputCLIOptions);
        const configFilePath = this.inputCLIOptions.config;
        const configFileLocation = configFilePath ? path.resolve(configFilePath, '.') : '';
        const configFileOptions = configFileLocation ? CLIUtils_1.CLIUtils.getUserConfig(configFileLocation) : {};
        const inputFileName = path.basename(this.inputPath);
        return Object.assign(Object.assign(Object.assign(Object.assign({}, Default_1.DEFAULT_PRESET), configFileOptions), inputCLIOptions), { inputFileName });
    }
    configureCommands() {
        this.commands
            .usage('<inputPath> [options]')
            .version("0.20.0" || false, '-v, --version')
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
            .option('--rotate-string-array <boolean>', 'Disable rotation of unicode array values during obfuscation', BooleanSanitizer_1.BooleanSanitizer)
            .option('--seed <number>', 'Sets seed for random generator. This is useful for creating repeatable results.', parseFloat)
            .option('--self-defending <boolean>', 'Disables self-defending for obfuscated code', BooleanSanitizer_1.BooleanSanitizer)
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
        const outputPath = this.inputCLIOptions.output
            ? path.normalize(this.inputCLIOptions.output)
            : '';
        if (!Array.isArray(sourceCodeData)) {
            const outputCodePath = outputPath || CLIUtils_1.CLIUtils.getOutputCodePath(this.inputPath);
            this.processSourceCode(sourceCodeData, outputCodePath, null);
        }
        else {
            sourceCodeData.forEach(({ filePath, content }, index) => {
                const outputCodePath = outputPath
                    ? path.join(outputPath, filePath)
                    : CLIUtils_1.CLIUtils.getOutputCodePath(filePath);
                this.processSourceCode(content, outputCodePath, index);
            });
        }
    }
    processSourceCode(sourceCode, outputCodePath, sourceCodeIndex) {
        let options = this.buildOptions();
        if (sourceCodeIndex !== null) {
            const baseIdentifiersPrefix = this.inputCLIOptions.identifiersPrefix
                || JavaScriptObfuscatorCLI.baseIdentifiersPrefix;
            const identifiersPrefix = `${baseIdentifiersPrefix}${sourceCodeIndex}`;
            options = Object.assign(Object.assign({}, options), { identifiersPrefix });
        }
        if (options.sourceMap) {
            JavaScriptObfuscatorCLI.processSourceCodeWithSourceMap(sourceCode, outputCodePath, options);
        }
        else {
            JavaScriptObfuscatorCLI.processSourceCodeWithoutSourceMap(sourceCode, outputCodePath, options);
        }
    }
}
JavaScriptObfuscatorCLI.encoding = 'utf8';
JavaScriptObfuscatorCLI.obfuscatedFilePrefix = '-obfuscated';
JavaScriptObfuscatorCLI.baseIdentifiersPrefix = 'a';
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Object)
], JavaScriptObfuscatorCLI.prototype, "commands", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Object)
], JavaScriptObfuscatorCLI.prototype, "inputCLIOptions", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], JavaScriptObfuscatorCLI.prototype, "inputPath", void 0);
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
    if (/,$/.test(value)) {
        throw new SyntaxError(`Multiple <list> values should be wrapped inside quotes: --option-name 'value1','value2'`);
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
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const fs = tslib_1.__importStar(__webpack_require__(/*! fs */ "fs"));
const mkdirp = tslib_1.__importStar(__webpack_require__(/*! mkdirp */ "mkdirp"));
const path = tslib_1.__importStar(__webpack_require__(/*! path */ "path"));
const JavaScriptObfuscatorCLI_1 = __webpack_require__(/*! ../JavaScriptObfuscatorCLI */ "./src/cli/JavaScriptObfuscatorCLI.ts");
class CLIUtils {
    static getOutputCodePath(inputPath) {
        return path
            .normalize(inputPath)
            .split('.')
            .map((value, index) => {
            return index === 0 ? `${value}${JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.obfuscatedFilePrefix}` : value;
        })
            .join('.');
    }
    static getOutputSourceMapPath(outputCodePath, sourceMapFileName = '') {
        if (sourceMapFileName) {
            outputCodePath = `${outputCodePath.substring(0, outputCodePath.lastIndexOf('/'))}/${sourceMapFileName}`;
        }
        if (!/\.js\.map$/.test(outputCodePath)) {
            outputCodePath = `${outputCodePath.split('.')[0]}.js.map`;
        }
        else if (/\.js$/.test(outputCodePath)) {
            outputCodePath += '.map';
        }
        return outputCodePath;
    }
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
    static writeFile(outputPath, data) {
        mkdirp.sync(path.dirname(outputPath));
        fs.writeFileSync(outputPath, data, {
            encoding: JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.encoding
        });
    }
}
exports.CLIUtils = CLIUtils;


/***/ }),

/***/ "./src/cli/utils/SourceCodeReader.ts":
/*!*******************************************!*\
  !*** ./src/cli/utils/SourceCodeReader.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const fs = tslib_1.__importStar(__webpack_require__(/*! fs */ "fs"));
const path = tslib_1.__importStar(__webpack_require__(/*! path */ "path"));
const multimatch_1 = tslib_1.__importDefault(__webpack_require__(/*! multimatch */ "multimatch"));
const LoggingPrefix_1 = __webpack_require__(/*! ../../enums/logger/LoggingPrefix */ "./src/enums/logger/LoggingPrefix.ts");
const JavaScriptObfuscatorCLI_1 = __webpack_require__(/*! ../JavaScriptObfuscatorCLI */ "./src/cli/JavaScriptObfuscatorCLI.ts");
const Logger_1 = __webpack_require__(/*! ../../logger/Logger */ "./src/logger/Logger.ts");
class SourceCodeReader {
    constructor(options) {
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
    static logFilePath(filePath) {
        const normalizedFilePath = path.normalize(filePath);
        Logger_1.Logger.log(Logger_1.Logger.colorInfo, LoggingPrefix_1.LoggingPrefix.CLI, `Obfuscating file: ${normalizedFilePath}...`);
    }
    readSourceCode(inputPath) {
        if (SourceCodeReader.isFilePath(inputPath) && this.isValidFile(inputPath)) {
            return this.readFile(inputPath);
        }
        if (SourceCodeReader.isDirectoryPath(inputPath) && this.isValidDirectory(inputPath)) {
            return this.readDirectoryRecursive(inputPath);
        }
        const availableFilePaths = SourceCodeReader
            .availableInputExtensions
            .map((extension) => `\`${extension}\``)
            .join(', ');
        throw new ReferenceError(`Given input path must be a valid ${availableFilePaths} file or directory path`);
    }
    readDirectoryRecursive(directoryPath, fileData = []) {
        fs.readdirSync(directoryPath, JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.encoding)
            .forEach((fileName) => {
            const filePath = `${directoryPath}/${fileName}`;
            if (SourceCodeReader.isDirectoryPath(filePath) && this.isValidDirectory(filePath)) {
                fileData.push(...this.readDirectoryRecursive(filePath));
            }
            else if (SourceCodeReader.isFilePath(filePath) && this.isValidFile(filePath)) {
                const content = this.readFile(filePath);
                fileData.push({ filePath, content });
            }
        });
        return fileData;
    }
    readFile(filePath) {
        SourceCodeReader.logFilePath(filePath);
        return fs.readFileSync(filePath, JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.encoding);
    }
    isValidDirectory(directoryPath) {
        return !SourceCodeReader.isExcludedPath(directoryPath, this.options.exclude);
    }
    isValidFile(filePath) {
        return SourceCodeReader.availableInputExtensions.includes(path.extname(filePath))
            && !filePath.includes(JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI.obfuscatedFilePrefix)
            && !SourceCodeReader.isExcludedPath(filePath, this.options.exclude);
    }
}
exports.SourceCodeReader = SourceCodeReader;
SourceCodeReader.availableInputExtensions = [
    '.js'
];


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

Object.defineProperty(exports, "__esModule", { value: true });
const InversifyContainerFacade_1 = __webpack_require__(/*! ../../InversifyContainerFacade */ "./src/container/InversifyContainerFacade.ts");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const CalleeDataExtractor_1 = __webpack_require__(/*! ../../../enums/analyzers/stack-trace-analyzer/CalleeDataExtractor */ "./src/enums/analyzers/stack-trace-analyzer/CalleeDataExtractor.ts");
const FunctionDeclarationCalleeDataExtractor_1 = __webpack_require__(/*! ../../../analyzers/stack-trace-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor */ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor.ts");
const FunctionExpressionCalleeDataExtractor_1 = __webpack_require__(/*! ../../../analyzers/stack-trace-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor */ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor.ts");
const ObjectExpressionCalleeDataExtractor_1 = __webpack_require__(/*! ../../../analyzers/stack-trace-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor */ "./src/analyzers/stack-trace-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor.ts");
const StackTraceAnalyzer_1 = __webpack_require__(/*! ../../../analyzers/stack-trace-analyzer/StackTraceAnalyzer */ "./src/analyzers/stack-trace-analyzer/StackTraceAnalyzer.ts");
exports.analyzersModule = new inversify_1.ContainerModule((bind) => {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IStackTraceAnalyzer)
        .to(StackTraceAnalyzer_1.StackTraceAnalyzer)
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
const ConsoleOutputCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/console-output-nodes/group/ConsoleOutputCustomNodeGroup */ "./src/custom-nodes/console-output-nodes/group/ConsoleOutputCustomNodeGroup.ts");
const DebugProtectionCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/debug-protection-nodes/group/DebugProtectionCustomNodeGroup */ "./src/custom-nodes/debug-protection-nodes/group/DebugProtectionCustomNodeGroup.ts");
const DomainLockCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/domain-lock-nodes/group/DomainLockCustomNodeGroup */ "./src/custom-nodes/domain-lock-nodes/group/DomainLockCustomNodeGroup.ts");
const SelfDefendingCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/self-defending-nodes/group/SelfDefendingCustomNodeGroup */ "./src/custom-nodes/self-defending-nodes/group/SelfDefendingCustomNodeGroup.ts");
const StringArrayCustomNodeGroup_1 = __webpack_require__(/*! ../../../custom-nodes/string-array-nodes/group/StringArrayCustomNodeGroup */ "./src/custom-nodes/string-array-nodes/group/StringArrayCustomNodeGroup.ts");
const BinaryExpressionFunctionNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/BinaryExpressionFunctionNode */ "./src/custom-nodes/control-flow-flattening-nodes/BinaryExpressionFunctionNode.ts");
const BlockStatementControlFlowFlatteningNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/BlockStatementControlFlowFlatteningNode */ "./src/custom-nodes/control-flow-flattening-nodes/BlockStatementControlFlowFlatteningNode.ts");
const BlockStatementDeadCodeInjectionNode_1 = __webpack_require__(/*! ../../../custom-nodes/dead-code-injection-nodes/BlockStatementDeadCodeInjectionNode */ "./src/custom-nodes/dead-code-injection-nodes/BlockStatementDeadCodeInjectionNode.ts");
const CallExpressionControlFlowStorageCallNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode */ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode.ts");
const CallExpressionFunctionNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode */ "./src/custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode.ts");
const ControlFlowStorageNode_1 = __webpack_require__(/*! ../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode */ "./src/custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode.ts");
const ConsoleOutputDisableExpressionNode_1 = __webpack_require__(/*! ../../../custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode */ "./src/custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode.ts");
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
        .getConstructorFactory(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode, ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator, ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator, ServiceIdentifiers_1.ServiceIdentifiers.IOptions));
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IDeadCodeInjectionCustomNode)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getConstructorFactory(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode, ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator, ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator, ServiceIdentifiers_1.ServiceIdentifiers.IOptions));
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNodeGroup)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getFactory(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup));
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
const PropertiesExtractor_1 = __webpack_require__(/*! ../../../enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor */ "./src/enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor.ts");
const AssignmentExpressionPropertiesExtractor_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/properties-extractors/AssignmentExpressionPropertiesExtractor */ "./src/node-transformers/converting-transformers/properties-extractors/AssignmentExpressionPropertiesExtractor.ts");
const MemberExpressionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/MemberExpressionTransformer */ "./src/node-transformers/converting-transformers/MemberExpressionTransformer.ts");
const MethodDefinitionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/MethodDefinitionTransformer */ "./src/node-transformers/converting-transformers/MethodDefinitionTransformer.ts");
const ObjectExpressionKeysTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/ObjectExpressionKeysTransformer */ "./src/node-transformers/converting-transformers/ObjectExpressionKeysTransformer.ts");
const ObjectExpressionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/ObjectExpressionTransformer */ "./src/node-transformers/converting-transformers/ObjectExpressionTransformer.ts");
const SplitStringTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/SplitStringTransformer */ "./src/node-transformers/converting-transformers/SplitStringTransformer.ts");
const TemplateLiteralTransformer_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/TemplateLiteralTransformer */ "./src/node-transformers/converting-transformers/TemplateLiteralTransformer.ts");
const VariableDeclaratorPropertiesExtractor_1 = __webpack_require__(/*! ../../../node-transformers/converting-transformers/properties-extractors/VariableDeclaratorPropertiesExtractor */ "./src/node-transformers/converting-transformers/properties-extractors/VariableDeclaratorPropertiesExtractor.ts");
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
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IPropertiesExtractor)
        .to(AssignmentExpressionPropertiesExtractor_1.AssignmentExpressionPropertiesExtractor)
        .whenTargetNamed(PropertiesExtractor_1.PropertiesExtractor.AssignmentExpressionPropertiesExtractor);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IPropertiesExtractor)
        .to(VariableDeclaratorPropertiesExtractor_1.VariableDeclaratorPropertiesExtractor)
        .whenTargetNamed(PropertiesExtractor_1.PropertiesExtractor.VariableDeclaratorPropertiesExtractor);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IPropertiesExtractor)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.IPropertiesExtractor));
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
const CatchClauseTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/CatchClauseTransformer */ "./src/node-transformers/obfuscating-transformers/CatchClauseTransformer.ts");
const ClassDeclarationTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/ClassDeclarationTransformer */ "./src/node-transformers/obfuscating-transformers/ClassDeclarationTransformer.ts");
const FunctionDeclarationTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/FunctionDeclarationTransformer */ "./src/node-transformers/obfuscating-transformers/FunctionDeclarationTransformer.ts");
const FunctionTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/FunctionTransformer */ "./src/node-transformers/obfuscating-transformers/FunctionTransformer.ts");
const ImportDeclarationTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/ImportDeclarationTransformer */ "./src/node-transformers/obfuscating-transformers/ImportDeclarationTransformer.ts");
const LabeledStatementTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/LabeledStatementTransformer */ "./src/node-transformers/obfuscating-transformers/LabeledStatementTransformer.ts");
const LiteralTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/LiteralTransformer */ "./src/node-transformers/obfuscating-transformers/LiteralTransformer.ts");
const NumberLiteralObfuscatingReplacer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/NumberLiteralObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/NumberLiteralObfuscatingReplacer.ts");
const StringLiteralObfuscatingReplacer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/StringLiteralObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/StringLiteralObfuscatingReplacer.ts");
const VariableDeclarationTransformer_1 = __webpack_require__(/*! ../../../node-transformers/obfuscating-transformers/VariableDeclarationTransformer */ "./src/node-transformers/obfuscating-transformers/VariableDeclarationTransformer.ts");
exports.obfuscatingTransformersModule = new inversify_1.ContainerModule((bind) => {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(CatchClauseTransformer_1.CatchClauseTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.CatchClauseTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(ClassDeclarationTransformer_1.ClassDeclarationTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.ClassDeclarationTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(FunctionDeclarationTransformer_1.FunctionDeclarationTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.FunctionDeclarationTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(FunctionTransformer_1.FunctionTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.FunctionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(ImportDeclarationTransformer_1.ImportDeclarationTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.ImportDeclarationTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(LabeledStatementTransformer_1.LabeledStatementTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.LabeledStatementTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(LiteralTransformer_1.LiteralTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.LiteralTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(VariableDeclarationTransformer_1.VariableDeclarationTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.VariableDeclarationTransformer);
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
        .whenTargetNamed(ObfuscatingGuard_1.ObfuscatingGuard.BlackListNodeGuard);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeGuard)
        .to(ConditionalCommentObfuscatingGuard_1.ConditionalCommentObfuscatingGuard)
        .inSingletonScope()
        .whenTargetNamed(ObfuscatingGuard_1.ObfuscatingGuard.ConditionalCommentNodeGuard);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeGuard)
        .toFactory(InversifyContainerFacade_1.InversifyContainerFacade
        .getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.INodeGuard));
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer)
        .to(VariablePreserveTransformer_1.VariablePreserveTransformer)
        .whenTargetNamed(NodeTransformer_1.NodeTransformer.VariablePreserveTransformer);
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
    bind(ServiceIdentifiers_1.ServiceIdentifiers.TStringArrayStorage)
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

var AbstractCustomNode_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const GlobalVariableTemplate1_1 = __webpack_require__(/*! ../templates/GlobalVariableTemplate1 */ "./src/templates/GlobalVariableTemplate1.ts");
const GlobalVariableTemplate2_1 = __webpack_require__(/*! ../templates/GlobalVariableTemplate2 */ "./src/templates/GlobalVariableTemplate2.ts");
let AbstractCustomNode = AbstractCustomNode_1 = class AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        this.cachedNode = null;
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.randomGenerator = randomGenerator;
        this.options = options;
    }
    getNode() {
        if (!this.cachedNode) {
            this.cachedNode = this.getNodeStructure();
        }
        return this.cachedNode;
    }
    getGlobalVariableTemplate() {
        return this.randomGenerator
            .getRandomGenerator()
            .pickone(AbstractCustomNode_1.globalVariableTemplateFunctions);
    }
};
AbstractCustomNode.globalVariableTemplateFunctions = [
    GlobalVariableTemplate1_1.GlobalVariableTemplate1(),
    GlobalVariableTemplate2_1.GlobalVariableTemplate2()
];
AbstractCustomNode = AbstractCustomNode_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
    getRandomStackTraceIndex(stackTraceLength) {
        return this.randomGenerator.getRandomInteger(0, Math.max(0, Math.round(stackTraceLength - 1)));
    }
};
AbstractCustomNodeGroup = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
], AbstractCustomNodeGroup);
exports.AbstractCustomNodeGroup = AbstractCustomNodeGroup;


/***/ }),

/***/ "./src/custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode.ts":
/*!*************************************************************************************!*\
  !*** ./src/custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode.ts ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));
const ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");
const ConsoleOutputDisableExpressionTemplate_1 = __webpack_require__(/*! ../../templates/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate */ "./src/templates/console-output-nodes/console-output-disable-expression-node/ConsoleOutputDisableExpressionTemplate.ts");
const GlobalVariableNoEvalTemplate_1 = __webpack_require__(/*! ../../templates/GlobalVariableNoEvalTemplate */ "./src/templates/GlobalVariableNoEvalTemplate.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let ConsoleOutputDisableExpressionNode = class ConsoleOutputDisableExpressionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }
    initialize(callsControllerFunctionName) {
        this.callsControllerFunctionName = callsControllerFunctionName;
    }
    getNodeStructure() {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
    getTemplate() {
        const globalVariableTemplate = this.options.target !== ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval
            ? this.getGlobalVariableTemplate()
            : GlobalVariableNoEvalTemplate_1.GlobalVariableNoEvalTemplate();
        return string_template_1.default(ConsoleOutputDisableExpressionTemplate_1.ConsoleOutputDisableExpressionTemplate(), {
            consoleLogDisableFunctionName: this.identifierNamesGenerator.generate(),
            globalVariableTemplate,
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], ConsoleOutputDisableExpressionNode.prototype, "callsControllerFunctionName", void 0);
ConsoleOutputDisableExpressionNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
    appendCustomNodes(nodeWithStatements, stackTraceData) {
        const randomStackTraceIndex = this.getRandomStackTraceIndex(stackTraceData.length);
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.ConsoleOutputDisableExpressionNode, (customNode) => {
            NodeAppender_1.NodeAppender.appendToOptimalBlockScope(stackTraceData, nodeWithStatements, customNode.getNode(), randomStackTraceIndex);
        });
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, (customNode) => {
            const targetNodeWithStatements = stackTraceData.length
                ? NodeAppender_1.NodeAppender.getOptimalBlockScope(stackTraceData, randomStackTraceIndex, 1)
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
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Map)
], ConsoleOutputCustomNodeGroup.prototype, "customNodes", void 0);
ConsoleOutputCustomNodeGroup = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let BinaryExpressionFunctionNode = class BinaryExpressionFunctionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }
    initialize(operator) {
        this.operator = operator;
    }
    getNodeStructure() {
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
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], BinaryExpressionFunctionNode.prototype, "operator", void 0);
BinaryExpressionFunctionNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let BlockStatementControlFlowFlatteningNode = class BlockStatementControlFlowFlatteningNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }
    initialize(blockStatementBody, shuffledKeys, originalKeysIndexesInShuffledArray) {
        this.blockStatementBody = blockStatementBody;
        this.shuffledKeys = shuffledKeys;
        this.originalKeysIndexesInShuffledArray = originalKeysIndexesInShuffledArray;
    }
    getNodeStructure() {
        const controllerIdentifierName = this.randomGenerator.getRandomString(6);
        const indexIdentifierName = this.randomGenerator.getRandomString(6);
        const structure = NodeFactory_1.NodeFactory.blockStatementNode([
            NodeFactory_1.NodeFactory.variableDeclarationNode([
                NodeFactory_1.NodeFactory.variableDeclaratorNode(NodeFactory_1.NodeFactory.identifierNode(controllerIdentifierName), NodeFactory_1.NodeFactory.callExpressionNode(NodeFactory_1.NodeFactory.memberExpressionNode(NodeFactory_1.NodeFactory.literalNode(this.originalKeysIndexesInShuffledArray.join('|')), NodeFactory_1.NodeFactory.identifierNode('split')), [
                    NodeFactory_1.NodeFactory.literalNode('|')
                ])),
                NodeFactory_1.NodeFactory.variableDeclaratorNode(NodeFactory_1.NodeFactory.identifierNode(indexIdentifierName), NodeFactory_1.NodeFactory.literalNode(0))
            ]),
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
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Array)
], BlockStatementControlFlowFlatteningNode.prototype, "blockStatementBody", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Array)
], BlockStatementControlFlowFlatteningNode.prototype, "originalKeysIndexesInShuffledArray", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Array)
], BlockStatementControlFlowFlatteningNode.prototype, "shuffledKeys", void 0);
BlockStatementControlFlowFlatteningNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let CallExpressionFunctionNode = class CallExpressionFunctionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }
    initialize(expressionArguments) {
        this.expressionArguments = expressionArguments;
    }
    getNodeStructure() {
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
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Array)
], CallExpressionFunctionNode.prototype, "expressionArguments", void 0);
CallExpressionFunctionNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let LogicalExpressionFunctionNode = class LogicalExpressionFunctionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }
    initialize(operator) {
        this.operator = operator;
    }
    getNodeStructure() {
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
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], LogicalExpressionFunctionNode.prototype, "operator", void 0);
LogicalExpressionFunctionNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
let StringLiteralNode = class StringLiteralNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }
    initialize(literalValue) {
        this.literalValue = literalValue;
    }
    getNodeStructure() {
        const structure = NodeFactory_1.NodeFactory.expressionStatementNode(NodeFactory_1.NodeFactory.literalNode(this.literalValue));
        return [structure];
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], StringLiteralNode.prototype, "literalValue", void 0);
StringLiteralNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let CallExpressionControlFlowStorageCallNode = class CallExpressionControlFlowStorageCallNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
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
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Object)
], CallExpressionControlFlowStorageCallNode.prototype, "callee", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], CallExpressionControlFlowStorageCallNode.prototype, "controlFlowStorageKey", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], CallExpressionControlFlowStorageCallNode.prototype, "controlFlowStorageName", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Array)
], CallExpressionControlFlowStorageCallNode.prototype, "expressionArguments", void 0);
CallExpressionControlFlowStorageCallNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let ControlFlowStorageNode = class ControlFlowStorageNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }
    initialize(controlFlowStorage) {
        this.controlFlowStorage = controlFlowStorage;
    }
    getNodeStructure() {
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
        ]);
        structure = NodeUtils_1.NodeUtils.parentizeAst(structure);
        return [structure];
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Object)
], ControlFlowStorageNode.prototype, "controlFlowStorage", void 0);
ControlFlowStorageNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let ExpressionWithOperatorControlFlowStorageCallNode = class ExpressionWithOperatorControlFlowStorageCallNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
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
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], ExpressionWithOperatorControlFlowStorageCallNode.prototype, "controlFlowStorageKey", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], ExpressionWithOperatorControlFlowStorageCallNode.prototype, "controlFlowStorageName", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Object)
], ExpressionWithOperatorControlFlowStorageCallNode.prototype, "leftValue", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Object)
], ExpressionWithOperatorControlFlowStorageCallNode.prototype, "rightValue", void 0);
ExpressionWithOperatorControlFlowStorageCallNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const Initializable_1 = __webpack_require__(/*! ../../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let StringLiteralControlFlowStorageCallNode = class StringLiteralControlFlowStorageCallNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
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
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], StringLiteralControlFlowStorageCallNode.prototype, "controlFlowStorageKey", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], StringLiteralControlFlowStorageCallNode.prototype, "controlFlowStorageName", void 0);
StringLiteralControlFlowStorageCallNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let BlockStatementDeadCodeInjectionNode = class BlockStatementDeadCodeInjectionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }
    initialize(blockStatementNode, deadCodeInjectionRootAstHostNode) {
        this.blockStatementNode = blockStatementNode;
        this.deadCodeInjectionRootAstHostNode = deadCodeInjectionRootAstHostNode;
    }
    getNodeStructure() {
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
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Object)
], BlockStatementDeadCodeInjectionNode.prototype, "blockStatementNode", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Object)
], BlockStatementDeadCodeInjectionNode.prototype, "deadCodeInjectionRootAstHostNode", void 0);
BlockStatementDeadCodeInjectionNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const DebugProtectionFunctionCallTemplate_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-call-node/DebugProtectionFunctionCallTemplate */ "./src/templates/debug-protection-nodes/debug-protection-function-call-node/DebugProtectionFunctionCallTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let DebugProtectionFunctionCallNode = class DebugProtectionFunctionCallNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }
    initialize(debugProtectionFunctionName, callsControllerFunctionName) {
        this.debugProtectionFunctionName = debugProtectionFunctionName;
        this.callsControllerFunctionName = callsControllerFunctionName;
    }
    getNodeStructure() {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
    getTemplate() {
        return string_template_1.default(DebugProtectionFunctionCallTemplate_1.DebugProtectionFunctionCallTemplate(), {
            debugProtectionFunctionName: this.debugProtectionFunctionName,
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], DebugProtectionFunctionCallNode.prototype, "callsControllerFunctionName", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], DebugProtectionFunctionCallNode.prototype, "debugProtectionFunctionName", void 0);
DebugProtectionFunctionCallNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const DebugProtectionFunctionIntervalTemplate_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-interval-node/DebugProtectionFunctionIntervalTemplate */ "./src/templates/debug-protection-nodes/debug-protection-function-interval-node/DebugProtectionFunctionIntervalTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let DebugProtectionFunctionIntervalNode = class DebugProtectionFunctionIntervalNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }
    initialize(debugProtectionFunctionName) {
        this.debugProtectionFunctionName = debugProtectionFunctionName;
    }
    getNodeStructure() {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
    getTemplate() {
        return string_template_1.default(DebugProtectionFunctionIntervalTemplate_1.DebugProtectionFunctionIntervalTemplate(), {
            debugProtectionFunctionName: this.debugProtectionFunctionName
        });
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], DebugProtectionFunctionIntervalNode.prototype, "debugProtectionFunctionName", void 0);
DebugProtectionFunctionIntervalNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));
const ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const DebuggerTemplate_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplate */ "./src/templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplate.ts");
const DebuggerTemplateNoEval_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplateNoEval */ "./src/templates/debug-protection-nodes/debug-protection-function-node/DebuggerTemplateNoEval.ts");
const DebugProtectionFunctionTemplate_1 = __webpack_require__(/*! ../../templates/debug-protection-nodes/debug-protection-function-node/DebugProtectionFunctionTemplate */ "./src/templates/debug-protection-nodes/debug-protection-function-node/DebugProtectionFunctionTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let DebugProtectionFunctionNode = class DebugProtectionFunctionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }
    initialize(debugProtectionFunctionName) {
        this.debugProtectionFunctionName = debugProtectionFunctionName;
    }
    getNodeStructure() {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
    getTemplate() {
        const debuggerTemplate = this.options.target !== ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval
            ? DebuggerTemplate_1.DebuggerTemplate()
            : DebuggerTemplateNoEval_1.DebuggerTemplateNoEval();
        return string_template_1.default(DebugProtectionFunctionTemplate_1.DebugProtectionFunctionTemplate(), {
            debuggerTemplate,
            debugProtectionFunctionName: this.debugProtectionFunctionName
        });
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], DebugProtectionFunctionNode.prototype, "debugProtectionFunctionName", void 0);
DebugProtectionFunctionNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
    appendCustomNodes(nodeWithStatements, stackTraceData) {
        const randomStackTraceIndex = this.getRandomStackTraceIndex(stackTraceData.length);
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.DebugProtectionFunctionCallNode, (customNode) => {
            NodeAppender_1.NodeAppender.appendToOptimalBlockScope(stackTraceData, nodeWithStatements, customNode.getNode(), randomStackTraceIndex);
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
            const targetNodeWithStatements = stackTraceData.length
                ? NodeAppender_1.NodeAppender.getOptimalBlockScope(stackTraceData, randomStackTraceIndex, 1)
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
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Map)
], DebugProtectionCustomNodeGroup.prototype, "customNodes", void 0);
DebugProtectionCustomNodeGroup = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));
const ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const DomainLockNodeTemplate_1 = __webpack_require__(/*! ../../templates/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate */ "./src/templates/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate.ts");
const GlobalVariableNoEvalTemplate_1 = __webpack_require__(/*! ../../templates/GlobalVariableNoEvalTemplate */ "./src/templates/GlobalVariableNoEvalTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let DomainLockNode = class DomainLockNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, cryptUtils, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
        this.cryptUtils = cryptUtils;
    }
    initialize(callsControllerFunctionName) {
        this.callsControllerFunctionName = callsControllerFunctionName;
    }
    getNodeStructure() {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
    getTemplate() {
        const domainsString = this.options.domainLock.join(';');
        const [hiddenDomainsString, diff] = this.cryptUtils.hideString(domainsString, domainsString.length * 3);
        const globalVariableTemplate = this.options.target !== ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval
            ? this.getGlobalVariableTemplate()
            : GlobalVariableNoEvalTemplate_1.GlobalVariableNoEvalTemplate();
        return string_template_1.default(DomainLockNodeTemplate_1.DomainLockNodeTemplate(), {
            domainLockFunctionName: this.identifierNamesGenerator.generate(),
            diff: diff,
            domains: hiddenDomainsString,
            globalVariableTemplate,
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], DomainLockNode.prototype, "callsControllerFunctionName", void 0);
DomainLockNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
    appendCustomNodes(nodeWithStatements, stackTraceData) {
        const randomStackTraceIndex = this.getRandomStackTraceIndex(stackTraceData.length);
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.DomainLockNode, (customNode) => {
            NodeAppender_1.NodeAppender.appendToOptimalBlockScope(stackTraceData, nodeWithStatements, customNode.getNode(), randomStackTraceIndex);
        });
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, (customNode) => {
            const targetNodeWithStatements = stackTraceData.length
                ? NodeAppender_1.NodeAppender.getOptimalBlockScope(stackTraceData, randomStackTraceIndex, 1)
                : nodeWithStatements;
            NodeAppender_1.NodeAppender.prepend(targetNodeWithStatements, customNode.getNode());
        });
    }
    initialize() {
        this.customNodes = new Map();
        if (!this.options.domainLock.length) {
            return;
        }
        const callsControllerFunctionName = this.identifierNamesGenerator.generate();
        const domainLockNode = this.customNodeFactory(CustomNode_1.CustomNode.DomainLockNode);
        const nodeCallsControllerFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode);
        domainLockNode.initialize(callsControllerFunctionName);
        nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);
        this.customNodes.set(CustomNode_1.CustomNode.DomainLockNode, domainLockNode);
        this.customNodes.set(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Map)
], DomainLockCustomNodeGroup.prototype, "customNodes", void 0);
DomainLockCustomNodeGroup = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));
const ObfuscationEvent_1 = __webpack_require__(/*! ../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const SingleNodeCallControllerTemplate_1 = __webpack_require__(/*! ../../templates/SingleNodeCallControllerTemplate */ "./src/templates/SingleNodeCallControllerTemplate.ts");
const NoCustomNodes_1 = __webpack_require__(/*! ../../options/presets/NoCustomNodes */ "./src/options/presets/NoCustomNodes.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const JavaScriptObfuscatorFacade_1 = __webpack_require__(/*! ../../JavaScriptObfuscatorFacade */ "./src/JavaScriptObfuscatorFacade.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let NodeCallsControllerFunctionNode = class NodeCallsControllerFunctionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }
    initialize(appendEvent, callsControllerFunctionName) {
        this.appendEvent = appendEvent;
        this.callsControllerFunctionName = callsControllerFunctionName;
    }
    getNodeStructure() {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
    getTemplate() {
        if (this.appendEvent === ObfuscationEvent_1.ObfuscationEvent.AfterObfuscation) {
            return JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(string_template_1.default(SingleNodeCallControllerTemplate_1.SingleNodeCallControllerTemplate(), {
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            }), Object.assign(Object.assign({}, NoCustomNodes_1.NO_ADDITIONAL_NODES_PRESET), { identifierNamesGenerator: this.options.identifierNamesGenerator, identifiersDictionary: this.options.identifiersDictionary, seed: this.options.seed })).getObfuscatedCode();
        }
        return string_template_1.default(SingleNodeCallControllerTemplate_1.SingleNodeCallControllerTemplate(), {
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], NodeCallsControllerFunctionNode.prototype, "callsControllerFunctionName", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], NodeCallsControllerFunctionNode.prototype, "appendEvent", void 0);
NodeCallsControllerFunctionNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
], NodeCallsControllerFunctionNode);
exports.NodeCallsControllerFunctionNode = NodeCallsControllerFunctionNode;


/***/ }),

/***/ "./src/custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode.ts":
/*!***************************************************************************!*\
  !*** ./src/custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const NoCustomNodes_1 = __webpack_require__(/*! ../../options/presets/NoCustomNodes */ "./src/options/presets/NoCustomNodes.ts");
const SelfDefendingTemplate_1 = __webpack_require__(/*! ../../templates/self-defending-nodes/self-defending-unicode-node/SelfDefendingTemplate */ "./src/templates/self-defending-nodes/self-defending-unicode-node/SelfDefendingTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const JavaScriptObfuscatorFacade_1 = __webpack_require__(/*! ../../JavaScriptObfuscatorFacade */ "./src/JavaScriptObfuscatorFacade.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let SelfDefendingUnicodeNode = class SelfDefendingUnicodeNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, escapeSequenceEncoder, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
        this.escapeSequenceEncoder = escapeSequenceEncoder;
    }
    initialize(callsControllerFunctionName) {
        this.callsControllerFunctionName = callsControllerFunctionName;
    }
    getNodeStructure() {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
    getTemplate() {
        return JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(string_template_1.default(SelfDefendingTemplate_1.SelfDefendingTemplate(this.escapeSequenceEncoder), {
            selfDefendingFunctionName: this.identifierNamesGenerator.generate(),
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        }), Object.assign(Object.assign({}, NoCustomNodes_1.NO_ADDITIONAL_NODES_PRESET), { identifierNamesGenerator: this.options.identifierNamesGenerator, identifiersDictionary: this.options.identifiersDictionary, seed: this.options.seed, unicodeEscapeSequence: true })).getObfuscatedCode();
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], SelfDefendingUnicodeNode.prototype, "callsControllerFunctionName", void 0);
SelfDefendingUnicodeNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
    appendCustomNodes(nodeWithStatements, stackTraceData) {
        const randomStackTraceIndex = this.getRandomStackTraceIndex(stackTraceData.length);
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.SelfDefendingUnicodeNode, (customNode) => {
            NodeAppender_1.NodeAppender.appendToOptimalBlockScope(stackTraceData, nodeWithStatements, customNode.getNode(), randomStackTraceIndex);
        });
        this.appendCustomNodeIfExist(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, (customNode) => {
            const targetNodeWithStatements = stackTraceData.length
                ? NodeAppender_1.NodeAppender.getOptimalBlockScope(stackTraceData, randomStackTraceIndex, 1)
                : nodeWithStatements;
            NodeAppender_1.NodeAppender.prepend(targetNodeWithStatements, customNode.getNode());
        });
    }
    initialize() {
        this.customNodes = new Map();
        if (!this.options.selfDefending) {
            return;
        }
        const callsControllerFunctionName = this.identifierNamesGenerator.generate();
        const selfDefendingUnicodeNode = this.customNodeFactory(CustomNode_1.CustomNode.SelfDefendingUnicodeNode);
        const nodeCallsControllerFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode);
        selfDefendingUnicodeNode.initialize(callsControllerFunctionName);
        nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);
        this.customNodes.set(CustomNode_1.CustomNode.SelfDefendingUnicodeNode, selfDefendingUnicodeNode);
        this.customNodes.set(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Map)
], SelfDefendingCustomNodeGroup.prototype, "customNodes", void 0);
SelfDefendingCustomNodeGroup = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));
const ObfuscationTarget_1 = __webpack_require__(/*! ../../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");
const StringArrayEncoding_1 = __webpack_require__(/*! ../../enums/StringArrayEncoding */ "./src/enums/StringArrayEncoding.ts");
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const NoCustomNodes_1 = __webpack_require__(/*! ../../options/presets/NoCustomNodes */ "./src/options/presets/NoCustomNodes.ts");
const AtobTemplate_1 = __webpack_require__(/*! ../../templates/AtobTemplate */ "./src/templates/AtobTemplate.ts");
const GlobalVariableNoEvalTemplate_1 = __webpack_require__(/*! ../../templates/GlobalVariableNoEvalTemplate */ "./src/templates/GlobalVariableNoEvalTemplate.ts");
const Rc4Template_1 = __webpack_require__(/*! ../../templates/Rc4Template */ "./src/templates/Rc4Template.ts");
const SelfDefendingTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-calls-wrapper/SelfDefendingTemplate */ "./src/templates/string-array-nodes/string-array-calls-wrapper/SelfDefendingTemplate.ts");
const StringArrayBase64DecodeNodeTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate */ "./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayBase64DecodeNodeTemplate.ts");
const StringArrayCallsWrapperTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate */ "./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayCallsWrapperTemplate.ts");
const StringArrayRC4DecodeNodeTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate */ "./src/templates/string-array-nodes/string-array-calls-wrapper/StringArrayRC4DecodeNodeTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const JavaScriptObfuscatorFacade_1 = __webpack_require__(/*! ../../JavaScriptObfuscatorFacade */ "./src/JavaScriptObfuscatorFacade.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let StringArrayCallsWrapper = class StringArrayCallsWrapper extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, escapeSequenceEncoder, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
        this.escapeSequenceEncoder = escapeSequenceEncoder;
    }
    initialize(stringArrayName, stringArrayCallsWrapperName) {
        this.stringArrayName = stringArrayName;
        this.stringArrayCallsWrapperName = stringArrayCallsWrapperName;
    }
    getNodeStructure() {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
    getTemplate() {
        const decodeNodeTemplate = this.getDecodeStringArrayTemplate();
        return JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(string_template_1.default(StringArrayCallsWrapperTemplate_1.StringArrayCallsWrapperTemplate(), {
            decodeNodeTemplate,
            stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
            stringArrayName: this.stringArrayName
        }), Object.assign(Object.assign({}, NoCustomNodes_1.NO_ADDITIONAL_NODES_PRESET), { identifierNamesGenerator: this.options.identifierNamesGenerator, identifiersDictionary: this.options.identifiersDictionary, seed: this.options.seed })).getObfuscatedCode();
    }
    getDecodeStringArrayTemplate() {
        const globalVariableTemplate = this.options.target !== ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval
            ? this.getGlobalVariableTemplate()
            : GlobalVariableNoEvalTemplate_1.GlobalVariableNoEvalTemplate();
        const atobPolyfill = string_template_1.default(AtobTemplate_1.AtobTemplate(), { globalVariableTemplate });
        let decodeStringArrayTemplate = '';
        let selfDefendingCode = '';
        if (this.options.selfDefending) {
            selfDefendingCode = string_template_1.default(SelfDefendingTemplate_1.SelfDefendingTemplate(this.randomGenerator, this.escapeSequenceEncoder), {
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
                stringArrayName: this.stringArrayName
            });
        }
        switch (this.options.stringArrayEncoding) {
            case StringArrayEncoding_1.StringArrayEncoding.Rc4:
                decodeStringArrayTemplate = string_template_1.default(StringArrayRC4DecodeNodeTemplate_1.StringArrayRc4DecodeNodeTemplate(this.randomGenerator), {
                    atobPolyfill,
                    rc4Polyfill: Rc4Template_1.Rc4Template(),
                    selfDefendingCode,
                    stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                });
                break;
            case StringArrayEncoding_1.StringArrayEncoding.Base64:
                decodeStringArrayTemplate = string_template_1.default(StringArrayBase64DecodeNodeTemplate_1.StringArrayBase64DecodeNodeTemplate(this.randomGenerator), {
                    atobPolyfill,
                    selfDefendingCode,
                    stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                });
        }
        return decodeStringArrayTemplate;
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], StringArrayCallsWrapper.prototype, "stringArrayName", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], StringArrayCallsWrapper.prototype, "stringArrayCallsWrapperName", void 0);
StringArrayCallsWrapper = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const StringArrayTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-node/StringArrayTemplate */ "./src/templates/string-array-nodes/string-array-node/StringArrayTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let StringArrayNode = class StringArrayNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }
    initialize(stringArrayStorage, stringArrayName, stringArrayRotateValue) {
        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayName = stringArrayName;
        this.stringArrayRotateValue = stringArrayRotateValue;
    }
    getNode() {
        this.stringArrayStorage.rotateArray(this.stringArrayRotateValue);
        return super.getNode();
    }
    getNodeStructure() {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
    getTemplate() {
        return string_template_1.default(StringArrayTemplate_1.StringArrayTemplate(), {
            stringArrayName: this.stringArrayName,
            stringArray: this.stringArrayStorage.toString()
        });
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Object)
], StringArrayNode.prototype, "stringArrayStorage", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], StringArrayNode.prototype, "stringArrayName", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Number)
], StringArrayNode.prototype, "stringArrayRotateValue", void 0);
StringArrayNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const string_template_1 = tslib_1.__importDefault(__webpack_require__(/*! string-template */ "string-template"));
const Initializable_1 = __webpack_require__(/*! ../../decorators/Initializable */ "./src/decorators/Initializable.ts");
const NoCustomNodes_1 = __webpack_require__(/*! ../../options/presets/NoCustomNodes */ "./src/options/presets/NoCustomNodes.ts");
const SelfDefendingTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-rotate-function-node/SelfDefendingTemplate */ "./src/templates/string-array-nodes/string-array-rotate-function-node/SelfDefendingTemplate.ts");
const StringArrayRotateFunctionTemplate_1 = __webpack_require__(/*! ../../templates/string-array-nodes/string-array-rotate-function-node/StringArrayRotateFunctionTemplate */ "./src/templates/string-array-nodes/string-array-rotate-function-node/StringArrayRotateFunctionTemplate.ts");
const AbstractCustomNode_1 = __webpack_require__(/*! ../AbstractCustomNode */ "./src/custom-nodes/AbstractCustomNode.ts");
const JavaScriptObfuscatorFacade_1 = __webpack_require__(/*! ../../JavaScriptObfuscatorFacade */ "./src/JavaScriptObfuscatorFacade.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
const NumberUtils_1 = __webpack_require__(/*! ../../utils/NumberUtils */ "./src/utils/NumberUtils.ts");
let StringArrayRotateFunctionNode = class StringArrayRotateFunctionNode extends AbstractCustomNode_1.AbstractCustomNode {
    constructor(identifierNamesGeneratorFactory, randomGenerator, escapeSequenceEncoder, options) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
        this.escapeSequenceEncoder = escapeSequenceEncoder;
    }
    initialize(stringArrayName, stringArrayRotateValue) {
        this.stringArrayName = stringArrayName;
        this.stringArrayRotateValue = stringArrayRotateValue;
    }
    getNodeStructure() {
        return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
    }
    getTemplate() {
        const timesName = this.identifierNamesGenerator.generate();
        const whileFunctionName = this.identifierNamesGenerator.generate();
        let code = '';
        if (this.options.selfDefending) {
            code = string_template_1.default(SelfDefendingTemplate_1.SelfDefendingTemplate(this.escapeSequenceEncoder), {
                timesName,
                whileFunctionName
            });
        }
        else {
            code = `${whileFunctionName}(++${timesName})`;
        }
        return JavaScriptObfuscatorFacade_1.JavaScriptObfuscator.obfuscate(string_template_1.default(StringArrayRotateFunctionTemplate_1.StringArrayRotateFunctionTemplate(), {
            code,
            timesName,
            stringArrayName: this.stringArrayName,
            stringArrayRotateValue: NumberUtils_1.NumberUtils.toHex(this.stringArrayRotateValue),
            whileFunctionName
        }), Object.assign(Object.assign({}, NoCustomNodes_1.NO_ADDITIONAL_NODES_PRESET), { identifierNamesGenerator: this.options.identifierNamesGenerator, identifiersDictionary: this.options.identifiersDictionary, seed: this.options.seed })).getObfuscatedCode();
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], StringArrayRotateFunctionNode.prototype, "stringArrayName", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Number)
], StringArrayRotateFunctionNode.prototype, "stringArrayRotateValue", void 0);
StringArrayRotateFunctionNode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
    appendCustomNodes(nodeWithStatements, stackTraceData) {
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
        const stringArrayStorageId = this.stringArrayStorage.getStorageId();
        const [stringArrayName, stringArrayCallsWrapperName] = stringArrayStorageId.split('|');
        let stringArrayRotateValue;
        if (this.options.rotateStringArray) {
            stringArrayRotateValue = this.randomGenerator.getRandomInteger(100, 500);
        }
        else {
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
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Map)
], StringArrayCustomNodeGroup.prototype, "customNodes", void 0);
StringArrayCustomNodeGroup = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TStringArrayStorage)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Function, Object, Object])
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
        const methodDescriptor = Object
            .getOwnPropertyDescriptor(target, propertyName) || defaultDescriptor;
        const originalMethod = methodDescriptor.value;
        Object.defineProperty(target, propertyName, Object.assign(Object.assign({}, methodDescriptor), { value: function () {
                if (!Reflect.getMetadata(initializedTargetMetadataKey, this)) {
                    throw new Error(`Class should be initialized with \`${initializeMethodName}()\` method`);
                }
                return originalMethod.apply(this, arguments);
            } }));
        wrappedMethodsSet.add(propertyName);
    });
}
function wrapInitializeMethodInInitializeCheck(target, initializeMethodName, propertyKey) {
    const methodDescriptor = Object
        .getOwnPropertyDescriptor(target, initializeMethodName) || defaultDescriptor;
    const originalMethod = methodDescriptor.value;
    Object.defineProperty(target, initializeMethodName, Object.assign(Object.assign({}, methodDescriptor), { value: function () {
            Reflect.defineMetadata(initializedTargetMetadataKey, true, this);
            const result = originalMethod.apply(this, arguments);
            if (this[propertyKey]) { }
            return result;
        } }));
}
function wrapInitializableProperty(target, propertyKey) {
    const initializablePropertiesSet = Reflect
        .getMetadata(initializablePropertiesSetMetadataKey, target);
    initializablePropertiesSet.add(propertyKey);
    const initializablePropertyMetadataKey = `_${propertyKey.toString()}`;
    const propertyDescriptor = Object
        .getOwnPropertyDescriptor(target, initializablePropertyMetadataKey) || defaultDescriptor;
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

Object.defineProperty(exports, "__esModule", { value: true });
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
var IdentifierNamesGenerator;
(function (IdentifierNamesGenerator) {
    IdentifierNamesGenerator["DictionaryIdentifierNamesGenerator"] = "dictionary";
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
    NodeTransformer["SplitStringTransformer"] = "SplitStringTransformer";
    NodeTransformer["TemplateLiteralTransformer"] = "TemplateLiteralTransformer";
    NodeTransformer["VariableDeclarationTransformer"] = "VariableDeclarationTransformer";
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

/***/ "./src/enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor.ts ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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

Object.defineProperty(exports, "__esModule", { value: true });
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const eventemitter3_1 = tslib_1.__importDefault(__webpack_require__(/*! eventemitter3 */ "eventemitter3"));
inversify_1.decorate(inversify_1.injectable(), eventemitter3_1.default);
let ObfuscationEventEmitter = class ObfuscationEventEmitter extends eventemitter3_1.default {
};
ObfuscationEventEmitter = tslib_1.__decorate([
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
let AbstractIdentifierNamesGenerator = class AbstractIdentifierNamesGenerator {
    constructor(randomGenerator, options) {
        this.preservedNames = [];
        this.randomGenerator = randomGenerator;
        this.options = options;
    }
    preserveName(name) {
        this.preservedNames.push(name);
    }
    isValidIdentifierName(name) {
        return this.notReservedName(name) && !this.preservedNames.includes(name);
    }
    notReservedName(name) {
        return this.options.reservedNames.length
            ? !this.options.reservedNames.some((reservedName) => new RegExp(reservedName, 'g').exec(name) !== null)
            : true;
    }
};
AbstractIdentifierNamesGenerator = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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

var DictionaryIdentifierNamesGenerator_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const AbstractIdentifierNamesGenerator_1 = __webpack_require__(/*! ./AbstractIdentifierNamesGenerator */ "./src/generators/identifier-names-generators/AbstractIdentifierNamesGenerator.ts");
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
        if (!this.identifierNamesSet.size) {
            throw new Error('Too many identifiers in the code, add more words to identifiers dictionary');
        }
        const iteratorResult = this.identifiersIterator.next();
        if (!iteratorResult.done) {
            return iteratorResult.value;
        }
        this.identifierNamesSet = new Set(this.getIncrementedIdentifierNames([...this.identifierNamesSet]));
        this.identifiersIterator = this.identifierNamesSet.values();
        return this.generate();
    }
    generateWithPrefix() {
        const prefix = this.options.identifiersPrefix ?
            `${this.options.identifiersPrefix}_`
            : '';
        const identifierName = this.generate();
        return `${prefix}${identifierName}`.replace('__', '_');
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
DictionaryIdentifierNamesGenerator = DictionaryIdentifierNamesGenerator_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IArrayUtils)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
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

var HexadecimalIdentifierNamesGenerator_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
    generateWithPrefix(nameLength) {
        const identifierName = this.generate(nameLength);
        return `${this.options.identifiersPrefix}${identifierName}`.replace('__', '_');
    }
};
HexadecimalIdentifierNamesGenerator.baseIdentifierNameLength = 6;
HexadecimalIdentifierNamesGenerator = HexadecimalIdentifierNamesGenerator_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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

var MangledIdentifierNamesGenerator_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const AbstractIdentifierNamesGenerator_1 = __webpack_require__(/*! ./AbstractIdentifierNamesGenerator */ "./src/generators/identifier-names-generators/AbstractIdentifierNamesGenerator.ts");
let MangledIdentifierNamesGenerator = MangledIdentifierNamesGenerator_1 = class MangledIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator_1.AbstractIdentifierNamesGenerator {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
        this.previousMangledName = MangledIdentifierNamesGenerator_1.initMangledNameCharacter;
    }
    generate(nameLength) {
        const identifierName = this.generateNewMangledName(this.previousMangledName);
        this.previousMangledName = identifierName;
        return identifierName;
    }
    generateWithPrefix(nameLength) {
        const prefix = this.options.identifiersPrefix ?
            `${this.options.identifiersPrefix}_`
            : '';
        const identifierName = this.generate(nameLength);
        return `${prefix}${identifierName}`;
    }
    isValidIdentifierName(mangledName) {
        return super.isValidIdentifierName(mangledName)
            && !MangledIdentifierNamesGenerator_1.reservedNames.includes(mangledName);
    }
    generateNewMangledName(previousMangledName) {
        const generateNewMangledName = (name) => {
            const nameSequence = MangledIdentifierNamesGenerator_1.nameSequence;
            const nameLength = name.length;
            const zeroSequence = (num) => {
                return '0'.repeat(num);
            };
            let index = nameLength - 1;
            do {
                const character = name.charAt(index);
                const indexInSequence = nameSequence.indexOf(character);
                const lastNameSequenceIndex = nameSequence.length - 1;
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
};
MangledIdentifierNamesGenerator.initMangledNameCharacter = '9';
MangledIdentifierNamesGenerator.nameSequence = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
MangledIdentifierNamesGenerator.reservedNames = [
    'byte', 'case', 'char', 'do', 'else', 'enum', 'eval', 'for', 'goto',
    'if', 'in', 'int', 'let', 'long', 'new', 'null', 'this', 'true', 'try',
    'var', 'void', 'with'
];
MangledIdentifierNamesGenerator = MangledIdentifierNamesGenerator_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], MangledIdentifierNamesGenerator);
exports.MangledIdentifierNamesGenerator = MangledIdentifierNamesGenerator;


/***/ }),

/***/ "./src/logger/Logger.ts":
/*!******************************!*\
  !*** ./src/logger/Logger.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Logger_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const chalk_1 = tslib_1.__importDefault(__webpack_require__(/*! chalk */ "chalk"));
const LoggingPrefix_1 = __webpack_require__(/*! ../enums/logger/LoggingPrefix */ "./src/enums/logger/LoggingPrefix.ts");
let Logger = Logger_1 = class Logger {
    constructor(options) {
        this.options = options;
    }
    static log(loggingLevelColor, loggingPrefix, loggingMessage, value) {
        const processedMessage = loggingLevelColor(`\n${loggingPrefix} ${loggingMessage}`);
        console.log(processedMessage, value || '');
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
Logger = Logger_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
let AbstractNodeTransformer = class AbstractNodeTransformer {
    constructor(randomGenerator, options) {
        this.randomGenerator = randomGenerator;
        this.options = options;
    }
};
AbstractNodeTransformer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
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
TransformersRunner = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeTransformer)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformerNamesGroupsBuilder)),
    tslib_1.__metadata("design:paramtypes", [Function, Object])
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

var BlockStatementControlFlowTransformer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
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
BlockStatementControlFlowTransformer = BlockStatementControlFlowTransformer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IArrayUtils)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])
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

var FunctionControlFlowTransformer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const ControlFlowCustomNode_1 = __webpack_require__(/*! ../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");
const ControlFlowReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer.ts");
const NodeType_1 = __webpack_require__(/*! ../../enums/node/NodeType */ "./src/enums/node/NodeType.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeAppender_1 = __webpack_require__(/*! ../../node/NodeAppender */ "./src/node/NodeAppender.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
const NodeStatementUtils_1 = __webpack_require__(/*! ../../node/NodeStatementUtils */ "./src/node/NodeStatementUtils.ts");
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
FunctionControlFlowTransformer = FunctionControlFlowTransformer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__TControlFlowStorage)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowReplacer)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Function, Function, Object, Object])
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

var AbstractControlFlowReplacer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
AbstractControlFlowReplacer = AbstractControlFlowReplacer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

var BinaryExpressionControlFlowReplacer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const ControlFlowCustomNode_1 = __webpack_require__(/*! ../../../enums/custom-nodes/ControlFlowCustomNode */ "./src/enums/custom-nodes/ControlFlowCustomNode.ts");
const ExpressionWithOperatorControlFlowReplacer_1 = __webpack_require__(/*! ./ExpressionWithOperatorControlFlowReplacer */ "./src/node-transformers/control-flow-transformers/control-flow-replacers/ExpressionWithOperatorControlFlowReplacer.ts");
let BinaryExpressionControlFlowReplacer = BinaryExpressionControlFlowReplacer_1 = class BinaryExpressionControlFlowReplacer extends ExpressionWithOperatorControlFlowReplacer_1.ExpressionWithOperatorControlFlowReplacer {
    constructor(controlFlowCustomNodeFactory, randomGenerator, options) {
        super(controlFlowCustomNodeFactory, randomGenerator, options);
    }
    replace(binaryExpressionNode, parentNode, controlFlowStorage) {
        const replacerId = binaryExpressionNode.operator;
        const binaryExpressionFunctionCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.BinaryExpressionFunctionNode);
        binaryExpressionFunctionCustomNode.initialize(replacerId);
        const storageKey = this.insertCustomNodeToControlFlowStorage(binaryExpressionFunctionCustomNode, controlFlowStorage, replacerId, BinaryExpressionControlFlowReplacer_1.usingExistingIdentifierChance);
        return this.getControlFlowStorageCallNode(controlFlowStorage.getStorageId(), storageKey, binaryExpressionNode.left, binaryExpressionNode.right);
    }
};
BinaryExpressionControlFlowReplacer.usingExistingIdentifierChance = 0.5;
BinaryExpressionControlFlowReplacer = BinaryExpressionControlFlowReplacer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

var CallExpressionControlFlowReplacer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
            throw new Error(`\`controlFlowStorageCallCustomNode.getNode()[0]\` should returns array with \`ExpressionStatement\` node`);
        }
        return statementNode.expression;
    }
};
CallExpressionControlFlowReplacer.usingExistingIdentifierChance = 0.5;
CallExpressionControlFlowReplacer = CallExpressionControlFlowReplacer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
            throw new Error(`\`controlFlowStorageCallCustomNode.getNode()[0]\` should returns array with \`ExpressionStatement\` node`);
        }
        return statementNode.expression;
    }
};
ExpressionWithOperatorControlFlowReplacer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

var LogicalExpressionControlFlowReplacer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
        const replacerId = logicalExpressionNode.operator;
        const logicalExpressionFunctionCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.LogicalExpressionFunctionNode);
        logicalExpressionFunctionCustomNode.initialize(replacerId);
        const storageKey = this.insertCustomNodeToControlFlowStorage(logicalExpressionFunctionCustomNode, controlFlowStorage, replacerId, LogicalExpressionControlFlowReplacer_1.usingExistingIdentifierChance);
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
LogicalExpressionControlFlowReplacer = LogicalExpressionControlFlowReplacer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

var StringLiteralControlFlowReplacer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
            throw new Error(`\`controlFlowStorageCallCustomNode.getNode()[0]\` should returns array with \`ExpressionStatement\` node`);
        }
        return statementNode.expression;
    }
};
StringLiteralControlFlowReplacer.usingExistingIdentifierChance = 1;
StringLiteralControlFlowReplacer = StringLiteralControlFlowReplacer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
MemberExpressionTransformer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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

var MethodDefinitionTransformer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
        if (NodeGuards_1.NodeGuards.isIdentifierNode(methodDefinitionNode.key) &&
            !MethodDefinitionTransformer_1.ignoredNames.includes(methodDefinitionNode.key.name) &&
            methodDefinitionNode.computed === false) {
            methodDefinitionNode.computed = true;
            methodDefinitionNode.key = NodeFactory_1.NodeFactory.literalNode(methodDefinitionNode.key.name);
        }
        return methodDefinitionNode;
    }
};
MethodDefinitionTransformer.ignoredNames = ['constructor'];
MethodDefinitionTransformer = MethodDefinitionTransformer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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

var ObjectExpressionKeysTransformer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const NodeType_1 = __webpack_require__(/*! ../../enums/node/NodeType */ "./src/enums/node/NodeType.ts");
const PropertiesExtractor_1 = __webpack_require__(/*! ../../enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor */ "./src/enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let ObjectExpressionKeysTransformer = ObjectExpressionKeysTransformer_1 = class ObjectExpressionKeysTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(propertiesExtractorFactory, randomGenerator, options) {
        super(randomGenerator, options);
        this.propertiesExtractorFactory = propertiesExtractorFactory;
    }
    getVisitor(transformationStage) {
        if (transformationStage !== TransformationStage_1.TransformationStage.Converting) {
            return null;
        }
        return {
            enter: (node, parentNode) => {
                if (this.options.transformObjectKeys
                    && parentNode
                    && NodeGuards_1.NodeGuards.isObjectExpressionNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }
    transformNode(objectExpressionNode, parentNode) {
        if (!objectExpressionNode.properties.length) {
            return objectExpressionNode;
        }
        const propertiesExtractorName = ObjectExpressionKeysTransformer_1
            .propertiesExtractorsMap
            .get(parentNode.type);
        if (!propertiesExtractorName) {
            return objectExpressionNode;
        }
        const propertiesExtractor = this.propertiesExtractorFactory(propertiesExtractorName);
        return propertiesExtractor.extract(objectExpressionNode, parentNode);
    }
};
ObjectExpressionKeysTransformer.propertiesExtractorsMap = new Map([
    [NodeType_1.NodeType.AssignmentExpression, PropertiesExtractor_1.PropertiesExtractor.AssignmentExpressionPropertiesExtractor],
    [NodeType_1.NodeType.VariableDeclarator, PropertiesExtractor_1.PropertiesExtractor.VariableDeclaratorPropertiesExtractor]
]);
ObjectExpressionKeysTransformer = ObjectExpressionKeysTransformer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IPropertiesExtractor)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let ObjectExpressionTransformer = class ObjectExpressionTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(escapeSequenceEncoder, randomGenerator, options) {
        super(randomGenerator, options);
        this.escapeSequenceEncoder = escapeSequenceEncoder;
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
        property.key = NodeFactory_1.NodeFactory.literalNode(this.getPropertyKeyValue(property.key.value));
    }
    transformBaseProperty(property) {
        if (property.shorthand) {
            property.shorthand = false;
        }
        if (!NodeGuards_1.NodeGuards.isIdentifierNode(property.key)) {
            return;
        }
        property.key = NodeFactory_1.NodeFactory.literalNode(this.getPropertyKeyValue(property.key.name));
    }
    getPropertyKeyValue(inputValue) {
        return this.options.unicodeEscapeSequence
            ? this.escapeSequenceEncoder.encode(inputValue, true)
            : inputValue;
    }
};
ObjectExpressionTransformer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
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

var SplitStringTransformer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const NodeTransformer_1 = __webpack_require__(/*! ../../enums/node-transformers/NodeTransformer */ "./src/enums/node-transformers/NodeTransformer.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
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
        if (typeof literalNode.value !== 'string') {
            return literalNode;
        }
        if (NodeGuards_1.NodeGuards.isPropertyNode(parentNode) && !parentNode.computed && parentNode.key === literalNode) {
            return literalNode;
        }
        if (this.options.splitStringsChunkLength >= literalNode.value.length) {
            return literalNode;
        }
        const stringChunks = SplitStringTransformer_1.chunkString(literalNode.value, this.options.splitStringsChunkLength);
        return this.transformStringChunksToBinaryExpressionNode(stringChunks);
    }
    transformStringChunksToBinaryExpressionNode(chunks) {
        const lastChunk = chunks.pop();
        if (lastChunk === undefined) {
            throw new Error('Last chunk value should not be empty');
        }
        const lastChunkLiteralNode = NodeFactory_1.NodeFactory.literalNode(lastChunk);
        if (chunks.length === 0) {
            return lastChunkLiteralNode;
        }
        return NodeFactory_1.NodeFactory.binaryExpressionNode('+', this.transformStringChunksToBinaryExpressionNode(chunks), lastChunkLiteralNode);
    }
};
SplitStringTransformer = SplitStringTransformer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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

var TemplateLiteralTransformer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
        return node && NodeGuards_1.NodeGuards.isLiteralNode(node) && typeof node.value === 'string';
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
        return transformedNode;
    }
};
TemplateLiteralTransformer = TemplateLiteralTransformer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], TemplateLiteralTransformer);
exports.TemplateLiteralTransformer = TemplateLiteralTransformer;


/***/ }),

/***/ "./src/node-transformers/converting-transformers/properties-extractors/AbstractPropertiesExtractor.ts":
/*!************************************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/properties-extractors/AbstractPropertiesExtractor.ts ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var AbstractPropertiesExtractor_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const NodeAppender_1 = __webpack_require__(/*! ../../../node/NodeAppender */ "./src/node/NodeAppender.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeStatementUtils_1 = __webpack_require__(/*! ../../../node/NodeStatementUtils */ "./src/node/NodeStatementUtils.ts");
let AbstractPropertiesExtractor = AbstractPropertiesExtractor_1 = class AbstractPropertiesExtractor {
    constructor(randomGenerator, options) {
        this.cachedHostNodesWithStatementsMap = new Map();
        this.cachedHostStatementsMap = new Map();
        this.randomGenerator = randomGenerator;
        this.options = options;
    }
    static getPropertyNodeKeyName(propertyNode) {
        if (!propertyNode.key) {
            return null;
        }
        const propertyKeyNode = propertyNode.key;
        if (NodeGuards_1.NodeGuards.isLiteralNode(propertyKeyNode) && typeof propertyKeyNode.value === 'string') {
            return propertyKeyNode.value;
        }
        if (NodeGuards_1.NodeGuards.isIdentifierNode(propertyKeyNode)) {
            return propertyKeyNode.name;
        }
        return null;
    }
    static isProhibitedHostParent(node) {
        return NodeGuards_1.NodeGuards.isMemberExpressionNode(node);
    }
    static isProhibitedPattern(node) {
        return !node
            || NodeGuards_1.NodeGuards.isObjectPatternNode(node)
            || NodeGuards_1.NodeGuards.isArrayPatternNode(node)
            || NodeGuards_1.NodeGuards.isAssignmentPatternNode(node)
            || NodeGuards_1.NodeGuards.isRestElementNode(node);
    }
    extractPropertiesToExpressionStatements(properties, memberExpressionHostNode) {
        const propertiesLength = properties.length;
        const expressionStatements = [];
        const removablePropertyIds = [];
        for (let i = 0; i < propertiesLength; i++) {
            const property = properties[i];
            const propertyValue = property.value;
            if (AbstractPropertiesExtractor_1.isProhibitedPattern(propertyValue)) {
                continue;
            }
            const propertyKeyName = AbstractPropertiesExtractor_1.getPropertyNodeKeyName(property);
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
                this.transformObjectExpressionNode(property.value, memberExpressionNode);
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
    transformObjectExpressionNode(objectExpressionNode, memberExpressionHostNode) {
        const properties = objectExpressionNode.properties;
        const [expressionStatements, removablePropertyIds] = this
            .extractPropertiesToExpressionStatements(properties, memberExpressionHostNode);
        const hostStatement = this.getHostStatement(objectExpressionNode);
        const hostNodeWithStatements = this.getHostNodeWithStatements(objectExpressionNode, hostStatement);
        this.filterExtractedObjectExpressionProperties(objectExpressionNode, removablePropertyIds);
        NodeAppender_1.NodeAppender.insertAfter(hostNodeWithStatements, expressionStatements, hostStatement);
        return objectExpressionNode;
    }
    getHostNodeWithStatements(objectExpressionNode, hostStatement) {
        if (this.cachedHostNodesWithStatementsMap.has(objectExpressionNode)) {
            return this.cachedHostNodesWithStatementsMap.get(objectExpressionNode);
        }
        const nodeWithStatements = NodeStatementUtils_1.NodeStatementUtils.getScopeOfNode(hostStatement);
        this.cachedHostNodesWithStatementsMap.set(objectExpressionNode, nodeWithStatements);
        return nodeWithStatements;
    }
    getHostStatement(objectExpressionNode) {
        if (this.cachedHostStatementsMap.has(objectExpressionNode)) {
            return this.cachedHostStatementsMap.get(objectExpressionNode);
        }
        const hostStatement = NodeStatementUtils_1.NodeStatementUtils.getRootStatementOfNode(objectExpressionNode);
        this.cachedHostStatementsMap.set(objectExpressionNode, hostStatement);
        return hostStatement;
    }
};
AbstractPropertiesExtractor = AbstractPropertiesExtractor_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], AbstractPropertiesExtractor);
exports.AbstractPropertiesExtractor = AbstractPropertiesExtractor;


/***/ }),

/***/ "./src/node-transformers/converting-transformers/properties-extractors/AssignmentExpressionPropertiesExtractor.ts":
/*!************************************************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/properties-extractors/AssignmentExpressionPropertiesExtractor.ts ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const AbstractPropertiesExtractor_1 = __webpack_require__(/*! ./AbstractPropertiesExtractor */ "./src/node-transformers/converting-transformers/properties-extractors/AbstractPropertiesExtractor.ts");
let AssignmentExpressionPropertiesExtractor = class AssignmentExpressionPropertiesExtractor extends AbstractPropertiesExtractor_1.AbstractPropertiesExtractor {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
    }
    extract(objectExpressionNode, hostNode) {
        const hostParentNode = hostNode.parentNode;
        const leftNode = hostNode.left;
        if (AbstractPropertiesExtractor_1.AbstractPropertiesExtractor.isProhibitedPattern(leftNode)) {
            return objectExpressionNode;
        }
        if (hostParentNode && AbstractPropertiesExtractor_1.AbstractPropertiesExtractor.isProhibitedHostParent(hostParentNode)) {
            return objectExpressionNode;
        }
        return this.transformObjectExpressionNode(objectExpressionNode, leftNode);
    }
};
AssignmentExpressionPropertiesExtractor = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], AssignmentExpressionPropertiesExtractor);
exports.AssignmentExpressionPropertiesExtractor = AssignmentExpressionPropertiesExtractor;


/***/ }),

/***/ "./src/node-transformers/converting-transformers/properties-extractors/VariableDeclaratorPropertiesExtractor.ts":
/*!**********************************************************************************************************************!*\
  !*** ./src/node-transformers/converting-transformers/properties-extractors/VariableDeclaratorPropertiesExtractor.ts ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const AbstractPropertiesExtractor_1 = __webpack_require__(/*! ./AbstractPropertiesExtractor */ "./src/node-transformers/converting-transformers/properties-extractors/AbstractPropertiesExtractor.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let VariableDeclaratorPropertiesExtractor = class VariableDeclaratorPropertiesExtractor extends AbstractPropertiesExtractor_1.AbstractPropertiesExtractor {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
    }
    extract(objectExpressionNode, hostNode) {
        if (!NodeGuards_1.NodeGuards.isIdentifierNode(hostNode.id)
            || this.isProhibitedObjectExpressionNode(objectExpressionNode, hostNode.id)) {
            return objectExpressionNode;
        }
        return this.transformObjectExpressionNode(objectExpressionNode, hostNode.id);
    }
    getHostVariableDeclaratorNode(objectExpressionNode) {
        const { parentNode } = objectExpressionNode;
        if (!parentNode || !NodeGuards_1.NodeGuards.isVariableDeclaratorNode(parentNode)) {
            throw new Error('Cannot get `VariableDeclarator` node for `ObjectExpression` node');
        }
        return parentNode;
    }
    getHostVariableDeclarationNode(variableDeclaratorNode) {
        const { parentNode } = variableDeclaratorNode;
        if (!parentNode || !NodeGuards_1.NodeGuards.isVariableDeclarationNode(parentNode)) {
            throw new Error('Cannot get `VariableDeclaration` node for `VariableDeclarator` node');
        }
        return parentNode;
    }
    isProhibitedObjectExpressionNode(objectExpressionNode, memberExpressionHostNode) {
        const hostVariableDeclarator = this.getHostVariableDeclaratorNode(objectExpressionNode);
        const hostVariableDeclaration = this.getHostVariableDeclarationNode(hostVariableDeclarator);
        const { declarations } = hostVariableDeclaration;
        const indexOfDeclarator = declarations.indexOf(hostVariableDeclarator);
        const isLastDeclarator = indexOfDeclarator === (declarations.length - 1);
        if (isLastDeclarator) {
            return false;
        }
        const declaratorsAfterCurrentDeclarator = declarations.slice(indexOfDeclarator);
        let isProhibitedObjectExpressionNode = false;
        declaratorsAfterCurrentDeclarator.forEach((variableDeclarator) => {
            estraverse.traverse(variableDeclarator, {
                enter: (node) => {
                    if (NodeGuards_1.NodeGuards.isMemberExpressionNode(node)
                        && NodeGuards_1.NodeGuards.isIdentifierNode(node.object)
                        && node.object.name === memberExpressionHostNode.name) {
                        isProhibitedObjectExpressionNode = true;
                        return estraverse.VisitorOption.Break;
                    }
                    return node;
                }
            });
        });
        return isProhibitedObjectExpressionNode;
    }
};
VariableDeclaratorPropertiesExtractor = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], VariableDeclaratorPropertiesExtractor);
exports.VariableDeclaratorPropertiesExtractor = VariableDeclaratorPropertiesExtractor;


/***/ }),

/***/ "./src/node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer.ts":
/*!************************************************************************************************!*\
  !*** ./src/node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer.ts ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DeadCodeInjectionTransformer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
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
    NodeTransformer_1.NodeTransformer.CatchClauseTransformer,
    NodeTransformer_1.NodeTransformer.ClassDeclarationTransformer,
    NodeTransformer_1.NodeTransformer.FunctionDeclarationTransformer,
    NodeTransformer_1.NodeTransformer.FunctionTransformer,
    NodeTransformer_1.NodeTransformer.LabeledStatementTransformer,
    NodeTransformer_1.NodeTransformer.VariableDeclarationTransformer
];
DeadCodeInjectionTransformer = DeadCodeInjectionTransformer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IDeadCodeInjectionCustomNode)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ITransformersRunner)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])
], DeadCodeInjectionTransformer);
exports.DeadCodeInjectionTransformer = DeadCodeInjectionTransformer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/CatchClauseTransformer.ts":
/*!**********************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/CatchClauseTransformer.ts ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeLexicalScopeUtils_1 = __webpack_require__(/*! ../../node/NodeLexicalScopeUtils */ "./src/node/NodeLexicalScopeUtils.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
let CatchClauseTransformer = class CatchClauseTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(identifierObfuscatingReplacerFactory, randomGenerator, options) {
        super(randomGenerator, options);
        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Obfuscating:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode && NodeGuards_1.NodeGuards.isCatchClauseNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(catchClauseNode, parentNode) {
        const lexicalScopeNode = NodeLexicalScopeUtils_1.NodeLexicalScopeUtils.getLexicalScope(catchClauseNode);
        if (!lexicalScopeNode) {
            return catchClauseNode;
        }
        this.storeCatchClauseParam(catchClauseNode, lexicalScopeNode);
        this.replaceCatchClauseParam(catchClauseNode, lexicalScopeNode);
        return catchClauseNode;
    }
    storeCatchClauseParam(catchClauseNode, lexicalScopeNode) {
        if (NodeGuards_1.NodeGuards.isIdentifierNode(catchClauseNode.param)) {
            this.identifierObfuscatingReplacer.storeLocalName(catchClauseNode.param.name, lexicalScopeNode);
        }
    }
    replaceCatchClauseParam(catchClauseNode, lexicalScopeNode) {
        estraverse.replace(catchClauseNode, {
            enter: (node, parentNode) => {
                if (parentNode && NodeGuards_1.NodeGuards.isReplaceableIdentifierNode(node, parentNode)) {
                    const newIdentifier = this.identifierObfuscatingReplacer
                        .replace(node.name, lexicalScopeNode);
                    const newIdentifierName = newIdentifier.name;
                    if (node.name !== newIdentifierName) {
                        node.name = newIdentifierName;
                        NodeMetadata_1.NodeMetadata.set(node, { renamedIdentifier: true });
                    }
                }
            }
        });
    }
};
CatchClauseTransformer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
], CatchClauseTransformer);
exports.CatchClauseTransformer = CatchClauseTransformer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/ClassDeclarationTransformer.ts":
/*!***************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/ClassDeclarationTransformer.ts ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");
const NodeType_1 = __webpack_require__(/*! ../../enums/node/NodeType */ "./src/enums/node/NodeType.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeLexicalScopeUtils_1 = __webpack_require__(/*! ../../node/NodeLexicalScopeUtils */ "./src/node/NodeLexicalScopeUtils.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
let ClassDeclarationTransformer = class ClassDeclarationTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(identifierObfuscatingReplacerFactory, randomGenerator, options) {
        super(randomGenerator, options);
        this.replaceableIdentifiers = new Map();
        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Obfuscating:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode
                            && NodeGuards_1.NodeGuards.isClassDeclarationNode(node)
                            && !NodeGuards_1.NodeGuards.isExportNamedDeclarationNode(parentNode)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(classDeclarationNode, parentNode) {
        const lexicalScopeNode = NodeLexicalScopeUtils_1.NodeLexicalScopeUtils.getLexicalScope(classDeclarationNode);
        if (!lexicalScopeNode) {
            return classDeclarationNode;
        }
        const isGlobalDeclaration = lexicalScopeNode.type === NodeType_1.NodeType.Program;
        if (!this.options.renameGlobals && isGlobalDeclaration) {
            return classDeclarationNode;
        }
        this.storeClassName(classDeclarationNode, lexicalScopeNode, isGlobalDeclaration);
        if (this.replaceableIdentifiers.has(lexicalScopeNode)) {
            this.replaceScopeCachedIdentifiers(classDeclarationNode, lexicalScopeNode);
        }
        else {
            this.replaceScopeIdentifiers(lexicalScopeNode);
        }
        return classDeclarationNode;
    }
    storeClassName(classDeclarationNode, lexicalScopeNode, isGlobalDeclaration) {
        if (isGlobalDeclaration) {
            this.identifierObfuscatingReplacer.storeGlobalName(classDeclarationNode.id.name, lexicalScopeNode);
        }
        else {
            this.identifierObfuscatingReplacer.storeLocalName(classDeclarationNode.id.name, lexicalScopeNode);
        }
    }
    replaceScopeCachedIdentifiers(classDeclarationNode, lexicalScopeNode) {
        const cachedReplaceableIdentifiersNamesMap = this.replaceableIdentifiers.get(lexicalScopeNode);
        const cachedReplaceableIdentifiers = cachedReplaceableIdentifiersNamesMap
            .get(classDeclarationNode.id.name);
        if (!cachedReplaceableIdentifiers) {
            return;
        }
        const cachedReplaceableIdentifierLength = cachedReplaceableIdentifiers.length;
        for (let i = 0; i < cachedReplaceableIdentifierLength; i++) {
            const replaceableIdentifier = cachedReplaceableIdentifiers[i];
            const newReplaceableIdentifier = this.identifierObfuscatingReplacer
                .replace(replaceableIdentifier.name, lexicalScopeNode);
            replaceableIdentifier.name = newReplaceableIdentifier.name;
            NodeMetadata_1.NodeMetadata.set(replaceableIdentifier, { renamedIdentifier: true });
        }
    }
    replaceScopeIdentifiers(lexicalScopeNode) {
        const storedReplaceableIdentifiersNamesMap = new Map();
        estraverse.replace(lexicalScopeNode, {
            enter: (node, parentNode) => {
                if (parentNode
                    && NodeGuards_1.NodeGuards.isReplaceableIdentifierNode(node, parentNode)
                    && !NodeMetadata_1.NodeMetadata.isRenamedIdentifier(node)) {
                    const newIdentifier = this.identifierObfuscatingReplacer
                        .replace(node.name, lexicalScopeNode);
                    const newIdentifierName = newIdentifier.name;
                    if (node.name !== newIdentifierName) {
                        node.name = newIdentifierName;
                        NodeMetadata_1.NodeMetadata.set(node, { renamedIdentifier: true });
                    }
                    else {
                        const storedReplaceableIdentifiers = storedReplaceableIdentifiersNamesMap.get(node.name) || [];
                        storedReplaceableIdentifiers.push(node);
                        storedReplaceableIdentifiersNamesMap.set(node.name, storedReplaceableIdentifiers);
                    }
                }
            }
        });
        this.replaceableIdentifiers.set(lexicalScopeNode, storedReplaceableIdentifiersNamesMap);
    }
};
ClassDeclarationTransformer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
], ClassDeclarationTransformer);
exports.ClassDeclarationTransformer = ClassDeclarationTransformer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/FunctionDeclarationTransformer.ts":
/*!******************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/FunctionDeclarationTransformer.ts ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");
const NodeType_1 = __webpack_require__(/*! ../../enums/node/NodeType */ "./src/enums/node/NodeType.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeLexicalScopeUtils_1 = __webpack_require__(/*! ../../node/NodeLexicalScopeUtils */ "./src/node/NodeLexicalScopeUtils.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
let FunctionDeclarationTransformer = class FunctionDeclarationTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(identifierObfuscatingReplacerFactory, randomGenerator, options) {
        super(randomGenerator, options);
        this.replaceableIdentifiers = new Map();
        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Obfuscating:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode
                            && NodeGuards_1.NodeGuards.isFunctionDeclarationNode(node)
                            && !NodeGuards_1.NodeGuards.isExportNamedDeclarationNode(parentNode)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(functionDeclarationNode, parentNode) {
        const lexicalScopeNode = NodeLexicalScopeUtils_1.NodeLexicalScopeUtils.getLexicalScope(parentNode);
        if (!lexicalScopeNode) {
            return functionDeclarationNode;
        }
        const isGlobalDeclaration = lexicalScopeNode.type === NodeType_1.NodeType.Program;
        if (!this.options.renameGlobals && isGlobalDeclaration) {
            return functionDeclarationNode;
        }
        this.storeFunctionName(functionDeclarationNode, lexicalScopeNode, isGlobalDeclaration);
        if (this.replaceableIdentifiers.has(lexicalScopeNode)) {
            this.replaceScopeCachedIdentifiers(functionDeclarationNode, lexicalScopeNode);
        }
        else {
            this.replaceScopeIdentifiers(lexicalScopeNode);
        }
        return functionDeclarationNode;
    }
    storeFunctionName(functionDeclarationNode, lexicalScopeNode, isGlobalDeclaration) {
        if (isGlobalDeclaration) {
            this.identifierObfuscatingReplacer.storeGlobalName(functionDeclarationNode.id.name, lexicalScopeNode);
        }
        else {
            this.identifierObfuscatingReplacer.storeLocalName(functionDeclarationNode.id.name, lexicalScopeNode);
        }
    }
    replaceScopeCachedIdentifiers(functionDeclarationNode, lexicalScopeNode) {
        const cachedReplaceableIdentifiersNamesMap = this.replaceableIdentifiers.get(lexicalScopeNode);
        const cachedReplaceableIdentifiers = cachedReplaceableIdentifiersNamesMap
            .get(functionDeclarationNode.id.name);
        if (!cachedReplaceableIdentifiers) {
            return;
        }
        const cachedReplaceableIdentifierLength = cachedReplaceableIdentifiers.length;
        for (let i = 0; i < cachedReplaceableIdentifierLength; i++) {
            const replaceableIdentifier = cachedReplaceableIdentifiers[i];
            const newReplaceableIdentifier = this.identifierObfuscatingReplacer
                .replace(replaceableIdentifier.name, lexicalScopeNode);
            replaceableIdentifier.name = newReplaceableIdentifier.name;
            NodeMetadata_1.NodeMetadata.set(replaceableIdentifier, { renamedIdentifier: true });
        }
    }
    replaceScopeIdentifiers(lexicalScopeNode) {
        const storedReplaceableIdentifiersNamesMap = new Map();
        estraverse.replace(lexicalScopeNode, {
            enter: (node, parentNode) => {
                if (parentNode
                    && (parentNode !== lexicalScopeNode)
                    && NodeGuards_1.NodeGuards.isReplaceableIdentifierNode(node, parentNode)
                    && !NodeMetadata_1.NodeMetadata.isRenamedIdentifier(node)) {
                    const newIdentifier = this.identifierObfuscatingReplacer
                        .replace(node.name, lexicalScopeNode);
                    const newIdentifierName = newIdentifier.name;
                    if (node.name !== newIdentifierName) {
                        node.name = newIdentifierName;
                        NodeMetadata_1.NodeMetadata.set(node, { renamedIdentifier: true });
                    }
                    else {
                        const storedReplaceableIdentifiers = storedReplaceableIdentifiersNamesMap.get(node.name) || [];
                        storedReplaceableIdentifiers.push(node);
                        storedReplaceableIdentifiersNamesMap.set(node.name, storedReplaceableIdentifiers);
                    }
                }
            }
        });
        this.replaceableIdentifiers.set(lexicalScopeNode, storedReplaceableIdentifiersNamesMap);
    }
};
FunctionDeclarationTransformer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
], FunctionDeclarationTransformer);
exports.FunctionDeclarationTransformer = FunctionDeclarationTransformer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/FunctionTransformer.ts":
/*!*******************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/FunctionTransformer.ts ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var FunctionTransformer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeLexicalScopeUtils_1 = __webpack_require__(/*! ../../node/NodeLexicalScopeUtils */ "./src/node/NodeLexicalScopeUtils.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
const NodeType_1 = __webpack_require__(/*! ../../enums/node/NodeType */ "./src/enums/node/NodeType.ts");
let FunctionTransformer = FunctionTransformer_1 = class FunctionTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(identifierObfuscatingReplacerFactory, randomGenerator, options) {
        super(randomGenerator, options);
        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    }
    static isProhibitedIdentifierOfPropertyNode(node, parentNode) {
        return NodeGuards_1.NodeGuards.isIdentifierNode(node)
            && !!parentNode
            && NodeGuards_1.NodeGuards.isPropertyNode(parentNode)
            && parentNode.key === node;
    }
    static isProhibitedIdentifierOfShorthandPropertyNode(node) {
        return NodeGuards_1.NodeGuards.isPropertyNode(node)
            && node.shorthand
            && NodeGuards_1.NodeGuards.isIdentifierNode(node.key);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Obfuscating:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode && NodeGuards_1.NodeGuards.isFunctionNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(functionNode, parentNode) {
        const lexicalScopeNode = NodeLexicalScopeUtils_1.NodeLexicalScopeUtils.getLexicalScope(functionNode);
        if (!lexicalScopeNode) {
            return functionNode;
        }
        this.storeFunctionParams(functionNode, lexicalScopeNode);
        this.replaceFunctionParams(functionNode, lexicalScopeNode);
        return functionNode;
    }
    isGlobalFunctionDeclarationIdentifier(node, parentNode) {
        if (!NodeGuards_1.NodeGuards.isFunctionDeclarationNode(parentNode) || parentNode.id !== node) {
            return false;
        }
        const lexicalScopeNode = NodeLexicalScopeUtils_1.NodeLexicalScopeUtils.getLexicalScopes(parentNode)[1];
        if (!lexicalScopeNode) {
            return false;
        }
        const isGlobalDeclaration = lexicalScopeNode.type === NodeType_1.NodeType.Program;
        return !this.options.renameGlobals && isGlobalDeclaration;
    }
    storeFunctionParams(functionNode, lexicalScopeNode) {
        const visitor = {
            enter: (node, parentNode) => {
                if (FunctionTransformer_1.isProhibitedIdentifierOfPropertyNode(node, parentNode)) {
                    return;
                }
                if (NodeGuards_1.NodeGuards.isAssignmentPatternNode(node) && NodeGuards_1.NodeGuards.isIdentifierNode(node.left)) {
                    this.identifierObfuscatingReplacer.storeLocalName(node.left.name, lexicalScopeNode);
                    return estraverse.VisitorOption.Skip;
                }
                if (NodeGuards_1.NodeGuards.isIdentifierNode(node)) {
                    this.identifierObfuscatingReplacer.storeLocalName(node.name, lexicalScopeNode);
                }
            }
        };
        functionNode.params.forEach((paramsNode) => {
            estraverse.traverse(paramsNode, visitor);
        });
    }
    replaceFunctionParams(functionNode, lexicalScopeNode, ignoredIdentifierNamesSet = new Set()) {
        const visitor = {
            enter: (node, parentNode) => {
                if (NodeGuards_1.NodeGuards.isFunctionNode(node) && node !== functionNode) {
                    this.replaceFunctionParams(node, lexicalScopeNode, new Set(ignoredIdentifierNamesSet));
                    return estraverse.VisitorOption.Skip;
                }
                if (FunctionTransformer_1.isProhibitedIdentifierOfShorthandPropertyNode(node)) {
                    ignoredIdentifierNamesSet.add(node.key.name);
                    return;
                }
                if (parentNode
                    && NodeGuards_1.NodeGuards.isReplaceableIdentifierNode(node, parentNode)
                    && !NodeMetadata_1.NodeMetadata.isRenamedIdentifier(node)
                    && !ignoredIdentifierNamesSet.has(node.name)) {
                    if (this.isGlobalFunctionDeclarationIdentifier(node, parentNode)) {
                        return;
                    }
                    const newIdentifier = this.identifierObfuscatingReplacer
                        .replace(node.name, lexicalScopeNode);
                    const newIdentifierName = newIdentifier.name;
                    if (node.name !== newIdentifierName) {
                        node.name = newIdentifierName;
                        NodeMetadata_1.NodeMetadata.set(node, { renamedIdentifier: true });
                    }
                }
            }
        };
        estraverse.replace(functionNode, visitor);
    }
};
FunctionTransformer = FunctionTransformer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
], FunctionTransformer);
exports.FunctionTransformer = FunctionTransformer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/ImportDeclarationTransformer.ts":
/*!****************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/ImportDeclarationTransformer.ts ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ImportDeclarationTransformer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeLexicalScopeUtils_1 = __webpack_require__(/*! ../../node/NodeLexicalScopeUtils */ "./src/node/NodeLexicalScopeUtils.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
let ImportDeclarationTransformer = ImportDeclarationTransformer_1 = class ImportDeclarationTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(identifierObfuscatingReplacerFactory, randomGenerator, options) {
        super(randomGenerator, options);
        this.replaceableIdentifiers = new Map();
        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    }
    static isProhibitedImportSpecifierNode(importSpecifierNode) {
        return NodeGuards_1.NodeGuards.isImportSpecifierNode(importSpecifierNode)
            && importSpecifierNode.imported.name === importSpecifierNode.local.name;
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Obfuscating:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode && NodeGuards_1.NodeGuards.isImportDeclarationNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(importDeclarationNode, parentNode) {
        const lexicalScopeNode = NodeLexicalScopeUtils_1.NodeLexicalScopeUtils.getLexicalScope(importDeclarationNode);
        if (!lexicalScopeNode) {
            return importDeclarationNode;
        }
        this.storeImportSpecifierNames(importDeclarationNode, lexicalScopeNode);
        if (this.replaceableIdentifiers.has(lexicalScopeNode)) {
            this.replaceScopeCachedIdentifiers(lexicalScopeNode);
        }
        else {
            this.replaceScopeIdentifiers(lexicalScopeNode);
        }
        return importDeclarationNode;
    }
    storeImportSpecifierNames(importDeclarationNode, lexicalScopeNode) {
        importDeclarationNode.specifiers.forEach((importSpecifierNode) => {
            if (ImportDeclarationTransformer_1.isProhibitedImportSpecifierNode(importSpecifierNode)) {
                return;
            }
            this.identifierObfuscatingReplacer.storeGlobalName(importSpecifierNode.local.name, lexicalScopeNode);
        });
    }
    replaceScopeCachedIdentifiers(lexicalScopeNode) {
        const cachedReplaceableIdentifiers = this.replaceableIdentifiers.get(lexicalScopeNode);
        cachedReplaceableIdentifiers.forEach((replaceableIdentifier) => {
            const newReplaceableIdentifier = this.identifierObfuscatingReplacer
                .replace(replaceableIdentifier.name, lexicalScopeNode);
            replaceableIdentifier.name = newReplaceableIdentifier.name;
            NodeMetadata_1.NodeMetadata.set(replaceableIdentifier, { renamedIdentifier: true });
        });
    }
    replaceScopeIdentifiers(lexicalScopeNode) {
        const storedReplaceableIdentifiers = [];
        estraverse.replace(lexicalScopeNode, {
            enter: (node, parentNode) => {
                if (parentNode
                    && NodeGuards_1.NodeGuards.isReplaceableIdentifierNode(node, parentNode)
                    && !NodeMetadata_1.NodeMetadata.isRenamedIdentifier(node)) {
                    const newIdentifier = this.identifierObfuscatingReplacer
                        .replace(node.name, lexicalScopeNode);
                    const newIdentifierName = newIdentifier.name;
                    if (node.name !== newIdentifierName) {
                        node.name = newIdentifierName;
                        NodeMetadata_1.NodeMetadata.set(node, { renamedIdentifier: true });
                    }
                    else {
                        storedReplaceableIdentifiers.push(node);
                    }
                }
            }
        });
        this.replaceableIdentifiers.set(lexicalScopeNode, storedReplaceableIdentifiers);
    }
};
ImportDeclarationTransformer = ImportDeclarationTransformer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
], ImportDeclarationTransformer);
exports.ImportDeclarationTransformer = ImportDeclarationTransformer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/LabeledStatementTransformer.ts":
/*!***************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/LabeledStatementTransformer.ts ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
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
        this.identifierObfuscatingReplacer.storeLocalName(labeledStatementNode.label.name, lexicalScopeNode);
    }
    replaceLabeledStatementName(labeledStatementNode, lexicalScopeNode) {
        estraverse.replace(labeledStatementNode, {
            enter: (node, parentNode) => {
                if (parentNode && NodeGuards_1.NodeGuards.isLabelIdentifierNode(node, parentNode)) {
                    const newIdentifier = this.identifierObfuscatingReplacer
                        .replace(node.name, lexicalScopeNode);
                    node.name = newIdentifier.name;
                }
            }
        });
    }
};
LabeledStatementTransformer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const LiteralObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
const NodeUtils_1 = __webpack_require__(/*! ../../node/NodeUtils */ "./src/node/NodeUtils.ts");
let LiteralTransformer = class LiteralTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(literalObfuscatingReplacerFactory, randomGenerator, options) {
        super(randomGenerator, options);
        this.literalObfuscatingReplacerFactory = literalObfuscatingReplacerFactory;
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Obfuscating:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode && NodeGuards_1.NodeGuards.isLiteralNode(node) && !NodeMetadata_1.NodeMetadata.isReplacedLiteral(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(literalNode, parentNode) {
        if (this.isProhibitedNode(literalNode, parentNode)) {
            return literalNode;
        }
        let newLiteralNode;
        switch (typeof literalNode.value) {
            case 'boolean':
                newLiteralNode = this.literalObfuscatingReplacerFactory(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.BooleanLiteralObfuscatingReplacer).replace(literalNode.value);
                break;
            case 'number':
                newLiteralNode = this.literalObfuscatingReplacerFactory(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.NumberLiteralObfuscatingReplacer).replace(literalNode.value);
                break;
            case 'string':
                newLiteralNode = this.literalObfuscatingReplacerFactory(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.StringLiteralObfuscatingReplacer).replace(literalNode.value);
                break;
            default:
                newLiteralNode = literalNode;
        }
        NodeUtils_1.NodeUtils.parentizeNode(newLiteralNode, parentNode);
        return newLiteralNode;
    }
    isProhibitedNode(literalNode, parentNode) {
        if (NodeGuards_1.NodeGuards.isPropertyNode(parentNode) && parentNode.key === literalNode) {
            return true;
        }
        if (NodeGuards_1.NodeGuards.isImportDeclarationNode(parentNode)) {
            return true;
        }
        return false;
    }
};
LiteralTransformer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatingReplacer)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
], LiteralTransformer);
exports.LiteralTransformer = LiteralTransformer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/VariableDeclarationTransformer.ts":
/*!******************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/VariableDeclarationTransformer.ts ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
const IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");
const NodeType_1 = __webpack_require__(/*! ../../enums/node/NodeType */ "./src/enums/node/NodeType.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
const NodeLexicalScopeUtils_1 = __webpack_require__(/*! ../../node/NodeLexicalScopeUtils */ "./src/node/NodeLexicalScopeUtils.ts");
const NodeBlockLexicalScopeUtils_1 = __webpack_require__(/*! ../../node/NodeBlockLexicalScopeUtils */ "./src/node/NodeBlockLexicalScopeUtils.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
let VariableDeclarationTransformer = class VariableDeclarationTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(identifierObfuscatingReplacerFactory, randomGenerator, options) {
        super(randomGenerator, options);
        this.replaceableIdentifiers = new Map();
        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Obfuscating:
                return {
                    enter: (node, parentNode) => {
                        if (parentNode
                            && NodeGuards_1.NodeGuards.isVariableDeclarationNode(node)
                            && !NodeGuards_1.NodeGuards.isExportNamedDeclarationNode(parentNode)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(variableDeclarationNode, parentNode) {
        const lexicalScopeNode = variableDeclarationNode.kind === 'var'
            ? NodeLexicalScopeUtils_1.NodeLexicalScopeUtils.getLexicalScope(variableDeclarationNode)
            : NodeBlockLexicalScopeUtils_1.NodeBlockLexicalScopeUtils.getLexicalScope(variableDeclarationNode);
        if (!lexicalScopeNode) {
            return variableDeclarationNode;
        }
        const isGlobalDeclaration = lexicalScopeNode.type === NodeType_1.NodeType.Program;
        if (!this.options.renameGlobals && isGlobalDeclaration) {
            return variableDeclarationNode;
        }
        const scopeNode = variableDeclarationNode.kind === 'var'
            ? lexicalScopeNode
            : parentNode;
        this.storeVariableNames(variableDeclarationNode, lexicalScopeNode, isGlobalDeclaration);
        if (this.replaceableIdentifiers.has(scopeNode)) {
            this.replaceScopeCachedIdentifiers(variableDeclarationNode, lexicalScopeNode, scopeNode);
        }
        else {
            this.replaceScopeIdentifiers(scopeNode, lexicalScopeNode);
        }
        return variableDeclarationNode;
    }
    storeVariableNames(variableDeclarationNode, lexicalScopeNode, isGlobalDeclaration) {
        this.traverseDeclarationIdentifiers(variableDeclarationNode, (identifierNode) => {
            if (isGlobalDeclaration) {
                this.identifierObfuscatingReplacer.storeGlobalName(identifierNode.name, lexicalScopeNode);
            }
            else {
                this.identifierObfuscatingReplacer.storeLocalName(identifierNode.name, lexicalScopeNode);
            }
        });
    }
    replaceScopeCachedIdentifiers(variableDeclarationNode, lexicalScopeNode, scopeNode) {
        const cachedReplaceableIdentifiersNamesMap = this.replaceableIdentifiers.get(scopeNode);
        const identifierNames = [];
        this.traverseDeclarationIdentifiers(variableDeclarationNode, (identifierNode) => {
            identifierNames.push(identifierNode.name);
        });
        identifierNames.forEach((identifierName) => {
            const cachedReplaceableIdentifiers = cachedReplaceableIdentifiersNamesMap.get(identifierName);
            if (!cachedReplaceableIdentifiers) {
                return;
            }
            const cachedReplaceableIdentifierLength = cachedReplaceableIdentifiers.length;
            for (let i = 0; i < cachedReplaceableIdentifierLength; i++) {
                const replaceableIdentifier = cachedReplaceableIdentifiers[i];
                if (identifierName !== replaceableIdentifier.name) {
                    continue;
                }
                const newReplaceableIdentifier = this.identifierObfuscatingReplacer
                    .replace(replaceableIdentifier.name, lexicalScopeNode);
                replaceableIdentifier.name = newReplaceableIdentifier.name;
                NodeMetadata_1.NodeMetadata.set(replaceableIdentifier, { renamedIdentifier: true });
            }
        });
    }
    replaceScopeIdentifiers(scopeNode, lexicalScopeNode) {
        const storedReplaceableIdentifiersNamesMap = new Map();
        estraverse.replace(scopeNode, {
            enter: (node, parentNode) => {
                if (parentNode
                    && NodeGuards_1.NodeGuards.isReplaceableIdentifierNode(node, parentNode)
                    && !NodeMetadata_1.NodeMetadata.isRenamedIdentifier(node)) {
                    const newIdentifier = this.identifierObfuscatingReplacer
                        .replace(node.name, lexicalScopeNode);
                    const newIdentifierName = newIdentifier.name;
                    if (node.name !== newIdentifierName) {
                        node.name = newIdentifierName;
                        NodeMetadata_1.NodeMetadata.set(node, { renamedIdentifier: true });
                    }
                    else {
                        const storedReplaceableIdentifiers = storedReplaceableIdentifiersNamesMap.get(node.name) || [];
                        storedReplaceableIdentifiers.push(node);
                        storedReplaceableIdentifiersNamesMap.set(node.name, storedReplaceableIdentifiers);
                    }
                }
            }
        });
        this.replaceableIdentifiers.set(scopeNode, storedReplaceableIdentifiersNamesMap);
    }
    traverseDeclarationIdentifiers(variableDeclarationNode, callback) {
        variableDeclarationNode.declarations
            .forEach((declarationNode) => {
            estraverse.traverse(declarationNode.id, {
                enter: (node) => {
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
};
VariableDeclarationTransformer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
], VariableDeclarationTransformer);
exports.VariableDeclarationTransformer = VariableDeclarationTransformer;


/***/ }),

/***/ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts":
/*!*************************************************************************************************************!*\
  !*** ./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
let AbstractObfuscatingReplacer = class AbstractObfuscatingReplacer {
    constructor(options) {
        this.options = options;
    }
};
AbstractObfuscatingReplacer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const AbstractObfuscatingReplacer_1 = __webpack_require__(/*! ../AbstractObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
let BaseIdentifierObfuscatingReplacer = class BaseIdentifierObfuscatingReplacer extends AbstractObfuscatingReplacer_1.AbstractObfuscatingReplacer {
    constructor(identifierNamesGeneratorFactory, options) {
        super(options);
        this.blockScopesMap = new Map();
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
    }
    replace(nodeValue, lexicalScopeNode) {
        if (this.blockScopesMap.has(lexicalScopeNode)) {
            const namesMap = this.blockScopesMap.get(lexicalScopeNode);
            if (namesMap.has(nodeValue)) {
                nodeValue = namesMap.get(nodeValue);
            }
        }
        return NodeFactory_1.NodeFactory.identifierNode(nodeValue);
    }
    storeGlobalName(nodeName, lexicalScopeNode) {
        if (this.isReservedName(nodeName)) {
            return;
        }
        const identifierName = this.identifierNamesGenerator.generateWithPrefix();
        if (!this.blockScopesMap.has(lexicalScopeNode)) {
            this.blockScopesMap.set(lexicalScopeNode, new Map());
        }
        const namesMap = this.blockScopesMap.get(lexicalScopeNode);
        namesMap.set(nodeName, identifierName);
    }
    storeLocalName(nodeName, lexicalScopeNode) {
        if (this.isReservedName(nodeName)) {
            return;
        }
        const identifierName = this.identifierNamesGenerator.generate();
        if (!this.blockScopesMap.has(lexicalScopeNode)) {
            this.blockScopesMap.set(lexicalScopeNode, new Map());
        }
        const namesMap = this.blockScopesMap.get(lexicalScopeNode);
        namesMap.set(nodeName, identifierName);
    }
    preserveName(name) {
        this.identifierNamesGenerator.preserveName(name);
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
BaseIdentifierObfuscatingReplacer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object])
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

var BooleanLiteralObfuscatingReplacer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
    replace(nodeValue) {
        return nodeValue
            ? BooleanLiteralObfuscatingReplacer_1.getTrueUnaryExpressionNode()
            : BooleanLiteralObfuscatingReplacer_1.getFalseUnaryExpressionNode();
    }
};
BooleanLiteralObfuscatingReplacer = BooleanLiteralObfuscatingReplacer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const AbstractObfuscatingReplacer_1 = __webpack_require__(/*! ../AbstractObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NumberUtils_1 = __webpack_require__(/*! ../../../../utils/NumberUtils */ "./src/utils/NumberUtils.ts");
const Utils_1 = __webpack_require__(/*! ../../../../utils/Utils */ "./src/utils/Utils.ts");
let NumberLiteralObfuscatingReplacer = class NumberLiteralObfuscatingReplacer extends AbstractObfuscatingReplacer_1.AbstractObfuscatingReplacer {
    constructor(options) {
        super(options);
        this.numberLiteralCache = new Map();
    }
    replace(nodeValue) {
        let rawValue;
        if (this.numberLiteralCache.has(nodeValue)) {
            rawValue = this.numberLiteralCache.get(nodeValue);
        }
        else {
            if (!NumberUtils_1.NumberUtils.isCeil(nodeValue)) {
                rawValue = String(nodeValue);
            }
            else {
                rawValue = `${Utils_1.Utils.hexadecimalPrefix}${NumberUtils_1.NumberUtils.toHex(nodeValue)}`;
            }
            this.numberLiteralCache.set(nodeValue, rawValue);
        }
        return NodeFactory_1.NodeFactory.literalNode(nodeValue, rawValue);
    }
};
NumberLiteralObfuscatingReplacer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object])
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

var StringLiteralObfuscatingReplacer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const StringArrayEncoding_1 = __webpack_require__(/*! ../../../../enums/StringArrayEncoding */ "./src/enums/StringArrayEncoding.ts");
const AbstractObfuscatingReplacer_1 = __webpack_require__(/*! ../AbstractObfuscatingReplacer */ "./src/node-transformers/obfuscating-transformers/obfuscating-replacers/AbstractObfuscatingReplacer.ts");
const NodeMetadata_1 = __webpack_require__(/*! ../../../../node/NodeMetadata */ "./src/node/NodeMetadata.ts");
const NodeFactory_1 = __webpack_require__(/*! ../../../../node/NodeFactory */ "./src/node/NodeFactory.ts");
const NumberUtils_1 = __webpack_require__(/*! ../../../../utils/NumberUtils */ "./src/utils/NumberUtils.ts");
const Utils_1 = __webpack_require__(/*! ../../../../utils/Utils */ "./src/utils/Utils.ts");
let StringLiteralObfuscatingReplacer = StringLiteralObfuscatingReplacer_1 = class StringLiteralObfuscatingReplacer extends AbstractObfuscatingReplacer_1.AbstractObfuscatingReplacer {
    constructor(stringArrayStorage, escapeSequenceEncoder, randomGenerator, cryptUtils, options) {
        super(options);
        this.nodesCache = new Map();
        this.stringLiteralHexadecimalIndexCache = new Map();
        this.stringArrayStorage = stringArrayStorage;
        this.escapeSequenceEncoder = escapeSequenceEncoder;
        this.randomGenerator = randomGenerator;
        this.cryptUtils = cryptUtils;
        this.rc4Keys = this.randomGenerator.getRandomGenerator()
            .n(() => this.randomGenerator.getRandomGenerator().string({
            length: StringLiteralObfuscatingReplacer_1.rc4KeyLength
        }), StringLiteralObfuscatingReplacer_1.rc4KeysCount);
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
    replace(nodeValue) {
        if (this.isReservedString(nodeValue)) {
            return this.replaceWithReservedLiteralNode(nodeValue);
        }
        const useStringArray = this.canUseStringArray(nodeValue);
        const cacheKey = `${nodeValue}-${String(useStringArray)}`;
        const useCacheValue = this.nodesCache.has(cacheKey) && this.options.stringArrayEncoding !== StringArrayEncoding_1.StringArrayEncoding.Rc4;
        if (useCacheValue) {
            return this.nodesCache.get(cacheKey);
        }
        const resultNode = useStringArray
            ? this.replaceWithStringArrayCallNode(nodeValue)
            : this.replaceWithLiteralNode(nodeValue);
        this.nodesCache.set(cacheKey, resultNode);
        return resultNode;
    }
    canUseStringArray(nodeValue) {
        return (this.options.stringArray &&
            nodeValue.length >= StringLiteralObfuscatingReplacer_1.minimumLengthForStringArray &&
            this.randomGenerator.getMathRandom() <= this.options.stringArrayThreshold);
    }
    getStringArrayHexadecimalIndex(value, stringArrayStorageLength) {
        if (this.stringLiteralHexadecimalIndexCache.has(value)) {
            return {
                fromCache: true,
                index: this.stringLiteralHexadecimalIndexCache.get(value)
            };
        }
        const hexadecimalRawIndex = NumberUtils_1.NumberUtils.toHex(stringArrayStorageLength);
        const hexadecimalIndex = `${Utils_1.Utils.hexadecimalPrefix}${hexadecimalRawIndex}`;
        this.stringLiteralHexadecimalIndexCache.set(value, hexadecimalIndex);
        return {
            fromCache: false,
            index: hexadecimalIndex
        };
    }
    getEncodedValue(value) {
        let encodedValue;
        let key = null;
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
        return { encodedValue, key };
    }
    replaceWithLiteralNode(value) {
        return NodeFactory_1.NodeFactory.literalNode(this.escapeSequenceEncoder.encode(value, this.options.unicodeEscapeSequence));
    }
    replaceWithReservedLiteralNode(value) {
        return NodeFactory_1.NodeFactory.literalNode(this.escapeSequenceEncoder.encode(value, false));
    }
    replaceWithStringArrayCallNode(value) {
        const { encodedValue, key } = this.getEncodedValue(value);
        const escapedValue = this.escapeSequenceEncoder.encode(encodedValue, this.options.unicodeEscapeSequence);
        const stringArrayStorageLength = this.stringArrayStorage.getLength();
        const stringArrayStorageCallsWrapperName = this.stringArrayStorage.getStorageId().split('|')[1];
        const { fromCache, index } = this.getStringArrayHexadecimalIndex(escapedValue, stringArrayStorageLength);
        if (!fromCache) {
            this.stringArrayStorage.set(stringArrayStorageLength, escapedValue);
        }
        const callExpressionArgs = [
            StringLiteralObfuscatingReplacer_1.getHexadecimalLiteralNode(index)
        ];
        if (key) {
            callExpressionArgs.push(StringLiteralObfuscatingReplacer_1.getRc4KeyLiteralNode(this.escapeSequenceEncoder.encode(key, this.options.unicodeEscapeSequence)));
        }
        const stringArrayIdentifierNode = NodeFactory_1.NodeFactory.identifierNode(stringArrayStorageCallsWrapperName);
        NodeMetadata_1.NodeMetadata.set(stringArrayIdentifierNode, { renamedIdentifier: true });
        return NodeFactory_1.NodeFactory.callExpressionNode(stringArrayIdentifierNode, callExpressionArgs);
    }
    isReservedString(value) {
        if (!this.options.reservedStrings.length) {
            return false;
        }
        return this.options.reservedStrings
            .some((reservedString) => {
            return new RegExp(reservedString, 'g').exec(value) !== null;
        });
    }
};
StringLiteralObfuscatingReplacer.minimumLengthForStringArray = 3;
StringLiteralObfuscatingReplacer.rc4KeyLength = 4;
StringLiteralObfuscatingReplacer.rc4KeysCount = 50;
StringLiteralObfuscatingReplacer = StringLiteralObfuscatingReplacer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TStringArrayStorage)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils)),
    tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object, Object])
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

var CommentsTransformer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
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
    transformNode(programNode) {
        if (programNode.comments) {
            const comments = this.transformComments(programNode.comments);
            estraverse.traverse(programNode, {
                enter: (node) => {
                    if (comments.length === 0) {
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
                programNode.trailingComments = comments.reverse();
            }
        }
        return programNode;
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
CommentsTransformer = CommentsTransformer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const ObfuscationEvent_1 = __webpack_require__(/*! ../../enums/event-emitters/ObfuscationEvent */ "./src/enums/event-emitters/ObfuscationEvent.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let CustomNodesTransformer = class CustomNodesTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(stackTraceAnalyzer, obfuscationEventEmitter, customNodeGroupStorage, randomGenerator, options) {
        super(randomGenerator, options);
        this.stackTraceData = [];
        this.stackTraceAnalyzer = stackTraceAnalyzer;
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
        this.stackTraceData = this.stackTraceAnalyzer.analyze(node);
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
        this.obfuscationEventEmitter.emit(ObfuscationEvent_1.ObfuscationEvent.BeforeObfuscation, node, this.stackTraceData);
    }
    appendCustomNodesAfterObfuscation(node, parentNode) {
        this.obfuscationEventEmitter.emit(ObfuscationEvent_1.ObfuscationEvent.AfterObfuscation, node, this.stackTraceData);
    }
};
CustomNodesTransformer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IStackTraceAnalyzer)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TCustomNodeGroupStorage)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object, Object])
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

var EvalCallExpressionTransformer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const js_string_escape_1 = tslib_1.__importDefault(__webpack_require__(/*! js-string-escape */ "js-string-escape"));
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
EvalCallExpressionTransformer = EvalCallExpressionTransformer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
        if (NodeGuards_1.NodeGuards.isIdentifierNode(node)) {
            NodeMetadata_1.NodeMetadata.set(node, { renamedIdentifier: false });
        }
        if (NodeGuards_1.NodeGuards.isLiteralNode(node)) {
            NodeMetadata_1.NodeMetadata.set(node, { replacedLiteral: false });
        }
        return node;
    }
};
MetadataTransformer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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

var ObfuscatingGuardsTransformer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
    ObfuscatingGuard_1.ObfuscatingGuard.BlackListNodeGuard,
    ObfuscatingGuard_1.ObfuscatingGuard.ConditionalCommentNodeGuard
];
ObfuscatingGuardsTransformer = ObfuscatingGuardsTransformer_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeGuard)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
ParentificationTransformer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const IdentifierObfuscatingReplacer_1 = __webpack_require__(/*! ../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer */ "./src/enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer.ts");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const TransformationStage_1 = __webpack_require__(/*! ../../enums/node-transformers/TransformationStage */ "./src/enums/node-transformers/TransformationStage.ts");
const AbstractNodeTransformer_1 = __webpack_require__(/*! ../AbstractNodeTransformer */ "./src/node-transformers/AbstractNodeTransformer.ts");
const NodeGuards_1 = __webpack_require__(/*! ../../node/NodeGuards */ "./src/node/NodeGuards.ts");
let VariablePreserveTransformer = class VariablePreserveTransformer extends AbstractNodeTransformer_1.AbstractNodeTransformer {
    constructor(identifierObfuscatingReplacerFactory, randomGenerator, options) {
        super(randomGenerator, options);
        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    }
    getVisitor(transformationStage) {
        switch (transformationStage) {
            case TransformationStage_1.TransformationStage.Preparing:
                return {
                    enter: (node, parentNode) => {
                        if (NodeGuards_1.NodeGuards.isIdentifierNode(node)
                            && parentNode
                            && (NodeGuards_1.NodeGuards.parentNodeIsPropertyNode(node, parentNode)
                                || NodeGuards_1.NodeGuards.parentNodeIsMemberExpressionNode(node, parentNode)
                                || NodeGuards_1.NodeGuards.parentNodeIsMethodDefinitionNode(node, parentNode)
                                || NodeGuards_1.NodeGuards.isLabelIdentifierNode(node, parentNode))) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };
            default:
                return null;
        }
    }
    transformNode(node, parentNode) {
        this.identifierObfuscatingReplacer.preserveName(node.name);
        return node;
    }
};
VariablePreserveTransformer = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

var BlackListObfuscatingGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
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
BlackListObfuscatingGuard = BlackListObfuscatingGuard_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__metadata("design:paramtypes", [])
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

var ConditionalCommentObfuscatingGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
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
ConditionalCommentObfuscatingGuard = ConditionalCommentObfuscatingGuard_1 = tslib_1.__decorate([
    inversify_1.injectable()
], ConditionalCommentObfuscatingGuard);
exports.ConditionalCommentObfuscatingGuard = ConditionalCommentObfuscatingGuard;


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
    static appendToOptimalBlockScope(stackTraceData, nodeWithStatements, bodyStatements, index = 0) {
        const targetBlockScope = stackTraceData.length
            ? NodeAppender.getOptimalBlockScope(stackTraceData, index)
            : nodeWithStatements;
        NodeAppender.prepend(targetBlockScope, bodyStatements);
    }
    static getOptimalBlockScope(stackTraceData, index, deep = Infinity) {
        const firstCall = stackTraceData[index];
        if (deep <= 0) {
            throw new Error('Invalid `deep` argument value. Value should be bigger then 0.');
        }
        if (deep > 1 && firstCall.stackTrace.length) {
            return NodeAppender.getOptimalBlockScope(firstCall.stackTrace, 0, --deep);
        }
        else {
            return firstCall.callee;
        }
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

/***/ "./src/node/NodeBlockLexicalScopeUtils.ts":
/*!************************************************!*\
  !*** ./src/node/NodeBlockLexicalScopeUtils.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const NodeGuards_1 = __webpack_require__(/*! ./NodeGuards */ "./src/node/NodeGuards.ts");
class NodeBlockLexicalScopeUtils {
    static getLexicalScope(node) {
        return NodeBlockLexicalScopeUtils.getLexicalScopesRecursive(node, 1)[0];
    }
    static getLexicalScopes(node) {
        return NodeBlockLexicalScopeUtils.getLexicalScopesRecursive(node);
    }
    static getLexicalScopesRecursive(node, maxSize = Infinity, nodesWithLexicalScope = [], depth = 0) {
        if (nodesWithLexicalScope.length >= maxSize) {
            return nodesWithLexicalScope;
        }
        const parentNode = node.parentNode;
        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }
        if (NodeGuards_1.NodeGuards.isNodeWithBlockLexicalScope(node)) {
            nodesWithLexicalScope.push(node);
        }
        if (node !== parentNode) {
            return NodeBlockLexicalScopeUtils.getLexicalScopesRecursive(parentNode, maxSize, nodesWithLexicalScope, ++depth);
        }
        return nodesWithLexicalScope;
    }
}
exports.NodeBlockLexicalScopeUtils = NodeBlockLexicalScopeUtils;


/***/ }),

/***/ "./src/node/NodeFactory.ts":
/*!*********************************!*\
  !*** ./src/node/NodeFactory.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const escodegen = tslib_1.__importStar(__webpack_require__(/*! escodegen-wallaby */ "escodegen-wallaby"));
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
    static isCatchClauseNode(node) {
        return node.type === NodeType_1.NodeType.CatchClause;
    }
    static isClassDeclarationNode(node) {
        return node.type === NodeType_1.NodeType.ClassDeclaration;
    }
    static isContinueStatementNode(node) {
        return node.type === NodeType_1.NodeType.ContinueStatement;
    }
    static isExportNamedDeclarationNode(node) {
        return node.type === NodeType_1.NodeType.ExportNamedDeclaration;
    }
    static isExpressionStatementNode(node) {
        return node.type === NodeType_1.NodeType.ExpressionStatement;
    }
    static isFunctionNode(node) {
        return NodeGuards.isFunctionDeclarationNode(node) ||
            NodeGuards.isFunctionExpressionNode(node) ||
            NodeGuards.isArrowFunctionExpressionNode(node);
    }
    static isFunctionDeclarationNode(node) {
        return node.type === NodeType_1.NodeType.FunctionDeclaration;
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
    static parentNodeIsPropertyNode(node, parentNode) {
        return NodeGuards.isPropertyNode(parentNode)
            && !parentNode.computed
            && parentNode.key === node;
    }
    static parentNodeIsMemberExpressionNode(node, parentNode) {
        return (NodeGuards.isMemberExpressionNode(parentNode)
            && !parentNode.computed
            && parentNode.property === node);
    }
    static parentNodeIsMethodDefinitionNode(node, parentNode) {
        return NodeGuards.isMethodDefinitionNode(parentNode)
            && !parentNode.computed;
    }
    static isReplaceableIdentifierNode(node, parentNode) {
        return NodeGuards.isIdentifierNode(node)
            && !NodeGuards.parentNodeIsPropertyNode(node, parentNode)
            && !NodeGuards.parentNodeIsMemberExpressionNode(node, parentNode)
            && !NodeGuards.parentNodeIsMethodDefinitionNode(node, parentNode)
            && !NodeGuards.isLabelIdentifierNode(node, parentNode);
    }
    static isRestElementNode(node) {
        return node.type === NodeType_1.NodeType.RestElement;
    }
    static isReturnStatementNode(node) {
        return node.type === NodeType_1.NodeType.ReturnStatement;
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
        return node.type === NodeType_1.NodeType.ExpressionStatement && node.directive === 'use strict';
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
        node.metadata = Object.assign(node.metadata || {}, metadata);
    }
    static get(node, metadataKey) {
        return node.metadata !== undefined
            ? node.metadata[metadataKey]
            : undefined;
    }
    static isIgnoredNode(node) {
        return NodeMetadata.get(node, 'ignoredNode') === true;
    }
    static isRenamedIdentifier(identifierNode) {
        return NodeMetadata.get(identifierNode, 'renamedIdentifier') === true;
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const escodegen = tslib_1.__importStar(__webpack_require__(/*! escodegen-wallaby */ "escodegen-wallaby"));
const espree = tslib_1.__importStar(__webpack_require__(/*! espree */ "espree"));
const estraverse = tslib_1.__importStar(__webpack_require__(/*! estraverse */ "estraverse"));
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
        const structure = espree.parse(code, { sourceType: 'script' });
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
        node.parentNode = parentNode || node;
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

/***/ "./src/options/Options.ts":
/*!********************************!*\
  !*** ./src/options/Options.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Options_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const IdentifierNamesGenerator_1 = __webpack_require__(/*! ../enums/generators/identifier-names-generators/IdentifierNamesGenerator */ "./src/enums/generators/identifier-names-generators/IdentifierNamesGenerator.ts");
const ObfuscationTarget_1 = __webpack_require__(/*! ../enums/ObfuscationTarget */ "./src/enums/ObfuscationTarget.ts");
const SourceMapMode_1 = __webpack_require__(/*! ../enums/source-map/SourceMapMode */ "./src/enums/source-map/SourceMapMode.ts");
const StringArrayEncoding_1 = __webpack_require__(/*! ../enums/StringArrayEncoding */ "./src/enums/StringArrayEncoding.ts");
const Default_1 = __webpack_require__(/*! ./presets/Default */ "./src/options/presets/Default.ts");
const ValidationErrorsFormatter_1 = __webpack_require__(/*! ./ValidationErrorsFormatter */ "./src/options/ValidationErrorsFormatter.ts");
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
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "compact", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "controlFlowFlattening", void 0);
tslib_1.__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(1),
    tslib_1.__metadata("design:type", Number)
], Options.prototype, "controlFlowFlatteningThreshold", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "deadCodeInjection", void 0);
tslib_1.__decorate([
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], Options.prototype, "deadCodeInjectionThreshold", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "debugProtection", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "debugProtectionInterval", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "disableConsoleOutput", void 0);
tslib_1.__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ArrayUnique(),
    class_validator_1.IsString({
        each: true
    }),
    tslib_1.__metadata("design:type", Array)
], Options.prototype, "domainLock", void 0);
tslib_1.__decorate([
    class_validator_1.IsIn([
        IdentifierNamesGenerator_1.IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
        IdentifierNamesGenerator_1.IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
        IdentifierNamesGenerator_1.IdentifierNamesGenerator.MangledIdentifierNamesGenerator
    ]),
    tslib_1.__metadata("design:type", String)
], Options.prototype, "identifierNamesGenerator", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], Options.prototype, "identifiersPrefix", void 0);
tslib_1.__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ArrayUnique(),
    class_validator_1.IsString({
        each: true
    }),
    class_validator_1.ValidateIf((options) => options.identifierNamesGenerator === IdentifierNamesGenerator_1.IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator),
    class_validator_1.ArrayNotEmpty(),
    tslib_1.__metadata("design:type", Array)
], Options.prototype, "identifiersDictionary", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], Options.prototype, "inputFileName", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "log", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "renameGlobals", void 0);
tslib_1.__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ArrayUnique(),
    class_validator_1.IsString({
        each: true
    }),
    tslib_1.__metadata("design:type", Array)
], Options.prototype, "reservedNames", void 0);
tslib_1.__decorate([
    class_validator_1.IsArray(),
    class_validator_1.ArrayUnique(),
    class_validator_1.IsString({
        each: true
    }),
    tslib_1.__metadata("design:type", Array)
], Options.prototype, "reservedStrings", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "rotateStringArray", void 0);
tslib_1.__decorate([
    class_validator_1.IsNumber(),
    tslib_1.__metadata("design:type", Number)
], Options.prototype, "seed", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "selfDefending", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "sourceMap", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    class_validator_1.ValidateIf((options) => Boolean(options.sourceMapBaseUrl)),
    class_validator_1.IsUrl({
        require_protocol: true,
        require_tld: false,
        require_valid_protocol: true
    }),
    tslib_1.__metadata("design:type", String)
], Options.prototype, "sourceMapBaseUrl", void 0);
tslib_1.__decorate([
    class_validator_1.IsString(),
    tslib_1.__metadata("design:type", String)
], Options.prototype, "sourceMapFileName", void 0);
tslib_1.__decorate([
    class_validator_1.IsIn([SourceMapMode_1.SourceMapMode.Inline, SourceMapMode_1.SourceMapMode.Separate]),
    tslib_1.__metadata("design:type", String)
], Options.prototype, "sourceMapMode", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "splitStrings", void 0);
tslib_1.__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.ValidateIf((options) => Boolean(options.splitStrings)),
    class_validator_1.Min(1),
    tslib_1.__metadata("design:type", Number)
], Options.prototype, "splitStringsChunkLength", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "stringArray", void 0);
tslib_1.__decorate([
    class_validator_1.IsIn([true, false, StringArrayEncoding_1.StringArrayEncoding.Base64, StringArrayEncoding_1.StringArrayEncoding.Rc4]),
    tslib_1.__metadata("design:type", Object)
], Options.prototype, "stringArrayEncoding", void 0);
tslib_1.__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.Min(0),
    class_validator_1.Max(1),
    tslib_1.__metadata("design:type", Number)
], Options.prototype, "stringArrayThreshold", void 0);
tslib_1.__decorate([
    class_validator_1.IsIn([ObfuscationTarget_1.ObfuscationTarget.Browser, ObfuscationTarget_1.ObfuscationTarget.BrowserNoEval, ObfuscationTarget_1.ObfuscationTarget.Node]),
    tslib_1.__metadata("design:type", String)
], Options.prototype, "target", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "transformObjectKeys", void 0);
tslib_1.__decorate([
    class_validator_1.IsBoolean(),
    tslib_1.__metadata("design:type", Boolean)
], Options.prototype, "unicodeEscapeSequence", void 0);
Options = Options_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TInputOptions)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptionsNormalizer)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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

var OptionsNormalizer_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ControlFlowFlatteningThresholdRule_1 = __webpack_require__(/*! ./normalizer-rules/ControlFlowFlatteningThresholdRule */ "./src/options/normalizer-rules/ControlFlowFlatteningThresholdRule.ts");
const DeadCodeInjectionRule_1 = __webpack_require__(/*! ./normalizer-rules/DeadCodeInjectionRule */ "./src/options/normalizer-rules/DeadCodeInjectionRule.ts");
const DeadCodeInjectionThresholdRule_1 = __webpack_require__(/*! ./normalizer-rules/DeadCodeInjectionThresholdRule */ "./src/options/normalizer-rules/DeadCodeInjectionThresholdRule.ts");
const DomainLockRule_1 = __webpack_require__(/*! ./normalizer-rules/DomainLockRule */ "./src/options/normalizer-rules/DomainLockRule.ts");
const InputFileNameRule_1 = __webpack_require__(/*! ./normalizer-rules/InputFileNameRule */ "./src/options/normalizer-rules/InputFileNameRule.ts");
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
    SelfDefendingRule_1.SelfDefendingRule,
    SourceMapBaseUrlRule_1.SourceMapBaseUrlRule,
    SourceMapFileNameRule_1.SourceMapFileNameRule,
    SplitStringsChunkLengthRule_1.SplitStringsChunkLengthRule,
    StringArrayRule_1.StringArrayRule,
    StringArrayEncodingRule_1.StringArrayEncodingRule,
    StringArrayThresholdRule_1.StringArrayThresholdRule,
];
OptionsNormalizer = OptionsNormalizer_1 = tslib_1.__decorate([
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
            .reduce((errorMessages, error) => ([
            ...errorMessages,
            ValidationErrorsFormatter.formatWithNestedConstraints(error)
        ]), [])
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
exports.InputFileNameRule = (options) => {
    let { inputFileName } = options;
    if (inputFileName) {
        inputFileName = inputFileName
            .replace(/^\/+/, '')
            .split('.')
            .slice(0, -1)
            .join('.') || inputFileName;
        options = Object.assign(Object.assign({}, options), { inputFileName: `${inputFileName}.js` });
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
exports.SourceMapFileNameRule = (options) => {
    let { sourceMapFileName } = options;
    if (sourceMapFileName) {
        sourceMapFileName = sourceMapFileName
            .replace(/^\/+/, '')
            .split('.')[0];
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
        options = Object.assign(Object.assign({}, options), { rotateStringArray: false, stringArray: false, stringArrayEncoding: false, stringArrayThreshold: 0 });
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
    log: false,
    renameGlobals: false,
    reservedNames: [],
    reservedStrings: [],
    rotateStringArray: true,
    seed: 0,
    selfDefending: false,
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
    log: false,
    renameGlobals: false,
    reservedNames: [],
    reservedStrings: [],
    rotateStringArray: false,
    seed: 0,
    selfDefending: false,
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

/***/ "./src/source-code/ObfuscatedCode.ts":
/*!*******************************************!*\
  !*** ./src/source-code/ObfuscatedCode.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const Initializable_1 = __webpack_require__(/*! ../decorators/Initializable */ "./src/decorators/Initializable.ts");
const SourceMapMode_1 = __webpack_require__(/*! ../enums/source-map/SourceMapMode */ "./src/enums/source-map/SourceMapMode.ts");
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
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], ObfuscatedCode.prototype, "obfuscatedCode", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], ObfuscatedCode.prototype, "sourceMap", void 0);
ObfuscatedCode = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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

/***/ "./src/storages/ArrayStorage.ts":
/*!**************************************!*\
  !*** ./src/storages/ArrayStorage.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const Initializable_1 = __webpack_require__(/*! ../decorators/Initializable */ "./src/decorators/Initializable.ts");
let ArrayStorage = class ArrayStorage {
    constructor(randomGenerator, options) {
        this.storageLength = 0;
        this.randomGenerator = randomGenerator;
        this.options = options;
    }
    initialize() {
        this.storage = [];
        this.storageId = this.randomGenerator.getRandomString(6);
    }
    get(key) {
        const value = this.storage[key];
        if (!value) {
            throw new Error(`No value found in array storage with key \`${key}\``);
        }
        return value;
    }
    getKeyOf(value) {
        const key = this.storage.indexOf(value);
        return key >= 0 ? key : null;
    }
    getLength() {
        return this.storageLength;
    }
    getStorage() {
        return this.storage;
    }
    getStorageId() {
        return this.storageId;
    }
    mergeWith(storage, mergeId = false) {
        this.storage = [...this.storage, ...storage.getStorage()];
        if (mergeId) {
            this.storageId = storage.getStorageId();
        }
    }
    set(key, value) {
        if (key === this.storageLength) {
            this.storage.push(value);
        }
        else {
            this.storage.splice(key, 0, value);
        }
        this.storageLength++;
    }
};
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Array)
], ArrayStorage.prototype, "storage", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], ArrayStorage.prototype, "storageId", void 0);
tslib_1.__decorate([
    inversify_1.postConstruct(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ArrayStorage.prototype, "initialize", null);
ArrayStorage = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
], ArrayStorage);
exports.ArrayStorage = ArrayStorage;


/***/ }),

/***/ "./src/storages/MapStorage.ts":
/*!************************************!*\
  !*** ./src/storages/MapStorage.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
        const value = this.storage.get(key);
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
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", String)
], MapStorage.prototype, "storageId", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Map)
], MapStorage.prototype, "storage", void 0);
tslib_1.__decorate([
    inversify_1.postConstruct(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], MapStorage.prototype, "initialize", null);
MapStorage = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const MapStorage_1 = __webpack_require__(/*! ../MapStorage */ "./src/storages/MapStorage.ts");
let ControlFlowStorage = class ControlFlowStorage extends MapStorage_1.MapStorage {
    constructor(randomGenerator, options) {
        super(randomGenerator, options);
    }
};
ControlFlowStorage = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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

var CustomNodeGroupStorage_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
            if (!customNodeGroup) {
                return;
            }
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
tslib_1.__decorate([
    inversify_1.postConstruct(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], CustomNodeGroupStorage.prototype, "initialize", null);
CustomNodeGroupStorage = CustomNodeGroupStorage_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNodeGroup)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object])
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

var StringArrayStorage_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const ArrayStorage_1 = __webpack_require__(/*! ../ArrayStorage */ "./src/storages/ArrayStorage.ts");
let StringArrayStorage = StringArrayStorage_1 = class StringArrayStorage extends ArrayStorage_1.ArrayStorage {
    constructor(identifierNamesGeneratorFactory, arrayUtils, randomGenerator, options) {
        super(randomGenerator, options);
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.arrayUtils = arrayUtils;
    }
    initialize() {
        super.initialize();
        if (!this.options.stringArray) {
            return;
        }
        const baseStringArrayName = this.identifierNamesGenerator
            .generate(StringArrayStorage_1.stringArrayNameLength);
        const baseStringArrayCallsWrapperName = this.identifierNamesGenerator
            .generate(StringArrayStorage_1.stringArrayNameLength);
        const stringArrayName = `${this.options.identifiersPrefix}${baseStringArrayName}`;
        const stringArrayCallsWrapperName = `${this.options.identifiersPrefix}${baseStringArrayCallsWrapperName}`;
        this.storageId = `${stringArrayName}|${stringArrayCallsWrapperName}`;
    }
    rotateArray(rotationValue) {
        this.storage = this.arrayUtils.rotate(this.storage, rotationValue);
    }
    toString() {
        return this.storage.map((value) => {
            return `'${value}'`;
        }).toString();
    }
};
StringArrayStorage.stringArrayNameLength = 7;
tslib_1.__decorate([
    inversify_1.postConstruct(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], StringArrayStorage.prototype, "initialize", null);
StringArrayStorage = StringArrayStorage_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierNamesGenerator)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IArrayUtils)),
    tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])
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
            
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

            that.atob || (
                that.atob = function(input) {
                    var str = String(input).replace(/=+$/, '');
                    for (
                        var bc = 0, bs, buffer, idx = 0, output = '';
                        buffer = str.charAt(idx++);
                        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
                    ) {
                        buffer = chars.indexOf(buffer);
                    }
                return output;
            });
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
        var that = (typeof window !== 'undefined'
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
        var that;
        
        try {
            var getGlobal = Function('return (function() ' + '{}.constructor("return this")( )' + ');');
            
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
        var getGlobal = function () {
            var globalObject;
        
            try {
                globalObject = Function('return (function() ' + '{}.constructor("return this")( )' + ');')();
            } catch (e) {
                globalObject = window;
            }
            
            return globalObject;
        };
        var that = getGlobal();
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
        var rc4 = function (str, key) {
            var s = [], j = 0, x, res = '', newStr = '';
           
            str = atob(str);
                
            for (var k = 0, length = str.length; k < length; k++) {
                newStr += '%' + ('00' + str.charCodeAt(k).toString(16)).slice(-2);
            }
        
            str = decodeURIComponent(newStr);
                    	        
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
            
            for (var y = 0; y < str.length; y++) {
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
        var {singleNodeCallControllerFunctionName} = (function(){
            var firstCall = true;
            
            return function (context, fn){
                var rfn = firstCall ? function(){
                    if(fn){
                        var res = fn.apply(context, arguments);
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
        var {consoleLogDisableFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {
            var func = function () {};
            
            {globalVariableTemplate}
                        
            if (!that.console) {
                that.console = (function (func){
                    var c = {};
                    
                    c.log = func;
                    c.warn = func;
                    c.debug = func;
                    c.info = func;
                    c.error = func;
                    c.exception = func;
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
            {singleNodeCallControllerFunctionName}(this, function () {
                var regExp1 = new RegExp('function *\\\\( *\\\\)');
                var regExp2 = new RegExp('\\\\+\\\\+ *\\(?:_0x(?:[a-f0-9]){4,6}|(?:\\\\b|\\\\d)[a-z0-9]{1,4}(?:\\\\b|\\\\d)\\)', 'i');
       
                var result = {debugProtectionFunctionName}('init');
                
                if (!regExp1.test(result + 'chain') || !regExp2.test(result + 'input')) {
                    result('0');
                } else {
                    {debugProtectionFunctionName}();
                }
            })();
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
            var func = function () {
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
        var {domainLockFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {
            
            {globalVariableTemplate}
            
            var func = function () {
                return {
                    key: 'item',
                    value: 'attribute',
                    getAttribute: function () {
                        for (var i = 0; i < 1000; i--) {
                            var isPositive = i > 0;
                            
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
                        
            var regExp = new RegExp("[{diff}]", "g");
            var domains = "{domains}".replace(regExp, "").split(";");
            var document;
            var domain;
            var location;
            var hostname;

            for (var d in that) {
                if (d.length == 8 && d.charCodeAt(7) == 116 && d.charCodeAt(5) == 101 && d.charCodeAt(3) == 117 && d.charCodeAt(0) == 100) {
                    document = d;
                
                    break;
                }
            }

            for (var d1 in that[document]) {
                if (d1.length == 6 && d1.charCodeAt(5) == 110 && d1.charCodeAt(0) == 100) {
                    domain = d1;
                    
                    break;
                }
            }

            if (!("~" > domain)) {
                for (var d2 in that[document]) {
                    if (d2.length == 8 && d2.charCodeAt(7) == 110 && d2.charCodeAt(0) == 108) {
                        location = d2;
                        
                        break;
                    }
                }

                for (var d3 in that[document][location]) {
                    if (d3.length == 8 && d3.charCodeAt(7) == 101 && d3.charCodeAt(0) == 104) {
                        hostname = d3;
                        
                        break;
                    }
                }
            }
            
            if (!document || !that[document]) {
                return;
            }
            
            var documentDomain = that[document][domain];
            var documentLocationHostName = !!that[document][location] && that[document][location][hostname];
            var currentDomain = documentDomain || documentLocationHostName;
          
            if (!currentDomain) {
                return;
            }
          
            var ok = false;
                        
            for (var i = 0; i < domains.length; i++) {
                var domain = domains[i];
                var position = currentDomain.length - domain.length;
                var lastIndex = currentDomain.indexOf(domain, position);
                var endsWith = lastIndex !== -1 && lastIndex === position;
                
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
        var {selfDefendingFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {
            var func1 = function(){return 'dev';},
                func2 = function () {
                    return 'window';
                };
                
            var test1 = function () {
                var regExp = new RegExp('${escapeSequenceEncoder.encode(`\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}`, true)}');
                
                return !regExp.test(func1.toString());
            };
            
            var test2 = function () {
                var regExp = new RegExp('${escapeSequenceEncoder.encode(`(\\\\[x|u](\\w){2,4})+`, true)}');
                
                return regExp.test(func2.toString());
            };
            
            var recursiveFunc1 = function (string) {
                var i = ~-1 >> 1 + 255 % 0;
                                
                if (string.indexOf('i' === i)) {
                    recursiveFunc2(string)
                }
            };
            
            var recursiveFunc2 = function (string) {
                var i = ~-4 >> 1 + 255 % 0;
                
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
        var StatesClass = function (${rc4BytesIdentifier}) {
            this.${rc4BytesIdentifier} = ${rc4BytesIdentifier};
            this.${statesIdentifier} = [1, 0, 0];
            this.${newStateIdentifier} = function(){return 'newState';};
            this.${firstStateIdentifier} = '${escapeSequenceEncoder.encode(`\\w+ *\\(\\) *{\\w+ *`, true)}';
            this.${secondStateIdentifier} = '${escapeSequenceEncoder.encode(`['|"].+['|"];? *}`, true)}';
        };
        
        StatesClass.prototype.${checkStateIdentifier} = function () {
            var regExp = new RegExp(this.${firstStateIdentifier} + this.${secondStateIdentifier});
            var expression = regExp.test(this.${newStateIdentifier}.toString())
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
            for (var i = 0, len = this.${statesIdentifier}.length; i < len; i++) {
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
                var string = atob(str);
                var newStringChars = [];
                
                for (var i = 0, length = string.length; i < length; i++) {
                    newStringChars += '%' + ('00' + string.charCodeAt(i).toString(16)).slice(-2);
                }
                
                return decodeURIComponent(newStringChars);
            };
            
            {stringArrayCallsWrapperName}.${dataIdentifier} = {};
            
            {stringArrayCallsWrapperName}.${initializedIdentifier} = true;
        }
                  
        var cachedValue = {stringArrayCallsWrapperName}.${dataIdentifier}[index];
                        
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
        var {stringArrayCallsWrapperName} = function (index, key) {
            index = index - 0;
            
            var value = {stringArrayName}[index];
            
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
  
        var cachedValue = {stringArrayCallsWrapperName}.${dataIdentifier}[index];

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
        var {stringArrayName} = [{stringArray}];
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
        var selfDefendingFunc = function () {
            var object = {
                data: {
                    key: 'cookie',
                    value: 'timeout'
                },
                setCookie: function (options, name, value, document) {
                    document = document || {};
                    
                    var updatedCookie = name + "=" + value;

                    var i = 0;
                                                            
                    for (var i = 0, len = options.length; i < len; i++) {
                        var propName = options[i];
                                     
                        updatedCookie += "; " + propName;
                        
                        var propValue = options[propName];
                        
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
                    var matches = document(new RegExp(
                        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                    ));
                    
                    var func = function (param1, param2) {
                        param1(++param2);
                    };
                    
                    func({whileFunctionName}, {timesName});
                                        
                    return matches ? decodeURIComponent(matches[1]) : undefined;
                }
            };
            
            var test1 = function () {
                var regExp = new RegExp('${escapeSequenceEncoder.encode(`\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}`, true)}');
                
                return regExp.test(object.removeCookie.toString());
            };
            
            object['updateCookie'] = test1;
            
            var cookie = '';
            var result = object['updateCookie']();
                                    
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
            var {whileFunctionName} = function (times) {
                while (--times) {
                    array['push'](array['shift']());
                }
            };
            
            {code}
        })({stringArrayName}, 0x{stringArrayRotateValue});
    `;
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
    rotate(array, times) {
        if (!array.length) {
            throw new ReferenceError(`Cannot rotate empty array.`);
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
ArrayUtils = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__metadata("design:paramtypes", [Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
            return String.fromCharCode(parseInt(`${Utils_1.Utils.hexadecimalPrefix}${p1}`));
        });
        for (let block, charCode, idx = 0, map = chars; string.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
            charCode = string.charCodeAt(idx += 3 / 4);
            if (charCode > 0xFF) {
                throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
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
        let s = [], j = 0, x, result = '';
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
CryptUtils = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)),
    tslib_1.__metadata("design:paramtypes", [Object])
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
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
        return result;
    }
};
EscapeSequenceEncoder = tslib_1.__decorate([
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
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
LevelledTopologicalSorter = tslib_1.__decorate([
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

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
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
                const isUnknownRelation = !normalizedNodeTransformers[runAfterRelation];
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
NodeTransformerNamesGroupsBuilder = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ILevelledTopologicalSorter)),
    tslib_1.__metadata("design:paramtypes", [Object])
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

var RandomGenerator_1;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const inversify_1 = __webpack_require__(/*! inversify */ "inversify");
const ServiceIdentifiers_1 = __webpack_require__(/*! ../container/ServiceIdentifiers */ "./src/container/ServiceIdentifiers.ts");
const md5_1 = tslib_1.__importDefault(__webpack_require__(/*! md5 */ "md5"));
const chance_1 = __webpack_require__(/*! chance */ "chance");
const Initializable_1 = __webpack_require__(/*! ../decorators/Initializable */ "./src/decorators/Initializable.ts");
let RandomGenerator = RandomGenerator_1 = class RandomGenerator {
    constructor(sourceCode, options) {
        this.sourceCode = sourceCode;
        this.options = options;
    }
    initialize() {
        const getRandomInteger = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        const getSeed = () => {
            const md5Hash = md5_1.default(this.sourceCode.getSourceCode());
            return this.seed + Number(md5Hash.replace(/\D/g, ''));
        };
        this.seed = this.options.seed !== 0 ? this.options.seed : getRandomInteger(0, 999999999);
        this.randomGenerator = new chance_1.Chance(getSeed());
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
    getSeed() {
        return this.seed;
    }
};
RandomGenerator.randomGeneratorPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Object)
], RandomGenerator.prototype, "randomGenerator", void 0);
tslib_1.__decorate([
    Initializable_1.initializable(),
    tslib_1.__metadata("design:type", Number)
], RandomGenerator.prototype, "seed", void 0);
tslib_1.__decorate([
    inversify_1.postConstruct(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], RandomGenerator.prototype, "initialize", null);
RandomGenerator = RandomGenerator_1 = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ISourceCode)),
    tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)),
    tslib_1.__metadata("design:paramtypes", [Object, Object])
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
        if (url.indexOf('://') > -1 || url.indexOf('//') === 0) {
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

/***/ "eventemitter3":
/*!********************************!*\
  !*** external "eventemitter3" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("eventemitter3");

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