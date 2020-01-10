import { TObject } from '../../types/TObject';
import { TStatement } from '../../types/node/TStatement';

export interface ICustomNodeFormatter {
    /**
     * @param {string} template
     * @param {TMapping} mapping
     * @returns {string}
     */
    formatTemplate <TMapping extends TObject> (
        template: string,
        mapping: TMapping
    ): string;

    /**
     * @param {TStatement[]} structure
     * @returns {TStatement[]}
     */
    formatStructure (structure: TStatement[]): TStatement[];
}
