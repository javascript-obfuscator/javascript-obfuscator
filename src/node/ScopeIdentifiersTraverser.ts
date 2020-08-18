import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../types/node/TNodeWithLexicalScope';
import { TScopeIdentifiersTraverserCallback } from '../types/node/TScopeIdentifiersTraverserCallback';

import { IScopeAnalyzer } from '../interfaces/analyzers/scope-analyzer/IScopeAnalyzer';
import { IScopeIdentifiersTraverser } from '../interfaces/node/IScopeIdentifiersTraverser';
import { IScopeIdentifiersTraverserCallbackData } from '../interfaces/node/IScopeIdentifiersTraverserCallbackData';
import { IScopeThroughIdentifiersTraverserCallbackData } from '../interfaces/node/IScopeThroughIdentifiersTraverserCallbackData';

import { NodeGuards } from './NodeGuards';

/**
 * Scope traverser
 */
@injectable()
export class ScopeIdentifiersTraverser implements IScopeIdentifiersTraverser {
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
     * @type {IScopeAnalyzer}
     */
    private readonly scopeAnalyzer: IScopeAnalyzer;

    /**
     * @param {IScopeAnalyzer} scopeAnalyzer
     */
    public constructor (
        @inject(ServiceIdentifiers.IScopeAnalyzer) scopeAnalyzer: IScopeAnalyzer
    ) {
        this.scopeAnalyzer = scopeAnalyzer;
    }

    /**
     * @param {Program} programNode
     * @param {Node | null} parentNode
     * @param {TScopeIdentifiersTraverserCallback<IScopeIdentifiersTraverserCallbackData>} callback
     */
    public traverseScopeIdentifiers (
        programNode: ESTree.Program,
        parentNode: ESTree.Node | null,
        callback: TScopeIdentifiersTraverserCallback<IScopeIdentifiersTraverserCallbackData>
    ): void {
        this.scopeAnalyzer.analyze(programNode);

        const globalScope: eslintScope.Scope = this.scopeAnalyzer.acquireScope(programNode);

        this.traverseScopeIdentifiersRecursive(globalScope, globalScope, callback);
    }

    /**
     * @param {Program} programNode
     * @param {Node | null} parentNode
     * @param {TScopeIdentifiersTraverserCallback<IScopeThroughIdentifiersTraverserCallbackData>} callback
     */
    public traverseScopeThroughIdentifiers (
        programNode: ESTree.Program,
        parentNode: ESTree.Node | null,
        callback: TScopeIdentifiersTraverserCallback<IScopeThroughIdentifiersTraverserCallbackData>
    ): void {
        this.scopeAnalyzer.analyze(programNode);

        const globalScope: eslintScope.Scope = this.scopeAnalyzer.acquireScope(programNode);

        this.traverseScopeThroughIdentifiersRecursive(globalScope, globalScope, callback);
    }

    /**
     * @param {Scope} rootScope
     * @param {Scope} currentScope
     * @param {TScopeIdentifiersTraverserCallback<IScopeIdentifiersTraverserCallbackData>} callback
     */
    private traverseScopeIdentifiersRecursive (
        rootScope: eslintScope.Scope,
        currentScope: eslintScope.Scope,
        callback: TScopeIdentifiersTraverserCallback<IScopeIdentifiersTraverserCallbackData>
    ): void {
        const variableScope: eslintScope.Scope = currentScope.variableScope;
        const variableLexicalScopeNode: TNodeWithLexicalScope | null = NodeGuards.isNodeWithBlockLexicalScope(variableScope.block)
            ? variableScope.block
            : null;
        const isGlobalDeclaration: boolean = ScopeIdentifiersTraverser.globalScopeNames.includes(variableScope.type);

        if (!variableLexicalScopeNode) {
            return;
        }

        for (const variable of currentScope.variables) {
            if (variable.name === ScopeIdentifiersTraverser.argumentsVariableName) {
                continue;
            }

            const isBubblingDeclaration: boolean = variable
                .identifiers
                .some((identifier: ESTree.Node) =>
                    identifier.parentNode
                    && NodeGuards.isPropertyNode(identifier.parentNode)
                    && identifier.parentNode.shorthand
                );

            callback({
                isGlobalDeclaration,
                isBubblingDeclaration,
                rootScope,
                variable,
                variableScope,
                variableLexicalScopeNode
            });
        }

        for (const childScope of currentScope.childScopes) {
            this.traverseScopeIdentifiersRecursive(rootScope, childScope, callback);
        }
    }

    /**
     * @param {Scope} rootScope
     * @param {Scope} currentScope
     * @param {TScopeIdentifiersTraverserCallback<IScopeThroughIdentifiersTraverserCallbackData>} callback
     */
    private traverseScopeThroughIdentifiersRecursive (
        rootScope: eslintScope.Scope,
        currentScope: eslintScope.Scope,
        callback: TScopeIdentifiersTraverserCallback<IScopeThroughIdentifiersTraverserCallbackData>
    ): void {
        const variableScope: eslintScope.Scope = currentScope.variableScope;
        const variableLexicalScopeNode: TNodeWithLexicalScope | null = NodeGuards.isNodeWithBlockLexicalScope(variableScope.block)
            ? variableScope.block
            : null;

        if (!variableLexicalScopeNode) {
            return;
        }

        for (const reference of currentScope.through) {
            callback({
                reference,
                variableLexicalScopeNode
            });
        }

        for (const childScope of currentScope.childScopes) {
            this.traverseScopeThroughIdentifiersRecursive(rootScope, childScope, callback);
        }
    }
}
