import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../types/node/TStatement';

import { ICustomCodeHelper } from '../interfaces/custom-code-helpers/ICustomCodeHelper';
import { ICustomCodeHelperFormatter } from '../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { ICustomCodeHelperObfuscator } from '../interfaces/custom-code-helpers/ICustomCodeHelperObfuscator';
import { IIdentifierNamesGenerator } from '../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { GlobalVariableTemplate1 } from './common/templates/GlobalVariableTemplate1';
import { GlobalVariableTemplate2 } from './common/templates/GlobalVariableTemplate2';

@injectable()
export abstract class AbstractCustomCodeHelper <
    TInitialData extends unknown[] = unknown[]
> implements ICustomCodeHelper <TInitialData> {
    /**
     * @type {string[]}
     */
    private static readonly globalVariableTemplateFunctions: string[] = [
        GlobalVariableTemplate1(),
        GlobalVariableTemplate2()
    ];

    /**
     * @type {TStatement[] | null}
     */
    protected cachedNode: TStatement[] | null = null;

    /**
     * @type {ICustomCodeHelperFormatter}
     */
    protected readonly customCodeHelperFormatter: ICustomCodeHelperFormatter;

    /**
     * @type {ICustomCodeHelperObfuscator}
     */
    protected readonly customCodeHelperObfuscator: ICustomCodeHelperObfuscator;

    /**
     * @type {IIdentifierNamesGenerator}
     */
    protected readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomCodeHelperFormatter} customCodeHelperFormatter
     * @param {ICustomCodeHelperObfuscator} customCodeHelperObfuscator
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    protected constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomCodeHelperFormatter) customCodeHelperFormatter: ICustomCodeHelperFormatter,
        @inject(ServiceIdentifiers.ICustomCodeHelperObfuscator) customCodeHelperObfuscator: ICustomCodeHelperObfuscator,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.customCodeHelperFormatter = customCodeHelperFormatter;
        this.customCodeHelperObfuscator = customCodeHelperObfuscator;
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @returns {TStatement[]}
     */
    public getNode (): TStatement[] {
        if (!this.cachedNode) {
            const codeHelperTemplate: string = this.getCodeHelperTemplate();

            this.cachedNode = this.customCodeHelperFormatter.formatStructure(
                this.getNodeStructure(codeHelperTemplate)
            );
        }

        return this.cachedNode;
    }

    /**
     * @returns {string}
     */
    protected getGlobalVariableTemplate (): string {
        return this.randomGenerator
            .getRandomGenerator()
            .pickone(AbstractCustomCodeHelper.globalVariableTemplateFunctions);
    }

    /**
     * @returns {string}
     */
    protected getCodeHelperTemplate (): string {
        return '';
    }

    /**
     * @param {TInitialData} args
     */
    public abstract initialize (...args: TInitialData): void;

    /**
     * @returns {TStatement[]}
     */
    protected abstract getNodeStructure (codeHelperTemplate: string): TStatement[];
}
