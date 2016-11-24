import * as ESTree from 'estree';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../interfaces/IOptions';
import { TStatement } from '../types/TStatement';

import { AppendState } from '../enums/AppendState';
import { NodeUtils } from '../node/NodeUtils';

export abstract class AbstractCustomNode implements ICustomNode {
    /**
     * @type {AppendState}
     */
    protected abstract appendState: AppendState;

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

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
     * @returns {string}
     */
    public abstract getCode (): string;

    /**
     * @returns {TStatement[]}
     */
    public getNode (): TStatement[] {
        return this.getNodeStructure();
    }

    /**
     * @param appendState
     */
    public setAppendState (appendState: AppendState): void {
        this.appendState = appendState;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(this.getCode());
    }
}
