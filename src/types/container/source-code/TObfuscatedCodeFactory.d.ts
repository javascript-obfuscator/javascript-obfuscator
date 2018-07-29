import { IObfuscatedCode } from '../../../interfaces/source-code/IObfuscatedCode';

export type TObfuscatedCodeFactory = (obfuscatedCode: string, sourceMap: string) => IObfuscatedCode;
