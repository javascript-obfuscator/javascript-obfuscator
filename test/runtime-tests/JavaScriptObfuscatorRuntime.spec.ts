import { assert } from 'chai';

import { StringArrayEncoding } from '../../src/enums/StringArrayEncoding';

import { readFileAsString } from '../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../src/JavaScriptObfuscatorFacade';

describe('JavaScriptObfuscator runtime eval', function () {
    this.timeout(100000);

    let obfuscatedCode: string;

    before(() => {
        const code: string = readFileAsString(__dirname + '/fixtures/sha256.js');

        obfuscatedCode = JavaScriptObfuscator.obfuscate(
            code,
            {
                controlFlowFlattening: true,
                deadCodeInjection: true,
                debugProtection: true,
                selfDefending: true,
                stringArrayEncoding: StringArrayEncoding.Rc4,
                transformObjectKeys: true
            }
        ).getObfuscatedCode();
    });

    it('should obfuscate code without any runtime errors after obfuscation: Variant #1 sha256', () => {
        assert.equal(
            eval(`${obfuscatedCode} sha256('test');`),
            '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
        );
    });
});
