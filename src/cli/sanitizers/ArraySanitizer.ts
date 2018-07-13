import { TCLISanitizer } from '../../types/cli/TCLISanitizer';

/**
 * @param {string} value
 * @returns {string[]}
 */
export const ArraySanitizer: TCLISanitizer <string[]> = (value: string): string[] => {
    if (/,$/.test(value)) {
        throw new SyntaxError(`Multiple <list> values should be wrapped inside quotes: --option-name 'value1','value2'`);
    }

    return value.split(',').map((string: string) => string.trim());
};
