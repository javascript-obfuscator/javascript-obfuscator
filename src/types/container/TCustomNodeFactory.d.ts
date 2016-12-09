import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';

import { CustomNodes } from '../../enums/container/CustomNodes';

export type TCustomNodeFactory = (customNodeName: CustomNodes) => ICustomNode;
