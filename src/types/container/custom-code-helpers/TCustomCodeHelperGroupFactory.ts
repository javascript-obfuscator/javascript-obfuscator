import { ICustomCodeHelperGroup } from '../../../interfaces/custom-code-helpers/ICustomCodeHelperGroup';

import { CustomCodeHelperGroup } from '../../../enums/custom-code-helpers/CustomCodeHelperGroup';

export type TCustomCodeHelperGroupFactory = (customCodeHelperGroupName: CustomCodeHelperGroup) => ICustomCodeHelperGroup;
