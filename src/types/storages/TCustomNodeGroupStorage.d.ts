import { ICustomNodeGroup } from '../../interfaces/custom-nodes/ICustomNodeGroup';
import { IMapStorage } from '../../interfaces/storages/IMapStorage';

export type TCustomNodeGroupStorage = IMapStorage <string, ICustomNodeGroup>;
