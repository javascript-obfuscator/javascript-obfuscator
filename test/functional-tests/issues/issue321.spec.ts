import { assert } from 'chai';
import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';
import { readFileAsString } from '../../helpers/readFileAsString';
import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/321
//
describe('Issue #321', () => {

    describe('Fixture code should nor break', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue321.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: false,
                    renameGlobals: true
                }
            ).getObfuscatedCode();

        });

        it('does not break on run', () => {
            assert.doesNotThrow(() => eval(obfuscatedCode));
        });
    });
});
