import 'reflect-metadata';

import { assert } from 'chai';
import * as ESTree from 'estree';

import { ServiceIdentifiers } from '../../../../../src/container/ServiceIdentifiers';

import { TInputOptions } from '../../../../../src/types/options/TInputOptions';

import { IInversifyContainerFacade } from '../../../../../src/interfaces/container/IInversifyContainerFacade';
import { ILiteralNodesCacheStorage } from '../../../../../src/interfaces/storages/string-array-transformers/ILiteralNodesCacheStorage';

import { StringArrayEncoding } from '../../../../../src/enums/StringArrayEncoding';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { InversifyContainerFacade } from '../../../../../src/container/InversifyContainerFacade';
import { NodeFactory } from '../../../../../src/node/NodeFactory';

/**
 * @returns {IMapStorage<string, V>}
 */
const getStorageInstance = (options: TInputOptions = {}): ILiteralNodesCacheStorage => {
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

    inversifyContainerFacade.load('', '', {
        ...NO_ADDITIONAL_NODES_PRESET,
        ...options
    });

    const storage: ILiteralNodesCacheStorage = inversifyContainerFacade.get(ServiceIdentifiers.ILiteralNodesCacheStorage);

    storage.initialize();

    return storage;
};

describe('LiteralNodesCacheStorage', () => {
    describe('buildKey', () => {
        const expectedCacheKey: string = 'foo-true';

       let cacheKey: string;

        before(() => {
            const literalNodesCacheStorage: ILiteralNodesCacheStorage = getStorageInstance();

            cacheKey = literalNodesCacheStorage.buildKey(
                'foo',
                {
                    index: 1,
                    value: '_0x123abc',
                    encoding: StringArrayEncoding.Rc4,
                    encodedValue: 'encoded_value',
                    decodeKey: 'key'
                }
            );
        });

        it('should build a key for the storage', () => {
            assert.equal(cacheKey, expectedCacheKey);
        });
    });

    describe('shouldUseCachedValue', () => {
        const literalNode: ESTree.Literal =  NodeFactory.literalNode('foo');
        const key: string = 'key';

        describe('Encoding is not `rc4` and `stringArrayWrappersCount` option is disabled', () => {
            const expectedResult: boolean = true;

            let result: boolean;

            before(() => {
                const literalNodesCacheStorage: ILiteralNodesCacheStorage = getStorageInstance({
                    stringArrayWrappersCount: 0
                });

                literalNodesCacheStorage.set(key, literalNode);

                result = literalNodesCacheStorage.shouldUseCachedValue(
                    key,
                    {
                        index: 1,
                        value: '_0x123abc',
                        encoding: StringArrayEncoding.Base64,
                        encodedValue: 'encoded_value',
                        decodeKey: 'key'
                    },
                );
            });

            it('should check if can use cached value', () => {
                assert.equal(result, expectedResult);
            });
        });

        describe('Encoding is `rc4` and `stringArrayWrappersCount` option is disabled', () => {
            const expectedResult: boolean = false

            let result: boolean;

            before(() => {
                const literalNodesCacheStorage: ILiteralNodesCacheStorage = getStorageInstance({
                    stringArrayWrappersCount: 0
                });

                literalNodesCacheStorage.set(key, literalNode);

                result = literalNodesCacheStorage.shouldUseCachedValue(
                    key,
                    {
                        index: 1,
                        value: '_0x123abc',
                        encoding: StringArrayEncoding.Rc4,
                        encodedValue: 'encoded_value',
                        decodeKey: 'key'
                    },
                );
            });

            it('should check if can use cached value', () => {
                assert.equal(result, expectedResult);
            });
        });

        describe('Encoding is not `rc4` and `stringArrayWrappersCount` option is enabled', () => {
            const expectedResult: boolean = false;

            let result: boolean;

            before(() => {
                const literalNodesCacheStorage: ILiteralNodesCacheStorage = getStorageInstance({
                    stringArray: true,
                    stringArrayThreshold: 1,
                    stringArrayWrappersCount: 5
                });

                literalNodesCacheStorage.set(key, literalNode);

                result = literalNodesCacheStorage.shouldUseCachedValue(
                    key,
                    {
                        index: 1,
                        value: '_0x123abc',
                        encoding: StringArrayEncoding.Base64,
                        encodedValue: 'encoded_value',
                        decodeKey: 'key'
                    },
                );
            });

            it('should check if can use cached value', () => {
                assert.equal(result, expectedResult);
            });
        });
    });
});
