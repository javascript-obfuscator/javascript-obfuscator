import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/preset-options/NoCustomNodesPreset';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

const assert: Chai.AssertStatic = require('chai').assert;

describe('FunctionObfuscator', () => {
    describe('identifiers obfuscation inside `FunctionDeclaration` and `FunctionExpression` node body', () => {
        it('should correct obfuscate both function parameter identifier and function body identifier with same name', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `
                    (function () {
                        var test = function (test) {
                            console.log(test);
                            
                            if (true) {
                                var test = 5
                            }
                            
                            return test;
                        }
                    })();
                `,
                Object.assign({}, NO_CUSTOM_NODES_PRESET)
            );

            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            const functionParamIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/var _0x[a-z0-9]{4,6} *= *function *\((_0x[a-z0-9]{4,6})\) *\{/);
            const functionBodyIdentifierMatch: RegExpMatchArray|null = obfuscatedCode
                .match(/console\['\\x6c\\x6f\\x67'\]\((_0x[a-z0-9]{4,6})\)/);

            const functionParamIdentifierName: string = (<RegExpMatchArray>functionParamIdentifierMatch)[1];
            const functionBodyIdentifierName: string = (<RegExpMatchArray>functionBodyIdentifierMatch)[1];

            assert.equal(functionParamIdentifierName, functionBodyIdentifierName);
        });
    });
});
