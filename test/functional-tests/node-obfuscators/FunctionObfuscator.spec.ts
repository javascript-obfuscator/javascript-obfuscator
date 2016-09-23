import { IObfuscationResult } from "../../../src/interfaces/IObfuscationResult";

import { NO_CUSTOM_NODES_PRESET } from "../../../src/preset-options/NoCustomNodesPreset";

import { JavaScriptObfuscator } from "../../../src/JavaScriptObfuscator";

const assert: Chai.AssertStatic = require('chai').assert;

describe('FunctionObfuscator', () => {
    describe('obfuscation of identifiers of FunctionDeclaration and FunctionExpression node body', () => {
        it('should replace identifier name with obfuscated one', () => {
            let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                `var test = 'test';`,
                Object.assign({}, NO_CUSTOM_NODES_PRESET)
            );

            assert.match(obfuscationResult.getObfuscatedCode(),  /^var *test *= *'\\x74\\x65\\x73\\x74';$/);
        });
    });
});
