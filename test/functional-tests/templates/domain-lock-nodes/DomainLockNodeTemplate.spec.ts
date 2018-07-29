import 'reflect-metadata';

import format from 'string-template';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { ICryptUtils } from '../../../../src/interfaces/utils/ICryptUtils';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';

import { DomainLockNodeTemplate } from '../../../../src/templates/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate';
import { GlobalVariableTemplate1 } from '../../../../src/templates/GlobalVariableTemplate1';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

/**
 * @param {string} currentDomain
 * @returns {string}
 */
function getDocumentDomainTemplate (currentDomain: string): string {
    return `
        document = {
            domain: '${currentDomain}'
        };
    `
}

/**
 * @param {string} currentDomain
 * @returns {string}
 */
function getDocumentLocationTemplate (currentDomain: string): string {
    return `
        document = {
            location: {
                hostname: '${currentDomain}'
            }
        };
    `
}

/**
 * @param {string} currentDomain
 * @returns {string}
 */
function getDocumentDomainAndLocationTemplate (currentDomain: string): string {
    return `
        document = {
            domain: '${currentDomain}',
            location: {
                hostname: '${currentDomain}'
            }
        };
    `
}

/**
 * @param templateData
 * @param {string} callsControllerFunctionName
 * @param {string} documentTemplate
 * @returns {Function}
 */
function getFunctionFromTemplate (
    templateData: any,
    callsControllerFunctionName: string,
    documentTemplate: string
): Function {
    const domainLockTemplate: string = format(DomainLockNodeTemplate(), templateData);

    return Function(`
        ${documentTemplate}

        var ${callsControllerFunctionName} = (function(){            
            return function (context, fn){	
                return function () {
                    return fn.apply(context, arguments);
                };
            }
        })();

        ${domainLockTemplate}
    `)();
}

describe('DomainLockNodeTemplate', () => {
    const singleNodeCallControllerFunctionName: string = 'callsController';

    let cryptUtils: ICryptUtils;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        cryptUtils = inversifyContainerFacade.get<ICryptUtils>(ServiceIdentifiers.ICryptUtils);
    });

    describe('Variant #1: current domain matches with `domainsString`', () => {
        const domainsString: string = ['www.example.com'].join(';');
        const currentDomain: string = 'www.example.com';

        let testFunc: () => void;

        before(() => {
            const [
                hiddenDomainsString,
                diff
            ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

            testFunc = () => getFunctionFromTemplate(
                {
                    domainLockFunctionName: 'domainLockFunction',
                    diff: diff,
                    domains: hiddenDomainsString,
                    globalVariableTemplate: GlobalVariableTemplate1(),
                    singleNodeCallControllerFunctionName
                },
                singleNodeCallControllerFunctionName,
                getDocumentDomainTemplate(currentDomain)
            );
        });

        it('should correctly run code inside template', () => {
            assert.doesNotThrow(testFunc);
        });
    });

    describe('Variant #2: current domain matches with base domain of `domainsString`', () => {
        const domainsString: string = ['.example.com'].join(';');
        const currentDomain: string = 'www.example.com';

        let testFunc: () => void;

        before(() => {
            const [
                hiddenDomainsString,
                diff
            ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

            testFunc = () => getFunctionFromTemplate(
                {
                    domainLockFunctionName: 'domainLockFunction',
                    diff: diff,
                    domains: hiddenDomainsString,
                    globalVariableTemplate: GlobalVariableTemplate1(),
                    singleNodeCallControllerFunctionName
                },
                singleNodeCallControllerFunctionName,
                getDocumentDomainTemplate(currentDomain)
            );
        });

        it('should correctly run code inside template', () => {
            assert.doesNotThrow(testFunc);
        });
    });

    describe('Variant #3: current domain matches with all domains of `domainsString`', () => {
        describe('Variant #1', () => {
            const domainsString: string = ['example.com', '.example.com'].join(';');
            const currentDomain: string = 'example.com';

            let testFunc: () => void;

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                testFunc = () => getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleNodeCallControllerFunctionName
                    },
                    singleNodeCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should correctly run code inside template', () => {
                assert.doesNotThrow(testFunc);
            });
        });

        describe('Variant #2', () => {
            const domainsString: string = ['example.com', '.example.com'].join(';');
            const currentDomain: string = 'subdomain.example.com';

            let testFunc: () => void;

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                testFunc = () => getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleNodeCallControllerFunctionName
                    },
                    singleNodeCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should correctly run code inside template', () => {
                assert.doesNotThrow(testFunc);
            });
        });

        describe('Variant #3', () => {
            const domainsString: string = ['.example.com', 'example.com'].join(';');
            const currentDomain: string = 'subdomain.example.com';

            let testFunc: () => void;

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                testFunc = () => getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleNodeCallControllerFunctionName
                    },
                    singleNodeCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should correctly run code inside template', () => {
                assert.doesNotThrow(testFunc);
            });
        });

        describe('Variant #4', () => {
            const domainsString: string = ['sub1.example.com', 'sub2.example.com'].join(';');
            const currentDomain: string = 'sub1.example.com';

            let testFunc: () => void;

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                testFunc = () => getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleNodeCallControllerFunctionName
                    },
                    singleNodeCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should correctly run code inside template', () => {
                assert.doesNotThrow(testFunc);
            });
        });
    });

    describe('Variant #4: current domain matches with base domain of `domainsString` item', () => {
        const domainsString: string = ['www.test.com', '.example.com'].join(';');
        const currentDomain: string = 'subdomain.example.com';

        let testFunc: () => void;

        before(() => {
            const [
                hiddenDomainsString,
                diff
            ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

            testFunc = () => getFunctionFromTemplate(
                {
                    domainLockFunctionName: 'domainLockFunction',
                    diff: diff,
                    domains: hiddenDomainsString,
                    globalVariableTemplate: GlobalVariableTemplate1(),
                    singleNodeCallControllerFunctionName
                },
                singleNodeCallControllerFunctionName,
                getDocumentDomainTemplate(currentDomain)
            );
        });

        it('should correctly run code inside template', () => {
            assert.doesNotThrow(testFunc);
        });
    });

    describe('Variant #5: current domain doesn\'t match with `domainsString`', () => {
        describe('Variant #1', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const currentDomain: string = 'www.test.com';

            let testFunc: () => void;

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                testFunc = () => getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleNodeCallControllerFunctionName
                    },
                    singleNodeCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should throw an error', () => {
                assert.throws(testFunc);
            });
        });

        describe('Variant #2', () => {
            const domainsString: string = ['sub1.test.com', 'sub2.test.com'].join(';');
            const currentDomain: string = 'sub3.test.com';

            let testFunc: () => void;

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                testFunc = () => getFunctionFromTemplate({
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleNodeCallControllerFunctionName
                    },
                    singleNodeCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should throw an error', () => {
                assert.throws(testFunc);
            });
        });

        describe('Variant #3', () => {
            const domainsString: string = ['www.example.com', '.example.com', 'sub.test.com'].join(';');
            const currentDomain: string = 'www.test.com';

            let testFunc: () => void;

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                testFunc = () => getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleNodeCallControllerFunctionName
                    },
                    singleNodeCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should throw an error', () => {
                assert.throws(testFunc);
            });
        });
    });

    describe('Variant #6: location.hostname', () => {
        describe('Variant #1: current location.hostname matches with `domainsString`', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const currentHostName: string = 'www.example.com';

            let testFunc: () => void;

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                testFunc = () => getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleNodeCallControllerFunctionName
                    },
                    singleNodeCallControllerFunctionName,
                    getDocumentLocationTemplate(currentHostName)
                );
            });

            it('should correctly run code inside template', () => {
                assert.doesNotThrow(testFunc);
            });
        });

        describe('Variant #2: current location.hostname doesn\'t match with `domainsString`', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const currentHostName: string = 'www.test.com';

            let testFunc: () => void;

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                testFunc = () => getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleNodeCallControllerFunctionName
                    },
                    singleNodeCallControllerFunctionName,
                    getDocumentLocationTemplate(currentHostName)
                );
            });

            it('should throw an error', () => {
                assert.throws(testFunc);
            });
        });
    });

    describe('Variant #7: domain and location.hostname presented', () => {
        describe('Variant #1: current domain matches with `domainsString`', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const currentHostName: string = 'www.example.com';

            let testFunc: () => void;

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                testFunc = () => getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleNodeCallControllerFunctionName
                    },
                    singleNodeCallControllerFunctionName,
                    getDocumentDomainAndLocationTemplate(currentHostName)
                );
            });

            it('should correctly run code inside template', () => {
                assert.doesNotThrow(testFunc);
            });
        });

        describe('Variant #2: current domain doesn\'t match with `domainsString`', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const currentHostName: string = 'www.test.com';

            let testFunc: () => void;

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                testFunc = () => getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleNodeCallControllerFunctionName
                    },
                    singleNodeCallControllerFunctionName,
                    getDocumentDomainAndLocationTemplate(currentHostName)
                );
            });

            it('should throw an error', () => {
                assert.throws(testFunc);
            });
        });
    });
});
