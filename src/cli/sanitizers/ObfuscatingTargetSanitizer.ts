import { TCLISanitizer } from '../../types/cli/TCLISanitizer';

import { ObfuscationTarget } from '../../enums/ObfuscationTarget';

/**
 * @param {string} value
 * @returns {string}
 */
export const ObfuscationTargetSanitizer: TCLISanitizer = (value: string): string => {
    const isCorrectTarget: boolean = Object
        .keys(ObfuscationTarget)
        .some((key: any): boolean => {
            return ObfuscationTarget[key] === value;
        });

    if (!isCorrectTarget) {
        throw new ReferenceError('Invalid value of `--target` option');
    }

    return value;
};
