import { IObfuscationResult } from "../../../../src/interfaces/IObfuscationResult";

import { JavaScriptObfuscator } from "../../../../src/JavaScriptObfuscator";

const assert: Chai.AssertStatic = require('chai').assert;

describe('ConsoleOutputDisableExpressionNode', () => {
    it('should correctly append `ConsoleOutputDisableExpressionNode` custom node into the obfuscated code if `disableConsoleOutput` option is set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                disableConsoleOutput: true
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(), /_\u0003\.log\u0001\.in/);
    });

    it('should\'t append `ConsoleOutputDisableExpressionNode` custom node into the obfuscated code if `disableConsoleOutput` option is not set', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            `var test = 'test';`,
            {
                disableConsoleOutput: false
            }
        );

        assert.notMatch(obfuscationResult.getObfuscatedCode(), /_\u0003\.log\u0001\.in/);
    });
});
