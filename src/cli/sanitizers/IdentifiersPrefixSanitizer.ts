import { TCLISanitizer } from '../../types/cli/TCLISanitizer';

/**
 * @param {string} value
 * @returns {string | boolean}
 * @constructor
 */
export const IdentifiersPrefixSanitizer: TCLISanitizer = (value: string): string | boolean => {
    switch (value) {
        case 'true':
        case '1':
            return true;

        case 'false':
        case '0':
            return false;

        default:
            return value;
    }
};
