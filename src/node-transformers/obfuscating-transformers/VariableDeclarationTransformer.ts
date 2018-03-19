import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TIdentifierObfuscatingReplacerFactory } from '../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory';
import { TNodeWithBlockScope } from '../../types/node/TNodeWithBlockScope';
import { TReplaceableIdentifiers } from '../../types/node-transformers/TReplaceableIdentifiers';
import { TReplaceableIdentifiersNames } from '../../types/node-transformers/TReplaceableIdentifiersNames';

import { IIdentifierObfuscatingReplacer } from '../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IIdentifierObfuscatingReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { IdentifierObfuscatingReplacer } from "../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer";
import { NodeType } from '../../enums/node/NodeType';
import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeMetadata } from '../../node/NodeMetadata';
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
     * @type {TReplaceableIdentifiers}
     */
    private readonly replaceableIdentifiers: TReplaceableIdentifiers = new Map();

    /**
     * @param {TIdentifierObfuscatingReplacerFactory} identifierObfuscatingReplacerFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
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
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.Obfuscating:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (parentNode && NodeGuards.isVariableDeclarationNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {VariableDeclaration} variableDeclarationNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (variableDeclarationNode: ESTree.VariableDeclaration, parentNode: ESTree.Node): ESTree.Node {
        const blockScopeNode: TNodeWithBlockScope = NodeUtils.getBlockScopesOfNode(variableDeclarationNode)[0];
        const isGlobalDeclaration: boolean = blockScopeNode.type === NodeType.Program;

        if (!this.options.renameGlobals && isGlobalDeclaration) {
            return variableDeclarationNode;
        }

        const nodeIdentifier: number = this.nodeIdentifier++;
        const scopeNode: ESTree.Node = variableDeclarationNode.kind === 'var'
            ? blockScopeNode
            : parentNode;

        this.storeVariableNames(variableDeclarationNode, isGlobalDeclaration, nodeIdentifier);

        // check for cached identifiers for current scope node. If exist - loop through them.
        if (this.replaceableIdentifiers.has(scopeNode)) {
            this.replaceScopeCachedIdentifiers(variableDeclarationNode, scopeNode, nodeIdentifier);
        } else {
            this.replaceScopeIdentifiers(scopeNode, nodeIdentifier);
        }

        return variableDeclarationNode;
    }

    /**
     * @param {VariableDeclaration} variableDeclarationNode
     * @param {boolean} isGlobalDeclaration
     * @param {number} nodeIdentifier
     */
    private storeVariableNames (
        variableDeclarationNode: ESTree.VariableDeclaration,
        isGlobalDeclaration: boolean,
        nodeIdentifier: number
    ): void {
        this.traverseDeclarationIdentifiers(variableDeclarationNode, (identifierNode: ESTree.Identifier) => {
            if (isGlobalDeclaration) {
                this.identifierObfuscatingReplacer.storeGlobalName(identifierNode.name, nodeIdentifier);
            } else {
                this.identifierObfuscatingReplacer.storeLocalName(identifierNode.name, nodeIdentifier);
            }
        });
    }

    /**
     * @param {VariableDeclaration} variableDeclarationNode
     * @param {Node} scopeNode
     * @param {number} nodeIdentifier
     */
    private replaceScopeCachedIdentifiers (
        variableDeclarationNode: ESTree.VariableDeclaration,
        scopeNode: ESTree.Node,
        nodeIdentifier: number
    ): void {
        const cachedReplaceableIdentifiersNamesMap: TReplaceableIdentifiersNames | undefined = this.replaceableIdentifiers.get(scopeNode);

        if (!cachedReplaceableIdentifiersNamesMap) {
            return;
        }

        const identifierNames: string[] = [];

        this.traverseDeclarationIdentifiers(variableDeclarationNode, (identifierNode: ESTree.Identifier) => {
            identifierNames.push(identifierNode.name);
        });

        identifierNames.forEach((identifierName: string) => {
            const cachedReplaceableIdentifiers: ESTree.Identifier[] | undefined = cachedReplaceableIdentifiersNamesMap.get(identifierName);

            if (!cachedReplaceableIdentifiers) {
                return;
            }

            const cachedReplaceableIdentifierLength: number = cachedReplaceableIdentifiers.length;

            for (let i: number = 0; i < cachedReplaceableIdentifierLength; i++) {
                const replaceableIdentifier: ESTree.Identifier = cachedReplaceableIdentifiers[i];

                if (identifierName !== replaceableIdentifier.name) {
                    continue;
                }

                const newReplaceableIdentifier: ESTree.Identifier = this.identifierObfuscatingReplacer
                    .replace(replaceableIdentifier.name, nodeIdentifier);

                replaceableIdentifier.name = newReplaceableIdentifier.name;
            }
        });
    }

    /**
     * @param {NodeGuards} blockScopeNode
     * @param {number} nodeIdentifier
     */
    private replaceScopeIdentifiers (blockScopeNode: ESTree.Node, nodeIdentifier: number): void {
        const storedReplaceableIdentifiersNamesMap: TReplaceableIdentifiersNames = new Map();

        estraverse.replace(blockScopeNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null): void => {
                if (
                    parentNode
                    && NodeGuards.isReplaceableIdentifierNode(node, parentNode)
                    && !NodeMetadata.isRenamedIdentifier(node)
                ) {
                    const newIdentifier: ESTree.Identifier = this.identifierObfuscatingReplacer.replace(node.name, nodeIdentifier);
                    const newIdentifierName: string = newIdentifier.name;

                    if (node.name !== newIdentifierName) {
                        node.name = newIdentifierName;
                        NodeMetadata.set(node, { renamedIdentifier: true });
                    } else {
                        const storedReplaceableIdentifiers: ESTree.Identifier[] = storedReplaceableIdentifiersNamesMap.get(node.name) || [];

                        storedReplaceableIdentifiers.push(node);
                        storedReplaceableIdentifiersNamesMap.set(node.name, storedReplaceableIdentifiers);
                    }
                }
            }
        });

        this.replaceableIdentifiers.set(blockScopeNode, storedReplaceableIdentifiersNamesMap);
    }

    /**
     * @param {VariableDeclaration} variableDeclarationNode
     * @param {(identifier: Identifier) => void} callback
     */
    private traverseDeclarationIdentifiers (
        variableDeclarationNode: ESTree.VariableDeclaration,
        callback: (identifier: ESTree.Identifier) => void
    ): void {
        variableDeclarationNode.declarations
            .forEach((declarationNode: ESTree.VariableDeclarator) => {
                if (NodeGuards.isObjectPatternNode(declarationNode.id)) {
                    return estraverse.VisitorOption.Skip;
                }

                estraverse.traverse(declarationNode.id, {
                    enter: (node: ESTree.Node) => {
                        if (NodeGuards.isIdentifierNode(node)) {
                            callback(node);
                        }
                    }
                });
            });
    }
}
