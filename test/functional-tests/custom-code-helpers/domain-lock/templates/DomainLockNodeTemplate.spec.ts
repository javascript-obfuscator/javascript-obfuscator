import 'reflect-metadata';

import format from 'string-template';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../../src/container/ServiceIdentifiers';

import { ICryptUtils } from '../../../../../src/interfaces/utils/ICryptUtils';
import { IInversifyContainerFacade } from '../../../../../src/interfaces/container/IInversifyContainerFacade';
import { IObfuscatedCode } from '../../../../../src/interfaces/source-code/IObfuscatedCode';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { DomainLockTemplate } from '../../../../../src/custom-code-helpers/domain-lock/templates/DomainLockTemplate';
import { GlobalVariableTemplate1 } from '../../../../../src/custom-code-helpers/common/templates/GlobalVariableTemplate1';

import { InversifyContainerFacade } from '../../../../../src/container/InversifyContainerFacade';
import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';
import { readFileAsString } from '../../../../helpers/readFileAsString';

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
 * @param {string} stringArrayName
 * @param {string} callsControllerFunctionName
 * @param {string} documentTemplate
 * @returns {string[]}
 */
function getFunctionFromTemplate (
    templateData: any,
    stringArrayName: string,
    callsControllerFunctionName: string,
    documentTemplate: string
): string[] {
    const domainLockTemplate: string = format(DomainLockTemplate(), templateData);

    return Function(`
        const ${stringArrayName} = ['foo', 'bar', 'baz'];
    
        ${documentTemplate}

        var ${callsControllerFunctionName} = (function(){            
            return function (context, fn){	
                return function () {
                    return fn.apply(context, arguments);
                };
            }
        })();

        ${domainLockTemplate}
        
        return ${stringArrayName};
    `)();
}

describe('DomainLockTemplate', () => {
    const singleCallControllerFunctionName: string = 'callsController';
    const stringArrayName: string = 'stringArray';

    const expectedStringArray: string[] = ['foo', 'bar', 'baz'];
    const expectedShiftedStringArray: string[] = ['bar', 'baz'];

    let cryptUtils: ICryptUtils;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        cryptUtils = inversifyContainerFacade.get<ICryptUtils>(ServiceIdentifiers.ICryptUtils);
    });

    describe('Variant #1: current domain matches with `domainsString`', () => {
        const domainsString: string = ['www.example.com'].join(';');
        const currentDomain: string = 'www.example.com';

        let stringArray: string[];

        before(() => {
            const [
                hiddenDomainsString,
                diff
            ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

            stringArray = getFunctionFromTemplate(
                {
                    domainLockFunctionName: 'domainLockFunction',
                    diff: diff,
                    domains: hiddenDomainsString,
                    globalVariableTemplate: GlobalVariableTemplate1(),
                    singleCallControllerFunctionName,
                    stringArrayName
                },
                stringArrayName,
                singleCallControllerFunctionName,
                getDocumentDomainTemplate(currentDomain)
            );
        });

        it('should correctly run code inside template', () => {
            assert.deepEqual(stringArray, expectedStringArray);
        });
    });

    describe('Variant #2: current domain matches with base domain of `domainsString`', () => {
        const domainsString: string = ['.example.com'].join(';');
        const currentDomain: string = 'www.example.com';

        let stringArray: string[];

        before(() => {
            const [
                hiddenDomainsString,
                diff
            ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

            stringArray = getFunctionFromTemplate(
                {
                    domainLockFunctionName: 'domainLockFunction',
                    diff: diff,
                    domains: hiddenDomainsString,
                    globalVariableTemplate: GlobalVariableTemplate1(),
                    singleCallControllerFunctionName,
                    stringArrayName
                },
                stringArrayName,
                singleCallControllerFunctionName,
                getDocumentDomainTemplate(currentDomain)
            );
        });

        it('should correctly run code inside template', () => {
            assert.deepEqual(stringArray, expectedStringArray);
        });
    });

    describe('Variant #3: current domain matches with root domain of `domainsString`', () => {
        const domainsString: string = ['.example.com'].join(';');
        const currentDomain: string = 'example.com';

        let stringArray: string[];

        before(() => {
            const [
                hiddenDomainsString,
                diff
            ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

            stringArray = getFunctionFromTemplate(
                {
                    domainLockFunctionName: 'domainLockFunction',
                    diff: diff,
                    domains: hiddenDomainsString,
                    globalVariableTemplate: GlobalVariableTemplate1(),
                    singleCallControllerFunctionName,
                    stringArrayName
                },
                stringArrayName,
                singleCallControllerFunctionName,
                getDocumentDomainTemplate(currentDomain)
            );
        });

        it('should correctly run code inside template', () => {
            assert.deepEqual(stringArray, expectedStringArray);
        });
    });

    describe('Variant #4: current root domain matches with `domainsString`', () => {
        describe('Variant #1', () => {
            const domainsString: string = ['example.com'].join(';');
            const currentDomain: string = 'example.com';

            let stringArray: string[];

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                stringArray = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleCallControllerFunctionName,
                        stringArrayName
                    },
                    stringArrayName,
                    singleCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should correctly run code inside template', () => {
                assert.deepEqual(stringArray, expectedStringArray);
            });
        });

        describe('Variant #2', () => {
            const domainsString: string = ['example.com', '.example.com'].join(';');
            const currentDomain: string = 'subdomain.example.com';

            let stringArray: string[];

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                stringArray = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleCallControllerFunctionName,
                        stringArrayName
                    },
                    stringArrayName,
                    singleCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should correctly run code inside template', () => {
                assert.deepEqual(stringArray, expectedStringArray);
            });
        });

        describe('Variant #3', () => {
            const domainsString: string = ['.example.com', 'example.com'].join(';');
            const currentDomain: string = 'subdomain.example.com';

            let stringArray: string[];

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                stringArray = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleCallControllerFunctionName,
                        stringArrayName
                    },
                    stringArrayName,
                    singleCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should correctly run code inside template', () => {
                assert.deepEqual(stringArray, expectedStringArray);
            });
        });

        describe('Variant #4', () => {
            const domainsString: string = ['sub1.example.com', 'sub2.example.com'].join(';');
            const currentDomain: string = 'sub1.example.com';

            let stringArray: string[];

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                stringArray = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleCallControllerFunctionName,
                        stringArrayName
                    },
                    stringArrayName,
                    singleCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should correctly run code inside template', () => {
                assert.deepEqual(stringArray, expectedStringArray);
            });
        });
    });

    describe('Variant #5: current domain matches with base domain of `domainsString` item', () => {
        const domainsString: string = ['www.test.com', '.example.com'].join(';');
        const currentDomain: string = 'subdomain.example.com';

        let stringArray: string[];

        before(() => {
            const [
                hiddenDomainsString,
                diff
            ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

            stringArray = getFunctionFromTemplate(
                {
                    domainLockFunctionName: 'domainLockFunction',
                    diff: diff,
                    domains: hiddenDomainsString,
                    globalVariableTemplate: GlobalVariableTemplate1(),
                    singleCallControllerFunctionName,
                    stringArrayName
                },
                stringArrayName,
                singleCallControllerFunctionName,
                getDocumentDomainTemplate(currentDomain)
            );
        });

        it('should correctly run code inside template', () => {
            assert.deepEqual(stringArray, expectedStringArray);
        });
    });

    describe('Variant #6: current domain doesn\'t match with `domainsString`', () => {
        describe('Variant #1', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const currentDomain: string = 'www.test.com';

            let shiftedStringArray: string[];

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                shiftedStringArray = getFunctionFromTemplate({
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleCallControllerFunctionName,
                        stringArrayName
                    },
                    stringArrayName,
                    singleCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should shift the string array', () => {
                assert.deepEqual(shiftedStringArray, expectedShiftedStringArray);
            });
        });

        describe('Variant #2', () => {
            const domainsString: string = ['sub1.test.com', 'sub2.test.com'].join(';');
            const currentDomain: string = 'sub3.test.com'

            let shiftedStringArray: string[];

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                shiftedStringArray = getFunctionFromTemplate({
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleCallControllerFunctionName,
                        stringArrayName
                    },
                    stringArrayName,
                    singleCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should shift the string array', () => {
                assert.deepEqual(shiftedStringArray, expectedShiftedStringArray);
            });
        });

        describe('Variant #3', () => {
            const domainsString: string = ['www.example.com', '.example.com', 'sub.test.com'].join(';');
            const currentDomain: string = 'www.test.com';

            let shiftedStringArray: string[];

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                shiftedStringArray = getFunctionFromTemplate({
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleCallControllerFunctionName,
                        stringArrayName
                    },
                    stringArrayName,
                    singleCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should shift the string array', () => {
                assert.deepEqual(shiftedStringArray, expectedShiftedStringArray);
            });
        });

        describe('Variant #4', () => {
            const domainsString: string = ['.example.com'].join(';');
            const currentDomain: string = 'example1.com';

            let shiftedStringArray: string[];

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                shiftedStringArray = getFunctionFromTemplate({
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleCallControllerFunctionName,
                        stringArrayName
                    },
                    stringArrayName,
                    singleCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should shift the string array', () => {
                assert.deepEqual(shiftedStringArray, expectedShiftedStringArray);
            });
        });

        describe('Variant #5', () => {
            const domainsString: string = ['example.com'].join(';');
            const currentDomain: string = 'sub.example.com';

            let shiftedStringArray: string[];

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                shiftedStringArray = getFunctionFromTemplate({
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleCallControllerFunctionName,
                        stringArrayName
                    },
                    stringArrayName,
                    singleCallControllerFunctionName,
                    getDocumentDomainTemplate(currentDomain)
                );
            });

            it('should shift the string array', () => {
                assert.deepEqual(shiftedStringArray, expectedShiftedStringArray);
            });
        });
    });

    describe('Variant #7: location.hostname', () => {
        describe('Variant #1: current location.hostname matches with `domainsString`', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const currentHostName: string = 'www.example.com';

            let stringArray: string[]

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                stringArray = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleCallControllerFunctionName,
                        stringArrayName
                    },
                    stringArrayName,
                    singleCallControllerFunctionName,
                    getDocumentLocationTemplate(currentHostName)
                );
            });

            it('should correctly run code inside template', () => {
                assert.deepEqual(stringArray, expectedStringArray);
            });
        });

        describe('Variant #2: current location.hostname doesn\'t match with `domainsString`', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const currentHostName: string = 'www.test.com';

            let shiftedStringArray: string[];

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                shiftedStringArray = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleCallControllerFunctionName,
                        stringArrayName
                    },
                    stringArrayName,
                    singleCallControllerFunctionName,
                    getDocumentLocationTemplate(currentHostName)
                );
            });

            it('should shift the string array', () => {
                assert.deepEqual(shiftedStringArray, expectedShiftedStringArray);
            });
        });
    });

    describe('Variant #8: domain and location.hostname presented', () => {
        describe('Variant #1: current domain matches with `domainsString`', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const currentHostName: string = 'www.example.com';

            let stringArray: string[];

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                stringArray = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleCallControllerFunctionName,
                        stringArrayName
                    },
                    stringArrayName,
                    singleCallControllerFunctionName,
                    getDocumentDomainAndLocationTemplate(currentHostName)
                );
            });

            it('should correctly run code inside template', () => {
                assert.deepEqual(stringArray, expectedStringArray);
            });
        });

        describe('Variant #2: current domain doesn\'t match with `domainsString`', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const currentHostName: string = 'www.test.com';

            let shiftedStringArray: string[];

            before(() => {
                const [
                    hiddenDomainsString,
                    diff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                shiftedStringArray = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        diff: diff,
                        domains: hiddenDomainsString,
                        globalVariableTemplate: GlobalVariableTemplate1(),
                        singleCallControllerFunctionName,
                        stringArrayName
                    },
                    stringArrayName,
                    singleCallControllerFunctionName,
                    getDocumentDomainAndLocationTemplate(currentHostName)
                );
            });

            it('should shift the string array', () => {
                assert.deepEqual(shiftedStringArray, expectedShiftedStringArray);
            });
        });
    });

    describe('Prevailing kind of variables', () => {
        const getCodeTemplate = (obfuscatedCode: string) => `
            global.document = {
                domain: 'obfuscator.io'
            };
            ${obfuscatedCode}
        `;

        describe('`var` kind', () => {
            let obfuscatedCode: string,
                domainLockVariableRegExp: RegExp = /var _0x([a-f0-9]){4,6} *= *new *RegExp/;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-var.js');
                const obfuscatedCodeObject: IObfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        domainLock: ['obfuscator.io'],
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscatedCodeObject.getObfuscatedCode();
            });

            it('Should return correct kind of variables for domain lock code', () => {
                assert.match(obfuscatedCode, domainLockVariableRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => eval(getCodeTemplate(obfuscatedCode)));
            });
        });

        describe('`const` kind', () => {
            let obfuscatedCode: string,
                domainLockVariableRegExp: RegExp = /const _0x([a-f0-9]){4,6} *= *new *RegExp/;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-const.js');
                const obfuscatedCodeObject: IObfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        domainLock: ['obfuscator.io'],
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscatedCodeObject.getObfuscatedCode();
            });

            it('Should return correct kind of variables for domain lock code', () => {
                assert.match(obfuscatedCode, domainLockVariableRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => eval(getCodeTemplate(obfuscatedCode)));
            });
        });

        describe('`let` kind', () => {
            let obfuscatedCode: string,
                domainLockVariableRegExp: RegExp = /const _0x([a-f0-9]){4,6} *= *new *RegExp/;

            beforeEach(() => {
                const code: string = readFileAsString(__dirname + '/fixtures/prevailing-kind-of-variables-let.js');
                const obfuscatedCodeObject: IObfuscatedCode = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        domainLock: ['obfuscator.io'],
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscatedCodeObject.getObfuscatedCode();
            });

            it('Should return correct kind of variables for domain lock code', () => {
                assert.match(obfuscatedCode, domainLockVariableRegExp);
            });

            it('Should does not break on obfuscating', () => {
                assert.doesNotThrow(() => eval(getCodeTemplate(obfuscatedCode)));
            });
        });
    });
});
