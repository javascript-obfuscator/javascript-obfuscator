import { assert } from 'chai';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('DomainLockCodeHelper', () => {
    describe('`domainLock` option is set', () => {
        describe('Variant #1: base behaviour', () => {
            const regExp: RegExp = /var _0x([a-f0-9]){4,6} *= *new RegExp/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    domainLock: ['.example.com']
                }).getObfuscatedCode();
            });

            it('should correctly append code helper into the obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #2: identifier names when appended inside global scope', () => {
            const regExp: RegExp = /var foo[a-z] *= *foo[a-z]\(this, *function *\(\) *{/;
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    domainLock: ['.example.com'],
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                    identifiersPrefix: 'foo'
                }).getObfuscatedCode();
            });

            it('should add prefix to the helper identifiers inside global scope', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #3: identifier names when appended inside function scope', () => {
            const regExp: RegExp = /var [a-z] *= *[a-z]\(this, *function *\(\) *{/;
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/append-inside-function-scope.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    domainLock: ['.example.com'],
                    identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                    identifiersPrefix: 'foo'
                }).getObfuscatedCode();
            });

            it('should not add prefix to the helper identifiers inside global scope', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });
    });

    describe("`domainLock` option isn't set", () => {
        const regExp: RegExp = /var _0x([a-f0-9]){4,6} *= *new RegExp/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/simple-input.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
                ...NO_ADDITIONAL_NODES_PRESET,
                domainLock: []
            }).getObfuscatedCode();
        });

        it("shouldn't append code helper into the obfuscated code", () => {
            assert.notMatch(obfuscatedCode, regExp);
        });
    });
});
