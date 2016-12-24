import 'reflect-metadata';

if (!(<any>global)._babelPolyfill && parseInt(process.version.split('.')[0], 10) < 4) {
    require('babel-polyfill');
}

import { ServiceIdentifiers } from './container/ServiceIdentifiers';

import { Chance } from 'chance';

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

        if (options.seed !== 0) {
            RandomGeneratorUtils.setRandomGenerator(new Chance(options.seed));
        }

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
