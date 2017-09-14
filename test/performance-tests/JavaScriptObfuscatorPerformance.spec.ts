import { assert } from 'chai';

import { readFileAsString } from '../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../src/JavaScriptObfuscatorFacade';

describe('JavaScriptObfuscator performance', function () {
    const iterationsCount: number = 500;

    this.timeout(100000);

    describe('performance: multiple calls', () => {
        it('shows performance time with multiple obfuscator calls', () => {
            for (let i: number = 0; i < iterationsCount; i++) {
                JavaScriptObfuscator.obfuscate(readFileAsString('./test/fixtures/sample.js'));
            }

            assert.isOk(true);
        });
    });

    describe('performance: large source code', () => {
        it('shows performance time with large code size', () => {
            JavaScriptObfuscator.obfuscate(readFileAsString('./test/fixtures/sample.js').repeat(iterationsCount));

            assert.isOk(true);
        });
    });
});
