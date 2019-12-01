import 'reflect-metadata';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { assert } from 'chai';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IObfuscatedCode } from '../../../src/interfaces/source-code/IObfuscatedCode';

import { SourceMapMode } from '../../../src/enums/source-map/SourceMapMode';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

/**
 * @param rawObfuscatedCode
 * @param sourceMap
 * @param sourceMapBaseUrl
 * @param sourceMapFileName
 * @param sourceMapMode
 */
function getObfuscatedCode (
    rawObfuscatedCode: string,
    sourceMap: string,
    sourceMapBaseUrl: string,
    sourceMapFileName: string,
    sourceMapMode: SourceMapMode
): IObfuscatedCode {
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

    inversifyContainerFacade.load(
        '',
        '',
        {
            sourceMap: true,
            sourceMapBaseUrl: sourceMapBaseUrl,
            sourceMapFileName: sourceMapFileName,
            sourceMapMode: sourceMapMode
        }
    );

    const obfuscatedCode: IObfuscatedCode = inversifyContainerFacade
        .get<IObfuscatedCode>(ServiceIdentifiers.IObfuscatedCode);

    obfuscatedCode.initialize(rawObfuscatedCode, sourceMap);

    return obfuscatedCode;
}

describe('ObfuscatedCode', () => {
    const expectedObfuscatedCode: string = 'var test = 1;';
    const sourceMap: string = 'test';

    describe('constructor', () => {
        let obfuscatedCode: IObfuscatedCode;

        before(() => {
            obfuscatedCode = getObfuscatedCode(
                expectedObfuscatedCode,
                sourceMap,
                '',
                '',
                SourceMapMode.Separate
            );
        });

        it('should return obfuscated code if `.toString()` was called on `ObfuscatedCode` object', () => {
            assert.equal(obfuscatedCode.toString(), expectedObfuscatedCode);
        });
    });

    describe('getObfuscatedCode', () => {
        let obfuscatedCode: string;

        describe('source map doest\'t exist', () => {
            before(() => {
                obfuscatedCode = getObfuscatedCode(
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
            const regExp: RegExp = /data:application\/json;base64/;

            before(() => {
                obfuscatedCode = getObfuscatedCode(
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
                obfuscatedCode = getObfuscatedCode(
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
                obfuscatedCode = getObfuscatedCode(
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
});
