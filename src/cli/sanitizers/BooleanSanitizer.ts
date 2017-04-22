import { TCLISanitizer } from '../../types/cli/TCLISanitizer';

export const BooleanSanitizer: TCLISanitizer = (value: string): boolean => {
    return value === 'true' || value === '1';
};
