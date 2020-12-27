import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../../src/container/ServiceIdentifiers';

import { TInputOptions } from '../../../../../src/types/options/TInputOptions';

import { IInversifyContainerFacade } from '../../../../../src/interfaces/container/IInversifyContainerFacade';
import { IStringArrayStorage } from '../../../../../src/interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IStringArrayStorageItemData } from '../../../../../src/interfaces/storages/string-array-transformers/IStringArrayStorageItem';

import { StringArrayEncoding } from '../../../../../src/enums/node-transformers/string-array-transformers/StringArrayEncoding';

import { NO_ADDITIONAL_NODES_PRESET } from '../../../../../src/options/presets/NoCustomNodes';

import { InversifyContainerFacade } from '../../../../../src/container/InversifyContainerFacade';

/**
 * @returns {IMapStorage<string, V>}
 */
const getStorageInstance = (options: TInputOptions = {}): IStringArrayStorage => {
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

    inversifyContainerFacade.load('', '', {
        ...NO_ADDITIONAL_NODES_PRESET,
        stringArray: true,
        stringArrayThreshold: 1,
        ...options
    });

    const storage: IStringArrayStorage = inversifyContainerFacade.get(ServiceIdentifiers.IStringArrayStorage);

    storage.initialize();

    return storage;
};

const getStringArrayStorageItemData = (
    stringArrayStorage: IStringArrayStorage,
    value: string,
    decodeKeys: string[]
): IStringArrayStorageItemData | undefined => {
    (<any>stringArrayStorage).rc4Keys = [
        'foo',
        ...decodeKeys
    ];

    return stringArrayStorage.get(value);
};

describe('StringArrayStorage', () => {
    describe('rc4 encoded value collision fix', () => {
        const samplesCount: number = 100;

        let isCollisionHappened: boolean = false;

        before(() => {
            const stringArrayStorage: IStringArrayStorage = getStorageInstance({
                stringArrayEncoding: [StringArrayEncoding.Rc4]
            });

            for (let i = 0; i < samplesCount; i++) {
                const {encodedValue: firstEncodedValue} = getStringArrayStorageItemData(stringArrayStorage, '_15', ['CRDL']) || {};
                const {encodedValue: secondEncodedValue} = getStringArrayStorageItemData(stringArrayStorage, '_12', ['q9mB']) || {};

                if (firstEncodedValue === secondEncodedValue) {
                    isCollisionHappened = true;
                    break;
                }
            }
        });

        it('should not make a collision between different source values with different keys', () => {
            assert.equal(isCollisionHappened, false);
        });
    });

    describe('Cache key collision when rc4 and base64 encoded values for different input strings are the same', () => {
        const samplesCount: number = 100;

        let isCollisionHappened: boolean = false;

        before(() => {
            const stringArrayStorage: IStringArrayStorage = getStorageInstance({
                stringArrayEncoding: [
                    StringArrayEncoding.Base64,
                    StringArrayEncoding.Rc4
                ]
            });

            for (let i = 0; i < samplesCount; i++) {
                const {
                    encodedValue: firstEncodedValue,
                    encoding: firstEncodedValueEncoding
                } = getStringArrayStorageItemData(stringArrayStorage, 'zxL', ['&Jfx', '[lR4']) || {};
                const {
                    encodedValue: secondEncodedValue,
                    encoding: secondEncodedValueEncoding
                } = getStringArrayStorageItemData(stringArrayStorage, 'omC', ['&Jfx', '[lR4']) || {};

                if (
                    firstEncodedValue === secondEncodedValue
                    && firstEncodedValueEncoding === secondEncodedValueEncoding
                ) {
                    isCollisionHappened = true;
                    break;
                }
            }
        });

        it('should not make a cache key collision between different encoded input strings', () => {
            assert.equal(isCollisionHappened, false);
        });
    });
});
