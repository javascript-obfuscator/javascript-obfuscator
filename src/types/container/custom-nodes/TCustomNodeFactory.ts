import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';

import { CustomNode } from '../../../enums/custom-nodes/CustomNode';

export type TCustomNodeFactory = <
    TInitialData extends any[] = any[]
> (customNodeName: CustomNode) => ICustomNode<TInitialData>;
