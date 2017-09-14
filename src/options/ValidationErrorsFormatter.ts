import { ValidationError } from 'class-validator';

export class ValidationErrorsFormatter {
    /**
     * @param {ValidationError[]} validationErrors
     * @returns {string}
     */
    public static format (validationErrors: ValidationError[]): string {
        const errorsArray: string[] = [];

        for (const error of validationErrors) {
            errorsArray.push(ValidationErrorsFormatter.formatError(error));
        }

        return errorsArray.join('\n');
    }

    /**
     * @param {ValidationError} validationError
     * @returns {string}
     */
    private static formatError (validationError: ValidationError): string {
        const constraints: {[type: string]: string} = validationError.constraints;

        let errorString: string = `\`${validationError.property}\` errors:\n`;

        for (const constraint in constraints) {
            if (!constraints.hasOwnProperty(constraint)) {
                continue;
            }

            errorString += `    - ${constraints[constraint]}\n`;
        }

        return errorString;
    }
}
