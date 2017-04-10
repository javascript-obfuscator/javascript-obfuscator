import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscator';

describe('DeadCodeInjectionTransformer', () => {
    const variableMatch: string = '_0x([a-f0-9]){4,6}';
    const hexMatch: string = '0x[a-f0-9]';

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
                `if *\\(${variableMatch}\\('${hexMatch}'\\) *[=|!]== *${variableMatch}\\('${hexMatch}'\\)\\) *\\{`+
                    `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                `\\} *else *\\{`+
                    `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
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
                    `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
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
                    `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                `\\};` +
            ``;
            const regexp: RegExp = new RegExp(codeMatch, 'g');
            const matches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(regexp);

            it('shouldn\'t add dead code if `deadCodeInjectionThreshold` option value is `0`', () => {
                assert.isNotNull(matches);
                assert.equal(matches.length, 5);
            });
        });

        describe('variant #4 - break or continue statement in block statement', () => {
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                readFileAsString(__dirname + '/fixtures/break-continue-statement.js'),
                {
                    ...NO_CUSTOM_NODES_PRESET,
                    deadCodeInjection: true,
                    deadCodeInjectionThreshold: 1,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );
            const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

            const functionMatch: string = `` +
                `var *${variableMatch} *= *function *\\(\\) *\\{` +
                    `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                `\\};` +
            ``;
            const loopMatch: string = `` +
                `for *\\(var *${variableMatch} *= *${hexMatch}; *${variableMatch} *< *${hexMatch}; *${variableMatch}\\+\\+\\) *\\{` +
                    `(?:continue|break);` +
                `\\}` +
            ``;

            const functionRegExp: RegExp = new RegExp(functionMatch, 'g');
            const loopRegExp: RegExp = new RegExp(loopMatch, 'g');

            const functionMatches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(functionRegExp);
            const loopMatches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(loopRegExp);

            it('shouldn\'t add dead code if block statement contains `continue` or `break` statements', () => {
                assert.isNotNull(functionMatches);
                assert.isNotNull(loopMatches);

                assert.equal(functionMatches.length, 4);
                assert.equal(loopMatches.length, 2);
            });
        });

        describe('variant #5 - chance of `IfStatement` variant', () => {
            const samplesCount: number = 1000;
            const delta: number = 0.1;
            const expectedValue: number = 0.25;

            const ifMatch: string = `if *\\(!!\\[\\]\\) *\\{`;
            const functionMatch: string = `var *${variableMatch} *= *function *\\(\\) *\\{`;

            const match1: string = `` +
                `if *\\(${variableMatch}\\('${hexMatch}'\\) *=== *${variableMatch}\\('${hexMatch}'\\)\\) *\\{` +
                    `console.*` +
                `\\} *else *\\{` +
                    `${variableMatch}.*` +
                `\\}` +
            ``;
            const match2: string = `` +
                `if *\\(${variableMatch}\\('${hexMatch}'\\) *!== *${variableMatch}\\('${hexMatch}'\\)\\) *\\{` +
                    `console.*` +
                `\\} *else *\\{` +
                    `${variableMatch}.*` +
                `\\}` +
            ``;
            const match3: string = `` +
                `if *\\(${variableMatch}\\('${hexMatch}'\\) *=== *${variableMatch}\\('${hexMatch}'\\)\\) *\\{` +
                    `${variableMatch}.*` +
                `\\} *else *\\{` +
                    `console.*` +
                `\\}` +
            ``;
            const match4: string = `` +
                `if *\\(${variableMatch}\\('${hexMatch}'\\) *!== *${variableMatch}\\('${hexMatch}'\\)\\) *\\{` +
                    `${variableMatch}.*` +
                `\\} *else *\\{` +
                    `console.*` +
                `\\}` +
            ``;

            const regExp1: RegExp = new RegExp(`${ifMatch}${functionMatch}${match1}`);
            const regExp2: RegExp = new RegExp(`${ifMatch}${functionMatch}${match2}`);
            const regExp3: RegExp = new RegExp(`${ifMatch}${functionMatch}${match3}`);
            const regExp4: RegExp = new RegExp(`${ifMatch}${functionMatch}${match4}`);

            let count1: number = 0;
            let count2: number = 0;
            let count3: number = 0;
            let count4: number = 0;

            for (let i = 0; i < samplesCount; i++) {
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    readFileAsString(__dirname + '/fixtures/if-statement-variants-distribution.js'),
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );
                const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();

                if (regExp1.test(obfuscatedCode)) {
                    count1++;
                } else if (regExp2.test(obfuscatedCode)) {
                    count2++;
                } else if (regExp3.test(obfuscatedCode)) {
                    count3++;
                } else if (regExp4.test(obfuscatedCode)) {
                    count4++;
                }
            }

            it('each of four `IfStatement` variant should have distribution close to `0.25`', () => {
                assert.closeTo(count1 / samplesCount, expectedValue, delta);
                assert.closeTo(count2 / samplesCount, expectedValue, delta);
                assert.closeTo(count3 / samplesCount, expectedValue, delta);
                assert.closeTo(count4 / samplesCount, expectedValue, delta);
            });
        });
    });
});
