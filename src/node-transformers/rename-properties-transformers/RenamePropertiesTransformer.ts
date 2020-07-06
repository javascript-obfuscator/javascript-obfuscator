import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IRenamePropertiesReplacer } from '../../interfaces/node-transformers/rename-properties-transformers/replacer/IRenamePropertiesReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';

@injectable()
export class RenamePropertiesTransformer extends AbstractNodeTransformer {
    /**
     * @type {IRenamePropertiesReplacer}
     */
    private readonly renamePropertiesReplacer: IRenamePropertiesReplacer;

    /**
     * @param {IRenamePropertiesReplacer} renamePropertiesReplacer
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRenamePropertiesReplacer) renamePropertiesReplacer: IRenamePropertiesReplacer,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.renamePropertiesReplacer = renamePropertiesReplacer;
    }

    /**
     * @param {TNode} propertyNode
     * @param {ESTree.Expression} propertyKeyNode
     * @returns {boolean}
     */
    private static isValidPropertyNode<
        TNode extends ESTree.Property | ESTree.MemberExpression | ESTree.MethodDefinition
    > (
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
            case NodeTransformationStage.RenameProperties:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode) {
                            return this.transformNode(node, parentNode);
                        }
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

        if (RenamePropertiesTransformer.isValidPropertyNode(propertyNode, propertyKeyNode)) {
            propertyNode.key = this.renamePropertiesReplacer.replace(propertyKeyNode);
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

        if (RenamePropertiesTransformer.isValidPropertyNode(memberExpressionNode, propertyKeyNode)) {
            memberExpressionNode.property = this.renamePropertiesReplacer.replace(propertyKeyNode);
        }

        return memberExpressionNode;
    }

    /**
     * @param {MethodDefinition} methodDefinitionNode
     * @returns {MethodDefinition}
     */
    private transformMethodDefinitionNode (methodDefinitionNode: ESTree.MethodDefinition): ESTree.MethodDefinition {
        const propertyKeyNode: ESTree.Expression = methodDefinitionNode.key;

        if (RenamePropertiesTransformer.isValidPropertyNode(methodDefinitionNode, propertyKeyNode)) {
            methodDefinitionNode.key = this.renamePropertiesReplacer.replace(propertyKeyNode);
        }

        return methodDefinitionNode;
    }
}
