import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';

import { ICalleeData } from '../../interfaces/stack-trace-analyzer/ICalleeData';
import { ICalleeDataExtractor } from '../../interfaces/stack-trace-analyzer/ICalleeDataExtractor';

import { Nodes } from '../../Nodes';
import { NodeUtils } from '../../NodeUtils';

export class ObjectExpressionCalleeDataExtractor implements ICalleeDataExtractor {
    /**
     * @type {ESTree.Node[]}
     */
    private blockScopeBody: ESTree.Node[];

    /**
     * @type {ESTree.MemberExpression}
     */
    private callee: ESTree.MemberExpression;

    /**
     * @type {Array}
     */
    private objectMembersCallsChain: string[] = [];

    /**
     * @param blockScopeBody
     * @param callee
     */
    constructor (blockScopeBody: ESTree.Node[], callee: ESTree.MemberExpression) {
        this.blockScopeBody = blockScopeBody;
        this.callee = callee;
    }

    /**
     * @returns {ICalleeData|null}
     */
    public extract (): ICalleeData|null {
        let calleeBlockStatement: TNodeWithBlockStatement|null = null,
            functionExpressionName: string|null = null;

        if (Nodes.isMemberExpressionNode(this.callee)) {
            this.objectMembersCallsChain = this.createObjectMembersCallsChain(this.objectMembersCallsChain, this.callee);

            if (!this.objectMembersCallsChain.length) {
                return null;
            }

            functionExpressionName = this.objectMembersCallsChain[this.objectMembersCallsChain.length - 1];

            calleeBlockStatement = this.getCalleeBlockStatement(
                NodeUtils.getBlockScopeOfNode(this.blockScopeBody[0]),
                this.objectMembersCallsChain
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
     * @returns {string[]}
     */
    private createObjectMembersCallsChain (currentChain: string[], memberExpression: ESTree.MemberExpression): string[] {
        if (Nodes.isIdentifierNode(memberExpression.property)) {
            currentChain.unshift(memberExpression.property.name);
        } else if (Nodes.isLiteralNode(memberExpression.property) && typeof memberExpression.property.value === 'string') {
            currentChain.unshift(memberExpression.property.value);
        } else {
            return currentChain;
        }

        if (Nodes.isMemberExpressionNode(memberExpression.object)) {
            return this.createObjectMembersCallsChain(currentChain, memberExpression.object);
        }

        if (Nodes.isIdentifierNode(memberExpression.object)) {
            currentChain.unshift(memberExpression.object.name);
        }

        return currentChain;
    }

    /**
     * @param node
     * @param objectMembersCallsChain
     * @returns {TNodeWithBlockStatement|null}
     */
    private getCalleeBlockStatement (node: ESTree.Node, objectMembersCallsChain: string[]): TNodeWithBlockStatement|null {
        const objectName: string = <string>objectMembersCallsChain.shift();

        let calleeBlockStatement: TNodeWithBlockStatement|null = null;

        estraverse.traverse(node, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (
                    Nodes.isVariableDeclaratorNode(node) &&
                    Nodes.isIdentifierNode(node.id) &&
                    node.init &&
                    Nodes.isObjectExpressionNode(node.init) &&
                    node.id.name === objectName
                ) {
                    calleeBlockStatement = this.findCalleeBlockStatement(node.init.properties, objectMembersCallsChain);

                    return estraverse.VisitorOption.Break;
                }
            }
        });

        return calleeBlockStatement;
    }

    private findCalleeBlockStatement (
        objectExpressionProperties: ESTree.Property[],
        objectMembersCallsChain: string[]
    ): TNodeWithBlockStatement|null {
        const nextItemInCallsChain: string|undefined = objectMembersCallsChain.shift();

        if (!nextItemInCallsChain) {
            return null;
        }

        for (const propertyNode of objectExpressionProperties) {
            const isTargetPropertyNodeWithIdentifierKey: boolean =
                Nodes.isIdentifierNode(propertyNode.key) && propertyNode.key.name === nextItemInCallsChain;
            const isTargetPropertyNodeWithLiteralKey: boolean =
                Nodes.isLiteralNode(propertyNode.key) &&
                Boolean(propertyNode.key.value) &&
                propertyNode.key.value === nextItemInCallsChain;

            if (!isTargetPropertyNodeWithIdentifierKey && !isTargetPropertyNodeWithLiteralKey) {
                continue;
            }

            if (Nodes.isObjectExpressionNode(propertyNode.value)) {
                return this.findCalleeBlockStatement(propertyNode.value.properties, objectMembersCallsChain);
            }

            if (Nodes.isFunctionExpressionNode(propertyNode.value)) {
                return propertyNode.value.body;
            }
        }

        return null;
    }
}
