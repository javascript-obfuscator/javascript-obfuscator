import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/1455
//
describe('Issue #1455', () => {
    describe('`transformObjectKeys` should not share object expressions across function calls', () => {
        const samples: { name: string; code: string }[] = [
            {
                name: 'Variant #1: function declaration default parameter',
                code: 'function f(o = { a: 1 }) { return o; } f() === f();'
            },
            {
                name: 'Variant #2: arrow function default parameter',
                code: 'var f = (o = { a: 1 }) => o; f() === f();'
            },
            {
                name: 'Variant #3: nested object inside default parameter',
                code: 'function f(o = { a: { b: 1 } }) { return o.a; } f() === f();'
            },
            {
                name: 'Variant #4: arrow function expression body',
                code: 'var id = (x) => x; var f = () => id({ a: 1 }); f() === f();'
            },
            {
                name: 'Variant #5: class method default parameter',
                code: 'class A { m(o = { a: 1 }) { return o; } } var a = new A(); a.m() === a.m();'
            },
            {
                name: 'Variant #6: class field initializer',
                code: 'class A { x = { a: 1 }; } new A().x === new A().x;'
            }
        ];

        samples.forEach(({ name, code }) => {
            describe(name, () => {
                let result: boolean;

                before(() => {
                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(code, {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        transformObjectKeys: true
                    }).getObfuscatedCode();

                    result = eval(obfuscatedCode);
                });

                it('should create a new object on every evaluation', () => {
                    assert.isFalse(result);
                });
            });
        });
    });
});
