import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

describe('StringLiteralControlFlowReplacer', () => {
    describe('replace', () => {
        const controlFlowStorageStringLiteralRegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *\{'\w{5}' *: *'test'\};/;
        const controlFlowStorageCallRegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\['\w{5}'\];/;

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
});
