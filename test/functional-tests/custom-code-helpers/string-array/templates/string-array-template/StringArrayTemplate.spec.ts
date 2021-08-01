import 'reflect-metadata';

import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../../src/interfaces/source-code/IObfuscationResult';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';
import { getStringArrayRegExp } from '../../../../../helpers/get-string-array-regexp';
import { readFileAsString } from '../../../../../helpers/readFileAsString';

describe('StringArrayTemplate', () => {
    describe('Prevailing kind of variables', () => {
        describe('`var` kind', () => {
            let obfuscatedCode: string,
                stringArrayRegExp: RegExp = getStringArrayRegExp(['foo'], {kind: 'var'});

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-var.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('Should return correct kind of variables for string array', () => {
                assert.match(obfuscatedCode, stringArrayRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => obfuscatedCode);
            });
        });

        describe('`const` kind', () => {
            let obfuscatedCode: string,
                stringArrayRegExp: RegExp = getStringArrayRegExp(['foo'], {kind: 'const'});

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-const.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('Should return correct kind of variables for string array', () => {
                assert.match(obfuscatedCode, stringArrayRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => obfuscatedCode);
            });
        });

        describe('`let` kind', () => {
            let obfuscatedCode: string,
                stringArrayRegExp: RegExp = getStringArrayRegExp(['foo'], {kind: 'const'});

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-let.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('Should return correct kind of variables for string array', () => {
                assert.match(obfuscatedCode, stringArrayRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => obfuscatedCode);
            });
        });
    });
});
