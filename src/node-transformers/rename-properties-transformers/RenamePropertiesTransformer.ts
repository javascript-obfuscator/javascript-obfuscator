import { inject, injectable} from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IRenamePropertiesReplacer } from '../../interfaces/node-transformers/rename-properties-transformers/replacer/IRenamePropertiesReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { RenamePropertiesMode } from '../../enums/node-transformers/rename-properties-transformers/RenamePropertiesMode';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeLiteralUtils } from '../../node/NodeLiteralUtils';
import { NodeMetadata } from '../../node/NodeMetadata';

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
        TNode extends ESTree.Property
            | ESTree.PropertyDefinition
            | ESTree.MemberExpression
            | ESTree.MethodDefinition
        > (
        propertyNode: TNode,
        propertyKeyNode: ESTree.Expression | ESTree.PrivateIdentifier
    ): propertyKeyNode is ESTree.Identifier | ESTree.Literal {
        if (NodeGuards.isIdentifierNode(propertyKeyNode) && propertyNode.computed) {
            return false;
        }

        return true;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Preparing:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): void => {
                        if (parentNode) {
                            this.prepareNode(node, parentNode);
                        }
                    }
                };

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
     * @param {Node} parentNode
     */
    public prepareNode (
        node: ESTree.Node,
        parentNode: ESTree.Node
    ): void {
        if ((NodeGuards.isPropertyNode(parentNode) && parentNode.key === node)
            || NodeGuards.isMemberExpressionNode(parentNode) && parentNode.property === node
            || NodeGuards.isMethodDefinitionNode(parentNode) && parentNode.key === node
            || NodeGuards.isPropertyDefinitionNode(parentNode) && parentNode.key === node) {
            NodeMetadata.set(node, {propertyKeyToRenameNode: true});

            return;
        }

        if (this.options.renamePropertiesMode === RenamePropertiesMode.Safe) {
            this.analyzeAutoExcludedPropertyNames(node, parentNode);
        }
    }

    /**
     * @param {Node} node
     * @param {NodeGuards} parentNode
     * @returns {Node}
     */
    public transformNode (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node {
        if (!NodeGuards.isIdentifierNode(node) && !NodeGuards.isLiteralNode(node)) {
            return node;
        }

        if (!NodeMetadata.isPropertyKeyToRenameNode(node)) {
            return node;
        }

        const isPropertyNode = NodeGuards.isPropertyNode(parentNode);
        const isPropertyLikeNode = isPropertyNode
            || NodeGuards.isPropertyDefinitionNode(parentNode)
            || NodeGuards.isMemberExpressionNode(parentNode)
            || NodeGuards.isMethodDefinitionNode(parentNode);

        if (isPropertyLikeNode && !RenamePropertiesTransformer.isValidPropertyNode(parentNode, node)) {
            return node;
        }

        if (isPropertyNode) {
            parentNode.shorthand = false;
        }

        return this.renamePropertiesReplacer.replace(node);
    }

    /**
     * @param {Node} node
     * @param {Node} parentNode
     */
    private analyzeAutoExcludedPropertyNames (
        node: ESTree.Node,
        parentNode: ESTree.Node
    ): void {
        if (!NodeGuards.isLiteralNode(node) || !NodeLiteralUtils.isStringLiteralNode(node)) {
            return;
        }

        this.renamePropertiesReplacer.excludePropertyName(node.value);
    }
}
