import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

describe('DomainLockNode', () => {
    it('should correctly append `DomainLockNode` custom node into the obfuscated code if `domainLock` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                ...NO_CUSTOM_NODES_PRESET,
                domainLock: ['.example.com']
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(), /var _0x([a-z0-9]){4,6} *= *new RegExp/);
    });

    it('should\'t append `DomainLockNode` custom node into the obfuscated code if `domainLock` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                ...NO_CUSTOM_NODES_PRESET,
                domainLock: []
            }
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), /var _0x([a-z0-9]){4,6} *= *new RegExp/);
    });
});
