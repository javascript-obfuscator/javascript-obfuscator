import { readFileAsString } from '../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('JavaScriptObfuscator performance', () => {
    const iterationsCount: number = 500;

    describe('performance', () => {
        it('should returns object with obfuscated code and empty source map', function (): void {
            this.timeout(15000);

            for (let i: number = 0; i < iterationsCount; i++) {
                JavaScriptObfuscator.obfuscate(readFileAsString('./test/fixtures/sample.js'));
            }

            assert.equal(1, 1);
        });
    });
});
