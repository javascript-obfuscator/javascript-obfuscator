import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IObfuscationReplacer } from '../../interfaces/node-transformers/IObfuscationReplacer';
import { IObfuscationReplacerWithStorage } from '../../interfaces/node-transformers/IObfuscationReplacerWithStorage';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscationReplacers';
import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { NodeUtils } from '../../node/NodeUtils';

/**
 * replaces:
 *     var variable = 1;
 *     variable++;
 *
 * on:
 *     var _0x12d45f = 1;
 *     _0x12d45f++;
 *
 */
@injectable()
export class VariableDeclarationTransformer extends AbstractNodeTransformer {
    /**
     * @type {IObfuscationReplacerWithStorage}
     */
    private readonly identifierReplacer: IObfuscationReplacerWithStorage;

    /**
     * @type {Map<ESTree.Node, ESTree.Identifier[]>}
     */
    private readonly replaceableIdentifiers: Map <ESTree.Node, ESTree.Identifier[]> = new Map();

    /**
     * @param replacersFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IObfuscatorReplacer) replacersFactory: (replacer: NodeObfuscatorsReplacers) => IObfuscationReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.identifierReplacer = <IObfuscationReplacerWithStorage>replacersFactory(NodeObfuscatorsReplacers.IdentifierReplacer);
    }

    /**
     * @return {estraverse.Visitor}
     */
    public getVisitor (): estraverse.Visitor {
        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (Node.isVariableDeclarationNode(node)) {
                    this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param variableDeclarationNode
     * @param parentNode
     * @returns {ESTree.Node}
     */
    private transformNode (variableDeclarationNode: ESTree.VariableDeclaration, parentNode: ESTree.Node): ESTree.Node {
        const blockScopeOfVariableDeclarationNode: TNodeWithBlockStatement = NodeUtils
            .getBlockScopesOfNode(variableDeclarationNode)[0];

        if (blockScopeOfVariableDeclarationNode.type === NodeType.Program) {
            return variableDeclarationNode;
        }

        const nodeIdentifier: number = this.nodeIdentifier++;
        const scopeNode: ESTree.Node = variableDeclarationNode.kind === 'var'
            ? blockScopeOfVariableDeclarationNode
            : parentNode;

        this.storeVariableNames(variableDeclarationNode, nodeIdentifier);
        this.replaceVariableNames(scopeNode, nodeIdentifier);

        return variableDeclarationNode;
    }

    /**
     * @param variableDeclarationNode
     * @param nodeIdentifier
     */
    private storeVariableNames (variableDeclarationNode: ESTree.VariableDeclaration, nodeIdentifier: number): void {
        variableDeclarationNode.declarations
            .forEach((declarationNode: ESTree.VariableDeclarator) => {
                if (Node.isObjectPatternNode(declarationNode.id)) {
                    return estraverse.VisitorOption.Skip;
                }

                NodeUtils.typedTraverse(declarationNode.id, NodeType.Identifier, {
                    enter: (node: ESTree.Identifier) => this.identifierReplacer.storeNames(node.name, nodeIdentifier)
                });
            });
    }

    /**
     * @param scopeNode
     * @param nodeIdentifier
     */
    private replaceVariableNames (scopeNode: ESTree.Node, nodeIdentifier: number): void {
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
                if (!node.obfuscatedNode && Node.isReplaceableIdentifierNode(node, parentNode)) {
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
