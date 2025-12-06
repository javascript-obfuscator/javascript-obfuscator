import 'reflect-metadata';

import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import { TDictionary } from './types/TDictionary';
import { TInputOptions } from './types/options/TInputOptions';
import { TObfuscationResultsObject } from './types/TObfuscationResultsObject';
import { TProObfuscationResultsObject } from './types/TProObfuscationResultsObject';
import { TOptionsPreset } from './types/options/TOptionsPreset';

import { IInversifyContainerFacade } from './interfaces/container/IInversifyContainerFacade';
import { IJavaScriptObfuscator } from './interfaces/IJavaScriptObfsucator';
import { IObfuscationResult } from './interfaces/source-code/IObfuscationResult';
import {
    IProApiConfig,
    IProObfuscationResult,
    TProApiProgressCallback
} from './interfaces/pro-api/IProApiClient';
import { ApiError } from './pro-api/ApiError';

import { InversifyContainerFacade } from './container/InversifyContainerFacade';
import { Options } from './options/Options';
import { Utils } from './utils/Utils';
import { ProApiClient } from './pro-api/ProApiClient';

class JavaScriptObfuscatorFacade {
    /**
     * @type {string | undefined}
     */
    public static version: string = process.env.VERSION ?? 'unknown';

    /**
     * @param {string} sourceCode
     * @param {TInputOptions} inputOptions
     * @returns {IObfuscationResult}
     */
    public static obfuscate(sourceCode: string, inputOptions: TInputOptions = {}): IObfuscationResult {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load(sourceCode, '', inputOptions);

        const javaScriptObfuscator: IJavaScriptObfuscator = inversifyContainerFacade.get<IJavaScriptObfuscator>(
            ServiceIdentifiers.IJavaScriptObfuscator
        );
        const obfuscationResult: IObfuscationResult = javaScriptObfuscator.obfuscate(sourceCode);

        inversifyContainerFacade.unload();

        return obfuscationResult;
    }

    /**
     * @param {TSourceCodesObject} sourceCodesObject
     * @param {TInputOptions} inputOptions
     * @returns {TObfuscationResultsObject<TSourceCodesObject>}
     */
    public static obfuscateMultiple<TSourceCodesObject extends TDictionary<string>>(
        sourceCodesObject: TSourceCodesObject,
        inputOptions: TInputOptions = {}
    ): TObfuscationResultsObject<TSourceCodesObject> {
        if (typeof sourceCodesObject !== 'object') {
            throw new Error('Source codes object should be a plain object');
        }

        return Object.keys(sourceCodesObject).reduce(
            (
                acc: TObfuscationResultsObject<TSourceCodesObject>,
                sourceCodeIdentifier: keyof TSourceCodesObject,
                index: number
            ) => {
                const identifiersPrefix: string = Utils.getIdentifiersPrefixForMultipleSources(
                    inputOptions.identifiersPrefix,
                    index
                );

                const sourceCode: string = sourceCodesObject[sourceCodeIdentifier];
                const sourceCodeOptions: TInputOptions = {
                    ...inputOptions,
                    identifiersPrefix
                };

                return {
                    ...acc,
                    [sourceCodeIdentifier]: JavaScriptObfuscatorFacade.obfuscate(sourceCode, sourceCodeOptions)
                };
            },
            <TObfuscationResultsObject<TSourceCodesObject>>{}
        );
    }

    /**
     * @param {TOptionsPreset} optionsPreset
     * @returns {TInputOptions}
     */
    public static getOptionsByPreset(optionsPreset: TOptionsPreset): TInputOptions {
        return Options.getOptionsByPreset(optionsPreset);
    }

    /**
     * Obfuscate code using the Pro API (obfuscator.io)
     * This method requires a valid API token from obfuscator.io and only works with VM obfuscation.
     *
     * @param {string} sourceCode - Source code to obfuscate
     * @param {TInputOptions} inputOptions - Obfuscation options (must include vmObfuscation: true)
     * @param {IProApiConfig} proApiConfig - Pro API configuration including API token
     * @param {TProApiProgressCallback} onProgress - Optional callback for progress updates (streaming mode only)
     * @returns {Promise<IProObfuscationResult>} - Promise resolving to obfuscation result
     * @throws {ApiError} - If API returns an error or vmObfuscation is not enabled
     */
    public static async obfuscatePro(
        sourceCode: string,
        inputOptions: TInputOptions = {},
        proApiConfig: IProApiConfig,
        onProgress?: TProApiProgressCallback
    ): Promise<IProObfuscationResult> {
        if (!inputOptions.vmObfuscation) {
            throw new ApiError(
                'obfuscatePro method works only with VM obfuscation. Set vmObfuscation: true in options.',
                400
            );
        }

        const client = new ProApiClient(proApiConfig);
        return client.obfuscate(sourceCode, inputOptions, onProgress);
    }

    /**
     * Obfuscate multiple source files using the Pro API (obfuscator.io)
     * This method requires a valid API token from obfuscator.io and only works with VM obfuscation.
     *
     * @param {TSourceCodesObject} sourceCodesObject - Object mapping file identifiers to source code
     * @param {TInputOptions} inputOptions - Obfuscation options (must include vmObfuscation: true)
     * @param {IProApiConfig} proApiConfig - Pro API configuration including API token
     * @param {TProApiProgressCallback} onProgress - Optional callback for progress updates (streaming mode only)
     * @returns {Promise<TProObfuscationResultsObject<TSourceCodesObject>>} - Promise resolving to map of obfuscation results
     * @throws {ApiError} - If API returns an error or vmObfuscation is not enabled
     */
    public static async obfuscateProMultiple<TSourceCodesObject extends TDictionary<string>>(
        sourceCodesObject: TSourceCodesObject,
        inputOptions: TInputOptions = {},
        proApiConfig: IProApiConfig,
        onProgress?: TProApiProgressCallback
    ): Promise<TProObfuscationResultsObject<TSourceCodesObject>> {
        if (typeof sourceCodesObject !== 'object') {
            throw new Error('Source codes object should be a plain object');
        }

        if (!inputOptions.vmObfuscation) {
            throw new ApiError(
                'obfuscateProMultiple method works only with VM obfuscation. Set vmObfuscation: true in options.',
                400
            );
        }

        const client = new ProApiClient(proApiConfig);
        const results: TProObfuscationResultsObject<TSourceCodesObject> = {} as TProObfuscationResultsObject<TSourceCodesObject>;

        const entries = Object.entries(sourceCodesObject);

        for (let index = 0; index < entries.length; index++) {
            const [sourceCodeIdentifier, sourceCode] = entries[index];

            const identifiersPrefix: string = Utils.getIdentifiersPrefixForMultipleSources(
                inputOptions.identifiersPrefix,
                index
            );

            const sourceCodeOptions: TInputOptions = {
                ...inputOptions,
                identifiersPrefix
            };

            results[sourceCodeIdentifier as keyof TSourceCodesObject] = await client.obfuscate(
                sourceCode,
                sourceCodeOptions,
                onProgress
            );
        }

        return results;
    }
}

export { JavaScriptObfuscatorFacade as JavaScriptObfuscator };
export { ApiError } from './pro-api/ApiError';
export type { IProApiConfig, TProApiProgressCallback } from './interfaces/pro-api/IProApiClient';
