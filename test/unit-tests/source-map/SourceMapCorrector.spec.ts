import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { assert } from 'chai';

import { TSourceMapMode } from '../../../src/types/source-map/TSourceMapMode';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IObfuscationResult } from '../../../src/interfaces/IObfuscationResult';
import { ISourceMapCorrector } from '../../../src/interfaces/source-map/ISourceMapCorrector';

import { SourceMapMode } from '../../../src/enums/source-map/SourceMapMode';

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
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

    inversifyContainerFacade.load(
        '',
        {
            sourceMap: true,
            sourceMapBaseUrl: sourceMapBaseUrl,
            sourceMapFileName: sourceMapFileName,
            sourceMapMode: sourceMapMode
        }
    );

    const sourceMapCorrector: ISourceMapCorrector = inversifyContainerFacade
        .get<ISourceMapCorrector>(ServiceIdentifiers.ISourceMapCorrector);

    return sourceMapCorrector.correct(obfuscatedCode, sourceMap);
}

describe('SourceMapCorrector', () => {
    describe('correct (): IObfuscationResult', () => {
        const expectedObfuscatedCode: string = 'var test = 1;';
        const sourceMap: string = 'test';

        let obfuscationResult: IObfuscationResult,
            obfuscatedCode: string;

        describe('source map doest\'t exist', () => {
            before(() => {
                obfuscationResult = getCorrectedObfuscationResult(
                    expectedObfuscatedCode,
                    '',
                    '',
                    '',
                    SourceMapMode.Separate
                );
                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should return untouched obfuscated code', () => {
                assert.equal(obfuscatedCode, expectedObfuscatedCode);
            });
        });

        describe('source map is set, source map mode is `inline`', () => {
            const regExp: RegExp = /data:application\/json;base64/;

            before(() => {
                obfuscationResult = getCorrectedObfuscationResult(
                    expectedObfuscatedCode,
                    sourceMap,
                    '',
                    '',
                    SourceMapMode.Inline
                );
                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should add source map to obfuscated code as base64 encoded string', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('source map mode is `separate`', () => {
            const regExp: RegExp = /sourceMappingURL=http:\/\/example\.com\/output\.js\.map/;

            before(() => {
                obfuscationResult = getCorrectedObfuscationResult(
                    expectedObfuscatedCode,
                    sourceMap,
                    'http://example.com',
                    'output.js.map',
                    SourceMapMode.Separate
                );
                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should add source map import to obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('source map mode is `separate`, `sourceMapUrl` is not set', () => {
            before(() => {
                obfuscationResult = getCorrectedObfuscationResult(
                    expectedObfuscatedCode,
                    sourceMap,
                    '',
                    '',
                    SourceMapMode.Separate
                );
                obfuscatedCode = obfuscationResult.getObfuscatedCode();
            });

            it('should not touch obfuscated code', () => {
                assert.equal(obfuscatedCode, expectedObfuscatedCode);
            });
        });
    });
});
