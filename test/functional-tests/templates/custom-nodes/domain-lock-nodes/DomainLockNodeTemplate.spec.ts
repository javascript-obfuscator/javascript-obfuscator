import * as format from 'string-template';

import { DomainLockNodeTemplate } from '../../../../../src/templates/custom-nodes/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate';

import { Utils } from '../../../../../src/Utils';


const assert: Chai.AssertStatic = require('chai').assert;

/**
 * @param templateData
 * @param callsControllerFunctionName
 * @param currentDomain
 * @returns {Function}
 */
function getFunctionFromTemplate (templateData: any, callsControllerFunctionName: string,  currentDomain: string) {
    let domainLockTemplate: string = format(DomainLockNodeTemplate(), templateData);

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
    let domainsString: string,
        currentDomain: string,
        hiddenDomainsString: string,
        diff: string,
        singleNodeCallControllerFunctionName: string = 'callsController';

    it('should correctly runs code inside template if current domain matches with `domainsString`', () => {
        domainsString = ['www.example.com'].join(';');
        currentDomain = 'www.example.com';
        [
            hiddenDomainsString,
            diff
        ] = Utils.hideString(domainsString, domainsString.length * 3);

        assert.doesNotThrow(() => getFunctionFromTemplate({
            domainLockFunctionName: 'domainLockFunction',
            diff: diff,
            domains: hiddenDomainsString,
            singleNodeCallControllerFunctionName
        }, singleNodeCallControllerFunctionName, currentDomain));
    });

    it('should correctly runs code inside template if current domain matches with base domain of `domainsString` item', () => {
        domainsString = ['www.test.com', '.example.com'].join(';');
        currentDomain = 'subdomain.example.com';
        [
            hiddenDomainsString,
            diff
        ] = Utils.hideString(domainsString, domainsString.length * 3);

        assert.doesNotThrow(() => getFunctionFromTemplate({
            domainLockFunctionName: 'domainLockFunction',
            diff: diff,
            domains: hiddenDomainsString,
            singleNodeCallControllerFunctionName
        }, singleNodeCallControllerFunctionName, currentDomain));
    });

    it('should throw an error if current domain doesn\'t match with `domainsString`', () => {
        domainsString = ['www.example.com'].join(';');
        currentDomain = 'www.test.com';
        [
            hiddenDomainsString,
            diff
        ] = Utils.hideString(domainsString, domainsString.length * 3);

        assert.throws(() => getFunctionFromTemplate({
            domainLockFunctionName: 'domainLockFunction',
            diff: diff,
            domains: hiddenDomainsString,
            singleNodeCallControllerFunctionName
        }, singleNodeCallControllerFunctionName, currentDomain));
    });

    afterEach(() => {
        delete (<any>global).promisePolyfillActivationFlag;
    });
});
