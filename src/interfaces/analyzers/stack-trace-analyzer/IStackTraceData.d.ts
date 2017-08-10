import { ICalleeData } from './ICalleeData';

export interface IStackTraceData extends ICalleeData {
    stackTrace: IStackTraceData[];
}
