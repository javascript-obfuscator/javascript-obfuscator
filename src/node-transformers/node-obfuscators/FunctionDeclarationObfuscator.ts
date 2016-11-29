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
     * @type {IdentifierReplacer}
     */
    private readonly identifierReplacer: IdentifierReplacer;

    /**
     * @param customNodesStorage
     * @param nodeObfuscatorsReplacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers['IStorage<ICustomNode>']) customNodesStorage: IStorage<ICustomNode>,
        @inject(ServiceIdentifiers['Factory<IReplacer>']) nodeObfuscatorsReplacersFactory: (replacer: NodeObfuscatorsReplacers) => IReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodesStorage, options);

        this.identifierReplacer = <IdentifierReplacer>nodeObfuscatorsReplacersFactory(NodeObfuscatorsReplacers.IdentifierReplacer);
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
