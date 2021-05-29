'use strict';

import { TIdentifierNamesCache } from '../../src/types/caches/TIdentifierNamesCache';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    const existingIdentifierNamesCache: TIdentifierNamesCache | null = {
        foo: 'foo_existing',
        bar: 'bar_existing'
    };

    let obfuscationResult = JavaScriptObfuscator.obfuscate(
        `
            (() => {
                function foo(a, b, c, d) {
                  console.log(a, b, c, d)
                }
                
                function bar(...args) {
                  foo(...args, 5)
                }
                
                bar(...[1, 2, 3], 4)
            })();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            identifierNamesCache: existingIdentifierNamesCache,
            identifierNamesGenerator: 'mangled-shuffled'
        }
    );

    let obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
    let identifierNamesCache = obfuscationResult.getIdentifierNamesCache();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
    console.log(identifierNamesCache);
})();
