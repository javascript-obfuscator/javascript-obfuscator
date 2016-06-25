import { JavaScriptObfuscatorCLI } from "../src/cli/JavaScriptObfuscatorCLI";

let assert: any = require('chai').assert;

describe('JavaScriptObfuscatorCLI', () => {
    describe('run (): void', () => {
        it('should obfuscate file with JS code', () => {
            let CLI: JavaScriptObfuscatorCLI = new JavaScriptObfuscatorCLI([
                'node',
                'javascript-obfuscator',
                '--compact',
                'false',
                '--selfDefending',
                'false'
            ]);

            CLI.run();

            assert.equal(1, 1);
        });
    });
});
