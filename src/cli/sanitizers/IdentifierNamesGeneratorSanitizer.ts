import { TCLISanitizer } from '../../types/cli/TCLISanitizer';

import { IdentifierNamesGenerator } from '../../enums/generators/identifier-names-generators/IdentifierNamesGenerator';

/**
 * @param {string} value
 * @returns {string}
 */
export const IdentifierNamesGeneratorSanitizer: TCLISanitizer <string> = (value: string): string => {
    const isCorrectIdentifierNamesGenerator: boolean = Object
        .keys(IdentifierNamesGenerator)
        .some((key: string): boolean => {
            return IdentifierNamesGenerator[<keyof typeof IdentifierNamesGenerator>key] === value;
        });

    if (!isCorrectIdentifierNamesGenerator) {
        throw new ReferenceError('Invalid value of `--identifier-names-generator` option');
    }

    return value;
};
