import { TypeFromEnum } from '@gradecam/tsenum';

import { StringArrayEncoding } from '../../enums/StringArrayEncoding';

export type TStringArrayEncoding = boolean | TypeFromEnum<typeof StringArrayEncoding>;
