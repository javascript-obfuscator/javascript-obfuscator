import { ICustomNodeGroup } from '../../../interfaces/custom-nodes/ICustomNodeGroup';

import { CustomNodeGroup } from '../../../enums/custom-nodes/CustomNodeGroup';

export type TCustomNodeGroupFactory = (customNodeGroupName: CustomNodeGroup) => ICustomNodeGroup;
