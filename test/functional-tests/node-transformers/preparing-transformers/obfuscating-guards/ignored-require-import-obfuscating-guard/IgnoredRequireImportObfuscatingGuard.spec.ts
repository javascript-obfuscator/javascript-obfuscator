import { assert } from 'chai';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

describe('IgnoredRequireImportObfuscatingGuard', () => {
    describe('check', () => {
        describe('`ignoreRequireImports` option is enabled', () => {
            const obfuscatingGuardRegExp: RegExp = new RegExp(
                'const foo *= *require\\(\'\\./foo\'\\);.*' +
                'import _0x(?:[a-f0-9]){4,6} from *\'\\./bar\';.*' +
                'const baz *= *_0x(?:[a-f0-9]){4,6}\\(0x0\\);'
            );

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/base-behaviour.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        ignoreRequireImports: true,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('match #1: shouldn\'t obfuscate require import', () => {
                assert.match(obfuscatedCode, obfuscatingGuardRegExp);
            });
        });

        describe('`ignoreRequireImports` option is disabled', () => {
            const obfuscatingGuardRegExp: RegExp = new RegExp(
                'const foo *= *require\\(_0x(?:[a-f0-9]){4,6}\\(0x0\\)\\);.*' +
                'import _0x(?:[a-f0-9]){4,6} from *\'\\./bar\';.*' +
                'const baz *= *_0x(?:[a-f0-9]){4,6}\\(0x1\\);'
            );

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/base-behaviour.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        ignoreRequireImports: false,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should obfuscate require import', () => {
                assert.match(obfuscatedCode, obfuscatingGuardRegExp);
            });
        });
    });
});
