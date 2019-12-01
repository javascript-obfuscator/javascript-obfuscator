import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';
import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';

/**
 * @param hexNumber
 * @return {RegExp}
 */
const getStatementRegExp: (hexNumber: string) => RegExp = (hexNumber) => {
    return new RegExp(`console\\['log'\\]\\(${hexNumber}\\);`);
};

describe('BlockStatementControlFlowTransformer', function () {
    this.timeout(100000);

    describe('transformNode', () => {
        describe('Variant #1: 5 simple statements', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            describe('`console.log` statements', ()=> {
                const statementRegExp1: RegExp = getStatementRegExp('0x1');
                const statementRegExp2: RegExp = getStatementRegExp('0x2');
                const statementRegExp3: RegExp = getStatementRegExp('0x3');
                const statementRegExp4: RegExp = getStatementRegExp('0x4');
                const statementRegExp5: RegExp = getStatementRegExp('0x5');

                it('should save statement', () => {
                    assert.match(obfuscatedCode, statementRegExp1);
                });

                it('should save statement', () => {
                    assert.match(obfuscatedCode, statementRegExp2);
                });

                it('should save statement', () => {
                    assert.match(obfuscatedCode, statementRegExp3);
                });

                it('should save statement', () => {
                    assert.match(obfuscatedCode, statementRegExp4);
                });

                it('should save statement', () => {
                    assert.match(obfuscatedCode, statementRegExp5);
                });
            });

            describe('block statement statements', () => {
                const switchCaseRegExp: RegExp = /switch *\(_0x([a-f0-9]){4,6}\[_0x([a-f0-9]){4,6}\+\+\]\) *\{/;
                const switchCaseLengthRegExp: RegExp = /case *'[0-5]': *console\['log'\]\(0x[0-6]\);/g;
                const expectedSwitchCaseLength: number = 5;

                let switchCaseLength: number;

                before(() => {
                    switchCaseLength = obfuscatedCode.match(switchCaseLengthRegExp)!.length;
                });

                it('should wrap block statement statements in switch-case structure', () => {
                    assert.match(obfuscatedCode, switchCaseRegExp);
                });

                it('each statement should be wrapped by switch-case structure', () => {
                    assert.equal(switchCaseLength, expectedSwitchCaseLength);
                });
            });

            describe('switch-case map', () => {
                const switchCaseMapVariableRegExp: RegExp = /var *_0x(?:[a-f0-9]){4,6} *= *_0x(?:[a-f0-9]){4,6}\['.*'\]\['split'\]\('\|'\)/;
                const switchCaseMapStringRegExp: RegExp = /var *_0x(?:[a-f0-9]){4,6} *= *\{'.*' *: *'(.*)'\};/;
                const expectedSwitchCasesSequence: string[] = ['0', '1', '2', '3', '4'];

                let switchCaseMap: string[];

                before(() => {
                    const switchCaseMapMatch: string = getRegExpMatch(obfuscatedCode, switchCaseMapStringRegExp);

                    switchCaseMap = switchCaseMapMatch.split('|').sort();
                });

                it('should create switch-case map variable', () => {
                    assert.match(obfuscatedCode, switchCaseMapVariableRegExp);
                });

                it('should create valid switch-case map variable with order of switch cases sequence', () => {
                    assert.deepEqual(switchCaseMap, expectedSwitchCasesSequence);
                });
            });
        });

        describe('Variant #2: 5 simple statements inside while loop without break or continue statement', () => {
            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input-2.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1,
                        unicodeEscapeSequence: false
                    }
                ).getObfuscatedCode();
            });

            describe('`console.log` statements', ()=> {
                const statementRegExp1: RegExp = getStatementRegExp('0x1');
                const statementRegExp2: RegExp = getStatementRegExp('0x2');
                const statementRegExp3: RegExp = getStatementRegExp('0x3');
                const statementRegExp4: RegExp = getStatementRegExp('0x4');
                const statementRegExp5: RegExp = getStatementRegExp('0x5');

                it('should save statement', () => {
                    assert.match(obfuscatedCode, statementRegExp1);
                });

                it('should save statement', () => {
                    assert.match(obfuscatedCode, statementRegExp2);
                });

                it('should save statement', () => {
                    assert.match(obfuscatedCode, statementRegExp3);
                });

                it('should save statement', () => {
                    assert.match(obfuscatedCode, statementRegExp4);
                });

                it('should save statement', () => {
                    assert.match(obfuscatedCode, statementRegExp5);
                });
            });

            describe('block statement statements', () => {
                const switchCaseRegExp: RegExp = /switch *\(_0x([a-f0-9]){4,6}\[_0x([a-f0-9]){4,6}\+\+\]\) *\{/;
                const switchCaseLengthRegExp: RegExp = /case *'[0-5]': *console\['log'\]\(0x[0-6]\);/g;
                const expectedSwitchCaseLength: number = 5;

                let switchCaseLength: number;

                before(() => {
                    switchCaseLength = obfuscatedCode.match(switchCaseLengthRegExp)!.length;
                });

                it('should wrap block statement statements in switch-case structure', () => {
                    assert.match(obfuscatedCode, switchCaseRegExp);
                });

                it('each statement should be wrapped by switch-case structure', () => {
                    assert.equal(switchCaseLength, expectedSwitchCaseLength);
                });
            });

            describe('switch-case map', () => {
                const switchCaseMapVariableRegExp: RegExp = /var *_0x(?:[a-f0-9]){4,6} *= *_0x(?:[a-f0-9]){4,6}\['.*'\]\['split'\]\('\|'\)/;
                const switchCaseMapStringRegExp: RegExp = /var *_0x(?:[a-f0-9]){4,6} *= *\{'.*' *: *'(.*)'\};/;
                const expectedSwitchCasesSequence: string[] = ['0', '1', '2', '3', '4'];

                let switchCaseMap: string[];

                before(() => {
                    const switchCaseMapMatch: string = getRegExpMatch(obfuscatedCode, switchCaseMapStringRegExp);

                    switchCaseMap = switchCaseMapMatch.split('|').sort();
                });

                it('should create switch-case map variable', () => {
                    assert.match(obfuscatedCode, switchCaseMapVariableRegExp);
                });

                it('should create valid switch-case map variable with order of switch cases sequence', () => {
                    assert.deepEqual(switchCaseMap, expectedSwitchCasesSequence);
                });
            });
        });

        describe('Variant #3: statements length less then 5 statements', () => {
            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *console\['log'\]\(0x1\); *\} *\( *\) *\);$/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/one-statement.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform block statement', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('Variant #4: block statement contain variable declaration with `const` kind', () => {
            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *const *_0x([a-f0-9]){4,6} *= *0x1; *console\['log'\]\(0x1\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/const-declaration.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform block statement', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('Variant #5: block statement contain variable declaration with `let` kind', () => {
            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *let *_0x([a-f0-9]){4,6} *= *0x1; *console\['log'\]\(0x1\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/let-declaration.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform block statement', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('Variant #6: block statement contain break statement #1', () => {
            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *while *\(!!\[\]\) *\{ *break; *console\['log'\]\(0x1\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/break-statement-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform block statement', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('Variant #7: block statement contain break statement #2', () => {
            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *while *\(!!\[\]\) *\{ *if *\(!!\[\]\) *\{ *break; *\} *console\['log'\]\(0x1\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/break-statement-2.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform block statement', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('Variant #8: block statement contain break statement #3', () => {
            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *while *\(!!\[\]\) *\{ *if *\(!!\[\]\) *break; *console\['log'\]\(0x1\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/break-statement-3.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform block statement', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('Variant #9: block statement contain while statement with break statement', () => {
            const switchCaseRegExp: RegExp = /switch *\(_0x([a-f0-9]){4,6}\[_0x([a-f0-9]){4,6}\+\+\]\) *\{/;
            const switchCaseLengthRegExp: RegExp = /case *'[0-5]': *console\['log'\]\(0x[0-6]\);/g;
            const expectedSwitchCaseLength: number = 5;

            let obfuscatedCode: string,
                switchCaseLength: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/break-statement-inside-while-statement-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
                switchCaseLength = obfuscatedCode.match(switchCaseLengthRegExp)!.length;
            });

            it('should wrap block statement statements in switch-case structure', () => {
                assert.match(obfuscatedCode, switchCaseRegExp);
            });

            it('each statement should be wrapped by switch-case structure', () => {
                assert.equal(switchCaseLength, expectedSwitchCaseLength);
            });
        });

        describe('Variant #10: block statement contain while statement with break statement', () => {
            const switchCaseRegExp: RegExp = /switch *\(_0x([a-f0-9]){4,6}\[_0x([a-f0-9]){4,6}\+\+\]\) *\{/;
            const switchCaseLengthRegExp: RegExp = /case *'[0-5]': *console\['log'\]\(0x[0-6]\);/g;
            const expectedSwitchCaseLength: number = 5;

            let obfuscatedCode: string,
                switchCaseLength: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/break-statement-inside-while-statement-2.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
                switchCaseLength = obfuscatedCode.match(switchCaseLengthRegExp)!.length;
            });

            it('should wrap block statement statements in switch-case structure', () => {
                assert.match(obfuscatedCode, switchCaseRegExp);
            });

            it('each statement should be wrapped by switch-case structure', () => {
                assert.equal(switchCaseLength, expectedSwitchCaseLength);
            });
        });

        describe('Variant #11: block statement contain continue statement #1', () => {
            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *while *\(!!\[\]\) *\{ *continue; *console\['log'\]\(0x1\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/continue-statement-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform block statement', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('Variant #12: block statement contain continue statement #2', () => {
            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *while *\(!!\[\]\) *\{ *if *\(!!\[\]\) *\{ *continue; *\} *console\['log'\]\(0x1\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/continue-statement-2.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform block statement', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('Variant #13: block statement contain continue statement #3', () => {
            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *while *\(!!\[\]\) *\{ *if *\(!!\[\]\) *continue; *console\['log'\]\(0x1\);/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/continue-statement-3.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform block statement', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('Variant #14: block statement contain while statement with continue statement', () => {
            const switchCaseRegExp: RegExp = /switch *\(_0x([a-f0-9]){4,6}\[_0x([a-f0-9]){4,6}\+\+\]\) *\{/;
            const switchCaseLengthRegExp: RegExp = /case *'[0-5]': *console\['log'\]\(0x[0-6]\);/g;
            const expectedSwitchCaseLength: number = 5;

            let obfuscatedCode: string,
                switchCaseLength: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/continue-statement-inside-while-statement-1.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
                switchCaseLength = obfuscatedCode.match(switchCaseLengthRegExp)!.length;
            });

            it('should wrap block statement statements in switch-case structure', () => {
                assert.match(obfuscatedCode, switchCaseRegExp);
            });

            it('each statement should be wrapped by switch-case structure', () => {
                assert.equal(switchCaseLength, expectedSwitchCaseLength);
            });
        });

        describe('Variant #15: block statement contain continue statement #4', () => {
            const switchCaseRegExp: RegExp = /switch *\(_0x([a-f0-9]){4,6}\[_0x([a-f0-9]){4,6}\+\+\]\) *\{/;
            const switchCaseLengthRegExp: RegExp = /case *'[0-5]': *console\['log'\]\(0x[0-6]\);/g;
            const expectedSwitchCaseLength: number = 5;

            let obfuscatedCode: string,
                switchCaseLength: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/continue-statement-inside-while-statement-2.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
                switchCaseLength = obfuscatedCode.match(switchCaseLengthRegExp)!.length;
            });

            it('should wrap block statement statements in switch-case structure', () => {
                assert.match(obfuscatedCode, switchCaseRegExp);
            });

            it('each statement should be wrapped by switch-case structure', () => {
                assert.equal(switchCaseLength, expectedSwitchCaseLength);
            });
        });

        describe('Variant #16: block statement contain function declaration', () => {
            const statementRegExp: RegExp = /^\(function *\( *\) *\{ *function *_0x([a-f0-9]){4,6} *\( *\) *\{ *\} *console\['log'\]\(0x1\);/

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/function-declaration.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform block statement', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('Variant #17: block statement contain class declaration', () => {
            const statementRegExp: RegExp = /^\(function *\( *\) *{ * *class *_0x([a-f0-9]){4,6} *{.*?} *}.*class *_0x([a-f0-9]){4,6} *{.*?} *}.*class *_0x([a-f0-9]){4,6} *{.*?} *}/;

            let obfuscatedCode: string;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/class-declaration.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
            });

            it('shouldn\'t transform block statement', () => {
                assert.match(obfuscatedCode, statementRegExp);
            });
        });

        describe('Variant #18: `controlFlowFlatteningThreshold` chance', () => {
            const samples: number = 1000;
            const delta: number = 0.1;

            const controlFlowFlatteningThreshold: number = 0.5;

            const regExp1: RegExp = /switch *\(_0x([a-f0-9]){4,6}\[_0x([a-f0-9]){4,6}\+\+\]\) *\{/g;
            const regExp2: RegExp = /\(function *\( *\) *\{ *console\['log'\]\(0x1\);/g;

            let transformedStatementPercentage: number,
                untouchedStatementPercentage: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/input-1.js');

                const obfuscatedCode: string = JavaScriptObfuscator.obfuscate(
                    code.repeat(samples),
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: controlFlowFlatteningThreshold,
                    }
                ).getObfuscatedCode();

                const transformedStatementMatchesLength: number = obfuscatedCode
                    .match(regExp1)!
                    .length;
                const untouchedStatementMatchesLength: number = obfuscatedCode
                    .match(regExp2)!
                    .length;

                transformedStatementPercentage = transformedStatementMatchesLength / samples;
                untouchedStatementPercentage = untouchedStatementMatchesLength / samples;
            });

            it('should transform block statement with `controlFlowFlatteningThreshold` chance', () => {
                assert.closeTo(transformedStatementPercentage, controlFlowFlatteningThreshold, delta);
            });

            it('should keep block statement with (1 - `controlFlowFlatteningThreshold`) chance', () => {
                assert.closeTo(untouchedStatementPercentage, controlFlowFlatteningThreshold, delta);
            });
        });

        describe('Variant #19: No `unreachable code after return statement` warning', () => {
            const switchCaseRegExp: RegExp = /switch *\(_0x([a-f0-9]){4,6}\[_0x([a-f0-9]){4,6}\+\+\]\) *\{/;
            const switchCaseLengthRegExp: RegExp = /case *'[0-5]': *console\['log'\]\(0x[0-6]\);/g;
            const returnStatementRegExp: RegExp = /case *'[0-5]': *return; *(case|})/;
            const expectedSwitchCaseLength: number = 5;

            let obfuscatedCode: string,
                switchCaseLength: number;

            before(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/no-unreachable-code-warning.js');

                obfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1
                    }
                ).getObfuscatedCode();
                switchCaseLength = obfuscatedCode.match(switchCaseLengthRegExp)!.length;
            });

            it('should wrap block statement statements in switch-case structure', () => {
                assert.match(obfuscatedCode, switchCaseRegExp);
            });

            it('each statement should be wrapped by switch-case structure', () => {
                assert.equal(switchCaseLength, expectedSwitchCaseLength);
            });

            it('should not add `continue` statement after `return` statement', () => {
                assert.match(obfuscatedCode, returnStatementRegExp);
            });
        });
    });
});
