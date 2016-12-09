import { ICustomNodeGroup } from '../../interfaces/custom-nodes/ICustomNodeGroup';

import { CustomNodeGroups } from '../../enums/container/CustomNodeGroups';

export type TCustomNodeGroupFactory = (customNodeGroupName: CustomNodeGroups) => ICustomNodeGroup;
