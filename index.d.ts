import { TInputOptions } from './src/types/options/TInputOptions';

import { IObfuscationResult } from './src/interfaces/IObfuscationResult';

export type ObfuscatorOptions = TInputOptions;

export interface ObfuscationResult extends IObfuscationResult {}

export function obfuscate (sourceCode: string, inputOptions?: ObfuscatorOptions): ObfuscationResult;
