import { IMapStorage } from '../IMapStorage';
import { ICustomNode } from '../../custom-nodes/ICustomNode';

// eslint-disable-next-line
export interface IControlFlowStorage extends IMapStorage <string, ICustomNode> {}
