import { ICustomNodeGroup } from '../../interfaces/custom-nodes/ICustomNodeGroup';

import { CustomNodeGroups } from '../../enums/container/CustomNodeGroups';

export type TCustomNodeGroupsFactory = (customNodeGroupsName: CustomNodeGroups) => ICustomNodeGroup;
