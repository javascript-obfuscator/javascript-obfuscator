/*
Copyright (C) 2017 Timofey Kachalov <sanex3339@yandex.ru>

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
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 150);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("inversify");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _symbol = __webpack_require__(139);

var _symbol2 = _interopRequireDefault(_symbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ServiceIdentifiers = {
    Factory__ICalleeDataExtractor: (0, _symbol2.default)('Factory<ICalleeDataExtractor>'),
    Factory__IControlFlowReplacer: (0, _symbol2.default)('Factory<IControlFlowReplacer>'),
    Factory__ICustomNode: (0, _symbol2.default)('Factory<ICustomNode>'),
    Factory__ICustomNodeGroup: (0, _symbol2.default)('Factory<ICustomNodeGroup>'),
    Factory__INodeTransformer: (0, _symbol2.default)('Factory<INodeTransformer[]>'),
    Factory__IObfuscationResult: (0, _symbol2.default)('Factory<IObfuscationResult>'),
    Factory__IObfuscatorReplacer: (0, _symbol2.default)('Factory<IObfuscationReplacer>'),
    Factory__TControlFlowStorage: (0, _symbol2.default)('Factory<TControlFlowStorage>'),
    ICalleeDataExtractor: (0, _symbol2.default)('ICalleeDataExtractor'),
    ICustomNodeGroup: (0, _symbol2.default)('ICustomNodeGroup'),
    IControlFlowReplacer: (0, _symbol2.default)('IControlFlowReplacer'),
    IJavaScriptObfuscator: (0, _symbol2.default)('IJavaScriptObfuscator'),
    INodeTransformer: (0, _symbol2.default)('INodeTransformer'),
    IObfuscationEventEmitter: (0, _symbol2.default)('IObfuscationEventEmitter'),
    IObfuscationResult: (0, _symbol2.default)('IObfuscationResult'),
    IObfuscator: (0, _symbol2.default)('IObfuscator'),
    IOptions: (0, _symbol2.default)('IOptions'),
    IObfuscatorReplacer: (0, _symbol2.default)('IObfuscationReplacer'),
    ISourceMapCorrector: (0, _symbol2.default)('ISourceMapCorrector'),
    IStackTraceAnalyzer: (0, _symbol2.default)('IStackTraceAnalyzer'),
    Newable__ICustomNode: (0, _symbol2.default)('Newable<ICustomNode>'),
    Newable__TControlFlowStorage: (0, _symbol2.default)('Newable<TControlFlowStorage>'),
    TCustomNodeGroupStorage: (0, _symbol2.default)('TCustomNodeGroupStorage'),
    TStringArrayStorage: (0, _symbol2.default)('TStringArrayStorage')
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/inherits");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var escodegen = __webpack_require__(28);
var esprima = __webpack_require__(49);
var estraverse = __webpack_require__(17);
var NodeType_1 = __webpack_require__(18);
var Node_1 = __webpack_require__(12);
var Nodes_1 = __webpack_require__(20);

var NodeUtils = function () {
    function NodeUtils() {
        (0, _classCallCheck3.default)(this, NodeUtils);
    }

    (0, _createClass3.default)(NodeUtils, null, [{
        key: "addXVerbatimPropertyToLiterals",
        value: function addXVerbatimPropertyToLiterals(astTree) {
            NodeUtils.typedReplace(astTree, NodeType_1.NodeType.Literal, {
                leave: function leave(literalNode) {
                    literalNode['x-verbatim-property'] = {
                        content: literalNode.raw,
                        precedence: escodegen.Precedence.Primary
                    };
                }
            });
            return astTree;
        }
    }, {
        key: "convertCodeToStructure",
        value: function convertCodeToStructure(code) {
            var structure = esprima.parse(code);
            structure = NodeUtils.addXVerbatimPropertyToLiterals(structure);
            structure = NodeUtils.parentize(structure);
            return structure.body;
        }
    }, {
        key: "convertStructureToCode",
        value: function convertStructureToCode(structure) {
            var code = '';
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(structure), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var node = _step.value;

                    code += escodegen.generate(node, {
                        sourceMapWithCode: true
                    }).code;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return code;
        }
    }, {
        key: "getBlockStatementNodeByIndex",
        value: function getBlockStatementNodeByIndex(node) {
            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (Node_1.Node.isNodeHasBlockStatement(node)) {
                if (node.body[index] === undefined) {
                    throw new ReferenceError("Wrong index `" + index + "`. Block-statement body length is `" + node.body.length + "`");
                }
                return node.body[index];
            }
            throw new TypeError('The specified node have no a block-statement');
        }
    }, {
        key: "getBlockScopesOfNode",
        value: function getBlockScopesOfNode(node) {
            var blockScopes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            var parentNode = node.parentNode;
            if (!parentNode) {
                throw new ReferenceError('`parentNode` property of given node is `undefined`');
            }
            if (Node_1.Node.isBlockStatementNode(parentNode)) {
                if (!parentNode.parentNode) {
                    throw new ReferenceError('`parentNode` property of `parentNode` of given node is `undefined`');
                }
                if (NodeUtils.nodesWithBlockScope.includes(parentNode.parentNode.type)) {
                    blockScopes.push(parentNode);
                }
            }
            if (!Node_1.Node.isProgramNode(parentNode)) {
                return NodeUtils.getBlockScopesOfNode(parentNode, blockScopes);
            }
            blockScopes.push(parentNode);
            return blockScopes;
        }
    }, {
        key: "getNodeBlockScopeDepth",
        value: function getNodeBlockScopeDepth(node) {
            var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var parentNode = node.parentNode;
            if (!parentNode) {
                throw new ReferenceError('`parentNode` property of given node is `undefined`');
            }
            if (Node_1.Node.isProgramNode(parentNode)) {
                return depth;
            }
            if (Node_1.Node.isBlockStatementNode(node) && NodeUtils.nodesWithBlockScope.includes(parentNode.type)) {
                return NodeUtils.getNodeBlockScopeDepth(parentNode, ++depth);
            }
            return NodeUtils.getNodeBlockScopeDepth(parentNode, depth);
        }
    }, {
        key: "getUnaryExpressionArgumentNode",
        value: function getUnaryExpressionArgumentNode(unaryExpressionNode) {
            if (Node_1.Node.isUnaryExpressionNode(unaryExpressionNode.argument)) {
                return NodeUtils.getUnaryExpressionArgumentNode(unaryExpressionNode.argument);
            }
            return unaryExpressionNode.argument;
        }
    }, {
        key: "parentize",
        value: function parentize(astTree) {
            var isRootNode = true;
            estraverse.traverse(astTree, {
                enter: function enter(node, parentNode) {
                    var value = void 0;
                    if (isRootNode) {
                        if (node.type === NodeType_1.NodeType.Program) {
                            value = node;
                        } else {
                            value = Nodes_1.Nodes.getProgramNode([node]);
                            value.parentNode = value;
                        }
                        isRootNode = false;
                    } else {
                        value = parentNode || node;
                    }
                    node.parentNode = value;
                    node.obfuscated = false;
                }
            });
            return astTree;
        }
    }, {
        key: "typedReplace",
        value: function typedReplace(astTree, nodeType, visitor) {
            NodeUtils.typedTraverse(astTree, nodeType, visitor, 'replace');
        }
    }, {
        key: "typedTraverse",
        value: function typedTraverse(astTree, nodeType, visitor) {
            var traverseType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'traverse';

            estraverse[traverseType](astTree, {
                enter: function enter(node, parentNode) {
                    if (node.type === nodeType && visitor.enter) {
                        return visitor.enter(node, parentNode);
                    }
                },
                leave: function leave(node, parentNode) {
                    if (node.type === nodeType && visitor.leave) {
                        return visitor.leave(node, parentNode);
                    }
                }
            });
        }
    }]);
    return NodeUtils;
}();

NodeUtils.nodesWithBlockScope = [NodeType_1.NodeType.ArrowFunctionExpression, NodeType_1.NodeType.FunctionDeclaration, NodeType_1.NodeType.FunctionExpression, NodeType_1.NodeType.MethodDefinition, NodeType_1.NodeType.Program];
exports.NodeUtils = NodeUtils;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _set = __webpack_require__(138);

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chance_1 = __webpack_require__(142);
var Utils_1 = __webpack_require__(14);

var RandomGeneratorUtils = function () {
    function RandomGeneratorUtils() {
        (0, _classCallCheck3.default)(this, RandomGeneratorUtils);
    }

    (0, _createClass3.default)(RandomGeneratorUtils, null, [{
        key: "initializeRandomGenerator",
        value: function initializeRandomGenerator(seed) {
            if (seed !== 0) {
                RandomGeneratorUtils.randomGenerator = new chance_1.Chance(seed);
            } else {
                RandomGeneratorUtils.randomGenerator = new chance_1.Chance();
            }
        }
    }, {
        key: "clearRandomGenerator",
        value: function clearRandomGenerator() {
            RandomGeneratorUtils.randomVariableNameSet.clear();
        }
    }, {
        key: "getRandomFloat",
        value: function getRandomFloat(min, max) {
            return RandomGeneratorUtils.getRandomGenerator().floating({
                min: min,
                max: max,
                fixed: 7
            });
        }
    }, {
        key: "getRandomGenerator",
        value: function getRandomGenerator() {
            var randomGenerator = RandomGeneratorUtils.randomGenerator;
            if (!randomGenerator) {
                RandomGeneratorUtils.initializeRandomGenerator(0);
            }
            return RandomGeneratorUtils.randomGenerator;
        }
    }, {
        key: "getRandomInteger",
        value: function getRandomInteger(min, max) {
            return RandomGeneratorUtils.getRandomGenerator().integer({
                min: min,
                max: max
            });
        }
    }, {
        key: "getRandomString",
        value: function getRandomString(length) {
            var pool = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : RandomGeneratorUtils.randomGeneratorPool;

            return RandomGeneratorUtils.getRandomGenerator().string({ length: length, pool: pool });
        }
    }, {
        key: "getRandomVariableName",
        value: function getRandomVariableName(length) {
            var prefix = "_" + Utils_1.Utils.hexadecimalPrefix;
            var rangeMinInteger = 10000;
            var rangeMaxInteger = 99999999;
            var randomVariableName = "" + prefix + Utils_1.Utils.decToHex(RandomGeneratorUtils.getRandomInteger(rangeMinInteger, rangeMaxInteger)).substr(0, length);
            if (RandomGeneratorUtils.randomVariableNameSet.has(randomVariableName)) {
                return RandomGeneratorUtils.getRandomVariableName(length);
            }
            RandomGeneratorUtils.randomVariableNameSet.add(randomVariableName);
            return randomVariableName;
        }
    }]);
    return RandomGeneratorUtils;
}();

RandomGeneratorUtils.randomGeneratorPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
RandomGeneratorUtils.randomGeneratorPoolHexadecimal = 'abcdef0123456789';
RandomGeneratorUtils.randomGeneratorPoolWithNumbers = RandomGeneratorUtils.randomGeneratorPool + "0123456789";
RandomGeneratorUtils.randomVariableNameSet = new _set2.default();
exports.RandomGeneratorUtils = RandomGeneratorUtils;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _defineProperty = __webpack_require__(136);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _getOwnPropertyDescriptor = __webpack_require__(137);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _keys = __webpack_require__(47);

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
function initializable() {
    var initializeMethodKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'initialize';

    var decoratorName = (0, _keys2.default)(this)[0];
    return function (target, propertyKey) {
        var descriptor = {
            configurable: true,
            enumerable: true
        };
        var initializeMethod = target[initializeMethodKey];
        if (!initializeMethod || typeof initializeMethod !== 'function') {
            throw new Error("`" + initializeMethodKey + "` method with initialization logic not found. `@" + decoratorName + "` decorator requires `" + initializeMethodKey + "` method");
        }
        var metadataPropertyKey = "_" + propertyKey;
        var propertyDescriptor = (0, _getOwnPropertyDescriptor2.default)(target, metadataPropertyKey) || descriptor;
        var methodDescriptor = (0, _getOwnPropertyDescriptor2.default)(target, initializeMethodKey) || descriptor;
        var originalMethod = methodDescriptor.value;
        (0, _defineProperty2.default)(target, propertyKey, tslib_1.__assign({}, propertyDescriptor, { get: function get() {
                if (this[metadataPropertyKey] === undefined) {
                    throw new Error("Property `" + propertyKey + "` is not initialized! Initialize it first!");
                }
                return this[metadataPropertyKey];
            }, set: function set(newVal) {
                this[metadataPropertyKey] = newVal;
            } }));
        (0, _defineProperty2.default)(target, initializeMethodKey, tslib_1.__assign({}, methodDescriptor, { value: function value() {
                originalMethod.apply(this, arguments);
                if (this[propertyKey]) {}
            } }));
        return propertyDescriptor;
    };
}
exports.initializable = initializable;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/map");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NodeType_1 = __webpack_require__(18);

var Node = function () {
    function Node() {
        (0, _classCallCheck3.default)(this, Node);
    }

    (0, _createClass3.default)(Node, null, [{
        key: "isArrowFunctionExpressionNode",
        value: function isArrowFunctionExpressionNode(node) {
            return node.type === NodeType_1.NodeType.ArrowFunctionExpression;
        }
    }, {
        key: "isAssignmentPatternNode",
        value: function isAssignmentPatternNode(node) {
            return node.type === NodeType_1.NodeType.AssignmentPattern;
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
        key: "isContinueStatementNode",
        value: function isContinueStatementNode(node) {
            return node.type === NodeType_1.NodeType.ContinueStatement;
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
        key: "isLabelIdentifierNode",
        value: function isLabelIdentifierNode(node, parentNode) {
            var parentNodeIsLabeledStatementNode = Node.isLabeledStatementNode(parentNode) && parentNode.label === node;
            var parentNodeIsContinueStatementNode = Node.isContinueStatementNode(parentNode) && parentNode.label === node;
            var parentNodeIsBreakStatementNode = Node.isBreakStatementNode(parentNode) && parentNode.label === node;
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
            if (!Node.isIdentifierNode(node)) {
                return false;
            }
            var parentNodeIsPropertyNode = Node.isPropertyNode(parentNode) && parentNode.key === node;
            var parentNodeIsMemberExpressionNode = Node.isMemberExpressionNode(parentNode) && parentNode.computed === false && parentNode.property === node;
            return !parentNodeIsPropertyNode && !parentNodeIsMemberExpressionNode && !Node.isLabelIdentifierNode(node, parentNode);
        }
    }, {
        key: "isUnaryExpressionNode",
        value: function isUnaryExpressionNode(node) {
            return node.type === NodeType_1.NodeType.UnaryExpression;
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
        key: "isNodeHasBlockStatement",
        value: function isNodeHasBlockStatement(node) {
            return node.hasOwnProperty('body') && Array.isArray(node.body);
        }
    }]);
    return Node;
}();

exports.Node = Node;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var NodeUtils_1 = __webpack_require__(8);
var AbstractCustomNode = function () {
    function AbstractCustomNode(options) {
        (0, _classCallCheck3.default)(this, AbstractCustomNode);

        this.options = options;
    }

    (0, _createClass3.default)(AbstractCustomNode, [{
        key: "getCode",
        value: function getCode() {
            if (!this.cachedCode) {
                this.cachedCode = NodeUtils_1.NodeUtils.convertStructureToCode(this.getNode());
            }
            return this.cachedCode;
        }
    }, {
        key: "getNode",
        value: function getNode() {
            if (!this.cachedNode) {
                this.cachedNode = this.getNodeStructure();
            }
            return this.cachedNode;
        }
    }]);
    return AbstractCustomNode;
}();
AbstractCustomNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], AbstractCustomNode);
exports.AbstractCustomNode = AbstractCustomNode;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _from = __webpack_require__(45);

var _from2 = _interopRequireDefault(_from);

var _slicedToArray2 = __webpack_require__(35);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = __webpack_require__(24);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = __webpack_require__(147);
var JSFuck_1 = __webpack_require__(36);
var RandomGeneratorUtils_1 = __webpack_require__(9);

var Utils = function () {
    function Utils() {
        (0, _classCallCheck3.default)(this, Utils);
    }

    (0, _createClass3.default)(Utils, null, [{
        key: "arrayRotate",
        value: function arrayRotate(array, times) {
            if (!array.length) {
                throw new ReferenceError("Cannot rotate empty array.");
            }
            if (times <= 0) {
                return array;
            }
            var newArray = array;
            var temp = void 0;
            while (times--) {
                temp = newArray.pop();
                newArray.unshift(temp);
            }
            return newArray;
        }
    }, {
        key: "arrayShuffle",
        value: function arrayShuffle(array) {
            var shuffledArray = [].concat((0, _toConsumableArray3.default)(array));
            for (var i = shuffledArray.length; i; i--) {
                var j = Math.floor(RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomFloat(0, 1) * i);
                var _ref = [shuffledArray[j], shuffledArray[i - 1]];
                shuffledArray[i - 1] = _ref[0];
                shuffledArray[j] = _ref[1];
            }
            return shuffledArray;
        }
    }, {
        key: "decToHex",
        value: function decToHex(dec) {
            var radix = 16;
            return Number(dec).toString(radix);
        }
    }, {
        key: "extractDomainFromUrl",
        value: function extractDomainFromUrl(url) {
            var domain = void 0;
            if (url.indexOf('://') > -1 || url.indexOf('//') === 0) {
                domain = url.split('/')[2];
            } else {
                domain = url.split('/')[0];
            }
            domain = domain.split(':')[0];
            return domain;
        }
    }, {
        key: "isCeilNumber",
        value: function isCeilNumber(number) {
            return number % 1 === 0;
        }
    }, {
        key: "mapGetFirstKeyOf",
        value: function mapGetFirstKeyOf(map, value) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(map), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
                        key = _step$value[0],
                        storageValue = _step$value[1];

                    if (_.isEqual(value, storageValue)) {
                        return key;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
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
        key: "strEnumify",
        value: function strEnumify(obj) {
            return obj;
        }
    }, {
        key: "stringRotate",
        value: function stringRotate(string, times) {
            if (!string) {
                throw new ReferenceError("Cannot rotate empty string.");
            }
            for (var i = 0; i < times; i++) {
                string = string[string.length - 1] + string.substring(0, string.length - 1);
            }
            return string;
        }
    }, {
        key: "stringToJSFuck",
        value: function stringToJSFuck(string) {
            return (0, _from2.default)(string).map(function (character) {
                return JSFuck_1.JSFuck[character] || character;
            }).join(' + ');
        }
    }, {
        key: "stringToUnicodeEscapeSequence",
        value: function stringToUnicodeEscapeSequence(string) {
            var nonLatinAndNonDigitsOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var cacheKey = string + "-" + String(nonLatinAndNonDigitsOnly);
            if (Utils.stringToUnicodeEscapeSequenceCache.has(cacheKey)) {
                return Utils.stringToUnicodeEscapeSequenceCache.get(cacheKey);
            }
            var radix = 16;
            var replaceRegExp = new RegExp('[\\s\\S]', 'g');
            var escapeRegExp = new RegExp('[^a-zA-Z0-9]');
            var regexp = new RegExp('[\\x00-\\x7F]');
            var prefix = void 0,
                template = void 0;
            var result = string.replace(replaceRegExp, function (escape) {
                if (nonLatinAndNonDigitsOnly && !escapeRegExp.test(escape)) {
                    return escape;
                }
                if (regexp.test(escape)) {
                    prefix = '\\x';
                    template = '0'.repeat(2);
                } else {
                    prefix = "\\u";
                    template = '0'.repeat(4);
                }
                return "" + prefix + (template + escape.charCodeAt(0).toString(radix)).slice(-template.length);
            });
            Utils.stringToUnicodeEscapeSequenceCache.set(cacheKey, result);
            return result;
        }
    }]);
    return Utils;
}();

Utils.hexadecimalPrefix = '0x';
Utils.stringToUnicodeEscapeSequenceCache = new _map2.default();
exports.Utils = Utils;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CustomNodes;
(function (CustomNodes) {
    CustomNodes[CustomNodes["BinaryExpressionFunctionNode"] = 0] = "BinaryExpressionFunctionNode";
    CustomNodes[CustomNodes["BlockStatementControlFlowFlatteningNode"] = 1] = "BlockStatementControlFlowFlatteningNode";
    CustomNodes[CustomNodes["CallExpressionControlFlowStorageCallNode"] = 2] = "CallExpressionControlFlowStorageCallNode";
    CustomNodes[CustomNodes["CallExpressionFunctionNode"] = 3] = "CallExpressionFunctionNode";
    CustomNodes[CustomNodes["ControlFlowStorageNode"] = 4] = "ControlFlowStorageNode";
    CustomNodes[CustomNodes["ConsoleOutputDisableExpressionNode"] = 5] = "ConsoleOutputDisableExpressionNode";
    CustomNodes[CustomNodes["DebugProtectionFunctionCallNode"] = 6] = "DebugProtectionFunctionCallNode";
    CustomNodes[CustomNodes["DebugProtectionFunctionIntervalNode"] = 7] = "DebugProtectionFunctionIntervalNode";
    CustomNodes[CustomNodes["DebugProtectionFunctionNode"] = 8] = "DebugProtectionFunctionNode";
    CustomNodes[CustomNodes["DomainLockNode"] = 9] = "DomainLockNode";
    CustomNodes[CustomNodes["ExpressionWithOperatorControlFlowStorageCallNode"] = 10] = "ExpressionWithOperatorControlFlowStorageCallNode";
    CustomNodes[CustomNodes["LogicalExpressionFunctionNode"] = 11] = "LogicalExpressionFunctionNode";
    CustomNodes[CustomNodes["NodeCallsControllerFunctionNode"] = 12] = "NodeCallsControllerFunctionNode";
    CustomNodes[CustomNodes["SelfDefendingUnicodeNode"] = 13] = "SelfDefendingUnicodeNode";
    CustomNodes[CustomNodes["StringArrayCallsWrapper"] = 14] = "StringArrayCallsWrapper";
    CustomNodes[CustomNodes["StringArrayNode"] = 15] = "StringArrayNode";
    CustomNodes[CustomNodes["StringArrayRotateFunctionNode"] = 16] = "StringArrayRotateFunctionNode";
})(CustomNodes = exports.CustomNodes || (exports.CustomNodes = {}));

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var AbstractNodeTransformer = function AbstractNodeTransformer(options) {
    (0, _classCallCheck3.default)(this, AbstractNodeTransformer);

    this.nodeIdentifier = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomInteger(0, 10000);
    this.options = options;
};
AbstractNodeTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], AbstractNodeTransformer);
exports.AbstractNodeTransformer = AbstractNodeTransformer;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("estraverse");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Utils_1 = __webpack_require__(14);
exports.NodeType = Utils_1.Utils.strEnumify({
    ArrayExpression: 'ArrayExpression',
    ArrowFunctionExpression: 'ArrowFunctionExpression',
    AssignmentExpression: 'AssignmentExpression',
    AssignmentPattern: 'AssignmentPattern',
    BinaryExpression: 'BinaryExpression',
    BlockStatement: 'BlockStatement',
    BreakStatement: 'BreakStatement',
    CallExpression: 'CallExpression',
    CatchClause: 'CatchClause',
    ClassDeclaration: 'ClassDeclaration',
    ContinueStatement: 'ContinueStatement',
    ExpressionStatement: 'ExpressionStatement',
    FunctionDeclaration: 'FunctionDeclaration',
    FunctionExpression: 'FunctionExpression',
    Identifier: 'Identifier',
    IfStatement: 'IfStatement',
    LabeledStatement: 'LabeledStatement',
    Literal: 'Literal',
    LogicalExpression: 'LogicalExpression',
    MemberExpression: 'MemberExpression',
    MethodDefinition: 'MethodDefinition',
    ObjectExpression: 'ObjectExpression',
    ObjectPattern: 'ObjectPattern',
    Program: 'Program',
    Property: 'Property',
    ReturnStatement: 'ReturnStatement',
    SwitchCase: 'SwitchCase',
    SwitchStatement: 'SwitchStatement',
    TemplateLiteral: 'TemplateLiteral',
    TryStatement: 'TryStatement',
    UnaryExpression: 'UnaryExpression',
    UpdateExpression: 'UpdateExpression',
    VariableDeclaration: 'VariableDeclaration',
    VariableDeclarator: 'VariableDeclarator',
    WhileStatement: 'WhileStatement'
});

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("string-template");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var escodegen = __webpack_require__(28);
var NodeType_1 = __webpack_require__(18);

var Nodes = function () {
    function Nodes() {
        (0, _classCallCheck3.default)(this, Nodes);
    }

    (0, _createClass3.default)(Nodes, null, [{
        key: "getProgramNode",
        value: function getProgramNode() {
            var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return {
                type: NodeType_1.NodeType.Program,
                body: body,
                sourceType: 'script',
                obfuscated: false
            };
        }
    }, {
        key: "getAssignmentExpressionNode",
        value: function getAssignmentExpressionNode(operator, left, right) {
            return {
                type: NodeType_1.NodeType.AssignmentExpression,
                operator: operator,
                left: left,
                right: right,
                obfuscated: false
            };
        }
    }, {
        key: "getBinaryExpressionNode",
        value: function getBinaryExpressionNode(operator, left, right) {
            return {
                type: NodeType_1.NodeType.BinaryExpression,
                operator: operator,
                left: left,
                right: right,
                obfuscated: false
            };
        }
    }, {
        key: "getBlockStatementNode",
        value: function getBlockStatementNode() {
            var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return {
                type: NodeType_1.NodeType.BlockStatement,
                body: body,
                obfuscated: false
            };
        }
    }, {
        key: "getBreakStatement",
        value: function getBreakStatement(label) {
            var breakStatementNode = {
                type: NodeType_1.NodeType.BreakStatement,
                obfuscated: false
            };
            if (label) {
                breakStatementNode.label = label;
            }
            return breakStatementNode;
        }
    }, {
        key: "getCatchClauseNode",
        value: function getCatchClauseNode() {
            var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return {
                type: NodeType_1.NodeType.CatchClause,
                param: Nodes.getIdentifierNode('err'),
                body: Nodes.getBlockStatementNode(body),
                obfuscated: false
            };
        }
    }, {
        key: "getCallExpressionNode",
        value: function getCallExpressionNode(callee) {
            var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            return {
                type: NodeType_1.NodeType.CallExpression,
                callee: callee,
                arguments: args,
                obfuscated: false
            };
        }
    }, {
        key: "getContinueStatement",
        value: function getContinueStatement(label) {
            var continueStatementNode = {
                type: NodeType_1.NodeType.ContinueStatement,
                obfuscated: false
            };
            if (label) {
                continueStatementNode.label = label;
            }
            return continueStatementNode;
        }
    }, {
        key: "getExpressionStatementNode",
        value: function getExpressionStatementNode(expression) {
            return {
                type: NodeType_1.NodeType.ExpressionStatement,
                expression: expression,
                obfuscated: false
            };
        }
    }, {
        key: "getFunctionDeclarationNode",
        value: function getFunctionDeclarationNode(functionName, params, body) {
            return {
                type: NodeType_1.NodeType.FunctionDeclaration,
                id: Nodes.getIdentifierNode(functionName),
                params: params,
                body: body,
                generator: false,
                obfuscated: false
            };
        }
    }, {
        key: "getFunctionExpressionNode",
        value: function getFunctionExpressionNode(params, body) {
            return {
                type: NodeType_1.NodeType.FunctionExpression,
                params: params,
                body: body,
                generator: false,
                obfuscated: false
            };
        }
    }, {
        key: "getIfStatementNode",
        value: function getIfStatementNode(test, consequent) {
            return {
                type: NodeType_1.NodeType.IfStatement,
                test: test,
                consequent: consequent,
                obfuscated: false
            };
        }
    }, {
        key: "getIdentifierNode",
        value: function getIdentifierNode(name) {
            return {
                type: NodeType_1.NodeType.Identifier,
                name: name,
                obfuscated: false
            };
        }
    }, {
        key: "getLabeledStatement",
        value: function getLabeledStatement(label, body) {
            return {
                type: NodeType_1.NodeType.LabeledStatement,
                label: label,
                body: body,
                obfuscated: false
            };
        }
    }, {
        key: "getLiteralNode",
        value: function getLiteralNode(value) {
            return {
                type: NodeType_1.NodeType.Literal,
                value: value,
                raw: "'" + value + "'",
                'x-verbatim-property': {
                    content: "'" + value + "'",
                    precedence: escodegen.Precedence.Primary
                },
                obfuscated: false
            };
        }
    }, {
        key: "getLogicalExpressionNode",
        value: function getLogicalExpressionNode(operator, left, right) {
            return {
                type: NodeType_1.NodeType.LogicalExpression,
                operator: operator,
                left: left,
                right: right,
                obfuscated: false
            };
        }
    }, {
        key: "getMemberExpressionNode",
        value: function getMemberExpressionNode(object, property) {
            var computed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            return {
                type: NodeType_1.NodeType.MemberExpression,
                computed: computed,
                object: object,
                property: property,
                obfuscated: false
            };
        }
    }, {
        key: "getObjectExpressionNode",
        value: function getObjectExpressionNode(properties) {
            return {
                type: NodeType_1.NodeType.ObjectExpression,
                properties: properties,
                obfuscated: false
            };
        }
    }, {
        key: "getPropertyNode",
        value: function getPropertyNode(key, value) {
            var computed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            return {
                type: NodeType_1.NodeType.Property,
                key: key,
                value: value,
                kind: 'init',
                method: false,
                shorthand: false,
                computed: computed,
                obfuscated: false
            };
        }
    }, {
        key: "getUnaryExpressionNode",
        value: function getUnaryExpressionNode(operator, argument) {
            var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            return {
                type: NodeType_1.NodeType.UnaryExpression,
                operator: operator,
                argument: argument,
                prefix: prefix,
                obfuscated: false
            };
        }
    }, {
        key: "getReturnStatementNode",
        value: function getReturnStatementNode(argument) {
            return {
                type: NodeType_1.NodeType.ReturnStatement,
                argument: argument,
                obfuscated: false
            };
        }
    }, {
        key: "getSwitchStatementNode",
        value: function getSwitchStatementNode(discriminant, cases) {
            return {
                type: NodeType_1.NodeType.SwitchStatement,
                discriminant: discriminant,
                cases: cases,
                obfuscated: false
            };
        }
    }, {
        key: "getSwitchCaseNode",
        value: function getSwitchCaseNode(test, consequent) {
            return {
                type: NodeType_1.NodeType.SwitchCase,
                test: test,
                consequent: consequent,
                obfuscated: false
            };
        }
    }, {
        key: "getUpdateExpressionNode",
        value: function getUpdateExpressionNode(operator, argumentExpr) {
            return {
                type: NodeType_1.NodeType.UpdateExpression,
                operator: operator,
                argument: argumentExpr,
                prefix: false,
                obfuscated: false
            };
        }
    }, {
        key: "getVariableDeclarationNode",
        value: function getVariableDeclarationNode() {
            var declarations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var kind = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'var';

            return {
                type: NodeType_1.NodeType.VariableDeclaration,
                declarations: declarations,
                kind: kind,
                obfuscated: false
            };
        }
    }, {
        key: "getVariableDeclaratorNode",
        value: function getVariableDeclaratorNode(id, init) {
            return {
                type: NodeType_1.NodeType.VariableDeclarator,
                id: id,
                init: init,
                obfuscated: false
            };
        }
    }, {
        key: "getWhileStatementNode",
        value: function getWhileStatementNode(test, body) {
            return {
                type: NodeType_1.NodeType.WhileStatement,
                test: test,
                body: body,
                obfuscated: false
            };
        }
    }]);
    return Nodes;
}();

exports.Nodes = Nodes;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.ObfuscationEvents = {
    AfterObfuscation: 'afterObfuscation',
    BeforeObfuscation: 'beforeObfuscation'
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var NodeObfuscatorsReplacers;
(function (NodeObfuscatorsReplacers) {
    NodeObfuscatorsReplacers[NodeObfuscatorsReplacers["BooleanReplacer"] = 0] = "BooleanReplacer";
    NodeObfuscatorsReplacers[NodeObfuscatorsReplacers["IdentifierReplacer"] = 1] = "IdentifierReplacer";
    NodeObfuscatorsReplacers[NodeObfuscatorsReplacers["NumberLiteralReplacer"] = 2] = "NumberLiteralReplacer";
    NodeObfuscatorsReplacers[NodeObfuscatorsReplacers["StringLiteralReplacer"] = 3] = "StringLiteralReplacer";
})(NodeObfuscatorsReplacers = exports.NodeObfuscatorsReplacers || (exports.NodeObfuscatorsReplacers = {}));

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

__webpack_require__(149);
if (!global._babelPolyfill && parseInt(process.version.split('.')[0], 10) < 4) {
    __webpack_require__(134);
}
var ServiceIdentifiers_1 = __webpack_require__(4);
var InversifyContainerFacade_1 = __webpack_require__(57);
var JavaScriptObfuscatorCLI_1 = __webpack_require__(56);
var RandomGeneratorUtils_1 = __webpack_require__(9);

var JavaScriptObfuscator = function () {
    function JavaScriptObfuscator() {
        (0, _classCallCheck3.default)(this, JavaScriptObfuscator);
    }

    (0, _createClass3.default)(JavaScriptObfuscator, null, [{
        key: "obfuscate",
        value: function obfuscate(sourceCode) {
            var inputOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var inversifyContainerFacade = new InversifyContainerFacade_1.InversifyContainerFacade(inputOptions);
            var options = inversifyContainerFacade.get(ServiceIdentifiers_1.ServiceIdentifiers.IOptions);
            RandomGeneratorUtils_1.RandomGeneratorUtils.initializeRandomGenerator(options.seed);
            var javaScriptObfuscator = inversifyContainerFacade.get(ServiceIdentifiers_1.ServiceIdentifiers.IJavaScriptObfuscator);
            var obfuscationResult = javaScriptObfuscator.obfuscate(sourceCode);
            RandomGeneratorUtils_1.RandomGeneratorUtils.clearRandomGenerator();
            return obfuscationResult;
        }
    }, {
        key: "runCLI",
        value: function runCLI(argv) {
            new JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI(argv).run();
        }
    }]);
    return JavaScriptObfuscator;
}();

exports.JavaScriptObfuscator = JavaScriptObfuscator;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _toConsumableArray2 = __webpack_require__(24);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RandomGeneratorUtils_1 = __webpack_require__(9);

var NodeAppender = function () {
    function NodeAppender() {
        (0, _classCallCheck3.default)(this, NodeAppender);
    }

    (0, _createClass3.default)(NodeAppender, null, [{
        key: "appendNode",
        value: function appendNode(blockScopeNode, nodeBodyStatements) {
            if (!NodeAppender.validateBodyStatements(nodeBodyStatements)) {
                nodeBodyStatements = [];
            }
            nodeBodyStatements = NodeAppender.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);
            blockScopeNode.body = [].concat((0, _toConsumableArray3.default)(blockScopeNode.body), (0, _toConsumableArray3.default)(nodeBodyStatements));
        }
    }, {
        key: "appendNodeToOptimalBlockScope",
        value: function appendNodeToOptimalBlockScope(blockScopeStackTraceData, blockScopeNode, nodeBodyStatements) {
            var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            var targetBlockScope = void 0;
            if (!blockScopeStackTraceData.length) {
                targetBlockScope = blockScopeNode;
            } else {
                targetBlockScope = NodeAppender.getOptimalBlockScope(blockScopeStackTraceData, index);
            }
            NodeAppender.prependNode(targetBlockScope, nodeBodyStatements);
        }
    }, {
        key: "getOptimalBlockScope",
        value: function getOptimalBlockScope(blockScopeTraceData, index) {
            var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;

            var firstCall = blockScopeTraceData[index];
            if (deep <= 0) {
                throw new Error("Invalid `deep` argument value. Value should be bigger then 0.");
            }
            if (deep > 1 && firstCall.stackTrace.length) {
                return NodeAppender.getOptimalBlockScope(firstCall.stackTrace, 0, --deep);
            } else {
                return firstCall.callee;
            }
        }
    }, {
        key: "getRandomStackTraceIndex",
        value: function getRandomStackTraceIndex(stackTraceRootLength) {
            return RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomInteger(0, Math.max(0, Math.round(stackTraceRootLength - 1)));
        }
    }, {
        key: "insertNodeAtIndex",
        value: function insertNodeAtIndex(blockScopeNode, nodeBodyStatements, index) {
            if (!NodeAppender.validateBodyStatements(nodeBodyStatements)) {
                nodeBodyStatements = [];
            }
            nodeBodyStatements = NodeAppender.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);
            blockScopeNode.body = [].concat((0, _toConsumableArray3.default)(blockScopeNode.body.slice(0, index)), (0, _toConsumableArray3.default)(nodeBodyStatements), (0, _toConsumableArray3.default)(blockScopeNode.body.slice(index)));
        }
    }, {
        key: "prependNode",
        value: function prependNode(blockScopeNode, nodeBodyStatements) {
            if (!NodeAppender.validateBodyStatements(nodeBodyStatements)) {
                nodeBodyStatements = [];
            }
            nodeBodyStatements = NodeAppender.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);
            blockScopeNode.body = [].concat((0, _toConsumableArray3.default)(nodeBodyStatements), (0, _toConsumableArray3.default)(blockScopeNode.body));
        }
    }, {
        key: "parentizeBodyStatementsBeforeAppend",
        value: function parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(nodeBodyStatements), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var statement = _step.value;

                    statement.parentNode = blockScopeNode;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return nodeBodyStatements;
        }
    }, {
        key: "validateBodyStatements",
        value: function validateBodyStatements(nodeBodyStatements) {
            return nodeBodyStatements.every(function (statementNode) {
                return !!statementNode && statementNode.hasOwnProperty('type');
            });
        }
    }]);
    return NodeAppender;
}();

exports.NodeAppender = NodeAppender;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var AbstractCustomNodeGroup = function () {
    function AbstractCustomNodeGroup(options) {
        (0, _classCallCheck3.default)(this, AbstractCustomNodeGroup);

        this.options = options;
    }

    (0, _createClass3.default)(AbstractCustomNodeGroup, [{
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
    }]);
    return AbstractCustomNodeGroup;
}();
AbstractCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], AbstractCustomNodeGroup);
exports.AbstractCustomNodeGroup = AbstractCustomNodeGroup;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("escodegen");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.SourceMapMode = {
    Inline: 'inline',
    Separate: 'separate'
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var AbstractReplacer = function AbstractReplacer(options) {
    (0, _classCallCheck3.default)(this, AbstractReplacer);

    this.options = options;
};
AbstractReplacer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], AbstractReplacer);
exports.AbstractReplacer = AbstractReplacer;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _freeze = __webpack_require__(46);

var _freeze2 = _interopRequireDefault(_freeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SourceMapMode_1 = __webpack_require__(29);
exports.NO_CUSTOM_NODES_PRESET = (0, _freeze2.default)({
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    domainLock: [],
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
    unicodeEscapeSequence: true
});

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.StringArrayEncoding = {
    base64: 'base64',
    rc4: 'rc4'
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var AbstractCalleeDataExtractor = function AbstractCalleeDataExtractor() {
    (0, _classCallCheck3.default)(this, AbstractCalleeDataExtractor);
};
AbstractCalleeDataExtractor = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__metadata("design:paramtypes", [])], AbstractCalleeDataExtractor);
exports.AbstractCalleeDataExtractor = AbstractCalleeDataExtractor;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RandomGeneratorUtils_1 = __webpack_require__(9);
var Utils_1 = __webpack_require__(14);

var CryptUtils = function () {
    function CryptUtils() {
        (0, _classCallCheck3.default)(this, CryptUtils);
    }

    (0, _createClass3.default)(CryptUtils, null, [{
        key: "btoa",
        value: function btoa(string) {
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var output = '';
            string = encodeURIComponent(string).replace(/%([0-9A-F]{2})/g, function (match, p1) {
                return String.fromCharCode(parseInt("" + Utils_1.Utils.hexadecimalPrefix + p1));
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
            var escapeRegExp = function escapeRegExp(s) {
                return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            };
            var randomMerge = function randomMerge(s1, s2) {
                var i1 = -1,
                    i2 = -1,
                    result = '';
                while (i1 < s1.length || i2 < s2.length) {
                    if (RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomFloat(0, 1) < 0.5 && i2 < s2.length) {
                        result += s2.charAt(++i2);
                    } else {
                        result += s1.charAt(++i1);
                    }
                }
                return result;
            };
            var randomString = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomGenerator().string({
                length: length,
                pool: RandomGeneratorUtils_1.RandomGeneratorUtils.randomGeneratorPool
            });
            var randomStringDiff = randomString.replace(new RegExp('[' + escapeRegExp(str) + ']', 'g'), '');
            var randomStringDiffArray = randomStringDiff.split('');
            RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomGenerator().shuffle(randomStringDiffArray);
            randomStringDiff = randomStringDiffArray.join('');
            return [randomMerge(str, randomStringDiff), randomStringDiff];
        }
    }, {
        key: "rc4",
        value: function rc4(string, key) {
            var s = [],
                j = 0,
                x = void 0,
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

exports.CryptUtils = CryptUtils;

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.JSFuck = {
    False: '![]',
    True: '!![]',
    a: '(false+"")[1]',
    b: '([]["entries"]()+"")[2]',
    c: '([]["fill"]+"")[3]',
    d: '(undefined+"")[2]',
    e: '(true+"")[3]',
    f: '(false+"")[0]',
    g: '(false+[0]+String)[20]',
    h: '(+(101))["toString"](21)[1]',
    i: '([false]+undefined)[10]',
    j: '([]["entries"]()+"")[3]',
    k: '(+(20))["toString"](21)',
    l: '(false+"")[2]',
    m: '(Number+"")[11]',
    n: '(undefined+"")[1]',
    o: '(true+[]["fill"])[10]',
    p: '(+(211))["toString"](31)[1]',
    q: '(+(212))["toString"](31)[1]',
    r: '(true+"")[1]',
    s: '(false+"")[3]',
    t: '(true+"")[0]',
    u: '(undefined+"")[0]',
    v: '(+(31))["toString"](32)',
    w: '(+(32))["toString"](33)',
    x: '(+(101))["toString"](34)[1]',
    y: '(NaN+[Infinity])[10]',
    z: '(+(35))["toString"](36)',
    A: '(+[]+Array)[10]',
    B: '(+[]+Boolean)[10]',
    C: 'Function("return escape")()(("")["italics"]())[2]',
    D: 'Function("return escape")()([]["fill"])["slice"]("-1")',
    E: '(RegExp+"")[12]',
    F: '(+[]+Function)[10]',
    G: '(false+Function("return Date")()())[30]',
    H: '\'H\'',
    I: '(Infinity+"")[0]',
    J: '\'J\'',
    K: '\'K\'',
    L: '\'L\'',
    M: '(true+Function("return Date")()())[30]',
    N: '(NaN+"")[0]',
    O: '(NaN+Function("return{}")())[11]',
    P: '\'P\'',
    Q: '\'Q\'',
    R: '(+[]+RegExp)[10]',
    S: '(+[]+String)[10]',
    T: '(NaN+Function("return Date")()())[30]',
    U: '(NaN+Function("return{}")()["toString"]["call"]())[11]',
    V: '\'V\'',
    W: '\'W\'',
    X: '\'X\'',
    Y: '\'Y\'',
    Z: '\'Z\''
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CalleeDataExtractors;
(function (CalleeDataExtractors) {
    CalleeDataExtractors[CalleeDataExtractors["FunctionDeclarationCalleeDataExtractor"] = 0] = "FunctionDeclarationCalleeDataExtractor";
    CalleeDataExtractors[CalleeDataExtractors["FunctionExpressionCalleeDataExtractor"] = 1] = "FunctionExpressionCalleeDataExtractor";
    CalleeDataExtractors[CalleeDataExtractors["ObjectExpressionCalleeDataExtractor"] = 2] = "ObjectExpressionCalleeDataExtractor";
})(CalleeDataExtractors = exports.CalleeDataExtractors || (exports.CalleeDataExtractors = {}));

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CustomNodeGroups;
(function (CustomNodeGroups) {
    CustomNodeGroups[CustomNodeGroups["ConsoleOutputCustomNodeGroup"] = 0] = "ConsoleOutputCustomNodeGroup";
    CustomNodeGroups[CustomNodeGroups["DebugProtectionCustomNodeGroup"] = 1] = "DebugProtectionCustomNodeGroup";
    CustomNodeGroups[CustomNodeGroups["DomainLockCustomNodeGroup"] = 2] = "DomainLockCustomNodeGroup";
    CustomNodeGroups[CustomNodeGroups["SelfDefendingCustomNodeGroup"] = 3] = "SelfDefendingCustomNodeGroup";
    CustomNodeGroups[CustomNodeGroups["StringArrayCustomNodeGroup"] = 4] = "StringArrayCustomNodeGroup";
})(CustomNodeGroups = exports.CustomNodeGroups || (exports.CustomNodeGroups = {}));

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var NodeControlFlowReplacers;
(function (NodeControlFlowReplacers) {
    NodeControlFlowReplacers[NodeControlFlowReplacers["BinaryExpressionControlFlowReplacer"] = 0] = "BinaryExpressionControlFlowReplacer";
    NodeControlFlowReplacers[NodeControlFlowReplacers["CallExpressionControlFlowReplacer"] = 1] = "CallExpressionControlFlowReplacer";
    NodeControlFlowReplacers[NodeControlFlowReplacers["LogicalExpressionControlFlowReplacer"] = 2] = "LogicalExpressionControlFlowReplacer";
})(NodeControlFlowReplacers = exports.NodeControlFlowReplacers || (exports.NodeControlFlowReplacers = {}));

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var NodeTransformers;
(function (NodeTransformers) {
    NodeTransformers[NodeTransformers["BlockStatementControlFlowTransformer"] = 0] = "BlockStatementControlFlowTransformer";
    NodeTransformers[NodeTransformers["FunctionControlFlowTransformer"] = 1] = "FunctionControlFlowTransformer";
    NodeTransformers[NodeTransformers["CatchClauseTransformer"] = 2] = "CatchClauseTransformer";
    NodeTransformers[NodeTransformers["FunctionDeclarationTransformer"] = 3] = "FunctionDeclarationTransformer";
    NodeTransformers[NodeTransformers["FunctionTransformer"] = 4] = "FunctionTransformer";
    NodeTransformers[NodeTransformers["LabeledStatementTransformer"] = 5] = "LabeledStatementTransformer";
    NodeTransformers[NodeTransformers["LiteralTransformer"] = 6] = "LiteralTransformer";
    NodeTransformers[NodeTransformers["MemberExpressionTransformer"] = 7] = "MemberExpressionTransformer";
    NodeTransformers[NodeTransformers["MethodDefinitionTransformer"] = 8] = "MethodDefinitionTransformer";
    NodeTransformers[NodeTransformers["ObjectExpressionTransformer"] = 9] = "ObjectExpressionTransformer";
    NodeTransformers[NodeTransformers["TemplateLiteralTransformer"] = 10] = "TemplateLiteralTransformer";
    NodeTransformers[NodeTransformers["VariableDeclarationTransformer"] = 11] = "VariableDeclarationTransformer";
})(NodeTransformers = exports.NodeTransformers || (exports.NodeTransformers = {}));

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var AbstractControlFlowReplacer = AbstractControlFlowReplacer_1 = function () {
    function AbstractControlFlowReplacer(customNodeFactory, options) {
        (0, _classCallCheck3.default)(this, AbstractControlFlowReplacer);

        this.replacerDataByControlFlowStorageId = new _map2.default();
        this.customNodeFactory = customNodeFactory;
        this.options = options;
    }

    (0, _createClass3.default)(AbstractControlFlowReplacer, [{
        key: "insertCustomNodeToControlFlowStorage",
        value: function insertCustomNodeToControlFlowStorage(customNode, controlFlowStorage, replacerId, usingExistingIdentifierChance) {
            var controlFlowStorageId = controlFlowStorage.getStorageId();
            var storageKeysById = AbstractControlFlowReplacer_1.getStorageKeysByIdForCurrentStorage(this.replacerDataByControlFlowStorageId, controlFlowStorageId);
            var storageKeysForCurrentId = storageKeysById.get(replacerId);
            if (RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomFloat(0, 1) > usingExistingIdentifierChance && storageKeysForCurrentId && storageKeysForCurrentId.length) {
                return RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomGenerator().pickone(storageKeysForCurrentId);
            }
            var generateStorageKey = function generateStorageKey(length) {
                var storageKey = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomString(length);
                if (controlFlowStorage.getStorage().has(storageKey)) {
                    return generateStorageKey(length);
                }
                return storageKey;
            };
            var storageKey = generateStorageKey(3);
            storageKeysById.set(replacerId, [storageKey]);
            this.replacerDataByControlFlowStorageId.set(controlFlowStorageId, storageKeysById);
            controlFlowStorage.set(storageKey, customNode);
            return storageKey;
        }
    }], [{
        key: "getStorageKeysByIdForCurrentStorage",
        value: function getStorageKeysByIdForCurrentStorage(identifierDataByControlFlowStorageId, controlFlowStorageId) {
            var storageKeysById = void 0;
            if (identifierDataByControlFlowStorageId.has(controlFlowStorageId)) {
                storageKeysById = identifierDataByControlFlowStorageId.get(controlFlowStorageId);
            } else {
                storageKeysById = new _map2.default();
            }
            return storageKeysById;
        }
    }]);
    return AbstractControlFlowReplacer;
}();
AbstractControlFlowReplacer = AbstractControlFlowReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], AbstractControlFlowReplacer);
exports.AbstractControlFlowReplacer = AbstractControlFlowReplacer;
var AbstractControlFlowReplacer_1;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var AbstractControlFlowReplacer_1 = __webpack_require__(41);
var CustomNodes_1 = __webpack_require__(15);
var Node_1 = __webpack_require__(12);
var ExpressionWithOperatorControlFlowReplacer = function (_AbstractControlFlowR) {
    (0, _inherits3.default)(ExpressionWithOperatorControlFlowReplacer, _AbstractControlFlowR);

    function ExpressionWithOperatorControlFlowReplacer(customNodeFactory, options) {
        (0, _classCallCheck3.default)(this, ExpressionWithOperatorControlFlowReplacer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ExpressionWithOperatorControlFlowReplacer.__proto__ || (0, _getPrototypeOf2.default)(ExpressionWithOperatorControlFlowReplacer)).call(this, customNodeFactory, options));

        _this.replacerDataByControlFlowStorageId = new _map2.default();
        return _this;
    }

    (0, _createClass3.default)(ExpressionWithOperatorControlFlowReplacer, [{
        key: "getControlFlowStorageCallNode",
        value: function getControlFlowStorageCallNode(controlFlowStorageId, storageKey, leftExpression, rightExpression) {
            var controlFlowStorageCallCustomNode = this.customNodeFactory(CustomNodes_1.CustomNodes.ExpressionWithOperatorControlFlowStorageCallNode);
            controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey, leftExpression, rightExpression);
            var statementNode = controlFlowStorageCallCustomNode.getNode()[0];
            if (!statementNode || !Node_1.Node.isExpressionStatementNode(statementNode)) {
                throw new Error("`controlFlowStorageCallCustomNode.getNode()[0]` should returns array with `ExpressionStatement` node");
            }
            return statementNode.expression;
        }
    }]);
    return ExpressionWithOperatorControlFlowReplacer;
}(AbstractControlFlowReplacer_1.AbstractControlFlowReplacer);
ExpressionWithOperatorControlFlowReplacer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], ExpressionWithOperatorControlFlowReplacer);
exports.ExpressionWithOperatorControlFlowReplacer = ExpressionWithOperatorControlFlowReplacer;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _freeze = __webpack_require__(46);

var _freeze2 = _interopRequireDefault(_freeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SourceMapMode_1 = __webpack_require__(29);
exports.DEFAULT_PRESET = (0, _freeze2.default)({
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    domainLock: [],
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
    stringArrayThreshold: 0.8,
    unicodeEscapeSequence: true
});

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toConsumableArray2 = __webpack_require__(24);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var Initializable_1 = __webpack_require__(10);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var Utils_1 = __webpack_require__(14);
var MapStorage = function () {
    function MapStorage() {
        (0, _classCallCheck3.default)(this, MapStorage);
    }

    (0, _createClass3.default)(MapStorage, [{
        key: "get",
        value: function get(key) {
            var value = this.storage.get(key);
            if (!value) {
                throw new Error("No value found in map storage with key `" + key + "`");
            }
            return value;
        }
    }, {
        key: "getKeyOf",
        value: function getKeyOf(value) {
            return Utils_1.Utils.mapGetFirstKeyOf(this.storage, value);
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
        key: "initialize",
        value: function initialize() {
            this.storage = new _map2.default();
            this.storageId = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomString(6);
        }
    }, {
        key: "mergeWith",
        value: function mergeWith(storage) {
            var mergeId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            this.storage = new _map2.default([].concat((0, _toConsumableArray3.default)(this.storage), (0, _toConsumableArray3.default)(storage.getStorage())));
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
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", _map2.default)], MapStorage.prototype, "storage", void 0);
MapStorage = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__metadata("design:paramtypes", [])], MapStorage);
exports.MapStorage = MapStorage;

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/array/from");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/freeze");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/get");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("esprima");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var esprima = __webpack_require__(49);
var escodegen = __webpack_require__(28);
var JavaScriptObfuscatorInternal = JavaScriptObfuscatorInternal_1 = function () {
    function JavaScriptObfuscatorInternal(obfuscator, sourceMapCorrector, options) {
        (0, _classCallCheck3.default)(this, JavaScriptObfuscatorInternal);

        this.obfuscator = obfuscator;
        this.sourceMapCorrector = sourceMapCorrector;
        this.options = options;
    }

    (0, _createClass3.default)(JavaScriptObfuscatorInternal, [{
        key: "obfuscate",
        value: function obfuscate(sourceCode) {
            var astTree = esprima.parse(sourceCode, { loc: this.options.sourceMap });
            var obfuscatedAstTree = this.obfuscator.obfuscateAstTree(astTree);
            var generatorOutput = this.generateCode(sourceCode, obfuscatedAstTree);
            return this.getObfuscationResult(generatorOutput);
        }
    }, {
        key: "generateCode",
        value: function generateCode(sourceCode, astTree) {
            var escodegenParams = tslib_1.__assign({}, JavaScriptObfuscatorInternal_1.escodegenParams);
            if (this.options.sourceMap) {
                escodegenParams.sourceMap = 'sourceMap';
                escodegenParams.sourceContent = sourceCode;
            }
            escodegenParams.format = {
                compact: this.options.compact
            };
            var generatorOutput = escodegen.generate(astTree, escodegenParams);
            generatorOutput.map = generatorOutput.map ? generatorOutput.map.toString() : '';
            return generatorOutput;
        }
    }, {
        key: "getObfuscationResult",
        value: function getObfuscationResult(generatorOutput) {
            return this.sourceMapCorrector.correct(generatorOutput.code, generatorOutput.map);
        }
    }]);
    return JavaScriptObfuscatorInternal;
}();
JavaScriptObfuscatorInternal.escodegenParams = {
    verbatim: 'x-verbatim-property',
    sourceMapWithCode: true
};
JavaScriptObfuscatorInternal = JavaScriptObfuscatorInternal_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ISourceMapCorrector)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object, Object])], JavaScriptObfuscatorInternal);
exports.JavaScriptObfuscatorInternal = JavaScriptObfuscatorInternal;
var JavaScriptObfuscatorInternal_1;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var Initializable_1 = __webpack_require__(10);
var ObfuscationResult = function () {
    function ObfuscationResult() {
        (0, _classCallCheck3.default)(this, ObfuscationResult);
    }

    (0, _createClass3.default)(ObfuscationResult, [{
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
ObfuscationResult = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__metadata("design:paramtypes", [])], ObfuscationResult);
exports.ObfuscationResult = ObfuscationResult;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _defineProperty2 = __webpack_require__(140);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = __webpack_require__(24);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var estraverse = __webpack_require__(17);
var NodeTransformers_1 = __webpack_require__(40);
var NodeType_1 = __webpack_require__(18);
var ObfuscationEvents_1 = __webpack_require__(22);
var VisitorDirection_1 = __webpack_require__(86);
var Node_1 = __webpack_require__(12);
var NodeUtils_1 = __webpack_require__(8);
var Obfuscator = Obfuscator_1 = function () {
    function Obfuscator(stackTraceAnalyzer, obfuscationEventEmitter, customNodeGroupStorage, nodeTransformersFactory, options) {
        (0, _classCallCheck3.default)(this, Obfuscator);

        this.stackTraceAnalyzer = stackTraceAnalyzer;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
        this.customNodeGroupStorage = customNodeGroupStorage;
        this.nodeTransformersFactory = nodeTransformersFactory;
        this.options = options;
    }

    (0, _createClass3.default)(Obfuscator, [{
        key: "obfuscateAstTree",
        value: function obfuscateAstTree(astTree) {
            var _this = this;

            if (Node_1.Node.isProgramNode(astTree) && !astTree.body.length) {
                return astTree;
            }
            astTree = NodeUtils_1.NodeUtils.parentize(astTree);
            var stackTraceData = this.stackTraceAnalyzer.analyze(astTree.body);
            this.customNodeGroupStorage.getStorage().forEach(function (customNodeGroup) {
                customNodeGroup.initialize();
                _this.obfuscationEventEmitter.once(customNodeGroup.getAppendEvent(), customNodeGroup.appendCustomNodes.bind(customNodeGroup));
            });
            this.obfuscationEventEmitter.emit(ObfuscationEvents_1.ObfuscationEvents.BeforeObfuscation, astTree, stackTraceData);
            if (this.options.controlFlowFlattening) {
                astTree = this.transformAstTree(astTree, VisitorDirection_1.VisitorDirection.leave, this.nodeTransformersFactory(Obfuscator_1.controlFlowTransformersMap));
            }
            astTree = this.transformAstTree(astTree, VisitorDirection_1.VisitorDirection.enter, this.nodeTransformersFactory(new _map2.default([].concat((0, _toConsumableArray3.default)(Obfuscator_1.convertingTransformersMap), (0, _toConsumableArray3.default)(Obfuscator_1.obfuscatingTransformersMap)))));
            this.obfuscationEventEmitter.emit(ObfuscationEvents_1.ObfuscationEvents.AfterObfuscation, astTree, stackTraceData);
            return astTree;
        }
    }, {
        key: "transformAstTree",
        value: function transformAstTree(astTree, direction, nodeTransformersConcreteFactory) {
            estraverse.replace(astTree, (0, _defineProperty3.default)({}, direction, function (node, parentNode) {
                var nodeTransformers = nodeTransformersConcreteFactory(node.type);
                nodeTransformers.forEach(function (nodeTransformer) {
                    node = nodeTransformer.transformNode(node, parentNode);
                });
                return node;
            }));
            return astTree;
        }
    }]);
    return Obfuscator;
}();
Obfuscator.controlFlowTransformersMap = new _map2.default([[NodeType_1.NodeType.BlockStatement, [NodeTransformers_1.NodeTransformers.BlockStatementControlFlowTransformer]], [NodeType_1.NodeType.FunctionDeclaration, [NodeTransformers_1.NodeTransformers.FunctionControlFlowTransformer]], [NodeType_1.NodeType.FunctionExpression, [NodeTransformers_1.NodeTransformers.FunctionControlFlowTransformer]]]);
Obfuscator.convertingTransformersMap = new _map2.default([[NodeType_1.NodeType.MemberExpression, [NodeTransformers_1.NodeTransformers.MemberExpressionTransformer]], [NodeType_1.NodeType.MethodDefinition, [NodeTransformers_1.NodeTransformers.MethodDefinitionTransformer]], [NodeType_1.NodeType.TemplateLiteral, [NodeTransformers_1.NodeTransformers.TemplateLiteralTransformer]]]);
Obfuscator.obfuscatingTransformersMap = new _map2.default([[NodeType_1.NodeType.ArrowFunctionExpression, [NodeTransformers_1.NodeTransformers.FunctionTransformer]], [NodeType_1.NodeType.ClassDeclaration, [NodeTransformers_1.NodeTransformers.FunctionDeclarationTransformer]], [NodeType_1.NodeType.CatchClause, [NodeTransformers_1.NodeTransformers.CatchClauseTransformer]], [NodeType_1.NodeType.FunctionDeclaration, [NodeTransformers_1.NodeTransformers.FunctionDeclarationTransformer, NodeTransformers_1.NodeTransformers.FunctionTransformer]], [NodeType_1.NodeType.FunctionExpression, [NodeTransformers_1.NodeTransformers.FunctionTransformer]], [NodeType_1.NodeType.ObjectExpression, [NodeTransformers_1.NodeTransformers.ObjectExpressionTransformer]], [NodeType_1.NodeType.VariableDeclaration, [NodeTransformers_1.NodeTransformers.VariableDeclarationTransformer]], [NodeType_1.NodeType.LabeledStatement, [NodeTransformers_1.NodeTransformers.LabeledStatementTransformer]], [NodeType_1.NodeType.Literal, [NodeTransformers_1.NodeTransformers.LiteralTransformer]]]);
Obfuscator = Obfuscator_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IStackTraceAnalyzer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TCustomNodeGroupStorage)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeTransformer)), tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Function, Object])], Obfuscator);
exports.Obfuscator = Obfuscator;
var Obfuscator_1;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var SourceMapMode_1 = __webpack_require__(29);
var CryptUtils_1 = __webpack_require__(34);
var SourceMapCorrector = function () {
    function SourceMapCorrector(obfuscationResultFactory, options) {
        (0, _classCallCheck3.default)(this, SourceMapCorrector);

        this.obfuscationResultFactory = obfuscationResultFactory;
        this.options = options;
    }

    (0, _createClass3.default)(SourceMapCorrector, [{
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
                    sourceMappingUrl += "data:application/json;base64," + CryptUtils_1.CryptUtils.btoa(sourceMap);
                    break;
                case SourceMapMode_1.SourceMapMode.Separate:
                default:
                    if (!sourceMapUrl) {
                        return obfuscatedCode;
                    }
                    sourceMappingUrl += sourceMapUrl;
                    break;
            }
            return obfuscatedCode + "\n" + sourceMappingUrl;
        }
    }]);
    return SourceMapCorrector;
}();
SourceMapCorrector = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscationResult)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], SourceMapCorrector);
exports.SourceMapCorrector = SourceMapCorrector;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = __webpack_require__(146);
var mkdirp = __webpack_require__(148);
var path = __webpack_require__(50);

var CLIUtils = function () {
    function CLIUtils() {
        (0, _classCallCheck3.default)(this, CLIUtils);
    }

    (0, _createClass3.default)(CLIUtils, null, [{
        key: "getOutputCodePath",
        value: function getOutputCodePath(outputPath, inputPath) {
            if (outputPath) {
                return outputPath;
            }
            return inputPath.split('.').map(function (value, index) {
                return index === 0 ? value + "-obfuscated" : value;
            }).join('.');
        }
    }, {
        key: "getOutputSourceMapPath",
        value: function getOutputSourceMapPath(outputCodePath) {
            var sourceMapFileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            if (sourceMapFileName) {
                outputCodePath = outputCodePath.substr(0, outputCodePath.lastIndexOf('/')) + "/" + sourceMapFileName;
            }
            if (!/\.js\.map$/.test(outputCodePath)) {
                outputCodePath = outputCodePath.split('.')[0] + ".js.map";
            } else if (/\.js$/.test(outputCodePath)) {
                outputCodePath += '.map';
            }
            return outputCodePath;
        }
    }, {
        key: "getPackageConfig",
        value: function getPackageConfig() {
            return JSON.parse(fs.readFileSync(path.join(path.dirname(fs.realpathSync(process.argv[1])), '../package.json'), CLIUtils.encoding));
        }
    }, {
        key: "isFilePath",
        value: function isFilePath(filePath) {
            try {
                return fs.statSync(filePath).isFile();
            } catch (e) {
                return false;
            }
        }
    }, {
        key: "readFile",
        value: function readFile(inputPath) {
            return fs.readFileSync(inputPath, CLIUtils.encoding);
        }
    }, {
        key: "validateInputPath",
        value: function validateInputPath(inputPath) {
            if (!CLIUtils.isFilePath(inputPath)) {
                throw new ReferenceError("Given input path must be a valid file path");
            }
            if (!CLIUtils.availableInputExtensions.includes(path.extname(inputPath))) {
                throw new ReferenceError("Input file must have .js extension");
            }
        }
    }, {
        key: "writeFile",
        value: function writeFile(outputPath, data) {
            mkdirp.sync(path.dirname(outputPath));
            fs.writeFileSync(outputPath, data, {
                encoding: CLIUtils.encoding
            });
        }
    }]);
    return CLIUtils;
}();

CLIUtils.availableInputExtensions = ['.js'];
CLIUtils.encoding = 'utf8';
exports.CLIUtils = CLIUtils;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _keys = __webpack_require__(47);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var commander = __webpack_require__(144);
var path = __webpack_require__(50);
var SourceMapMode_1 = __webpack_require__(29);
var StringArrayEncoding_1 = __webpack_require__(32);
var Default_1 = __webpack_require__(43);
var CLIUtils_1 = __webpack_require__(55);
var JavaScriptObfuscator_1 = __webpack_require__(25);

var JavaScriptObfuscatorCLI = function () {
    function JavaScriptObfuscatorCLI(argv) {
        (0, _classCallCheck3.default)(this, JavaScriptObfuscatorCLI);

        this.data = '';
        this.rawArguments = argv;
        this.arguments = this.rawArguments.slice(2);
    }

    (0, _createClass3.default)(JavaScriptObfuscatorCLI, [{
        key: "run",
        value: function run() {
            this.configureCommands();
            if (!this.arguments.length || this.arguments.includes('--help')) {
                this.commands.outputHelp();
                return;
            }
            this.inputPath = this.arguments[0];
            CLIUtils_1.CLIUtils.validateInputPath(this.inputPath);
            this.getData();
            this.processData();
        }
    }, {
        key: "buildOptions",
        value: function buildOptions() {
            var inputOptions = {};
            var availableOptions = (0, _keys2.default)(Default_1.DEFAULT_PRESET);
            for (var option in this.commands) {
                if (!this.commands.hasOwnProperty(option)) {
                    continue;
                }
                if (!availableOptions.includes(option)) {
                    continue;
                }
                inputOptions[option] = this.commands[option];
            }
            return tslib_1.__assign({}, Default_1.DEFAULT_PRESET, inputOptions);
        }
    }, {
        key: "configureCommands",
        value: function configureCommands() {
            this.commands = new commander.Command().version(JavaScriptObfuscatorCLI.getBuildVersion(), '-v, --version').usage('<inputPath> [options]').option('-o, --output <path>', 'Output path for obfuscated code').option('--compact <boolean>', 'Disable one line output code compacting', JavaScriptObfuscatorCLI.parseBoolean).option('--controlFlowFlattening <boolean>', 'Enables control flow flattening', JavaScriptObfuscatorCLI.parseBoolean).option('--controlFlowFlatteningThreshold <number>', 'The probability that the control flow flattening transformation will be applied to the node', parseFloat).option('--debugProtection <boolean>', 'Disable browser Debug panel (can cause DevTools enabled browser freeze)', JavaScriptObfuscatorCLI.parseBoolean).option('--debugProtectionInterval <boolean>', 'Disable browser Debug panel even after page was loaded (can cause DevTools enabled browser freeze)', JavaScriptObfuscatorCLI.parseBoolean).option('--disableConsoleOutput <boolean>', 'Allow console.log, console.info, console.error and console.warn messages output into browser console', JavaScriptObfuscatorCLI.parseBoolean).option('--domainLock <list>', 'Blocks the execution of the code in domains that do not match the passed RegExp patterns (comma separated)', function (value) {
                return value.split(',');
            }).option('--reservedNames <list>', 'Disable obfuscation of variable names, function names and names of function parameters that match the passed RegExp patterns (comma separated)', function (value) {
                return value.split(',');
            }).option('--rotateStringArray <boolean>', 'Disable rotation of unicode array values during obfuscation', JavaScriptObfuscatorCLI.parseBoolean).option('--seed <number>', 'Sets seed for random generator. This is useful for creating repeatable results.', parseFloat).option('--selfDefending <boolean>', 'Disables self-defending for obfuscated code', JavaScriptObfuscatorCLI.parseBoolean).option('--sourceMap <boolean>', 'Enables source map generation', JavaScriptObfuscatorCLI.parseBoolean).option('--sourceMapBaseUrl <string>', 'Sets base url to the source map import url when `--sourceMapMode=separate`').option('--sourceMapFileName <string>', 'Sets file name for output source map when `--sourceMapMode=separate`').option('--sourceMapMode <string> [inline, separate]', 'Specify source map output mode', JavaScriptObfuscatorCLI.parseSourceMapMode).option('--stringArray <boolean>', 'Disables gathering of all literal strings into an array and replacing every literal string with an array call', JavaScriptObfuscatorCLI.parseBoolean).option('--stringArrayEncoding <boolean|string> [true, false, base64, rc4]', 'Encodes all strings in strings array using base64 or rc4 (this option can slow down your code speed', JavaScriptObfuscatorCLI.parseStringArrayEncoding).option('--stringArrayThreshold <number>', 'The probability that the literal string will be inserted into stringArray (Default: 0.8, Min: 0, Max: 1)', parseFloat).option('--unicodeEscapeSequence <boolean>', 'Allows to enable/disable string conversion to unicode escape sequence', JavaScriptObfuscatorCLI.parseBoolean).parse(this.rawArguments);
            this.commands.on('--help', function () {
                console.log('  Examples:\n');
                console.log('    %> javascript-obfuscator in.js --compact true --selfDefending false');
                console.log('    %> javascript-obfuscator in.js --output out.js --compact true --selfDefending false');
                console.log('');
            });
        }
    }, {
        key: "getData",
        value: function getData() {
            this.data = CLIUtils_1.CLIUtils.readFile(this.inputPath);
        }
    }, {
        key: "processData",
        value: function processData() {
            var options = this.buildOptions();
            var outputCodePath = CLIUtils_1.CLIUtils.getOutputCodePath(this.commands.output, this.inputPath);
            if (options.sourceMap) {
                this.processDataWithSourceMap(outputCodePath, options);
            } else {
                this.processDataWithoutSourceMap(outputCodePath, options);
            }
        }
    }, {
        key: "processDataWithoutSourceMap",
        value: function processDataWithoutSourceMap(outputCodePath, options) {
            var obfuscatedCode = JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(this.data, options).getObfuscatedCode();
            CLIUtils_1.CLIUtils.writeFile(outputCodePath, obfuscatedCode);
        }
    }, {
        key: "processDataWithSourceMap",
        value: function processDataWithSourceMap(outputCodePath, options) {
            var outputSourceMapPath = CLIUtils_1.CLIUtils.getOutputSourceMapPath(outputCodePath, options.sourceMapFileName || '');
            options = tslib_1.__assign({}, options, { sourceMapFileName: path.basename(outputSourceMapPath) });
            var obfuscationResult = JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(this.data, options);
            CLIUtils_1.CLIUtils.writeFile(outputCodePath, obfuscationResult.getObfuscatedCode());
            if (options.sourceMapMode === 'separate' && obfuscationResult.getSourceMap()) {
                CLIUtils_1.CLIUtils.writeFile(outputSourceMapPath, obfuscationResult.getSourceMap());
            }
        }
    }], [{
        key: "getBuildVersion",
        value: function getBuildVersion() {
            return CLIUtils_1.CLIUtils.getPackageConfig().version;
        }
    }, {
        key: "parseBoolean",
        value: function parseBoolean(value) {
            return value === 'true' || value === '1';
        }
    }, {
        key: "parseSourceMapMode",
        value: function parseSourceMapMode(value) {
            var availableMode = (0, _keys2.default)(SourceMapMode_1.SourceMapMode).some(function (key) {
                return SourceMapMode_1.SourceMapMode[key] === value;
            });
            if (!availableMode) {
                throw new ReferenceError('Invalid value of `--sourceMapMode` option');
            }
            return value;
        }
    }, {
        key: "parseStringArrayEncoding",
        value: function parseStringArrayEncoding(value) {
            switch (value) {
                case 'true':
                case '1':
                case StringArrayEncoding_1.StringArrayEncoding.base64:
                    return true;
                case StringArrayEncoding_1.StringArrayEncoding.rc4:
                    return StringArrayEncoding_1.StringArrayEncoding.rc4;
                default:
                    return false;
            }
        }
    }]);
    return JavaScriptObfuscatorCLI;
}();

exports.JavaScriptObfuscatorCLI = JavaScriptObfuscatorCLI;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var ControlFlowTransformersModule_1 = __webpack_require__(59);
var CustomNodesModule_1 = __webpack_require__(58);
var ObfuscatingTransformersModule_1 = __webpack_require__(61);
var NodeTransformersModule_1 = __webpack_require__(60);
var StackTraceAnalyzerModule_1 = __webpack_require__(62);
var StoragesModule_1 = __webpack_require__(63);
var JavaScriptObfuscatorInternal_1 = __webpack_require__(51);
var ObfuscationEventEmitter_1 = __webpack_require__(87);
var ObfuscationResult_1 = __webpack_require__(52);
var Obfuscator_1 = __webpack_require__(53);
var Options_1 = __webpack_require__(107);
var SourceMapCorrector_1 = __webpack_require__(54);

var InversifyContainerFacade = function () {
    function InversifyContainerFacade(options) {
        (0, _classCallCheck3.default)(this, InversifyContainerFacade);

        this.container = new inversify_1.Container();
        this.container.bind(ServiceIdentifiers_1.ServiceIdentifiers.IOptions).toDynamicValue(function () {
            return new Options_1.Options(options);
        }).inSingletonScope();
        this.container.bind(ServiceIdentifiers_1.ServiceIdentifiers.IJavaScriptObfuscator).to(JavaScriptObfuscatorInternal_1.JavaScriptObfuscatorInternal).inSingletonScope();
        this.container.bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscator).to(Obfuscator_1.Obfuscator).inSingletonScope();
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
        this.container.load(StoragesModule_1.storagesModule);
        this.container.load(StackTraceAnalyzerModule_1.stackTraceAnalyzerModule);
        this.container.load(CustomNodesModule_1.customNodesModule);
        this.container.load(NodeTransformersModule_1.nodeTransformersModule);
        this.container.load(ControlFlowTransformersModule_1.controlFlowTransformersModule);
        this.container.load(ObfuscatingTransformersModule_1.obfuscatingTransformersModule);
    }

    (0, _createClass3.default)(InversifyContainerFacade, [{
        key: "get",
        value: function get(serviceIdentifier) {
            return this.container.get(serviceIdentifier);
        }
    }, {
        key: "getNamed",
        value: function getNamed(serviceIdentifier, named) {
            return this.container.getNamed(serviceIdentifier, named);
        }
    }]);
    return InversifyContainerFacade;
}();

exports.InversifyContainerFacade = InversifyContainerFacade;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var CustomNodes_1 = __webpack_require__(15);
var CustomNodeGroups_1 = __webpack_require__(38);
var ConsoleOutputCustomNodeGroup_1 = __webpack_require__(65);
var DebugProtectionCustomNodeGroup_1 = __webpack_require__(76);
var DomainLockCustomNodeGroup_1 = __webpack_require__(78);
var SelfDefendingCustomNodeGroup_1 = __webpack_require__(81);
var StringArrayCustomNodeGroup_1 = __webpack_require__(85);
var BinaryExpressionFunctionNode_1 = __webpack_require__(66);
var BlockStatementControlFlowFlatteningNode_1 = __webpack_require__(67);
var CallExpressionControlFlowStorageCallNode_1 = __webpack_require__(70);
var CallExpressionFunctionNode_1 = __webpack_require__(68);
var ControlFlowStorageNode_1 = __webpack_require__(71);
var ConsoleOutputDisableExpressionNode_1 = __webpack_require__(64);
var DebugProtectionFunctionCallNode_1 = __webpack_require__(73);
var DebugProtectionFunctionIntervalNode_1 = __webpack_require__(74);
var DebugProtectionFunctionNode_1 = __webpack_require__(75);
var DomainLockNode_1 = __webpack_require__(77);
var ExpressionWithOperatorControlFlowStorageCallNode_1 = __webpack_require__(72);
var LogicalExpressionFunctionNode_1 = __webpack_require__(69);
var NodeCallsControllerFunctionNode_1 = __webpack_require__(79);
var SelfDefendingUnicodeNode_1 = __webpack_require__(80);
var StringArrayCallsWrapper_1 = __webpack_require__(82);
var StringArrayNode_1 = __webpack_require__(83);
var StringArrayRotateFunctionNode_1 = __webpack_require__(84);
exports.customNodesModule = new inversify_1.ContainerModule(function (bind) {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(BinaryExpressionFunctionNode_1.BinaryExpressionFunctionNode).whenTargetNamed(CustomNodes_1.CustomNodes.BinaryExpressionFunctionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(BlockStatementControlFlowFlatteningNode_1.BlockStatementControlFlowFlatteningNode).whenTargetNamed(CustomNodes_1.CustomNodes.BlockStatementControlFlowFlatteningNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(CallExpressionControlFlowStorageCallNode_1.CallExpressionControlFlowStorageCallNode).whenTargetNamed(CustomNodes_1.CustomNodes.CallExpressionControlFlowStorageCallNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(CallExpressionFunctionNode_1.CallExpressionFunctionNode).whenTargetNamed(CustomNodes_1.CustomNodes.CallExpressionFunctionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(ControlFlowStorageNode_1.ControlFlowStorageNode).whenTargetNamed(CustomNodes_1.CustomNodes.ControlFlowStorageNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(ConsoleOutputDisableExpressionNode_1.ConsoleOutputDisableExpressionNode).whenTargetNamed(CustomNodes_1.CustomNodes.ConsoleOutputDisableExpressionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(DebugProtectionFunctionCallNode_1.DebugProtectionFunctionCallNode).whenTargetNamed(CustomNodes_1.CustomNodes.DebugProtectionFunctionCallNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(DebugProtectionFunctionIntervalNode_1.DebugProtectionFunctionIntervalNode).whenTargetNamed(CustomNodes_1.CustomNodes.DebugProtectionFunctionIntervalNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(DebugProtectionFunctionNode_1.DebugProtectionFunctionNode).whenTargetNamed(CustomNodes_1.CustomNodes.DebugProtectionFunctionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(DomainLockNode_1.DomainLockNode).whenTargetNamed(CustomNodes_1.CustomNodes.DomainLockNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(ExpressionWithOperatorControlFlowStorageCallNode_1.ExpressionWithOperatorControlFlowStorageCallNode).whenTargetNamed(CustomNodes_1.CustomNodes.ExpressionWithOperatorControlFlowStorageCallNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(LogicalExpressionFunctionNode_1.LogicalExpressionFunctionNode).whenTargetNamed(CustomNodes_1.CustomNodes.LogicalExpressionFunctionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(NodeCallsControllerFunctionNode_1.NodeCallsControllerFunctionNode).whenTargetNamed(CustomNodes_1.CustomNodes.NodeCallsControllerFunctionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(SelfDefendingUnicodeNode_1.SelfDefendingUnicodeNode).whenTargetNamed(CustomNodes_1.CustomNodes.SelfDefendingUnicodeNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(StringArrayCallsWrapper_1.StringArrayCallsWrapper).whenTargetNamed(CustomNodes_1.CustomNodes.StringArrayCallsWrapper);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(StringArrayNode_1.StringArrayNode).whenTargetNamed(CustomNodes_1.CustomNodes.StringArrayNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode).toConstructor(StringArrayRotateFunctionNode_1.StringArrayRotateFunctionNode).whenTargetNamed(CustomNodes_1.CustomNodes.StringArrayRotateFunctionNode);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(ConsoleOutputCustomNodeGroup_1.ConsoleOutputCustomNodeGroup).whenTargetNamed(CustomNodeGroups_1.CustomNodeGroups.ConsoleOutputCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(DebugProtectionCustomNodeGroup_1.DebugProtectionCustomNodeGroup).whenTargetNamed(CustomNodeGroups_1.CustomNodeGroups.DebugProtectionCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(DomainLockCustomNodeGroup_1.DomainLockCustomNodeGroup).whenTargetNamed(CustomNodeGroups_1.CustomNodeGroups.DomainLockCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(SelfDefendingCustomNodeGroup_1.SelfDefendingCustomNodeGroup).whenTargetNamed(CustomNodeGroups_1.CustomNodeGroups.SelfDefendingCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(StringArrayCustomNodeGroup_1.StringArrayCustomNodeGroup).whenTargetNamed(CustomNodeGroups_1.CustomNodeGroups.StringArrayCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode).toFactory(function (context) {
        var cache = new _map2.default();
        var cachedOptions = void 0;
        return function (customNodeName) {
            if (!cachedOptions) {
                cachedOptions = context.container.get(ServiceIdentifiers_1.ServiceIdentifiers.IOptions);
            }
            if (cache.has(customNodeName)) {
                return new (cache.get(customNodeName))();
            }
            var constructor = context.container.getNamed(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode, customNodeName);
            cache.set(customNodeName, constructor);
            return new constructor(cachedOptions);
        };
    });
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNodeGroup).toFactory(function (context) {
        return function (customNodeGroupName) {
            return context.container.getNamed(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup, customNodeGroupName);
        };
    });
});

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var NodeControlFlowReplacers_1 = __webpack_require__(39);
var BinaryExpressionControlFlowReplacer_1 = __webpack_require__(90);
var CallExpressionControlFlowReplacer_1 = __webpack_require__(91);
var LogicalExpressionControlFlowReplacer_1 = __webpack_require__(92);
exports.controlFlowTransformersModule = new inversify_1.ContainerModule(function (bind) {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer).to(BinaryExpressionControlFlowReplacer_1.BinaryExpressionControlFlowReplacer).whenTargetNamed(NodeControlFlowReplacers_1.NodeControlFlowReplacers.BinaryExpressionControlFlowReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer).to(CallExpressionControlFlowReplacer_1.CallExpressionControlFlowReplacer).whenTargetNamed(NodeControlFlowReplacers_1.NodeControlFlowReplacers.CallExpressionControlFlowReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer).to(LogicalExpressionControlFlowReplacer_1.LogicalExpressionControlFlowReplacer).whenTargetNamed(NodeControlFlowReplacers_1.NodeControlFlowReplacers.LogicalExpressionControlFlowReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowReplacer).toFactory(function (context) {
        var cache = new _map2.default();
        return function (replacerName) {
            if (cache.has(replacerName)) {
                return cache.get(replacerName);
            }
            var controlFlowReplacer = context.container.getNamed(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer, replacerName);
            cache.set(replacerName, controlFlowReplacer);
            return controlFlowReplacer;
        };
    });
});

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var NodeTransformers_1 = __webpack_require__(40);
var FunctionControlFlowTransformer_1 = __webpack_require__(89);
var BlockStatementControlFlowTransformer_1 = __webpack_require__(88);
var CatchClauseTransformer_1 = __webpack_require__(96);
var FunctionDeclarationTransformer_1 = __webpack_require__(97);
var FunctionTransformer_1 = __webpack_require__(98);
var LabeledStatementTransformer_1 = __webpack_require__(99);
var LiteralTransformer_1 = __webpack_require__(100);
var MemberExpressionTransformer_1 = __webpack_require__(93);
var MethodDefinitionTransformer_1 = __webpack_require__(94);
var ObjectExpressionTransformer_1 = __webpack_require__(101);
var TemplateLiteralTransformer_1 = __webpack_require__(95);
var VariableDeclarationTransformer_1 = __webpack_require__(102);
exports.nodeTransformersModule = new inversify_1.ContainerModule(function (bind) {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(BlockStatementControlFlowTransformer_1.BlockStatementControlFlowTransformer).whenTargetNamed(NodeTransformers_1.NodeTransformers.BlockStatementControlFlowTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(FunctionControlFlowTransformer_1.FunctionControlFlowTransformer).whenTargetNamed(NodeTransformers_1.NodeTransformers.FunctionControlFlowTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(MemberExpressionTransformer_1.MemberExpressionTransformer).whenTargetNamed(NodeTransformers_1.NodeTransformers.MemberExpressionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(MethodDefinitionTransformer_1.MethodDefinitionTransformer).whenTargetNamed(NodeTransformers_1.NodeTransformers.MethodDefinitionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(TemplateLiteralTransformer_1.TemplateLiteralTransformer).whenTargetNamed(NodeTransformers_1.NodeTransformers.TemplateLiteralTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(CatchClauseTransformer_1.CatchClauseTransformer).whenTargetNamed(NodeTransformers_1.NodeTransformers.CatchClauseTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(FunctionDeclarationTransformer_1.FunctionDeclarationTransformer).whenTargetNamed(NodeTransformers_1.NodeTransformers.FunctionDeclarationTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(FunctionTransformer_1.FunctionTransformer).whenTargetNamed(NodeTransformers_1.NodeTransformers.FunctionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(LabeledStatementTransformer_1.LabeledStatementTransformer).whenTargetNamed(NodeTransformers_1.NodeTransformers.LabeledStatementTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(LiteralTransformer_1.LiteralTransformer).whenTargetNamed(NodeTransformers_1.NodeTransformers.LiteralTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(ObjectExpressionTransformer_1.ObjectExpressionTransformer).whenTargetNamed(NodeTransformers_1.NodeTransformers.ObjectExpressionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(VariableDeclarationTransformer_1.VariableDeclarationTransformer).whenTargetNamed(NodeTransformers_1.NodeTransformers.VariableDeclarationTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeTransformer).toFactory(function (context) {
        var cache = new _map2.default();
        return function (nodeTransformersMap) {
            return function (nodeType) {
                var nodeTransformers = nodeTransformersMap.get(nodeType) || [];
                var instancesArray = [];
                nodeTransformers.forEach(function (transformer) {
                    var nodeTransformer = void 0;
                    if (cache.has(transformer)) {
                        nodeTransformer = cache.get(transformer);
                    } else {
                        nodeTransformer = context.container.getNamed(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer, transformer);
                        cache.set(transformer, nodeTransformer);
                    }
                    instancesArray.push(nodeTransformer);
                });
                return instancesArray;
            };
        };
    });
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var NodeObfuscationReplacers_1 = __webpack_require__(23);
var BooleanLiteralReplacer_1 = __webpack_require__(103);
var IdentifierReplacer_1 = __webpack_require__(104);
var NumberLiteralReplacer_1 = __webpack_require__(105);
var StringLiteralReplacer_1 = __webpack_require__(106);
exports.obfuscatingTransformersModule = new inversify_1.ContainerModule(function (bind) {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatorReplacer).to(BooleanLiteralReplacer_1.BooleanLiteralReplacer).whenTargetNamed(NodeObfuscationReplacers_1.NodeObfuscatorsReplacers.BooleanReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatorReplacer).to(IdentifierReplacer_1.IdentifierReplacer).whenTargetNamed(NodeObfuscationReplacers_1.NodeObfuscatorsReplacers.IdentifierReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatorReplacer).to(NumberLiteralReplacer_1.NumberLiteralReplacer).whenTargetNamed(NodeObfuscationReplacers_1.NodeObfuscatorsReplacers.NumberLiteralReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatorReplacer).to(StringLiteralReplacer_1.StringLiteralReplacer).whenTargetNamed(NodeObfuscationReplacers_1.NodeObfuscatorsReplacers.StringLiteralReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatorReplacer).toFactory(function (context) {
        var cache = new _map2.default();
        return function (replacerName) {
            if (cache.has(replacerName)) {
                return cache.get(replacerName);
            }
            var obfuscationReplacer = context.container.getNamed(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatorReplacer, replacerName);
            cache.set(replacerName, obfuscationReplacer);
            return obfuscationReplacer;
        };
    });
});

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var CalleeDataExtractors_1 = __webpack_require__(37);
var FunctionDeclarationCalleeDataExtractor_1 = __webpack_require__(111);
var FunctionExpressionCalleeDataExtractor_1 = __webpack_require__(112);
var ObjectExpressionCalleeDataExtractor_1 = __webpack_require__(113);
var StackTraceAnalyzer_1 = __webpack_require__(110);
exports.stackTraceAnalyzerModule = new inversify_1.ContainerModule(function (bind) {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IStackTraceAnalyzer).to(StackTraceAnalyzer_1.StackTraceAnalyzer).inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor).to(FunctionDeclarationCalleeDataExtractor_1.FunctionDeclarationCalleeDataExtractor).whenTargetNamed(CalleeDataExtractors_1.CalleeDataExtractors.FunctionDeclarationCalleeDataExtractor);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor).to(FunctionExpressionCalleeDataExtractor_1.FunctionExpressionCalleeDataExtractor).whenTargetNamed(CalleeDataExtractors_1.CalleeDataExtractors.FunctionExpressionCalleeDataExtractor);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor).to(ObjectExpressionCalleeDataExtractor_1.ObjectExpressionCalleeDataExtractor).whenTargetNamed(CalleeDataExtractors_1.CalleeDataExtractors.ObjectExpressionCalleeDataExtractor);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICalleeDataExtractor).toFactory(function (context) {
        var cache = new _map2.default();
        return function (calleeDataExtractorName) {
            if (cache.has(calleeDataExtractorName)) {
                return cache.get(calleeDataExtractorName);
            }
            var calleeDataExtractor = context.container.getNamed(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor, calleeDataExtractorName);
            cache.set(calleeDataExtractorName, calleeDataExtractor);
            return calleeDataExtractor;
        };
    });
});

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var ControlFlowStorage_1 = __webpack_require__(115);
var CustomNodeGroupStorage_1 = __webpack_require__(116);
var StringArrayStorage_1 = __webpack_require__(117);
exports.storagesModule = new inversify_1.ContainerModule(function (bind) {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.TCustomNodeGroupStorage).to(CustomNodeGroupStorage_1.CustomNodeGroupStorage).inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.TStringArrayStorage).to(StringArrayStorage_1.StringArrayStorage).inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__TControlFlowStorage).toConstructor(ControlFlowStorage_1.ControlFlowStorage);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__TControlFlowStorage).toFactory(function (context) {
        return function () {
            var constructor = context.container.get(ServiceIdentifiers_1.ServiceIdentifiers.Newable__TControlFlowStorage);
            return new constructor();
        };
    });
});

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var format = __webpack_require__(19);
var ConsoleOutputDisableExpressionTemplate_1 = __webpack_require__(121);
var Initializable_1 = __webpack_require__(10);
var AbstractCustomNode_1 = __webpack_require__(13);
var NodeUtils_1 = __webpack_require__(8);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var ConsoleOutputDisableExpressionNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(ConsoleOutputDisableExpressionNode, _AbstractCustomNode_);

    function ConsoleOutputDisableExpressionNode(options) {
        (0, _classCallCheck3.default)(this, ConsoleOutputDisableExpressionNode);
        return (0, _possibleConstructorReturn3.default)(this, (ConsoleOutputDisableExpressionNode.__proto__ || (0, _getPrototypeOf2.default)(ConsoleOutputDisableExpressionNode)).call(this, options));
    }

    (0, _createClass3.default)(ConsoleOutputDisableExpressionNode, [{
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
            return format(ConsoleOutputDisableExpressionTemplate_1.ConsoleOutputDisableExpressionTemplate(), {
                consoleLogDisableFunctionName: RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomVariableName(6),
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            });
        }
    }]);
    return ConsoleOutputDisableExpressionNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], ConsoleOutputDisableExpressionNode.prototype, "callsControllerFunctionName", void 0);
ConsoleOutputDisableExpressionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], ConsoleOutputDisableExpressionNode);
exports.ConsoleOutputDisableExpressionNode = ConsoleOutputDisableExpressionNode;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var Initializable_1 = __webpack_require__(10);
var CustomNodes_1 = __webpack_require__(15);
var ObfuscationEvents_1 = __webpack_require__(22);
var AbstractCustomNodeGroup_1 = __webpack_require__(27);
var NodeAppender_1 = __webpack_require__(26);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var ConsoleOutputCustomNodeGroup = function (_AbstractCustomNodeGr) {
    (0, _inherits3.default)(ConsoleOutputCustomNodeGroup, _AbstractCustomNodeGr);

    function ConsoleOutputCustomNodeGroup(customNodeFactory, obfuscationEventEmitter, options) {
        (0, _classCallCheck3.default)(this, ConsoleOutputCustomNodeGroup);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ConsoleOutputCustomNodeGroup.__proto__ || (0, _getPrototypeOf2.default)(ConsoleOutputCustomNodeGroup)).call(this, options));

        _this.appendEvent = ObfuscationEvents_1.ObfuscationEvents.BeforeObfuscation;
        _this.customNodeFactory = customNodeFactory;
        _this.obfuscationEventEmitter = obfuscationEventEmitter;
        return _this;
    }

    (0, _createClass3.default)(ConsoleOutputCustomNodeGroup, [{
        key: "appendCustomNodes",
        value: function appendCustomNodes(blockScopeNode, stackTraceData) {
            var randomStackTraceIndex = NodeAppender_1.NodeAppender.getRandomStackTraceIndex(stackTraceData.length);
            this.appendCustomNodeIfExist(CustomNodes_1.CustomNodes.ConsoleOutputDisableExpressionNode, function (customNode) {
                NodeAppender_1.NodeAppender.appendNodeToOptimalBlockScope(stackTraceData, blockScopeNode, customNode.getNode(), randomStackTraceIndex);
            });
            this.appendCustomNodeIfExist(CustomNodes_1.CustomNodes.NodeCallsControllerFunctionNode, function (customNode) {
                var targetBlockScope = void 0;
                if (stackTraceData.length) {
                    targetBlockScope = NodeAppender_1.NodeAppender.getOptimalBlockScope(stackTraceData, randomStackTraceIndex, 1);
                } else {
                    targetBlockScope = blockScopeNode;
                }
                NodeAppender_1.NodeAppender.prependNode(targetBlockScope, customNode.getNode());
            });
        }
    }, {
        key: "initialize",
        value: function initialize() {
            this.customNodes = new _map2.default();
            if (!this.options.disableConsoleOutput) {
                return;
            }
            var callsControllerFunctionName = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomVariableName(6);
            var consoleOutputDisableExpressionNode = this.customNodeFactory(CustomNodes_1.CustomNodes.ConsoleOutputDisableExpressionNode);
            var nodeCallsControllerFunctionNode = this.customNodeFactory(CustomNodes_1.CustomNodes.NodeCallsControllerFunctionNode);
            consoleOutputDisableExpressionNode.initialize(callsControllerFunctionName);
            nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);
            this.customNodes.set(CustomNodes_1.CustomNodes.ConsoleOutputDisableExpressionNode, consoleOutputDisableExpressionNode);
            this.customNodes.set(CustomNodes_1.CustomNodes.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
        }
    }]);
    return ConsoleOutputCustomNodeGroup;
}(AbstractCustomNodeGroup_1.AbstractCustomNodeGroup);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", _map2.default)], ConsoleOutputCustomNodeGroup.prototype, "customNodes", void 0);
ConsoleOutputCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], ConsoleOutputCustomNodeGroup);
exports.ConsoleOutputCustomNodeGroup = ConsoleOutputCustomNodeGroup;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var Initializable_1 = __webpack_require__(10);
var AbstractCustomNode_1 = __webpack_require__(13);
var Nodes_1 = __webpack_require__(20);
var NodeUtils_1 = __webpack_require__(8);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var BinaryExpressionFunctionNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(BinaryExpressionFunctionNode, _AbstractCustomNode_);

    function BinaryExpressionFunctionNode(options) {
        (0, _classCallCheck3.default)(this, BinaryExpressionFunctionNode);
        return (0, _possibleConstructorReturn3.default)(this, (BinaryExpressionFunctionNode.__proto__ || (0, _getPrototypeOf2.default)(BinaryExpressionFunctionNode)).call(this, options));
    }

    (0, _createClass3.default)(BinaryExpressionFunctionNode, [{
        key: "initialize",
        value: function initialize(operator) {
            this.operator = operator;
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var structure = Nodes_1.Nodes.getFunctionDeclarationNode(RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomString(3), [Nodes_1.Nodes.getIdentifierNode('x'), Nodes_1.Nodes.getIdentifierNode('y')], Nodes_1.Nodes.getBlockStatementNode([Nodes_1.Nodes.getReturnStatementNode(Nodes_1.Nodes.getBinaryExpressionNode(this.operator, Nodes_1.Nodes.getIdentifierNode('x'), Nodes_1.Nodes.getIdentifierNode('y')))]));
            NodeUtils_1.NodeUtils.parentize(structure);
            return [structure];
        }
    }]);
    return BinaryExpressionFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], BinaryExpressionFunctionNode.prototype, "operator", void 0);
BinaryExpressionFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], BinaryExpressionFunctionNode);
exports.BinaryExpressionFunctionNode = BinaryExpressionFunctionNode;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var Initializable_1 = __webpack_require__(10);
var AbstractCustomNode_1 = __webpack_require__(13);
var Nodes_1 = __webpack_require__(20);
var NodeUtils_1 = __webpack_require__(8);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var BlockStatementControlFlowFlatteningNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(BlockStatementControlFlowFlatteningNode, _AbstractCustomNode_);

    function BlockStatementControlFlowFlatteningNode(options) {
        (0, _classCallCheck3.default)(this, BlockStatementControlFlowFlatteningNode);
        return (0, _possibleConstructorReturn3.default)(this, (BlockStatementControlFlowFlatteningNode.__proto__ || (0, _getPrototypeOf2.default)(BlockStatementControlFlowFlatteningNode)).call(this, options));
    }

    (0, _createClass3.default)(BlockStatementControlFlowFlatteningNode, [{
        key: "initialize",
        value: function initialize(blockStatementBody, shuffledKeys, originalKeysIndexesInShuffledArray) {
            this.blockStatementBody = blockStatementBody;
            this.shuffledKeys = shuffledKeys;
            this.originalKeysIndexesInShuffledArray = originalKeysIndexesInShuffledArray;
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var _this2 = this;

            var controllerIdentifierName = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomString(3);
            var indexIdentifierName = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomString(3);
            var structure = Nodes_1.Nodes.getBlockStatementNode([Nodes_1.Nodes.getVariableDeclarationNode([Nodes_1.Nodes.getVariableDeclaratorNode(Nodes_1.Nodes.getIdentifierNode(controllerIdentifierName), Nodes_1.Nodes.getCallExpressionNode(Nodes_1.Nodes.getMemberExpressionNode(Nodes_1.Nodes.getLiteralNode(this.originalKeysIndexesInShuffledArray.join('|')), Nodes_1.Nodes.getIdentifierNode('split')), [Nodes_1.Nodes.getLiteralNode('|')])), Nodes_1.Nodes.getVariableDeclaratorNode(Nodes_1.Nodes.getIdentifierNode(indexIdentifierName), Nodes_1.Nodes.getLiteralNode(0))]), Nodes_1.Nodes.getWhileStatementNode(Nodes_1.Nodes.getLiteralNode(true), Nodes_1.Nodes.getBlockStatementNode([Nodes_1.Nodes.getSwitchStatementNode(Nodes_1.Nodes.getMemberExpressionNode(Nodes_1.Nodes.getIdentifierNode(controllerIdentifierName), Nodes_1.Nodes.getUpdateExpressionNode('++', Nodes_1.Nodes.getIdentifierNode(indexIdentifierName)), true), this.shuffledKeys.map(function (key, index) {
                return Nodes_1.Nodes.getSwitchCaseNode(Nodes_1.Nodes.getLiteralNode(String(index)), [_this2.blockStatementBody[key], Nodes_1.Nodes.getContinueStatement()]);
            })), Nodes_1.Nodes.getBreakStatement()]))]);
            NodeUtils_1.NodeUtils.parentize(structure);
            return [structure];
        }
    }]);
    return BlockStatementControlFlowFlatteningNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Array)], BlockStatementControlFlowFlatteningNode.prototype, "blockStatementBody", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Array)], BlockStatementControlFlowFlatteningNode.prototype, "originalKeysIndexesInShuffledArray", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Array)], BlockStatementControlFlowFlatteningNode.prototype, "shuffledKeys", void 0);
BlockStatementControlFlowFlatteningNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], BlockStatementControlFlowFlatteningNode);
exports.BlockStatementControlFlowFlatteningNode = BlockStatementControlFlowFlatteningNode;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var Initializable_1 = __webpack_require__(10);
var AbstractCustomNode_1 = __webpack_require__(13);
var Nodes_1 = __webpack_require__(20);
var NodeUtils_1 = __webpack_require__(8);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var CallExpressionFunctionNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(CallExpressionFunctionNode, _AbstractCustomNode_);

    function CallExpressionFunctionNode(options) {
        (0, _classCallCheck3.default)(this, CallExpressionFunctionNode);
        return (0, _possibleConstructorReturn3.default)(this, (CallExpressionFunctionNode.__proto__ || (0, _getPrototypeOf2.default)(CallExpressionFunctionNode)).call(this, options));
    }

    (0, _createClass3.default)(CallExpressionFunctionNode, [{
        key: "initialize",
        value: function initialize(expressionArguments) {
            this.expressionArguments = expressionArguments;
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var calleeIdentifier = Nodes_1.Nodes.getIdentifierNode('callee');
            var params = [];
            var argumentsLength = this.expressionArguments.length;
            for (var i = 0; i < argumentsLength; i++) {
                params.push(Nodes_1.Nodes.getIdentifierNode("param" + (i + 1)));
            }
            var structure = Nodes_1.Nodes.getFunctionDeclarationNode(RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomString(3), [calleeIdentifier].concat(params), Nodes_1.Nodes.getBlockStatementNode([Nodes_1.Nodes.getReturnStatementNode(Nodes_1.Nodes.getCallExpressionNode(calleeIdentifier, params))]));
            NodeUtils_1.NodeUtils.parentize(structure);
            return [structure];
        }
    }]);
    return CallExpressionFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Array)], CallExpressionFunctionNode.prototype, "expressionArguments", void 0);
CallExpressionFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], CallExpressionFunctionNode);
exports.CallExpressionFunctionNode = CallExpressionFunctionNode;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var Initializable_1 = __webpack_require__(10);
var AbstractCustomNode_1 = __webpack_require__(13);
var Nodes_1 = __webpack_require__(20);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var NodeUtils_1 = __webpack_require__(8);
var LogicalExpressionFunctionNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(LogicalExpressionFunctionNode, _AbstractCustomNode_);

    function LogicalExpressionFunctionNode(options) {
        (0, _classCallCheck3.default)(this, LogicalExpressionFunctionNode);
        return (0, _possibleConstructorReturn3.default)(this, (LogicalExpressionFunctionNode.__proto__ || (0, _getPrototypeOf2.default)(LogicalExpressionFunctionNode)).call(this, options));
    }

    (0, _createClass3.default)(LogicalExpressionFunctionNode, [{
        key: "initialize",
        value: function initialize(operator) {
            this.operator = operator;
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var structure = Nodes_1.Nodes.getFunctionDeclarationNode(RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomString(3), [Nodes_1.Nodes.getIdentifierNode('x'), Nodes_1.Nodes.getIdentifierNode('y')], Nodes_1.Nodes.getBlockStatementNode([Nodes_1.Nodes.getReturnStatementNode(Nodes_1.Nodes.getLogicalExpressionNode(this.operator, Nodes_1.Nodes.getIdentifierNode('x'), Nodes_1.Nodes.getIdentifierNode('y')))]));
            NodeUtils_1.NodeUtils.parentize(structure);
            return [structure];
        }
    }]);
    return LogicalExpressionFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], LogicalExpressionFunctionNode.prototype, "operator", void 0);
LogicalExpressionFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], LogicalExpressionFunctionNode);
exports.LogicalExpressionFunctionNode = LogicalExpressionFunctionNode;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toConsumableArray2 = __webpack_require__(24);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var Initializable_1 = __webpack_require__(10);
var AbstractCustomNode_1 = __webpack_require__(13);
var Nodes_1 = __webpack_require__(20);
var NodeUtils_1 = __webpack_require__(8);
var CallExpressionControlFlowStorageCallNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(CallExpressionControlFlowStorageCallNode, _AbstractCustomNode_);

    function CallExpressionControlFlowStorageCallNode(options) {
        (0, _classCallCheck3.default)(this, CallExpressionControlFlowStorageCallNode);
        return (0, _possibleConstructorReturn3.default)(this, (CallExpressionControlFlowStorageCallNode.__proto__ || (0, _getPrototypeOf2.default)(CallExpressionControlFlowStorageCallNode)).call(this, options));
    }

    (0, _createClass3.default)(CallExpressionControlFlowStorageCallNode, [{
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
            var structure = Nodes_1.Nodes.getExpressionStatementNode(Nodes_1.Nodes.getCallExpressionNode(Nodes_1.Nodes.getMemberExpressionNode(Nodes_1.Nodes.getIdentifierNode(this.controlFlowStorageName), Nodes_1.Nodes.getIdentifierNode(this.controlFlowStorageKey)), [this.callee].concat((0, _toConsumableArray3.default)(this.expressionArguments))));
            NodeUtils_1.NodeUtils.parentize(structure);
            return [structure];
        }
    }]);
    return CallExpressionControlFlowStorageCallNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], CallExpressionControlFlowStorageCallNode.prototype, "callee", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], CallExpressionControlFlowStorageCallNode.prototype, "controlFlowStorageKey", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], CallExpressionControlFlowStorageCallNode.prototype, "controlFlowStorageName", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Array)], CallExpressionControlFlowStorageCallNode.prototype, "expressionArguments", void 0);
CallExpressionControlFlowStorageCallNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], CallExpressionControlFlowStorageCallNode);
exports.CallExpressionControlFlowStorageCallNode = CallExpressionControlFlowStorageCallNode;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray2 = __webpack_require__(35);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _from = __webpack_require__(45);

var _from2 = _interopRequireDefault(_from);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var Initializable_1 = __webpack_require__(10);
var AbstractCustomNode_1 = __webpack_require__(13);
var Nodes_1 = __webpack_require__(20);
var NodeUtils_1 = __webpack_require__(8);
var ControlFlowStorageNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(ControlFlowStorageNode, _AbstractCustomNode_);

    function ControlFlowStorageNode(options) {
        (0, _classCallCheck3.default)(this, ControlFlowStorageNode);
        return (0, _possibleConstructorReturn3.default)(this, (ControlFlowStorageNode.__proto__ || (0, _getPrototypeOf2.default)(ControlFlowStorageNode)).call(this, options));
    }

    (0, _createClass3.default)(ControlFlowStorageNode, [{
        key: "initialize",
        value: function initialize(controlFlowStorage) {
            this.controlFlowStorage = controlFlowStorage;
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var structure = Nodes_1.Nodes.getVariableDeclarationNode([Nodes_1.Nodes.getVariableDeclaratorNode(Nodes_1.Nodes.getIdentifierNode(this.controlFlowStorage.getStorageId()), Nodes_1.Nodes.getObjectExpressionNode((0, _from2.default)(this.controlFlowStorage.getStorage()).map(function (_ref) {
                var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                return Nodes_1.Nodes.getPropertyNode(Nodes_1.Nodes.getIdentifierNode(key), value.getNode()[0]);
            })))]);
            structure = NodeUtils_1.NodeUtils.parentize(structure);
            return [structure];
        }
    }]);
    return ControlFlowStorageNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], ControlFlowStorageNode.prototype, "controlFlowStorage", void 0);
ControlFlowStorageNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], ControlFlowStorageNode);
exports.ControlFlowStorageNode = ControlFlowStorageNode;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var Initializable_1 = __webpack_require__(10);
var AbstractCustomNode_1 = __webpack_require__(13);
var Nodes_1 = __webpack_require__(20);
var NodeUtils_1 = __webpack_require__(8);
var ExpressionWithOperatorControlFlowStorageCallNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(ExpressionWithOperatorControlFlowStorageCallNode, _AbstractCustomNode_);

    function ExpressionWithOperatorControlFlowStorageCallNode(options) {
        (0, _classCallCheck3.default)(this, ExpressionWithOperatorControlFlowStorageCallNode);
        return (0, _possibleConstructorReturn3.default)(this, (ExpressionWithOperatorControlFlowStorageCallNode.__proto__ || (0, _getPrototypeOf2.default)(ExpressionWithOperatorControlFlowStorageCallNode)).call(this, options));
    }

    (0, _createClass3.default)(ExpressionWithOperatorControlFlowStorageCallNode, [{
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
            var structure = Nodes_1.Nodes.getExpressionStatementNode(Nodes_1.Nodes.getCallExpressionNode(Nodes_1.Nodes.getMemberExpressionNode(Nodes_1.Nodes.getIdentifierNode(this.controlFlowStorageName), Nodes_1.Nodes.getIdentifierNode(this.controlFlowStorageKey)), [this.leftValue, this.rightValue]));
            NodeUtils_1.NodeUtils.parentize(structure);
            return [structure];
        }
    }]);
    return ExpressionWithOperatorControlFlowStorageCallNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], ExpressionWithOperatorControlFlowStorageCallNode.prototype, "controlFlowStorageKey", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], ExpressionWithOperatorControlFlowStorageCallNode.prototype, "controlFlowStorageName", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], ExpressionWithOperatorControlFlowStorageCallNode.prototype, "leftValue", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], ExpressionWithOperatorControlFlowStorageCallNode.prototype, "rightValue", void 0);
ExpressionWithOperatorControlFlowStorageCallNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], ExpressionWithOperatorControlFlowStorageCallNode);
exports.ExpressionWithOperatorControlFlowStorageCallNode = ExpressionWithOperatorControlFlowStorageCallNode;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var format = __webpack_require__(19);
var Initializable_1 = __webpack_require__(10);
var DebufProtectionFunctionCallTemplate_1 = __webpack_require__(122);
var AbstractCustomNode_1 = __webpack_require__(13);
var NodeUtils_1 = __webpack_require__(8);
var DebugProtectionFunctionCallNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(DebugProtectionFunctionCallNode, _AbstractCustomNode_);

    function DebugProtectionFunctionCallNode(options) {
        (0, _classCallCheck3.default)(this, DebugProtectionFunctionCallNode);
        return (0, _possibleConstructorReturn3.default)(this, (DebugProtectionFunctionCallNode.__proto__ || (0, _getPrototypeOf2.default)(DebugProtectionFunctionCallNode)).call(this, options));
    }

    (0, _createClass3.default)(DebugProtectionFunctionCallNode, [{
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
            return format(DebufProtectionFunctionCallTemplate_1.DebugProtectionFunctionCallTemplate(), {
                debugProtectionFunctionName: this.debugProtectionFunctionName
            });
        }
    }]);
    return DebugProtectionFunctionCallNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], DebugProtectionFunctionCallNode.prototype, "debugProtectionFunctionName", void 0);
DebugProtectionFunctionCallNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], DebugProtectionFunctionCallNode);
exports.DebugProtectionFunctionCallNode = DebugProtectionFunctionCallNode;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var format = __webpack_require__(19);
var Initializable_1 = __webpack_require__(10);
var DebugProtectionFunctionIntervalTemplate_1 = __webpack_require__(123);
var AbstractCustomNode_1 = __webpack_require__(13);
var NodeUtils_1 = __webpack_require__(8);
var DebugProtectionFunctionIntervalNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(DebugProtectionFunctionIntervalNode, _AbstractCustomNode_);

    function DebugProtectionFunctionIntervalNode(options) {
        (0, _classCallCheck3.default)(this, DebugProtectionFunctionIntervalNode);
        return (0, _possibleConstructorReturn3.default)(this, (DebugProtectionFunctionIntervalNode.__proto__ || (0, _getPrototypeOf2.default)(DebugProtectionFunctionIntervalNode)).call(this, options));
    }

    (0, _createClass3.default)(DebugProtectionFunctionIntervalNode, [{
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
            return format(DebugProtectionFunctionIntervalTemplate_1.DebugProtectionFunctionIntervalTemplate(), {
                debugProtectionFunctionName: this.debugProtectionFunctionName
            });
        }
    }]);
    return DebugProtectionFunctionIntervalNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], DebugProtectionFunctionIntervalNode.prototype, "debugProtectionFunctionName", void 0);
DebugProtectionFunctionIntervalNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], DebugProtectionFunctionIntervalNode);
exports.DebugProtectionFunctionIntervalNode = DebugProtectionFunctionIntervalNode;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var format = __webpack_require__(19);
var Initializable_1 = __webpack_require__(10);
var DebugProtectionFunctionTemplate_1 = __webpack_require__(124);
var AbstractCustomNode_1 = __webpack_require__(13);
var NodeUtils_1 = __webpack_require__(8);
var DebugProtectionFunctionNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(DebugProtectionFunctionNode, _AbstractCustomNode_);

    function DebugProtectionFunctionNode(options) {
        (0, _classCallCheck3.default)(this, DebugProtectionFunctionNode);
        return (0, _possibleConstructorReturn3.default)(this, (DebugProtectionFunctionNode.__proto__ || (0, _getPrototypeOf2.default)(DebugProtectionFunctionNode)).call(this, options));
    }

    (0, _createClass3.default)(DebugProtectionFunctionNode, [{
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
            return format(DebugProtectionFunctionTemplate_1.DebugProtectionFunctionTemplate(), {
                debugProtectionFunctionName: this.debugProtectionFunctionName
            });
        }
    }]);
    return DebugProtectionFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], DebugProtectionFunctionNode.prototype, "debugProtectionFunctionName", void 0);
DebugProtectionFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], DebugProtectionFunctionNode);
exports.DebugProtectionFunctionNode = DebugProtectionFunctionNode;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var Initializable_1 = __webpack_require__(10);
var CustomNodes_1 = __webpack_require__(15);
var ObfuscationEvents_1 = __webpack_require__(22);
var AbstractCustomNodeGroup_1 = __webpack_require__(27);
var NodeAppender_1 = __webpack_require__(26);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var DebugProtectionCustomNodeGroup = function (_AbstractCustomNodeGr) {
    (0, _inherits3.default)(DebugProtectionCustomNodeGroup, _AbstractCustomNodeGr);

    function DebugProtectionCustomNodeGroup(customNodeFactory, obfuscationEventEmitter, options) {
        (0, _classCallCheck3.default)(this, DebugProtectionCustomNodeGroup);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DebugProtectionCustomNodeGroup.__proto__ || (0, _getPrototypeOf2.default)(DebugProtectionCustomNodeGroup)).call(this, options));

        _this.appendEvent = ObfuscationEvents_1.ObfuscationEvents.BeforeObfuscation;
        _this.customNodeFactory = customNodeFactory;
        _this.obfuscationEventEmitter = obfuscationEventEmitter;
        return _this;
    }

    (0, _createClass3.default)(DebugProtectionCustomNodeGroup, [{
        key: "appendCustomNodes",
        value: function appendCustomNodes(blockScopeNode, stackTraceData) {
            this.appendCustomNodeIfExist(CustomNodes_1.CustomNodes.DebugProtectionFunctionNode, function (customNode) {
                NodeAppender_1.NodeAppender.appendNode(blockScopeNode, customNode.getNode());
            });
            this.appendCustomNodeIfExist(CustomNodes_1.CustomNodes.DebugProtectionFunctionCallNode, function (customNode) {
                NodeAppender_1.NodeAppender.appendNode(blockScopeNode, customNode.getNode());
            });
            this.appendCustomNodeIfExist(CustomNodes_1.CustomNodes.DebugProtectionFunctionIntervalNode, function (customNode) {
                var programBodyLength = blockScopeNode.body.length;
                var randomIndex = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomInteger(0, programBodyLength);
                NodeAppender_1.NodeAppender.insertNodeAtIndex(blockScopeNode, customNode.getNode(), randomIndex);
            });
        }
    }, {
        key: "initialize",
        value: function initialize() {
            this.customNodes = new _map2.default();
            if (!this.options.debugProtection) {
                return;
            }
            var debugProtectionFunctionName = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomVariableName(6);
            var debugProtectionFunctionNode = this.customNodeFactory(CustomNodes_1.CustomNodes.DebugProtectionFunctionNode);
            var debugProtectionFunctionCallNode = this.customNodeFactory(CustomNodes_1.CustomNodes.DebugProtectionFunctionCallNode);
            var debugProtectionFunctionIntervalNode = this.customNodeFactory(CustomNodes_1.CustomNodes.DebugProtectionFunctionIntervalNode);
            debugProtectionFunctionNode.initialize(debugProtectionFunctionName);
            debugProtectionFunctionCallNode.initialize(debugProtectionFunctionName);
            debugProtectionFunctionIntervalNode.initialize(debugProtectionFunctionName);
            this.customNodes.set(CustomNodes_1.CustomNodes.DebugProtectionFunctionNode, debugProtectionFunctionNode);
            this.customNodes.set(CustomNodes_1.CustomNodes.DebugProtectionFunctionCallNode, debugProtectionFunctionCallNode);
            if (this.options.debugProtectionInterval) {
                this.customNodes.set(CustomNodes_1.CustomNodes.DebugProtectionFunctionIntervalNode, debugProtectionFunctionIntervalNode);
            }
        }
    }]);
    return DebugProtectionCustomNodeGroup;
}(AbstractCustomNodeGroup_1.AbstractCustomNodeGroup);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", _map2.default)], DebugProtectionCustomNodeGroup.prototype, "customNodes", void 0);
DebugProtectionCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], DebugProtectionCustomNodeGroup);
exports.DebugProtectionCustomNodeGroup = DebugProtectionCustomNodeGroup;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray2 = __webpack_require__(35);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var format = __webpack_require__(19);
var Initializable_1 = __webpack_require__(10);
var DomainLockNodeTemplate_1 = __webpack_require__(125);
var AbstractCustomNode_1 = __webpack_require__(13);
var CryptUtils_1 = __webpack_require__(34);
var NodeUtils_1 = __webpack_require__(8);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var DomainLockNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(DomainLockNode, _AbstractCustomNode_);

    function DomainLockNode(options) {
        (0, _classCallCheck3.default)(this, DomainLockNode);
        return (0, _possibleConstructorReturn3.default)(this, (DomainLockNode.__proto__ || (0, _getPrototypeOf2.default)(DomainLockNode)).call(this, options));
    }

    (0, _createClass3.default)(DomainLockNode, [{
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

            var _CryptUtils_1$CryptUt = CryptUtils_1.CryptUtils.hideString(domainsString, domainsString.length * 3),
                _CryptUtils_1$CryptUt2 = (0, _slicedToArray3.default)(_CryptUtils_1$CryptUt, 2),
                hiddenDomainsString = _CryptUtils_1$CryptUt2[0],
                diff = _CryptUtils_1$CryptUt2[1];

            return format(DomainLockNodeTemplate_1.DomainLockNodeTemplate(), {
                domainLockFunctionName: RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomVariableName(6),
                diff: diff,
                domains: hiddenDomainsString,
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            });
        }
    }]);
    return DomainLockNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], DomainLockNode.prototype, "callsControllerFunctionName", void 0);
DomainLockNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], DomainLockNode);
exports.DomainLockNode = DomainLockNode;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var Initializable_1 = __webpack_require__(10);
var CustomNodes_1 = __webpack_require__(15);
var ObfuscationEvents_1 = __webpack_require__(22);
var AbstractCustomNodeGroup_1 = __webpack_require__(27);
var NodeAppender_1 = __webpack_require__(26);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var DomainLockCustomNodeGroup = function (_AbstractCustomNodeGr) {
    (0, _inherits3.default)(DomainLockCustomNodeGroup, _AbstractCustomNodeGr);

    function DomainLockCustomNodeGroup(customNodeFactory, obfuscationEventEmitter, options) {
        (0, _classCallCheck3.default)(this, DomainLockCustomNodeGroup);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DomainLockCustomNodeGroup.__proto__ || (0, _getPrototypeOf2.default)(DomainLockCustomNodeGroup)).call(this, options));

        _this.appendEvent = ObfuscationEvents_1.ObfuscationEvents.BeforeObfuscation;
        _this.customNodeFactory = customNodeFactory;
        _this.obfuscationEventEmitter = obfuscationEventEmitter;
        return _this;
    }

    (0, _createClass3.default)(DomainLockCustomNodeGroup, [{
        key: "appendCustomNodes",
        value: function appendCustomNodes(blockScopeNode, stackTraceData) {
            var randomStackTraceIndex = NodeAppender_1.NodeAppender.getRandomStackTraceIndex(stackTraceData.length);
            this.appendCustomNodeIfExist(CustomNodes_1.CustomNodes.DomainLockNode, function (customNode) {
                NodeAppender_1.NodeAppender.appendNodeToOptimalBlockScope(stackTraceData, blockScopeNode, customNode.getNode(), randomStackTraceIndex);
            });
            this.appendCustomNodeIfExist(CustomNodes_1.CustomNodes.NodeCallsControllerFunctionNode, function (customNode) {
                var targetBlockScope = void 0;
                if (stackTraceData.length) {
                    targetBlockScope = NodeAppender_1.NodeAppender.getOptimalBlockScope(stackTraceData, randomStackTraceIndex, 1);
                } else {
                    targetBlockScope = blockScopeNode;
                }
                NodeAppender_1.NodeAppender.prependNode(targetBlockScope, customNode.getNode());
            });
        }
    }, {
        key: "initialize",
        value: function initialize() {
            this.customNodes = new _map2.default();
            if (!this.options.domainLock.length) {
                return;
            }
            var callsControllerFunctionName = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomVariableName(6);
            var domainLockNode = this.customNodeFactory(CustomNodes_1.CustomNodes.DomainLockNode);
            var nodeCallsControllerFunctionNode = this.customNodeFactory(CustomNodes_1.CustomNodes.NodeCallsControllerFunctionNode);
            domainLockNode.initialize(callsControllerFunctionName);
            nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);
            this.customNodes.set(CustomNodes_1.CustomNodes.DomainLockNode, domainLockNode);
            this.customNodes.set(CustomNodes_1.CustomNodes.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
        }
    }]);
    return DomainLockCustomNodeGroup;
}(AbstractCustomNodeGroup_1.AbstractCustomNodeGroup);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", _map2.default)], DomainLockCustomNodeGroup.prototype, "customNodes", void 0);
DomainLockCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], DomainLockCustomNodeGroup);
exports.DomainLockCustomNodeGroup = DomainLockCustomNodeGroup;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var format = __webpack_require__(19);
var ObfuscationEvents_1 = __webpack_require__(22);
var Initializable_1 = __webpack_require__(10);
var SingleNodeCallControllerTemplate_1 = __webpack_require__(120);
var NoCustomNodes_1 = __webpack_require__(31);
var AbstractCustomNode_1 = __webpack_require__(13);
var JavaScriptObfuscator_1 = __webpack_require__(25);
var NodeUtils_1 = __webpack_require__(8);
var NodeCallsControllerFunctionNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(NodeCallsControllerFunctionNode, _AbstractCustomNode_);

    function NodeCallsControllerFunctionNode(options) {
        (0, _classCallCheck3.default)(this, NodeCallsControllerFunctionNode);
        return (0, _possibleConstructorReturn3.default)(this, (NodeCallsControllerFunctionNode.__proto__ || (0, _getPrototypeOf2.default)(NodeCallsControllerFunctionNode)).call(this, options));
    }

    (0, _createClass3.default)(NodeCallsControllerFunctionNode, [{
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
            if (this.appendEvent === ObfuscationEvents_1.ObfuscationEvents.AfterObfuscation) {
                return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(format(SingleNodeCallControllerTemplate_1.SingleNodeCallControllerTemplate(), {
                    singleNodeCallControllerFunctionName: this.callsControllerFunctionName
                }), tslib_1.__assign({}, NoCustomNodes_1.NO_CUSTOM_NODES_PRESET, { seed: this.options.seed })).getObfuscatedCode();
            }
            return format(SingleNodeCallControllerTemplate_1.SingleNodeCallControllerTemplate(), {
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            });
        }
    }]);
    return NodeCallsControllerFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], NodeCallsControllerFunctionNode.prototype, "callsControllerFunctionName", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], NodeCallsControllerFunctionNode.prototype, "appendEvent", void 0);
NodeCallsControllerFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], NodeCallsControllerFunctionNode);
exports.NodeCallsControllerFunctionNode = NodeCallsControllerFunctionNode;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var format = __webpack_require__(19);
var Initializable_1 = __webpack_require__(10);
var NoCustomNodes_1 = __webpack_require__(31);
var SelfDefendingTemplate_1 = __webpack_require__(126);
var AbstractCustomNode_1 = __webpack_require__(13);
var JavaScriptObfuscator_1 = __webpack_require__(25);
var NodeUtils_1 = __webpack_require__(8);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var SelfDefendingUnicodeNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(SelfDefendingUnicodeNode, _AbstractCustomNode_);

    function SelfDefendingUnicodeNode(options) {
        (0, _classCallCheck3.default)(this, SelfDefendingUnicodeNode);
        return (0, _possibleConstructorReturn3.default)(this, (SelfDefendingUnicodeNode.__proto__ || (0, _getPrototypeOf2.default)(SelfDefendingUnicodeNode)).call(this, options));
    }

    (0, _createClass3.default)(SelfDefendingUnicodeNode, [{
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
            return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(format(SelfDefendingTemplate_1.SelfDefendingTemplate(), {
                selfDefendingFunctionName: RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomVariableName(6),
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            }), tslib_1.__assign({}, NoCustomNodes_1.NO_CUSTOM_NODES_PRESET, { seed: this.options.seed })).getObfuscatedCode();
        }
    }]);
    return SelfDefendingUnicodeNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], SelfDefendingUnicodeNode.prototype, "callsControllerFunctionName", void 0);
SelfDefendingUnicodeNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], SelfDefendingUnicodeNode);
exports.SelfDefendingUnicodeNode = SelfDefendingUnicodeNode;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var Initializable_1 = __webpack_require__(10);
var CustomNodes_1 = __webpack_require__(15);
var ObfuscationEvents_1 = __webpack_require__(22);
var AbstractCustomNodeGroup_1 = __webpack_require__(27);
var NodeAppender_1 = __webpack_require__(26);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var SelfDefendingCustomNodeGroup = function (_AbstractCustomNodeGr) {
    (0, _inherits3.default)(SelfDefendingCustomNodeGroup, _AbstractCustomNodeGr);

    function SelfDefendingCustomNodeGroup(customNodeFactory, obfuscationEventEmitter, options) {
        (0, _classCallCheck3.default)(this, SelfDefendingCustomNodeGroup);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SelfDefendingCustomNodeGroup.__proto__ || (0, _getPrototypeOf2.default)(SelfDefendingCustomNodeGroup)).call(this, options));

        _this.appendEvent = ObfuscationEvents_1.ObfuscationEvents.AfterObfuscation;
        _this.customNodeFactory = customNodeFactory;
        _this.obfuscationEventEmitter = obfuscationEventEmitter;
        return _this;
    }

    (0, _createClass3.default)(SelfDefendingCustomNodeGroup, [{
        key: "appendCustomNodes",
        value: function appendCustomNodes(blockScopeNode, stackTraceData) {
            var randomStackTraceIndex = NodeAppender_1.NodeAppender.getRandomStackTraceIndex(stackTraceData.length);
            this.appendCustomNodeIfExist(CustomNodes_1.CustomNodes.SelfDefendingUnicodeNode, function (customNode) {
                NodeAppender_1.NodeAppender.appendNodeToOptimalBlockScope(stackTraceData, blockScopeNode, customNode.getNode(), randomStackTraceIndex);
            });
            this.appendCustomNodeIfExist(CustomNodes_1.CustomNodes.NodeCallsControllerFunctionNode, function (customNode) {
                var targetBlockScope = void 0;
                if (stackTraceData.length) {
                    targetBlockScope = NodeAppender_1.NodeAppender.getOptimalBlockScope(stackTraceData, randomStackTraceIndex, 1);
                } else {
                    targetBlockScope = blockScopeNode;
                }
                NodeAppender_1.NodeAppender.prependNode(targetBlockScope, customNode.getNode());
            });
        }
    }, {
        key: "initialize",
        value: function initialize() {
            this.customNodes = new _map2.default();
            if (!this.options.selfDefending) {
                return;
            }
            var callsControllerFunctionName = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomVariableName(6);
            var selfDefendingUnicodeNode = this.customNodeFactory(CustomNodes_1.CustomNodes.SelfDefendingUnicodeNode);
            var nodeCallsControllerFunctionNode = this.customNodeFactory(CustomNodes_1.CustomNodes.NodeCallsControllerFunctionNode);
            selfDefendingUnicodeNode.initialize(callsControllerFunctionName);
            nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);
            this.customNodes.set(CustomNodes_1.CustomNodes.SelfDefendingUnicodeNode, selfDefendingUnicodeNode);
            this.customNodes.set(CustomNodes_1.CustomNodes.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
        }
    }]);
    return SelfDefendingCustomNodeGroup;
}(AbstractCustomNodeGroup_1.AbstractCustomNodeGroup);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", _map2.default)], SelfDefendingCustomNodeGroup.prototype, "customNodes", void 0);
SelfDefendingCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], SelfDefendingCustomNodeGroup);
exports.SelfDefendingCustomNodeGroup = SelfDefendingCustomNodeGroup;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var format = __webpack_require__(19);
var StringArrayEncoding_1 = __webpack_require__(32);
var Initializable_1 = __webpack_require__(10);
var NoCustomNodes_1 = __webpack_require__(31);
var AtobTemplate_1 = __webpack_require__(118);
var Rc4Template_1 = __webpack_require__(119);
var SelfDefendingTemplate_1 = __webpack_require__(127);
var StringArrayBase64DecodeNodeTemplate_1 = __webpack_require__(128);
var StringArrayCallsWrapperTemplate_1 = __webpack_require__(129);
var StringArrayRC4DecodeNodeTemplate_1 = __webpack_require__(130);
var AbstractCustomNode_1 = __webpack_require__(13);
var JavaScriptObfuscator_1 = __webpack_require__(25);
var NodeUtils_1 = __webpack_require__(8);
var StringArrayCallsWrapper = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(StringArrayCallsWrapper, _AbstractCustomNode_);

    function StringArrayCallsWrapper(options) {
        (0, _classCallCheck3.default)(this, StringArrayCallsWrapper);
        return (0, _possibleConstructorReturn3.default)(this, (StringArrayCallsWrapper.__proto__ || (0, _getPrototypeOf2.default)(StringArrayCallsWrapper)).call(this, options));
    }

    (0, _createClass3.default)(StringArrayCallsWrapper, [{
        key: "initialize",
        value: function initialize(stringArrayStorage, stringArrayName, stringArrayCallsWrapperName) {
            this.stringArrayStorage = stringArrayStorage;
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
            return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(format(StringArrayCallsWrapperTemplate_1.StringArrayCallsWrapperTemplate(), {
                decodeNodeTemplate: decodeNodeTemplate,
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
                stringArrayName: this.stringArrayName
            }), tslib_1.__assign({}, NoCustomNodes_1.NO_CUSTOM_NODES_PRESET, { seed: this.options.seed })).getObfuscatedCode();
        }
    }, {
        key: "getDecodeStringArrayTemplate",
        value: function getDecodeStringArrayTemplate() {
            var decodeStringArrayTemplate = '',
                selfDefendingCode = '';
            if (this.options.selfDefending) {
                selfDefendingCode = format(SelfDefendingTemplate_1.SelfDefendingTemplate(), {
                    stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
                    stringArrayName: this.stringArrayName
                });
            }
            switch (this.options.stringArrayEncoding) {
                case StringArrayEncoding_1.StringArrayEncoding.rc4:
                    decodeStringArrayTemplate = format(StringArrayRC4DecodeNodeTemplate_1.StringArrayRc4DecodeNodeTemplate(), {
                        atobPolyfill: AtobTemplate_1.AtobTemplate(),
                        rc4Polyfill: Rc4Template_1.Rc4Template(),
                        selfDefendingCode: selfDefendingCode,
                        stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                    });
                    break;
                case StringArrayEncoding_1.StringArrayEncoding.base64:
                    decodeStringArrayTemplate = format(StringArrayBase64DecodeNodeTemplate_1.StringArrayBase64DecodeNodeTemplate(), {
                        atobPolyfill: AtobTemplate_1.AtobTemplate(),
                        selfDefendingCode: selfDefendingCode,
                        stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                    });
                    break;
            }
            return decodeStringArrayTemplate;
        }
    }]);
    return StringArrayCallsWrapper;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], StringArrayCallsWrapper.prototype, "stringArrayStorage", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], StringArrayCallsWrapper.prototype, "stringArrayName", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], StringArrayCallsWrapper.prototype, "stringArrayCallsWrapperName", void 0);
StringArrayCallsWrapper = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], StringArrayCallsWrapper);
exports.StringArrayCallsWrapper = StringArrayCallsWrapper;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(48);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var format = __webpack_require__(19);
var Initializable_1 = __webpack_require__(10);
var StringArrayTemplate_1 = __webpack_require__(131);
var AbstractCustomNode_1 = __webpack_require__(13);
var NodeUtils_1 = __webpack_require__(8);
var StringArrayNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(StringArrayNode, _AbstractCustomNode_);

    function StringArrayNode(options) {
        (0, _classCallCheck3.default)(this, StringArrayNode);
        return (0, _possibleConstructorReturn3.default)(this, (StringArrayNode.__proto__ || (0, _getPrototypeOf2.default)(StringArrayNode)).call(this, options));
    }

    (0, _createClass3.default)(StringArrayNode, [{
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
            return (0, _get3.default)(StringArrayNode.prototype.__proto__ || (0, _getPrototypeOf2.default)(StringArrayNode.prototype), "getNode", this).call(this);
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getTemplate());
        }
    }, {
        key: "getTemplate",
        value: function getTemplate() {
            return format(StringArrayTemplate_1.StringArrayTemplate(), {
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
StringArrayNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], StringArrayNode);
exports.StringArrayNode = StringArrayNode;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var format = __webpack_require__(19);
var Initializable_1 = __webpack_require__(10);
var NoCustomNodes_1 = __webpack_require__(31);
var SelfDefendingTemplate_1 = __webpack_require__(132);
var StringArrayRotateFunctionTemplate_1 = __webpack_require__(133);
var AbstractCustomNode_1 = __webpack_require__(13);
var JavaScriptObfuscator_1 = __webpack_require__(25);
var NodeUtils_1 = __webpack_require__(8);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var Utils_1 = __webpack_require__(14);
var StringArrayRotateFunctionNode = function (_AbstractCustomNode_) {
    (0, _inherits3.default)(StringArrayRotateFunctionNode, _AbstractCustomNode_);

    function StringArrayRotateFunctionNode(options) {
        (0, _classCallCheck3.default)(this, StringArrayRotateFunctionNode);
        return (0, _possibleConstructorReturn3.default)(this, (StringArrayRotateFunctionNode.__proto__ || (0, _getPrototypeOf2.default)(StringArrayRotateFunctionNode)).call(this, options));
    }

    (0, _createClass3.default)(StringArrayRotateFunctionNode, [{
        key: "initialize",
        value: function initialize(stringArrayStorage, stringArrayName, stringArrayRotateValue) {
            this.stringArrayStorage = stringArrayStorage;
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
            var timesName = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomVariableName(6);
            var whileFunctionName = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomVariableName(6);
            var code = '';
            if (this.options.selfDefending) {
                code = format(SelfDefendingTemplate_1.SelfDefendingTemplate(), {
                    timesName: timesName,
                    whileFunctionName: whileFunctionName
                });
            } else {
                code = whileFunctionName + "(++" + timesName + ")";
            }
            return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(format(StringArrayRotateFunctionTemplate_1.StringArrayRotateFunctionTemplate(), {
                code: code,
                timesName: timesName,
                stringArrayName: this.stringArrayName,
                stringArrayRotateValue: Utils_1.Utils.decToHex(this.stringArrayRotateValue),
                whileFunctionName: whileFunctionName
            }), tslib_1.__assign({}, NoCustomNodes_1.NO_CUSTOM_NODES_PRESET, { seed: this.options.seed })).getObfuscatedCode();
        }
    }]);
    return StringArrayRotateFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], StringArrayRotateFunctionNode.prototype, "stringArrayStorage", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], StringArrayRotateFunctionNode.prototype, "stringArrayName", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Number)], StringArrayRotateFunctionNode.prototype, "stringArrayRotateValue", void 0);
StringArrayRotateFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], StringArrayRotateFunctionNode);
exports.StringArrayRotateFunctionNode = StringArrayRotateFunctionNode;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var Initializable_1 = __webpack_require__(10);
var CustomNodes_1 = __webpack_require__(15);
var ObfuscationEvents_1 = __webpack_require__(22);
var AbstractCustomNodeGroup_1 = __webpack_require__(27);
var NodeAppender_1 = __webpack_require__(26);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var Utils_1 = __webpack_require__(14);
var StringArrayCustomNodeGroup = function (_AbstractCustomNodeGr) {
    (0, _inherits3.default)(StringArrayCustomNodeGroup, _AbstractCustomNodeGr);

    function StringArrayCustomNodeGroup(customNodeFactory, obfuscationEventEmitter, stringArrayStorage, options) {
        (0, _classCallCheck3.default)(this, StringArrayCustomNodeGroup);

        var _this = (0, _possibleConstructorReturn3.default)(this, (StringArrayCustomNodeGroup.__proto__ || (0, _getPrototypeOf2.default)(StringArrayCustomNodeGroup)).call(this, options));

        _this.appendEvent = ObfuscationEvents_1.ObfuscationEvents.AfterObfuscation;
        _this.customNodeFactory = customNodeFactory;
        _this.obfuscationEventEmitter = obfuscationEventEmitter;
        _this.stringArrayStorage = stringArrayStorage;
        return _this;
    }

    (0, _createClass3.default)(StringArrayCustomNodeGroup, [{
        key: "appendCustomNodes",
        value: function appendCustomNodes(blockScopeNode, stackTraceData) {
            if (!this.stringArrayStorage.getLength()) {
                return;
            }
            this.appendCustomNodeIfExist(CustomNodes_1.CustomNodes.StringArrayNode, function (customNode) {
                NodeAppender_1.NodeAppender.prependNode(blockScopeNode, customNode.getNode());
            });
            this.appendCustomNodeIfExist(CustomNodes_1.CustomNodes.StringArrayCallsWrapper, function (customNode) {
                NodeAppender_1.NodeAppender.insertNodeAtIndex(blockScopeNode, customNode.getNode(), 1);
            });
            this.appendCustomNodeIfExist(CustomNodes_1.CustomNodes.StringArrayRotateFunctionNode, function (customNode) {
                NodeAppender_1.NodeAppender.insertNodeAtIndex(blockScopeNode, customNode.getNode(), 1);
            });
        }
    }, {
        key: "initialize",
        value: function initialize() {
            this.customNodes = new _map2.default();
            if (!this.options.stringArray) {
                return;
            }
            var stringArrayNode = this.customNodeFactory(CustomNodes_1.CustomNodes.StringArrayNode);
            var stringArrayCallsWrapper = this.customNodeFactory(CustomNodes_1.CustomNodes.StringArrayCallsWrapper);
            var stringArrayRotateFunctionNode = this.customNodeFactory(CustomNodes_1.CustomNodes.StringArrayRotateFunctionNode);
            var stringArrayStorageId = this.stringArrayStorage.getStorageId();
            var stringArrayName = "_" + Utils_1.Utils.hexadecimalPrefix + stringArrayStorageId;
            var stringArrayCallsWrapperName = "_" + Utils_1.Utils.hexadecimalPrefix + Utils_1.Utils.stringRotate(stringArrayStorageId, 1);
            var stringArrayRotateValue = void 0;
            if (this.options.rotateStringArray) {
                stringArrayRotateValue = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomInteger(100, 500);
            } else {
                stringArrayRotateValue = 0;
            }
            stringArrayNode.initialize(this.stringArrayStorage, stringArrayName, stringArrayRotateValue);
            stringArrayCallsWrapper.initialize(this.stringArrayStorage, stringArrayName, stringArrayCallsWrapperName);
            stringArrayRotateFunctionNode.initialize(this.stringArrayStorage, stringArrayName, stringArrayRotateValue);
            this.customNodes.set(CustomNodes_1.CustomNodes.StringArrayNode, stringArrayNode);
            this.customNodes.set(CustomNodes_1.CustomNodes.StringArrayCallsWrapper, stringArrayCallsWrapper);
            if (this.options.rotateStringArray) {
                this.customNodes.set(CustomNodes_1.CustomNodes.StringArrayRotateFunctionNode, stringArrayRotateFunctionNode);
            }
        }
    }]);
    return StringArrayCustomNodeGroup;
}(AbstractCustomNodeGroup_1.AbstractCustomNodeGroup);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", _map2.default)], StringArrayCustomNodeGroup.prototype, "customNodes", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], StringArrayCustomNodeGroup.prototype, "stringArrayStorage", void 0);
StringArrayCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TStringArrayStorage)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])], StringArrayCustomNodeGroup);
exports.StringArrayCustomNodeGroup = StringArrayCustomNodeGroup;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Utils_1 = __webpack_require__(14);
exports.VisitorDirection = Utils_1.Utils.strEnumify({
    enter: 'enter',
    leave: 'leave'
});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var events_1 = __webpack_require__(145);
inversify_1.decorate(inversify_1.injectable(), events_1.EventEmitter);
var ObfuscationEventEmitter = function (_events_1$EventEmitte) {
    (0, _inherits3.default)(ObfuscationEventEmitter, _events_1$EventEmitte);

    function ObfuscationEventEmitter() {
        (0, _classCallCheck3.default)(this, ObfuscationEventEmitter);
        return (0, _possibleConstructorReturn3.default)(this, (ObfuscationEventEmitter.__proto__ || (0, _getPrototypeOf2.default)(ObfuscationEventEmitter)).apply(this, arguments));
    }

    return ObfuscationEventEmitter;
}(events_1.EventEmitter);
ObfuscationEventEmitter = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__metadata("design:paramtypes", [])], ObfuscationEventEmitter);
exports.ObfuscationEventEmitter = ObfuscationEventEmitter;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toConsumableArray2 = __webpack_require__(24);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var CustomNodes_1 = __webpack_require__(15);
var AbstractNodeTransformer_1 = __webpack_require__(16);
var Node_1 = __webpack_require__(12);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var Utils_1 = __webpack_require__(14);
var BlockStatementControlFlowTransformer = BlockStatementControlFlowTransformer_1 = function (_AbstractNodeTransfor) {
    (0, _inherits3.default)(BlockStatementControlFlowTransformer, _AbstractNodeTransfor);

    function BlockStatementControlFlowTransformer(customNodeFactory, options) {
        (0, _classCallCheck3.default)(this, BlockStatementControlFlowTransformer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BlockStatementControlFlowTransformer.__proto__ || (0, _getPrototypeOf2.default)(BlockStatementControlFlowTransformer)).call(this, options));

        _this.customNodeFactory = customNodeFactory;
        return _this;
    }

    (0, _createClass3.default)(BlockStatementControlFlowTransformer, [{
        key: "transformNode",
        value: function transformNode(blockStatementNode) {
            if (RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomFloat(0, 1) > this.options.controlFlowFlatteningThreshold || BlockStatementControlFlowTransformer_1.blockStatementHasProhibitedStatements(blockStatementNode)) {
                return blockStatementNode;
            }
            var blockStatementBody = blockStatementNode.body;
            if (blockStatementBody.length <= 4) {
                return blockStatementNode;
            }
            var originalKeys = [].concat((0, _toConsumableArray3.default)(Array(blockStatementBody.length).keys()));
            var shuffledKeys = Utils_1.Utils.arrayShuffle(originalKeys);
            var originalKeysIndexesInShuffledArray = originalKeys.map(function (key) {
                return shuffledKeys.indexOf(key);
            });
            var blockStatementControlFlowFlatteningCustomNode = this.customNodeFactory(CustomNodes_1.CustomNodes.BlockStatementControlFlowFlatteningNode);
            blockStatementControlFlowFlatteningCustomNode.initialize(blockStatementBody, shuffledKeys, originalKeysIndexesInShuffledArray);
            return blockStatementControlFlowFlatteningCustomNode.getNode()[0];
        }
    }], [{
        key: "blockStatementHasProhibitedStatements",
        value: function blockStatementHasProhibitedStatements(blockStatementNode) {
            return blockStatementNode.body.some(function (statement) {
                var isBreakOrContinueStatement = Node_1.Node.isBreakStatementNode(statement) || Node_1.Node.isContinueStatementNode(statement);
                var isVariableDeclarationWithLetOrConstKind = Node_1.Node.isVariableDeclarationNode(statement) && (statement.kind === 'const' || statement.kind === 'let');
                return Node_1.Node.isFunctionDeclarationNode(statement) || isBreakOrContinueStatement || isVariableDeclarationWithLetOrConstKind;
            });
        }
    }]);
    return BlockStatementControlFlowTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
BlockStatementControlFlowTransformer = BlockStatementControlFlowTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], BlockStatementControlFlowTransformer);
exports.BlockStatementControlFlowTransformer = BlockStatementControlFlowTransformer;
var BlockStatementControlFlowTransformer_1;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var estraverse = __webpack_require__(17);
var CustomNodes_1 = __webpack_require__(15);
var NodeType_1 = __webpack_require__(18);
var AbstractNodeTransformer_1 = __webpack_require__(16);
var Node_1 = __webpack_require__(12);
var NodeAppender_1 = __webpack_require__(26);
var NodeControlFlowReplacers_1 = __webpack_require__(39);
var NodeUtils_1 = __webpack_require__(8);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var FunctionControlFlowTransformer = FunctionControlFlowTransformer_1 = function (_AbstractNodeTransfor) {
    (0, _inherits3.default)(FunctionControlFlowTransformer, _AbstractNodeTransfor);

    function FunctionControlFlowTransformer(controlFlowStorageFactory, controlFlowReplacerFactory, customNodeFactory, options) {
        (0, _classCallCheck3.default)(this, FunctionControlFlowTransformer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FunctionControlFlowTransformer.__proto__ || (0, _getPrototypeOf2.default)(FunctionControlFlowTransformer)).call(this, options));

        _this.controlFlowData = new _map2.default();
        _this.hostNodesWithControlFlowNode = [];
        _this.controlFlowStorageFactory = controlFlowStorageFactory;
        _this.controlFlowReplacerFactory = controlFlowReplacerFactory;
        _this.customNodeFactory = customNodeFactory;
        return _this;
    }

    (0, _createClass3.default)(FunctionControlFlowTransformer, [{
        key: "transformNode",
        value: function transformNode(functionNode) {
            if (Node_1.Node.isArrowFunctionExpressionNode(functionNode)) {
                return functionNode;
            }
            var hostNode = FunctionControlFlowTransformer_1.getHostNode(functionNode);
            var controlFlowStorage = this.getControlFlowStorage(hostNode);
            this.controlFlowData.set(hostNode, controlFlowStorage);
            this.transformFunctionBody(functionNode.body, controlFlowStorage);
            NodeUtils_1.NodeUtils.parentize(functionNode);
            if (!controlFlowStorage.getLength()) {
                return functionNode;
            }
            var controlFlowStorageCustomNode = this.customNodeFactory(CustomNodes_1.CustomNodes.ControlFlowStorageNode);
            controlFlowStorageCustomNode.initialize(controlFlowStorage);
            NodeAppender_1.NodeAppender.prependNode(hostNode, controlFlowStorageCustomNode.getNode());
            this.hostNodesWithControlFlowNode.push(hostNode);
            return functionNode;
        }
    }, {
        key: "getControlFlowStorage",
        value: function getControlFlowStorage(hostNode) {
            var controlFlowStorage = this.controlFlowStorageFactory();
            if (this.controlFlowData.has(hostNode)) {
                if (this.hostNodesWithControlFlowNode.indexOf(hostNode) !== -1) {
                    hostNode.body.shift();
                }
                var hostControlFlowStorage = this.controlFlowData.get(hostNode);
                controlFlowStorage.mergeWith(hostControlFlowStorage, true);
            }
            return controlFlowStorage;
        }
    }, {
        key: "transformFunctionBody",
        value: function transformFunctionBody(functionNodeBody, controlFlowStorage) {
            var _this2 = this;

            estraverse.replace(functionNodeBody, {
                enter: function enter(node, parentNode) {
                    if (!FunctionControlFlowTransformer_1.controlFlowReplacersMap.has(node.type)) {
                        return node;
                    }
                    if (RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomFloat(0, 1) > _this2.options.controlFlowFlatteningThreshold) {
                        return node;
                    }
                    var controlFlowReplacerName = FunctionControlFlowTransformer_1.controlFlowReplacersMap.get(node.type);
                    return tslib_1.__assign({}, _this2.controlFlowReplacerFactory(controlFlowReplacerName).replace(node, parentNode, controlFlowStorage), { parentNode: parentNode });
                }
            });
        }
    }], [{
        key: "getHostNode",
        value: function getHostNode(functionNode) {
            var blockScopesOfNode = NodeUtils_1.NodeUtils.getBlockScopesOfNode(functionNode);
            if (blockScopesOfNode.length === 1) {
                return functionNode.body;
            } else {
                blockScopesOfNode.pop();
            }
            if (blockScopesOfNode.length > FunctionControlFlowTransformer_1.hostNodeSearchMinDepth) {
                blockScopesOfNode.splice(0, FunctionControlFlowTransformer_1.hostNodeSearchMinDepth);
            }
            if (blockScopesOfNode.length > FunctionControlFlowTransformer_1.hostNodeSearchMaxDepth) {
                blockScopesOfNode.length = FunctionControlFlowTransformer_1.hostNodeSearchMaxDepth;
            }
            return RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomGenerator().pickone(blockScopesOfNode);
        }
    }]);
    return FunctionControlFlowTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
FunctionControlFlowTransformer.controlFlowReplacersMap = new _map2.default([[NodeType_1.NodeType.BinaryExpression, NodeControlFlowReplacers_1.NodeControlFlowReplacers.BinaryExpressionControlFlowReplacer], [NodeType_1.NodeType.CallExpression, NodeControlFlowReplacers_1.NodeControlFlowReplacers.CallExpressionControlFlowReplacer], [NodeType_1.NodeType.LogicalExpression, NodeControlFlowReplacers_1.NodeControlFlowReplacers.LogicalExpressionControlFlowReplacer]]);
FunctionControlFlowTransformer.hostNodeSearchMinDepth = 0;
FunctionControlFlowTransformer.hostNodeSearchMaxDepth = 2;
FunctionControlFlowTransformer = FunctionControlFlowTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__TControlFlowStorage)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowReplacer)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Function, Function, Object])], FunctionControlFlowTransformer);
exports.FunctionControlFlowTransformer = FunctionControlFlowTransformer;
var FunctionControlFlowTransformer_1;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var CustomNodes_1 = __webpack_require__(15);
var ExpressionWithOperatorControlFlowReplacer_1 = __webpack_require__(42);
var BinaryExpressionControlFlowReplacer = BinaryExpressionControlFlowReplacer_1 = function (_ExpressionWithOperat) {
    (0, _inherits3.default)(BinaryExpressionControlFlowReplacer, _ExpressionWithOperat);

    function BinaryExpressionControlFlowReplacer(customNodeFactory, options) {
        (0, _classCallCheck3.default)(this, BinaryExpressionControlFlowReplacer);
        return (0, _possibleConstructorReturn3.default)(this, (BinaryExpressionControlFlowReplacer.__proto__ || (0, _getPrototypeOf2.default)(BinaryExpressionControlFlowReplacer)).call(this, customNodeFactory, options));
    }

    (0, _createClass3.default)(BinaryExpressionControlFlowReplacer, [{
        key: "replace",
        value: function replace(binaryExpressionNode, parentNode, controlFlowStorage) {
            var replacerId = binaryExpressionNode.operator;
            var binaryExpressionFunctionCustomNode = this.customNodeFactory(CustomNodes_1.CustomNodes.BinaryExpressionFunctionNode);
            binaryExpressionFunctionCustomNode.initialize(replacerId);
            var storageKey = this.insertCustomNodeToControlFlowStorage(binaryExpressionFunctionCustomNode, controlFlowStorage, replacerId, BinaryExpressionControlFlowReplacer_1.usingExistingIdentifierChance);
            return this.getControlFlowStorageCallNode(controlFlowStorage.getStorageId(), storageKey, binaryExpressionNode.left, binaryExpressionNode.right);
        }
    }]);
    return BinaryExpressionControlFlowReplacer;
}(ExpressionWithOperatorControlFlowReplacer_1.ExpressionWithOperatorControlFlowReplacer);
BinaryExpressionControlFlowReplacer.usingExistingIdentifierChance = 0.5;
BinaryExpressionControlFlowReplacer = BinaryExpressionControlFlowReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], BinaryExpressionControlFlowReplacer);
exports.BinaryExpressionControlFlowReplacer = BinaryExpressionControlFlowReplacer;
var BinaryExpressionControlFlowReplacer_1;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var CustomNodes_1 = __webpack_require__(15);
var AbstractControlFlowReplacer_1 = __webpack_require__(41);
var Node_1 = __webpack_require__(12);
var CallExpressionControlFlowReplacer = CallExpressionControlFlowReplacer_1 = function (_AbstractControlFlowR) {
    (0, _inherits3.default)(CallExpressionControlFlowReplacer, _AbstractControlFlowR);

    function CallExpressionControlFlowReplacer(customNodeFactory, options) {
        (0, _classCallCheck3.default)(this, CallExpressionControlFlowReplacer);
        return (0, _possibleConstructorReturn3.default)(this, (CallExpressionControlFlowReplacer.__proto__ || (0, _getPrototypeOf2.default)(CallExpressionControlFlowReplacer)).call(this, customNodeFactory, options));
    }

    (0, _createClass3.default)(CallExpressionControlFlowReplacer, [{
        key: "replace",
        value: function replace(callExpressionNode, parentNode, controlFlowStorage) {
            var callee = callExpressionNode.callee;
            if (!Node_1.Node.isIdentifierNode(callee)) {
                return callExpressionNode;
            }
            var replacerId = String(callExpressionNode.arguments.length);
            var callExpressionFunctionCustomNode = this.customNodeFactory(CustomNodes_1.CustomNodes.CallExpressionFunctionNode);
            var expressionArguments = callExpressionNode.arguments;
            callExpressionFunctionCustomNode.initialize(expressionArguments);
            var storageKey = this.insertCustomNodeToControlFlowStorage(callExpressionFunctionCustomNode, controlFlowStorage, replacerId, CallExpressionControlFlowReplacer_1.usingExistingIdentifierChance);
            return this.getControlFlowStorageCallNode(controlFlowStorage.getStorageId(), storageKey, callee, expressionArguments);
        }
    }, {
        key: "getControlFlowStorageCallNode",
        value: function getControlFlowStorageCallNode(controlFlowStorageId, storageKey, callee, expressionArguments) {
            var controlFlowStorageCallCustomNode = this.customNodeFactory(CustomNodes_1.CustomNodes.CallExpressionControlFlowStorageCallNode);
            controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey, callee, expressionArguments);
            var statementNode = controlFlowStorageCallCustomNode.getNode()[0];
            if (!statementNode || !Node_1.Node.isExpressionStatementNode(statementNode)) {
                throw new Error("`controlFlowStorageCallCustomNode.getNode()[0]` should returns array with `ExpressionStatement` node");
            }
            return statementNode.expression;
        }
    }]);
    return CallExpressionControlFlowReplacer;
}(AbstractControlFlowReplacer_1.AbstractControlFlowReplacer);
CallExpressionControlFlowReplacer.usingExistingIdentifierChance = 0.5;
CallExpressionControlFlowReplacer = CallExpressionControlFlowReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], CallExpressionControlFlowReplacer);
exports.CallExpressionControlFlowReplacer = CallExpressionControlFlowReplacer;
var CallExpressionControlFlowReplacer_1;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var CustomNodes_1 = __webpack_require__(15);
var ExpressionWithOperatorControlFlowReplacer_1 = __webpack_require__(42);
var Node_1 = __webpack_require__(12);
var NodeUtils_1 = __webpack_require__(8);
var LogicalExpressionControlFlowReplacer = LogicalExpressionControlFlowReplacer_1 = function (_ExpressionWithOperat) {
    (0, _inherits3.default)(LogicalExpressionControlFlowReplacer, _ExpressionWithOperat);

    function LogicalExpressionControlFlowReplacer(customNodeFactory, options) {
        (0, _classCallCheck3.default)(this, LogicalExpressionControlFlowReplacer);
        return (0, _possibleConstructorReturn3.default)(this, (LogicalExpressionControlFlowReplacer.__proto__ || (0, _getPrototypeOf2.default)(LogicalExpressionControlFlowReplacer)).call(this, customNodeFactory, options));
    }

    (0, _createClass3.default)(LogicalExpressionControlFlowReplacer, [{
        key: "replace",
        value: function replace(logicalExpressionNode, parentNode, controlFlowStorage) {
            if (this.checkForProhibitedExpressions(logicalExpressionNode.left, logicalExpressionNode.right)) {
                return logicalExpressionNode;
            }
            var replacerId = logicalExpressionNode.operator;
            var logicalExpressionFunctionCustomNode = this.customNodeFactory(CustomNodes_1.CustomNodes.LogicalExpressionFunctionNode);
            logicalExpressionFunctionCustomNode.initialize(replacerId);
            var storageKey = this.insertCustomNodeToControlFlowStorage(logicalExpressionFunctionCustomNode, controlFlowStorage, replacerId, LogicalExpressionControlFlowReplacer_1.usingExistingIdentifierChance);
            return this.getControlFlowStorageCallNode(controlFlowStorage.getStorageId(), storageKey, logicalExpressionNode.left, logicalExpressionNode.right);
        }
    }, {
        key: "checkForProhibitedExpressions",
        value: function checkForProhibitedExpressions(leftExpression, rightExpression) {
            return [leftExpression, rightExpression].some(function (expressionNode) {
                var nodeForCheck = void 0;
                if (!Node_1.Node.isUnaryExpressionNode(expressionNode)) {
                    nodeForCheck = expressionNode;
                } else {
                    nodeForCheck = NodeUtils_1.NodeUtils.getUnaryExpressionArgumentNode(expressionNode);
                }
                return !Node_1.Node.isLiteralNode(nodeForCheck) && !Node_1.Node.isIdentifierNode(nodeForCheck) && !Node_1.Node.isObjectExpressionNode(nodeForCheck) && !Node_1.Node.isExpressionStatementNode(nodeForCheck);
            });
        }
    }]);
    return LogicalExpressionControlFlowReplacer;
}(ExpressionWithOperatorControlFlowReplacer_1.ExpressionWithOperatorControlFlowReplacer);
LogicalExpressionControlFlowReplacer.usingExistingIdentifierChance = 0.5;
LogicalExpressionControlFlowReplacer = LogicalExpressionControlFlowReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], LogicalExpressionControlFlowReplacer);
exports.LogicalExpressionControlFlowReplacer = LogicalExpressionControlFlowReplacer;
var LogicalExpressionControlFlowReplacer_1;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var NodeType_1 = __webpack_require__(18);
var AbstractNodeTransformer_1 = __webpack_require__(16);
var Node_1 = __webpack_require__(12);
var MemberExpressionTransformer = function (_AbstractNodeTransfor) {
    (0, _inherits3.default)(MemberExpressionTransformer, _AbstractNodeTransfor);

    function MemberExpressionTransformer(options) {
        (0, _classCallCheck3.default)(this, MemberExpressionTransformer);
        return (0, _possibleConstructorReturn3.default)(this, (MemberExpressionTransformer.__proto__ || (0, _getPrototypeOf2.default)(MemberExpressionTransformer)).call(this, options));
    }

    (0, _createClass3.default)(MemberExpressionTransformer, [{
        key: "transformNode",
        value: function transformNode(memberExpressionNode) {
            if (Node_1.Node.isIdentifierNode(memberExpressionNode.property)) {
                if (memberExpressionNode.computed) {
                    return memberExpressionNode;
                }
                memberExpressionNode.computed = true;
                memberExpressionNode.property = {
                    type: NodeType_1.NodeType.Literal,
                    value: memberExpressionNode.property.name,
                    raw: "'" + memberExpressionNode.property.name + "'"
                };
            }
            return memberExpressionNode;
        }
    }]);
    return MemberExpressionTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
MemberExpressionTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], MemberExpressionTransformer);
exports.MemberExpressionTransformer = MemberExpressionTransformer;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var NodeType_1 = __webpack_require__(18);
var AbstractNodeTransformer_1 = __webpack_require__(16);
var Node_1 = __webpack_require__(12);
var MethodDefinitionTransformer = MethodDefinitionTransformer_1 = function (_AbstractNodeTransfor) {
    (0, _inherits3.default)(MethodDefinitionTransformer, _AbstractNodeTransfor);

    function MethodDefinitionTransformer(options) {
        (0, _classCallCheck3.default)(this, MethodDefinitionTransformer);
        return (0, _possibleConstructorReturn3.default)(this, (MethodDefinitionTransformer.__proto__ || (0, _getPrototypeOf2.default)(MethodDefinitionTransformer)).call(this, options));
    }

    (0, _createClass3.default)(MethodDefinitionTransformer, [{
        key: "transformNode",
        value: function transformNode(methodDefinitionNode, parentNode) {
            if (Node_1.Node.isIdentifierNode(methodDefinitionNode.key) && !MethodDefinitionTransformer_1.ignoredNames.includes(methodDefinitionNode.key.name) && methodDefinitionNode.computed === false) {
                methodDefinitionNode.computed = true;
                methodDefinitionNode.key = {
                    type: NodeType_1.NodeType.Literal,
                    value: methodDefinitionNode.key.name,
                    raw: "'" + methodDefinitionNode.key.name + "'"
                };
            }
            return methodDefinitionNode;
        }
    }]);
    return MethodDefinitionTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
MethodDefinitionTransformer.ignoredNames = ['constructor'];
MethodDefinitionTransformer = MethodDefinitionTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], MethodDefinitionTransformer);
exports.MethodDefinitionTransformer = MethodDefinitionTransformer;
var MethodDefinitionTransformer_1;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var AbstractNodeTransformer_1 = __webpack_require__(16);
var Node_1 = __webpack_require__(12);
var Nodes_1 = __webpack_require__(20);
var TemplateLiteralTransformer = TemplateLiteralTransformer_1 = function (_AbstractNodeTransfor) {
    (0, _inherits3.default)(TemplateLiteralTransformer, _AbstractNodeTransfor);

    function TemplateLiteralTransformer(options) {
        (0, _classCallCheck3.default)(this, TemplateLiteralTransformer);
        return (0, _possibleConstructorReturn3.default)(this, (TemplateLiteralTransformer.__proto__ || (0, _getPrototypeOf2.default)(TemplateLiteralTransformer)).call(this, options));
    }

    (0, _createClass3.default)(TemplateLiteralTransformer, [{
        key: "transformNode",
        value: function transformNode(templateLiteralNode, parentNode) {
            var templateLiteralExpressions = templateLiteralNode.expressions;
            var nodes = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(templateLiteralNode.quasis), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var templateElement = _step.value;

                    nodes.push(Nodes_1.Nodes.getLiteralNode(templateElement.value.cooked));
                    var expression = templateLiteralExpressions.shift();
                    if (!expression) {
                        continue;
                    }
                    nodes.push(expression);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            nodes = nodes.filter(function (node) {
                return !(Node_1.Node.isLiteralNode(node) && node.value === '');
            });
            if (!TemplateLiteralTransformer_1.isLiteralNodeWithStringValue(nodes[0]) && !TemplateLiteralTransformer_1.isLiteralNodeWithStringValue(nodes[1])) {
                nodes.unshift(Nodes_1.Nodes.getLiteralNode(''));
            }
            if (nodes.length > 1) {
                var root = Nodes_1.Nodes.getBinaryExpressionNode('+', nodes.shift(), nodes.shift());
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = (0, _getIterator3.default)(nodes), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var node = _step2.value;

                        root = Nodes_1.Nodes.getBinaryExpressionNode('+', root, node);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                return root;
            }
            return nodes[0];
        }
    }], [{
        key: "isLiteralNodeWithStringValue",
        value: function isLiteralNodeWithStringValue(node) {
            return node && Node_1.Node.isLiteralNode(node) && typeof node.value === 'string';
        }
    }]);
    return TemplateLiteralTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
TemplateLiteralTransformer = TemplateLiteralTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], TemplateLiteralTransformer);
exports.TemplateLiteralTransformer = TemplateLiteralTransformer;
var TemplateLiteralTransformer_1;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var estraverse = __webpack_require__(17);
var NodeObfuscationReplacers_1 = __webpack_require__(23);
var AbstractNodeTransformer_1 = __webpack_require__(16);
var Node_1 = __webpack_require__(12);
var CatchClauseTransformer = function (_AbstractNodeTransfor) {
    (0, _inherits3.default)(CatchClauseTransformer, _AbstractNodeTransfor);

    function CatchClauseTransformer(replacersFactory, options) {
        (0, _classCallCheck3.default)(this, CatchClauseTransformer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CatchClauseTransformer.__proto__ || (0, _getPrototypeOf2.default)(CatchClauseTransformer)).call(this, options));

        _this.identifierReplacer = replacersFactory(NodeObfuscationReplacers_1.NodeObfuscatorsReplacers.IdentifierReplacer);
        return _this;
    }

    (0, _createClass3.default)(CatchClauseTransformer, [{
        key: "transformNode",
        value: function transformNode(catchClauseNode) {
            var nodeIdentifier = this.nodeIdentifier++;
            this.storeCatchClauseParam(catchClauseNode, nodeIdentifier);
            this.replaceCatchClauseParam(catchClauseNode, nodeIdentifier);
            return catchClauseNode;
        }
    }, {
        key: "storeCatchClauseParam",
        value: function storeCatchClauseParam(catchClauseNode, nodeIdentifier) {
            if (Node_1.Node.isIdentifierNode(catchClauseNode.param)) {
                this.identifierReplacer.storeNames(catchClauseNode.param.name, nodeIdentifier);
            }
        }
    }, {
        key: "replaceCatchClauseParam",
        value: function replaceCatchClauseParam(catchClauseNode, nodeIdentifier) {
            var _this2 = this;

            estraverse.replace(catchClauseNode, {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isReplaceableIdentifierNode(node, parentNode)) {
                        var newNodeName = _this2.identifierReplacer.replace(node.name, nodeIdentifier);
                        if (node.name !== newNodeName) {
                            node.name = newNodeName;
                            node.obfuscated = true;
                        }
                    }
                }
            });
        }
    }]);
    return CatchClauseTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
CatchClauseTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatorReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], CatchClauseTransformer);
exports.CatchClauseTransformer = CatchClauseTransformer;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var estraverse = __webpack_require__(17);
var NodeObfuscationReplacers_1 = __webpack_require__(23);
var NodeType_1 = __webpack_require__(18);
var AbstractNodeTransformer_1 = __webpack_require__(16);
var Node_1 = __webpack_require__(12);
var NodeUtils_1 = __webpack_require__(8);
var FunctionDeclarationTransformer = function (_AbstractNodeTransfor) {
    (0, _inherits3.default)(FunctionDeclarationTransformer, _AbstractNodeTransfor);

    function FunctionDeclarationTransformer(nodeObfuscatorsReplacersFactory, options) {
        (0, _classCallCheck3.default)(this, FunctionDeclarationTransformer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FunctionDeclarationTransformer.__proto__ || (0, _getPrototypeOf2.default)(FunctionDeclarationTransformer)).call(this, options));

        _this.replaceableIdentifiers = new _map2.default();
        _this.identifierReplacer = nodeObfuscatorsReplacersFactory(NodeObfuscationReplacers_1.NodeObfuscatorsReplacers.IdentifierReplacer);
        return _this;
    }

    (0, _createClass3.default)(FunctionDeclarationTransformer, [{
        key: "transformNode",
        value: function transformNode(functionDeclarationNode, parentNode) {
            var nodeIdentifier = this.nodeIdentifier++;
            var blockScopeOfFunctionDeclarationNode = NodeUtils_1.NodeUtils.getBlockScopesOfNode(functionDeclarationNode)[0];
            if (blockScopeOfFunctionDeclarationNode.type === NodeType_1.NodeType.Program) {
                return functionDeclarationNode;
            }
            this.storeFunctionName(functionDeclarationNode, nodeIdentifier);
            this.replaceFunctionName(blockScopeOfFunctionDeclarationNode, nodeIdentifier);
            return functionDeclarationNode;
        }
    }, {
        key: "storeFunctionName",
        value: function storeFunctionName(functionDeclarationNode, nodeIdentifier) {
            this.identifierReplacer.storeNames(functionDeclarationNode.id.name, nodeIdentifier);
        }
    }, {
        key: "replaceFunctionName",
        value: function replaceFunctionName(scopeNode, nodeIdentifier) {
            var _this2 = this;

            var replaceableIdentifiersForCurrentScope = void 0;
            if (this.replaceableIdentifiers.has(scopeNode)) {
                replaceableIdentifiersForCurrentScope = this.replaceableIdentifiers.get(scopeNode);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = (0, _getIterator3.default)(replaceableIdentifiersForCurrentScope), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var replaceableIdentifier = _step.value;

                        replaceableIdentifier.name = this.identifierReplacer.replace(replaceableIdentifier.name, nodeIdentifier);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return;
            }
            replaceableIdentifiersForCurrentScope = [];
            estraverse.replace(scopeNode, {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isReplaceableIdentifierNode(node, parentNode)) {
                        var newNodeName = _this2.identifierReplacer.replace(node.name, nodeIdentifier);
                        if (node.name !== newNodeName) {
                            node.name = newNodeName;
                        } else {
                            replaceableIdentifiersForCurrentScope.push(node);
                        }
                    }
                }
            });
            this.replaceableIdentifiers.set(scopeNode, replaceableIdentifiersForCurrentScope);
        }
    }]);
    return FunctionDeclarationTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
FunctionDeclarationTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatorReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], FunctionDeclarationTransformer);
exports.FunctionDeclarationTransformer = FunctionDeclarationTransformer;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var estraverse = __webpack_require__(17);
var NodeObfuscationReplacers_1 = __webpack_require__(23);
var AbstractNodeTransformer_1 = __webpack_require__(16);
var Node_1 = __webpack_require__(12);
var FunctionTransformer = function (_AbstractNodeTransfor) {
    (0, _inherits3.default)(FunctionTransformer, _AbstractNodeTransfor);

    function FunctionTransformer(nodeObfuscatorsReplacersFactory, options) {
        (0, _classCallCheck3.default)(this, FunctionTransformer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FunctionTransformer.__proto__ || (0, _getPrototypeOf2.default)(FunctionTransformer)).call(this, options));

        _this.identifierReplacer = nodeObfuscatorsReplacersFactory(NodeObfuscationReplacers_1.NodeObfuscatorsReplacers.IdentifierReplacer);
        return _this;
    }

    (0, _createClass3.default)(FunctionTransformer, [{
        key: "transformNode",
        value: function transformNode(functionNode) {
            var nodeIdentifier = this.nodeIdentifier++;
            this.storeFunctionParams(functionNode, nodeIdentifier);
            this.replaceFunctionParams(functionNode, nodeIdentifier);
            return functionNode;
        }
    }, {
        key: "storeFunctionParams",
        value: function storeFunctionParams(functionNode, nodeIdentifier) {
            var _this2 = this;

            functionNode.params.forEach(function (paramsNode) {
                if (Node_1.Node.isObjectPatternNode(paramsNode)) {
                    return estraverse.VisitorOption.Skip;
                }
                estraverse.traverse(paramsNode, {
                    enter: function enter(node) {
                        if (Node_1.Node.isAssignmentPatternNode(node) && Node_1.Node.isIdentifierNode(node.left)) {
                            _this2.identifierReplacer.storeNames(node.left.name, nodeIdentifier);
                            return estraverse.VisitorOption.Skip;
                        }
                        if (Node_1.Node.isIdentifierNode(node)) {
                            _this2.identifierReplacer.storeNames(node.name, nodeIdentifier);
                        }
                    }
                });
            });
        }
    }, {
        key: "replaceFunctionParams",
        value: function replaceFunctionParams(functionNode, nodeIdentifier) {
            var _this3 = this;

            var traverseVisitor = {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isReplaceableIdentifierNode(node, parentNode)) {
                        var newNodeName = _this3.identifierReplacer.replace(node.name, nodeIdentifier);
                        if (node.name !== newNodeName) {
                            node.name = newNodeName;
                            node.obfuscated = true;
                        }
                    }
                }
            };
            functionNode.params.forEach(function (paramsNode) {
                return estraverse.replace(paramsNode, traverseVisitor);
            });
            estraverse.replace(functionNode.body, traverseVisitor);
        }
    }]);
    return FunctionTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
FunctionTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatorReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], FunctionTransformer);
exports.FunctionTransformer = FunctionTransformer;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var estraverse = __webpack_require__(17);
var NodeObfuscationReplacers_1 = __webpack_require__(23);
var AbstractNodeTransformer_1 = __webpack_require__(16);
var Node_1 = __webpack_require__(12);
var LabeledStatementTransformer = function (_AbstractNodeTransfor) {
    (0, _inherits3.default)(LabeledStatementTransformer, _AbstractNodeTransfor);

    function LabeledStatementTransformer(nodeObfuscatorsReplacersFactory, options) {
        (0, _classCallCheck3.default)(this, LabeledStatementTransformer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (LabeledStatementTransformer.__proto__ || (0, _getPrototypeOf2.default)(LabeledStatementTransformer)).call(this, options));

        _this.identifierReplacer = nodeObfuscatorsReplacersFactory(NodeObfuscationReplacers_1.NodeObfuscatorsReplacers.IdentifierReplacer);
        return _this;
    }

    (0, _createClass3.default)(LabeledStatementTransformer, [{
        key: "transformNode",
        value: function transformNode(labeledStatementNode) {
            var nodeIdentifier = this.nodeIdentifier++;
            this.storeLabeledStatementName(labeledStatementNode, nodeIdentifier);
            this.replaceLabeledStatementName(labeledStatementNode, nodeIdentifier);
            return labeledStatementNode;
        }
    }, {
        key: "storeLabeledStatementName",
        value: function storeLabeledStatementName(labeledStatementNode, nodeIdentifier) {
            this.identifierReplacer.storeNames(labeledStatementNode.label.name, nodeIdentifier);
        }
    }, {
        key: "replaceLabeledStatementName",
        value: function replaceLabeledStatementName(labeledStatementNode, nodeIdentifier) {
            var _this2 = this;

            estraverse.replace(labeledStatementNode, {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isLabelIdentifierNode(node, parentNode)) {
                        node.name = _this2.identifierReplacer.replace(node.name, nodeIdentifier);
                    }
                }
            });
        }
    }]);
    return LabeledStatementTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
LabeledStatementTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatorReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], LabeledStatementTransformer);
exports.LabeledStatementTransformer = LabeledStatementTransformer;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(141);

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var escodegen = __webpack_require__(28);
var NodeObfuscationReplacers_1 = __webpack_require__(23);
var AbstractNodeTransformer_1 = __webpack_require__(16);
var Node_1 = __webpack_require__(12);
var LiteralTransformer = function (_AbstractNodeTransfor) {
    (0, _inherits3.default)(LiteralTransformer, _AbstractNodeTransfor);

    function LiteralTransformer(replacersFactory, options) {
        (0, _classCallCheck3.default)(this, LiteralTransformer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (LiteralTransformer.__proto__ || (0, _getPrototypeOf2.default)(LiteralTransformer)).call(this, options));

        _this.replacersFactory = replacersFactory;
        return _this;
    }

    (0, _createClass3.default)(LiteralTransformer, [{
        key: "transformNode",
        value: function transformNode(literalNode, parentNode) {
            if (Node_1.Node.isPropertyNode(parentNode) && parentNode.key === literalNode) {
                return literalNode;
            }
            var content = void 0;
            switch ((0, _typeof3.default)(literalNode.value)) {
                case 'boolean':
                    content = this.replacersFactory(NodeObfuscationReplacers_1.NodeObfuscatorsReplacers.BooleanReplacer).replace(literalNode.value);
                    break;
                case 'number':
                    content = this.replacersFactory(NodeObfuscationReplacers_1.NodeObfuscatorsReplacers.NumberLiteralReplacer).replace(literalNode.value);
                    break;
                case 'string':
                    content = this.replacersFactory(NodeObfuscationReplacers_1.NodeObfuscatorsReplacers.StringLiteralReplacer).replace(literalNode.value);
                    break;
                default:
                    return literalNode;
            }
            literalNode['x-verbatim-property'] = {
                content: content,
                precedence: escodegen.Precedence.Primary
            };
            return literalNode;
        }
    }]);
    return LiteralTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
LiteralTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatorReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], LiteralTransformer);
exports.LiteralTransformer = LiteralTransformer;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var escodegen = __webpack_require__(28);
var NodeType_1 = __webpack_require__(18);
var AbstractNodeTransformer_1 = __webpack_require__(16);
var Node_1 = __webpack_require__(12);
var Utils_1 = __webpack_require__(14);
var ObjectExpressionTransformer = ObjectExpressionTransformer_1 = function (_AbstractNodeTransfor) {
    (0, _inherits3.default)(ObjectExpressionTransformer, _AbstractNodeTransfor);

    function ObjectExpressionTransformer(options) {
        (0, _classCallCheck3.default)(this, ObjectExpressionTransformer);
        return (0, _possibleConstructorReturn3.default)(this, (ObjectExpressionTransformer.__proto__ || (0, _getPrototypeOf2.default)(ObjectExpressionTransformer)).call(this, options));
    }

    (0, _createClass3.default)(ObjectExpressionTransformer, [{
        key: "transformNode",
        value: function transformNode(objectExpressionNode) {
            objectExpressionNode.properties.forEach(function (property) {
                if (property.shorthand) {
                    property.shorthand = false;
                }
                if (Node_1.Node.isLiteralNode(property.key)) {
                    property.key = ObjectExpressionTransformer_1.transformLiteralPropertyKey(property.key);
                } else if (Node_1.Node.isIdentifierNode(property.key)) {
                    property.key = ObjectExpressionTransformer_1.transformIdentifierPropertyKey(property.key);
                }
            });
            return objectExpressionNode;
        }
    }], [{
        key: "transformLiteralPropertyKey",
        value: function transformLiteralPropertyKey(node) {
            if (typeof node.value === 'string' && !node['x-verbatim-property']) {
                node['x-verbatim-property'] = {
                    content: "'" + Utils_1.Utils.stringToUnicodeEscapeSequence(node.value) + "'",
                    precedence: escodegen.Precedence.Primary
                };
            }
            return node;
        }
    }, {
        key: "transformIdentifierPropertyKey",
        value: function transformIdentifierPropertyKey(node) {
            return {
                type: NodeType_1.NodeType.Literal,
                value: node.name,
                raw: "'" + node.name + "'",
                'x-verbatim-property': {
                    content: "'" + Utils_1.Utils.stringToUnicodeEscapeSequence(node.name) + "'",
                    precedence: escodegen.Precedence.Primary
                }
            };
        }
    }]);
    return ObjectExpressionTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
ObjectExpressionTransformer = ObjectExpressionTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], ObjectExpressionTransformer);
exports.ObjectExpressionTransformer = ObjectExpressionTransformer;
var ObjectExpressionTransformer_1;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var estraverse = __webpack_require__(17);
var NodeObfuscationReplacers_1 = __webpack_require__(23);
var NodeType_1 = __webpack_require__(18);
var AbstractNodeTransformer_1 = __webpack_require__(16);
var Node_1 = __webpack_require__(12);
var NodeUtils_1 = __webpack_require__(8);
var VariableDeclarationTransformer = function (_AbstractNodeTransfor) {
    (0, _inherits3.default)(VariableDeclarationTransformer, _AbstractNodeTransfor);

    function VariableDeclarationTransformer(replacersFactory, options) {
        (0, _classCallCheck3.default)(this, VariableDeclarationTransformer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (VariableDeclarationTransformer.__proto__ || (0, _getPrototypeOf2.default)(VariableDeclarationTransformer)).call(this, options));

        _this.replaceableIdentifiers = new _map2.default();
        _this.identifierReplacer = replacersFactory(NodeObfuscationReplacers_1.NodeObfuscatorsReplacers.IdentifierReplacer);
        return _this;
    }

    (0, _createClass3.default)(VariableDeclarationTransformer, [{
        key: "transformNode",
        value: function transformNode(variableDeclarationNode, parentNode) {
            var blockScopeOfVariableDeclarationNode = NodeUtils_1.NodeUtils.getBlockScopesOfNode(variableDeclarationNode)[0];
            if (blockScopeOfVariableDeclarationNode.type === NodeType_1.NodeType.Program) {
                return variableDeclarationNode;
            }
            var nodeIdentifier = this.nodeIdentifier++;
            var scopeNode = variableDeclarationNode.kind === 'var' ? blockScopeOfVariableDeclarationNode : parentNode;
            this.storeVariableNames(variableDeclarationNode, nodeIdentifier);
            this.replaceVariableNames(scopeNode, nodeIdentifier);
            return variableDeclarationNode;
        }
    }, {
        key: "storeVariableNames",
        value: function storeVariableNames(variableDeclarationNode, nodeIdentifier) {
            var _this2 = this;

            variableDeclarationNode.declarations.forEach(function (declarationNode) {
                if (Node_1.Node.isObjectPatternNode(declarationNode.id)) {
                    return estraverse.VisitorOption.Skip;
                }
                NodeUtils_1.NodeUtils.typedTraverse(declarationNode.id, NodeType_1.NodeType.Identifier, {
                    enter: function enter(node) {
                        return _this2.identifierReplacer.storeNames(node.name, nodeIdentifier);
                    }
                });
            });
        }
    }, {
        key: "replaceVariableNames",
        value: function replaceVariableNames(scopeNode, nodeIdentifier) {
            var _this3 = this;

            var replaceableIdentifiersForCurrentScope = void 0;
            if (this.replaceableIdentifiers.has(scopeNode)) {
                replaceableIdentifiersForCurrentScope = this.replaceableIdentifiers.get(scopeNode);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = (0, _getIterator3.default)(replaceableIdentifiersForCurrentScope), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var replaceableIdentifier = _step.value;

                        replaceableIdentifier.name = this.identifierReplacer.replace(replaceableIdentifier.name, nodeIdentifier);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return;
            }
            replaceableIdentifiersForCurrentScope = [];
            estraverse.replace(scopeNode, {
                enter: function enter(node, parentNode) {
                    if (!node.obfuscated && Node_1.Node.isReplaceableIdentifierNode(node, parentNode)) {
                        var newNodeName = _this3.identifierReplacer.replace(node.name, nodeIdentifier);
                        if (node.name !== newNodeName) {
                            node.name = newNodeName;
                        } else {
                            replaceableIdentifiersForCurrentScope.push(node);
                        }
                    }
                }
            });
            this.replaceableIdentifiers.set(scopeNode, replaceableIdentifiersForCurrentScope);
        }
    }]);
    return VariableDeclarationTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
VariableDeclarationTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatorReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], VariableDeclarationTransformer);
exports.VariableDeclarationTransformer = VariableDeclarationTransformer;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var JSFuck_1 = __webpack_require__(36);
var AbstractReplacer_1 = __webpack_require__(30);
var BooleanLiteralReplacer = function (_AbstractReplacer_1$A) {
    (0, _inherits3.default)(BooleanLiteralReplacer, _AbstractReplacer_1$A);

    function BooleanLiteralReplacer(options) {
        (0, _classCallCheck3.default)(this, BooleanLiteralReplacer);
        return (0, _possibleConstructorReturn3.default)(this, (BooleanLiteralReplacer.__proto__ || (0, _getPrototypeOf2.default)(BooleanLiteralReplacer)).call(this, options));
    }

    (0, _createClass3.default)(BooleanLiteralReplacer, [{
        key: "replace",
        value: function replace(nodeValue) {
            return nodeValue ? JSFuck_1.JSFuck.True : JSFuck_1.JSFuck.False;
        }
    }]);
    return BooleanLiteralReplacer;
}(AbstractReplacer_1.AbstractReplacer);
BooleanLiteralReplacer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], BooleanLiteralReplacer);
exports.BooleanLiteralReplacer = BooleanLiteralReplacer;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var AbstractReplacer_1 = __webpack_require__(30);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var IdentifierReplacer = function (_AbstractReplacer_1$A) {
    (0, _inherits3.default)(IdentifierReplacer, _AbstractReplacer_1$A);

    function IdentifierReplacer(options) {
        (0, _classCallCheck3.default)(this, IdentifierReplacer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (IdentifierReplacer.__proto__ || (0, _getPrototypeOf2.default)(IdentifierReplacer)).call(this, options));

        _this.namesMap = new _map2.default();
        return _this;
    }

    (0, _createClass3.default)(IdentifierReplacer, [{
        key: "replace",
        value: function replace(nodeValue, nodeIdentifier) {
            var mapKey = nodeValue + "-" + String(nodeIdentifier);
            if (!this.namesMap.has(mapKey)) {
                return nodeValue;
            }
            return this.namesMap.get(mapKey);
        }
    }, {
        key: "storeNames",
        value: function storeNames(nodeName, nodeIdentifier) {
            if (!this.isReservedName(nodeName)) {
                this.namesMap.set(nodeName + "-" + String(nodeIdentifier), RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomVariableName(6));
            }
        }
    }, {
        key: "isReservedName",
        value: function isReservedName(name) {
            return this.options.reservedNames.some(function (reservedName) {
                return new RegExp(reservedName, 'g').test(name);
            });
        }
    }]);
    return IdentifierReplacer;
}(AbstractReplacer_1.AbstractReplacer);
IdentifierReplacer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], IdentifierReplacer);
exports.IdentifierReplacer = IdentifierReplacer;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var AbstractReplacer_1 = __webpack_require__(30);
var Utils_1 = __webpack_require__(14);
var NumberLiteralReplacer = function (_AbstractReplacer_1$A) {
    (0, _inherits3.default)(NumberLiteralReplacer, _AbstractReplacer_1$A);

    function NumberLiteralReplacer(options) {
        (0, _classCallCheck3.default)(this, NumberLiteralReplacer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (NumberLiteralReplacer.__proto__ || (0, _getPrototypeOf2.default)(NumberLiteralReplacer)).call(this, options));

        _this.numberLiteralCache = new _map2.default();
        return _this;
    }

    (0, _createClass3.default)(NumberLiteralReplacer, [{
        key: "replace",
        value: function replace(nodeValue) {
            if (this.numberLiteralCache.has(nodeValue)) {
                return this.numberLiteralCache.get(nodeValue);
            }
            var result = void 0;
            if (!Utils_1.Utils.isCeilNumber(nodeValue)) {
                result = String(nodeValue);
            } else {
                result = "" + Utils_1.Utils.hexadecimalPrefix + Utils_1.Utils.decToHex(nodeValue);
            }
            this.numberLiteralCache.set(nodeValue, result);
            return result;
        }
    }]);
    return NumberLiteralReplacer;
}(AbstractReplacer_1.AbstractReplacer);
NumberLiteralReplacer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], NumberLiteralReplacer);
exports.NumberLiteralReplacer = NumberLiteralReplacer;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var StringArrayEncoding_1 = __webpack_require__(32);
var AbstractReplacer_1 = __webpack_require__(30);
var CryptUtils_1 = __webpack_require__(34);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var Utils_1 = __webpack_require__(14);
var StringLiteralReplacer = StringLiteralReplacer_1 = function (_AbstractReplacer_1$A) {
    (0, _inherits3.default)(StringLiteralReplacer, _AbstractReplacer_1$A);

    function StringLiteralReplacer(customNodeGroupStorage, stringArrayStorage, options) {
        (0, _classCallCheck3.default)(this, StringLiteralReplacer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (StringLiteralReplacer.__proto__ || (0, _getPrototypeOf2.default)(StringLiteralReplacer)).call(this, options));

        _this.stringLiteralCache = new _map2.default();
        _this.stringLiteralHexadecimalIndexCache = new _map2.default();
        _this.customNodeGroupStorage = customNodeGroupStorage;
        _this.stringArrayStorage = stringArrayStorage;
        _this.rc4Keys = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomGenerator().n(function () {
            return RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomGenerator().string({ length: 4 });
        }, 50);
        return _this;
    }

    (0, _createClass3.default)(StringLiteralReplacer, [{
        key: "replace",
        value: function replace(nodeValue) {
            var usingStringArray = this.options.stringArray && nodeValue.length >= StringLiteralReplacer_1.minimumLengthForStringArray && RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomFloat(0, 1) <= this.options.stringArrayThreshold;
            var cacheKey = nodeValue + "-" + String(usingStringArray);
            if (this.stringLiteralCache.has(cacheKey) && this.options.stringArrayEncoding !== StringArrayEncoding_1.StringArrayEncoding.rc4) {
                return this.stringLiteralCache.get(cacheKey);
            }
            var result = void 0;
            if (usingStringArray) {
                result = this.replaceStringLiteralWithStringArrayCall(nodeValue);
            } else {
                result = "'" + Utils_1.Utils.stringToUnicodeEscapeSequence(nodeValue, !this.options.unicodeEscapeSequence) + "'";
            }
            this.stringLiteralCache.set(cacheKey, result);
            return result;
        }
    }, {
        key: "getArrayHexadecimalIndex",
        value: function getArrayHexadecimalIndex(value) {
            if (this.stringLiteralHexadecimalIndexCache.has(value)) {
                return this.stringLiteralHexadecimalIndexCache.get(value);
            }
            var indexOfValue = this.stringArrayStorage.getLength();
            var hexadecimalIndex = "" + Utils_1.Utils.hexadecimalPrefix + Utils_1.Utils.decToHex(indexOfValue);
            this.stringArrayStorage.set(null, value);
            this.stringLiteralHexadecimalIndexCache.set(value, hexadecimalIndex);
            return hexadecimalIndex;
        }
    }, {
        key: "getEncodedValue",
        value: function getEncodedValue(value) {
            var encodedValue = void 0,
                key = void 0;
            switch (this.options.stringArrayEncoding) {
                case StringArrayEncoding_1.StringArrayEncoding.rc4:
                    key = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomGenerator().pickone(this.rc4Keys);
                    encodedValue = CryptUtils_1.CryptUtils.btoa(CryptUtils_1.CryptUtils.rc4(value, key));
                    break;
                case StringArrayEncoding_1.StringArrayEncoding.base64:
                    encodedValue = CryptUtils_1.CryptUtils.btoa(value);
                    break;
                default:
                    encodedValue = value;
            }
            encodedValue = Utils_1.Utils.stringToUnicodeEscapeSequence(encodedValue, !this.options.unicodeEscapeSequence);
            return { encodedValue: encodedValue, key: key };
        }
    }, {
        key: "replaceStringLiteralWithStringArrayCall",
        value: function replaceStringLiteralWithStringArrayCall(value) {
            var _getEncodedValue = this.getEncodedValue(value),
                encodedValue = _getEncodedValue.encodedValue,
                key = _getEncodedValue.key;

            var hexadecimalIndex = this.getArrayHexadecimalIndex(encodedValue);
            var rotatedStringArrayStorageId = Utils_1.Utils.stringRotate(this.stringArrayStorage.getStorageId(), 1);
            var stringArrayStorageCallsWrapperName = "_" + Utils_1.Utils.hexadecimalPrefix + rotatedStringArrayStorageId;
            if (key) {
                return stringArrayStorageCallsWrapperName + "('" + hexadecimalIndex + "', '" + Utils_1.Utils.stringToUnicodeEscapeSequence(key, !this.options.unicodeEscapeSequence) + "')";
            }
            return stringArrayStorageCallsWrapperName + "('" + hexadecimalIndex + "')";
        }
    }]);
    return StringLiteralReplacer;
}(AbstractReplacer_1.AbstractReplacer);
StringLiteralReplacer.minimumLengthForStringArray = 3;
StringLiteralReplacer = StringLiteralReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TCustomNodeGroupStorage)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TStringArrayStorage)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object, Object])], StringLiteralReplacer);
exports.StringLiteralReplacer = StringLiteralReplacer;
var StringLiteralReplacer_1;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _assign = __webpack_require__(135);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var class_validator_1 = __webpack_require__(143);
var Default_1 = __webpack_require__(43);
var OptionsNormalizer_1 = __webpack_require__(108);
var ValidationErrorsFormatter_1 = __webpack_require__(109);
var Options = Options_1 = function Options(inputOptions) {
    (0, _classCallCheck3.default)(this, Options);

    (0, _assign2.default)(this, Default_1.DEFAULT_PRESET, inputOptions);
    var errors = class_validator_1.validateSync(this, Options_1.validatorOptions);
    if (errors.length) {
        throw new ReferenceError("Validation failed. errors:\n" + ValidationErrorsFormatter_1.ValidationErrorsFormatter.format(errors));
    }
    (0, _assign2.default)(this, OptionsNormalizer_1.OptionsNormalizer.normalizeOptions(this));
};
Options.validatorOptions = {
    validationError: {
        target: false
    }
};
tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "compact", void 0);
tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "controlFlowFlattening", void 0);
tslib_1.__decorate([class_validator_1.IsNumber(), class_validator_1.Min(0), class_validator_1.Max(1), tslib_1.__metadata("design:type", Number)], Options.prototype, "controlFlowFlatteningThreshold", void 0);
tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "debugProtection", void 0);
tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "debugProtectionInterval", void 0);
tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "disableConsoleOutput", void 0);
tslib_1.__decorate([class_validator_1.IsArray(), class_validator_1.ArrayUnique(), class_validator_1.IsString({
    each: true
}), tslib_1.__metadata("design:type", Array)], Options.prototype, "domainLock", void 0);
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
    require_valid_protocol: true
}), tslib_1.__metadata("design:type", String)], Options.prototype, "sourceMapBaseUrl", void 0);
tslib_1.__decorate([class_validator_1.IsString(), tslib_1.__metadata("design:type", String)], Options.prototype, "sourceMapFileName", void 0);
tslib_1.__decorate([class_validator_1.IsIn(['inline', 'separate']), tslib_1.__metadata("design:type", String)], Options.prototype, "sourceMapMode", void 0);
tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "stringArray", void 0);
tslib_1.__decorate([class_validator_1.IsIn([true, false, 'base64', 'rc4']), tslib_1.__metadata("design:type", Object)], Options.prototype, "stringArrayEncoding", void 0);
tslib_1.__decorate([class_validator_1.IsNumber(), class_validator_1.Min(0), class_validator_1.Max(1), tslib_1.__metadata("design:type", Number)], Options.prototype, "stringArrayThreshold", void 0);
tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "unicodeEscapeSequence", void 0);
Options = Options_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__metadata("design:paramtypes", [Object])], Options);
exports.Options = Options;
var Options_1;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var Utils_1 = __webpack_require__(14);

var OptionsNormalizer = function () {
    function OptionsNormalizer() {
        (0, _classCallCheck3.default)(this, OptionsNormalizer);
    }

    (0, _createClass3.default)(OptionsNormalizer, null, [{
        key: "normalizeOptions",
        value: function normalizeOptions(options) {
            var normalizedOptions = tslib_1.__assign({}, options);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(OptionsNormalizer.normalizerRules), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var normalizerRule = _step.value;

                    normalizedOptions = normalizerRule(normalizedOptions);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
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
    }, {
        key: "controlFlowFlatteningThresholdRule",
        value: function controlFlowFlatteningThresholdRule(options) {
            if (options.controlFlowFlatteningThreshold === 0) {
                options = tslib_1.__assign({}, options, OptionsNormalizer.DISABLED_CONTROL_FLOW_FLATTENING_OPTIONS);
            }
            return options;
        }
    }, {
        key: "domainLockRule",
        value: function domainLockRule(options) {
            if (options.domainLock.length) {
                var normalizedDomains = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = (0, _getIterator3.default)(options.domainLock), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var domain = _step2.value;

                        normalizedDomains.push(Utils_1.Utils.extractDomainFromUrl(domain));
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                options = tslib_1.__assign({}, options, { domainLock: normalizedDomains });
            }
            return options;
        }
    }, {
        key: "selfDefendingRule",
        value: function selfDefendingRule(options) {
            if (options.selfDefending) {
                options = tslib_1.__assign({}, options, OptionsNormalizer.SELF_DEFENDING_OPTIONS);
            }
            return options;
        }
    }, {
        key: "sourceMapBaseUrlRule",
        value: function sourceMapBaseUrlRule(options) {
            var _options = options,
                sourceMapBaseUrl = _options.sourceMapBaseUrl;

            if (!options.sourceMapFileName) {
                options = tslib_1.__assign({}, options, { sourceMapBaseUrl: '' });
                return options;
            }
            if (sourceMapBaseUrl && !sourceMapBaseUrl.endsWith('/')) {
                options = tslib_1.__assign({}, options, { sourceMapBaseUrl: sourceMapBaseUrl + "/" });
            }
            return options;
        }
    }, {
        key: "sourceMapFileNameRule",
        value: function sourceMapFileNameRule(options) {
            var _options2 = options,
                sourceMapFileName = _options2.sourceMapFileName;

            if (sourceMapFileName) {
                sourceMapFileName = sourceMapFileName.replace(/^\/+/, '').split('.')[0];
                options = tslib_1.__assign({}, options, { sourceMapFileName: sourceMapFileName + ".js.map" });
            }
            return options;
        }
    }, {
        key: "stringArrayRule",
        value: function stringArrayRule(options) {
            if (!options.stringArray) {
                options = tslib_1.__assign({}, options, OptionsNormalizer.DISABLED_STRING_ARRAY_OPTIONS);
            }
            return options;
        }
    }, {
        key: "stringArrayEncodingRule",
        value: function stringArrayEncodingRule(options) {
            if (options.stringArrayEncoding === true) {
                options = tslib_1.__assign({}, options, OptionsNormalizer.STRING_ARRAY_ENCODING_OPTIONS);
            }
            return options;
        }
    }, {
        key: "stringArrayThresholdRule",
        value: function stringArrayThresholdRule(options) {
            if (options.stringArrayThreshold === 0) {
                options = tslib_1.__assign({}, options, OptionsNormalizer.DISABLED_STRING_ARRAY_OPTIONS);
            }
            return options;
        }
    }]);
    return OptionsNormalizer;
}();

OptionsNormalizer.DISABLED_CONTROL_FLOW_FLATTENING_OPTIONS = {
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0
};
OptionsNormalizer.DISABLED_STRING_ARRAY_OPTIONS = {
    rotateStringArray: false,
    stringArray: false,
    stringArrayEncoding: false,
    stringArrayThreshold: 0
};
OptionsNormalizer.SELF_DEFENDING_OPTIONS = {
    compact: true,
    selfDefending: true
};
OptionsNormalizer.STRING_ARRAY_ENCODING_OPTIONS = {
    stringArrayEncoding: 'base64'
};
OptionsNormalizer.normalizerRules = [OptionsNormalizer.controlFlowFlatteningThresholdRule, OptionsNormalizer.domainLockRule, OptionsNormalizer.selfDefendingRule, OptionsNormalizer.sourceMapBaseUrlRule, OptionsNormalizer.sourceMapFileNameRule, OptionsNormalizer.stringArrayRule, OptionsNormalizer.stringArrayEncodingRule, OptionsNormalizer.stringArrayThresholdRule];
exports.OptionsNormalizer = OptionsNormalizer;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationErrorsFormatter = function () {
    function ValidationErrorsFormatter() {
        (0, _classCallCheck3.default)(this, ValidationErrorsFormatter);
    }

    (0, _createClass3.default)(ValidationErrorsFormatter, null, [{
        key: "format",
        value: function format(validationErrors) {
            var errorsArray = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(validationErrors), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var error = _step.value;

                    errorsArray.push(ValidationErrorsFormatter.formatError(error));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return errorsArray.join('\n');
        }
    }, {
        key: "formatError",
        value: function formatError(validationError) {
            var constraints = validationError.constraints;
            var errorString = "`" + validationError.property + "` errors:\n";
            for (var constraint in constraints) {
                if (!constraints.hasOwnProperty(constraint)) {
                    continue;
                }
                errorString += "    - " + constraints[constraint] + "\n";
            }
            return errorString;
        }
    }]);
    return ValidationErrorsFormatter;
}();

exports.ValidationErrorsFormatter = ValidationErrorsFormatter;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var estraverse = __webpack_require__(17);
var CalleeDataExtractors_1 = __webpack_require__(37);
var Node_1 = __webpack_require__(12);
var NodeUtils_1 = __webpack_require__(8);
var StackTraceAnalyzer = StackTraceAnalyzer_1 = function () {
    function StackTraceAnalyzer(calleeDataExtractorsFactory) {
        (0, _classCallCheck3.default)(this, StackTraceAnalyzer);

        this.calleeDataExtractorsFactory = calleeDataExtractorsFactory;
    }

    (0, _createClass3.default)(StackTraceAnalyzer, [{
        key: "analyze",
        value: function analyze(blockScopeBody) {
            return this.analyzeRecursive(blockScopeBody);
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
                        if (!Node_1.Node.isCallExpressionNode(node)) {
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
                var calleeData = _this2.calleeDataExtractorsFactory(calleeDataExtractorName).extract(blockScopeBody, callExpressionNode.callee);
                if (!calleeData) {
                    return;
                }
                stackTraceData.push(tslib_1.__assign({}, calleeData, { stackTrace: _this2.analyzeRecursive(calleeData.callee.body) }));
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
StackTraceAnalyzer.calleeDataExtractorsList = [CalleeDataExtractors_1.CalleeDataExtractors.FunctionDeclarationCalleeDataExtractor, CalleeDataExtractors_1.CalleeDataExtractors.FunctionExpressionCalleeDataExtractor, CalleeDataExtractors_1.CalleeDataExtractors.ObjectExpressionCalleeDataExtractor];
StackTraceAnalyzer.limitThresholdActivationLength = 25;
StackTraceAnalyzer.limitThreshold = 0.002;
StackTraceAnalyzer = StackTraceAnalyzer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICalleeDataExtractor)), tslib_1.__metadata("design:paramtypes", [Function])], StackTraceAnalyzer);
exports.StackTraceAnalyzer = StackTraceAnalyzer;
var StackTraceAnalyzer_1;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var estraverse = __webpack_require__(17);
var AbstractCalleeDataExtractor_1 = __webpack_require__(33);
var Node_1 = __webpack_require__(12);
var NodeUtils_1 = __webpack_require__(8);
var FunctionDeclarationCalleeDataExtractor = function (_AbstractCalleeDataEx) {
    (0, _inherits3.default)(FunctionDeclarationCalleeDataExtractor, _AbstractCalleeDataEx);

    function FunctionDeclarationCalleeDataExtractor() {
        (0, _classCallCheck3.default)(this, FunctionDeclarationCalleeDataExtractor);
        return (0, _possibleConstructorReturn3.default)(this, (FunctionDeclarationCalleeDataExtractor.__proto__ || (0, _getPrototypeOf2.default)(FunctionDeclarationCalleeDataExtractor)).apply(this, arguments));
    }

    (0, _createClass3.default)(FunctionDeclarationCalleeDataExtractor, [{
        key: "extract",
        value: function extract(blockScopeBody, callee) {
            var calleeBlockStatement = null;
            if (Node_1.Node.isIdentifierNode(callee)) {
                calleeBlockStatement = this.getCalleeBlockStatement(NodeUtils_1.NodeUtils.getBlockScopesOfNode(blockScopeBody[0])[0], callee.name);
            }
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
                    if (Node_1.Node.isFunctionDeclarationNode(node) && node.id.name === name) {
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
FunctionDeclarationCalleeDataExtractor = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__metadata("design:paramtypes", [])], FunctionDeclarationCalleeDataExtractor);
exports.FunctionDeclarationCalleeDataExtractor = FunctionDeclarationCalleeDataExtractor;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var estraverse = __webpack_require__(17);
var AbstractCalleeDataExtractor_1 = __webpack_require__(33);
var Node_1 = __webpack_require__(12);
var NodeUtils_1 = __webpack_require__(8);
var FunctionExpressionCalleeDataExtractor = function (_AbstractCalleeDataEx) {
    (0, _inherits3.default)(FunctionExpressionCalleeDataExtractor, _AbstractCalleeDataEx);

    function FunctionExpressionCalleeDataExtractor() {
        (0, _classCallCheck3.default)(this, FunctionExpressionCalleeDataExtractor);
        return (0, _possibleConstructorReturn3.default)(this, (FunctionExpressionCalleeDataExtractor.__proto__ || (0, _getPrototypeOf2.default)(FunctionExpressionCalleeDataExtractor)).apply(this, arguments));
    }

    (0, _createClass3.default)(FunctionExpressionCalleeDataExtractor, [{
        key: "extract",
        value: function extract(blockScopeBody, callee) {
            var calleeBlockStatement = null;
            if (Node_1.Node.isIdentifierNode(callee)) {
                calleeBlockStatement = this.getCalleeBlockStatement(NodeUtils_1.NodeUtils.getBlockScopesOfNode(blockScopeBody[0])[0], callee.name);
            }
            if (Node_1.Node.isFunctionExpressionNode(callee)) {
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
                    if (Node_1.Node.isFunctionExpressionNode(node) && Node_1.Node.isVariableDeclaratorNode(parentNode) && Node_1.Node.isIdentifierNode(parentNode.id) && parentNode.id.name === name) {
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
FunctionExpressionCalleeDataExtractor = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__metadata("design:paramtypes", [])], FunctionExpressionCalleeDataExtractor);
exports.FunctionExpressionCalleeDataExtractor = FunctionExpressionCalleeDataExtractor;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getIterator2 = __webpack_require__(21);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var estraverse = __webpack_require__(17);
var Node_1 = __webpack_require__(12);
var NodeUtils_1 = __webpack_require__(8);
var AbstractCalleeDataExtractor_1 = __webpack_require__(33);
var ObjectExpressionCalleeDataExtractor = function (_AbstractCalleeDataEx) {
    (0, _inherits3.default)(ObjectExpressionCalleeDataExtractor, _AbstractCalleeDataEx);

    function ObjectExpressionCalleeDataExtractor() {
        (0, _classCallCheck3.default)(this, ObjectExpressionCalleeDataExtractor);
        return (0, _possibleConstructorReturn3.default)(this, (ObjectExpressionCalleeDataExtractor.__proto__ || (0, _getPrototypeOf2.default)(ObjectExpressionCalleeDataExtractor)).apply(this, arguments));
    }

    (0, _createClass3.default)(ObjectExpressionCalleeDataExtractor, [{
        key: "extract",
        value: function extract(blockScopeBody, callee) {
            var calleeBlockStatement = null,
                functionExpressionName = null;
            if (Node_1.Node.isMemberExpressionNode(callee)) {
                var objectMembersCallsChain = this.createObjectMembersCallsChain([], callee);
                if (!objectMembersCallsChain.length) {
                    return null;
                }
                functionExpressionName = objectMembersCallsChain[objectMembersCallsChain.length - 1];
                calleeBlockStatement = this.getCalleeBlockStatement(NodeUtils_1.NodeUtils.getBlockScopesOfNode(blockScopeBody[0])[0], objectMembersCallsChain);
            }
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
            if (Node_1.Node.isIdentifierNode(memberExpression.property) && memberExpression.computed === false) {
                currentChain.unshift(memberExpression.property.name);
            } else if (Node_1.Node.isLiteralNode(memberExpression.property) && (typeof memberExpression.property.value === 'string' || typeof memberExpression.property.value === 'number')) {
                currentChain.unshift(memberExpression.property.value);
            } else {
                return currentChain;
            }
            if (Node_1.Node.isMemberExpressionNode(memberExpression.object)) {
                return this.createObjectMembersCallsChain(currentChain, memberExpression.object);
            } else if (Node_1.Node.isIdentifierNode(memberExpression.object)) {
                currentChain.unshift(memberExpression.object.name);
            }
            return currentChain;
        }
    }, {
        key: "getCalleeBlockStatement",
        value: function getCalleeBlockStatement(targetNode, objectMembersCallsChain) {
            var _this2 = this;

            var objectName = objectMembersCallsChain.shift();
            if (!objectName) {
                return null;
            }
            var calleeBlockStatement = null;
            estraverse.traverse(targetNode, {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isVariableDeclaratorNode(node) && Node_1.Node.isIdentifierNode(node.id) && node.init && Node_1.Node.isObjectExpressionNode(node.init) && node.id.name === objectName) {
                        calleeBlockStatement = _this2.findCalleeBlockStatement(node.init.properties, objectMembersCallsChain);
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
                for (var _iterator = (0, _getIterator3.default)(objectExpressionProperties), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var propertyNode = _step.value;

                    var isTargetPropertyNodeWithIdentifierKey = Node_1.Node.isIdentifierNode(propertyNode.key) && propertyNode.key.name === nextItemInCallsChain;
                    var isTargetPropertyNodeWithLiteralKey = Node_1.Node.isLiteralNode(propertyNode.key) && Boolean(propertyNode.key.value) && propertyNode.key.value === nextItemInCallsChain;
                    if (!isTargetPropertyNodeWithIdentifierKey && !isTargetPropertyNodeWithLiteralKey) {
                        continue;
                    }
                    if (Node_1.Node.isObjectExpressionNode(propertyNode.value)) {
                        return this.findCalleeBlockStatement(propertyNode.value.properties, objectMembersCallsChain);
                    }
                    if (Node_1.Node.isFunctionExpressionNode(propertyNode.value)) {
                        return propertyNode.value.body;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
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
    }]);
    return ObjectExpressionCalleeDataExtractor;
}(AbstractCalleeDataExtractor_1.AbstractCalleeDataExtractor);
ObjectExpressionCalleeDataExtractor = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__metadata("design:paramtypes", [])], ObjectExpressionCalleeDataExtractor);
exports.ObjectExpressionCalleeDataExtractor = ObjectExpressionCalleeDataExtractor;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toConsumableArray2 = __webpack_require__(24);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var Initializable_1 = __webpack_require__(10);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var ArrayStorage = function () {
    function ArrayStorage() {
        (0, _classCallCheck3.default)(this, ArrayStorage);
    }

    (0, _createClass3.default)(ArrayStorage, [{
        key: "get",
        value: function get(key) {
            var value = this.storage[key];
            if (!value) {
                throw new Error("No value found in array storage with key `" + key + "`");
            }
            return value;
        }
    }, {
        key: "getKeyOf",
        value: function getKeyOf(value) {
            return this.storage.indexOf(value);
        }
    }, {
        key: "getLength",
        value: function getLength() {
            return this.storage.length;
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
        key: "initialize",
        value: function initialize() {
            this.storage = [];
            this.storageId = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomString(6);
        }
    }, {
        key: "mergeWith",
        value: function mergeWith(storage) {
            var mergeId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            this.storage = [].concat((0, _toConsumableArray3.default)(this.storage), (0, _toConsumableArray3.default)(storage.getStorage()));
            if (mergeId) {
                this.storageId = storage.getStorageId();
            }
        }
    }, {
        key: "set",
        value: function set(key, value) {
            this.storage.push(value);
        }
    }]);
    return ArrayStorage;
}();
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], ArrayStorage.prototype, "storageId", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Array)], ArrayStorage.prototype, "storage", void 0);
ArrayStorage = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__metadata("design:paramtypes", [])], ArrayStorage);
exports.ArrayStorage = ArrayStorage;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MapStorage_1 = __webpack_require__(44);

var ControlFlowStorage = function (_MapStorage_1$MapStor) {
    (0, _inherits3.default)(ControlFlowStorage, _MapStorage_1$MapStor);

    function ControlFlowStorage() {
        (0, _classCallCheck3.default)(this, ControlFlowStorage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ControlFlowStorage.__proto__ || (0, _getPrototypeOf2.default)(ControlFlowStorage)).call(this));

        _this.initialize();
        return _this;
    }

    return ControlFlowStorage;
}(MapStorage_1.MapStorage);

exports.ControlFlowStorage = ControlFlowStorage;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _map = __webpack_require__(11);

var _map2 = _interopRequireDefault(_map);

var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ServiceIdentifiers_1 = __webpack_require__(4);
var CustomNodeGroups_1 = __webpack_require__(38);
var MapStorage_1 = __webpack_require__(44);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var CustomNodeGroupStorage = CustomNodeGroupStorage_1 = function (_MapStorage_1$MapStor) {
    (0, _inherits3.default)(CustomNodeGroupStorage, _MapStorage_1$MapStor);

    function CustomNodeGroupStorage(customNodeGroupFactory, options) {
        (0, _classCallCheck3.default)(this, CustomNodeGroupStorage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CustomNodeGroupStorage.__proto__ || (0, _getPrototypeOf2.default)(CustomNodeGroupStorage)).call(this));

        _this.customNodeGroupFactory = customNodeGroupFactory;
        _this.options = options;
        _this.initialize();
        return _this;
    }

    (0, _createClass3.default)(CustomNodeGroupStorage, [{
        key: "initialize",
        value: function initialize() {
            var _this2 = this;

            this.storage = new _map2.default();
            this.storageId = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomString(6);
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
CustomNodeGroupStorage.customNodeGroupsList = [CustomNodeGroups_1.CustomNodeGroups.ConsoleOutputCustomNodeGroup, CustomNodeGroups_1.CustomNodeGroups.DebugProtectionCustomNodeGroup, CustomNodeGroups_1.CustomNodeGroups.DomainLockCustomNodeGroup, CustomNodeGroups_1.CustomNodeGroups.SelfDefendingCustomNodeGroup, CustomNodeGroups_1.CustomNodeGroups.StringArrayCustomNodeGroup];
CustomNodeGroupStorage = CustomNodeGroupStorage_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNodeGroup)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object])], CustomNodeGroupStorage);
exports.CustomNodeGroupStorage = CustomNodeGroupStorage;
var CustomNodeGroupStorage_1;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _getPrototypeOf = __webpack_require__(5);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(48);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(6);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tslib_1 = __webpack_require__(3);
var inversify_1 = __webpack_require__(2);
var ArrayStorage_1 = __webpack_require__(114);
var RandomGeneratorUtils_1 = __webpack_require__(9);
var Utils_1 = __webpack_require__(14);
var StringArrayStorage = function (_ArrayStorage_1$Array) {
    (0, _inherits3.default)(StringArrayStorage, _ArrayStorage_1$Array);

    function StringArrayStorage() {
        (0, _classCallCheck3.default)(this, StringArrayStorage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (StringArrayStorage.__proto__ || (0, _getPrototypeOf2.default)(StringArrayStorage)).call(this));

        _this.initialize();
        return _this;
    }

    (0, _createClass3.default)(StringArrayStorage, [{
        key: "initialize",
        value: function initialize() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            (0, _get3.default)(StringArrayStorage.prototype.__proto__ || (0, _getPrototypeOf2.default)(StringArrayStorage.prototype), "initialize", this).call(this, args);
            this.storageId = RandomGeneratorUtils_1.RandomGeneratorUtils.getRandomString(4, RandomGeneratorUtils_1.RandomGeneratorUtils.randomGeneratorPoolHexadecimal);
        }
    }, {
        key: "rotateArray",
        value: function rotateArray(rotationValue) {
            this.storage = Utils_1.Utils.arrayRotate(this.storage, rotationValue);
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.storage.map(function (value) {
                return "'" + value + "'";
            }).toString();
        }
    }]);
    return StringArrayStorage;
}(ArrayStorage_1.ArrayStorage);
StringArrayStorage = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__metadata("design:paramtypes", [])], StringArrayStorage);
exports.StringArrayStorage = StringArrayStorage;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function AtobTemplate() {
    return "\n        (function () {\n            var getGlobal = Function('return (function () ' + '{}.constructor(\"return this\")()' + ');');\n\n            var object = getGlobal();\n            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n\n            object.atob || (\n                object.atob = function(input) {\n                    var str = String(input).replace(/=+$/, '');\n                    for (\n                        var bc = 0, bs, buffer, idx = 0, output = '';\n                        buffer = str.charAt(idx++);\n                        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,\n                            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0\n                    ) {\n                        buffer = chars.indexOf(buffer);\n                    }\n                return output;\n            });\n        })();\n    ";
}
exports.AtobTemplate = AtobTemplate;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Rc4Template() {
    return "\n        var rc4 = function (str, key) {\n            var s = [], j = 0, x, res = '', newStr = '';\n           \n            str = atob(str);\n                \n            for (var k = 0, length = str.length; k < length; k++) {\n                newStr += '%' + ('00' + str.charCodeAt(k).toString(16)).slice(-2);\n            }\n        \n            str = decodeURIComponent(newStr);\n                    \t        \n\t        for (var i = 0; i < 256; i++) {\n                s[i] = i;\n            }\n \n            for (i = 0; i < 256; i++) {\n                j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;\n                x = s[i];\n                s[i] = s[j];\n                s[j] = x;\n            }\n            \n            i = 0;\n            j = 0;\n            \n            for (var y = 0; y < str.length; y++) {\n                i = (i + 1) % 256;\n                j = (j + s[i]) % 256;\n                x = s[i];\n                s[i] = s[j];\n                s[j] = x;\n                res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);\n            }\n                      \n            return res;\n        }\n    ";
}
exports.Rc4Template = Rc4Template;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function SingleNodeCallControllerTemplate() {
    return "\n        var {singleNodeCallControllerFunctionName} = (function(){\n            var firstCall = true;\n            \n            return function (context, fn){\t\n                var rfn = firstCall ? function(){\n                    if(fn){\n                        var res = fn.apply(context, arguments);\n                        fn = null;\n                        return res;\n                    }\n                } : function(){}\n                \n                firstCall = false;\n                \n                return rfn;\n            }\n        })();\n    ";
}
exports.SingleNodeCallControllerTemplate = SingleNodeCallControllerTemplate;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ConsoleOutputDisableExpressionTemplate() {
    return "\n        var {consoleLogDisableFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {\n            var getGlobal = Function('return (function() ' + '{}.constructor(\"return this\")( )' + ');');\n            \n            var func = function () {};\n            var that = getGlobal();\n                        \n            if (!that.console) {\n                that.console = (function (func){ \n                    var c = {}; \n                    \n                    c.log = func;\n                    c.warn = func; \n                    c.debug = func;\n                    c.info = func;\n                    c.error = func;\n                    c.exception = func;\n                    c.trace = func;\n                    \n                    return c; \n                })(func);\n            } else {\n                that.console.log = func;\n                that.console.warn = func; \n                that.console.debug = func;\n                that.console.info = func;\n                that.console.error = func;\n                that.console.exception = func;\n                that.console.trace = func;\n            }\n        });\n        \n        {consoleLogDisableFunctionName}();\n    ";
}
exports.ConsoleOutputDisableExpressionTemplate = ConsoleOutputDisableExpressionTemplate;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function DebugProtectionFunctionCallTemplate() {
    return "{debugProtectionFunctionName}();";
}
exports.DebugProtectionFunctionCallTemplate = DebugProtectionFunctionCallTemplate;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function DebugProtectionFunctionIntervalTemplate() {
    return "\n        setInterval(function () {\n            {debugProtectionFunctionName}();\n        }, 4000);\n    ";
}
exports.DebugProtectionFunctionIntervalTemplate = DebugProtectionFunctionIntervalTemplate;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function DebugProtectionFunctionTemplate() {
    return "\n        var {debugProtectionFunctionName} = function () {\n            function debuggerProtection (counter) {\n                if (('' + counter / counter)['length'] !== 1 || counter % 20 === 0) {\n                    (function () {}.constructor('debugger')());\n                } else {\n                    (function () {}.constructor('debugger')());\n                }\n                \n                debuggerProtection(++counter);\n            }\n            \n            try {\n                debuggerProtection(0);\n            } catch (y) {}\n        };\n    ";
}
exports.DebugProtectionFunctionTemplate = DebugProtectionFunctionTemplate;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function DomainLockNodeTemplate() {
    return "\n        var {domainLockFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {\n            var getGlobal = Function('return (function () ' + '{}.constructor(\"return this\")()' + ');');\n\n            var func = function () { \n                return {\n                    key: 'item',\n                    value: 'attribute',\n                    getAttribute: function () {\n                        getGlobal()['eval']('while(true){}')();\n                    }()\n                };\n            };\n                        \n            var regExp = new RegExp(\"[{diff}]\", \"g\");\n            var domains = \"{domains}\".replace(regExp, \"\").split(\";\");\n            var eval = [][\"forEach\"][\"constructor\"];\n            var windowObject = eval(\"return this\")();\n            var document;\n            var domain;\n                        \n            for (var d in windowObject) {\n                if (d.length == 8 && d.charCodeAt(7) == 116 && d.charCodeAt(5) == 101 && d.charCodeAt(3) == 117 && d.charCodeAt(0) == 100) {\n                    document = d;\n                \n                    break;\n                }\n            }\n\n            for (var d1 in windowObject[document]) {\n                if (d1.length == 6 && d1.charCodeAt(5) == 110 && d1.charCodeAt(0) == 100) {\n                    domain = d1;\n                    \n                    break;\n                }\n            }\n            \n            if ((!document && !domain) || (!windowObject[document] && !windowObject[document][domain])) {\n                return;\n            }\n            \n            var currentDomain = windowObject[document][domain];\n\n            var ok = false;\n                        \n            for (var i = 0; i < domains.length; i++) {\n                var domain = domains[i];\n                var position = currentDomain.length - domain.length;\n                var lastIndex = currentDomain.indexOf(domain, position);\n                var endsWith = lastIndex !== -1 && lastIndex === position;\n                \n                if (endsWith) {\n                    if (currentDomain.length == domain.length || domain.indexOf(\".\") === 0) {\n                        ok = true;\n                    }\n                    \n                    break;\n                }\n            }\n               \n            if (!ok) {\n                data;\n            } else {\n                return;\n            }\n            \n            func();\n        });\n\n        {domainLockFunctionName}();\n    ";
}
exports.DomainLockNodeTemplate = DomainLockNodeTemplate;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Utils_1 = __webpack_require__(14);
function SelfDefendingTemplate() {
    return "\n        var {selfDefendingFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {\n            var func1 = function(){return 'dev';},\n                func2 = function () {\n                    return 'window';\n                };\n                \n            var test1 = function () {\n                var regExp = new RegExp('" + Utils_1.Utils.stringToUnicodeEscapeSequence("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}") + "');\n                \n                return !regExp.test(func1.toString());\n            };\n            \n            var test2 = function () {\n                var regExp = new RegExp('" + Utils_1.Utils.stringToUnicodeEscapeSequence("(\\\\[x|u](\\w){2,4})+") + "');\n                \n                return regExp.test(func2.toString());\n            };\n            \n            var recursiveFunc1 = function (string) {\n                var i = ~-1 >> 1 + 255 % 0;\n                                \n                if (string.indexOf('i' === i)) {\n                    recursiveFunc2(string)\n                }\n            };\n            \n            var recursiveFunc2 = function (string) {\n                var i = ~-4 >> 1 + 255 % 0;\n                \n                if (string.indexOf((true+\"\")[3]) !== i) {\n                    recursiveFunc1(string)\n                }\n            };\n            \n            if (!test1()) {\n                if (!test2()) {\n                    recursiveFunc1('ind\u0435xOf');\n                } else {\n                    recursiveFunc1('indexOf');\n                }\n            } else {\n                recursiveFunc1('ind\u0435xOf');\n            }\n        })\n        \n        {selfDefendingFunctionName}();\n    ";
}
exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Utils_1 = __webpack_require__(14);
function SelfDefendingTemplate() {
    return "\n        var StatesClass = function (rc4Bytes) {\n            this.rc4Bytes = rc4Bytes;\n            this.states = [1, 0, 0];\n            this.newState = function(){return 'newState';};\n            this.firstState = '" + Utils_1.Utils.stringToUnicodeEscapeSequence("\\w+ *\\(\\) *{\\w+ *") + "';\n            this.secondState = '" + Utils_1.Utils.stringToUnicodeEscapeSequence("['|\"].+['|\"];? *}") + "';\n        };\n        \n        StatesClass.prototype.checkState = function () {\n            var regExp = new RegExp(this.firstState + this.secondState);\n\n            return this.runState(regExp.test(this.newState.toString()) ? --this.states[1] : --this.states[0]);\n        };\n        \n        StatesClass.prototype.runState = function (stateResult) {\n            if (!Boolean(~stateResult)) {\n                return stateResult;\n            }\n            \n            return this.getState(this.rc4Bytes);\n        };\n\n        StatesClass.prototype.getState = function (rc4Bytes) {\n            for (var i = 0, len = this.states.length; i < len; i++) {\n                this.states.push(Math.round(Math.random()));\n                len = this.states.length;\n            }\n            \n            return rc4Bytes(this.states[0]);\n        };\n\n        new StatesClass({stringArrayCallsWrapperName}).checkState();\n    ";
}
exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function StringArrayBase64DecodeNodeTemplate() {
    return "      \n        if ({stringArrayCallsWrapperName}.initialized === undefined) {\n            {atobPolyfill}\n            \n            {stringArrayCallsWrapperName}.base64DecodeUnicode = function (str) {\n                var string = atob(str);\n                var newStringChars = [];\n                \n                for (var i = 0, length = string.length; i < length; i++) {\n                    newStringChars += '%' + ('00' + string.charCodeAt(i).toString(16)).slice(-2);\n                }\n                \n                return decodeURIComponent(newStringChars);\n            };\n            \n            {stringArrayCallsWrapperName}.data = {};\n            \n            {stringArrayCallsWrapperName}.initialized = true;\n        }\n                        \n        if ({stringArrayCallsWrapperName}.data[index] === undefined) {\n            {selfDefendingCode}\n            \n            value = {stringArrayCallsWrapperName}.base64DecodeUnicode(value);\n            {stringArrayCallsWrapperName}.data[index] = value;\n        } else {\n            value = {stringArrayCallsWrapperName}.data[index];\n        }  \n    ";
}
exports.StringArrayBase64DecodeNodeTemplate = StringArrayBase64DecodeNodeTemplate;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function StringArrayCallsWrapperTemplate() {
    return "\n        var {stringArrayCallsWrapperName} = function (index, key) {\n            index = index - 0;\n            \n            var value = {stringArrayName}[index];\n            \n            {decodeNodeTemplate}\n        \n            return value;\n        };\n    ";
}
exports.StringArrayCallsWrapperTemplate = StringArrayCallsWrapperTemplate;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function StringArrayRc4DecodeNodeTemplate() {
    return "\n        if ({stringArrayCallsWrapperName}.initialized === undefined) {\n            {atobPolyfill}\n            \n            {rc4Polyfill}\n            {stringArrayCallsWrapperName}.rc4 = rc4;\n            \n            {stringArrayCallsWrapperName}.data = {};\n            \n            {stringArrayCallsWrapperName}.initialized = true;\n        }\n        \n        index += key;\n\n        if ({stringArrayCallsWrapperName}.data[index] === undefined) {\n            if ({stringArrayCallsWrapperName}.once === undefined) {\n                {selfDefendingCode}\n                \n                {stringArrayCallsWrapperName}.once = true;\n            }\n            \n            value = {stringArrayCallsWrapperName}.rc4(value, key);\n            {stringArrayCallsWrapperName}.data[index] = value;\n        } else {\n            value = {stringArrayCallsWrapperName}.data[index];\n        }\n    ";
}
exports.StringArrayRc4DecodeNodeTemplate = StringArrayRc4DecodeNodeTemplate;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function StringArrayTemplate() {
    return "\n        var {stringArrayName} = [{stringArray}];\n    ";
}
exports.StringArrayTemplate = StringArrayTemplate;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Utils_1 = __webpack_require__(14);
function SelfDefendingTemplate() {
    return "\n        var selfDefendingFunc = function () {            \n            var object = {\n                data: {\n                    key: 'cookie',\n                    value: 'timeout'\n                },\n                setCookie: function (options, name, value, document) {\n                    document = document || {};\n                    \n                    var updatedCookie = name + \"=\" + value;\n\n                    var i = 0;\n                                                            \n                    for (var i = 0, len = options.length; i < len; i++) {                          \n                        var propName = options[i];\n                                     \n                        updatedCookie += \"; \" + propName;\n                        \n                        var propValue = options[propName];\n                        \n                        options.push(propValue);\n                        len = options.length;\n                                                                        \n                        if (propValue !== true) {\n                            updatedCookie += \"=\" + propValue;\n                        }\n                    }\n\n                    document['cookie'] = updatedCookie;\n                },\n                removeCookie: function(){return 'dev';},\n                getCookie: function (document, name) {    \n                    document = document || function (value) { return value };\n                    var matches = document(new RegExp(\n                        \"(?:^|; )\" + name.replace(/([.$?*|{}()[]\\/+^])/g, '\\$1') + \"=([^;]*)\"\n                    ));\n                    \n                    var func = function (param1, param2) {\n                        param1(++param2);\n                    };\n                    \n                    func({whileFunctionName}, {timesName});\n                                        \n                    return matches ? decodeURIComponent(matches[1]) : undefined;\n                }\n            };\n            \n            var test1 = function () {\n                var regExp = new RegExp('" + Utils_1.Utils.stringToUnicodeEscapeSequence("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}") + "');\n                \n                return regExp.test(object.removeCookie.toString());\n            };\n            \n            object['updateCookie'] = test1;\n            \n            var cookie = '';\n            var result = object['updateCookie']();\n                                    \n            if (!result) {\n                object['setCookie'](['*'], 'counter', 1);\n            } else if (result) {\n                cookie = object['getCookie'](null, 'counter');     \n            } else {\n                object['removeCookie']();\n            }\n        };\n        \n        selfDefendingFunc();\n    ";
}
exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function StringArrayRotateFunctionTemplate() {
    return "\n        (function (array, {timesName}) {\n            var {whileFunctionName} = function (times) {\n                while (--times) {\n                    array['push'](array['shift']());\n                }\n            };\n            \n            {code}\n        })({stringArrayName}, 0x{stringArrayRotateValue});\n    ";
}
exports.StringArrayRotateFunctionTemplate = StringArrayRotateFunctionTemplate;

/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/define-property");

/***/ }),
/* 137 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/get-own-property-descriptor");

/***/ }),
/* 138 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/set");

/***/ }),
/* 139 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/symbol");

/***/ }),
/* 140 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/defineProperty");

/***/ }),
/* 141 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/typeof");

/***/ }),
/* 142 */
/***/ (function(module, exports) {

module.exports = require("chance");

/***/ }),
/* 143 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),
/* 144 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 145 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 146 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 147 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 148 */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ }),
/* 149 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var JavaScriptObfuscator_1 = __webpack_require__(25);
module.exports = JavaScriptObfuscator_1.JavaScriptObfuscator;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map