import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NumberUtils } from '../../utils/NumberUtils';

@injectable()
export class NumberLiteralTransformer extends AbstractNodeTransformer {
    /**
     * Have to run it after NumberToNumericalExpressionTransformer to keep logic simple
     *
     * @type {NodeTransformer[]}
     */
    public readonly runAfter: NodeTransformer[] = [
        NodeTransformer.NumberToNumericalExpressionTransformer
    ];

    /**
     * @type {Map<ESTree.SimpleLiteral['value'] | ESTree.BigIntLiteral['value'], string>}
     */
    private readonly numberLiteralCache: Map <
        ESTree.SimpleLiteral['value'] | ESTree.BigIntLiteral['value'],
        string
    > = new Map();

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Converting:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
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
     * Replaces:
     *     var foo = 1;
     *
     * on:
     *     var foo = 0x1;
     *
     * @param {Literal} literalNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (literalNode: ESTree.Literal, parentNode: ESTree.Node): ESTree.Node {
        if (typeof literalNode.value !== 'number' && typeof literalNode.value !== 'bigint') {
            return literalNode;
        }

        const literalValue: number = <number>literalNode.value;

        let rawValue: string;

        if (this.numberLiteralCache.has(literalValue)) {
            rawValue = <string>this.numberLiteralCache.get(literalValue);
        } else {
            if (NumberUtils.isCeil(literalValue)) {
                rawValue = NumberUtils.toHex(literalValue);
            } else {
                rawValue = String(literalValue);
            }

            this.numberLiteralCache.set(literalValue, rawValue);
        }

        return NodeFactory.literalNode(literalValue, rawValue);
    }
}
