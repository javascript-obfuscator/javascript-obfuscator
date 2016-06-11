import { ICustomNode } from '../interfaces/ICustomNode';
import { INode } from '../interfaces/nodes/INode';
import { IOptions } from "../interfaces/IOptions";

import { AppendState } from '../enums/AppendState';

import { NodeUtils } from "../NodeUtils";

export abstract class Node implements ICustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @type {INode}
     */
    protected node: INode;

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
     * @returns any
     */
    public getNode (): INode {
        NodeUtils.parentize(this.node);

        return this.node;
    }

    /**
     * @param node
     */
    public setNode (node: INode): void {
        this.node = node;
    }

    public updateNode (): void {
        this.node = this.getNodeStructure();
    }

    /**
     * @returns any
     */
    protected abstract getNodeStructure (): any;
}
