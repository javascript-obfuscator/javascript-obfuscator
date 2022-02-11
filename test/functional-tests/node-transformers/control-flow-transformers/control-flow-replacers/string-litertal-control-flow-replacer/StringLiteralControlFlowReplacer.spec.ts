import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../../helpers/readFileAsString';
import { getRegExpMatch } from '../../../../../helpers/getRegExpMatch';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

describe('StringLiteralControlFlowReplacer', () => {
    describe('replace', () => {
        const variableMatch: string = '_0x([a-f0-9]){4,6}';

        describe('Variant #1 - base behavior', () => {

            const controlFlowStorageStringLiteralRegExp: RegExp = new RegExp(
                `var ${variableMatch} *= *\\{'\\w{5}' *: *'test'\\};`
            );
            const controlFlowStorageCallRegExp: RegExp = new RegExp(
                `var ${variableMatch} *= *${variableMatch}\\['\\w{5}'\\];`
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('should add string literal node as property of control flow storage node', () => {
                assert.match(obfuscatedCode, controlFlowStorageStringLiteralRegExp);
            });

            it('should replace string literal node with call to control flow storage node', () => {
                assert.match(obfuscatedCode, controlFlowStorageCallRegExp);
            });
        });

        describe('Variant #2 - same storage key for same string values', () => {
            const storageKeyRegExp: RegExp = /'(\w{5})': 'value'/;
            const expectedStorageCallsMatchesCount: number = 5;

            let storageCallsMatchesCount: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/same-storage-key-for-same-string-values.js');

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        compact: false,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();

                const storageKeyMatch = getRegExpMatch(obfuscatedCode, storageKeyRegExp);
                const storageCallsRegExp = new RegExp(`${variableMatch}\\[\'${storageKeyMatch}\']`, 'g')

                storageCallsMatchesCount = obfuscatedCode.match(storageCallsRegExp)?.length ?? 0;
            });

            it('should add string literal nodes with same values under same storage item', () => {
                assert.equal(storageCallsMatchesCount, expectedStorageCallsMatchesCount);
            });
        });
    });
});
