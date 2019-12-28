import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';

/**
 * Splits strings into parts
 */
@injectable()
export class SplitStringTransformer extends AbstractNodeTransformer {
    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {string} string
     * @param {number} chunkSize
     * @returns {string[]}
     */
    private static chunkString (string: string, chunkSize: number): string[] {
        const chunksCount: number = Math.ceil(string.length / chunkSize);
        const chunks: string[] = [];

        let nextChunkStartIndex: number = 0;

        for (
            let chunkIndex: number = 0;
            chunkIndex < chunksCount;
            ++chunkIndex, nextChunkStartIndex += chunkSize
        ) {
            chunks[chunkIndex] = string.substr(nextChunkStartIndex, chunkSize);
        }

        return chunks;
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.Converting:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (!this.options.splitStrings) {
                            return;
                        }

                        if (parentNode && NodeGuards.isLiteralNode(node)) {
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
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (literalNode: ESTree.Literal, parentNode: ESTree.Node): ESTree.Node {
        if (typeof literalNode.value !== 'string') {
            return literalNode;
        }

        if (NodeGuards.isPropertyNode(parentNode) && !parentNode.computed) {
            return literalNode;
        }

        if (this.options.splitStringsChunkLength >= literalNode.value.length) {
            return literalNode;
        }

        const stringChunks: string[] = SplitStringTransformer.chunkString(
            literalNode.value,
            this.options.splitStringsChunkLength
        );

        return this.transformStringChunksToBinaryExpressionNode(stringChunks);
    }

    /**
     * @param {string[]} chunks
     * @returns {BinaryExpression}
     */
    private transformStringChunksToBinaryExpressionNode (chunks: string[]): ESTree.BinaryExpression | ESTree.Literal {
        const lastChunk: string | undefined = chunks.pop();

        if (lastChunk === undefined) {
            throw new Error('Last chunk value should not be empty');
        }

        const lastChunkLiteralNode: ESTree.Literal = NodeFactory.literalNode(lastChunk);

        if (chunks.length === 0) {
            return lastChunkLiteralNode;
        }

        return NodeFactory.binaryExpressionNode(
            '+',
            this.transformStringChunksToBinaryExpressionNode(chunks),
            lastChunkLiteralNode
        );
    }
}
