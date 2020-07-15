import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('ExpressionStatementsMergeTransformer', () => {
    describe('Variant #1: simple', () => {
        const regExp: RegExp = new RegExp(
            'function foo *\\(\\) *{ *' +
                'bar\\(\\), *' +
                'baz\\(\\), *' +
                'bark\\(\\); *' +
            '}'
        );


        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    simplify: true
                }
            ).getObfuscatedCode();
        });

        it('should merge expression statements', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #2: complex', () => {
        const regExp: RegExp = new RegExp(
            'function foo *\\(\\) *{ *' +
                'console\\[\'log\']\\(0x1\\), *' +
                'console\\[\'log\']\\(0x2\\); *' +
                'function _0x([a-f0-9]){4,6} *\\(\\) *{ *} *' +
                'console\\[\'log\']\\(0x3\\), *' +
                'console\\[\'log\']\\(0x4\\), *' +
                'console\\[\'log\']\\(0x5\\); *' +
                'const _0x([a-f0-9]){4,6} *= *0x6; *' +
                'console\\[\'log\']\\(0x7\\); *' +
            '}'
        );


        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/complex.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    simplify: true
                }
            ).getObfuscatedCode();
        });

        it('should merge expression statements', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });
});
