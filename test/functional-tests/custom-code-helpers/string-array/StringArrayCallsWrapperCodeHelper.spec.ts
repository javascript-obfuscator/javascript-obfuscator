import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { StringArrayEncoding } from '../../../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayCallsWrapperCodeHelper', () => {
    const stringCallsWrapperRegExp: RegExp = /function _0x([a-f0-9]){4} *\(_0x([a-f0-9]){4,6} *,_0x([a-f0-9]){4,6}\)/;

    describe('`stringArray` option is set', () => {
        const samplesCount: number = 100;
        const stringArrayCallsWrapperAtFirstPositionRegExp: RegExp = new RegExp(`^${stringCallsWrapperRegExp.source}`);
        const variableDeclarationAtFirstPositionRegExp: RegExp = /^var test *= *_0x([a-f0-9]){4}\(0x0\);/;

        let obfuscatedCode: string;
        let stringArrayCallsWrapperAtFirstPositionMatchesCount: number = 0;
        let variableDeclarationAtFirstPositionMatchesCount: number = 0;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            for (let i = 0; i < samplesCount; i++) {
                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();

                if (obfuscatedCode.match(stringArrayCallsWrapperAtFirstPositionRegExp)) {
                    stringArrayCallsWrapperAtFirstPositionMatchesCount++;
                }

                if (obfuscatedCode.match(variableDeclarationAtFirstPositionRegExp)) {
                    variableDeclarationAtFirstPositionMatchesCount++;
                }
            }
        });

        it('Match #1: should correctly append code helper into the obfuscated code at random index', () => {
            assert.isAbove(stringArrayCallsWrapperAtFirstPositionMatchesCount, 1);
        });

        it('Match #2: should correctly append code helper into the obfuscated code at random index', () => {
            assert.isAbove(variableDeclarationAtFirstPositionMatchesCount, 1);
        });
    });

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
            assert.match(obfuscatedCode, stringCallsWrapperRegExp);
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
            assert.notMatch(obfuscatedCode, stringCallsWrapperRegExp);
        });
    });

    describe('Preserve string array name', () => {
        const callsWrapperRegExp: RegExp = new RegExp(`` +
            `function *c *\\(b, *d\\) *{ *` +
                `var e *= *a\\(\\); *` +
                `c *= *function *\\(f, *g\\) *{` +
                    `f *= *f *- *0x0; *` +
                    `var h *= *e\\[f]; *` +
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
