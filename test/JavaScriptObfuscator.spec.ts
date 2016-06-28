import { BabelPolyfill } from './polyfills/BabelPolyfill';

import { JavaScriptObfuscator } from "../src/JavaScriptObfuscator";

import { NO_CUSTOM_NODES_PRESET } from "../src/preset-options/NoCustomNodesPreset";

const assert: Chai.AssertStatic = require('chai').assert;

BabelPolyfill.append();

describe('JavaScriptObfuscator', () => {
    describe('obfuscate (sourceCode: string, customOptions?: IOptionsPreset): string', () => {
        it('should obfuscate simple code with variable inside global scope', () => {
            assert.match(
                JavaScriptObfuscator.obfuscate(
                    `var test = 1;`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET)
                ),
                /^var *test *= *0x\d+;$/
            );
        });

        it('should obfuscate simple code with variable inside block-scope', () => {
            assert.match(
                JavaScriptObfuscator.obfuscate(
                    `(function () {var test = 1;})()`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET)
                ),
                /^\(function *\(\) *\{ *var *_0x[\w]+ *= *0x\d+; *\}(\(\)\)|\)\(\));?$/
            );
        });

        it('should obfuscate simple code with literal variable value', () => {
            let pattern: RegExp = /^var _0x(\w){4} *= *\['(\\[x|u]\d+)+'\]; *var *test *= *_0x(\w){4}\[0x0\];$/;

            assert.match(
                JavaScriptObfuscator.obfuscate(
                    `var test = 'abc';`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                        unicodeArray: true,
                        unicodeArrayThreshold: 1
                    })
                ),
                pattern
            );

            assert.match(
                JavaScriptObfuscator.obfuscate(
                    `var test = 'абц';`,
                    Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                        unicodeArray: true,
                        unicodeArrayThreshold: 1
                    })
                ),
                pattern
            );
        });
    });
});
