import { assert } from 'chai';
import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';
import { readFileAsString } from '../../helpers/readFileAsString';
import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/437
//
describe('Issue #437', () => {
    describe('Fixture code should not break on obfuscating', () => {
        let doObfuscate: Function;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue437.js');
            doObfuscate = () => JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    transformObjectKeys: true
                }
            ).getObfuscatedCode();
        });

        it('does not break on obfuscating', () => {
            assert.doesNotThrow(doObfuscate);
        });
    });
});
