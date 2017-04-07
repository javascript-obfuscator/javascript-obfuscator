import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

describe('DeadCodeInjectionTransformer', () => {
    const variableMatch: string = '_0x([a-f0-9]){4,6}';

    describe('transformNode (programNode: ESTree.Program, parentNode: ESTree.Node): ESTree.Node', () => {
        describe('variant #1 - 5 simple block statements', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/input-1.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 1,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
            const deadCodeMatch: string = `` +
                `if *\\(${variableMatch}\\('0x[a-z0-9]'\\) *[=|!]== *${variableMatch}\\('0x[a-z0-9]'\\)\\) *\\{`+
                    `console\\[${variableMatch}\\('0x[a-z0-9]'\\)\\]\\(${variableMatch}\\('0x[a-z0-9]'\\)\\);` +
                `\\} *else *\\{`+
                    `console\\[${variableMatch}\\('0x[a-z0-9]'\\)\\]\\(${variableMatch}\\('0x[a-z0-9]'\\)\\);` +
                `\\}` +
            ``;
            const regexp: RegExp = new RegExp(deadCodeMatch, 'g');
            const matches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(regexp);

            it('should replace block statements with condition with original block statements and dead code', () => {
                assert.isNotNull(matches);
                assert.equal(matches.length, 5);
            });
        });

        describe('variant #2 - 4 simple block statements', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/block-statements-min-count.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 1,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
            const codeMatch: string = `` +
                `var *${variableMatch} *= *function *\\(\\) *\\{` +
                    `console\\[${variableMatch}\\('0x[a-z0-9]'\\)\\]\\(${variableMatch}\\('0x[a-z0-9]'\\)\\);` +
                `\\};` +
            ``;
            const regexp: RegExp = new RegExp(codeMatch, 'g');
            const matches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(regexp);

            it('shouldn\'t add dead code if block statements count is less than 5', () => {
                assert.isNotNull(matches);
                assert.equal(matches.length, 4);
            });
        });

        describe('variant #3 - deadCodeInjectionThreshold: 0', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/input-1.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 0,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
            const codeMatch: string = `` +
                `var *${variableMatch} *= *function *\\(\\) *\\{` +
                    `console\\[${variableMatch}\\('0x[a-z0-9]'\\)\\]\\(${variableMatch}\\('0x[a-z0-9]'\\)\\);` +
                `\\};` +
            ``;
            const regexp: RegExp = new RegExp(codeMatch, 'g');
            const matches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(regexp);

            it('shouldn\'t add dead code if `deadCodeInjectionThreshold` option value is `0`', () => {
                assert.isNotNull(matches);
                assert.equal(matches.length, 5);
            });
        });
    });
});
