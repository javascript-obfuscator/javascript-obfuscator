import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IManglePropertiesReplacer } from '../../interfaces/node-transformers/mangle-properties-transformers/replacer/IManglePropertiesReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';

@injectable()
export class ManglePropertiesTransformer extends AbstractNodeTransformer {
    /**
     * @type {IManglePropertiesReplacer}
     */
    private readonly manglePropertiesObfuscatingReplacer: IManglePropertiesReplacer;

    /**
     * @param {IManglePropertiesReplacer} manglePropertiesObfuscatingReplacer
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IManglePropertiesObfuscatingReplacer)
            manglePropertiesObfuscatingReplacer: IManglePropertiesReplacer,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.manglePropertiesObfuscatingReplacer = manglePropertiesObfuscatingReplacer;
    }

    /**
     * @param {TNode} propertyNode
     * @param {ESTree.Expression} propertyKeyNode
     * @returns {boolean}
     */
    private static isValidPropertyNode<
        TNode extends ESTree.Property | ESTree.MemberExpression | ESTree.MethodDefinition
    >(
        propertyNode: TNode,
        propertyKeyNode: ESTree.Expression
    ): propertyKeyNode is ESTree.Identifier | ESTree.Literal {
        if (NodeGuards.isIdentifierNode(propertyKeyNode) && propertyNode.computed) {
            return false;
        }

        return NodeGuards.isIdentifierNode(propertyKeyNode) || NodeGuards.isLiteralNode(propertyKeyNode);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.MangleProperties:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode) {
                            return this.transformNode(node, parentNode);
                        }

                        return node;
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {Node} node
     * @param {NodeGuards} parentNode
     * @returns {Node}
     */
    public transformNode (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node {
        if (NodeGuards.isPropertyNode(node)) {
            return this.transformPropertyNode(node);
        }

        if (NodeGuards.isMemberExpressionNode(node)) {
            return this.transformMemberExpressionNode(node);
        }

        if (NodeGuards.isMethodDefinitionNode(node)) {
            return this.transformMethodDefinitionNode(node);
        }

        return node;
    }

    /**
     * @param {Property} propertyNode
     * @returns {Property}
     */
    private transformPropertyNode (propertyNode: ESTree.Property): ESTree.Property {
        const propertyKeyNode: ESTree.Expression = propertyNode.key;

        if (ManglePropertiesTransformer.isValidPropertyNode(propertyNode, propertyKeyNode)) {
            propertyNode.key = this.manglePropertiesObfuscatingReplacer.replace(propertyKeyNode);
            propertyNode.shorthand = false;
        }

        return propertyNode;
    }

    /**
     * @param {Property} memberExpressionNode
     * @returns {Property}
     */
    private transformMemberExpressionNode (memberExpressionNode: ESTree.MemberExpression): ESTree.MemberExpression {
        const propertyKeyNode: ESTree.Expression = memberExpressionNode.property;

        if (ManglePropertiesTransformer.isValidPropertyNode(memberExpressionNode, propertyKeyNode)) {
            memberExpressionNode.property = this.manglePropertiesObfuscatingReplacer.replace(propertyKeyNode);
        }

        return memberExpressionNode;
    }

    /**
     * @param {MethodDefinition} methodDefinitionNode
     * @returns {MethodDefinition}
     */
    private transformMethodDefinitionNode (methodDefinitionNode: ESTree.MethodDefinition): ESTree.MethodDefinition {
        const propertyKeyNode: ESTree.Expression = methodDefinitionNode.key;

        if (ManglePropertiesTransformer.isValidPropertyNode(methodDefinitionNode, propertyKeyNode)) {
            methodDefinitionNode.key = this.manglePropertiesObfuscatingReplacer.replace(propertyKeyNode);
        }

        return methodDefinitionNode;
    }
}
