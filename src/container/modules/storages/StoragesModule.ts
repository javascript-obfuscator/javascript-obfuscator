import { ContainerModule, ContainerModuleLoadOptions, ResolutionContext, Factory } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

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
import { StringControlFlowStorage } from '../../../storages/control-flow-transformers/StringControlFlowStorage';
import { StringArrayStorage } from '../../../storages/string-array-transformers/StringArrayStorage';
import { VisitedLexicalScopeNodesStackStorage } from '../../../storages/string-array-transformers/VisitedLexicalScopeNodesStackStorage';

export const storagesModule: ContainerModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
    // storages
    options
        .bind<TCustomCodeHelperGroupStorage>(ServiceIdentifiers.TCustomNodeGroupStorage)
        .to(CustomCodeHelperGroupStorage)
        .inSingletonScope();

    options
        .bind<IControlFlowStorage>(ServiceIdentifiers.IControlFlowStorage)
        .to(FunctionControlFlowStorage)
        .whenNamed(ControlFlowStorage.FunctionControlFlowStorage);

    options
        .bind<IGlobalIdentifierNamesCacheStorage>(ServiceIdentifiers.IGlobalIdentifierNamesCacheStorage)
        .to(GlobalIdentifierNamesCacheStorage)
        .inSingletonScope();

    options
        .bind<ILiteralNodesCacheStorage>(ServiceIdentifiers.ILiteralNodesCacheStorage)
        .to(LiteralNodesCacheStorage)
        .inSingletonScope();

    options
        .bind<IPropertyIdentifierNamesCacheStorage>(ServiceIdentifiers.IPropertyIdentifierNamesCacheStorage)
        .to(PropertyIdentifierNamesCacheStorage)
        .inSingletonScope();

    options.bind<IStringArrayStorage>(ServiceIdentifiers.IStringArrayStorage).to(StringArrayStorage).inSingletonScope();

    options
        .bind<IStringArrayScopeCallsWrappersDataStorage>(ServiceIdentifiers.IStringArrayScopeCallsWrappersDataStorage)
        .to(StringArrayScopeCallsWrappersDataStorage)
        .inSingletonScope();

    options
        .bind<IControlFlowStorage>(ServiceIdentifiers.IControlFlowStorage)
        .to(StringControlFlowStorage)
        .whenNamed(ControlFlowStorage.StringControlFlowStorage);

    options
        .bind<IVisitedLexicalScopeNodesStackStorage>(ServiceIdentifiers.IVisitedLexicalScopeNodesStackStorage)
        .to(VisitedLexicalScopeNodesStackStorage)
        .inSingletonScope();

    // controlFlowStorage factory
    options
        .bind<Factory<() => IControlFlowStorage, [ControlFlowStorage]>>(ServiceIdentifiers.Factory__TControlFlowStorage)
        .toFactory(
            (context: ResolutionContext) =>
                (controlFlowStorageName: ControlFlowStorage): (() => IControlFlowStorage) =>
                () =>
                    context.get<IControlFlowStorage>(ServiceIdentifiers.IControlFlowStorage, {
                        name: controlFlowStorageName
                    })
        );
});
