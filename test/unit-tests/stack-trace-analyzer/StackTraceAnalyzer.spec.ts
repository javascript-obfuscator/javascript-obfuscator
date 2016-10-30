import * as chai from 'chai';

import { StackTraceAnalyzer } from '../../../src/stack-trace-analyzer/StackTraceAnalyzer';

const assert: any = chai.assert;

describe('StackTraceAnalyzer', () => {
    describe('getLimitIndex (blockScopeBodyLength: number): number', () => {
        it('should returns correct limit index based on block scope body length', () => {
            const blockScopeBodyLength1: number = 100;
            const blockScopeBodyLength2: number = 22;
            const blockScopeBodyLength3: number = 26;
            const blockScopeBodyLength4: number = 28;
            const blockScopeBodyLength5: number = 34;

            assert.equal(StackTraceAnalyzer.getLimitIndex(blockScopeBodyLength1), 34);
            assert.equal(StackTraceAnalyzer.getLimitIndex(blockScopeBodyLength2), 21);
            assert.equal(StackTraceAnalyzer.getLimitIndex(blockScopeBodyLength3), 25);
            assert.equal(StackTraceAnalyzer.getLimitIndex(blockScopeBodyLength4), 27);
            assert.equal(StackTraceAnalyzer.getLimitIndex(blockScopeBodyLength5), 27);
        });
    });
});
