import 'reflect-metadata';

import format from 'string-template';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../../src/container/ServiceIdentifiers';

import { ICryptUtils } from '../../../../../src/interfaces/utils/ICryptUtils';
import { IInversifyContainerFacade } from '../../../../../src/interfaces/container/IInversifyContainerFacade';
import { IObfuscationResult } from '../../../../../src/interfaces/source-code/IObfuscationResult';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { DomainLockTemplate } from '../../../../../src/custom-code-helpers/domain-lock/templates/DomainLockTemplate';

import { InversifyContainerFacade } from '../../../../../src/container/InversifyContainerFacade';
import { JavaScriptObfuscator } from '../../../../../src/JavaScriptObfuscatorFacade';
import { readFileAsString } from '../../../../helpers/readFileAsString';

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
    const domainLockTemplate: string = format(DomainLockTemplate(), templateData);

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
    `);
}

describe('DomainLockTemplate', () => {
    const singleCallControllerFunctionName: string = 'callsController';
    const thatThisTemplate = 'const that = this;';

    let cryptUtils: ICryptUtils;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        cryptUtils = inversifyContainerFacade.get<ICryptUtils>(ServiceIdentifiers.ICryptUtils);
    });

    describe('Variant #1: current domain matches with `domainsString`', () => {
        const domainsString: string = ['www.example.com'].join(';');
        const domainLockRedirectUrl: string = 'about:blank';
        const currentDomain: string = 'www.example.com';

        let testFunc: Function;
        let root: any;

        before(() => {
            const [
                hiddenDomainsString,
                domainsStringDiff
            ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

            const [
                hiddenDomainLockRedirectUrl,
                domainLockRedirectUrlDiff
            ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

            root = {
                document: {
                    domain: currentDomain,
                    location: undefined,
                },
            };

            testFunc = getFunctionFromTemplate(
                {
                    domainLockFunctionName: 'domainLockFunction',
                    domainsStringDiff,
                    domains: hiddenDomainsString,
                    domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                    hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                    globalVariableTemplate: '',
                    singleCallControllerFunctionName
                },
                singleCallControllerFunctionName,
                thatThisTemplate
            );
        });

        it('should correctly run code inside template', () => {
            assert.doesNotThrow(() => testFunc.apply(root));
            assert.isUndefined(root.document.location);
        });
    });

    describe('Variant #2: current domain matches with base domain of `domainsString`', () => {
        const domainsString: string = ['.example.com'].join(';');
        const domainLockRedirectUrl: string = 'about:blank';
        const currentDomain: string = 'www.example.com';

        let testFunc: Function;
        let root: any;

        before(() => {
            const [
                hiddenDomainsString,
                domainsStringDiff
            ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

            const [
                hiddenDomainLockRedirectUrl,
                domainLockRedirectUrlDiff
            ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

            root = {
                document: {
                    domain: currentDomain,
                    location: undefined,
                },
            };

            testFunc = getFunctionFromTemplate(
                {
                    domainLockFunctionName: 'domainLockFunction',
                    domainsStringDiff,
                    domains: hiddenDomainsString,
                    domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                    hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                    globalVariableTemplate: '',
                    singleCallControllerFunctionName
                },
                singleCallControllerFunctionName,
                thatThisTemplate
            );
        });

        it('should correctly run code inside template', () => {
            assert.doesNotThrow(() => testFunc.apply(root));
            assert.isUndefined(root.document.location);
        });
    });

    describe('Variant #3: current domain matches with root domain of `domainsString`', () => {
        const domainsString: string = ['.example.com'].join(';');
        const domainLockRedirectUrl: string = 'about:blank';
        const currentDomain: string = 'example.com';

        let testFunc: Function;
        let root: any;

        before(() => {
            const [
                hiddenDomainsString,
                domainsStringDiff
            ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

            const [
                hiddenDomainLockRedirectUrl,
                domainLockRedirectUrlDiff
            ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

            root = {
                document: {
                    domain: currentDomain,
                    location: undefined,
                },
            };

            testFunc = getFunctionFromTemplate(
                {
                    domainLockFunctionName: 'domainLockFunction',
                    domainsStringDiff,
                    domains: hiddenDomainsString,
                    domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                    hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                    globalVariableTemplate: '',
                    singleCallControllerFunctionName
                },
                singleCallControllerFunctionName,
                thatThisTemplate
            );
        });

        it('should correctly run code inside template', () => {
            assert.doesNotThrow(() => testFunc.apply(root));
            assert.isUndefined(root.document.location);
        });
    });

    describe('Variant #4: current root domain matches with `domainsString`', () => {
        describe('Variant #1', () => {
            const domainsString: string = ['example.com'].join(';');
            const domainLockRedirectUrl: string = 'about:blank';
            const currentDomain: string = 'example.com';

            let testFunc: Function;
            let root: any;

            before(() => {
                const [
                    hiddenDomainsString,
                    domainsStringDiff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                const [
                    hiddenDomainLockRedirectUrl,
                    domainLockRedirectUrlDiff
                ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

                root = {
                    document: {
                        domain: currentDomain,
                        location: undefined,
                    },
                };

                testFunc = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        domainsStringDiff,
                        domains: hiddenDomainsString,
                        domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                        hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                        globalVariableTemplate: '',
                        singleCallControllerFunctionName
                    },
                    singleCallControllerFunctionName,
                    thatThisTemplate
                );
            });

            it('should correctly run code inside template', () => {
                assert.doesNotThrow(() => testFunc.apply(root));
                assert.isUndefined(root.document.location);
            });
        });

        describe('Variant #2', () => {
            const domainsString: string = ['example.com', '.example.com'].join(';');
            const domainLockRedirectUrl: string = 'about:blank';
            const currentDomain: string = 'subdomain.example.com';

            let testFunc: Function;
            let root: any;

            before(() => {
                const [
                    hiddenDomainsString,
                    domainsStringDiff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                const [
                    hiddenDomainLockRedirectUrl,
                    domainLockRedirectUrlDiff
                ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

                root = {
                    document: {
                        domain: currentDomain,
                        location: undefined,
                    },
                };

                testFunc = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        domainsStringDiff,
                        domains: hiddenDomainsString,
                        domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                        hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                        globalVariableTemplate: '',
                        singleCallControllerFunctionName
                    },
                    singleCallControllerFunctionName,
                    thatThisTemplate
                );
            });

            it('should correctly run code inside template', () => {
                assert.doesNotThrow(() => testFunc.apply(root));
                assert.isUndefined(root.document.location);
            });
        });

        describe('Variant #3', () => {
            const domainsString: string = ['.example.com', 'example.com'].join(';');
            const domainLockRedirectUrl: string = 'about:blank';
            const currentDomain: string = 'subdomain.example.com';

            let testFunc: Function;
            let root: any;

            before(() => {
                const [
                    hiddenDomainsString,
                    domainsStringDiff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                const [
                    hiddenDomainLockRedirectUrl,
                    domainLockRedirectUrlDiff
                ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

                root = {
                    document: {
                        domain: currentDomain,
                        location: undefined,
                    },
                };

                testFunc = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        domainsStringDiff,
                        domains: hiddenDomainsString,
                        domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                        hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                        globalVariableTemplate: '',
                        singleCallControllerFunctionName
                    },
                    singleCallControllerFunctionName,
                    thatThisTemplate
                );
            });

            it('should correctly run code inside template', () => {
                assert.doesNotThrow(() => testFunc.apply(root));
                assert.isUndefined(root.document.location);
            });
        });

        describe('Variant #4', () => {
            const domainsString: string = ['sub1.example.com', 'sub2.example.com'].join(';');
            const domainLockRedirectUrl: string = 'about:blank';
            const currentDomain: string = 'sub1.example.com';

            let testFunc: Function;
            let root: any;

            before(() => {
                const [
                    hiddenDomainsString,
                    domainsStringDiff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                const [
                    hiddenDomainLockRedirectUrl,
                    domainLockRedirectUrlDiff
                ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

                root = {
                    document: {
                        domain: currentDomain,
                        location: undefined,
                    },
                };

                testFunc = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        domainsStringDiff,
                        domains: hiddenDomainsString,
                        domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                        hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                        globalVariableTemplate: '',
                        singleCallControllerFunctionName
                    },
                    singleCallControllerFunctionName,
                    thatThisTemplate
                );
            });

            it('should correctly run code inside template', () => {
                assert.doesNotThrow(() => testFunc.apply(root));
                assert.isUndefined(root.document.location);
            });
        });
    });

    describe('Variant #5: current domain matches with base domain of `domainsString` item', () => {
        const domainsString: string = ['www.test.com', '.example.com'].join(';');
        const domainLockRedirectUrl: string = 'about:blank';
        const currentDomain: string = 'subdomain.example.com';

        let testFunc: Function;
        let root: any;

        before(() => {
            const [
                hiddenDomainsString,
                domainsStringDiff
            ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

            const [
                hiddenDomainLockRedirectUrl,
                domainLockRedirectUrlDiff
            ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

            root = {
                document: {
                    domain: currentDomain,
                    location: undefined,
                },
            };

            testFunc = getFunctionFromTemplate(
                {
                    domainLockFunctionName: 'domainLockFunction',
                    domainsStringDiff,
                    domains: hiddenDomainsString,
                    domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                    hiddenDomainLockRedirectUrl,
                    globalVariableTemplate: '',
                    singleCallControllerFunctionName
                },
                singleCallControllerFunctionName,
                thatThisTemplate
            );
        });

        it('should correctly run code inside template', () => {
            assert.doesNotThrow(() => testFunc.apply(root));
            assert.isUndefined(root.document.location);
        });
    });

    describe('Variant #6: current domain doesn\'t match with `domainsString`', () => {
        describe('Variant #1', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const domainLockRedirectUrl: string = 'about:blank';
            const currentDomain: string = 'www.test.com';

            let testFunc: Function;
            let root: any;

            before(() => {
                const [
                    hiddenDomainsString,
                    domainsStringDiff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                const [
                    hiddenDomainLockRedirectUrl,
                    domainLockRedirectUrlDiff
                ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

                root = {
                    document: {
                        domain: currentDomain,
                        location: undefined,
                    },
                };

                testFunc = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        domainsStringDiff,
                        domains: hiddenDomainsString,
                        domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                        hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                        globalVariableTemplate: '',
                        singleCallControllerFunctionName
                    },
                    singleCallControllerFunctionName,
                    thatThisTemplate
                );
            });

            it('should change document.location', () => {
                assert.doesNotThrow(() => testFunc.apply(root));
                assert.equal(root.document.location, domainLockRedirectUrl);
            });
        });

        describe('Variant #2', () => {
            const domainsString: string = ['sub1.test.com', 'sub2.test.com'].join(';');
            const domainLockRedirectUrl: string = 'about:blank';
            const currentDomain: string = 'sub3.test.com';

            let testFunc: Function;
            let root: any;

            before(() => {
                const [
                    hiddenDomainsString,
                    domainsStringDiff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                const [
                    hiddenDomainLockRedirectUrl,
                    domainLockRedirectUrlDiff
                ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

                root = {
                    document: {
                        domain: currentDomain,
                        location: undefined,
                    },
                };

                testFunc = getFunctionFromTemplate({
                        domainLockFunctionName: 'domainLockFunction',
                        domainsStringDiff,
                        domains: hiddenDomainsString,
                        domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                        hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                        globalVariableTemplate: '',
                        singleCallControllerFunctionName
                    },
                    singleCallControllerFunctionName,
                    thatThisTemplate
                );
            });

            it('should change document.location', () => {
                assert.doesNotThrow(() => testFunc.apply(root));
                assert.equal(root.document.location, domainLockRedirectUrl);
            });
        });

        describe('Variant #3', () => {
            const domainsString: string = ['www.example.com', '.example.com', 'sub.test.com'].join(';');
            const domainLockRedirectUrl: string = 'about:blank';
            const currentDomain: string = 'www.test.com';

            let testFunc: Function;
            let root: any;

            before(() => {
                const [
                    hiddenDomainsString,
                    domainsStringDiff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                const [
                    hiddenDomainLockRedirectUrl,
                    domainLockRedirectUrlDiff
                ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

                root = {
                    document: {
                        domain: currentDomain,
                        location: undefined,
                    },
                };

                testFunc = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        domainsStringDiff,
                        domains: hiddenDomainsString,
                        domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                        hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                        globalVariableTemplate: '',
                        singleCallControllerFunctionName
                    },
                    singleCallControllerFunctionName,
                    thatThisTemplate
                );
            });

            it('should change document.location', () => {
                assert.doesNotThrow(() => testFunc.apply(root));
                assert.equal(root.document.location, domainLockRedirectUrl);
            });
        });

        describe('Variant #4', () => {
            const domainsString: string = ['.example.com'].join(';');
            const domainLockRedirectUrl: string = 'about:blank';
            const currentDomain: string = 'example1.com';

            let testFunc: Function;
            let root: any;

            before(() => {
                const [
                    hiddenDomainsString,
                    domainsStringDiff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                const [
                    hiddenDomainLockRedirectUrl,
                    domainLockRedirectUrlDiff
                ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

                root = {
                    document: {
                        domain: currentDomain,
                        location: undefined,
                    },
                };

                testFunc = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        domainsStringDiff,
                        domains: hiddenDomainsString,
                        domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                        hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                        globalVariableTemplate: '',
                        singleCallControllerFunctionName
                    },
                    singleCallControllerFunctionName,
                    thatThisTemplate
                );
            });

            it('should change document.location', () => {
                assert.doesNotThrow(() => testFunc.apply(root));
                assert.equal(root.document.location, domainLockRedirectUrl);
            });
        });

        describe('Variant #5', () => {
            const domainsString: string = ['example.com'].join(';');
            const domainLockRedirectUrl: string = 'about:blank';
            const currentDomain: string = 'sub.example.com';

            let testFunc: Function;
            let root: any;

            before(() => {
                const [
                    hiddenDomainsString,
                    domainsStringDiff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                const [
                    hiddenDomainLockRedirectUrl,
                    domainLockRedirectUrlDiff
                ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

                root = {
                    document: {
                        domain: currentDomain,
                        location: undefined,
                    },
                };

                testFunc = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        domainsStringDiff,
                        domains: hiddenDomainsString,
                        domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                        hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                        globalVariableTemplate: '',
                        singleCallControllerFunctionName
                    },
                    singleCallControllerFunctionName,
                    thatThisTemplate
                );
            });

            it('should change document.location', () => {
                assert.doesNotThrow(() => testFunc.apply(root));
                assert.equal(root.document.location, domainLockRedirectUrl);
            });
        });
    });

    describe('Variant #7: location.hostname', () => {
        describe('Variant #1: current location.hostname matches with `domainsString`', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const domainLockRedirectUrl: string = 'about:blank';
            const currentHostName: string = 'www.example.com';

            let testFunc: Function;
            let root: any;

            before(() => {
                const [
                    hiddenDomainsString,
                    domainsStringDiff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                const [
                    hiddenDomainLockRedirectUrl,
                    domainLockRedirectUrlDiff
                ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

                root = {
                    document: {
                        location: {
                            hostname: currentHostName,
                        },
                    },
                };

                testFunc = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        domainsStringDiff,
                        domains: hiddenDomainsString,
                        domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                        hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                        globalVariableTemplate: '',
                        singleCallControllerFunctionName
                    },
                    singleCallControllerFunctionName,
                    thatThisTemplate
                );
            });

            it('should correctly run code inside template', () => {
                assert.doesNotThrow(() => testFunc.apply(root));
                assert.isObject(root.document.location);
            });
        });

        describe('Variant #2: current location.hostname doesn\'t match with `domainsString`', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const domainLockRedirectUrl: string = 'about:blank';
            const currentHostName: string = 'www.test.com';

            let testFunc: Function;
            let root: any;

            before(() => {
                const [
                    hiddenDomainsString,
                    domainsStringDiff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                const [
                    hiddenDomainLockRedirectUrl,
                    domainLockRedirectUrlDiff
                ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

                root = {
                    document: {
                        location: {
                            hostname: currentHostName,
                        },
                    },
                };

                testFunc = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        domainsStringDiff,
                        domains: hiddenDomainsString,
                        domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                        hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                        globalVariableTemplate: '',
                        singleCallControllerFunctionName
                    },
                    singleCallControllerFunctionName,
                    thatThisTemplate
                );
            });

            it('should change document.location', () => {
                assert.doesNotThrow(() => testFunc.apply(root));
                assert.equal(root.document.location, domainLockRedirectUrl);
            });
        });
    });

    describe('Variant #8: domain and location.hostname presented', () => {
        describe('Variant #1: current domain matches with `domainsString`', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const domainLockRedirectUrl: string = 'about:blank';
            const currentHostName: string = 'www.example.com';

            let testFunc: Function;
            let root: any;

            before(() => {
                const [
                    hiddenDomainsString,
                    domainsStringDiff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                const [
                    hiddenDomainLockRedirectUrl,
                    domainLockRedirectUrlDiff
                ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

                root = {
                    document: {
                        domain: currentHostName,
                        location: {
                            hostname: currentHostName,
                        },
                    },
                };

                testFunc = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        domainsStringDiff,
                        domains: hiddenDomainsString,
                        domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                        hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                        globalVariableTemplate: '',
                        singleCallControllerFunctionName
                    },
                    singleCallControllerFunctionName,
                    thatThisTemplate
                );
            });

            it('should correctly run code inside template', () => {
                assert.doesNotThrow(() => testFunc.apply(root));
                assert.isObject(root.document.location);
            });
        });

        describe('Variant #2: current domain doesn\'t match with `domainsString`', () => {
            const domainsString: string = ['www.example.com'].join(';');
            const domainLockRedirectUrl: string = 'about:blank';
            const currentHostName: string = 'www.test.com';

            let testFunc: Function;
            let root: any;

            before(() => {
                const [
                    hiddenDomainsString,
                    domainsStringDiff
                ] = cryptUtils.hideString(domainsString, domainsString.length * 3);

                const [
                    hiddenDomainLockRedirectUrl,
                    domainLockRedirectUrlDiff
                ] = cryptUtils.hideString(domainLockRedirectUrl, domainLockRedirectUrl.length * 3);

                root = {
                    document: {
                        domain: currentHostName,
                        location: {
                            hostname: currentHostName,
                        },
                    },
                };

                testFunc = getFunctionFromTemplate(
                    {
                        domainLockFunctionName: 'domainLockFunction',
                        domainsStringDiff,
                        domains: hiddenDomainsString,
                        domainLockRedirectUrlDiff: domainLockRedirectUrlDiff,
                        hiddenDomainLockRedirectUrl: hiddenDomainLockRedirectUrl,
                        globalVariableTemplate: '',
                        singleCallControllerFunctionName
                    },
                    singleCallControllerFunctionName,
                    thatThisTemplate
                );
            });

            it('should change document.location', () => {
                assert.doesNotThrow(() => testFunc.apply(root));
                assert.equal(root.document.location, domainLockRedirectUrl);
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
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        domainLock: ['obfuscator.io'],
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
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
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        domainLock: ['obfuscator.io'],
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
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
                const obfuscationResult: IObfuscationResult = JavaScriptObfuscator.obfuscate(
                    code,
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        domainLock: ['obfuscator.io'],
                        stringArray: true,
                        stringArrayThreshold: 1
                    }
                );

                obfuscatedCode = obfuscationResult.getObfuscatedCode();
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
