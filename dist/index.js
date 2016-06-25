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
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chance_1 = __webpack_require__(41);
var JSFuck_1 = __webpack_require__(10);

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
            var reverse = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            if (times <= 0) {
                return array;
            }
            var newArray = array,
                temp = void 0;
            while (times--) {
                if (!reverse) {
                    temp = newArray.pop();
                    newArray.unshift(temp);
                } else {
                    temp = newArray.shift();
                    newArray.push(temp);
                }
            }
            return newArray;
        }
    }, {
        key: 'btoa',
        value: function btoa(string) {
            return new Buffer(encodeURI(string)).toString('base64');
        }
    }, {
        key: 'decToHex',
        value: function decToHex(dec) {
            var decToHexSliceValue = -6,
                exponent = 6,
                radix = 16;
            return (dec + Math.pow(radix, exponent)).toString(radix).substr(decToHexSliceValue).replace(Utils.hexRepetitiveZerosRegExp, '');
        }
    }, {
        key: 'getRandomGenerator',
        value: function getRandomGenerator() {
            return Utils.randomGenerator;
        }
    }, {
        key: 'getRandomVariableName',
        value: function getRandomVariableName() {
            var length = arguments.length <= 0 || arguments[0] === undefined ? 6 : arguments[0];

            var rangeMinInteger = 10000,
                rangeMaxInteger = 99999999,
                prefix = '_0x';
            return '' + prefix + Utils.decToHex(Utils.getRandomGenerator().integer({
                min: rangeMinInteger,
                max: rangeMaxInteger
            })).substr(0, length);
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

Utils.hexRepetitiveZerosRegExp = new RegExp('^(0{2,})+(?!$)', '');
Utils.randomGenerator = new chance_1.Chance();
exports.Utils = Utils;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = __webpack_require__(3);
var NodeType_1 = __webpack_require__(2);
var Nodes_1 = __webpack_require__(8);
var Utils_1 = __webpack_require__(0);

var NodeUtils = function () {
    function NodeUtils() {
        _classCallCheck(this, NodeUtils);
    }

    _createClass(NodeUtils, null, [{
        key: "addXVerbatimPropertyToLiterals",
        value: function addXVerbatimPropertyToLiterals(node) {
            estraverse.replace(node, {
                enter: function enter(node, parentNode) {
                    if (Nodes_1.Nodes.isLiteralNode(node)) {
                        node['x-verbatim-property'] = node.raw;
                    }
                }
            });
        }
    }, {
        key: "appendNode",
        value: function appendNode(blockScopeBody, node) {
            if (!NodeUtils.validateNode(node)) {
                return;
            }
            blockScopeBody.push(node);
        }
    }, {
        key: "getBlockStatementNodeByIndex",
        value: function getBlockStatementNodeByIndex(node) {
            var index = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            if (Nodes_1.Nodes.isNodeHasBlockStatement(node)) {
                if (node.body[index] === undefined) {
                    throw new ReferenceError("Wrong index `" + index + "`. Block-statement body length is `" + node.body.length + "`");
                }
                return node.body[index];
            }
            throw new TypeError('The specified node have no a block-statement');
        }
    }, {
        key: "getBlockScopeOfNode",
        value: function getBlockScopeOfNode(node) {
            var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            var parentNode = node.parentNode;
            if (!parentNode) {
                throw new ReferenceError('`parentNode` property of given node is `undefined`');
            }
            if (Nodes_1.Nodes.isBlockStatementNode(parentNode)) {
                if (!Utils_1.Utils.arrayContains(NodeUtils.nodesWithBlockScope, parentNode['parentNode'].type)) {
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
        key: "insertNodeAtIndex",
        value: function insertNodeAtIndex(blockScopeBody, node, index) {
            if (!NodeUtils.validateNode(node)) {
                return;
            }
            blockScopeBody.splice(index, 0, node);
        }
    }, {
        key: "parentize",
        value: function parentize(node) {
            var isRootNode = true;
            estraverse.replace(node, {
                enter: function enter(node, parentNode) {
                    Object.defineProperty(node, 'parentNode', {
                        configurable: true,
                        enumerable: true,
                        value: isRootNode ? Nodes_1.Nodes.getProgramNode([node]) : parentNode || node,
                        writable: true
                    });
                    isRootNode = false;
                }
            });
        }
    }, {
        key: "prependNode",
        value: function prependNode(blockScopeBody, node) {
            if (!NodeUtils.validateNode(node)) {
                return;
            }
            blockScopeBody.unshift(node);
        }
    }, {
        key: "validateNode",
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
/* 3 */
/***/ function(module, exports) {

module.exports = require("estraverse");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppendState_1 = __webpack_require__(6);
var NodeUtils_1 = __webpack_require__(1);

var Node = function () {
    function Node(options) {
        _classCallCheck(this, Node);

        this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        this.options = options;
    }

    _createClass(Node, [{
        key: "getAppendState",
        value: function getAppendState() {
            return this.appendState;
        }
    }, {
        key: "getNode",
        value: function getNode() {
            NodeUtils_1.NodeUtils.parentize(this.node);
            return this.node;
        }
    }, {
        key: "setNode",
        value: function setNode(node) {
            this.node = node;
        }
    }, {
        key: "updateNode",
        value: function updateNode() {
            this.node = this.getNodeStructure();
        }
    }]);

    return Node;
}();

exports.Node = Node;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = __webpack_require__(3);
var JSFuck_1 = __webpack_require__(10);
var Nodes_1 = __webpack_require__(8);
var Utils_1 = __webpack_require__(0);

var NodeObfuscator = function () {
    function NodeObfuscator(nodes, options) {
        _classCallCheck(this, NodeObfuscator);

        this.nodes = nodes;
        this.options = options;
    }

    _createClass(NodeObfuscator, [{
        key: "isReservedName",
        value: function isReservedName(name) {
            return this.options.get('reservedNames').some(function (reservedName) {
                return new RegExp(reservedName, 'g').test(name);
            });
        }
    }, {
        key: "storeIdentifiersNames",
        value: function storeIdentifiersNames(node, namesMap) {
            if (Nodes_1.Nodes.isIdentifierNode(node) && !this.isReservedName(node.name)) {
                namesMap.set(node.name, Utils_1.Utils.getRandomVariableName());
                return;
            }
            return estraverse.VisitorOption.Skip;
        }
    }, {
        key: "replaceIdentifiersWithRandomNames",
        value: function replaceIdentifiersWithRandomNames(node, parentNode, namesMap) {
            if (Nodes_1.Nodes.isIdentifierNode(node) && namesMap.has(node.name)) {
                var parentNodeIsPropertyNode = Nodes_1.Nodes.isPropertyNode(parentNode) && parentNode.key === node,
                    parentNodeIsMemberExpressionNode = Nodes_1.Nodes.isMemberExpressionNode(parentNode) && parentNode.computed === false && parentNode.property === node;
                if (parentNodeIsPropertyNode || parentNodeIsMemberExpressionNode) {
                    return;
                }
                node.name = namesMap.get(node.name);
            }
        }
    }, {
        key: "replaceLiteralBooleanWithJSFuck",
        value: function replaceLiteralBooleanWithJSFuck(nodeValue) {
            return nodeValue ? JSFuck_1.JSFuck.True : JSFuck_1.JSFuck.False;
        }
    }, {
        key: "replaceLiteralNumberWithHexadecimalValue",
        value: function replaceLiteralNumberWithHexadecimalValue(nodeValue) {
            var prefix = '0x';
            if (!Utils_1.Utils.isInteger(nodeValue)) {
                return String(nodeValue);
            }
            return "" + prefix + Utils_1.Utils.decToHex(nodeValue);
        }
    }, {
        key: "replaceLiteralValueWithUnicodeValue",
        value: function replaceLiteralValueWithUnicodeValue(nodeValue) {
            var value = nodeValue,
                replaceWithUnicodeArrayFlag = Math.random() <= this.options.get('unicodeArrayThreshold');
            if (this.options.get('encodeUnicodeLiterals') && replaceWithUnicodeArrayFlag) {
                value = Utils_1.Utils.btoa(value);
            }
            value = Utils_1.Utils.stringToUnicode(value);
            if (!this.options.get('unicodeArray') || !replaceWithUnicodeArrayFlag) {
                return value;
            }
            return this.replaceLiteralValueWithUnicodeArrayCall(value);
        }
    }, {
        key: "replaceLiteralValueWithUnicodeArrayCall",
        value: function replaceLiteralValueWithUnicodeArrayCall(value) {
            var unicodeArrayNode = this.nodes.get('unicodeArrayNode'),
                unicodeArray = unicodeArrayNode.getNodeData(),
                sameIndex = unicodeArray.indexOf(value),
                index = void 0,
                hexadecimalIndex = void 0;
            if (sameIndex >= 0) {
                index = sameIndex;
            } else {
                index = unicodeArray.length;
                unicodeArrayNode.updateNodeData(value);
            }
            hexadecimalIndex = this.replaceLiteralNumberWithHexadecimalValue(index);
            if (this.options.get('wrapUnicodeArrayCalls')) {
                return this.nodes.get('unicodeArrayCallsWrapper').getNodeIdentifier() + "('" + hexadecimalIndex + "')";
            }
            return unicodeArrayNode.getNodeIdentifier() + "[" + hexadecimalIndex + "]";
        }
    }]);

    return NodeObfuscator;
}();

exports.NodeObfuscator = NodeObfuscator;

/***/ },
/* 6 */
/***/ function(module, exports) {

"use strict";
"use strict";

(function (AppendState) {
    AppendState[AppendState["AfterObfuscation"] = 0] = "AfterObfuscation";
    AppendState[AppendState["BeforeObfuscation"] = 1] = "BeforeObfuscation";
})(exports.AppendState || (exports.AppendState = {}));
var AppendState = exports.AppendState;

/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("esprima");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodeType_1 = __webpack_require__(2);

var Nodes = function () {
    function Nodes() {
        _classCallCheck(this, Nodes);
    }

    _createClass(Nodes, null, [{
        key: "getProgramNode",
        value: function getProgramNode(bodyNode) {
            return {
                'type': NodeType_1.NodeType.Program,
                'body': bodyNode
            };
        }
    }, {
        key: "isBlockStatementNode",
        value: function isBlockStatementNode(node) {
            return node.type === NodeType_1.NodeType.BlockStatement;
        }
    }, {
        key: "isIdentifierNode",
        value: function isIdentifierNode(node) {
            return node.type === NodeType_1.NodeType.Identifier;
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

    return Nodes;
}();

exports.Nodes = Nodes;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var esprima = __webpack_require__(7);
var escodegen = __webpack_require__(11);
var JavaScriptObfuscatorCLI_1 = __webpack_require__(20);
var Obfuscator_1 = __webpack_require__(17);
var Options_1 = __webpack_require__(18);

var JavaScriptObfuscator = function () {
    function JavaScriptObfuscator() {
        _classCallCheck(this, JavaScriptObfuscator);
    }

    _createClass(JavaScriptObfuscator, null, [{
        key: 'obfuscate',
        value: function obfuscate(sourceCode, customOptions) {
            var astTree = esprima.parse(sourceCode),
                options = new Options_1.Options(customOptions),
                obfuscator = new Obfuscator_1.Obfuscator(options);
            astTree = obfuscator.obfuscateNode(astTree);
            return JavaScriptObfuscator.generateCode(astTree, options);
        }
    }, {
        key: 'runCLI',
        value: function runCLI(argv) {
            new JavaScriptObfuscatorCLI_1.JavaScriptObfuscatorCLI(argv).run();
        }
    }, {
        key: 'generateCode',
        value: function generateCode(astTree, options) {
            var escodegenParams = Object.assign({}, JavaScriptObfuscator.escodegenParams);
            escodegenParams.format = {
                compact: options.get('compact')
            };
            return escodegen.generate(astTree, escodegenParams);
        }
    }]);

    return JavaScriptObfuscator;
}();

JavaScriptObfuscator.escodegenParams = {
    verbatim: 'x-verbatim-property'
};
exports.JavaScriptObfuscator = JavaScriptObfuscator;

/***/ },
/* 10 */
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
    h: '(+(101))["to"+String["name"]](21)[1]',
    i: '([false]+undefined)[10]',
    j: '([]["entries"]()+"")[3]',
    k: '(+(20))["to"+String["name"]](21)',
    l: '(false+"")[2]',
    m: '(Number+"")[11]',
    n: '(undefined+"")[1]',
    o: '(true+[]["fill"])[10]',
    p: '(+(211))["to"+String["name"]](31)[1]',
    q: '(+(212))["to"+String["name"]](31)[1]',
    r: '(true+"")[1]',
    s: '(false+"")[3]',
    t: '(true+"")[0]',
    u: '(undefined+"")[0]',
    v: '(+(31))["to"+String["name"]](32)',
    w: '(+(32))["to"+String["name"]](33)',
    x: '(+(101))["to"+String["name"]](34)[1]',
    y: '(NaN+[Infinity])[10]',
    z: '(+(35))["to"+String["name"]](36)',
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
    U: '(NaN+Function("return{}")()["to"+String["name"]]["call"]())[11]',
    V: '\'V\'',
    W: '\'W\'',
    X: '\'X\'',
    Y: '\'Y\'',
    Z: '\'Z\''
};

/***/ },
/* 11 */
/***/ function(module, exports) {

module.exports = require("escodegen");

/***/ },
/* 12 */
/***/ function(module, exports) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodesGroup = function () {
    function NodesGroup(options) {
        _classCallCheck(this, NodesGroup);

        this.nodes = new Map();
        this.options = options;
    }

    _createClass(NodesGroup, [{
        key: "getNodes",
        value: function getNodes() {
            return this.nodes;
        }
    }]);

    return NodesGroup;
}();

exports.NodesGroup = NodesGroup;

/***/ },
/* 13 */
/***/ function(module, exports) {

"use strict";
"use strict";

exports.NO_CUSTOM_NODES_PRESET = Object.freeze({
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    encodeUnicodeLiterals: false,
    reservedNames: [],
    rotateUnicodeArray: false,
    selfDefending: false,
    unicodeArray: false,
    unicodeArrayThreshold: 0,
    wrapUnicodeArrayCalls: false
});

/***/ },
/* 14 */
/***/ function(module, exports) {

"use strict";
"use strict";

exports.DEFAULT_PRESET = Object.freeze({
    compact: true,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    encodeUnicodeLiterals: false,
    reservedNames: [],
    rotateUnicodeArray: true,
    selfDefending: true,
    unicodeArray: true,
    unicodeArrayThreshold: 0.8,
    wrapUnicodeArrayCalls: true
});

/***/ },
/* 15 */
/***/ function(module, exports) {

module.exports = require("babel-polyfill");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var JavaScriptObfuscator_1 = __webpack_require__(9);
if (!global._babelPolyfill) {
    __webpack_require__(15);
}
module.exports = JavaScriptObfuscator_1.JavaScriptObfuscator;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = __webpack_require__(3);
var AppendState_1 = __webpack_require__(6);
var NodeType_1 = __webpack_require__(2);
var CatchClauseObfuscator_1 = __webpack_require__(33);
var ConsoleOutputDisableExpressionNode_1 = __webpack_require__(21);
var DebugProtectionNodesGroup_1 = __webpack_require__(30);
var FunctionDeclarationObfuscator_1 = __webpack_require__(34);
var FunctionObfuscator_1 = __webpack_require__(35);
var LiteralObfuscator_1 = __webpack_require__(36);
var MemberExpressionObfuscator_1 = __webpack_require__(37);
var MethodDefinitionObfuscator_1 = __webpack_require__(38);
var NodeUtils_1 = __webpack_require__(1);
var ObjectExpressionObfuscator_1 = __webpack_require__(39);
var SelfDefendingNodesGroup_1 = __webpack_require__(31);
var UnicodeArrayNodesGroup_1 = __webpack_require__(32);
var VariableDeclarationObfuscator_1 = __webpack_require__(40);

var Obfuscator = function () {
    function Obfuscator(options) {
        _classCallCheck(this, Obfuscator);

        this.nodes = new Map();
        this.nodeObfuscators = new Map([[NodeType_1.NodeType.ArrowFunctionExpression, [FunctionObfuscator_1.FunctionObfuscator]], [NodeType_1.NodeType.ClassDeclaration, [FunctionDeclarationObfuscator_1.FunctionDeclarationObfuscator]], [NodeType_1.NodeType.CatchClause, [CatchClauseObfuscator_1.CatchClauseObfuscator]], [NodeType_1.NodeType.FunctionDeclaration, [FunctionDeclarationObfuscator_1.FunctionDeclarationObfuscator, FunctionObfuscator_1.FunctionObfuscator]], [NodeType_1.NodeType.FunctionExpression, [FunctionObfuscator_1.FunctionObfuscator]], [NodeType_1.NodeType.MemberExpression, [MemberExpressionObfuscator_1.MemberExpressionObfuscator]], [NodeType_1.NodeType.MethodDefinition, [MethodDefinitionObfuscator_1.MethodDefinitionObfuscator]], [NodeType_1.NodeType.ObjectExpression, [ObjectExpressionObfuscator_1.ObjectExpressionObfuscator]], [NodeType_1.NodeType.VariableDeclaration, [VariableDeclarationObfuscator_1.VariableDeclarationObfuscator]], [NodeType_1.NodeType.Literal, [LiteralObfuscator_1.LiteralObfuscator]]]);
        this.options = options;
    }

    _createClass(Obfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(node) {
            this.setNewNodes();
            NodeUtils_1.NodeUtils.parentize(node);
            this.beforeObfuscation(node);
            this.obfuscate(node);
            this.afterObfuscation(node);
            return node;
        }
    }, {
        key: 'setNode',
        value: function setNode(nodeName, node) {
            this.nodes.set(nodeName, node);
        }
    }, {
        key: 'setNodesGroup',
        value: function setNodesGroup(nodesGroup) {
            var _this = this;

            var nodes = nodesGroup.getNodes();
            nodes.forEach(function (node, key) {
                _this.nodes.set(key, node);
            });
        }
    }, {
        key: 'afterObfuscation',
        value: function afterObfuscation(astTree) {
            this.nodes.forEach(function (node) {
                if (node.getAppendState() === AppendState_1.AppendState.AfterObfuscation) {
                    node.appendNode(astTree);
                }
            });
        }
    }, {
        key: 'beforeObfuscation',
        value: function beforeObfuscation(astTree) {
            this.nodes.forEach(function (node) {
                if (node.getAppendState() === AppendState_1.AppendState.BeforeObfuscation) {
                    node.appendNode(astTree);
                }
            });
        }
    }, {
        key: 'initializeNodeObfuscators',
        value: function initializeNodeObfuscators(node, parentNode) {
            var _this2 = this;

            if (!this.nodeObfuscators.has(node.type)) {
                return;
            }
            this.nodeObfuscators.get(node.type).forEach(function (obfuscator) {
                new obfuscator(_this2.nodes, _this2.options).obfuscateNode(node, parentNode);
            });
        }
    }, {
        key: 'obfuscate',
        value: function obfuscate(node) {
            var _this3 = this;

            estraverse.replace(node, {
                leave: function leave(node, parentNode) {
                    _this3.initializeNodeObfuscators(node, parentNode);
                }
            });
        }
    }, {
        key: 'setNewNodes',
        value: function setNewNodes() {
            if (this.options.get('selfDefending')) {
                this.setNodesGroup(new SelfDefendingNodesGroup_1.SelfDefendingNodesGroup(this.options));
            }
            if (this.options.get('disableConsoleOutput')) {
                this.setNode('consoleOutputDisableExpressionNode', new ConsoleOutputDisableExpressionNode_1.ConsoleOutputDisableExpressionNode(this.options));
            }
            if (this.options.get('debugProtection')) {
                this.setNodesGroup(new DebugProtectionNodesGroup_1.DebugProtectionNodesGroup(this.options));
            }
            if (this.options.get('unicodeArray')) {
                this.setNodesGroup(new UnicodeArrayNodesGroup_1.UnicodeArrayNodesGroup(this.options));
            }
        }
    }]);

    return Obfuscator;
}();

exports.Obfuscator = Obfuscator;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OptionsNormalizer_1 = __webpack_require__(19);
var DefaultPreset_1 = __webpack_require__(14);

var Options = function () {
    function Options(options) {
        _classCallCheck(this, Options);

        this.options = Object.freeze(OptionsNormalizer_1.OptionsNormalizer.normalizeOptionsPreset(Object.assign({}, DefaultPreset_1.DEFAULT_PRESET, options)));
    }

    _createClass(Options, [{
        key: "get",
        value: function get(optionName) {
            return this.options[optionName];
        }
    }]);

    return Options;
}();

exports.Options = Options;

/***/ },
/* 19 */
/***/ function(module, exports) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OptionsNormalizer = function () {
    function OptionsNormalizer() {
        _classCallCheck(this, OptionsNormalizer);
    }

    _createClass(OptionsNormalizer, null, [{
        key: 'normalizeOptionsPreset',
        value: function normalizeOptionsPreset(options) {
            var normalizedOptions = Object.assign({}, options);
            normalizedOptions = OptionsNormalizer.unicodeArrayRule(normalizedOptions);
            normalizedOptions = OptionsNormalizer.unicodeArrayThresholdRule(normalizedOptions);
            normalizedOptions = OptionsNormalizer.selfDefendingRule(normalizedOptions);
            return normalizedOptions;
        }
    }, {
        key: 'selfDefendingRule',
        value: function selfDefendingRule(options) {
            if (options['selfDefending']) {
                Object.assign(options, OptionsNormalizer.SELF_DEFENDING_OPTIONS);
            }
            return options;
        }
    }, {
        key: 'unicodeArrayRule',
        value: function unicodeArrayRule(options) {
            if (!options['unicodeArray']) {
                Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
            }
            return options;
        }
    }, {
        key: 'unicodeArrayThresholdRule',
        value: function unicodeArrayThresholdRule(options) {
            var minValue = 0,
                maxValue = 1;
            options['unicodeArrayThreshold'] = Math.min(Math.max(options['unicodeArrayThreshold'], minValue), maxValue);
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
OptionsNormalizer.SELF_DEFENDING_OPTIONS = {
    compact: true,
    selfDefending: true
};
exports.OptionsNormalizer = OptionsNormalizer;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var commands = __webpack_require__(43);
var fs = __webpack_require__(44);
var mkdirp = __webpack_require__(45);
var path = __webpack_require__(46);
var child_process_1 = __webpack_require__(42);
var DefaultPreset_1 = __webpack_require__(14);
var JavaScriptObfuscator_1 = __webpack_require__(9);

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
            if (!this.arguments.length || this.arguments.indexOf('--help') >= 0) {
                commands.outputHelp();
                return;
            }
            this.inputPath = this.getInputPath();
            this.getData();
            this.processData();
        }
    }, {
        key: 'configureCommands',
        value: function configureCommands() {
            commands.version(JavaScriptObfuscatorCLI.getBuildVersion(), '-v, --version').usage('<inputPath> [options]').option('-o, --output <path>', 'Output path for obfuscated code').option('--compact <boolean>', 'Disable one line output code compacting', JavaScriptObfuscatorCLI.parseBoolean).option('--debugProtection <boolean>', 'Disable browser Debug panel (can cause DevTools enabled browser freeze)', JavaScriptObfuscatorCLI.parseBoolean).option('--debugProtectionInterval <boolean>', 'Disable browser Debug panel even after page was loaded (can cause DevTools enabled browser freeze)', JavaScriptObfuscatorCLI.parseBoolean).option('--disableConsoleOutput <boolean>', 'Allow console.log, console.info, console.error and console.warn messages output into browser console', JavaScriptObfuscatorCLI.parseBoolean).option('--encodeUnicodeLiterals <boolean>', 'All literals in Unicode array become encoded in Base64 (this option can slightly slow down your code speed)', JavaScriptObfuscatorCLI.parseBoolean).option('--reservedNames <list>', 'Disable obfuscation of variable names, function names and names of function parameters that match the passed RegExp patterns (comma separated)', function (val) {
                return val.split(',');
            }).option('--rotateUnicodeArray <boolean>', 'Disable rotation of unicode array values during obfuscation', JavaScriptObfuscatorCLI.parseBoolean).option('--selfDefending <boolean>', 'Disables self-defending for obfuscated code', JavaScriptObfuscatorCLI.parseBoolean).option('--unicodeArray <boolean>', 'Disables gathering of all literal strings into an array and replacing every literal string with an array call', JavaScriptObfuscatorCLI.parseBoolean).option('--unicodeArrayThreshold <number>', 'The probability that the literal string will be inserted into unicodeArray (Default: 0.8, Min: 0, Max: 1)', parseFloat).option('--wrapUnicodeArrayCalls <boolean>', 'Disables usage of special access function instead of direct array call', JavaScriptObfuscatorCLI.parseBoolean).parse(this.rawArguments);
            commands.on('--help', function () {
                var isWindows = process.platform === 'win32',
                    commandName = isWindows ? 'type' : 'cat';
                console.log('  Examples:\n');
                console.log('    %> javascript-obfuscator < in.js > out.js');
                console.log('    %> ' + commandName + ' in1.js in2.js | javascript-obfuscator > out.js');
                console.log('');
                process.exit();
            });
        }
    }, {
        key: 'getData',
        value: function getData() {
            this.data = fs.readFileSync(this.inputPath, JavaScriptObfuscatorCLI.encoding);
        }
    }, {
        key: 'getInputPath',
        value: function getInputPath() {
            var inputPath = this.arguments[0];
            if (!JavaScriptObfuscatorCLI.isFilePath(inputPath)) {
                throw new ReferenceError('First argument must be a valid file path');
            }
            if (JavaScriptObfuscatorCLI.availableInputExtensions.indexOf(path.extname(inputPath)) === -1) {
                throw new ReferenceError('Input file must have .js extension');
            }
            return inputPath;
        }
    }, {
        key: 'getOutputPath',
        value: function getOutputPath() {
            var outputPath = commands.output;
            if (outputPath) {
                return outputPath;
            }
            return this.inputPath.split('.').map(function (value, index) {
                return index === 0 ? value + '-obfuscated' : value;
            }).join('.');
        }
    }, {
        key: 'processData',
        value: function processData() {
            var outputPath = this.getOutputPath(),
                dirName = path.dirname(outputPath);
            mkdirp.sync(dirName);
            fs.writeFileSync(this.getOutputPath(), JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(this.data, JavaScriptObfuscatorCLI.buildOptions()), {
                encoding: JavaScriptObfuscatorCLI.encoding
            });
        }
    }], [{
        key: 'buildOptions',
        value: function buildOptions() {
            var options = {},
                availableOptions = Object.keys(DefaultPreset_1.DEFAULT_PRESET);
            for (var option in commands) {
                if (!commands.hasOwnProperty(option)) {
                    continue;
                }
                if (availableOptions.indexOf(option) === -1) {
                    continue;
                }
                options[option] = commands[option];
            }
            return Object.assign({}, DefaultPreset_1.DEFAULT_PRESET, options);
        }
    }, {
        key: 'getBuildVersion',
        value: function getBuildVersion() {
            return child_process_1.execSync('npm info ' + JavaScriptObfuscatorCLI.packageName + ' version', {
                encoding: JavaScriptObfuscatorCLI.encoding
            });
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
        key: 'parseBoolean',
        value: function parseBoolean(value) {
            return value === 'true' || value === '1';
        }
    }]);

    return JavaScriptObfuscatorCLI;
}();

JavaScriptObfuscatorCLI.availableInputExtensions = ['.js'];
JavaScriptObfuscatorCLI.encoding = 'utf8';
JavaScriptObfuscatorCLI.packageName = 'javascript-obfuscator';
exports.JavaScriptObfuscatorCLI = JavaScriptObfuscatorCLI;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var esprima = __webpack_require__(7);
var Node_1 = __webpack_require__(4);
var NodeUtils_1 = __webpack_require__(1);

var ConsoleOutputDisableExpressionNode = function (_Node_1$Node) {
    _inherits(ConsoleOutputDisableExpressionNode, _Node_1$Node);

    function ConsoleOutputDisableExpressionNode(options) {
        _classCallCheck(this, ConsoleOutputDisableExpressionNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConsoleOutputDisableExpressionNode).call(this, options));

        _this.node = _this.getNodeStructure();
        return _this;
    }

    _createClass(ConsoleOutputDisableExpressionNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            NodeUtils_1.NodeUtils.prependNode(blockScopeNode.body, this.getNode());
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            return NodeUtils_1.NodeUtils.getBlockStatementNodeByIndex(esprima.parse('\n                (function () {\n                    var _ = \'(\u0004\u0006\u0003\u0005[]\' + \'["filter"]["\u0007tructor"]\' + \'("return this")()\' + \'.\' + \'\u0003;\u0006\u0002\u0005\u0004};\' + \'_\u0003.log\u0001.in\' + \'fo\u0001.\' + \'war\' + \'n\u0001.er\' + \'r\' + \'or\u0001})();\' + \'\u0001\u0005_\u0002;\' + \'_\u0003\u0002function\' + \'\u0003\u0007ole\u0004\u0002 ()\' + \'{\u0005 = \u0006var \' + \'_\u0007cons\', \n                        Y, \n                        $;\n                    \n                    for (Y in $ = "\u0007\u0006\u0005\u0004\u0003\u0002\u0001") {\n                      var arr = _.split($[Y]);\n                      _ = arr.join(arr.pop());\n                    }\n                    \n                    []["filter"]["constructor"](_)();\n                })()\n            '));
        }
    }]);

    return ConsoleOutputDisableExpressionNode;
}(Node_1.Node);

exports.ConsoleOutputDisableExpressionNode = ConsoleOutputDisableExpressionNode;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodeType_1 = __webpack_require__(2);
var Node_1 = __webpack_require__(4);
var NodeUtils_1 = __webpack_require__(1);

var DebugProtectionFunctionCallNode = function (_Node_1$Node) {
    _inherits(DebugProtectionFunctionCallNode, _Node_1$Node);

    function DebugProtectionFunctionCallNode(debugProtectionFunctionName, options) {
        _classCallCheck(this, DebugProtectionFunctionCallNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DebugProtectionFunctionCallNode).call(this, options));

        _this.debugProtectionFunctionName = debugProtectionFunctionName;
        _this.node = _this.getNodeStructure();
        return _this;
    }

    _createClass(DebugProtectionFunctionCallNode, [{
        key: "appendNode",
        value: function appendNode(blockScopeNode) {
            NodeUtils_1.NodeUtils.appendNode(blockScopeNode.body, this.getNode());
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            return {
                'type': NodeType_1.NodeType.ExpressionStatement,
                'expression': {
                    'type': NodeType_1.NodeType.CallExpression,
                    'callee': {
                        'type': NodeType_1.NodeType.Identifier,
                        'name': this.debugProtectionFunctionName
                    },
                    'arguments': []
                }
            };
        }
    }]);

    return DebugProtectionFunctionCallNode;
}(Node_1.Node);

exports.DebugProtectionFunctionCallNode = DebugProtectionFunctionCallNode;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodeType_1 = __webpack_require__(2);
var Node_1 = __webpack_require__(4);
var NodeUtils_1 = __webpack_require__(1);

var DebugProtectionFunctionIntervalNode = function (_Node_1$Node) {
    _inherits(DebugProtectionFunctionIntervalNode, _Node_1$Node);

    function DebugProtectionFunctionIntervalNode(debugProtectionFunctionName, options) {
        _classCallCheck(this, DebugProtectionFunctionIntervalNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DebugProtectionFunctionIntervalNode).call(this, options));

        _this.debugProtectionFunctionName = debugProtectionFunctionName;
        _this.node = _this.getNodeStructure();
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
            return {
                'type': NodeType_1.NodeType.ExpressionStatement,
                'expression': {
                    'type': NodeType_1.NodeType.CallExpression,
                    'callee': {
                        'type': NodeType_1.NodeType.Identifier,
                        'name': 'setInterval'
                    },
                    'arguments': [{
                        'type': NodeType_1.NodeType.FunctionExpression,
                        'id': null,
                        'params': [],
                        'defaults': [],
                        'body': {
                            'type': NodeType_1.NodeType.BlockStatement,
                            'body': [{
                                'type': NodeType_1.NodeType.ExpressionStatement,
                                'expression': {
                                    'type': NodeType_1.NodeType.CallExpression,
                                    'callee': {
                                        'type': NodeType_1.NodeType.Identifier,
                                        'name': this.debugProtectionFunctionName
                                    },
                                    'arguments': []
                                }
                            }]
                        },
                        'generator': false,
                        'expression': false
                    }, {
                        'type': NodeType_1.NodeType.Literal,
                        'value': 4000,
                        'raw': '4000'
                    }]
                }
            };
        }
    }]);

    return DebugProtectionFunctionIntervalNode;
}(Node_1.Node);

exports.DebugProtectionFunctionIntervalNode = DebugProtectionFunctionIntervalNode;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var esprima = __webpack_require__(7);
var Node_1 = __webpack_require__(4);
var NodeUtils_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(0);

var DebugProtectionFunctionNode = function (_Node_1$Node) {
    _inherits(DebugProtectionFunctionNode, _Node_1$Node);

    function DebugProtectionFunctionNode(debugProtectionFunctionName, options) {
        _classCallCheck(this, DebugProtectionFunctionNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DebugProtectionFunctionNode).call(this, options));

        _this.debugProtectionFunctionName = debugProtectionFunctionName;
        _this.node = _this.getNodeStructure();
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
            return NodeUtils_1.NodeUtils.getBlockStatementNodeByIndex(esprima.parse('\n                var ' + this.debugProtectionFunctionName + ' = function () {\n                    function debuggerProtection (counter) {\n                        if ((\'\' + counter / counter)[\'length\'] !== 1 || counter % 20 === 0) {\n                            (function () {}.constructor(\'debugger\')());\n                        } else {\n                            [].filter.constructor(' + Utils_1.Utils.stringToJSFuck('debugger') + ')();\n                        }\n                        \n                        debuggerProtection(++counter);\n                    }\n                    \n                    try {\n                        debuggerProtection(0);\n                    } catch (y) {}\n                };\n            '));
        }
    }]);

    return DebugProtectionFunctionNode;
}(Node_1.Node);

exports.DebugProtectionFunctionNode = DebugProtectionFunctionNode;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var esprima = __webpack_require__(7);
var AppendState_1 = __webpack_require__(6);
var JSFuck_1 = __webpack_require__(10);
var NoCustomNodesPreset_1 = __webpack_require__(13);
var JavaScriptObfuscator_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(4);
var NodeUtils_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(0);

var SelfDefendingUnicodeNode = function (_Node_1$Node) {
    _inherits(SelfDefendingUnicodeNode, _Node_1$Node);

    function SelfDefendingUnicodeNode(options) {
        _classCallCheck(this, SelfDefendingUnicodeNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelfDefendingUnicodeNode).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.node = _this.getNodeStructure();
        return _this;
    }

    _createClass(SelfDefendingUnicodeNode, [{
        key: "appendNode",
        value: function appendNode(blockScopeNode) {
            var programBodyLength = blockScopeNode.body.length,
                randomIndex = 0;
            if (programBodyLength > 2) {
                randomIndex = Utils_1.Utils.getRandomGenerator().integer({
                    min: programBodyLength / 2,
                    max: programBodyLength - 1
                });
            }
            NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), randomIndex);
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var node = esprima.parse(JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate("\n                (function () {                                \n                    var func = function(){return " + Utils_1.Utils.stringToUnicode('dev') + ";},\n                        func2 = function () {\n                            return 'window';\n                        };\n                \n                    !Function(" + Utils_1.Utils.stringToUnicode("return/\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}/") + ")().test(func.toString()) ? Function(" + Utils_1.Utils.stringToUnicode("return/(\\\\[x|u](\\w){2,4})+/") + ")().test(func2.toString()) ? []['filter']['constructor'](" + Utils_1.Utils.stringToJSFuck('while') + " + '(" + JSFuck_1.JSFuck.False + "){}')() : []['filter']['constructor'](" + Utils_1.Utils.stringToJSFuck('while') + " + '(" + JSFuck_1.JSFuck.True + "){}')() : []['filter']['constructor'](" + Utils_1.Utils.stringToJSFuck('while') + " + '(" + JSFuck_1.JSFuck.False + "){}')();\n                })();\n            ", NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET));
            NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
            return NodeUtils_1.NodeUtils.getBlockStatementNodeByIndex(node);
        }
    }]);

    return SelfDefendingUnicodeNode;
}(Node_1.Node);

exports.SelfDefendingUnicodeNode = SelfDefendingUnicodeNode;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var esprima = __webpack_require__(7);
var AppendState_1 = __webpack_require__(6);
var Node_1 = __webpack_require__(4);
var NodeUtils_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(0);

var UnicodeArrayCallsWrapper = function (_Node_1$Node) {
    _inherits(UnicodeArrayCallsWrapper, _Node_1$Node);

    function UnicodeArrayCallsWrapper(unicodeArrayCallsWrapperName, unicodeArrayName, unicodeArray, options) {
        _classCallCheck(this, UnicodeArrayCallsWrapper);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UnicodeArrayCallsWrapper).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.unicodeArrayCallsWrapperName = unicodeArrayCallsWrapperName;
        _this.unicodeArrayName = unicodeArrayName;
        _this.unicodeArray = unicodeArray;
        _this.node = _this.getNodeStructure();
        return _this;
    }

    _createClass(UnicodeArrayCallsWrapper, [{
        key: "appendNode",
        value: function appendNode(blockScopeNode) {
            NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
        }
    }, {
        key: "getNodeIdentifier",
        value: function getNodeIdentifier() {
            return this.unicodeArrayCallsWrapperName;
        }
    }, {
        key: "getNode",
        value: function getNode() {
            if (!this.unicodeArray.length) {
                return;
            }
            this.updateNode();
            return _get(Object.getPrototypeOf(UnicodeArrayCallsWrapper.prototype), "getNode", this).call(this);
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var keyName = Utils_1.Utils.getRandomVariableName(),
                node = void 0;
            node = esprima.parse("\n            var " + this.unicodeArrayCallsWrapperName + " = function (" + keyName + ") {\n                return " + this.unicodeArrayName + "[parseInt(" + keyName + ", 0x010)];\n            };\n        ");
            NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
            return NodeUtils_1.NodeUtils.getBlockStatementNodeByIndex(node);
        }
    }]);

    return UnicodeArrayCallsWrapper;
}(Node_1.Node);

exports.UnicodeArrayCallsWrapper = UnicodeArrayCallsWrapper;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var esprima = __webpack_require__(7);
var JavaScriptObfuscator_1 = __webpack_require__(9);
var AppendState_1 = __webpack_require__(6);
var JSFuck_1 = __webpack_require__(10);
var NoCustomNodesPreset_1 = __webpack_require__(13);
var Node_1 = __webpack_require__(4);
var NodeUtils_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(0);

var UnicodeArrayDecodeNode = function (_Node_1$Node) {
    _inherits(UnicodeArrayDecodeNode, _Node_1$Node);

    function UnicodeArrayDecodeNode(unicodeArrayName, unicodeArray, options) {
        _classCallCheck(this, UnicodeArrayDecodeNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UnicodeArrayDecodeNode).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.unicodeArrayName = unicodeArrayName;
        _this.unicodeArray = unicodeArray;
        _this.node = _this.getNodeStructure();
        return _this;
    }

    _createClass(UnicodeArrayDecodeNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
        }
    }, {
        key: 'getNode',
        value: function getNode() {
            if (!this.unicodeArray.length) {
                return;
            }
            this.updateNode();
            return _get(Object.getPrototypeOf(UnicodeArrayDecodeNode.prototype), 'getNode', this).call(this);
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            var environmentName = Utils_1.Utils.getRandomVariableName(),
                forLoopFunctionName = Utils_1.Utils.getRandomVariableName(),
                indexVariableName = Utils_1.Utils.getRandomVariableName(),
                tempArrayName = Utils_1.Utils.getRandomVariableName();
            var code = '',
                node = void 0;
            if (this.options.get('selfDefending')) {
                code = '\n                var ' + environmentName + ' = function(){return ' + Utils_1.Utils.stringToUnicode('dev') + ';};\n                   \n                Function(' + Utils_1.Utils.stringToUnicode('return/\\w+ *\\(\\) *{\\w+ *[\'|"].+[\'|"];? *}/') + ')()[' + Utils_1.Utils.stringToUnicode('test') + '](' + environmentName + '[' + Utils_1.Utils.stringToUnicode('toString') + ']()) !== ' + JSFuck_1.JSFuck.True + ' && !' + this.unicodeArrayName + '++ ? [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(' + JSFuck_1.JSFuck.True + '){}\')() : Function(' + Utils_1.Utils.stringToUnicode('a') + ', atob(' + Utils_1.Utils.stringToUnicode(Utils_1.Utils.btoa('a.call()')) + '))(' + forLoopFunctionName + ') ? [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(' + JSFuck_1.JSFuck.False + '){}\')() : [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(' + JSFuck_1.JSFuck.False + '){}\')();\n            ';
            } else {
                code = forLoopFunctionName + '();';
            }
            node = esprima.parse('\n            (function () {\n                ' + JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate('\n                    (function () {\n                        var object = [][\'filter\'][\'constructor\'](\'return this\')();\n                        var chars = \'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\';\n            \n                        object.atob || (\n                            object.atob = function(input) {\n                                var str = String(input).replace(/=+$/, \'\');\n                                for (\n                                    var bc = 0, bs, buffer, idx = 0, output = \'\';\n                                    buffer = str.charAt(idx++);\n                                    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,\n                                        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0\n                                ) {\n                                    buffer = chars.indexOf(buffer);\n                                }\n                            return output;\n                        });\n                    })();\n                ', NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET) + '\n              \n                var ' + forLoopFunctionName + ' = function () {\n                    var ' + tempArrayName + ' = [];\n                    \n                    for (var ' + indexVariableName + ' in ' + this.unicodeArrayName + ') {\n                        ' + tempArrayName + '[' + Utils_1.Utils.stringToUnicode('push') + '](decodeURI(atob(' + this.unicodeArrayName + '[' + indexVariableName + '])));\n                    }\n                    \n                    ' + this.unicodeArrayName + ' = ' + tempArrayName + ';\n                };\n                \n                ' + code + '\n            })();\n        ');
            NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
            return NodeUtils_1.NodeUtils.getBlockStatementNodeByIndex(node);
        }
    }]);

    return UnicodeArrayDecodeNode;
}(Node_1.Node);

exports.UnicodeArrayDecodeNode = UnicodeArrayDecodeNode;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var escodegen = __webpack_require__(11);
var AppendState_1 = __webpack_require__(6);
var NodeType_1 = __webpack_require__(2);
var Node_1 = __webpack_require__(4);
var NodeUtils_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(0);

var UnicodeArrayNode = function (_Node_1$Node) {
    _inherits(UnicodeArrayNode, _Node_1$Node);

    function UnicodeArrayNode(unicodeArrayName) {
        var unicodeArrayRotateValue = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var options = arguments[2];

        _classCallCheck(this, UnicodeArrayNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UnicodeArrayNode).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.unicodeArray = [];
        _this.unicodeArrayName = unicodeArrayName;
        _this.unicodeArrayRotateValue = unicodeArrayRotateValue;
        _this.node = _this.getNodeStructure();
        return _this;
    }

    _createClass(UnicodeArrayNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
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
            if (!this.unicodeArray.length) {
                return;
            }
            Utils_1.Utils.arrayRotate(this.unicodeArray, this.unicodeArrayRotateValue);
            this.updateNode();
            return _get(Object.getPrototypeOf(UnicodeArrayNode.prototype), 'getNode', this).call(this);
        }
    }, {
        key: 'updateNodeData',
        value: function updateNodeData(data) {
            this.unicodeArray.push(data);
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            return {
                'type': NodeType_1.NodeType.VariableDeclaration,
                'declarations': [{
                    'type': NodeType_1.NodeType.VariableDeclarator,
                    'id': {
                        'type': NodeType_1.NodeType.Identifier,
                        'name': this.unicodeArrayName
                    },
                    'init': {
                        'type': NodeType_1.NodeType.ArrayExpression,
                        'elements': this.unicodeArray.map(function (value) {
                            return {
                                'type': NodeType_1.NodeType.Literal,
                                'value': value,
                                'raw': '\'' + value + '\'',
                                'x-verbatim-property': {
                                    'content': value,
                                    precedence: escodegen.Precedence.Primary
                                }
                            };
                        })
                    }
                }],
                'kind': 'var'
            };
        }
    }]);

    return UnicodeArrayNode;
}(Node_1.Node);

UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH = 4;
exports.UnicodeArrayNode = UnicodeArrayNode;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var esprima = __webpack_require__(7);
var AppendState_1 = __webpack_require__(6);
var JSFuck_1 = __webpack_require__(10);
var NoCustomNodesPreset_1 = __webpack_require__(13);
var JavaScriptObfuscator_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(4);
var NodeUtils_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(0);

var UnicodeArrayRotateFunctionNode = function (_Node_1$Node) {
    _inherits(UnicodeArrayRotateFunctionNode, _Node_1$Node);

    function UnicodeArrayRotateFunctionNode(unicodeArrayName, unicodeArray, unicodeArrayRotateValue, options) {
        _classCallCheck(this, UnicodeArrayRotateFunctionNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UnicodeArrayRotateFunctionNode).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.unicodeArrayName = unicodeArrayName;
        _this.unicodeArray = unicodeArray;
        _this.unicodeArrayRotateValue = unicodeArrayRotateValue;
        _this.node = _this.getNodeStructure();
        return _this;
    }

    _createClass(UnicodeArrayRotateFunctionNode, [{
        key: "appendNode",
        value: function appendNode(blockScopeNode) {
            NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
        }
    }, {
        key: "getNode",
        value: function getNode() {
            if (!this.unicodeArray.length) {
                return;
            }
            return _get(Object.getPrototypeOf(UnicodeArrayRotateFunctionNode.prototype), "getNode", this).call(this);
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var arrayName = Utils_1.Utils.getRandomVariableName(),
                code = '',
                timesName = Utils_1.Utils.getRandomVariableName(),
                timesArgumentName = Utils_1.Utils.getRandomVariableName(),
                whileFunctionName = Utils_1.Utils.getRandomVariableName(),
                node = void 0;
            if (this.options.get('selfDefending')) {
                code = JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate("\n                (function () {\n                    var func = function(){return " + Utils_1.Utils.stringToUnicode('dev') + ";};\n                                        \n                    !Function(" + Utils_1.Utils.stringToUnicode("return/\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}/") + ")().test(func.toString()) ? []['filter']['constructor'](" + Utils_1.Utils.stringToJSFuck('while') + " + '(" + JSFuck_1.JSFuck.True + "){}')() : Function(" + Utils_1.Utils.stringToUnicode('a') + ", " + Utils_1.Utils.stringToUnicode('b') + ", " + Utils_1.Utils.stringToUnicode('a(++b)') + ")(" + whileFunctionName + ", " + timesName + ") ? []['filter']['constructor'](" + Utils_1.Utils.stringToJSFuck('while') + " + '(" + JSFuck_1.JSFuck.False + "){}')() : []['filter']['constructor'](" + Utils_1.Utils.stringToJSFuck('while') + " + '(" + JSFuck_1.JSFuck.False + "){}')();\n                })();\n            ", NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET);
            } else {
                code = whileFunctionName + "(++" + timesName + ")";
            }
            node = esprima.parse("\n            (function (" + arrayName + ", " + timesName + ") {\n                var " + whileFunctionName + " = function (" + timesArgumentName + ") {\n                    while (--" + timesArgumentName + ") {\n                        " + arrayName + "[" + Utils_1.Utils.stringToUnicode('push') + "](" + arrayName + "[" + Utils_1.Utils.stringToUnicode('shift') + "]());\n                    }\n                };\n                \n                " + code + "\n            })(" + this.unicodeArrayName + ", 0x" + Utils_1.Utils.decToHex(this.unicodeArrayRotateValue) + ");\n        ");
            NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
            return NodeUtils_1.NodeUtils.getBlockStatementNodeByIndex(node);
        }
    }]);

    return UnicodeArrayRotateFunctionNode;
}(Node_1.Node);

exports.UnicodeArrayRotateFunctionNode = UnicodeArrayRotateFunctionNode;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebugProtectionFunctionCallNode_1 = __webpack_require__(22);
var DebugProtectionFunctionIntervalNode_1 = __webpack_require__(23);
var DebugProtectionFunctionNode_1 = __webpack_require__(24);
var NodesGroup_1 = __webpack_require__(12);
var Utils_1 = __webpack_require__(0);

var DebugProtectionNodesGroup = function (_NodesGroup_1$NodesGr) {
    _inherits(DebugProtectionNodesGroup, _NodesGroup_1$NodesGr);

    function DebugProtectionNodesGroup(options) {
        _classCallCheck(this, DebugProtectionNodesGroup);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DebugProtectionNodesGroup).call(this, options));

        _this.debugProtectionFunctionIdentifier = Utils_1.Utils.getRandomVariableName();
        _this.nodes.set('debugProtectionFunctionNode', new DebugProtectionFunctionNode_1.DebugProtectionFunctionNode(_this.debugProtectionFunctionIdentifier, _this.options));
        _this.nodes.set('debugProtectionFunctionCallNode', new DebugProtectionFunctionCallNode_1.DebugProtectionFunctionCallNode(_this.debugProtectionFunctionIdentifier, _this.options));
        if (_this.options.get('debugProtectionInterval')) {
            _this.nodes.set('debugProtectionFunctionIntervalNode', new DebugProtectionFunctionIntervalNode_1.DebugProtectionFunctionIntervalNode(_this.debugProtectionFunctionIdentifier, _this.options));
        }
        return _this;
    }

    return DebugProtectionNodesGroup;
}(NodesGroup_1.NodesGroup);

exports.DebugProtectionNodesGroup = DebugProtectionNodesGroup;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodesGroup_1 = __webpack_require__(12);
var SelfDefendingUnicodeNode_1 = __webpack_require__(25);

var SelfDefendingNodesGroup = function (_NodesGroup_1$NodesGr) {
    _inherits(SelfDefendingNodesGroup, _NodesGroup_1$NodesGr);

    function SelfDefendingNodesGroup(options) {
        _classCallCheck(this, SelfDefendingNodesGroup);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelfDefendingNodesGroup).call(this, options));

        _this.nodes.set('selfDefendingUnicodeNode', new SelfDefendingUnicodeNode_1.SelfDefendingUnicodeNode(_this.options));
        return _this;
    }

    return SelfDefendingNodesGroup;
}(NodesGroup_1.NodesGroup);

exports.SelfDefendingNodesGroup = SelfDefendingNodesGroup;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodesGroup_1 = __webpack_require__(12);
var UnicodeArrayCallsWrapper_1 = __webpack_require__(26);
var UnicodeArrayDecodeNode_1 = __webpack_require__(27);
var UnicodeArrayNode_1 = __webpack_require__(28);
var UnicodeArrayRotateFunctionNode_1 = __webpack_require__(29);
var Utils_1 = __webpack_require__(0);

var UnicodeArrayNodesGroup = function (_NodesGroup_1$NodesGr) {
    _inherits(UnicodeArrayNodesGroup, _NodesGroup_1$NodesGr);

    function UnicodeArrayNodesGroup(options) {
        _classCallCheck(this, UnicodeArrayNodesGroup);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UnicodeArrayNodesGroup).call(this, options));

        _this.unicodeArrayName = Utils_1.Utils.getRandomVariableName(UnicodeArrayNode_1.UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH);
        _this.unicodeArrayTranslatorName = Utils_1.Utils.getRandomVariableName(UnicodeArrayNode_1.UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH);
        if (_this.options.get('rotateUnicodeArray')) {
            _this.unicodeArrayRotateValue = Utils_1.Utils.getRandomGenerator().integer({
                min: 100,
                max: 500
            });
        } else {
            _this.unicodeArrayRotateValue = 0;
        }
        var unicodeArrayNode = new UnicodeArrayNode_1.UnicodeArrayNode(_this.unicodeArrayName, _this.unicodeArrayRotateValue, _this.options),
            unicodeArray = unicodeArrayNode.getNodeData();
        _this.nodes.set('unicodeArrayNode', unicodeArrayNode);
        if (_this.options.get('wrapUnicodeArrayCalls')) {
            _this.nodes.set('unicodeArrayCallsWrapper', new UnicodeArrayCallsWrapper_1.UnicodeArrayCallsWrapper(_this.unicodeArrayTranslatorName, _this.unicodeArrayName, unicodeArray, _this.options));
        }
        if (_this.options.get('encodeUnicodeLiterals')) {
            _this.nodes.set('unicodeArrayDecodeNode', new UnicodeArrayDecodeNode_1.UnicodeArrayDecodeNode(_this.unicodeArrayName, unicodeArray, _this.options));
        }
        if (_this.options.get('rotateUnicodeArray')) {
            _this.nodes.set('unicodeArrayRotateFunctionNode', new UnicodeArrayRotateFunctionNode_1.UnicodeArrayRotateFunctionNode(_this.unicodeArrayName, unicodeArray, _this.unicodeArrayRotateValue, _this.options));
        }
        return _this;
    }

    return UnicodeArrayNodesGroup;
}(NodesGroup_1.NodesGroup);

exports.UnicodeArrayNodesGroup = UnicodeArrayNodesGroup;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(3);
var NodeObfuscator_1 = __webpack_require__(5);

var CatchClauseObfuscator = function (_NodeObfuscator_1$Nod) {
    _inherits(CatchClauseObfuscator, _NodeObfuscator_1$Nod);

    function CatchClauseObfuscator() {
        var _Object$getPrototypeO;

        _classCallCheck(this, CatchClauseObfuscator);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CatchClauseObfuscator)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.catchClauseParam = new Map();
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

            estraverse.traverse(catchClauseNode.param, {
                leave: function leave(node) {
                    return _this2.storeIdentifiersNames(node, _this2.catchClauseParam);
                }
            });
        }
    }, {
        key: 'replaceCatchClauseParam',
        value: function replaceCatchClauseParam(catchClauseNode) {
            var _this3 = this;

            estraverse.replace(catchClauseNode, {
                leave: function leave(node, parentNode) {
                    _this3.replaceIdentifiersWithRandomNames(node, parentNode, _this3.catchClauseParam);
                }
            });
        }
    }]);

    return CatchClauseObfuscator;
}(NodeObfuscator_1.NodeObfuscator);

exports.CatchClauseObfuscator = CatchClauseObfuscator;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(3);
var NodeType_1 = __webpack_require__(2);
var NodeObfuscator_1 = __webpack_require__(5);
var NodeUtils_1 = __webpack_require__(1);

var FunctionDeclarationObfuscator = function (_NodeObfuscator_1$Nod) {
    _inherits(FunctionDeclarationObfuscator, _NodeObfuscator_1$Nod);

    function FunctionDeclarationObfuscator() {
        var _Object$getPrototypeO;

        _classCallCheck(this, FunctionDeclarationObfuscator);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FunctionDeclarationObfuscator)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.functionName = new Map();
        return _this;
    }

    _createClass(FunctionDeclarationObfuscator, [{
        key: "obfuscateNode",
        value: function obfuscateNode(functionDeclarationNode, parentNode) {
            if (parentNode.type === NodeType_1.NodeType.Program) {
                return;
            }
            this.storeFunctionName(functionDeclarationNode);
            this.replaceFunctionName(functionDeclarationNode);
        }
    }, {
        key: "storeFunctionName",
        value: function storeFunctionName(functionDeclarationNode) {
            var _this2 = this;

            estraverse.traverse(functionDeclarationNode.id, {
                leave: function leave(node) {
                    return _this2.storeIdentifiersNames(node, _this2.functionName);
                }
            });
        }
    }, {
        key: "replaceFunctionName",
        value: function replaceFunctionName(functionDeclarationNode) {
            var _this3 = this;

            var scopeNode = NodeUtils_1.NodeUtils.getBlockScopeOfNode(functionDeclarationNode);
            estraverse.replace(scopeNode, {
                enter: function enter(node, parentNode) {
                    _this3.replaceIdentifiersWithRandomNames(node, parentNode, _this3.functionName);
                }
            });
        }
    }]);

    return FunctionDeclarationObfuscator;
}(NodeObfuscator_1.NodeObfuscator);

exports.FunctionDeclarationObfuscator = FunctionDeclarationObfuscator;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(3);
var NodeObfuscator_1 = __webpack_require__(5);

var FunctionObfuscator = function (_NodeObfuscator_1$Nod) {
    _inherits(FunctionObfuscator, _NodeObfuscator_1$Nod);

    function FunctionObfuscator() {
        var _Object$getPrototypeO;

        _classCallCheck(this, FunctionObfuscator);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FunctionObfuscator)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.functionParams = new Map();
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
                estraverse.traverse(paramsNode, {
                    leave: function leave(node) {
                        return _this2.storeIdentifiersNames(node, _this2.functionParams);
                    }
                });
            });
        }
    }, {
        key: 'replaceFunctionParams',
        value: function replaceFunctionParams(functionNode) {
            var _this3 = this;

            var replaceVisitor = {
                leave: function leave(node, parentNode) {
                    _this3.replaceIdentifiersWithRandomNames(node, parentNode, _this3.functionParams);
                }
            };
            functionNode.params.forEach(function (paramsNode) {
                estraverse.replace(paramsNode, replaceVisitor);
            });
            estraverse.replace(functionNode.body, replaceVisitor);
        }
    }]);

    return FunctionObfuscator;
}(NodeObfuscator_1.NodeObfuscator);

exports.FunctionObfuscator = FunctionObfuscator;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var escodegen = __webpack_require__(11);
var NodeObfuscator_1 = __webpack_require__(5);
var Nodes_1 = __webpack_require__(8);

var LiteralObfuscator = function (_NodeObfuscator_1$Nod) {
    _inherits(LiteralObfuscator, _NodeObfuscator_1$Nod);

    function LiteralObfuscator() {
        _classCallCheck(this, LiteralObfuscator);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(LiteralObfuscator).apply(this, arguments));
    }

    _createClass(LiteralObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(literalNode, parentNode) {
            if (Nodes_1.Nodes.isPropertyNode(parentNode) && parentNode.key === literalNode) {
                return;
            }
            if (literalNode['x-verbatim-property']) {
                return;
            }
            var content = void 0;
            switch (_typeof(literalNode.value)) {
                case 'boolean':
                    content = this.replaceLiteralBooleanWithJSFuck(literalNode.value);
                    break;
                case 'number':
                    content = this.replaceLiteralNumberWithHexadecimalValue(literalNode.value);
                    break;
                case 'string':
                    content = this.replaceLiteralValueWithUnicodeValue(literalNode.value);
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
}(NodeObfuscator_1.NodeObfuscator);

exports.LiteralObfuscator = LiteralObfuscator;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var escodegen = __webpack_require__(11);
var estraverse = __webpack_require__(3);
var NodeType_1 = __webpack_require__(2);
var NodeObfuscator_1 = __webpack_require__(5);
var Nodes_1 = __webpack_require__(8);

var MemberExpressionObfuscator = function (_NodeObfuscator_1$Nod) {
    _inherits(MemberExpressionObfuscator, _NodeObfuscator_1$Nod);

    function MemberExpressionObfuscator() {
        _classCallCheck(this, MemberExpressionObfuscator);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(MemberExpressionObfuscator).apply(this, arguments));
    }

    _createClass(MemberExpressionObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(memberExpressionNode) {
            var _this2 = this;

            estraverse.replace(memberExpressionNode.property, {
                leave: function leave(node, parentNode) {
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
                    content: this.replaceLiteralValueWithUnicodeValue(nodeValue),
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
            switch (_typeof(node.value)) {
                case 'string':
                    if (node['x-verbatim-property']) {
                        break;
                    }
                    node['x-verbatim-property'] = {
                        content: this.replaceLiteralValueWithUnicodeValue(node.value),
                        precedence: escodegen.Precedence.Primary
                    };
                    break;
                default:
                    break;
            }
        }
    }]);

    return MemberExpressionObfuscator;
}(NodeObfuscator_1.NodeObfuscator);

exports.MemberExpressionObfuscator = MemberExpressionObfuscator;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(3);
var NodeObfuscator_1 = __webpack_require__(5);
var Nodes_1 = __webpack_require__(8);
var Utils_1 = __webpack_require__(0);

var MethodDefinitionObfuscator = function (_NodeObfuscator_1$Nod) {
    _inherits(MethodDefinitionObfuscator, _NodeObfuscator_1$Nod);

    function MethodDefinitionObfuscator() {
        var _Object$getPrototypeO;

        _classCallCheck(this, MethodDefinitionObfuscator);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MethodDefinitionObfuscator)).call.apply(_Object$getPrototypeO, [this].concat(args)));

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
                leave: function leave(node) {
                    if (Nodes_1.Nodes.isIdentifierNode(node) && !Utils_1.Utils.arrayContains(_this2.ignoredNames, node.name) && methodDefinitionNode.computed === false) {
                        methodDefinitionNode.computed = true;
                        node.name = _this2.replaceLiteralValueWithUnicodeValue(node.name);
                        return;
                    }
                    return estraverse.VisitorOption.Skip;
                }
            });
        }
    }]);

    return MethodDefinitionObfuscator;
}(NodeObfuscator_1.NodeObfuscator);

exports.MethodDefinitionObfuscator = MethodDefinitionObfuscator;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var escodegen = __webpack_require__(11);
var estraverse = __webpack_require__(3);
var NodeType_1 = __webpack_require__(2);
var NodeObfuscator_1 = __webpack_require__(5);
var Nodes_1 = __webpack_require__(8);
var Utils_1 = __webpack_require__(0);

var ObjectExpressionObfuscator = function (_NodeObfuscator_1$Nod) {
    _inherits(ObjectExpressionObfuscator, _NodeObfuscator_1$Nod);

    function ObjectExpressionObfuscator() {
        _classCallCheck(this, ObjectExpressionObfuscator);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectExpressionObfuscator).apply(this, arguments));
    }

    _createClass(ObjectExpressionObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(objectExpressionNode) {
            var _this2 = this;

            objectExpressionNode.properties.forEach(function (property) {
                estraverse.replace(property.key, {
                    leave: function leave(node, parentNode) {
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
            switch (_typeof(node.value)) {
                case 'string':
                    if (node['x-verbatim-property']) {
                        break;
                    }
                    node['x-verbatim-property'] = {
                        content: Utils_1.Utils.stringToUnicode(node.value),
                        precedence: escodegen.Precedence.Primary
                    };
                    break;
                default:
                    break;
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
}(NodeObfuscator_1.NodeObfuscator);

exports.ObjectExpressionObfuscator = ObjectExpressionObfuscator;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(3);
var NodeType_1 = __webpack_require__(2);
var NodeObfuscator_1 = __webpack_require__(5);
var NodeUtils_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(0);

var VariableDeclarationObfuscator = function (_NodeObfuscator_1$Nod) {
    _inherits(VariableDeclarationObfuscator, _NodeObfuscator_1$Nod);

    function VariableDeclarationObfuscator() {
        var _Object$getPrototypeO;

        _classCallCheck(this, VariableDeclarationObfuscator);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(VariableDeclarationObfuscator)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.variableNames = new Map();
        return _this;
    }

    _createClass(VariableDeclarationObfuscator, [{
        key: "obfuscateNode",
        value: function obfuscateNode(variableDeclarationNode, parentNode) {
            if (parentNode.type === NodeType_1.NodeType.Program) {
                return;
            }
            this.storeVariableNames(variableDeclarationNode);
            this.replaceVariableNames(variableDeclarationNode, parentNode);
        }
    }, {
        key: "storeVariableNames",
        value: function storeVariableNames(variableDeclarationNode) {
            var _this2 = this;

            variableDeclarationNode.declarations.forEach(function (declarationNode) {
                estraverse.traverse(declarationNode.id, {
                    enter: function enter(node) {
                        return _this2.storeIdentifiersNames(node, _this2.variableNames);
                    }
                });
            });
        }
    }, {
        key: "replaceVariableNames",
        value: function replaceVariableNames(variableDeclarationNode, variableParentNode) {
            var _this3 = this;

            var scopeNode = variableDeclarationNode.kind === 'var' ? NodeUtils_1.NodeUtils.getBlockScopeOfNode(variableDeclarationNode) : variableParentNode,
                isNodeAfterVariableDeclaratorFlag = false;
            estraverse.replace(scopeNode, {
                enter: function enter(node, parentNode) {
                    var functionNodes = [NodeType_1.NodeType.ArrowFunctionExpression, NodeType_1.NodeType.FunctionDeclaration, NodeType_1.NodeType.FunctionExpression];
                    if (Utils_1.Utils.arrayContains(functionNodes, node.type)) {
                        estraverse.replace(node, {
                            enter: function enter(node, parentNode) {
                                _this3.replaceIdentifiersWithRandomNames(node, parentNode, _this3.variableNames);
                            }
                        });
                    }
                    if (node === variableDeclarationNode) {
                        isNodeAfterVariableDeclaratorFlag = true;
                    }
                    if (isNodeAfterVariableDeclaratorFlag) {
                        _this3.replaceIdentifiersWithRandomNames(node, parentNode, _this3.variableNames);
                    }
                }
            });
        }
    }]);

    return VariableDeclarationObfuscator;
}(NodeObfuscator_1.NodeObfuscator);

exports.VariableDeclarationObfuscator = VariableDeclarationObfuscator;

/***/ },
/* 41 */
/***/ function(module, exports) {

module.exports = require("chance");

/***/ },
/* 42 */
/***/ function(module, exports) {

module.exports = require("child_process");

/***/ },
/* 43 */
/***/ function(module, exports) {

module.exports = require("commander");

/***/ },
/* 44 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 45 */
/***/ function(module, exports) {

module.exports = require("mkdirp");

/***/ },
/* 46 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map