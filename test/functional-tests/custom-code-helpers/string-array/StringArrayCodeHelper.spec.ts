import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { getStringArrayRegExp } from '../../../helpers/get-string-array-regexp';
import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayCodeHelper', () => {
    const stringArrayRegExp: RegExp = getStringArrayRegExp(['test']);

    describe('`stringArray` option is set', () => {
        const samplesCount: number = 100;
        const stringArrayAtFirstPositionRegExp: RegExp = new RegExp(`^${stringArrayRegExp.source}`);
        const variableDeclarationAtFirstPositionRegExp: RegExp = /^var test *= *_0x([a-f0-9]){4}\(0x0\);/;

        let obfuscatedCode: string;
        let stringArrayAtFirstPositionMatchesCount: number = 0;
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

                if (obfuscatedCode.match(stringArrayAtFirstPositionRegExp)) {
                    stringArrayAtFirstPositionMatchesCount++;
                }

                if (obfuscatedCode.match(variableDeclarationAtFirstPositionRegExp)) {
                    variableDeclarationAtFirstPositionMatchesCount++;
                }
            }
        });

        it('Match #1: should correctly append code helper into the obfuscated code at random index', () => {
            assert.isAbove(stringArrayAtFirstPositionMatchesCount, 1);
        });

        it('Match #2: should correctly append code helper into the obfuscated code at random index', () => {
            assert.isAbove(variableDeclarationAtFirstPositionMatchesCount, 1);
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
            assert.notMatch(obfuscatedCode, stringArrayRegExp);
        });
    });
});
