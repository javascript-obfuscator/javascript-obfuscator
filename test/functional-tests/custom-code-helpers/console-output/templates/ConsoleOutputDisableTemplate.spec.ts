import 'reflect-metadata';

import format from 'string-template';

import { assert } from 'chai';
import * as sinon from 'sinon';

import { IInversifyContainerFacade } from '../../../../../src/interfaces/container/IInversifyContainerFacade';

import { ConsoleOutputDisableTemplate } from '../../../../../src/custom-code-helpers/console-output/templates/ConsoleOutputDisableTemplate';
import { GlobalVariableTemplate1 } from '../../../../../src/custom-code-helpers/common/templates/GlobalVariableTemplate1';

import { InversifyContainerFacade } from '../../../../../src/container/InversifyContainerFacade';

const consoleMethods: (keyof Console)[] = ['log', 'warn', 'info', 'error', 'table', 'trace'];

/**
 * @returns {string}
 */
const getWrongGlobalVariableTemplate: () => string = () => `
    var that = {};
`;

/**
 * @returns {string}
 */
const getUndefinedConsoleObjectGlobalVariableTemplate: () => string = () => `
    ${GlobalVariableTemplate1()}
    
    that.console = undefined;
`;

/**
 * @returns {string}
 */
const getPartialConsoleObjectGlobalVariableTemplate: () => string = () => `
    ${GlobalVariableTemplate1()}
    
    that.console = {
        log: that.console.log
    };
`;

/**
 * @param templateData
 * @param {string} callsControllerFunctionName
 * @param {string} consoleMethod
 * @returns {Function}
 */
function getFunctionFromTemplate (
    templateData: any,
    callsControllerFunctionName: string,
    consoleMethod: keyof Console
): Function {
    const formattedTemplate: string = format(ConsoleOutputDisableTemplate(), templateData);

    return Function(`
        var ${callsControllerFunctionName} = (function(){            
            return function (context, fn){	
                return function () {
                    return fn.apply(context, arguments);
                };
            }
        })();
        
        ${formattedTemplate}

        console.${consoleMethod}(1);
        console.${consoleMethod}.toString();
    `);
}

describe('ConsoleOutputDisableTemplate', () => {
    const callControllerFunctionName: string = 'callsController';
    const consoleLogDisableFunctionName: string = 'consoleLogDisable';

    let consoleObjectStubs: sinon.SinonStub[];
    let processStdoutWriteSpy: sinon.SinonSpy;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
    });

    beforeEach(() => {
        processStdoutWriteSpy = sinon.spy();
        consoleObjectStubs = consoleMethods.map((methodName: keyof Console) => {
            return sinon.stub(console, methodName).callsFake(processStdoutWriteSpy);
        });
    });

    describe('Base behaviour', () => {
        consoleMethods.forEach((consoleMethodName: keyof Console, index: number) => {
            describe(`Variant #${index + 1}: \`console.${consoleMethodName}\` call`, () => {
                beforeEach(() => {
                    const testFunc = getFunctionFromTemplate(
                        {
                            consoleLogDisableFunctionName,
                            callControllerFunctionName,
                            globalVariableTemplate: GlobalVariableTemplate1(),
                        },
                        callControllerFunctionName,
                        consoleMethodName
                    );

                    testFunc();
                });

                it(`should replace \`console.${consoleMethodName}\` call with an empty function`, () => {
                    assert.isNull(processStdoutWriteSpy.getCall(0));
                });
            });
        });
    });

    describe('Partial `console` object', () => {
        consoleMethods.forEach((consoleMethodName: keyof Console, index: number) => {
            describe(`Variant #${index + 1}: \`console.${consoleMethodName}\` call`, () => {
                beforeEach(() => {
                    const testFunc = getFunctionFromTemplate(
                        {
                            consoleLogDisableFunctionName,
                            callControllerFunctionName,
                            globalVariableTemplate: getPartialConsoleObjectGlobalVariableTemplate(),
                        },
                        callControllerFunctionName,
                        consoleMethodName
                    );

                    testFunc();
                });

                it(`should replace \`console.${consoleMethodName}\` call with an empty function`, () => {
                    assert.isNull(processStdoutWriteSpy.getCall(0));
                });
            });
        });
    });

    describe('Undefined `console` object', () => {
        consoleMethods.forEach((consoleMethodName: keyof Console, index: number) => {
            describe(`Variant #${index + 1}: \`console.${consoleMethodName}\` call`, () => {
                beforeEach(() => {
                    const testFunc = getFunctionFromTemplate(
                        {
                            consoleLogDisableFunctionName,
                            callControllerFunctionName,
                            globalVariableTemplate: getUndefinedConsoleObjectGlobalVariableTemplate(),
                        },
                        callControllerFunctionName,
                        consoleMethodName
                    );

                    testFunc();
                });

                it(`should replace \`console.${consoleMethodName}\` call with an empty function`, () => {
                    assert.isNull(processStdoutWriteSpy.getCall(0));
                });
            });
        });
    });

    describe('Wrong global variable template', () => {
        consoleMethods.forEach((consoleMethodName: keyof Console, index: number) => {
            describe(`Variant #${index + 1}: \`console.${consoleMethodName}\` call`, () => {
                beforeEach(() => {
                    const testFunc = getFunctionFromTemplate(
                        {
                            consoleLogDisableFunctionName,
                            callControllerFunctionName,
                            globalVariableTemplate: getWrongGlobalVariableTemplate(),
                        },
                        callControllerFunctionName,
                        consoleMethodName
                    );

                    testFunc();
                });

                it(`should not replace \`console.${consoleMethodName}\` call with an empty function`, () => {
                    assert.isNotNull(processStdoutWriteSpy.getCall(0));
                });
            });
        });
    });

    afterEach(() => {
        consoleObjectStubs.forEach((stub: sinon.SinonStub) => stub.restore());
    });
});
