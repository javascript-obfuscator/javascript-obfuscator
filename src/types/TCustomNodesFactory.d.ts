import { ICustomNodesFactory } from '../interfaces/ICustomNodesFactory';
import { IOptions } from '../interfaces/IOptions';

export type TCustomNodesFactory = new (options: IOptions) => ICustomNodesFactory;
