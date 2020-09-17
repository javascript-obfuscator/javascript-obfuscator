import { TypeFromEnum } from '@gradecam/tsenum';

import { StringArrayEncoding } from '../../enums/node-transformers/string-array-transformers/StringArrayEncoding';

export type TStringArrayEncoding = TypeFromEnum<typeof StringArrayEncoding>;
