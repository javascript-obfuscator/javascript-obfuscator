import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TInputOptions } from '../types/options/TInputOptions';

import { ICustomNodeObfuscator } from '../interfaces/custom-nodes/ICustomNodeObfuscator';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { IdentifierNamesGenerator } from '../enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { NO_ADDITIONAL_NODES_PRESET } from '../options/presets/NoCustomNodes';

import { JavaScriptObfuscator } from '../JavaScriptObfuscatorFacade';

@injectable()
export class CustomNodeObfuscator implements ICustomNodeObfuscator {
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
        /**
         * During the first pass we should rename all identifiers to a random one
         */
        const firstPassObfuscatedCode = JavaScriptObfuscator.obfuscate(
            template,
            {
                ...NO_ADDITIONAL_NODES_PRESET,
                identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
                seed: 1
            }
        ).getObfuscatedCode();

        /**
         * During the seconds pass we should obfuscate template to the same format as the main code
         * Also, we should add additional transformations that depends on the custom node
         */
        const secondPassObfuscatedCode = JavaScriptObfuscator.obfuscate(
            firstPassObfuscatedCode,
            {
                ...NO_ADDITIONAL_NODES_PRESET,
                identifierNamesGenerator: this.options.identifierNamesGenerator,
                identifiersDictionary: this.options.identifiersDictionary,
                seed: this.randomGenerator.getRawSeed(),
                ...additionalOptions
            }
        ).getObfuscatedCode();

        return secondPassObfuscatedCode;
    }
}
