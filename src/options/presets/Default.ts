import { TInputOptions } from '../../types/options/TInputOptions';

import { IdentifierNamesGenerator } from '../../enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
import { OptionsPreset } from '../../enums/options/presets/OptionsPreset';
import { RenamePropertiesMode } from '../../enums/node-transformers/rename-properties-transformers/RenamePropertiesMode';
import { SourceMapMode } from '../../enums/source-map/SourceMapMode';
import { SourceMapSourcesMode } from '../../enums/source-map/SourceMapSourcesMode';
import { StringArrayIndexesType } from '../../enums/node-transformers/string-array-transformers/StringArrayIndexesType';
import { StringArrayEncoding } from '../../enums/node-transformers/string-array-transformers/StringArrayEncoding';
import { StringArrayWrappersType } from '../../enums/node-transformers/string-array-transformers/StringArrayWrappersType';

export const DEFAULT_PRESET: TInputOptions = Object.freeze({
    compact: true,
    config: '',
    controlFlowFlattening: false,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: false,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: false,
    domainLock: [],
    domainLockRedirectUrl: 'about:blank',
    exclude: [],
    forceTransformStrings: [],
    identifierNamesCache: null,
    identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
    identifiersPrefix: '',
    identifiersDictionary: [],
    ignoreImports: false,
    inputFileName: '',
    log: false,
    numbersToExpressions: false,
    numbersToHexadecimal: true,
    optionsPreset: OptionsPreset.Default,
    renameGlobals: false,
    renameProperties: false,
    renamePropertiesMode: RenamePropertiesMode.Safe,
    reservedNames: [],
    reservedStrings: [],
    stringArrayRotate: true,
    seed: 0,
    selfDefending: false,
    stringArrayShuffle: true,
    simplify: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode.Separate,
    sourceMapSourcesMode: SourceMapSourcesMode.SourcesContent,
    splitStrings: false,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: false,
    stringArrayCallsTransformThreshold: 0.5,
    stringArrayEncoding: [
        StringArrayEncoding.None
    ],
    stringArrayIndexesType: [
        StringArrayIndexesType.HexadecimalNumber
    ],
    stringArrayIndexShift: true,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersCount: 1,
    stringArrayWrappersParametersMaxCount: 2,
    stringArrayWrappersType: StringArrayWrappersType.Variable,
    stringArrayThreshold: 0.75,
    target: ObfuscationTarget.Browser,
    transformObjectKeys: false,
    unicodeEscapeSequence: false
});
