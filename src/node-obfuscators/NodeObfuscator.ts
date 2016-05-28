import { ICustomNode } from '../interfaces/ICustomNode';
import { INodeObfuscator } from '../interfaces/INodeObfuscator';
import { INode } from "../interfaces/nodes/INode";

import { JSFuck } from "../enums/JSFuck";

import { NodeUtils } from "../NodeUtils";
import { Utils } from '../Utils';

export abstract class NodeObfuscator implements INodeObfuscator {
    /**
     * @type Map <string, Node>
     */
    protected nodes: Map <string, ICustomNode>;

    /**
     * @type any
     */
    protected options: any;

    /**
     * @param nodes
     * @param options
     */
    constructor(nodes: Map <string, ICustomNode>, options: any = {}) {
        this.nodes = nodes;
        this.options = options;
    }

    /**
     * @param node
     * @param parentNode
     */
    public abstract obfuscateNode (node: INode, parentNode?: INode): void;

    /**
     * @param node
     * @param parentNode
     * @param namesMap
     */
    protected replaceNodeIdentifierByNewValue (node: INode, parentNode: INode, namesMap: Map <string, string>): void {
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
    protected replaceLiteralBooleanByJSFuck (nodeValue: boolean): string {
        return nodeValue ? JSFuck.True : JSFuck.False;
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
    protected replaceLiteralStringByUnicodeArrayCall (nodeValue: string): string {
        let value: string = Utils.stringToUnicode(nodeValue),
            unicodeArray: string[] = this.nodes.get('unicodeArrayNode').getNodeData(),
            sameIndex: number = unicodeArray.indexOf(value),
            index: number,
            hexadecimalIndex: string;

        if (sameIndex < 0) {
            index = unicodeArray.length;
            unicodeArray.push(Utils.stringToUnicode(nodeValue));
        } else {
            index = sameIndex;
        }

        hexadecimalIndex = this.replaceLiteralNumberByHexadecimalValue(index);

        if (this.options['wrapUnicodeArrayCalls']) {
            return `${this.nodes.get('unicodeArrayCallsWrapper').getNodeIdentifier()}('${hexadecimalIndex}')`;
        }

        return `${this.nodes.get('unicodeArrayNode').getNodeIdentifier()}[${hexadecimalIndex}]`;
    }
}
