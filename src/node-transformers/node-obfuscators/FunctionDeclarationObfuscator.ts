import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IObfuscatorReplacer } from '../../interfaces/node-transformers/IObfuscatorReplacer';
import { IObfuscatorReplacerWithStorage } from '../../interfaces/node-transformers/IObfuscatorReplacerWithStorage';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscatorsReplacers';
import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { NodeUtils } from '../../node/NodeUtils';

/**
 * replaces:
 *     function foo () { //... };
 *     foo();
 *
 * on:
 *     function _0x12d45f () { //... };
 *     _0x12d45f();
 */
@injectable()
export class FunctionDeclarationObfuscator extends AbstractNodeTransformer {
    /**
     * @type {IObfuscatorReplacerWithStorage}
     */
    private readonly identifierReplacer: IObfuscatorReplacerWithStorage;

    /**
     * @type {Map<ESTree.Node, ESTree.Identifier[]>}
     */
    private readonly replaceableIdentifiers: Map <ESTree.Node, ESTree.Identifier[]> = new Map();

    /**
     * @param nodeObfuscatorsReplacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers.Factory__IObfuscatorReplacer) nodeObfuscatorsReplacersFactory: (replacer: NodeObfuscatorsReplacers) => IObfuscatorReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.identifierReplacer = <IObfuscatorReplacerWithStorage>nodeObfuscatorsReplacersFactory(NodeObfuscatorsReplacers.IdentifierReplacer);
    }

    /**
     * @param functionDeclarationNode
     * @param parentNode
     * @returns {ESTree.Node}
     */
    public transformNode (functionDeclarationNode: ESTree.FunctionDeclaration, parentNode: ESTree.Node): ESTree.Node {
        const nodeIdentifier: number = this.nodeIdentifier++;
        const blockScopeOfFunctionDeclarationNode: TNodeWithBlockStatement = NodeUtils
            .getBlockScopesOfNode(functionDeclarationNode)[0];

        if (blockScopeOfFunctionDeclarationNode.type === NodeType.Program) {
            return functionDeclarationNode;
        }

        this.storeFunctionName(functionDeclarationNode, nodeIdentifier);
        this.replaceFunctionName(blockScopeOfFunctionDeclarationNode, nodeIdentifier);

        return functionDeclarationNode;
    }

    /**
     * @param functionDeclarationNode
     * @param nodeIdentifier
     */
    private storeFunctionName (functionDeclarationNode: ESTree.FunctionDeclaration, nodeIdentifier: number): void {
        NodeUtils.typedTraverse(functionDeclarationNode.id, NodeType.Identifier, {
            enter: (node: ESTree.Identifier) => this.identifierReplacer.storeNames(node.name, nodeIdentifier)
        });
    }

    /**
     * @param scopeNode
     * @param nodeIdentifier
     */
    private replaceFunctionName (scopeNode: ESTree.Node, nodeIdentifier: number): void {
        let replaceableIdentifiersForCurrentScope: ESTree.Identifier[];

        // check for cached identifiers for current scope node. If exist - loop through them.
        if (this.replaceableIdentifiers.has(scopeNode)) {
            replaceableIdentifiersForCurrentScope = <ESTree.Identifier[]>this.replaceableIdentifiers.get(scopeNode);

            for (const replaceableIdentifier of replaceableIdentifiersForCurrentScope) {
                replaceableIdentifier.name = this.identifierReplacer.replace(replaceableIdentifier.name, nodeIdentifier);
            }

            return;
        }

        replaceableIdentifiersForCurrentScope = [];

        estraverse.replace(scopeNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Node.isReplaceableIdentifierNode(node, parentNode)) {
                    const newNodeName: string = this.identifierReplacer.replace(node.name, nodeIdentifier);

                    if (node.name !== newNodeName) {
                        node.name = newNodeName;
                    } else {
                        replaceableIdentifiersForCurrentScope.push(node);
                    }
                }
            }
        });

        this.replaceableIdentifiers.set(scopeNode, replaceableIdentifiersForCurrentScope);
    }
}
