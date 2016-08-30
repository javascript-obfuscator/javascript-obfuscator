import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { INode } from '../interfaces/nodes/INode';
import { IOptions } from "../interfaces/IOptions";

import { AppendState } from '../enums/AppendState';

export abstract class AbstractCustomNode implements ICustomNode {
    /**
     * @type {AppendState}
     */
    protected abstract appendState: AppendState;

    /**
     * @type {IOptions}
     */
    protected options: IOptions;

    /**
     * @param options
     */
    constructor (options: IOptions) {
        this.options = options;
    }

    /**
     * @param astTree
     */
    public abstract appendNode (astTree: INode): void;

    /**
     * @returns {AppendState}
     */
    public getAppendState (): AppendState {
        return this.appendState;
    }

    /**
     * @returns {INode}
     */
    public getNode (): INode {
        return this.getNodeStructure();
    }

    /**
     * @returns {INode}
     */
    protected abstract getNodeStructure (): INode;
}
