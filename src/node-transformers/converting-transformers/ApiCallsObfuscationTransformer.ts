import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { ObfuscateApiCallsMode } from '../../enums/node-transformers/converting-transformers/ObfuscateApiCallsMode';
import { ObfuscationTarget } from '../../enums/ObfuscationTarget';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeMetadata } from '../../node/NodeMetadata';

import { BROWSER_API_OBJECTS, NODE_API_OBJECTS } from '../../constants/BuiltinIdentifierNames';

@injectable()
export class ApiCallsObfuscationTransformer extends AbstractNodeTransformer {
    /**
     * @type {Set<string>}
     */
    private apiObjectNames!: Set<string>;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor(
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        if (!this.options.obfuscateApiCalls) {
            return null;
        }

        switch (nodeTransformationStage) {
            case NodeTransformationStage.Converting:
                this.apiObjectNames = this.buildApiObjectNamesSet();

                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (!parentNode) {
                            return;
                        }

                        if (NodeGuards.isCallExpressionNode(node)) {
                            return this.transformCallExpressionNode(node, parentNode);
                        }

                        if (
                            this.options.obfuscateApiCallsMode === ObfuscateApiCallsMode.AllAccess
                            && NodeGuards.isMemberExpressionNode(node)
                        ) {
                            return this.transformMemberExpressionNode(node, parentNode);
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
     * @returns {Node}
     */
    public transformNode(node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node {
        if (NodeGuards.isCallExpressionNode(node)) {
            return this.transformCallExpressionNode(node, parentNode);
        }

        if (NodeGuards.isMemberExpressionNode(node)) {
            return this.transformMemberExpressionNode(node, parentNode);
        }

        return node;
    }

    /**
     * Transforms API call expressions by converting the object reference
     * in member expression calls to a computed globalThis access.
     *
     * replaces:
     *     document.getElementById('test')
     *
     * on:
     *     globalThis['document']['getElementById']('test')
     *
     * @param {CallExpression} callExpressionNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    private transformCallExpressionNode(
        callExpressionNode: ESTree.CallExpression,
        parentNode: ESTree.Node
    ): ESTree.Node {
        if (NodeMetadata.isIgnoredNode(callExpressionNode)) {
            return callExpressionNode;
        }

        const callee: ESTree.Expression | ESTree.Super = callExpressionNode.callee;

        // Handle standalone API function calls like fetch(), setTimeout()
        if (!NodeGuards.isMemberExpressionNode(callee)) {
            if (NodeGuards.isIdentifierNode(callee) && this.apiObjectNames.has(callee.name)) {
                if (!this.isReservedName(callee.name)) {
                    callExpressionNode.callee = NodeFactory.memberExpressionNode(
                        NodeFactory.identifierNode('globalThis'),
                        NodeFactory.literalNode(callee.name),
                        true
                    );
                }
            }

            return callExpressionNode;
        }

        // For member expressions: document.getElementById()
        const objectNode: ESTree.Expression | ESTree.Super = callee.object;

        if (!NodeGuards.isIdentifierNode(objectNode)) {
            return callExpressionNode;
        }

        if (!this.apiObjectNames.has(objectNode.name)) {
            return callExpressionNode;
        }

        if (this.isReservedName(objectNode.name)) {
            return callExpressionNode;
        }

        if (NodeMetadata.isIgnoredNode(objectNode)) {
            return callExpressionNode;
        }

        // Replace object reference: document -> globalThis['document']
        callee.object = NodeFactory.memberExpressionNode(
            NodeFactory.identifierNode('globalThis'),
            NodeFactory.literalNode(objectNode.name),
            true
        );

        return callExpressionNode;
    }

    /**
     * Transforms non-call MemberExpression nodes where the object is an API identifier.
     * Only active when obfuscateApiCallsMode is 'all-access'.
     *
     * replaces:
     *     document.body
     *     document['body']
     *     navigator.userAgent
     *
     * on:
     *     globalThis['document'].body
     *     globalThis['document']['body']
     *     globalThis['navigator'].userAgent
     *
     * @param {MemberExpression} memberExpressionNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    private transformMemberExpressionNode(
        memberExpressionNode: ESTree.MemberExpression,
        parentNode: ESTree.Node
    ): ESTree.Node {
        if (NodeMetadata.isIgnoredNode(memberExpressionNode)) {
            return memberExpressionNode;
        }

        const objectNode: ESTree.Expression | ESTree.Super = memberExpressionNode.object;

        if (!NodeGuards.isIdentifierNode(objectNode)) {
            return memberExpressionNode;
        }

        if (!this.apiObjectNames.has(objectNode.name)) {
            return memberExpressionNode;
        }

        if (this.isReservedName(objectNode.name)) {
            return memberExpressionNode;
        }

        if (NodeMetadata.isIgnoredNode(objectNode)) {
            return memberExpressionNode;
        }

        // Skip if this MemberExpression is the callee of a CallExpression
        // (already handled by transformCallExpressionNode)
        if (NodeGuards.isCallExpressionNode(parentNode) && parentNode.callee === memberExpressionNode) {
            return memberExpressionNode;
        }

        // Replace object reference: document -> globalThis['document']
        memberExpressionNode.object = NodeFactory.memberExpressionNode(
            NodeFactory.identifierNode('globalThis'),
            NodeFactory.literalNode(objectNode.name),
            true
        );

        return memberExpressionNode;
    }

    /**
     * @returns {Set<string>}
     */
    private buildApiObjectNamesSet(): Set<string> {
        const apiObjects: Set<string> = new Set<string>();

        const target: string = this.options.target;

        if (target === ObfuscationTarget.Browser
            || target === ObfuscationTarget.BrowserNoEval
            || target === ObfuscationTarget.ServiceWorker
        ) {
            for (const name of BROWSER_API_OBJECTS) {
                apiObjects.add(name);
            }
        }

        if (target === ObfuscationTarget.Node) {
            for (const name of NODE_API_OBJECTS) {
                apiObjects.add(name);
            }
        }

        return apiObjects;
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    private isReservedName(name: string): boolean {
        return this.options.reservedNames.some(
            (reservedName: string) => new RegExp(reservedName).test(name)
        );
    }
}
