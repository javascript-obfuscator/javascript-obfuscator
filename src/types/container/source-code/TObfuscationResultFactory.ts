import { IObfuscationResult } from '../../../interfaces/source-code/IObfuscationResult';

export type TObfuscationResultFactory = (obfuscatedCode: string, sourceMap: string) => IObfuscationResult;
