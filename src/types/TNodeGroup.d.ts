import { INodesGroup } from '../interfaces/INodesGroup';
import { IOptions } from '../interfaces/IOptions';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

export type TNodeGroup = new (stackTraceData: IStackTraceData[], options: IOptions) => INodesGroup;