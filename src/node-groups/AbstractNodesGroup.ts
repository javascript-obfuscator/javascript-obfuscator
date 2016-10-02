import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';

import { INodesGroup } from '../interfaces/INodesGroup';
import { IOptions } from '../interfaces/IOptions';

export abstract class AbstractNodesGroup implements INodesGroup {
    /**
     * @type {Map<string, AbstractCustomNode>}
     */
    protected nodes: Map <string, ICustomNode> = new Map <string, ICustomNode> ();

    /**
     * @type {IOptions}
     */
    protected options: IOptions;

    constructor (options: IOptions) {
        this.options = options;
    }

    /**
     * @returns {Map<string, INode>}
     */
    public getNodes (): Map <string, ICustomNode> {
        return this.nodes;
    }
}
