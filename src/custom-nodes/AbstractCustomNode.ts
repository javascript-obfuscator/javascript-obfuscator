import * as ESTree from 'estree';

import { TStatement } from '../types/TStatement';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../interfaces/IOptions';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

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
     * @param stackTraceData
     */
    public abstract appendNode (astTree: ESTree.Node, stackTraceData?: IStackTraceData[]): void;

    /**
     * @returns {AppendState}
     */
    public getAppendState (): AppendState {
        return this.appendState;
    }

    /**
     * @returns {TStatement[]}
     */
    public getNode (): TStatement[] {
        return this.getNodeStructure();
    }

    /**
     * @returns {TStatement[]}
     */
    protected abstract getNodeStructure (): TStatement[];
}
