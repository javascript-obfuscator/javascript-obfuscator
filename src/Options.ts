import { IsBoolean, IsIn, IsInt, IsString, Min, Max, validateSync, ValidationError, ValidatorOptions } from 'class-validator';

import { IObfuscatorOptions } from "./interfaces/IObfuscatorOptions";
import { IOptions } from "./interfaces/IOptions";

import { TSourceMapMode } from "./types/TSourceMapMode";

import { DEFAULT_PRESET } from "./preset-options/DefaultPreset";

import { OptionsNormalizer } from "./OptionsNormalizer";

export class Options implements IOptions {
    /**
     * @type {ValidatorOptions}
     */
    private static validatorOptions: ValidatorOptions = {
        validationError: {
            target: false
        }
    };

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly compact: boolean;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly debugProtection: boolean;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly debugProtectionInterval: boolean;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly disableConsoleOutput: boolean;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly encodeUnicodeLiterals: boolean;

    /**
     * @type {string[]}
     */
    @IsString({
        each: true
    })
    public readonly reservedNames: string[];

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly rotateUnicodeArray: boolean;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly selfDefending: boolean;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly sourceMap: boolean;

    /**
     * @type {TSourceMapMode}
     */
    @IsIn(['inline', 'separate'])
    public readonly sourceMapMode: TSourceMapMode;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly unicodeArray: boolean;

    /**
     * @type {number}
     */
    @IsInt()
    @Min(0)
    @Max(1)
    public readonly unicodeArrayThreshold: number;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly wrapUnicodeArrayCalls: boolean;

    /**
     * @param obfuscatorOptions
     */
    constructor (obfuscatorOptions: IObfuscatorOptions) {
        Object.assign(this, Object.assign({}, DEFAULT_PRESET, obfuscatorOptions));

        let errors: ValidationError[] = validateSync(this, Options.validatorOptions);

        if (errors.length) {
            throw new ReferenceError(`Validation failed. errors:\n${Options.formatErrors(errors)}`);
        }

        Object.assign(this, OptionsNormalizer.normalizeOptions(this));
    }

    /**
     * @param validationErrors
     * @returns {string}
     */
    private static formatErrors(validationErrors: ValidationError[]): string {
        let errorsArray: string[] = [];

        for (let error of validationErrors) {
            let errorsString: string = `\`${error.property}\` errors:\n`;

            for (let constraint in error.constraints) {
                if (!error.constraints.hasOwnProperty(constraint)) {
                    continue;
                }

                errorsString += `    - ${error.constraints[constraint]}\n`;
            }

            errorsArray.push(errorsString);
        }

        return errorsArray.join('\n');
    }
}
