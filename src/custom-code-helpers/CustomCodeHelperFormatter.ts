import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';
import format from 'string-template';

import { TDictionary } from '../types/TDictionary';
import { TStatement } from '../types/node/TStatement';

import { ICustomCodeHelperFormatter } from '../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IPrevailingKindOfVariablesAnalyzer } from '../interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer';

import { NodeGuards } from '../node/NodeGuards';

@injectable()
export class CustomCodeHelperFormatter implements ICustomCodeHelperFormatter {
    /**
     * @type {ESTree.VariableDeclaration['kind']}
     */
    private readonly prevailingKindOfVariables: ESTree.VariableDeclaration['kind'];

    public constructor (
        @inject(ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer)
            prevailingKindOfVariablesAnalyzer: IPrevailingKindOfVariablesAnalyzer
    ) {
        this.prevailingKindOfVariables = prevailingKindOfVariablesAnalyzer.getPrevailingKind();
    }

    /**
     * @param {string} template
     * @param {TMapping} mapping
     * @returns {string}
     */
    public formatTemplate <TMapping extends TDictionary> (
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
        for (const statement of statements) {
            estraverse.replace(statement, {
                enter: (node: ESTree.Node): ESTree.Node | void => {
                    if (!NodeGuards.isVariableDeclarationNode(node)) {
                        return;
                    }

                    if (this.prevailingKindOfVariables === 'var') {
                        node.kind = 'var';
                    }

                    return node;
                }
            });
        }

        return statements;
    }
}
