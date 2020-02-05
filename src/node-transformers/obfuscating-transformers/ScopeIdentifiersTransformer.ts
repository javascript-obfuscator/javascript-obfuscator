import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';
import * as estraverse from 'estraverse';

import { TIdentifierObfuscatingReplacerFactory } from '../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IIdentifierObfuscatingReplacer } from '../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IIdentifierObfuscatingReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IScopeAnalyzer } from '../../interfaces/analyzers/scope-analyzer/IScopeAnalyzer';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { IdentifierObfuscatingReplacer } from '../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer';
import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeMetadata } from '../../node/NodeMetadata';

/**
 * Replaces all replaceable identifiers in scope
 */
@injectable()
export class ScopeIdentifiersTransformer extends AbstractNodeTransformer {
    /**
     * @type {string}
     */
    private static readonly argumentsVariableName: string = 'arguments';

    /**
     * @type {string[]}
     */
    private static readonly globalScopeNames: string[] = [
        'global',
        'module'
    ];

    /**
     * @type {IIdentifierObfuscatingReplacer}
     */
    private readonly identifierObfuscatingReplacer: IIdentifierObfuscatingReplacer;

    /**
     * @type {Map<TNodeWithLexicalScope, boolean>}
     */
    private readonly lexicalScopesWithObjectPatternWithoutDeclarationMap: Map<TNodeWithLexicalScope, boolean> = new Map();

    /**
     * @type {IScopeAnalyzer}
     */
    private readonly scopeAnalyzer: IScopeAnalyzer;

    /**
     * @param {TIdentifierObfuscatingReplacerFactory} identifierObfuscatingReplacerFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IScopeAnalyzer} scopeAnalyzer
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)
            identifierObfuscatingReplacerFactory: TIdentifierObfuscatingReplacerFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IScopeAnalyzer) scopeAnalyzer: IScopeAnalyzer
    ) {
        super(randomGenerator, options);

        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(
            IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer
        );
        this.scopeAnalyzer = scopeAnalyzer;
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.Obfuscating:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isProgramNode(node)) {
                            this.analyzeNode(node, parentNode);

                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {Program} programNode
     * @param {Node | null} parentNode
     * @returns {Node}
     */
    public analyzeNode (programNode: ESTree.Program, parentNode: ESTree.Node | null): void {
        this.scopeAnalyzer.analyze(programNode);
    }

    /**
     * @param {VariableDeclaration} programNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (programNode: ESTree.Program, parentNode: ESTree.Node): ESTree.Node {
        const globalScope: eslintScope.Scope = this.scopeAnalyzer.acquireScope(programNode);

        this.traverseScopeVariables(globalScope);

        return programNode;
    }

    /**
     * @param {Scope} scope
     */
    private traverseScopeVariables (scope: eslintScope.Scope): void {
        const lexicalScope: eslintScope.Scope = scope.variableScope;
        const nodeWithLexicalScope: TNodeWithLexicalScope | null = NodeGuards.isNodeWithBlockLexicalScope(lexicalScope.block)
            ? lexicalScope.block
            : null;
        const isGlobalDeclaration: boolean = ScopeIdentifiersTransformer.globalScopeNames.includes(lexicalScope.type);

        if (!nodeWithLexicalScope) {
            return;
        }

        for (const variable of scope.variables) {
            if (variable.name === ScopeIdentifiersTransformer.argumentsVariableName) {
                continue;
            }

            if (!this.options.renameGlobals && isGlobalDeclaration) {
                const isImportBindingOrCatchClauseIdentifier: boolean = variable.defs
                    .every((definition: eslintScope.Definition) =>
                        definition.type === 'ImportBinding'
                        || definition.type === 'CatchClause'
                    );

                // skip all global identifiers except import statement and catch clause parameter identifiers
                if (!isImportBindingOrCatchClauseIdentifier) {
                    continue;
                }
            }

            this.transformScopeVariableIdentifiers(variable, nodeWithLexicalScope, isGlobalDeclaration);
        }

        for (const childScope of scope.childScopes) {
            this.traverseScopeVariables(childScope);
        }
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
        for (const identifier of variable.identifiers) {
            if (!this.isReplaceableIdentifierNode(identifier, lexicalScopeNode, variable)) {
                continue;
            }

            this.storeIdentifierName(identifier, lexicalScopeNode, isGlobalDeclaration);
            this.replaceIdentifierName(identifier, lexicalScopeNode, variable);
        }
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
            this.identifierObfuscatingReplacer.storeGlobalName(identifierNode, lexicalScopeNode);
        } else {
            this.identifierObfuscatingReplacer.storeLocalName(identifierNode, lexicalScopeNode);
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
        const newIdentifier: ESTree.Identifier = this.identifierObfuscatingReplacer
            .replace(identifierNode, lexicalScopeNode);

        identifierNode.name = newIdentifier.name;

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
    private isReplaceableIdentifierNode (
        identifierNode: ESTree.Identifier,
        lexicalScopeNode: TNodeWithLexicalScope,
        variable: eslintScope.Variable
    ): identifierNode is ESTree.Identifier & { parentNode: ESTree.Node } {
        const parentNode: ESTree.Node | undefined = identifierNode.parentNode;

        return !!parentNode
            && !NodeMetadata.isIgnoredNode(identifierNode)
            && !this.isProhibitedPropertyNode(identifierNode, parentNode)
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
    private isProhibitedPropertyNode (node: ESTree.Node, parentNode: ESTree.Node): node is ESTree.Identifier {
        const isProhibitedPropertyIdentifier = NodeGuards.isPropertyNode(parentNode)
            && !parentNode.computed
            && parentNode.key === node;
        const isProhibitedPropertyAssignmentPatternIdentifier = NodeGuards.isAssignmentPatternNode(parentNode)
            && parentNode.left === node
            && !!parentNode.parentNode
            && NodeGuards.isPropertyNode(parentNode.parentNode)
            && parentNode.left === parentNode.parentNode.key;

        return isProhibitedPropertyIdentifier
            || isProhibitedPropertyAssignmentPatternIdentifier;
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

                    const properties: ESTree.Property[] = node.properties;

                    for (const property of properties) {
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
