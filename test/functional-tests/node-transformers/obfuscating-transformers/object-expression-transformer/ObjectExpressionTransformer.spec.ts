import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscator';

describe('ObjectExpressionTransformer', () => {
    it('should replace object expression node `key` property with identifier value by property with literal value', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/property-with-identifier-value.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /var *test *= *\{'foo':0x0\};/);
    });

    it('should correct convert shorthand ES6 object expression to non-shorthand object expression', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            readFileAsString(__dirname + '/fixtures/shorthand-object-expression.js'),
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );

        assert.match(
            obfuscationResult.getObfuscatedCode(),
            /var *_0x[a-f0-9]{4,6} *= *\{'a': *_0x[a-f0-9]{4,6}\, *'b': *_0x[a-f0-9]{4,6}\};/
        );
    });
});
