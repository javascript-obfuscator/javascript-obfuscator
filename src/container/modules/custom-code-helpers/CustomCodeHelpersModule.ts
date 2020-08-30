import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
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
import { SelfDefendingUnicodeCodeHelper } from '../../../custom-code-helpers/self-defending/SelfDefendingUnicodeCodeHelper';
import { StringArrayCallsWrapperCodeHelper } from '../../../custom-code-helpers/string-array/StringArrayCallsWrapperCodeHelper';
import { StringArrayCallsWrapperBase64CodeHelper } from '../../../custom-code-helpers/string-array/StringArrayCallsWrapperBase64CodeHelper';
import { StringArrayCallsWrapperRc4CodeHelper } from '../../../custom-code-helpers/string-array/StringArrayCallsWrapperRc4CodeHelper';
import { StringArrayCodeHelper } from '../../../custom-code-helpers/string-array/StringArrayCodeHelper';
import { StringArrayRotateFunctionCodeHelper } from '../../../custom-code-helpers/string-array/StringArrayRotateFunctionCodeHelper';

export const customCodeHelpersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // custom code helpers
    bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(ConsoleOutputDisableCodeHelper)
        .whenTargetNamed(CustomCodeHelper.ConsoleOutputDisable);

    bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(DebugProtectionFunctionCallCodeHelper)
        .whenTargetNamed(CustomCodeHelper.DebugProtectionFunctionCall);

    bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(DebugProtectionFunctionIntervalCodeHelper)
        .whenTargetNamed(CustomCodeHelper.DebugProtectionFunctionInterval);

    bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(DebugProtectionFunctionCodeHelper)
        .whenTargetNamed(CustomCodeHelper.DebugProtectionFunction);

    bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(DomainLockCodeHelper)
        .whenTargetNamed(CustomCodeHelper.DomainLock);

    bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(CallsControllerFunctionCodeHelper)
        .whenTargetNamed(CustomCodeHelper.CallsControllerFunction);

    bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(SelfDefendingUnicodeCodeHelper)
        .whenTargetNamed(CustomCodeHelper.SelfDefendingUnicode);

    bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(StringArrayCallsWrapperCodeHelper)
        .whenTargetNamed(CustomCodeHelper.StringArrayCallsWrapper);

    bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(StringArrayCallsWrapperBase64CodeHelper)
        .whenTargetNamed(CustomCodeHelper.StringArrayCallsWrapperBase64);

    bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(StringArrayCallsWrapperRc4CodeHelper)
        .whenTargetNamed(CustomCodeHelper.StringArrayCallsWrapperRc4);

    bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(StringArrayCodeHelper)
        .whenTargetNamed(CustomCodeHelper.StringArray);

    bind<ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper)
        .to(StringArrayRotateFunctionCodeHelper)
        .whenTargetNamed(CustomCodeHelper.StringArrayRotateFunction);

    // code helper groups
    bind<ICustomCodeHelperGroup>(ServiceIdentifiers.ICustomCodeHelperGroup)
        .to(ConsoleOutputCodeHelperGroup)
        .whenTargetNamed(CustomCodeHelperGroup.ConsoleOutput);

    bind<ICustomCodeHelperGroup>(ServiceIdentifiers.ICustomCodeHelperGroup)
        .to(DebugProtectionCodeHelperGroup)
        .whenTargetNamed(CustomCodeHelperGroup.DebugProtection);

    bind<ICustomCodeHelperGroup>(ServiceIdentifiers.ICustomCodeHelperGroup)
        .to(DomainLockCustomCodeHelperGroup)
        .whenTargetNamed(CustomCodeHelperGroup.DomainLock);

    bind<ICustomCodeHelperGroup>(ServiceIdentifiers.ICustomCodeHelperGroup)
        .to(SelfDefendingCodeHelperGroup)
        .whenTargetNamed(CustomCodeHelperGroup.SelfDefending);

    bind<ICustomCodeHelperGroup>(ServiceIdentifiers.ICustomCodeHelperGroup)
        .to(StringArrayCodeHelperGroup)
        .whenTargetNamed(CustomCodeHelperGroup.StringArray);

    // customCodeHelper factory
    bind<ICustomCodeHelper>(ServiceIdentifiers.Factory__ICustomCodeHelper)
        .toFactory<ICustomCodeHelper>(InversifyContainerFacade
            .getFactory<CustomCodeHelper, ICustomCodeHelper>(ServiceIdentifiers.ICustomCodeHelper));

    // customCodeHelperGroup factory
    bind<ICustomCodeHelperGroup>(ServiceIdentifiers.Factory__ICustomCodeHelperGroup)
        .toFactory<ICustomCodeHelperGroup>(InversifyContainerFacade
            .getFactory<CustomCodeHelperGroup, ICustomCodeHelperGroup>(ServiceIdentifiers.ICustomCodeHelperGroup));

    // custom code helper formatter
    bind<ICustomCodeHelperFormatter>(ServiceIdentifiers.ICustomCodeHelperFormatter)
        .to(CustomCodeHelperFormatter)
        .inSingletonScope();

    // custom code helper obfuscator
    bind<ICustomCodeHelperObfuscator>(ServiceIdentifiers.ICustomCodeHelperObfuscator)
        .to(CustomCodeHelperObfuscator)
        .inSingletonScope();
});
