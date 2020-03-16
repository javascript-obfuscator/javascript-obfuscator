import 'reflect-metadata';

import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import { TInputOptions } from './types/options/TInputOptions';
import { TObfuscationResultsObject } from './types/TObfuscationResultsObject';
import { TObject } from './types/TObject';

import { IInversifyContainerFacade } from './interfaces/container/IInversifyContainerFacade';
import { IJavaScriptObfuscator } from './interfaces/IJavaScriptObfsucator';
import { IObfuscatedCode } from './interfaces/source-code/IObfuscatedCode';

import { InversifyContainerFacade } from './container/InversifyContainerFacade';
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
    public static obfuscateMultiple <TSourceCodesObject extends TObject<string>> (
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
}

export { JavaScriptObfuscatorFacade as JavaScriptObfuscator };
