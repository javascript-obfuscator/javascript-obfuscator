import { ICustomNode } from "./ICustomNode";

export interface ICustomNodeWithIdentifier extends ICustomNode {
    /**
     * @returns {string}
     */
    getNodeIdentifier (): string;
}
