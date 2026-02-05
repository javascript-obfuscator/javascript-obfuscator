import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, ContainerModuleLoadOptions, Factory } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICustomCodeHelper } from '../../../interfaces/custom-code-helpers/ICustomCodeHelper';
import { ICustomCodeHelperFormatter } from '../../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { ICustomCodeHelperGroup } from '../../../interfaces/custom-code-helpers/ICustomCodeHelperGroup';
import { ICustomCodeHelperObfuscator } from '../../../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';

import { CustomCodeHelper } from '../../../enums/custom-code-helpers/CustomCodeHelper';
import { CustomCodeHelperGroup } from '../../../enums/custom-code-helpers/CustomCodeHelperGroup';

import { ConsoleOutputCodeHelperGroup } from '../../../custom-code-helpers/console-output/group/ConsoleOutputCodeHelperGroup';
import { DebugProtectionCodeHelperGroup } from '../../../custom-code-helpers/debug-protection/group/DebugProtectionCodeHelperGroup';
import { DomainLockCustomCodeHelperGroup } from '../../../custom-code-helpers/domain-lock/group/DomainLockCustomCodeHelperGroup';
import { SelfDefendingCodeHelperGroup } from '../../../custom-code-helpers/self-defending/group/SelfDefendingCodeHelperGroup';
import { StringArrayCodeHelperGroup } from '../../../custom-code-helpers/string-array/group/StringArrayCodeHelperGroup';

import { ConsoleOutputDisableCodeHelper } from '../../../custom-code-helpers/console-output/ConsoleOutputDisableCodeHelper';
import { CustomCodeHelperFormatter } from '../../../custom-code-helpers/CustomCodeHelperFormatter';
import { CustomCodeHelperObfuscator } from '../../../custom-code-helpers/CustomCodeHelperObfuscator';
import { DebugProtectionFunctionCallCodeHelper } from '../../../custom-code-helpers/debug-protection/DebugProtectionFunctionCallCodeHelper';
import { DebugProtectionFunctionIntervalCodeHelper } from '../../../custom-code-helpers/debug-protection/DebugProtectionFunctionIntervalCodeHelper';
import { DebugProtectionFunctionCodeHelper } from '../../../custom-code-helpers/debug-protection/DebugProtectionFunctionCodeHelper';
import { DomainLockCodeHelper } from '../../../custom-code-helpers/domain-lock/DomainLockCodeHelper';
import { CallsControllerFunctionCodeHelper } from '../../../custom-code-helpers/calls-controller/CallsControllerFunctionCodeHelper';
import { SelfDefendingCodeHelper } from '../../../custom-code-helpers/self-defending/SelfDefendingCodeHelper';
import { StringArrayCallsWrapperCodeHelper } from '../../../custom-code-helpers/string-array/StringArrayCallsWrapperCodeHelper';
import { StringArrayCallsWrapperBase64CodeHelper } from '../../../custom-code-helpers/string-array/StringArrayCallsWrapperBase64CodeHelper';
import { StringArrayCallsWrapperRc4CodeHelper } from '../../../custom-code-helpers/string-array/StringArrayCallsWrapperRc4CodeHelper';
import { StringArrayCodeHelper } from '../../../custom-code-helpers/string-array/StringArrayCodeHelper';
import { StringArrayRotateFunctionCodeHelper } from '../../../custom-code-helpers/string-array/StringArrayRotateFunctionCodeHelper';

export const customCodeHelpersModule: ContainerModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
    // custom code helpers
    options
        .bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(ConsoleOutputDisableCodeHelper)
        .whenNamed(CustomCodeHelper.ConsoleOutputDisable);

    options
        .bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(DebugProtectionFunctionCallCodeHelper)
        .whenNamed(CustomCodeHelper.DebugProtectionFunctionCall);

    options
        .bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(DebugProtectionFunctionIntervalCodeHelper)
        .whenNamed(CustomCodeHelper.DebugProtectionFunctionInterval);

    options
        .bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(DebugProtectionFunctionCodeHelper)
        .whenNamed(CustomCodeHelper.DebugProtectionFunction);

    options
        .bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(DomainLockCodeHelper)
        .whenNamed(CustomCodeHelper.DomainLock);

    options
        .bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(CallsControllerFunctionCodeHelper)
        .whenNamed(CustomCodeHelper.CallsControllerFunction);

    options
        .bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(SelfDefendingCodeHelper)
        .whenNamed(CustomCodeHelper.SelfDefending);

    options
        .bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(StringArrayCallsWrapperCodeHelper)
        .whenNamed(CustomCodeHelper.StringArrayCallsWrapper);

    options
        .bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(StringArrayCallsWrapperBase64CodeHelper)
        .whenNamed(CustomCodeHelper.StringArrayCallsWrapperBase64);

    options
        .bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(StringArrayCallsWrapperRc4CodeHelper)
        .whenNamed(CustomCodeHelper.StringArrayCallsWrapperRc4);

    options
        .bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(StringArrayCodeHelper)
        .whenNamed(CustomCodeHelper.StringArray);

    options
        .bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(StringArrayRotateFunctionCodeHelper)
        .whenNamed(CustomCodeHelper.StringArrayRotateFunction);

    // code helper groups
    options
        .bind<ICustomCodeHelperGroup>(ServiceIdentifiers.ICustomCodeHelperGroup)
        .to(ConsoleOutputCodeHelperGroup)
        .whenNamed(CustomCodeHelperGroup.ConsoleOutput);

    options
        .bind<ICustomCodeHelperGroup>(ServiceIdentifiers.ICustomCodeHelperGroup)
        .to(DebugProtectionCodeHelperGroup)
        .whenNamed(CustomCodeHelperGroup.DebugProtection);

    options
        .bind<ICustomCodeHelperGroup>(ServiceIdentifiers.ICustomCodeHelperGroup)
        .to(DomainLockCustomCodeHelperGroup)
        .whenNamed(CustomCodeHelperGroup.DomainLock);

    options
        .bind<ICustomCodeHelperGroup>(ServiceIdentifiers.ICustomCodeHelperGroup)
        .to(SelfDefendingCodeHelperGroup)
        .whenNamed(CustomCodeHelperGroup.SelfDefending);

    options
        .bind<ICustomCodeHelperGroup>(ServiceIdentifiers.ICustomCodeHelperGroup)
        .to(StringArrayCodeHelperGroup)
        .whenNamed(CustomCodeHelperGroup.StringArray);

    // customCodeHelper factory
    options
        .bind<Factory<ICustomCodeHelper, [CustomCodeHelper]>>(ServiceIdentifiers.Factory__ICustomCodeHelper)
        .toFactory(
            InversifyContainerFacade.getFactory<CustomCodeHelper, ICustomCodeHelper>(
                ServiceIdentifiers.ICustomCodeHelper
            )
        );

    // customCodeHelperGroup factory
    options
        .bind<
            Factory<ICustomCodeHelperGroup, [CustomCodeHelperGroup]>
        >(ServiceIdentifiers.Factory__ICustomCodeHelperGroup)
        .toFactory(
            InversifyContainerFacade.getFactory<CustomCodeHelperGroup, ICustomCodeHelperGroup>(
                ServiceIdentifiers.ICustomCodeHelperGroup
            )
        );

    // custom code helper formatter
    options
        .bind<ICustomCodeHelperFormatter>(ServiceIdentifiers.ICustomCodeHelperFormatter)
        .to(CustomCodeHelperFormatter)
        .inSingletonScope();

    // custom code helper obfuscator
    options
        .bind<ICustomCodeHelperObfuscator>(ServiceIdentifiers.ICustomCodeHelperObfuscator)
        .to(CustomCodeHelperObfuscator)
        .inSingletonScope();
});
