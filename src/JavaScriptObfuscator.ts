import 'reflect-metadata';

import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import { TInputOptions } from './types/options/TInputOptions';

import { IInversifyContainerFacade } from './interfaces/container/IInversifyContainerFacade';
import { IJavaScriptObfuscator } from './interfaces/IJavaScriptObfsucator';
import { IObfuscationResult } from './interfaces/IObfuscationResult';
import { IOptions } from './interfaces/options/IOptions';

import { InversifyContainerFacade } from './container/InversifyContainerFacade';
import { JavaScriptObfuscatorCLI } from './cli/JavaScriptObfuscatorCLI';
import { RandomGeneratorUtils } from './utils/RandomGeneratorUtils';

export class JavaScriptObfuscator {
    /**
     * @param sourceCode
     * @param inputOptions
     * @returns {string}
     */
    public static obfuscate (sourceCode: string, inputOptions: TInputOptions = {}): IObfuscationResult {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade(inputOptions);
        const options: IOptions = inversifyContainerFacade.get<IOptions>(ServiceIdentifiers.IOptions);

        RandomGeneratorUtils.initializeRandomGenerator(options.seed);

        const javaScriptObfuscator: IJavaScriptObfuscator = inversifyContainerFacade
            .get<IJavaScriptObfuscator>(ServiceIdentifiers.IJavaScriptObfuscator);
        const obfuscationResult: IObfuscationResult = javaScriptObfuscator.obfuscate(sourceCode);

        RandomGeneratorUtils.clearRandomGenerator();

        return obfuscationResult;
    }

    /**
     * @param argv
     */
    public static runCLI (argv: string[]): void {
        new JavaScriptObfuscatorCLI(argv).run();
    }
}
