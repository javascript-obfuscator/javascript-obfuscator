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
     * @param nodeObfuscatorsReplacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers['Factory<IObfuscatorReplacer>']) nodeObfuscatorsReplacersFactory: (replacer: NodeObfuscatorsReplacers) => IObfuscatorReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.identifierReplacer = <IObfuscatorReplacerWithStorage>nodeObfuscatorsReplacersFactory(NodeObfuscatorsReplacers.IdentifierReplacer);
    }

    /**
     * @param functionDeclarationNode
     * @param parentNode
     */
    public transformNode (functionDeclarationNode: ESTree.FunctionDeclaration, parentNode: ESTree.Node): void {
        const nodeIdentifier: string = RandomGeneratorUtils.getRandomString(7);
        const blockScopeOfFunctionDeclarationNode: TNodeWithBlockStatement = NodeUtils
            .getBlockScopeOfNode(functionDeclarationNode);

        if (blockScopeOfFunctionDeclarationNode.type === NodeType.Program) {
            return;
        }

        this.storeFunctionName(functionDeclarationNode, nodeIdentifier);
        this.replaceFunctionName(blockScopeOfFunctionDeclarationNode, nodeIdentifier);
    }

    /**
     * @param functionDeclarationNode
     * @param nodeIdentifier
     */
    private storeFunctionName (functionDeclarationNode: ESTree.FunctionDeclaration, nodeIdentifier: string): void {
        NodeUtils.typedTraverse(functionDeclarationNode.id, NodeType.Identifier, {
            enter: (node: ESTree.Identifier) => this.identifierReplacer.storeNames(node.name, nodeIdentifier)
        });
    }

    /**
     * @param scopeNode
     * @param nodeIdentifier
     */
    private replaceFunctionName (scopeNode: ESTree.Node, nodeIdentifier: string): void {
        estraverse.replace(scopeNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Node.isReplaceableIdentifierNode(node, parentNode)) {
                    node.name = this.identifierReplacer.replace(node.name, nodeIdentifier);
                }
            }
        });
    }
}
