import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as eslintScope from 'eslint-scope';
import * as espree from 'espree';
import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
import { NodeGuards } from '../../node/NodeGuards';

/**
 * Analyzes scopes of nodes and attaches it to the `scope` property of the node.
 */
@injectable()
export class ScopeTransformer extends AbstractNodeTransformer {
    /**
     * @type {eslintScope.AnalysisOptions}
     */
    private static readonly eslintScopeOptions: eslintScope.AnalysisOptions = {
        ecmaVersion: 7,
        optimistic: true
    };

    /**
     * @type {espree.SourceType[]}
     */
    private static readonly sourceTypes: espree.SourceType[] = [
        'script',
        'module'
    ];

    /**
     * @type {eslintScope.ScopeManager | null}
     */
    private scopeManager: eslintScope.ScopeManager | null = null;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * Port from eslint
     * https://github.com/eslint/eslint/blob/41f0f6e3380b673edbb6c39d9d144c375ad2ebbc/lib/linter.js#L633
     *
     * @param {eslintScope.ScopeManager} scopeManager
     * @param {Node} targetNode
     * @returns {eslintScope.Scope}
     */
    private static getScope (scopeManager: eslintScope.ScopeManager, targetNode: ESTree.Node): eslintScope.Scope {
        const isInnerNode: boolean = NodeGuards.isProgramNode(targetNode);

        for (let node: ESTree.Node | undefined = targetNode; node; node = (<ESTree.Node>node).parentNode) {
            if (!node.parentNode) {
                throw new Error('`parentNode` property of given node is `undefined`');
            }

            const scope: eslintScope.Scope | null = scopeManager.acquire(node, isInnerNode);

            if (!scope) {
                continue;
            }

            if (scope.type === "function-expression-name") {
                return scope.childScopes[0];
            }

            return scope;
        }

        return scopeManager.scopes[0];
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        if (transformationStage !== TransformationStage.Preparing) {
            return null;
        }

        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                if (NodeGuards.isProgramNode(node)) {
                    this.analyzeNode(node, parentNode);
                }

                return this.transformNode(node, parentNode);
            }
        };
    }

    /**
     * @param {Node} node
     * @param {Node | null} parentNode
     * @returns {Node}
     */
    public analyzeNode (node: ESTree.Node, parentNode: ESTree.Node | null): void | never {
        const sourceTypeLength: number = ScopeTransformer.sourceTypes.length;

        for (let i: number = 0; i < sourceTypeLength; i++) {
            try {
                this.scopeManager = eslintScope.analyze(node, {
                    ...ScopeTransformer.eslintScopeOptions,
                    nodejsScope: this.options.target === ObfuscationTarget.Node,
                    sourceType: ScopeTransformer.sourceTypes[i]
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
     * @param {Node | null} parentNode
     * @returns {Node}
     */
    public transformNode (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node {
        if (!this.scopeManager) {
            return node;
        }

        node.scope = ScopeTransformer.getScope(this.scopeManager, node);

        return node;
    }
}
