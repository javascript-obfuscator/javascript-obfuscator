import 'reflect-metadata';

import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import { TInputOptions } from './types/options/TInputOptions';

import { IInversifyContainerFacade } from './interfaces/container/IInversifyContainerFacade';
import { IJavaScriptObfuscator } from './interfaces/IJavaScriptObfsucator';
import { IObfuscatedCode } from './interfaces/source-code/IObfuscatedCode';

import { InversifyContainerFacade } from './container/InversifyContainerFacade';

class JavaScriptObfuscatorFacade {
    /**
     * @type {string | undefined}
     */
    public static version: string = process.env.VERSION || 'unknown';

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
}

export { JavaScriptObfuscatorFacade as JavaScriptObfuscator };
