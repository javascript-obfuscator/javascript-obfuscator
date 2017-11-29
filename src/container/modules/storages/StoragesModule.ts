import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { TControlFlowStorage } from '../../../types/storages/TControlFlowStorage';
import { TCustomNodeGroupStorage } from '../../../types/storages/TCustomNodeGroupStorage';
import { TStringArrayStorage } from '../../../types/storages/TStringArrayStorage';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { ControlFlowStorage } from '../../../storages/control-flow/ControlFlowStorage';
import { CustomNodeGroupStorage } from '../../../storages/custom-node-group/CustomNodeGroupStorage';
import { StringArrayStorage } from '../../../storages/string-array/StringArrayStorage';

export const storagesModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // storages
    bind<TCustomNodeGroupStorage>(ServiceIdentifiers.TCustomNodeGroupStorage)
        .to(CustomNodeGroupStorage)
        .inSingletonScope();

    bind<TStringArrayStorage>(ServiceIdentifiers.TStringArrayStorage)
        .to(StringArrayStorage)
        .inSingletonScope();

    bind<interfaces.Newable<TControlFlowStorage>>(ServiceIdentifiers.Newable__TControlFlowStorage)
        .toConstructor(ControlFlowStorage);

    // controlFlowStorage factory
    bind<TControlFlowStorage>(ServiceIdentifiers.Factory__TControlFlowStorage)
        .toFactory<TControlFlowStorage>((context: interfaces.Context) => {
            return () => {
                const constructor: interfaces.Newable<TControlFlowStorage> = context.container
                    .get<interfaces.Newable<TControlFlowStorage>>(ServiceIdentifiers.Newable__TControlFlowStorage);
                const randomGenerator: IRandomGenerator = context.container
                    .get<IRandomGenerator>(ServiceIdentifiers.IRandomGenerator);
                const options: IOptions = context.container
                    .get<IOptions>(ServiceIdentifiers.IOptions);

                const storage: TControlFlowStorage = new constructor(randomGenerator, options);

                storage.initialize();

                return storage;
            };
        });
});
