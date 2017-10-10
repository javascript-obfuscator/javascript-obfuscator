import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TStatement } from '../types/node/TStatement';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { GlobalVariableTemplate1 } from '../templates/GlobalVariableTemplate1';
import { GlobalVariableTemplate2 } from '../templates/GlobalVariableTemplate2';

import { NodeUtils } from '../node/NodeUtils';

@injectable()
export abstract class AbstractCustomNode implements ICustomNode {
    /**
     * @type {string[]}
     */
    private static globalVariableTemplateFunctions: string[] = [
        GlobalVariableTemplate1(),
        GlobalVariableTemplate2()
    ];

    /**
     * @type {string}
     */
    protected cachedCode: string;

    /**
     * @type {TStatement[]}
     */
    protected cachedNode: TStatement[];

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @param {any[]} args
     */
    public abstract initialize (...args: any[]): void;

    /**
     * @returns {string}
     */
    public getCode (): string {
        if (!this.cachedCode) {
            this.cachedCode = NodeUtils.convertStructureToCode(this.getNode());
        }

        return this.cachedCode;
    }

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
