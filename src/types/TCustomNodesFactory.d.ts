import { ICustomNodesFactory } from '../interfaces/ICustomNodesFactory';
import { IOptions } from '../interfaces/IOptions';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

export type TCustomNodesFactory = new (stackTraceData: IStackTraceData[], options: IOptions) => ICustomNodesFactory;
