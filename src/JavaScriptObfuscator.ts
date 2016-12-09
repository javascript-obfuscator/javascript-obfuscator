import 'reflect-metadata';

if (!(<any>global)._babelPolyfill) {
    require('babel-polyfill');
}

import { TInputOptions } from './types/options/TInputOptions';

import { IInversifyContainerFacade } from './interfaces/container/IInversifyContainerFacade';
import { IJavaScriptObfuscator } from './interfaces/IJavaScriptObfsucator';
import { IObfuscationResult } from './interfaces/IObfuscationResult';

import { InversifyContainerFacade } from './container/InversifyContainerFacade';
import { JavaScriptObfuscatorCLI } from './cli/JavaScriptObfuscatorCLI';
import { ServiceIdentifiers } from './container/ServiceIdentifiers';

export class JavaScriptObfuscator {
    /**
     * @param sourceCode
     * @param inputOptions
     * @returns {string}
     */
    public static obfuscate (sourceCode: string, inputOptions: TInputOptions = {}): IObfuscationResult {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade(inputOptions);
        const javaScriptObfuscator: IJavaScriptObfuscator = inversifyContainerFacade
            .get<IJavaScriptObfuscator>(ServiceIdentifiers.IJavaScriptObfuscator);

        return javaScriptObfuscator.obfuscate(sourceCode);
    }

    /**
     * @param argv
     */
    public static runCLI (argv: string[]): void {
        new JavaScriptObfuscatorCLI(argv).run();
    }
}
