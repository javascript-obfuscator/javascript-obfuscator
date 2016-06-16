import { JavaScriptObfuscator } from "../src/JavaScriptObfuscator";

import { DEFAULT_PRESET } from "../src/preset-options/DefaultPreset";
import { NO_CUSTOM_NODES_PRESET } from "../src/preset-options/NoCustomNodesPreset";

let assert: any = require('chai').assert;

describe('JavaScriptObfuscator', () => {
    describe('obfuscate (sourceCode: string, customOptions?: IOptionsPreset): string', () => {
        let code: string;

        it('should obfuscate simple code with variable inside global scope', () => {
            code = `var test = 1;`;

            assert.match(
                JavaScriptObfuscator.obfuscate(code, Object.assign({}, DEFAULT_PRESET, NO_CUSTOM_NODES_PRESET)),
                /^var *[A-Za-z]+ *= *0x\d+;$/
            );
        });

        it('should obfuscate simple code with variable inside block-scope', () => {
            code = `(function () {var test = 1;})()`;

            assert.match(
                JavaScriptObfuscator.obfuscate(code, Object.assign({}, DEFAULT_PRESET, NO_CUSTOM_NODES_PRESET)),
                /^\(function *\( *\) *\{ *var *_0x[\w]+ *= *0x\d+; *\} *(\( *\) *\)|\) *\( *\));?$/
            );
        });
    });
});