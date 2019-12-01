import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../types/node/TStatement';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IIdentifierNamesGenerator } from '../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { GlobalVariableTemplate1 } from '../templates/GlobalVariableTemplate1';
import { GlobalVariableTemplate2 } from '../templates/GlobalVariableTemplate2';

@injectable()
export abstract class AbstractCustomNode implements ICustomNode {
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
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @param {unknown[]} args
     */
    public abstract initialize (...args: unknown[]): void;

    /**
     * @returns {TStatement[]}
     */
    public getNode (): TStatement[] {
        if (!this.cachedNode) {
            this.cachedNode = this.getNodeStructure();
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
     * @returns {TStatement[]}
     */
    protected abstract getNodeStructure (): TStatement[];
}
