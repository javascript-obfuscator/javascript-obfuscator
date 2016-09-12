import * as ESTree from 'estree';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
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
    public abstract appendNode (astTree: ESTree.Node): void;

    /**
     * @returns {AppendState}
     */
    public getAppendState (): AppendState {
        return this.appendState;
    }

    /**
     * @returns {ESTree.Node}
     */
    public getNode (): ESTree.Node {
        return this.getNodeStructure();
    }

    /**
     * @returns {ESTree.Node}
     */
    protected abstract getNodeStructure (): ESTree.Node;
}
