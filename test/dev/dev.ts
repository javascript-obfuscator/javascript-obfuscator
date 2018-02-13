'use strict';
import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
        (function(){
            var foo = 'foo'; var bar = 'bar'; var bark = foo + bar,; var baz = 'baz';
        })();
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            identifiersPrefix: 'foo',
            identifierNamesGenerator: 'mangled',
            renameGlobals: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
