"use strict";
const esprima = require('esprima');
const escodegen = require('escodegen');
const Obfuscator_1 = require('./src/Obfuscator');
class JavaScriptObfuscator {
    static obfuscate(sourceCode, customOptions) {
        let astTree = esprima.parse(sourceCode), options = Object.assign(JavaScriptObfuscator.defaultOptions, customOptions), obfuscator = new Obfuscator_1.Obfuscator(options);
        obfuscator.obfuscateNode(astTree);
        return JavaScriptObfuscator.generateCode(astTree, options);
    }
    static generateCode(astTree, options) {
        let escodegenParams = Object.assign({}, JavaScriptObfuscator.escodegenParams);
        if (options.hasOwnProperty('compact')) {
            escodegenParams.format = {};
            escodegenParams.format.compact = options.compact;
        }
        return escodegen.generate(astTree, escodegenParams);
    }
}
JavaScriptObfuscator.defaultOptions = {
    compact: true,
    rotateUnicodeArray: true
};
JavaScriptObfuscator.escodegenParams = {
    verbatim: 'x-verbatim-property'
};
exports.JavaScriptObfuscator = JavaScriptObfuscator;
module.exports = JavaScriptObfuscator;
