import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('HashbangOperatorTransformer', () => {
    const lineSeparator: string = '\r?\n';

    describe('Variant #1: simple', () => {
        const regExp: RegExp = new RegExp(
            `^#!\/usr\/bin\/env node${lineSeparator}` +
            `var foo *= *'abc';`
        );

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('should remove hashbang operator before ast transformation and append it after', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #2: multiple new lines', () => {
        const regExp: RegExp = new RegExp(
            `^#!\/usr\/bin\/env node${lineSeparator.repeat(4)}` +
            `var foo *= *'abc';`
        );

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/multiple-new-lines.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('should remove hashbang operator before ast transformation and append it after', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #3: `stringArray` option enabled', () => {
        const regExp: RegExp = new RegExp(
            `^#!\/usr\/bin\/env node${lineSeparator}` +
            `var _0x(\\w){4} *= *\\['abc'];`
        );

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('should remove hashbang operator before ast transformation and append it after', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #4: invalid hashbang indent', () => {
        const regExp: RegExp = new RegExp(
            `^var foo *= *'abc';`
        );

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/hashbang-indent.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('should remove invalid hashbang operator', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #5: hashbang as a string value', () => {
        const regExp: RegExp = new RegExp(
            `^var foo *= *'#!/usr/bin/env\\\\x20node';$`
        );

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/hashbang-as-string-value.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('should keep hashbang operator as a string value', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });
});
