import { ICustomNodesFactory } from '../../interfaces/custom-nodes/ICustomNodesFactory';
import { IOptions } from '../../interfaces/options/IOptions';

export type TCustomNodesFactory = new (options: IOptions) => ICustomNodesFactory;
