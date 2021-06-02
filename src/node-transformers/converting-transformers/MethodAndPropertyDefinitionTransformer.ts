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
 *     ['foo'] () { //... };
 *
 * Literal node will be obfuscated by LiteralTransformer
 */
@injectable()
export class MethodAndPropertyDefinitionTransformer extends AbstractNodeTransformer {
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
                        if (
                            parentNode
                            && (
                                NodeGuards.isMethodDefinitionNode(node)
                                || NodeGuards.isPropertyDefinitionNode(node)
                            )
                        ) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {MethodDefinition | PropertyDefinition} classFieldNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (
        classFieldNode: ESTree.MethodDefinition | ESTree.PropertyDefinition,
        parentNode: ESTree.Node
    ): ESTree.Node {
        if (NodeGuards.isIdentifierNode(classFieldNode.key)) {
            return this.replaceIdentifierKey(classFieldNode, classFieldNode.key);
        }

        if (NodeGuards.isLiteralNode(classFieldNode.key)) {
            return this.replaceLiteralKey(classFieldNode, classFieldNode.key);
        }

        return classFieldNode;
    }

    /**
     * @param {MethodDefinition | PropertyDefinition} classFieldNode
     * @param {Identifier} keyNode
     * @returns {MethodDefinition | PropertyDefinition}
     */
    private replaceIdentifierKey (
        classFieldNode: ESTree.MethodDefinition | ESTree.PropertyDefinition,
        keyNode: ESTree.Identifier
    ): ESTree.MethodDefinition | ESTree.PropertyDefinition {
        if (
            !MethodAndPropertyDefinitionTransformer.ignoredNames.includes(keyNode.name)
            && !classFieldNode.computed
        ) {
            classFieldNode.computed = true;
            classFieldNode.key = NodeFactory.literalNode(keyNode.name);
        }

        return classFieldNode;
    }

    /**
     * @param {MethodDefinition | PropertyDefinition} classFieldNode
     * @param {Literal} keyNode
     * @returns {MethodDefinition | PropertyDefinition}
     */
    private replaceLiteralKey (
        classFieldNode: ESTree.MethodDefinition | ESTree.PropertyDefinition,
        keyNode: ESTree.Literal
    ): ESTree.MethodDefinition | ESTree.PropertyDefinition {
        if (
            typeof keyNode.value === 'string'
            && !MethodAndPropertyDefinitionTransformer.ignoredNames.includes(keyNode.value)
            && !classFieldNode.computed
        ) {
            classFieldNode.computed = true;
        }

        return classFieldNode;
    }
}
