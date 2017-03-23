import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscator';

describe('StringLiteralControlFlowReplacer', () => {
    describe('replace (literalNode: ESTree.Literal,parentNode: ESTree.Node,controlFlowStorage: IStorage <ICustomNode>)', () => {
        const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/input-1.js'),
            {
                ...NO_CUSTOM_NODES_PRESET,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1
            }
        );
        const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
        const controlFlowStorageStringLiteralRegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *\{'\w{3}' *: *'test'\};/;
        const controlFlowStorageCallRegExp: RegExp = /var *_0x([a-f0-9]){4,6} *= *_0x([a-f0-9]){4,6}\['\w{3}'\];/;

        it('should add string literal node as property of control flow storage node', () => {
            assert.match(obfuscatedCode, controlFlowStorageStringLiteralRegExp);
        });

        it('should replace string literal node by call to control flow storage node', () => {
            assert.match(obfuscatedCode, controlFlowStorageCallRegExp);
        });
    });
});
