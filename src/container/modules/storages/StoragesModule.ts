import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { TControlFlowStorage } from '../../../types/storages/TControlFlowStorage';
import { TConstructor } from '../../../types/TConstructor';
import { TCustomCodeHelperGroupStorage } from '../../../types/storages/TCustomCodeHelperGroupStorage';

import { IGlobalIdentifierNamesCacheStorage } from '../../../interfaces/storages/identifier-names-cache/IGlobalIdentifierNamesCacheStorage';
import { ILiteralNodesCacheStorage } from '../../../interfaces/storages/string-array-transformers/ILiteralNodesCacheStorage';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IPropertyIdentifierNamesCacheStorage } from '../../../interfaces/storages/identifier-names-cache/IPropertyIdentifierNamesCacheStorage';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrappersDataStorage } from '../../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrappersDataStorage';
import { IStringArrayStorage } from '../../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IVisitedLexicalScopeNodesStackStorage } from '../../../interfaces/storages/string-array-transformers/IVisitedLexicalScopeNodesStackStorage';

import { ControlFlowStorage } from '../../../storages/custom-nodes/ControlFlowStorage';
import { CustomCodeHelperGroupStorage } from '../../../storages/custom-code-helpers/CustomCodeHelperGroupStorage';
import { GlobalIdentifierNamesCacheStorage } from '../../../storages/identifier-names-cache/GlobalIdentifierNamesCacheStorage';
import { LiteralNodesCacheStorage } from '../../../storages/string-array-transformers/LiteralNodesCacheStorage';
import { PropertyIdentifierNamesCacheStorage } from '../../../storages/identifier-names-cache/PropertyIdentifierNamesCacheStorage';
import { StringArrayScopeCallsWrappersDataStorage } from '../../../storages/string-array-transformers/StringArrayScopeCallsWrappersDataStorage';
import { StringArrayStorage } from '../../../storages/string-array-transformers/StringArrayStorage';
import { VisitedLexicalScopeNodesStackStorage } from '../../../storages/string-array-transformers/VisitedLexicalScopeNodesStackStorage';

export const storagesModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // storages
    bind<TCustomCodeHelperGroupStorage>(ServiceIdentifiers.TCustomNodeGroupStorage)
        .to(CustomCodeHelperGroupStorage)
        .inSingletonScope();

    bind<IGlobalIdentifierNamesCacheStorage>(ServiceIdentifiers.IGlobalIdentifierNamesCacheStorage)
        .to(GlobalIdentifierNamesCacheStorage)
        .inSingletonScope();

    bind<ILiteralNodesCacheStorage>(ServiceIdentifiers.ILiteralNodesCacheStorage)
        .to(LiteralNodesCacheStorage)
        .inSingletonScope();

    bind<IPropertyIdentifierNamesCacheStorage>(ServiceIdentifiers.IPropertyIdentifierNamesCacheStorage)
        .to(PropertyIdentifierNamesCacheStorage)
        .inSingletonScope();

    bind<IStringArrayStorage>(ServiceIdentifiers.IStringArrayStorage)
        .to(StringArrayStorage)
        .inSingletonScope();

    bind<IStringArrayScopeCallsWrappersDataStorage>(ServiceIdentifiers.IStringArrayScopeCallsWrappersDataStorage)
        .to(StringArrayScopeCallsWrappersDataStorage)
        .inSingletonScope();

    bind<IVisitedLexicalScopeNodesStackStorage>(ServiceIdentifiers.IVisitedLexicalScopeNodesStackStorage)
        .to(VisitedLexicalScopeNodesStackStorage)
        .inSingletonScope();

    bind<interfaces.Newable<TControlFlowStorage>>(ServiceIdentifiers.Newable__TControlFlowStorage)
        .toConstructor(ControlFlowStorage);

    // controlFlowStorage factory
    bind<TControlFlowStorage>(ServiceIdentifiers.Factory__TControlFlowStorage)
        .toFactory<TControlFlowStorage>((context: interfaces.Context) => {
            return (): TControlFlowStorage => {
                const constructor = context.container
                    .get<TConstructor<[IRandomGenerator, IOptions], TControlFlowStorage>>(
                        ServiceIdentifiers.Newable__TControlFlowStorage
                    );
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
