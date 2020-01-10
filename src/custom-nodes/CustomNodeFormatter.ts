import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';
import format from 'string-template';

import { TObject } from '../types/TObject';
import { TStatement } from '../types/node/TStatement';

import { ICustomNodeFormatter } from '../interfaces/custom-nodes/ICustomNodeFormatter';
import { IPrevailingKindOfVariablesAnalyzer } from '../interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer';
import { NodeGuards } from '../node/NodeGuards';

@injectable()
export class CustomNodeFormatter implements ICustomNodeFormatter {
    /**
     * @type {IPrevailingKindOfVariablesAnalyzer}
     */
    private readonly prevailingKindOfVariablesAnalyzer: IPrevailingKindOfVariablesAnalyzer;

    constructor (
        @inject(ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer)
            prevailingKindOfVariablesAnalyzer: IPrevailingKindOfVariablesAnalyzer
    ) {
        this.prevailingKindOfVariablesAnalyzer = prevailingKindOfVariablesAnalyzer;
    }

    /**
     * @param {string} template
     * @param {TMapping} mapping
     * @returns {string}
     */
    public formatTemplate <TMapping extends TObject> (
        template: string,
        mapping: TMapping
    ): string {
        return format(template, mapping);
    }

    /**
     * @param {TStatement[]} statements
     * @returns {TStatement[]}
     */
    public formatStructure (statements: TStatement[]): TStatement[] {
        const prevailingKindOfVariables: ESTree.VariableDeclaration['kind'] =
            this.prevailingKindOfVariablesAnalyzer.getPrevailingKind();

        for (const statement of statements) {
            estraverse.traverse(statement, {
                enter: (node: ESTree.Node): estraverse.VisitorOption | void => {
                    if (!NodeGuards.isVariableDeclarationNode(node)) {
                        return;
                    }

                    if (prevailingKindOfVariables === 'var') {
                        node.kind = 'var';
                    }
                }
            });
        }

        return statements;
    }
}
