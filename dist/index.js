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
/******/ 	return __webpack_require__(__webpack_require__.s = 97);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var chance_1 = __webpack_require__(91);
var JSFuck_1 = __webpack_require__(21);

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
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            var output = '';
            string = encodeURIComponent(string).replace(/%([0-9A-F]{2})/g, function (match, p1) {
                return String.fromCharCode(parseInt('0x' + p1));
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
        key: 'rc4',
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
        key: 'stringToUnicodeEscapeSequence',
        value: function stringToUnicodeEscapeSequence(string) {
            var radix = 16;
            var prefix = void 0,
                regexp = new RegExp('[\x00-\x7F]'),
                template = void 0;
            return '' + string.replace(/[\s\S]/g, function (escape) {
                if (regexp.test(escape)) {
                    prefix = '\\x';
                    template = '0'.repeat(2);
                } else {
                    prefix = '\\u';
                    template = '0'.repeat(4);
                }
                return '' + prefix + (template + escape.charCodeAt(0).toString(radix)).slice(-template.length);
            });
        }
    }]);

    return Utils;
}();

Utils.randomGenerator = new chance_1.Chance();
exports.Utils = Utils;

/***/ },
/* 1 */
/***/ function(module, exports) {

"use strict";
"use strict";

(function (AppendState) {
    AppendState[AppendState["AfterObfuscation"] = 0] = "AfterObfuscation";
    AppendState[AppendState["BeforeObfuscation"] = 1] = "BeforeObfuscation";
})(exports.AppendState || (exports.AppendState = {}));
var AppendState = exports.AppendState;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodeType_1 = __webpack_require__(6);

var Node = function () {
    function Node() {
        _classCallCheck(this, Node);
    }

    _createClass(Node, null, [{
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
        key: 'isBreakStatementNode',
        value: function isBreakStatementNode(node) {
            return node.type === NodeType_1.NodeType.BreakStatement;
        }
    }, {
        key: 'isCallExpressionNode',
        value: function isCallExpressionNode(node) {
            return node.type === NodeType_1.NodeType.CallExpression;
        }
    }, {
        key: 'isContinueStatementNode',
        value: function isContinueStatementNode(node) {
            return node.type === NodeType_1.NodeType.ContinueStatement;
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
        key: 'isLabelIdentifierNode',
        value: function isLabelIdentifierNode(node, parentNode) {
            var parentNodeIsLabeledStatementNode = Node.isLabeledStatementNode(parentNode) && parentNode.label === node;
            var parentNodeIsContinueStatementNode = Node.isContinueStatementNode(parentNode) && parentNode.label === node;
            var parentNodeIsBreakStatementNode = Node.isBreakStatementNode(parentNode) && parentNode.label === node;
            return parentNodeIsLabeledStatementNode || parentNodeIsContinueStatementNode || parentNodeIsBreakStatementNode;
        }
    }, {
        key: 'isLabeledStatementNode',
        value: function isLabeledStatementNode(node) {
            return node.type === NodeType_1.NodeType.LabeledStatement;
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
            if (!Node.isIdentifierNode(node)) {
                return false;
            }
            var parentNodeIsPropertyNode = Node.isPropertyNode(parentNode) && parentNode.key === node;
            var parentNodeIsMemberExpressionNode = Node.isMemberExpressionNode(parentNode) && parentNode.computed === false && parentNode.property === node;
            return !parentNodeIsPropertyNode && !parentNodeIsMemberExpressionNode && !Node.isLabelIdentifierNode(node, parentNode);
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

    return Node;
}();

exports.Node = Node;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils_1 = __webpack_require__(0);

var NodeAppender = function () {
    function NodeAppender() {
        _classCallCheck(this, NodeAppender);
    }

    _createClass(NodeAppender, null, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode, nodeBodyStatements) {
            if (!NodeAppender.validateBodyStatements(nodeBodyStatements)) {
                nodeBodyStatements = [];
            }
            nodeBodyStatements = NodeAppender.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);
            blockScopeNode.body = [].concat(_toConsumableArray(blockScopeNode.body), _toConsumableArray(nodeBodyStatements));
        }
    }, {
        key: 'appendNodeToOptimalBlockScope',
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
        key: 'getOptimalBlockScope',
        value: function getOptimalBlockScope(blockScopeTraceData, index) {
            var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;

            var firstCall = blockScopeTraceData[index];
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
        key: 'getRandomStackTraceIndex',
        value: function getRandomStackTraceIndex(stackTraceRootLength) {
            return Utils_1.Utils.getRandomGenerator().integer({
                min: 0,
                max: Math.max(0, Math.round(stackTraceRootLength - 1))
            });
        }
    }, {
        key: 'insertNodeAtIndex',
        value: function insertNodeAtIndex(blockScopeNode, nodeBodyStatements, index) {
            if (!NodeAppender.validateBodyStatements(nodeBodyStatements)) {
                nodeBodyStatements = [];
            }
            nodeBodyStatements = NodeAppender.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);
            blockScopeNode.body = [].concat(_toConsumableArray(blockScopeNode.body.slice(0, index)), _toConsumableArray(nodeBodyStatements), _toConsumableArray(blockScopeNode.body.slice(index)));
        }
    }, {
        key: 'prependNode',
        value: function prependNode(blockScopeNode, nodeBodyStatements) {
            if (!NodeAppender.validateBodyStatements(nodeBodyStatements)) {
                nodeBodyStatements = [];
            }
            nodeBodyStatements = NodeAppender.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);
            blockScopeNode.body = [].concat(_toConsumableArray(nodeBodyStatements), _toConsumableArray(blockScopeNode.body));
        }
    }, {
        key: 'parentizeBodyStatementsBeforeAppend',
        value: function parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = nodeBodyStatements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
        key: 'validateBodyStatements',
        value: function validateBodyStatements(nodeBodyStatements) {
            return nodeBodyStatements.every(function (statementNode) {
                return !!statementNode && statementNode.hasOwnProperty('type');
            });
        }
    }]);

    return NodeAppender;
}();

exports.NodeAppender = NodeAppender;

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("estraverse");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NodeUtils_1 = __webpack_require__(7);

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
    }, {
        key: "setAppendState",
        value: function setAppendState(appendState) {
            this.appendState = appendState;
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            return NodeUtils_1.NodeUtils.convertCodeToStructure(this.getCode());
        }
    }]);

    return AbstractCustomNode;
}();

exports.AbstractCustomNode = AbstractCustomNode;

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var escodegen = __webpack_require__(14);
var esprima = __webpack_require__(24);
var estraverse = __webpack_require__(4);
var NodeType_1 = __webpack_require__(6);
var Node_1 = __webpack_require__(2);
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
        key: 'convertCodeToStructure',
        value: function convertCodeToStructure(code) {
            var structure = esprima.parse(code);
            NodeUtils.addXVerbatimPropertyToLiterals(structure);
            NodeUtils.parentize(structure);
            return structure.body;
        }
    }, {
        key: 'getBlockStatementNodeByIndex',
        value: function getBlockStatementNodeByIndex(node) {
            var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (Node_1.Node.isNodeHasBlockStatement(node)) {
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
            if (Node_1.Node.isBlockStatementNode(parentNode)) {
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
            if (Node_1.Node.isProgramNode(parentNode)) {
                return parentNode;
            }
            return NodeUtils.getBlockScopeOfNode(parentNode);
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
                            value = Node_1.Node.getProgramNode([node]);
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
    }]);

    return NodeUtils;
}();

NodeUtils.nodesWithBlockScope = [NodeType_1.NodeType.ArrowFunctionExpression, NodeType_1.NodeType.FunctionDeclaration, NodeType_1.NodeType.FunctionExpression, NodeType_1.NodeType.MethodDefinition, NodeType_1.NodeType.Program];
exports.NodeUtils = NodeUtils;

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("format-unicorn");

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JavaScriptObfuscatorCLI_1 = __webpack_require__(33);
var JavaScriptObfuscatorInternal_1 = __webpack_require__(28);

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppendState_1 = __webpack_require__(1);

var AbstractNodesGroup = function () {
    function AbstractNodesGroup(stackTraceData, options) {
        _classCallCheck(this, AbstractNodesGroup);

        this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        this.stackTraceData = stackTraceData;
        this.options = options;
    }

    _createClass(AbstractNodesGroup, [{
        key: "syncCustomNodesWithNodesGroup",
        value: function syncCustomNodesWithNodesGroup(customNodes) {
            var _this = this;

            customNodes.forEach(function (node) {
                node.setAppendState(_this.appendState);
            });
            return customNodes;
        }
    }]);

    return AbstractNodesGroup;
}();

exports.AbstractNodesGroup = AbstractNodesGroup;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractReplacer_1 = __webpack_require__(16);
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var SourceMapMode_1 = __webpack_require__(15);
exports.NO_CUSTOM_NODES_PRESET = Object.freeze({
    compact: true,
    controlFlow: false,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    domainLock: [],
    reservedNames: [],
    rotateStringArray: false,
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

/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = require("escodegen");

/***/ },
/* 15 */
/***/ function(module, exports) {

"use strict";
"use strict";

exports.SourceMapMode = {
    Inline: 'inline',
    Separate: 'separate'
};

/***/ },
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(1);
var SingleNodeCallControllerTemplate_1 = __webpack_require__(73);
var NoCustomNodesPreset_1 = __webpack_require__(13);
var AbstractCustomNode_1 = __webpack_require__(5);
var JavaScriptObfuscator_1 = __webpack_require__(10);
var NodeAppender_1 = __webpack_require__(3);

var NodeCallsControllerFunctionNode = function (_AbstractCustomNode_) {
    _inherits(NodeCallsControllerFunctionNode, _AbstractCustomNode_);

    function NodeCallsControllerFunctionNode(stackTraceData, callsControllerFunctionName, randomStackTraceIndex, options) {
        _classCallCheck(this, NodeCallsControllerFunctionNode);

        var _this = _possibleConstructorReturn(this, (NodeCallsControllerFunctionNode.__proto__ || Object.getPrototypeOf(NodeCallsControllerFunctionNode)).call(this, options));

        _this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        _this.stackTraceData = stackTraceData;
        _this.callsControllerFunctionName = callsControllerFunctionName;
        _this.randomStackTraceIndex = randomStackTraceIndex;
        return _this;
    }

    _createClass(NodeCallsControllerFunctionNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            var targetBlockScope = void 0;
            if (this.stackTraceData.length) {
                targetBlockScope = NodeAppender_1.NodeAppender.getOptimalBlockScope(this.stackTraceData, this.randomStackTraceIndex, 1);
            } else {
                targetBlockScope = blockScopeNode;
            }
            NodeAppender_1.NodeAppender.prependNode(targetBlockScope, this.getNode());
        }
    }, {
        key: 'getCode',
        value: function getCode() {
            if (this.appendState === AppendState_1.AppendState.AfterObfuscation) {
                return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(SingleNodeCallControllerTemplate_1.SingleNodeCallControllerTemplate().formatUnicorn({
                    singleNodeCallControllerFunctionName: this.callsControllerFunctionName
                }), NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET).getObfuscatedCode();
            }
            return SingleNodeCallControllerTemplate_1.SingleNodeCallControllerTemplate().formatUnicorn({
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            });
        }
    }]);

    return NodeCallsControllerFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.NodeCallsControllerFunctionNode = NodeCallsControllerFunctionNode;

/***/ },
/* 18 */
/***/ function(module, exports) {

"use strict";
"use strict";

exports.StringArrayEncoding = {
    base64: 'base64',
    rc4: 'rc4'
};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StringArrayEncoding_1 = __webpack_require__(18);
var AbstractReplacer_1 = __webpack_require__(16);
var NumberLiteralReplacer_1 = __webpack_require__(22);
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
            var replaceWithStringArrayFlag = nodeValue.length >= StringLiteralReplacer.minimumLengthForStringArray && Math.random() <= this.options.stringArrayThreshold;
            if (this.options.stringArray && replaceWithStringArrayFlag) {
                return this.replaceStringLiteralWithStringArrayCall(nodeValue);
            }
            return '\'' + Utils_1.Utils.stringToUnicodeEscapeSequence(nodeValue) + '\'';
        }
    }, {
        key: 'replaceStringLiteralWithStringArrayCall',
        value: function replaceStringLiteralWithStringArrayCall(value) {
            var stringArrayNode = this.nodes.get('stringArrayNode');
            if (!stringArrayNode) {
                throw new ReferenceError('`stringArrayNode` node is not found in Map with custom node.');
            }
            var rc4Key = '';
            switch (this.options.stringArrayEncoding) {
                case StringArrayEncoding_1.StringArrayEncoding.base64:
                    value = Utils_1.Utils.btoa(value);
                    break;
                case StringArrayEncoding_1.StringArrayEncoding.rc4:
                    rc4Key = Utils_1.Utils.getRandomGenerator().pickone(StringLiteralReplacer.rc4Keys);
                    value = Utils_1.Utils.btoa(Utils_1.Utils.rc4(value, rc4Key));
                    break;
            }
            if (this.options.unicodeEscapeSequence) {
                value = Utils_1.Utils.stringToUnicodeEscapeSequence(value);
            }
            var stringArray = stringArrayNode.getNodeData(),
                indexOfExistingValue = stringArray.getIndexOf(value),
                indexOfValue = void 0,
                hexadecimalIndex = void 0;
            if (indexOfExistingValue >= 0) {
                indexOfValue = indexOfExistingValue;
            } else {
                indexOfValue = stringArray.getLength();
                stringArrayNode.updateNodeData(value);
            }
            hexadecimalIndex = new NumberLiteralReplacer_1.NumberLiteralReplacer(this.nodes, this.options).replace(indexOfValue);
            var stringArrayCallsWrapper = this.nodes.get('stringArrayCallsWrapper');
            if (!stringArrayCallsWrapper) {
                throw new ReferenceError('`stringArrayCallsWrapper` node is not found in Map with custom node.');
            }
            if (this.options.stringArrayEncoding === StringArrayEncoding_1.StringArrayEncoding.rc4) {
                return stringArrayCallsWrapper.getNodeIdentifier() + '(\'' + hexadecimalIndex + '\', \'' + Utils_1.Utils.stringToUnicodeEscapeSequence(rc4Key) + '\')';
            }
            return stringArrayCallsWrapper.getNodeIdentifier() + '(\'' + hexadecimalIndex + '\')';
        }
    }]);

    return StringLiteralReplacer;
}(AbstractReplacer_1.AbstractReplacer);

StringLiteralReplacer.minimumLengthForStringArray = 3;
StringLiteralReplacer.rc4Keys = Utils_1.Utils.getRandomGenerator().n(function () {
    return Utils_1.Utils.getRandomGenerator().string({ length: 4 });
}, 50);
exports.StringLiteralReplacer = StringLiteralReplacer;

/***/ },
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AbstractReplacer_1 = __webpack_require__(16);
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var SourceMapMode_1 = __webpack_require__(15);
exports.DEFAULT_PRESET = Object.freeze({
    compact: true,
    controlFlow: false,
    debugProtection: false,
    debugProtectionInterval: false,
    disableConsoleOutput: true,
    domainLock: [],
    reservedNames: [],
    rotateStringArray: true,
    selfDefending: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode_1.SourceMapMode.Separate,
    stringArray: true,
    stringArrayEncoding: false,
    stringArrayThreshold: 0.8,
    unicodeEscapeSequence: true
});

/***/ },
/* 24 */
/***/ function(module, exports) {

module.exports = require("esprima");

/***/ },
/* 25 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 26 */
/***/ function(module, exports) {

module.exports = require("babel-polyfill");

/***/ },
/* 27 */
/***/ function(module, exports) {

"use strict";
"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ControlFlowStorage = function () {
    function ControlFlowStorage() {
        _classCallCheck(this, ControlFlowStorage);

        this.storage = new Map();
    }

    _createClass(ControlFlowStorage, [{
        key: "addToStorage",
        value: function addToStorage(key, value) {
            this.storage.set(key, value);
        }
    }, {
        key: "getStorage",
        value: function getStorage() {
            return this.storage;
        }
    }, {
        key: "getStorageItem",
        value: function getStorageItem(key) {
            var value = this.storage.get(key);
            if (!value) {
                throw new Error("No value found in ControlFlowStorage with key `" + key + "`");
            }
            return value;
        }
    }, {
        key: "toString",
        value: function toString() {
            return "{\n            " + Array.from(this.storage).reduce(function (string, _ref) {
                var _ref2 = _slicedToArray(_ref, 2),
                    key = _ref2[0],
                    value = _ref2[1];

                string += key + ": " + value.getCode() + ",";
                return string;
            }, '') + "\n        }";
        }
    }]);

    return ControlFlowStorage;
}();

exports.ControlFlowStorage = ControlFlowStorage;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var esprima = __webpack_require__(24);
var escodegen = __webpack_require__(14);
var ObfuscationResult_1 = __webpack_require__(20);
var Obfuscator_1 = __webpack_require__(29);
var Options_1 = __webpack_require__(64);
var SourceMapCorrector_1 = __webpack_require__(30);

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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = __webpack_require__(4);
var AppendState_1 = __webpack_require__(1);
var NodeType_1 = __webpack_require__(6);
var CatchClauseObfuscator_1 = __webpack_require__(54);
var ConsoleOutputNodesGroup_1 = __webpack_require__(49);
var DebugProtectionNodesGroup_1 = __webpack_require__(50);
var DomainLockNodesGroup_1 = __webpack_require__(51);
var FunctionDeclarationObfuscator_1 = __webpack_require__(55);
var FunctionObfuscator_1 = __webpack_require__(56);
var LabeledStatementObfuscator_1 = __webpack_require__(57);
var LiteralObfuscator_1 = __webpack_require__(58);
var MemberExpressionObfuscator_1 = __webpack_require__(59);
var MethodDefinitionObfuscator_1 = __webpack_require__(60);
var Node_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(7);
var ObjectExpressionObfuscator_1 = __webpack_require__(61);
var SelfDefendingNodesGroup_1 = __webpack_require__(52);
var StackTraceAnalyzer_1 = __webpack_require__(67);
var StringArrayNodesGroup_1 = __webpack_require__(53);
var VariableDeclarationObfuscator_1 = __webpack_require__(62);
var FunctionControlFlowChanger_1 = __webpack_require__(46);

var Obfuscator = function () {
    function Obfuscator(options) {
        _classCallCheck(this, Obfuscator);

        this.customNodes = new Map();
        this.options = options;
    }

    _createClass(Obfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(node) {
            if (Node_1.Node.isProgramNode(node) && !node.body.length) {
                return node;
            }
            NodeUtils_1.NodeUtils.parentize(node);
            var stackTraceData = new StackTraceAnalyzer_1.StackTraceAnalyzer(node.body).analyze();
            this.initializeCustomNodes(stackTraceData);
            this.beforeObfuscation(node);
            this.obfuscate(node);
            this.afterObfuscation(node);
            if (this.options.controlFlow) {
                this.changeControlFlow(node);
            }
            return node;
        }
    }, {
        key: 'afterObfuscation',
        value: function afterObfuscation(astTree) {
            this.customNodes.forEach(function (node) {
                if (node.getAppendState() === AppendState_1.AppendState.AfterObfuscation) {
                    node.appendNode(astTree);
                }
            });
        }
    }, {
        key: 'beforeObfuscation',
        value: function beforeObfuscation(astTree) {
            this.customNodes.forEach(function (node) {
                if (node.getAppendState() === AppendState_1.AppendState.BeforeObfuscation) {
                    node.appendNode(astTree);
                }
            });
        }
    }, {
        key: 'changeControlFlow',
        value: function changeControlFlow(node) {
            var _this = this;

            estraverse.traverse(node, {
                leave: function leave(node, parentNode) {
                    _this.initializeNodeControlFlowChangers(node, parentNode);
                }
            });
        }
    }, {
        key: 'initializeCustomNodes',
        value: function initializeCustomNodes(stackTraceData) {
            var _this2 = this;

            var customNodes = [];
            Obfuscator.nodeGroups.forEach(function (nodeGroupConstructor) {
                var nodeGroupNodes = new nodeGroupConstructor(stackTraceData, _this2.options).getNodes();
                if (!nodeGroupNodes) {
                    return;
                }
                customNodes.push.apply(customNodes, _toConsumableArray(nodeGroupNodes));
            });
            this.customNodes = new Map(customNodes);
        }
    }, {
        key: 'initializeNodeControlFlowChangers',
        value: function initializeNodeControlFlowChangers(node, parentNode) {
            var _this3 = this;

            var nodeControlFlowChangers = Obfuscator.nodeControlFlowChangers.get(node.type);
            if (!nodeControlFlowChangers) {
                return;
            }
            nodeControlFlowChangers.forEach(function (controlFlowChanger) {
                new controlFlowChanger(_this3.customNodes, _this3.options).changeControlFlow(node, parentNode);
            });
        }
    }, {
        key: 'initializeNodeObfuscators',
        value: function initializeNodeObfuscators(node, parentNode) {
            var _this4 = this;

            var nodeObfuscators = Obfuscator.nodeObfuscators.get(node.type);
            if (!nodeObfuscators) {
                return;
            }
            nodeObfuscators.forEach(function (obfuscator) {
                new obfuscator(_this4.customNodes, _this4.options).obfuscateNode(node, parentNode);
            });
        }
    }, {
        key: 'obfuscate',
        value: function obfuscate(node) {
            var _this5 = this;

            estraverse.traverse(node, {
                enter: function enter(node, parentNode) {
                    _this5.initializeNodeObfuscators(node, parentNode);
                }
            });
        }
    }]);

    return Obfuscator;
}();

Obfuscator.nodeControlFlowChangers = new Map([[NodeType_1.NodeType.FunctionDeclaration, [FunctionControlFlowChanger_1.FunctionControlFlowChanger]], [NodeType_1.NodeType.FunctionExpression, [FunctionControlFlowChanger_1.FunctionControlFlowChanger]]]);
Obfuscator.nodeGroups = [DomainLockNodesGroup_1.DomainLockNodesGroup, SelfDefendingNodesGroup_1.SelfDefendingNodesGroup, ConsoleOutputNodesGroup_1.ConsoleOutputNodesGroup, DebugProtectionNodesGroup_1.DebugProtectionNodesGroup, StringArrayNodesGroup_1.StringArrayNodesGroup];
Obfuscator.nodeObfuscators = new Map([[NodeType_1.NodeType.ArrowFunctionExpression, [FunctionObfuscator_1.FunctionObfuscator]], [NodeType_1.NodeType.ClassDeclaration, [FunctionDeclarationObfuscator_1.FunctionDeclarationObfuscator]], [NodeType_1.NodeType.CatchClause, [CatchClauseObfuscator_1.CatchClauseObfuscator]], [NodeType_1.NodeType.FunctionDeclaration, [FunctionDeclarationObfuscator_1.FunctionDeclarationObfuscator, FunctionObfuscator_1.FunctionObfuscator]], [NodeType_1.NodeType.FunctionExpression, [FunctionObfuscator_1.FunctionObfuscator]], [NodeType_1.NodeType.MemberExpression, [MemberExpressionObfuscator_1.MemberExpressionObfuscator]], [NodeType_1.NodeType.MethodDefinition, [MethodDefinitionObfuscator_1.MethodDefinitionObfuscator]], [NodeType_1.NodeType.ObjectExpression, [ObjectExpressionObfuscator_1.ObjectExpressionObfuscator]], [NodeType_1.NodeType.VariableDeclaration, [VariableDeclarationObfuscator_1.VariableDeclarationObfuscator]], [NodeType_1.NodeType.LabeledStatement, [LabeledStatementObfuscator_1.LabeledStatementObfuscator]], [NodeType_1.NodeType.Literal, [LiteralObfuscator_1.LiteralObfuscator]]]);
exports.Obfuscator = Obfuscator;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SourceMapMode_1 = __webpack_require__(15);
var ObfuscationResult_1 = __webpack_require__(20);
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
                    sourceMappingUrl += 'data:application/json;base64,' + Utils_1.Utils.btoa(this.sourceMap);
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils_1 = __webpack_require__(0);

var StringArray = function () {
    function StringArray() {
        _classCallCheck(this, StringArray);

        this.array = [];
    }

    _createClass(StringArray, [{
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
            return this.array.map(function (value) {
                return "'" + value + "'";
            }).toString();
        }
    }]);

    return StringArray;
}();

exports.StringArray = StringArray;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = __webpack_require__(94);
var mkdirp = __webpack_require__(95);
var path = __webpack_require__(25);
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var commander = __webpack_require__(93);
var path = __webpack_require__(25);
var SourceMapMode_1 = __webpack_require__(15);
var StringArrayEncoding_1 = __webpack_require__(18);
var DefaultPreset_1 = __webpack_require__(23);
var CLIUtils_1 = __webpack_require__(32);
var JavaScriptObfuscator_1 = __webpack_require__(10);
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
            this.commands = new commander.Command().version(JavaScriptObfuscatorCLI.getBuildVersion(), '-v, --version').usage('<inputPath> [options]').option('-o, --output <path>', 'Output path for obfuscated code').option('--compact <boolean>', 'Disable one line output code compacting', JavaScriptObfuscatorCLI.parseBoolean).option('--debugProtection <boolean>', 'Disable browser Debug panel (can cause DevTools enabled browser freeze)', JavaScriptObfuscatorCLI.parseBoolean).option('--debugProtectionInterval <boolean>', 'Disable browser Debug panel even after page was loaded (can cause DevTools enabled browser freeze)', JavaScriptObfuscatorCLI.parseBoolean).option('--disableConsoleOutput <boolean>', 'Allow console.log, console.info, console.error and console.warn messages output into browser console', JavaScriptObfuscatorCLI.parseBoolean).option('--domainLock <list>', 'Blocks the execution of the code in domains that do not match the passed RegExp patterns (comma separated)', function (val) {
                return val.split(',');
            }).option('--reservedNames <list>', 'Disable obfuscation of variable names, function names and names of function parameters that match the passed RegExp patterns (comma separated)', function (val) {
                return val.split(',');
            }).option('--rotateStringArray <boolean>', 'Disable rotation of unicode array values during obfuscation', JavaScriptObfuscatorCLI.parseBoolean).option('--selfDefending <boolean>', 'Disables self-defending for obfuscated code', JavaScriptObfuscatorCLI.parseBoolean).option('--sourceMap <boolean>', 'Enables source map generation', JavaScriptObfuscatorCLI.parseBoolean).option('--sourceMapBaseUrl <string>', 'Sets base url to the source map import url when `--sourceMapMode=separate`').option('--sourceMapFileName <string>', 'Sets file name for output source map when `--sourceMapMode=separate`').option('--sourceMapMode <string> [inline, separate]', 'Specify source map output mode', JavaScriptObfuscatorCLI.parseSourceMapMode).option('--stringArray <boolean>', 'Disables gathering of all literal strings into an array and replacing every literal string with an array call', JavaScriptObfuscatorCLI.parseBoolean).option('--stringArrayEncoding <boolean|string> [true, false, base64, rc4]', 'Encodes all strings in strings array using base64 or rc4 (this option can slow down your code speed', JavaScriptObfuscatorCLI.parseStringArrayEncoding).option('--stringArrayThreshold <number>', 'The probability that the literal string will be inserted into stringArray (Default: 0.8, Min: 0, Max: 1)', parseFloat).option('--unicodeEscapeSequence <boolean>', 'Allows to enable/disable string conversion to unicode escape sequence', JavaScriptObfuscatorCLI.parseBoolean).parse(this.rawArguments);
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
    }, {
        key: 'parseStringArrayEncoding',
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
var AppendState_1 = __webpack_require__(1);
var ConsoleOutputDisableExpressionTemplate_1 = __webpack_require__(74);
var AbstractCustomNode_1 = __webpack_require__(5);
var NodeAppender_1 = __webpack_require__(3);
var Utils_1 = __webpack_require__(0);

var ConsoleOutputDisableExpressionNode = function (_AbstractCustomNode_) {
    _inherits(ConsoleOutputDisableExpressionNode, _AbstractCustomNode_);

    function ConsoleOutputDisableExpressionNode(stackTraceData, callsControllerFunctionName, randomStackTraceIndex, options) {
        _classCallCheck(this, ConsoleOutputDisableExpressionNode);

        var _this = _possibleConstructorReturn(this, (ConsoleOutputDisableExpressionNode.__proto__ || Object.getPrototypeOf(ConsoleOutputDisableExpressionNode)).call(this, options));

        _this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        _this.stackTraceData = stackTraceData;
        _this.callsControllerFunctionName = callsControllerFunctionName;
        _this.randomStackTraceIndex = randomStackTraceIndex;
        return _this;
    }

    _createClass(ConsoleOutputDisableExpressionNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            NodeAppender_1.NodeAppender.appendNodeToOptimalBlockScope(this.stackTraceData, blockScopeNode, this.getNode(), this.randomStackTraceIndex);
        }
    }, {
        key: 'getCode',
        value: function getCode() {
            return ConsoleOutputDisableExpressionTemplate_1.ConsoleOutputDisableExpressionTemplate().formatUnicorn({
                consoleLogDisableFunctionName: Utils_1.Utils.getRandomVariableName(),
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            });
        }
    }]);

    return ConsoleOutputDisableExpressionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.ConsoleOutputDisableExpressionNode = ConsoleOutputDisableExpressionNode;

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
var AppendState_1 = __webpack_require__(1);
var NoCustomNodesPreset_1 = __webpack_require__(13);
var BinaryExpressionSumFunctionTemplate_1 = __webpack_require__(75);
var AbstractCustomNode_1 = __webpack_require__(5);
var JavaScriptObfuscator_1 = __webpack_require__(10);
var Utils_1 = __webpack_require__(0);

var BinaryExpressionSumFunctionNode = function (_AbstractCustomNode_) {
    _inherits(BinaryExpressionSumFunctionNode, _AbstractCustomNode_);

    function BinaryExpressionSumFunctionNode() {
        _classCallCheck(this, BinaryExpressionSumFunctionNode);

        var _this = _possibleConstructorReturn(this, (BinaryExpressionSumFunctionNode.__proto__ || Object.getPrototypeOf(BinaryExpressionSumFunctionNode)).apply(this, arguments));

        _this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        return _this;
    }

    _createClass(BinaryExpressionSumFunctionNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {}
    }, {
        key: 'getCode',
        value: function getCode() {
            return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(BinaryExpressionSumFunctionTemplate_1.BinaryExpressionSumFunctionTemplate().formatUnicorn({
                functionName: Utils_1.Utils.getRandomVariableName()
            }), NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET).getObfuscatedCode();
        }
    }]);

    return BinaryExpressionSumFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.BinaryExpressionSumFunctionNode = BinaryExpressionSumFunctionNode;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(1);
var ControlFlowStorageTemplate_1 = __webpack_require__(76);
var AbstractCustomNode_1 = __webpack_require__(5);
var NodeAppender_1 = __webpack_require__(3);

var ControlFlowStorageNode = function (_AbstractCustomNode_) {
    _inherits(ControlFlowStorageNode, _AbstractCustomNode_);

    function ControlFlowStorageNode(controlFlowStorage, controlFlowStorageName, options) {
        _classCallCheck(this, ControlFlowStorageNode);

        var _this = _possibleConstructorReturn(this, (ControlFlowStorageNode.__proto__ || Object.getPrototypeOf(ControlFlowStorageNode)).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.controlFlowStorage = controlFlowStorage;
        _this.controlFlowStorageName = controlFlowStorageName;
        return _this;
    }

    _createClass(ControlFlowStorageNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            NodeAppender_1.NodeAppender.prependNode(blockScopeNode, this.getNode());
        }
    }, {
        key: 'getCode',
        value: function getCode() {
            return ControlFlowStorageTemplate_1.ControlFlowStorageTemplate().formatUnicorn({
                controlFlowStorage: this.controlFlowStorage.toString(),
                controlFlowStorageName: this.controlFlowStorageName
            });
        }
    }, {
        key: 'getNodeIdentifier',
        value: function getNodeIdentifier() {
            return this.controlFlowStorageName;
        }
    }, {
        key: 'getNodeData',
        value: function getNodeData() {
            return this.controlFlowStorage;
        }
    }, {
        key: 'updateNodeData',
        value: function updateNodeData(key, value) {
            this.controlFlowStorage.addToStorage(key, value);
        }
    }]);

    return ControlFlowStorageNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.ControlFlowStorageNode = ControlFlowStorageNode;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(1);
var DebufProtectionFunctionCallTemplate_1 = __webpack_require__(77);
var AbstractCustomNode_1 = __webpack_require__(5);
var NodeAppender_1 = __webpack_require__(3);

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
            NodeAppender_1.NodeAppender.appendNode(blockScopeNode, this.getNode());
        }
    }, {
        key: 'getCode',
        value: function getCode() {
            return DebufProtectionFunctionCallTemplate_1.DebugProtectionFunctionCallTemplate().formatUnicorn({
                debugProtectionFunctionName: this.debugProtectionFunctionName
            });
        }
    }]);

    return DebugProtectionFunctionCallNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.DebugProtectionFunctionCallNode = DebugProtectionFunctionCallNode;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(1);
var DebugProtectionFunctionIntervalTemplate_1 = __webpack_require__(78);
var AbstractCustomNode_1 = __webpack_require__(5);
var NodeAppender_1 = __webpack_require__(3);

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
            NodeAppender_1.NodeAppender.appendNode(blockScopeNode, this.getNode());
        }
    }, {
        key: 'getCode',
        value: function getCode() {
            return DebugProtectionFunctionIntervalTemplate_1.DebugProtectionFunctionIntervalTemplate().formatUnicorn({
                debugProtectionFunctionName: this.debugProtectionFunctionName
            });
        }
    }]);

    return DebugProtectionFunctionIntervalNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.DebugProtectionFunctionIntervalNode = DebugProtectionFunctionIntervalNode;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(1);
var DebugProtectionFunctionTemplate_1 = __webpack_require__(79);
var AbstractCustomNode_1 = __webpack_require__(5);
var NodeAppender_1 = __webpack_require__(3);
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
            NodeAppender_1.NodeAppender.insertNodeAtIndex(blockScopeNode, this.getNode(), randomIndex);
        }
    }, {
        key: 'getCode',
        value: function getCode() {
            return DebugProtectionFunctionTemplate_1.DebugProtectionFunctionTemplate().formatUnicorn({
                debugProtectionFunctionName: this.debugProtectionFunctionName
            });
        }
    }, {
        key: 'getNodeIdentifier',
        value: function getNodeIdentifier() {
            return this.debugProtectionFunctionName;
        }
    }]);

    return DebugProtectionFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.DebugProtectionFunctionNode = DebugProtectionFunctionNode;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(1);
var DomainLockNodeTemplate_1 = __webpack_require__(80);
var AbstractCustomNode_1 = __webpack_require__(5);
var NodeAppender_1 = __webpack_require__(3);
var Utils_1 = __webpack_require__(0);

var DomainLockNode = function (_AbstractCustomNode_) {
    _inherits(DomainLockNode, _AbstractCustomNode_);

    function DomainLockNode(stackTraceData, callsControllerFunctionName, randomStackTraceIndex, options) {
        _classCallCheck(this, DomainLockNode);

        var _this = _possibleConstructorReturn(this, (DomainLockNode.__proto__ || Object.getPrototypeOf(DomainLockNode)).call(this, options));

        _this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        _this.stackTraceData = stackTraceData;
        _this.callsControllerFunctionName = callsControllerFunctionName;
        _this.randomStackTraceIndex = randomStackTraceIndex;
        return _this;
    }

    _createClass(DomainLockNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            NodeAppender_1.NodeAppender.appendNodeToOptimalBlockScope(this.stackTraceData, blockScopeNode, this.getNode(), this.randomStackTraceIndex);
        }
    }, {
        key: 'getCode',
        value: function getCode() {
            var domainsString = this.options.domainLock.join(';'),
                _Utils_1$Utils$hideSt = Utils_1.Utils.hideString(domainsString, domainsString.length * 3),
                _Utils_1$Utils$hideSt2 = _slicedToArray(_Utils_1$Utils$hideSt, 2),
                hiddenDomainsString = _Utils_1$Utils$hideSt2[0],
                diff = _Utils_1$Utils$hideSt2[1];
            return DomainLockNodeTemplate_1.DomainLockNodeTemplate().formatUnicorn({
                domainLockFunctionName: Utils_1.Utils.getRandomVariableName(),
                diff: diff,
                domains: hiddenDomainsString,
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            });
        }
    }]);

    return DomainLockNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.DomainLockNode = DomainLockNode;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppendState_1 = __webpack_require__(1);
var NoCustomNodesPreset_1 = __webpack_require__(13);
var SelfDefendingTemplate_1 = __webpack_require__(81);
var AbstractCustomNode_1 = __webpack_require__(5);
var NodeAppender_1 = __webpack_require__(3);
var JavaScriptObfuscator_1 = __webpack_require__(10);
var Utils_1 = __webpack_require__(0);

var SelfDefendingUnicodeNode = function (_AbstractCustomNode_) {
    _inherits(SelfDefendingUnicodeNode, _AbstractCustomNode_);

    function SelfDefendingUnicodeNode(stackTraceData, callsControllerFunctionName, randomStackTraceIndex, options) {
        _classCallCheck(this, SelfDefendingUnicodeNode);

        var _this = _possibleConstructorReturn(this, (SelfDefendingUnicodeNode.__proto__ || Object.getPrototypeOf(SelfDefendingUnicodeNode)).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.stackTraceData = stackTraceData;
        _this.callsControllerFunctionName = callsControllerFunctionName;
        _this.randomStackTraceIndex = randomStackTraceIndex;
        return _this;
    }

    _createClass(SelfDefendingUnicodeNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            NodeAppender_1.NodeAppender.appendNodeToOptimalBlockScope(this.stackTraceData, blockScopeNode, this.getNode(), this.randomStackTraceIndex);
        }
    }, {
        key: 'getCode',
        value: function getCode() {
            return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(SelfDefendingTemplate_1.SelfDefendingTemplate().formatUnicorn({
                selfDefendingFunctionName: Utils_1.Utils.getRandomVariableName(),
                singleNodeCallControllerFunctionName: this.callsControllerFunctionName
            }), NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET).getObfuscatedCode();
        }
    }]);

    return SelfDefendingUnicodeNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.SelfDefendingUnicodeNode = SelfDefendingUnicodeNode;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = (function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } });

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(1);
var StringArrayEncoding_1 = __webpack_require__(18);
var NoCustomNodesPreset_1 = __webpack_require__(13);
var AtobTemplate_1 = __webpack_require__(71);
var Rc4Template_1 = __webpack_require__(72);
var SelfDefendingTemplate_1 = __webpack_require__(82);
var StringArrayBase64DecodeNodeTemplate_1 = __webpack_require__(83);
var StringArrayCallsWrapperTemplate_1 = __webpack_require__(84);
var StringArrayRC4DecodeNodeTemplate_1 = __webpack_require__(85);
var AbstractCustomNode_1 = __webpack_require__(5);
var JavaScriptObfuscator_1 = __webpack_require__(10);
var NodeAppender_1 = __webpack_require__(3);

var StringArrayCallsWrapper = function (_AbstractCustomNode_) {
    _inherits(StringArrayCallsWrapper, _AbstractCustomNode_);

    function StringArrayCallsWrapper(stringArrayCallsWrapperName, stringArrayName, stringArray, options) {
        _classCallCheck(this, StringArrayCallsWrapper);

        var _this = _possibleConstructorReturn(this, (StringArrayCallsWrapper.__proto__ || Object.getPrototypeOf(StringArrayCallsWrapper)).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.stringArrayCallsWrapperName = stringArrayCallsWrapperName;
        _this.stringArrayName = stringArrayName;
        _this.stringArray = stringArray;
        return _this;
    }

    _createClass(StringArrayCallsWrapper, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            if (!this.stringArray.getLength()) {
                return;
            }
            NodeAppender_1.NodeAppender.insertNodeAtIndex(blockScopeNode, this.getNode(), 1);
        }
    }, {
        key: 'getCode',
        value: function getCode() {
            var decodeNodeTemplate = this.getDecodeStringArrayTemplate();
            return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(StringArrayCallsWrapperTemplate_1.StringArrayCallsWrapperTemplate().formatUnicorn({
                decodeNodeTemplate: decodeNodeTemplate,
                stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
                stringArrayName: this.stringArrayName
            }), NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET).getObfuscatedCode();
        }
    }, {
        key: 'getNodeIdentifier',
        value: function getNodeIdentifier() {
            return this.stringArrayCallsWrapperName;
        }
    }, {
        key: 'getNode',
        value: function getNode() {
            return _get(StringArrayCallsWrapper.prototype.__proto__ || Object.getPrototypeOf(StringArrayCallsWrapper.prototype), 'getNode', this).call(this);
        }
    }, {
        key: 'getDecodeStringArrayTemplate',
        value: function getDecodeStringArrayTemplate() {
            var decodeStringArrayTemplate = '',
                selfDefendingCode = '';
            if (this.options.selfDefending) {
                selfDefendingCode = SelfDefendingTemplate_1.SelfDefendingTemplate().formatUnicorn({
                    stringArrayCallsWrapperName: this.stringArrayCallsWrapperName,
                    stringArrayName: this.stringArrayName
                });
            }
            switch (this.options.stringArrayEncoding) {
                case StringArrayEncoding_1.StringArrayEncoding.base64:
                    decodeStringArrayTemplate = StringArrayBase64DecodeNodeTemplate_1.StringArrayBase64DecodeNodeTemplate().formatUnicorn({
                        atobPolyfill: AtobTemplate_1.AtobTemplate(),
                        selfDefendingCode: selfDefendingCode,
                        stringArrayCallsWrapperName: this.stringArrayCallsWrapperName
                    });
                    break;
                case StringArrayEncoding_1.StringArrayEncoding.rc4:
                    decodeStringArrayTemplate = StringArrayRC4DecodeNodeTemplate_1.StringArrayRc4DecodeNodeTemplate().formatUnicorn({
                        atobPolyfill: AtobTemplate_1.AtobTemplate(),
                        rc4Polyfill: Rc4Template_1.Rc4Template(),
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

exports.StringArrayCallsWrapper = StringArrayCallsWrapper;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = (function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } });

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(1);
var StringArrayTemplate_1 = __webpack_require__(86);
var AbstractCustomNode_1 = __webpack_require__(5);
var NodeAppender_1 = __webpack_require__(3);

var StringArrayNode = function (_AbstractCustomNode_) {
    _inherits(StringArrayNode, _AbstractCustomNode_);

    function StringArrayNode(stringArray, stringArrayName) {
        var stringArrayRotateValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var options = arguments[3];

        _classCallCheck(this, StringArrayNode);

        var _this = _possibleConstructorReturn(this, (StringArrayNode.__proto__ || Object.getPrototypeOf(StringArrayNode)).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.stringArray = stringArray;
        _this.stringArrayName = stringArrayName;
        _this.stringArrayRotateValue = stringArrayRotateValue;
        return _this;
    }

    _createClass(StringArrayNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            if (!this.stringArray.getLength()) {
                return;
            }
            NodeAppender_1.NodeAppender.prependNode(blockScopeNode, this.getNode());
        }
    }, {
        key: 'getCode',
        value: function getCode() {
            return StringArrayTemplate_1.StringArrayTemplate().formatUnicorn({
                stringArrayName: this.stringArrayName,
                stringArray: this.stringArray.toString()
            });
        }
    }, {
        key: 'getNodeIdentifier',
        value: function getNodeIdentifier() {
            return this.stringArrayName;
        }
    }, {
        key: 'getNodeData',
        value: function getNodeData() {
            return this.stringArray;
        }
    }, {
        key: 'getNode',
        value: function getNode() {
            this.stringArray.rotateArray(this.stringArrayRotateValue);
            return _get(StringArrayNode.prototype.__proto__ || Object.getPrototypeOf(StringArrayNode.prototype), 'getNode', this).call(this);
        }
    }, {
        key: 'updateNodeData',
        value: function updateNodeData(data) {
            this.stringArray.addToArray(data);
        }
    }]);

    return StringArrayNode;
}(AbstractCustomNode_1.AbstractCustomNode);

StringArrayNode.ARRAY_RANDOM_LENGTH = 4;
exports.StringArrayNode = StringArrayNode;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(1);
var NoCustomNodesPreset_1 = __webpack_require__(13);
var SelfDefendingTemplate_1 = __webpack_require__(87);
var StringArrayRotateFunctionTemplate_1 = __webpack_require__(88);
var AbstractCustomNode_1 = __webpack_require__(5);
var JavaScriptObfuscator_1 = __webpack_require__(10);
var NodeAppender_1 = __webpack_require__(3);
var Utils_1 = __webpack_require__(0);

var StringArrayRotateFunctionNode = function (_AbstractCustomNode_) {
    _inherits(StringArrayRotateFunctionNode, _AbstractCustomNode_);

    function StringArrayRotateFunctionNode(stringArrayName, stringArray, stringArrayRotateValue, options) {
        _classCallCheck(this, StringArrayRotateFunctionNode);

        var _this = _possibleConstructorReturn(this, (StringArrayRotateFunctionNode.__proto__ || Object.getPrototypeOf(StringArrayRotateFunctionNode)).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.stringArrayName = stringArrayName;
        _this.stringArray = stringArray;
        _this.stringArrayRotateValue = stringArrayRotateValue;
        return _this;
    }

    _createClass(StringArrayRotateFunctionNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            if (!this.stringArray.getLength()) {
                return;
            }
            NodeAppender_1.NodeAppender.insertNodeAtIndex(blockScopeNode, this.getNode(), 1);
        }
    }, {
        key: 'getCode',
        value: function getCode() {
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
            return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(StringArrayRotateFunctionTemplate_1.StringArrayRotateFunctionTemplate().formatUnicorn({
                code: code,
                timesName: timesName,
                stringArrayName: this.stringArrayName,
                stringArrayRotateValue: Utils_1.Utils.decToHex(this.stringArrayRotateValue),
                whileFunctionName: whileFunctionName
            }), NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET).getObfuscatedCode();
        }
    }]);

    return StringArrayRotateFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.StringArrayRotateFunctionNode = StringArrayRotateFunctionNode;

/***/ },
/* 45 */
/***/ function(module, exports) {

"use strict";
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractNodeControlFlowChanger = function AbstractNodeControlFlowChanger(nodes, options) {
    _classCallCheck(this, AbstractNodeControlFlowChanger);

    this.nodes = nodes;
    this.options = options;
};

exports.AbstractNodeControlFlowChanger = AbstractNodeControlFlowChanger;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(4);
var NodeType_1 = __webpack_require__(6);
var AbstractNodeControlFlowChanger_1 = __webpack_require__(45);
var BinaryExpressionControlFlowReplacer_1 = __webpack_require__(48);
var ControlFlowStorage_1 = __webpack_require__(27);
var ControlFlowStorageNode_1 = __webpack_require__(36);
var Node_1 = __webpack_require__(2);
var NodeAppender_1 = __webpack_require__(3);
var Utils_1 = __webpack_require__(0);

var FunctionControlFlowChanger = function (_AbstractNodeControlF) {
    _inherits(FunctionControlFlowChanger, _AbstractNodeControlF);

    function FunctionControlFlowChanger(nodes, options) {
        _classCallCheck(this, FunctionControlFlowChanger);

        return _possibleConstructorReturn(this, (FunctionControlFlowChanger.__proto__ || Object.getPrototypeOf(FunctionControlFlowChanger)).call(this, nodes, options));
    }

    _createClass(FunctionControlFlowChanger, [{
        key: 'changeControlFlow',
        value: function changeControlFlow(functionNode) {
            this.changeFunctionBodyControlFlow(functionNode);
        }
    }, {
        key: 'changeFunctionBodyControlFlow',
        value: function changeFunctionBodyControlFlow(functionNode) {
            var _this2 = this;

            var controlFlowStorage = new ControlFlowStorage_1.ControlFlowStorage();
            var controlFlowStorageCustomNodeName = Utils_1.Utils.getRandomVariableName(6);
            if (!Node_1.Node.isFunctionDeclarationNode(functionNode) && !Node_1.Node.isFunctionExpressionNode(functionNode)) {
                return;
            }
            estraverse.replace(functionNode.body, {
                enter: function enter(node, parentNode) {
                    var controlFlowReplacerConstructor = FunctionControlFlowChanger.controlFlowReplacers.get(node.type);
                    if (!controlFlowReplacerConstructor) {
                        return;
                    }
                    var controlFlowStorageCallCustomNode = new controlFlowReplacerConstructor(_this2.nodes, _this2.options).replace(node, parentNode, controlFlowStorage, controlFlowStorageCustomNodeName);
                    if (!controlFlowStorageCallCustomNode) {
                        return;
                    }
                    return controlFlowStorageCallCustomNode.getNode()[0].expression;
                }
            });
            var controlFlowStorageCustomNode = new ControlFlowStorageNode_1.ControlFlowStorageNode(controlFlowStorage, controlFlowStorageCustomNodeName, this.options);
            NodeAppender_1.NodeAppender.prependNode(functionNode.body, controlFlowStorageCustomNode.getNode());
        }
    }]);

    return FunctionControlFlowChanger;
}(AbstractNodeControlFlowChanger_1.AbstractNodeControlFlowChanger);

FunctionControlFlowChanger.controlFlowReplacers = new Map([[NodeType_1.NodeType.BinaryExpression, BinaryExpressionControlFlowReplacer_1.BinaryExpressionControlFlowReplacer]]);
exports.FunctionControlFlowChanger = FunctionControlFlowChanger;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils_1 = __webpack_require__(0);

var AbstractControlFlowReplacer = function () {
    function AbstractControlFlowReplacer(nodes, options) {
        _classCallCheck(this, AbstractControlFlowReplacer);

        this.nodes = nodes;
        this.options = options;
    }

    _createClass(AbstractControlFlowReplacer, null, [{
        key: 'getStorageKey',
        value: function getStorageKey() {
            return Utils_1.Utils.getRandomGenerator().string({
                length: 3,
                pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
            });
        }
    }]);

    return AbstractControlFlowReplacer;
}();

exports.AbstractControlFlowReplacer = AbstractControlFlowReplacer;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var escodegen = __webpack_require__(14);
var AbstractControlFlowReplacer_1 = __webpack_require__(47);
var BinaryExpressionSumFunctionNode_1 = __webpack_require__(35);
var BinaryExpressionSubtractFunctionNode_1 = __webpack_require__(103);
var BinaryExpressionMultiplyFunctionNode_1 = __webpack_require__(102);
var BinaryExpressionDivideFunctionNode_1 = __webpack_require__(100);
var BinaryExpressionExponentiationFunctionNode_1 = __webpack_require__(101);
var ControlFlowStorageCallNode_1 = __webpack_require__(98);

var BinaryExpressionControlFlowReplacer = function (_AbstractControlFlowR) {
    _inherits(BinaryExpressionControlFlowReplacer, _AbstractControlFlowR);

    function BinaryExpressionControlFlowReplacer() {
        _classCallCheck(this, BinaryExpressionControlFlowReplacer);

        return _possibleConstructorReturn(this, (BinaryExpressionControlFlowReplacer.__proto__ || Object.getPrototypeOf(BinaryExpressionControlFlowReplacer)).apply(this, arguments));
    }

    _createClass(BinaryExpressionControlFlowReplacer, [{
        key: 'replace',
        value: function replace(binaryExpressionNode, parentNode, controlFlowStorage, controlFlowStorageCustomNodeName) {
            var binaryExpressionFunctionNode = void 0;
            switch (binaryExpressionNode.operator) {
                case '+':
                    binaryExpressionFunctionNode = new BinaryExpressionSumFunctionNode_1.BinaryExpressionSumFunctionNode(this.options);
                    break;
                case '-':
                    binaryExpressionFunctionNode = new BinaryExpressionSubtractFunctionNode_1.BinaryExpressionSubtractFunctionNode(this.options);
                    break;
                case '*':
                    binaryExpressionFunctionNode = new BinaryExpressionMultiplyFunctionNode_1.BinaryExpressionMultiplyFunctionNode(this.options);
                    break;
                case '/':
                    binaryExpressionFunctionNode = new BinaryExpressionDivideFunctionNode_1.BinaryExpressionDivideFunctionNode(this.options);
                    break;
                case '**':
                    binaryExpressionFunctionNode = new BinaryExpressionExponentiationFunctionNode_1.BinaryExpressionExponentiationFunctionNode(this.options);
                    break;
                default:
                    return;
            }
            var key = AbstractControlFlowReplacer_1.AbstractControlFlowReplacer.getStorageKey();
            controlFlowStorage.addToStorage(key, binaryExpressionFunctionNode);
            return new ControlFlowStorageCallNode_1.ControlFlowStorageCallNode(controlFlowStorageCustomNodeName, key, BinaryExpressionControlFlowReplacer.getExpressionValue(binaryExpressionNode.left), BinaryExpressionControlFlowReplacer.getExpressionValue(binaryExpressionNode.right), this.options);
        }
    }], [{
        key: 'getExpressionValue',
        value: function getExpressionValue(expressionNode) {
            return escodegen.generate(expressionNode, {
                sourceMapWithCode: true
            }).code;
        }
    }]);

    return BinaryExpressionControlFlowReplacer;
}(AbstractControlFlowReplacer_1.AbstractControlFlowReplacer);

exports.BinaryExpressionControlFlowReplacer = BinaryExpressionControlFlowReplacer;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConsoleOutputDisableExpressionNode_1 = __webpack_require__(34);
var NodeCallsControllerFunctionNode_1 = __webpack_require__(17);
var AbstractNodesGroup_1 = __webpack_require__(11);
var NodeAppender_1 = __webpack_require__(3);
var Utils_1 = __webpack_require__(0);

var ConsoleOutputNodesGroup = function (_AbstractNodesGroup_) {
    _inherits(ConsoleOutputNodesGroup, _AbstractNodesGroup_);

    function ConsoleOutputNodesGroup() {
        _classCallCheck(this, ConsoleOutputNodesGroup);

        return _possibleConstructorReturn(this, (ConsoleOutputNodesGroup.__proto__ || Object.getPrototypeOf(ConsoleOutputNodesGroup)).apply(this, arguments));
    }

    _createClass(ConsoleOutputNodesGroup, [{
        key: 'getNodes',
        value: function getNodes() {
            if (!this.options.disableConsoleOutput) {
                return;
            }
            var callsControllerFunctionName = Utils_1.Utils.getRandomVariableName();
            var randomStackTraceIndex = NodeAppender_1.NodeAppender.getRandomStackTraceIndex(this.stackTraceData.length);
            return this.syncCustomNodesWithNodesGroup(new Map([['consoleOutputDisableExpressionNode', new ConsoleOutputDisableExpressionNode_1.ConsoleOutputDisableExpressionNode(this.stackTraceData, callsControllerFunctionName, randomStackTraceIndex, this.options)], ['ConsoleOutputNodeCallsControllerFunctionNode', new NodeCallsControllerFunctionNode_1.NodeCallsControllerFunctionNode(this.stackTraceData, callsControllerFunctionName, randomStackTraceIndex, this.options)]]));
        }
    }]);

    return ConsoleOutputNodesGroup;
}(AbstractNodesGroup_1.AbstractNodesGroup);

exports.ConsoleOutputNodesGroup = ConsoleOutputNodesGroup;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DebugProtectionFunctionCallNode_1 = __webpack_require__(37);
var DebugProtectionFunctionIntervalNode_1 = __webpack_require__(38);
var DebugProtectionFunctionNode_1 = __webpack_require__(39);
var AbstractNodesGroup_1 = __webpack_require__(11);
var Utils_1 = __webpack_require__(0);

var DebugProtectionNodesGroup = function (_AbstractNodesGroup_) {
    _inherits(DebugProtectionNodesGroup, _AbstractNodesGroup_);

    function DebugProtectionNodesGroup() {
        _classCallCheck(this, DebugProtectionNodesGroup);

        return _possibleConstructorReturn(this, (DebugProtectionNodesGroup.__proto__ || Object.getPrototypeOf(DebugProtectionNodesGroup)).apply(this, arguments));
    }

    _createClass(DebugProtectionNodesGroup, [{
        key: 'getNodes',
        value: function getNodes() {
            if (!this.options.debugProtection) {
                return;
            }
            var debugProtectionFunctionName = Utils_1.Utils.getRandomVariableName();
            var customNodes = new Map([['debugProtectionFunctionNode', new DebugProtectionFunctionNode_1.DebugProtectionFunctionNode(debugProtectionFunctionName, this.options)], ['debugProtectionFunctionCallNode', new DebugProtectionFunctionCallNode_1.DebugProtectionFunctionCallNode(debugProtectionFunctionName, this.options)]]);
            if (this.options.debugProtectionInterval) {
                customNodes.set('debugProtectionFunctionIntervalNode', new DebugProtectionFunctionIntervalNode_1.DebugProtectionFunctionIntervalNode(debugProtectionFunctionName, this.options));
            }
            return this.syncCustomNodesWithNodesGroup(customNodes);
        }
    }]);

    return DebugProtectionNodesGroup;
}(AbstractNodesGroup_1.AbstractNodesGroup);

exports.DebugProtectionNodesGroup = DebugProtectionNodesGroup;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DomainLockNode_1 = __webpack_require__(40);
var NodeCallsControllerFunctionNode_1 = __webpack_require__(17);
var AbstractNodesGroup_1 = __webpack_require__(11);
var NodeAppender_1 = __webpack_require__(3);
var Utils_1 = __webpack_require__(0);

var DomainLockNodesGroup = function (_AbstractNodesGroup_) {
    _inherits(DomainLockNodesGroup, _AbstractNodesGroup_);

    function DomainLockNodesGroup() {
        _classCallCheck(this, DomainLockNodesGroup);

        return _possibleConstructorReturn(this, (DomainLockNodesGroup.__proto__ || Object.getPrototypeOf(DomainLockNodesGroup)).apply(this, arguments));
    }

    _createClass(DomainLockNodesGroup, [{
        key: 'getNodes',
        value: function getNodes() {
            if (!this.options.domainLock.length) {
                return;
            }
            var callsControllerFunctionName = Utils_1.Utils.getRandomVariableName();
            var randomStackTraceIndex = NodeAppender_1.NodeAppender.getRandomStackTraceIndex(this.stackTraceData.length);
            return this.syncCustomNodesWithNodesGroup(new Map([['DomainLockNode', new DomainLockNode_1.DomainLockNode(this.stackTraceData, callsControllerFunctionName, randomStackTraceIndex, this.options)], ['DomainLockNodeCallsControllerFunctionNode', new NodeCallsControllerFunctionNode_1.NodeCallsControllerFunctionNode(this.stackTraceData, callsControllerFunctionName, randomStackTraceIndex, this.options)]]));
        }
    }]);

    return DomainLockNodesGroup;
}(AbstractNodesGroup_1.AbstractNodesGroup);

exports.DomainLockNodesGroup = DomainLockNodesGroup;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppendState_1 = __webpack_require__(1);
var NodeCallsControllerFunctionNode_1 = __webpack_require__(17);
var SelfDefendingUnicodeNode_1 = __webpack_require__(41);
var AbstractNodesGroup_1 = __webpack_require__(11);
var NodeAppender_1 = __webpack_require__(3);
var Utils_1 = __webpack_require__(0);

var SelfDefendingNodesGroup = function (_AbstractNodesGroup_) {
    _inherits(SelfDefendingNodesGroup, _AbstractNodesGroup_);

    function SelfDefendingNodesGroup() {
        _classCallCheck(this, SelfDefendingNodesGroup);

        var _this = _possibleConstructorReturn(this, (SelfDefendingNodesGroup.__proto__ || Object.getPrototypeOf(SelfDefendingNodesGroup)).apply(this, arguments));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        return _this;
    }

    _createClass(SelfDefendingNodesGroup, [{
        key: 'getNodes',
        value: function getNodes() {
            if (!this.options.selfDefending) {
                return;
            }
            var callsControllerFunctionName = Utils_1.Utils.getRandomVariableName();
            var randomStackTraceIndex = NodeAppender_1.NodeAppender.getRandomStackTraceIndex(this.stackTraceData.length);
            return this.syncCustomNodesWithNodesGroup(new Map([['selfDefendingUnicodeNode', new SelfDefendingUnicodeNode_1.SelfDefendingUnicodeNode(this.stackTraceData, callsControllerFunctionName, randomStackTraceIndex, this.options)], ['SelfDefendingNodeCallsControllerFunctionNode', new NodeCallsControllerFunctionNode_1.NodeCallsControllerFunctionNode(this.stackTraceData, callsControllerFunctionName, randomStackTraceIndex, this.options)]]));
        }
    }]);

    return SelfDefendingNodesGroup;
}(AbstractNodesGroup_1.AbstractNodesGroup);

exports.SelfDefendingNodesGroup = SelfDefendingNodesGroup;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppendState_1 = __webpack_require__(1);
var StringArrayCallsWrapper_1 = __webpack_require__(42);
var StringArrayNode_1 = __webpack_require__(43);
var StringArrayRotateFunctionNode_1 = __webpack_require__(44);
var AbstractNodesGroup_1 = __webpack_require__(11);
var StringArray_1 = __webpack_require__(31);
var Utils_1 = __webpack_require__(0);

var StringArrayNodesGroup = function (_AbstractNodesGroup_) {
    _inherits(StringArrayNodesGroup, _AbstractNodesGroup_);

    function StringArrayNodesGroup() {
        _classCallCheck(this, StringArrayNodesGroup);

        var _this = _possibleConstructorReturn(this, (StringArrayNodesGroup.__proto__ || Object.getPrototypeOf(StringArrayNodesGroup)).apply(this, arguments));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.stringArrayName = Utils_1.Utils.getRandomVariableName(StringArrayNode_1.StringArrayNode.ARRAY_RANDOM_LENGTH);
        _this.stringArrayCallsWrapper = Utils_1.Utils.getRandomVariableName(StringArrayNode_1.StringArrayNode.ARRAY_RANDOM_LENGTH);
        return _this;
    }

    _createClass(StringArrayNodesGroup, [{
        key: 'getNodes',
        value: function getNodes() {
            if (!this.options.stringArray) {
                return;
            }
            if (this.options.rotateStringArray) {
                this.stringArrayRotateValue = Utils_1.Utils.getRandomGenerator().integer({
                    min: 100,
                    max: 500
                });
            } else {
                this.stringArrayRotateValue = 0;
            }
            var stringArray = new StringArray_1.StringArray();
            var stringArrayNode = new StringArrayNode_1.StringArrayNode(stringArray, this.stringArrayName, this.stringArrayRotateValue, this.options);
            var customNodes = new Map([['stringArrayNode', stringArrayNode], ['stringArrayCallsWrapper', new StringArrayCallsWrapper_1.StringArrayCallsWrapper(this.stringArrayCallsWrapper, this.stringArrayName, stringArray, this.options)]]);
            if (this.options.rotateStringArray) {
                customNodes.set('stringArrayRotateFunctionNode', new StringArrayRotateFunctionNode_1.StringArrayRotateFunctionNode(this.stringArrayName, stringArray, this.stringArrayRotateValue, this.options));
            }
            return this.syncCustomNodesWithNodesGroup(customNodes);
        }
    }]);

    return StringArrayNodesGroup;
}(AbstractNodesGroup_1.AbstractNodesGroup);

exports.StringArrayNodesGroup = StringArrayNodesGroup;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(4);
var NodeType_1 = __webpack_require__(6);
var AbstractNodeObfuscator_1 = __webpack_require__(9);
var IdentifierReplacer_1 = __webpack_require__(12);
var Node_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(7);

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
                    if (Node_1.Node.isReplaceableIdentifierNode(node, parentNode)) {
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(4);
var NodeType_1 = __webpack_require__(6);
var AbstractNodeObfuscator_1 = __webpack_require__(9);
var IdentifierReplacer_1 = __webpack_require__(12);
var Node_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(7);

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
            var blockScopeOfFunctionDeclarationNode = NodeUtils_1.NodeUtils.getBlockScopeOfNode(functionDeclarationNode);
            if (blockScopeOfFunctionDeclarationNode.type === NodeType_1.NodeType.Program) {
                return;
            }
            this.storeFunctionName(functionDeclarationNode);
            this.replaceFunctionName(blockScopeOfFunctionDeclarationNode);
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
        value: function replaceFunctionName(scopeNode) {
            var _this3 = this;

            estraverse.replace(scopeNode, {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isReplaceableIdentifierNode(node, parentNode)) {
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(4);
var NodeType_1 = __webpack_require__(6);
var AbstractNodeObfuscator_1 = __webpack_require__(9);
var IdentifierReplacer_1 = __webpack_require__(12);
var Node_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(7);

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
                    if (Node_1.Node.isReplaceableIdentifierNode(node, parentNode)) {
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(4);
var NodeType_1 = __webpack_require__(6);
var AbstractNodeObfuscator_1 = __webpack_require__(9);
var IdentifierReplacer_1 = __webpack_require__(12);
var Node_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(7);

var LabeledStatementObfuscator = function (_AbstractNodeObfuscat) {
    _inherits(LabeledStatementObfuscator, _AbstractNodeObfuscat);

    function LabeledStatementObfuscator(nodes, options) {
        _classCallCheck(this, LabeledStatementObfuscator);

        var _this = _possibleConstructorReturn(this, (LabeledStatementObfuscator.__proto__ || Object.getPrototypeOf(LabeledStatementObfuscator)).call(this, nodes, options));

        _this.identifierReplacer = new IdentifierReplacer_1.IdentifierReplacer(_this.nodes, _this.options);
        return _this;
    }

    _createClass(LabeledStatementObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(labeledStatementNode) {
            this.storeLabeledStatementName(labeledStatementNode);
            this.replaceLabeledStatementName(labeledStatementNode);
        }
    }, {
        key: 'storeLabeledStatementName',
        value: function storeLabeledStatementName(labeledStatementNode) {
            var _this2 = this;

            NodeUtils_1.NodeUtils.typedReplace(labeledStatementNode.label, NodeType_1.NodeType.Identifier, {
                enter: function enter(node) {
                    return _this2.identifierReplacer.storeNames(node.name);
                }
            });
        }
    }, {
        key: 'replaceLabeledStatementName',
        value: function replaceLabeledStatementName(labeledStatementNode) {
            var _this3 = this;

            estraverse.replace(labeledStatementNode, {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isLabelIdentifierNode(node, parentNode)) {
                        node.name = _this3.identifierReplacer.replace(node.name);
                    }
                }
            });
        }
    }]);

    return LabeledStatementObfuscator;
}(AbstractNodeObfuscator_1.AbstractNodeObfuscator);

exports.LabeledStatementObfuscator = LabeledStatementObfuscator;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var escodegen = __webpack_require__(14);
var AbstractNodeObfuscator_1 = __webpack_require__(9);
var BooleanLiteralReplacer_1 = __webpack_require__(63);
var Node_1 = __webpack_require__(2);
var NumberLiteralReplacer_1 = __webpack_require__(22);
var StringLiteralReplacer_1 = __webpack_require__(19);

var LiteralObfuscator = function (_AbstractNodeObfuscat) {
    _inherits(LiteralObfuscator, _AbstractNodeObfuscat);

    function LiteralObfuscator() {
        _classCallCheck(this, LiteralObfuscator);

        return _possibleConstructorReturn(this, (LiteralObfuscator.__proto__ || Object.getPrototypeOf(LiteralObfuscator)).apply(this, arguments));
    }

    _createClass(LiteralObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(literalNode, parentNode) {
            if (Node_1.Node.isPropertyNode(parentNode) && parentNode.key === literalNode) {
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var escodegen = __webpack_require__(14);
var estraverse = __webpack_require__(4);
var NodeType_1 = __webpack_require__(6);
var AbstractNodeObfuscator_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(2);
var StringLiteralReplacer_1 = __webpack_require__(19);

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
                    if (Node_1.Node.isLiteralNode(node)) {
                        _this2.obfuscateLiteralProperty(node);
                        return;
                    }
                    if (Node_1.Node.isIdentifierNode(node)) {
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
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(4);
var AbstractNodeObfuscator_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(2);
var Utils_1 = __webpack_require__(0);
var StringLiteralReplacer_1 = __webpack_require__(19);

var MethodDefinitionObfuscator = function (_AbstractNodeObfuscat) {
    _inherits(MethodDefinitionObfuscator, _AbstractNodeObfuscat);

    function MethodDefinitionObfuscator() {
        _classCallCheck(this, MethodDefinitionObfuscator);

        return _possibleConstructorReturn(this, (MethodDefinitionObfuscator.__proto__ || Object.getPrototypeOf(MethodDefinitionObfuscator)).apply(this, arguments));
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
                    if (Node_1.Node.isIdentifierNode(node) && !Utils_1.Utils.arrayContains(MethodDefinitionObfuscator.ignoredNames, node.name) && methodDefinitionNode.computed === false) {
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

MethodDefinitionObfuscator.ignoredNames = ['constructor'];
exports.MethodDefinitionObfuscator = MethodDefinitionObfuscator;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var escodegen = __webpack_require__(14);
var estraverse = __webpack_require__(4);
var NodeType_1 = __webpack_require__(6);
var AbstractNodeObfuscator_1 = __webpack_require__(9);
var Node_1 = __webpack_require__(2);
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
                        if (Node_1.Node.isLiteralNode(node)) {
                            _this2.obfuscateLiteralPropertyKey(node);
                            return;
                        }
                        if (Node_1.Node.isIdentifierNode(node)) {
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
                    content: '\'' + Utils_1.Utils.stringToUnicodeEscapeSequence(node.value) + '\'',
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
                    content: '\'' + Utils_1.Utils.stringToUnicodeEscapeSequence(nodeValue) + '\'',
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
/* 62 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = __webpack_require__(4);
var NodeType_1 = __webpack_require__(6);
var AbstractNodeObfuscator_1 = __webpack_require__(9);
var IdentifierReplacer_1 = __webpack_require__(12);
var Node_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(7);

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
            var blockScopeOfVariableDeclarationNode = NodeUtils_1.NodeUtils.getBlockScopeOfNode(variableDeclarationNode);
            if (blockScopeOfVariableDeclarationNode.type === NodeType_1.NodeType.Program) {
                return;
            }
            var scopeNode = variableDeclarationNode.kind === 'var' ? blockScopeOfVariableDeclarationNode : parentNode;
            this.storeVariableNames(variableDeclarationNode);
            this.replaceVariableNames(scopeNode);
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
        value: function replaceVariableNames(scopeNode) {
            var _this3 = this;

            estraverse.replace(scopeNode, {
                enter: function enter(node, parentNode) {
                    if (!node.obfuscated && Node_1.Node.isReplaceableIdentifierNode(node, parentNode)) {
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JSFuck_1 = __webpack_require__(21);
var AbstractReplacer_1 = __webpack_require__(16);

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
/* 64 */
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
var class_validator_1 = __webpack_require__(92);
var TSourceMapMode_1 = __webpack_require__(89);
var TStringArrayEncoding_1 = __webpack_require__(90);
var DefaultPreset_1 = __webpack_require__(23);
var OptionsNormalizer_1 = __webpack_require__(65);
var ValidationErrorsFormatter_1 = __webpack_require__(66);

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
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "controlFlow", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "debugProtection", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "debugProtectionInterval", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "disableConsoleOutput", void 0);
__decorate([class_validator_1.IsArray(), class_validator_1.ArrayUnique(), class_validator_1.IsString({
    each: true
}), __metadata('design:type', Array)], Options.prototype, "domainLock", void 0);
__decorate([class_validator_1.IsArray(), class_validator_1.ArrayUnique(), class_validator_1.IsString({
    each: true
}), __metadata('design:type', Array)], Options.prototype, "reservedNames", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "rotateStringArray", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "selfDefending", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "sourceMap", void 0);
__decorate([class_validator_1.IsString(), class_validator_1.ValidateIf(function (options) {
    return Boolean(options.sourceMapBaseUrl);
}), class_validator_1.IsUrl({
    require_protocol: true,
    require_valid_protocol: true
}), __metadata('design:type', String)], Options.prototype, "sourceMapBaseUrl", void 0);
__decorate([class_validator_1.IsString(), __metadata('design:type', String)], Options.prototype, "sourceMapFileName", void 0);
__decorate([class_validator_1.IsIn(['inline', 'separate']), __metadata('design:type', typeof (_a = typeof TSourceMapMode_1.TSourceMapMode !== 'undefined' && TSourceMapMode_1.TSourceMapMode) === 'function' && _a || Object)], Options.prototype, "sourceMapMode", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "stringArray", void 0);
__decorate([class_validator_1.IsIn([true, false, 'base64', 'rc4']), __metadata('design:type', typeof (_b = typeof TStringArrayEncoding_1.TStringArrayEncoding !== 'undefined' && TStringArrayEncoding_1.TStringArrayEncoding) === 'function' && _b || Object)], Options.prototype, "stringArrayEncoding", void 0);
__decorate([class_validator_1.IsNumber(), class_validator_1.Min(0), class_validator_1.Max(1), __metadata('design:type', Number)], Options.prototype, "stringArrayThreshold", void 0);
__decorate([class_validator_1.IsBoolean(), __metadata('design:type', Boolean)], Options.prototype, "unicodeEscapeSequence", void 0);
exports.Options = Options;
var _a, _b;

/***/ },
/* 65 */
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
        key: 'selfDefendingRule',
        value: function selfDefendingRule(options) {
            if (options.selfDefending) {
                Object.assign(options, OptionsNormalizer.SELF_DEFENDING_OPTIONS);
            }
            return options;
        }
    }, {
        key: 'sourceMapBaseUrlRule',
        value: function sourceMapBaseUrlRule(options) {
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
        key: 'sourceMapFileNameRule',
        value: function sourceMapFileNameRule(options) {
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
        key: 'stringArrayRule',
        value: function stringArrayRule(options) {
            if (!options.stringArray) {
                Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
            }
            return options;
        }
    }, {
        key: 'stringArrayEncodingRule',
        value: function stringArrayEncodingRule(options) {
            if (options.stringArrayEncoding === true) {
                Object.assign(options, OptionsNormalizer.UNICODE_ARRAY_ENCODING_OPTIONS);
            }
            return options;
        }
    }, {
        key: 'stringArrayThresholdRule',
        value: function stringArrayThresholdRule(options) {
            if (options.stringArrayThreshold === 0) {
                Object.assign(options, OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS);
            }
            return options;
        }
    }]);

    return OptionsNormalizer;
}();

OptionsNormalizer.DISABLED_UNICODE_ARRAY_OPTIONS = {
    rotateStringArray: false,
    stringArray: false,
    stringArrayEncoding: false,
    stringArrayThreshold: 0
};
OptionsNormalizer.SELF_DEFENDING_OPTIONS = {
    compact: true,
    selfDefending: true
};
OptionsNormalizer.UNICODE_ARRAY_ENCODING_OPTIONS = {
    stringArrayEncoding: 'base64'
};
OptionsNormalizer.normalizerRules = [OptionsNormalizer.domainLockRule, OptionsNormalizer.selfDefendingRule, OptionsNormalizer.sourceMapBaseUrlRule, OptionsNormalizer.sourceMapFileNameRule, OptionsNormalizer.stringArrayRule, OptionsNormalizer.stringArrayEncodingRule, OptionsNormalizer.stringArrayThresholdRule];
exports.OptionsNormalizer = OptionsNormalizer;

/***/ },
/* 66 */
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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = __webpack_require__(4);
var NodeType_1 = __webpack_require__(6);
var FunctionDeclarationCalleeDataExtractor_1 = __webpack_require__(68);
var FunctionExpressionCalleeDataExtractor_1 = __webpack_require__(69);
var ObjectExpressionCalleeDataExtractor_1 = __webpack_require__(70);
var Node_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(7);

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

            var limitIndex = StackTraceAnalyzer.getLimitIndex(blockScopeBody.length);
            var stackTraceData = [];

            var _loop = function _loop(index, blockScopeBodyLength) {
                var rootNode = blockScopeBody[index];
                if (index > limitIndex) {
                    return 'break';
                }
                estraverse.traverse(rootNode, {
                    enter: function enter(node) {
                        if (!Node_1.Node.isCallExpressionNode(node) || rootNode.parentNode !== NodeUtils_1.NodeUtils.getBlockScopeOfNode(node)) {
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

            for (var index = 0, blockScopeBodyLength = blockScopeBody.length; index < blockScopeBodyLength; index++) {
                var _ret = _loop(index, blockScopeBodyLength);

                if (_ret === 'break') break;
            }
            return stackTraceData;
        }
    }], [{
        key: 'getLimitIndex',
        value: function getLimitIndex(blockScopeBodyLength) {
            var lastIndex = blockScopeBodyLength - 1;
            var limitThresholdActivationIndex = StackTraceAnalyzer.limitThresholdActivationLength - 1;
            var limitIndex = lastIndex;
            if (lastIndex > limitThresholdActivationIndex) {
                limitIndex = Math.round(limitThresholdActivationIndex + lastIndex * StackTraceAnalyzer.limitThreshold);
                if (limitIndex > lastIndex) {
                    limitIndex = lastIndex;
                }
            }
            return limitIndex;
        }
    }]);

    return StackTraceAnalyzer;
}();

StackTraceAnalyzer.limitThresholdActivationLength = 25;
StackTraceAnalyzer.limitThreshold = 0.002;
exports.StackTraceAnalyzer = StackTraceAnalyzer;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = __webpack_require__(4);
var Node_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(7);

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
            if (Node_1.Node.isIdentifierNode(this.callee)) {
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
}();

exports.FunctionDeclarationCalleeDataExtractor = FunctionDeclarationCalleeDataExtractor;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = __webpack_require__(4);
var Node_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(7);

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
            if (Node_1.Node.isIdentifierNode(this.callee)) {
                calleeBlockStatement = this.getCalleeBlockStatement(NodeUtils_1.NodeUtils.getBlockScopeOfNode(this.blockScopeBody[0]), this.callee.name);
            }
            if (Node_1.Node.isFunctionExpressionNode(this.callee)) {
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
}();

exports.FunctionExpressionCalleeDataExtractor = FunctionExpressionCalleeDataExtractor;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = __webpack_require__(4);
var Node_1 = __webpack_require__(2);
var NodeUtils_1 = __webpack_require__(7);

var ObjectExpressionCalleeDataExtractor = function () {
    function ObjectExpressionCalleeDataExtractor(blockScopeBody, callee) {
        _classCallCheck(this, ObjectExpressionCalleeDataExtractor);

        this.blockScopeBody = blockScopeBody;
        this.callee = callee;
    }

    _createClass(ObjectExpressionCalleeDataExtractor, [{
        key: 'extract',
        value: function extract() {
            var calleeBlockStatement = null,
                functionExpressionName = null;
            if (Node_1.Node.isMemberExpressionNode(this.callee)) {
                var objectMembersCallsChain = this.createObjectMembersCallsChain([], this.callee);
                if (!objectMembersCallsChain.length) {
                    return null;
                }
                functionExpressionName = objectMembersCallsChain[objectMembersCallsChain.length - 1];
                calleeBlockStatement = this.getCalleeBlockStatement(NodeUtils_1.NodeUtils.getBlockScopeOfNode(this.blockScopeBody[0]), objectMembersCallsChain);
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
        key: 'getCalleeBlockStatement',
        value: function getCalleeBlockStatement(node, objectMembersCallsChain) {
            var _this = this;

            var objectName = objectMembersCallsChain.shift();
            if (!objectName) {
                return null;
            }
            var calleeBlockStatement = null;
            estraverse.traverse(node, {
                enter: function enter(node, parentNode) {
                    if (Node_1.Node.isVariableDeclaratorNode(node) && Node_1.Node.isIdentifierNode(node.id) && node.init && Node_1.Node.isObjectExpressionNode(node.init) && node.id.name === objectName) {
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
}();

exports.ObjectExpressionCalleeDataExtractor = ObjectExpressionCalleeDataExtractor;

/***/ },
/* 71 */
/***/ function(module, exports) {

"use strict";
"use strict";

function AtobTemplate() {
    return "\n        (function () {\n            var getGlobal = Function('return (function () ' + '{}.constructor(\"return this\")()' + ');');\n\n            var object = getGlobal();\n            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n\n            object.atob || (\n                object.atob = function(input) {\n                    var str = String(input).replace(/=+$/, '');\n                    for (\n                        var bc = 0, bs, buffer, idx = 0, output = '';\n                        buffer = str.charAt(idx++);\n                        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,\n                            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0\n                    ) {\n                        buffer = chars.indexOf(buffer);\n                    }\n                return output;\n            });\n        })();\n    ";
}
exports.AtobTemplate = AtobTemplate;

/***/ },
/* 72 */
/***/ function(module, exports) {

"use strict";
"use strict";

function Rc4Template() {
    return "\n        var rc4 = function (str, key) {\n            var s = [], j = 0, x, res = '', newStr = '';\n           \n            str = atob(str);\n                \n            for (var k = 0, length = str.length; k < length; k++) {\n                newStr += '%' + ('00' + str.charCodeAt(k).toString(16)).slice(-2);\n            }\n        \n            str = decodeURIComponent(newStr);\n                    \t        \n\t        for (var i = 0; i < 256; i++) {\n                s[i] = i;\n            }\n \n            for (i = 0; i < 256; i++) {\n                j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;\n                x = s[i];\n                s[i] = s[j];\n                s[j] = x;\n            }\n            \n            i = 0;\n            j = 0;\n            \n            for (var y = 0; y < str.length; y++) {\n                i = (i + 1) % 256;\n                j = (j + s[i]) % 256;\n                x = s[i];\n                s[i] = s[j];\n                s[j] = x;\n                res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);\n            }\n                      \n            return res;\n        }\n    ";
}
exports.Rc4Template = Rc4Template;

/***/ },
/* 73 */
/***/ function(module, exports) {

"use strict";
"use strict";

function SingleNodeCallControllerTemplate() {
    return "\n        var {singleNodeCallControllerFunctionName} = (function(){\n            var firstCall = true;\n            \n            return function (context, fn){\t\n                var rfn = firstCall ? function(){\n                    if(fn){\n                        var res = fn.apply(context, arguments);\n                        fn = null;\n                        return res;\n                    }\n                } : function(){}\n                \n                firstCall = false;\n                \n                return rfn;\n            }\n        })();\n    ";
}
exports.SingleNodeCallControllerTemplate = SingleNodeCallControllerTemplate;

/***/ },
/* 74 */
/***/ function(module, exports) {

"use strict";
"use strict";

function ConsoleOutputDisableExpressionTemplate() {
    return "\n        var {consoleLogDisableFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {\n            var getGlobal = Function('return (function() ' + '{}.constructor(\"return this\")( )' + ');');\n            \n            var func = function () {};\n            var that = getGlobal();\n                        \n            that.console.log = func; \n            that.console.error = func;\n            that.console.warn = func;\n            that.console.info = func;\n        });\n        \n        {consoleLogDisableFunctionName}();\n    ";
}
exports.ConsoleOutputDisableExpressionTemplate = ConsoleOutputDisableExpressionTemplate;

/***/ },
/* 75 */
/***/ function(module, exports) {

"use strict";
"use strict";

function BinaryExpressionSumFunctionTemplate() {
    return "\n        function {functionName} (x, y) {\n            return x + y;\n        }\n    ";
}
exports.BinaryExpressionSumFunctionTemplate = BinaryExpressionSumFunctionTemplate;

/***/ },
/* 76 */
/***/ function(module, exports) {

"use strict";
"use strict";

function ControlFlowStorageTemplate() {
    return "\n        var {controlFlowStorageName} = {controlFlowStorage};\n    ";
}
exports.ControlFlowStorageTemplate = ControlFlowStorageTemplate;

/***/ },
/* 77 */
/***/ function(module, exports) {

"use strict";
"use strict";

function DebugProtectionFunctionCallTemplate() {
    return "{debugProtectionFunctionName}();";
}
exports.DebugProtectionFunctionCallTemplate = DebugProtectionFunctionCallTemplate;

/***/ },
/* 78 */
/***/ function(module, exports) {

"use strict";
"use strict";

function DebugProtectionFunctionIntervalTemplate() {
    return "\n        setInterval(function () {\n            {debugProtectionFunctionName}();\n        }, 4000);\n    ";
}
exports.DebugProtectionFunctionIntervalTemplate = DebugProtectionFunctionIntervalTemplate;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var Utils_1 = __webpack_require__(0);
function DebugProtectionFunctionTemplate() {
    return '\n        var {debugProtectionFunctionName} = function () {\n            function debuggerProtection (counter) {\n                if ((\'\' + counter / counter)[\'length\'] !== 1 || counter % 20 === 0) {\n                    (function () {}.constructor(\'debugger\')());\n                } else {\n                    [].filter.constructor(' + Utils_1.Utils.stringToJSFuck('debugger') + ')();\n                }\n                \n                debuggerProtection(++counter);\n            }\n            \n            try {\n                debuggerProtection(0);\n            } catch (y) {}\n        };\n    ';
}
exports.DebugProtectionFunctionTemplate = DebugProtectionFunctionTemplate;

/***/ },
/* 80 */
/***/ function(module, exports) {

"use strict";
"use strict";

function DomainLockNodeTemplate() {
    return "\n        var {domainLockFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {\n            var getGlobal = Function('return (function () ' + '{}.constructor(\"return this\")()' + ');');\n\n            var func = function () { \n                return {\n                    key: 'item',\n                    value: 'attribute',\n                    getAttribute: function () {\n                        getGlobal()['eval']('while(true){}')();\n                    }()\n                };\n            };\n                        \n            var regExp = new RegExp(\"[{diff}]\", \"g\");\n            var domains = \"{domains}\".replace(regExp, \"\").split(\";\");\n            var eval = [][\"forEach\"][\"constructor\"];\n            var windowObject = eval(\"return this\")();\n            var document;\n            var domain;\n                        \n            for (var d in windowObject) {\n                if (d.length == 8 && d.charCodeAt(7) == 116 && d.charCodeAt(5) == 101 && d.charCodeAt(3) == 117 && d.charCodeAt(0) == 100) {\n                    document = d;\n                \n                    break;\n                }\n            }\n\n            for (var d1 in windowObject[document]) {\n                if (d1.length == 6 && d1.charCodeAt(5) == 110 && d1.charCodeAt(0) == 100) {\n                    domain = d1;\n                    \n                    break;\n                }\n            }\n            \n            if ((!document && !domain) || (!windowObject[document] && !windowObject[document][domain])) {\n                return;\n            }\n            \n            var currentDomain = windowObject[document][domain];\n\n            var ok = false;\n                        \n            for (var i = 0; i < domains.length; i++) {\n                var domain = domains[i];\n                var position = currentDomain.length - domain.length;\n                var lastIndex = currentDomain.indexOf(domain, position);\n                var endsWith = lastIndex !== -1 && lastIndex === position;\n                \n                if (endsWith) {\n                    if (currentDomain.length == domain.length || domain.indexOf(\".\") === 0) {\n                        ok = true;\n                    }\n                    \n                    break;\n                }\n            }\n               \n            if (!ok) {\n                data;\n            } else {\n                return;\n            }\n            \n            func();\n        });\n\n        {domainLockFunctionName}();\n    ";
}
exports.DomainLockNodeTemplate = DomainLockNodeTemplate;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var Utils_1 = __webpack_require__(0);
function SelfDefendingTemplate() {
    return "\n        var {selfDefendingFunctionName} = {singleNodeCallControllerFunctionName}(this, function () {\n            var func1 = function(){return 'dev';},\n                func2 = function () {\n                    return 'window';\n                };\n                \n            var test1 = function () {\n                var regExp = new RegExp('" + Utils_1.Utils.stringToUnicodeEscapeSequence("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}") + "');\n                \n                return !regExp.test(func1.toString());\n            };\n            \n            var test2 = function () {\n                var regExp = new RegExp('" + Utils_1.Utils.stringToUnicodeEscapeSequence("(\\\\[x|u](\\w){2,4})+") + "');\n                \n                return regExp.test(func2.toString());\n            };\n            \n            var recursiveFunc1 = function (string) {\n                var i = ~-1 >> 1 + 255 % 0;\n                                \n                if (string.indexOf('i' === i)) {\n                    recursiveFunc2(string)\n                }\n            };\n            \n            var recursiveFunc2 = function (string) {\n                var i = ~-4 >> 1 + 255 % 0;\n                \n                if (string.indexOf((true+\"\")[3]) !== i) {\n                    recursiveFunc1(string)\n                }\n            };\n            \n            if (!test1()) {\n                if (!test2()) {\n                    recursiveFunc1('ind\u0435xOf');\n                } else {\n                    recursiveFunc1('indexOf');\n                }\n            } else {\n                recursiveFunc1('ind\u0435xOf');\n            }\n        })\n        \n        {selfDefendingFunctionName}();\n    ";
}
exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var Utils_1 = __webpack_require__(0);
function SelfDefendingTemplate() {
    return "\n        var StatesClass = function (rc4Bytes) {\n            this.rc4Bytes = rc4Bytes;\n            this.states = [1, 0, 0];\n            this.newState = function(){return 'newState';};\n            this.firstState = '" + Utils_1.Utils.stringToUnicodeEscapeSequence("\\w+ *\\(\\) *{\\w+ *") + "';\n            this.secondState = '" + Utils_1.Utils.stringToUnicodeEscapeSequence("['|\"].+['|\"];? *}") + "';\n        };\n        \n        StatesClass.prototype.checkState = function () {\n            var regExp = new RegExp(this.firstState + this.secondState);\n\n            return this.runState(regExp.test(this.newState.toString()) ? --this.states[1] : --this.states[0]);\n        };\n        \n        StatesClass.prototype.runState = function (stateResult) {\n            if (!Boolean(~stateResult)) {\n                return stateResult;\n            }\n            \n            return this.getState(this.rc4Bytes);\n        };\n\n        StatesClass.prototype.getState = function (rc4Bytes) {\n            for (var i = 0, len = this.states.length; i < len; i++) {\n                this.states.push(Math.round(Math.random()));\n                len = this.states.length;\n            }\n            \n            return rc4Bytes(this.states[0]);\n        };\n\n        new StatesClass({stringArrayCallsWrapperName}).checkState();\n    ";
}
exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ },
/* 83 */
/***/ function(module, exports) {

"use strict";
"use strict";

function StringArrayBase64DecodeNodeTemplate() {
    return "      \n        if (!{stringArrayCallsWrapperName}.atobPolyfillAppended) {\n            {atobPolyfill}\n            \n            {stringArrayCallsWrapperName}.atobPolyfillAppended = true;\n        }\n        \n        if (!{stringArrayCallsWrapperName}.base64DecodeUnicode) {                \n            {stringArrayCallsWrapperName}.base64DecodeUnicode = function (str) {\n                var string = atob(str);\n                var newStringChars = [];\n                \n                for (var i = 0, length = string.length; i < length; i++) {\n                    newStringChars += '%' + ('00' + string.charCodeAt(i).toString(16)).slice(-2);\n                }\n                \n                return decodeURIComponent(newStringChars);\n            };\n        }\n        \n        if (!{stringArrayCallsWrapperName}.data) {\n            {stringArrayCallsWrapperName}.data = {};\n        }\n                        \n        if (!{stringArrayCallsWrapperName}.data[index]) {\n            {selfDefendingCode}\n            \n            value = {stringArrayCallsWrapperName}.base64DecodeUnicode(value);\n            {stringArrayCallsWrapperName}.data[index] = value;\n        } else {\n            value = {stringArrayCallsWrapperName}.data[index];\n        }  \n    ";
}
exports.StringArrayBase64DecodeNodeTemplate = StringArrayBase64DecodeNodeTemplate;

/***/ },
/* 84 */
/***/ function(module, exports) {

"use strict";
"use strict";

function StringArrayCallsWrapperTemplate() {
    return "\n        var {stringArrayCallsWrapperName} = function (index, key) {\n            var index = parseInt(index, 0x10);\n            var value = {stringArrayName}[index];\n            \n            {decodeNodeTemplate}\n        \n            return value;\n        };\n    ";
}
exports.StringArrayCallsWrapperTemplate = StringArrayCallsWrapperTemplate;

/***/ },
/* 85 */
/***/ function(module, exports) {

"use strict";
"use strict";

function StringArrayRc4DecodeNodeTemplate() {
    return "\n        if (!{stringArrayCallsWrapperName}.atobPolyfillAppended) {            \n            {atobPolyfill}\n            \n            {stringArrayCallsWrapperName}.atobPolyfillAppended = true;\n        }\n        \n        if (!{stringArrayCallsWrapperName}.rc4) {            \n            {rc4Polyfill}\n            \n            {stringArrayCallsWrapperName}.rc4 = rc4;\n        }\n                        \n        if (!{stringArrayCallsWrapperName}.data) {\n            {stringArrayCallsWrapperName}.data = {};\n        }\n\n        if ({stringArrayCallsWrapperName}.data[index] === undefined) {\n            if (!{stringArrayCallsWrapperName}.once) {\n                {selfDefendingCode}\n                \n                {stringArrayCallsWrapperName}.once = true;\n            }\n            \n            value = {stringArrayCallsWrapperName}.rc4(value, key);\n            {stringArrayCallsWrapperName}.data[index] = value;\n        } else {\n            value = {stringArrayCallsWrapperName}.data[index];\n        }\n    ";
}
exports.StringArrayRc4DecodeNodeTemplate = StringArrayRc4DecodeNodeTemplate;

/***/ },
/* 86 */
/***/ function(module, exports) {

"use strict";
"use strict";

function StringArrayTemplate() {
    return "\n        var {stringArrayName} = [{stringArray}];\n    ";
}
exports.StringArrayTemplate = StringArrayTemplate;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var Utils_1 = __webpack_require__(0);
function SelfDefendingTemplate() {
    return "\n        var selfDefendingFunc = function () {            \n            var object = {\n                data: {\n                    key: 'cookie',\n                    value: 'timeout'\n                },\n                setCookie: function (options, name, value, document) {\n                    document = document || {};\n                    \n                    var updatedCookie = name + \"=\" + value;\n\n                    var i = 0;\n                                                            \n                    for (var i = 0, len = options.length; i < len; i++) {                          \n                        var propName = options[i];\n                                     \n                        updatedCookie += \"; \" + propName;\n                        \n                        var propValue = options[propName];\n                        \n                        options.push(propValue);\n                        len = options.length;\n                                                                        \n                        if (propValue !== true) {\n                            updatedCookie += \"=\" + propValue;\n                        }\n                    }\n\n                    document['cookie'] = updatedCookie;\n                },\n                removeCookie: function(){return 'dev';},\n                getCookie: function (document, name) {    \n                    document = document || function (value) { return value };\n                    var matches = document(new RegExp(\n                        \"(?:^|; )\" + name.replace(/([.$?*|{}()[]\\/+^])/g, '\\$1') + \"=([^;]*)\"\n                    ));\n                    \n                    var func = function (param1, param2) {\n                        param1(++param2);\n                    };\n                    \n                    func({whileFunctionName}, {timesName});\n                                        \n                    return matches ? decodeURIComponent(matches[1]) : undefined;\n                }\n            };\n            \n            var test1 = function () {\n                var regExp = new RegExp('" + Utils_1.Utils.stringToUnicodeEscapeSequence("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}") + "');\n                \n                return regExp.test(object.removeCookie.toString());\n            };\n            \n            object['updateCookie'] = test1;\n            \n            var cookie = '';\n            var result = object['updateCookie']();\n                                    \n            if (!result) {\n                object['setCookie'](['*'], 'counter', 1);\n            } else if (result) {\n                cookie = object['getCookie'](null, 'counter');     \n            } else {\n                object['removeCookie']();\n            }\n        };\n        \n        selfDefendingFunc();\n    ";
}
exports.SelfDefendingTemplate = SelfDefendingTemplate;

/***/ },
/* 88 */
/***/ function(module, exports) {

"use strict";
"use strict";

function StringArrayRotateFunctionTemplate() {
    return "\n        (function (array, {timesName}) {\n            var {whileFunctionName} = function (times) {\n                while (--times) {\n                    array['push'](array['shift']());\n                }\n            };\n            \n            {code}\n        })({stringArrayName}, 0x{stringArrayRotateValue});\n    ";
}
exports.StringArrayRotateFunctionTemplate = StringArrayRotateFunctionTemplate;

/***/ },
/* 89 */
/***/ function(module, exports) {

"use strict";
"use strict";

/***/ },
/* 90 */
/***/ function(module, exports) {

"use strict";
"use strict";

/***/ },
/* 91 */
/***/ function(module, exports) {

module.exports = require("chance");

/***/ },
/* 92 */
/***/ function(module, exports) {

module.exports = require("class-validator");

/***/ },
/* 93 */
/***/ function(module, exports) {

module.exports = require("commander");

/***/ },
/* 94 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 95 */
/***/ function(module, exports) {

module.exports = require("mkdirp");

/***/ },
/* 96 */,
/* 97 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var JavaScriptObfuscator_1 = __webpack_require__(10);
if (!global._babelPolyfill) {
    __webpack_require__(26);
}
module.exports = JavaScriptObfuscator_1.JavaScriptObfuscator;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(1);
var ControlFlowStorageCallTemplate_1 = __webpack_require__(99);
var AbstractCustomNode_1 = __webpack_require__(5);
var NodeAppender_1 = __webpack_require__(3);

var ControlFlowStorageCallNode = function (_AbstractCustomNode_) {
    _inherits(ControlFlowStorageCallNode, _AbstractCustomNode_);

    function ControlFlowStorageCallNode(controlFlowStorageName, controlFlowStorageKey, leftValue, rightValue, options) {
        _classCallCheck(this, ControlFlowStorageCallNode);

        var _this = _possibleConstructorReturn(this, (ControlFlowStorageCallNode.__proto__ || Object.getPrototypeOf(ControlFlowStorageCallNode)).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.controlFlowStorageName = controlFlowStorageName;
        _this.controlFlowStorageKey = controlFlowStorageKey;
        _this.leftValue = leftValue;
        _this.rightValue = rightValue;
        return _this;
    }

    _createClass(ControlFlowStorageCallNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            NodeAppender_1.NodeAppender.prependNode(blockScopeNode, this.getNode());
        }
    }, {
        key: 'getCode',
        value: function getCode() {
            return ControlFlowStorageCallTemplate_1.ControlFlowStorageCallTemplate().formatUnicorn({
                controlFlowStorageKey: this.controlFlowStorageKey,
                controlFlowStorageName: this.controlFlowStorageName,
                leftValue: this.leftValue,
                rightValue: this.rightValue
            });
        }
    }]);

    return ControlFlowStorageCallNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.ControlFlowStorageCallNode = ControlFlowStorageCallNode;

/***/ },
/* 99 */
/***/ function(module, exports) {

"use strict";
"use strict";

function ControlFlowStorageCallTemplate() {
    return '{controlFlowStorageName}.{controlFlowStorageKey}({leftValue}, {rightValue})';
}
exports.ControlFlowStorageCallTemplate = ControlFlowStorageCallTemplate;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(1);
var NoCustomNodesPreset_1 = __webpack_require__(13);
var BinaryExpressionDivideFunctionTemplate_1 = __webpack_require__(104);
var AbstractCustomNode_1 = __webpack_require__(5);
var JavaScriptObfuscator_1 = __webpack_require__(10);
var Utils_1 = __webpack_require__(0);

var BinaryExpressionDivideFunctionNode = function (_AbstractCustomNode_) {
    _inherits(BinaryExpressionDivideFunctionNode, _AbstractCustomNode_);

    function BinaryExpressionDivideFunctionNode() {
        _classCallCheck(this, BinaryExpressionDivideFunctionNode);

        var _this = _possibleConstructorReturn(this, (BinaryExpressionDivideFunctionNode.__proto__ || Object.getPrototypeOf(BinaryExpressionDivideFunctionNode)).apply(this, arguments));

        _this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        return _this;
    }

    _createClass(BinaryExpressionDivideFunctionNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {}
    }, {
        key: 'getCode',
        value: function getCode() {
            return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(BinaryExpressionDivideFunctionTemplate_1.BinaryExpressionDivideFunctionTemplate().formatUnicorn({
                functionName: Utils_1.Utils.getRandomVariableName()
            }), NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET).getObfuscatedCode();
        }
    }]);

    return BinaryExpressionDivideFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.BinaryExpressionDivideFunctionNode = BinaryExpressionDivideFunctionNode;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(1);
var NoCustomNodesPreset_1 = __webpack_require__(13);
var BinaryExpressionExponentitionFunctionTemplate_1 = __webpack_require__(105);
var AbstractCustomNode_1 = __webpack_require__(5);
var JavaScriptObfuscator_1 = __webpack_require__(10);
var Utils_1 = __webpack_require__(0);

var BinaryExpressionExponentiationFunctionNode = function (_AbstractCustomNode_) {
    _inherits(BinaryExpressionExponentiationFunctionNode, _AbstractCustomNode_);

    function BinaryExpressionExponentiationFunctionNode() {
        _classCallCheck(this, BinaryExpressionExponentiationFunctionNode);

        var _this = _possibleConstructorReturn(this, (BinaryExpressionExponentiationFunctionNode.__proto__ || Object.getPrototypeOf(BinaryExpressionExponentiationFunctionNode)).apply(this, arguments));

        _this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        return _this;
    }

    _createClass(BinaryExpressionExponentiationFunctionNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {}
    }, {
        key: 'getCode',
        value: function getCode() {
            return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(BinaryExpressionExponentitionFunctionTemplate_1.BinaryExpressionExponentiationFunctionTemplate().formatUnicorn({
                functionName: Utils_1.Utils.getRandomVariableName()
            }), NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET).getObfuscatedCode();
        }
    }]);

    return BinaryExpressionExponentiationFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.BinaryExpressionExponentiationFunctionNode = BinaryExpressionExponentiationFunctionNode;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(1);
var NoCustomNodesPreset_1 = __webpack_require__(13);
var BinaryExpressionMultiplyFunctionTemplate_1 = __webpack_require__(106);
var AbstractCustomNode_1 = __webpack_require__(5);
var JavaScriptObfuscator_1 = __webpack_require__(10);
var Utils_1 = __webpack_require__(0);

var BinaryExpressionMultiplyFunctionNode = function (_AbstractCustomNode_) {
    _inherits(BinaryExpressionMultiplyFunctionNode, _AbstractCustomNode_);

    function BinaryExpressionMultiplyFunctionNode() {
        _classCallCheck(this, BinaryExpressionMultiplyFunctionNode);

        var _this = _possibleConstructorReturn(this, (BinaryExpressionMultiplyFunctionNode.__proto__ || Object.getPrototypeOf(BinaryExpressionMultiplyFunctionNode)).apply(this, arguments));

        _this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        return _this;
    }

    _createClass(BinaryExpressionMultiplyFunctionNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {}
    }, {
        key: 'getCode',
        value: function getCode() {
            return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(BinaryExpressionMultiplyFunctionTemplate_1.BinaryExpressionMultiplyFunctionTemplate().formatUnicorn({
                functionName: Utils_1.Utils.getRandomVariableName()
            }), NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET).getObfuscatedCode();
        }
    }]);

    return BinaryExpressionMultiplyFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.BinaryExpressionMultiplyFunctionNode = BinaryExpressionMultiplyFunctionNode;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

__webpack_require__(8);
var AppendState_1 = __webpack_require__(1);
var NoCustomNodesPreset_1 = __webpack_require__(13);
var BinaryExpressionSubtractFunctionTemplate_1 = __webpack_require__(107);
var AbstractCustomNode_1 = __webpack_require__(5);
var JavaScriptObfuscator_1 = __webpack_require__(10);
var Utils_1 = __webpack_require__(0);

var BinaryExpressionSubtractFunctionNode = function (_AbstractCustomNode_) {
    _inherits(BinaryExpressionSubtractFunctionNode, _AbstractCustomNode_);

    function BinaryExpressionSubtractFunctionNode() {
        _classCallCheck(this, BinaryExpressionSubtractFunctionNode);

        var _this = _possibleConstructorReturn(this, (BinaryExpressionSubtractFunctionNode.__proto__ || Object.getPrototypeOf(BinaryExpressionSubtractFunctionNode)).apply(this, arguments));

        _this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        return _this;
    }

    _createClass(BinaryExpressionSubtractFunctionNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {}
    }, {
        key: 'getCode',
        value: function getCode() {
            return JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(BinaryExpressionSubtractFunctionTemplate_1.BinaryExpressionSubtractFunctionTemplate().formatUnicorn({
                functionName: Utils_1.Utils.getRandomVariableName()
            }), NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET).getObfuscatedCode();
        }
    }]);

    return BinaryExpressionSubtractFunctionNode;
}(AbstractCustomNode_1.AbstractCustomNode);

exports.BinaryExpressionSubtractFunctionNode = BinaryExpressionSubtractFunctionNode;

/***/ },
/* 104 */
/***/ function(module, exports) {

"use strict";
"use strict";

function BinaryExpressionDivideFunctionTemplate() {
    return "\n        function {functionName} (x, y) {\n            return x / y;\n        }\n    ";
}
exports.BinaryExpressionDivideFunctionTemplate = BinaryExpressionDivideFunctionTemplate;

/***/ },
/* 105 */
/***/ function(module, exports) {

"use strict";
"use strict";

function BinaryExpressionExponentiationFunctionTemplate() {
    return "\n        function {functionName} (x, y) {\n            return Math.pow(x, y);\n        }\n    ";
}
exports.BinaryExpressionExponentiationFunctionTemplate = BinaryExpressionExponentiationFunctionTemplate;

/***/ },
/* 106 */
/***/ function(module, exports) {

"use strict";
"use strict";

function BinaryExpressionMultiplyFunctionTemplate() {
    return "\n        function {functionName} (x, y) {\n            return x * y;\n        }\n    ";
}
exports.BinaryExpressionMultiplyFunctionTemplate = BinaryExpressionMultiplyFunctionTemplate;

/***/ },
/* 107 */
/***/ function(module, exports) {

"use strict";
"use strict";

function BinaryExpressionSubtractFunctionTemplate() {
    return "\n        function {functionName} (x, y) {\n            return x - y;\n        }\n    ";
}
exports.BinaryExpressionSubtractFunctionTemplate = BinaryExpressionSubtractFunctionTemplate;

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map