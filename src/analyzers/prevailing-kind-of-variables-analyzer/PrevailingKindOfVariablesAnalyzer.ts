import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { IPrevailingKindOfVariablesAnalyzer } from '../../interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer';

import { NodeGuards } from '../../node/NodeGuards';

@injectable()
export class PrevailingKindOfVariablesAnalyzer implements IPrevailingKindOfVariablesAnalyzer {
    /**
     * @type {ESTree.VariableDeclaration['kind']}
     */
    private static readonly defaultKindOfVariables: ESTree.VariableDeclaration['kind'] = 'var';

    /**
     * @type {IArrayUtils}
     */
    private readonly arrayUtils: IArrayUtils;

    /**
     * @type {ESTree.VariableDeclaration['kind']}
     */
    private prevailingKindOfVariables: ESTree.VariableDeclaration['kind'] = PrevailingKindOfVariablesAnalyzer.defaultKindOfVariables;

    public constructor (
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils
    ) {
        this.arrayUtils = arrayUtils;
    }

    /**
     * @param {Program} astTree
     */
    public analyze (astTree: ESTree.Program): void {
        const variableKinds: ESTree.VariableDeclaration['kind'][] = [];

        estraverse.traverse(astTree, {
            enter: (node: ESTree.Node): estraverse.VisitorOption | void => {
                if (!NodeGuards.isVariableDeclarationNode(node)) {
                    return;
                }

                variableKinds.push(node.kind);
            }
        });

        this.prevailingKindOfVariables = this.arrayUtils.findMostOccurringElement(variableKinds)
            ?? PrevailingKindOfVariablesAnalyzer.defaultKindOfVariables;
    }

    /**
     * @returns {VariableDeclaration["kind"]}
     */
    public getPrevailingKind (): ESTree.VariableDeclaration['kind'] {
        return this.prevailingKindOfVariables;
    }
}
