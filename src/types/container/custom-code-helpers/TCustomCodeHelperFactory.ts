import { ICustomCodeHelper } from '../../../interfaces/custom-code-helpers/ICustomCodeHelper';

import { CustomCodeHelper } from '../../../enums/custom-code-helpers/CustomCodeHelper';

export type TCustomCodeHelperFactory = <
    TInitialData extends any[] = any[]
> (customCodeHelperName: CustomCodeHelper) => ICustomCodeHelper<TInitialData>;
