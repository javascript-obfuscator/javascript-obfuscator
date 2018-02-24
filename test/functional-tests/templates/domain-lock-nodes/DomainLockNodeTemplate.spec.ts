import format from 'string-template';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { ICryptUtils } from '../../../../src/interfaces/utils/ICryptUtils';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';

import { DomainLockNodeTemplate } from '../../../../src/templates/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate';
import { GlobalVariableTemplate1 } from '../../../../src/templates/GlobalVariableTemplate1';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

/**
 * @param templateData
 * @param callsControllerFunctionName
 * @param currentDomain
 * @returns {Function}
 */
function getFunctionFromTemplate (templateData: any, callsControllerFunctionName: string,  currentDomain: string) {
    const domainLockTemplate: string = format(DomainLockNodeTemplate(), templateData);

    return Function(`
        document = {
            domain: '${currentDomain}'
        };

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

describe('DomainLockNodeTemplate (): string', () => {
    const singleNodeCallControllerFunctionName: string = 'callsController';

    let cryptUtils: ICryptUtils;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', {});
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

            testFunc = () => getFunctionFromTemplate({
                domainLockFunctionName: 'domainLockFunction',
                diff: diff,
                domains: hiddenDomainsString,
                globalVariableTemplate: GlobalVariableTemplate1(),
                singleNodeCallControllerFunctionName
            }, singleNodeCallControllerFunctionName, currentDomain);
        });

        it('should correctly run code inside template', () => {
            assert.doesNotThrow(testFunc);
        });
    });

    describe('Variant #2: urrent domain matches with base domain of `domainsString` item', () => {
        const domainsString: string = ['www.test.com', '.example.com'].join(';');
        const currentDomain: string = 'subdomain.example.com';

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
            }, singleNodeCallControllerFunctionName, currentDomain);
        });

        it('should correctly run code inside template', () => {
            assert.doesNotThrow(testFunc);
        });
    });

    describe('Variant #3: current domain doesn\'t match with `domainsString`', () => {
        const domainsString: string = ['www.example.com'].join(';');
        const currentDomain: string = 'www.test.com';

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
            }, singleNodeCallControllerFunctionName, currentDomain);
        });

        it('should throw an error', () => {
            assert.throws(testFunc);
        });
    });
});
