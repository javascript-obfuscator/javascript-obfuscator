import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('ObjectPatternPropertiesTransformer', () => {
    describe('Variant #1: function scope', () => {
        describe('Variant #1: `renameGlobals` option is disabled', () => {
            const regExp: RegExp = new RegExp(
                'const { *' +
                    'foo: *_0x([a-f0-9]){4,6}, *' +
                    'bar: *_0x([a-f0-9]){4,6}, *' +
                    '..._0x([a-f0-9]){4,6}' +
                '} *= *{}; *' +
                'console\\[\'log\']\\(_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}\\);'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/function-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: false
                    }
                ).getObfuscatedCode();
            });

            it('should transform object properties', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #2: `renameGlobals` option is enabled', () => {
            const regExp: RegExp = new RegExp(
                'const { *' +
                    'foo: *_0x([a-f0-9]){4,6}, *' +
                    'bar: *_0x([a-f0-9]){4,6}, *' +
                    '..._0x([a-f0-9]){4,6}' +
                '} *= *{}; *' +
                'console\\[\'log\']\\(_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}\\);'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/function-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true
                    }
                ).getObfuscatedCode();
            });

            it('should transform object properties', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });

    describe('Variant #2: global scope', () => {
        describe('Variant #1: `renameGlobals` option is disabled', () => {
            const regExp: RegExp = new RegExp(
                'const { *' +
                    'foo, *' +
                    'bar, *' +
                    '...rest' +
                '} *= *{}; *' +
                'console\\[\'log\']\\(foo, *bar, *rest\\);'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/global-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: false
                    }
                ).getObfuscatedCode();
            });

            it('should transform object properties', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #2: `renameGlobals` option is enabled', () => {
            const regExp: RegExp = new RegExp(
                'const { *' +
                    'foo: *_0x([a-f0-9]){4,6}, *' +
                    'bar: *_0x([a-f0-9]){4,6}, *' +
                    '..._0x([a-f0-9]){4,6}' +
                '} *= *{}; *' +
                'console\\[\'log\']\\(_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}\\);'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/global-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true
                    }
                ).getObfuscatedCode();
            });

            it('should transform object properties', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });
});
