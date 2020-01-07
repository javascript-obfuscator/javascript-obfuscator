import { ICalleeData } from './ICalleeData';

export interface ICallsGraphData extends ICalleeData {
    callsGraph: ICallsGraphData[];
}
