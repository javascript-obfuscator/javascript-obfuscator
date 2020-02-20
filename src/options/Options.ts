import { TypeFromEnum } from '@gradecam/tsenum';

import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import {
    ArrayNotEmpty,
    ArrayUnique,
    IsArray,
    IsBoolean,
    IsIn,
    IsNumber,
    IsString,
    IsUrl,
    Max,
    Min,
    ValidateIf,
    validateSync,
    ValidationError,
    ValidatorOptions
} from 'class-validator';

import { TInputOptions } from '../types/options/TInputOptions';
import { TStringArrayEncoding } from '../types/options/TStringArrayEncoding';

import { IOptions } from '../interfaces/options/IOptions';
import { IOptionsNormalizer } from '../interfaces/options/IOptionsNormalizer';

import { IdentifierNamesGenerator } from '../enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { ObfuscationTarget } from '../enums/ObfuscationTarget';
import { SourceMapMode } from '../enums/source-map/SourceMapMode';
import { StringArrayEncoding } from '../enums/StringArrayEncoding';

import { DEFAULT_PRESET } from './presets/Default';

import { ValidationErrorsFormatter } from './ValidationErrorsFormatter';
import { IsAllowedForObfuscationTargets } from './validators/IsAllowedForObfuscationTargets';

@injectable()
export class Options implements IOptions {
    /**
     * @type {ValidatorOptions}
     */
    private static readonly validatorOptions: ValidatorOptions = {
        validationError: {
            target: false
        }
    };

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly compact!: boolean;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly controlFlowFlattening!: boolean;

    /**
     * @type {boolean}
     */
    @IsNumber()
    @Min(0)
    @Max(1)
    public readonly controlFlowFlatteningThreshold!: number;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly deadCodeInjection!: boolean;

    /**
     * @type {number}
     */
    @IsNumber()
    public readonly deadCodeInjectionThreshold!: number;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly debugProtection!: boolean;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly debugProtectionInterval!: boolean;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly disableConsoleOutput!: boolean;

    /**
     * @type {string[]}
     */
    @IsArray()
    @ArrayUnique()
    @IsString({
        each: true
    })
    @IsAllowedForObfuscationTargets([
        ObfuscationTarget.Browser,
        ObfuscationTarget.BrowserNoEval,
    ])
    public readonly domainLock!: string[];

    /**
     * @type {IdentifierNamesGenerator}
     */
    @IsIn([
        IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
        IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
        IdentifierNamesGenerator.MangledIdentifierNamesGenerator
    ])
    public readonly identifierNamesGenerator!: TypeFromEnum<typeof IdentifierNamesGenerator>;

    /**
     * @type {string}
     */
    @IsString()
    public readonly identifiersPrefix!: string;

    @IsArray()
    @ArrayUnique()
    @IsString({
        each: true
    })
    @ValidateIf((options: IOptions) =>
        options.identifierNamesGenerator === IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator
    )
    @ArrayNotEmpty()
    public readonly identifiersDictionary!: string[];

    /**
     * @type {string}
     */
    @IsString()
    public readonly inputFileName!: string;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly log!: boolean;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly renameGlobals!: boolean;

    /**
     * @type {string[]}
     */
    @IsArray()
    @ArrayUnique()
    @IsString({
        each: true
    })
    public readonly reservedNames!: string[];

    /**
     * @type {string[]}
     */
    @IsArray()
    @ArrayUnique()
    @IsString({
        each: true
    })
    public readonly reservedStrings!: string[];

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly rotateStringArray!: boolean;

    /**
     * @type {string | number}
     */
    public readonly seed!: string | number;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly selfDefending!: boolean;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly shuffleStringArray!: boolean;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly sourceMap!: boolean;

    /**
     * @type {string}
     */
    @IsString()
    @ValidateIf((options: IOptions) => Boolean(options.sourceMapBaseUrl))
    @IsUrl({
        require_protocol: true,
        require_tld: false,
        require_valid_protocol: true
    })
    public readonly sourceMapBaseUrl!: string;

    /**
     * @type {string}
     */
    @IsString()
    public readonly sourceMapFileName!: string;

    /**
     * @type {SourceMapMode}
     */
    @IsIn([SourceMapMode.Inline, SourceMapMode.Separate])
    public readonly sourceMapMode!: TypeFromEnum<typeof SourceMapMode>;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly splitStrings!: boolean;

    /**
     * @type {number}
     */
    @IsNumber()
    @ValidateIf((options: IOptions) => Boolean(options.splitStrings))
    @Min(1)
    public readonly splitStringsChunkLength!: number;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly stringArray!: boolean;

    /**
     * @type {TStringArrayEncoding}
     */
    @IsIn([true, false, StringArrayEncoding.Base64, StringArrayEncoding.Rc4])
    public readonly stringArrayEncoding!: TStringArrayEncoding;

    /**
     * @type {number}
     */
    @IsNumber()
    @Min(0)
    @Max(1)
    public readonly stringArrayThreshold!: number;

    /**
     * @type {ObfuscationTarget}
     */
    @IsIn([ObfuscationTarget.Browser, ObfuscationTarget.BrowserNoEval, ObfuscationTarget.Node])
    public readonly target!: TypeFromEnum<typeof ObfuscationTarget>;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly transformObjectKeys!: boolean;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly unicodeEscapeSequence!: boolean;

    /**
     * @param {TInputOptions} inputOptions
     * @param {IOptionsNormalizer} optionsNormalizer
     */
    public constructor (
        @inject(ServiceIdentifiers.TInputOptions) inputOptions: TInputOptions,
        @inject(ServiceIdentifiers.IOptionsNormalizer) optionsNormalizer: IOptionsNormalizer
    ) {
        Object.assign(this, DEFAULT_PRESET, inputOptions);

        const errors: ValidationError[] = validateSync(this, Options.validatorOptions);

        if (errors.length) {
            throw new ReferenceError(`Validation failed. errors:\n${ValidationErrorsFormatter.format(errors)}`);
        }

        Object.assign(this, optionsNormalizer.normalize(this));
    }
}
