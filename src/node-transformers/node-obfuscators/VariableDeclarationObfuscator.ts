import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/IOptions';
import { IReplacer } from '../../interfaces/IReplacer';
import { IStorage } from '../../interfaces/IStorage';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscatorsReplacers';
import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { IdentifierReplacer } from './replacers/IdentifierReplacer';
import { Node } from '../../node/Node';
import { NodeUtils } from '../../node/NodeUtils';
import { Utils } from '../../Utils';

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
     * @type {IdentifierReplacer}
     */
    private readonly identifierReplacer: IReplacer & IdentifierReplacer;

    /**
     * @param customNodesStorage
     * @param replacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers['IStorage<ICustomNode>']) customNodesStorage: IStorage<ICustomNode>,
        @inject(ServiceIdentifiers['Factory<IReplacer>']) replacersFactory: (replacer: NodeObfuscatorsReplacers) => IReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodesStorage, options);

        this.identifierReplacer = <IdentifierReplacer>replacersFactory(NodeObfuscatorsReplacers.IdentifierReplacer);
    }

    /**
     * @param variableDeclarationNode
     * @param parentNode
     */
    public transformNode (variableDeclarationNode: ESTree.VariableDeclaration, parentNode: ESTree.Node): void {
        this.identifierReplacer.setPrefix(Utils.getRandomGenerator().string({
            length: 5,
            pool: Utils.randomGeneratorPool
        }));

        const blockScopeOfVariableDeclarationNode: TNodeWithBlockStatement = NodeUtils
            .getBlockScopeOfNode(variableDeclarationNode);

        if (blockScopeOfVariableDeclarationNode.type === NodeType.Program) {
            return;
        }

        const scopeNode: ESTree.Node = variableDeclarationNode.kind === 'var'
            ? blockScopeOfVariableDeclarationNode
            : parentNode;

        this.storeVariableNames(variableDeclarationNode);
        this.replaceVariableNames(scopeNode);
    }

    /**
     * @param variableDeclarationNode
     */
    private storeVariableNames (variableDeclarationNode: ESTree.VariableDeclaration): void {
        variableDeclarationNode.declarations
            .forEach((declarationNode: ESTree.VariableDeclarator) => {
                NodeUtils.typedTraverse(declarationNode.id, NodeType.Identifier, {
                    enter: (node: ESTree.Identifier) => this.identifierReplacer.storeNames(node.name)
                });
            });
    }

    /**
     * @param scopeNode
     */
    private replaceVariableNames (scopeNode: ESTree.Node): void {
        estraverse.replace(scopeNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (!node.obfuscated && Node.isReplaceableIdentifierNode(node, parentNode)) {
                    node.name = this.identifierReplacer.replace(node.name);
                }
            }
        });
    }
}
