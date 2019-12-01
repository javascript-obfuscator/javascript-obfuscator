import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

describe('LogicalExpressionControlFlowReplacer', function () {
    this.timeout(100000);

    describe('replace', () => {
        describe('Variant #1 - single logical expression', () => {
            const controlFlowStorageCallRegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\['\w{5}'\]\(!!\[\], *!\[\]\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should replace logical expression node with call to control flow storage node', () => {
                assert.match(obfuscatedCode, controlFlowStorageCallRegExp);
            });
        });

        describe('Variant #2 - multiple logical expressions with threshold = 1', () => {
            const expectedMatchErrorsCount: number = 0;
            const expectedChance: number = 0.5;

            const samplesCount: number = 1000;
            const delta: number = 0.1;

            const controlFlowStorageCallRegExp1: RegExp = /var *_0x(?:[a-f0-9]){4,6} *= *(_0x([a-f0-9]){4,6}\['\w{5}'\])\(!!\[\], *!\[\]\);/;
            const controlFlowStorageCallRegExp2: RegExp = /var *_0x(?:[a-f0-9]){4,6} *= *(_0x([a-f0-9]){4,6}\['\w{5}'\])\(!\[\], *!!\[\]\);/;

            let matchErrorsCount: number = 0,
                usingExistingIdentifierChance: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input-2.js');

                let obfuscatedCode: string,
                    firstMatchArray: RegExpMatchArray | null,
                    secondMatchArray: RegExpMatchArray | null,
                    firstMatch: string | undefined,
                    secondMatch: string | undefined,
                    equalsValue: number = 0;

                for (let i = 0; i < samplesCount; i++) {
                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            controlFlowFlattening: true,
                            controlFlowFlatteningThreshold: 1
                        }
                    ).getObfuscatedCode();

                    firstMatchArray = obfuscatedCode.match(controlFlowStorageCallRegExp1);
                    secondMatchArray = obfuscatedCode.match(controlFlowStorageCallRegExp2);

                    if (!firstMatchArray || !secondMatchArray) {
                        matchErrorsCount++;

                        continue;
                    }

                    firstMatch = firstMatchArray ? firstMatchArray[1] : undefined;
                    secondMatch = secondMatchArray ? secondMatchArray[1] : undefined;

                    if (firstMatch === secondMatch) {
                        equalsValue++;
                    }
                }

                usingExistingIdentifierChance = equalsValue / samplesCount;
            });

            it('should replace logical expression node by call to control flow storage node', () => {
                assert.equal(matchErrorsCount, expectedMatchErrorsCount);
            });

            it('should use existing identifier for control flow storage with expected chance', () => {
                assert.closeTo(usingExistingIdentifierChance, expectedChance, delta);
            });
        });

        describe('Variant #3 - single logical expression with unary expression', () => {
            const controlFlowStorageCallRegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\['\w{5}'\]\(!_0x([a-f0-9]){4,6}, *!_0x([a-f0-9]){4,6}\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input-3.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should replace logical unary expression with call to control flow storage node', () => {
                assert.match(obfuscatedCode, controlFlowStorageCallRegExp);
            });
        });

        describe('prohibited nodes Variant #1', () => {
            const regExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\[_0x([a-f0-9]){4,6}\] *&& *!\[\];/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prohibited-nodes.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: .1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t replace prohibited expression nodes', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });
});
