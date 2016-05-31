"use strict";
const esprima = require('esprima');
const escodegen = require('escodegen');
const DefaultPreset_1 = require('./preset-options/DefaultPreset');
const Obfuscator_1 = require('./Obfuscator');
class JavaScriptObfuscator {
    static obfuscate(sourceCode, customOptions) {
        let astTree = esprima.parse(sourceCode), options = Object.assign({}, DefaultPreset_1.DEFAULT_PRESET, customOptions), obfuscator = new Obfuscator_1.Obfuscator(options);
        astTree = obfuscator.obfuscateNode(astTree);
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
JavaScriptObfuscator.escodegenParams = {
    verbatim: 'x-verbatim-property'
};
exports.JavaScriptObfuscator = JavaScriptObfuscator;
