/*!
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
/******/ 	return __webpack_require__(__webpack_require__.s = 39);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("inversify");

/***/ }),
/* 1 */
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
    ServiceIdentifiers["Factory__IIdentifierObfuscatingReplacer"] = "Factory<IIdentifierObfuscatingReplacer>";
    ServiceIdentifiers["Factory__INodeTransformer"] = "Factory<INodeTransformer[]>";
    ServiceIdentifiers["Factory__IObfuscationResult"] = "Factory<IObfuscationResult>";
    ServiceIdentifiers["Factory__IObfuscatingReplacer"] = "Factory<IObfuscatingReplacer>";
    ServiceIdentifiers["Factory__TControlFlowStorage"] = "Factory<TControlFlowStorage>";
    ServiceIdentifiers["IArrayUtils"] = "IArrayUtils";
    ServiceIdentifiers["ICalleeDataExtractor"] = "ICalleeDataExtractor";
    ServiceIdentifiers["ICryptUtils"] = "ICryptUtils";
    ServiceIdentifiers["ICustomNode"] = "ICustomNode";
    ServiceIdentifiers["ICustomNodeGroup"] = "ICustomNodeGroup";
    ServiceIdentifiers["IControlFlowReplacer"] = "IControlFlowReplacer";
    ServiceIdentifiers["IDeadCodeInjectionReplacer"] = "IDeadCodeInjectionReplacer";
    ServiceIdentifiers["IEscapeSequenceEncoder"] = "IEscapeSequenceEncoder";
    ServiceIdentifiers["IIdentifierObfuscatingReplacer"] = "IIdentifierObfuscatingReplacer";
    ServiceIdentifiers["IJavaScriptObfuscator"] = "IJavaScriptObfuscator";
    ServiceIdentifiers["INodeTransformer"] = "INodeTransformer";
    ServiceIdentifiers["IObfuscationEventEmitter"] = "IObfuscationEventEmitter";
    ServiceIdentifiers["IObfuscationResult"] = "IObfuscationResult";
    ServiceIdentifiers["IObfuscator"] = "IObfuscator";
    ServiceIdentifiers["IOptions"] = "IOptions";
    ServiceIdentifiers["IObfuscatingReplacer"] = "IObfuscatingReplacer";
    ServiceIdentifiers["IRandomGenerator"] = "IRandomGenerator";
    ServiceIdentifiers["ISourceCode"] = "ISourceCode";
    ServiceIdentifiers["ISourceMapCorrector"] = "ISourceMapCorrector";
    ServiceIdentifiers["IStackTraceAnalyzer"] = "IStackTraceAnalyzer";
    ServiceIdentifiers["Newable__ICustomNode"] = "Newable<ICustomNode>";
    ServiceIdentifiers["Newable__TControlFlowStorage"] = "Newable<TControlFlowStorage>";
    ServiceIdentifiers["TCustomNodeGroupStorage"] = "TCustomNodeGroupStorage";
    ServiceIdentifiers["TStringArrayStorage"] = "TStringArrayStorage";
})(ServiceIdentifiers = exports.ServiceIdentifiers || (exports.ServiceIdentifiers = {}));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var escodegen = __webpack_require__(25);
var esprima = __webpack_require__(32);
var estraverse = __webpack_require__(8);
var NodeType_1 = __webpack_require__(11);
var Node_1 = __webpack_require__(5);
var Nodes_1 = __webpack_require__(7);

var NodeUtils = function () {
    function NodeUtils() {
        _classCallCheck(this, NodeUtils);
    }

    _createClass(NodeUtils, null, [{
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
        key: "clone",
        value: function clone(astTree) {
            var cloneRecursive = function cloneRecursive(node) {
                var copy = {};
                Object.keys(node).filter(function (property) {
                    return property !== 'parentNode';
                }).forEach(function (property) {
                    var value = node[property];
                    var clonedValue = void 0;
                    if (value === null || value instanceof RegExp) {
                        clonedValue = value;
                    } else if (Array.isArray(value)) {
                        clonedValue = value.map(cloneRecursive);
                    } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
                        clonedValue = cloneRecursive(value);
                    } else {
                        clonedValue = value;
                    }
                    copy[property] = clonedValue;
                });
                return copy;
            };
            return NodeUtils.parentize(cloneRecursive(astTree));
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
            structure.forEach(function (node) {
                code += escodegen.generate(node, {
                    sourceMapWithCode: true
                }).code;
            });
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
                if (NodeUtils.nodesWithBlockScope.indexOf(parentNode.parentNode.type) !== -1) {
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
            if (Node_1.Node.isBlockStatementNode(node) && NodeUtils.nodesWithBlockScope.indexOf(parentNode.type) !== -1) {
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
                    node.obfuscatedNode = false;
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function initializable() {
    var initializeMethodKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'initialize';

    var decoratorName = Object.keys(this)[0];
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
        var propertyDescriptor = Object.getOwnPropertyDescriptor(target, metadataPropertyKey) || descriptor;
        var methodDescriptor = Object.getOwnPropertyDescriptor(target, initializeMethodKey) || descriptor;
        var originalMethod = methodDescriptor.value;
        Object.defineProperty(target, propertyKey, Object.assign({}, propertyDescriptor, { get: function get() {
                if (this[metadataPropertyKey] === undefined) {
                    throw new Error("Property `" + propertyKey + "` is not initialized! Initialize it first!");
                }
                return this[metadataPropertyKey];
            }, set: function set(newVal) {
                this[metadataPropertyKey] = newVal;
            } }));
        Object.defineProperty(target, initializeMethodKey, Object.assign({}, methodDescriptor, { value: function value() {
                originalMethod.apply(this, arguments);
                if (this[propertyKey]) {}
            } }));
        return propertyDescriptor;
    };
}
exports.initializable = initializable;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var NodeType_1 = __webpack_require__(11);

var Node = function () {
    function Node() {
        _classCallCheck(this, Node);
    }

    _createClass(Node, null, [{
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
        key: "isCatchClauseNode",
        value: function isCatchClauseNode(node) {
            return node.type === NodeType_1.NodeType.CatchClause;
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
        key: "isNodeHasBlockStatement",
        value: function isNodeHasBlockStatement(node) {
            return Array.isArray(node.body);
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
    }]);

    return Node;
}();

exports.Node = Node;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var NodeUtils_1 = __webpack_require__(3);
var AbstractCustomNode = function () {
    function AbstractCustomNode(options) {
        _classCallCheck(this, AbstractCustomNode);

        this.options = options;
    }

    _createClass(AbstractCustomNode, [{
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var escodegen = __webpack_require__(25);
var NodeType_1 = __webpack_require__(11);

var Nodes = function () {
    function Nodes() {
        _classCallCheck(this, Nodes);
    }

    _createClass(Nodes, null, [{
        key: "getProgramNode",
        value: function getProgramNode() {
            var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return {
                type: NodeType_1.NodeType.Program,
                body: body,
                sourceType: 'script',
                obfuscatedNode: false
            };
        }
    }, {
        key: "getArrayExpressionNode",
        value: function getArrayExpressionNode() {
            var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return {
                type: NodeType_1.NodeType.ArrayExpression,
                elements: elements
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
                obfuscatedNode: false
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
                obfuscatedNode: false
            };
        }
    }, {
        key: "getBlockStatementNode",
        value: function getBlockStatementNode() {
            var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return {
                type: NodeType_1.NodeType.BlockStatement,
                body: body,
                obfuscatedNode: false
            };
        }
    }, {
        key: "getBreakStatement",
        value: function getBreakStatement(label) {
            var breakStatementNode = {
                type: NodeType_1.NodeType.BreakStatement,
                obfuscatedNode: false
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
                obfuscatedNode: false
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
                obfuscatedNode: false
            };
        }
    }, {
        key: "getContinueStatement",
        value: function getContinueStatement(label) {
            var continueStatementNode = {
                type: NodeType_1.NodeType.ContinueStatement,
                obfuscatedNode: false
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
                obfuscatedNode: false
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
                obfuscatedNode: false
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
                obfuscatedNode: false
            };
        }
    }, {
        key: "getIfStatementNode",
        value: function getIfStatementNode(test, consequent, alternate) {
            return Object.assign({ type: NodeType_1.NodeType.IfStatement, test: test,
                consequent: consequent }, alternate && { alternate: alternate }, { obfuscatedNode: false });
        }
    }, {
        key: "getIdentifierNode",
        value: function getIdentifierNode(name) {
            return {
                type: NodeType_1.NodeType.Identifier,
                name: name,
                obfuscatedNode: false
            };
        }
    }, {
        key: "getLabeledStatement",
        value: function getLabeledStatement(label, body) {
            return {
                type: NodeType_1.NodeType.LabeledStatement,
                label: label,
                body: body,
                obfuscatedNode: false
            };
        }
    }, {
        key: "getLiteralNode",
        value: function getLiteralNode(value, raw) {
            raw = raw !== undefined ? raw : "'" + value + "'";
            return {
                type: NodeType_1.NodeType.Literal,
                value: value,
                raw: raw,
                'x-verbatim-property': {
                    content: raw,
                    precedence: escodegen.Precedence.Primary
                },
                obfuscatedNode: false
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
                obfuscatedNode: false
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
                obfuscatedNode: false
            };
        }
    }, {
        key: "getObjectExpressionNode",
        value: function getObjectExpressionNode(properties) {
            return {
                type: NodeType_1.NodeType.ObjectExpression,
                properties: properties,
                obfuscatedNode: false
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
                obfuscatedNode: false
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
                obfuscatedNode: false
            };
        }
    }, {
        key: "getReturnStatementNode",
        value: function getReturnStatementNode(argument) {
            return {
                type: NodeType_1.NodeType.ReturnStatement,
                argument: argument,
                obfuscatedNode: false
            };
        }
    }, {
        key: "getSwitchStatementNode",
        value: function getSwitchStatementNode(discriminant, cases) {
            return {
                type: NodeType_1.NodeType.SwitchStatement,
                discriminant: discriminant,
                cases: cases,
                obfuscatedNode: false
            };
        }
    }, {
        key: "getSwitchCaseNode",
        value: function getSwitchCaseNode(test, consequent) {
            return {
                type: NodeType_1.NodeType.SwitchCase,
                test: test,
                consequent: consequent,
                obfuscatedNode: false
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
                obfuscatedNode: false
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
                obfuscatedNode: false
            };
        }
    }, {
        key: "getVariableDeclaratorNode",
        value: function getVariableDeclaratorNode(id, init) {
            return {
                type: NodeType_1.NodeType.VariableDeclarator,
                id: id,
                init: init,
                obfuscatedNode: false
            };
        }
    }, {
        key: "getWhileStatementNode",
        value: function getWhileStatementNode(test, body) {
            return {
                type: NodeType_1.NodeType.WhileStatement,
                test: test,
                body: body,
                obfuscatedNode: false
            };
        }
    }]);

    return Nodes;
}();

exports.Nodes = Nodes;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("estraverse");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var AbstractNodeTransformer = function () {
    function AbstractNodeTransformer(randomGenerator, options) {
        _classCallCheck(this, AbstractNodeTransformer);

        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    _createClass(AbstractNodeTransformer, [{
        key: "initialize",
        value: function initialize() {
            this.nodeIdentifier = this.randomGenerator.getRandomInteger(0, 10000);
        }
    }]);

    return AbstractNodeTransformer;
}();
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Number)], AbstractNodeTransformer.prototype, "nodeIdentifier", void 0);
tslib_1.__decorate([inversify_1.postConstruct(), tslib_1.__metadata("design:type", Function), tslib_1.__metadata("design:paramtypes", []), tslib_1.__metadata("design:returntype", void 0)], AbstractNodeTransformer.prototype, "initialize", null);
AbstractNodeTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], AbstractNodeTransformer);
exports.AbstractNodeTransformer = AbstractNodeTransformer;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("string-template");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var NodeType;
(function (NodeType) {
    NodeType["ArrayExpression"] = "ArrayExpression";
    NodeType["ArrowFunctionExpression"] = "ArrowFunctionExpression";
    NodeType["AssignmentExpression"] = "AssignmentExpression";
    NodeType["AssignmentPattern"] = "AssignmentPattern";
    NodeType["BinaryExpression"] = "BinaryExpression";
    NodeType["BlockStatement"] = "BlockStatement";
    NodeType["BreakStatement"] = "BreakStatement";
    NodeType["CallExpression"] = "CallExpression";
    NodeType["CatchClause"] = "CatchClause";
    NodeType["ClassDeclaration"] = "ClassDeclaration";
    NodeType["ContinueStatement"] = "ContinueStatement";
    NodeType["ExpressionStatement"] = "ExpressionStatement";
    NodeType["FunctionDeclaration"] = "FunctionDeclaration";
    NodeType["FunctionExpression"] = "FunctionExpression";
    NodeType["Identifier"] = "Identifier";
    NodeType["IfStatement"] = "IfStatement";
    NodeType["LabeledStatement"] = "LabeledStatement";
    NodeType["Literal"] = "Literal";
    NodeType["LogicalExpression"] = "LogicalExpression";
    NodeType["MemberExpression"] = "MemberExpression";
    NodeType["MethodDefinition"] = "MethodDefinition";
    NodeType["ObjectExpression"] = "ObjectExpression";
    NodeType["ObjectPattern"] = "ObjectPattern";
    NodeType["Program"] = "Program";
    NodeType["Property"] = "Property";
    NodeType["ReturnStatement"] = "ReturnStatement";
    NodeType["SwitchCase"] = "SwitchCase";
    NodeType["SwitchStatement"] = "SwitchStatement";
    NodeType["TemplateLiteral"] = "TemplateLiteral";
    NodeType["TryStatement"] = "TryStatement";
    NodeType["UnaryExpression"] = "UnaryExpression";
    NodeType["UpdateExpression"] = "UpdateExpression";
    NodeType["VariableDeclaration"] = "VariableDeclaration";
    NodeType["VariableDeclarator"] = "VariableDeclarator";
    NodeType["WhileStatement"] = "WhileStatement";
})(NodeType = exports.NodeType || (exports.NodeType = {}));

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var ControlFlowCustomNode;
(function (ControlFlowCustomNode) {
    ControlFlowCustomNode[ControlFlowCustomNode["BinaryExpressionFunctionNode"] = 0] = "BinaryExpressionFunctionNode";
    ControlFlowCustomNode[ControlFlowCustomNode["BlockStatementControlFlowFlatteningNode"] = 1] = "BlockStatementControlFlowFlatteningNode";
    ControlFlowCustomNode[ControlFlowCustomNode["CallExpressionControlFlowStorageCallNode"] = 2] = "CallExpressionControlFlowStorageCallNode";
    ControlFlowCustomNode[ControlFlowCustomNode["CallExpressionFunctionNode"] = 3] = "CallExpressionFunctionNode";
    ControlFlowCustomNode[ControlFlowCustomNode["ControlFlowStorageNode"] = 4] = "ControlFlowStorageNode";
    ControlFlowCustomNode[ControlFlowCustomNode["ExpressionWithOperatorControlFlowStorageCallNode"] = 5] = "ExpressionWithOperatorControlFlowStorageCallNode";
    ControlFlowCustomNode[ControlFlowCustomNode["LogicalExpressionFunctionNode"] = 6] = "LogicalExpressionFunctionNode";
    ControlFlowCustomNode[ControlFlowCustomNode["StringLiteralControlFlowStorageCallNode"] = 7] = "StringLiteralControlFlowStorageCallNode";
    ControlFlowCustomNode[ControlFlowCustomNode["StringLiteralNode"] = 8] = "StringLiteralNode";
})(ControlFlowCustomNode = exports.ControlFlowCustomNode || (exports.ControlFlowCustomNode = {}));

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var ObfuscationEvent;
(function (ObfuscationEvent) {
    ObfuscationEvent["AfterObfuscation"] = "afterObfuscation";
    ObfuscationEvent["BeforeObfuscation"] = "beforeObfuscation";
})(ObfuscationEvent = exports.ObfuscationEvent || (exports.ObfuscationEvent = {}));

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var JSFuck_1 = __webpack_require__(52);

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: "decToHex",
        value: function decToHex(dec) {
            var radix = 16;
            return dec.toString(radix);
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
            return Array.from(string).map(function (character) {
                return JSFuck_1.JSFuck[character] || character;
            }).join(' + ');
        }
    }]);

    return Utils;
}();

Utils.hexadecimalPrefix = '0x';
exports.Utils = Utils;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(40);
var ServiceIdentifiers_1 = __webpack_require__(1);
var InversifyContainerFacade_1 = __webpack_require__(16);
var JavaScriptObfuscatorCLI_1 = __webpack_require__(146);

var JavaScriptObfuscator = function () {
    function JavaScriptObfuscator() {
        _classCallCheck(this, JavaScriptObfuscator);
    }

    _createClass(JavaScriptObfuscator, null, [{
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var ControlFlowTransformersModule_1 = __webpack_require__(41);
var CustomNodesModule_1 = __webpack_require__(46);
var ObfuscatingTransformersModule_1 = __webpack_require__(88);
var NodeTransformersModule_1 = __webpack_require__(93);
var StackTraceAnalyzerModule_1 = __webpack_require__(107);
var StoragesModule_1 = __webpack_require__(112);
var UtilsModule_1 = __webpack_require__(119);
var JavaScriptObfuscatorInternal_1 = __webpack_require__(123);
var ObfuscationEventEmitter_1 = __webpack_require__(125);
var ObfuscationResult_1 = __webpack_require__(127);
var Obfuscator_1 = __webpack_require__(128);
var Options_1 = __webpack_require__(130);
var SourceCode_1 = __webpack_require__(144);
var SourceMapCorrector_1 = __webpack_require__(145);

var InversifyContainerFacade = function () {
    function InversifyContainerFacade() {
        _classCallCheck(this, InversifyContainerFacade);

        this.container = new inversify_1.Container();
    }

    _createClass(InversifyContainerFacade, [{
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
            this.container.load(UtilsModule_1.utilsModule);
            this.container.load(StoragesModule_1.storagesModule);
            this.container.load(StackTraceAnalyzerModule_1.stackTraceAnalyzerModule);
            this.container.load(CustomNodesModule_1.customNodesModule);
            this.container.load(NodeTransformersModule_1.nodeTransformersModule);
            this.container.load(ControlFlowTransformersModule_1.controlFlowTransformersModule);
            this.container.load(ObfuscatingTransformersModule_1.obfuscatingTransformersModule);
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
                var cache = new Map();
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
            for (var _len = arguments.length, dependencies = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                dependencies[_key - 1] = arguments[_key];
            }

            return function (context) {
                var cache = new Map();
                var cachedDependencies = [];
                return function (bindingName) {
                    dependencies.forEach(function (dependency, index) {
                        if (!cachedDependencies[index]) {
                            cachedDependencies[index] = context.container.get(dependency);
                        }
                    });
                    if (cache.has(bindingName)) {
                        return new (Function.prototype.bind.apply(cache.get(bindingName), [null].concat(cachedDependencies)))();
                    }
                    var constructor = context.container.getNamed(serviceIdentifier, bindingName);
                    cache.set(bindingName, constructor);
                    return new (Function.prototype.bind.apply(constructor, [null].concat(cachedDependencies)))();
                };
            };
        }
    }]);

    return InversifyContainerFacade;
}();

exports.InversifyContainerFacade = InversifyContainerFacade;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var CustomNode;
(function (CustomNode) {
    CustomNode[CustomNode["ConsoleOutputDisableExpressionNode"] = 0] = "ConsoleOutputDisableExpressionNode";
    CustomNode[CustomNode["DebugProtectionFunctionCallNode"] = 1] = "DebugProtectionFunctionCallNode";
    CustomNode[CustomNode["DebugProtectionFunctionIntervalNode"] = 2] = "DebugProtectionFunctionIntervalNode";
    CustomNode[CustomNode["DebugProtectionFunctionNode"] = 3] = "DebugProtectionFunctionNode";
    CustomNode[CustomNode["DomainLockNode"] = 4] = "DomainLockNode";
    CustomNode[CustomNode["NodeCallsControllerFunctionNode"] = 5] = "NodeCallsControllerFunctionNode";
    CustomNode[CustomNode["SelfDefendingUnicodeNode"] = 6] = "SelfDefendingUnicodeNode";
    CustomNode[CustomNode["StringArrayCallsWrapper"] = 7] = "StringArrayCallsWrapper";
    CustomNode[CustomNode["StringArrayNode"] = 8] = "StringArrayNode";
    CustomNode[CustomNode["StringArrayRotateFunctionNode"] = 9] = "StringArrayRotateFunctionNode";
})(CustomNode = exports.CustomNode || (exports.CustomNode = {}));

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var NodeAppender = function () {
    function NodeAppender() {
        _classCallCheck(this, NodeAppender);
    }

    _createClass(NodeAppender, null, [{
        key: "appendNode",
        value: function appendNode(blockScopeNode, nodeBodyStatements) {
            if (!NodeAppender.validateBodyStatements(nodeBodyStatements)) {
                nodeBodyStatements = [];
            }
            nodeBodyStatements = NodeAppender.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);
            blockScopeNode.body = [].concat(_toConsumableArray(blockScopeNode.body), _toConsumableArray(nodeBodyStatements));
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
        key: "insertNodeAtIndex",
        value: function insertNodeAtIndex(blockScopeNode, nodeBodyStatements, index) {
            if (!NodeAppender.validateBodyStatements(nodeBodyStatements)) {
                nodeBodyStatements = [];
            }
            nodeBodyStatements = NodeAppender.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);
            blockScopeNode.body = [].concat(_toConsumableArray(blockScopeNode.body.slice(0, index)), _toConsumableArray(nodeBodyStatements), _toConsumableArray(blockScopeNode.body.slice(index)));
        }
    }, {
        key: "prependNode",
        value: function prependNode(blockScopeNode, nodeBodyStatements) {
            if (!NodeAppender.validateBodyStatements(nodeBodyStatements)) {
                nodeBodyStatements = [];
            }
            nodeBodyStatements = NodeAppender.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);
            blockScopeNode.body = [].concat(_toConsumableArray(nodeBodyStatements), _toConsumableArray(blockScopeNode.body));
        }
    }, {
        key: "parentizeBodyStatementsBeforeAppend",
        value: function parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements) {
            nodeBodyStatements.forEach(function (statement) {
                statement.parentNode = blockScopeNode;
            });
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var IdentifierObfuscatingReplacer;
(function (IdentifierObfuscatingReplacer) {
    IdentifierObfuscatingReplacer[IdentifierObfuscatingReplacer["BaseIdentifierObfuscatingReplacer"] = 0] = "BaseIdentifierObfuscatingReplacer";
})(IdentifierObfuscatingReplacer = exports.IdentifierObfuscatingReplacer || (exports.IdentifierObfuscatingReplacer = {}));

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var AbstractCustomNodeGroup = function () {
    function AbstractCustomNodeGroup(randomGenerator, options) {
        _classCallCheck(this, AbstractCustomNodeGroup);

        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    _createClass(AbstractCustomNodeGroup, [{
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
AbstractCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], AbstractCustomNodeGroup);
exports.AbstractCustomNodeGroup = AbstractCustomNodeGroup;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var SourceMapMode_1 = __webpack_require__(22);
exports.NO_CUSTOM_NODES_PRESET = Object.freeze({
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0,
    deadCodeInjection: false,
    deadCodeInjectionThreshold: 0,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    domainLock: [],
    mangle: false,
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
    unicodeEscapeSequence: false
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var SourceMapMode;
(function (SourceMapMode) {
    SourceMapMode["Inline"] = "inline";
    SourceMapMode["Separate"] = "separate";
})(SourceMapMode = exports.SourceMapMode || (exports.SourceMapMode = {}));

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var AbstractObfuscatingReplacer = function AbstractObfuscatingReplacer(options) {
    _classCallCheck(this, AbstractObfuscatingReplacer);

    this.options = options;
};
AbstractObfuscatingReplacer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], AbstractObfuscatingReplacer);
exports.AbstractObfuscatingReplacer = AbstractObfuscatingReplacer;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var AbstractControlFlowReplacer = AbstractControlFlowReplacer_1 = function () {
    function AbstractControlFlowReplacer(controlFlowCustomNodeFactory, randomGenerator, options) {
        _classCallCheck(this, AbstractControlFlowReplacer);

        this.replacerDataByControlFlowStorageId = new Map();
        this.controlFlowCustomNodeFactory = controlFlowCustomNodeFactory;
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    _createClass(AbstractControlFlowReplacer, [{
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
            var storageKeysById = void 0;
            if (identifierDataByControlFlowStorageId.has(controlFlowStorageId)) {
                storageKeysById = identifierDataByControlFlowStorageId.get(controlFlowStorageId);
            } else {
                storageKeysById = new Map();
            }
            return storageKeysById;
        }
    }]);

    return AbstractControlFlowReplacer;
}();
AbstractControlFlowReplacer = AbstractControlFlowReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], AbstractControlFlowReplacer);
exports.AbstractControlFlowReplacer = AbstractControlFlowReplacer;
var AbstractControlFlowReplacer_1;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("escodegen-wallaby");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var StringArrayEncoding;
(function (StringArrayEncoding) {
    StringArrayEncoding["Base64"] = "base64";
    StringArrayEncoding["Rc4"] = "rc4";
})(StringArrayEncoding = exports.StringArrayEncoding || (exports.StringArrayEncoding = {}));

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var AbstractCalleeDataExtractor = function AbstractCalleeDataExtractor() {
    _classCallCheck(this, AbstractCalleeDataExtractor);
};
AbstractCalleeDataExtractor = tslib_1.__decorate([inversify_1.injectable()], AbstractCalleeDataExtractor);
exports.AbstractCalleeDataExtractor = AbstractCalleeDataExtractor;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var md5 = __webpack_require__(117);
var chance_1 = __webpack_require__(118);
var Initializable_1 = __webpack_require__(4);
var Utils_1 = __webpack_require__(14);
var RandomGenerator = RandomGenerator_1 = function () {
    function RandomGenerator(sourceCode, options) {
        _classCallCheck(this, RandomGenerator);

        this.randomVariableNameSet = new Set();
        this.sourceCode = sourceCode;
        this.options = options;
    }

    _createClass(RandomGenerator, [{
        key: "initialize",
        value: function initialize() {
            var _this = this;

            var getRandomInteger = function getRandomInteger(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            };
            var getSeed = function getSeed() {
                var md5Hash = md5(_this.sourceCode.getSourceCode());
                return _this.seed + Number(md5Hash.replace(/\D/g, ''));
            };
            this.seed = this.options.seed !== 0 ? this.options.seed : getRandomInteger(0, 999999999);
            this.randomGenerator = new chance_1.Chance(getSeed());
            console.log("seed is " + this.seed);
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

            return this.getRandomGenerator().string({ length: length, pool: pool });
        }
    }, {
        key: "getRandomVariableName",
        value: function getRandomVariableName(length) {
            var prefix = "_" + Utils_1.Utils.hexadecimalPrefix;
            var rangeMinInteger = 10000;
            var rangeMaxInteger = 99999999;
            var randomInteger = this.getRandomInteger(rangeMinInteger, rangeMaxInteger);
            var hexadecimalNumber = Utils_1.Utils.decToHex(randomInteger);
            var randomVariableName = "" + prefix + hexadecimalNumber.substr(0, length);
            if (this.randomVariableNameSet.has(randomVariableName)) {
                return this.getRandomVariableName(length);
            }
            this.randomVariableNameSet.add(randomVariableName);
            return randomVariableName;
        }
    }]);

    return RandomGenerator;
}();
RandomGenerator.randomGeneratorPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
RandomGenerator.randomGeneratorPoolNumbers = '0123456789';
RandomGenerator.randomGeneratorPoolHexadecimal = "abcdef" + RandomGenerator_1.randomGeneratorPoolNumbers;
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Number)], RandomGenerator.prototype, "seed", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], RandomGenerator.prototype, "randomGenerator", void 0);
tslib_1.__decorate([inversify_1.postConstruct(), tslib_1.__metadata("design:type", Function), tslib_1.__metadata("design:paramtypes", []), tslib_1.__metadata("design:returntype", void 0)], RandomGenerator.prototype, "initialize", null);
RandomGenerator = RandomGenerator_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ISourceCode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], RandomGenerator);
exports.RandomGenerator = RandomGenerator;
var RandomGenerator_1;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var SourceMapMode_1 = __webpack_require__(22);
exports.DEFAULT_PRESET = Object.freeze({
    compact: true,
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: false,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    domainLock: [],
    mangle: false,
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
    unicodeEscapeSequence: false
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var ControlFlowReplacer;
(function (ControlFlowReplacer) {
    ControlFlowReplacer[ControlFlowReplacer["BinaryExpressionControlFlowReplacer"] = 0] = "BinaryExpressionControlFlowReplacer";
    ControlFlowReplacer[ControlFlowReplacer["CallExpressionControlFlowReplacer"] = 1] = "CallExpressionControlFlowReplacer";
    ControlFlowReplacer[ControlFlowReplacer["LogicalExpressionControlFlowReplacer"] = 2] = "LogicalExpressionControlFlowReplacer";
    ControlFlowReplacer[ControlFlowReplacer["StringLiteralControlFlowReplacer"] = 3] = "StringLiteralControlFlowReplacer";
})(ControlFlowReplacer = exports.ControlFlowReplacer || (exports.ControlFlowReplacer = {}));

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var ControlFlowCustomNode_1 = __webpack_require__(12);
var AbstractControlFlowReplacer_1 = __webpack_require__(24);
var Node_1 = __webpack_require__(5);
var ExpressionWithOperatorControlFlowReplacer = function (_AbstractControlFlowR) {
    _inherits(ExpressionWithOperatorControlFlowReplacer, _AbstractControlFlowR);

    function ExpressionWithOperatorControlFlowReplacer(controlFlowCustomNodeFactory, randomGenerator, options) {
        _classCallCheck(this, ExpressionWithOperatorControlFlowReplacer);

        var _this = _possibleConstructorReturn(this, (ExpressionWithOperatorControlFlowReplacer.__proto__ || Object.getPrototypeOf(ExpressionWithOperatorControlFlowReplacer)).call(this, controlFlowCustomNodeFactory, randomGenerator, options));

        _this.replacerDataByControlFlowStorageId = new Map();
        return _this;
    }

    _createClass(ExpressionWithOperatorControlFlowReplacer, [{
        key: "getControlFlowStorageCallNode",
        value: function getControlFlowStorageCallNode(controlFlowStorageId, storageKey, leftExpression, rightExpression) {
            var controlFlowStorageCallCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.ExpressionWithOperatorControlFlowStorageCallNode);
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
ExpressionWithOperatorControlFlowReplacer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], ExpressionWithOperatorControlFlowReplacer);
exports.ExpressionWithOperatorControlFlowReplacer = ExpressionWithOperatorControlFlowReplacer;

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("esprima");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var CustomNodeGroup;
(function (CustomNodeGroup) {
    CustomNodeGroup[CustomNodeGroup["ConsoleOutputCustomNodeGroup"] = 0] = "ConsoleOutputCustomNodeGroup";
    CustomNodeGroup[CustomNodeGroup["DebugProtectionCustomNodeGroup"] = 1] = "DebugProtectionCustomNodeGroup";
    CustomNodeGroup[CustomNodeGroup["DomainLockCustomNodeGroup"] = 2] = "DomainLockCustomNodeGroup";
    CustomNodeGroup[CustomNodeGroup["SelfDefendingCustomNodeGroup"] = 3] = "SelfDefendingCustomNodeGroup";
    CustomNodeGroup[CustomNodeGroup["StringArrayCustomNodeGroup"] = 4] = "StringArrayCustomNodeGroup";
})(CustomNodeGroup = exports.CustomNodeGroup || (exports.CustomNodeGroup = {}));

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var LiteralObfuscatingReplacer;
(function (LiteralObfuscatingReplacer) {
    LiteralObfuscatingReplacer[LiteralObfuscatingReplacer["BooleanLiteralObfuscatingReplacer"] = 0] = "BooleanLiteralObfuscatingReplacer";
    LiteralObfuscatingReplacer[LiteralObfuscatingReplacer["NumberLiteralObfuscatingReplacer"] = 1] = "NumberLiteralObfuscatingReplacer";
    LiteralObfuscatingReplacer[LiteralObfuscatingReplacer["StringLiteralObfuscatingReplacer"] = 2] = "StringLiteralObfuscatingReplacer";
})(LiteralObfuscatingReplacer = exports.LiteralObfuscatingReplacer || (exports.LiteralObfuscatingReplacer = {}));

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var NodeTransformer;
(function (NodeTransformer) {
    NodeTransformer[NodeTransformer["BlockStatementControlFlowTransformer"] = 0] = "BlockStatementControlFlowTransformer";
    NodeTransformer[NodeTransformer["DeadCodeInjectionTransformer"] = 1] = "DeadCodeInjectionTransformer";
    NodeTransformer[NodeTransformer["FunctionControlFlowTransformer"] = 2] = "FunctionControlFlowTransformer";
    NodeTransformer[NodeTransformer["CatchClauseTransformer"] = 3] = "CatchClauseTransformer";
    NodeTransformer[NodeTransformer["FunctionDeclarationTransformer"] = 4] = "FunctionDeclarationTransformer";
    NodeTransformer[NodeTransformer["FunctionTransformer"] = 5] = "FunctionTransformer";
    NodeTransformer[NodeTransformer["LabeledStatementTransformer"] = 6] = "LabeledStatementTransformer";
    NodeTransformer[NodeTransformer["LiteralTransformer"] = 7] = "LiteralTransformer";
    NodeTransformer[NodeTransformer["MemberExpressionTransformer"] = 8] = "MemberExpressionTransformer";
    NodeTransformer[NodeTransformer["MethodDefinitionTransformer"] = 9] = "MethodDefinitionTransformer";
    NodeTransformer[NodeTransformer["ObjectExpressionTransformer"] = 10] = "ObjectExpressionTransformer";
    NodeTransformer[NodeTransformer["TemplateLiteralTransformer"] = 11] = "TemplateLiteralTransformer";
    NodeTransformer[NodeTransformer["VariableDeclarationTransformer"] = 12] = "VariableDeclarationTransformer";
})(NodeTransformer = exports.NodeTransformer || (exports.NodeTransformer = {}));

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var CalleeDataExtractor;
(function (CalleeDataExtractor) {
    CalleeDataExtractor[CalleeDataExtractor["FunctionDeclarationCalleeDataExtractor"] = 0] = "FunctionDeclarationCalleeDataExtractor";
    CalleeDataExtractor[CalleeDataExtractor["FunctionExpressionCalleeDataExtractor"] = 1] = "FunctionExpressionCalleeDataExtractor";
    CalleeDataExtractor[CalleeDataExtractor["ObjectExpressionCalleeDataExtractor"] = 2] = "ObjectExpressionCalleeDataExtractor";
})(CalleeDataExtractor = exports.CalleeDataExtractor || (exports.CalleeDataExtractor = {}));

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var MapStorage = function () {
    function MapStorage(randomGenerator) {
        _classCallCheck(this, MapStorage);

        this.randomGenerator = randomGenerator;
    }

    _createClass(MapStorage, [{
        key: "initialize",
        value: function initialize() {
            this.storage = new Map();
            this.storageId = this.randomGenerator.getRandomString(6);
        }
    }, {
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
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.storage[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2),
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
        key: "mergeWith",
        value: function mergeWith(storage) {
            var mergeId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            this.storage = new Map([].concat(_toConsumableArray(this.storage), _toConsumableArray(storage.getStorage())));
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
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Map)], MapStorage.prototype, "storage", void 0);
tslib_1.__decorate([inversify_1.postConstruct(), tslib_1.__metadata("design:type", Function), tslib_1.__metadata("design:paramtypes", []), tslib_1.__metadata("design:returntype", void 0)], MapStorage.prototype, "initialize", null);
MapStorage = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__metadata("design:paramtypes", [Object])], MapStorage);
exports.MapStorage = MapStorage;

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var JavaScriptObfuscator_1 = __webpack_require__(15);
module.exports = JavaScriptObfuscator_1.JavaScriptObfuscator;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var InversifyContainerFacade_1 = __webpack_require__(16);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var ControlFlowReplacer_1 = __webpack_require__(30);
var BinaryExpressionControlFlowReplacer_1 = __webpack_require__(42);
var CallExpressionControlFlowReplacer_1 = __webpack_require__(43);
var LogicalExpressionControlFlowReplacer_1 = __webpack_require__(44);
var StringLiteralControlFlowReplacer_1 = __webpack_require__(45);
exports.controlFlowTransformersModule = new inversify_1.ContainerModule(function (bind) {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer).to(BinaryExpressionControlFlowReplacer_1.BinaryExpressionControlFlowReplacer).whenTargetNamed(ControlFlowReplacer_1.ControlFlowReplacer.BinaryExpressionControlFlowReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer).to(CallExpressionControlFlowReplacer_1.CallExpressionControlFlowReplacer).whenTargetNamed(ControlFlowReplacer_1.ControlFlowReplacer.CallExpressionControlFlowReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer).to(LogicalExpressionControlFlowReplacer_1.LogicalExpressionControlFlowReplacer).whenTargetNamed(ControlFlowReplacer_1.ControlFlowReplacer.LogicalExpressionControlFlowReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer).to(StringLiteralControlFlowReplacer_1.StringLiteralControlFlowReplacer).whenTargetNamed(ControlFlowReplacer_1.ControlFlowReplacer.StringLiteralControlFlowReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowReplacer).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.IControlFlowReplacer));
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var ControlFlowCustomNode_1 = __webpack_require__(12);
var ExpressionWithOperatorControlFlowReplacer_1 = __webpack_require__(31);
var BinaryExpressionControlFlowReplacer = BinaryExpressionControlFlowReplacer_1 = function (_ExpressionWithOperat) {
    _inherits(BinaryExpressionControlFlowReplacer, _ExpressionWithOperat);

    function BinaryExpressionControlFlowReplacer(controlFlowCustomNodeFactory, randomGenerator, options) {
        _classCallCheck(this, BinaryExpressionControlFlowReplacer);

        return _possibleConstructorReturn(this, (BinaryExpressionControlFlowReplacer.__proto__ || Object.getPrototypeOf(BinaryExpressionControlFlowReplacer)).call(this, controlFlowCustomNodeFactory, randomGenerator, options));
    }

    _createClass(BinaryExpressionControlFlowReplacer, [{
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
var BinaryExpressionControlFlowReplacer_1;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var ControlFlowCustomNode_1 = __webpack_require__(12);
var AbstractControlFlowReplacer_1 = __webpack_require__(24);
var Node_1 = __webpack_require__(5);
var CallExpressionControlFlowReplacer = CallExpressionControlFlowReplacer_1 = function (_AbstractControlFlowR) {
    _inherits(CallExpressionControlFlowReplacer, _AbstractControlFlowR);

    function CallExpressionControlFlowReplacer(controlFlowCustomNodeFactory, randomGenerator, options) {
        _classCallCheck(this, CallExpressionControlFlowReplacer);

        return _possibleConstructorReturn(this, (CallExpressionControlFlowReplacer.__proto__ || Object.getPrototypeOf(CallExpressionControlFlowReplacer)).call(this, controlFlowCustomNodeFactory, randomGenerator, options));
    }

    _createClass(CallExpressionControlFlowReplacer, [{
        key: "replace",
        value: function replace(callExpressionNode, parentNode, controlFlowStorage) {
            var callee = callExpressionNode.callee;
            if (!Node_1.Node.isIdentifierNode(callee)) {
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
            if (!statementNode || !Node_1.Node.isExpressionStatementNode(statementNode)) {
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
var CallExpressionControlFlowReplacer_1;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var ControlFlowCustomNode_1 = __webpack_require__(12);
var ExpressionWithOperatorControlFlowReplacer_1 = __webpack_require__(31);
var Node_1 = __webpack_require__(5);
var NodeUtils_1 = __webpack_require__(3);
var LogicalExpressionControlFlowReplacer = LogicalExpressionControlFlowReplacer_1 = function (_ExpressionWithOperat) {
    _inherits(LogicalExpressionControlFlowReplacer, _ExpressionWithOperat);

    function LogicalExpressionControlFlowReplacer(controlFlowCustomNodeFactory, randomGenerator, options) {
        _classCallCheck(this, LogicalExpressionControlFlowReplacer);

        return _possibleConstructorReturn(this, (LogicalExpressionControlFlowReplacer.__proto__ || Object.getPrototypeOf(LogicalExpressionControlFlowReplacer)).call(this, controlFlowCustomNodeFactory, randomGenerator, options));
    }

    _createClass(LogicalExpressionControlFlowReplacer, [{
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
LogicalExpressionControlFlowReplacer = LogicalExpressionControlFlowReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], LogicalExpressionControlFlowReplacer);
exports.LogicalExpressionControlFlowReplacer = LogicalExpressionControlFlowReplacer;
var LogicalExpressionControlFlowReplacer_1;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var ControlFlowCustomNode_1 = __webpack_require__(12);
var AbstractControlFlowReplacer_1 = __webpack_require__(24);
var Node_1 = __webpack_require__(5);
var StringLiteralControlFlowReplacer = StringLiteralControlFlowReplacer_1 = function (_AbstractControlFlowR) {
    _inherits(StringLiteralControlFlowReplacer, _AbstractControlFlowR);

    function StringLiteralControlFlowReplacer(controlFlowCustomNodeFactory, randomGenerator, options) {
        _classCallCheck(this, StringLiteralControlFlowReplacer);

        return _possibleConstructorReturn(this, (StringLiteralControlFlowReplacer.__proto__ || Object.getPrototypeOf(StringLiteralControlFlowReplacer)).call(this, controlFlowCustomNodeFactory, randomGenerator, options));
    }

    _createClass(StringLiteralControlFlowReplacer, [{
        key: "replace",
        value: function replace(literalNode, parentNode, controlFlowStorage) {
            if (Node_1.Node.isPropertyNode(parentNode) && parentNode.key === literalNode) {
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
            if (!statementNode || !Node_1.Node.isExpressionStatementNode(statementNode)) {
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
var StringLiteralControlFlowReplacer_1;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var InversifyContainerFacade_1 = __webpack_require__(16);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var ControlFlowCustomNode_1 = __webpack_require__(12);
var CustomNode_1 = __webpack_require__(17);
var CustomNodeGroup_1 = __webpack_require__(33);
var ConsoleOutputCustomNodeGroup_1 = __webpack_require__(47);
var DebugProtectionCustomNodeGroup_1 = __webpack_require__(48);
var DomainLockCustomNodeGroup_1 = __webpack_require__(49);
var SelfDefendingCustomNodeGroup_1 = __webpack_require__(50);
var StringArrayCustomNodeGroup_1 = __webpack_require__(51);
var BinaryExpressionFunctionNode_1 = __webpack_require__(53);
var BlockStatementControlFlowFlatteningNode_1 = __webpack_require__(54);
var CallExpressionControlFlowStorageCallNode_1 = __webpack_require__(55);
var CallExpressionFunctionNode_1 = __webpack_require__(56);
var ControlFlowStorageNode_1 = __webpack_require__(57);
var ConsoleOutputDisableExpressionNode_1 = __webpack_require__(58);
var DebugProtectionFunctionCallNode_1 = __webpack_require__(60);
var DebugProtectionFunctionIntervalNode_1 = __webpack_require__(62);
var DebugProtectionFunctionNode_1 = __webpack_require__(64);
var DomainLockNode_1 = __webpack_require__(66);
var ExpressionWithOperatorControlFlowStorageCallNode_1 = __webpack_require__(68);
var LogicalExpressionFunctionNode_1 = __webpack_require__(69);
var NodeCallsControllerFunctionNode_1 = __webpack_require__(70);
var SelfDefendingUnicodeNode_1 = __webpack_require__(72);
var StringArrayCallsWrapper_1 = __webpack_require__(74);
var StringArrayNode_1 = __webpack_require__(81);
var StringArrayRotateFunctionNode_1 = __webpack_require__(83);
var StringLiteralControlFlowStorageCallNode_1 = __webpack_require__(86);
var StringLiteralNode_1 = __webpack_require__(87);
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
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(ConsoleOutputCustomNodeGroup_1.ConsoleOutputCustomNodeGroup).whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.ConsoleOutputCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(DebugProtectionCustomNodeGroup_1.DebugProtectionCustomNodeGroup).whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.DebugProtectionCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(DomainLockCustomNodeGroup_1.DomainLockCustomNodeGroup).whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.DomainLockCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(SelfDefendingCustomNodeGroup_1.SelfDefendingCustomNodeGroup).whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.SelfDefendingCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup).to(StringArrayCustomNodeGroup_1.StringArrayCustomNodeGroup).whenTargetNamed(CustomNodeGroup_1.CustomNodeGroup.StringArrayCustomNodeGroup);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getFactory(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNode));
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getConstructorFactory(ServiceIdentifiers_1.ServiceIdentifiers.Newable__ICustomNode, ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator, ServiceIdentifiers_1.ServiceIdentifiers.IOptions));
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNodeGroup).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getFactory(ServiceIdentifiers_1.ServiceIdentifiers.ICustomNodeGroup));
});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var CustomNode_1 = __webpack_require__(17);
var ObfuscationEvent_1 = __webpack_require__(13);
var AbstractCustomNodeGroup_1 = __webpack_require__(20);
var NodeAppender_1 = __webpack_require__(18);
var ConsoleOutputCustomNodeGroup = function (_AbstractCustomNodeGr) {
    _inherits(ConsoleOutputCustomNodeGroup, _AbstractCustomNodeGr);

    function ConsoleOutputCustomNodeGroup(customNodeFactory, obfuscationEventEmitter, randomGenerator, options) {
        _classCallCheck(this, ConsoleOutputCustomNodeGroup);

        var _this = _possibleConstructorReturn(this, (ConsoleOutputCustomNodeGroup.__proto__ || Object.getPrototypeOf(ConsoleOutputCustomNodeGroup)).call(this, randomGenerator, options));

        _this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.BeforeObfuscation;
        _this.customNodeFactory = customNodeFactory;
        _this.obfuscationEventEmitter = obfuscationEventEmitter;
        return _this;
    }

    _createClass(ConsoleOutputCustomNodeGroup, [{
        key: "appendCustomNodes",
        value: function appendCustomNodes(blockScopeNode, stackTraceData) {
            var randomStackTraceIndex = this.getRandomStackTraceIndex(stackTraceData.length);
            this.appendCustomNodeIfExist(CustomNode_1.CustomNode.ConsoleOutputDisableExpressionNode, function (customNode) {
                NodeAppender_1.NodeAppender.appendNodeToOptimalBlockScope(stackTraceData, blockScopeNode, customNode.getNode(), randomStackTraceIndex);
            });
            this.appendCustomNodeIfExist(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, function (customNode) {
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
            this.customNodes = new Map();
            if (!this.options.disableConsoleOutput) {
                return;
            }
            var callsControllerFunctionName = this.randomGenerator.getRandomVariableName(6);
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
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Map)], ConsoleOutputCustomNodeGroup.prototype, "customNodes", void 0);
ConsoleOutputCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])], ConsoleOutputCustomNodeGroup);
exports.ConsoleOutputCustomNodeGroup = ConsoleOutputCustomNodeGroup;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var CustomNode_1 = __webpack_require__(17);
var ObfuscationEvent_1 = __webpack_require__(13);
var AbstractCustomNodeGroup_1 = __webpack_require__(20);
var NodeAppender_1 = __webpack_require__(18);
var DebugProtectionCustomNodeGroup = function (_AbstractCustomNodeGr) {
    _inherits(DebugProtectionCustomNodeGroup, _AbstractCustomNodeGr);

    function DebugProtectionCustomNodeGroup(customNodeFactory, obfuscationEventEmitter, randomGenerator, options) {
        _classCallCheck(this, DebugProtectionCustomNodeGroup);

        var _this = _possibleConstructorReturn(this, (DebugProtectionCustomNodeGroup.__proto__ || Object.getPrototypeOf(DebugProtectionCustomNodeGroup)).call(this, randomGenerator, options));

        _this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.BeforeObfuscation;
        _this.customNodeFactory = customNodeFactory;
        _this.obfuscationEventEmitter = obfuscationEventEmitter;
        return _this;
    }

    _createClass(DebugProtectionCustomNodeGroup, [{
        key: "appendCustomNodes",
        value: function appendCustomNodes(blockScopeNode, stackTraceData) {
            var _this2 = this;

            this.appendCustomNodeIfExist(CustomNode_1.CustomNode.DebugProtectionFunctionNode, function (customNode) {
                NodeAppender_1.NodeAppender.appendNode(blockScopeNode, customNode.getNode());
            });
            this.appendCustomNodeIfExist(CustomNode_1.CustomNode.DebugProtectionFunctionCallNode, function (customNode) {
                NodeAppender_1.NodeAppender.appendNode(blockScopeNode, customNode.getNode());
            });
            this.appendCustomNodeIfExist(CustomNode_1.CustomNode.DebugProtectionFunctionIntervalNode, function (customNode) {
                var programBodyLength = blockScopeNode.body.length;
                var randomIndex = _this2.randomGenerator.getRandomInteger(0, programBodyLength);
                NodeAppender_1.NodeAppender.insertNodeAtIndex(blockScopeNode, customNode.getNode(), randomIndex);
            });
        }
    }, {
        key: "initialize",
        value: function initialize() {
            this.customNodes = new Map();
            if (!this.options.debugProtection) {
                return;
            }
            var debugProtectionFunctionName = this.randomGenerator.getRandomVariableName(6);
            var debugProtectionFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.DebugProtectionFunctionNode);
            var debugProtectionFunctionCallNode = this.customNodeFactory(CustomNode_1.CustomNode.DebugProtectionFunctionCallNode);
            var debugProtectionFunctionIntervalNode = this.customNodeFactory(CustomNode_1.CustomNode.DebugProtectionFunctionIntervalNode);
            debugProtectionFunctionNode.initialize(debugProtectionFunctionName);
            debugProtectionFunctionCallNode.initialize(debugProtectionFunctionName);
            debugProtectionFunctionIntervalNode.initialize(debugProtectionFunctionName);
            this.customNodes.set(CustomNode_1.CustomNode.DebugProtectionFunctionNode, debugProtectionFunctionNode);
            this.customNodes.set(CustomNode_1.CustomNode.DebugProtectionFunctionCallNode, debugProtectionFunctionCallNode);
            if (this.options.debugProtectionInterval) {
                this.customNodes.set(CustomNode_1.CustomNode.DebugProtectionFunctionIntervalNode, debugProtectionFunctionIntervalNode);
            }
        }
    }]);

    return DebugProtectionCustomNodeGroup;
}(AbstractCustomNodeGroup_1.AbstractCustomNodeGroup);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Map)], DebugProtectionCustomNodeGroup.prototype, "customNodes", void 0);
DebugProtectionCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])], DebugProtectionCustomNodeGroup);
exports.DebugProtectionCustomNodeGroup = DebugProtectionCustomNodeGroup;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var CustomNode_1 = __webpack_require__(17);
var ObfuscationEvent_1 = __webpack_require__(13);
var AbstractCustomNodeGroup_1 = __webpack_require__(20);
var NodeAppender_1 = __webpack_require__(18);
var DomainLockCustomNodeGroup = function (_AbstractCustomNodeGr) {
    _inherits(DomainLockCustomNodeGroup, _AbstractCustomNodeGr);

    function DomainLockCustomNodeGroup(customNodeFactory, obfuscationEventEmitter, randomGenerator, options) {
        _classCallCheck(this, DomainLockCustomNodeGroup);

        var _this = _possibleConstructorReturn(this, (DomainLockCustomNodeGroup.__proto__ || Object.getPrototypeOf(DomainLockCustomNodeGroup)).call(this, randomGenerator, options));

        _this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.BeforeObfuscation;
        _this.customNodeFactory = customNodeFactory;
        _this.obfuscationEventEmitter = obfuscationEventEmitter;
        return _this;
    }

    _createClass(DomainLockCustomNodeGroup, [{
        key: "appendCustomNodes",
        value: function appendCustomNodes(blockScopeNode, stackTraceData) {
            var randomStackTraceIndex = this.getRandomStackTraceIndex(stackTraceData.length);
            this.appendCustomNodeIfExist(CustomNode_1.CustomNode.DomainLockNode, function (customNode) {
                NodeAppender_1.NodeAppender.appendNodeToOptimalBlockScope(stackTraceData, blockScopeNode, customNode.getNode(), randomStackTraceIndex);
            });
            this.appendCustomNodeIfExist(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, function (customNode) {
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
            this.customNodes = new Map();
            if (!this.options.domainLock.length) {
                return;
            }
            var callsControllerFunctionName = this.randomGenerator.getRandomVariableName(6);
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
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Map)], DomainLockCustomNodeGroup.prototype, "customNodes", void 0);
DomainLockCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])], DomainLockCustomNodeGroup);
exports.DomainLockCustomNodeGroup = DomainLockCustomNodeGroup;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var CustomNode_1 = __webpack_require__(17);
var ObfuscationEvent_1 = __webpack_require__(13);
var AbstractCustomNodeGroup_1 = __webpack_require__(20);
var NodeAppender_1 = __webpack_require__(18);
var SelfDefendingCustomNodeGroup = function (_AbstractCustomNodeGr) {
    _inherits(SelfDefendingCustomNodeGroup, _AbstractCustomNodeGr);

    function SelfDefendingCustomNodeGroup(customNodeFactory, obfuscationEventEmitter, randomGenerator, options) {
        _classCallCheck(this, SelfDefendingCustomNodeGroup);

        var _this = _possibleConstructorReturn(this, (SelfDefendingCustomNodeGroup.__proto__ || Object.getPrototypeOf(SelfDefendingCustomNodeGroup)).call(this, randomGenerator, options));

        _this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.AfterObfuscation;
        _this.customNodeFactory = customNodeFactory;
        _this.obfuscationEventEmitter = obfuscationEventEmitter;
        return _this;
    }

    _createClass(SelfDefendingCustomNodeGroup, [{
        key: "appendCustomNodes",
        value: function appendCustomNodes(blockScopeNode, stackTraceData) {
            var randomStackTraceIndex = this.getRandomStackTraceIndex(stackTraceData.length);
            this.appendCustomNodeIfExist(CustomNode_1.CustomNode.SelfDefendingUnicodeNode, function (customNode) {
                NodeAppender_1.NodeAppender.appendNodeToOptimalBlockScope(stackTraceData, blockScopeNode, customNode.getNode(), randomStackTraceIndex);
            });
            this.appendCustomNodeIfExist(CustomNode_1.CustomNode.NodeCallsControllerFunctionNode, function (customNode) {
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
            this.customNodes = new Map();
            if (!this.options.selfDefending) {
                return;
            }
            var callsControllerFunctionName = this.randomGenerator.getRandomVariableName(6);
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
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Map)], SelfDefendingCustomNodeGroup.prototype, "customNodes", void 0);
SelfDefendingCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])], SelfDefendingCustomNodeGroup);
exports.SelfDefendingCustomNodeGroup = SelfDefendingCustomNodeGroup;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var CustomNode_1 = __webpack_require__(17);
var ObfuscationEvent_1 = __webpack_require__(13);
var AbstractCustomNodeGroup_1 = __webpack_require__(20);
var NodeAppender_1 = __webpack_require__(18);
var Utils_1 = __webpack_require__(14);
var StringArrayCustomNodeGroup = function (_AbstractCustomNodeGr) {
    _inherits(StringArrayCustomNodeGroup, _AbstractCustomNodeGr);

    function StringArrayCustomNodeGroup(customNodeFactory, obfuscationEventEmitter, randomGenerator, stringArrayStorage, options) {
        _classCallCheck(this, StringArrayCustomNodeGroup);

        var _this = _possibleConstructorReturn(this, (StringArrayCustomNodeGroup.__proto__ || Object.getPrototypeOf(StringArrayCustomNodeGroup)).call(this, randomGenerator, options));

        _this.appendEvent = ObfuscationEvent_1.ObfuscationEvent.AfterObfuscation;
        _this.customNodeFactory = customNodeFactory;
        _this.obfuscationEventEmitter = obfuscationEventEmitter;
        _this.stringArrayStorage = stringArrayStorage;
        return _this;
    }

    _createClass(StringArrayCustomNodeGroup, [{
        key: "appendCustomNodes",
        value: function appendCustomNodes(blockScopeNode, stackTraceData) {
            if (!this.stringArrayStorage.getLength()) {
                return;
            }
            this.appendCustomNodeIfExist(CustomNode_1.CustomNode.StringArrayNode, function (customNode) {
                NodeAppender_1.NodeAppender.prependNode(blockScopeNode, customNode.getNode());
            });
            this.appendCustomNodeIfExist(CustomNode_1.CustomNode.StringArrayCallsWrapper, function (customNode) {
                NodeAppender_1.NodeAppender.insertNodeAtIndex(blockScopeNode, customNode.getNode(), 1);
            });
            this.appendCustomNodeIfExist(CustomNode_1.CustomNode.StringArrayRotateFunctionNode, function (customNode) {
                NodeAppender_1.NodeAppender.insertNodeAtIndex(blockScopeNode, customNode.getNode(), 1);
            });
        }
    }, {
        key: "initialize",
        value: function initialize() {
            this.customNodes = new Map();
            if (!this.options.stringArray) {
                return;
            }
            var stringArrayNode = this.customNodeFactory(CustomNode_1.CustomNode.StringArrayNode);
            var stringArrayCallsWrapper = this.customNodeFactory(CustomNode_1.CustomNode.StringArrayCallsWrapper);
            var stringArrayRotateFunctionNode = this.customNodeFactory(CustomNode_1.CustomNode.StringArrayRotateFunctionNode);
            var stringArrayStorageId = this.stringArrayStorage.getStorageId();
            var stringArrayName = "_" + Utils_1.Utils.hexadecimalPrefix + stringArrayStorageId;
            var stringArrayCallsWrapperName = "_" + Utils_1.Utils.hexadecimalPrefix + Utils_1.Utils.stringRotate(stringArrayStorageId, 1);
            var stringArrayRotateValue = void 0;
            if (this.options.rotateStringArray) {
                stringArrayRotateValue = this.randomGenerator.getRandomInteger(100, 500);
            } else {
                stringArrayRotateValue = 0;
            }
            stringArrayNode.initialize(this.stringArrayStorage, stringArrayName, stringArrayRotateValue);
            stringArrayCallsWrapper.initialize(this.stringArrayStorage, stringArrayName, stringArrayCallsWrapperName);
            stringArrayRotateFunctionNode.initialize(this.stringArrayStorage, stringArrayName, stringArrayRotateValue);
            this.customNodes.set(CustomNode_1.CustomNode.StringArrayNode, stringArrayNode);
            this.customNodes.set(CustomNode_1.CustomNode.StringArrayCallsWrapper, stringArrayCallsWrapper);
            if (this.options.rotateStringArray) {
                this.customNodes.set(CustomNode_1.CustomNode.StringArrayRotateFunctionNode, stringArrayRotateFunctionNode);
            }
        }
    }]);

    return StringArrayCustomNodeGroup;
}(AbstractCustomNodeGroup_1.AbstractCustomNodeGroup);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Map)], StringArrayCustomNodeGroup.prototype, "customNodes", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], StringArrayCustomNodeGroup.prototype, "stringArrayStorage", void 0);
StringArrayCustomNodeGroup = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TStringArrayStorage)), tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object, Object])], StringArrayCustomNodeGroup);
exports.StringArrayCustomNodeGroup = StringArrayCustomNodeGroup;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var JSFuck;
(function (JSFuck) {
    JSFuck["False"] = "![]";
    JSFuck["True"] = "!![]";
    JSFuck["a"] = "(false+\"\")[1]";
    JSFuck["b"] = "([][\"entries\"]()+\"\")[2]";
    JSFuck["c"] = "([][\"fill\"]+\"\")[3]";
    JSFuck["d"] = "(undefined+\"\")[2]";
    JSFuck["e"] = "(true+\"\")[3]";
    JSFuck["f"] = "(false+\"\")[0]";
    JSFuck["g"] = "(false+[0]+String)[20]";
    JSFuck["h"] = "(+(101))[\"toString\"](21)[1]";
    JSFuck["i"] = "([false]+undefined)[10]";
    JSFuck["j"] = "([][\"entries\"]()+\"\")[3]";
    JSFuck["k"] = "(+(20))[\"toString\"](21)";
    JSFuck["l"] = "(false+\"\")[2]";
    JSFuck["m"] = "(Number+\"\")[11]";
    JSFuck["n"] = "(undefined+\"\")[1]";
    JSFuck["o"] = "(true+[][\"fill\"])[10]";
    JSFuck["p"] = "(+(211))[\"toString\"](31)[1]";
    JSFuck["q"] = "(+(212))[\"toString\"](31)[1]";
    JSFuck["r"] = "(true+\"\")[1]";
    JSFuck["s"] = "(false+\"\")[3]";
    JSFuck["t"] = "(true+\"\")[0]";
    JSFuck["u"] = "(undefined+\"\")[0]";
    JSFuck["v"] = "(+(31))[\"toString\"](32)";
    JSFuck["w"] = "(+(32))[\"toString\"](33)";
    JSFuck["x"] = "(+(101))[\"toString\"](34)[1]";
    JSFuck["y"] = "(NaN+[Infinity])[10]";
    JSFuck["z"] = "(+(35))[\"toString\"](36)";
    JSFuck["A"] = "(+[]+Array)[10]";
    JSFuck["B"] = "(+[]+Boolean)[10]";
    JSFuck["C"] = "Function(\"return escape\")()((\"\")[\"italics\"]())[2]";
    JSFuck["D"] = "Function(\"return escape\")()([][\"fill\"])[\"slice\"](\"-1\")";
    JSFuck["E"] = "(RegExp+\"\")[12]";
    JSFuck["F"] = "(+[]+Function)[10]";
    JSFuck["G"] = "(false+Function(\"return Date\")()())[30]";
    JSFuck["H"] = "'H'";
    JSFuck["I"] = "(Infinity+\"\")[0]";
    JSFuck["J"] = "'J'";
    JSFuck["K"] = "'K'";
    JSFuck["L"] = "'L'";
    JSFuck["M"] = "(true+Function(\"return Date\")()())[30]";
    JSFuck["N"] = "(NaN+\"\")[0]";
    JSFuck["O"] = "(NaN+Function(\"return{}\")())[11]";
    JSFuck["P"] = "'P'";
    JSFuck["Q"] = "'Q'";
    JSFuck["R"] = "(+[]+RegExp)[10]";
    JSFuck["S"] = "(+[]+String)[10]";
    JSFuck["T"] = "(NaN+Function(\"return Date\")()())[30]";
    JSFuck["U"] = "(NaN+Function(\"return{}\")()[\"toString\"][\"call\"]())[11]";
    JSFuck["V"] = "'V'";
    JSFuck["W"] = "'W'";
    JSFuck["X"] = "'X'";
    JSFuck["Y"] = "'Y'";
    JSFuck["Z"] = "'Z'";
})(JSFuck = exports.JSFuck || (exports.JSFuck = {}));

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var AbstractCustomNode_1 = __webpack_require__(6);
var Nodes_1 = __webpack_require__(7);
var NodeUtils_1 = __webpack_require__(3);
var BinaryExpressionFunctionNode = function (_AbstractCustomNode_) {
    _inherits(BinaryExpressionFunctionNode, _AbstractCustomNode_);

    function BinaryExpressionFunctionNode(randomGenerator, options) {
        _classCallCheck(this, BinaryExpressionFunctionNode);

        var _this = _possibleConstructorReturn(this, (BinaryExpressionFunctionNode.__proto__ || Object.getPrototypeOf(BinaryExpressionFunctionNode)).call(this, options));

        _this.randomGenerator = randomGenerator;
        return _this;
    }

    _createClass(BinaryExpressionFunctionNode, [{
        key: "initialize",
        value: function initialize(operator) {
            this.operator = operator;
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var structure = Nodes_1.Nodes.getFunctionDeclarationNode(this.randomGenerator.getRandomString(3), [Nodes_1.Nodes.getIdentifierNode('x'), Nodes_1.Nodes.getIdentifierNode('y')], Nodes_1.Nodes.getBlockStatementNode([Nodes_1.Nodes.getReturnStatementNode(Nodes_1.Nodes.getBinaryExpressionNode(this.operator, Nodes_1.Nodes.getIdentifierNode('x'), Nodes_1.Nodes.getIdentifierNode('y')))]));
            NodeUtils_1.NodeUtils.parentize(structure);
            return [structure];
        }
    }]);

    return BinaryExpressionFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], BinaryExpressionFunctionNode.prototype, "operator", void 0);
BinaryExpressionFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], BinaryExpressionFunctionNode);
exports.BinaryExpressionFunctionNode = BinaryExpressionFunctionNode;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var AbstractCustomNode_1 = __webpack_require__(6);
var Nodes_1 = __webpack_require__(7);
var NodeUtils_1 = __webpack_require__(3);
var BlockStatementControlFlowFlatteningNode = function (_AbstractCustomNode_) {
    _inherits(BlockStatementControlFlowFlatteningNode, _AbstractCustomNode_);

    function BlockStatementControlFlowFlatteningNode(randomGenerator, options) {
        _classCallCheck(this, BlockStatementControlFlowFlatteningNode);

        var _this = _possibleConstructorReturn(this, (BlockStatementControlFlowFlatteningNode.__proto__ || Object.getPrototypeOf(BlockStatementControlFlowFlatteningNode)).call(this, options));

        _this.randomGenerator = randomGenerator;
        return _this;
    }

    _createClass(BlockStatementControlFlowFlatteningNode, [{
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

            var controllerIdentifierName = this.randomGenerator.getRandomString(3);
            var indexIdentifierName = this.randomGenerator.getRandomString(3);
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
BlockStatementControlFlowFlatteningNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], BlockStatementControlFlowFlatteningNode);
exports.BlockStatementControlFlowFlatteningNode = BlockStatementControlFlowFlatteningNode;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var AbstractCustomNode_1 = __webpack_require__(6);
var Nodes_1 = __webpack_require__(7);
var NodeUtils_1 = __webpack_require__(3);
var CallExpressionControlFlowStorageCallNode = function (_AbstractCustomNode_) {
    _inherits(CallExpressionControlFlowStorageCallNode, _AbstractCustomNode_);

    function CallExpressionControlFlowStorageCallNode(randomGenerator, options) {
        _classCallCheck(this, CallExpressionControlFlowStorageCallNode);

        var _this = _possibleConstructorReturn(this, (CallExpressionControlFlowStorageCallNode.__proto__ || Object.getPrototypeOf(CallExpressionControlFlowStorageCallNode)).call(this, options));

        _this.randomGenerator = randomGenerator;
        return _this;
    }

    _createClass(CallExpressionControlFlowStorageCallNode, [{
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
            var structure = Nodes_1.Nodes.getExpressionStatementNode(Nodes_1.Nodes.getCallExpressionNode(Nodes_1.Nodes.getMemberExpressionNode(Nodes_1.Nodes.getIdentifierNode(this.controlFlowStorageName), Nodes_1.Nodes.getIdentifierNode(this.controlFlowStorageKey)), [this.callee].concat(_toConsumableArray(this.expressionArguments))));
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
CallExpressionControlFlowStorageCallNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], CallExpressionControlFlowStorageCallNode);
exports.CallExpressionControlFlowStorageCallNode = CallExpressionControlFlowStorageCallNode;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var AbstractCustomNode_1 = __webpack_require__(6);
var Nodes_1 = __webpack_require__(7);
var NodeUtils_1 = __webpack_require__(3);
var CallExpressionFunctionNode = function (_AbstractCustomNode_) {
    _inherits(CallExpressionFunctionNode, _AbstractCustomNode_);

    function CallExpressionFunctionNode(randomGenerator, options) {
        _classCallCheck(this, CallExpressionFunctionNode);

        var _this = _possibleConstructorReturn(this, (CallExpressionFunctionNode.__proto__ || Object.getPrototypeOf(CallExpressionFunctionNode)).call(this, options));

        _this.randomGenerator = randomGenerator;
        return _this;
    }

    _createClass(CallExpressionFunctionNode, [{
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
            var structure = Nodes_1.Nodes.getFunctionDeclarationNode(this.randomGenerator.getRandomString(3), [calleeIdentifier].concat(params), Nodes_1.Nodes.getBlockStatementNode([Nodes_1.Nodes.getReturnStatementNode(Nodes_1.Nodes.getCallExpressionNode(calleeIdentifier, params))]));
            NodeUtils_1.NodeUtils.parentize(structure);
            return [structure];
        }
    }]);

    return CallExpressionFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Array)], CallExpressionFunctionNode.prototype, "expressionArguments", void 0);
CallExpressionFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], CallExpressionFunctionNode);
exports.CallExpressionFunctionNode = CallExpressionFunctionNode;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var AbstractCustomNode_1 = __webpack_require__(6);
var Nodes_1 = __webpack_require__(7);
var NodeUtils_1 = __webpack_require__(3);
var ControlFlowStorageNode = function (_AbstractCustomNode_) {
    _inherits(ControlFlowStorageNode, _AbstractCustomNode_);

    function ControlFlowStorageNode(randomGenerator, options) {
        _classCallCheck(this, ControlFlowStorageNode);

        var _this = _possibleConstructorReturn(this, (ControlFlowStorageNode.__proto__ || Object.getPrototypeOf(ControlFlowStorageNode)).call(this, options));

        _this.randomGenerator = randomGenerator;
        return _this;
    }

    _createClass(ControlFlowStorageNode, [{
        key: "initialize",
        value: function initialize(controlFlowStorage) {
            this.controlFlowStorage = controlFlowStorage;
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var structure = Nodes_1.Nodes.getVariableDeclarationNode([Nodes_1.Nodes.getVariableDeclaratorNode(Nodes_1.Nodes.getIdentifierNode(this.controlFlowStorage.getStorageId()), Nodes_1.Nodes.getObjectExpressionNode(Array.from(this.controlFlowStorage.getStorage()).map(function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2),
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
ControlFlowStorageNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], ControlFlowStorageNode);
exports.ControlFlowStorageNode = ControlFlowStorageNode;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var format = __webpack_require__(10);
var ConsoleOutputDisableExpressionTemplate_1 = __webpack_require__(59);
var Initializable_1 = __webpack_require__(4);
var AbstractCustomNode_1 = __webpack_require__(6);
var NodeUtils_1 = __webpack_require__(3);
var ConsoleOutputDisableExpressionNode = function (_AbstractCustomNode_) {
    _inherits(ConsoleOutputDisableExpressionNode, _AbstractCustomNode_);

    function ConsoleOutputDisableExpressionNode(randomGenerator, options) {
        _classCallCheck(this, ConsoleOutputDisableExpressionNode);

        var _this = _possibleConstructorReturn(this, (ConsoleOutputDisableExpressionNode.__proto__ || Object.getPrototypeOf(ConsoleOutputDisableExpressionNode)).call(this, options));

        _this.randomGenerator = randomGenerator;
        return _this;
    }

    _createClass(ConsoleOutputDisableExpressionNode, [{
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
                consoleLogDisableFunctionName: this.randomGenerator.getRandomVariableName(6),
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            });
        }
    }]);

    return ConsoleOutputDisableExpressionNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], ConsoleOutputDisableExpressionNode.prototype, "callsControllerFunctionName", void 0);
ConsoleOutputDisableExpressionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], ConsoleOutputDisableExpressionNode);
exports.ConsoleOutputDisableExpressionNode = ConsoleOutputDisableExpressionNode;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function ConsoleOutputDisableExpressionTemplate() {
    return "\n        var {consoleLogDisableFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {            \n            var func = function () {};\n            var that;\n            \n            try { \n                var getGlobal = Function('return (function() ' + '{}.constructor(\"return this\")( )' + ');');\n                \n                that = getGlobal(); \n            } catch (e) { \n                that = window; \n            }\n                        \n            if (!that.console) {\n                that.console = (function (func){ \n                    var c = {}; \n                    \n                    c.log = func;\n                    c.warn = func; \n                    c.debug = func;\n                    c.info = func;\n                    c.error = func;\n                    c.exception = func;\n                    c.trace = func;\n                    \n                    return c; \n                })(func);\n            } else {\n                that.console.log = func;\n                that.console.warn = func; \n                that.console.debug = func;\n                that.console.info = func;\n                that.console.error = func;\n                that.console.exception = func;\n                that.console.trace = func;\n            }\n        });\n        \n        {consoleLogDisableFunctionName}();\n    ";
}
exports.ConsoleOutputDisableExpressionTemplate = ConsoleOutputDisableExpressionTemplate;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var format = __webpack_require__(10);
var Initializable_1 = __webpack_require__(4);
var DebufProtectionFunctionCallTemplate_1 = __webpack_require__(61);
var AbstractCustomNode_1 = __webpack_require__(6);
var NodeUtils_1 = __webpack_require__(3);
var DebugProtectionFunctionCallNode = function (_AbstractCustomNode_) {
    _inherits(DebugProtectionFunctionCallNode, _AbstractCustomNode_);

    function DebugProtectionFunctionCallNode(options) {
        _classCallCheck(this, DebugProtectionFunctionCallNode);

        return _possibleConstructorReturn(this, (DebugProtectionFunctionCallNode.__proto__ || Object.getPrototypeOf(DebugProtectionFunctionCallNode)).call(this, options));
    }

    _createClass(DebugProtectionFunctionCallNode, [{
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function DebugProtectionFunctionCallTemplate() {
    return "{debugProtectionFunctionName}();";
}
exports.DebugProtectionFunctionCallTemplate = DebugProtectionFunctionCallTemplate;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var format = __webpack_require__(10);
var Initializable_1 = __webpack_require__(4);
var DebugProtectionFunctionIntervalTemplate_1 = __webpack_require__(63);
var AbstractCustomNode_1 = __webpack_require__(6);
var NodeUtils_1 = __webpack_require__(3);
var DebugProtectionFunctionIntervalNode = function (_AbstractCustomNode_) {
    _inherits(DebugProtectionFunctionIntervalNode, _AbstractCustomNode_);

    function DebugProtectionFunctionIntervalNode(options) {
        _classCallCheck(this, DebugProtectionFunctionIntervalNode);

        return _possibleConstructorReturn(this, (DebugProtectionFunctionIntervalNode.__proto__ || Object.getPrototypeOf(DebugProtectionFunctionIntervalNode)).call(this, options));
    }

    _createClass(DebugProtectionFunctionIntervalNode, [{
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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function DebugProtectionFunctionIntervalTemplate() {
    return "\n        setInterval(function () {\n            {debugProtectionFunctionName}();\n        }, 4000);\n    ";
}
exports.DebugProtectionFunctionIntervalTemplate = DebugProtectionFunctionIntervalTemplate;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var format = __webpack_require__(10);
var Initializable_1 = __webpack_require__(4);
var DebugProtectionFunctionTemplate_1 = __webpack_require__(65);
var AbstractCustomNode_1 = __webpack_require__(6);
var NodeUtils_1 = __webpack_require__(3);
var DebugProtectionFunctionNode = function (_AbstractCustomNode_) {
    _inherits(DebugProtectionFunctionNode, _AbstractCustomNode_);

    function DebugProtectionFunctionNode(options) {
        _classCallCheck(this, DebugProtectionFunctionNode);

        return _possibleConstructorReturn(this, (DebugProtectionFunctionNode.__proto__ || Object.getPrototypeOf(DebugProtectionFunctionNode)).call(this, options));
    }

    _createClass(DebugProtectionFunctionNode, [{
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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function DebugProtectionFunctionTemplate() {
    return "\n        var {debugProtectionFunctionName} = function () {\n            function debuggerProtection (counter) {\n                if (('' + counter / counter)['length'] !== 1 || counter % 20 === 0) {\n                    (function () {}.constructor('debugger')());\n                } else {\n                    (function () {}.constructor('debugger')());\n                }\n                \n                debuggerProtection(++counter);\n            }\n            \n            try {\n                debuggerProtection(0);\n            } catch (y) {}\n        };\n    ";
}
exports.DebugProtectionFunctionTemplate = DebugProtectionFunctionTemplate;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var format = __webpack_require__(10);
var Initializable_1 = __webpack_require__(4);
var DomainLockNodeTemplate_1 = __webpack_require__(67);
var AbstractCustomNode_1 = __webpack_require__(6);
var NodeUtils_1 = __webpack_require__(3);
var DomainLockNode = function (_AbstractCustomNode_) {
    _inherits(DomainLockNode, _AbstractCustomNode_);

    function DomainLockNode(randomGenerator, cryptUtils, options) {
        _classCallCheck(this, DomainLockNode);

        var _this = _possibleConstructorReturn(this, (DomainLockNode.__proto__ || Object.getPrototypeOf(DomainLockNode)).call(this, options));

        _this.randomGenerator = randomGenerator;
        _this.cryptUtils = cryptUtils;
        return _this;
    }

    _createClass(DomainLockNode, [{
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

            var _cryptUtils$hideStrin = this.cryptUtils.hideString(domainsString, domainsString.length * 3),
                _cryptUtils$hideStrin2 = _slicedToArray(_cryptUtils$hideStrin, 2),
                hiddenDomainsString = _cryptUtils$hideStrin2[0],
                diff = _cryptUtils$hideStrin2[1];

            return format(DomainLockNodeTemplate_1.DomainLockNodeTemplate(), {
                domainLockFunctionName: this.randomGenerator.getRandomVariableName(6),
                diff: diff,
                domains: hiddenDomainsString,
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            });
        }
    }]);

    return DomainLockNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], DomainLockNode.prototype, "callsControllerFunctionName", void 0);
DomainLockNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object, Object])], DomainLockNode);
exports.DomainLockNode = DomainLockNode;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function DomainLockNodeTemplate() {
    return "\n        var {domainLockFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {\n            var getGlobal = function () {\n                var globalObject;\n            \n                try {                     \n                    globalObject = Function('return (function() ' + '{}.constructor(\"return this\")( )' + ');')(); \n                } catch (e) { \n                    globalObject = window; \n                }\n                \n                return globalObject;\n            };\n            var that = getGlobal();\n            var func = function () { \n                return {\n                    key: 'item',\n                    value: 'attribute',\n                    getAttribute: function () {\n                        for (var i = 0; i < 1000; i--) {\n                            var isPositive = i > 0;\n                            \n                            switch (isPositive) {\n                                case true:\n                                    return this.item + '_' + this.value + '_' + i;\n                                default:\n                                    this.item + '_' + this.value;\n                            }\n                        }\n                    }()\n                };\n            };\n                        \n            var regExp = new RegExp(\"[{diff}]\", \"g\");\n            var domains = \"{domains}\".replace(regExp, \"\").split(\";\");\n            var document;\n            var domain;\n                        \n            for (var d in that) {\n                if (d.length == 8 && d.charCodeAt(7) == 116 && d.charCodeAt(5) == 101 && d.charCodeAt(3) == 117 && d.charCodeAt(0) == 100) {\n                    document = d;\n                \n                    break;\n                }\n            }\n\n            for (var d1 in that[document]) {\n                if (d1.length == 6 && d1.charCodeAt(5) == 110 && d1.charCodeAt(0) == 100) {\n                    domain = d1;\n                    \n                    break;\n                }\n            }\n            \n            if ((!document && !domain) || (!that[document] && !that[document][domain])) {\n                return;\n            }\n            \n            var currentDomain = that[document][domain];\n\n            var ok = false;\n                        \n            for (var i = 0; i < domains.length; i++) {\n                var domain = domains[i];\n                var position = currentDomain.length - domain.length;\n                var lastIndex = currentDomain.indexOf(domain, position);\n                var endsWith = lastIndex !== -1 && lastIndex === position;\n                \n                if (endsWith) {\n                    if (currentDomain.length == domain.length || domain.indexOf(\".\") === 0) {\n                        ok = true;\n                    }\n                    \n                    break;\n                }\n            }\n               \n            if (!ok) {\n                data;\n            } else {\n                return;\n            }\n            \n            func();\n        });\n\n        {domainLockFunctionName}();\n    ";
}
exports.DomainLockNodeTemplate = DomainLockNodeTemplate;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var AbstractCustomNode_1 = __webpack_require__(6);
var Nodes_1 = __webpack_require__(7);
var NodeUtils_1 = __webpack_require__(3);
var ExpressionWithOperatorControlFlowStorageCallNode = function (_AbstractCustomNode_) {
    _inherits(ExpressionWithOperatorControlFlowStorageCallNode, _AbstractCustomNode_);

    function ExpressionWithOperatorControlFlowStorageCallNode(randomGenerator, options) {
        _classCallCheck(this, ExpressionWithOperatorControlFlowStorageCallNode);

        var _this = _possibleConstructorReturn(this, (ExpressionWithOperatorControlFlowStorageCallNode.__proto__ || Object.getPrototypeOf(ExpressionWithOperatorControlFlowStorageCallNode)).call(this, options));

        _this.randomGenerator = randomGenerator;
        return _this;
    }

    _createClass(ExpressionWithOperatorControlFlowStorageCallNode, [{
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
ExpressionWithOperatorControlFlowStorageCallNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], ExpressionWithOperatorControlFlowStorageCallNode);
exports.ExpressionWithOperatorControlFlowStorageCallNode = ExpressionWithOperatorControlFlowStorageCallNode;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var AbstractCustomNode_1 = __webpack_require__(6);
var Nodes_1 = __webpack_require__(7);
var NodeUtils_1 = __webpack_require__(3);
var LogicalExpressionFunctionNode = function (_AbstractCustomNode_) {
    _inherits(LogicalExpressionFunctionNode, _AbstractCustomNode_);

    function LogicalExpressionFunctionNode(randomGenerator, options) {
        _classCallCheck(this, LogicalExpressionFunctionNode);

        var _this = _possibleConstructorReturn(this, (LogicalExpressionFunctionNode.__proto__ || Object.getPrototypeOf(LogicalExpressionFunctionNode)).call(this, options));

        _this.randomGenerator = randomGenerator;
        return _this;
    }

    _createClass(LogicalExpressionFunctionNode, [{
        key: "initialize",
        value: function initialize(operator) {
            this.operator = operator;
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var structure = Nodes_1.Nodes.getFunctionDeclarationNode(this.randomGenerator.getRandomString(3), [Nodes_1.Nodes.getIdentifierNode('x'), Nodes_1.Nodes.getIdentifierNode('y')], Nodes_1.Nodes.getBlockStatementNode([Nodes_1.Nodes.getReturnStatementNode(Nodes_1.Nodes.getLogicalExpressionNode(this.operator, Nodes_1.Nodes.getIdentifierNode('x'), Nodes_1.Nodes.getIdentifierNode('y')))]));
            NodeUtils_1.NodeUtils.parentize(structure);
            return [structure];
        }
    }]);

    return LogicalExpressionFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], LogicalExpressionFunctionNode.prototype, "operator", void 0);
LogicalExpressionFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], LogicalExpressionFunctionNode);
exports.LogicalExpressionFunctionNode = LogicalExpressionFunctionNode;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var format = __webpack_require__(10);
var ObfuscationEvent_1 = __webpack_require__(13);
var Initializable_1 = __webpack_require__(4);
var SingleNodeCallControllerTemplate_1 = __webpack_require__(71);
var NoCustomNodes_1 = __webpack_require__(21);
var AbstractCustomNode_1 = __webpack_require__(6);
var JavaScriptObfuscator_1 = __webpack_require__(15);
var NodeUtils_1 = __webpack_require__(3);
var NodeCallsControllerFunctionNode = function (_AbstractCustomNode_) {
    _inherits(NodeCallsControllerFunctionNode, _AbstractCustomNode_);

    function NodeCallsControllerFunctionNode(options) {
        _classCallCheck(this, NodeCallsControllerFunctionNode);

        return _possibleConstructorReturn(this, (NodeCallsControllerFunctionNode.__proto__ || Object.getPrototypeOf(NodeCallsControllerFunctionNode)).call(this, options));
    }

    _createClass(NodeCallsControllerFunctionNode, [{
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
                return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(format(SingleNodeCallControllerTemplate_1.SingleNodeCallControllerTemplate(), {
                    singleNodeCallControllerFunctionName: this.callsControllerFunctionName
                }), Object.assign({}, NoCustomNodes_1.NO_CUSTOM_NODES_PRESET, { seed: this.options.seed })).getObfuscatedCode();
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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function SingleNodeCallControllerTemplate() {
    return "\n        var {singleNodeCallControllerFunctionName} = (function(){\n            var firstCall = true;\n            \n            return function (context, fn){\t\n                var rfn = firstCall ? function(){\n                    if(fn){\n                        var res = fn.apply(context, arguments);\n                        fn = null;\n                        return res;\n                    }\n                } : function(){}\n                \n                firstCall = false;\n                \n                return rfn;\n            }\n        })();\n    ";
}
exports.SingleNodeCallControllerTemplate = SingleNodeCallControllerTemplate;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var format = __webpack_require__(10);
var Initializable_1 = __webpack_require__(4);
var NoCustomNodes_1 = __webpack_require__(21);
var SelfDefendingTemplate_1 = __webpack_require__(73);
var AbstractCustomNode_1 = __webpack_require__(6);
var JavaScriptObfuscator_1 = __webpack_require__(15);
var NodeUtils_1 = __webpack_require__(3);
var SelfDefendingUnicodeNode = function (_AbstractCustomNode_) {
    _inherits(SelfDefendingUnicodeNode, _AbstractCustomNode_);

    function SelfDefendingUnicodeNode(randomGenerator, escapeSequenceEncoder, options) {
        _classCallCheck(this, SelfDefendingUnicodeNode);

        var _this = _possibleConstructorReturn(this, (SelfDefendingUnicodeNode.__proto__ || Object.getPrototypeOf(SelfDefendingUnicodeNode)).call(this, options));

        _this.randomGenerator = randomGenerator;
        _this.escapeSequenceEncoder = escapeSequenceEncoder;
        return _this;
    }

    _createClass(SelfDefendingUnicodeNode, [{
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
            return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(format(SelfDefendingTemplate_1.SelfDefendingTemplate(this.escapeSequenceEncoder), {
                selfDefendingFunctionName: this.randomGenerator.getRandomVariableName(6),
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            }), Object.assign({}, NoCustomNodes_1.NO_CUSTOM_NODES_PRESET, { seed: this.options.seed, unicodeEscapeSequence: true })).getObfuscatedCode();
        }
    }]);

    return SelfDefendingUnicodeNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], SelfDefendingUnicodeNode.prototype, "callsControllerFunctionName", void 0);
SelfDefendingUnicodeNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object, Object])], SelfDefendingUnicodeNode);
exports.SelfDefendingUnicodeNode = SelfDefendingUnicodeNode;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function SelfDefendingTemplate(escapeSequenceEncoder) {
    return "\n        var {selfDefendingFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {\n            var func1 = function(){return 'dev';},\n                func2 = function () {\n                    return 'window';\n                };\n                \n            var test1 = function () {\n                var regExp = new RegExp('" + escapeSequenceEncoder.encode("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}", true) + "');\n                \n                return !regExp.test(func1.toString());\n            };\n            \n            var test2 = function () {\n                var regExp = new RegExp('" + escapeSequenceEncoder.encode("(\\\\[x|u](\\w){2,4})+", true) + "');\n                \n                return regExp.test(func2.toString());\n            };\n            \n            var recursiveFunc1 = function (string) {\n                var i = ~-1 >> 1 + 255 % 0;\n                                \n                if (string.indexOf('i' === i)) {\n                    recursiveFunc2(string)\n                }\n            };\n            \n            var recursiveFunc2 = function (string) {\n                var i = ~-4 >> 1 + 255 % 0;\n                \n                if (string.indexOf((true+\"\")[3]) !== i) {\n                    recursiveFunc1(string)\n                }\n            };\n            \n            if (!test1()) {\n                if (!test2()) {\n                    recursiveFunc1('ind\u0435xOf');\n                } else {\n                    recursiveFunc1('indexOf');\n                }\n            } else {\n                recursiveFunc1('ind\u0435xOf');\n            }\n        })\n        \n        {selfDefendingFunctionName}();\n    ";
}
exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var format = __webpack_require__(10);
var StringArrayEncoding_1 = __webpack_require__(26);
var Initializable_1 = __webpack_require__(4);
var NoCustomNodes_1 = __webpack_require__(21);
var AtobTemplate_1 = __webpack_require__(75);
var Rc4Template_1 = __webpack_require__(76);
var SelfDefendingTemplate_1 = __webpack_require__(77);
var StringArrayBase64DecodeNodeTemplate_1 = __webpack_require__(78);
var StringArrayCallsWrapperTemplate_1 = __webpack_require__(79);
var StringArrayRC4DecodeNodeTemplate_1 = __webpack_require__(80);
var AbstractCustomNode_1 = __webpack_require__(6);
var JavaScriptObfuscator_1 = __webpack_require__(15);
var NodeUtils_1 = __webpack_require__(3);
var StringArrayCallsWrapper = function (_AbstractCustomNode_) {
    _inherits(StringArrayCallsWrapper, _AbstractCustomNode_);

    function StringArrayCallsWrapper(escapeSequenceEncoder, options) {
        _classCallCheck(this, StringArrayCallsWrapper);

        var _this = _possibleConstructorReturn(this, (StringArrayCallsWrapper.__proto__ || Object.getPrototypeOf(StringArrayCallsWrapper)).call(this, options));

        _this.escapeSequenceEncoder = escapeSequenceEncoder;
        return _this;
    }

    _createClass(StringArrayCallsWrapper, [{
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
            }), Object.assign({}, NoCustomNodes_1.NO_CUSTOM_NODES_PRESET, { seed: this.options.seed })).getObfuscatedCode();
        }
    }, {
        key: "getDecodeStringArrayTemplate",
        value: function getDecodeStringArrayTemplate() {
            var decodeStringArrayTemplate = '',
                selfDefendingCode = '';
            if (this.options.selfDefending) {
                selfDefendingCode = format(SelfDefendingTemplate_1.SelfDefendingTemplate(this.escapeSequenceEncoder), {
                    stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
                    stringArrayName: this.stringArrayName
                });
            }
            switch (this.options.stringArrayEncoding) {
                case StringArrayEncoding_1.StringArrayEncoding.Rc4:
                    decodeStringArrayTemplate = format(StringArrayRC4DecodeNodeTemplate_1.StringArrayRc4DecodeNodeTemplate(), {
                        atobPolyfill: AtobTemplate_1.AtobTemplate(),
                        rc4Polyfill: Rc4Template_1.Rc4Template(),
                        selfDefendingCode: selfDefendingCode,
                        stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                    });
                    break;
                case StringArrayEncoding_1.StringArrayEncoding.Base64:
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
StringArrayCallsWrapper = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], StringArrayCallsWrapper);
exports.StringArrayCallsWrapper = StringArrayCallsWrapper;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function AtobTemplate() {
    return "\n        (function () {\n            var object;\n            \n            try { \n                var getGlobal = Function('return (function() ' + '{}.constructor(\"return this\")( )' + ');');\n                \n                object = getGlobal(); \n            } catch (e) { \n                object = window; \n            }\n            \n            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n\n            object.atob || (\n                object.atob = function(input) {\n                    var str = String(input).replace(/=+$/, '');\n                    for (\n                        var bc = 0, bs, buffer, idx = 0, output = '';\n                        buffer = str.charAt(idx++);\n                        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,\n                            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0\n                    ) {\n                        buffer = chars.indexOf(buffer);\n                    }\n                return output;\n            });\n        })();\n    ";
}
exports.AtobTemplate = AtobTemplate;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function Rc4Template() {
    return "\n        var rc4 = function (str, key) {\n            var s = [], j = 0, x, res = '', newStr = '';\n           \n            str = atob(str);\n                \n            for (var k = 0, length = str.length; k < length; k++) {\n                newStr += '%' + ('00' + str.charCodeAt(k).toString(16)).slice(-2);\n            }\n        \n            str = decodeURIComponent(newStr);\n                    \t        \n\t        for (var i = 0; i < 256; i++) {\n                s[i] = i;\n            }\n \n            for (i = 0; i < 256; i++) {\n                j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;\n                x = s[i];\n                s[i] = s[j];\n                s[j] = x;\n            }\n            \n            i = 0;\n            j = 0;\n            \n            for (var y = 0; y < str.length; y++) {\n                i = (i + 1) % 256;\n                j = (j + s[i]) % 256;\n                x = s[i];\n                s[i] = s[j];\n                s[j] = x;\n                res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);\n            }\n                      \n            return res;\n        }\n    ";
}
exports.Rc4Template = Rc4Template;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function SelfDefendingTemplate(escapeSequenceEncoder) {
    return "\n        var StatesClass = function (rc4Bytes) {\n            this.rc4Bytes = rc4Bytes;\n            this.states = [1, 0, 0];\n            this.newState = function(){return 'newState';};\n            this.firstState = '" + escapeSequenceEncoder.encode("\\w+ *\\(\\) *{\\w+ *", true) + "';\n            this.secondState = '" + escapeSequenceEncoder.encode("['|\"].+['|\"];? *}", true) + "';\n        };\n        \n        StatesClass.prototype.checkState = function () {\n            var regExp = new RegExp(this.firstState + this.secondState);\n\n            return this.runState(regExp.test(this.newState.toString()) ? --this.states[1] : --this.states[0]);\n        };\n        \n        StatesClass.prototype.runState = function (stateResult) {\n            if (!Boolean(~stateResult)) {\n                return stateResult;\n            }\n            \n            return this.getState(this.rc4Bytes);\n        };\n\n        StatesClass.prototype.getState = function (rc4Bytes) {\n            for (var i = 0, len = this.states.length; i < len; i++) {\n                this.states.push(Math.round(Math.random()));\n                len = this.states.length;\n            }\n            \n            return rc4Bytes(this.states[0]);\n        };\n\n        new StatesClass({stringArrayCallsWrapperName}).checkState();\n    ";
}
exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function StringArrayBase64DecodeNodeTemplate() {
    return "      \n        if ({stringArrayCallsWrapperName}.initialized === undefined) {\n            {atobPolyfill}\n            \n            {stringArrayCallsWrapperName}.base64DecodeUnicode = function (str) {\n                var string = atob(str);\n                var newStringChars = [];\n                \n                for (var i = 0, length = string.length; i < length; i++) {\n                    newStringChars += '%' + ('00' + string.charCodeAt(i).toString(16)).slice(-2);\n                }\n                \n                return decodeURIComponent(newStringChars);\n            };\n            \n            {stringArrayCallsWrapperName}.data = {};\n            \n            {stringArrayCallsWrapperName}.initialized = true;\n        }\n                  \n        var cachedValue = {stringArrayCallsWrapperName}.data[index];\n                        \n        if (cachedValue === undefined) {\n            {selfDefendingCode}\n            \n            value = {stringArrayCallsWrapperName}.base64DecodeUnicode(value);\n            {stringArrayCallsWrapperName}.data[index] = value;\n        } else {\n            value = cachedValue;\n        }  \n    ";
}
exports.StringArrayBase64DecodeNodeTemplate = StringArrayBase64DecodeNodeTemplate;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function StringArrayCallsWrapperTemplate() {
    return "\n        var {stringArrayCallsWrapperName} = function (index, key) {\n            index = index - 0;\n            \n            var value = {stringArrayName}[index];\n            \n            {decodeNodeTemplate}\n        \n            return value;\n        };\n    ";
}
exports.StringArrayCallsWrapperTemplate = StringArrayCallsWrapperTemplate;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function StringArrayRc4DecodeNodeTemplate() {
    return "\n        if ({stringArrayCallsWrapperName}.initialized === undefined) {\n            {atobPolyfill}\n            \n            {rc4Polyfill}\n            {stringArrayCallsWrapperName}.rc4 = rc4;\n            \n            {stringArrayCallsWrapperName}.data = {};\n            \n            {stringArrayCallsWrapperName}.initialized = true;\n        }\n  \n        var cachedValue = {stringArrayCallsWrapperName}.data[index];\n\n        if (cachedValue === undefined) {\n            if ({stringArrayCallsWrapperName}.once === undefined) {\n                {selfDefendingCode}\n                \n                {stringArrayCallsWrapperName}.once = true;\n            }\n            \n            value = {stringArrayCallsWrapperName}.rc4(value, key);\n            {stringArrayCallsWrapperName}.data[index] = value;\n        } else {\n            value = cachedValue;\n        }\n    ";
}
exports.StringArrayRc4DecodeNodeTemplate = StringArrayRc4DecodeNodeTemplate;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = (function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } });

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var format = __webpack_require__(10);
var Initializable_1 = __webpack_require__(4);
var StringArrayTemplate_1 = __webpack_require__(82);
var AbstractCustomNode_1 = __webpack_require__(6);
var NodeUtils_1 = __webpack_require__(3);
var StringArrayNode = function (_AbstractCustomNode_) {
    _inherits(StringArrayNode, _AbstractCustomNode_);

    function StringArrayNode(options) {
        _classCallCheck(this, StringArrayNode);

        return _possibleConstructorReturn(this, (StringArrayNode.__proto__ || Object.getPrototypeOf(StringArrayNode)).call(this, options));
    }

    _createClass(StringArrayNode, [{
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
            return _get(StringArrayNode.prototype.__proto__ || Object.getPrototypeOf(StringArrayNode.prototype), "getNode", this).call(this);
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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function StringArrayTemplate() {
    return "\n        var {stringArrayName} = [{stringArray}];\n    ";
}
exports.StringArrayTemplate = StringArrayTemplate;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var format = __webpack_require__(10);
var Initializable_1 = __webpack_require__(4);
var NoCustomNodes_1 = __webpack_require__(21);
var SelfDefendingTemplate_1 = __webpack_require__(84);
var StringArrayRotateFunctionTemplate_1 = __webpack_require__(85);
var AbstractCustomNode_1 = __webpack_require__(6);
var JavaScriptObfuscator_1 = __webpack_require__(15);
var NodeUtils_1 = __webpack_require__(3);
var Utils_1 = __webpack_require__(14);
var StringArrayRotateFunctionNode = function (_AbstractCustomNode_) {
    _inherits(StringArrayRotateFunctionNode, _AbstractCustomNode_);

    function StringArrayRotateFunctionNode(randomGenerator, escapeSequenceEncoder, options) {
        _classCallCheck(this, StringArrayRotateFunctionNode);

        var _this = _possibleConstructorReturn(this, (StringArrayRotateFunctionNode.__proto__ || Object.getPrototypeOf(StringArrayRotateFunctionNode)).call(this, options));

        _this.randomGenerator = randomGenerator;
        _this.escapeSequenceEncoder = escapeSequenceEncoder;
        return _this;
    }

    _createClass(StringArrayRotateFunctionNode, [{
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
            var timesName = this.randomGenerator.getRandomVariableName(6);
            var whileFunctionName = this.randomGenerator.getRandomVariableName(6);
            var code = '';
            if (this.options.selfDefending) {
                code = format(SelfDefendingTemplate_1.SelfDefendingTemplate(this.escapeSequenceEncoder), {
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
            }), Object.assign({}, NoCustomNodes_1.NO_CUSTOM_NODES_PRESET, { seed: this.options.seed })).getObfuscatedCode();
        }
    }]);

    return StringArrayRotateFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Object)], StringArrayRotateFunctionNode.prototype, "stringArrayStorage", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], StringArrayRotateFunctionNode.prototype, "stringArrayName", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", Number)], StringArrayRotateFunctionNode.prototype, "stringArrayRotateValue", void 0);
StringArrayRotateFunctionNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object, Object])], StringArrayRotateFunctionNode);
exports.StringArrayRotateFunctionNode = StringArrayRotateFunctionNode;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function SelfDefendingTemplate(escapeSequenceEncoder) {
    return "\n        var selfDefendingFunc = function () {            \n            var object = {\n                data: {\n                    key: 'cookie',\n                    value: 'timeout'\n                },\n                setCookie: function (options, name, value, document) {\n                    document = document || {};\n                    \n                    var updatedCookie = name + \"=\" + value;\n\n                    var i = 0;\n                                                            \n                    for (var i = 0, len = options.length; i < len; i++) {                          \n                        var propName = options[i];\n                                     \n                        updatedCookie += \"; \" + propName;\n                        \n                        var propValue = options[propName];\n                        \n                        options.push(propValue);\n                        len = options.length;\n                                                                        \n                        if (propValue !== true) {\n                            updatedCookie += \"=\" + propValue;\n                        }\n                    }\n\n                    document['cookie'] = updatedCookie;\n                },\n                removeCookie: function(){return 'dev';},\n                getCookie: function (document, name) {    \n                    document = document || function (value) { return value };\n                    var matches = document(new RegExp(\n                        \"(?:^|; )\" + name.replace(/([.$?*|{}()[]\\/+^])/g, '\\$1') + \"=([^;]*)\"\n                    ));\n                    \n                    var func = function (param1, param2) {\n                        param1(++param2);\n                    };\n                    \n                    func({whileFunctionName}, {timesName});\n                                        \n                    return matches ? decodeURIComponent(matches[1]) : undefined;\n                }\n            };\n            \n            var test1 = function () {\n                var regExp = new RegExp('" + escapeSequenceEncoder.encode("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}", true) + "');\n                \n                return regExp.test(object.removeCookie.toString());\n            };\n            \n            object['updateCookie'] = test1;\n            \n            var cookie = '';\n            var result = object['updateCookie']();\n                                    \n            if (!result) {\n                object['setCookie'](['*'], 'counter', 1);\n            } else if (result) {\n                cookie = object['getCookie'](null, 'counter');     \n            } else {\n                object['removeCookie']();\n            }\n        };\n        \n        selfDefendingFunc();\n    ";
}
exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
function StringArrayRotateFunctionTemplate() {
    return "\n        (function (array, {timesName}) {\n            var {whileFunctionName} = function (times) {\n                while (--times) {\n                    array['push'](array['shift']());\n                }\n            };\n            \n            {code}\n        })({stringArrayName}, 0x{stringArrayRotateValue});\n    ";
}
exports.StringArrayRotateFunctionTemplate = StringArrayRotateFunctionTemplate;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var AbstractCustomNode_1 = __webpack_require__(6);
var Nodes_1 = __webpack_require__(7);
var NodeUtils_1 = __webpack_require__(3);
var StringLiteralControlFlowStorageCallNode = function (_AbstractCustomNode_) {
    _inherits(StringLiteralControlFlowStorageCallNode, _AbstractCustomNode_);

    function StringLiteralControlFlowStorageCallNode(randomGenerator, options) {
        _classCallCheck(this, StringLiteralControlFlowStorageCallNode);

        var _this = _possibleConstructorReturn(this, (StringLiteralControlFlowStorageCallNode.__proto__ || Object.getPrototypeOf(StringLiteralControlFlowStorageCallNode)).call(this, options));

        _this.randomGenerator = randomGenerator;
        return _this;
    }

    _createClass(StringLiteralControlFlowStorageCallNode, [{
        key: "initialize",
        value: function initialize(controlFlowStorageName, controlFlowStorageKey) {
            this.controlFlowStorageName = controlFlowStorageName;
            this.controlFlowStorageKey = controlFlowStorageKey;
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var structure = Nodes_1.Nodes.getExpressionStatementNode(Nodes_1.Nodes.getMemberExpressionNode(Nodes_1.Nodes.getIdentifierNode(this.controlFlowStorageName), Nodes_1.Nodes.getIdentifierNode(this.controlFlowStorageKey)));
            NodeUtils_1.NodeUtils.parentize(structure);
            return [structure];
        }
    }]);

    return StringLiteralControlFlowStorageCallNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], StringLiteralControlFlowStorageCallNode.prototype, "controlFlowStorageKey", void 0);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], StringLiteralControlFlowStorageCallNode.prototype, "controlFlowStorageName", void 0);
StringLiteralControlFlowStorageCallNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], StringLiteralControlFlowStorageCallNode);
exports.StringLiteralControlFlowStorageCallNode = StringLiteralControlFlowStorageCallNode;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var AbstractCustomNode_1 = __webpack_require__(6);
var Nodes_1 = __webpack_require__(7);
var StringLiteralNode = function (_AbstractCustomNode_) {
    _inherits(StringLiteralNode, _AbstractCustomNode_);

    function StringLiteralNode(randomGenerator, options) {
        _classCallCheck(this, StringLiteralNode);

        var _this = _possibleConstructorReturn(this, (StringLiteralNode.__proto__ || Object.getPrototypeOf(StringLiteralNode)).call(this, options));

        _this.randomGenerator = randomGenerator;
        return _this;
    }

    _createClass(StringLiteralNode, [{
        key: "initialize",
        value: function initialize(literalValue) {
            this.literalValue = literalValue;
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var structure = Nodes_1.Nodes.getLiteralNode(this.literalValue);
            return [structure];
        }
    }]);

    return StringLiteralNode;
}(AbstractCustomNode_1.AbstractCustomNode);
tslib_1.__decorate([Initializable_1.initializable(), tslib_1.__metadata("design:type", String)], StringLiteralNode.prototype, "literalValue", void 0);
StringLiteralNode = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], StringLiteralNode);
exports.StringLiteralNode = StringLiteralNode;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var InversifyContainerFacade_1 = __webpack_require__(16);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var IdentifierObfuscatingReplacer_1 = __webpack_require__(19);
var LiteralObfuscatingReplacer_1 = __webpack_require__(34);
var BaseIdentifierObfuscatingReplacer_1 = __webpack_require__(89);
var BooleanLiteralObfuscatingReplacer_1 = __webpack_require__(90);
var NumberLiteralObfuscatingReplacer_1 = __webpack_require__(91);
var StringLiteralObfuscatingReplacer_1 = __webpack_require__(92);
exports.obfuscatingTransformersModule = new inversify_1.ContainerModule(function (bind) {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatingReplacer).to(BooleanLiteralObfuscatingReplacer_1.BooleanLiteralObfuscatingReplacer).whenTargetNamed(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.BooleanLiteralObfuscatingReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatingReplacer).to(NumberLiteralObfuscatingReplacer_1.NumberLiteralObfuscatingReplacer).whenTargetNamed(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.NumberLiteralObfuscatingReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatingReplacer).to(StringLiteralObfuscatingReplacer_1.StringLiteralObfuscatingReplacer).whenTargetNamed(LiteralObfuscatingReplacer_1.LiteralObfuscatingReplacer.StringLiteralObfuscatingReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IIdentifierObfuscatingReplacer).to(BaseIdentifierObfuscatingReplacer_1.BaseIdentifierObfuscatingReplacer).whenTargetNamed(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatingReplacer).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscatingReplacer));
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.IIdentifierObfuscatingReplacer));
});

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var AbstractObfuscatingReplacer_1 = __webpack_require__(23);
var Nodes_1 = __webpack_require__(7);
var BaseIdentifierObfuscatingReplacer = function (_AbstractObfuscatingR) {
    _inherits(BaseIdentifierObfuscatingReplacer, _AbstractObfuscatingR);

    function BaseIdentifierObfuscatingReplacer(randomGenerator, options) {
        _classCallCheck(this, BaseIdentifierObfuscatingReplacer);

        var _this = _possibleConstructorReturn(this, (BaseIdentifierObfuscatingReplacer.__proto__ || Object.getPrototypeOf(BaseIdentifierObfuscatingReplacer)).call(this, options));

        _this.namesMap = new Map();
        _this.randomGenerator = randomGenerator;
        return _this;
    }

    _createClass(BaseIdentifierObfuscatingReplacer, [{
        key: "replace",
        value: function replace(nodeValue, nodeIdentifier) {
            var mapKey = nodeValue + "-" + String(nodeIdentifier);
            if (this.namesMap.has(mapKey)) {
                nodeValue = this.namesMap.get(mapKey);
            }
            return Nodes_1.Nodes.getIdentifierNode(nodeValue);
        }
    }, {
        key: "storeNames",
        value: function storeNames(nodeName, nodeIdentifier) {
            if (!this.isReservedName(nodeName)) {
                this.namesMap.set(nodeName + "-" + String(nodeIdentifier), this.randomGenerator.getRandomVariableName(6));
            }
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
BaseIdentifierObfuscatingReplacer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], BaseIdentifierObfuscatingReplacer);
exports.BaseIdentifierObfuscatingReplacer = BaseIdentifierObfuscatingReplacer;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var AbstractObfuscatingReplacer_1 = __webpack_require__(23);
var Nodes_1 = __webpack_require__(7);
var BooleanLiteralObfuscatingReplacer = BooleanLiteralObfuscatingReplacer_1 = function (_AbstractObfuscatingR) {
    _inherits(BooleanLiteralObfuscatingReplacer, _AbstractObfuscatingR);

    function BooleanLiteralObfuscatingReplacer(options) {
        _classCallCheck(this, BooleanLiteralObfuscatingReplacer);

        return _possibleConstructorReturn(this, (BooleanLiteralObfuscatingReplacer.__proto__ || Object.getPrototypeOf(BooleanLiteralObfuscatingReplacer)).call(this, options));
    }

    _createClass(BooleanLiteralObfuscatingReplacer, [{
        key: "replace",
        value: function replace(nodeValue) {
            return nodeValue ? BooleanLiteralObfuscatingReplacer_1.getTrueUnaryExpressionNode() : BooleanLiteralObfuscatingReplacer_1.getFalseUnaryExpressionNode();
        }
    }], [{
        key: "getTrueUnaryExpressionNode",
        value: function getTrueUnaryExpressionNode() {
            return Nodes_1.Nodes.getUnaryExpressionNode('!', BooleanLiteralObfuscatingReplacer_1.getFalseUnaryExpressionNode());
        }
    }, {
        key: "getFalseUnaryExpressionNode",
        value: function getFalseUnaryExpressionNode() {
            return Nodes_1.Nodes.getUnaryExpressionNode('!', Nodes_1.Nodes.getArrayExpressionNode());
        }
    }]);

    return BooleanLiteralObfuscatingReplacer;
}(AbstractObfuscatingReplacer_1.AbstractObfuscatingReplacer);
BooleanLiteralObfuscatingReplacer = BooleanLiteralObfuscatingReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], BooleanLiteralObfuscatingReplacer);
exports.BooleanLiteralObfuscatingReplacer = BooleanLiteralObfuscatingReplacer;
var BooleanLiteralObfuscatingReplacer_1;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var AbstractObfuscatingReplacer_1 = __webpack_require__(23);
var Nodes_1 = __webpack_require__(7);
var Utils_1 = __webpack_require__(14);
var NumberLiteralObfuscatingReplacer = function (_AbstractObfuscatingR) {
    _inherits(NumberLiteralObfuscatingReplacer, _AbstractObfuscatingR);

    function NumberLiteralObfuscatingReplacer(options) {
        _classCallCheck(this, NumberLiteralObfuscatingReplacer);

        var _this = _possibleConstructorReturn(this, (NumberLiteralObfuscatingReplacer.__proto__ || Object.getPrototypeOf(NumberLiteralObfuscatingReplacer)).call(this, options));

        _this.numberLiteralCache = new Map();
        return _this;
    }

    _createClass(NumberLiteralObfuscatingReplacer, [{
        key: "replace",
        value: function replace(nodeValue) {
            var rawValue = void 0;
            if (this.numberLiteralCache.has(nodeValue)) {
                rawValue = this.numberLiteralCache.get(nodeValue);
            } else {
                if (!Utils_1.Utils.isCeilNumber(nodeValue)) {
                    rawValue = String(nodeValue);
                } else {
                    rawValue = "" + Utils_1.Utils.hexadecimalPrefix + Utils_1.Utils.decToHex(nodeValue);
                }
                this.numberLiteralCache.set(nodeValue, rawValue);
            }
            return Nodes_1.Nodes.getLiteralNode(nodeValue, rawValue);
        }
    }]);

    return NumberLiteralObfuscatingReplacer;
}(AbstractObfuscatingReplacer_1.AbstractObfuscatingReplacer);
NumberLiteralObfuscatingReplacer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object])], NumberLiteralObfuscatingReplacer);
exports.NumberLiteralObfuscatingReplacer = NumberLiteralObfuscatingReplacer;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var StringArrayEncoding_1 = __webpack_require__(26);
var AbstractObfuscatingReplacer_1 = __webpack_require__(23);
var Nodes_1 = __webpack_require__(7);
var Utils_1 = __webpack_require__(14);
var StringLiteralObfuscatingReplacer = StringLiteralObfuscatingReplacer_1 = function (_AbstractObfuscatingR) {
    _inherits(StringLiteralObfuscatingReplacer, _AbstractObfuscatingR);

    function StringLiteralObfuscatingReplacer(customNodeGroupStorage, stringArrayStorage, escapeSequenceEncoder, randomGenerator, cryptUtils, options) {
        _classCallCheck(this, StringLiteralObfuscatingReplacer);

        var _this = _possibleConstructorReturn(this, (StringLiteralObfuscatingReplacer.__proto__ || Object.getPrototypeOf(StringLiteralObfuscatingReplacer)).call(this, options));

        _this.nodesCache = new Map();
        _this.stringLiteralHexadecimalIndexCache = new Map();
        _this.customNodeGroupStorage = customNodeGroupStorage;
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

    _createClass(StringLiteralObfuscatingReplacer, [{
        key: "replace",
        value: function replace(nodeValue) {
            var useStringArray = this.canUseStringArray(nodeValue);
            var cacheKey = nodeValue + "-" + String(useStringArray);
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
            var hexadecimalRawIndex = Utils_1.Utils.decToHex(stringArrayStorageLength);
            var hexadecimalIndex = "" + Utils_1.Utils.hexadecimalPrefix + hexadecimalRawIndex;
            this.stringLiteralHexadecimalIndexCache.set(value, hexadecimalIndex);
            return {
                fromCache: false,
                index: hexadecimalIndex
            };
        }
    }, {
        key: "getEncodedValue",
        value: function getEncodedValue(value) {
            var encodedValue = void 0,
                key = null;
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
            return { encodedValue: encodedValue, key: key };
        }
    }, {
        key: "replaceWithLiteralNode",
        value: function replaceWithLiteralNode(value) {
            return Nodes_1.Nodes.getLiteralNode(this.escapeSequenceEncoder.encode(value, this.options.unicodeEscapeSequence));
        }
    }, {
        key: "replaceWithStringArrayCallNode",
        value: function replaceWithStringArrayCallNode(value) {
            var _getEncodedValue = this.getEncodedValue(value),
                encodedValue = _getEncodedValue.encodedValue,
                key = _getEncodedValue.key;

            var escapedValue = this.escapeSequenceEncoder.encode(encodedValue, this.options.unicodeEscapeSequence);
            var stringArrayStorageLength = this.stringArrayStorage.getLength();
            var rotatedStringArrayStorageId = Utils_1.Utils.stringRotate(this.stringArrayStorage.getStorageId(), 1);
            var stringArrayStorageCallsWrapperName = "_" + Utils_1.Utils.hexadecimalPrefix + rotatedStringArrayStorageId;

            var _getStringArrayHexade = this.getStringArrayHexadecimalIndex(escapedValue, stringArrayStorageLength),
                fromCache = _getStringArrayHexade.fromCache,
                index = _getStringArrayHexade.index;

            if (!fromCache) {
                this.stringArrayStorage.set(stringArrayStorageLength, escapedValue);
            }
            var callExpressionArgs = [StringLiteralObfuscatingReplacer_1.getHexadecimalLiteralNode(index)];
            if (key) {
                callExpressionArgs.push(StringLiteralObfuscatingReplacer_1.getRc4KeyLiteralNode(this.escapeSequenceEncoder.encode(key, this.options.unicodeEscapeSequence)));
            }
            return Nodes_1.Nodes.getCallExpressionNode(Nodes_1.Nodes.getIdentifierNode(stringArrayStorageCallsWrapperName), callExpressionArgs);
        }
    }], [{
        key: "getHexadecimalLiteralNode",
        value: function getHexadecimalLiteralNode(hexadecimalIndex) {
            var hexadecimalLiteralNode = Nodes_1.Nodes.getLiteralNode(hexadecimalIndex);
            hexadecimalLiteralNode.obfuscatedNode = true;
            return hexadecimalLiteralNode;
        }
    }, {
        key: "getRc4KeyLiteralNode",
        value: function getRc4KeyLiteralNode(literalValue) {
            var rc4KeyLiteralNode = Nodes_1.Nodes.getLiteralNode(literalValue);
            rc4KeyLiteralNode.obfuscatedNode = true;
            return rc4KeyLiteralNode;
        }
    }]);

    return StringLiteralObfuscatingReplacer;
}(AbstractObfuscatingReplacer_1.AbstractObfuscatingReplacer);
StringLiteralObfuscatingReplacer.minimumLengthForStringArray = 3;
StringLiteralObfuscatingReplacer.rc4KeyLength = 4;
StringLiteralObfuscatingReplacer.rc4KeysCount = 50;
StringLiteralObfuscatingReplacer = StringLiteralObfuscatingReplacer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TCustomNodeGroupStorage)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TStringArrayStorage)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils)), tslib_1.__param(5, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])], StringLiteralObfuscatingReplacer);
exports.StringLiteralObfuscatingReplacer = StringLiteralObfuscatingReplacer;
var StringLiteralObfuscatingReplacer_1;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var InversifyContainerFacade_1 = __webpack_require__(16);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var NodeTransformer_1 = __webpack_require__(35);
var FunctionControlFlowTransformer_1 = __webpack_require__(94);
var BlockStatementControlFlowTransformer_1 = __webpack_require__(95);
var DeadCodeInjectionTransformer_1 = __webpack_require__(96);
var CatchClauseTransformer_1 = __webpack_require__(97);
var FunctionDeclarationTransformer_1 = __webpack_require__(98);
var FunctionTransformer_1 = __webpack_require__(99);
var LabeledStatementTransformer_1 = __webpack_require__(100);
var LiteralTransformer_1 = __webpack_require__(101);
var MemberExpressionTransformer_1 = __webpack_require__(102);
var MethodDefinitionTransformer_1 = __webpack_require__(103);
var ObjectExpressionTransformer_1 = __webpack_require__(104);
var TemplateLiteralTransformer_1 = __webpack_require__(105);
var VariableDeclarationTransformer_1 = __webpack_require__(106);
exports.nodeTransformersModule = new inversify_1.ContainerModule(function (bind) {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(BlockStatementControlFlowTransformer_1.BlockStatementControlFlowTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.BlockStatementControlFlowTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(DeadCodeInjectionTransformer_1.DeadCodeInjectionTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.DeadCodeInjectionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(FunctionControlFlowTransformer_1.FunctionControlFlowTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.FunctionControlFlowTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(MemberExpressionTransformer_1.MemberExpressionTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.MemberExpressionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(MethodDefinitionTransformer_1.MethodDefinitionTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.MethodDefinitionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(TemplateLiteralTransformer_1.TemplateLiteralTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.TemplateLiteralTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(CatchClauseTransformer_1.CatchClauseTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.CatchClauseTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(FunctionDeclarationTransformer_1.FunctionDeclarationTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.FunctionDeclarationTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(FunctionTransformer_1.FunctionTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.FunctionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(LabeledStatementTransformer_1.LabeledStatementTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.LabeledStatementTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(LiteralTransformer_1.LiteralTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.LiteralTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(ObjectExpressionTransformer_1.ObjectExpressionTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.ObjectExpressionTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer).to(VariableDeclarationTransformer_1.VariableDeclarationTransformer).whenTargetNamed(NodeTransformer_1.NodeTransformer.VariableDeclarationTransformer);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeTransformer).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.INodeTransformer));
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var estraverse = __webpack_require__(8);
var ControlFlowCustomNode_1 = __webpack_require__(12);
var NodeType_1 = __webpack_require__(11);
var AbstractNodeTransformer_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(5);
var NodeAppender_1 = __webpack_require__(18);
var ControlFlowReplacer_1 = __webpack_require__(30);
var NodeUtils_1 = __webpack_require__(3);
var FunctionControlFlowTransformer = FunctionControlFlowTransformer_1 = function (_AbstractNodeTransfor) {
    _inherits(FunctionControlFlowTransformer, _AbstractNodeTransfor);

    function FunctionControlFlowTransformer(controlFlowStorageFactory, controlFlowReplacerFactory, controlFlowCustomNodeFactory, randomGenerator, options) {
        _classCallCheck(this, FunctionControlFlowTransformer);

        var _this = _possibleConstructorReturn(this, (FunctionControlFlowTransformer.__proto__ || Object.getPrototypeOf(FunctionControlFlowTransformer)).call(this, randomGenerator, options));

        _this.controlFlowData = new Map();
        _this.visitedFunctionNodes = new Set();
        _this.hostNodesWithControlFlowNode = new Set();
        _this.controlFlowStorageFactory = controlFlowStorageFactory;
        _this.controlFlowReplacerFactory = controlFlowReplacerFactory;
        _this.controlFlowCustomNodeFactory = controlFlowCustomNodeFactory;
        return _this;
    }

    _createClass(FunctionControlFlowTransformer, [{
        key: "getVisitor",
        value: function getVisitor() {
            var _this2 = this;

            return {
                leave: function leave(node, parentNode) {
                    if (Node_1.Node.isFunctionDeclarationNode(node) || Node_1.Node.isFunctionExpressionNode(node) || Node_1.Node.isArrowFunctionExpressionNode(node)) {
                        return _this2.transformNode(node, parentNode);
                    }
                }
            };
        }
    }, {
        key: "transformNode",
        value: function transformNode(functionNode, parentNode) {
            this.visitedFunctionNodes.add(functionNode);
            if (!Node_1.Node.isBlockStatementNode(functionNode.body)) {
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
            NodeAppender_1.NodeAppender.prependNode(hostNode, controlFlowStorageCustomNode.getNode());
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
            return (Node_1.Node.isFunctionDeclarationNode(node) || Node_1.Node.isFunctionExpressionNode(node) || Node_1.Node.isArrowFunctionExpressionNode(node)) && this.visitedFunctionNodes.has(node);
        }
    }, {
        key: "transformFunctionBody",
        value: function transformFunctionBody(functionNodeBody, controlFlowStorage) {
            var _this3 = this;

            estraverse.replace(functionNodeBody, {
                enter: function enter(node, parentNode) {
                    if (_this3.isVisitedFunctionNode(node)) {
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
                    return Object.assign({}, _this3.controlFlowReplacerFactory(controlFlowReplacerName).replace(node, parentNode, controlFlowStorage), { parentNode: parentNode });
                }
            });
        }
    }]);

    return FunctionControlFlowTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
FunctionControlFlowTransformer.controlFlowReplacersMap = new Map([[NodeType_1.NodeType.BinaryExpression, ControlFlowReplacer_1.ControlFlowReplacer.BinaryExpressionControlFlowReplacer], [NodeType_1.NodeType.CallExpression, ControlFlowReplacer_1.ControlFlowReplacer.CallExpressionControlFlowReplacer], [NodeType_1.NodeType.LogicalExpression, ControlFlowReplacer_1.ControlFlowReplacer.LogicalExpressionControlFlowReplacer], [NodeType_1.NodeType.Literal, ControlFlowReplacer_1.ControlFlowReplacer.StringLiteralControlFlowReplacer]]);
FunctionControlFlowTransformer.hostNodeSearchMinDepth = 0;
FunctionControlFlowTransformer.hostNodeSearchMaxDepth = 2;
FunctionControlFlowTransformer = FunctionControlFlowTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__TControlFlowStorage)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowReplacer)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Function, Function, Object, Object])], FunctionControlFlowTransformer);
exports.FunctionControlFlowTransformer = FunctionControlFlowTransformer;
var FunctionControlFlowTransformer_1;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var ControlFlowCustomNode_1 = __webpack_require__(12);
var AbstractNodeTransformer_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(5);
var BlockStatementControlFlowTransformer = BlockStatementControlFlowTransformer_1 = function (_AbstractNodeTransfor) {
    _inherits(BlockStatementControlFlowTransformer, _AbstractNodeTransfor);

    function BlockStatementControlFlowTransformer(controlFlowCustomNodeFactory, arrayUtils, randomGenerator, options) {
        _classCallCheck(this, BlockStatementControlFlowTransformer);

        var _this = _possibleConstructorReturn(this, (BlockStatementControlFlowTransformer.__proto__ || Object.getPrototypeOf(BlockStatementControlFlowTransformer)).call(this, randomGenerator, options));

        _this.controlFlowCustomNodeFactory = controlFlowCustomNodeFactory;
        _this.arrayUtils = arrayUtils;
        return _this;
    }

    _createClass(BlockStatementControlFlowTransformer, [{
        key: "getVisitor",
        value: function getVisitor() {
            var _this2 = this;

            return {
                leave: function leave(node, parentNode) {
                    if (Node_1.Node.isBlockStatementNode(node)) {
                        return _this2.transformNode(node, parentNode);
                    }
                }
            };
        }
    }, {
        key: "transformNode",
        value: function transformNode(blockStatementNode, parentNode) {
            if (this.randomGenerator.getMathRandom() > this.options.controlFlowFlatteningThreshold || BlockStatementControlFlowTransformer_1.blockStatementHasProhibitedStatements(blockStatementNode)) {
                return blockStatementNode;
            }
            var blockStatementBody = blockStatementNode.body;
            if (blockStatementBody.length <= 4) {
                return blockStatementNode;
            }
            var originalKeys = this.arrayUtils.arrayRange(blockStatementBody.length);
            var shuffledKeys = this.arrayUtils.arrayShuffle(originalKeys);
            var originalKeysIndexesInShuffledArray = originalKeys.map(function (key) {
                return shuffledKeys.indexOf(key);
            });
            var blockStatementControlFlowFlatteningCustomNode = this.controlFlowCustomNodeFactory(ControlFlowCustomNode_1.ControlFlowCustomNode.BlockStatementControlFlowFlatteningNode);
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
BlockStatementControlFlowTransformer = BlockStatementControlFlowTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IControlFlowCustomNode)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IArrayUtils)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object, Object])], BlockStatementControlFlowTransformer);
exports.BlockStatementControlFlowTransformer = BlockStatementControlFlowTransformer;
var BlockStatementControlFlowTransformer_1;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var estraverse = __webpack_require__(8);
var AbstractNodeTransformer_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(5);
var Nodes_1 = __webpack_require__(7);
var NodeUtils_1 = __webpack_require__(3);
var DeadCodeInjectionTransformer = DeadCodeInjectionTransformer_1 = function (_AbstractNodeTransfor) {
    _inherits(DeadCodeInjectionTransformer, _AbstractNodeTransfor);

    function DeadCodeInjectionTransformer(randomGenerator, options) {
        _classCallCheck(this, DeadCodeInjectionTransformer);

        var _this = _possibleConstructorReturn(this, (DeadCodeInjectionTransformer.__proto__ || Object.getPrototypeOf(DeadCodeInjectionTransformer)).call(this, randomGenerator, options));

        _this.collectedBlockStatements = [];
        return _this;
    }

    _createClass(DeadCodeInjectionTransformer, [{
        key: "getVisitor",
        value: function getVisitor() {
            var _this2 = this;

            return {
                leave: function leave(node, parentNode) {
                    if (Node_1.Node.isProgramNode(node)) {
                        return _this2.transformNode(node, parentNode);
                    }
                }
            };
        }
    }, {
        key: "transformNode",
        value: function transformNode(programNode, parentNode) {
            this.transformProgramNode(programNode);
            return programNode;
        }
    }, {
        key: "collectBlockStatementNodes",
        value: function collectBlockStatementNodes(blockStatementNode, collectedBlockStatements) {
            var _this3 = this;

            var clonedBlockStatementNode = NodeUtils_1.NodeUtils.clone(blockStatementNode);
            var nestedBlockStatementsCount = 0,
                isValidBlockStatementNode = true;
            estraverse.replace(clonedBlockStatementNode, {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isBlockStatementNode(node)) {
                        nestedBlockStatementsCount++;
                    }
                    if (nestedBlockStatementsCount > DeadCodeInjectionTransformer_1.maxNestedBlockStatementsCount || Node_1.Node.isBreakStatementNode(node) || Node_1.Node.isContinueStatementNode(node)) {
                        isValidBlockStatementNode = false;
                        return estraverse.VisitorOption.Break;
                    }
                    if (Node_1.Node.isIdentifierNode(node) && !Node_1.Node.isMemberExpressionNode(parentNode)) {
                        node.name = _this3.randomGenerator.getRandomVariableName(6);
                    }
                    return node;
                }
            });
            if (!isValidBlockStatementNode) {
                return;
            }
            collectedBlockStatements.push(clonedBlockStatementNode);
        }
    }, {
        key: "replaceBlockStatementNode",
        value: function replaceBlockStatementNode(blockStatementNode, randomBlockStatementNode) {
            var random1 = this.randomGenerator.getMathRandom() > 0.5;
            var random2 = this.randomGenerator.getMathRandom() > 0.5;
            var operator = random1 ? '===' : '!==';
            var leftString = this.randomGenerator.getRandomString(3);
            var rightString = random2 ? leftString : this.randomGenerator.getRandomString(3);
            var consequent = void 0,
                alternate = void 0;
            if (random1 && random2 || !random1 && !random2) {
                consequent = blockStatementNode;
                alternate = randomBlockStatementNode;
            } else {
                consequent = randomBlockStatementNode;
                alternate = blockStatementNode;
            }
            var newBlockStatementNode = Nodes_1.Nodes.getBlockStatementNode([Nodes_1.Nodes.getIfStatementNode(Nodes_1.Nodes.getBinaryExpressionNode(operator, Nodes_1.Nodes.getLiteralNode(leftString), Nodes_1.Nodes.getLiteralNode(rightString)), consequent, alternate)]);
            newBlockStatementNode = NodeUtils_1.NodeUtils.parentize(newBlockStatementNode);
            return newBlockStatementNode;
        }
    }, {
        key: "transformProgramNode",
        value: function transformProgramNode(programNode) {
            var _this4 = this;

            estraverse.traverse(programNode, {
                enter: function enter(node, parentNode) {
                    if (!Node_1.Node.isBlockStatementNode(node)) {
                        return;
                    }
                    _this4.collectBlockStatementNodes(node, _this4.collectedBlockStatements);
                }
            });
            if (this.collectedBlockStatements.length < DeadCodeInjectionTransformer_1.minCollectedBlockStatementsCount) {
                return;
            }
            estraverse.replace(programNode, {
                leave: function leave(node, parentNode) {
                    if (!_this4.collectedBlockStatements.length) {
                        return estraverse.VisitorOption.Break;
                    }
                    if (!Node_1.Node.isBlockStatementNode(node) || _this4.randomGenerator.getMathRandom() > _this4.options.deadCodeInjectionThreshold) {
                        return node;
                    }
                    var minInteger = 0;
                    var maxInteger = _this4.collectedBlockStatements.length - 1;
                    var randomIndex = _this4.randomGenerator.getRandomInteger(minInteger, maxInteger);
                    var randomBlockStatementNode = _this4.collectedBlockStatements.splice(randomIndex, 1)[0];
                    if (randomBlockStatementNode === node) {
                        return node;
                    }
                    return _this4.replaceBlockStatementNode(node, randomBlockStatementNode);
                }
            });
        }
    }]);

    return DeadCodeInjectionTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
DeadCodeInjectionTransformer.maxNestedBlockStatementsCount = 4;
DeadCodeInjectionTransformer.minCollectedBlockStatementsCount = 5;
DeadCodeInjectionTransformer = DeadCodeInjectionTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], DeadCodeInjectionTransformer);
exports.DeadCodeInjectionTransformer = DeadCodeInjectionTransformer;
var DeadCodeInjectionTransformer_1;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var estraverse = __webpack_require__(8);
var IdentifierObfuscatingReplacer_1 = __webpack_require__(19);
var AbstractNodeTransformer_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(5);
var CatchClauseTransformer = function (_AbstractNodeTransfor) {
    _inherits(CatchClauseTransformer, _AbstractNodeTransfor);

    function CatchClauseTransformer(identifierObfuscatingReplacerFactory, randomGenerator, options) {
        _classCallCheck(this, CatchClauseTransformer);

        var _this = _possibleConstructorReturn(this, (CatchClauseTransformer.__proto__ || Object.getPrototypeOf(CatchClauseTransformer)).call(this, randomGenerator, options));

        _this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
        return _this;
    }

    _createClass(CatchClauseTransformer, [{
        key: "getVisitor",
        value: function getVisitor() {
            var _this2 = this;

            return {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isCatchClauseNode(node)) {
                        return _this2.transformNode(node, parentNode);
                    }
                }
            };
        }
    }, {
        key: "transformNode",
        value: function transformNode(catchClauseNode, parentNode) {
            var nodeIdentifier = this.nodeIdentifier++;
            this.storeCatchClauseParam(catchClauseNode, nodeIdentifier);
            this.replaceCatchClauseParam(catchClauseNode, nodeIdentifier);
            return catchClauseNode;
        }
    }, {
        key: "storeCatchClauseParam",
        value: function storeCatchClauseParam(catchClauseNode, nodeIdentifier) {
            if (Node_1.Node.isIdentifierNode(catchClauseNode.param)) {
                this.identifierObfuscatingReplacer.storeNames(catchClauseNode.param.name, nodeIdentifier);
            }
        }
    }, {
        key: "replaceCatchClauseParam",
        value: function replaceCatchClauseParam(catchClauseNode, nodeIdentifier) {
            var _this3 = this;

            estraverse.replace(catchClauseNode, {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isReplaceableIdentifierNode(node, parentNode)) {
                        var newIdentifier = _this3.identifierObfuscatingReplacer.replace(node.name, nodeIdentifier);
                        var newIdentifierName = newIdentifier.name;
                        if (node.name !== newIdentifierName) {
                            node.name = newIdentifierName;
                            node.obfuscatedNode = true;
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
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var estraverse = __webpack_require__(8);
var IdentifierObfuscatingReplacer_1 = __webpack_require__(19);
var NodeType_1 = __webpack_require__(11);
var AbstractNodeTransformer_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(5);
var NodeUtils_1 = __webpack_require__(3);
var FunctionDeclarationTransformer = function (_AbstractNodeTransfor) {
    _inherits(FunctionDeclarationTransformer, _AbstractNodeTransfor);

    function FunctionDeclarationTransformer(identifierObfuscatingReplacerFactory, randomGenerator, options) {
        _classCallCheck(this, FunctionDeclarationTransformer);

        var _this = _possibleConstructorReturn(this, (FunctionDeclarationTransformer.__proto__ || Object.getPrototypeOf(FunctionDeclarationTransformer)).call(this, randomGenerator, options));

        _this.replaceableIdentifiers = new Map();
        _this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
        return _this;
    }

    _createClass(FunctionDeclarationTransformer, [{
        key: "getVisitor",
        value: function getVisitor() {
            var _this2 = this;

            return {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isFunctionDeclarationNode(node)) {
                        return _this2.transformNode(node, parentNode);
                    }
                }
            };
        }
    }, {
        key: "transformNode",
        value: function transformNode(functionDeclarationNode, parentNode) {
            var nodeIdentifier = this.nodeIdentifier++;
            var blockScopeOfFunctionDeclarationNode = NodeUtils_1.NodeUtils.getBlockScopesOfNode(functionDeclarationNode)[0];
            if (blockScopeOfFunctionDeclarationNode.type === NodeType_1.NodeType.Program) {
                return functionDeclarationNode;
            }
            this.storeFunctionName(functionDeclarationNode, nodeIdentifier);
            if (this.replaceableIdentifiers.has(blockScopeOfFunctionDeclarationNode)) {
                this.replaceScopeCachedIdentifiers(blockScopeOfFunctionDeclarationNode, nodeIdentifier);
            } else {
                this.replaceScopeIdentifiers(blockScopeOfFunctionDeclarationNode, nodeIdentifier);
            }
            return functionDeclarationNode;
        }
    }, {
        key: "storeFunctionName",
        value: function storeFunctionName(functionDeclarationNode, nodeIdentifier) {
            this.identifierObfuscatingReplacer.storeNames(functionDeclarationNode.id.name, nodeIdentifier);
        }
    }, {
        key: "replaceScopeCachedIdentifiers",
        value: function replaceScopeCachedIdentifiers(scopeNode, nodeIdentifier) {
            var _this3 = this;

            var cachedReplaceableIdentifiers = this.replaceableIdentifiers.get(scopeNode);
            cachedReplaceableIdentifiers.forEach(function (replaceableIdentifier) {
                var newReplaceableIdentifier = _this3.identifierObfuscatingReplacer.replace(replaceableIdentifier.name, nodeIdentifier);
                replaceableIdentifier.name = newReplaceableIdentifier.name;
            });
        }
    }, {
        key: "replaceScopeIdentifiers",
        value: function replaceScopeIdentifiers(scopeNode, nodeIdentifier) {
            var _this4 = this;

            var storedReplaceableIdentifiers = [];
            estraverse.replace(scopeNode, {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isReplaceableIdentifierNode(node, parentNode)) {
                        var newIdentifier = _this4.identifierObfuscatingReplacer.replace(node.name, nodeIdentifier);
                        var newIdentifierName = newIdentifier.name;
                        if (node.name !== newIdentifierName) {
                            node.name = newIdentifierName;
                        } else {
                            storedReplaceableIdentifiers.push(node);
                        }
                    }
                }
            });
            this.replaceableIdentifiers.set(scopeNode, storedReplaceableIdentifiers);
        }
    }]);

    return FunctionDeclarationTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
FunctionDeclarationTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], FunctionDeclarationTransformer);
exports.FunctionDeclarationTransformer = FunctionDeclarationTransformer;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var estraverse = __webpack_require__(8);
var IdentifierObfuscatingReplacer_1 = __webpack_require__(19);
var AbstractNodeTransformer_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(5);
var FunctionTransformer = function (_AbstractNodeTransfor) {
    _inherits(FunctionTransformer, _AbstractNodeTransfor);

    function FunctionTransformer(identifierObfuscatingReplacerFactory, randomGenerator, options) {
        _classCallCheck(this, FunctionTransformer);

        var _this = _possibleConstructorReturn(this, (FunctionTransformer.__proto__ || Object.getPrototypeOf(FunctionTransformer)).call(this, randomGenerator, options));

        _this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
        return _this;
    }

    _createClass(FunctionTransformer, [{
        key: "getVisitor",
        value: function getVisitor() {
            var _this2 = this;

            return {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isFunctionDeclarationNode(node) || Node_1.Node.isFunctionExpressionNode(node) || Node_1.Node.isArrowFunctionExpressionNode(node)) {
                        return _this2.transformNode(node, parentNode);
                    }
                }
            };
        }
    }, {
        key: "transformNode",
        value: function transformNode(functionNode, parentNode) {
            var nodeIdentifier = this.nodeIdentifier++;
            this.storeFunctionParams(functionNode, nodeIdentifier);
            this.replaceFunctionParams(functionNode, nodeIdentifier);
            return functionNode;
        }
    }, {
        key: "storeFunctionParams",
        value: function storeFunctionParams(functionNode, nodeIdentifier) {
            var _this3 = this;

            functionNode.params.forEach(function (paramsNode) {
                if (Node_1.Node.isObjectPatternNode(paramsNode)) {
                    return estraverse.VisitorOption.Skip;
                }
                estraverse.traverse(paramsNode, {
                    enter: function enter(node) {
                        if (Node_1.Node.isAssignmentPatternNode(node) && Node_1.Node.isIdentifierNode(node.left)) {
                            _this3.identifierObfuscatingReplacer.storeNames(node.left.name, nodeIdentifier);
                            return estraverse.VisitorOption.Skip;
                        }
                        if (Node_1.Node.isIdentifierNode(node)) {
                            _this3.identifierObfuscatingReplacer.storeNames(node.name, nodeIdentifier);
                        }
                    }
                });
            });
        }
    }, {
        key: "replaceFunctionParams",
        value: function replaceFunctionParams(functionNode, nodeIdentifier) {
            var _this4 = this;

            var replaceVisitor = {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isReplaceableIdentifierNode(node, parentNode)) {
                        var newIdentifier = _this4.identifierObfuscatingReplacer.replace(node.name, nodeIdentifier);
                        var newIdentifierName = newIdentifier.name;
                        if (node.name !== newIdentifierName) {
                            node.name = newIdentifierName;
                            node.obfuscatedNode = true;
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
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var estraverse = __webpack_require__(8);
var IdentifierObfuscatingReplacer_1 = __webpack_require__(19);
var AbstractNodeTransformer_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(5);
var LabeledStatementTransformer = function (_AbstractNodeTransfor) {
    _inherits(LabeledStatementTransformer, _AbstractNodeTransfor);

    function LabeledStatementTransformer(identifierObfuscatingReplacerFactory, randomGenerator, options) {
        _classCallCheck(this, LabeledStatementTransformer);

        var _this = _possibleConstructorReturn(this, (LabeledStatementTransformer.__proto__ || Object.getPrototypeOf(LabeledStatementTransformer)).call(this, randomGenerator, options));

        _this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
        return _this;
    }

    _createClass(LabeledStatementTransformer, [{
        key: "getVisitor",
        value: function getVisitor() {
            var _this2 = this;

            return {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isLabeledStatementNode(node)) {
                        return _this2.transformNode(node, parentNode);
                    }
                }
            };
        }
    }, {
        key: "transformNode",
        value: function transformNode(labeledStatementNode, parentNode) {
            var nodeIdentifier = this.nodeIdentifier++;
            this.storeLabeledStatementName(labeledStatementNode, nodeIdentifier);
            this.replaceLabeledStatementName(labeledStatementNode, nodeIdentifier);
            return labeledStatementNode;
        }
    }, {
        key: "storeLabeledStatementName",
        value: function storeLabeledStatementName(labeledStatementNode, nodeIdentifier) {
            this.identifierObfuscatingReplacer.storeNames(labeledStatementNode.label.name, nodeIdentifier);
        }
    }, {
        key: "replaceLabeledStatementName",
        value: function replaceLabeledStatementName(labeledStatementNode, nodeIdentifier) {
            var _this3 = this;

            estraverse.replace(labeledStatementNode, {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isLabelIdentifierNode(node, parentNode)) {
                        var newIdentifier = _this3.identifierObfuscatingReplacer.replace(node.name, nodeIdentifier);
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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var LiteralObfuscatingReplacer_1 = __webpack_require__(34);
var AbstractNodeTransformer_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(5);
var LiteralTransformer = function (_AbstractNodeTransfor) {
    _inherits(LiteralTransformer, _AbstractNodeTransfor);

    function LiteralTransformer(literalObfuscatingReplacerFactory, randomGenerator, options) {
        _classCallCheck(this, LiteralTransformer);

        var _this = _possibleConstructorReturn(this, (LiteralTransformer.__proto__ || Object.getPrototypeOf(LiteralTransformer)).call(this, randomGenerator, options));

        _this.literalObfuscatingReplacerFactory = literalObfuscatingReplacerFactory;
        return _this;
    }

    _createClass(LiteralTransformer, [{
        key: "getVisitor",
        value: function getVisitor() {
            var _this2 = this;

            return {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isLiteralNode(node) && !node.obfuscatedNode) {
                        return _this2.transformNode(node, parentNode);
                    }
                }
            };
        }
    }, {
        key: "transformNode",
        value: function transformNode(literalNode, parentNode) {
            if (Node_1.Node.isPropertyNode(parentNode) && parentNode.key === literalNode) {
                return literalNode;
            }
            switch (_typeof(literalNode.value)) {
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
    }]);

    return LiteralTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
LiteralTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscatingReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], LiteralTransformer);
exports.LiteralTransformer = LiteralTransformer;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var NodeType_1 = __webpack_require__(11);
var AbstractNodeTransformer_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(5);
var MemberExpressionTransformer = function (_AbstractNodeTransfor) {
    _inherits(MemberExpressionTransformer, _AbstractNodeTransfor);

    function MemberExpressionTransformer(randomGenerator, options) {
        _classCallCheck(this, MemberExpressionTransformer);

        return _possibleConstructorReturn(this, (MemberExpressionTransformer.__proto__ || Object.getPrototypeOf(MemberExpressionTransformer)).call(this, randomGenerator, options));
    }

    _createClass(MemberExpressionTransformer, [{
        key: "getVisitor",
        value: function getVisitor() {
            var _this2 = this;

            return {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isMemberExpressionNode(node)) {
                        return _this2.transformNode(node, parentNode);
                    }
                }
            };
        }
    }, {
        key: "transformNode",
        value: function transformNode(memberExpressionNode, parentNode) {
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
MemberExpressionTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], MemberExpressionTransformer);
exports.MemberExpressionTransformer = MemberExpressionTransformer;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var NodeType_1 = __webpack_require__(11);
var AbstractNodeTransformer_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(5);
var MethodDefinitionTransformer = MethodDefinitionTransformer_1 = function (_AbstractNodeTransfor) {
    _inherits(MethodDefinitionTransformer, _AbstractNodeTransfor);

    function MethodDefinitionTransformer(randomGenerator, options) {
        _classCallCheck(this, MethodDefinitionTransformer);

        return _possibleConstructorReturn(this, (MethodDefinitionTransformer.__proto__ || Object.getPrototypeOf(MethodDefinitionTransformer)).call(this, randomGenerator, options));
    }

    _createClass(MethodDefinitionTransformer, [{
        key: "getVisitor",
        value: function getVisitor() {
            var _this2 = this;

            return {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isMethodDefinitionNode(node)) {
                        return _this2.transformNode(node, parentNode);
                    }
                }
            };
        }
    }, {
        key: "transformNode",
        value: function transformNode(methodDefinitionNode, parentNode) {
            if (Node_1.Node.isIdentifierNode(methodDefinitionNode.key) && !(MethodDefinitionTransformer_1.ignoredNames.indexOf(methodDefinitionNode.key.name) !== -1) && methodDefinitionNode.computed === false) {
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
MethodDefinitionTransformer = MethodDefinitionTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], MethodDefinitionTransformer);
exports.MethodDefinitionTransformer = MethodDefinitionTransformer;
var MethodDefinitionTransformer_1;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var NodeType_1 = __webpack_require__(11);
var AbstractNodeTransformer_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(5);
var ObjectExpressionTransformer = ObjectExpressionTransformer_1 = function (_AbstractNodeTransfor) {
    _inherits(ObjectExpressionTransformer, _AbstractNodeTransfor);

    function ObjectExpressionTransformer(randomGenerator, options) {
        _classCallCheck(this, ObjectExpressionTransformer);

        return _possibleConstructorReturn(this, (ObjectExpressionTransformer.__proto__ || Object.getPrototypeOf(ObjectExpressionTransformer)).call(this, randomGenerator, options));
    }

    _createClass(ObjectExpressionTransformer, [{
        key: "getVisitor",
        value: function getVisitor() {
            var _this2 = this;

            return {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isObjectExpressionNode(node)) {
                        return _this2.transformNode(node, parentNode);
                    }
                }
            };
        }
    }, {
        key: "transformNode",
        value: function transformNode(objectExpressionNode, parentNode) {
            objectExpressionNode.properties.forEach(function (property) {
                if (property.shorthand) {
                    property.shorthand = false;
                }
                if (Node_1.Node.isIdentifierNode(property.key)) {
                    property.key = ObjectExpressionTransformer_1.transformIdentifierPropertyKey(property.key);
                }
            });
            return objectExpressionNode;
        }
    }], [{
        key: "transformIdentifierPropertyKey",
        value: function transformIdentifierPropertyKey(node) {
            return {
                type: NodeType_1.NodeType.Literal,
                value: node.name,
                raw: "'" + node.name + "'"
            };
        }
    }]);

    return ObjectExpressionTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
ObjectExpressionTransformer = ObjectExpressionTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], ObjectExpressionTransformer);
exports.ObjectExpressionTransformer = ObjectExpressionTransformer;
var ObjectExpressionTransformer_1;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var AbstractNodeTransformer_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(5);
var Nodes_1 = __webpack_require__(7);
var TemplateLiteralTransformer = TemplateLiteralTransformer_1 = function (_AbstractNodeTransfor) {
    _inherits(TemplateLiteralTransformer, _AbstractNodeTransfor);

    function TemplateLiteralTransformer(randomGenerator, options) {
        _classCallCheck(this, TemplateLiteralTransformer);

        return _possibleConstructorReturn(this, (TemplateLiteralTransformer.__proto__ || Object.getPrototypeOf(TemplateLiteralTransformer)).call(this, randomGenerator, options));
    }

    _createClass(TemplateLiteralTransformer, [{
        key: "getVisitor",
        value: function getVisitor() {
            var _this2 = this;

            return {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isTemplateLiteralNode(node)) {
                        return _this2.transformNode(node, parentNode);
                    }
                }
            };
        }
    }, {
        key: "transformNode",
        value: function transformNode(templateLiteralNode, parentNode) {
            var templateLiteralExpressions = templateLiteralNode.expressions;
            var nodes = [];
            templateLiteralNode.quasis.forEach(function (templateElement) {
                nodes.push(Nodes_1.Nodes.getLiteralNode(templateElement.value.cooked));
                var expression = templateLiteralExpressions.shift();
                if (!expression) {
                    return;
                }
                nodes.push(expression);
            });
            nodes = nodes.filter(function (node) {
                return !(Node_1.Node.isLiteralNode(node) && node.value === '');
            });
            if (!TemplateLiteralTransformer_1.isLiteralNodeWithStringValue(nodes[0]) && !TemplateLiteralTransformer_1.isLiteralNodeWithStringValue(nodes[1])) {
                nodes.unshift(Nodes_1.Nodes.getLiteralNode(''));
            }
            if (nodes.length > 1) {
                var root = Nodes_1.Nodes.getBinaryExpressionNode('+', nodes.shift(), nodes.shift());
                nodes.forEach(function (node) {
                    root = Nodes_1.Nodes.getBinaryExpressionNode('+', root, node);
                });
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
TemplateLiteralTransformer = TemplateLiteralTransformer_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object])], TemplateLiteralTransformer);
exports.TemplateLiteralTransformer = TemplateLiteralTransformer;
var TemplateLiteralTransformer_1;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var estraverse = __webpack_require__(8);
var IdentifierObfuscatingReplacer_1 = __webpack_require__(19);
var NodeType_1 = __webpack_require__(11);
var AbstractNodeTransformer_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(5);
var NodeUtils_1 = __webpack_require__(3);
var VariableDeclarationTransformer = function (_AbstractNodeTransfor) {
    _inherits(VariableDeclarationTransformer, _AbstractNodeTransfor);

    function VariableDeclarationTransformer(identifierObfuscatingReplacerFactory, randomGenerator, options) {
        _classCallCheck(this, VariableDeclarationTransformer);

        var _this = _possibleConstructorReturn(this, (VariableDeclarationTransformer.__proto__ || Object.getPrototypeOf(VariableDeclarationTransformer)).call(this, randomGenerator, options));

        _this.replaceableIdentifiers = new Map();
        _this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(IdentifierObfuscatingReplacer_1.IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);
        return _this;
    }

    _createClass(VariableDeclarationTransformer, [{
        key: "getVisitor",
        value: function getVisitor() {
            var _this2 = this;

            return {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isVariableDeclarationNode(node)) {
                        return _this2.transformNode(node, parentNode);
                    }
                }
            };
        }
    }, {
        key: "transformNode",
        value: function transformNode(variableDeclarationNode, parentNode) {
            var blockScopeOfVariableDeclarationNode = NodeUtils_1.NodeUtils.getBlockScopesOfNode(variableDeclarationNode)[0];
            if (blockScopeOfVariableDeclarationNode.type === NodeType_1.NodeType.Program) {
                return variableDeclarationNode;
            }
            var nodeIdentifier = this.nodeIdentifier++;
            var scopeNode = variableDeclarationNode.kind === 'var' ? blockScopeOfVariableDeclarationNode : parentNode;
            this.storeVariableNames(variableDeclarationNode, nodeIdentifier);
            if (this.replaceableIdentifiers.has(scopeNode)) {
                this.replaceScopeCachedIdentifiers(scopeNode, nodeIdentifier);
            } else {
                this.replaceScopeIdentifiers(scopeNode, nodeIdentifier);
            }
            return variableDeclarationNode;
        }
    }, {
        key: "storeVariableNames",
        value: function storeVariableNames(variableDeclarationNode, nodeIdentifier) {
            var _this3 = this;

            variableDeclarationNode.declarations.forEach(function (declarationNode) {
                if (Node_1.Node.isObjectPatternNode(declarationNode.id)) {
                    return estraverse.VisitorOption.Skip;
                }
                NodeUtils_1.NodeUtils.typedTraverse(declarationNode.id, NodeType_1.NodeType.Identifier, {
                    enter: function enter(node) {
                        return _this3.identifierObfuscatingReplacer.storeNames(node.name, nodeIdentifier);
                    }
                });
            });
        }
    }, {
        key: "replaceScopeCachedIdentifiers",
        value: function replaceScopeCachedIdentifiers(scopeNode, nodeIdentifier) {
            var _this4 = this;

            var cachedReplaceableIdentifiers = this.replaceableIdentifiers.get(scopeNode);
            cachedReplaceableIdentifiers.forEach(function (replaceableIdentifier) {
                var newReplaceableIdentifier = _this4.identifierObfuscatingReplacer.replace(replaceableIdentifier.name, nodeIdentifier);
                replaceableIdentifier.name = newReplaceableIdentifier.name;
            });
        }
    }, {
        key: "replaceScopeIdentifiers",
        value: function replaceScopeIdentifiers(scopeNode, nodeIdentifier) {
            var _this5 = this;

            var storedReplaceableIdentifiers = [];
            estraverse.replace(scopeNode, {
                enter: function enter(node, parentNode) {
                    if (!node.obfuscatedNode && Node_1.Node.isReplaceableIdentifierNode(node, parentNode)) {
                        var newIdentifier = _this5.identifierObfuscatingReplacer.replace(node.name, nodeIdentifier);
                        var newIdentifierName = newIdentifier.name;
                        if (node.name !== newIdentifierName) {
                            node.name = newIdentifierName;
                        } else {
                            storedReplaceableIdentifiers.push(node);
                        }
                    }
                }
            });
            this.replaceableIdentifiers.set(scopeNode, storedReplaceableIdentifiers);
        }
    }]);

    return VariableDeclarationTransformer;
}(AbstractNodeTransformer_1.AbstractNodeTransformer);
VariableDeclarationTransformer = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], VariableDeclarationTransformer);
exports.VariableDeclarationTransformer = VariableDeclarationTransformer;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var InversifyContainerFacade_1 = __webpack_require__(16);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var CalleeDataExtractor_1 = __webpack_require__(36);
var FunctionDeclarationCalleeDataExtractor_1 = __webpack_require__(108);
var FunctionExpressionCalleeDataExtractor_1 = __webpack_require__(109);
var ObjectExpressionCalleeDataExtractor_1 = __webpack_require__(110);
var StackTraceAnalyzer_1 = __webpack_require__(111);
exports.stackTraceAnalyzerModule = new inversify_1.ContainerModule(function (bind) {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IStackTraceAnalyzer).to(StackTraceAnalyzer_1.StackTraceAnalyzer).inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor).to(FunctionDeclarationCalleeDataExtractor_1.FunctionDeclarationCalleeDataExtractor).whenTargetNamed(CalleeDataExtractor_1.CalleeDataExtractor.FunctionDeclarationCalleeDataExtractor);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor).to(FunctionExpressionCalleeDataExtractor_1.FunctionExpressionCalleeDataExtractor).whenTargetNamed(CalleeDataExtractor_1.CalleeDataExtractor.FunctionExpressionCalleeDataExtractor);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor).to(ObjectExpressionCalleeDataExtractor_1.ObjectExpressionCalleeDataExtractor).whenTargetNamed(CalleeDataExtractor_1.CalleeDataExtractor.ObjectExpressionCalleeDataExtractor);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__ICalleeDataExtractor).toFactory(InversifyContainerFacade_1.InversifyContainerFacade.getCacheFactory(ServiceIdentifiers_1.ServiceIdentifiers.ICalleeDataExtractor));
});

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var estraverse = __webpack_require__(8);
var AbstractCalleeDataExtractor_1 = __webpack_require__(27);
var Node_1 = __webpack_require__(5);
var NodeUtils_1 = __webpack_require__(3);
var FunctionDeclarationCalleeDataExtractor = function (_AbstractCalleeDataEx) {
    _inherits(FunctionDeclarationCalleeDataExtractor, _AbstractCalleeDataEx);

    function FunctionDeclarationCalleeDataExtractor() {
        _classCallCheck(this, FunctionDeclarationCalleeDataExtractor);

        return _possibleConstructorReturn(this, (FunctionDeclarationCalleeDataExtractor.__proto__ || Object.getPrototypeOf(FunctionDeclarationCalleeDataExtractor)).apply(this, arguments));
    }

    _createClass(FunctionDeclarationCalleeDataExtractor, [{
        key: "extract",
        value: function extract(blockScopeBody, callee) {
            if (!Node_1.Node.isIdentifierNode(callee)) {
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
FunctionDeclarationCalleeDataExtractor = tslib_1.__decorate([inversify_1.injectable()], FunctionDeclarationCalleeDataExtractor);
exports.FunctionDeclarationCalleeDataExtractor = FunctionDeclarationCalleeDataExtractor;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var estraverse = __webpack_require__(8);
var AbstractCalleeDataExtractor_1 = __webpack_require__(27);
var Node_1 = __webpack_require__(5);
var NodeUtils_1 = __webpack_require__(3);
var FunctionExpressionCalleeDataExtractor = function (_AbstractCalleeDataEx) {
    _inherits(FunctionExpressionCalleeDataExtractor, _AbstractCalleeDataEx);

    function FunctionExpressionCalleeDataExtractor() {
        _classCallCheck(this, FunctionExpressionCalleeDataExtractor);

        return _possibleConstructorReturn(this, (FunctionExpressionCalleeDataExtractor.__proto__ || Object.getPrototypeOf(FunctionExpressionCalleeDataExtractor)).apply(this, arguments));
    }

    _createClass(FunctionExpressionCalleeDataExtractor, [{
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
FunctionExpressionCalleeDataExtractor = tslib_1.__decorate([inversify_1.injectable()], FunctionExpressionCalleeDataExtractor);
exports.FunctionExpressionCalleeDataExtractor = FunctionExpressionCalleeDataExtractor;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var estraverse = __webpack_require__(8);
var Node_1 = __webpack_require__(5);
var NodeUtils_1 = __webpack_require__(3);
var AbstractCalleeDataExtractor_1 = __webpack_require__(27);
var ObjectExpressionCalleeDataExtractor = function (_AbstractCalleeDataEx) {
    _inherits(ObjectExpressionCalleeDataExtractor, _AbstractCalleeDataEx);

    function ObjectExpressionCalleeDataExtractor() {
        _classCallCheck(this, ObjectExpressionCalleeDataExtractor);

        return _possibleConstructorReturn(this, (ObjectExpressionCalleeDataExtractor.__proto__ || Object.getPrototypeOf(ObjectExpressionCalleeDataExtractor)).apply(this, arguments));
    }

    _createClass(ObjectExpressionCalleeDataExtractor, [{
        key: "extract",
        value: function extract(blockScopeBody, callee) {
            if (!Node_1.Node.isMemberExpressionNode(callee)) {
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
                for (var _iterator = objectExpressionProperties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
ObjectExpressionCalleeDataExtractor = tslib_1.__decorate([inversify_1.injectable()], ObjectExpressionCalleeDataExtractor);
exports.ObjectExpressionCalleeDataExtractor = ObjectExpressionCalleeDataExtractor;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var estraverse = __webpack_require__(8);
var CalleeDataExtractor_1 = __webpack_require__(36);
var Node_1 = __webpack_require__(5);
var NodeUtils_1 = __webpack_require__(3);
var StackTraceAnalyzer = StackTraceAnalyzer_1 = function () {
    function StackTraceAnalyzer(calleeDataExtractorFactory) {
        _classCallCheck(this, StackTraceAnalyzer);

        this.calleeDataExtractorFactory = calleeDataExtractorFactory;
    }

    _createClass(StackTraceAnalyzer, [{
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
                var calleeData = _this2.calleeDataExtractorFactory(calleeDataExtractorName).extract(blockScopeBody, callExpressionNode.callee);
                if (!calleeData) {
                    return;
                }
                stackTraceData.push(Object.assign({}, calleeData, { stackTrace: _this2.analyzeRecursive(calleeData.callee.body) }));
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
var StackTraceAnalyzer_1;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var ControlFlowStorage_1 = __webpack_require__(113);
var CustomNodeGroupStorage_1 = __webpack_require__(114);
var StringArrayStorage_1 = __webpack_require__(115);
exports.storagesModule = new inversify_1.ContainerModule(function (bind) {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.TCustomNodeGroupStorage).to(CustomNodeGroupStorage_1.CustomNodeGroupStorage).inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.TStringArrayStorage).to(StringArrayStorage_1.StringArrayStorage).inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Newable__TControlFlowStorage).toConstructor(ControlFlowStorage_1.ControlFlowStorage);
    bind(ServiceIdentifiers_1.ServiceIdentifiers.Factory__TControlFlowStorage).toFactory(function (context) {
        return function () {
            var constructor = context.container.get(ServiceIdentifiers_1.ServiceIdentifiers.Newable__TControlFlowStorage);
            var randomGenerator = context.container.get(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator);
            var storage = new constructor(randomGenerator);
            storage.initialize();
            return storage;
        };
    });
});

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var MapStorage_1 = __webpack_require__(37);
var ControlFlowStorage = function (_MapStorage_1$MapStor) {
    _inherits(ControlFlowStorage, _MapStorage_1$MapStor);

    function ControlFlowStorage(randomGenerator) {
        _classCallCheck(this, ControlFlowStorage);

        return _possibleConstructorReturn(this, (ControlFlowStorage.__proto__ || Object.getPrototypeOf(ControlFlowStorage)).call(this, randomGenerator));
    }

    return ControlFlowStorage;
}(MapStorage_1.MapStorage);
ControlFlowStorage = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__metadata("design:paramtypes", [Object])], ControlFlowStorage);
exports.ControlFlowStorage = ControlFlowStorage;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var CustomNodeGroup_1 = __webpack_require__(33);
var MapStorage_1 = __webpack_require__(37);
var CustomNodeGroupStorage = CustomNodeGroupStorage_1 = function (_MapStorage_1$MapStor) {
    _inherits(CustomNodeGroupStorage, _MapStorage_1$MapStor);

    function CustomNodeGroupStorage(customNodeGroupFactory, randomGenerator, options) {
        _classCallCheck(this, CustomNodeGroupStorage);

        var _this = _possibleConstructorReturn(this, (CustomNodeGroupStorage.__proto__ || Object.getPrototypeOf(CustomNodeGroupStorage)).call(this, randomGenerator));

        _this.customNodeGroupFactory = customNodeGroupFactory;
        _this.options = options;
        return _this;
    }

    _createClass(CustomNodeGroupStorage, [{
        key: "initialize",
        value: function initialize() {
            var _this2 = this;

            this.storage = new Map();
            this.storageId = this.randomGenerator.getRandomString(6);
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
var CustomNodeGroupStorage_1;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = (function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } });

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var ArrayStorage_1 = __webpack_require__(116);
var RandomGenerator_1 = __webpack_require__(28);
var StringArrayStorage = function (_ArrayStorage_1$Array) {
    _inherits(StringArrayStorage, _ArrayStorage_1$Array);

    function StringArrayStorage(arrayUtils, randomGenerator) {
        _classCallCheck(this, StringArrayStorage);

        var _this = _possibleConstructorReturn(this, (StringArrayStorage.__proto__ || Object.getPrototypeOf(StringArrayStorage)).call(this, randomGenerator));

        _this.arrayUtils = arrayUtils;
        return _this;
    }

    _createClass(StringArrayStorage, [{
        key: "initialize",
        value: function initialize() {
            _get(StringArrayStorage.prototype.__proto__ || Object.getPrototypeOf(StringArrayStorage.prototype), "initialize", this).call(this);
            this.storageId = this.randomGenerator.getRandomString(4, RandomGenerator_1.RandomGenerator.randomGeneratorPoolHexadecimal);
        }
    }, {
        key: "rotateArray",
        value: function rotateArray(rotationValue) {
            this.storage = this.arrayUtils.arrayRotate(this.storage, rotationValue);
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
tslib_1.__decorate([inversify_1.postConstruct(), tslib_1.__metadata("design:type", Function), tslib_1.__metadata("design:paramtypes", []), tslib_1.__metadata("design:returntype", void 0)], StringArrayStorage.prototype, "initialize", null);
StringArrayStorage = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IArrayUtils)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__metadata("design:paramtypes", [Object, Object])], StringArrayStorage);
exports.StringArrayStorage = StringArrayStorage;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var Initializable_1 = __webpack_require__(4);
var ArrayStorage = function () {
    function ArrayStorage(randomGenerator) {
        _classCallCheck(this, ArrayStorage);

        this.storageLength = 0;
        this.randomGenerator = randomGenerator;
    }

    _createClass(ArrayStorage, [{
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
                throw new Error("No value found in array storage with key `" + key + "`");
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

            this.storage = [].concat(_toConsumableArray(this.storage), _toConsumableArray(storage.getStorage()));
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
ArrayStorage = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__metadata("design:paramtypes", [Object])], ArrayStorage);
exports.ArrayStorage = ArrayStorage;

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = require("md5");

/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = require("chance");

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var ArrayUtils_1 = __webpack_require__(120);
var CryptUtils_1 = __webpack_require__(121);
var EscapeSequenceEncoder_1 = __webpack_require__(122);
var RandomGenerator_1 = __webpack_require__(28);
exports.utilsModule = new inversify_1.ContainerModule(function (bind) {
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IArrayUtils).to(ArrayUtils_1.ArrayUtils).inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator).to(RandomGenerator_1.RandomGenerator).inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils).to(CryptUtils_1.CryptUtils).inSingletonScope();
    bind(ServiceIdentifiers_1.ServiceIdentifiers.IEscapeSequenceEncoder).to(EscapeSequenceEncoder_1.EscapeSequenceEncoder).inSingletonScope();
});

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var ArrayUtils = function () {
    function ArrayUtils(randomGenerator) {
        _classCallCheck(this, ArrayUtils);

        this.randomGenerator = randomGenerator;
    }

    _createClass(ArrayUtils, [{
        key: "arrayRange",
        value: function arrayRange(length) {
            var range = [];
            for (var i = 0; i < length; i++) {
                range.push(i);
            }
            return range;
        }
    }, {
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
            var shuffledArray = [].concat(_toConsumableArray(array));
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
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var RandomGenerator_1 = __webpack_require__(28);
var Utils_1 = __webpack_require__(14);
var CryptUtils = function () {
    function CryptUtils(randomGenerator) {
        _classCallCheck(this, CryptUtils);

        this.randomGenerator = randomGenerator;
    }

    _createClass(CryptUtils, [{
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
            var _this = this;

            var escapeRegExp = function escapeRegExp(s) {
                return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            };
            var randomMerge = function randomMerge(s1, s2) {
                var i1 = -1,
                    i2 = -1,
                    result = '';
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
            var randomStringDiff = randomString.replace(new RegExp("[" + escapeRegExp(str) + "]", 'g'), '');
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
CryptUtils = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IRandomGenerator)), tslib_1.__metadata("design:paramtypes", [Object])], CryptUtils);
exports.CryptUtils = CryptUtils;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var EscapeSequenceEncoder = function () {
    function EscapeSequenceEncoder() {
        _classCallCheck(this, EscapeSequenceEncoder);

        this.stringsCache = new Map();
    }

    _createClass(EscapeSequenceEncoder, [{
        key: "encode",
        value: function encode(string, encodeAllSymbols) {
            var cacheKey = string + "-" + String(encodeAllSymbols);
            if (this.stringsCache.has(cacheKey)) {
                return this.stringsCache.get(cacheKey);
            }
            var radix = 16;
            var replaceRegExp = new RegExp('[\\s\\S]', 'g');
            var escapeSequenceRegExp = new RegExp('[\'\"\\\\\\s]');
            var regExp = new RegExp('[\\x00-\\x7F]');
            var prefix = void 0,
                template = void 0;
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
                return "" + prefix + (template + character.charCodeAt(0).toString(radix)).slice(-template.length);
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
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var esprima = __webpack_require__(32);
var escodegen = __webpack_require__(25);
var esmangle = __webpack_require__(124);
var JavaScriptObfuscatorInternal = JavaScriptObfuscatorInternal_1 = function () {
    function JavaScriptObfuscatorInternal(obfuscator, sourceMapCorrector, options) {
        _classCallCheck(this, JavaScriptObfuscatorInternal);

        this.obfuscator = obfuscator;
        this.sourceMapCorrector = sourceMapCorrector;
        this.options = options;
    }

    _createClass(JavaScriptObfuscatorInternal, [{
        key: "obfuscate",
        value: function obfuscate(sourceCode) {
            var astTree = this.parseCode(sourceCode);
            var obfuscatedAstTree = this.obfuscator.obfuscateAstTree(astTree);
            var generatorOutput = this.generateCode(sourceCode, obfuscatedAstTree);
            return this.getObfuscationResult(generatorOutput);
        }
    }, {
        key: "parseCode",
        value: function parseCode(sourceCode) {
            return esprima.parse(sourceCode, {
                loc: this.options.sourceMap
            });
        }
    }, {
        key: "generateCode",
        value: function generateCode(sourceCode, astTree) {
            var escodegenParams = Object.assign({}, JavaScriptObfuscatorInternal_1.escodegenParams);
            if (this.options.sourceMap) {
                escodegenParams.sourceMap = 'sourceMap';
                escodegenParams.sourceContent = sourceCode;
            }
            if (this.options.mangle) {
                astTree = esmangle.mangle(astTree);
            }
            var generatorOutput = escodegen.generate(astTree, Object.assign({}, escodegenParams, { format: {
                    compact: this.options.compact
                } }));
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
/* 124 */
/***/ (function(module, exports) {

module.exports = require("esmangle");

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var events_1 = __webpack_require__(126);
inversify_1.decorate(inversify_1.injectable(), events_1.EventEmitter);
var ObfuscationEventEmitter = function (_events_1$EventEmitte) {
    _inherits(ObfuscationEventEmitter, _events_1$EventEmitte);

    function ObfuscationEventEmitter() {
        _classCallCheck(this, ObfuscationEventEmitter);

        return _possibleConstructorReturn(this, (ObfuscationEventEmitter.__proto__ || Object.getPrototypeOf(ObfuscationEventEmitter)).apply(this, arguments));
    }

    return ObfuscationEventEmitter;
}(events_1.EventEmitter);
ObfuscationEventEmitter = tslib_1.__decorate([inversify_1.injectable()], ObfuscationEventEmitter);
exports.ObfuscationEventEmitter = ObfuscationEventEmitter;

/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var Initializable_1 = __webpack_require__(4);
var ObfuscationResult = function () {
    function ObfuscationResult() {
        _classCallCheck(this, ObfuscationResult);
    }

    _createClass(ObfuscationResult, [{
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
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var estraverse = __webpack_require__(8);
var NodeTransformer_1 = __webpack_require__(35);
var ObfuscationEvent_1 = __webpack_require__(13);
var VisitorDirection_1 = __webpack_require__(129);
var Node_1 = __webpack_require__(5);
var NodeUtils_1 = __webpack_require__(3);
var Obfuscator = Obfuscator_1 = function () {
    function Obfuscator(stackTraceAnalyzer, obfuscationEventEmitter, customNodeGroupStorage, nodeTransformerFactory, options) {
        _classCallCheck(this, Obfuscator);

        this.stackTraceAnalyzer = stackTraceAnalyzer;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
        this.customNodeGroupStorage = customNodeGroupStorage;
        this.nodeTransformerFactory = nodeTransformerFactory;
        this.options = options;
    }

    _createClass(Obfuscator, [{
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
            this.obfuscationEventEmitter.emit(ObfuscationEvent_1.ObfuscationEvent.BeforeObfuscation, astTree, stackTraceData);
            astTree = this.transformAstTree(astTree, [].concat(_toConsumableArray(this.options.deadCodeInjection ? Obfuscator_1.deadCodeInjectionTransformersList : [])));
            astTree = this.transformAstTree(astTree, [].concat(_toConsumableArray(this.options.controlFlowFlattening ? Obfuscator_1.controlFlowTransformersList : [])));
            astTree = this.transformAstTree(astTree, [].concat(_toConsumableArray(Obfuscator_1.convertingTransformersList), _toConsumableArray(Obfuscator_1.obfuscatingTransformersList)));
            this.obfuscationEventEmitter.emit(ObfuscationEvent_1.ObfuscationEvent.AfterObfuscation, astTree, stackTraceData);
            return astTree;
        }
    }, {
        key: "transformAstTree",
        value: function transformAstTree(astTree, nodeTransformers) {
            if (!nodeTransformers.length) {
                return astTree;
            }
            var enterVisitors = [];
            var leaveVisitors = [];
            var nodeTransformersLength = nodeTransformers.length;
            var visitor = void 0;
            for (var i = 0; i < nodeTransformersLength; i++) {
                visitor = this.nodeTransformerFactory(nodeTransformers[i]).getVisitor();
                if (visitor.enter) {
                    enterVisitors.push(visitor);
                }
                if (visitor.leave) {
                    leaveVisitors.push(visitor);
                }
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
            if (!visitors.length) {
                return function (node, parentNode) {
                    return node;
                };
            }
            var visitorsLength = visitors.length;
            var visitor = void 0;
            return function (node, parentNode) {
                if (Obfuscator_1.isBlackListNode(node)) {
                    return estraverse.VisitorOption.Skip;
                }
                for (var i = 0; i < visitorsLength; i++) {
                    visitor = visitors[i];
                    var visitorFunction = visitor[direction];
                    if (!visitorFunction) {
                        continue;
                    }
                    var visitorResult = visitorFunction(node, parentNode);
                    if (!visitorResult || !Node_1.Node.isNode(visitorResult)) {
                        continue;
                    }
                    node = visitorResult;
                }
                return node;
            };
        }
    }], [{
        key: "isBlackListNode",
        value: function isBlackListNode(node) {
            var guardsLength = Obfuscator_1.blackListGuards.length;
            var guard = void 0;
            for (var i = 0; i < guardsLength; i++) {
                guard = Obfuscator_1.blackListGuards[i];
                if (guard(node)) {
                    return true;
                }
            }
            return false;
        }
    }]);

    return Obfuscator;
}();
Obfuscator.blackListGuards = [Node_1.Node.isUseStrictOperator];
Obfuscator.controlFlowTransformersList = [NodeTransformer_1.NodeTransformer.BlockStatementControlFlowTransformer, NodeTransformer_1.NodeTransformer.FunctionControlFlowTransformer];
Obfuscator.convertingTransformersList = [NodeTransformer_1.NodeTransformer.MemberExpressionTransformer, NodeTransformer_1.NodeTransformer.MethodDefinitionTransformer, NodeTransformer_1.NodeTransformer.TemplateLiteralTransformer];
Obfuscator.deadCodeInjectionTransformersList = [NodeTransformer_1.NodeTransformer.DeadCodeInjectionTransformer];
Obfuscator.obfuscatingTransformersList = [NodeTransformer_1.NodeTransformer.CatchClauseTransformer, NodeTransformer_1.NodeTransformer.FunctionDeclarationTransformer, NodeTransformer_1.NodeTransformer.FunctionTransformer, NodeTransformer_1.NodeTransformer.LabeledStatementTransformer, NodeTransformer_1.NodeTransformer.LiteralTransformer, NodeTransformer_1.NodeTransformer.ObjectExpressionTransformer, NodeTransformer_1.NodeTransformer.VariableDeclarationTransformer];
Obfuscator = Obfuscator_1 = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IStackTraceAnalyzer)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IObfuscationEventEmitter)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.TCustomNodeGroupStorage)), tslib_1.__param(3, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__INodeTransformer)), tslib_1.__param(4, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Object, Object, Object, Function, Object])], Obfuscator);
exports.Obfuscator = Obfuscator;
var Obfuscator_1;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var VisitorDirection;
(function (VisitorDirection) {
    VisitorDirection["Enter"] = "enter";
    VisitorDirection["Leave"] = "leave";
})(VisitorDirection = exports.VisitorDirection || (exports.VisitorDirection = {}));

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var class_validator_1 = __webpack_require__(131);
var Default_1 = __webpack_require__(29);
var OptionsNormalizer_1 = __webpack_require__(132);
var ValidationErrorsFormatter_1 = __webpack_require__(143);
var Options = Options_1 = function Options(inputOptions) {
    _classCallCheck(this, Options);

    Object.assign(this, Default_1.DEFAULT_PRESET, inputOptions);
    var errors = class_validator_1.validateSync(this, Options_1.validatorOptions);
    if (errors.length) {
        throw new ReferenceError("Validation failed. errors:\n" + ValidationErrorsFormatter_1.ValidationErrorsFormatter.format(errors));
    }
    Object.assign(this, OptionsNormalizer_1.OptionsNormalizer.normalizeOptions(this));
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
tslib_1.__decorate([class_validator_1.IsBoolean(), tslib_1.__metadata("design:type", Boolean)], Options.prototype, "mangle", void 0);
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
/* 131 */
/***/ (function(module, exports) {

module.exports = require("class-validator");

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var ControlFlowFlatteningThresholdRule_1 = __webpack_require__(133);
var DeadCodeInjectionRule_1 = __webpack_require__(134);
var DeadCodeInjectionThresholdRule_1 = __webpack_require__(135);
var DomainLockRule_1 = __webpack_require__(136);
var SelfDefendingRule_1 = __webpack_require__(137);
var SourceMapBaseUrlRule_1 = __webpack_require__(138);
var SourceMapFileNameRule_1 = __webpack_require__(139);
var StringArrayRule_1 = __webpack_require__(140);
var StringArrayEncodingRule_1 = __webpack_require__(141);
var StringArrayThresholdRule_1 = __webpack_require__(142);

var OptionsNormalizer = function () {
    function OptionsNormalizer() {
        _classCallCheck(this, OptionsNormalizer);
    }

    _createClass(OptionsNormalizer, null, [{
        key: "normalizeOptions",
        value: function normalizeOptions(options) {
            var normalizedOptions = Object.assign({}, options);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = OptionsNormalizer.normalizerRules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
    }]);

    return OptionsNormalizer;
}();

OptionsNormalizer.normalizerRules = [ControlFlowFlatteningThresholdRule_1.ControlFlowFlatteningThresholdRule, DeadCodeInjectionRule_1.DeadCodeInjectionRule, DeadCodeInjectionThresholdRule_1.DeadCodeInjectionThresholdRule, DomainLockRule_1.DomainLockRule, SelfDefendingRule_1.SelfDefendingRule, SourceMapBaseUrlRule_1.SourceMapBaseUrlRule, SourceMapFileNameRule_1.SourceMapFileNameRule, StringArrayRule_1.StringArrayRule, StringArrayEncodingRule_1.StringArrayEncodingRule, StringArrayThresholdRule_1.StringArrayThresholdRule];
exports.OptionsNormalizer = OptionsNormalizer;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlFlowFlatteningThresholdRule = function (options) {
    if (options.controlFlowFlatteningThreshold === 0) {
        options = Object.assign({}, options, { controlFlowFlattening: false, controlFlowFlatteningThreshold: 0 });
    }
    return options;
};

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Default_1 = __webpack_require__(29);
exports.DeadCodeInjectionRule = function (options) {
    if (options.deadCodeInjection) {
        options = Object.assign({}, options, { deadCodeInjection: true, stringArray: true });
        if (!options.stringArrayThreshold) {
            options = Object.assign({}, options, { stringArray: true, stringArrayThreshold: Default_1.DEFAULT_PRESET.stringArrayThreshold });
        }
    }
    return options;
};

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.DeadCodeInjectionThresholdRule = function (options) {
    if (options.deadCodeInjectionThreshold === 0) {
        options = Object.assign({}, options, { deadCodeInjection: false, deadCodeInjectionThreshold: 0 });
    }
    return options;
};

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(14);
exports.DomainLockRule = function (options) {
    if (options.domainLock.length) {
        var normalizedDomains = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = options.domainLock[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var domain = _step.value;

                normalizedDomains.push(Utils_1.Utils.extractDomainFromUrl(domain));
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

        options = Object.assign({}, options, { domainLock: normalizedDomains });
    }
    return options;
};

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfDefendingRule = function (options) {
    if (options.selfDefending) {
        options = Object.assign({}, options, { compact: true, selfDefending: true });
    }
    return options;
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceMapBaseUrlRule = function (options) {
    var _options = options,
        sourceMapBaseUrl = _options.sourceMapBaseUrl;

    if (!options.sourceMapFileName) {
        options = Object.assign({}, options, { sourceMapBaseUrl: '' });
        return options;
    }
    if (sourceMapBaseUrl && !sourceMapBaseUrl.endsWith('/')) {
        options = Object.assign({}, options, { sourceMapBaseUrl: sourceMapBaseUrl + "/" });
    }
    return options;
};

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceMapFileNameRule = function (options) {
    var _options = options,
        sourceMapFileName = _options.sourceMapFileName;

    if (sourceMapFileName) {
        sourceMapFileName = sourceMapFileName.replace(/^\/+/, '').split('.')[0];
        options = Object.assign({}, options, { sourceMapFileName: sourceMapFileName + ".js.map" });
    }
    return options;
};

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.StringArrayRule = function (options) {
    if (!options.stringArray) {
        options = Object.assign({}, options, { rotateStringArray: false, stringArray: false, stringArrayEncoding: false, stringArrayThreshold: 0 });
    }
    return options;
};

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.StringArrayEncodingRule = function (options) {
    if (options.stringArrayEncoding === true) {
        options = Object.assign({}, options, { stringArrayEncoding: 'base64' });
    }
    return options;
};

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.StringArrayThresholdRule = function (options) {
    if (options.stringArrayThreshold === 0) {
        options = Object.assign({}, options, { rotateStringArray: false, stringArray: false, stringArrayEncoding: false, stringArrayThreshold: 0 });
    }
    return options;
};

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var ValidationErrorsFormatter = function () {
    function ValidationErrorsFormatter() {
        _classCallCheck(this, ValidationErrorsFormatter);
    }

    _createClass(ValidationErrorsFormatter, null, [{
        key: "format",
        value: function format(validationErrors) {
            var errorsArray = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = validationErrors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var SourceCode = function () {
    function SourceCode(sourceCode) {
        _classCallCheck(this, SourceCode);

        this.sourceCode = sourceCode;
    }

    _createClass(SourceCode, [{
        key: "getSourceCode",
        value: function getSourceCode() {
            return this.sourceCode;
        }
    }]);

    return SourceCode;
}();

exports.SourceCode = SourceCode;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(2);
var inversify_1 = __webpack_require__(0);
var ServiceIdentifiers_1 = __webpack_require__(1);
var SourceMapMode_1 = __webpack_require__(22);
var SourceMapCorrector = function () {
    function SourceMapCorrector(obfuscationResultFactory, cryptUtils, options) {
        _classCallCheck(this, SourceMapCorrector);

        this.obfuscationResultFactory = obfuscationResultFactory;
        this.cryptUtils = cryptUtils;
        this.options = options;
    }

    _createClass(SourceMapCorrector, [{
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
                    sourceMappingUrl += "data:application/json;base64," + this.cryptUtils.btoa(sourceMap);
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
SourceMapCorrector = tslib_1.__decorate([inversify_1.injectable(), tslib_1.__param(0, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.Factory__IObfuscationResult)), tslib_1.__param(1, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.ICryptUtils)), tslib_1.__param(2, inversify_1.inject(ServiceIdentifiers_1.ServiceIdentifiers.IOptions)), tslib_1.__metadata("design:paramtypes", [Function, Object, Object])], SourceMapCorrector);
exports.SourceMapCorrector = SourceMapCorrector;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var commander = __webpack_require__(147);
var path = __webpack_require__(38);
var Default_1 = __webpack_require__(29);
var BooleanSanitizer_1 = __webpack_require__(148);
var SourceMapModeSanitizer_1 = __webpack_require__(149);
var StringArrayEncodingSanitizer_1 = __webpack_require__(150);
var CLIUtils_1 = __webpack_require__(151);
var JavaScriptObfuscator_1 = __webpack_require__(15);

var JavaScriptObfuscatorCLI = function () {
    function JavaScriptObfuscatorCLI(argv) {
        _classCallCheck(this, JavaScriptObfuscatorCLI);

        this.sourceCode = '';
        this.rawArguments = argv;
        this.arguments = this.rawArguments.slice(2);
        this.commands = new commander.Command();
    }

    _createClass(JavaScriptObfuscatorCLI, [{
        key: "run",
        value: function run() {
            this.configureCommands();
            this.configureHelp();
            if (!this.arguments.length || this.arguments.indexOf('--help') !== -1) {
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
            var availableOptions = Object.keys(Default_1.DEFAULT_PRESET);
            for (var option in this.commands) {
                if (!this.commands.hasOwnProperty(option)) {
                    continue;
                }
                if (!(availableOptions.indexOf(option) !== -1)) {
                    continue;
                }
                inputOptions[option] = this.commands[option];
            }
            return Object.assign({}, Default_1.DEFAULT_PRESET, inputOptions);
        }
    }, {
        key: "configureCommands",
        value: function configureCommands() {
            this.commands.version(CLIUtils_1.CLIUtils.getPackageConfig().version, '-v, --version').usage('<inputPath> [options]').option('-o, --output <path>', 'Output path for obfuscated code').option('--compact <boolean>', 'Disable one line output code compacting', BooleanSanitizer_1.BooleanSanitizer).option('--controlFlowFlattening <boolean>', 'Enables control flow flattening', BooleanSanitizer_1.BooleanSanitizer).option('--controlFlowFlatteningThreshold <number>', 'The probability that the control flow flattening transformation will be applied to the node', parseFloat).option('--deadCodeInjection <boolean>', 'Enables dead code injection', BooleanSanitizer_1.BooleanSanitizer).option('--deadCodeInjectionThreshold <number>', 'The probability that the dead code injection transformation will be applied to the node', parseFloat).option('--debugProtection <boolean>', 'Disable browser Debug panel (can cause DevTools enabled browser freeze)', BooleanSanitizer_1.BooleanSanitizer).option('--debugProtectionInterval <boolean>', 'Disable browser Debug panel even after page was loaded (can cause DevTools enabled browser freeze)', BooleanSanitizer_1.BooleanSanitizer).option('--disableConsoleOutput <boolean>', 'Allow console.log, console.info, console.error and console.warn messages output into browser console', BooleanSanitizer_1.BooleanSanitizer).option('--domainLock <list>', 'Blocks the execution of the code in domains that do not match the passed RegExp patterns (comma separated)', function (value) {
                return value.split(',');
            }).option('--mangle <boolean>', 'Enables mangling of variable names', BooleanSanitizer_1.BooleanSanitizer).option('--reservedNames <list>', 'Disable obfuscation of variable names, function names and names of function parameters that match the passed RegExp patterns (comma separated)', function (value) {
                return value.split(',');
            }).option('--rotateStringArray <boolean>', 'Disable rotation of unicode array values during obfuscation', BooleanSanitizer_1.BooleanSanitizer).option('--seed <number>', 'Sets seed for random generator. This is useful for creating repeatable results.', parseFloat).option('--selfDefending <boolean>', 'Disables self-defending for obfuscated code', BooleanSanitizer_1.BooleanSanitizer).option('--sourceMap <boolean>', 'Enables source map generation', BooleanSanitizer_1.BooleanSanitizer).option('--sourceMapBaseUrl <string>', 'Sets base url to the source map import url when `--sourceMapMode=separate`').option('--sourceMapFileName <string>', 'Sets file name for output source map when `--sourceMapMode=separate`').option('--sourceMapMode <string> [inline, separate]', 'Specify source map output mode', SourceMapModeSanitizer_1.SourceMapModeSanitizer).option('--stringArray <boolean>', 'Disables gathering of all literal strings into an array and replacing every literal string with an array call', BooleanSanitizer_1.BooleanSanitizer).option('--stringArrayEncoding <boolean|string> [true, false, base64, rc4]', 'Encodes all strings in strings array using base64 or rc4 (this option can slow down your code speed', StringArrayEncodingSanitizer_1.StringArrayEncodingSanitizer).option('--stringArrayThreshold <number>', 'The probability that the literal string will be inserted into stringArray (Default: 0.8, Min: 0, Max: 1)', parseFloat).option('--unicodeEscapeSequence <boolean>', 'Allows to enable/disable string conversion to unicode escape sequence', BooleanSanitizer_1.BooleanSanitizer).parse(this.rawArguments);
        }
    }, {
        key: "configureHelp",
        value: function configureHelp() {
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
            this.sourceCode = CLIUtils_1.CLIUtils.readFile(this.inputPath);
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
            var obfuscatedCode = JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(this.sourceCode, options).getObfuscatedCode();
            CLIUtils_1.CLIUtils.writeFile(outputCodePath, obfuscatedCode);
        }
    }, {
        key: "processDataWithSourceMap",
        value: function processDataWithSourceMap(outputCodePath, options) {
            var outputSourceMapPath = CLIUtils_1.CLIUtils.getOutputSourceMapPath(outputCodePath, options.sourceMapFileName || '');
            options = Object.assign({}, options, { sourceMapFileName: path.basename(outputSourceMapPath) });
            var obfuscationResult = JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(this.sourceCode, options);
            CLIUtils_1.CLIUtils.writeFile(outputCodePath, obfuscationResult.getObfuscatedCode());
            if (options.sourceMapMode === 'separate' && obfuscationResult.getSourceMap()) {
                CLIUtils_1.CLIUtils.writeFile(outputSourceMapPath, obfuscationResult.getSourceMap());
            }
        }
    }]);

    return JavaScriptObfuscatorCLI;
}();

exports.JavaScriptObfuscatorCLI = JavaScriptObfuscatorCLI;

/***/ }),
/* 147 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanSanitizer = function (value) {
    return value === 'true' || value === '1';
};

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var SourceMapMode_1 = __webpack_require__(22);
exports.SourceMapModeSanitizer = function (value) {
    var availableMode = Object.keys(SourceMapMode_1.SourceMapMode).some(function (key) {
        return SourceMapMode_1.SourceMapMode[key] === value;
    });
    if (!availableMode) {
        throw new ReferenceError('Invalid value of `--sourceMapMode` option');
    }
    return value;
};

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var StringArrayEncoding_1 = __webpack_require__(26);
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
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var fs = __webpack_require__(152);
var mkdirp = __webpack_require__(153);
var path = __webpack_require__(38);

var CLIUtils = function () {
    function CLIUtils() {
        _classCallCheck(this, CLIUtils);
    }

    _createClass(CLIUtils, null, [{
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
                outputCodePath = outputCodePath.substring(0, outputCodePath.lastIndexOf('/')) + "/" + sourceMapFileName;
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
            if (!(CLIUtils.availableInputExtensions.indexOf(path.extname(inputPath)) !== -1)) {
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
/* 152 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports = require("mkdirp");

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map