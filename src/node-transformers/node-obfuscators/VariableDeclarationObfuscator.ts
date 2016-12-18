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
import { RandomGeneratorUtils } from '../../utils/RandomGeneratorUtils';

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
export class VariableDeclarationObfuscator extends AbstractNodeTransformer {
    /**
     * @type {IObfuscatorReplacerWithStorage}
     */
    private readonly identifierReplacer: IObfuscatorReplacerWithStorage;

    /**
     * @param replacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers['Factory<IObfuscatorReplacer>']) replacersFactory: (replacer: NodeObfuscatorsReplacers) => IObfuscatorReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.identifierReplacer = <IObfuscatorReplacerWithStorage>replacersFactory(NodeObfuscatorsReplacers.IdentifierReplacer);
    }

    /**
     * @param variableDeclarationNode
     * @param parentNode
     */
    public transformNode (variableDeclarationNode: ESTree.VariableDeclaration, parentNode: ESTree.Node): void {
        const blockScopeOfVariableDeclarationNode: TNodeWithBlockStatement = NodeUtils
            .getBlockScopesOfNode(variableDeclarationNode)[0];

        if (blockScopeOfVariableDeclarationNode.type === NodeType.Program) {
            return;
        }

        const nodeIdentifier: string = RandomGeneratorUtils.getRandomString(7);
        const scopeNode: ESTree.Node = variableDeclarationNode.kind === 'var'
            ? blockScopeOfVariableDeclarationNode
            : parentNode;

        this.storeVariableNames(variableDeclarationNode, nodeIdentifier);
        this.replaceVariableNames(scopeNode, nodeIdentifier);
    }

    /**
     * @param variableDeclarationNode
     * @param nodeIdentifier
     */
    private storeVariableNames (variableDeclarationNode: ESTree.VariableDeclaration, nodeIdentifier: string): void {
        variableDeclarationNode.declarations
            .forEach((declarationNode: ESTree.VariableDeclarator) => {
                NodeUtils.typedTraverse(declarationNode.id, NodeType.Identifier, {
                    enter: (node: ESTree.Identifier) => this.identifierReplacer.storeNames(node.name, nodeIdentifier)
                });
            });
    }

    /**
     * @param scopeNode
     * @param nodeIdentifier
     */
    private replaceVariableNames (scopeNode: ESTree.Node, nodeIdentifier: string): void {
        estraverse.replace(scopeNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (!node.obfuscated && Node.isReplaceableIdentifierNode(node, parentNode)) {
                    node.name = this.identifierReplacer.replace(node.name, nodeIdentifier);
                }
            }
        });
    }
}
