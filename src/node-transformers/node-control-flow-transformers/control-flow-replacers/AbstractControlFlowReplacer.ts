import * as ESTree from 'estree';

import { IControlFlowReplacer } from '../../../interfaces/IControlFlowReplacer';
import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/IOptions';

import { ControlFlowStorage } from '../../../ControlFlowStorage';
import { Utils } from '../../../Utils';

export abstract class AbstractControlFlowReplacer implements IControlFlowReplacer {
    /**
     * @type Map <string, AbstractCustomNode>
     */
    protected nodes: Map <string, ICustomNode>;

    /**
     * @type {IOptions}
     */
    protected options : IOptions;

    /**
     * @param nodes
     * @param options
     */
    constructor (nodes: Map <string, ICustomNode>, options: IOptions) {
        this.nodes = nodes;
        this.options = options;
    }

    /**
     * @returns {string}
     */
    protected static getStorageKey (): string {
        return Utils.getRandomGenerator().string({
            length: 3,
            pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        });
    }

    /**
     * @param node
     * @param parentNode
     * @param controlFlowStorage
     * @param controlFlowStorageCustomNodeName
     * @returns {ICustomNode | undefined}
     */
    public abstract replace (
        node: ESTree.Node,
        parentNode: ESTree.Node,
        controlFlowStorage: ControlFlowStorage,
        controlFlowStorageCustomNodeName: string
    ): ICustomNode | undefined;
}
