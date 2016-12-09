import { assert } from 'chai';

import { StackTraceAnalyzer } from '../../../src/stack-trace-analyzer/StackTraceAnalyzer';

describe('StackTraceAnalyzer', () => {
    describe('getLimitIndex (blockScopeBodyLength: number): number', () => {
        it('should returns correct limit index based on block scope body length', () => {
            const blockScopeBodyLength1: number = 10000;
            const blockScopeBodyLength2: number = 1000;
            const blockScopeBodyLength3: number = 25;
            const blockScopeBodyLength4: number = 5;

            assert.equal(StackTraceAnalyzer.getLimitIndex(blockScopeBodyLength1), 44);
            assert.equal(StackTraceAnalyzer.getLimitIndex(blockScopeBodyLength2), 26);
            assert.equal(StackTraceAnalyzer.getLimitIndex(blockScopeBodyLength3), 24);
            assert.equal(StackTraceAnalyzer.getLimitIndex(blockScopeBodyLength4), 4);
        });
    });
});
