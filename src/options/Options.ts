import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TIdentifierNamesCache } from '../types/TIdentifierNamesCache';
import { TInputOptions } from '../types/options/TInputOptions';
import { TOptionsPreset } from '../types/options/TOptionsPreset';
import { TRenamePropertiesMode } from '../types/options/TRenamePropertiesMode';
import { TStringArrayIndexesType } from '../types/options/TStringArrayIndexesType';
import { TStringArrayEncoding } from '../types/options/TStringArrayEncoding';
import { TStringArrayWrappersType } from '../types/options/TStringArrayWrappersType';
import { TTypeFromEnum } from '../types/utils/TTypeFromEnum';

import { IOptions } from '../interfaces/options/IOptions';
import { IOptionsNormalizer } from '../interfaces/options/IOptionsNormalizer';

import { IdentifierNamesGenerator } from '../enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { ObfuscationTarget } from '../enums/ObfuscationTarget';
import { OptionsPreset } from '../enums/options/presets/OptionsPreset';
import { SourceMapMode } from '../enums/source-map/SourceMapMode';
import { SourceMapSourcesMode } from '../enums/source-map/SourceMapSourcesMode';

import { DEFAULT_PRESET } from './presets/Default';
import { LOW_OBFUSCATION_PRESET } from './presets/LowObfuscation';
import { MEDIUM_OBFUSCATION_PRESET } from './presets/MediumObfuscation';
import { HIGH_OBFUSCATION_PRESET } from './presets/HighObfuscation';


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
     * @type {boolean}
     */
    public readonly compact!: boolean;

    /**
     * @type {boolean}
     */
    public readonly controlFlowFlattening!: boolean;

    /**
     * @type {boolean}
     */
    public readonly controlFlowFlatteningThreshold!: number;

    /**
     * @type {boolean}
     */
    public readonly deadCodeInjection!: boolean;

    /**
     * @type {number}
     */
    public readonly deadCodeInjectionThreshold!: number;

    /**
     * @type {boolean}
     */
    public readonly debugProtection!: boolean;

    /**
     * @type {number}
     */
    public readonly debugProtectionInterval!: number;

    /**
     * @type {boolean}
     */
    public readonly disableConsoleOutput!: boolean;

    /**
     * @type {string[]}
     */
    public readonly domainLock!: string[];

    /**
     * @type {string}
     */
    public readonly domainLockRedirectUrl!: string;

    /**
     * @type {string[]}
     */
    public readonly forceTransformStrings!: string[];

    /**
     * @type {TIdentifierNamesCache}
     */
    public readonly identifierNamesCache!: TIdentifierNamesCache;

    /**
     * @type {IdentifierNamesGenerator}
     */
    public readonly identifierNamesGenerator!: TTypeFromEnum<typeof IdentifierNamesGenerator>;

    /**
     * @type {string}
     */
    public readonly identifiersPrefix!: string;

    public readonly identifiersDictionary!: string[];

    /**
     * @type {boolean}
     */
    public readonly ignoreImports!: boolean;

    /**
     * @type {string}
     */
    public readonly inputFileName!: string;

    /**
     * @type {boolean}
     */
    public readonly log!: boolean;

    /**
     * @type {boolean}
     */
    public readonly numbersToExpressions!: boolean;

    /**
     * @type {TOptionsPreset}
     */
    public readonly optionsPreset!: TOptionsPreset;

    /**
     * @type {boolean}
     */
    public readonly renameGlobals!: boolean;

    /**
     * @type {boolean}
     */
    public readonly renameProperties!: boolean;

    /**
     * @type {RenamePropertiesMode}
     */
    public readonly renamePropertiesMode!: TRenamePropertiesMode;

    /**
     * @type {string[]}
     */
    public readonly reservedNames!: string[];

    /**
     * @type {string[]}
     */
    public readonly reservedStrings!: string[];

    /**
     * @type {boolean}
     */
    public readonly selfDefending!: boolean;

    /**
     * @type {boolean}
     */
    public readonly simplify!: boolean;

    /**
     * @type {boolean}
     */
    public readonly sourceMap!: boolean;

    /**
     * @type {string}
     */
    public readonly sourceMapBaseUrl!: string;

    /**
     * @type {string}
     */
    public readonly sourceMapFileName!: string;

    /**
     * @type {SourceMapMode}
     */
    public readonly sourceMapMode!: TTypeFromEnum<typeof SourceMapMode>;

    /**
     * @type {SourceMapSourcesMode}
     */
    public readonly sourceMapSourcesMode!: TTypeFromEnum<typeof SourceMapSourcesMode>;

    /**
     * @type {boolean}
     */
    public readonly splitStrings!: boolean;

    /**
     * @type {number}
     */
    public readonly splitStringsChunkLength!: number;

    /**
     * @type {boolean}
     */
    public readonly stringArray!: boolean;

    /**
     * @type {boolean}
     */
    public readonly stringArrayCallsTransform!: boolean;

    /**
     * @type {number}
     */
    public readonly stringArrayCallsTransformThreshold!: number;

    /**
     * @type {TStringArrayEncoding[]}
     */
    public readonly stringArrayEncoding!: TStringArrayEncoding[];

    /**
     * @type {TStringArrayIndexesType[]}
     */
    public readonly stringArrayIndexesType!: TStringArrayIndexesType[];

    /**
     * @type {boolean}
     */
    public readonly stringArrayIndexShift!: boolean;

    /**
     * @type {boolean}
     */
    public readonly stringArrayRotate!: boolean;

    /**
     * @type {boolean}
     */
    public readonly stringArrayShuffle!: boolean;

    /**
     * @type {boolean}
     */
    public readonly stringArrayWrappersChainedCalls!: boolean;

    /**
     * @type {boolean}
     */
    public readonly stringArrayWrappersCount!: number;

    /**
     * @type {boolean}
     */
    public readonly stringArrayWrappersParametersMaxCount!: number;

    /**
     * @type {TStringArrayWrappersType}
     */
    public readonly stringArrayWrappersType!: TStringArrayWrappersType;

    /**
     * @type {number}
     */
    public readonly stringArrayThreshold!: number;

    /**
     * @type {ObfuscationTarget}
     */
    public readonly target!: TTypeFromEnum<typeof ObfuscationTarget>;

    /**
     * @type {boolean}
     */
    public readonly transformObjectKeys!: boolean;

    /**
     * @type {boolean}
     */
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
