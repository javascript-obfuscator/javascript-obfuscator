import { ICustomNode } from '../interfaces/ICustomNode';
import { INode } from '../interfaces/nodes/INode';
import { IOptions } from "../interfaces/IOptions";

import { AppendState } from '../enums/AppendState';

import { NodeUtils } from "../NodeUtils";

export abstract class Node implements ICustomNode {
    /**
     * TODO: add `abstract` modifier
     *
     * @type {AppendState}
     */
    protected appendState: AppendState;

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
        let node: INode = this.getNodeStructure();

        NodeUtils.parentize(node);

        return node;
    }

    /**
     * @returns any
     */
    protected abstract getNodeStructure (): any;
}
