import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';

import { IAnalyzer } from '../IAnalyzer';

export interface IScopeAnalyzer extends IAnalyzer<void> {
    /**
     * @param {Program} astTree
     */
    analyze (astTree: ESTree.Node): void;

    /**
     * @param {Node} node
     * @returns {Scope}
     */
    acquireScope (node: ESTree.Node): eslintScope.Scope;
}
