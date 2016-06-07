"use strict";

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var esprima = require('esprima');
var escodegen = require('escodegen');
var DefaultPreset_1 = require('./preset-options/DefaultPreset');
var Obfuscator_1 = require('./Obfuscator');
var OptionsNormalizer_1 = require("./OptionsNormalizer");

var JavaScriptObfuscator = function () {
    function JavaScriptObfuscator() {
        _classCallCheck(this, JavaScriptObfuscator);
    }

    _createClass(JavaScriptObfuscator, null, [{
        key: 'obfuscate',
        value: function obfuscate(sourceCode, customOptions) {
            var astTree = esprima.parse(sourceCode),
                options = OptionsNormalizer_1.OptionsNormalizer.normalize(Object.assign({}, DefaultPreset_1.DEFAULT_PRESET, customOptions)),
                obfuscator = new Obfuscator_1.Obfuscator(options);
            astTree = obfuscator.obfuscateNode(astTree);
            return JavaScriptObfuscator.generateCode(astTree, options);
        }
    }, {
        key: 'generateCode',
        value: function generateCode(astTree, options) {
            var escodegenParams = Object.assign({}, JavaScriptObfuscator.escodegenParams);
            if (options.hasOwnProperty('compact')) {
                escodegenParams.format = {
                    compact: options.compact
                };
            }
            return escodegen.generate(astTree, escodegenParams);
        }
    }]);

    return JavaScriptObfuscator;
}();

JavaScriptObfuscator.escodegenParams = {
    verbatim: 'x-verbatim-property'
};
exports.JavaScriptObfuscator = JavaScriptObfuscator;
