import { injectable } from 'inversify';

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

import { TInputOptions } from '../types/options/TInputOptions';

import { IOptions } from '../interfaces/options/IOptions';

import { TSourceMapMode } from '../types/TSourceMapMode';
import { TStringArrayEncoding } from '../types/options/TStringArrayEncoding';

import { DEFAULT_PRESET } from './presets/Default';

import { OptionsNormalizer } from './OptionsNormalizer';
import { ValidationErrorsFormatter } from './ValidationErrorsFormatter';

@injectable()
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
    public readonly controlFlowFlattening: boolean;

    /**
     * @type {boolean}
     */
    @IsNumber()
    @Min(0)
    @Max(1)
    public readonly controlFlowFlatteningThreshold: number;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly deadCodeInjection: boolean;

    /**
     * @type {number}
     */
    @IsNumber()
    public readonly deadCodeInjectionThreshold: number;

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
    public readonly mangle: boolean;

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
    public readonly rotateStringArray: boolean;

    /**
     * @type {number}
     */
    @IsNumber()
    public readonly seed: number;

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
        require_protocol: true,
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
    public readonly stringArray: boolean;

    /**
     * @type {TStringArrayEncoding}
     */
    @IsIn([true, false, 'base64', 'rc4'])
    public readonly stringArrayEncoding: TStringArrayEncoding;

    /**
     * @type {number}
     */
    @IsNumber()
    @Min(0)
    @Max(1)
    public readonly stringArrayThreshold: number;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly unicodeEscapeSequence: boolean;

    /**
     * @param {TInputOptions} inputOptions
     */
    constructor (inputOptions: TInputOptions) {
        Object.assign(this, DEFAULT_PRESET, inputOptions);

        const errors: ValidationError[] = validateSync(this, Options.validatorOptions);

        if (errors.length) {
            throw new ReferenceError(`Validation failed. errors:\n${ValidationErrorsFormatter.format(errors)}`);
        }

        Object.assign(this, OptionsNormalizer.normalizeOptions(this));
    }
}
