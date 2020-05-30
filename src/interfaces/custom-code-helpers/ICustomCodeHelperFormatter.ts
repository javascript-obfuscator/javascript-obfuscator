import { TDictionary } from '../../types/TDictionary';
import { TStatement } from '../../types/node/TStatement';

export interface ICustomCodeHelperFormatter {
    /**
     * @param {string} template
     * @param {TMapping} mapping
     * @returns {string}
     */
    formatTemplate <TMapping extends TDictionary> (
        template: string,
        mapping: TMapping
    ): string;

    /**
     * @param {TStatement[]} structure
     * @returns {TStatement[]}
     */
    formatStructure (structure: TStatement[]): TStatement[];
}
