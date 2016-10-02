import { TNodeWithBlockStatement } from '../types/TNodeWithBlockStatement';

export interface IStackTraceData {
    callee: TNodeWithBlockStatement;
    name: string;
    stackTrace: IStackTraceData[];
}
