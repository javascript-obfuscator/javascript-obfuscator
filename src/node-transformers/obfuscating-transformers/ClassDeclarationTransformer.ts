import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TIdentifierObfuscatingReplacerFactory } from "../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory";
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
 *     class Foo { //... };
 *     new Foo();
 *
 * on:
 *     class _0x12d45f { //... };
 *     new _0x12d45f();
 */
@injectable()
export class ClassDeclarationTransformer extends AbstractNodeTransformer {
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
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (Node.isClassDeclarationNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param {ClassDeclaration} classDeclarationNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (classDeclarationNode: ESTree.ClassDeclaration, parentNode: ESTree.Node): ESTree.Node {
        const nodeIdentifier: number = this.nodeIdentifier++;
        const blockScopeOfClassDeclarationNode: TNodeWithBlockStatement = NodeUtils
            .getBlockScopesOfNode(classDeclarationNode)[0];

        if (!this.options.renameGlobals && blockScopeOfClassDeclarationNode.type === NodeType.Program) {
            return classDeclarationNode;
        }

        this.storeClassName(classDeclarationNode, nodeIdentifier);

        // check for cached identifiers for current scope node. If exist - loop through them.
        if (this.replaceableIdentifiers.has(blockScopeOfClassDeclarationNode)) {
            this.replaceScopeCachedIdentifiers(blockScopeOfClassDeclarationNode, nodeIdentifier);
        } else {
            this.replaceScopeIdentifiers(blockScopeOfClassDeclarationNode, nodeIdentifier);
        }

        return classDeclarationNode;
    }

    /**
     * @param {ClassDeclaration} classDeclarationNode
     * @param {number} nodeIdentifier
     */
    private storeClassName (classDeclarationNode: ESTree.ClassDeclaration, nodeIdentifier: number): void {
        this.identifierObfuscatingReplacer.storeNames(classDeclarationNode.id.name, nodeIdentifier);
    }

    /**
     * @param {Node} scopeNode
     * @param {number} nodeIdentifier
     */
    private replaceScopeCachedIdentifiers (scopeNode: ESTree.Node, nodeIdentifier: number): void {
        const cachedReplaceableIdentifiers: ESTree.Identifier[] = <ESTree.Identifier[]>this.replaceableIdentifiers.get(scopeNode);

        cachedReplaceableIdentifiers.forEach((replaceableIdentifier: ESTree.Identifier) => {
            const newReplaceableIdentifier: ESTree.Identifier = this.identifierObfuscatingReplacer.replace(replaceableIdentifier.name, nodeIdentifier);

            replaceableIdentifier.name = newReplaceableIdentifier.name;
        });
    }

    /**
     * @param {Node} scopeNode
     * @param {number} nodeIdentifier
     */
    private replaceScopeIdentifiers (scopeNode: ESTree.Node, nodeIdentifier: number): void {
        const storedReplaceableIdentifiers: ESTree.Identifier[] = [];

        estraverse.replace(scopeNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Node.isReplaceableIdentifierNode(node, parentNode)) {
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
