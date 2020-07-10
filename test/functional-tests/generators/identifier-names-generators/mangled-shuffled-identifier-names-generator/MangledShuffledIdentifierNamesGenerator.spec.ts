import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

describe('MangledShuffledIdentifierNamesGenerator', () => {
    describe('Variant #1: prevent name sequence mutation of base `mangled` generator', () => {
        const functionsRegExp: RegExp = new RegExp(
            'function foo *\\(a, *b\\) *{} *' +
            'function foo *\\(a, *b\\) *{} *' +
            'function foo *\\(a, *b\\) *{} *' +
            'function foo *\\(a, *b\\) *{}'
        );

        let obfuscatedCode: string = '';

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/prevent-name-sequence-mutation.js');

            for (let i = 0; i < 4; i++) {
                const identifierNamesGenerator = i % 2 === 0
                    ? IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                    : IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator;

                obfuscatedCode += JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator
                    }
                ).getObfuscatedCode();
            }
        });

        it('Should not mutate name sequences between mangled generators', () => {
            assert.notMatch(obfuscatedCode, functionsRegExp);
        });
    });
});
