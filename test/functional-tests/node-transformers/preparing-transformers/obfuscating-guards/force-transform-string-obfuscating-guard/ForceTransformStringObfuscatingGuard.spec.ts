import { assert } from 'chai';

import { JavaScriptObfuscator } from '../../../../../../src/JavaScriptObfuscatorFacade';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../../src/options/presets/NoCustomNodes';

import { IdentifierNamesGenerator } from '../../../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { readFileAsString } from '../../../../../helpers/readFileAsString';

describe('ForceTransformStringObfuscatingGuard', () => {
    describe('check', () => {
        describe('`forceTransformStrings` option is enabled', () => {
            const obfuscatingGuardRegExp: RegExp = new RegExp(
                'var foo *= *\'foo\';' +
                'var bar *= *b\\(0x0\\);'
            );

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/base-behaviour.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        forceTransformStrings: ['bar'],
                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                        stringArray: true,
                        stringArrayThreshold: 0
                    }
                ).getObfuscatedCode();
            });

            it('match #1: should obfuscate force transform strings', () => {
                assert.match(obfuscatedCode, obfuscatingGuardRegExp);
            });
        });

        describe('`forceTransformStrings` option is disabled', () => {
            const obfuscatingGuardRegExp: RegExp = new RegExp(
                'var foo *= *\'foo\';' +
                'var bar *= *\'bar\';'
            );

            let obfuscatedCode: string;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/base-behaviour.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        forceTransformStrings: [],
                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
                        stringArray: true,
                        stringArrayThreshold: 0
                    }
                ).getObfuscatedCode();
            });

            it('match #1: shouldn\'t obfuscate strings', () => {
                assert.match(obfuscatedCode, obfuscatingGuardRegExp);
            });
        });
    });
});
