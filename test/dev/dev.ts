'use strict';

import { NO_ADDITIONAL_NODES_PRESET } from '../../src/options/presets/NoCustomNodes';
import { RenamePropertiesMode } from '../../src/enums/node-transformers/rename-properties-transformers/RenamePropertiesMode';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
        `
            const object = {
                foo: 1,
                bar: 2,
                baz: 3
            };
            
            var excluded1 = 'bar';
            var excluded2 = 'baz';
            
            console.log(object.foo, object['bar'], object.baz);
        `,
        {
            ...NO_ADDITIONAL_NODES_PRESET,
            compact: false,
            renameProperties: true,
            renamePropertiesMode: RenamePropertiesMode.Safe
        }
    ).getObfuscatedCode();

    console.log(obfuscatedCode);
    console.log(eval(obfuscatedCode));
})();
