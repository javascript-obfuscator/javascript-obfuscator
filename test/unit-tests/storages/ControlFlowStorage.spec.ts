/*
import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

 import { assert } from 'chai';

import { ICustomNode } from '../../../src/interfaces/custom-nodes/ICustomNode';
import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IStorage } from '../../../src/interfaces/storages/IStorage';

import { CustomNodes } from '../../../src/enums/container/CustomNodes';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

describe('ControlFlowStorage', () => {
    describe('toString (): string', () => {
        it('should returns obfuscated code if `.toString()` was called on `ObfuscationResult` object', () => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade({
                controlFlowFlattening: true
            });
            const controlFlowStorage: IStorage <ICustomNode> = inversifyContainerFacade
                .get<IStorage<ICustomNode>>(ServiceIdentifiers['IStorage<ICustomNode>']);
            const controlFlowStorageCallNode: ICustomNode = inversifyContainerFacade
                .getNamed<ICustomNode>(ServiceIdentifiers.ICustomNode, CustomNodes.ControlFlowStorageCallNode);

            controlFlowStorage.set('key1', controlFlowStorageCallNode);

            assert.equal(controlFlowStorage.toString(), [`key1: ${controlFlowStorageCallNode.getCode()}`]);
        });
    });
});
*/
