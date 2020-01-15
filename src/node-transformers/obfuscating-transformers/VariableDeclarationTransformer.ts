import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';
import * as estraverse from 'estraverse';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
import { NodeMetadata } from '../../node/NodeMetadata';
import { IdentifierObfuscatingReplacer } from '../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer';
import { IIdentifierObfuscatingReplacer } from '../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IIdentifierObfuscatingReplacer';
import { TIdentifierObfuscatingReplacerFactory } from '../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory';

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
     * @type {eslintScope.AnalysisOptions}
     */
    private static readonly eslintScopeOptions: eslintScope.AnalysisOptions = {
        ecmaVersion: 10,
        optimistic: true
    };

    /**
     * @type {acorn.Options['sourceType'][]}
     */
    private static readonly sourceTypes: acorn.Options['sourceType'][] = [
        'script',
        'module'
    ];

    /**
     * @type {eslintScope.ScopeManager | null}
     */
    private scopeManager: eslintScope.ScopeManager | null = null;

    private readonly identifierObfuscatingReplacer: IIdentifierObfuscatingReplacer;

    private readonly lexicalScopesWithObjectPatternWithoutDeclarationMap: Map<TNodeWithLexicalScope, boolean> = new Map();

    /**
     * @param {TIdentifierObfuscatingReplacerFactory} identifierObfuscatingReplacerFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
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
     * @param {ESTree.Node} node
     * @returns {boolean}
     */
    private static isProhibitedImportSpecifierNode (node: ESTree.Node): boolean {
        return NodeGuards.isImportSpecifierNode(node)
            && node.imported.name === node.local.name;
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
     * @param {Node} node
     * @param {Node | null} parentNode
     * @returns {Node}
     */
    public analyzeNode (node: ESTree.Node, parentNode: ESTree.Node | null): void | never {
        const sourceTypeLength: number = VariableDeclarationTransformer.sourceTypes.length;

        estraverse.replace(node, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node => {
                if (node.range) {
                    return node;
                }

                node.range = [0, 0];

                return node;
            }
        });

        for (let i: number = 0; i < sourceTypeLength; i++) {
            try {
                this.scopeManager = eslintScope.analyze(node, {
                    ...VariableDeclarationTransformer.eslintScopeOptions,
                    nodejsScope: this.options.target === ObfuscationTarget.Node,
                    sourceType: VariableDeclarationTransformer.sourceTypes[i]
                });

                return;
            } catch (error) {
                if (i < sourceTypeLength - 1) {
                    continue;
                }

                throw new Error(error);
            }
        }

        throw new Error(`Scope analyzing error`);
    }

    /**
     * @param {VariableDeclaration} programNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (programNode: ESTree.Program, parentNode: ESTree.Node): ESTree.Node {
        if (!this.scopeManager) {
            return programNode;
        }

        const scope: eslintScope.Scope | null = this.scopeManager.acquire(
            programNode,
            true
        );

        if (scope) {
            this.processScope(scope);
        }

        return programNode;
    }

    private processScope(scope: eslintScope.Scope): void {
        scope?.variables.forEach((variable: eslintScope.Variable) => {
            if (variable.name === 'arguments') {
                return;
            }

            const scope: eslintScope.Scope = (<any>variable).scope;
            const variableScope: eslintScope.Scope = (<any>variable).scope.variableScope;
            const isGlobalScope: boolean = variableScope.type === 'global'
                || variableScope.type === 'module';

            if (!this.options.renameGlobals && isGlobalScope) {
                const isImportBindingIdentifier: boolean = variable.defs.every((definition) => definition.type === 'ImportBinding');
                const isCatchClauseIdentifier: boolean = variable.defs.every((definition) => definition.type === 'CatchClause');

                // prevent renaming of import statement and catch clause global identifiers
                if (!isImportBindingIdentifier && !isCatchClauseIdentifier) {
                    return;
                }
            }

            variable.identifiers.forEach((identifier: ESTree.Identifier) => {
                if (NodeMetadata.isIgnoredNode(identifier)) {
                    return;
                }

                if (this.isReservedName(identifier.name)) {
                    return;
                }

                if (identifier.parentNode && !NodeGuards.isReplaceableIdentifierNode(identifier, identifier.parentNode)) {
                    return;
                }

                if (identifier.parentNode && VariableDeclarationTransformer.isProhibitedImportSpecifierNode(identifier.parentNode)) {
                    return;
                }

                if (this.isProhibitedVariableNameUsedInObjectPatternNode(variable, identifier, <any>scope.variableScope.block)) {
                    return;
                }

                let identifierName: string;

                if (
                    // prevent class name renaming twice for outer scope and for class scope
                    scope.type === 'class'
                    && identifier.parentNode
                    && NodeGuards.isClassDeclarationNode(identifier.parentNode)
                    && identifier.parentNode.id === identifier
                ) {
                    // keep class declaration name
                    identifierName = identifier.name;
                } else {
                    isGlobalScope
                        ? this.identifierObfuscatingReplacer.storeGlobalName(
                            identifier,
                            <TNodeWithLexicalScope>variableScope.block
                        )
                        : this.identifierObfuscatingReplacer.storeLocalName(
                            identifier,
                            <TNodeWithLexicalScope>variableScope.block
                        );

                    const newIdentifierNode: ESTree.Identifier = this.identifierObfuscatingReplacer.replace(
                        identifier,
                        <TNodeWithLexicalScope>variableScope.block
                    );

                    identifier.name = newIdentifierNode.name;
                    identifierName = identifier.name;
                }

                // rename of function default parameter identifiers
                (<any>variable).scope.block.defaults?.forEach((node: ESTree.Node) => {
                    if (NodeGuards.isIdentifierNode(node) && node.name === variable.name) {
                        node.name = identifierName;
                    }
                });

                // rename of references
                variable.references.forEach((reference: eslintScope.Reference) => {
                    reference.identifier.name = identifierName;
                });
            });
        });

        for (const childScope of scope.childScopes) {
            this.processScope(childScope);
        }
    }

    /**
     * Should not rename identifiers that used inside destructing assignment without declaration
     *
     * var a, b; // should not be renamed
     * ({a, b} = {a: 1, b: 2});
     *
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {VariableDeclaration} hostVariableDeclarationNode
     * @returns {boolean}
     */
    private isProhibitedVariableNameUsedInObjectPatternNode (
        variable: eslintScope.Variable,
        identifierNode: ESTree.Identifier,
        lexicalScopeNode: TNodeWithLexicalScope
    ): boolean {
        const hasVarDefinitions: boolean = variable.defs.some((definition) => (<any>definition).kind === 'var');

        if (!hasVarDefinitions) {
            return false;
        }

        let isLexicalScopeHasObjectPatternWithoutDeclaration: boolean | undefined =
            this.lexicalScopesWithObjectPatternWithoutDeclarationMap.get(lexicalScopeNode);

        // lexical scope was traversed before and object pattern without declaration was not found
        if (isLexicalScopeHasObjectPatternWithoutDeclaration === false) {
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

    /**
     * @param {string} name
     * @returns {boolean}
     */
    private isReservedName (name: string): boolean {
        if (!this.options.reservedNames.length) {
            return false;
        }

        return this.options.reservedNames
            .some((reservedName: string) => {
                return new RegExp(reservedName, 'g').exec(name) !== null;
            });
    }
}
