import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';
import * as estraverse from 'estraverse';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IIdentifierReplacer } from '../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IIdentifierReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IScopeIdentifiersTraverser } from '../../interfaces/node/IScopeIdentifiersTraverser';
import { IScopeIdentifiersTraverserCallbackData } from '../../interfaces/node/IScopeIdentifiersTraverserCallbackData';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeMetadata } from '../../node/NodeMetadata';

/**
 * Replaces all replaceable identifiers in scope
 */
@injectable()
export class ScopeIdentifiersTransformer extends AbstractNodeTransformer {
    /**
     * @type {IIdentifierReplacer}
     */
    private readonly identifierReplacer: IIdentifierReplacer;

    /**
     * @type {Map<TNodeWithLexicalScope, boolean>}
     */
    private readonly lexicalScopesWithObjectPatternWithoutDeclarationMap: Map<TNodeWithLexicalScope, boolean> = new Map();

    /**
     * @type {IScopeIdentifiersTraverser}
     */
    private readonly scopeIdentifiersTraverser: IScopeIdentifiersTraverser;

    /**
     * @param {IIdentifierReplacer} identifierReplacer
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IScopeIdentifiersTraverser} scopeIdentifiersTraverser
     */
    public constructor (
        @inject(ServiceIdentifiers.IIdentifierReplacer) identifierReplacer: IIdentifierReplacer,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IScopeIdentifiersTraverser) scopeIdentifiersTraverser: IScopeIdentifiersTraverser
    ) {
        super(randomGenerator, options);

        this.identifierReplacer = identifierReplacer;
        this.scopeIdentifiersTraverser = scopeIdentifiersTraverser;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.RenameIdentifiers:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isProgramNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {VariableDeclaration} programNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (programNode: ESTree.Program, parentNode: ESTree.Node): ESTree.Node {
        this.scopeIdentifiersTraverser.traverseScopeIdentifiers(
            programNode,
            parentNode,
            (data: IScopeIdentifiersTraverserCallbackData) => {
                const {
                    isGlobalDeclaration,
                    variable,
                    variableLexicalScopeNode
                } = data;

                if (!this.options.renameGlobals && isGlobalDeclaration) {
                    const isImportBindingOrCatchClauseIdentifier: boolean = variable.defs
                        .every((definition: eslintScope.Definition) =>
                            definition.type === 'ImportBinding'
                            || definition.type === 'CatchClause'
                        );

                    // skip all global identifiers except import statement and catch clause parameter identifiers
                    if (!isImportBindingOrCatchClauseIdentifier) {
                        return;
                    }
                }

                this.transformScopeVariableIdentifiers(
                    variable,
                    variableLexicalScopeNode,
                    isGlobalDeclaration
                );
            }
        );

        return programNode;
    }

    /**
     * @param {Variable} variable
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {boolean} isGlobalDeclaration
     */
    private transformScopeVariableIdentifiers (
        variable: eslintScope.Variable,
        lexicalScopeNode: TNodeWithLexicalScope,
        isGlobalDeclaration: boolean
    ): void {
        const firstIdentifier: ESTree.Identifier | null = variable.identifiers[0] ?? null;

        if (!firstIdentifier) {
            return;
        }

        if (!this.isReplaceableIdentifierNode(firstIdentifier, lexicalScopeNode, variable)) {
            return;
        }

        this.storeIdentifierName(firstIdentifier, lexicalScopeNode, isGlobalDeclaration);
        this.replaceIdentifierName(firstIdentifier, lexicalScopeNode, variable);
    }

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {boolean} isGlobalDeclaration
     */
    private storeIdentifierName (
        identifierNode: ESTree.Identifier,
        lexicalScopeNode: TNodeWithLexicalScope,
        isGlobalDeclaration: boolean
    ): void {
        if (isGlobalDeclaration) {
            this.identifierReplacer.storeGlobalName(identifierNode, lexicalScopeNode);
        } else {
            this.identifierReplacer.storeLocalName(identifierNode, lexicalScopeNode);
        }
    }

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {Variable} variable
     */
    private replaceIdentifierName (
        identifierNode: ESTree.Identifier,
        lexicalScopeNode: TNodeWithLexicalScope,
        variable: eslintScope.Variable
    ): void {
        const newIdentifier: ESTree.Identifier = this.identifierReplacer
            .replace(identifierNode, lexicalScopeNode);

        // rename of identifiers
        variable.identifiers.forEach((identifier: ESTree.Identifier) => {
            identifier.name = newIdentifier.name;
        });

        // rename of references
        variable.references.forEach((reference: eslintScope.Reference) => {
            reference.identifier.name = identifierNode.name;
        });
    }

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {Variable} variable
     * @returns {boolean}
     */
    // eslint-disable-next-line complexity
    private isReplaceableIdentifierNode (
        identifierNode: ESTree.Identifier,
        lexicalScopeNode: TNodeWithLexicalScope,
        variable: eslintScope.Variable
    ): identifierNode is ESTree.Identifier & { parentNode: ESTree.Node } {
        const parentNode: ESTree.Node | undefined = identifierNode.parentNode;

        return !!parentNode
            && !NodeMetadata.isIgnoredNode(identifierNode)
            && !this.isProhibitedPropertyIdentifierNode(identifierNode, parentNode)
            && !this.isProhibitedPropertyAssignmentPatternIdentifierNode(identifierNode, parentNode)
            && !this.isProhibitedClassDeclarationNameIdentifierNode(variable, identifierNode, parentNode)
            && !this.isProhibitedExportNamedClassDeclarationIdentifierNode(identifierNode, parentNode)
            && !this.isProhibitedExportNamedFunctionDeclarationIdentifierNode(identifierNode, parentNode)
            && !this.isProhibitedExportNamedVariableDeclarationIdentifierNode(identifierNode, parentNode)
            && !this.isProhibitedImportSpecifierNode(identifierNode, parentNode)
            && !this.isProhibitedVariableNameUsedInObjectPatternNode(variable, identifierNode, lexicalScopeNode)
            && !NodeGuards.isLabelIdentifierNode(identifierNode, parentNode);
    }

    /**
     * @param {Variable} variable
     * @param {Identifier} identifierNode
     * @param {Node} parentNode
     * @returns {identifierNode is Identifier}
     */
    private isProhibitedClassDeclarationNameIdentifierNode (
        variable: eslintScope.Variable,
        identifierNode: ESTree.Identifier,
        parentNode: ESTree.Node
    ): identifierNode is ESTree.Identifier {
        return NodeGuards.isClassDeclarationNode(variable.scope.block)
            && NodeGuards.isClassDeclarationNode(parentNode)
            && parentNode.id === identifierNode;
    }

    /**
     * @param {Identifier} identifierNode
     * @param {Node} parentNode
     * @returns {identifierNode is Identifier}
     */
    private isProhibitedExportNamedClassDeclarationIdentifierNode (
        identifierNode: ESTree.Identifier,
        parentNode: ESTree.Node
    ): identifierNode is ESTree.Identifier {
        return NodeGuards.isClassDeclarationNode(parentNode)
            && parentNode.id === identifierNode
            && !!parentNode.parentNode
            && NodeGuards.isExportNamedDeclarationNode(parentNode.parentNode);
    }

    /**
     * @param {Identifier} identifierNode
     * @param {Node} parentNode
     * @returns {identifierNode is Identifier}
     */
    private isProhibitedExportNamedFunctionDeclarationIdentifierNode (
        identifierNode: ESTree.Identifier,
        parentNode: ESTree.Node
    ): identifierNode is ESTree.Identifier {
        return NodeGuards.isFunctionDeclarationNode(parentNode)
            && parentNode.id === identifierNode
            && !!parentNode.parentNode
            && NodeGuards.isExportNamedDeclarationNode(parentNode.parentNode);
    }

    /**
     * @param {Identifier} identifierNode
     * @param {Node} parentNode
     * @returns {identifierNode is Identifier}
     */
    private isProhibitedExportNamedVariableDeclarationIdentifierNode (
        identifierNode: ESTree.Identifier,
        parentNode: ESTree.Node
    ): identifierNode is ESTree.Identifier {
        return NodeGuards.isVariableDeclaratorNode(parentNode)
            && parentNode.id === identifierNode
            && !!parentNode.parentNode
            && NodeGuards.isVariableDeclarationNode(parentNode.parentNode)
            && !!parentNode.parentNode.parentNode
            && NodeGuards.isExportNamedDeclarationNode(parentNode.parentNode.parentNode);
    }

    /**
     * @param {Identifier} identifierNode
     * @param {Node} parentNode
     * @returns {boolean}
     */
    private isProhibitedImportSpecifierNode (identifierNode: ESTree.Identifier, parentNode: ESTree.Node): boolean {
        return NodeGuards.isImportSpecifierNode(parentNode)
            && parentNode.imported.name === parentNode.local.name;
    }

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @returns {boolean}
     */
    private isProhibitedPropertyIdentifierNode (
        node: ESTree.Node,
        parentNode: ESTree.Node
    ): node is ESTree.Identifier {
        return NodeGuards.isPropertyNode(parentNode)
            && !parentNode.computed
            && NodeGuards.isIdentifierNode(parentNode.key)
            && NodeGuards.isIdentifierNode(node)
            && parentNode.shorthand
            && parentNode.key.name === node.name;
    }

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @returns {boolean}
     */
    private isProhibitedPropertyAssignmentPatternIdentifierNode (
        node: ESTree.Node,
        parentNode: ESTree.Node
    ): node is ESTree.Identifier {
        return NodeGuards.isAssignmentPatternNode(parentNode)
            && parentNode.left === node
            && !!parentNode.parentNode
            && NodeGuards.isPropertyNode(parentNode.parentNode)
            && NodeGuards.isIdentifierNode(parentNode.left)
            && NodeGuards.isIdentifierNode(parentNode.parentNode.key)
            && parentNode.left.name === parentNode.parentNode.key.name;
    }

    /**
     * Should not rename identifiers that used inside destructing assignment without declaration
     *
     * var a, b; // should not be renamed
     * ({a, b} = {a: 1, b: 2});
     *
     * @param {Variable} variable
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @returns {boolean}
     */
    private isProhibitedVariableNameUsedInObjectPatternNode (
        variable: eslintScope.Variable,
        identifierNode: ESTree.Identifier,
        lexicalScopeNode: TNodeWithLexicalScope
    ): boolean {
        let isLexicalScopeHasObjectPatternWithoutDeclaration: boolean | undefined =
            this.lexicalScopesWithObjectPatternWithoutDeclarationMap.get(lexicalScopeNode);

        // lexical scope was traversed before and object pattern without declaration was not found
        if (isLexicalScopeHasObjectPatternWithoutDeclaration === false) {
            return false;
        }

        const hasVarDefinitions: boolean = variable.defs.some((definition: eslintScope.Definition) => (<any>definition).kind === 'var');

        if (!hasVarDefinitions) {
            return false;
        }

        let isProhibitedVariableDeclaration: boolean = false;

        estraverse.traverse(lexicalScopeNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null): void | estraverse.VisitorOption => {
                if (
                    NodeGuards.isObjectPatternNode(node)
                    && parentNode
                    && NodeGuards.isAssignmentExpressionNode(parentNode)
                ) {
                    isLexicalScopeHasObjectPatternWithoutDeclaration = true;

                    const properties: (ESTree.Property | ESTree.RestElement)[] = node.properties;

                    for (const property of properties) {
                        if (!NodeGuards.isPropertyNode(property)) {
                            continue;
                        }

                        if (property.computed || !property.shorthand) {
                            continue;
                        }

                        if (!NodeGuards.isIdentifierNode(property.key)) {
                            continue;
                        }

                        if (identifierNode.name !== property.key.name) {
                            continue;
                        }

                        isProhibitedVariableDeclaration = true;

                        return estraverse.VisitorOption.Break;
                    }
                }
            }
        });

        this.lexicalScopesWithObjectPatternWithoutDeclarationMap.set(
            lexicalScopeNode,
            isLexicalScopeHasObjectPatternWithoutDeclaration ?? false
        );

        return isProhibitedVariableDeclaration;
    }
}
