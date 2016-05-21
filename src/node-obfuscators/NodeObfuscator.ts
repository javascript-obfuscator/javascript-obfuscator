import { INode } from '../interfaces/INode';
import { INodeObfuscator } from '../interfaces/INodeObfuscator';
import { ITreeNode } from "../interfaces/nodes/ITreeNode";

import { NodeUtils } from "../NodeUtils";
import { Utils } from '../Utils';

export abstract class NodeObfuscator implements INodeObfuscator {
    /**
     * @type Map <string, Node>
     */
    protected nodes: Map <string, INode>;

    /**
     * @param nodes
     */
    constructor(nodes: Map <string, INode>) {
        this.nodes = nodes;
    }

    /**
     * @param node
     * @param parentNode
     */
    public abstract obfuscateNode (node: ITreeNode, parentNode?: ITreeNode): void;

    /**
     * @param node
     * @param parentNode
     * @param namesMap
     */
    protected replaceNodeIdentifierByNewValue (node: ITreeNode, parentNode: ITreeNode, namesMap: Map <string, string>): void {
        if (NodeUtils.isIdentifierNode(node) && namesMap.has(node.name)) {
            if (
                (NodeUtils.isPropertyNode(parentNode) && parentNode.key === node) ||
                (NodeUtils.isMemberExpressionNode(parentNode) && parentNode.computed === false && parentNode.property === node )
            ) {
                return;
            }

            node.name = namesMap.get(node.name);
        }
    }

    /**
     * @param nodeValue
     * @returns {string}
     */
    protected replaceLiteralNumberByHexadecimalValue (nodeValue: number): string {
        const prefix: string = '0x';

        if (!Utils.isInteger(nodeValue)) {
            return String(nodeValue);
        }

        return `${prefix}${Utils.decToHex(nodeValue)}`;
    }

    /**
     * @param nodeValue
     * @returns {string}
     */
    protected replaceLiteralStringByArrayElement (nodeValue: string): string {
        let value: string = Utils.stringToUnicode(nodeValue),
            unicodeArray: string[] = this.nodes.get('unicodeArrayNode').getNodeData(),
            sameIndex: number = unicodeArray.indexOf(value),
            index: number;

        if (sameIndex < 0) {
            index = unicodeArray.length;
            unicodeArray.push(Utils.stringToUnicode(nodeValue));
        } else {
            index = sameIndex;
        }

        return `${this.nodes.get('unicodeArrayNode').getNodeIdentifier()}[${index}]`;
    }
}
