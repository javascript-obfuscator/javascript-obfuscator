import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('DomainLockNode', () => {
    it('should correctly appendNode `DomainLockNode` custom node into the obfuscated code if `domainLock` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                domainLock: ['.example.com']
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(), /var _0x([a-z0-9]){4,6} *= *new RegExp/);
    });

    it('should\'t appendNode `DomainLockNode` custom node into the obfuscated code if `domainLock` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                domainLock: []
            }
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), /var _0x([a-z0-9]){4,6} *= *new RegExp/);
    });
});
