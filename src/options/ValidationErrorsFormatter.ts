import { ValidationError } from 'class-validator';

import { TObject } from '../types/TObject';

export class ValidationErrorsFormatter {
    /**
     * @param {ValidationError[]} errors
     * @returns {string}
     */
    public static format (errors: ValidationError[]): string {
        return errors
            .reduce(
                (errorMessages: string[], error: ValidationError) => [
                    ...errorMessages,
                    ValidationErrorsFormatter.formatWithNestedConstraints(error)
                ],
                []
            )
            .join('\n');
    }

    /**
     * @param {ValidationError} error
     * @returns {string}
     */
    private static formatWithNestedConstraints (error: ValidationError): string {
        const constraints: TObject<string> = error.constraints;

        const rootError: string = `\`${error.property}\` errors:\n`;
        const nestedErrors: string = Object
            .keys(constraints)
            .map((constraint: string) => `    - ${constraints[constraint]}\n`)
            .join();

        return `${rootError}${nestedErrors}`;
    }
}
