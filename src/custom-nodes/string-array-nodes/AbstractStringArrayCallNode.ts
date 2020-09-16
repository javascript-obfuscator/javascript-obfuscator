import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

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
    protected getHexadecimalNode (index: number): ESTree.Expression {
        const isPositive: boolean = index >= 0;
        const normalizedIndex: number = Math.abs(index);

        const hexadecimalIndex: string = NumberUtils.toHex(normalizedIndex);
        const hexadecimalLiteralNode: ESTree.Literal = NodeFactory.literalNode(hexadecimalIndex);

        NodeMetadata.set(hexadecimalLiteralNode, { replacedLiteral: true });

        const hexadecimalNode: ESTree.Expression = isPositive
            ? hexadecimalLiteralNode
            : NodeFactory.unaryExpressionNode(
                '-',
                hexadecimalLiteralNode
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
}
