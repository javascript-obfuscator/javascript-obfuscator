'use strict';

import * as fs from 'fs';

(function () {
    const JavaScriptObfuscator: any = require('../../index');

    let start: any = new Date();

    JavaScriptObfuscator.obfuscate(
        fs.readFileSync('test/fixtures/compile-performance.js', 'utf8')
    ).getObfuscatedCode();

    console.log(`Total time: ${<any>new Date() - start}`);
})();
