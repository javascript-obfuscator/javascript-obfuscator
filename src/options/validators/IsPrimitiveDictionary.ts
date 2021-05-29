import equal from 'fast-deep-equal';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

import { IOptions } from '../../interfaces/options/IOptions';

import { DEFAULT_PRESET } from '../presets/Default';

/**
 * @param {"string" | "number"} valuesType
 * @param {ValidationOptions} validationOptions
 * @returns {(options: IOptions, propertyName: keyof IOptions) => void}
 */
export function IsPrimitiveDictionary (
    valuesType: 'string' | 'number',
    validationOptions?: ValidationOptions
): (options: IOptions, propertyName: keyof IOptions) => void {
    return (optionsObject: IOptions, propertyName: keyof IOptions): void => {
        registerDecorator({
            propertyName,
            constraints: [valuesType],
            name: 'IsPrimitiveDictionary',
            options: validationOptions,
            target: optionsObject.constructor,
            validator: {
                /**
                 * @param value
                 * @param {ValidationArguments} validationArguments
                 * @returns {boolean}
                 */
                validate (value: IOptions[keyof IOptions], validationArguments: ValidationArguments): boolean {
                    const defaultValue: IOptions[keyof IOptions] | undefined = DEFAULT_PRESET[propertyName];
                    const isDefaultValue: boolean = equal(value, defaultValue);

                    if (isDefaultValue || value === null) {
                        return true;
                    }

                    if (typeof value !== 'object') {
                        return false;
                    }

                    const objectValues: unknown[] = Object.values<unknown>(value);

                    if (!objectValues.length) {
                        return true;
                    }

                    for (const objectValue of objectValues) {
                        if (typeof objectValue !== 'string') {
                            return false;
                        }
                    }

                    return true;
                },

                /**
                 * @returns {string}
                 */
                defaultMessage (): string {
                    return `Passed value must be a dictionary with \`${valuesType}\` values or \`null\` value`;
                }
            }
        });
    };
}
