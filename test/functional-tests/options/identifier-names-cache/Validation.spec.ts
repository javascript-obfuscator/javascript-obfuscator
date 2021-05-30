import { assert } from 'chai';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

describe('`identifierNamesCache` validation', () => {
    describe('IsIdentifierNamesCache', () => {
        describe('Variant #1: positive validation', () => {
            describe('Variant #1: object with existing identifier names cached', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesCache: {
                                globalIdentifiers: {
                                    foo: '_0x123456'
                                },
                                propertyIdentifiers: {
                                    bar: '_0x654321'
                                }
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
                            identifierNamesCache: {
                                globalIdentifiers: {
                                    foo: '_0x123456'
                                },
                                propertyIdentifiers: {}
                            }
                        }
                    ).getObfuscatedCode();
                });

                it('should pass validation', () => {
                    assert.doesNotThrow(testFunc);
                });
            });

            describe('Variant #3: object with empty identifier names caches', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesCache: {
                                globalIdentifiers: {},
                                propertyIdentifiers: {}
                            }
                        }
                    ).getObfuscatedCode();
                });

                it('should pass validation', () => {
                    assert.doesNotThrow(testFunc);
                });
            });

            describe('Variant #4: `null` value', () => {
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
            const expectedError: string = 'Passed value must be an identifier names cache object or `null` value';

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

            describe('Variant #2: cache with number values inside single cache', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesCache: {
                                globalIdentifiers: {
                                    foo: <any>1,
                                    bar: <any>2,
                                },
                                propertyIdentifiers: {}
                            }
                        }
                    ).getObfuscatedCode();
                });

                it('should not pass validation', () => {
                    assert.throws(testFunc, expectedError);
                });
            });

            describe('Variant #3: cache with number values inside both caches', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesCache: {
                                globalIdentifiers: {
                                    foo: <any>1,
                                    bar: <any>2,
                                },
                                propertyIdentifiers: {
                                    baz: <any>3,
                                    bark: <any>4,
                                }
                            }
                        }
                    ).getObfuscatedCode();
                });

                it('should not pass validation', () => {
                    assert.throws(testFunc, expectedError);
                });
            });

            describe('Variant #4: cache with mixed values', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesCache: {
                                globalIdentifiers: {
                                    foo: <any>1,
                                    bar: '_0x1234567',
                                },
                                propertyIdentifiers: {
                                    foo: '_0x123456'
                                }
                            }
                        }
                    ).getObfuscatedCode();
                });

                it('should not pass validation', () => {
                    assert.throws(testFunc, expectedError);
                });
            });

            describe('Variant #4: cache with nullable dictionary fields', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            identifierNamesCache: {
                                globalIdentifiers: <any>null,
                                propertyIdentifiers: <any>null
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
