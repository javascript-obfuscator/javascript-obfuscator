import { assert } from 'chai';

import { IObfuscationResult } from '../../../../../src/interfaces/IObfuscationResult';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { readFileAsString } from '../../../../helpers/readFileAsString';

import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';
import { getRegExpMatch } from '../../../../helpers/getRegExpMatch';

describe('AstToEvalCallExpressionTransformer', () => {
    describe('variant #1: identifier reference', () => {
        const functionIdentifierRegExp: RegExp = /function *_0x(?:[a-f0-9]){4,6} *\((_0x(?:[a-f0-9]){4,6})\)/;
        const variableReferenceIdentifierRegExp: RegExp = /eval *\('(_0x(?:[a-f0-9]){4,6});'\);/;

        let functionIdentifierName: string | null,
            obfuscatedCode: string,
            variableReferenceIdentifierName: string | null;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/identifier-reference.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();

            functionIdentifierName = getRegExpMatch(obfuscatedCode, functionIdentifierRegExp);
            variableReferenceIdentifierName = getRegExpMatch(obfuscatedCode, variableReferenceIdentifierRegExp);
        });

        it('should obfuscate eval string', () => {
            assert.match(obfuscatedCode, variableReferenceIdentifierRegExp);
        });

        it('should correctly transform function parameter inside eval expression', () => {
            assert.equal(functionIdentifierName, variableReferenceIdentifierName);
        });
    });

    describe('variant #2: call expression with identifier reference', () => {
        const functionIdentifierRegExp: RegExp = /function *_0x(?:[a-f0-9]){4,6} *\((_0x(?:[a-f0-9]){4,6})\)/;
        const variableReferenceIdentifierRegExp: RegExp = /eval *\('console\[\\'log\\']\((_0x(?:[a-f0-9]){4,6})\);'\);/;

        let functionIdentifierName: string | null,
            obfuscatedCode: string,
            variableReferenceIdentifierName: string | null;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/call-expression-identifier-reference.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();

            functionIdentifierName = getRegExpMatch(obfuscatedCode, functionIdentifierRegExp);
            variableReferenceIdentifierName = getRegExpMatch(obfuscatedCode, variableReferenceIdentifierRegExp);
        });

        it('should obfuscate eval string', () => {
            assert.match(obfuscatedCode, variableReferenceIdentifierRegExp);
        });

        it('should correctly transform function parameter inside eval expression', () => {
            assert.equal(functionIdentifierName, variableReferenceIdentifierName);
        });
    });

    describe('variant #3: multiple statements in eval', () => {
        const regExp: RegExp = /eval *\('_0x([a-f0-9]){4,6}; *\\n_0x([a-f0-9]){4,6};'\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/multiple-statements-eval.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should obfuscate eval string', () => {
            assert.match(obfuscatedCode, regExp);
        });
    });

    describe('variant #4: string array calls wrapper call', () => {
        const stringArrayRegExp: RegExp = /var *_0x([a-f0-9]){4} *= *\['log', *'bar'];/;
        const stringArrayCallsWrapperRegExp: RegExp = /eval *\('console\[_0x([a-f0-9]){4,6}\(\\'0x0\\'\)]\(_0x([a-f0-9]){4,6}\(\\'0x1\\'\)\);'\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/string-array-calls-wrapper-call.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    stringArray: true,
                    stringArrayThreshold: 1
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('match #1: should add strings from eval expression to the string array', () => {
            assert.match(obfuscatedCode, stringArrayRegExp);
        });

        it('match #1: should replace string with call to the string array calls wrapper', () => {
            assert.match(obfuscatedCode, stringArrayCallsWrapperRegExp);
        });
    });

    describe('variant #5: eval expression as argument', () => {
        const functionIdentifierRegExp: RegExp = /function *_0x(?:[a-f0-9]){4,6} *\((_0x(?:[a-f0-9]){4,6})\)/;
        const variableReferenceIdentifierRegExp: RegExp = /console\['log']\(eval *\('(_0x(?:[a-f0-9]){4,6});'\)\);/;

        let functionIdentifierName: string | null,
            obfuscatedCode: string,
            variableReferenceIdentifierName: string | null;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/eval-expression-as-argument.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();

            functionIdentifierName = getRegExpMatch(obfuscatedCode, functionIdentifierRegExp);
            variableReferenceIdentifierName = getRegExpMatch(obfuscatedCode, variableReferenceIdentifierRegExp);
        });

        it('should obfuscate eval string', () => {
            assert.match(obfuscatedCode, variableReferenceIdentifierRegExp);
        });

        it('should correctly transform function parameter inside eval expression', () => {
            assert.equal(functionIdentifierName, variableReferenceIdentifierName);
        });
    });

    describe('variant #6: integration with control flow flattening', () => {
        const variableMatch: string = '_0x([a-f0-9]){4,6}';
        const controlFlowStorageNodeMatch: string = `` +
            `var *${variableMatch} *= *\\{` +
                `'\\w{5}' *: *function *${variableMatch} *\\(${variableMatch}, *${variableMatch}\\) *\\{` +
                    `return *${variableMatch} *\\+ *${variableMatch};` +
                `\\}` +
            `\\};` +
        ``;
        const controlFlowStorageNodeRegExp: RegExp = new RegExp(controlFlowStorageNodeMatch);
        const evalExpressionRegExp: RegExp = /eval *\('_0x([a-f0-9]){4,6}\[\\'\w{5}\\']\(_0x([a-f0-9]){4,6}, *_0x([a-f0-9]){4,6}\);'\);/;

        let obfuscatedCode: string;

        before(() => {
            const code: string = readFileAsString(__dirname + '/fixtures/control-flow-flattening-integration.js');
            const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                code,
                {
                    ...NO_ADDITIONAL_NODES_PRESET,
                    controlFlowFlattening: true,
                    controlFlowFlatteningThreshold: 1
                }
            );

            obfuscatedCode = obfuscationResult.getObfuscatedCode();
        });

        it('should add control flow storage node', () => {
            assert.match(obfuscatedCode, controlFlowStorageNodeRegExp);
        });

        it('should obfuscate eval string', () => {
            assert.match(obfuscatedCode, evalExpressionRegExp);
        });
    });
});
