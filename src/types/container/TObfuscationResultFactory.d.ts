import { IObfuscationResult } from '../../interfaces/IObfuscationResult';

export type TObfuscationResultFactory = (obfuscatedCode: string, sourceMap: string) => IObfuscationResult;
