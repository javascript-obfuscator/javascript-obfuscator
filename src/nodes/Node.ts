import { INode } from '../interfaces/INode';
import { ITreeNode } from '../interfaces/nodes/ITreeNode';

import { AppendState } from '../enums/AppendState';

export abstract class Node implements INode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @type {ITreeNode}
     */
    protected node: ITreeNode;

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
    public getNode (): ITreeNode {
        return this.node;
    }

    /**
     * @param node
     */
    public setNode (node: ITreeNode): void {
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
