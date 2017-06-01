import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscator';

describe('ObjectExpressionTransformer', () => {
    describe('default behaviour', () => {
        const regExp: RegExp = /var *test *= *\{'foo':0x0\};/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/property-with-identifier-value.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
       });

        it('should replace object expression node `key` property with identifier value by property with literal value', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('shorthand ES6 object expression', () => {
        const regExp: RegExp = /var *_0x[a-f0-9]{4,6} *= *\{'a': *_0x[a-f0-9]{4,6}\, *'b': *_0x[a-f0-9]{4,6}\};/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/shorthand-object-expression.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_CUSTOM_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should correct convert shorthand ES6 object expression to non-shorthand object expression', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });
});
