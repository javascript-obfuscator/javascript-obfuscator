import { assert } from 'chai';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';
import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';

describe('EvalCallExpressionTransformer', () => {
    describe('Variant #1: identifier reference', () => {
        const functionIdentifierRegExp: RegExp = /function *_0x(?:[a-f0-9]){4,6} *\((_0x(?:[a-f0-9]){4,6})\)/;
        const evalExpressionRegExp: RegExp = /eval *\('(_0x(?:[a-f0-9]){4,6});'\);/;

        let functionIdentifierName: string | null,
            obfuscatedCode: string,
            variableReferenceIdentifierName: string | null;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/identifier-reference.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();

            functionIdentifierName = getRegExpMatch(obfuscatedCode, functionIdentifierRegExp);
            variableReferenceIdentifierName = getRegExpMatch(obfuscatedCode, evalExpressionRegExp);
        });

        it('should obfuscate eval string', () => {
            assert.match(obfuscatedCode, evalExpressionRegExp);
        });

        it('should correctly transform function parameter inside eval expression', () => {
            assert.equal(functionIdentifierName, variableReferenceIdentifierName);
        });
    });

    describe('Variant #2: call expression with identifier reference', () => {
        const functionIdentifierRegExp: RegExp = /function *_0x(?:[a-f0-9]){4,6} *\((_0x(?:[a-f0-9]){4,6})\)/;
        const evalExpressionRegExp: RegExp = /eval *\('console\[\\'log\\']\((_0x(?:[a-f0-9]){4,6})\);'\);/;

        let functionIdentifierName: string | null,
            obfuscatedCode: string,
            variableReferenceIdentifierName: string | null;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/call-expression-identifier-reference.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();

            functionIdentifierName = getRegExpMatch(obfuscatedCode, functionIdentifierRegExp);
            variableReferenceIdentifierName = getRegExpMatch(obfuscatedCode, evalExpressionRegExp);
        });

        it('should obfuscate eval string', () => {
            assert.match(obfuscatedCode, evalExpressionRegExp);
        });

        it('should correctly transform function parameter inside eval expression', () => {
            assert.equal(functionIdentifierName, variableReferenceIdentifierName);
        });
    });

    describe('Variant #3: multiple statements in eval', () => {
        const regExp: RegExp = /eval *\('_0x([a-f0-9]){4,6}; *_0x([a-f0-9]){4,6};'\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/multiple-statements-eval.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('should obfuscate eval string', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('Variant #4: string array calls wrapper call', () => {
        const stringArrayRegExp: RegExp = /var *_0x([a-f0-9]){4} *= *\['log', *'bar'];/;
        const stringArrayCallsWrapperRegExp: RegExp = /eval *\('console\[_0x([a-f0-9]){4,6}\(\\'0x0\\'\)]\(_0x([a-f0-9]){4,6}\(\\'0x1\\'\)\);'\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/string-array-calls-wrapper-call.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('match #1: should add strings from eval expression to the string array', () => {
            assert.match(obfuscatedCode, stringArrayRegExp);
        });

        it('match #1: should replace string with call to the string array calls wrapper', () => {
            assert.match(obfuscatedCode, stringArrayCallsWrapperRegExp);
        });
    });

    describe('Variant #5: eval expression as argument', () => {
        const functionIdentifierRegExp: RegExp = /function *_0x(?:[a-f0-9]){4,6} *\((_0x(?:[a-f0-9]){4,6})\)/;
        const evalExpressionRegExp: RegExp = /console\['log']\(eval *\('(_0x(?:[a-f0-9]){4,6});'\)\);/;

        let functionIdentifierName: string | null,
            obfuscatedCode: string,
            variableReferenceIdentifierName: string | null;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/eval-expression-as-argument.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();

            functionIdentifierName = getRegExpMatch(obfuscatedCode, functionIdentifierRegExp);
            variableReferenceIdentifierName = getRegExpMatch(obfuscatedCode, evalExpressionRegExp);
        });

        it('should obfuscate eval string', () => {
            assert.match(obfuscatedCode, evalExpressionRegExp);
        });

        it('should correctly transform function parameter inside eval expression', () => {
            assert.equal(functionIdentifierName, variableReferenceIdentifierName);
        });
    });

    describe('Variant #6: nested eval expressions', () => {
        const functionIdentifierRegExp: RegExp = /function *_0x(?:[a-f0-9]){4,6} *\((_0x(?:[a-f0-9]){4,6}), *(_0x(?:[a-f0-9]){4,6})\)/;
        const evalExpressionMatch: string = `` +
            `eval *\\('` +
                `var *(_0x(?:[a-f0-9]){4,6}) *= *(_0x(?:[a-f0-9]){4,6}) *\\+ *(_0x(?:[a-f0-9]){4,6});` +
                `eval\\(\\\\'` +
                    `(_0x(?:[a-f0-9]){4,6}) *\\+ *(_0x(?:[a-f0-9]){4,6});` +
                `\\\\'\\);` +
            `'\\);` +
        ``;
        const evalExpressionRegExp: RegExp = new RegExp(evalExpressionMatch);
        const expectedEvaluationResult: number = 4;

        let evaluationResult: number,
            functionIdentifierAName: string | null,
            functionIdentifierBName: string | null,
            obfuscatedCode: string,
            variableReferenceIdentifierAName1: string | null,
            variableReferenceIdentifierAName2: string | null,
            variableReferenceIdentifierBName: string | null,
            variableReferenceIdentifierCName1: string | null,
            variableReferenceIdentifierCName2: string | null;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/nested-eval-expressions.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();

            functionIdentifierAName = getRegExpMatch(obfuscatedCode, functionIdentifierRegExp, 0);
            functionIdentifierBName = getRegExpMatch(obfuscatedCode, functionIdentifierRegExp, 1);

            // parameter `a` reference inside parent eval expression
            variableReferenceIdentifierAName1 = getRegExpMatch(obfuscatedCode, evalExpressionRegExp, 1);
            // parameter `a` reference inside nested eval expression
            variableReferenceIdentifierAName2 = getRegExpMatch(obfuscatedCode, evalExpressionRegExp, 3);
            // parameter `b` reference inside parent eval expression
            variableReferenceIdentifierBName = getRegExpMatch(obfuscatedCode, evalExpressionRegExp, 2);
            // variable declaration `c` inside parent eval expression
            variableReferenceIdentifierCName1 = getRegExpMatch(obfuscatedCode, evalExpressionRegExp, 0);
            // variable `c` reference inside nested eval expression
            variableReferenceIdentifierCName2 = getRegExpMatch(obfuscatedCode, evalExpressionRegExp, 4);

            evaluationResult = eval(obfuscatedCode);
        });

        it('should obfuscate eval string', () => {
            assert.match(obfuscatedCode, evalExpressionRegExp);
        });

        it('should generate correct code', () => {
            assert.equal(evaluationResult, expectedEvaluationResult);
        });

        it('match #1: should correctly transform function parameter `a` inside eval expression', () => {
            assert.equal(functionIdentifierAName, variableReferenceIdentifierAName1);
        });

        it('match #2: should correctly transform function parameter `a` inside nested eval expression', () => {
            assert.equal(functionIdentifierAName, variableReferenceIdentifierAName2);
        });

        it('match #3: should correctly transform function parameter `b` inside eval expression', () => {
            assert.equal(functionIdentifierBName, variableReferenceIdentifierBName);
        });

        it('match #4: should correctly transform variable declaration and variable reference inside eval and nested eval expressions', () => {
            assert.equal(variableReferenceIdentifierCName1, variableReferenceIdentifierCName2);
        });
    });

    describe('Variant #7: wrong eval string', () => {
        const evalExpressionRegExp: RegExp = /eval *\('~'\);/;

        let obfuscatedCode: string

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/wrong-eval-string.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();
        });

        it('should skip obfuscation of eval string', () => {
            assert.match(obfuscatedCode, evalExpressionRegExp);
        });
    });

    describe('Variant #8: template literal inside eval expression', () => {
        const functionIdentifierRegExp: RegExp = /function *_0x(?:[a-f0-9]){4,6} *\((_0x(?:[a-f0-9]){4,6})\)/;
        const evalExpressionRegExp: RegExp = /eval *\('(_0x(?:[a-f0-9]){4,6});'\);/;

        let functionIdentifierName: string | null,
            obfuscatedCode: string,
            variableReferenceIdentifierName: string | null;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/eval-expression-template-literal.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            ).getObfuscatedCode();

            functionIdentifierName = getRegExpMatch(obfuscatedCode, functionIdentifierRegExp);
            variableReferenceIdentifierName = getRegExpMatch(obfuscatedCode, evalExpressionRegExp);
        });

        it('should obfuscate eval string', () => {
            assert.match(obfuscatedCode, evalExpressionRegExp);
        });

        it('should correctly transform function parameter inside eval expression', () => {
            assert.equal(functionIdentifierName, variableReferenceIdentifierName);
        });
    });

    describe('Variant #9: integration with control flow flattening', () => {
        const variableMatch: string = '_0x([a-f0-9]){4,6}';
        const controlFlowStorageNodeMatch: string = `` +
            `var *${variableMatch} *= *\\{` +
                `'\\w{5}' *: *function *\\(${variableMatch}, *${variableMatch}\\) *\\{` +
                    `return *${variableMatch} *\\+ *${variableMatch};` +
                `\\}` +
            `\\};` +
        ``;
        const controlFlowStorageNodeRegExp: RegExp = new RegExp(controlFlowStorageNodeMatch);
        const evalExpressionRegExp: RegExp = /eval *\('_0x([a-f0-9]){4,6}\[\\'\w{5}\\']\(_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}\);'\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/control-flow-flattening-integration.js');

            obfuscatedCode = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1
                }
            ).getObfuscatedCode();
        });

        it('should add control flow storage node', () => {
            assert.match(obfuscatedCode, controlFlowStorageNodeRegExp);
        });

        it('should obfuscate eval string', () => {
            assert.match(obfuscatedCode, evalExpressionRegExp);
        });
    });
});
