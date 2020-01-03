import { assert } from 'chai';
import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';
import { readFileAsString } from '../../helpers/readFileAsString';
import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';
import { IdentifierNamesGenerator } from "../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator";

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/355
//
describe('Issue #355', () => {
    describe('Fixture code should not break', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue355.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: false,
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                }
            ).getObfuscatedCode();

        });

        it('does not break on run', () => {
            assert.doesNotThrow(() => eval(obfuscatedCode));
        });
    });
});
