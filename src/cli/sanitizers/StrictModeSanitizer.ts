import { TCLISanitizer } from '../../types/cli/TCLISanitizer';

/**
 * @param {string} value
 * @returns {boolean | null}
 */
export const StrictModeSanitizer: TCLISanitizer<boolean | null> = (value: string): boolean | null => {
    if (value === 'null') {
        return null;
    }

    return value === 'true' || value === '1';
};
