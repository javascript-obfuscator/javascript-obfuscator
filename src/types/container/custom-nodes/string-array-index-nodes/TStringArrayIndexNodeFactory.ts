import { IStringArrayIndexNode } from '../../../../interfaces/custom-nodes/string-array-nodes/IStringArrayIndexNode';

import { StringArrayIndexNode } from '../../../../enums/custom-nodes/string-array-index-nodes/StringArrayIndexNode';

export type TStringArrayIndexNodeFactory = (stringArrayIndexNodeName: StringArrayIndexNode) => IStringArrayIndexNode;
