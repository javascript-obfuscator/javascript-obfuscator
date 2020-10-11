import { TTypeFromEnum } from '../utils/TTypeFromEnym';

import { StringArrayEncoding } from '../../enums/node-transformers/string-array-transformers/StringArrayEncoding';

export type TStringArrayEncoding = TTypeFromEnum<typeof StringArrayEncoding>;
