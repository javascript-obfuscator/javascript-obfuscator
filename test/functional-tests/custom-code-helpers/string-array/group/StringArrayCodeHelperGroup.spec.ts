import { assert } from 'chai';

import { StringArrayEncoding } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('StringArrayCodeHelperGroup', () => {
    const regExp: RegExp = new RegExp(
        'function *\\w *\\(\\w, *\\w\\) *{.*return \\w;}.*' +
        'function *\\w *\\(\\w, *\\w\\) *{.*return \\w;}.*' +
        'function *\\w *\\(\\w, *\\w\\) *{.*return \\w;}'
    );
    const stringArrayCallsWrapperRegExp: RegExp = new RegExp(
        `function *(\\w) *\\(\\w, *\\w\\) *{.*return \\w;}.*`
    );

    describe('StringArrayCallsWrapper code helper names', () => {
        const stringArrayCallsWrapperNames: Set<string> = new Set();
        const samplesCount: number = 30;
        let obfuscatedCode: string;

        const expectedUniqStringArrayCallsWrapperNamesCount: number = 3;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            for (let i = 0; i < samplesCount; i++) {
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

                const callsWrapperName: string = getRegExpMatch(obfuscatedCode, stringArrayCallsWrapperRegExp);

                stringArrayCallsWrapperNames.add(callsWrapperName);
            }
        });

        it('should correct place all StringArrayCallsWrapper code helpers', () => {
            assert.match(obfuscatedCode, regExp);
        });

        it('should place multiple StringArrayCallsWrapper code helper names in the random order', () => {
            assert.equal(stringArrayCallsWrapperNames.size, expectedUniqStringArrayCallsWrapperNamesCount);
        });
    });
});
