import { assert } from 'chai';

import { evaluateInWorker } from '../helpers/evaluateInWorker';

import { JavaScriptObfuscator } from '../../src/JavaScriptObfuscatorFacade';

describe('SelfDefending runtime performance', function () {
    const reserializingEngineSimulation: string =
        '(function () {' +
            'var nativeToString = Function.prototype.toString;' +
            'Function.prototype.toString = function () {' +
                'return nativeToString.apply(this, arguments).replace(/([{;])/g, "$1\\n ");' +
            '};' +
        '})();\n';

    const runtimeBudget: number = 5000;

    let obfuscatedCode: string,
        elapsed: number = runtimeBudget,
        evaluationResult: number = 0;

    this.timeout(30000);

    before(() => {
        const code: string = 'globalThis.selfDefendingResult = (function () { return 1; })();';

        obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
            compact: true,
            selfDefending: true,
            stringArray: false,
            target: 'node'
        }).getObfuscatedCode();
        obfuscatedCode = `${reserializingEngineSimulation}${obfuscatedCode};globalThis.selfDefendingResult;`;

        const startTime: number = Date.now();

        return evaluateInWorker(obfuscatedCode, runtimeBudget).then((result: string | null) => {
            elapsed = Date.now() - startTime;

            if (!result) {
                return;
            }

            evaluationResult = parseInt(result, 10);
        });
    });

    it('should skip the beautifier trap and evaluate correctly (not hang) on a re-serializing engine', () => {
        assert.equal(evaluationResult, 1);
    });

    it('should evaluate well under the ReDoS-trap runtime budget', () => {
        assert.isBelow(elapsed, runtimeBudget);
    });
});
