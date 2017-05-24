import { ICustomNodeGroup } from '../../../interfaces/custom-nodes/ICustomNodeGroup';

import { CustomNodeGroups } from '../../../enums/container/custom-nodes/CustomNodeGroups';

export type TCustomNodeGroupFactory = (customNodeGroupName: CustomNodeGroups) => ICustomNodeGroup;
