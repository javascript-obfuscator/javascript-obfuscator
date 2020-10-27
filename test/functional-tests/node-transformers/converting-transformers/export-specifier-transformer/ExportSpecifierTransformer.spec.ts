import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('ExportSpecifierTransformer', () => {
    describe('Variant #1: exported constant', () => {
        describe('Variant #1:`renameGlobals` option is enabled', () => {
            const regExp: RegExp = new RegExp(
                'const _0x([a-f0-9]){4,6} *= *0x1; *' +
                'export *{_0x([a-f0-9]){4,6} as foo};'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/exported-constant.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true
                    }
                ).getObfuscatedCode();
            });

            it('should transform export specifier node', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #2: `renameGlobals` option is disabled', () => {
            const regExp: RegExp = new RegExp(
                'const foo *= *0x1; *' +
                'export *{foo};'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/exported-constant.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: false
                    }
                ).getObfuscatedCode();
            });

            it('should not transform export specifier node', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });

    describe('Variant #2: exported import', () => {
        describe('Variant #1:`renameGlobals` option is enabled', () => {
            const regExp: RegExp = new RegExp(
                'import _0x([a-f0-9]){4,6} from *\'./bar\'; *' +
                'export *{_0x([a-f0-9]){4,6} as foo};'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/exported-import.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: true
                    }
                ).getObfuscatedCode();
            });

            it('should transform export specifier node', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #2: `renameGlobals` option is disabled', () => {
            const regExp: RegExp = new RegExp(
                'import _0x([a-f0-9]){4,6} from *\'./bar\'; *' +
                'export *{_0x([a-f0-9]){4,6} as foo};'
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/exported-import.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        renameGlobals: false
                    }
                ).getObfuscatedCode();
            });

            it('should transform export specifier node', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });
});
