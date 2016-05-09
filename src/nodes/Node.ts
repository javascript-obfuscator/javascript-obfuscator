import { INode } from '../interfaces/INode';

import { AppendState } from '../enums/AppendState';

export abstract class Node implements INode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @type any
     */
    protected node: any;

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
    public getNode (): any {
        return this.node;
    }

    /**
     * @param node
     */
    public setNode (node: any): void {
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
