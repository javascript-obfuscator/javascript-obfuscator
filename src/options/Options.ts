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
import { TOptionsPreset } from '../types/options/TOptionsPreset';
import { TStringArrayEncoding } from '../types/options/TStringArrayEncoding';
import { TStringArrayWrappersType } from '../types/options/TStringArrayWrappersType';
import { TTypeFromEnum } from '../types/utils/TTypeFromEnum';

import { IOptions } from '../interfaces/options/IOptions';
import { IOptionsNormalizer } from '../interfaces/options/IOptionsNormalizer';

import { IdentifierNamesGenerator } from '../enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { ObfuscationTarget } from '../enums/ObfuscationTarget';
import { OptionsPreset } from '../enums/options/presets/OptionsPreset';
import { SourceMapMode } from '../enums/source-map/SourceMapMode';
import { StringArrayEncoding } from '../enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { StringArrayWrappersType } from '../enums/node-transformers/string-array-transformers/StringArrayWrappersType';

import { DEFAULT_PRESET } from './presets/Default';
import { LOW_OBFUSCATION_PRESET } from './presets/LowObfuscation';
import { MEDIUM_OBFUSCATION_PRESET } from './presets/MediumObfuscation';
import { HIGH_OBFUSCATION_PRESET } from './presets/HighObfuscation';

import { ValidationErrorsFormatter } from './ValidationErrorsFormatter';
import { IsAllowedForObfuscationTargets } from './validators/IsAllowedForObfuscationTargets';

@injectable()
export class Options implements IOptions {
    /**
     * @type {Map<TOptionsPreset, TInputOptions>}
     */
    private static readonly optionPresetsMap: Map<TOptionsPreset, TInputOptions> = new Map([
        [OptionsPreset.Default, DEFAULT_PRESET],
        [OptionsPreset.LowObfuscation, LOW_OBFUSCATION_PRESET],
        [OptionsPreset.MediumObfuscation, MEDIUM_OBFUSCATION_PRESET],
        [OptionsPreset.HighObfuscation, HIGH_OBFUSCATION_PRESET]
    ]);

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
     * @type {string[]}
     */
    @IsArray()
    @ArrayUnique()
    @IsString({
        each: true
    })
    public readonly forceTransformStrings!: string[];

    /**
     * @type {IdentifierNamesGenerator}
     */
    @IsIn([
        IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator,
        IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
        IdentifierNamesGenerator.MangledIdentifierNamesGenerator,
        IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator
    ])
    public readonly identifierNamesGenerator!: TTypeFromEnum<typeof IdentifierNamesGenerator>;

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
    public readonly numbersToExpressions!: boolean;

    /**
     * @type {TOptionsPreset}
     */
    @IsIn([
        OptionsPreset.Default,
        OptionsPreset.LowObfuscation,
        OptionsPreset.MediumObfuscation,
        OptionsPreset.HighObfuscation
    ])
    public readonly optionsPreset!: TOptionsPreset;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly renameGlobals!: boolean;

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly renameProperties!: boolean;

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
    public readonly simplify!: boolean;

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
    public readonly sourceMapMode!: TTypeFromEnum<typeof SourceMapMode>;

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
     * @type {TStringArrayEncoding[]}
     */
    @IsArray()
    @ArrayUnique()
    @IsIn([StringArrayEncoding.None, StringArrayEncoding.Base64, StringArrayEncoding.Rc4], { each: true })
    public readonly stringArrayEncoding!: TStringArrayEncoding[];

    /**
     * @type {boolean}
     */
    @IsBoolean()
    public readonly stringArrayWrappersChainedCalls!: boolean;

    /**
     * @type {boolean}
     */
    @IsNumber()
    @Min(0)
    public readonly stringArrayWrappersCount!: number;

    /**
     * @type {TStringArrayWrappersType}
     */
    @IsIn([StringArrayWrappersType.Variable, StringArrayWrappersType.Function])
    public readonly stringArrayWrappersType!: TStringArrayWrappersType;

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
    public readonly target!: TTypeFromEnum<typeof ObfuscationTarget>;

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
     * @type {string | number}
     */
    public readonly seed!: string | number;

    /**
     * @param {TInputOptions} inputOptions
     * @param {IOptionsNormalizer} optionsNormalizer
     */
    public constructor (
        @inject(ServiceIdentifiers.TInputOptions) inputOptions: TInputOptions,
        @inject(ServiceIdentifiers.IOptionsNormalizer) optionsNormalizer: IOptionsNormalizer
    ) {
        const optionsPreset: TInputOptions = Options.getOptionsByPreset(
            inputOptions.optionsPreset ?? OptionsPreset.Default
        );

        Object.assign(this, optionsPreset, inputOptions);

        const errors: ValidationError[] = validateSync(this, Options.validatorOptions);

        if (errors.length) {
            throw new ReferenceError(`Validation failed. errors:\n${ValidationErrorsFormatter.format(errors)}`);
        }

        Object.assign(this, optionsNormalizer.normalize(this));
    }

    /**
     * @param {TOptionsPreset} optionsPreset
     * @returns {TInputOptions}
     */
    public static getOptionsByPreset (optionsPreset: TOptionsPreset): TInputOptions {
        const options: TInputOptions | null = Options.optionPresetsMap.get(optionsPreset) ?? null;

        if (!options) {
            throw new Error(`Options for preset name \`${optionsPreset}\` are not found`);
        }

        return options;
    }
}
