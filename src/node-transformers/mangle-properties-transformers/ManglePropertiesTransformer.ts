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

        if (NodeGuards.isIdentifierNode(propertyKeyNode) && propertyNode.computed) {
            return propertyNode;
        }

        if (NodeGuards.isIdentifierNode(propertyKeyNode) || NodeGuards.isLiteralNode(propertyKeyNode)) {
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

        if (NodeGuards.isIdentifierNode(propertyKeyNode) && memberExpressionNode.computed) {
            return memberExpressionNode;
        }

        if (NodeGuards.isIdentifierNode(propertyKeyNode) || NodeGuards.isLiteralNode(propertyKeyNode)) {
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

        if (NodeGuards.isIdentifierNode(propertyKeyNode) && methodDefinitionNode.computed) {
            return methodDefinitionNode;
        }

        if (NodeGuards.isIdentifierNode(propertyKeyNode) || NodeGuards.isLiteralNode(propertyKeyNode)) {
            methodDefinitionNode.key = this.manglePropertiesObfuscatingReplacer.replace(propertyKeyNode);
        }

        return methodDefinitionNode;
    }
}
