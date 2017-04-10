import { assert } from 'chai';

import { IObfuscationResult } from '../../src/interfaces/IObfuscationResult';

import { readFileAsString } from '../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../src/JavaScriptObfuscator';

describe('JavaScriptObfuscator runtime eval', () => {
    it('should obfuscate code without any runtime errors after obfuscation: variant #1 sha256', () => {
        const code: string = readFileAsString(__dirname + '/fixtures/sha256.js');

        const obfuscationResult1: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            code,
            {
                controlFlowFlattening: true,
                deadCodeInjection: true,
                debugProtection: true,
                selfDefending: true,
                stringArrayEncoding: 'rc4'
            }
        );

        assert.equal(
            eval(`${obfuscationResult1.getObfuscatedCode()} sha256('test');`),
            '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
        );
    });
});
