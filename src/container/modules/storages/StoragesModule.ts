import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { TControlFlowStorage } from '../../../types/storages/TControlFlowStorage';
import { TCustomCodeHelperGroupStorage } from '../../../types/storages/TCustomCodeHelperGroupStorage';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../../interfaces/storages/string-array-storage/IStringArrayStorage';

import { ControlFlowStorage } from '../../../storages/custom-nodes/ControlFlowStorage';
import { CustomCodeHelperGroupStorage } from '../../../storages/custom-code-helpers/CustomCodeHelperGroupStorage';
import { StringArrayStorage } from '../../../storages/string-array/StringArrayStorage';

export const storagesModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // storages
    bind<TCustomCodeHelperGroupStorage>(ServiceIdentifiers.TCustomNodeGroupStorage)
        .to(CustomCodeHelperGroupStorage)
        .inSingletonScope();

    bind<IStringArrayStorage>(ServiceIdentifiers.IStringArrayStorage)
        .to(StringArrayStorage)
        .inSingletonScope();

    bind<interfaces.Newable<TControlFlowStorage>>(ServiceIdentifiers.Newable__TControlFlowStorage)
        .toConstructor(ControlFlowStorage);

    // controlFlowStorage factory
    bind<TControlFlowStorage>(ServiceIdentifiers.Factory__TControlFlowStorage)
        .toFactory<TControlFlowStorage>((context: interfaces.Context) => {
            return (): TControlFlowStorage => {
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
