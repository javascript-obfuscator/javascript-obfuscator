import 'reflect-metadata';

import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import { TDictionary } from './types/TDictionary';
import { TInputOptions } from './types/options/TInputOptions';
import { TObfuscationResultsObject } from './types/TObfuscationResultsObject';
import { TOptionsPreset } from './types/options/TOptionsPreset';

import { IInversifyContainerFacade } from './interfaces/container/IInversifyContainerFacade';
import { IJavaScriptObfuscator } from './interfaces/IJavaScriptObfsucator';
import { IObfuscatedCode } from './interfaces/source-code/IObfuscatedCode';

import { InversifyContainerFacade } from './container/InversifyContainerFacade';
import { Options } from './options/Options';
import { Utils } from './utils/Utils';

class JavaScriptObfuscatorFacade {
    /**
     * @type {string | undefined}
     */
    public static version: string = process.env.VERSION ?? 'unknown';

    /**
     * @param {string} sourceCode
     * @param {TInputOptions} inputOptions
     * @returns {IObfuscatedCode}
     */
    public static obfuscate (sourceCode: string, inputOptions: TInputOptions = {}): IObfuscatedCode {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load(sourceCode, '', inputOptions);

        const javaScriptObfuscator: IJavaScriptObfuscator = inversifyContainerFacade
            .get<IJavaScriptObfuscator>(ServiceIdentifiers.IJavaScriptObfuscator);
        const obfuscatedCode: IObfuscatedCode = javaScriptObfuscator.obfuscate(sourceCode);

        inversifyContainerFacade.unload();

        return obfuscatedCode;
    }

    /**
     * @param {TSourceCodesObject} sourceCodesObject
     * @param {TInputOptions} inputOptions
     * @returns {TObfuscationResultsObject<TSourceCodesObject>}
     */
    public static obfuscateMultiple <TSourceCodesObject extends TDictionary<string>> (
        sourceCodesObject: TSourceCodesObject,
        inputOptions: TInputOptions = {}
    ): TObfuscationResultsObject<TSourceCodesObject> {
        if (typeof sourceCodesObject !== 'object') {
            throw new Error('Source codes object should be a plain object');
        }

        return Object
            .keys(sourceCodesObject)
            .reduce(
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
    public static getOptionsByPreset (optionsPreset: TOptionsPreset): TInputOptions {
        return Options.getOptionsByPreset(optionsPreset);
    }
}

export { JavaScriptObfuscatorFacade as JavaScriptObfuscator };
