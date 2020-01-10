import 'reflect-metadata';

import { assert } from 'chai';

import { IObfuscatedCode } from '../../../../../src/interfaces/source-code/IObfuscatedCode';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';
import { readFileAsString } from '../../../../helpers/readFileAsString';

describe('StringArrayRotateFunctionTemplate', () => {
    describe('Prevailing kind of variables', () => {
        describe('`var` kind', () => {
            let obfuscatedCode: string,
                stringArrayRotateFunctionRegExp: RegExp = /function\(_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}\){var _0x([a-f0-9]){4,6} *= *function/;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-var.js');
                const obfuscatedCodeObject: IObfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        rotateStringArray: true
                    }
                );

                obfuscatedCode = obfuscatedCodeObject.getObfuscatedCode();
            });

            it('Should return correct kind of variables for string array rotate function', () => {
                assert.match(obfuscatedCode, stringArrayRotateFunctionRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => obfuscatedCode);
            });
        });

        describe('`const` kind', () => {
            let obfuscatedCode: string,
                stringArrayRotateFunctionRegExp: RegExp = /function\(_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}\){const _0x([a-f0-9]){4,6} *= *function/;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-const.js');
                const obfuscatedCodeObject: IObfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        rotateStringArray: true
                    }
                );

                obfuscatedCode = obfuscatedCodeObject.getObfuscatedCode();
            });

            it('Should return correct kind of variables for string array rotate function', () => {
                assert.match(obfuscatedCode, stringArrayRotateFunctionRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => obfuscatedCode);
            });
        });

        describe('`let` kind', () => {
            let obfuscatedCode: string,
                stringArrayRotateFunctionRegExp: RegExp = /function\(_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}\){const _0x([a-f0-9]){4,6} *= *function/;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-let.js');
                const obfuscatedCodeObject: IObfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        rotateStringArray: true
                    }
                );

                obfuscatedCode = obfuscatedCodeObject.getObfuscatedCode();
            });

            it('Should return correct kind of variables for string array rotate function', () => {
                assert.match(obfuscatedCode, stringArrayRotateFunctionRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => obfuscatedCode);
            });
        });
    });
});
