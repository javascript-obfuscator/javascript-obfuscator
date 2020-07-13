import * as ESTree from 'estree';

import { IAnalyzer } from '../IAnalyzer';

export interface IPrevailingKindOfVariablesAnalyzer extends IAnalyzer<[ESTree.Program], void> {
    /**
     * @param {Program} astTree
     */
    analyze (astTree: ESTree.Program): void;

    /**
     * @returns {ESTree.VariableDeclaration['kind']}
     */
    getPrevailingKind (): ESTree.VariableDeclaration['kind'];
}
