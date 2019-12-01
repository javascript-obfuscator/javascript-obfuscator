import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('MethodDefinitionTransformer', () => {
    describe('Variant #1: default behaviour', () => {
        const regExp: RegExp = /\['bar'\]\(\)\{\}/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/sample-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('should replace method definition node `key` property with square brackets literal', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #2: `stringArray` option is enabled', () => {
        const stringArrayRegExp: RegExp = /var *_0x([a-f0-9]){4} *= *\['bar'\];/;
        const stringArrayCallRegExp: RegExp = /\[_0x([a-f0-9]){4}\('0x0'\)\]\(\)\{\}/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/sample-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('should add method definition node `key` property to string array', () => {
            assert.match(obfuscatedCode,  stringArrayRegExp);
        });

        it('should replace method definition node `key` property with call to string array', () => {
            assert.match(obfuscatedCode,  stringArrayCallRegExp);
        });
    });

    describe('Variant #3: `constructor` key', () => {
        const regExp: RegExp = /constructor\(\)\{\}/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/sample-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('shouldn\'t transform method definition node with `constructor` key', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #4: async `get()` method', () => {
        const classDeclarationRegExp: RegExp = /class *(_0x[a-f0-9]{4,6}) *{/;
        const asyncMethodRegExp: RegExp = /static *async *\['get'] *\(\) *{}/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/async-get-method.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                }
            ).getObfuscatedCode();
        });

        it('Match #1: should rename class declaration name', () => {
            assert.match(obfuscatedCode, classDeclarationRegExp);
        });

        it('Match #2: should correctly rename async method name', () => {
            assert.match(obfuscatedCode, asyncMethodRegExp);
        });
    });
});
