import { ICustomNode } from 'app/interfaces/custom-nodes/ICustomNode';
import { IOptions } from 'app/interfaces/IOptions';
import { IReplacer } from 'app/interfaces/IReplacer';

export abstract class AbstractReplacer implements IReplacer {
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
     * @param nodeValue
     * @param namesMap
     * @returns {string}
     */
    public abstract replace (nodeValue: any, namesMap?: Map <string, string>): string;
}
