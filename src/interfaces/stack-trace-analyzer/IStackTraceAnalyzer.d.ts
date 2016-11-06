import { IStackTraceData } from './IStackTraceData';

export interface IStackTraceAnalyzer {
    analyze (): IStackTraceData[];
}
