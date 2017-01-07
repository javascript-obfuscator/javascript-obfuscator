import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

describe('MethodDefinitionTransformer', () => {
    let code: string = `
        class Foo {
            constructor () {}
            bar () {}
        }
    `;

    it('should replace method definition node `key` property with unicode value', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            code,
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /\['\\x62\\x61\\x72'\]\(\)\{\}/);
    });

    it('should replace method definition node `key` property with unicode array call', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            code,
            {
                ...NO_CUSTOM_NODES_PRESET,
                stringArray: true,
                stringArrayThreshold: 1
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /var *_0x([a-z0-9]){4} *= *\['\\x62\\x61\\x72'\];/);
        assert.match(obfuscationResult.getObfuscatedCode(),  /\[_0x([a-z0-9]){4}\('0x0'\)\]\(\)\{\}/);
    });

    it('should not obfuscate method definition node with `constructor` key', () => {
        let obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
            code,
            {
                ...NO_CUSTOM_NODES_PRESET
            }
        );

        assert.match(obfuscationResult.getObfuscatedCode(),  /constructor\(\)\{\}/);
    });
});
