import { TInputOptions } from './src/types/options/TInputOptions';

import { IObfuscatedCode } from './src/interfaces/source-code/IObfuscatedCode';

export type ObfuscatorOptions = TInputOptions;

export interface ObfuscatedCode extends IObfuscatedCode {}

/**
 * @param {string} sourceCode
 * @param {ObfuscatorOptions} inputOptions
 * @returns {ObfuscatedCode}
 */
export function obfuscate (sourceCode: string, inputOptions?: ObfuscatorOptions): ObfuscatedCode;

/**
 * @type {string}
 */
export const version: string;