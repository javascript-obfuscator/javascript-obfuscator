import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { StringArrayEncoding } from '../../../../src/enums/StringArrayEncoding';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayCallsWrapperCodeHelper', () => {
    const regExp: RegExp = /_0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6} *- *0x0\;/;

    describe('`stringArray` option is set', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('should correctly append code helper into the obfuscated code', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('`stringArray` option isn\'t set', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: false
                }
            ).getObfuscatedCode();
        });

        it('shouldn\'t append code helper into the obfuscated code', () => {
            assert.notMatch(obfuscatedCode, regExp);
        });
    });

    describe('`stringArrayIntermediateCalls` option is set', () => {
        const stringArrayCallRegExp: RegExp = new RegExp(
                'return _0x([a-f0-9]){4,6};' +
            '};' +
            'var _0x([a-f0-9]){4} *= *_0x([a-f0-9]){4};' +
            'var _0x([a-f0-9]){4} *= *_0x([a-f0-9]){4};' +
            'var _0x([a-f0-9]){4} *= *_0x([a-f0-9]){4};' +
            'var test *= *_0x([a-f0-9]){4}\\(\'0x0\'\\);'
        );

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1,
                    stringArrayIntermediateCalls: 3
                }
            ).getObfuscatedCode();
        });

        it('should correctly append `StringArrayCallsWrapperIntermediateTemplate` template into the obfuscated code', () => {
            assert.match(obfuscatedCode, stringArrayCallRegExp);
        });
    });

    describe('Preserve string array name', () => {
        const callsWrapperRegExp: RegExp = new RegExp(`` +
            `var b *= *function *\\(c, *d\\) *{ *` +
            `c *= *c *- *0x0; *` +
            `var e *= *a\\[c]; *` +
        ``);

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                    stringArray: true,
                    stringArrayThreshold: 1,
                    stringArrayEncoding: [StringArrayEncoding.Base64]
                }
            ).getObfuscatedCode();
        });

        it('should preserve string array name', () => {
            assert.match(obfuscatedCode, callsWrapperRegExp);
        });
    });
});
