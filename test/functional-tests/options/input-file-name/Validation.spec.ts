import { assert } from 'chai';

import { JavaScriptObfuscator } from '../../../../src/JavaScriptObfuscatorFacade';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../src/options/presets/NoCustomNodes';
import { SourceMapSourcesMode } from '../../../../src/enums/source-map/SourceMapSourcesMode';

describe('`inputFileName` validation', () => {
    describe('IsInputFileName', () => {
        describe('Variant #1: positive validation', () => {
            describe('Variant #1: empty string when `sourceMapSourcesMode: \'sources-content\'', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            inputFileName: '',
                            sourceMapSourcesMode: SourceMapSourcesMode.SourcesContent
                        }
                    ).getObfuscatedCode();
                });

                it('should pass validation', () => {
                    assert.doesNotThrow(testFunc);
                });
            });

            describe('Variant #2: string with input file name when `sourceMapSourcesMode: \'sources\'', () => {
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            inputFileName: 'some-file.js',
                            sourceMapSourcesMode: SourceMapSourcesMode.Sources
                        }
                    ).getObfuscatedCode();
                });

                it('should pass validation', () => {
                    assert.doesNotThrow(testFunc);
                });
            });
        });

        describe('Variant #2: negative validation', () => {
            describe('Variant #1: empty string when `sourceMapSourcesMode: \'sources\'', () => {
                const expectedError: string = 'should not be empty';
                let testFunc: () => string;

                beforeEach(() => {
                    testFunc = () => JavaScriptObfuscator.obfuscate(
                        '',
                        {
                            ...NO_ADDITIONAL_NODES_PRESET,
                            inputFileName: '',
                            sourceMapSourcesMode: SourceMapSourcesMode.Sources
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
