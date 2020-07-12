import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TInputOptions } from '../types/options/TInputOptions';

import { ICustomCodeHelperObfuscator } from '../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { NO_ADDITIONAL_NODES_PRESET } from '../options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../JavaScriptObfuscatorFacade';

@injectable()
export class CustomCodeHelperObfuscator implements ICustomCodeHelperObfuscator {
    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {IRandomGenerator}
     */
    private readonly randomGenerator: IRandomGenerator;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @param {string} template
     * @param {TInputOptions} additionalOptions
     * @returns {string}
     */
    public obfuscateTemplate (template: string, additionalOptions: TInputOptions = {}): string {
        return JavaScriptObfuscator.obfuscate(
            template,
            {
                ...NO_ADDITIONAL_NODES_PRESET,
                identifierNamesGenerator: this.options.identifierNamesGenerator,
                identifiersDictionary: this.options.identifiersDictionary,
                numbersToExpressions: this.options.numbersToExpressions,
                simplify: this.options.simplify,
                seed: this.randomGenerator.getRawSeed(),
                ...additionalOptions
            }
        ).getObfuscatedCode();
    }
}
