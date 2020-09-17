import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { TControlFlowStorage } from '../../../types/storages/TControlFlowStorage';
import { TCustomCodeHelperGroupStorage } from '../../../types/storages/TCustomCodeHelperGroupStorage';

import { ILiteralNodesCacheStorage } from '../../../interfaces/storages/string-array-transformers/ILiteralNodesCacheStorage';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrapperLexicalScopeDataStorage } from '../../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrapperLexicalScopeDataStorage';
import { IStringArrayScopeCallsWrapperNamesDataStorage } from '../../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrapperNamesDataStorage';
import { IStringArrayStorage } from '../../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IVisitedLexicalScopeNodesStackStorage } from '../../../interfaces/storages/string-array-transformers/IVisitedLexicalScopeNodesStackStorage';

import { ControlFlowStorage } from '../../../storages/custom-nodes/ControlFlowStorage';
import { CustomCodeHelperGroupStorage } from '../../../storages/custom-code-helpers/CustomCodeHelperGroupStorage';
import { LiteralNodesCacheStorage } from '../../../storages/string-array-transformers/LiteralNodesCacheStorage';
import { StringArrayScopeCallsWrapperLexicalScopeDataStorage } from '../../../storages/string-array-transformers/StringArrayScopeCallsWrapperLexicalScopeDataStorage';
import { StringArrayScopeCallsWrapperNamesDataStorage } from '../../../storages/string-array-transformers/StringArrayScopeCallsWrapperNamesDataStorage';
import { StringArrayStorage } from '../../../storages/string-array-transformers/StringArrayStorage';
import { VisitedLexicalScopeNodesStackStorage } from '../../../storages/string-array-transformers/VisitedLexicalScopeNodesStackStorage';

export const storagesModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // storages
    bind<TCustomCodeHelperGroupStorage>(ServiceIdentifiers.TCustomNodeGroupStorage)
        .to(CustomCodeHelperGroupStorage)
        .inSingletonScope();

    bind<ILiteralNodesCacheStorage>(ServiceIdentifiers.ILiteralNodesCacheStorage)
        .to(LiteralNodesCacheStorage)
        .inSingletonScope();

    bind<IStringArrayStorage>(ServiceIdentifiers.IStringArrayStorage)
        .to(StringArrayStorage)
        .inSingletonScope();

    bind<IStringArrayScopeCallsWrapperLexicalScopeDataStorage>(ServiceIdentifiers.IStringArrayScopeCallsWrapperLexicalScopeDataStorage)
        .to(StringArrayScopeCallsWrapperLexicalScopeDataStorage)
        .inSingletonScope();

    bind<IStringArrayScopeCallsWrapperNamesDataStorage>(ServiceIdentifiers.IStringArrayScopeCallsWrapperNamesDataStorage)
        .to(StringArrayScopeCallsWrapperNamesDataStorage)
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
