import { AppendState } from '../enums/AppendState';

export interface INode {
    appendNode (): void;

    /**
     * @returns {AppendState}
     */
    getAppendState (): AppendState;

    /**
     * @returns any
     */
    getNode (): any;

    /**
     * @returns {string}
     */
    getNodeIdentifier ? (): string;

    /**
     * @returns any
     */
    getNodeData ? (): any;

    /**
     * @param node
     */
    setNode (node: any): void;

    updateNode (): void;
}