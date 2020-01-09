import { assert } from 'chai';
import { NO_ADDITIONAL_NODES_PRESET } from '../../../src/options/presets/NoCustomNodes';
import { readFileAsString } from '../../helpers/readFileAsString';
import { JavaScriptObfuscator } from '../../../src/JavaScriptObfuscatorFacade';

//
// https://github.com/javascript-obfuscator/javascript-obfuscator/issues/360
//
describe('Issue #360', () => {
    describe('Correct renaming globals after two imports', () => {
        const codeResult: string = 'import c from\'lib1\';import d from\'lib2\';let e=null;';

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/issue360.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    compact: true,
                    renameGlobals: true,
                    identifierNamesGenerator: 'mangled'
                }
            ).getObfuscatedCode();
        });

        it('should return correct result', () => {
            assert.equal(obfuscatedCode, codeResult);
        });
    });
});
