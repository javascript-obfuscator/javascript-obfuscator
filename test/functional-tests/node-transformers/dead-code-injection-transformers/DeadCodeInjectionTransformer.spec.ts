import { assert } from 'chai';

import { IObfuscationResult } from '../../../../src/interfaces/IObfuscationResult';

import { NO_CUSTOM_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('DeadCodeInjectionTransformer', () => {
    const variableMatch: string = '_0x([a-f0-9]){4,6}';
    const hexMatch: string = '0x[a-f0-9]';

    describe('transformNode (programNode: ESTree.Program, parentNode: ESTree.Node): ESTree.Node', function () {
        this.timeout(100000);

        describe('variant #1 - 5 simple block statements', () => {
            const regExp: RegExp = new RegExp(
                `if *\\(${variableMatch}\\('${hexMatch}'\\) *[=|!]== *${variableMatch}\\('${hexMatch}'\\)\\) *\\{`+
                    `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                `\\} *else *\\{`+
                    `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                `\\}`,
                'g'
            );
            const expectedMatchesLength: number = 5;

            let matchesLength: number = 0;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input-1.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );
                const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
                const matches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(regExp);

                if (matches) {
                    matchesLength = matches.length;
                }
            });

            it('should replace block statements with condition with original block statements and dead code', () => {
                assert.equal(matchesLength, expectedMatchesLength);
            });
        });

        describe('variant #2 - block statements count is less than `5`', () => {
            const regexp: RegExp = new RegExp(
                `var *${variableMatch} *= *function *\\(\\) *\\{` +
                    `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                `\\};`,
                'g'
            );
            const expectedMatchesLength: number = 4;

            let matchesLength: number = 0;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/block-statements-min-count.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );
                const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
                const matches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(regexp);

                if (matches) {
                    matchesLength = matches.length;
                }
            });

            it('shouldn\'t add dead code', () => {
                assert.equal(matchesLength, expectedMatchesLength);
            });
        });

        describe('variant #3 - deadCodeInjectionThreshold: 0', () => {
            const regexp: RegExp = new RegExp(
                `var *${variableMatch} *= *function *\\(\\) *\\{` +
                    `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                `\\};`,
                'g'
            );
            const expectedMatchesLength: number = 5;

            let matchesLength: number = 0;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input-1.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 0,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );
                const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
                const matches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(regexp);

                if (matches) {
                    matchesLength = matches.length;
                }
            });

            it('shouldn\'t add dead code', () => {
                assert.equal(matchesLength, expectedMatchesLength);
            });
        });

        describe('variant #4 - break or continue statement in block statement', () => {
            const functionRegExp: RegExp = new RegExp(
                `var *${variableMatch} *= *function *\\(\\) *\\{` +
                    `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                `\\};`,
                'g'
            );
            const loopRegExp: RegExp = new RegExp(
                `for *\\(var *${variableMatch} *= *${hexMatch}; *${variableMatch} *< *${hexMatch}; *${variableMatch}\\+\\+\\) *\\{` +
                    `(?:continue|break);` +
                `\\}`,
                'g'
            );
            const expectedFunctionMatchesLength: number = 4;
            const expectedLoopMatchesLength: number = 2;

            let functionMatchesLength: number = 0,
                loopMatchesLength: number = 0;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/break-continue-statement.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );
                const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
                const functionMatches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(functionRegExp);
                const loopMatches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(loopRegExp);

                if (functionMatches) {
                    functionMatchesLength = functionMatches.length;
                }

                if (loopMatches) {
                    loopMatchesLength = loopMatches.length;
                }
            });

            it('match #1: shouldn\'t add dead code', () => {
                assert.equal(functionMatchesLength, expectedFunctionMatchesLength);
            });

            it('match #2: shouldn\'t add dead code', () => {
                assert.equal(loopMatchesLength, expectedLoopMatchesLength);
            });
        });

        describe('variant #5 - await expression in block statement', () => {
            const functionRegExp: RegExp = new RegExp(
                `var *${variableMatch} *= *function *\\(\\) *\\{` +
                    `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                `\\};`,
                'g'
            );
            const awaitExpressionRegExp: RegExp = new RegExp(
                `await *${variableMatch}\\(\\)`,
                'g'
            );
            const expectedFunctionMatchesLength: number = 4;
            const expectedAwaitExpressionMatchesLength: number = 1;

            let functionMatchesLength: number = 0,
                awaitExpressionMatchesLength: number = 0;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/await-expression.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );
                const obfuscatedCode: string = obfuscationResult.getObfuscatedCode();
                const functionMatches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(functionRegExp);
                const awaitExpressionMatches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(awaitExpressionRegExp);

                if (functionMatches) {
                    functionMatchesLength = functionMatches.length;
                }

                if (awaitExpressionMatches) {
                    awaitExpressionMatchesLength = awaitExpressionMatches.length;
                }
            });

            it('match #1: shouldn\'t add dead code', () => {
                assert.equal(functionMatchesLength, expectedFunctionMatchesLength);
            });

            it('match #2: shouldn\'t add dead code', () => {
                assert.equal(awaitExpressionMatchesLength, expectedAwaitExpressionMatchesLength);
            });
        });

        describe('variant #6 - chance of `IfStatement` variant', () => {
            const samplesCount: number = 1000;
            const delta: number = 0.1;
            const expectedDistribution: number = 0.25;

            const ifMatch: string = `if *\\(!!\\[\\]\\) *\\{`;
            const functionMatch: string = `var *${variableMatch} *= *function *\\(\\) *\\{`;

            const match1: string = `` +
                `if *\\(${variableMatch}\\('${hexMatch}'\\) *=== *${variableMatch}\\('${hexMatch}'\\)\\) *\\{` +
                    `console.*` +
                `\\} *else *\\{` +
                    `alert.*` +
                `\\}` +
            ``;
            const match2: string = `` +
                `if *\\(${variableMatch}\\('${hexMatch}'\\) *!== *${variableMatch}\\('${hexMatch}'\\)\\) *\\{` +
                    `console.*` +
                `\\} *else *\\{` +
                    `alert.*` +
                `\\}` +
            ``;
            const match3: string = `` +
                `if *\\(${variableMatch}\\('${hexMatch}'\\) *=== *${variableMatch}\\('${hexMatch}'\\)\\) *\\{` +
                    `alert.*` +
                `\\} *else *\\{` +
                    `console.*` +
                `\\}` +
            ``;
            const match4: string = `` +
                `if *\\(${variableMatch}\\('${hexMatch}'\\) *!== *${variableMatch}\\('${hexMatch}'\\)\\) *\\{` +
                    `alert.*` +
                `\\} *else *\\{` +
                    `console.*` +
                `\\}` +
            ``;

            let distribution1: number = 0,
                distribution2: number = 0,
                distribution3: number = 0,
                distribution4: number = 0;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/if-statement-variants-distribution.js');

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
                        code,
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

                distribution1 = count1 / samplesCount;
                distribution2 = count2 / samplesCount;
                distribution3 = count3 / samplesCount;
                distribution4 = count4 / samplesCount;
            });

            it('variant #1: `IfStatement` variant should have distribution close to `0.25`', () => {
                assert.closeTo(distribution1, expectedDistribution, delta);
            });

            it('variant #2: `IfStatement` variant should have distribution close to `0.25`', () => {
                assert.closeTo(distribution2, expectedDistribution, delta);
            });

            it('variant #3: `IfStatement` variant should have distribution close to `0.25`', () => {
                assert.closeTo(distribution3, expectedDistribution, delta);
            });

            it('variant #4: `IfStatement` variant should have distribution close to `0.25`', () => {
                assert.closeTo(distribution4, expectedDistribution, delta);
            });
        });

        describe('variant #7 - block scope of block statement is `ProgramNode`', () => {
            const regExp: RegExp = new RegExp(
                `if *\\(!!\\[\\]\\) *{` +
                    `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                `\\}`
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/block-scope-is-program-node.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('shouldn\'t add dead code in block statements with `ProgramNode` block scope', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('variant #8 - correct obfuscation of dead-code block statements', () => {
            const variableName: string = 'importantVariableName';

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/obfuscation-of-dead-code-block-statements.js');
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_CUSTOM_NODES_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1,
                        debugProtection: true
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should correctly obfuscate dead-code block statements and prevent any exposing of internal variable names', () => {
                assert.notInclude(obfuscatedCode, variableName);
            });
        });
    });
});
