import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeLiteralUtils } from '../../node/NodeLiteralUtils';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class EscapeSequenceTransformer extends AbstractNodeTransformer {
    /**
     * @type {NodeTransformer[]}
     */
    public readonly runAfter: NodeTransformer[] = [
        NodeTransformer.CustomCodeHelpersTransformer
    ];

    /**
     * @type {IEscapeSequenceEncoder}
     */
    private readonly escapeSequenceEncoder: IEscapeSequenceEncoder;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IEscapeSequenceEncoder) escapeSequenceEncoder: IEscapeSequenceEncoder
    ) {
        super(randomGenerator, options);

        this.escapeSequenceEncoder = escapeSequenceEncoder;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Finalizing:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (NodeGuards.isLiteralNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {Literal} literalNode
     * @param {Node | null} parentNode
     * @returns {Literal}
     */
    public transformNode (literalNode: ESTree.Literal, parentNode: ESTree.Node | null): ESTree.Literal {
        if (!NodeLiteralUtils.isStringLiteralNode(literalNode)) {
            return literalNode;
        }

        const encodedValue: string = this.escapeSequenceEncoder.encode(
            literalNode.value,
            this.options.unicodeEscapeSequence
        );
        const newLiteralNode: ESTree.Literal = NodeFactory.literalNode(encodedValue);

        NodeUtils.parentizeNode(newLiteralNode, parentNode);

        return newLiteralNode;
    }
}
