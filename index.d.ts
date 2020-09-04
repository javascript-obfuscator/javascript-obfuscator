import { TDictionary } from './src/types/TDictionary';
import { TInputOptions } from './src/types/options/TInputOptions';
import { TObfuscationResultsObject } from './src/types/TObfuscationResultsObject';
import { TOptionsPreset } from './src/types/options/TOptionsPreset';

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
 * @param {TSourceCodesObject} sourceCodesObject
 * @param {TInputOptions} inputOptions
 * @returns {TObfuscationResultsObject<TSourceCodesObject>}
 */
export function obfuscateMultiple <TSourceCodesObject extends TDictionary<string>> (
    sourceCodesObject: TSourceCodesObject,
    inputOptions?: TInputOptions
): TObfuscationResultsObject<TSourceCodesObject>;

/**
 * @param {TOptionsPreset} optionsPreset
 * @returns {TInputOptions}
 */
export function getOptionsByPreset (optionsPreset: TOptionsPreset): TInputOptions;

/**
 * @type {string}
 */
export const version: string;