import { TCLISanitizer } from '../../types/cli/TCLISanitizer';

import { ObfuscationTarget } from '../../enums/ObfuscationTarget';

/**
 * @param {string} value
 * @returns {string}
 */
export const ObfuscationTargetSanitizer: TCLISanitizer <string> = (value: string): string => {
    const isCorrectTarget: boolean = Object
        .keys(ObfuscationTarget)
        .some((key: string): boolean => {
            return ObfuscationTarget[<keyof typeof ObfuscationTarget>key] === value;
        });

    if (!isCorrectTarget) {
        throw new ReferenceError('Invalid value of `--target` option');
    }

    return value;
};
