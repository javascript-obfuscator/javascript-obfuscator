import { IObfuscatedCode } from '../interfaces/source-code/IObfuscatedCode';

export type TObfuscationResultsObject <TSourceCodesObject> = {[key in keyof TSourceCodesObject]: IObfuscatedCode};
