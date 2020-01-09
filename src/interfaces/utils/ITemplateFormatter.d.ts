import { TObject } from '../../types/TObject';

export interface ITemplateFormatter {
    /**
     * @param {string} template
     * @param {TMapping} mapping
     * @returns {string}
     */
    format <TMapping extends TObject> (
        template: string,
        mapping: TMapping
    ): string;
}
