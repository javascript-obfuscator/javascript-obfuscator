import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../../src/container/ServiceIdentifiers';

import { TInputOptions } from '../../../../../src/types/options/TInputOptions';

import { IInversifyContainerFacade } from '../../../../../src/interfaces/container/IInversifyContainerFacade';
import { IStringArrayStorage } from '../../../../../src/interfaces/storages/string-array-transformers/IStringArrayStorage';

import { StringArrayEncoding } from '../../../../../src/enums/StringArrayEncoding';

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

const getEncodedValue = (stringArrayStorage: IStringArrayStorage, value: string, decodeKey: string): string => {
    (<any>stringArrayStorage).rc4Keys = [
        'foo',
        decodeKey
    ];

    return stringArrayStorage.get(value)?.encodedValue ?? '';
};

describe('StringArrayStorage', () => {
    describe('rc4 encoded value collision fix', () => {
        const samplesCount: number = 100;

        let firstEncodedValue: string;
        let secondEncodedValue: string;
        let isCollisionHappened: boolean = false;

        before(() => {
            const stringArrayStorage: IStringArrayStorage = getStorageInstance({
                stringArrayEncoding: [StringArrayEncoding.Rc4]
            });

            for (let i = 0; i < samplesCount; i++) {
                firstEncodedValue = getEncodedValue(stringArrayStorage, '_15', 'CRDL');
                secondEncodedValue = getEncodedValue(stringArrayStorage, '_12', 'q9mB');

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
});
