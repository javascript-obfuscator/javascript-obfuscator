"use strict";
const esprima = require('esprima');
const escodegen = require('escodegen');
const Obfuscator_1 = require('./src/Obfuscator');
class JavaScriptObfuscator {
    static obfuscate(sourceCode, options = {}) {
        let astTree = esprima.parse(sourceCode), obfuscator = new Obfuscator_1.Obfuscator(options);
        obfuscator.obfuscateNode(astTree);
        return JavaScriptObfuscator.generateCode(astTree, options);
    }
    static generateCode(astTree, options = {}) {
        let escodegenParams = Object.assign({}, JavaScriptObfuscator.escodegenParams);
        if (options.hasOwnProperty('compact')) {
            escodegenParams.format.compact = options.compact;
        }
        return escodegen.generate(astTree, escodegenParams);
    }
}
JavaScriptObfuscator.escodegenParams = {
    format: {
        compact: true
    },
    verbatim: 'x-verbatim-property'
};
exports.JavaScriptObfuscator = JavaScriptObfuscator;
module.exports = JavaScriptObfuscator;
