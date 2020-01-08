import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';

import { ControlFlowCustomNode } from '../../../enums/custom-nodes/ControlFlowCustomNode';

export type TControlFlowCustomNodeFactory = <
    TInitialData extends any[] = any[]
> (controlFlowCustomNodeName: ControlFlowCustomNode) => ICustomNode<TInitialData>;
