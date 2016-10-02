import { IObfuscationResult } from '../../src/interfaces/IObfuscationResult';
import { ISourceMapCorrector } from '../../src/interfaces/ISourceMapCorrector';

import { TSourceMapMode } from '../../src/types/TSourceMapMode';

import { SourceMapMode } from '../../src/enums/SourceMapMode';

import { ObfuscationResult } from '../../src/ObfuscationResult';
import { SourceMapCorrector } from '../../src/SourceMapCorrector';

const assert: Chai.AssertStatic = require('chai').assert;

/**
 * @param obfuscatedCode
 * @param sourceMap
 * @param sourceMapUrl
 * @param sourceMapMode
 */
function getCorrectedObfuscationResult (
    obfuscatedCode: string,
    sourceMap: string,
    sourceMapUrl: string,
    sourceMapMode: TSourceMapMode
): IObfuscationResult {
    let obfuscationResult: IObfuscationResult = new ObfuscationResult(obfuscatedCode, sourceMap),
        sourceMapCorrector: ISourceMapCorrector = new SourceMapCorrector(
            obfuscationResult,
            sourceMapUrl,
            sourceMapMode
        );

    return sourceMapCorrector.correct();
}

describe('SourceMapCorrector', () => {
    describe('correct (): IObfuscationResult', () => {
        let expectedObfuscationResult: IObfuscationResult,
            obfuscatedCode: string = 'var test = 1;',
            sourceMap: string = 'test';

        it('should return untouched obfuscated code if source map does not exist', () => {
            expectedObfuscationResult = getCorrectedObfuscationResult(obfuscatedCode, '', '', SourceMapMode.Separate);

            assert.equal(expectedObfuscationResult.getObfuscatedCode(), obfuscatedCode);
        });

        describe('if source map is set and source map mode is `inline`', () => {
            before (() => {
                expectedObfuscationResult = getCorrectedObfuscationResult(
                    obfuscatedCode,
                    sourceMap,
                    '',
                    SourceMapMode.Inline
                );
            });

            it('should add source map to obfuscated code as base64 encoded string', () => {
                assert.match(expectedObfuscationResult.getObfuscatedCode(), /data:application\/json;base64/);
            });
        });

        it('should add source map import to obfuscated code if source map mode is `separate`', () => {
            expectedObfuscationResult = getCorrectedObfuscationResult(
                obfuscatedCode,
                sourceMap,
                'output.js.map',
                SourceMapMode.Separate
            );

            assert.match(expectedObfuscationResult.getObfuscatedCode(), /sourceMappingURL=output\.js\.map/);
        });

        it('should not touch obfuscated code if source map mode is `separate` and `sourceMapUrl` is not set', () => {
            expectedObfuscationResult = getCorrectedObfuscationResult(
                obfuscatedCode,
                sourceMap,
                '',
                SourceMapMode.Separate
            );

            assert.equal(expectedObfuscationResult.getObfuscatedCode(), obfuscatedCode);
        });
    });
});
