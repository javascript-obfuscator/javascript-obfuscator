import { IObfuscationResult } from '../interfaces/source-code/IObfuscationResult';

export type TObfuscationResultsObject <TSourceCodesObject> = {[key in keyof TSourceCodesObject]: IObfuscationResult};
