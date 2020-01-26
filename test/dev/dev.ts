'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            function test() {
                var foo;
                return (foo = {props: 1})['state'] = {
                    expanded: foo.props
                },
                foo.state.expanded;
            }
            
            console.log(test());
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            transformObjectKeys: true
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
