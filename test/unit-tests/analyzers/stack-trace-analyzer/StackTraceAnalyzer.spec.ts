import { assert } from 'chai';

import { StackTraceAnalyzer } from '../../../../src/analyzers/stack-trace-analyzer/StackTraceAnalyzer';

describe('StackTraceAnalyzer', () => {
    describe('getLimitIndex', () => {
        let limitIndex: number;

        describe('Variant #1: length - 10000', () => {
            const blockScopeBodyLength: number = 10000;
            const expectedLimitIndex: number = 44;

            before(() => {
                limitIndex = StackTraceAnalyzer.getLimitIndex(blockScopeBodyLength);
            });

            it('should return correct limit index based on block scope body length', () => {
                assert.equal(limitIndex, expectedLimitIndex);
            });
        });

        describe('Variant #2: length - 1000', () => {
            const blockScopeBodyLength: number = 1000;
            const expectedLimitIndex: number = 26;

            before(() => {
                limitIndex = StackTraceAnalyzer.getLimitIndex(blockScopeBodyLength);
            });

            it('should return correct limit index based on block scope body length', () => {
                assert.equal(limitIndex, expectedLimitIndex);
            });
        });

        describe('Variant #3: length - 25', () => {
            const blockScopeBodyLength: number = 25;
            const expectedLimitIndex: number = 24;

            before(() => {
                limitIndex = StackTraceAnalyzer.getLimitIndex(blockScopeBodyLength);
            });

            it('should return correct limit index based on block scope body length', () => {
                assert.equal(limitIndex, expectedLimitIndex);
            });
        });

        describe('Variant #4: length - 5', () => {
            const blockScopeBodyLength: number = 5;
            const expectedLimitIndex: number = 4;

            before(() => {
                limitIndex = StackTraceAnalyzer.getLimitIndex(blockScopeBodyLength);
            });

            it('should return correct limit index based on block scope body length', () => {
                assert.equal(limitIndex, expectedLimitIndex);
            });
        });
    });
});
