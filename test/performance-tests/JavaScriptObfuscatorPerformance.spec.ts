import { readFileAsString } from '../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('JavaScriptObfuscator performance', () => {
    const iterationsCount: number = 500;

    describe('performance: multiple calls', () => {
        it('shows performance time with multiple obfuscator calls', function (): void {
            this.timeout(100000);

            for (let i: number = 0; i < iterationsCount; i++) {
                JavaScriptObfuscator.obfuscate(readFileAsString('./test/fixtures/sample.js'));
            }

            assert.isOk(true);
        });
    });

    describe('performance: large source code', () => {
        it('shows performance time with large code size', function (): void {
            this.timeout(100000);

            JavaScriptObfuscator.obfuscate(readFileAsString('./test/fixtures/sample.js').repeat(iterationsCount));

            assert.isOk(true);
        });
    });
});
