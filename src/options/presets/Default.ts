import { TInputOptions } from '../../types/options/TInputOptions';

import { IdentifierNamesGenerator } from '../../enums/generators/identifier-names-generators/IdentifierNamesGenerator';
import { ObfuscationTarget } from '../../enums/ObfuscationTarget';
import { OptionsPreset } from '../../enums/options/presets/OptionsPreset';
import { RenamePropertiesMode } from '../../enums/node-transformers/rename-properties-transformers/RenamePropertiesMode';
import { SourceMapMode } from '../../enums/source-map/SourceMapMode';
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
    debugProtectionInterval: false,
    disableConsoleOutput: false,
    domainLock: [],
    exclude: [],
    forceTransformStrings: [],
    identifierNamesGenerator: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator,
    identifiersPrefix: '',
    identifiersDictionary: [],
    ignoreRequireImports: false,
    inputFileName: '',
    log: false,
    numbersToExpressions: false,
    optionsPreset: OptionsPreset.Default,
    renameGlobals: false,
    renameProperties: false,
    renamePropertiesMode: RenamePropertiesMode.Safe,
    reservedNames: [],
    reservedStrings: [],
    rotateStringArray: true,
    seed: 0,
    selfDefending: false,
    shuffleStringArray: true,
    simplify: true,
    sourceMap: false,
    sourceMapBaseUrl: '',
    sourceMapFileName: '',
    sourceMapMode: SourceMapMode.Separate,
    splitStrings: false,
    splitStringsChunkLength: 10,
    stringArray: true,
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
