import { TNodeWithBlockStatement } from '../types/TNodeWithBlockStatement';

export interface IBlockScopeTraceData {
    callee: TNodeWithBlockStatement;
    name: string;
    trace: IBlockScopeTraceData[];
}
