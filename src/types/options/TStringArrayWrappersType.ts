import { TTypeFromEnum } from '../utils/TTypeFromEnym';

import { StringArrayWrappersType } from '../../enums/node-transformers/string-array-transformers/StringArrayWrappersType';

export type TStringArrayWrappersType = TTypeFromEnum<typeof StringArrayWrappersType>;
