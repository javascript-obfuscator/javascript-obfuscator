import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/preset-options/NoCustomNodesPreset';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('StringArrayCallsWrapper', () => {
    it('should correctly append `StringArrayCallsWrapper` custom node into the obfuscated code', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            Object.assign({}, NO_CUSTOM_NODES_PRESET, {
                stringArray: true,
                stringArrayThreshold: 1,
                wrapStringArrayCalls: true
            })
        );

        assert.match(
            obfuscationResult.getObfuscatedCode(),
            /var *_0x([a-z0-9]){4,6} *= *parseInt\(_0x([a-z0-9]){4,6}, *0x10\);/
        );
    });
});
