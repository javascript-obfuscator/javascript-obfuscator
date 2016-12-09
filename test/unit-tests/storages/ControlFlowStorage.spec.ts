import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { assert } from 'chai';

import { TCustomNodeFactory } from '../../../src/types/container/TCustomNodeFactory';

import { ICustomNode } from '../../../src/interfaces/custom-nodes/ICustomNode';
import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IStorage } from '../../../src/interfaces/storages/IStorage';

import { CustomNodes } from '../../../src/enums/container/CustomNodes';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

describe('ControlFlowStorage', () => {
    describe('toString (): string', () => {
        it('should return correct ControlFlowStorage data after `.toString()` call', () => {
            const key1: string = 'key1';
            const key2: string = 'key2';
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade({
                controlFlowFlattening: true
            });
            const customNodeFactory: TCustomNodeFactory = inversifyContainerFacade
                .get<TCustomNodeFactory>(ServiceIdentifiers['Factory<ICustomNode>']);
            const controlFlowStorage: IStorage <ICustomNode> = inversifyContainerFacade
                .get<IStorage<ICustomNode>>(ServiceIdentifiers['IStorage<ICustomNode>']);
            const controlFlowStorageCallNode1: ICustomNode = customNodeFactory(CustomNodes.ControlFlowStorageCallNode);
            const controlFlowStorageCallNode2: ICustomNode = customNodeFactory(CustomNodes.ControlFlowStorageCallNode);

            controlFlowStorageCallNode1.initialize('controlFlowStorageName', key1, 1, 2);
            controlFlowStorageCallNode2.initialize('controlFlowStorageName', key2, 3, 4);

            controlFlowStorage.set(key1, controlFlowStorageCallNode1);
            controlFlowStorage.set(key2, controlFlowStorageCallNode2);

            assert.equal(
                controlFlowStorage.toString(),
                `${key1}: ${controlFlowStorageCallNode1.getCode()},${key2}: ${controlFlowStorageCallNode2.getCode()}`
            );
        });
    });
});
