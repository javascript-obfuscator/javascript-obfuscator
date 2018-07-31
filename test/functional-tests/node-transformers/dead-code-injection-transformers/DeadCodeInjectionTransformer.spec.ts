import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { IdentifierNamesGenerator } from '../../../../src/enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { getRegExpMatch } from '../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

describe('DeadCodeInjectionTransformer', () => {
    const variableMatch: string = '_0x([a-f0-9]){4,6}';
    const hexMatch: string = '0x[a-f0-9]';

    describe('transformNode', function () {
        this.timeout(100000);

        describe('Variant #1 - 5 simple block statements', () => {
            const regExp: RegExp = new RegExp(
                `if *\\(${variableMatch}\\('${hexMatch}'\\) *[=|!]== *${variableMatch}\\('${hexMatch}'\\)\\) *\\{`+
                    `(?:console|${variableMatch})\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                `\\} *else *\\{`+
                    `(?:console|${variableMatch})\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                `\\}`,
                'g'
            );
            const expectedMatchesLength: number = 5;

            let matchesLength: number = 0;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input-1.js');

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
                const matches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(regExp);

                if (matches) {
                    matchesLength = matches.length;
                }
            });

            it('should replace block statements with condition with original block statements and dead code', () => {
                assert.equal(matchesLength, expectedMatchesLength);
            });
        });

        describe('Variant #2 - block statements count is less than `5`', () => {
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

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
                const matches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(regexp);

                if (matches) {
                    matchesLength = matches.length;
                }
            });

            it('shouldn\'t add dead code', () => {
                assert.equal(matchesLength, expectedMatchesLength);
            });
        });

        describe('Variant #3 - deadCodeInjectionThreshold: 0', () => {
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

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 0,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
                const matches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(regexp);

                if (matches) {
                    matchesLength = matches.length;
                }
            });

            it('shouldn\'t add dead code', () => {
                assert.equal(matchesLength, expectedMatchesLength);
            });
        });

        describe('Variant #4 - break or continue statement in block statement', () => {
            describe('Variant #1', () => {
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
                    const code: string = readFileAsString(__dirname + '/fixtures/break-continue-statement-1.js');

                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            deadCodeInjection: true,
                            deadCodeInjectionThreshold: 1,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
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

            describe('Variant #2', () => {
                const functionRegExp: RegExp = new RegExp(
                    `var *${variableMatch} *= *function *\\(\\) *\\{` +
                        `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                    `\\};`,
                    'g'
                );
                const loopRegExp: RegExp = new RegExp(
                    `for *\\(var *${variableMatch} *= *${hexMatch}; *${variableMatch} *< *${hexMatch}; *${variableMatch}\\+\\+\\) *` +
                        `(?:continue|break);`,
                    'g'
                );
                const expectedFunctionMatchesLength: number = 4;
                const expectedLoopMatchesLength: number = 2;

                let functionMatchesLength: number = 0,
                    loopMatchesLength: number = 0;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/break-continue-statement-2.js');

                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            deadCodeInjection: true,
                            deadCodeInjectionThreshold: 1,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();
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
        });

        describe('Variant #5 - await expression in block statement', () => {
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

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
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

        describe('Variant #6 - super expression in block statement', () => {
            const functionRegExp: RegExp = new RegExp(
                `var *${variableMatch} *= *function *\\(\\) *\\{` +
                    `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                `\\};`,
                'g'
            );
            const superExpressionRegExp: RegExp = new RegExp(
                `super *\\(\\);`,
                'g'
            );
            const expectedFunctionMatchesLength: number = 4;
            const expectedSuperExpressionMatchesLength: number = 1;

            let functionMatchesLength: number = 0,
                superExpressionMatchesLength: number = 0;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/super-expression.js');

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1,
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                ).getObfuscatedCode();
                const functionMatches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(functionRegExp);
                const superExpressionMatches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(superExpressionRegExp);

                if (functionMatches) {
                    functionMatchesLength = functionMatches.length;
                }

                if (superExpressionMatches) {
                    superExpressionMatchesLength = superExpressionMatches.length;
                }
            });

            it('match #1: shouldn\'t add dead code', () => {
                assert.equal(functionMatchesLength, expectedFunctionMatchesLength);
            });

            it('match #2: shouldn\'t add dead code', () => {
                assert.equal(superExpressionMatchesLength, expectedSuperExpressionMatchesLength);
            });
        });

        describe('Variant #7 - chance of `IfStatement` variant', () => {
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

                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            deadCodeInjection: true,
                            deadCodeInjectionThreshold: 1,
                            stringArray: true,
                            stringArrayThreshold: 1
                        }
                    ).getObfuscatedCode();

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

            it('Variant #1: `IfStatement` variant should have distribution close to `0.25`', () => {
                assert.closeTo(distribution1, expectedDistribution, delta);
            });

            it('Variant #2: `IfStatement` variant should have distribution close to `0.25`', () => {
                assert.closeTo(distribution2, expectedDistribution, delta);
            });

            it('Variant #3: `IfStatement` variant should have distribution close to `0.25`', () => {
                assert.closeTo(distribution3, expectedDistribution, delta);
            });

            it('Variant #4: `IfStatement` variant should have distribution close to `0.25`', () => {
                assert.closeTo(distribution4, expectedDistribution, delta);
            });
        });

        describe('Variant #8 - block scope of block statement is `ProgramNode`', () => {
            const regExp: RegExp = new RegExp(
                `if *\\(!!\\[\\]\\) *{` +
                    `console\\[${variableMatch}\\('${hexMatch}'\\)\\]\\(${variableMatch}\\('${hexMatch}'\\)\\);` +
                `\\}`
            );

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/block-scope-is-program-node.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t add dead code in block statements with `ProgramNode` block scope', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('Variant #9 - correct obfuscation of dead-code block statements', () => {
            const variableName: string = 'importantVariableName';

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/obfuscation-of-dead-code-block-statements.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1,
                        debugProtection: true
                    }
                ).getObfuscatedCode();
            });

            it('should correctly obfuscate dead-code block statements and prevent any exposing of internal variable names', () => {
                assert.notInclude(obfuscatedCode, variableName);
            });
        });

        describe('Variant #10 - unique names for dead code identifiers', () => {
            /**
             * Code:
             *
             * (function(variable){
             *   function foo () {
             *      return variable.push(1);
             *   }
             *
             *   function bar () {
             *      var variable = 1;
             *   }
             *
             *   function baz() {
             *      var variable = 2;
             *   }
             *
             *   function bark() {
             *      var variable = 3;
             *   }
             *
             *   function hawk() {
             *      var variable = 4;
             *   }
             * })([]);
             *
             * With this code, dead code can be added to the first function `foo`
             * If dead code won't be renamed before add - identifier name inside dead code block statement can be
             * the same as identifier name inside transformed block statement:
             *
             * (function(variable){
             *   function foo () {
             *      if (1 !== 1) {
             *          var variable = 1; // <- overwriting value of function parameter
             *      } else {
             *          return variable.push(1);
             *      }
             *   }
             *
             *   function bar () {
             *      var variable = 1;
             *   }
             *
             *   function baz() {
             *      var variable = 2;
             *   }
             *
             *   function bark() {
             *      var variable = 3;
             *   }
             *
             *   function hawk() {
             *      var variable = 4;
             *   }
             * })([]);
             *
             * So, added dead code variable declaration will overwrite a value of function parameter.
             * This should never happen.
             */
            describe('Variant #1', () => {
                const functionParameterMatch: string = `` +
                    `\\(function\\((\\w)\\){` +
                ``;
                const deadCodeMatch: string = `` +
                    `function \\w *\\(\\w\\) *{` +
                        `if *\\(.{0,30}\\) *{` +
                            `var *(\\w).*?;` +
                        `} *else *{` +
                            `return *(\\w).*?;` +
                        `}` +
                    `}` +
                ``;
                const functionParameterRegExp: RegExp = new RegExp(functionParameterMatch);
                const deadCodeRegExp: RegExp = new RegExp(deadCodeMatch);

                let result: boolean = false,
                    functionIdentifierName: string | null,
                    returnIdentifierName: string | null,
                    variableDeclarationIdentifierName: string | null,
                    obfuscatedCode: string;


                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/unique-names-for-dead-code-identifiers.js');

                    for (let i: number = 0; i < 100; i++) {
                        while (true) {
                            try {

                                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                    code,
                                    {
                                        ...NO_ADDITIONAL_NODES_PRESET,
                                        deadCodeInjection: true,
                                        deadCodeInjectionThreshold: 1,
                                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                                    }
                                ).getObfuscatedCode();
                                functionIdentifierName = getRegExpMatch(obfuscatedCode, functionParameterRegExp, 0);
                                variableDeclarationIdentifierName = getRegExpMatch(obfuscatedCode, deadCodeRegExp, 0);
                                returnIdentifierName = getRegExpMatch(obfuscatedCode, deadCodeRegExp, 1);
                                break;
                            } catch {}
                        }

                        if (
                            // variable declaration from dead code is affects original code
                            functionIdentifierName === variableDeclarationIdentifierName &&
                            returnIdentifierName === variableDeclarationIdentifierName
                        ) {
                            result = false;
                            break;
                        }

                        result = true;
                    }
                });

                it('should generate separate identifiers for common AST and dead code', () => {
                    assert.isOk(result, 'wrong identifier names');
                });
            });

            describe('Variant #2', () => {
                const functionParameterMatch: string = `` +
                    `\\(function\\((\\w)\\){` +
                ``;
                const deadCodeMatch: string = `` +
                    `function \\w *\\(\\w\\) *{` +
                        `if *\\(.{0,30}\\) *{` +
                            `return *(\\w).{0,40};` +
                        `} *else *{` +
                            `var *(\\w).*?;` +
                        `}` +
                    `}` +
                ``;
                const functionParameterRegExp: RegExp = new RegExp(functionParameterMatch);
                const deadCodeRegExp: RegExp = new RegExp(deadCodeMatch);

                let result: boolean = false,
                    functionIdentifierName: string | null,
                    returnIdentifierName: string | null,
                    variableDeclarationIdentifierName: string | null,
                    obfuscatedCode: string;


                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/unique-names-for-dead-code-identifiers.js');

                    for (let i: number = 0; i < 100; i++) {
                        while (true) {
                            try {

                                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                                    code,
                                    {
                                        ...NO_ADDITIONAL_NODES_PRESET,
                                        deadCodeInjection: true,
                                        deadCodeInjectionThreshold: 1,
                                        identifierNamesGenerator: IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                                    }
                                ).getObfuscatedCode();
                                functionIdentifierName = getRegExpMatch(obfuscatedCode, functionParameterRegExp, 0);
                                returnIdentifierName = getRegExpMatch(obfuscatedCode, deadCodeRegExp, 0);
                                variableDeclarationIdentifierName = getRegExpMatch(obfuscatedCode, deadCodeRegExp, 1);
                                break;
                            } catch {}
                        }

                        if (
                            // variable declaration from dead code is affects original code
                            functionIdentifierName === variableDeclarationIdentifierName &&
                            returnIdentifierName === variableDeclarationIdentifierName
                        ) {
                            console.log(obfuscatedCode);
                            result = false;
                            break;
                        }

                        result = true;
                    }
                });

                it('should generate separate identifiers for common AST and dead code', () => {
                    assert.isOk(result, 'wrong identifier names');
                });
            });
        });

        describe('Variant #11 - block statements with empty body', () => {
            const regExp: RegExp = new RegExp(
                `function *${variableMatch} *\\(\\) *{ *} *` +
                `${variableMatch} *\\(\\); *`,
                'g'
            );
            const expectedMatchesLength: number = 5;

            let matchesLength: number = 0;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/block-statement-empty-body.js');

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        stringArray: true,
                        stringArrayThreshold: 1,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1
                    }
                ).getObfuscatedCode();

                const functionMatches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(regExp);

                if (functionMatches) {
                    matchesLength = functionMatches.length;
                }
            });

            it('shouldn\'t add dead code conditions to the block empty block statements', () => {
                assert.isAtLeast(matchesLength, expectedMatchesLength);
            });
        });

        describe('Variant #12 - block statement with scope-hoisting', () => {
            describe('Variant #1: collecting of block statements', () => {
                const regExp: RegExp = new RegExp(
                    `${variableMatch} *\\(\\); *` +
                    `var *${variableMatch} *= *0x2; *` +
                    `function *${variableMatch} *\\(\\) *{ *} *`,
                    'g'
                );
                const expectedMatchesLength: number = 5;

                let matchesLength: number = 0;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/block-statement-with-scope-hoisting-1.js');

                    const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            deadCodeInjection: true,
                            deadCodeInjectionThreshold: 1
                        }
                    ).getObfuscatedCode();

                    const functionMatches: RegExpMatchArray = <RegExpMatchArray>obfuscatedCode.match(regExp);

                    if (functionMatches) {
                        matchesLength = functionMatches.length;
                    }
                });

                it('shouldn\'t collect block statements with scope-hoisting', () => {
                    assert.equal(matchesLength, expectedMatchesLength);
                });
            });

            describe('Variant #2: wrapping of block statements in dead code conditions', () => {
                const regExp: RegExp = new RegExp(
                    `function *${variableMatch} *\\(\\) *{ *` +
                        `var *${variableMatch} *= *0x1; *` +
                        `${variableMatch} *\\(\\); *` +
                        `var *${variableMatch} *= *0x2; *` +
                        `function *${variableMatch} *\\(\\) *{ *} *` +
                        `var *${variableMatch} *= *0x3; *` +
                    `}`,
                    'g'
                );

                let obfuscatedCode: string;

                before(() => {
                    const code: string = readFileAsString(__dirname + '/fixtures/block-statement-with-scope-hoisting-2.js');

                    obfuscatedCode = JavaScriptObfuscator.obfuscate(
                        code,
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            stringArray: true,
                            stringArrayThreshold: 1,
                            deadCodeInjection: true,
                            deadCodeInjectionThreshold: 1
                        }
                    ).getObfuscatedCode();
                });

                it('shouldn\'t wrap block statements in dead code conditions', () => {
                    assert.match(obfuscatedCode, regExp);
                });
            });
        });
    });
});
