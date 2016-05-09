"use strict";
const Obfuscator_1 = require('./src/Obfuscator');
let escodegen = require('escodegen'), esprima = require('esprima');
class JavaScriptObfuscator {
    static obfuscate(sourceCode, options) {
        let astTree = esprima.parse(sourceCode), obfuscator = new Obfuscator_1.Obfuscator(options);
        obfuscator.obfuscateNode(astTree);
        return JavaScriptObfuscator.generateCode(astTree);
    }
    static generateCode(astTree) {
        return escodegen.generate(astTree, JavaScriptObfuscator.escodegenParams);
    }
}
JavaScriptObfuscator.escodegenParams = {
    format: {},
    verbatim: 'x-verbatim-property'
};
exports.JavaScriptObfuscator = JavaScriptObfuscator;
module.exports = JavaScriptObfuscator;
//# sourceMappingURL=index.js.map