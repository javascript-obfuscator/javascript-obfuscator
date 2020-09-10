import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';

import { StringArrayTransformerCustomNode } from '../../../enums/custom-nodes/StringArrayTransformerCustomNode';

export type TStringArrayTransformerCustomNodeFactory = <
    TInitialData extends unknown[] = unknown[]
> (stringArrayTransformerCustomNodeName: StringArrayTransformerCustomNode) => ICustomNode <TInitialData>;
