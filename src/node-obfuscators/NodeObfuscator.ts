import * as estraverse from 'estraverse';

import { ICustomNode } from '../interfaces/ICustomNode';
import { INodeObfuscator } from '../interfaces/INodeObfuscator';
import { INode } from "../interfaces/nodes/INode";
import { IOptions } from "../interfaces/IOptions";

import { JSFuck } from "../enums/JSFuck";

import { Nodes } from "../Nodes";
import { UnicodeArrayNode } from "../custom-nodes/unicode-array-nodes/UnicodeArrayNode";
import { Utils } from '../Utils';

export abstract class NodeObfuscator implements INodeObfuscator {
    /**
     * @type Map <string, Node>
     */
    protected nodes: Map <string, ICustomNode>;

    /**
     * @type {IOptions}
     */
    protected options: IOptions;

    /**
     * @param nodes
     * @param options
     */
    constructor(nodes: Map <string, ICustomNode>, options: IOptions) {
        this.nodes = nodes;
        this.options = options;
    }

    /**
     * @param node
     * @param parentNode
     */
    public abstract obfuscateNode (node: INode, parentNode?: INode): void;

    /**
     * @param name
     * @returns {boolean}
     */
    protected isReservedName (name: string): boolean {
        return this.options.get<string[]>('reservedNames')
            .some((reservedName: string) => {
                return new RegExp(reservedName, 'g').test(name);
            });
    }

    /**
     * Replaces all identifiers names in specified node with new random names and stores that names in given `namesMap`.
     * Reserved names will be ignored.
     *
     * @param node
     * @param namesMap
     * @returns {estraverse.VisitorOption}
     */
    protected replaceAndStoreIdentifiersNames (node: INode, namesMap: Map <string, string>): estraverse.VisitorOption {
        if (Nodes.isIdentifierNode(node) && !this.isReservedName(node.name)) {
            namesMap.set(node.name, Utils.getRandomVariableName());
            node.name = namesMap.get(node.name);

            return;
        }

        return estraverse.VisitorOption.Skip;
    }

    /**
     * @param node
     * @param parentNode
     * @param namesMap
     */
    protected replaceNodeIdentifierByNewValue (node: INode, parentNode: INode, namesMap: Map <string, string>): void {
        if (Nodes.isIdentifierNode(node) && namesMap.has(node.name)) {
            const parentNodeIsPropertyNode: boolean = (
                    Nodes.isPropertyNode(parentNode) &&
                    parentNode.key === node
                ),
                parentNodeIsMemberExpressionNode: boolean = (
                    Nodes.isMemberExpressionNode(parentNode) &&
                    parentNode.computed === false &&
                    parentNode.property === node
                );

            if (parentNodeIsPropertyNode || parentNodeIsMemberExpressionNode) {
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
    protected replaceLiteralValueByUnicodeValue (nodeValue: string): string {
        let value: string = nodeValue,
            replaceByUnicodeArrayFlag: boolean = Math.random() <= this.options.get('unicodeArrayThreshold');

        if (this.options.get('encodeUnicodeLiterals') && replaceByUnicodeArrayFlag) {
            value = Utils.btoa(value);
        }

        value = Utils.stringToUnicode(value);

        if (!this.options.get('unicodeArray') || !replaceByUnicodeArrayFlag) {
            return value;
        }

        return this.replaceLiteralValueByUnicodeArrayCall(value);
    }

    /**
     * @param value
     * @returns {string}
     */
    protected replaceLiteralValueByUnicodeArrayCall (value: string): string {
        let unicodeArrayNode: UnicodeArrayNode = <UnicodeArrayNode> this.nodes.get('unicodeArrayNode'),
            unicodeArray: string[] = unicodeArrayNode.getNodeData(),
            sameIndex: number = unicodeArray.indexOf(value),
            index: number,
            hexadecimalIndex: string;

        if (sameIndex >= 0) {
            index = sameIndex;
        } else {
            index = unicodeArray.length;
            unicodeArrayNode.updateNodeData(value);
        }

        hexadecimalIndex = this.replaceLiteralNumberByHexadecimalValue(index);

        if (this.options.get('wrapUnicodeArrayCalls')) {
            return `${this.nodes.get('unicodeArrayCallsWrapper').getNodeIdentifier()}('${hexadecimalIndex}')`;
        }

        return `${unicodeArrayNode.getNodeIdentifier()}[${hexadecimalIndex}]`;
    }
}
