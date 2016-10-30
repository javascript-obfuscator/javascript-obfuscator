/*
Copyright (C) 2016 Timofey Kachalov <sanex3339@yandex.ru>

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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	return __webpack_require__(__webpack_require__.s = 86);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chance_1 = __webpack_require__(80);
var JSFuck_1 = __webpack_require__(20);

var Utils = function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: 'arrayContains',
        value: function arrayContains(array, searchElement) {
            return array.indexOf(searchElement) >= 0;
        }
    }, {
        key: 'arrayRotate',
        value: function arrayRotate(array, times) {
            if (!array.length) {
                throw new ReferenceError('Cannot rotate empty array.');
            }
            if (times <= 0) {
                return array;
            }
            var newArray = array,
                temp = void 0;
            while (times--) {
                temp = newArray.pop();
                newArray.unshift(temp);
            }
            return newArray;
        }
    }, {
        key: 'btoa',
        value: function btoa(string) {
            var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            return new Buffer(encode ? encodeURI(string) : string).toString('base64');
        }
    }, {
        key: 'decToHex',
        value: function decToHex(dec) {
            var radix = 16;
            return Number(dec).toString(radix);
        }
    }, {
        key: 'extractDomainFromUrl',
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
        key: 'getRandomGenerator',
        value: function getRandomGenerator() {
            return Utils.randomGenerator;
        }
    }, {
        key: 'getRandomVariableName',
        value: function getRandomVariableName() {
            var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;

            var rangeMinInteger = 10000,
                rangeMaxInteger = 99999999,
                prefix = '_0x';
            return '' + prefix + Utils.decToHex(Utils.getRandomGenerator().integer({
                min: rangeMinInteger,
                max: rangeMaxInteger
            })).substr(0, length);
        }
    }, {
        key: 'hideString',
        value: function hideString(str, length) {
            var escapeRegExp = function escapeRegExp(s) {
                return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            };
            var randomMerge = function randomMerge(s1, s2) {
                var i1 = -1,
                    i2 = -1,
                    result = '';
                while (i1 < s1.length || i2 < s2.length) {
                    if (Math.random() < 0.5 && i2 < s2.length) {
                        result += s2.charAt(++i2);
                    } else {
                        result += s1.charAt(++i1);
                    }
                }
                return result;
            };
            var customPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            var randomString = Utils.randomGenerator.string({ length: length, pool: customPool }),
                randomStringDiff = randomString.replace(new RegExp('[' + escapeRegExp(str) + ']', 'g'), ''),
                randomStringDiffArray = randomStringDiff.split('');
            Utils.randomGenerator.shuffle(randomStringDiffArray);
            randomStringDiff = randomStringDiffArray.join('');
            return [randomMerge(str, randomStringDiff), randomStringDiff];
        }
    }, {
        key: 'isInteger',
        value: function isInteger(number) {
            return number % 1 === 0;
        }
    }, {
        key: 'strEnumify',
        value: function strEnumify(obj) {
            return obj;
        }
    }, {
        key: 'stringToJSFuck',
        value: function stringToJSFuck(string) {
            return Array.from(string).map(function (character) {
                return JSFuck_1.JSFuck[character] || character;
            }).join(' + ');
        }
    }, {
        key: 'stringToUnicode',
        value: function stringToUnicode(string) {
            var radix = 16;
            var prefix = void 0,
                regexp = new RegExp('[\x00-\x7F]'),
                template = void 0;
            return '\'' + string.replace(/[\s\S]/g, function (escape) {
                if (regexp.test(escape)) {
                    prefix = '\\x';
                    template = '0'.repeat(2);
                } else {
                    prefix = '\\u';
                    template = '0'.repeat(4);
                }
                return '' + prefix + (template + escape.charCodeAt(0).toString(radix)).slice(-template.length);
            }) + '\'';
        }
    }]);

    return Utils;
}();

Utils.randomGenerator = new chance_1.Chance();
exports.Utils = Utils;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var escodegen = __webpack_require__(11);
var esprima = __webpack_require__(23);
var estraverse = __webpack_require__(3);
var NodeType_1 = __webpack_require__(5);
var Nodes_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(0);

var NodeUtils = function () {
    function NodeUtils() {
        _classCallCheck(this, NodeUtils);
    }

    _createClass(NodeUtils, null, [{
        key: 'addXVerbatimPropertyToLiterals',
        value: function addXVerbatimPropertyToLiterals(node) {
            NodeUtils.typedReplace(node, NodeType_1.NodeType.Literal, {
                leave: function leave(node) {
                    node['x-verbatim-property'] = {
                        content: node.raw,
                        precedence: escodegen.Precedence.Primary
                    };
                }
            });
        }
    }, {
        key: 'appendNode',
        value: function appendNode(blockScopeBody, node) {
            if (!NodeUtils.validateNode(node)) {
                return;
            }
            blockScopeBody.push(node);
        }
    }, {
        key: 'convertCodeToStructure',
        value: function convertCodeToStructure(code) {
            var getBlockStatementNodeByIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var structure = esprima.parse(code);
            NodeUtils.addXVerbatimPropertyToLiterals(structure);
            NodeUtils.parentize(structure);
            if (!getBlockStatementNodeByIndex) {
                return structure;
            }
            return NodeUtils.getBlockStatementNodeByIndex(structure);
        }
    }, {
        key: 'getBlockStatementNodeByIndex',
        value: function getBlockStatementNodeByIndex(node) {
            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (Nodes_1.Nodes.isNodeHasBlockStatement(node)) {
                if (node.body[index] === undefined) {
                    throw new ReferenceError('Wrong index `' + index + '`. Block-statement body length is `' + node.body.length + '`');
                }
                return node.body[index];
            }
            throw new TypeError('The specified node have no a block-statement');
        }
    }, {
        key: 'getBlockScopeOfNode',
        value: function getBlockScopeOfNode(node) {
            var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            var parentNode = node.parentNode;
            if (!parentNode) {
                throw new ReferenceError('`parentNode` property of given node is `undefined`');
            }
            if (Nodes_1.Nodes.isBlockStatementNode(parentNode)) {
                if (!parentNode.parentNode) {
                    throw new ReferenceError('`parentNode` property of `parentNode` of given node is `undefined`');
                }
                if (!Utils_1.Utils.arrayContains(NodeUtils.nodesWithBlockScope, parentNode.parentNode.type)) {
                    return NodeUtils.getBlockScopeOfNode(parentNode, depth);
                } else if (depth > 0) {
                    return NodeUtils.getBlockScopeOfNode(parentNode, --depth);
                }
                return parentNode;
            }
            if (Nodes_1.Nodes.isProgramNode(parentNode)) {
                return parentNode;
            }
            return NodeUtils.getBlockScopeOfNode(parentNode);
        }
    }, {
        key: 'insertNodeAtIndex',
        value: function insertNodeAtIndex(blockScopeBody, node, index) {
            if (!NodeUtils.validateNode(node)) {
                return;
            }
            blockScopeBody.splice(index, 0, node);
        }
    }, {
        key: 'parentize',
        value: function parentize(node) {
            var isRootNode = true;
            estraverse.replace(node, {
                enter: function enter(node, parentNode) {
                    var value = void 0;
                    if (isRootNode) {
                        if (node.type === NodeType_1.NodeType.Program) {
                            value = node;
                        } else {
                            value = Nodes_1.Nodes.getProgramNode([node]);
                            value['parentNode'] = value;
                        }
                        isRootNode = false;
                    } else {
                        value = parentNode || node;
                    }
                    node['parentNode'] = value;
                    node['obfuscated'] = false;
                }
            });
        }
    }, {
        key: 'prependNode',
        value: function prependNode(blockScopeBody, node) {
            if (!NodeUtils.validateNode(node)) {
                return;
            }
            blockScopeBody.unshift(node);
        }
    }, {
        key: 'typedReplace',
        value: function typedReplace(node, nodeType, visitor) {
            NodeUtils.typedTraverse(node, nodeType, visitor, 'replace');
        }
    }, {
        key: 'typedTraverse',
        value: function typedTraverse(node, nodeType, visitor) {
            var traverseType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'traverse';

            estraverse[traverseType](node, {
                enter: function enter(node, parentNode) {
                    if (node.type === nodeType && visitor.enter) {
                        visitor.enter(node, parentNode);
                    }
                },
                leave: function leave(node, parentNode) {
                    if (node.type === nodeType && visitor.leave) {
                        visitor.leave(node, parentNode);
                    }
                }
            });
        }
    }, {
        key: 'validateNode',
        value: function validateNode(node) {
            return !!node && node.hasOwnProperty('type');
        }
    }]);

    return NodeUtils;
}();

NodeUtils.nodesWithBlockScope = [NodeType_1.NodeType.ArrowFunctionExpression, NodeType_1.NodeType.FunctionDeclaration, NodeType_1.NodeType.FunctionExpression, NodeType_1.NodeType.MethodDefinition, NodeType_1.NodeType.Program];
exports.NodeUtils = NodeUtils;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodeType_1 = __webpack_require__(5);

var Nodes = function () {
    function Nodes() {
        _classCallCheck(this, Nodes);
    }

    _createClass(Nodes, null, [{
        key: 'getProgramNode',
        value: function getProgramNode(bodyNode) {
            return {
                'type': NodeType_1.NodeType.Program,
                'body': bodyNode,
                'sourceType': 'script',
                'obfuscated': false
            };
        }
    }, {
        key: 'isArrowFunctionExpressionNode',
        value: function isArrowFunctionExpressionNode(node) {
            return node.type === NodeType_1.NodeType.ArrowFunctionExpression;
        }
    }, {
        key: 'isBlockStatementNode',
        value: function isBlockStatementNode(node) {
            return node.type === NodeType_1.NodeType.BlockStatement;
        }
    }, {
        key: 'isCallExpressionNode',
        value: function isCallExpressionNode(node) {
            return node.type === NodeType_1.NodeType.CallExpression;
        }
    }, {
        key: 'isExpressionStatementNode',
        value: function isExpressionStatementNode(node) {
            return node.type === NodeType_1.NodeType.ExpressionStatement;
        }
    }, {
        key: 'isFunctionDeclarationNode',
        value: function isFunctionDeclarationNode(node) {
            return node.type === NodeType_1.NodeType.FunctionDeclaration;
        }
    }, {
        key: 'isFunctionExpressionNode',
        value: function isFunctionExpressionNode(node) {
            return node.type === NodeType_1.NodeType.FunctionExpression;
        }
    }, {
        key: 'isIdentifierNode',
        value: function isIdentifierNode(node) {
            return node.type === NodeType_1.NodeType.Identifier;
        }
    }, {
        key: 'isLiteralNode',
        value: function isLiteralNode(node) {
            return node.type === NodeType_1.NodeType.Literal;
        }
    }, {
        key: 'isMemberExpressionNode',
        value: function isMemberExpressionNode(node) {
            return node.type === NodeType_1.NodeType.MemberExpression;
        }
    }, {
        key: 'isObjectExpressionNode',
        value: function isObjectExpressionNode(node) {
            return node.type === NodeType_1.NodeType.ObjectExpression;
        }
    }, {
        key: 'isProgramNode',
        value: function isProgramNode(node) {
            return node.type === NodeType_1.NodeType.Program;
        }
    }, {
        key: 'isPropertyNode',
        value: function isPropertyNode(node) {
            return node.type === NodeType_1.NodeType.Property;
        }
    }, {
        key: 'isReplaceableIdentifierNode',
        value: function isReplaceableIdentifierNode(node, parentNode) {
            if (!Nodes.isIdentifierNode(node)) {
                return false;
            }
            var parentNodeIsPropertyNode = Nodes.isPropertyNode(parentNode) && parentNode.key === node;
            var parentNodeIsMemberExpressionNode = Nodes.isMemberExpressionNode(parentNode) && parentNode.computed === false && parentNode.property === node;
            return !parentNodeIsPropertyNode && !parentNodeIsMemberExpressionNode;
        }
    }, {
        key: 'isVariableDeclarationNode',
        value: function isVariableDeclarationNode(node) {
            return node.type === NodeType_1.NodeType.VariableDeclaration;
        }
    }, {
        key: 'isVariableDeclaratorNode',
        value: function isVariableDeclaratorNode(node) {
            return node.type === NodeType_1.NodeType.VariableDeclarator;
        }
    }, {
        key: 'isNodeHasBlockStatement',
        value: function isNodeHasBlockStatement(node) {
            return node.hasOwnProperty('body') && Array.isArray(node.body);
        }
    }]);

    return Nodes;
}();

exports.Nodes = Nodes;

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("estraverse");

/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
"use strict";

(function (AppendState) {
    AppendState[AppendState["AfterObfuscation"] = 0] = "AfterObfuscation";
    AppendState[AppendState["BeforeObfuscation"] = 1] = "BeforeObfuscation";
})(exports.AppendState || (exports.AppendState = {}));
var AppendState = exports.AppendState;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var Utils_1 = __webpack_require__(0);
exports.NodeType = Utils_1.Utils.strEnumify({
    ArrayExpression: 'ArrayExpression',
    ArrowFunctionExpression: 'ArrowFunctionExpression',
    AssignmentExpression: 'AssignmentExpression',
    BinaryExpression: 'BinaryExpression',
    BlockStatement: 'BlockStatement',
    CallExpression: 'CallExpression',
    CatchClause: 'CatchClause',
    ClassDeclaration: 'ClassDeclaration',
    ExpressionStatement: 'ExpressionStatement',
    FunctionDeclaration: 'FunctionDeclaration',
    FunctionExpression: 'FunctionExpression',
    Identifier: 'Identifier',
    IfStatement: 'IfStatement',
    Literal: 'Literal',
    LogicalExpression: 'LogicalExpression',
    MemberExpression: 'MemberExpression',
    MethodDefinition: 'MethodDefinition',
    ObjectExpression: 'ObjectExpression',
    Program: 'Program',
    Property: 'Property',
    ReturnStatement: 'ReturnStatement',
    TryStatement: 'TryStatement',
    UnaryExpression: 'UnaryExpression',
    UpdateExpression: 'UpdateExpression',
    VariableDeclaration: 'VariableDeclaration',
    VariableDeclarator: 'VariableDeclarator',
    WhileStatement: 'WhileStatement'
});

/***/ },
/* 6 */
/***/ function(module, exports) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractCustomNode = function () {
    function AbstractCustomNode(options) {
        _classCallCheck(this, AbstractCustomNode);

        this.options = options;
    }

    _createClass(AbstractCustomNode, [{
        key: "getAppendState",
        value: function getAppendState() {
            return this.appendState;
        }
    }, {
        key: "getNode",
        value: function getNode() {
            return this.getNodeStructure();
        }
    }]);

    return AbstractCustomNode;
}();

exports.AbstractCustomNode = AbstractCustomNode;

/***/ },
/* 7 */
/***/ function(module, exports) {

"use strict";
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractNodeObfuscator = function AbstractNodeObfuscator(nodes, options) {
    _classCallCheck(this, AbstractNodeObfuscator);

    this.nodes = nodes;
    this.options = options;
};

exports.AbstractNodeObfuscator = AbstractNodeObfuscator;

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("format-unicorn");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JavaScriptObfuscatorCLI_1 = __webpack_require__(31);
var JavaScriptObfuscatorInternal_1 = __webpack_require__(26);

var JavaScriptObfuscator = function () {
    function JavaScriptObfuscator() {
        _classCallCheck(this, JavaScriptObfuscator);
    }

    _createClass(JavaScriptObfuscator, null, [{
        key: 'obfuscate',
        value: function obfuscate(sourceCode) {
            var obfuscatorOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var javaScriptObfuscator = new JavaScriptObfuscatorInternal_1.JavaScriptObfuscatorInternal(sourceCode, obfuscatorOptions);
            javaScriptObfuscator.obfuscate();
            return javaScriptObfuscator.getObfuscationResult();
        }
    }, {
        key: 'runCLI',
        value: function runCLI(argv) {
            new JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI(argv).run();
        }
    }]);

    return JavaScriptObfuscator;
}();

exports.JavaScriptObfuscator = JavaScriptObfuscator;

/***/ },
/* 10 */
/***/ function(module, exports) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractNodesGroup = function () {
    function AbstractNodesGroup(options) {
        _classCallCheck(this, AbstractNodesGroup);

        this.nodes = new Map();
        this.options = options;
    }

    _createClass(AbstractNodesGroup, [{
        key: "getNodes",
        value: function getNodes() {
            return this.nodes;
        }
    }]);

    return AbstractNodesGroup;
}();

exports.AbstractNodesGroup = AbstractNodesGroup;

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("escodegen");

/***/ },
/* 12 */
/***/ function(module, exports) {

"use strict";
"use strict";

exports.SourceMapMode = {
    Inline: 'inline',
    Separate: 'separate'
};

/***/ },
/* 13 */
/***/ function(module, exports) {

"use strict";
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractReplacer = function AbstractReplacer(nodes, options) {
    _classCallCheck(this, AbstractReplacer);

    this.nodes = nodes;
    this.options = options;
};

exports.AbstractReplacer = AbstractReplacer;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractReplacer_1 = __webpack_require__(13);
var Utils_1 = __webpack_require__(0);

var IdentifierReplacer = function (_AbstractReplacer_1$A) {
    _inherits(IdentifierReplacer, _AbstractReplacer_1$A);

    function IdentifierReplacer() {
        _classCallCheck(this, IdentifierReplacer);

        var _this = _possibleConstructorReturn(this, (IdentifierReplacer.__proto__ || Object.getPrototypeOf(IdentifierReplacer)).apply(this, arguments));

        _this.namesMap = new Map();
        return _this;
    }

    _createClass(IdentifierReplacer, [{
        key: 'replace',
        value: function replace(nodeValue) {
            var obfuscatedIdentifierName = this.namesMap.get(nodeValue);
            if (!obfuscatedIdentifierName) {
                return nodeValue;
            }
            return obfuscatedIdentifierName;
        }
    }, {
        key: 'storeNames',
        value: function storeNames(nodeName) {
            if (!this.isReservedName(nodeName)) {
                this.namesMap.set(nodeName, Utils_1.Utils.getRandomVariableName());
            }
        }
    }, {
        key: 'isReservedName',
        value: function isReservedName(name) {
            return this.options.reservedNames.some(function (reservedName) {
                return new RegExp(reservedName, 'g').test(name);
            });
        }
    }]);

    return IdentifierReplacer;
}(AbstractReplacer_1.AbstractReplacer);

exports.IdentifierReplacer = IdentifierReplacer;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodeUtils_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(0);

var CustomNodeAppender = function () {
    function CustomNodeAppender() {
        _classCallCheck(this, CustomNodeAppender);
    }

    _createClass(CustomNodeAppender, null, [{
        key: 'appendNode',
        value: function appendNode(blockScopeStackTraceData, blockScopeBody, node) {
            var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

            var targetBlockScopeBody = void 0;
            if (!blockScopeStackTraceData.length) {
                targetBlockScopeBody = blockScopeBody;
            } else {
                targetBlockScopeBody = CustomNodeAppender.getOptimalBlockScopeBody(blockScopeStackTraceData, index);
            }
            NodeUtils_1.NodeUtils.prependNode(targetBlockScopeBody, node);
        }
    }, {
        key: 'getStackTraceIndexByThreshold',
        value: function getStackTraceIndexByThreshold(stackTraceRootLength) {
            var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;

            if (threshold < 0 || threshold > 1) {
                throw new RangeError('`threshold` parameter should has value between 0 and 1');
            }
            return Utils_1.Utils.getRandomGenerator().integer({
                min: 0,
                max: Math.round((stackTraceRootLength - 1) * threshold)
            });
        }
    }, {
        key: 'getOptimalBlockScopeBody',
        value: function getOptimalBlockScopeBody(blockScopeTraceData, index) {
            var firstCall = blockScopeTraceData[index];
            if (firstCall.stackTrace.length) {
                return CustomNodeAppender.getOptimalBlockScopeBody(firstCall.stackTrace, 0);
            } else {
                return firstCall.callee.body;
            }
        }
    }]);

    return CustomNodeAppender;
}();

exports.CustomNodeAppender = CustomNodeAppender;

/***/ },
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractReplacer_1 = __webpack_require__(13);
var NumberLiteralReplacer_1 = __webpack_require__(21);
var Utils_1 = __webpack_require__(0);

var StringLiteralReplacer = function (_AbstractReplacer_1$A) {
    _inherits(StringLiteralReplacer, _AbstractReplacer_1$A);

    function StringLiteralReplacer() {
        _classCallCheck(this, StringLiteralReplacer);

        return _possibleConstructorReturn(this, (StringLiteralReplacer.__proto__ || Object.getPrototypeOf(StringLiteralReplacer)).apply(this, arguments));
    }

    _createClass(StringLiteralReplacer, [{
        key: 'replace',
        value: function replace(nodeValue) {
            var replaceWithUnicodeArrayFlag = Math.random() <= this.options.unicodeArrayThreshold;
            if (this.options.encodeUnicodeLiterals && replaceWithUnicodeArrayFlag) {
                nodeValue = Utils_1.Utils.btoa(nodeValue);
            }
            nodeValue = Utils_1.Utils.stringToUnicode(nodeValue);
            if (this.options.unicodeArray && replaceWithUnicodeArrayFlag) {
                return this.replaceStringLiteralWithUnicodeArrayCall(nodeValue);
            }
            return nodeValue;
        }
    }, {
        key: 'replaceStringLiteralWithUnicodeArrayCall',
        value: function replaceStringLiteralWithUnicodeArrayCall(value) {
            var unicodeArrayNode = this.nodes.get('unicodeArrayNode');
            if (!unicodeArrayNode) {
                throw new ReferenceError('`unicodeArrayNode` node is not found in Map with custom nodes.');
            }
            var unicodeArray = unicodeArrayNode.getNodeData(),
                indexOfExistingValue = unicodeArray.getIndexOf(value),
                indexOfValue = void 0,
                hexadecimalIndex = void 0;
            if (indexOfExistingValue >= 0) {
                indexOfValue = indexOfExistingValue;
            } else {
                indexOfValue = unicodeArray.getLength();
                unicodeArrayNode.updateNodeData(value);
            }
            hexadecimalIndex = new NumberLiteralReplacer_1.NumberLiteralReplacer(this.nodes, this.options).replace(indexOfValue);
            if (this.options.wrapUnicodeArrayCalls) {
                var unicodeArrayCallsWrapper = this.nodes.get('unicodeArrayCallsWrapper');
                if (!unicodeArrayCallsWrapper) {
                    throw new ReferenceError('`unicodeArrayCallsWrapper` node is not found in Map with custom nodes.');
                }
                return unicodeArrayCallsWrapper.getNodeIdentifier() + '(\'' + hexadecimalIndex + '\')';
            }
            return unicodeArrayNode.getNodeIdentifier() + '[' + hexadecimalIndex + ']';
        }
    }]);

    return StringLiteralReplacer;
}(AbstractReplacer_1.AbstractReplacer);

exports.StringLiteralReplacer = StringLiteralReplacer;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var SourceMapMode_1 = __webpack_require__(12);
exports.NO_CUSTOM_NODES_PRESET = Object.freeze({
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    domainLock: [],
    encodeUnicodeLiterals: false,
    reservedNames: [],
    rotateUnicodeArray: false,
    selfDefending: false,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode_1.SourceMapMode.Separate,
    unicodeArray: false,
    unicodeArrayThreshold: 0,
    wrapUnicodeArrayCalls: false
});

/***/ },
/* 19 */
/***/ function(module, exports) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObfuscationResult = function () {
    function ObfuscationResult(obfuscatedCode, sourceMap) {
        _classCallCheck(this, ObfuscationResult);

        this.obfuscatedCode = obfuscatedCode;
        this.sourceMap = sourceMap;
    }

    _createClass(ObfuscationResult, [{
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

exports.ObfuscationResult = ObfuscationResult;

/***/ },
/* 20 */
/***/ function(module, exports) {

"use strict";
"use strict";

exports.JSFuck = {
    Window: '[]["filter"]["constructor"]("return this")()',
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

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractReplacer_1 = __webpack_require__(13);
var Utils_1 = __webpack_require__(0);

var NumberLiteralReplacer = function (_AbstractReplacer_1$A) {
    _inherits(NumberLiteralReplacer, _AbstractReplacer_1$A);

    function NumberLiteralReplacer() {
        _classCallCheck(this, NumberLiteralReplacer);

        return _possibleConstructorReturn(this, (NumberLiteralReplacer.__proto__ || Object.getPrototypeOf(NumberLiteralReplacer)).apply(this, arguments));
    }

    _createClass(NumberLiteralReplacer, [{
        key: 'replace',
        value: function replace(nodeValue) {
            var prefix = '0x';
            if (!Utils_1.Utils.isInteger(nodeValue)) {
                return String(nodeValue);
            }
            return '' + prefix + Utils_1.Utils.decToHex(nodeValue);
        }
    }]);

    return NumberLiteralReplacer;
}(AbstractReplacer_1.AbstractReplacer);

exports.NumberLiteralReplacer = NumberLiteralReplacer;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var SourceMapMode_1 = __webpack_require__(12);
exports.DEFAULT_PRESET = Object.freeze({
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    domainLock: [],
    encodeUnicodeLiterals: false,
    reservedNames: [],
    rotateUnicodeArray: true,
    selfDefending: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode_1.SourceMapMode.Separate,
    unicodeArray: true,
    unicodeArrayThreshold: 0.8,
    wrapUnicodeArrayCalls: true
});

/***/ },
/* 23 */
/***/ function(module, exports) {

module.exports = require("esprima");

/***/ },
/* 24 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 25 */
/***/ function(module, exports) {

module.exports = require("babel-polyfill");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var esprima = __webpack_require__(23);
var escodegen = __webpack_require__(11);
var ObfuscationResult_1 = __webpack_require__(19);
var Obfuscator_1 = __webpack_require__(27);
var Options_1 = __webpack_require__(56);
var SourceMapCorrector_1 = __webpack_require__(28);

var JavaScriptObfuscatorInternal = function () {
    function JavaScriptObfuscatorInternal(sourceCode) {
        var obfuscatorOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, JavaScriptObfuscatorInternal);

        this.sourceCode = sourceCode;
        this.options = new Options_1.Options(obfuscatorOptions);
    }

    _createClass(JavaScriptObfuscatorInternal, [{
        key: 'getObfuscationResult',
        value: function getObfuscationResult() {
            return new SourceMapCorrector_1.SourceMapCorrector(new ObfuscationResult_1.ObfuscationResult(this.generatorOutput.code, this.generatorOutput.map), this.options.sourceMapBaseUrl + this.options.sourceMapFileName, this.options.sourceMapMode).correct();
        }
    }, {
        key: 'obfuscate',
        value: function obfuscate() {
            var astTree = esprima.parse(this.sourceCode, {
                loc: true
            });
            astTree = new Obfuscator_1.Obfuscator(this.options).obfuscateNode(astTree);
            this.generatorOutput = JavaScriptObfuscatorInternal.generateCode(this.sourceCode, astTree, this.options);
        }
    }], [{
        key: 'generateCode',
        value: function generateCode(sourceCode, astTree, options) {
            var escodegenParams = Object.assign({}, JavaScriptObfuscatorInternal.escodegenParams);
            if (options.sourceMap) {
                escodegenParams.sourceMap = 'sourceMap';
                escodegenParams.sourceContent = sourceCode;
            }
            escodegenParams.format = {
                compact: options.compact
            };
            var generatorOutput = escodegen.generate(astTree, escodegenParams);
            generatorOutput.map = generatorOutput.map ? generatorOutput.map.toString() : '';
            return generatorOutput;
        }
    }]);

    return JavaScriptObfuscatorInternal;
}();

JavaScriptObfuscatorInternal.escodegenParams = {
    verbatim: 'x-verbatim-property',
    sourceMapWithCode: true
};
exports.JavaScriptObfuscatorInternal = JavaScriptObfuscatorInternal;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = __webpack_require__(3);
var AppendState_1 = __webpack_require__(4);
var NodeType_1 = __webpack_require__(5);
var CatchClauseObfuscator_1 = __webpack_require__(47);
var ConsoleOutputNodesGroup_1 = __webpack_require__(42);
var DebugProtectionNodesGroup_1 = __webpack_require__(43);
var DomainLockNodesGroup_1 = __webpack_require__(44);
var FunctionDeclarationObfuscator_1 = __webpack_require__(48);
var FunctionObfuscator_1 = __webpack_require__(49);
var LiteralObfuscator_1 = __webpack_require__(50);
var MemberExpressionObfuscator_1 = __webpack_require__(51);
var MethodDefinitionObfuscator_1 = __webpack_require__(52);
var Nodes_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(1);
var ObjectExpressionObfuscator_1 = __webpack_require__(53);
var SelfDefendingNodesGroup_1 = __webpack_require__(45);
var UnicodeArrayNodesGroup_1 = __webpack_require__(46);
var VariableDeclarationObfuscator_1 = __webpack_require__(54);
var StackTraceAnalyzer_1 = __webpack_require__(59);

var Obfuscator = function () {
    function Obfuscator(options) {
        _classCallCheck(this, Obfuscator);

        this.nodeObfuscators = new Map([[NodeType_1.NodeType.ArrowFunctionExpression, [FunctionObfuscator_1.FunctionObfuscator]], [NodeType_1.NodeType.ClassDeclaration, [FunctionDeclarationObfuscator_1.FunctionDeclarationObfuscator]], [NodeType_1.NodeType.CatchClause, [CatchClauseObfuscator_1.CatchClauseObfuscator]], [NodeType_1.NodeType.FunctionDeclaration, [FunctionDeclarationObfuscator_1.FunctionDeclarationObfuscator, FunctionObfuscator_1.FunctionObfuscator]], [NodeType_1.NodeType.FunctionExpression, [FunctionObfuscator_1.FunctionObfuscator]], [NodeType_1.NodeType.MemberExpression, [MemberExpressionObfuscator_1.MemberExpressionObfuscator]], [NodeType_1.NodeType.MethodDefinition, [MethodDefinitionObfuscator_1.MethodDefinitionObfuscator]], [NodeType_1.NodeType.ObjectExpression, [ObjectExpressionObfuscator_1.ObjectExpressionObfuscator]], [NodeType_1.NodeType.VariableDeclaration, [VariableDeclarationObfuscator_1.VariableDeclarationObfuscator]], [NodeType_1.NodeType.Literal, [LiteralObfuscator_1.LiteralObfuscator]]]);
        this.options = options;
        this.nodes = new Map([].concat(_toConsumableArray(new DomainLockNodesGroup_1.DomainLockNodesGroup(this.options).getNodes()), _toConsumableArray(new SelfDefendingNodesGroup_1.SelfDefendingNodesGroup(this.options).getNodes()), _toConsumableArray(new ConsoleOutputNodesGroup_1.ConsoleOutputNodesGroup(this.options).getNodes()), _toConsumableArray(new DebugProtectionNodesGroup_1.DebugProtectionNodesGroup(this.options).getNodes()), _toConsumableArray(new UnicodeArrayNodesGroup_1.UnicodeArrayNodesGroup(this.options).getNodes())));
    }

    _createClass(Obfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(node) {
            if (Nodes_1.Nodes.isProgramNode(node) && !node.body.length) {
                return node;
            }
            NodeUtils_1.NodeUtils.parentize(node);
            var stackTraceData = new StackTraceAnalyzer_1.StackTraceAnalyzer(node.body).analyze();
            this.beforeObfuscation(node, stackTraceData);
            this.obfuscate(node);
            this.afterObfuscation(node, stackTraceData);
            return node;
        }
    }, {
        key: 'afterObfuscation',
        value: function afterObfuscation(astTree, stackTraceData) {
            this.nodes.forEach(function (node) {
                if (node.getAppendState() === AppendState_1.AppendState.AfterObfuscation) {
                    node.appendNode(astTree, stackTraceData);
                }
            });
        }
    }, {
        key: 'beforeObfuscation',
        value: function beforeObfuscation(astTree, stackTraceData) {
            this.nodes.forEach(function (node) {
                if (node.getAppendState() === AppendState_1.AppendState.BeforeObfuscation) {
                    node.appendNode(astTree, stackTraceData);
                }
            });
        }
    }, {
        key: 'initializeNodeObfuscators',
        value: function initializeNodeObfuscators(node, parentNode) {
            var _this = this;

            var nodeObfuscators = this.nodeObfuscators.get(node.type);
            if (!nodeObfuscators) {
                return;
            }
            nodeObfuscators.forEach(function (obfuscator) {
                new obfuscator(_this.nodes, _this.options).obfuscateNode(node, parentNode);
            });
        }
    }, {
        key: 'obfuscate',
        value: function obfuscate(node) {
            var _this2 = this;

            estraverse.replace(node, {
                enter: function enter(node, parentNode) {
                    _this2.initializeNodeObfuscators(node, parentNode);
                }
            });
        }
    }]);

    return Obfuscator;
}();

exports.Obfuscator = Obfuscator;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SourceMapMode_1 = __webpack_require__(12);
var ObfuscationResult_1 = __webpack_require__(19);
var Utils_1 = __webpack_require__(0);

var SourceMapCorrector = function () {
    function SourceMapCorrector(obfuscationResult, sourceMapUrl, sourceMapMode) {
        _classCallCheck(this, SourceMapCorrector);

        this.obfuscatedCode = obfuscationResult.getObfuscatedCode();
        this.sourceMap = obfuscationResult.getSourceMap();
        this.sourceMapUrl = sourceMapUrl;
        this.sourceMapMode = sourceMapMode;
    }

    _createClass(SourceMapCorrector, [{
        key: 'correct',
        value: function correct() {
            return new ObfuscationResult_1.ObfuscationResult(this.correctObfuscatedCode(), this.sourceMap);
        }
    }, {
        key: 'correctObfuscatedCode',
        value: function correctObfuscatedCode() {
            if (!this.sourceMap) {
                return this.obfuscatedCode;
            }
            var sourceMappingUrl = '//# sourceMappingURL=';
            switch (this.sourceMapMode) {
                case SourceMapMode_1.SourceMapMode.Inline:
                    sourceMappingUrl += 'data:application/json;base64,' + Utils_1.Utils.btoa(this.sourceMap, false);
                    break;
                case SourceMapMode_1.SourceMapMode.Separate:
                default:
                    if (!this.sourceMapUrl) {
                        return this.obfuscatedCode;
                    }
                    sourceMappingUrl += this.sourceMapUrl;
                    break;
            }
            return this.obfuscatedCode + '\n' + sourceMappingUrl;
        }
    }]);

    return SourceMapCorrector;
}();

exports.SourceMapCorrector = SourceMapCorrector;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils_1 = __webpack_require__(0);

var UnicodeArray = function () {
    function UnicodeArray() {
        _classCallCheck(this, UnicodeArray);

        this.array = [];
    }

    _createClass(UnicodeArray, [{
        key: "addToArray",
        value: function addToArray(value) {
            this.array.push(value);
        }
    }, {
        key: "getArray",
        value: function getArray() {
            return this.array;
        }
    }, {
        key: "getIndexOf",
        value: function getIndexOf(value) {
            return this.array.indexOf(value);
        }
    }, {
        key: "getLength",
        value: function getLength() {
            return this.array.length;
        }
    }, {
        key: "rotateArray",
        value: function rotateArray(rotationValue) {
            this.array = Utils_1.Utils.arrayRotate(this.array, rotationValue);
        }
    }, {
        key: "toString",
        value: function toString() {
            return this.array.toString();
        }
    }]);

    return UnicodeArray;
}();

exports.UnicodeArray = UnicodeArray;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = __webpack_require__(83);
var mkdirp = __webpack_require__(84);
var path = __webpack_require__(24);
var Utils_1 = __webpack_require__(0);

var CLIUtils = function () {
    function CLIUtils() {
        _classCallCheck(this, CLIUtils);
    }

    _createClass(CLIUtils, null, [{
        key: 'getOutputCodePath',
        value: function getOutputCodePath(outputPath, inputPath) {
            if (outputPath) {
                return outputPath;
            }
            return inputPath.split('.').map(function (value, index) {
                return index === 0 ? value + '-obfuscated' : value;
            }).join('.');
        }
    }, {
        key: 'getOutputSourceMapPath',
        value: function getOutputSourceMapPath(outputCodePath) {
            var sourceMapFileName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            if (sourceMapFileName) {
                outputCodePath = outputCodePath.substr(0, outputCodePath.lastIndexOf('/')) + '/' + sourceMapFileName;
            }
            if (!/\.js\.map$/.test(outputCodePath)) {
                outputCodePath = outputCodePath.split('.')[0] + '.js.map';
            } else if (/\.js$/.test(outputCodePath)) {
                outputCodePath += '.map';
            }
            return outputCodePath;
        }
    }, {
        key: 'getPackageConfig',
        value: function getPackageConfig() {
            return JSON.parse(fs.readFileSync(path.join(path.dirname(fs.realpathSync(process.argv[1])), '../package.json'), CLIUtils.encoding));
        }
    }, {
        key: 'isFilePath',
        value: function isFilePath(filePath) {
            try {
                return fs.statSync(filePath).isFile();
            } catch (e) {
                return false;
            }
        }
    }, {
        key: 'readFile',
        value: function readFile(inputPath) {
            return fs.readFileSync(inputPath, CLIUtils.encoding);
        }
    }, {
        key: 'validateInputPath',
        value: function validateInputPath(inputPath) {
            if (!CLIUtils.isFilePath(inputPath)) {
                throw new ReferenceError('Given input path must be a valid file path');
            }
            if (!Utils_1.Utils.arrayContains(CLIUtils.availableInputExtensions, path.extname(inputPath))) {
                throw new ReferenceError('Input file must have .js extension');
            }
        }
    }, {
        key: 'writeFile',
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

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var commander = __webpack_require__(82);
var path = __webpack_require__(24);
var SourceMapMode_1 = __webpack_require__(12);
var DefaultPreset_1 = __webpack_require__(22);
var CLIUtils_1 = __webpack_require__(30);
var JavaScriptObfuscator_1 = __webpack_require__(9);
var Utils_1 = __webpack_require__(0);

var JavaScriptObfuscatorCLI = function () {
    function JavaScriptObfuscatorCLI(argv) {
        _classCallCheck(this, JavaScriptObfuscatorCLI);

        this.data = '';
        this.rawArguments = argv;
        this.arguments = this.rawArguments.slice(2);
    }

    _createClass(JavaScriptObfuscatorCLI, [{
        key: 'run',
        value: function run() {
            this.configureCommands();
            if (!this.arguments.length || Utils_1.Utils.arrayContains(this.arguments, '--help')) {
                this.commands.outputHelp();
                return;
            }
            this.inputPath = this.arguments[0];
            CLIUtils_1.CLIUtils.validateInputPath(this.inputPath);
            this.getData();
            this.processData();
        }
    }, {
        key: 'buildOptions',
        value: function buildOptions() {
            var obfuscatorOptions = {},
                availableOptions = Object.keys(DefaultPreset_1.DEFAULT_PRESET);
            for (var option in this.commands) {
                if (!this.commands.hasOwnProperty(option)) {
                    continue;
                }
                if (!Utils_1.Utils.arrayContains(availableOptions, option)) {
                    continue;
                }
                obfuscatorOptions[option] = this.commands[option];
            }
            return Object.assign({}, DefaultPreset_1.DEFAULT_PRESET, obfuscatorOptions);
        }
    }, {
        key: 'configureCommands',
        value: function configureCommands() {
            this.commands = new commander.Command().version(JavaScriptObfuscatorCLI.getBuildVersion(), '-v, --version').usage('<inputPath> [options]').option('-o, --output <path>', 'Output path for obfuscated code').option('--compact <boolean>', 'Disable one line output code compacting', JavaScriptObfuscatorCLI.parseBoolean).option('--debugProtection <boolean>', 'Disable browser Debug panel (can cause DevTools enabled browser freeze)', JavaScriptObfuscatorCLI.parseBoolean).option('--debugProtectionInterval <boolean>', 'Disable browser Debug panel even after page was loaded (can cause DevTools enabled browser freeze)', JavaScriptObfuscatorCLI.parseBoolean).option('--disableConsoleOutput <boolean>', 'Allow console.log, console.info, console.error and console.warn messages output into browser console', JavaScriptObfuscatorCLI.parseBoolean).option('--encodeUnicodeLiterals <boolean>', 'All literals in Unicode array become encoded in Base64 (this option can slightly slow down your code speed)', JavaScriptObfuscatorCLI.parseBoolean).option('--reservedNames <list>', 'Disable obfuscation of variable names, function names and names of function parameters that match the passed RegExp patterns (comma separated)', function (val) {
                return val.split(',');
            }).option('--rotateUnicodeArray <boolean>', 'Disable rotation of unicode array values during obfuscation', JavaScriptObfuscatorCLI.parseBoolean).option('--selfDefending <boolean>', 'Disables self-defending for obfuscated code', JavaScriptObfuscatorCLI.parseBoolean).option('--sourceMap <boolean>', 'Enables source map generation', JavaScriptObfuscatorCLI.parseBoolean).option('--sourceMapBaseUrl <string>', 'Sets base url to the source map import url when `--sourceMapMode=separate`').option('--sourceMapFileName <string>', 'Sets file name for output source map when `--sourceMapMode=separate`').option('--sourceMapMode <string> [inline, separate]', 'Specify source map output mode', JavaScriptObfuscatorCLI.parseSourceMapMode).option('--unicodeArray <boolean>', 'Disables gathering of all literal strings into an array and replacing every literal string with an array call', JavaScriptObfuscatorCLI.parseBoolean).option('--unicodeArrayThreshold <number>', 'The probability that the literal string will be inserted into unicodeArray (Default: 0.8, Min: 0, Max: 1)', parseFloat).option('--wrapUnicodeArrayCalls <boolean>', 'Disables usage of special access function instead of direct array call', JavaScriptObfuscatorCLI.parseBoolean).option('--domainLock <list>', 'Blocks the execution of the code in domains that do not match the passed RegExp patterns (comma separated)', function (val) {
                return val.split(',');
            }).parse(this.rawArguments);
            this.commands.on('--help', function () {
                console.log('  Examples:\n');
                console.log('    %> javascript-obfuscator in.js --compact true --selfDefending false');
                console.log('    %> javascript-obfuscator in.js --output out.js --compact true --selfDefending false');
                console.log('');
            });
        }
    }, {
        key: 'getData',
        value: function getData() {
            this.data = CLIUtils_1.CLIUtils.readFile(this.inputPath);
        }
    }, {
        key: 'processData',
        value: function processData() {
            var options = this.buildOptions(),
                outputCodePath = CLIUtils_1.CLIUtils.getOutputCodePath(this.commands.output, this.inputPath);
            if (options.sourceMap) {
                this.processDataWithSourceMap(outputCodePath, options);
            } else {
                this.processDataWithoutSourceMap(outputCodePath, options);
            }
        }
    }, {
        key: 'processDataWithoutSourceMap',
        value: function processDataWithoutSourceMap(outputCodePath, options) {
            var obfuscatedCode = JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(this.data, options).getObfuscatedCode();
            CLIUtils_1.CLIUtils.writeFile(outputCodePath, obfuscatedCode);
        }
    }, {
        key: 'processDataWithSourceMap',
        value: function processDataWithSourceMap(outputCodePath, options) {
            var outputSourceMapPath = CLIUtils_1.CLIUtils.getOutputSourceMapPath(outputCodePath, options.sourceMapFileName || '');
            options.sourceMapFileName = path.basename(outputSourceMapPath);
            var obfuscationResult = JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(this.data, options);
            CLIUtils_1.CLIUtils.writeFile(outputCodePath, obfuscationResult.getObfuscatedCode());
            if (options.sourceMapMode === 'separate' && obfuscationResult.getSourceMap()) {
                CLIUtils_1.CLIUtils.writeFile(outputSourceMapPath, obfuscationResult.getSourceMap());
            }
        }
    }], [{
        key: 'getBuildVersion',
        value: function getBuildVersion() {
            return CLIUtils_1.CLIUtils.getPackageConfig().version;
        }
    }, {
        key: 'parseBoolean',
        value: function parseBoolean(value) {
            return value === 'true' || value === '1';
        }
    }, {
        key: 'parseSourceMapMode',
        value: function parseSourceMapMode(value) {
            var availableMode = Object.keys(SourceMapMode_1.SourceMapMode).some(function (key) {
                return SourceMapMode_1.SourceMapMode[key] === value;
            });
            if (!availableMode) {
                throw new ReferenceError('Invalid value of `--sourceMapMode` option');
            }
            return value;
        }
    }]);

    return JavaScriptObfuscatorCLI;
}();

exports.JavaScriptObfuscatorCLI = JavaScriptObfuscatorCLI;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppendState_1 = __webpack_require__(4);
var ConsoleOutputDisableExpressionTemplate_1 = __webpack_require__(65);
var AbstractCustomNode_1 = __webpack_require__(6);
var CustomNodeAppender_1 = __webpack_require__(15);
var NodeUtils_1 = __webpack_require__(1);

var ConsoleOutputDisableExpressionNode = function (_AbstractCustomNode_) {
    _inherits(ConsoleOutputDisableExpressionNode, _AbstractCustomNode_);

    function ConsoleOutputDisableExpressionNode() {
        _classCallCheck(this, ConsoleOutputDisableExpressionNode);

        var _this = _possibleConstructorReturn(this, (ConsoleOutputDisableExpressionNode.__proto__ || Object.getPrototypeOf(ConsoleOutputDisableExpressionNode)).apply(this, arguments));

        _this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        return _this;
    }

    _createClass(ConsoleOutputDisableExpressionNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode, stackTraceData) {
            CustomNodeAppender_1.CustomNodeAppender.appendNode(stackTraceData, blockScopeNode.body, this.getNode(), CustomNodeAppender_1.CustomNodeAppender.getStackTraceIndexByThreshold(stackTraceData.length));
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            return NodeUtils_1.NodeUtils.convertCodeToStructure(ConsoleOutputDisableExpressionTemplate_1.ConsoleOutputDisableExpressionTemplate());
        }
    }]);

    return ConsoleOutputDisableExpressionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.ConsoleOutputDisableExpressionNode = ConsoleOutputDisableExpressionNode;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(4);
var DebufProtectionFunctionCallTemplate_1 = __webpack_require__(66);
var AbstractCustomNode_1 = __webpack_require__(6);
var NodeUtils_1 = __webpack_require__(1);

var DebugProtectionFunctionCallNode = function (_AbstractCustomNode_) {
    _inherits(DebugProtectionFunctionCallNode, _AbstractCustomNode_);

    function DebugProtectionFunctionCallNode(debugProtectionFunctionName, options) {
        _classCallCheck(this, DebugProtectionFunctionCallNode);

        var _this = _possibleConstructorReturn(this, (DebugProtectionFunctionCallNode.__proto__ || Object.getPrototypeOf(DebugProtectionFunctionCallNode)).call(this, options));

        _this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        _this.debugProtectionFunctionName = debugProtectionFunctionName;
        return _this;
    }

    _createClass(DebugProtectionFunctionCallNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            NodeUtils_1.NodeUtils.appendNode(blockScopeNode.body, this.getNode());
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            return NodeUtils_1.NodeUtils.convertCodeToStructure(DebufProtectionFunctionCallTemplate_1.DebugProtectionFunctionCallTemplate().formatUnicorn({
                debugProtectionFunctionName: this.debugProtectionFunctionName
            }));
        }
    }]);

    return DebugProtectionFunctionCallNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.DebugProtectionFunctionCallNode = DebugProtectionFunctionCallNode;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(4);
var DebugProtectionFunctionIntervalTemplate_1 = __webpack_require__(67);
var AbstractCustomNode_1 = __webpack_require__(6);
var NodeUtils_1 = __webpack_require__(1);

var DebugProtectionFunctionIntervalNode = function (_AbstractCustomNode_) {
    _inherits(DebugProtectionFunctionIntervalNode, _AbstractCustomNode_);

    function DebugProtectionFunctionIntervalNode(debugProtectionFunctionName, options) {
        _classCallCheck(this, DebugProtectionFunctionIntervalNode);

        var _this = _possibleConstructorReturn(this, (DebugProtectionFunctionIntervalNode.__proto__ || Object.getPrototypeOf(DebugProtectionFunctionIntervalNode)).call(this, options));

        _this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        _this.debugProtectionFunctionName = debugProtectionFunctionName;
        return _this;
    }

    _createClass(DebugProtectionFunctionIntervalNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            NodeUtils_1.NodeUtils.appendNode(blockScopeNode.body, this.getNode());
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            return NodeUtils_1.NodeUtils.convertCodeToStructure(DebugProtectionFunctionIntervalTemplate_1.DebugProtectionFunctionIntervalTemplate().formatUnicorn({
                debugProtectionFunctionName: this.debugProtectionFunctionName
            }));
        }
    }]);

    return DebugProtectionFunctionIntervalNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.DebugProtectionFunctionIntervalNode = DebugProtectionFunctionIntervalNode;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(4);
var DebugProtectionFunctionTemplate_1 = __webpack_require__(68);
var AbstractCustomNode_1 = __webpack_require__(6);
var NodeUtils_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(0);

var DebugProtectionFunctionNode = function (_AbstractCustomNode_) {
    _inherits(DebugProtectionFunctionNode, _AbstractCustomNode_);

    function DebugProtectionFunctionNode(debugProtectionFunctionName, options) {
        _classCallCheck(this, DebugProtectionFunctionNode);

        var _this = _possibleConstructorReturn(this, (DebugProtectionFunctionNode.__proto__ || Object.getPrototypeOf(DebugProtectionFunctionNode)).call(this, options));

        _this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        _this.debugProtectionFunctionName = debugProtectionFunctionName;
        return _this;
    }

    _createClass(DebugProtectionFunctionNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            var programBodyLength = blockScopeNode.body.length,
                randomIndex = Utils_1.Utils.getRandomGenerator().integer({
                min: 0,
                max: programBodyLength
            });
            NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), randomIndex);
        }
    }, {
        key: 'getNodeIdentifier',
        value: function getNodeIdentifier() {
            return this.debugProtectionFunctionName;
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            return NodeUtils_1.NodeUtils.convertCodeToStructure(DebugProtectionFunctionTemplate_1.DebugProtectionFunctionTemplate().formatUnicorn({
                debugProtectionFunctionName: this.debugProtectionFunctionName
            }));
        }
    }]);

    return DebugProtectionFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.DebugProtectionFunctionNode = DebugProtectionFunctionNode;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(4);
var DomainLockNodeTemplate_1 = __webpack_require__(69);
var AbstractCustomNode_1 = __webpack_require__(6);
var CustomNodeAppender_1 = __webpack_require__(15);
var NodeUtils_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(0);

var DomainLockNode = function (_AbstractCustomNode_) {
    _inherits(DomainLockNode, _AbstractCustomNode_);

    function DomainLockNode() {
        _classCallCheck(this, DomainLockNode);

        var _this = _possibleConstructorReturn(this, (DomainLockNode.__proto__ || Object.getPrototypeOf(DomainLockNode)).apply(this, arguments));

        _this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        return _this;
    }

    _createClass(DomainLockNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode, stackTraceData) {
            CustomNodeAppender_1.CustomNodeAppender.appendNode(stackTraceData, blockScopeNode.body, this.getNode(), CustomNodeAppender_1.CustomNodeAppender.getStackTraceIndexByThreshold(stackTraceData.length));
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            var domainsString = this.options.domainLock.join(';');
            var _Utils_1$Utils$hideSt = Utils_1.Utils.hideString(domainsString, domainsString.length * 3);

            var _Utils_1$Utils$hideSt2 = _slicedToArray(_Utils_1$Utils$hideSt, 2);

            var hiddenDomainsString = _Utils_1$Utils$hideSt2[0];
            var diff = _Utils_1$Utils$hideSt2[1];

            return NodeUtils_1.NodeUtils.convertCodeToStructure(DomainLockNodeTemplate_1.DomainLockNodeTemplate().formatUnicorn({
                diff: diff,
                domains: hiddenDomainsString
            }));
        }
    }]);

    return DomainLockNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.DomainLockNode = DomainLockNode;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppendState_1 = __webpack_require__(4);
var NoCustomNodesPreset_1 = __webpack_require__(18);
var SelfDefendingTemplate_1 = __webpack_require__(70);
var AbstractCustomNode_1 = __webpack_require__(6);
var JavaScriptObfuscator_1 = __webpack_require__(9);
var NodeUtils_1 = __webpack_require__(1);
var CustomNodeAppender_1 = __webpack_require__(15);

var SelfDefendingUnicodeNode = function (_AbstractCustomNode_) {
    _inherits(SelfDefendingUnicodeNode, _AbstractCustomNode_);

    function SelfDefendingUnicodeNode() {
        _classCallCheck(this, SelfDefendingUnicodeNode);

        var _this = _possibleConstructorReturn(this, (SelfDefendingUnicodeNode.__proto__ || Object.getPrototypeOf(SelfDefendingUnicodeNode)).apply(this, arguments));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        return _this;
    }

    _createClass(SelfDefendingUnicodeNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode, stackTraceData) {
            CustomNodeAppender_1.CustomNodeAppender.appendNode(stackTraceData, blockScopeNode.body, this.getNode(), CustomNodeAppender_1.CustomNodeAppender.getStackTraceIndexByThreshold(stackTraceData.length));
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            return NodeUtils_1.NodeUtils.convertCodeToStructure(JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(SelfDefendingTemplate_1.SelfDefendingTemplate(), NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET).getObfuscatedCode());
        }
    }]);

    return SelfDefendingUnicodeNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.SelfDefendingUnicodeNode = SelfDefendingUnicodeNode;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = (function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } });

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(4);
var UnicodeArrayCallsWrapperTemplate_1 = __webpack_require__(73);
var AbstractCustomNode_1 = __webpack_require__(6);
var NodeUtils_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(0);

var UnicodeArrayCallsWrapper = function (_AbstractCustomNode_) {
    _inherits(UnicodeArrayCallsWrapper, _AbstractCustomNode_);

    function UnicodeArrayCallsWrapper(unicodeArrayCallsWrapperName, unicodeArrayName, unicodeArray, options) {
        _classCallCheck(this, UnicodeArrayCallsWrapper);

        var _this = _possibleConstructorReturn(this, (UnicodeArrayCallsWrapper.__proto__ || Object.getPrototypeOf(UnicodeArrayCallsWrapper)).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.unicodeArrayCallsWrapperName = unicodeArrayCallsWrapperName;
        _this.unicodeArrayName = unicodeArrayName;
        _this.unicodeArray = unicodeArray;
        return _this;
    }

    _createClass(UnicodeArrayCallsWrapper, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            if (!this.unicodeArray.getLength()) {
                return;
            }
            NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
        }
    }, {
        key: 'getNodeIdentifier',
        value: function getNodeIdentifier() {
            return this.unicodeArrayCallsWrapperName;
        }
    }, {
        key: 'getNode',
        value: function getNode() {
            return _get(UnicodeArrayCallsWrapper.prototype.__proto__ || Object.getPrototypeOf(UnicodeArrayCallsWrapper.prototype), 'getNode', this).call(this);
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            var keyName = Utils_1.Utils.getRandomVariableName();
            return NodeUtils_1.NodeUtils.convertCodeToStructure(UnicodeArrayCallsWrapperTemplate_1.UnicodeArrayCallsWrapperTemplate().formatUnicorn({
                keyName: keyName,
                unicodeArrayCallsWrapperName: this.unicodeArrayCallsWrapperName,
                unicodeArrayName: this.unicodeArrayName
            }));
        }
    }]);

    return UnicodeArrayCallsWrapper;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.UnicodeArrayCallsWrapper = UnicodeArrayCallsWrapper;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = (function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } });

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(4);
var UnicodeArrayTemplate_1 = __webpack_require__(75);
var AbstractCustomNode_1 = __webpack_require__(6);
var NodeUtils_1 = __webpack_require__(1);

var UnicodeArrayNode = function (_AbstractCustomNode_) {
    _inherits(UnicodeArrayNode, _AbstractCustomNode_);

    function UnicodeArrayNode(unicodeArray, unicodeArrayName) {
        var unicodeArrayRotateValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var options = arguments[3];

        _classCallCheck(this, UnicodeArrayNode);

        var _this = _possibleConstructorReturn(this, (UnicodeArrayNode.__proto__ || Object.getPrototypeOf(UnicodeArrayNode)).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.unicodeArray = unicodeArray;
        _this.unicodeArrayName = unicodeArrayName;
        _this.unicodeArrayRotateValue = unicodeArrayRotateValue;
        return _this;
    }

    _createClass(UnicodeArrayNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            if (!this.unicodeArray.getLength()) {
                return;
            }
            NodeUtils_1.NodeUtils.prependNode(blockScopeNode.body, this.getNode());
        }
    }, {
        key: 'getNodeIdentifier',
        value: function getNodeIdentifier() {
            return this.unicodeArrayName;
        }
    }, {
        key: 'getNodeData',
        value: function getNodeData() {
            return this.unicodeArray;
        }
    }, {
        key: 'getNode',
        value: function getNode() {
            this.unicodeArray.rotateArray(this.unicodeArrayRotateValue);
            return _get(UnicodeArrayNode.prototype.__proto__ || Object.getPrototypeOf(UnicodeArrayNode.prototype), 'getNode', this).call(this);
        }
    }, {
        key: 'updateNodeData',
        value: function updateNodeData(data) {
            this.unicodeArray.addToArray(data);
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            return NodeUtils_1.NodeUtils.convertCodeToStructure(UnicodeArrayTemplate_1.UnicodeArrayTemplate().formatUnicorn({
                unicodeArrayName: this.unicodeArrayName,
                unicodeArray: this.unicodeArray.toString()
            }));
        }
    }]);

    return UnicodeArrayNode;
}(AbstractCustomNode_1.AbstractCustomNode);

UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH = 4;
exports.UnicodeArrayNode = UnicodeArrayNode;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = (function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } });

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(4);
var NoCustomNodesPreset_1 = __webpack_require__(18);
var SelfDefendingTemplate_1 = __webpack_require__(76);
var UnicodeArrayRotateFunctionTemplate_1 = __webpack_require__(77);
var AbstractCustomNode_1 = __webpack_require__(6);
var JavaScriptObfuscator_1 = __webpack_require__(9);
var NodeUtils_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(0);

var UnicodeArrayRotateFunctionNode = function (_AbstractCustomNode_) {
    _inherits(UnicodeArrayRotateFunctionNode, _AbstractCustomNode_);

    function UnicodeArrayRotateFunctionNode(unicodeArrayName, unicodeArray, unicodeArrayRotateValue, options) {
        _classCallCheck(this, UnicodeArrayRotateFunctionNode);

        var _this = _possibleConstructorReturn(this, (UnicodeArrayRotateFunctionNode.__proto__ || Object.getPrototypeOf(UnicodeArrayRotateFunctionNode)).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.unicodeArrayName = unicodeArrayName;
        _this.unicodeArray = unicodeArray;
        _this.unicodeArrayRotateValue = unicodeArrayRotateValue;
        return _this;
    }

    _createClass(UnicodeArrayRotateFunctionNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            if (!this.unicodeArray.getLength()) {
                return;
            }
            NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
        }
    }, {
        key: 'getNode',
        value: function getNode() {
            return _get(UnicodeArrayRotateFunctionNode.prototype.__proto__ || Object.getPrototypeOf(UnicodeArrayRotateFunctionNode.prototype), 'getNode', this).call(this);
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            var code = '',
                timesName = Utils_1.Utils.getRandomVariableName(),
                whileFunctionName = Utils_1.Utils.getRandomVariableName();
            if (this.options.selfDefending) {
                code = SelfDefendingTemplate_1.SelfDefendingTemplate().formatUnicorn({
                    timesName: timesName,
                    whileFunctionName: whileFunctionName
                });
            } else {
                code = whileFunctionName + '(++' + timesName + ')';
            }
            return NodeUtils_1.NodeUtils.convertCodeToStructure(JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(UnicodeArrayRotateFunctionTemplate_1.UnicodeArrayRotateFunctionTemplate().formatUnicorn({
                code: code,
                timesName: timesName,
                unicodeArrayName: this.unicodeArrayName,
                unicodeArrayRotateValue: Utils_1.Utils.decToHex(this.unicodeArrayRotateValue),
                whileFunctionName: whileFunctionName
            }), NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET).getObfuscatedCode());
        }
    }]);

    return UnicodeArrayRotateFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.UnicodeArrayRotateFunctionNode = UnicodeArrayRotateFunctionNode;

/***/ },
/* 41 */,
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractNodesGroup_1 = __webpack_require__(10);
var ConsoleOutputDisableExpressionNode_1 = __webpack_require__(32);

var ConsoleOutputNodesGroup = function (_AbstractNodesGroup_) {
    _inherits(ConsoleOutputNodesGroup, _AbstractNodesGroup_);

    function ConsoleOutputNodesGroup(options) {
        _classCallCheck(this, ConsoleOutputNodesGroup);

        var _this = _possibleConstructorReturn(this, (ConsoleOutputNodesGroup.__proto__ || Object.getPrototypeOf(ConsoleOutputNodesGroup)).call(this, options));

        if (!_this.options.disableConsoleOutput) {
            return _possibleConstructorReturn(_this);
        }
        _this.nodes.set('consoleOutputDisableExpressionNode', new ConsoleOutputDisableExpressionNode_1.ConsoleOutputDisableExpressionNode(_this.options));
        return _this;
    }

    return ConsoleOutputNodesGroup;
}(AbstractNodesGroup_1.AbstractNodesGroup);

exports.ConsoleOutputNodesGroup = ConsoleOutputNodesGroup;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebugProtectionFunctionCallNode_1 = __webpack_require__(33);
var DebugProtectionFunctionIntervalNode_1 = __webpack_require__(34);
var DebugProtectionFunctionNode_1 = __webpack_require__(35);
var AbstractNodesGroup_1 = __webpack_require__(10);
var Utils_1 = __webpack_require__(0);

var DebugProtectionNodesGroup = function (_AbstractNodesGroup_) {
    _inherits(DebugProtectionNodesGroup, _AbstractNodesGroup_);

    function DebugProtectionNodesGroup(options) {
        _classCallCheck(this, DebugProtectionNodesGroup);

        var _this = _possibleConstructorReturn(this, (DebugProtectionNodesGroup.__proto__ || Object.getPrototypeOf(DebugProtectionNodesGroup)).call(this, options));

        _this.debugProtectionFunctionIdentifier = Utils_1.Utils.getRandomVariableName();
        if (!_this.options.debugProtection) {
            return _possibleConstructorReturn(_this);
        }
        _this.nodes.set('debugProtectionFunctionNode', new DebugProtectionFunctionNode_1.DebugProtectionFunctionNode(_this.debugProtectionFunctionIdentifier, _this.options));
        _this.nodes.set('debugProtectionFunctionCallNode', new DebugProtectionFunctionCallNode_1.DebugProtectionFunctionCallNode(_this.debugProtectionFunctionIdentifier, _this.options));
        if (_this.options.debugProtectionInterval) {
            _this.nodes.set('debugProtectionFunctionIntervalNode', new DebugProtectionFunctionIntervalNode_1.DebugProtectionFunctionIntervalNode(_this.debugProtectionFunctionIdentifier, _this.options));
        }
        return _this;
    }

    return DebugProtectionNodesGroup;
}(AbstractNodesGroup_1.AbstractNodesGroup);

exports.DebugProtectionNodesGroup = DebugProtectionNodesGroup;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractNodesGroup_1 = __webpack_require__(10);
var DomainLockNode_1 = __webpack_require__(36);

var DomainLockNodesGroup = function (_AbstractNodesGroup_) {
    _inherits(DomainLockNodesGroup, _AbstractNodesGroup_);

    function DomainLockNodesGroup(options) {
        _classCallCheck(this, DomainLockNodesGroup);

        var _this = _possibleConstructorReturn(this, (DomainLockNodesGroup.__proto__ || Object.getPrototypeOf(DomainLockNodesGroup)).call(this, options));

        if (!_this.options.domainLock.length) {
            return _possibleConstructorReturn(_this);
        }
        _this.nodes.set('DomainLockNode', new DomainLockNode_1.DomainLockNode(_this.options));
        return _this;
    }

    return DomainLockNodesGroup;
}(AbstractNodesGroup_1.AbstractNodesGroup);

exports.DomainLockNodesGroup = DomainLockNodesGroup;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractNodesGroup_1 = __webpack_require__(10);
var SelfDefendingUnicodeNode_1 = __webpack_require__(37);

var SelfDefendingNodesGroup = function (_AbstractNodesGroup_) {
    _inherits(SelfDefendingNodesGroup, _AbstractNodesGroup_);

    function SelfDefendingNodesGroup(options) {
        _classCallCheck(this, SelfDefendingNodesGroup);

        var _this = _possibleConstructorReturn(this, (SelfDefendingNodesGroup.__proto__ || Object.getPrototypeOf(SelfDefendingNodesGroup)).call(this, options));

        if (!_this.options.selfDefending) {
            return _possibleConstructorReturn(_this);
        }
        _this.nodes.set('selfDefendingUnicodeNode', new SelfDefendingUnicodeNode_1.SelfDefendingUnicodeNode(_this.options));
        return _this;
    }

    return SelfDefendingNodesGroup;
}(AbstractNodesGroup_1.AbstractNodesGroup);

exports.SelfDefendingNodesGroup = SelfDefendingNodesGroup;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractNodesGroup_1 = __webpack_require__(10);
var UnicodeArray_1 = __webpack_require__(29);
var UnicodeArrayCallsWrapper_1 = __webpack_require__(38);
var UnicodeArrayDecodeNode_1 = __webpack_require__(87);
var UnicodeArrayNode_1 = __webpack_require__(39);
var UnicodeArrayRotateFunctionNode_1 = __webpack_require__(40);
var Utils_1 = __webpack_require__(0);

var UnicodeArrayNodesGroup = function (_AbstractNodesGroup_) {
    _inherits(UnicodeArrayNodesGroup, _AbstractNodesGroup_);

    function UnicodeArrayNodesGroup(options) {
        _classCallCheck(this, UnicodeArrayNodesGroup);

        var _this = _possibleConstructorReturn(this, (UnicodeArrayNodesGroup.__proto__ || Object.getPrototypeOf(UnicodeArrayNodesGroup)).call(this, options));

        _this.unicodeArrayName = Utils_1.Utils.getRandomVariableName(UnicodeArrayNode_1.UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH);
        _this.unicodeArrayTranslatorName = Utils_1.Utils.getRandomVariableName(UnicodeArrayNode_1.UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH);
        if (!_this.options.unicodeArray) {
            return _possibleConstructorReturn(_this);
        }
        if (_this.options.rotateUnicodeArray) {
            _this.unicodeArrayRotateValue = Utils_1.Utils.getRandomGenerator().integer({
                min: 100,
                max: 500
            });
        } else {
            _this.unicodeArrayRotateValue = 0;
        }
        var unicodeArray = new UnicodeArray_1.UnicodeArray(),
            unicodeArrayNode = new UnicodeArrayNode_1.UnicodeArrayNode(unicodeArray, _this.unicodeArrayName, _this.unicodeArrayRotateValue, _this.options);
        _this.nodes.set('unicodeArrayNode', unicodeArrayNode);
        if (_this.options.wrapUnicodeArrayCalls) {
            _this.nodes.set('unicodeArrayCallsWrapper', new UnicodeArrayCallsWrapper_1.UnicodeArrayCallsWrapper(_this.unicodeArrayTranslatorName, _this.unicodeArrayName, unicodeArray, _this.options));
        }
        if (_this.options.encodeUnicodeLiterals) {
            _this.nodes.set('unicodeArrayDecodeNode', new UnicodeArrayDecodeNode_1.UnicodeArrayDecodeNode(_this.unicodeArrayName, unicodeArray, _this.options));
        }
        if (_this.options.rotateUnicodeArray) {
            _this.nodes.set('unicodeArrayRotateFunctionNode', new UnicodeArrayRotateFunctionNode_1.UnicodeArrayRotateFunctionNode(_this.unicodeArrayName, unicodeArray, _this.unicodeArrayRotateValue, _this.options));
        }
        return _this;
    }

    return UnicodeArrayNodesGroup;
}(AbstractNodesGroup_1.AbstractNodesGroup);

exports.UnicodeArrayNodesGroup = UnicodeArrayNodesGroup;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(3);
var NodeType_1 = __webpack_require__(5);
var AbstractNodeObfuscator_1 = __webpack_require__(7);
var IdentifierReplacer_1 = __webpack_require__(14);
var Nodes_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(1);

var CatchClauseObfuscator = function (_AbstractNodeObfuscat) {
    _inherits(CatchClauseObfuscator, _AbstractNodeObfuscat);

    function CatchClauseObfuscator(nodes, options) {
        _classCallCheck(this, CatchClauseObfuscator);

        var _this = _possibleConstructorReturn(this, (CatchClauseObfuscator.__proto__ || Object.getPrototypeOf(CatchClauseObfuscator)).call(this, nodes, options));

        _this.identifierReplacer = new IdentifierReplacer_1.IdentifierReplacer(_this.nodes, _this.options);
        return _this;
    }

    _createClass(CatchClauseObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(catchClauseNode) {
            this.storeCatchClauseParam(catchClauseNode);
            this.replaceCatchClauseParam(catchClauseNode);
        }
    }, {
        key: 'storeCatchClauseParam',
        value: function storeCatchClauseParam(catchClauseNode) {
            var _this2 = this;

            NodeUtils_1.NodeUtils.typedReplace(catchClauseNode.param, NodeType_1.NodeType.Identifier, {
                enter: function enter(node) {
                    return _this2.identifierReplacer.storeNames(node.name);
                }
            });
        }
    }, {
        key: 'replaceCatchClauseParam',
        value: function replaceCatchClauseParam(catchClauseNode) {
            var _this3 = this;

            estraverse.replace(catchClauseNode, {
                enter: function enter(node, parentNode) {
                    if (Nodes_1.Nodes.isReplaceableIdentifierNode(node, parentNode)) {
                        node.name = _this3.identifierReplacer.replace(node.name);
                    }
                }
            });
        }
    }]);

    return CatchClauseObfuscator;
}(AbstractNodeObfuscator_1.AbstractNodeObfuscator);

exports.CatchClauseObfuscator = CatchClauseObfuscator;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(3);
var NodeType_1 = __webpack_require__(5);
var AbstractNodeObfuscator_1 = __webpack_require__(7);
var IdentifierReplacer_1 = __webpack_require__(14);
var Nodes_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(1);

var FunctionDeclarationObfuscator = function (_AbstractNodeObfuscat) {
    _inherits(FunctionDeclarationObfuscator, _AbstractNodeObfuscat);

    function FunctionDeclarationObfuscator(nodes, options) {
        _classCallCheck(this, FunctionDeclarationObfuscator);

        var _this = _possibleConstructorReturn(this, (FunctionDeclarationObfuscator.__proto__ || Object.getPrototypeOf(FunctionDeclarationObfuscator)).call(this, nodes, options));

        _this.identifierReplacer = new IdentifierReplacer_1.IdentifierReplacer(_this.nodes, _this.options);
        return _this;
    }

    _createClass(FunctionDeclarationObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(functionDeclarationNode, parentNode) {
            if (parentNode.type === NodeType_1.NodeType.Program) {
                return;
            }
            this.storeFunctionName(functionDeclarationNode);
            this.replaceFunctionName(functionDeclarationNode);
        }
    }, {
        key: 'storeFunctionName',
        value: function storeFunctionName(functionDeclarationNode) {
            var _this2 = this;

            NodeUtils_1.NodeUtils.typedReplace(functionDeclarationNode.id, NodeType_1.NodeType.Identifier, {
                enter: function enter(node) {
                    return _this2.identifierReplacer.storeNames(node.name);
                }
            });
        }
    }, {
        key: 'replaceFunctionName',
        value: function replaceFunctionName(functionDeclarationNode) {
            var _this3 = this;

            var scopeNode = NodeUtils_1.NodeUtils.getBlockScopeOfNode(functionDeclarationNode);
            estraverse.replace(scopeNode, {
                enter: function enter(node, parentNode) {
                    if (Nodes_1.Nodes.isReplaceableIdentifierNode(node, parentNode)) {
                        node.name = _this3.identifierReplacer.replace(node.name);
                    }
                }
            });
        }
    }]);

    return FunctionDeclarationObfuscator;
}(AbstractNodeObfuscator_1.AbstractNodeObfuscator);

exports.FunctionDeclarationObfuscator = FunctionDeclarationObfuscator;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(3);
var NodeType_1 = __webpack_require__(5);
var AbstractNodeObfuscator_1 = __webpack_require__(7);
var IdentifierReplacer_1 = __webpack_require__(14);
var Nodes_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(1);

var FunctionObfuscator = function (_AbstractNodeObfuscat) {
    _inherits(FunctionObfuscator, _AbstractNodeObfuscat);

    function FunctionObfuscator(nodes, options) {
        _classCallCheck(this, FunctionObfuscator);

        var _this = _possibleConstructorReturn(this, (FunctionObfuscator.__proto__ || Object.getPrototypeOf(FunctionObfuscator)).call(this, nodes, options));

        _this.identifierReplacer = new IdentifierReplacer_1.IdentifierReplacer(_this.nodes, _this.options);
        return _this;
    }

    _createClass(FunctionObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(functionNode) {
            this.storeFunctionParams(functionNode);
            this.replaceFunctionParams(functionNode);
        }
    }, {
        key: 'storeFunctionParams',
        value: function storeFunctionParams(functionNode) {
            var _this2 = this;

            functionNode.params.forEach(function (paramsNode) {
                NodeUtils_1.NodeUtils.typedReplace(paramsNode, NodeType_1.NodeType.Identifier, {
                    enter: function enter(node) {
                        return _this2.identifierReplacer.storeNames(node.name);
                    }
                });
            });
        }
    }, {
        key: 'replaceFunctionParams',
        value: function replaceFunctionParams(functionNode) {
            var _this3 = this;

            var replaceVisitor = {
                enter: function enter(node, parentNode) {
                    if (Nodes_1.Nodes.isReplaceableIdentifierNode(node, parentNode)) {
                        var newNodeName = _this3.identifierReplacer.replace(node.name);
                        if (node.name !== newNodeName) {
                            node.name = newNodeName;
                            node.obfuscated = true;
                        }
                    }
                }
            };
            functionNode.params.forEach(function (paramsNode) {
                estraverse.replace(paramsNode, replaceVisitor);
            });
            estraverse.replace(functionNode.body, replaceVisitor);
        }
    }]);

    return FunctionObfuscator;
}(AbstractNodeObfuscator_1.AbstractNodeObfuscator);

exports.FunctionObfuscator = FunctionObfuscator;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var escodegen = __webpack_require__(11);
var AbstractNodeObfuscator_1 = __webpack_require__(7);
var BooleanLiteralReplacer_1 = __webpack_require__(55);
var Nodes_1 = __webpack_require__(2);
var NumberLiteralReplacer_1 = __webpack_require__(21);
var StringLiteralReplacer_1 = __webpack_require__(17);

var LiteralObfuscator = function (_AbstractNodeObfuscat) {
    _inherits(LiteralObfuscator, _AbstractNodeObfuscat);

    function LiteralObfuscator() {
        _classCallCheck(this, LiteralObfuscator);

        return _possibleConstructorReturn(this, (LiteralObfuscator.__proto__ || Object.getPrototypeOf(LiteralObfuscator)).apply(this, arguments));
    }

    _createClass(LiteralObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(literalNode, parentNode) {
            if (Nodes_1.Nodes.isPropertyNode(parentNode) && parentNode.key === literalNode) {
                return;
            }
            var content = void 0;
            switch (_typeof(literalNode.value)) {
                case 'boolean':
                    content = new BooleanLiteralReplacer_1.BooleanLiteralReplacer(this.nodes, this.options).replace(literalNode.value);
                    break;
                case 'number':
                    content = new NumberLiteralReplacer_1.NumberLiteralReplacer(this.nodes, this.options).replace(literalNode.value);
                    break;
                case 'string':
                    content = new StringLiteralReplacer_1.StringLiteralReplacer(this.nodes, this.options).replace(literalNode.value);
                    break;
                default:
                    return;
            }
            literalNode['x-verbatim-property'] = {
                content: content,
                precedence: escodegen.Precedence.Primary
            };
        }
    }]);

    return LiteralObfuscator;
}(AbstractNodeObfuscator_1.AbstractNodeObfuscator);

exports.LiteralObfuscator = LiteralObfuscator;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var escodegen = __webpack_require__(11);
var estraverse = __webpack_require__(3);
var NodeType_1 = __webpack_require__(5);
var AbstractNodeObfuscator_1 = __webpack_require__(7);
var Nodes_1 = __webpack_require__(2);
var StringLiteralReplacer_1 = __webpack_require__(17);

var MemberExpressionObfuscator = function (_AbstractNodeObfuscat) {
    _inherits(MemberExpressionObfuscator, _AbstractNodeObfuscat);

    function MemberExpressionObfuscator() {
        _classCallCheck(this, MemberExpressionObfuscator);

        return _possibleConstructorReturn(this, (MemberExpressionObfuscator.__proto__ || Object.getPrototypeOf(MemberExpressionObfuscator)).apply(this, arguments));
    }

    _createClass(MemberExpressionObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(memberExpressionNode) {
            var _this2 = this;

            estraverse.replace(memberExpressionNode.property, {
                enter: function enter(node, parentNode) {
                    if (Nodes_1.Nodes.isLiteralNode(node)) {
                        _this2.obfuscateLiteralProperty(node);
                        return;
                    }
                    if (Nodes_1.Nodes.isIdentifierNode(node)) {
                        if (memberExpressionNode.computed) {
                            return;
                        }
                        memberExpressionNode.computed = true;
                        _this2.obfuscateIdentifierProperty(node);
                    }
                }
            });
        }
    }, {
        key: 'obfuscateIdentifierProperty',
        value: function obfuscateIdentifierProperty(node) {
            var nodeValue = node.name,
                literalNode = {
                raw: '\'' + nodeValue + '\'',
                'x-verbatim-property': {
                    content: new StringLiteralReplacer_1.StringLiteralReplacer(this.nodes, this.options).replace(nodeValue),
                    precedence: escodegen.Precedence.Primary
                },
                type: NodeType_1.NodeType.Literal,
                value: nodeValue
            };
            delete node.name;
            Object.assign(node, literalNode);
        }
    }, {
        key: 'obfuscateLiteralProperty',
        value: function obfuscateLiteralProperty(node) {
            if (typeof node.value === 'string' && !node['x-verbatim-property']) {
                node['x-verbatim-property'] = {
                    content: new StringLiteralReplacer_1.StringLiteralReplacer(this.nodes, this.options).replace(node.value),
                    precedence: escodegen.Precedence.Primary
                };
            }
        }
    }]);

    return MemberExpressionObfuscator;
}(AbstractNodeObfuscator_1.AbstractNodeObfuscator);

exports.MemberExpressionObfuscator = MemberExpressionObfuscator;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(3);
var AbstractNodeObfuscator_1 = __webpack_require__(7);
var Nodes_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(0);
var StringLiteralReplacer_1 = __webpack_require__(17);

var MethodDefinitionObfuscator = function (_AbstractNodeObfuscat) {
    _inherits(MethodDefinitionObfuscator, _AbstractNodeObfuscat);

    function MethodDefinitionObfuscator() {
        _classCallCheck(this, MethodDefinitionObfuscator);

        var _this = _possibleConstructorReturn(this, (MethodDefinitionObfuscator.__proto__ || Object.getPrototypeOf(MethodDefinitionObfuscator)).apply(this, arguments));

        _this.ignoredNames = ['constructor'];
        return _this;
    }

    _createClass(MethodDefinitionObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(methodDefinitionNode, parentNode) {
            this.replaceMethodName(methodDefinitionNode);
        }
    }, {
        key: 'replaceMethodName',
        value: function replaceMethodName(methodDefinitionNode) {
            var _this2 = this;

            estraverse.replace(methodDefinitionNode.key, {
                enter: function enter(node) {
                    if (Nodes_1.Nodes.isIdentifierNode(node) && !Utils_1.Utils.arrayContains(_this2.ignoredNames, node.name) && methodDefinitionNode.computed === false) {
                        methodDefinitionNode.computed = true;
                        node.name = new StringLiteralReplacer_1.StringLiteralReplacer(_this2.nodes, _this2.options).replace(node.name);
                        return;
                    }
                    return estraverse.VisitorOption.Skip;
                }
            });
        }
    }]);

    return MethodDefinitionObfuscator;
}(AbstractNodeObfuscator_1.AbstractNodeObfuscator);

exports.MethodDefinitionObfuscator = MethodDefinitionObfuscator;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var escodegen = __webpack_require__(11);
var estraverse = __webpack_require__(3);
var NodeType_1 = __webpack_require__(5);
var AbstractNodeObfuscator_1 = __webpack_require__(7);
var Nodes_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(0);

var ObjectExpressionObfuscator = function (_AbstractNodeObfuscat) {
    _inherits(ObjectExpressionObfuscator, _AbstractNodeObfuscat);

    function ObjectExpressionObfuscator() {
        _classCallCheck(this, ObjectExpressionObfuscator);

        return _possibleConstructorReturn(this, (ObjectExpressionObfuscator.__proto__ || Object.getPrototypeOf(ObjectExpressionObfuscator)).apply(this, arguments));
    }

    _createClass(ObjectExpressionObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(objectExpressionNode) {
            var _this2 = this;

            objectExpressionNode.properties.forEach(function (property) {
                if (property.shorthand) {
                    property.shorthand = false;
                }
                estraverse.replace(property.key, {
                    enter: function enter(node, parentNode) {
                        if (Nodes_1.Nodes.isLiteralNode(node)) {
                            _this2.obfuscateLiteralPropertyKey(node);
                            return;
                        }
                        if (Nodes_1.Nodes.isIdentifierNode(node)) {
                            _this2.obfuscateIdentifierPropertyKey(node);
                        }
                    }
                });
            });
        }
    }, {
        key: 'obfuscateLiteralPropertyKey',
        value: function obfuscateLiteralPropertyKey(node) {
            if (typeof node.value === 'string' && !node['x-verbatim-property']) {
                node['x-verbatim-property'] = {
                    content: Utils_1.Utils.stringToUnicode(node.value),
                    precedence: escodegen.Precedence.Primary
                };
            }
        }
    }, {
        key: 'obfuscateIdentifierPropertyKey',
        value: function obfuscateIdentifierPropertyKey(node) {
            var nodeValue = node.name,
                literalNode = {
                raw: '\'' + nodeValue + '\'',
                'x-verbatim-property': {
                    content: Utils_1.Utils.stringToUnicode(nodeValue),
                    precedence: escodegen.Precedence.Primary
                },
                type: NodeType_1.NodeType.Literal,
                value: nodeValue
            };
            delete node.name;
            Object.assign(node, literalNode);
        }
    }]);

    return ObjectExpressionObfuscator;
}(AbstractNodeObfuscator_1.AbstractNodeObfuscator);

exports.ObjectExpressionObfuscator = ObjectExpressionObfuscator;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(3);
var NodeType_1 = __webpack_require__(5);
var AbstractNodeObfuscator_1 = __webpack_require__(7);
var IdentifierReplacer_1 = __webpack_require__(14);
var Nodes_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(1);

var VariableDeclarationObfuscator = function (_AbstractNodeObfuscat) {
    _inherits(VariableDeclarationObfuscator, _AbstractNodeObfuscat);

    function VariableDeclarationObfuscator(nodes, options) {
        _classCallCheck(this, VariableDeclarationObfuscator);

        var _this = _possibleConstructorReturn(this, (VariableDeclarationObfuscator.__proto__ || Object.getPrototypeOf(VariableDeclarationObfuscator)).call(this, nodes, options));

        _this.identifierReplacer = new IdentifierReplacer_1.IdentifierReplacer(_this.nodes, _this.options);
        return _this;
    }

    _createClass(VariableDeclarationObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(variableDeclarationNode, parentNode) {
            if (parentNode.type === NodeType_1.NodeType.Program) {
                return;
            }
            this.storeVariableNames(variableDeclarationNode);
            this.replaceVariableNames(variableDeclarationNode, parentNode);
        }
    }, {
        key: 'storeVariableNames',
        value: function storeVariableNames(variableDeclarationNode) {
            var _this2 = this;

            variableDeclarationNode.declarations.forEach(function (declarationNode) {
                NodeUtils_1.NodeUtils.typedReplace(declarationNode.id, NodeType_1.NodeType.Identifier, {
                    enter: function enter(node) {
                        return _this2.identifierReplacer.storeNames(node.name);
                    }
                });
            });
        }
    }, {
        key: 'replaceVariableNames',
        value: function replaceVariableNames(variableDeclarationNode, variableParentNode) {
            var _this3 = this;

            var scopeNode = variableDeclarationNode.kind === 'var' ? NodeUtils_1.NodeUtils.getBlockScopeOfNode(variableDeclarationNode) : variableParentNode;
            estraverse.replace(scopeNode, {
                enter: function enter(node, parentNode) {
                    if (!node.obfuscated && Nodes_1.Nodes.isReplaceableIdentifierNode(node, parentNode)) {
                        node.name = _this3.identifierReplacer.replace(node.name);
                    }
                }
            });
        }
    }]);

    return VariableDeclarationObfuscator;
}(AbstractNodeObfuscator_1.AbstractNodeObfuscator);

exports.VariableDeclarationObfuscator = VariableDeclarationObfuscator;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JSFuck_1 = __webpack_require__(20);
var AbstractReplacer_1 = __webpack_require__(13);

var BooleanLiteralReplacer = function (_AbstractReplacer_1$A) {
    _inherits(BooleanLiteralReplacer, _AbstractReplacer_1$A);

    function BooleanLiteralReplacer() {
        _classCallCheck(this, BooleanLiteralReplacer);

        return _possibleConstructorReturn(this, (BooleanLiteralReplacer.__proto__ || Object.getPrototypeOf(BooleanLiteralReplacer)).apply(this, arguments));
    }

    _createClass(BooleanLiteralReplacer, [{
        key: 'replace',
        value: function replace(nodeValue) {
            return nodeValue ? JSFuck_1.JSFuck.True : JSFuck_1.JSFuck.False;
        }
    }]);

    return BooleanLiteralReplacer;
}(AbstractReplacer_1.AbstractReplacer);

exports.BooleanLiteralReplacer = BooleanLiteralReplacer;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var class_validator_1 = __webpack_require__(81);
var TSourceMapMode_1 = __webpack_require__(78);
var DefaultPreset_1 = __webpack_require__(22);
var OptionsNormalizer_1 = __webpack_require__(57);
var ValidationErrorsFormatter_1 = __webpack_require__(58);

var Options = function Options(obfuscatorOptions) {
    _classCallCheck(this, Options);

    Object.assign(this, DefaultPreset_1.DEFAULT_PRESET, obfuscatorOptions);
    var errors = class_validator_1.validateSync(this, Options.validatorOptions);
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
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "compact", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "debugProtection", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "debugProtectionInterval", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "disableConsoleOutput", void 0);
__decorate([class_validator_1.IsArray(), class_validator_1.ArrayUnique(), class_validator_1.IsString({
    each: true
}), __metadata('design:type', Array)], Options.prototype, "domainLock", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "encodeUnicodeLiterals", void 0);
__decorate([class_validator_1.IsArray(), class_validator_1.ArrayUnique(), class_validator_1.IsString({
    each: true
}), __metadata('design:type', Array)], Options.prototype, "reservedNames", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "rotateUnicodeArray", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "selfDefending", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "sourceMap", void 0);
__decorate([class_validator_1.IsString(), class_validator_1.ValidateIf(function (options) {
    return Boolean(options.sourceMapBaseUrl);
}), class_validator_1.IsUrl({
    require_protocol: false,
    require_valid_protocol: true
}), __metadata('design:type', String)], Options.prototype, "sourceMapBaseUrl", void 0);
__decorate([class_validator_1.IsString(), __metadata('design:type', String)], Options.prototype, "sourceMapFileName", void 0);
__decorate([class_validator_1.IsIn(['inline', 'separate']), __metadata('design:type', typeof (_a = typeof TSourceMapMode_1.TSourceMapMode !== 'undefined' && TSourceMapMode_1.TSourceMapMode) === 'function' && _a || Object)], Options.prototype, "sourceMapMode", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "unicodeArray", void 0);
__decorate([class_validator_1.IsNumber(), class_validator_1.Min(0), class_validator_1.Max(1), __metadata('design:type', Number)], Options.prototype, "unicodeArrayThreshold", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "wrapUnicodeArrayCalls", void 0);
exports.Options = Options;
var _a;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils_1 = __webpack_require__(0);

var OptionsNormalizer = function () {
    function OptionsNormalizer() {
        _classCallCheck(this, OptionsNormalizer);
    }

    _createClass(OptionsNormalizer, null, [{
        key: 'normalizeOptions',
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
    }, {
        key: 'domainLockRule',
        value: function domainLockRule(options) {
            if (options.domainLock.length) {
                var normalizedDomains = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = options.domainLock[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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

                Object.assign(options, {
                    domainLock: normalizedDomains
                });
            }
            return options;
        }
    }, {
        key: 'encodeUnicodeLiteralsRule',
        value: function encodeUnicodeLiteralsRule(options) {
            if (options.unicodeArray && options.encodeUnicodeLiterals) {
                Object.assign(options, OptionsNormalizer.ENCODE_UNICODE_LITERALS_OPTIONS);
            }
            return options;
        }
    }, {
        key: 'selfDefendingRule',
        value: function selfDefendingRule(options) {
            if (options.selfDefending) {
                Object.assign(options, OptionsNormalizer.SELF_DEFENDING_OPTIONS);
            }
            return options;
        }
    }, {
        key: 'sourceMapBaseUrl',
        value: function sourceMapBaseUrl(options) {
            var sourceMapBaseUrl = options.sourceMapBaseUrl;
            if (!options.sourceMapFileName) {
                Object.assign(options, {
                    sourceMapBaseUrl: ''
                });
                return options;
            }
            if (sourceMapBaseUrl && !sourceMapBaseUrl.endsWith('/')) {
                Object.assign(options, {
                    sourceMapBaseUrl: sourceMapBaseUrl + '/'
                });
            }
            return options;
        }
    }, {
        key: 'sourceMapFileName',
        value: function sourceMapFileName(options) {
            var sourceMapFileName = options.sourceMapFileName;
            if (sourceMapFileName) {
                sourceMapFileName = sourceMapFileName.replace(/^\/+/, '').split('.')[0];
                Object.assign(options, {
                    sourceMapFileName: sourceMapFileName + '.js.map'
                });
            }
            return options;
        }
    }, {
        key: 'unicodeArrayRule',
        value: function unicodeArrayRule(options) {
            if (!options.unicodeArray) {
                Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
            }
            return options;
        }
    }, {
        key: 'unicodeArrayThresholdRule',
        value: function unicodeArrayThresholdRule(options) {
            if (options.unicodeArrayThreshold === 0) {
                Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
            }
            return options;
        }
    }]);

    return OptionsNormalizer;
}();

OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS = {
    encodeUnicodeLiterals: false,
    rotateUnicodeArray: false,
    unicodeArray: false,
    unicodeArrayThreshold: 0,
    wrapUnicodeArrayCalls: false
};
OptionsNormalizer.ENCODE_UNICODE_LITERALS_OPTIONS = {
    encodeUnicodeLiterals: true,
    wrapUnicodeArrayCalls: true
};
OptionsNormalizer.SELF_DEFENDING_OPTIONS = {
    compact: true,
    selfDefending: true
};
OptionsNormalizer.normalizerRules = [OptionsNormalizer.domainLockRule, OptionsNormalizer.unicodeArrayRule, OptionsNormalizer.unicodeArrayThresholdRule, OptionsNormalizer.encodeUnicodeLiteralsRule, OptionsNormalizer.sourceMapBaseUrl, OptionsNormalizer.sourceMapFileName, OptionsNormalizer.selfDefendingRule];
exports.OptionsNormalizer = OptionsNormalizer;

/***/ },
/* 58 */
/***/ function(module, exports) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
            var errorString = "`" + validationError.property + "` errors:\n",
                constraints = validationError.constraints;
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

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = __webpack_require__(3);
var NodeType_1 = __webpack_require__(5);
var FunctionDeclarationCalleeDataExtractor_1 = __webpack_require__(60);
var FunctionExpressionCalleeDataExtractor_1 = __webpack_require__(61);
var ObjectExpressionCalleeDataExtractor_1 = __webpack_require__(62);
var Nodes_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(1);

var StackTraceAnalyzer = function () {
    function StackTraceAnalyzer(blockScopeBody) {
        _classCallCheck(this, StackTraceAnalyzer);

        this.calleeDataExtractors = new Map([[NodeType_1.NodeType.FunctionDeclaration, FunctionDeclarationCalleeDataExtractor_1.FunctionDeclarationCalleeDataExtractor], [NodeType_1.NodeType.FunctionExpression, FunctionExpressionCalleeDataExtractor_1.FunctionExpressionCalleeDataExtractor], [NodeType_1.NodeType.ObjectExpression, ObjectExpressionCalleeDataExtractor_1.ObjectExpressionCalleeDataExtractor]]);
        this.blockScopeBody = blockScopeBody;
    }

    _createClass(StackTraceAnalyzer, [{
        key: 'analyze',
        value: function analyze() {
            return this.analyzeRecursive(this.blockScopeBody);
        }
    }, {
        key: 'analyzeRecursive',
        value: function analyzeRecursive(blockScopeBody) {
            var _this = this;

            var stackTraceData = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function _loop() {
                    var rootNode = _step.value;

                    estraverse.traverse(rootNode, {
                        enter: function enter(node) {
                            if (!Nodes_1.Nodes.isCallExpressionNode(node) || rootNode.parentNode !== NodeUtils_1.NodeUtils.getBlockScopeOfNode(node)) {
                                return;
                            }
                            _this.calleeDataExtractors.forEach(function (calleeDataExtractor) {
                                var calleeData = new calleeDataExtractor(blockScopeBody, node.callee).extract();
                                if (!calleeData) {
                                    return;
                                }
                                stackTraceData.push(Object.assign({}, calleeData, {
                                    stackTrace: _this.analyzeRecursive(calleeData.callee.body)
                                }));
                            });
                        }
                    });
                };

                for (var _iterator = blockScopeBody[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
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

            return stackTraceData;
        }
    }]);

    return StackTraceAnalyzer;
}();

exports.StackTraceAnalyzer = StackTraceAnalyzer;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = __webpack_require__(3);
var Nodes_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(1);

var FunctionDeclarationCalleeDataExtractor = function () {
    function FunctionDeclarationCalleeDataExtractor(blockScopeBody, callee) {
        _classCallCheck(this, FunctionDeclarationCalleeDataExtractor);

        this.blockScopeBody = blockScopeBody;
        this.callee = callee;
    }

    _createClass(FunctionDeclarationCalleeDataExtractor, [{
        key: 'extract',
        value: function extract() {
            var calleeBlockStatement = null;
            if (Nodes_1.Nodes.isIdentifierNode(this.callee)) {
                calleeBlockStatement = this.getCalleeBlockStatement(NodeUtils_1.NodeUtils.getBlockScopeOfNode(this.blockScopeBody[0]), this.callee.name);
            }
            if (!calleeBlockStatement) {
                return null;
            }
            return {
                callee: calleeBlockStatement,
                name: this.callee.name
            };
        }
    }, {
        key: 'getCalleeBlockStatement',
        value: function getCalleeBlockStatement(node, name) {
            var calleeBlockStatement = null;
            estraverse.traverse(node, {
                enter: function enter(node) {
                    if (Nodes_1.Nodes.isFunctionDeclarationNode(node) && node.id.name === name) {
                        calleeBlockStatement = node.body;
                        return estraverse.VisitorOption.Break;
                    }
                }
            });
            return calleeBlockStatement;
        }
    }]);

    return FunctionDeclarationCalleeDataExtractor;
}();

exports.FunctionDeclarationCalleeDataExtractor = FunctionDeclarationCalleeDataExtractor;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = __webpack_require__(3);
var Nodes_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(1);

var FunctionExpressionCalleeDataExtractor = function () {
    function FunctionExpressionCalleeDataExtractor(blockScopeBody, callee) {
        _classCallCheck(this, FunctionExpressionCalleeDataExtractor);

        this.blockScopeBody = blockScopeBody;
        this.callee = callee;
    }

    _createClass(FunctionExpressionCalleeDataExtractor, [{
        key: 'extract',
        value: function extract() {
            var calleeBlockStatement = null;
            if (Nodes_1.Nodes.isIdentifierNode(this.callee)) {
                calleeBlockStatement = this.getCalleeBlockStatement(NodeUtils_1.NodeUtils.getBlockScopeOfNode(this.blockScopeBody[0]), this.callee.name);
            }
            if (Nodes_1.Nodes.isFunctionExpressionNode(this.callee)) {
                calleeBlockStatement = this.callee.body;
            }
            if (!calleeBlockStatement) {
                return null;
            }
            return {
                callee: calleeBlockStatement,
                name: this.callee.name || null
            };
        }
    }, {
        key: 'getCalleeBlockStatement',
        value: function getCalleeBlockStatement(node, name) {
            var calleeBlockStatement = null;
            estraverse.traverse(node, {
                enter: function enter(node, parentNode) {
                    if (Nodes_1.Nodes.isFunctionExpressionNode(node) && Nodes_1.Nodes.isVariableDeclaratorNode(parentNode) && Nodes_1.Nodes.isIdentifierNode(parentNode.id) && parentNode.id.name === name) {
                        calleeBlockStatement = node.body;
                        return estraverse.VisitorOption.Break;
                    }
                }
            });
            return calleeBlockStatement;
        }
    }]);

    return FunctionExpressionCalleeDataExtractor;
}();

exports.FunctionExpressionCalleeDataExtractor = FunctionExpressionCalleeDataExtractor;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = __webpack_require__(3);
var Nodes_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(1);

var ObjectExpressionCalleeDataExtractor = function () {
    function ObjectExpressionCalleeDataExtractor(blockScopeBody, callee) {
        _classCallCheck(this, ObjectExpressionCalleeDataExtractor);

        this.objectMembersCallsChain = [];
        this.blockScopeBody = blockScopeBody;
        this.callee = callee;
    }

    _createClass(ObjectExpressionCalleeDataExtractor, [{
        key: 'extract',
        value: function extract() {
            var calleeBlockStatement = null,
                functionExpressionName = null;
            if (Nodes_1.Nodes.isMemberExpressionNode(this.callee)) {
                this.objectMembersCallsChain = this.createObjectMembersCallsChain(this.objectMembersCallsChain, this.callee);
                if (!this.objectMembersCallsChain.length) {
                    return null;
                }
                functionExpressionName = this.objectMembersCallsChain[this.objectMembersCallsChain.length - 1];
                calleeBlockStatement = this.getCalleeBlockStatement(NodeUtils_1.NodeUtils.getBlockScopeOfNode(this.blockScopeBody[0]), this.objectMembersCallsChain);
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
        key: 'createObjectMembersCallsChain',
        value: function createObjectMembersCallsChain(currentChain, memberExpression) {
            if (Nodes_1.Nodes.isIdentifierNode(memberExpression.property)) {
                currentChain.unshift(memberExpression.property.name);
            } else if (Nodes_1.Nodes.isLiteralNode(memberExpression.property) && typeof memberExpression.property.value === 'string') {
                currentChain.unshift(memberExpression.property.value);
            } else {
                return currentChain;
            }
            if (Nodes_1.Nodes.isMemberExpressionNode(memberExpression.object)) {
                return this.createObjectMembersCallsChain(currentChain, memberExpression.object);
            }
            if (Nodes_1.Nodes.isIdentifierNode(memberExpression.object)) {
                currentChain.unshift(memberExpression.object.name);
            }
            return currentChain;
        }
    }, {
        key: 'getCalleeBlockStatement',
        value: function getCalleeBlockStatement(node, objectMembersCallsChain) {
            var _this = this;

            var objectName = objectMembersCallsChain.shift();
            var calleeBlockStatement = null;
            estraverse.traverse(node, {
                enter: function enter(node, parentNode) {
                    if (Nodes_1.Nodes.isVariableDeclaratorNode(node) && Nodes_1.Nodes.isIdentifierNode(node.id) && node.init && Nodes_1.Nodes.isObjectExpressionNode(node.init) && node.id.name === objectName) {
                        calleeBlockStatement = _this.findCalleeBlockStatement(node.init.properties, objectMembersCallsChain);
                        return estraverse.VisitorOption.Break;
                    }
                }
            });
            return calleeBlockStatement;
        }
    }, {
        key: 'findCalleeBlockStatement',
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

                    var isTargetPropertyNodeWithIdentifierKey = Nodes_1.Nodes.isIdentifierNode(propertyNode.key) && propertyNode.key.name === nextItemInCallsChain;
                    var isTargetPropertyNodeWithLiteralKey = Nodes_1.Nodes.isLiteralNode(propertyNode.key) && Boolean(propertyNode.key.value) && propertyNode.key.value === nextItemInCallsChain;
                    if (!isTargetPropertyNodeWithIdentifierKey && !isTargetPropertyNodeWithLiteralKey) {
                        continue;
                    }
                    if (Nodes_1.Nodes.isObjectExpressionNode(propertyNode.value)) {
                        return this.findCalleeBlockStatement(propertyNode.value.properties, objectMembersCallsChain);
                    }
                    if (Nodes_1.Nodes.isFunctionExpressionNode(propertyNode.value)) {
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
}();

exports.ObjectExpressionCalleeDataExtractor = ObjectExpressionCalleeDataExtractor;

/***/ },
/* 63 */
/***/ function(module, exports) {

"use strict";
"use strict";

function AtobTemplate() {
    return "\n        (function () {\n            var object = []['filter']['constructor']('return this')();\n            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n\n            object.atob || (\n                object.atob = function(input) {\n                    var str = String(input).replace(/=+$/, '');\n                    for (\n                        var bc = 0, bs, buffer, idx = 0, output = '';\n                        buffer = str.charAt(idx++);\n                        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,\n                            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0\n                    ) {\n                        buffer = chars.indexOf(buffer);\n                    }\n                return output;\n            });\n        })();\n    ";
}
exports.AtobTemplate = AtobTemplate;

/***/ },
/* 64 */,
/* 65 */
/***/ function(module, exports) {

"use strict";
"use strict";

function ConsoleOutputDisableExpressionTemplate() {
    return "\n        (function () {\n            var _ = '(\x04\x06\x03\x05[]' + '[\"filter\"][\"\x07tructor\"]' + '(\"return this\")()' + '.' + '\x03;\x06\x02\x05\x04};' + '_\x03.log\x01.in' + 'fo\x01.' + 'war' + 'n\x01.er' + 'r' + 'or\x01})();' + '\x01\x05_\x02;' + '_\x03\x02function' + '\x03\x07ole\x04\x02 ()' + '{\x05 = \x06var ' + '_\x07cons', \n                Y, \n                $;\n            \n            for (Y in $ = \"\x07\x06\x05\x04\x03\x02\x01\") {\n              var arr = _.split($[Y]);\n              _ = arr.join(arr.pop());\n            }\n            \n            [][\"filter\"][\"constructor\"](_)();\n        })()\n    ";
}
exports.ConsoleOutputDisableExpressionTemplate = ConsoleOutputDisableExpressionTemplate;

/***/ },
/* 66 */
/***/ function(module, exports) {

"use strict";
"use strict";

function DebugProtectionFunctionCallTemplate() {
    return "{debugProtectionFunctionName}();";
}
exports.DebugProtectionFunctionCallTemplate = DebugProtectionFunctionCallTemplate;

/***/ },
/* 67 */
/***/ function(module, exports) {

"use strict";
"use strict";

function DebugProtectionFunctionIntervalTemplate() {
    return "\n        setInterval(function () {\n            {debugProtectionFunctionName}();\n        }, 4000);\n    ";
}
exports.DebugProtectionFunctionIntervalTemplate = DebugProtectionFunctionIntervalTemplate;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var Utils_1 = __webpack_require__(0);
function DebugProtectionFunctionTemplate() {
    return '\n        var {debugProtectionFunctionName} = function () {\n            function debuggerProtection (counter) {\n                if ((\'\' + counter / counter)[\'length\'] !== 1 || counter % 20 === 0) {\n                    (function () {}.constructor(\'debugger\')());\n                } else {\n                    [].filter.constructor(' + Utils_1.Utils.stringToJSFuck('debugger') + ')();\n                }\n                \n                debuggerProtection(++counter);\n            }\n            \n            try {\n                debuggerProtection(0);\n            } catch (y) {}\n        };\n    ';
}
exports.DebugProtectionFunctionTemplate = DebugProtectionFunctionTemplate;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var Utils_1 = __webpack_require__(0);
function DomainLockNodeTemplate() {
    return '\n        (function () {\n            var regExp = new RegExp("[{diff}]", "g");\n            var domains = "{domains}".replace(regExp, "").split(";");\n            var eval = []["forEach"]["constructor"];\n            var window = eval("return this")();\n            \n            for (var d in window) {\n                if (d.length == 8 && d.charCodeAt(7) == 116 && d.charCodeAt(5) == 101 && d.charCodeAt(3) == 117 && d.charCodeAt(0) == 100) {\n                    break;\n                }\n            }\n\n            for (var d1 in window[d]) {\n                if (d1.length == 6 && d1.charCodeAt(5) == 110 && d1.charCodeAt(0) == 100) {\n                    break;\n                }\n            }\n\n            var currentDomain = window[d][d1];\n            \n            if (!currentDomain) {\n                return;\n            }\n            \n            var ok = false;\n                        \n            for (var i = 0; i < domains.length; i++) {\n                var domain = domains[i];\n                var position = currentDomain.length - domain.length;\n                var lastIndex = currentDomain.indexOf(domain, position);\n                var endsWith = lastIndex !== -1 && lastIndex === position;\n                \n                if (endsWith) {\n                    if (currentDomain.length == domain.length || domain.indexOf(".") === 0) {\n                        ok = true;\n                    }\n                    \n                    break;\n                }\n            }\n                \n            if (!ok) {\n                eval(\'' + Utils_1.Utils.stringToJSFuck('while') + '(true){}\')();\n            }\n        })();\n    ';
}
exports.DomainLockNodeTemplate = DomainLockNodeTemplate;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var Utils_1 = __webpack_require__(0);
function SelfDefendingTemplate() {
    return '\n        (function () {                                \n            var func = function(){return \'dev\';},\n                func2 = function () {\n                    return \'window\';\n                };\n        \n            !Function(' + Utils_1.Utils.stringToUnicode('return/\\w+ *\\(\\) *{\\w+ *[\'|"].+[\'|"];? *}/') + ')().test(func.toString()) ? Function(' + Utils_1.Utils.stringToUnicode('return/(\\\\[x|u](\\w){2,4})+/') + ')().test(func2.toString()) ? [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(false){}\')() : [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(true){}\')() : [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(false){}\')();\n        })();\n    ';
}
exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ },
/* 71 */,
/* 72 */,
/* 73 */
/***/ function(module, exports) {

"use strict";
"use strict";

function UnicodeArrayCallsWrapperTemplate() {
    return "\n        var {unicodeArrayCallsWrapperName} = function ({keyName}) {\n            return {unicodeArrayName}[parseInt({keyName}, 0x010)];\n        };\n    ";
}
exports.UnicodeArrayCallsWrapperTemplate = UnicodeArrayCallsWrapperTemplate;

/***/ },
/* 74 */,
/* 75 */
/***/ function(module, exports) {

"use strict";
"use strict";

function UnicodeArrayTemplate() {
    return "\n        var {unicodeArrayName} = [{unicodeArray}];\n    ";
}
exports.UnicodeArrayTemplate = UnicodeArrayTemplate;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var Utils_1 = __webpack_require__(0);
function SelfDefendingTemplate() {
    return '(function () {\n        var func = function(){return \'dev\';};\n                            \n        !Function(' + Utils_1.Utils.stringToUnicode('return/\\w+ *\\(\\) *{\\w+ *[\'|"].+[\'|"];? *}/') + ')().test(func.toString()) ? [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(true){}\')() : Function(\'a\', \'b\', \'a(++b)\')({whileFunctionName}, {timesName}) ? [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(false){}\')() : [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(false){}\')();\n    })();';
}
exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ },
/* 77 */
/***/ function(module, exports) {

"use strict";
"use strict";

function UnicodeArrayRotateFunctionTemplate() {
    return "\n        (function (array, {timesName}) {\n            var {whileFunctionName} = function (times) {\n                while (--times) {\n                    array['push'](array['shift']());\n                }\n            };\n            \n            {code}\n        })({unicodeArrayName}, 0x{unicodeArrayRotateValue});\n    ";
}
exports.UnicodeArrayRotateFunctionTemplate = UnicodeArrayRotateFunctionTemplate;

/***/ },
/* 78 */
/***/ function(module, exports) {

"use strict";
"use strict";

/***/ },
/* 79 */,
/* 80 */
/***/ function(module, exports) {

module.exports = require("chance");

/***/ },
/* 81 */
/***/ function(module, exports) {

module.exports = require("class-validator");

/***/ },
/* 82 */
/***/ function(module, exports) {

module.exports = require("commander");

/***/ },
/* 83 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 84 */
/***/ function(module, exports) {

module.exports = require("mkdirp");

/***/ },
/* 85 */,
/* 86 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var JavaScriptObfuscator_1 = __webpack_require__(9);
if (!global._babelPolyfill) {
    __webpack_require__(25);
}
module.exports = JavaScriptObfuscator_1.JavaScriptObfuscator;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = (function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } });

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(4);
var NoCustomNodesPreset_1 = __webpack_require__(18);
var AtobTemplate_1 = __webpack_require__(63);
var SelfDefendingTemplate_1 = __webpack_require__(88);
var UnicodeArrayDecodeNodeTemplate_1 = __webpack_require__(89);
var AbstractCustomNode_1 = __webpack_require__(6);
var JavaScriptObfuscator_1 = __webpack_require__(9);
var NodeUtils_1 = __webpack_require__(1);

var UnicodeArrayDecodeNode = function (_AbstractCustomNode_) {
    _inherits(UnicodeArrayDecodeNode, _AbstractCustomNode_);

    function UnicodeArrayDecodeNode(unicodeArrayName, unicodeArray, options) {
        _classCallCheck(this, UnicodeArrayDecodeNode);

        var _this = _possibleConstructorReturn(this, (UnicodeArrayDecodeNode.__proto__ || Object.getPrototypeOf(UnicodeArrayDecodeNode)).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.unicodeArrayName = unicodeArrayName;
        _this.unicodeArray = unicodeArray;
        return _this;
    }

    _createClass(UnicodeArrayDecodeNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            if (!this.unicodeArray.getLength()) {
                return;
            }
            NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
        }
    }, {
        key: 'getNode',
        value: function getNode() {
            return _get(UnicodeArrayDecodeNode.prototype.__proto__ || Object.getPrototypeOf(UnicodeArrayDecodeNode.prototype), 'getNode', this).call(this);
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            var forLoopFunctionName = 'forLoopFunc';
            var code = void 0;
            if (this.options.selfDefending) {
                code = SelfDefendingTemplate_1.SelfDefendingTemplate().formatUnicorn({
                    forLoopFunctionName: forLoopFunctionName,
                    unicodeArrayName: this.unicodeArrayName
                });
            } else {
                code = forLoopFunctionName + '();';
            }
            return NodeUtils_1.NodeUtils.convertCodeToStructure(JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(UnicodeArrayDecodeNodeTemplate_1.UnicodeArrayDecodeNodeTemplate().formatUnicorn({
                atobPolyfill: AtobTemplate_1.AtobTemplate(),
                code: code,
                forLoopFunctionName: forLoopFunctionName,
                unicodeArrayName: this.unicodeArrayName
            }), NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET).getObfuscatedCode());
        }
    }]);

    return UnicodeArrayDecodeNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.UnicodeArrayDecodeNode = UnicodeArrayDecodeNode;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var Utils_1 = __webpack_require__(0);
function SelfDefendingTemplate() {
    return '\n        var func = function(){return \'dev\';};\n           \n        Function(' + Utils_1.Utils.stringToUnicode('return/\\w+ *\\(\\) *{\\w+ *[\'|"].+[\'|"];? *}/') + ')()[\'test\'](func[\'toString\']()) !== true && !{unicodeArrayName}++ ? [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(true){}\')() : Function(\'a\', atob(' + Utils_1.Utils.stringToUnicode(Utils_1.Utils.btoa('a.call()')) + '))({forLoopFunctionName}) ? [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(false){}\')() : [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(false){}\')();\n    ';
}
exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ },
/* 89 */
/***/ function(module, exports) {

"use strict";
"use strict";

function UnicodeArrayDecodeNodeTemplate() {
    return "\n        (function () {\n           {atobPolyfill}\n          \n            var {forLoopFunctionName} = function () {\n                var array = [];\n                \n                for (var i in {unicodeArrayName}) {\n                    array['push'](decodeURI(atob({unicodeArrayName}[i])));\n                }\n                \n                {unicodeArrayName} = array;\n            };\n            \n            {code}\n        })();\n    ";
}
exports.UnicodeArrayDecodeNodeTemplate = UnicodeArrayDecodeNodeTemplate;

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map