import { ICalleeData } from './ICalleeData';

export interface ICalleeDataExtractor {
    extract (): ICalleeData|null;
}
