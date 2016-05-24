import { ICustomNode } from '../interfaces/ICustomNode';
import { INode } from '../interfaces/nodes/INode';

import { AppendState } from '../enums/AppendState';

export abstract class Node implements ICustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @type {INode}
     */
    protected astTree: INode;

    /**
     * @type {INode}
     */
    protected node: INode;

    constructor () {}

    public abstract appendNode (): void;

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
