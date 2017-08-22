import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';

import { ControlFlowCustomNode } from '../../../enums/container/custom-nodes/ControlFlowCustomNode';

export type TControlFlowCustomNodeFactory = (controlFlowCustomNodeName: ControlFlowCustomNode) => ICustomNode;
