import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('SelfDefendingCodeHelper', () => {
    describe('`selfDefending` option is set', () => {
        describe('Variant #1: identifier names when appended inside global scope', () => {
            const regExp: RegExp = /var foo[a-z] *= *foo[a-z]\(this, *function *\(\) *{/;
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                        identifiersPrefix: 'foo',
                        selfDefending: true
                    }
                ).getObfuscatedCode();
            });

            it('should add prefix to the helper identifiers inside global scope', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #2: identifier names when appended inside function scope', () => {
            const regExp: RegExp = /var [a-z] *= *[a-z]\(this, *function *\(\) *{/;
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/append-inside-function-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                        identifiersPrefix: 'foo',
                        selfDefending: true
                    }
                ).getObfuscatedCode();
            });

            it('should not add prefix to the helper identifiers inside global scope', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });
});
