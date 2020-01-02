import { assert } from 'chai';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

describe('ReservedStringObfuscatingGuard', () => {
    describe('check', () => {
        describe('`\'use strict\';` operator', () => {
            const obfuscatingGuardRegExp: RegExp = /var test1 *= *'foo' *\+ *'foo'; *var test2 *= *'barbar'; *var test3 *= *'baz' *\+ *'baz';/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/base-behaviour.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        reservedStrings: ['bar'],
                        splitStrings: true,
                        splitStringsChunkLength: 3
                    }
                ).getObfuscatedCode();
            });

            it('match #1: shouldn\'t obfuscate reserved strings', () => {
                assert.match(obfuscatedCode, obfuscatingGuardRegExp);
            });
        });
    });
});
