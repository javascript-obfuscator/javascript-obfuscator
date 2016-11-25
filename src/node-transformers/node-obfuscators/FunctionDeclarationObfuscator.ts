import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/IOptions';
import { IStorage } from '../../interfaces/IStorage';

import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { IdentifierReplacer } from './replacers/IdentifierReplacer';
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
export class FunctionDeclarationObfuscator extends AbstractNodeTransformer {
    /**
     * @type {IdentifierReplacer}
     */
    private readonly identifierReplacer: IdentifierReplacer;

    /**
     * @param customNodesStorage
     * @param options
     */
    constructor(customNodesStorage: IStorage<ICustomNode>, options: IOptions) {
        super(customNodesStorage, options);

        this.identifierReplacer = new IdentifierReplacer(this.customNodesStorage, this.options);
    }

    /**
     * @param functionDeclarationNode
     * @param parentNode
     */
    public transformNode (functionDeclarationNode: ESTree.FunctionDeclaration, parentNode: ESTree.Node): void {
        const blockScopeOfFunctionDeclarationNode: TNodeWithBlockStatement = NodeUtils
            .getBlockScopeOfNode(functionDeclarationNode);

        if (blockScopeOfFunctionDeclarationNode.type === NodeType.Program) {
            return;
        }

        this.storeFunctionName(functionDeclarationNode);
        this.replaceFunctionName(blockScopeOfFunctionDeclarationNode);
    }

    /**
     * @param functionDeclarationNode
     */
    private storeFunctionName (functionDeclarationNode: ESTree.FunctionDeclaration): void {
        NodeUtils.typedTraverse(functionDeclarationNode.id, NodeType.Identifier, {
            enter: (node: ESTree.Identifier) => this.identifierReplacer.storeNames(node.name)
        });
    }

    /**
     * @param scopeNode
     */
    private replaceFunctionName (scopeNode: ESTree.Node): void {
        estraverse.replace(scopeNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Node.isReplaceableIdentifierNode(node, parentNode)) {
                    node.name = this.identifierReplacer.replace(node.name);
                }
            }
        });
    }
}
