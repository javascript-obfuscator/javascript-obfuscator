import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { ICustomNodeGroup } from '../../../interfaces/custom-nodes/ICustomNodeGroup';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { ControlFlowStorage } from '../../../storages/control-flow/ControlFlowStorage';
import { CustomNodeGroupStorage } from '../../../storages/custom-node-group/CustomNodeGroupStorage';
import { StringArrayStorage } from '../../../storages/string-array/StringArrayStorage';

export const storagesModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // storages
    bind<IStorage<ICustomNodeGroup>>(ServiceIdentifiers['IStorage<ICustomNodeGroup>'])
        .to(CustomNodeGroupStorage)
        .inSingletonScope();

    bind<IStorage<ICustomNode>>(ServiceIdentifiers['IStorage<ICustomNode>'])
        .to(ControlFlowStorage);

    bind<IStorage<string>>(ServiceIdentifiers['IStorage<string>'])
        .to(StringArrayStorage)
        .inSingletonScope();

    // controlFlowStorage factory
    bind<IStorage<ICustomNode>>(ServiceIdentifiers['Factory<IStorage<ICustomNode>>'])
        .toFactory<IStorage<ICustomNode>>((context: interfaces.Context) => {
            return () => {
                return context.container.get<IStorage<ICustomNode>>(ServiceIdentifiers['IStorage<ICustomNode>']);
            };
        });
});
