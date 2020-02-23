import { TInputOptions } from '../../types/options/TInputOptions';

export interface ICustomCodeHelperObfuscator {
    /**
     * @param {string} template
     * @param {TInputOptions} additionalOptions
     * @returns {string}
     */
    obfuscateTemplate (template: string, additionalOptions?: TInputOptions): string;
}
