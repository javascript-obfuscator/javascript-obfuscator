import { TCLISanitizer } from '../../types/cli/TCLISanitizer';

/**
 * @param {string} value
 * @returns {string[]}
 */
export const ArraySanitizer: TCLISanitizer = (value: string): string[] => {
    return value.split(',').map((string: string) => string.trim());
};
