import {
    ArrayUnique,
    IsBoolean,
    IsArray,
    IsIn,
    IsNumber,
    IsString,
    IsUrl,
    Min,
    Max,
    ValidateIf,
    validateSync,
    ValidationError,
    ValidatorOptions
} from 'class-validator';

import { IObfuscatorOptions } from 'app/interfaces/IObfuscatorOptions';
import { IOptions } from 'app/interfaces/IOptions';

import { TSourceMapMode } from 'app/types/TSourceMapMode';

import { DEFAULT_PRESET } from 'app/preset-options/DefaultPreset';

import { OptionsNormalizer } from './OptionsNormalizer';
import { ValidationErrorsFormatter } from './ValidationErrorsFormatter';

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
     * @type {string[]}
     */
    @IsArray()
    @ArrayUnique()
    @IsString({
        each: true
    })
    public readonly domainLock: string[];

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly encodeUnicodeLiterals: boolean;

    /**
     * @type {string[]}
     */
    @IsArray()
    @ArrayUnique()
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
     * @type {string}
     */
    @IsString()
    @ValidateIf((options: IOptions) => Boolean(options.sourceMapBaseUrl))
    @IsUrl({
        require_protocol: false,
        require_valid_protocol: true
    })
    public readonly sourceMapBaseUrl: string;

    /**
     * @type {string}
     */
    @IsString()
    public readonly sourceMapFileName: string;

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
    @IsNumber()
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
        Object.assign(this, DEFAULT_PRESET, obfuscatorOptions);

        let errors: ValidationError[] = validateSync(this, Options.validatorOptions);

        if (errors.length) {
            throw new ReferenceError(`Validation failed. errors:\n${ValidationErrorsFormatter.format(errors)}`);
        }

        Object.assign(this, OptionsNormalizer.normalizeOptions(this));
    }
}
