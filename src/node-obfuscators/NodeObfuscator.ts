import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IIdentifierNode } from "../interfaces/nodes/IIdentifierNode";
import { INodeObfuscator } from '../interfaces/INodeObfuscator';
import { INode } from "../interfaces/nodes/INode";
import { IOptions } from "../interfaces/IOptions";

import { TUnicodeArrayCallsWrapper } from "../types/custom-nodes/TUnicodeArrayCallsWrapper";
import { TUnicodeArrayNode } from "../types/custom-nodes/TUnicodeArrayNode";

import { JSFuck } from "../enums/JSFuck";

import { Nodes } from "../Nodes";
import { UnicodeArray } from "../UnicodeArray";
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
        return this.options.reservedNames
            .some((reservedName: string) => {
                return new RegExp(reservedName, 'g').test(name);
            });
    }

    /**
     * Store all identifiers names as keys in given `namesMap` with random names as value.
     * Reserved names will be ignored.
     *
     * @param node
     * @param namesMap
     */
    protected storeIdentifiersNames (
        node: INode,
        namesMap: Map <string, string>
    ): void {
        if (Nodes.isIdentifierNode(node) && !this.isReservedName(node.name)) {
            namesMap.set(node.name, Utils.getRandomVariableName());
        }
    }

    /**
     * @param node
     * @param parentNode
     * @param namesMap
     * @returns {string}
     */
    protected replaceIdentifiersWithRandomNames (
        node: IIdentifierNode,
        parentNode: INode,
        namesMap: Map <string, string>
    ): string {
        const obfuscatedIdentifierName: string|undefined = namesMap.get(node.name);
        const parentNodeIsPropertyNode: boolean = Nodes.isPropertyNode(parentNode) && parentNode.key === node;
        const parentNodeIsMemberExpressionNode: boolean = (
            Nodes.isMemberExpressionNode(parentNode) &&
            parentNode.computed === false &&
            parentNode.property === node
        );

        if (parentNodeIsPropertyNode || parentNodeIsMemberExpressionNode || !obfuscatedIdentifierName) {
            return node.name;
        }

        return obfuscatedIdentifierName;
    }

    /**
     * @param nodeValue
     * @returns {string}
     */
    protected replaceLiteralBooleanWithJSFuck (nodeValue: boolean): string {
        return nodeValue ? JSFuck.True : JSFuck.False;
    }

    /**
     * @param nodeValue
     * @returns {string}
     */
    protected replaceLiteralNumberWithHexadecimalValue (nodeValue: number): string {
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
    protected replaceLiteralValueWithUnicodeValue (nodeValue: string): string {
        const replaceWithUnicodeArrayFlag: boolean = Math.random() <= this.options.unicodeArrayThreshold;

        if (this.options.encodeUnicodeLiterals && replaceWithUnicodeArrayFlag) {
            nodeValue = Utils.btoa(nodeValue);
        }

        nodeValue = Utils.stringToUnicode(nodeValue);

        if (this.options.unicodeArray && replaceWithUnicodeArrayFlag) {
            return this.replaceLiteralValueWithUnicodeArrayCall(nodeValue);
        }

        return nodeValue;
    }

    /**
     * @param value
     * @returns {string}
     */
    protected replaceLiteralValueWithUnicodeArrayCall (value: string): string {
        const unicodeArrayNode: TUnicodeArrayNode = <TUnicodeArrayNode>this.nodes.get('unicodeArrayNode');

        if (!unicodeArrayNode) {
            throw new ReferenceError('`unicodeArrayNode` node is not found in Map with custom nodes.');
        }

        let unicodeArray: UnicodeArray = unicodeArrayNode.getNodeData(),
            indexOfExistingValue: number = unicodeArray.getIndexOf(value),
            indexOfValue: number,
            hexadecimalIndex: string;

        if (indexOfExistingValue >= 0) {
            indexOfValue = indexOfExistingValue;
        } else {
            indexOfValue = unicodeArray.getLength();
            unicodeArrayNode.updateNodeData(value);
        }

        hexadecimalIndex = this.replaceLiteralNumberWithHexadecimalValue(indexOfValue);

        if (this.options.wrapUnicodeArrayCalls) {
            const unicodeArrayCallsWrapper: TUnicodeArrayCallsWrapper = <TUnicodeArrayCallsWrapper>this.nodes.get('unicodeArrayCallsWrapper');

            if (!unicodeArrayCallsWrapper) {
                throw new ReferenceError('`unicodeArrayCallsWrapper` node is not found in Map with custom nodes.');
            }

            return `${unicodeArrayCallsWrapper.getNodeIdentifier()}('${hexadecimalIndex}')`;
        }

        return `${unicodeArrayNode.getNodeIdentifier()}[${hexadecimalIndex}]`;
    }
}
