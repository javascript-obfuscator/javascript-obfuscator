import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { TNumberNumericalExpressionData } from '../../../../src/types/analyzers/number-numerical-expression-analyzer/TNumberNumericalExpressionData';

import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';
import { INumberNumericalExpressionAnalyzer } from '../../../../src/interfaces/analyzers/number-numerical-expression-analyzer/INumberNumericalExpressionAnalyzer';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

/**
 * @param {TNumberNumericalExpressionData} data
 * @returns {string}
 */
const numberNumericalExpressionDataToString = (data: TNumberNumericalExpressionData) =>
    data
        .map((part: number | number[]) => Array.isArray(part) ? part.join('*') : part)
        .join('+')
        .replace(/\+-/g, '-');

describe('NumberNumericalExpressionAnalyzer', function() {
    let numberNumericalExpressionAnalyzer: INumberNumericalExpressionAnalyzer;

    this.timeout(10000);

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        numberNumericalExpressionAnalyzer = inversifyContainerFacade
            .get<INumberNumericalExpressionAnalyzer>(ServiceIdentifiers.INumberNumericalExpressionAnalyzer);
    });

    describe('analyze', () => {
        let evaluatedResult: number;

        describe('Positive numbers', () => {
            describe('Variant #1: positive number', () => {
                const number: number = 1234;

                before(() => {
                    const numberNumericalExpressionData: TNumberNumericalExpressionData =
                        numberNumericalExpressionAnalyzer.analyze(number);

                    evaluatedResult = eval(numberNumericalExpressionDataToString(numberNumericalExpressionData));
                });

                it('should return correct number numerical expression data', () => {
                    assert.equal(number, evaluatedResult);
                });
            });

            describe('Variant #2: positive zero number', () => {
                const number: number = 0;

                before(() => {
                    const numberNumericalExpressionData: TNumberNumericalExpressionData =
                        numberNumericalExpressionAnalyzer.analyze(number);

                    evaluatedResult = eval(numberNumericalExpressionDataToString(numberNumericalExpressionData));
                });

                it('should return correct number numerical expression data', () => {
                    assert.equal(number, evaluatedResult);
                });
            });

            describe('Variant #3: positive big number', () => {
                const number: number = Number.MAX_SAFE_INTEGER;

                before(() => {
                    const numberNumericalExpressionData: TNumberNumericalExpressionData =
                        numberNumericalExpressionAnalyzer.analyze(number);

                    evaluatedResult = eval(numberNumericalExpressionDataToString(numberNumericalExpressionData));
                });

                it('should return correct number numerical expression data', () => {
                    assert.equal(number, evaluatedResult);
                });
            });

            describe('Variant #4: positive unsafe big number', () => {
                const number: number = Number.MAX_SAFE_INTEGER + 1;

                before(() => {
                    const numberNumericalExpressionData: TNumberNumericalExpressionData =
                        numberNumericalExpressionAnalyzer.analyze(number);

                    evaluatedResult = eval(numberNumericalExpressionDataToString(numberNumericalExpressionData));
                });

                it('should return correct number numerical expression data', () => {
                    assert.equal(number, evaluatedResult);
                });
            });
        });

        describe('Negative numbers', () => {
            describe('Variant #1: negative number', () => {
                const number: number = -1234;

                before(() => {
                    const numberNumericalExpressionData: TNumberNumericalExpressionData =
                        numberNumericalExpressionAnalyzer.analyze(number);

                    evaluatedResult = eval(numberNumericalExpressionDataToString(numberNumericalExpressionData));
                });

                it('should return correct number numerical expression data', () => {
                    assert.equal(number, evaluatedResult);
                });
            });

            describe('Variant #2: negative zero number', () => {
                const number: number = -0;

                before(() => {
                    const numberNumericalExpressionData: TNumberNumericalExpressionData =
                        numberNumericalExpressionAnalyzer.analyze(number);

                    evaluatedResult = eval(numberNumericalExpressionDataToString(numberNumericalExpressionData));
                });

                it('should return correct number numerical expression data', () => {
                    assert.equal(number, evaluatedResult);
                });
            });

            describe('Variant #3: negative big number', () => {
                const number: number = Number.MIN_SAFE_INTEGER;

                before(() => {
                    const numberNumericalExpressionData: TNumberNumericalExpressionData =
                        numberNumericalExpressionAnalyzer.analyze(number);

                    evaluatedResult = eval(numberNumericalExpressionDataToString(numberNumericalExpressionData));
                });

                it('should return correct number numerical expression data', () => {
                    assert.equal(number, evaluatedResult);
                });
            });

            describe('Variant #4: negative unsafe number', () => {
                const number: number = Number.MIN_SAFE_INTEGER - 1;

                before(() => {
                    const numberNumericalExpressionData: TNumberNumericalExpressionData =
                        numberNumericalExpressionAnalyzer.analyze(number);

                    evaluatedResult = eval(numberNumericalExpressionDataToString(numberNumericalExpressionData));
                });

                it('should return correct number numerical expression data', () => {
                    assert.equal(number, evaluatedResult);
                });
            });
        });

        describe('NaN', () => {
            const number: number = NaN;

            let testFunc: () => void;

            before(() => {
                testFunc = () => numberNumericalExpressionAnalyzer.analyze(number);
            });

            it('should throw error', () => {
                assert.throw(testFunc, 'Given value is NaN');
            });
        });
    });
});
