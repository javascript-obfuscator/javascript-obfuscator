import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TIdentifierObfuscatingReplacerFactory } from "../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory";
import { TNodeWithBlockScope } from '../../types/node/TNodeWithBlockScope';

import { IIdentifierObfuscatingReplacer } from '../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IIdentifierObfuscatingReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { IdentifierObfuscatingReplacer } from "../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer";
import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeMetadata } from '../../node/NodeMetadata';
import { NodeUtils } from '../../node/NodeUtils';

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
export class ImportSpecifierTransformer extends AbstractNodeTransformer {
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
                            && (
                                NodeGuards.isImportDefaultSpecifierNode(node)
                                || NodeGuards.isImportNamespaceSpecifierNode(node)
                            )
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
     * @param {ImportDefaultSpecifier | ImportNamespaceSpecifier} importSpecifierNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (
        importSpecifierNode: ESTree.ImportDefaultSpecifier | ESTree.ImportNamespaceSpecifier,
        parentNode: ESTree.Node
    ): ESTree.Node {
        const nodeIdentifier: number = this.nodeIdentifier++;
        const blockScopeNode: TNodeWithBlockScope = NodeUtils.getBlockScopesOfNode(importSpecifierNode)[0];

        this.storeImportSpecifierName(importSpecifierNode, nodeIdentifier);

        // check for cached identifiers for current scope node. If exist - loop through them.
        if (this.replaceableIdentifiers.has(blockScopeNode)) {
            this.replaceScopeCachedIdentifiers(blockScopeNode, nodeIdentifier);
        } else {
            this.replaceScopeIdentifiers(blockScopeNode, nodeIdentifier);
        }

        return importSpecifierNode;
    }

    /**
     * @param {ImportDefaultSpecifier | ImportNamespaceSpecifier} importSpecifierNode
     * @param {number} nodeIdentifier
     */
    private storeImportSpecifierName (
        importSpecifierNode: ESTree.ImportDefaultSpecifier | ESTree.ImportNamespaceSpecifier,
        nodeIdentifier: number
    ): void {
        this.identifierObfuscatingReplacer.storeGlobalName(importSpecifierNode.local.name, nodeIdentifier);
    }

    /**
     * @param {TNodeWithBlockScope} blockScopeNode
     * @param {number} nodeIdentifier
     */
    private replaceScopeCachedIdentifiers (blockScopeNode: TNodeWithBlockScope, nodeIdentifier: number): void {
        const cachedReplaceableIdentifiers: ESTree.Identifier[] = <ESTree.Identifier[]>this.replaceableIdentifiers.get(blockScopeNode);

        cachedReplaceableIdentifiers.forEach((replaceableIdentifier: ESTree.Identifier) => {
            const newReplaceableIdentifier: ESTree.Identifier = this.identifierObfuscatingReplacer
                .replace(replaceableIdentifier.name, nodeIdentifier);

            replaceableIdentifier.name = newReplaceableIdentifier.name;
            NodeMetadata.set(replaceableIdentifier, { renamedIdentifier: true });
        });
    }

    /**
     * @param {TNodeWithBlockScope} blockScopeNode
     * @param {number} nodeIdentifier
     */
    private replaceScopeIdentifiers (blockScopeNode: TNodeWithBlockScope, nodeIdentifier: number): void {
        const storedReplaceableIdentifiers: ESTree.Identifier[] = [];

        estraverse.replace(blockScopeNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null): void => {
                if (
                    parentNode
                    && NodeGuards.isReplaceableIdentifierNode(node, parentNode)
                    && !NodeMetadata.isRenamedIdentifier(node)
                ) {
                    const newIdentifier: ESTree.Identifier = this.identifierObfuscatingReplacer
                        .replace(node.name, nodeIdentifier);
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

        this.replaceableIdentifiers.set(blockScopeNode, storedReplaceableIdentifiers);
    }
}
