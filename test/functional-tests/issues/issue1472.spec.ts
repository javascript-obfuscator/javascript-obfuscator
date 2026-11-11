import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1472
//
describe('Issue #1472', () => {
    describe('`controlFlowFlattening` should keep `#x in obj` private brand checks', () => {
        const code: string = `
            class C {
                #x;
                static has(o) {
                    return #x in o;
                }
            }
            return [C.has(new C()), C.has({})].join();
        `;

        let obfuscatedCode: string;
        let result: unknown;

        before(() => {
            obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET,
                controlFlowFlattening: true,
                controlFlowFlatteningThreshold: 1
            }).getObfuscatedCode();

            result = new Function(obfuscatedCode)();
        });

        it('should keep the private identifier on the left side of the `in` operator', () => {
            assert.match(obfuscatedCode, /#x in /);
        });

        it('should evaluate the private brand check', () => {
            assert.strictEqual(result, 'true,false');
        });
    });
});
