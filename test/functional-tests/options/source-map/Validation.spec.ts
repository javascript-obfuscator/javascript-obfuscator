import { assert } from 'chai';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';

import { ObfuscationTarget } from '../../../../src/enums/ObfuscationTarget';

describe('`sourceMap` validation', () => {
    describe('IsAllowedForObfuscationTarget', () => {
        describe('Variant #1: positive validation', () => {
            describe('Variant #1: obfuscation target: `browser`', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            sourceMap: true,
                            target: ObfuscationTarget.Browser
                        }
                    ).getObfuscatedCode();
                });

                it('should pass validation when obfuscation target is `browser`', () => {
                    assert.doesNotThrow(testFunc);
                });
            });

            describe('Variant #2: obfuscation target: `node` and default value', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            sourceMap: false,
                            target: ObfuscationTarget.Node
                        }
                    ).getObfuscatedCode();
                });

                it('should pass validation when obfuscation target is `node` and value is default', () => {
                    assert.doesNotThrow(testFunc);
                });
            });
        });

        describe('Variant #2: negative validation', () => {
            const expectedError: string = 'This option allowed only for obfuscation targets';

            let testFunc: () => string;

            beforeEach(() => {
                testFunc = () => JavaScriptObfuscator.obfuscate(
                    '',
                    {
                        ...NO_ADDITIONAL_NODES_PRESET,
                        sourceMap: true,
                        target: ObfuscationTarget.Node
                    }
                ).getObfuscatedCode();
            });

            it('should not pass validation when obfuscation target is `node` and value is not default', () => {
                assert.throws(testFunc, expectedError);
            });
        });
    });
});
