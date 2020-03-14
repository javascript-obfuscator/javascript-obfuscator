import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';

/**
 * replaces:
 *     foo () { //... };
 *
 * or
 *     'foo' () { //... };
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
        if (NodeGuards.isIdentifierNode(methodDefinitionNode.key)) {
            return this.replaceIdentifierKey(methodDefinitionNode, methodDefinitionNode.key);
        }

        if (NodeGuards.isLiteralNode(methodDefinitionNode.key)) {
            return this.replaceLiteralKey(methodDefinitionNode, methodDefinitionNode.key);
        }

        return methodDefinitionNode;
    }

    /**
     * @param {MethodDefinition} methodDefinitionNode
     * @param {Identifier} keyNode
     * @returns {MethodDefinition}
     */
    private replaceIdentifierKey (
        methodDefinitionNode: ESTree.MethodDefinition,
        keyNode: ESTree.Identifier
    ): ESTree.MethodDefinition {
        if (
            !MethodDefinitionTransformer.ignoredNames.includes(keyNode.name)
            && !methodDefinitionNode.computed
        ) {
            methodDefinitionNode.computed = true;
            methodDefinitionNode.key = NodeFactory.literalNode(keyNode.name);
        }

        return methodDefinitionNode;
    }

    /**
     * @param {MethodDefinition} methodDefinitionNode
     * @param {Literal} keyNode
     * @returns {MethodDefinition}
     */
    private replaceLiteralKey (
        methodDefinitionNode: ESTree.MethodDefinition,
        keyNode: ESTree.Literal
    ): ESTree.MethodDefinition {
        if (
            typeof keyNode.value === 'string'
            && !MethodDefinitionTransformer.ignoredNames.includes(keyNode.value)
            && !methodDefinitionNode.computed
        ) {
            methodDefinitionNode.computed = true;
        }

        return methodDefinitionNode;
    }
}
