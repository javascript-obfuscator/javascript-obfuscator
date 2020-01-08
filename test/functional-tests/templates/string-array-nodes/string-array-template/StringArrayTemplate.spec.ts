import 'reflect-metadata';

import { assert } from 'chai';

import { IObfuscatedCode } from '../../../../../src/interfaces/source-code/IObfuscatedCode';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';
import { readFileAsString } from '../../../../helpers/readFileAsString';

describe('StringArrayTemplate', () => {
    describe('Prevailing kind of variables', () => {
        describe('`var` kind', () => {
            let obfuscatedCode: string,
                stringArrayRegExp: RegExp = /var (_0x(\w){4}) *= *\['.*'];/;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-var.js');
                const obfuscatedCodeObject: IObfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscatedCodeObject.getObfuscatedCode();
            });

            it('Should return correct variable kind for string array', () => {
                assert.match(obfuscatedCode, stringArrayRegExp);
            });
        });

        describe('`const` kind', () => {
            let obfuscatedCode: string,
                stringArrayRegExp: RegExp = /const (_0x(\w){4}) *= *\['.*'];/;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-const.js');
                const obfuscatedCodeObject: IObfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscatedCodeObject.getObfuscatedCode();
            });

            it('Should return correct variable kind for string array', () => {
                assert.match(obfuscatedCode, stringArrayRegExp);
            });
        });
    });
});
