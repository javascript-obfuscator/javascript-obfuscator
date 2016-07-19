import { ValidationError } from 'class-validator';

export class ValidationErrorsFormatter {
    /**
     * @param validationErrors
     * @returns {string}
     */
    public static format (validationErrors: ValidationError[]): string {
        let errorsArray: string[] = [];

        for (let error of validationErrors) {
            errorsArray.push(ValidationErrorsFormatter.formatError(error));
        }

        return errorsArray.join('\n');
    }

    /**
     * @param validationError
     * @returns {string}
     */
    private static formatError (validationError: ValidationError): string {
        let errorString: string = `\`${validationError.property}\` errors:\n`,
            constraints: {[type: string]: string} = validationError.constraints;

        for (let constraint in constraints) {
            if (!constraints.hasOwnProperty(constraint)) {
                continue;
            }

            errorString += `    - ${constraints[constraint]}\n`;
        }

        return errorString;
    }
}
