import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TIdentifierObfuscatingReplacerFactory } from '../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory';
import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';

import { IIdentifierObfuscatingReplacer } from '../../interfaces/node-transformers/obfuscating-transformers/IIdentifierObfuscatingReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/IVisitor';

import { IdentifierObfuscatingReplacer } from "../../enums/container/node-transformers/IdentifierObfuscatingReplacer";
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
     * @type {IIdentifierObfuscatingReplacer}
     */
    private readonly identifierObfuscatingReplacer: IIdentifierObfuscatingReplacer;

    /**
     * @type {Map<ESTree.Node, ESTree.Identifier[]>}
     */
    private readonly replaceableIdentifiers: Map <ESTree.Node, ESTree.Identifier[]> = new Map();

    /**
     * @param identifierObfuscatingReplacerFactory
     * @param randomGenerator
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)
            identifierObfuscatingReplacerFactory: TIdentifierObfuscatingReplacerFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(
            IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer
        );
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (Node.isVariableDeclarationNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param variableDeclarationNode
     * @param parentNode
     * @returns {ESTree.Node}
     */
    public transformNode (variableDeclarationNode: ESTree.VariableDeclaration, parentNode: ESTree.Node): ESTree.Node {
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

        // check for cached identifiers for current scope node. If exist - loop through them.
        if (this.replaceableIdentifiers.has(scopeNode)) {
            this.replaceScopeCachedIdentifiers(scopeNode, nodeIdentifier);
        } else {
            this.replaceScopeIdentifiers(scopeNode, nodeIdentifier);
        }

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
                    enter: (node: ESTree.Identifier) => this.identifierObfuscatingReplacer.storeNames(node.name, nodeIdentifier)
                });
            });
    }

    /**
     * @param scopeNode
     * @param nodeIdentifier
     */
    private replaceScopeCachedIdentifiers (scopeNode: ESTree.Node, nodeIdentifier: number): void {
        const cachedReplaceableIdentifiers: ESTree.Identifier[] = <ESTree.Identifier[]>this.replaceableIdentifiers.get(scopeNode);

        cachedReplaceableIdentifiers.forEach((replaceableIdentifier: ESTree.Identifier) => {
            const newReplaceableIdentifier: ESTree.Identifier = this.identifierObfuscatingReplacer.replace(replaceableIdentifier.name, nodeIdentifier);

            replaceableIdentifier.name = newReplaceableIdentifier.name;
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
                if (!node.obfuscatedNode && Node.isReplaceableIdentifierNode(node, parentNode)) {
                    const newIdentifier: ESTree.Identifier = this.identifierObfuscatingReplacer.replace(node.name, nodeIdentifier);
                    const newIdentifierName: string = newIdentifier.name;

                    if (node.name !== newIdentifierName) {
                        node.name = newIdentifierName;
                    } else {
                        storedReplaceableIdentifiers.push(node);
                    }
                }
            }
        });

        this.replaceableIdentifiers.set(scopeNode, storedReplaceableIdentifiers);
    }
}
