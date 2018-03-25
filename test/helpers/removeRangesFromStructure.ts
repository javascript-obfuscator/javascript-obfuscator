import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TStatement } from '../../src/types/node/TStatement';

/**
 * @param {TStatement[]} structure
 * @returns {TStatement[]}
 */
export function removeRangesFromStructure (structure: TStatement[]): TStatement[] {
    for (const statement of structure) {
        estraverse.replace(statement, {
            enter: (node: ESTree.Node): ESTree.Node => {
                delete (<any>node).start;
                delete (<any>node).end;

                if (node.parentNode) {
                    delete (<any>node.parentNode).start;
                    delete (<any>node.parentNode).end;
                }

                return node;
            }
        });
    }

    return structure;
}