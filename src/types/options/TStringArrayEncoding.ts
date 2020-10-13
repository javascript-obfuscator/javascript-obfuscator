import { TTypeFromEnum } from '../utils/TTypeFromEnum';

import { StringArrayEncoding } from '../../enums/node-transformers/string-array-transformers/StringArrayEncoding';

export type TStringArrayEncoding = TTypeFromEnum<typeof StringArrayEncoding>;
