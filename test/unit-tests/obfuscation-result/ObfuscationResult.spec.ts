import { assert } from 'chai';

import { IObfuscationResult } from '../../../src/interfaces/IObfuscationResult';

import { ObfuscationResult } from '../../../src/ObfuscationResult';

describe('ObfuscationResult', () => {
    describe('constructor', () => {
        let obfuscatedCode: string = 'obfuscatedCode',
            obfuscationResult: IObfuscationResult,
            sourceMap: string = 'sourceMap';

        before(() => {
            obfuscationResult = new ObfuscationResult();
            obfuscationResult.initialize(obfuscatedCode, sourceMap);
        });

        it('should return obfuscated code if `.toString()` was called on `ObfuscationResult` object', () => {
            assert.equal(obfuscationResult.toString(), obfuscatedCode);
        });
    });
});
