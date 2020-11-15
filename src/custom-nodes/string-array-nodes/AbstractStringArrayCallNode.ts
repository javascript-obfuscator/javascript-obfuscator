import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStringArrayIndexesType } from '../../types/options/TStringArrayIndexesType';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { StringArrayIndexesType } from '../../enums/node-transformers/string-array-transformers/StringArrayIndexesType';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeMetadata } from '../../node/NodeMetadata';
import { NodeUtils } from '../../node/NodeUtils';
import { NumberUtils } from '../../utils/NumberUtils';

@injectable()
export abstract class AbstractStringArrayCallNode extends AbstractCustomNode {
    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomCodeHelperFormatter} customCodeHelperFormatter
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    protected constructor (
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
     * @param {number} index
     * @returns {Expression}
     */
    protected getStringArrayCallIndexNode (index: number): ESTree.Expression {
        const isPositive: boolean = index >= 0;
        const normalizedIndex: number = Math.abs(index);

        const stringArrayCallsIndexType: TStringArrayIndexesType = this.randomGenerator
            .getRandomGenerator()
            .pickone(this.options.stringArrayIndexesType);
        let stringArrayCallIndexNode: ESTree.Expression;

        switch (stringArrayCallsIndexType) {
            case StringArrayIndexesType.HexadecimalNumber:
                stringArrayCallIndexNode = this.getHexadecimalNumberCallIndexNode(normalizedIndex);
                break;

            case StringArrayIndexesType.HexadecimalNumericString:
            default:
                stringArrayCallIndexNode = this.getHexadecimalNumericStringCallIndexNode(normalizedIndex);
                break;
        }

        NodeMetadata.set(stringArrayCallIndexNode, { replacedLiteral: true });

        const hexadecimalNode: ESTree.Expression = isPositive
            ? stringArrayCallIndexNode
            : NodeFactory.unaryExpressionNode(
                '-',
                stringArrayCallIndexNode
            );

        NodeUtils.parentizeAst(hexadecimalNode);
        
        return hexadecimalNode;
    }

    /**
     * @param {string} decodeKey
     * @returns {Literal}
     */
    protected getRc4KeyLiteralNode (decodeKey: string): ESTree.Literal {
        const rc4KeyLiteralNode: ESTree.Literal = NodeFactory.literalNode(decodeKey);

        NodeMetadata.set(rc4KeyLiteralNode, { replacedLiteral: true });

        return rc4KeyLiteralNode;
    }

    /**
     * @param {number} index
     * @returns {Expression}
     */
    private getHexadecimalNumberCallIndexNode (index: number): ESTree.Expression {
        const hexadecimalIndex: string = NumberUtils.toHex(index);

        return NodeFactory.literalNode(index, hexadecimalIndex);
    }

    /**
     * @param {number} index
     * @returns {Expression}
     */
    private getHexadecimalNumericStringCallIndexNode (index: number): ESTree.Expression {
        const hexadecimalIndex: string = NumberUtils.toHex(index);

        return NodeFactory.literalNode(hexadecimalIndex);
    }
}
