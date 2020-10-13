import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import equal from 'fast-deep-equal';

import { TTypeFromEnum } from '../../types/utils/TTypeFromEnum';

import { IOptions } from '../../interfaces/options/IOptions';

import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
import { StringSeparator } from '../../enums/StringSeparator';

import { DEFAULT_PRESET } from '../presets/Default';

/**
 * @param {TypeFromEnum<typeof ObfuscationTarget>[]} obfuscationTargets
 * @param {ValidationOptions} validationOptions
 * @returns {(options: IOptions, propertyName: keyof IOptions) => void}
 */
export function IsAllowedForObfuscationTargets (
    obfuscationTargets: TTypeFromEnum<typeof ObfuscationTarget>[],
    validationOptions?: ValidationOptions
): (options: IOptions, propertyName: keyof IOptions) => void {
    return (optionsObject: IOptions, propertyName: keyof IOptions): void => {
        registerDecorator({
            propertyName,
            constraints: [obfuscationTargets],
            name: 'IsAllowedForObfuscationTargets',
            options: validationOptions,
            target: optionsObject.constructor,
            validator: {
                /**
                 * @param value
                 * @param {ValidationArguments} validationArguments
                 * @returns {boolean}
                 */
                validate (value: IOptions[keyof IOptions], validationArguments: ValidationArguments): boolean {
                    const options: IOptions = <IOptions>validationArguments.object;
                    const defaultValue: IOptions[keyof IOptions] | undefined = DEFAULT_PRESET[propertyName];
                    const isDefaultValue: boolean = equal(value, defaultValue);

                    return isDefaultValue || obfuscationTargets.includes(options.target);
                },

                /**
                 * @param {ValidationArguments} validationArguments
                 * @returns {string}
                 */
                defaultMessage (validationArguments: ValidationArguments): string {
                    const requiredObfuscationTargetsString: string = obfuscationTargets.join(`${StringSeparator.Comma} `);

                    return `This option allowed only for obfuscation targets: ${requiredObfuscationTargetsString}`;
                }
            }
        });
    };
}
