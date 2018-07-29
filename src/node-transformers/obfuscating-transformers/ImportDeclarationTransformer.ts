import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TIdentifierObfuscatingReplacerFactory } from "../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory";
import { TImportSpecifier } from '../../types/node/TimportSpecifier';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IIdentifierObfuscatingReplacer } from '../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IIdentifierObfuscatingReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { IdentifierObfuscatingReplacer } from "../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer";
import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeLexicalScopeUtils } from '../../node/NodeLexicalScopeUtils';
import { NodeMetadata } from '../../node/NodeMetadata';

/**
 * replaces:
 *     import foo from './foo';
 *     import * as bar from './bar';
 *
 * on:
 *     import _0x12d45f from './foo';
 *     import * as _0x12d45f from './bar';
 */
@injectable()
export class ImportDeclarationTransformer extends AbstractNodeTransformer {
    /**
     * @type {IIdentifierObfuscatingReplacer}
     */
    private readonly identifierObfuscatingReplacer: IIdentifierObfuscatingReplacer;

    /**
     * @type {Map<ESTree.Node, ESTree.Identifier[]>}
     */
    private readonly replaceableIdentifiers: Map <ESTree.Node, ESTree.Identifier[]> = new Map();

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
     * @param {TImportSpecifier} importSpecifierNode
     * @returns {boolean}
     */
    private static isProhibitedImportSpecifierNode (importSpecifierNode: TImportSpecifier): boolean {
        return NodeGuards.isImportSpecifierNode(importSpecifierNode)
            && importSpecifierNode.imported.name === importSpecifierNode.local.name;
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
                        if (parentNode && NodeGuards.isImportDeclarationNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {ImportDeclaration} importDeclarationNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (importDeclarationNode: ESTree.ImportDeclaration, parentNode: ESTree.Node): ESTree.Node {
        const lexicalScopeNode: TNodeWithLexicalScope | undefined = NodeLexicalScopeUtils.getLexicalScope(importDeclarationNode);

        if (!lexicalScopeNode) {
            return importDeclarationNode;
        }

        this.storeImportSpecifierNames(importDeclarationNode, lexicalScopeNode);

        // check for cached identifiers for current scope node. If exist - loop through them.
        if (this.replaceableIdentifiers.has(lexicalScopeNode)) {
            this.replaceScopeCachedIdentifiers(lexicalScopeNode);
        } else {
            this.replaceScopeIdentifiers(lexicalScopeNode);
        }

        return importDeclarationNode;
    }

    /**
     * @param {ImportDeclaration} importDeclarationNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    private storeImportSpecifierNames (
        importDeclarationNode: ESTree.ImportDeclaration,
        lexicalScopeNode: TNodeWithLexicalScope
    ): void {
        importDeclarationNode.specifiers.forEach((importSpecifierNode: TImportSpecifier) => {
            if (ImportDeclarationTransformer.isProhibitedImportSpecifierNode(importSpecifierNode)) {
                return;
            }

            this.identifierObfuscatingReplacer.storeGlobalName(importSpecifierNode.local.name, lexicalScopeNode);
        });
    }

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    private replaceScopeCachedIdentifiers (lexicalScopeNode: TNodeWithLexicalScope): void {
        const cachedReplaceableIdentifiers: ESTree.Identifier[] =
            <ESTree.Identifier[]>this.replaceableIdentifiers.get(lexicalScopeNode);

        cachedReplaceableIdentifiers.forEach((replaceableIdentifier: ESTree.Identifier) => {
            const newReplaceableIdentifier: ESTree.Identifier = this.identifierObfuscatingReplacer
                .replace(replaceableIdentifier.name, lexicalScopeNode);

            replaceableIdentifier.name = newReplaceableIdentifier.name;
            NodeMetadata.set(replaceableIdentifier, { renamedIdentifier: true });
        });
    }

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    private replaceScopeIdentifiers (lexicalScopeNode: TNodeWithLexicalScope): void {
        const storedReplaceableIdentifiers: ESTree.Identifier[] = [];

        estraverse.replace(lexicalScopeNode, {
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
                        storedReplaceableIdentifiers.push(node);
                    }
                }
            }
        });

        this.replaceableIdentifiers.set(lexicalScopeNode, storedReplaceableIdentifiers);
    }
}
