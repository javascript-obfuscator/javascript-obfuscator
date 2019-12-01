import { assert } from 'chai';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

describe('BlackListObfuscatingGuard', () => {
    describe('check', () => {
        describe('`\'use strict\';` operator', () => {
            const useStrictOperatorRegExp: RegExp = /'use *strict';/;
            const stringArrayLatinRegExp: RegExp = /var _0x(\w){4} *= *\['abc'\];/;
            const stringArrayCallRegExp: RegExp = /var *test *= *_0x(\w){4}\('0x0'\);$/;

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/use-strict-operator.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('match #1: shouldn\'t obfuscate `use strict` operator', () => {
                assert.match(obfuscatedCode, useStrictOperatorRegExp);
            });

            it('match #2: should return correct obfuscated code', () => {
                assert.match(obfuscatedCode, stringArrayLatinRegExp);
            });

            it('match #3: should return correct obfuscated code', () => {
                assert.match(obfuscatedCode, stringArrayCallRegExp);
            });
        });
    });
});
