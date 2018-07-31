import { TInputOptions } from './src/types/options/TInputOptions';

import { IObfuscatedCode } from './src/interfaces/source-code/IObfuscatedCode';

export type ObfuscatorOptions = TInputOptions;

export interface ObfuscatedCode extends IObfuscatedCode {}

export function obfuscate (sourceCode: string, inputOptions?: ObfuscatorOptions): ObfuscatedCode;