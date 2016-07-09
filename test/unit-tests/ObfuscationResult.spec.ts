import { IObfuscationResult } from "../../src/interfaces/IObfuscationResult";

import { ObfuscationResult } from "../../src/ObfuscationResult";

const assert: Chai.AssertStatic = require('chai').assert;

describe('ObfuscationResult', () => {
    describe('constructor (obfuscatedCode: string, sourceMap: string)', () => {
        let obfuscatedCode: string = 'obfuscatedCode',
            obfuscationResult: IObfuscationResult,
            sourceMap: string = 'sourceMap';

        beforeEach(() => {
            obfuscationResult = new ObfuscationResult(obfuscatedCode, sourceMap);
        });

        it('should returns obfuscated code if `.toString()` was called on `ObfuscationResult` object', () => {
            assert.equal(obfuscationResult.toString(), obfuscatedCode);
        });
    });
});
