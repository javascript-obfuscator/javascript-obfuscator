import { assert } from 'chai';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

describe('`domainDest` validation', () => {
    describe('IsDomainDestUrl', () => {
        describe('Variant #1: positive validation', () => {
            describe('Variant #1: string with url containing protocol, host and some path', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            domainDest: 'https://example.com/path'
                        }
                    ).getObfuscatedCode();
                });

                it('should pass validation', () => {
                    assert.doesNotThrow(testFunc);
                });
            });

            describe('Variant #2: string with url containing host and some path', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            domainDest: 'example.com/path'
                        }
                    ).getObfuscatedCode();
                });

                it('should pass validation', () => {
                    assert.doesNotThrow(testFunc);
                });
            });

            describe('Variant #3: string with url containing host and some path', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            domainDest: '/path'
                        }
                    ).getObfuscatedCode();
                });

                it('should pass validation', () => {
                    assert.doesNotThrow(testFunc);
                });
            });

            describe('Variant #4: `about:blank` string', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            domainDest: 'about:blank'
                        }
                    ).getObfuscatedCode();
                });

                it('should pass validation', () => {
                    assert.doesNotThrow(testFunc);
                });
            });
        });

        describe('Variant #2: negative validation', () => {
            describe('Variant #1: some non-url string', () => {
                const expectedError: string = 'must be an URL address';
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            domainDest: 'foo'
                        }
                    ).getObfuscatedCode();
                });

                it('should not pass validation', () => {
                    assert.throws(testFunc, expectedError);
                });
            });
        });
    });
});
