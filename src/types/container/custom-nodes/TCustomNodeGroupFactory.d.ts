import { ICustomNodeGroup } from '../../../interfaces/custom-nodes/ICustomNodeGroup';

import { CustomNodeGroup } from '../../../enums/container/custom-nodes/CustomNodeGroup';

export type TCustomNodeGroupFactory = (customNodeGroupName: CustomNodeGroup) => ICustomNodeGroup;
