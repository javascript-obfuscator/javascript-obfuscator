import { injectable } from 'inversify';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TObjectMembersCallsChain } from '../../../types/analyzers/stack-trace-analyzer/TObjectMembersCallsChain';

import { ICalleeData } from '../../../interfaces/analyzers/stack-trace-analyzer/ICalleeData';

import { AbstractCalleeDataExtractor } from './AbstractCalleeDataExtractor';
import { NodeGuards } from '../../../node/NodeGuards';
import { NodeStatementUtils } from '../../../node/NodeStatementUtils';

@injectable()
export class ObjectExpressionCalleeDataExtractor extends AbstractCalleeDataExtractor {
    /**
     * @param {Property} propertyNode
     * @param {string | number} nextItemInCallsChain
     * @returns {boolean}
     */
    private static isValidTargetPropertyNode (propertyNode: ESTree.Property, nextItemInCallsChain: string | number): boolean {
        if (!propertyNode.key) {
            return false;
        }

        const isTargetPropertyNodeWithIdentifierKey: boolean =
            NodeGuards.isIdentifierNode(propertyNode.key) && propertyNode.key.name === nextItemInCallsChain;
        const isTargetPropertyNodeWithLiteralKey: boolean =
            NodeGuards.isLiteralNode(propertyNode.key) &&
            Boolean(propertyNode.key.value) &&
            propertyNode.key.value === nextItemInCallsChain;

        return isTargetPropertyNodeWithIdentifierKey || isTargetPropertyNodeWithLiteralKey;
    }

    /**
     * @param {NodeGuards[]} blockScopeBody
     * @param {MemberExpression} callee
     * @returns {ICalleeData}
     */
    public extract (blockScopeBody: ESTree.Node[], callee: ESTree.MemberExpression): ICalleeData | null {
        if (!NodeGuards.isMemberExpressionNode(callee)) {
            return null;
        }

        const objectMembersCallsChain: TObjectMembersCallsChain = this.createObjectMembersCallsChain([], callee);

        if (!objectMembersCallsChain.length) {
            return null;
        }

        const functionExpressionName: string | number | null = objectMembersCallsChain[objectMembersCallsChain.length - 1];
        const calleeBlockStatement: ESTree.BlockStatement | null = this.getCalleeBlockStatement(
            NodeStatementUtils.getParentNodeWithStatements(blockScopeBody[0]),
            objectMembersCallsChain
        );

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
     * @param {TObjectMembersCallsChain} currentChain
     * @param {MemberExpression} memberExpression
     * @returns {TObjectMembersCallsChain}
     */
    private createObjectMembersCallsChain (
        currentChain: TObjectMembersCallsChain,
        memberExpression: ESTree.MemberExpression
    ): TObjectMembersCallsChain {
        // first step: processing memberExpression `property` property
        if (NodeGuards.isIdentifierNode(memberExpression.property) && memberExpression.computed === false) {
            currentChain.unshift(memberExpression.property.name);
        } else if (
            NodeGuards.isLiteralNode(memberExpression.property) &&
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
        if (NodeGuards.isMemberExpressionNode(memberExpression.object)) {
            return this.createObjectMembersCallsChain(currentChain, memberExpression.object);
        } else if (NodeGuards.isIdentifierNode(memberExpression.object)) {
            currentChain.unshift(memberExpression.object.name);
        }

        return currentChain;
    }

    /**
     * @param {NodeGuards} targetNode
     * @param {TObjectMembersCallsChain} objectMembersCallsChain
     * @returns {BlockStatement}
     */
    private getCalleeBlockStatement (
        targetNode: ESTree.Node,
        objectMembersCallsChain: TObjectMembersCallsChain
    ): ESTree.BlockStatement | null {
        const objectName: string | number | undefined = objectMembersCallsChain.shift();

        if (!objectName) {
            return null;
        }

        let calleeBlockStatement: ESTree.BlockStatement | null = null;

        estraverse.traverse(targetNode, {
            enter: (node: ESTree.Node): estraverse.VisitorOption | void => {
                if (
                    NodeGuards.isVariableDeclaratorNode(node) &&
                    NodeGuards.isIdentifierNode(node.id) &&
                    node.init &&
                    NodeGuards.isObjectExpressionNode(node.init) &&
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
     * @param {Property[]} objectExpressionProperties
     * @param {TObjectMembersCallsChain} objectMembersCallsChain
     * @returns {BlockStatement}
     */
    private findCalleeBlockStatement (
        objectExpressionProperties: ESTree.Property[],
        objectMembersCallsChain: TObjectMembersCallsChain
    ): ESTree.BlockStatement | null {
        const nextItemInCallsChain: string | number | undefined = objectMembersCallsChain.shift();

        if (!nextItemInCallsChain) {
            return null;
        }

        for (const propertyNode of objectExpressionProperties) {
            if (!ObjectExpressionCalleeDataExtractor.isValidTargetPropertyNode(propertyNode, nextItemInCallsChain)) {
                continue;
            }

            if (NodeGuards.isObjectExpressionNode(propertyNode.value)) {
                return this.findCalleeBlockStatement(propertyNode.value.properties, objectMembersCallsChain);
            }

            if (NodeGuards.isFunctionExpressionNode(propertyNode.value)) {
                return propertyNode.value.body;
            }
        }

        return null;
    }
}
