import { TTypeFromEnum } from '../utils/TTypeFromEnum';

import { StringArrayIndexesType } from '../../enums/node-transformers/string-array-transformers/StringArrayIndexesType';

export type TStringArrayIndexesType = TTypeFromEnum<typeof StringArrayIndexesType>;
