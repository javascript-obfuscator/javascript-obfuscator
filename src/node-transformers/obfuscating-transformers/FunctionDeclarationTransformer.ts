import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';
import { TObfuscationReplacerFactory } from '../../types/container/TObfuscationReplacerFactory';

import { IOptions } from '../../interfaces/options/IOptions';
import { IObfuscationReplacerWithStorage } from '../../interfaces/node-transformers/IObfuscationReplacerWithStorage';
import { IVisitor } from '../../interfaces/IVisitor';

import { ObfuscationReplacers } from '../../enums/container/ObfuscationReplacers';
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
export class FunctionDeclarationTransformer extends AbstractNodeTransformer {
    /**
     * @type {IObfuscationReplacerWithStorage}
     */
    private readonly identifierReplacer: IObfuscationReplacerWithStorage;

    /**
     * @type {Map<ESTree.Node, ESTree.Identifier[]>}
     */
    private readonly replaceableIdentifiers: Map <ESTree.Node, ESTree.Identifier[]> = new Map();

    /**
     * @param obfuscationReplacerFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IObfuscationReplacer) obfuscationReplacerFactory: TObfuscationReplacerFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.identifierReplacer = <IObfuscationReplacerWithStorage>obfuscationReplacerFactory(ObfuscationReplacers.IdentifierReplacer);
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (Node.isFunctionDeclarationNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
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

        // check for cached identifiers for current scope node. If exist - loop through them.
        if (this.replaceableIdentifiers.has(blockScopeOfFunctionDeclarationNode)) {
            this.replaceScopeCachedIdentifiers(blockScopeOfFunctionDeclarationNode, nodeIdentifier);
        } else {
            this.replaceScopeIdentifiers(blockScopeOfFunctionDeclarationNode, nodeIdentifier);
        }

        return functionDeclarationNode;
    }

    /**
     * @param functionDeclarationNode
     * @param nodeIdentifier
     */
    private storeFunctionName (functionDeclarationNode: ESTree.FunctionDeclaration, nodeIdentifier: number): void {
        this.identifierReplacer.storeNames(functionDeclarationNode.id.name, nodeIdentifier);
    }

    /**
     * @param scopeNode
     * @param nodeIdentifier
     */
    private replaceScopeCachedIdentifiers (scopeNode: ESTree.Node, nodeIdentifier: number): void {
        const cachedReplaceableIdentifiers: ESTree.Identifier[] = <ESTree.Identifier[]>this.replaceableIdentifiers.get(scopeNode);

        cachedReplaceableIdentifiers.forEach((replaceableIdentifier: ESTree.Identifier) => {
            replaceableIdentifier.name = this.identifierReplacer.replace(replaceableIdentifier.name, nodeIdentifier);
        });
    }

    /**
     * @param scopeNode
     * @param nodeIdentifier
     */
    private replaceScopeIdentifiers (scopeNode: ESTree.Node, nodeIdentifier: number): void {
        const storedReplaceableIdentifiers: ESTree.Identifier[] = [];

        estraverse.replace(scopeNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Node.isReplaceableIdentifierNode(node, parentNode)) {
                    const newNodeName: string = this.identifierReplacer.replace(node.name, nodeIdentifier);

                    if (node.name !== newNodeName) {
                        node.name = newNodeName;
                    } else {
                        storedReplaceableIdentifiers.push(node);
                    }
                }
            }
        });

        this.replaceableIdentifiers.set(scopeNode, storedReplaceableIdentifiers);
    }
}
