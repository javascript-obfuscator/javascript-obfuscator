import { JavaScriptObfuscatorCLI } from "../src/cli/JavaScriptObfuscatorCLI";

let assert: any = require('chai').assert,
    stream: any = require("mock-utf8-stream"),
    mockStdin: any = require('mock-stdin');

describe('JavaScriptObfuscatorCLI', () => {
    describe('run (): void', () => {
        it('should obfuscate file with JS code', function (done: MochaDone): void {
            let stdin: any = mockStdin.stdin(),
                stdout: any = new stream.MockWritableStream();

            this.timeout(7000);

            stdout.captureData();

            let CLI: JavaScriptObfuscatorCLI = new JavaScriptObfuscatorCLI(
                [
                    'node',
                    'javascript-obfuscator',
                    '--compact',
                    'false',
                    '--selfDefending',
                    'false'
                ],
                stdin.send(new Buffer('var test = \'abc\';')),
                stdout
            );

            CLI.run();

            assert.equal(1, 1);
        });
    });
});
