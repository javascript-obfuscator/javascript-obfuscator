import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/IOptions';

import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { IdentifierReplacer } from './replacers/IdentifierReplacer';
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
export class VariableDeclarationObfuscator extends AbstractNodeTransformer {
    /**
     * @type {IdentifierReplacer}
     */
    private identifierReplacer: IdentifierReplacer;

    /**
     * @param nodes
     * @param options
     */
    constructor(nodes: Map <string, ICustomNode>, options: IOptions) {
        super(nodes, options);

        this.identifierReplacer = new IdentifierReplacer(this.nodes, this.options);
    }

    /**
     * @param variableDeclarationNode
     * @param parentNode
     */
    public transformNode (variableDeclarationNode: ESTree.VariableDeclaration, parentNode: ESTree.Node): void {
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
                NodeUtils.typedReplace(declarationNode.id, NodeType.Identifier, {
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
