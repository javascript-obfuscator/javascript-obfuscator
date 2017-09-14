import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('MethodDefinitionTransformer', () => {
    const code: string = readFileAsString(__dirname + '/fixtures/input.js');

    describe('variant #1: default behaviour', () => {
        const regExp: RegExp = /\['bar'\]\(\)\{\}/;

        let obfuscatedCode: string;

        before(() => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should replace method definition node `key` property with square brackets literal', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('variant #2: `stringArray` option is enabled', () => {
        const stringArrayRegExp: RegExp = /var *_0x([a-f0-9]){4} *= *\['bar'\];/;
        const stringArrayCallRegExp: RegExp = /\[_0x([a-f0-9]){4}\('0x0'\)\]\(\)\{\}/;

        let obfuscatedCode: string;

        before(() => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should add method definition node `key` property to string array', () => {
            assert.match(obfuscatedCode,  stringArrayRegExp);
        });

        it('should replace method definition node `key` property with call to string array', () => {
            assert.match(obfuscatedCode,  stringArrayCallRegExp);
        });
    });

    describe('variant #3: `constructor` key', () => {
        const regExp: RegExp = /constructor\(\)\{\}/;

        let obfuscatedCode: string;

        before(() => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('shouldn\'t transform method definition node with `constructor` key', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });
});
