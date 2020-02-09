import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../types/node/TStatement';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IIdentifierNamesGenerator } from '../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { ICustomNodeFormatter } from '../interfaces/custom-nodes/ICustomNodeFormatter';

import { GlobalVariableTemplate1 } from '../templates/GlobalVariableTemplate1';
import { GlobalVariableTemplate2 } from '../templates/GlobalVariableTemplate2';

@injectable()
export abstract class AbstractCustomNode <
    TInitialData extends any[] = any[]
> implements ICustomNode <TInitialData> {
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
     * @type {ICustomNodeFormatter}
     */
    protected readonly customNodeFormatter: ICustomNodeFormatter;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomNodeFormatter} customNodeFormatter
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    protected constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomNodeFormatter) customNodeFormatter: ICustomNodeFormatter,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.customNodeFormatter = customNodeFormatter;
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @returns {TStatement[]}
     */
    public getNode (): TStatement[] {
        if (!this.cachedNode) {
            const nodeTemplate: string = this.getNodeTemplate();

            this.cachedNode = this.customNodeFormatter.formatStructure(
                this.getNodeStructure(nodeTemplate)
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
            .pickone(AbstractCustomNode.globalVariableTemplateFunctions);
    }

    /**
     * @returns {string}
     */
    protected getNodeTemplate (): string {
        return '';
    }

    /**
     * @param {string[]} additionalNames
     * @returns {string[]}
     */
    protected getPreservedNames (additionalNames: string[]): string[] {
        return Array.from(new Set([
            ...Array.from(this.identifierNamesGenerator.getPreservedNames().values()),
            ...additionalNames
        ]).values())
        .map((preservedName: string) => `^${preservedName}$`);
    }

    /**
     * @param {TInitialData} args
     */
    public abstract initialize (...args: TInitialData): void;

    /**
     * @returns {TStatement[]}
     */
    protected abstract getNodeStructure (nodeTemplate: string): TStatement[];
}
