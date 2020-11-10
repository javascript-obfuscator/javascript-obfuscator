import { injectable, } from 'inversify';

import * as eslintScope from 'eslint-scope';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IScopeAnalyzer } from '../../interfaces/analyzers/scope-analyzer/IScopeAnalyzer';

import { ecmaVersion } from '../../constants/EcmaVersion';

import { NodeGuards } from '../../node/NodeGuards';

@injectable()
export class ScopeAnalyzer implements IScopeAnalyzer {
    /**
     * @type {eslintScope.AnalysisOptions}
     */
    private static readonly eslintScopeOptions: eslintScope.AnalysisOptions = {
        ecmaVersion,
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
    private static attachMissingRanges (astTree: ESTree.Node): void {
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
    private static isRootNode (node: ESTree.Node): boolean {
        return NodeGuards.isProgramNode(node) || node.parentNode === node;
    }

    /**
     * @param {Program} astTree
     */
    public analyze (astTree: ESTree.Node): void {
        const sourceTypeLength: number = ScopeAnalyzer.sourceTypes.length;

        ScopeAnalyzer.attachMissingRanges(astTree);

        for (let i: number = 0; i < sourceTypeLength; i++) {
            try {
                this.scopeManager = eslintScope.analyze(astTree, {
                    ...ScopeAnalyzer.eslintScopeOptions,
                    sourceType: ScopeAnalyzer.sourceTypes[i]
                });

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
    public acquireScope (node: ESTree.Node): eslintScope.Scope {
        if (!this.scopeManager) {
            throw new Error('Scope manager is not defined');
        }

        const scope: eslintScope.Scope | null = this.scopeManager.acquire(
            node,
            ScopeAnalyzer.isRootNode(node)
        );

        if (!scope) {
            throw new Error('Cannot acquire scope for node');
        }

        this.sanitizeScopes(scope);

        return scope;
    }

    /**
     * @param {Scope} scope
     */
    private sanitizeScopes (scope: eslintScope.Scope): void {
        scope.childScopes.forEach((childScope: eslintScope.Scope) => {
            // fix of class scopes
            // trying to move class scope references to the parent scope
            if (childScope.type === 'class' && childScope.upper) {
                if (!childScope.variables.length) {
                    return;
                }

                // class name variable is always first
                const classNameVariable: eslintScope.Variable = childScope.variables[0];

                const upperVariable: eslintScope.Variable | undefined = childScope.upper.variables
                    .find((variable: eslintScope.Variable) => {
                        const isValidClassNameVariable: boolean = classNameVariable.defs
                            .some((definition: eslintScope.Definition) => definition.type === 'ClassName');

                        return isValidClassNameVariable && variable.name === classNameVariable.name;
                    });

                upperVariable?.references.push(...childScope.variables[0].references);
            }
        });

        for (const childScope of scope.childScopes) {
            this.sanitizeScopes(childScope);
        }
    }
}
