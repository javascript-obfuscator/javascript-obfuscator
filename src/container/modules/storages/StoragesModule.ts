import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { TControlFlowStorageFactory } from '../../../types/container/node-transformers/TControlFlowStorageFactory';
import {
    TControlFlowStorageFactoryCreator
} from '../../../types/container/node-transformers/TControlFlowStorageFactoryCreator';
import { TCustomCodeHelperGroupStorage } from '../../../types/storages/TCustomCodeHelperGroupStorage';

import { IControlFlowStorage } from '../../../interfaces/storages/control-flow-transformers/IControlFlowStorage';
import { IGlobalIdentifierNamesCacheStorage } from '../../../interfaces/storages/identifier-names-cache/IGlobalIdentifierNamesCacheStorage';
import { ILiteralNodesCacheStorage } from '../../../interfaces/storages/string-array-transformers/ILiteralNodesCacheStorage';
import { IPropertyIdentifierNamesCacheStorage } from '../../../interfaces/storages/identifier-names-cache/IPropertyIdentifierNamesCacheStorage';
import { IStringArrayScopeCallsWrappersDataStorage } from '../../../interfaces/storages/string-array-transformers/IStringArrayScopeCallsWrappersDataStorage';
import { IStringArrayStorage } from '../../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IVisitedLexicalScopeNodesStackStorage } from '../../../interfaces/storages/string-array-transformers/IVisitedLexicalScopeNodesStackStorage';

import { ControlFlowStorage } from '../../../enums/storages/ControlFlowStorage';

import { CustomCodeHelperGroupStorage } from '../../../storages/custom-code-helpers/CustomCodeHelperGroupStorage';
import { FunctionControlFlowStorage } from '../../../storages/control-flow-transformers/FunctionControlFlowStorage';
import { GlobalIdentifierNamesCacheStorage } from '../../../storages/identifier-names-cache/GlobalIdentifierNamesCacheStorage';
import { LiteralNodesCacheStorage } from '../../../storages/string-array-transformers/LiteralNodesCacheStorage';
import { PropertyIdentifierNamesCacheStorage } from '../../../storages/identifier-names-cache/PropertyIdentifierNamesCacheStorage';
import { StringArrayScopeCallsWrappersDataStorage } from '../../../storages/string-array-transformers/StringArrayScopeCallsWrappersDataStorage';
import {
    StringControlFlowStorage
} from '../../../storages/control-flow-transformers/StringControlFlowStorage';
import { StringArrayStorage } from '../../../storages/string-array-transformers/StringArrayStorage';
import { VisitedLexicalScopeNodesStackStorage } from '../../../storages/string-array-transformers/VisitedLexicalScopeNodesStackStorage';

export const storagesModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // storages
    bind<TCustomCodeHelperGroupStorage>(ServiceIdentifiers.TCustomNodeGroupStorage)
        .to(CustomCodeHelperGroupStorage)
        .inSingletonScope();

    bind<IControlFlowStorage>(ServiceIdentifiers.IControlFlowStorage)
        .to(FunctionControlFlowStorage)
        .whenTargetNamed(ControlFlowStorage.FunctionControlFlowStorage);

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

    bind<IControlFlowStorage>(ServiceIdentifiers.IControlFlowStorage)
        .to(StringControlFlowStorage)
        .whenTargetNamed(ControlFlowStorage.StringControlFlowStorage);

    bind<IVisitedLexicalScopeNodesStackStorage>(ServiceIdentifiers.IVisitedLexicalScopeNodesStackStorage)
        .to(VisitedLexicalScopeNodesStackStorage)
        .inSingletonScope();

    // controlFlowStorage factory
    bind<IControlFlowStorage>(ServiceIdentifiers.Factory__TControlFlowStorage)
        .toFactory((context: interfaces.Context): TControlFlowStorageFactoryCreator =>
            (controlFlowStorageName: ControlFlowStorage): TControlFlowStorageFactory => (): IControlFlowStorage =>
                context.container.getNamed<IControlFlowStorage>(
                ServiceIdentifiers.IControlFlowStorage,
                controlFlowStorageName
                )
            );
});
