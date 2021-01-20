'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
           function foo () {
              if (bar) {
                if (baz) {
                  const a = aa()
                }
              } else {
                bb()
              }
            }
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            simplify: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
