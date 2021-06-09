import 'reflect-metadata';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { assert } from 'chai';

import { TInputOptions } from '../../../src/types/options/TInputOptions';
import { TTypeFromEnum } from '../../../src/types/utils/TTypeFromEnum';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IObfuscationResult } from '../../../src/interfaces/source-code/IObfuscationResult';
import { IOptions } from '../../../src/interfaces/options/IOptions';

import { SourceMapMode } from '../../../src/enums/source-map/SourceMapMode';

import { DEFAULT_PRESET } from '../../../src/options/presets/Default';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

/**
 * @param {string} rawObfuscatedCode
 * @param {TInputOptions} options
 * @returns {IObfuscationResult}
 */
function getObfuscationResult (
    rawObfuscatedCode: string,
    options: TInputOptions
): IObfuscationResult {
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

    inversifyContainerFacade.load(
        '',
        '',
        {
            ...DEFAULT_PRESET,
            ...options
        }
    );

    const obfuscationResult: IObfuscationResult = inversifyContainerFacade
        .get<IObfuscationResult>(ServiceIdentifiers.IObfuscationResult);

    obfuscationResult.initialize(rawObfuscatedCode, '');

    return obfuscationResult;
}

/**
 * @param rawObfuscatedCode
 * @param sourceMap
 * @param sourceMapBaseUrl
 * @param sourceMapFileName
 * @param sourceMapMode
 */
function getSourceMapObfuscationResult (
    rawObfuscatedCode: string,
    sourceMap: string,
    sourceMapBaseUrl: string,
    sourceMapFileName: string,
    sourceMapMode: TTypeFromEnum<typeof SourceMapMode>
): IObfuscationResult {
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

    inversifyContainerFacade.load(
        '',
        '',
        {
            ...DEFAULT_PRESET,
            sourceMap: true,
            sourceMapBaseUrl,
            sourceMapFileName,
            sourceMapMode
        }
    );

    const obfuscationResult: IObfuscationResult = inversifyContainerFacade
        .get<IObfuscationResult>(ServiceIdentifiers.IObfuscationResult);

    obfuscationResult.initialize(rawObfuscatedCode, sourceMap);

    return obfuscationResult;
}

describe('ObfuscatedCode', () => {
    const expectedObfuscatedCode: string = 'var test = 1;';
    const sourceMap: string = 'test';

    describe('constructor', () => {
        let obfuscationResult: IObfuscationResult;

        before(() => {
            obfuscationResult = getSourceMapObfuscationResult(
                expectedObfuscatedCode,
                sourceMap,
                '',
                '',
                SourceMapMode.Separate
            );
        });

        it('should return obfuscation result if `.toString()` was called on `ObfuscationResult` object', () => {
            assert.equal(obfuscationResult.toString(), expectedObfuscatedCode);
        });
    });

    describe('getObfuscatedCode', () => {
        let obfuscatedCode: string;

        describe('source map doest\'t exist', () => {
            before(() => {
                obfuscatedCode = getSourceMapObfuscationResult(
                    expectedObfuscatedCode,
                    '',
                    '',
                    '',
                    SourceMapMode.Separate
                ).getObfuscatedCode();
            });

            it('should return untouched obfuscated code', () => {
                assert.equal(obfuscatedCode, expectedObfuscatedCode);
            });
        });

        describe('source map is set, source map mode is `inline`', () => {
            const regExp: RegExp = /data:application\/json;base64,dGVzdA==/;

            before(() => {
                obfuscatedCode = getSourceMapObfuscationResult(
                    expectedObfuscatedCode,
                    sourceMap,
                    '',
                    '',
                    SourceMapMode.Inline
                ).getObfuscatedCode();
            });

            it('should add source map to obfuscated code as base64 encoded string', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('source map mode is `separate`', () => {
            const regExp: RegExp = /sourceMappingURL=http:\/\/example\.com\/output\.js\.map/;

            before(() => {
                obfuscatedCode = getSourceMapObfuscationResult(
                    expectedObfuscatedCode,
                    sourceMap,
                    'http://example.com',
                    'output.js.map',
                    SourceMapMode.Separate
                ).getObfuscatedCode();
            });

            it('should add source map import to obfuscated code', () => {
                assert.match(obfuscatedCode, regExp);
            });
        });

        describe('source map mode is `separate`, `sourceMapUrl` is not set', () => {
            before(() => {
                obfuscatedCode = getSourceMapObfuscationResult(
                    expectedObfuscatedCode,
                    sourceMap,
                    '',
                    '',
                    SourceMapMode.Separate
                ).getObfuscatedCode();
            });

            it('should not touch obfuscated code', () => {
                assert.equal(obfuscatedCode, expectedObfuscatedCode);
            });
        });
    });

    describe('getOptions', () => {
        const seed: number = 1234;
        const expectedOptions: IOptions = {
            ...DEFAULT_PRESET,
            seed
        } as IOptions;
        let options: IOptions;

        before(() => {
            options = getObfuscationResult(
                expectedObfuscatedCode,
                {
                    seed
                }
            ).getOptions();
        });

        it('should return options object', () => {
            assert.deepEqual(options, expectedOptions);
        });
    });
});
