import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../interfaces/options/IOptions';
import { TStatement } from '../types/node/TStatement';

import { NodeUtils } from '../node/NodeUtils';

@injectable()
export abstract class AbstractCustomNode implements ICustomNode {
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
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
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
     * @returns {TStatement[]}
     */
    protected abstract getNodeStructure (): TStatement[];
}
