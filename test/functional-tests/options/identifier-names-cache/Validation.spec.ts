import { assert } from 'chai';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

describe('`identifierNamesCache` validation', () => {
    describe('IsPrimitiveDictionary', () => {
        describe('Variant #1: positive validation', () => {
            describe('Variant #1: object with existing identifier names cache', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesCache: {
                                foo: '_0x123456'
                            }
                        }
                    ).getObfuscatedCode();
                });

                it('should pass validation', () => {
                    assert.doesNotThrow(testFunc);
                });
            });

            describe('Variant #2: object with empty identifier names cache', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesCache: {}
                        }
                    ).getObfuscatedCode();
                });

                it('should pass validation', () => {
                    assert.doesNotThrow(testFunc);
                });
            });

            describe('Variant #3: `null` value', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesCache: null
                        }
                    ).getObfuscatedCode();
                });

                it('should pass validation', () => {
                    assert.doesNotThrow(testFunc);
                });
            });
        });

        describe('Variant #2: negative validation', () => {
            const expectedError: string = 'Passed value must be a dictionary with `string` values or `null` value';

            describe('Variant #1: string value', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesCache: <any>'cache'
                        }
                    ).getObfuscatedCode();
                });

                it('should not pass validation', () => {
                    assert.throws(testFunc, expectedError);
                });
            });

            describe('Variant #2: object with number values', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesCache: {
                                foo: <any>1,
                                bar: <any>2,
                            }
                        }
                    ).getObfuscatedCode();
                });

                it('should not pass validation', () => {
                    assert.throws(testFunc, expectedError);
                });
            });

            describe('Variant #3: object with mixed values', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesCache: {
                                foo: <any>1,
                                bar: '_0x1234567',
                            }
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
