import { ICustomNodesFactory } from '../interfaces/custom-nodes/ICustomNodesFactory';
import { IOptions } from '../interfaces/IOptions';

export type TCustomNodesFactory = new (options: IOptions) => ICustomNodesFactory;
