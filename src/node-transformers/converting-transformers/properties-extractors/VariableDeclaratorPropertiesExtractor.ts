import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { AbstractPropertiesExtractor } from './AbstractPropertiesExtractor';
import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class VariableDeclaratorPropertiesExtractor extends AbstractPropertiesExtractor {
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
     * @param {ObjectExpression} objectExpressionNode
     * @param {VariableDeclarator} hostNode
     * @returns {Node}
     */
    public extract (
        objectExpressionNode: ESTree.ObjectExpression,
        hostNode: ESTree.VariableDeclarator
    ): ESTree.Node {
        if (
            !NodeGuards.isIdentifierNode(hostNode.id)
            || this.isProhibitedObjectExpressionNode(objectExpressionNode, hostNode.id)
        ) {
            return objectExpressionNode;
        }

        return this.transformObjectExpressionNode(objectExpressionNode, hostNode.id);
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @returns {VariableDeclarator}
     */
    private getHostVariableDeclaratorNode (objectExpressionNode: ESTree.ObjectExpression): ESTree.VariableDeclarator | never {
        const { parentNode } = objectExpressionNode;

        if (!parentNode || !NodeGuards.isVariableDeclaratorNode(parentNode)) {
            throw new Error('Cannot get `VariableDeclarator` node for `ObjectExpression` node');
        }

        return parentNode;
    }

    /**
     * @param {VariableDeclarator} variableDeclaratorNode
     * @returns {VariableDeclaration}
     */
    private getHostVariableDeclarationNode (variableDeclaratorNode: ESTree.VariableDeclarator): ESTree.VariableDeclaration | never {
        const { parentNode } = variableDeclaratorNode;

        if (!parentNode || !NodeGuards.isVariableDeclarationNode(parentNode)) {
            throw new Error('Cannot get `VariableDeclaration` node for `VariableDeclarator` node');
        }

        return parentNode;
    }

    /**
     * @param {ObjectExpression} objectExpressionNode
     * @param {Identifier} memberExpressionHostNode
     * @returns {boolean}
     */
    private isProhibitedObjectExpressionNode (
        objectExpressionNode: ESTree.ObjectExpression,
        memberExpressionHostNode: ESTree.Identifier
    ): boolean {
        const hostVariableDeclarator: ESTree.VariableDeclarator = this.getHostVariableDeclaratorNode(objectExpressionNode);
        const hostVariableDeclaration: ESTree.VariableDeclaration = this.getHostVariableDeclarationNode(hostVariableDeclarator);
        const { declarations } = hostVariableDeclaration;
        const indexOfDeclarator: number = declarations.indexOf(hostVariableDeclarator);
        const isLastDeclarator: boolean = indexOfDeclarator === (declarations.length - 1);

        // avoid unnecessary checks
        if (isLastDeclarator) {
            return false;
        }

        const declaratorsAfterCurrentDeclarator: ESTree.VariableDeclarator[] = declarations.slice(indexOfDeclarator);

        let isProhibitedObjectExpressionNode: boolean = false;

        // should mark node as prohibited if that node using inside other variable declarators
        declaratorsAfterCurrentDeclarator.forEach((variableDeclarator: ESTree.VariableDeclarator) => {
            estraverse.traverse(variableDeclarator, {
                enter: (node: ESTree.Node): estraverse.VisitorOption | ESTree.Node => {
                    if (
                        NodeGuards.isMemberExpressionNode(node)
                        && NodeGuards.isIdentifierNode(node.object)
                        && node.object.name === memberExpressionHostNode.name
                    ) {
                        isProhibitedObjectExpressionNode = true;

                        return estraverse.VisitorOption.Break;
                    }

                    return node;
                }
            });
        });

        return isProhibitedObjectExpressionNode;
    }
}
