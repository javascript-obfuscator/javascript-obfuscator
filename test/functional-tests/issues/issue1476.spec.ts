import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1476
//
describe('Issue #1476', () => {
    describe('`numbersToExpressions` should keep non-computed numeric class member keys', () => {
        const code: string = `
            class C {
                get 2() { return 1; }
                3() { return 2; }
                4 = 3;
                static 5 = 4;
                [6] = 5;
            }
            var c = new C();
            return [c[2], c[3](), c[4], C[5], c[6]].join();
        `;

        let obfuscatedCode: string;
        let result: unknown;

        before(() => {
            obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET,
                numbersToExpressions: true
            }).getObfuscatedCode();

            result = new Function(obfuscatedCode)();
        });

        it('should keep non-computed numeric keys as literals', () => {
            assert.match(obfuscatedCode, /get 0x2\(\)/);
            assert.match(obfuscatedCode, /[;{}]0x3\(\)/);
            assert.match(obfuscatedCode, /[;{}]0x4=/);
            assert.match(obfuscatedCode, /static 0x5=/);
        });

        it('should still transform values and computed keys', () => {
            assert.notMatch(obfuscatedCode, /\[0x6\]/);
            assert.notMatch(obfuscatedCode, /0x4=0x3;/);
        });

        it('should produce valid code with the same result', () => {
            assert.strictEqual(result, '1,2,3,4,5');
        });
    });
});
