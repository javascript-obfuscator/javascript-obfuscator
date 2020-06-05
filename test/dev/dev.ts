'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            const foo = {
                prop1: {
                    prop2: 'bar'
                }
            };
            
            foo.prop1.prop2;
            
            const {prop1} = foo;
            console.log(prop1.prop2);
            
            class Foo {
                prop1 () {}
            }
            
            const s = new Foo();

            s.prop1();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            identifierNamesGenerator: 'mangled',
            splitStrings: true,
            splitStringsChunkLength: 3
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
