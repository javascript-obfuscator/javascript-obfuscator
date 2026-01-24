import { injectable } from 'inversify';

import * as acorn from 'acorn';
import * as eslintScope from 'eslint-scope';
import * as estraverse from '@javascript-obfuscator/estraverse';
import { KEYS, VisitorKeys } from 'eslint-visitor-keys';
import * as ESTree from 'estree';

import { IScopeAnalyzer } from '../../interfaces/analyzers/scope-analyzer/IScopeAnalyzer';

import { ecmaVersion } from '../../constants/EcmaVersion';

import { NodeGuards } from '../../node/NodeGuards';

@injectable()
export class ScopeAnalyzer implements IScopeAnalyzer {
    /**
     * @type {eslintScope.AnalysisOptions}
     */
    private static readonly eslintScopeOptions: eslintScope.AnalysisOptions & {
        childVisitorKeys: VisitorKeys;
    } = {
        ecmaVersion,
        childVisitorKeys: KEYS,
        optimistic: true
    };

    /**
     * @type {acorn.Options['sourceType'][]}
     */
    private static readonly sourceTypes: acorn.Options['sourceType'][] = ['script', 'module'];

    /**
     * @type {number}
     */
    private static readonly emptyRangeValue: number = 0;

    /**
     * @type {eslintScope.ScopeManager | null}
     */
    private scopeManager: eslintScope.ScopeManager | null = null;

    /**
     * `eslint-scope` reads `ranges` property of a nodes
     * Should attach that property to the some custom nodes
     *
     * @param {Node} astTree
     */
    private static attachMissingRanges(astTree: ESTree.Node): void {
        estraverse.replace(astTree, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node => {
                if (!node.range) {
                    node.range = [
                        parentNode?.range?.[0] ?? ScopeAnalyzer.emptyRangeValue,
                        parentNode?.range?.[1] ?? ScopeAnalyzer.emptyRangeValue
                    ];
                }

                return node;
            }
        });
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    private static isRootNode(node: ESTree.Node): boolean {
        return NodeGuards.isProgramNode(node) || node.parentNode === node;
    }

    /**
     * @param {Program} astTree
     */
    public analyze(astTree: ESTree.Node): void {
        const sourceTypeLength: number = ScopeAnalyzer.sourceTypes.length;

        ScopeAnalyzer.attachMissingRanges(astTree);

        for (let i: number = 0; i < sourceTypeLength; i++) {
            try {
                this.scopeManager = eslintScope.analyze(astTree, {
                    ...ScopeAnalyzer.eslintScopeOptions,
                    sourceType: ScopeAnalyzer.sourceTypes[i]
                });

                // Fix Annex B function hoisting references
                // eslint-scope doesn't implement Annex B semantics where function declarations
                // in blocks also create a var-hoisted binding in the enclosing function scope
                this.fixAnnexBFunctionHoisting();

                return;
            } catch (error) {
                if (i < sourceTypeLength - 1) {
                    continue;
                }

                throw new Error(error);
            }
        }

        throw new Error('Scope analyzing error');
    }

    /**
     * @param {Node} node
     * @returns {Scope}
     */
    public acquireScope(node: ESTree.Node): eslintScope.Scope {
        if (!this.scopeManager) {
            throw new Error('Scope manager is not defined');
        }

        const scope: eslintScope.Scope | null = this.scopeManager.acquire(node, ScopeAnalyzer.isRootNode(node));

        if (!scope) {
            throw new Error('Cannot acquire scope for node');
        }

        this.sanitizeScopes(scope);

        return scope;
    }

    /**
     * Fix Annex B function hoisting references.
     *
     * In non-strict mode, function declarations in blocks have dual binding:
     * 1. A block-scoped binding (handled by eslint-scope)
     * 2. A var-hoisted binding in the enclosing function scope (NOT handled by eslint-scope)
     *
     * This method merges block-scoped function declarations into the enclosing
     * function scope and links unresolved references.
     */
    private fixAnnexBFunctionHoisting(): void {
        if (!this.scopeManager) {
            return;
        }

        this.walkScopes(this.scopeManager.globalScope, (scope: eslintScope.Scope) => {
            if (scope.type !== 'block' && scope.type !== 'switch') {
                return;
            }

            // Skip strict mode scopes - Annex B doesn't apply
            if (scope.isStrict) {
                return;
            }

            const functionScope = scope.variableScope;

            if (!functionScope) {
                return;
            }

            for (let i = scope.variables.length - 1; i >= 0; i--) {
                const variable = scope.variables[i];

                const isFunctionDeclaration = variable.defs.some(
                    (def) => def.type === 'FunctionName' && def.node?.type === 'FunctionDeclaration'
                );

                if (!isFunctionDeclaration) {
                    continue;
                }

                // Find existing variable with the same name in function scope (shadowing case)
                const outerVariable = functionScope.variables.find((v) => v.name === variable.name && v !== variable);

                // Per Annex B.3.3, hoisting only applies if outer binding is var/function (not let/const)
                const isOuterLetOrConst = outerVariable?.defs.some(
                    (def) => def.type === 'Variable' && (def.parent?.kind === 'let' || def.parent?.kind === 'const')
                );

                // Skip Annex B hoisting if there's a let/const with the same name
                if (isOuterLetOrConst) {
                    continue;
                }

                const targetVariable = outerVariable ?? variable;

                if (outerVariable) {
                    // Merge inner function's identifiers and references into outer
                    outerVariable.identifiers.push(...variable.identifiers);
                    outerVariable.references.push(...variable.references);
                } else {
                    // Move variable to function scope so references can find it
                    functionScope.variables.push(variable);
                }

                // Remove from block scope
                scope.variables.splice(i, 1);

                // Link "through" references with matching name to the target variable
                this.linkThroughReferences(variable.name, functionScope, targetVariable);
            }
        });
    }

    /**
     * Link unresolved "through" references to a variable.
     *
     * @param {string} name - The variable name to match
     * @param {Scope} scope - The scope to start searching from
     * @param {Variable} targetVariable - The variable to link references to
     */
    private linkThroughReferences(name: string, scope: eslintScope.Scope, targetVariable: eslintScope.Variable): void {
        for (let i = scope.through.length - 1; i >= 0; i--) {
            if (scope.through[i].identifier.name === name) {
                targetVariable.references.push(scope.through[i]);
                scope.through.splice(i, 1);
            }
        }

        for (const childScope of scope.childScopes) {
            this.linkThroughReferences(name, childScope, targetVariable);
        }
    }

    /**
     * @param {Scope} scope
     */
    private sanitizeScopes(scope: eslintScope.Scope): void {
        scope.childScopes.forEach((childScope: eslintScope.Scope) => {
            // fix of class scopes
            // trying to move class scope references to the parent scope
            if (childScope.type === 'class' && childScope.upper) {
                if (!childScope.variables.length) {
                    return;
                }

                // class name variable is always first
                const classNameVariable: eslintScope.Variable = childScope.variables[0];

                const upperVariable: eslintScope.Variable | undefined = childScope.upper.variables.find(
                    (variable: eslintScope.Variable) => {
                        const isValidClassNameVariable: boolean = classNameVariable.defs.some(
                            (definition: eslintScope.Definition) => definition.type === 'ClassName'
                        );

                        return isValidClassNameVariable && variable.name === classNameVariable.name;
                    }
                );

                upperVariable?.references.push(...childScope.variables[0].references);
            }
        });

        for (const childScope of scope.childScopes) {
            this.sanitizeScopes(childScope);
        }
    }

    /**
     * Walk through all scopes in the scope tree
     *
     * @param {Scope} scope - Starting scope
     * @param {Function} callback - Function to call for each scope
     */
    private walkScopes(scope: eslintScope.Scope, callback: (scope: eslintScope.Scope) => void): void {
        callback(scope);

        for (const childScope of scope.childScopes) {
            this.walkScopes(childScope, callback);
        }
    }
}
