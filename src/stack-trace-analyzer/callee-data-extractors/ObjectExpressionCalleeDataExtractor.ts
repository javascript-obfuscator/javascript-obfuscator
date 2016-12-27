import { injectable } from 'inversify';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TObjectMembersCallsChain } from '../../types/stack-trace-analyzer/TObjectMembersCallsChain';

import { ICalleeData } from '../../interfaces/stack-trace-analyzer/ICalleeData';

import { Node } from '../../node/Node';
import { NodeUtils } from '../../node/NodeUtils';
import { AbstractCalleeDataExtractor } from './AbstractCalleeDataExtractor';

@injectable()
export class ObjectExpressionCalleeDataExtractor extends AbstractCalleeDataExtractor {
    /**
     * @param blockScopeBody
     * @param callee
     * @returns {ICalleeData|null}
     */
    public extract (blockScopeBody: ESTree.Node[], callee: ESTree.MemberExpression): ICalleeData|null {
        let calleeBlockStatement: ESTree.BlockStatement|null = null,
            functionExpressionName: string|number|null = null;

        if (Node.isMemberExpressionNode(callee)) {
            const objectMembersCallsChain: TObjectMembersCallsChain = this.createObjectMembersCallsChain([], callee);

            if (!objectMembersCallsChain.length) {
                return null;
            }

            functionExpressionName = objectMembersCallsChain[objectMembersCallsChain.length - 1];
            calleeBlockStatement = this.getCalleeBlockStatement(
                NodeUtils.getBlockScopesOfNode(blockScopeBody[0])[0],
                objectMembersCallsChain
            );
        }

        if (!calleeBlockStatement) {
            return null;
        }

        return {
            callee: calleeBlockStatement,
            name: functionExpressionName
        };
    }

    /**
     * Creates array with MemberExpression calls chain.
     *
     * Example: object.foo.bar(); // ['object', 'foo', 'bar']
     *
     * @param currentChain
     * @param memberExpression
     * @returns {TObjectMembersCallsChain}
     */
    private createObjectMembersCallsChain (
        currentChain: TObjectMembersCallsChain,
        memberExpression: ESTree.MemberExpression
    ): TObjectMembersCallsChain {
        // first step: processing memberExpression `property` property
        if (Node.isIdentifierNode(memberExpression.property) && memberExpression.computed === false) {
            currentChain.unshift(memberExpression.property.name);
        } else if (
            Node.isLiteralNode(memberExpression.property) &&
            (
                typeof memberExpression.property.value === 'string' ||
                typeof memberExpression.property.value === 'number'
            )
        ) {
            currentChain.unshift(memberExpression.property.value);
        } else {
            return currentChain;
        }

        // second step: processing memberExpression `object` property
        if (Node.isMemberExpressionNode(memberExpression.object)) {
            return this.createObjectMembersCallsChain(currentChain, memberExpression.object);
        } else if (Node.isIdentifierNode(memberExpression.object)) {
            currentChain.unshift(memberExpression.object.name);
        }

        return currentChain;
    }

    /**
     * @param node
     * @param objectMembersCallsChain
     * @returns {ESTree.BlockStatement|null}
     */
    private getCalleeBlockStatement (
        node: ESTree.Node,
        objectMembersCallsChain: TObjectMembersCallsChain
    ): ESTree.BlockStatement|null {
        const objectName: string|number|undefined = objectMembersCallsChain.shift();

        if (!objectName) {
            return null;
        }

        let calleeBlockStatement: ESTree.BlockStatement|null = null;

        estraverse.traverse(node, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (
                    Node.isVariableDeclaratorNode(node) &&
                    Node.isIdentifierNode(node.id) &&
                    node.init &&
                    Node.isObjectExpressionNode(node.init) &&
                    node.id.name === objectName
                ) {
                    calleeBlockStatement = this.findCalleeBlockStatement(node.init.properties, objectMembersCallsChain);

                    return estraverse.VisitorOption.Break;
                }
            }
        });

        return calleeBlockStatement;
    }

    /**
     * @param objectExpressionProperties
     * @param objectMembersCallsChain
     * @returns {ESTree.BlockStatement|null}
     */
    private findCalleeBlockStatement (
        objectExpressionProperties: ESTree.Property[],
        objectMembersCallsChain: TObjectMembersCallsChain
    ): ESTree.BlockStatement|null {
        const nextItemInCallsChain: string|number|undefined = objectMembersCallsChain.shift();

        if (!nextItemInCallsChain) {
            return null;
        }

        for (const propertyNode of objectExpressionProperties) {
            const isTargetPropertyNodeWithIdentifierKey: boolean =
                Node.isIdentifierNode(propertyNode.key) && propertyNode.key.name === nextItemInCallsChain;
            const isTargetPropertyNodeWithLiteralKey: boolean =
                Node.isLiteralNode(propertyNode.key) &&
                Boolean(propertyNode.key.value) &&
                propertyNode.key.value === nextItemInCallsChain;

            if (!isTargetPropertyNodeWithIdentifierKey && !isTargetPropertyNodeWithLiteralKey) {
                continue;
            }

            if (Node.isObjectExpressionNode(propertyNode.value)) {
                return this.findCalleeBlockStatement(propertyNode.value.properties, objectMembersCallsChain);
            }

            if (Node.isFunctionExpressionNode(propertyNode.value)) {
                return propertyNode.value.body;
            }
        }

        return null;
    }
}
