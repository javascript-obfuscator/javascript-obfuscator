"use strict";
const Obfuscator_1 = require('./src/Obfuscator');
let escodegen = require('escodegen'), esprima = require('esprima'), RawSource = require('webpack-core/lib/RawSource');
class JavaScriptObfuscator {
    static obfuscate(sourceCode, options) {
        let astTree = esprima.parse(sourceCode), obfuscator = new Obfuscator_1.Obfuscator(options);
        obfuscator.obfuscateNode(astTree);
        return JavaScriptObfuscator.generateCode(astTree);
    }
    static generateCode(astTree) {
        return new RawSource(escodegen.generate(astTree, JavaScriptObfuscator.escodegenParams));
    }
}
JavaScriptObfuscator.escodegenParams = {
    format: {},
    verbatim: 'x-verbatim-property'
};
exports.JavaScriptObfuscator = JavaScriptObfuscator;
module.exports = JavaScriptObfuscator;
//# sourceMappingURL=index.js.map