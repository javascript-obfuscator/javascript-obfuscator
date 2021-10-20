import 'reflect-metadata';

import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../../src/interfaces/source-code/IObfuscationResult';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';
import { readFileAsString } from '../../../../../helpers/readFileAsString';

describe('StringArrayRotateFunctionTemplate', () => {
    describe('Computed member expressions as array method calls', () => {
        describe('Array push', () => {
            const arrayPushBaseRegExp: RegExp = /_0x([a-f0-9]){4,6}\.push/;
            const arrayPushComputedRegExp: RegExp = /_0x([a-f0-9]){4,6}\['push']/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayRotate: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('Should use computed member expression in `array.push` method', () => {
                assert.match(obfuscatedCode, arrayPushComputedRegExp);
            });

            it('Should not use base member expression in `array.push` method', () => {
                assert.notMatch(obfuscatedCode, arrayPushBaseRegExp);
            });
        });

        describe('Array shift', () => {
            const arrayShiftBaseRegExp: RegExp = /_0x([a-f0-9]){4,6}\.shift/;
            const arrayShiftComputedRegExp: RegExp = /_0x([a-f0-9]){4,6}\['shift']/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayRotate: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('Should use computed member expression in `array.shift` method', () => {
                assert.match(obfuscatedCode, arrayShiftComputedRegExp);
            });

            it('Should not use base member expression in `array.shift` method', () => {
                assert.notMatch(obfuscatedCode, arrayShiftBaseRegExp);
            });
        });
    });

    describe('Prevailing kind of variables', () => {
        describe('`var` kind', () => {
            let obfuscatedCode: string,
                stringArrayRotateFunctionTryCatchRegExp: RegExp = /try *{var *_0x([a-f0-9]){4,6}/;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-var.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayRotate: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('Should return correct kind of variables for string array rotate function', () => {
                assert.match(obfuscatedCode, stringArrayRotateFunctionTryCatchRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => obfuscatedCode);
            });
        });

        describe('`const` kind', () => {
            let obfuscatedCode: string,
                stringArrayRotateFunctionTryCatchRegExp: RegExp = /try *{const *_0x([a-f0-9]){4,6}/;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-const.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayRotate: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('Should return correct kind of variables for string array rotate function', () => {
                assert.match(obfuscatedCode, stringArrayRotateFunctionTryCatchRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => obfuscatedCode);
            });
        });

        describe('`let` kind', () => {
            let obfuscatedCode: string,
                stringArrayRotateFunctionTryCatchRegExp: RegExp = /try *{const *_0x([a-f0-9]){4,6}/;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-let.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        stringArrayRotate: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('Should return correct kind of variables for string array rotate function', () => {
                assert.match(obfuscatedCode, stringArrayRotateFunctionTryCatchRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => obfuscatedCode);
            });
        });
    });
});
