import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { assert } from 'chai';

import { TSourceMapMode } from '../../../src/types/TSourceMapMode';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IObfuscationResult } from '../../../src/interfaces/IObfuscationResult';
import { ISourceMapCorrector } from '../../../src/interfaces/ISourceMapCorrector';

import { SourceMapMode } from '../../../src/enums/SourceMapMode';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

/**
 * @param obfuscatedCode
 * @param sourceMap
 * @param sourceMapBaseUrl
 * @param sourceMapFileName
 * @param sourceMapMode
 */
function getCorrectedObfuscationResult (
    obfuscatedCode: string,
    sourceMap: string,
    sourceMapBaseUrl: string,
    sourceMapFileName: string,
    sourceMapMode: TSourceMapMode
): IObfuscationResult {
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade({
        sourceMap: true,
        sourceMapBaseUrl: sourceMapBaseUrl,
        sourceMapFileName: sourceMapFileName,
        sourceMapMode: sourceMapMode
    });
    const sourceMapCorrector: ISourceMapCorrector = inversifyContainerFacade
        .get<ISourceMapCorrector>(ServiceIdentifiers.ISourceMapCorrector);

    return sourceMapCorrector.correct(obfuscatedCode, sourceMap);
}

describe('SourceMapCorrector', () => {
    describe('correct (): IObfuscationResult', () => {
        let expectedObfuscationResult: IObfuscationResult,
            obfuscatedCode: string = 'var test = 1;',
            sourceMap: string = 'test';

        it('should return untouched obfuscated code if source map does not exist', () => {
            expectedObfuscationResult = getCorrectedObfuscationResult(
                obfuscatedCode,
                '',
                '',
                '',
                SourceMapMode.Separate)
            ;

            assert.equal(expectedObfuscationResult.getObfuscatedCode(), obfuscatedCode);
        });

        describe('if source map is set and source map mode is `inline`', () => {
            before (() => {
                expectedObfuscationResult = getCorrectedObfuscationResult(
                    obfuscatedCode,
                    sourceMap,
                    '',
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
                'http://example.com',
                'output.js.map',
                SourceMapMode.Separate
            );

            assert.match(expectedObfuscationResult.getObfuscatedCode(), /sourceMappingURL=http:\/\/example\.com\/output\.js\.map/);
        });

        it('should not touch obfuscated code if source map mode is `separate` and `sourceMapUrl` is not set', () => {
            expectedObfuscationResult = getCorrectedObfuscationResult(
                obfuscatedCode,
                sourceMap,
                '',
                '',
                SourceMapMode.Separate
            );

            assert.equal(expectedObfuscationResult.getObfuscatedCode(), obfuscatedCode);
        });
    });
});
