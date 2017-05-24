import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';

import { CustomNodes } from '../../../enums/container/custom-nodes/CustomNodes';

export type TCustomNodeFactory = (customNodeName: CustomNodes) => ICustomNode;
