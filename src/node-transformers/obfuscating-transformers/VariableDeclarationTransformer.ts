import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TIdentifierObfuscatingReplacerFactory } from '../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
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
import { NodeLexicalScopeUtils } from '../../node/NodeLexicalScopeUtils';
import { NodeMetadata } from '../../node/NodeMetadata';

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
                        if (
                            parentNode
                            && NodeGuards.isVariableDeclarationNode(node)
                            && !NodeGuards.isExportNamedDeclarationNode(parentNode)
                        ) {
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
        const lexicalScopeNode: TNodeWithLexicalScope | undefined = NodeLexicalScopeUtils.getLexicalScope(variableDeclarationNode);

        if (!lexicalScopeNode) {
            return variableDeclarationNode;
        }

        const isGlobalDeclaration: boolean = lexicalScopeNode.type === NodeType.Program;

        if (!this.options.renameGlobals && isGlobalDeclaration) {
            return variableDeclarationNode;
        }

        const scopeNode: ESTree.Node = variableDeclarationNode.kind === 'var'
            ? lexicalScopeNode
            : parentNode;

        this.storeVariableNames(variableDeclarationNode, lexicalScopeNode, isGlobalDeclaration);

        // check for cached identifiers for current scope node. If exist - loop through them.
        if (this.replaceableIdentifiers.has(scopeNode)) {
            this.replaceScopeCachedIdentifiers(variableDeclarationNode, lexicalScopeNode, scopeNode);
        } else {
            this.replaceScopeIdentifiers(scopeNode, lexicalScopeNode);
        }

        return variableDeclarationNode;
    }

    /**
     * @param {VariableDeclaration} variableDeclarationNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {boolean} isGlobalDeclaration
     */
    private storeVariableNames (
        variableDeclarationNode: ESTree.VariableDeclaration,
        lexicalScopeNode: TNodeWithLexicalScope,
        isGlobalDeclaration: boolean
    ): void {
        this.traverseDeclarationIdentifiers(variableDeclarationNode, (identifierNode: ESTree.Identifier) => {
            if (isGlobalDeclaration) {
                this.identifierObfuscatingReplacer.storeGlobalName(identifierNode.name, lexicalScopeNode);
            } else {
                this.identifierObfuscatingReplacer.storeLocalName(identifierNode.name, lexicalScopeNode);
            }
        });
    }

    /**
     * @param {VariableDeclaration} variableDeclarationNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {Node} scopeNode
     */
    private replaceScopeCachedIdentifiers (
        variableDeclarationNode: ESTree.VariableDeclaration,
        lexicalScopeNode: TNodeWithLexicalScope,
        scopeNode: ESTree.Node
    ): void {
        const cachedReplaceableIdentifiersNamesMap: TReplaceableIdentifiersNames =
            <TReplaceableIdentifiersNames>this.replaceableIdentifiers.get(scopeNode);

        const identifierNames: string[] = [];

        this.traverseDeclarationIdentifiers(variableDeclarationNode, (identifierNode: ESTree.Identifier) => {
            identifierNames.push(identifierNode.name);
        });

        identifierNames.forEach((identifierName: string) => {
            const cachedReplaceableIdentifiers: ESTree.Identifier[] | undefined =
                cachedReplaceableIdentifiersNamesMap.get(identifierName);

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
                    .replace(replaceableIdentifier.name, lexicalScopeNode);

                replaceableIdentifier.name = newReplaceableIdentifier.name;
                NodeMetadata.set(replaceableIdentifier, { renamedIdentifier: true });
            }
        });
    }

    /**
     * @param {Node} scopeNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    private replaceScopeIdentifiers (scopeNode: ESTree.Node, lexicalScopeNode: TNodeWithLexicalScope): void {
        const storedReplaceableIdentifiersNamesMap: TReplaceableIdentifiersNames = new Map();

        estraverse.replace(scopeNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null): void => {
                if (
                    parentNode
                    && NodeGuards.isReplaceableIdentifierNode(node, parentNode)
                    && !NodeMetadata.isRenamedIdentifier(node)
                ) {
                    const newIdentifier: ESTree.Identifier = this.identifierObfuscatingReplacer
                        .replace(node.name, lexicalScopeNode);
                    const newIdentifierName: string = newIdentifier.name;

                    if (node.name !== newIdentifierName) {
                        node.name = newIdentifierName;
                        NodeMetadata.set(node, { renamedIdentifier: true });
                    } else {
                        const storedReplaceableIdentifiers: ESTree.Identifier[] =
                            storedReplaceableIdentifiersNamesMap.get(node.name) || [];

                        storedReplaceableIdentifiers.push(node);
                        storedReplaceableIdentifiersNamesMap.set(node.name, storedReplaceableIdentifiers);
                    }
                }
            }
        });

        this.replaceableIdentifiers.set(scopeNode, storedReplaceableIdentifiersNamesMap);
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
                estraverse.traverse(declarationNode.id, {
                    enter: (node: ESTree.Node) => {
                        if (NodeGuards.isPropertyNode(node)) {
                            return estraverse.VisitorOption.Skip;
                        }

                        if (NodeGuards.isIdentifierNode(node)) {
                            callback(node);
                        }
                    }
                });
            });
    }
}
