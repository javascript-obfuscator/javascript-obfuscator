"use strict";

import { TDictionary } from './src/types/TDictionary';
import { TInputOptions } from './src/types/options/TInputOptions';
import { TObfuscationResultsObject } from './src/types/TObfuscationResultsObject';
import { TOptionsPreset } from './src/types/options/TOptionsPreset';

import { IObfuscationResult } from './src/interfaces/source-code/IObfuscationResult';

import { JavaScriptObfuscator } from './src/JavaScriptObfuscatorFacade';

export type ObfuscatorOptions = TInputOptions;

export interface ObfuscationResult extends IObfuscationResult {}

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
 * @param {TOptionsPreset} optionsPreset
 * @returns {TInputOptions}
 */
export declare function getOptionsByPreset (optionsPreset: TOptionsPreset): TInputOptions;

/**
 * @type {string}
 */
export declare const version: string;

module.exports = JavaScriptObfuscator;
