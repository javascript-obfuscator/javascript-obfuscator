import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../types/node/TNodeWithLexicalScope';
import { TScopeIdentifiersTraverserCallback } from '../types/node/TScopeIdentifiersTraverserCallback';

import { IScopeAnalyzer } from '../interfaces/analyzers/scope-analyzer/IScopeAnalyzer';
import { IScopeIdentifiersTraverser } from '../interfaces/node/IScopeIdentifiersTraverser';

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
     * @param {TScopeIdentifiersTraverserCallback} callback
     */
    public traverse (
        programNode: ESTree.Program,
        parentNode: ESTree.Node | null,
        callback: TScopeIdentifiersTraverserCallback
    ): void {
        this.scopeAnalyzer.analyze(programNode);

        const globalScope: eslintScope.Scope = this.scopeAnalyzer.acquireScope(programNode);

        this.traverseScopeVariables(globalScope, globalScope, callback);
    }

    /**
     * @param {Scope} rootScope
     * @param {Scope} currentScope
     * @param {TScopeIdentifiersTraverserCallback} callback
     */
    private traverseScopeVariables (
        rootScope: eslintScope.Scope,
        currentScope: eslintScope.Scope,
        callback: TScopeIdentifiersTraverserCallback
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
            this.traverseScopeVariables(rootScope, childScope, callback);
        }
    }
}
