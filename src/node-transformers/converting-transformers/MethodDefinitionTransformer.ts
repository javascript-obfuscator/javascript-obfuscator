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
 * replaces:
 *     foo () { //... };
 *
 * on:
 *     ['foo'] { //... };
 *
 * Literal node will be obfuscated by LiteralTransformer
 */
@injectable()
export class MethodDefinitionTransformer extends AbstractNodeTransformer {
    /**
     * @type {string[]}
     */
    private static readonly ignoredNames: string[] = ['constructor'];

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
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.Converting:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (parentNode && NodeGuards.isMethodDefinitionNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * replaces:
     *     object.identifier = 1;
     *
     * on:
     *     object['identifier'] = 1;
     *
     * and skip:
     *     object[identifier] = 1;
     * Literal node will be obfuscated by LiteralTransformer
     *
     * @param {MethodDefinition} methodDefinitionNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (methodDefinitionNode: ESTree.MethodDefinition, parentNode: ESTree.Node): ESTree.Node {
        if (
            NodeGuards.isIdentifierNode(methodDefinitionNode.key) &&
            !MethodDefinitionTransformer.ignoredNames.includes(methodDefinitionNode.key.name) &&
            methodDefinitionNode.computed === false
        ) {
            methodDefinitionNode.computed = true;
            methodDefinitionNode.key = NodeFactory.literalNode(methodDefinitionNode.key.name);
        }

        return methodDefinitionNode;
    }
}
