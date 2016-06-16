import { JavaScriptObfuscator } from "../src/JavaScriptObfuscator";

import { DEFAULT_PRESET } from "../src/preset-options/DefaultPreset";
import { NO_CUSTOM_NODES_PRESET } from "../src/preset-options/NoCustomNodesPreset";

let assert: any = require('chai').assert;

describe('JavaScriptObfuscator', () => {
    describe('obfuscate (sourceCode: string, customOptions?: IOptionsPreset): string', () => {
        it('should obfuscate simple code with variable inside global scope', () => {
            assert.match(
                JavaScriptObfuscator.obfuscate(
                    `var test = 1;`,
                    Object.assign({}, DEFAULT_PRESET, NO_CUSTOM_NODES_PRESET)
                ),
                /^var *[A-Za-z]+ *= *0x\d+;$/
            );
        });

        it('should obfuscate simple code with variable inside block-scope', () => {
            assert.match(
                JavaScriptObfuscator.obfuscate(
                    `(function () {var test = 1;})()`,
                    Object.assign({}, DEFAULT_PRESET, NO_CUSTOM_NODES_PRESET)
                ),
                /^\(function *\( *\) *\{ *var *_0x[\w]+ *= *0x\d+; *\} *(\( *\) *\)|\) *\( *\));?$/
            );
        });
    });
});