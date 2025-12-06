"use strict";

import { TDictionary } from './src/types/TDictionary';
import { TInputOptions } from './src/types/options/TInputOptions';
import { TObfuscationResultsObject } from './src/types/TObfuscationResultsObject';
import { TOptionsPreset } from './src/types/options/TOptionsPreset';

import { IObfuscationResult } from './src/interfaces/source-code/IObfuscationResult';
import { IProApiConfig, IProObfuscationResult, TProApiProgressCallback } from './src/interfaces/pro-api/IProApiClient';
import { JavaScriptObfuscator, ApiError } from './src/JavaScriptObfuscatorFacade';

export type ObfuscatorOptions = TInputOptions;

export interface ObfuscationResult extends IObfuscationResult {}

export interface ProObfuscationResult extends IProObfuscationResult {}

export type { IProApiConfig, TProApiProgressCallback };
export { ApiError };

/**
 * @param {string} sourceCode
 * @param {ObfuscatorOptions} inputOptions
 * @returns {ObfuscatedCode}
 */
export declare function obfuscate (sourceCode: string, inputOptions?: ObfuscatorOptions): ObfuscationResult;

/**
 * @param {TSourceCodesObject} sourceCodesObject
 * @param {TInputOptions} inputOptions
 * @returns {TObfuscationResultsObject<TSourceCodesObject>}
 */
export declare function obfuscateMultiple <TSourceCodesObject extends TDictionary<string>> (
    sourceCodesObject: TSourceCodesObject,
    inputOptions?: TInputOptions
): TObfuscationResultsObject<TSourceCodesObject>;

/**
 * Obfuscate code using the Pro API (obfuscator.io)
 * Requires a valid API token and vmObfuscation: true
 *
 * @param {string} sourceCode - Source code to obfuscate
 * @param {ObfuscatorOptions} inputOptions - Obfuscation options (must include vmObfuscation: true)
 * @param {IProApiConfig} proApiConfig - Pro API configuration including API token
 * @param {TProApiProgressCallback} onProgress - Optional callback for progress updates
 * @returns {Promise<ProObfuscationResult>} - Promise resolving to obfuscation result
 */
export declare function obfuscatePro (
    sourceCode: string,
    inputOptions: ObfuscatorOptions,
    proApiConfig: IProApiConfig,
    onProgress?: TProApiProgressCallback
): Promise<ProObfuscationResult>;

/**
 * @param {TOptionsPreset} optionsPreset
 * @returns {TInputOptions}
 */
export declare function getOptionsByPreset (optionsPreset: TOptionsPreset): TInputOptions;

/**
 * @type {string}
 */
export declare const version: string;

module.exports = JavaScriptObfuscator;
