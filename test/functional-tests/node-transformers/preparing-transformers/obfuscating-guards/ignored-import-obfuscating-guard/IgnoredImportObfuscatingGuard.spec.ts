import { assert } from 'chai';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

describe('IgnoredImportObfuscatingGuard', () => {
    describe('check', () => {
        describe('`ignoreImports` option is enabled', () => {
            const obfuscatingGuardRegExp: RegExp = new RegExp(
                'const foo *= *require\\(\'\\./foo\'\\);.*' +
                'import _0x(?:[a-f0-9]){4,6} from *\'\\./bar\';.*' +
                'const baz *= *_0x(?:[a-f0-9]){4,6}\\(0x0\\);.*' +
                'const bark *= *await import\\(\'\\./bark\'\\);'
            );

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/base-behaviour.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        ignoreImports: true,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('match #1: shouldn\'t obfuscate imports', () => {
                assert.match(obfuscatedCode, obfuscatingGuardRegExp);
            });
        });

        describe('`ignoreImports` option is disabled', () => {
            const obfuscatingGuardRegExp: RegExp = new RegExp(
                'const foo *= *require\\(_0x(?:[a-f0-9]){4,6}\\(0x0\\)\\);.*' +
                'import _0x(?:[a-f0-9]){4,6} from *\'\\./bar\';.*' +
                'const baz *= *_0x(?:[a-f0-9]){4,6}\\(0x1\\);.*' +
                'const bark *= *await import\\(_0x(?:[a-f0-9]){4,6}\\(0x2\\)\\);'
            );

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/base-behaviour.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        ignoreImports: false,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should obfuscate imports', () => {
                assert.match(obfuscatedCode, obfuscatingGuardRegExp);
            });
        });
    });
});
