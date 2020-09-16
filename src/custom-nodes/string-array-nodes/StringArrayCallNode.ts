import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeMetadata } from '../../node/NodeMetadata';
import { NodeUtils } from '../../node/NodeUtils';
import { NumberUtils } from '../../utils/NumberUtils';

@injectable()
export class StringArrayCallNode extends AbstractCustomNode {
    /**
     * @type {string | null}
     */
    @initializable()
    private decodeKey!: string | null;

    /**
     * @type {number}
     */
    @initializable()
    private index!: number;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayCallsWrapperName!: string;


    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomCodeHelperFormatter} customCodeHelperFormatter
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomCodeHelperFormatter) customCodeHelperFormatter: ICustomCodeHelperFormatter,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(
            identifierNamesGeneratorFactory,
            customCodeHelperFormatter,
            randomGenerator,
            options
        );
    }

    /**
     * @param {string} index
     * @returns {Literal}
     */
    public static getHexadecimalLiteralNode (index: number): ESTree.Literal {
        const hexadecimalIndex: string = NumberUtils.toHex(index);
        const hexadecimalLiteralNode: ESTree.Literal = NodeFactory.literalNode(hexadecimalIndex);

        NodeMetadata.set(hexadecimalLiteralNode, { replacedLiteral: true });

        return hexadecimalLiteralNode;
    }

    /**
     * @param {string} decodeKey
     * @returns {Literal}
     */
    private static getRc4KeyLiteralNode (decodeKey: string): ESTree.Literal {
        const rc4KeyLiteralNode: ESTree.Literal = NodeFactory.literalNode(decodeKey);

        NodeMetadata.set(rc4KeyLiteralNode, { replacedLiteral: true });

        return rc4KeyLiteralNode;
    }

    /**
     * @param {string} stringArrayCallsWrapperName
     * @param {number} index
     * @param {string | null} decodeKey
     */
    public initialize (
        stringArrayCallsWrapperName: string,
        index: number,
        decodeKey: string | null
    ): void {
        this.stringArrayCallsWrapperName = stringArrayCallsWrapperName;
        this.index = index;
        this.decodeKey = decodeKey;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const callExpressionArgs: ESTree.Literal[] = [
            StringArrayCallNode.getHexadecimalLiteralNode(this.index)
        ];

        if (this.decodeKey) {
            callExpressionArgs.push(StringArrayCallNode.getRc4KeyLiteralNode(this.decodeKey));
        }

        const stringArrayIdentifierNode: ESTree.Identifier =
            NodeFactory.identifierNode(this.stringArrayCallsWrapperName);


        const structure: TStatement = NodeFactory.expressionStatementNode(
            NodeFactory.callExpressionNode(
                stringArrayIdentifierNode,
                callExpressionArgs
            )
        );

        NodeUtils.parentizeAst(structure);

        return [structure];
    }
}
