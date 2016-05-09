import { INode } from '../interfaces/INode';
import { INodeObfuscator } from '../interfaces/INodeObfuscator';

import { UnicodeArrayNode } from '../nodes/UnicodeArrayNode';
import { Utils } from '../Utils';

export abstract class NodeObfuscator implements INodeObfuscator {
    /**
     * @param Map <string, Node>
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
    public abstract obfuscateNode (node: any, parentNode?: any): void;

    /**
     * @param node
     * @param parentNode
     * @param namesMap
     */
    protected replaceNodeIdentifierByNewValue (node: any, parentNode: any, namesMap: Map <string, string>) {
        if (node.type === 'Identifier' && namesMap.has(node.name)) {
            if (
                (parentNode.type === 'Property' && parentNode.key === node) ||
                (parentNode.type === 'MemberExpression' && parentNode.computed === false && parentNode.property === node)
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
    protected replaceLiteralStringByArrayElement (nodeValue: string): string {
        let value: string = Utils.stringToUnicode(nodeValue),
            unicodeArray = this.nodes.get('unicodeArrayNode').getNodeData(),
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