import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/IOptions';
import { IReplacer } from '../../../interfaces/IReplacer';

export abstract class AbstractReplacer implements IReplacer {
    /**
     * @type Map <string, AbstractCustomNode>
     */
    protected readonly nodes: Map <string, ICustomNode>;

    /**
     * @type {IOptions}
     */
    protected readonly options : IOptions;

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
