import { assert } from 'chai';

import { StringArrayEncoding } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayCodeHelperGroup', () => {
    const regExp: RegExp = new RegExp(
        'function *b *\\(\\w, *\\w\\) *{.*return \\w;}.*' +
        'function *c *\\(\\w, *\\w\\) *{.*return \\w;}.*' +
        'function *d *\\(\\w, *\\w\\) *{.*return \\w;}'
    );

    describe('StringArrayCallsWrapper code helper names', () => {
        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                    stringArray: true,
                    stringArrayThreshold: 1,
                    stringArrayEncoding: [
                        StringArrayEncoding.None,
                        StringArrayEncoding.Base64,
                        StringArrayEncoding.Rc4
                    ]
                }
            ).getObfuscatedCode();
        });

        it('should place multiple StringArrayCallsWrapper code helper names in the correct order', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });
});
