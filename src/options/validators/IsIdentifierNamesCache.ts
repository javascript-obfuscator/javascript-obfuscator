import equal from 'fast-deep-equal';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

import { TIdentifierNamesCache } from '../../types/TIdentifierNamesCache';
import { TIdentifierNamesCacheDictionary } from '../../types/TIdentifierNamesCacheDictionary';

import { IOptions } from '../../interfaces/options/IOptions';

import { DEFAULT_PRESET } from '../presets/Default';

/**
 * @param value
 * @returns {boolean}
 */
const validateDictionary = (value: unknown | TIdentifierNamesCacheDictionary): boolean => {
    if (value === undefined) {
        return true;
    }

    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const objectValues: unknown[] = Object.values(value);

    if (!objectValues.length) {
        return true;
    }

    for (const objectValue of objectValues) {
        if (typeof objectValue !== 'string') {
            return false;
        }
    }

    return true;
};

/**
 * @param {ValidationOptions} validationOptions
 * @returns {(options: IOptions, propertyName: keyof IOptions) => void}
 */
export function IsIdentifierNamesCache (
    validationOptions?: ValidationOptions
): (options: IOptions, propertyName: keyof IOptions) => void {
    return (optionsObject: IOptions, propertyName: keyof IOptions): void => {
        registerDecorator({
            propertyName,
            constraints: [],
            name: 'IsIdentifierNamesCache',
            options: validationOptions,
            target: optionsObject.constructor,
            validator: {
                /**
                 * @param value
                 * @param {ValidationArguments} validationArguments
                 * @returns {boolean}
                 */
                validate (value: unknown, validationArguments: ValidationArguments): boolean {
                    const defaultValue: IOptions[keyof IOptions] | undefined = DEFAULT_PRESET[propertyName];
                    const isDefaultValue: boolean = equal(value, defaultValue);

                    if (isDefaultValue || value === null) {
                        return true;
                    }

                    if (typeof value !== 'object') {
                        return false;
                    }

                    if (!validateDictionary((<TIdentifierNamesCache>value)?.globalIdentifiers)) {
                        return false;
                    }

                    return validateDictionary((<TIdentifierNamesCache>value)?.propertyIdentifiers);
                },

                /**
                 * @returns {string}
                 */
                defaultMessage (): string {
                    return 'Passed value must be an identifier names cache object or `null` value';
                }
            }
        });
    };
}
