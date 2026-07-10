import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { StringArrayEncoding } from '../../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';

import { readFileAsString } from '../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1431
//
describe('Issue #1431', () => {
    describe('Base64/Rc4 string-array encoding of a literal with lone surrogate code units', () => {
        describe('Variant #1: `base64` encoding with `splitStrings` (minimal reproduction)', () => {
            let testFunc: () => string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/issue1431.js');

                testFunc = () =>
                    JavaScriptObfuscator.obfuscate(code, {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayEncoding: [StringArrayEncoding.Base64],
                        stringArrayThreshold: 1,
                        splitStrings: true,
                        splitStringsChunkLength: 5,
                        seed: 1
                    }).getObfuscatedCode();
            });

            it('should not throw `URIError: URI malformed`', () => {
                assert.doesNotThrow(testFunc);
            });
        });

        describe('Variant #2: `base64` encoding', () => {
            let testFunc: () => string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/issue1431.js');

                testFunc = () =>
                    JavaScriptObfuscator.obfuscate(code, {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayEncoding: [StringArrayEncoding.Base64],
                        stringArrayThreshold: 1,
                        seed: 1
                    }).getObfuscatedCode();
            });

            it('should not throw `URIError: URI malformed`', () => {
                assert.doesNotThrow(testFunc);
            });
        });

        describe('Variant #3: `rc4` encoding', () => {
            let testFunc: () => string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/issue1431.js');

                testFunc = () =>
                    JavaScriptObfuscator.obfuscate(code, {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayEncoding: [StringArrayEncoding.Rc4],
                        stringArrayThreshold: 1,
                        seed: 1
                    }).getObfuscatedCode();
            });

            it('should not throw `URIError: URI malformed`', () => {
                assert.doesNotThrow(testFunc);
            });
        });
    });

    describe('Obfuscated code stays runnable and preserves the original value', () => {
        const originalValue: string = '\\\\[^\uD800-\uDFFF]';

        let result: string;

        before(() => {
            const code: string = 'module.exports = "\\\\\\\\[^\\uD800-\\uDFFF]";';

            const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET,
                stringArray: true,
                stringArrayEncoding: [StringArrayEncoding.Base64],
                stringArrayThreshold: 1,
                seed: 1
            }).getObfuscatedCode();

            const moduleObject: { exports: string } = { exports: '' };

            new Function('module', obfuscatedCode)(moduleObject);

            result = moduleObject.exports;
        });

        it('should evaluate to the original string', () => {
            assert.equal(result, originalValue);
        });
    });
});
