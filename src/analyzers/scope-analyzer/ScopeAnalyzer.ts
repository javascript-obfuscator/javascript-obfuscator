import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as eslintScope from 'eslint-scope';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IScopeAnalyzer } from '../../interfaces/analyzers/scope-analyzer/IScopeAnalyzer';

import { ObfuscationTarget } from '../../enums/ObfuscationTarget';

import { NodeGuards } from '../../node/NodeGuards';

@injectable()
export class ScopeAnalyzer implements IScopeAnalyzer {
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
     * @type {number}
     */
    private static readonly emptyRangeValue: number = 0;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {eslintScope.ScopeManager | null}
     */
    private scopeManager: eslintScope.ScopeManager | null = null;

    /**
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.options = options;
    }

    /**
     * `eslint-scope` reads `ranges` property of a nodes
     * Should attach that property to the some custom nodes
     *
     * @param {Node} astTree
     */
    private static attachMissingRanges (astTree: ESTree.Node): void {
        estraverse.replace(astTree, {
            enter: (node: ESTree.Node): ESTree.Node => {
                if (!node.range) {
                    node.range = [
                        ScopeAnalyzer.emptyRangeValue,
                        ScopeAnalyzer.emptyRangeValue
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
                    nodejsScope: this.options.target === ObfuscationTarget.Node,
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

        throw new Error(`Scope analyzing error`);
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

        return scope;
    }
}
