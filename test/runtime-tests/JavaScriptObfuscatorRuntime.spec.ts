import { assert } from 'chai';

import { readFileAsString } from '../helpers/readFileAsString';

import { IObfuscationResult } from '../../src/interfaces/IObfuscationResult';

import { JavaScriptObfuscator } from '../../src/JavaScriptObfuscator';

describe('JavaScriptObfuscator runtime eval', () => {
    it('should obfuscate code without any runtime errors after obfuscation: variant #1 sha256', () => {
        const code: string = readFileAsString('./test/fixtures/runtime/sha256.js');

        const obfuscationResult1: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            code,
            {
                selfDefending: true,
                debugProtection: true,
                stringArrayEncoding: 'rc4',
                controlFlowFlattening: true
            }
        );

        assert.equal(
            eval(`${obfuscationResult1.getObfuscatedCode()} sha256('test');`),
            '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
        );
    });
});
